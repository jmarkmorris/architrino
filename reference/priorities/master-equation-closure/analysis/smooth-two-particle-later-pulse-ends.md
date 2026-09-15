# Motion through the remaining returned pulse endpoints

## Result and scope

The continuation follows the two targets through all eight remaining old-pulse return endpoints **at each target**, to normalized time $H=259/128=2.0234375$. There are sixteen directed receptions in total, related in eight pairs by reflection. Both targets continue moving downward throughout the added interval. They do not reach a fourth vertical turning point there, so the next completed excursion is still unavailable for an amplitude comparison.

Claim grade: **computer-assisted derivation, independently accepted**. The [continuation subject](smooth-two-particle-later-pulse-end-continuation.md) establishes the new history and event domain; the [certificate instrument](smooth-two-particle-later-pulse-end-certificate.py) encloses the added motion using the full unchanged equation. The [independent assessment](smooth-two-particle-later-pulse-end-independent-adjudication.md) accepts their combination after separately reconstructing the continuation, event census, propagation arithmetic and continuous polynomial signs. No conclusion about eventual settling follows from the present endpoint.

This preserves the exact prepared history and the infinite population used in the [accepted three-turn certificate](smooth-two-particle-later-certification.md). The new calculation extends the continuous target path, retains the already certified environmental source paths exactly, and encloses the acceleration mismatch over every added time cell. It does not extrapolate the last polynomial beyond its cell.

Local figure — Common height and vertical velocity through the remaining pulse-end receptions: `.local-data/master-equation-closure/later-pulse-ends/figure/later-pulse-end-motion.png`.

The shaded event interval encloses eight pulse-end paths per target. The upper panel shows height with its position-error band. The lower panel's entire velocity band stays below zero after $t=2$, establishing continued descent even where the height bands overlap. This leg has not yet reached a minimum.

## 1. Fixed physical problem

There is one architrino at every site $\ell i$ of the infinite simple cubic lattice, where $i\in\mathbb Z^3$ and $\ell$ is the original nearest-neighbor spacing. Its polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$. The targets are at $0$ and $\ell e_1$, with $e_1,e_2,e_3$ the coordinate unit vectors. Their supplied past displacements are identical and vertical:

$$
\mathbf y_c(s)=p(s+11/8)e_3,\qquad c\in\{0,e_1\},
$$

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
\qquad p=0\quad\text{otherwise}.
\tag{1}
$$

Here $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$ is displacement in lattice units, $t=T/\ell$ is normalized reception time, and $s$ is normalized emission time. Numerical wake speed is $c_f=1$. The dimensionless coupling is $g=G/(c_f^2\ell)=16$, with $G=\kappa q_0^2$ the acceleration coupling. Every environmental supplied past is stationary, and all labels are at their anchors and at rest at release $t=0$. The known preparation limitation remains: this exact past is not an unforced all-past solution, although its forward initial-history problem is well defined on the accepted domain.

The fixed eight-source block prescription defines the infinite stationary reference field $\mathbf S_0$. A changed source history $\mathbf U_j$ contributes

$$
\begin{gathered}
\mathbf Q_{ij}=\frac{\mathbf K(i-j+\mathbf y_i(t)-\mathbf U_j(s))}{1-\mathbf n\cdot\mathbf U_j'(s)}
-\mathbf K(i-j+\mathbf y_i(t)),\\
\mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\qquad
t-s=\|i-j+\mathbf y_i(t)-\mathbf U_j(s)\|,
\end{gathered}
\tag{2}
$$

where $\mathbf n$ is the unit vector along the received range. The exact acceleration is $g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}$. The subtraction in (2) replaces an already counted stationary source row. All remaining stationary sources are retained in $\mathbf S_0$, whose accepted bound is $\|\mathbf S_0(\mathbf y)\|\le1400\|\mathbf y\|^3$ inside $\|\mathbf y\|\le1/128$. This is the original transmitter-weighted Master Equation. No additional damping, mass, friction or restoring law is used.

## 2. Which pulse endpoints are being followed

A returned pulse path has two legs: an original target $c$ excites an environmental source $j$, and the resulting source motion is later received by a target $i$. The original pulse ends at emission time $-9/8$. Let $s^e_{jc}$ be the time at which that endpoint reaches $j$, and let $t^e_{ijc}$ be the time at which the corresponding source-history feature reaches $i$. They satisfy

$$
s^e_{jc}+9/8=\|j-c+\mathbf y_j(s^e_{jc})\|,
$$

$$
t^e_{ijc}-s^e_{jc}
=\|i-j+\mathbf y_i(t^e_{ijc})-\mathbf y_j(s^e_{jc})\|.
\tag{3}
$$

The source and receiver positions in (3) are evaluated at their respective event times. Replacing them by stationary anchor distances would miss the motion-dependent shifts.

At either target, the last eight paths consist of four source histories returning over distance $\sqrt3\ell$, first excited over distance $\sqrt2\ell$, and four reused source histories returning over distance $\sqrt2\ell$ after their second old excitation over distance $\sqrt3\ell$. Their common anchor endpoint time is

$$
\tau_e=\sqrt2+\sqrt3-9/8\approx2.02126437.
\tag{4}
$$

For the right target $i=e_1$, all eight paths start in the left target's supplied pulse. Their intermediate sources are $j=(0,\pm1,\pm1)$ and $j=(1,\pm1,\pm1)$, with independent signs. The second set receives two original excitations and these endpoints belong to its second excitation. Reflection in $x_1=1/2$ gives the left target's paths. The eight paths therefore add no source identities to the existing 21-source census at either target.

The earlier 17 paths at each target have already completed their original-pulse endpoint receptions by $t=2$. Completing the last eight therefore completes all 25 currently entered return paths per target. This concerns received features of the original pulse; the environmental sources retain displacement and velocity afterwards and continue contributing through (2).

The received source prefixes retain $\|\mathbf y_j\|<b_s=1/60000$ through $a=33/32$. With the new target radius $\|\mathbf y_i\|<b_t=1/40000$, the triangle inequality in the two equations (3) gives

$$
|t^e_{ijc}-\tau_e|<b_t+2b_s=7/120000.
\tag{5}
$$

Thus all sixteen directed endpoint receptions lie in the common enclosing interval

$$
2.021206036<t^e_{ijc}<2.021322704<H.
\tag{6}
$$

The exact radical interval from (4)–(5) is authoritative; the decimals in (6) are rounded outward. The next entering generated families anywhere in the population have anchor onset $\sqrt2+2-11/8=\sqrt2+5/8$. Their enclosure remains later than $H$, and each target retains its 21 distinct generated source identities on the added interval. A new population channel need not introduce a new source identity at a target. The continuation and independent assessment give the complete population census and strict event-order inequalities.

## 3. Why the received source histories are still sufficient

The earlier continuation provides displacement below $157/22500$ and speed below $1/50$ at $t=2$. On the short additional interval, the inherited acceleration ceiling $1/16$ yields a population displacement below $B_*=1/132$. These bounds close by a first-exit argument using the same known source histories. In particular,

$$
H-1+B_*+b_s<33/32=a.
\tag{7}
$$

Every generated causal root therefore reads a source time inside the already accepted prefix. The coarser radius $1/128$ would make the left side equal $a+b_s$ and would fail this sufficient check. That failed estimate is repaired by the stricter actual displacement bound; it is not a failure of the dynamics.

Positive cross ranges and source speeds below one retain unique causal cross roots with positive delay, and the subunit complete path speeds exclude positive self delays. The original regularity class and the fixed block prescription remain unchanged. The environmental sources are evolved histories, not prescribed future trajectories; the dependency reduction works because those required source times have already been solved and certified.

## 4. Appending the target path and enclosing its error

The new exact polynomial candidate keeps every right-target position, velocity and acceleration node through $t=2$ from the frozen archive. It appends 24 grid cells of width $1/1024$ to reach $H$. The source arrays remain unchanged. Each finite binary64 node denotes its exact dyadic rational value, and shared endpoint triples define the same quintic Hermite polynomial rule as the [earlier certificate](smooth-two-particle-later-certification.md#2-a-continuous-approximation-with-exact-joins). The new pieces meet the old piece with exact continuous position, velocity and acceleration.

A numerical integration proposes the extra nodes. Its omitted stationary-field center is not the certified physical law: the independently inherited interval checker subsequently encloses the mismatch against the complete equation, including $22400\|\mathbf Z\|^3$ for the infinite field. Here $\mathbf Z$ denotes the continuous target polynomial. The added residual calculation covers all 192 subcells of width $1/8192$. It encloses moving roots, all intersected source pieces, the source-time derivatives and every Cartesian component before forming the Euclidean norm.

| Certificate quantity on $[2,H]$ | Outward upper bound |
| --- | ---: |
| Target polynomial displacement norm | $1.008673\times10^{-6}$ |
| Target polynomial speed norm | $1.999113\times10^{-6}$ |
| Target polynomial acceleration norm | $1.629000\times10^{-5}$ |
| Full acceleration residual norm | $4.586780\times10^{-12}$ |
| Included stationary-field contribution | $2.298784\times10^{-14}$ |
| Latest enclosed source emission time | $1.023438513$ |

These are continuous interval bounds, not maxima of sampled trajectory points. Because the old target polynomial is retained exactly, its accepted prefix residual remains valid. The combined target residual maximum remains below $1.539527\times10^{-11}$; all source residuals remain below $9.471749\times10^{-11}$. The same sufficient budgets $\rho_s=10^{-10}$ and $\rho_t=10^{-9}$ apply.

The extended propagation argument retains the source error bounds $\|\mathbf y_j-\mathbf P_j\|\le\rho_s$ and $\|\mathbf y_j'-\mathbf P_j'\|\le3\rho_s$. The received source position error shifts the causal time as well as the range; the source acceleration bounds control the resulting source-velocity change. The earlier target Lipschitz constant remains below one inside radius $10^{-5}$. The total source-history coefficient is below 940. Hence, with $q=\rho_t+940\rho_s=9.5\times10^{-8}$,

$$
\|\mathbf y_i-\mathbf Z_i\|\le q\big(\cosh(t-1)-1\big),\qquad
\|\mathbf y_i'-\mathbf Z_i'\|\le q\sinh(t-1)
\quad(1\le t\le H).
\tag{8}
$$

At $H-1=131/128$, these preserve the sufficient uniform errors

$$
\varepsilon_P=6\times10^{-8},\qquad
\varepsilon_V=1.2\times10^{-7},\qquad
\varepsilon_A=2\times10^{-7}.
\tag{9}
$$

The polynomial radius plus $\varepsilon_P$ closes the smaller target neighborhood by a first-exit argument. Trial-source inactivity needs a sharper range bound than before: $140/99<\sqrt2$ gives $H+10^{-5}+b_s-140/99<39/64$, retaining the exact source-zero cut for the nearest excluded trial family. This is why the same 21 source identities remain sufficient for the polynomial residual as well as the actual dynamics.

## 5. What the extra motion establishes

Write $z(t)$ for either target's actual common height in lattice units and $Z(t)$ for the right-target polynomial's vertical component. Reflection in the plane $x_1=1/2$ exchanges target labels and reverses all lattice polarities, preserving their products and the vertical coordinate. Uniqueness therefore gives equal target heights.

Continuous polynomial derivative enclosures, enlarged by (9), give

$$
-2.119112\times10^{-6}<z'(t)<-1.748130\times10^{-6}<0
\quad(2\le t\le H).
\tag{10}
$$

Thus neither target reverses vertical direction during the added interval, including every reception in (6). Combined with the previous sign certificate, there are still exactly three consecutive turns on $[5/4,H]$. At the horizon,

$$
\begin{aligned}
9.028544\times10^{-7}&<z(H)<1.022855\times10^{-6},\\
-2.119112\times10^{-6}&<z'(H)<-1.879111\times10^{-6},\\
-3.105348\times10^{-6}&<z''(H)<-2.705347\times10^{-6}.
\end{aligned}
\tag{11}
$$

The targets remain above their original plane and are moving and accelerating downward at the horizon. The acceleration statement in (11) is an endpoint statement, not an assertion of one acceleration sign throughout the interval.

To measure the extra fall without charging two independent position errors, integrate the velocity error:

$$
z(2)-z(H)=Z(2)-Z(H)-\int_2^H\big(z'(t)-Z'(t)\big)\,dt.
\tag{12}
$$

The integral's absolute value is at most $\varepsilon_V(H-2)$, so the actual added fall is

$$
4.300499\times10^{-8}<z(2)-z(H)<4.863000\times10^{-8}.
\tag{13}
$$

In dimensional terms, that is between $0.04300499$ and $0.04863000$ millionths of a lattice spacing. The continued downward leg is unfinished. The already certified preceding upward excursion remains between $25.6\%$ and $30.5\%$ of the downward excursion before it; the present extension supplies no ratio for a new completed excursion. Later growth, further shrinking or persistent drift all remain possible within the unresolved future.

## Development evidence and reproduction

The new [certificate source](smooth-two-particle-later-pulse-end-certificate.py) uses the frozen earlier interval primitive, polynomial definition, source archive and prefix residual receipt as inherited accepted inputs. Exact rational join controls, a known dyadic quintic evaluation, a causal-inactivity control and a known integrated linear velocity passed before target use. Its `target` mode checks input hashes and exact prefix equality, constructs the extra nodes, encloses every added residual cell and records continuous signed results. This is an analytical proof instrument, not an EOM solver run.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-pulse-end-certificate.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-pulse-end-certificate.py target
```

Outputs are retained under `.local-data/master-equation-closure/later-pulse-ends/`: `known.json`, `certificate.json` and `target-approximant.npz`. The certificate identifies the exact frozen source archive, old prefix receipt, new instrument and new nodal data. The first complete construction and enclosure took 0.385 seconds by the instrument's internal timer; this one-run measurement is not a comparative performance claim. The separate independent assessment distinguishes its independent mathematical and polynomial checks from any same-instrument replay.

The extension would fail if a pulse endpoint lay outside (5), an earlier uncounted source entered before $H$, a causal root required a source future beyond $33/32$, a new polynomial join differed from the retained endpoint, the interval residual missed part of a cell or source piece, or the propagated vertical-velocity enclosure included zero. The continuation subject and certificate receipt identify the relevant events, inequalities and data. A fourth turn after $H$ would not contradict (10); it is the next motion event to be investigated.
