# Independent review of the functional chart above wake speed

## Disposition and precise scope

**Accepted, with the numerical-library boundary stated below.** The analytical error bounds and complete recent/remote guards are derived independently here. The separately authored [interval instrument](overnight2-b-independent-superwake-norm-chart.py) certifies the finite intervening domain for every reception and every complete history within the stated norms. It imports no subject or prior reference code. This review uses the Ramon E. Moore analytical lens under the Specialist charter; the role name supplies no mathematical authority.

For $K=c_f=1$, fixed $R>0$, normalized time $\tau=t/R$, and the six reference planar paths

$$
Y_j^0(\tau)=(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3)),
$$

the accepted hypotheses are complete $C^1$ histories, $\beta\in[73/40,457/250]$, and the global bounds

$$
|Y_j-Y_j^0|\le\varepsilon=1/1000,\qquad
|\dot Y_j-\dot Y_j^0|\le\nu=1/100,\qquad
|z_j|\le h=1/8,\qquad |\dot z_j|\le u=1/2.
$$

Dots denote normalized-time derivatives, which equal physical velocity components under $X=R(Y,z)$ and $t=R\tau$. The subject applies these bounds to its radius/phase/alternating-height class. Nothing in the estimates below needs additional waveform, frequency, parity, or acceleration bounds.

For each receiver, label sources by cyclic offset $j=0,\ldots,5$. The complete positive-delay counts are $(1,3,1,1,1,1)$. All eight roots obey

$$
\frac7{20}<d<2,\qquad |D|>\frac1{20}.
$$

Here $d$ is normalized delay; physical delay is $Rd$. Source offset one has ordered divisor signs $(+,-,+)$, and every other root has positive divisor. The self root and the negative-divisor partner root remain in the canonical sum, with absolute divisor. This is chart admissibility at every reception and all $R>0$. It is not acceleration balance, existence of an exact solution, stability, a fate result, or a finite-history evolution theorem.

## Independent scalar derivation

Fix a reception $\tau$ and rotate planar coordinates by its reference angle. For offset $j$, set $\alpha=j\pi/3-\beta d$ and $Q=X_0(\tau)/R-X_j(\tau-d)/R$. Its planar reference chord is $Q_p^0=(1-\cos\alpha,-\sin\alpha)$, so

$$
|Q_p^0|^2=2-2\cos\alpha,\qquad
Q_p^0\cdot\dot Y_j^0=-\beta\sin\alpha.
$$

The reference source velocity here is $\beta(-\sin\alpha,\cos\alpha)$. It is the delayed source velocity, not the receiver velocity. The planar error $E=Q_p-Q_p^0$ has norm at most $2\varepsilon$; hence

$$
\bigl||Q_p|^2-|Q_p^0|^2\bigr|
\le2|Q_p^0||E|+|E|^2\le8\varepsilon+4\varepsilon^2=:E_p.
$$

With source velocity error $W=\dot Y_j-\dot Y_j^0$, the exact expansion of the contraction error is $E\cdot\dot Y_j^0+Q_p^0\cdot W+E\cdot W$. Its absolute value is at most $2\varepsilon\beta+2\nu+2\varepsilon\nu$. The axial separation has square in $[0,4h^2]$ and axial source contraction has absolute value at most $2hu$.

Define the squared causal gap $G=|Q|^2-d^2$. Since $\partial_dQ$ equals delayed source velocity, the actual derivative is $G_d=2Q\cdot\dot X_j/R-2d$, with the notation $\dot X_j/R=(\dot Y_j,\dot z_j)$. Therefore the independently evaluated enclosures are

$$
G\in2-2\cos\alpha-d^2+[-E_p,E_p+4h^2],
$$

$$
G_d\in-2\beta\sin\alpha-2d+[-E_d,E_d],\qquad
E_d=4\varepsilon\beta+4\nu+4\varepsilon\nu+4hu.
$$

The uniform exact constants using the upper rate endpoint are $E_p=2001/250000$ and $E_d=37169/125000$. The instrument uses the outward interval upper endpoint of $\beta$ in its derivative-error calculation, so rational-to-interval conversion cannot narrow that bound. A broad squared-gap interval and its broad derivative interval need not be derivatives of one arbitrary interval selection: both contain the values of each actual history and its actual derivative. This is the required mean-value and monotonicity premise.

At a positive root, $|Q|=d$ and $n=Q/d$, giving

$$
D=1-n\cdot(\dot Y_j,\dot z_j)=-\frac{G_d}{2d}.
$$

No response multiplier or alternative law enters this identity.

## Complete recent and remote exclusion

Set $d_-=1/4$. The planar self error is the chord of $Y_j-Y_j^0$, whose derivative norm is at most $\nu$, so its norm is at most $\nu d$. The self reference chord has length $2\sin(\beta d/2)$ in this range. For $0<d\le d_-$, the argument is at most $457/2000<1/4$. The elementary sine lower bound gives

$$
\frac{|Y_j(\tau)-Y_j(\tau-d)|}{d}
\ge\beta\left(1-\frac{(\beta d/2)^2}{6}\right)-\nu
\ge\frac{73}{40}\left(1-\frac{(457/2000)^2}{6}\right)-\frac1{100}
=\frac{1727154023}{960000000}>1.
$$

The spatial chord is at least this planar chord; no self root exists in the entire open recent interval, including arbitrarily small delays. This avoids using the constant squared-gap error near its degenerate zero-delay endpoint.

For each partner the present planar separation is at least $1-2\varepsilon$. Every source speed is at most

$$
V_+=\sqrt{(\beta_++\nu)^2+u^2}.
$$

Triangle inequality along the source's complete history yields $|Q(\tau,d)|-d\ge1-2\varepsilon-(1+V_+)d_-$. An elementary rational check is already sufficient: $\beta_++\nu=919/500$ and $V_+^2=907061/250000<4$, so this lower bound is strictly greater than $499/500-3/4=31/125>0$. The instrument additionally retains the outward square-root enclosure and sharper positive margin. No below-wake-speed assumption is used; these paths have planar speed at least $\beta_- -\nu>1$.

All normalized positions lie within radius $\sqrt{(1+\varepsilon)^2+h^2}$ of the origin. Thus every causal root has $d\le2\sqrt{(1+\varepsilon)^2+h^2}$. The independent instrument covers up to an outward upper bound of this diameter plus $1/50$; all later delays are analytically excluded. This differs harmlessly from the subject's additional $1/100$. Complete histories and their global bounds are essential to both guards.

## Independent finite cover and continuation

The independent code reads only the midpoints of the subject target's protected brackets as root-location hints, after checking that input's SHA-256. It does not import subject code, accept subject endpoint signs, copy interval enclosures, or use the subject's claimed count as evidence. Starting separately from each hint, it expands rational endpoint offsets until both uniform signs are proved, refines the endpoints, and proves a single derivative sign throughout the resulting protected interval. Opposite signs and strict monotonicity then establish exactly one actual root for every permitted history. Thirty-two inclusive interval-Newton steps, or earlier exact endpoint stagnation, retain every such root. The Newton argument follows from the mean-value theorem for each actual $G$ and the independently bounded $G_d$.

Every complement is separately split and excluded by a strict gap sign or by a strict derivative sign with same-sign endpoint gaps. The code also sorts the protected and complementary rational pieces and checks exact endpoint adjacency, strict positive widths, the initial recent endpoint and the final remote endpoint. Thus this is an exhaustive interval cover, not a count inferred from the hints or volume. The final target has eight protected intervals and 50 complementary leaves. A deliberately omitted-root known control is rejected by complementary exclusion.

**Measured certificate:** the completed target has counts $(1,3,1,1,1,1)$ and rational margin checks strictly stronger than the requested $d>7/20$, $d<2$ and $|D|>1/20$. Its exact minimum lower delay endpoint is $25129572239/68719476736$. The maximum upper delay endpoint is

$$
\frac{828893869852943544022989636392130505064304489404242218275333524685}{421249166674228746791672110734681729275580381602196445017243910144}<2,
$$

and its minimum absolute-divisor lower endpoint is

$$
\frac{243116557636788408708562505638062384129400384089445567867026634569}{3369993333393829974333376885877453834204643052817571560137951281152}>\frac1{20}.
$$

These comparisons are exact `Fraction` comparisons in the recorded target. The lower delay endpoint likewise exceeds $7/20$. Every root's two-sided delay and signed-divisor enclosures, endpoint signs, monotonicity interval, contraction count and every complementary leaf are retained in that receipt.

The error bounds have no reception-phase variable. Consequently the same proof applies at every reception without a phase mesh. Cyclic relabeling gives the same argument for each receiver. For $C^1$ paths, $G(\tau,d)$ is jointly $C^1$ and $G_d\ne0$ at every root, so the implicit function theorem gives locally $C^1$ delay branches. Fixed disjoint protected intervals and uniqueness identify these branches globally. If the relative gap geometry repeats over a common period, the unique root in each protected interval repeats as well. This conditional periodic statement does not assert that arbitrary admitted profiles are periodic.

The explicit member in the subject is admitted by direct bounds: $\rho=1$, $p=0$, $z=(1/10)\cos(2\tau)-(1/80)\sin(6\tau)$ has $|z|\le9/80<1/8$, $|\dot z|\le11/40<1/2$, zero planar errors, and the stated rate lies inside the admitted interval. Its heights at $0$ and $\pi/2$ are $1/10$ and $-1/10$. This is an example of chart membership, not an exact solution.

## Known-first controls, resources and identities

The companion is separately authored standard-library Python plus shared mpmath 1.3.0 interval arithmetic at 65 decimal digits. Its algebra uses $2-2\cos\alpha$ rather than the subject's sine-square gap form. Rational data, partition endpoints and comparisons use `Fraction`; transcendental enclosures rely on mpmath's outward interval implementation. The shared numerical-library boundary remains: this review is independent of the subject implementation, not a second independently implemented interval transcendental library.

Before pilot use, the recorded known stage passed the five complete static partner channels with exact chord squares $1,3,4,3,1$, absence of static self roots, the diametric gap $0$ and derivative $-4$, and independent exact error constants $201/2500$ and $301/1250$ for its toy norm data. A nonstatic control uses $d=\sqrt2$, $\beta=5\pi/(6\sqrt2)$ and offset one, giving $\alpha=-\pi/2$, $G=0$ and $D=1-5\pi/12<0$; this checks the source-contraction and signed-divisor orientation. The sine-bound control passes. Removing the sole static source-one root hint causes rejection, as required. The known pass was retained and reported before the pilot; the pilot pass was inspected and reported before the target. Both later stages require matching source identity and a prior completed known pass, and the target additionally requires the matching pilot pass.

The pilot used the midpoint $\beta=3653/2000$ with the full target error bounds; the target used the entire closed rate interval. Predeclared caps were 300 internal seconds, 360 supervisor seconds, 512 MiB resident memory, eight MiB per receipt and one numerical thread. No cap or domain expansion was needed.

| Stage | Internal seconds | Receipt bytes | Observed RSS after serialization | Result |
| --- | ---: | ---: | ---: | --- |
| Known | 0.03600929072126746 | 14667 | 27656192 | Passed all controls |
| Pilot | 0.06378937512636185 | 44790 | 27885568 | Passed, 43 complementary leaves |
| Target | 0.07806854089722037 | 51171 | 27901952 | Passed, 50 complementary leaves |

Pilot supervisor `4d433f90-fc69-45f2-a896-66a34ea4b3bb` closed with exit zero, zero stderr and `processGroupClosed: true`, reporting 0.121 supervised seconds. Target supervisor `b255424e-b736-4e4d-8af0-ca2ed4c85edd` likewise closed with exit zero, zero stderr and `processGroupClosed: true`, reporting 0.164 supervised seconds. Supervisor ownership is an operational receipt, not scientific acceptance. No numerical process remains from this review, and the numerical slot was released to the parent after target inspection. The receipts total 110628 bytes; supervisor stdout was 465 and 466 bytes respectively, with retained local logs.

| Artifact | SHA-256 |
| --- | --- |
| Frozen subject report | `4e9717de69a368f8ce2abe56f4f90fb21cae088825bf3498ac01db46513b4b5c` |
| Frozen subject instrument | `a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a` |
| Frozen subject target, used only for hint centers | `84c00158e4f8432978b43320c5da7c2f24087e3ff36cce866dc0f5ce46bd898d` |
| Independent companion | `f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39` |
| Independent known | `395f3ba70f4defee5da998bdcce2db25117c0fec47273cc252be347de80867f2` |
| Independent pilot | `ea31c6973781673a455640423a73c3ba8f0951bdce3f3db2d58a9bfaeeed365a` |
| Independent target | `0ca2f541041d56c81917f92ea7aeb46ed89dda3304b7f03489fb02259e7f593a` |

Reproduction uses the shared venv and the companion's sequential `--stage known`, `--stage pilot`, `--stage target` modes, with `PYTHONDONTWRITEBYTECODE=1` and `OPENBLAS_NUM_THREADS=OMP_NUM_THREADS=MKL_NUM_THREADS=1`. Receipts live under `.local-data/master-equation-closure/overnight2-b/independent-superwake-norm-chart/`; modes use exclusive creation to preserve them. These ignored paths are local evidence, not public CI dependencies. The tracked companion and frozen hint identity declare the reproduction input.

## Falsifiers, preservation and remaining obligations

A history satisfying every complete-history norm but producing an extra positive root, a missing protected root, a zero divisor or a violation of a certified margin would overturn this chart. Check the actual source contraction sign, the recent self chord inequality, the complete rational partition and the retained endpoint/derivative intervals first. A defect in mpmath's interval operations is also an explicit computational falsifier. A proposed member violating a norm fails admission; that is not a counterexample to the chart.

No mathematical repair to the subject is required. The report's acceptance remains at geometric grade. Exact canonical balance for any member and all questions about dynamics or stability remain separate obligations. No imported standard-physics law is used. The independent proof does not rely on the earlier numerical survey or earlier determinant exclusion.

Only this new report, its new companion and its distinct runtime receipts were authored for the review; required supervisor leases/logs remain under their established runtime owner. The original failed-cutoff instrument/pilot, corrected subject controls, subject target, earlier independent reports and instruments, and parent account were left untouched. Post-run `shasum -a 256` on the three frozen subject inputs matches the assigned identities above. Native `git diff --no-index --check /dev/null` on each new authored file is the scoped whitespace check; no repository-changing Git operation, generator, numerical orbit run, recursion or corpus propagation is part of this review. Evidence is retained locally, with no archive-recovery or remote-backup assertion. Parent integration belongs to [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
