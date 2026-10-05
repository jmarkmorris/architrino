# Continuous logarithmic tangential signs on the first four ordinary cells

Date: 2026-10-03. **Authorized variation: inverse-distance logarithmic response, with every positive-delay self hit included.** This is separate from the unchanged baseline results. Numerical settings are $K_{\log}=c_f=1$, hence fixed dimensionless coupling $k=1$; no coupling is tuned, and no spectrum is calculated. Subject instrument: [ring_logarithmic_finite_cell_census_20261003.py](../../../../../scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py), SHA-256 `39b2a1803847bd5026f9395d9a7067cf3fcf542860c6ed44b0519bc36e9cf103`. **Grade: computer-assisted derived continuous-cell candidate, pending a separately constructed adjudication.**

## Result and scope

The logarithmic tangential coefficient is strictly positive throughout T01 and T03 and strictly negative throughout T02 and T04, including arbitrarily close to each cell's left birth boundary. These are complete ordinary open-cell signs, replacing point-only scope for these four cells. They exclude every exact regular alternating six-member logarithmic circle in these domains: $C_t=0$ is necessary independently of radius and of any fixed positive $k$.

Let $h=\pi/6$, $F_\beta(x)=\beta\sin x-x$ and $M(\beta)=\max F_\beta$. Write $b_0=1$ and $M(b_q)=qh$ for $q\ge1$. T$\ell$ is the open interval $b_{\ell-1}<\beta<b_\ell$. Diagnostic birth speeds and conservative strict sign margins are:

| Cell | Lower birth, diagnostic | Upper birth, diagnostic | Complete directed roots | Regular cover boxes | Certified signed lower bound throughout the open cell |
| --- | ---: | ---: | ---: | ---: | --- |
| T01 | $1$ | $1.81045123826829$ | 36 | 17 | $C_t>0.15475$ |
| T02 | $1.81045123826829$ | $2.40712166071961$ | 48 | 9 | $-C_t>0.03031$ |
| T03 | $2.40712166071961$ | $2.97169387071380$ | 60 | 11 | $C_t>0.05132$ |
| T04 | $2.97169387071380$ | $3.52225966872238$ | 72 | 10 | $-C_t>0.01170$ |

Every row retains all six positive-delay self hits. Birth speeds in the table are rounded diagnostics, not domain-defining floating endpoints: exact outward binary fold enclosures and complete coverings are in the receipts. The signed bounds are rounded downward from authoritative lower endpoints. The census includes every prescribed-ring source level and does not inherit a baseline balance radius.

The result concerns regular co-rotating alternating six-member circles and the four ordinary cells above wake speed. It does not exclude a tangential zero in the whole sub-wake interval, a higher cell, another inventory, a deformed circle or a nonplanar history. Fold boundaries have zero source factor and remain outside this ordinary-root result; no continuation rule is introduced. No exact logarithmic reference is admitted for a stability calculation. **Falsifier:** an omitted root, invalid birth bracket, gap in the speed cover, failed fold-strip dominance or independently certified tangential zero in one of these open cells overturns its exclusion.

## Complete root chart and finite-interval enclosures

Consume the [logarithmic equation and radius-cancellation owner](ring-logarithmic-variation-2026-10-03.md) and its [independent adjudication](ring-logarithmic-independent-adjudication-2026-10-03.md). On the complete ordinary chart,

$$
F_\beta(x)=mh,\quad 0<x<\pi,\qquad
D=1-\beta\cos x,\qquad
C_t=\frac12\sum_{m,r}\frac{(-1)^m\cot x_{m,r}}{|D_{m,r}|}.
$$

Strict concavity of $F_\beta$ gives exactly the descending levels $m=-5,\ldots,0$ and both roots of every level $1\le m\le q$ when $qh<M<(q+1)h$. Level zero's coincident endpoint is excluded; its positive-delay descending root is retained. The endpoints $x=\pi$ and $x=0$ are not positive-delay hits. Thus the complete count is $6(6+2q)$ directed roots for T$\ell$ with $q=\ell-1$. No point scan is used to infer completeness.

The new instrument reuses only the frozen owner's point root proposals, whose SHA-256 remains `0eecb7dd023d958a1936bf544ac144a658f640de78157b607dacd305c9aa5e16`. Every speed endpoint proposal is enclosed with outward opposite residual signs and its known concavity branch. The implicit identity $dx/d\beta=\sin x/D$ shows that descending roots increase and rising roots decrease throughout their ordinary sheets. The interval hull of both certified endpoint root boxes therefore contains each root for every intermediate speed. An outward enclosure of $D$ must retain its signed branch; otherwise the speed box is subdivided. Each resulting signed $C_t$ sum retains every row.

The regular covers run from the left birth plus $10^{-5}$ to the outward upper enclosure of the next birth. Their stored beta intervals are sorted, share exact adjoining endpoints and cover that entire range. A box is accepted only when its outward $C_t$ enclosure has the required strict sign. No unsampled speed or derivative extrapolation is accepted.

At the right boundary only the outgoing cell's existing sheets are continued a tiny distance into the fold-speed enclosure. They are ordinary there and their sum is analytically defined. This supplies a one-sided enclosure for every speed strictly below the next exact birth; it is not an evaluation of the full equation beyond that birth, where an additional root pair would be required. At every physical speed inside the declared open cell the selected sheets are its complete census. The outgoing-sheet continuation is an enclosure device, not a source exclusion or an altered scenario.

## Left-fold strip proof, including the wake-speed birth

The left strip has width $10^{-5}$ above the outward upper left-fold bracket. It overlaps the regular cover and reaches every physical speed arbitrarily close to the exact birth. All older roots are enclosed throughout this strip; their factors are ordinary because they are at least one source level below the new fold, or are negative descending levels. Let their complete tangential coefficient be $C_t^{\rm old}$.

For $q\ge1$, put $x_*=\arccos(1/\beta)$ and $B=\sqrt{\beta^2-1}$. The trigonometric addition formula gives the exact moving-center gap

$$
M(\beta)-F_\beta(x_*+y)=B(1-\cos y)+y-\sin y.
$$

Choose $\rho=0.01$. The interval certificate verifies that the maximum cell-birth height gap on the strip is smaller than

$$
B(1-\cos\rho)-(\rho-\sin\rho),
$$

uniformly on the strip. That is the smaller of the two gaps at $y=\pm\rho$. Concavity then places both new roots inside $x_*\pm\rho$. Their common enclosing angle tube lies strictly between zero and $\pi/2$, so its cotangent has a positive lower bound $c$; their absolute factors have a finite positive upper bound $d$. Both have polarity product $\sigma=(-1)^q$. Consequently

$$
\sigma C_t^{\rm new}
=\frac12\left(\frac{\cot x_-}{|D_-|}+\frac{\cot x_+}{|D_+|}\right)
\ge\frac c d.
$$

An outward lower bound for $c/d-|C_t^{\rm old}|$ is positive on each strip. The signed complete coefficient therefore has the cell's required sign even though its new contribution diverges at the excluded left fold. The stored finite `newbornMagnitudeLower` is a lower-bound construction, not a finite upper enclosure of that divergent contribution. The certified dominance margins exceed 42.15, 19.94 and 12.16 on T02, T03 and T04 respectively.

T01 begins at the different zero-delay self birth $\beta=1$. On $1<\beta\le1+10^{-5}$, the certificate verifies $\beta\sin\rho-\rho<0$ at $\rho=0.01$, placing its unique positive level-zero root in $(0,\rho)$. On this descending root $0<D=1-\beta\cos x\le1-\cos\rho$ and $\cot x\ge\cot\rho$. Its positive logarithmic contribution therefore obeys

$$
C_t^{\rm self}\ge\frac{\cot\rho}{2(1-\cos\rho)}.
$$

The complete five negative-level partner rows are bounded separately. Subtracting their absolute coefficient bound leaves an outward positive margin greater than 999974 on the whole one-sided wake strip. Thus no positive-delay self root is silently lost near equality. Equality itself has a different census and is not included in this open-cell proof.

The analytic strip and regular cover together give the whole-cell signed lower bounds in the table. This step, rather than a point near the fold, closes each singular endpoint limit.

## Controls, receipts and verification boundary

Before all final target uses, the new instrument passed and recorded: the static inverse-distance acceleration $1/2$ at separation two; the exact static complete hexagon's zero tangential coefficient; the exact descending root $\beta=2\pi/3$, $m=1$, $x=\pi/2$; the moving-center fold identity against direct trigonometric evaluation; and a fold inverse whose independently specified height $\sqrt3-\pi/3$ gives the analytically known birth speed $\beta=2$. This last control exercises the same nontrivial fold enclosure used for the cell boundaries, rather than only the trivial wake endpoint.

An early draft used an unavailable interval `acos` method and bundled preliminary target-strip preparations before emitting the control receipt. Both were corrected in this new instrument: the interval angle is $\operatorname{atan2}(\sqrt{\beta^2-1},1)$, and the final known stage contains analytical controls only. Current-identity known controls were recorded before every final target. The final target gate rejects changed instrument or frozen proposal bytes. Only those final hash-bound receipts support this result; no original scientific owner or oracle was changed.

Receipts under `.local-data/ring-exploration/logarithmic-finite-cells/` retain exact binary bounds, all endpoint root enclosures, every regular cover box and all fold-strip inequalities:

| Receipt | SHA-256 |
| --- | --- |
| `known.json` | `8cf93d248968fbc8d1f9e8b35b7504fc468a8daffdc69a03f2191237ccd9e7d8` |
| `T01.json` | `9c91b66730313d9ad6aa719444534e733de8275d2811382d52a550d5956a1c5c` |
| `T02.json` | `a08046fccb3f7e486e43e3229c78375769112ee7d6308983b62f734c41b46151` |
| `T03.json` | `3edd2ce00c1533e07fa79318678442a9f1cd64b68cd5f50c024921cd5a09eac4` |
| `T04.json` | `d32f83a3485d3bdbce468062c944b13c30533a3d19e7bc004299a855208bce26` |

The final four targets completed with exit zero; their respective monotonic wall timers recorded 6.47, 4.46, 6.80 and 7.39 seconds while run concurrently as four single-process jobs. These are measured invocation times, not a cost model. Every target was bounded by a 20000-box/40-depth ceiling and would have recorded an explicit incomplete cover on exhaustion. All covers completed, with maximum subdivision depths 16, 7, 6 and 5.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py target --cell 1
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py target --cell 2
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py target --cell 3
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_finite_cell_census_20261003.py target --cell 4
```

The result is frozen for independent adjudication. Recommended next action: reconstruct the parametric endpoint-root monotonicity and fold-strip lower bounds independently before integrating the four-cell exclusion. Then consider a whole sub-wake sign proof or a separately bounded higher-cell census; a first-ring stability calculation still requires an exact admitted logarithmic circle. No shared manuscript, index, registry, queue, log, rank, score, equation or scenario was edited by this work.
