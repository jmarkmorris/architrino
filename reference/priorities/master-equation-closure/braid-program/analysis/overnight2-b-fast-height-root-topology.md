# Root-count changes in fast skew-height preparations

## Question and conditional conclusion

The [fast-height determinant study](overnight2-b-fast-height-determinant.md) excludes many prescribed skew-height preparations at a single reception. Some remaining parameter boxes resist an ordinary-root cover. The present question is whether this resistance can be attributed to a real nonordinary causal root, rather than insufficient interval resolution.

A complete ordinary census at two points can answer that question without locating the intervening event. If the root counts differ, and uniform recent and remote guards confine every intervening root to a fixed compact delay interval, at least one intervening root must have zero delay derivative. Two different uses must be distinguished. Varying a preparation parameter proves a nonordinary member somewhere in that parameter segment. Varying reception phase at fixed parameters proves that the specified complete history has a nonordinary reception. Neither statement asserts existence or evolution of an exact solution.

The completed subject censuses below establish the required endpoint contrasts, pending independent reconstruction. Floating midpoint root lists remain bracket proposals and supply no conclusion by themselves.

## Exact prescribed geometry

Use $K=c_f=1$, every ordinary positive-delay self and partner root, the absolute source divisor, and the complete paths

$$
X_j(t)=R\left(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^jHf(\kappa\tau)\right),
\qquad f(\phi)=\cos\phi-\frac18\sin3\phi,\quad \tau=t/R.
$$

Fix a receiver with index zero, reception phase $\phi$, source $j$, normalized delay $d>0$, and $s=(-1)^j$. In the reception radial frame, write

$$
\alpha=j\pi/3-\beta d,\qquad
Q_r=1-\cos\alpha,\qquad
Q_t=-\sin\alpha,\qquad
Q_z=H[f(\phi)-s f(\phi-\kappa d)].
$$

Let $v_z=sH\kappa f'(\phi-\kappa d)$ denote the source axial velocity in normalized time. The squared causal gap and its derivative are

$$
G(d;\phi,\beta,H,\kappa)=2(1-\cos\alpha)+Q_z^2-d^2,
$$

$$
G_d=-2\beta\sin\alpha+2Q_zv_z-2d.
$$

At a root, $D=-G_d/(2d)$ is the source divisor. Thus an ordinary root is exactly a positive-delay zero with $G_d\ne0$. Its polarity and the sign of $D$ do not change this root condition.

The selected parameters are

$$
\beta=\frac{365287}{200000},\qquad H=\frac1{10},\qquad
\kappa_k=8+\frac{3(2k+1)}{64}.
$$

The planned phase-zero indices are $193,194,195,238,239,240,241$. The planned second reception is $\phi=\pi/2$ at indices $194,239,240$. Each scalar is exact; these points do not stand for entire original frequency cells.

## Uniform guards along the connecting paths

For every reception phase and every selected or intervening frequency, the planar self chord satisfies

$$
\frac{|Q_{\mathrm{planar}}|}{d}
=\beta\,\frac{\sin(\beta d/2)}{\beta d/2}
\ge\beta\left(1-\frac{(\beta d/2)^2}{6}\right)>1
\quad (0<d\le1/4).
$$

Consequently no self root enters from zero. For each distinct partner, its simultaneous planar separation is at least one. Source planar speed is $\beta$, so its delayed planar separation is at least $1-\beta d>d$ for $d\le1/4$. This excludes every partner root in the same recent interval, independently of axial speed.

Since $|f|\le9/8$, the complete path diameter is at most $2\sqrt{1+(9H/8)^2}<3$. No root reaches delay three or escapes to infinity. The squared gaps are smooth in phase, frequency and delay throughout the resulting compact interval $[1/4,3]$.

These guards also hold on the small original beta and height slabs stated in the determinant study. No hypothesis about a prescribed numerical root count is used to establish them.

## Why a change in complete count forces a nonordinary root

Let $\lambda\in[0,1]$ parameterize either a continuous frequency segment at fixed phase, or a continuous reception-phase segment at fixed preparation. Suppose for contradiction that every root in every fiber is ordinary. At any fixed $\lambda_0$, ordinary zeros are isolated. Their set is closed inside the compact delay interval and therefore finite: an infinite set would have an accumulation zero, incompatible with nonzero derivative there.

Around each of these finitely many zeros, the implicit-function theorem provides one continuous root branch for nearby $\lambda$, with nonzero derivative and unique local root. Remove small disjoint neighborhoods of those zeros. On the remaining compact delay set, the gap has a strictly positive absolute minimum. Continuity therefore excludes new roots there for all sufficiently nearby parameters. The complete count is locally constant in $\lambda$.

An integer-valued locally constant function on the connected interval is constant. Different complete endpoint counts contradict the assumption that every intervening root is ordinary. Since the endpoint censuses are ordinary and the guards exclude boundary escape, the nonordinary root occurs at an interior parameter and a delay strictly between $1/4$ and three.

This proves existence of a zero with $G=G_d=0$. It does not by itself prove a generic two-root fold: that stronger classification requires nonzero second delay derivative and a suitable transverse parameter derivative. Nor does it determine the number, location or order of all intervening nonordinary events. A count difference of two is compatible with a fold but is not a substitute for those derivative checks.

## Verification boundary and falsifiers

The companion [point census](overnight2-b-fast-height-point-census.py) uses complete interval brackets and complementary exclusion; floating roots guide bracket locations only. It must pass known controls before the pilot and target. Subject and independent evidence will be recorded separately. This argument imports no force law, ceiling, regularization, event selection or continuation.

A missing endpoint root, invalid complementary exclusion, failure of a uniform recent/remote guard, or a correctly constructed all-ordinary connecting path with different complete endpoint counts would falsify the corresponding claim. Until the numerical premises are independently reconstructed, the concrete preparation-specific conclusion remains pending.

## Completed subject censuses

The known stage passed before the two-reception pilot. The unchanged ten-reception target then completed with no unresolved or pending reception. Native jq inspection of its complete channel records gives:

| Index $k$ | Exact frequency $\kappa_k$ | Channel-one count at phase zero | Channel-one count at phase $\pi/2$ |
| --- | --- | ---: | ---: |
| 193 | $1673/64$ | 3 | Not selected |
| 194 | $1679/64$ | 5 | 3 |
| 195 | $1685/64$ | 3 | Not selected |
| 238 | $1943/64$ | 3 | Not selected |
| 239 | $1949/64$ | 5 | 3 |
| 240 | $1955/64$ | 5 | 3 |
| 241 | $1961/64$ | 3 | Not selected |

Every other channel has one ordinary root at each selected reception. Thus all three fixed preparations at indices 194, 239 and 240 contain a nonordinary channel-one reception with $0<\phi<\pi/2$. Since squared relative geometry is periodic in $\phi$, the same obstruction recurs in each height cycle. This is a derived consequence of the completed subject census, pending independent reconstruction.

At phase zero, there is also at least one nonordinary parameter in each open frequency interval $(\kappa_{193},\kappa_{194})$, $(\kappa_{194},\kappa_{195})$, $(\kappa_{238},\kappa_{239})$ and $(\kappa_{240},\kappa_{241})$, with beta and height fixed as above. These parameter boundaries are distinct claims from the time-dependent reception obstructions. Neither conclusion classifies the event as a generic fold.

The point-census instrument SHA-256 is 4caf441f9b9a61558560b9ed70f1bf79a89168aa1f00ee4e58119be9082c2876. Original local receipts are retained under .local-data/master-equation-closure/overnight2-b/fast-height-point-census/.

| Stage | SHA-256 | Internal seconds |
| --- | --- | ---: |
| Known | 118f30f5e2cd00da173a0810349dd5280fd035e590b572d84e311b74c145316e | Recorded in receipt |
| Pilot | a16483ce34ae67488e7f240940a471a5338248a9eac758e3bbd765f52b1cc920 | 0.459141 |
| Target | d93e3431a1bdcc4fde3b7daf33e0b28c3a39a93b8eb3b83ff34a074efed9763e | 1.476114 |

The target's supervisor 9b2bec1c-1ded-429c-9cf8-7c6e43326817 records 1.566 seconds, exit zero, zero stderr and a closed process group. Its observed RSS was 81,149,952 bytes, with 748 complementary leaves. Native wc records 764,842 target bytes and 996,986 bytes across all three receipts. These measurements satisfy the declared 120/180-second, 512-MiB and four-MiB receipt bounds. Reproduction uses the shared venv, one numerical/BLAS thread and stages known, pilot and target, with original outputs preserved.

The mathematical conclusion concerns the three exact point preparations and the four specified parameter segments. It does not certify that every unresolved original box contains a nonordinary root, nor that every member of a box is nonordinary. Continuity supplies some open neighborhoods of the three fixed preparations with the same endpoint count contrast, but no explicit neighborhood size is claimed here.
