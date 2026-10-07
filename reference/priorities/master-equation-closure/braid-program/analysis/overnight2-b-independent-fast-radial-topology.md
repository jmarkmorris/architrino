# Independent rapid-radial root-count obstruction

## Disposition and exact boundary

**Accepted throughout both declared closed six-coordinate boxes.** Independent interval reconstruction proves complete partner-channel-three endpoint counts $(1,3)$ at phases $(0,5\pi/48)$ for the first box, and $(1,5)$ at phases $(0,7\pi/16)$ for the second. The target contains ten ordinary roots, including three negative-divisor roots, and 118 root-free complementary intervals. All four endpoint censuses and their exact parameter/reception inventory pass.

**Derived consequence:** for every fixed parameter vector in the first box there is a channel-three root satisfying $G=G_s=0$ at some phase strictly between zero and $5\pi/48$; for every vector in the second, such a root occurs strictly between zero and $7\pi/16$. Every resulting delay lies in $(1/1000,3)$. These are statements about the complete prescribed histories, valid at every positive scale $R$.

This obstructs an everywhere-ordinary reference in either box. It does not test exact acceleration balance, classify a generic fold, infer divergence of the total acceleration, prescribe continuation, construct an actual solution, or establish stability. Only partner source three is enumerated. No self census or full six-channel chart is asserted. The underlying canonical selection remains $K=c_f=1$, all ordinary positive-delay self and partner roots, and absolute source divisors; the present argument does not alter that selection.

The Moore role is an analytical lens, not acceptance authority. The parent owns integration into [the receiving account](overnight2-b-followup-and-research-2026-10-07.md). The independent computation uses the [new companion](overnight2-b-independent-fast-radial-topology.py); the subject reports, sources, proposal and prior references remain frozen.

## Exact boxes and reconstruction of the histories

Set $\tau=t/R$, $\phi=\kappa\tau$, and

$$
X_j(t)=R\big(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],
\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)\big),
$$

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=\frac{c\cos2\phi+d\sin2\phi}{\kappa},\qquad
z=\frac1{10}\left(\cos\phi-\frac18\sin3\phi\right).
$$

The independent coordinates are ordered $(a,b,c,d,\beta,\kappa)$. Each coordinate ranges over its displayed exact decimal center plus or minus $2^{-24}=1/16777216$, inclusively. Scientific-notation decimals are also parsed as exact rationals. Height is fixed at $H=1/10$ and is not a seventh uncertain coordinate.

| Coordinate | First box center | Second box center |
| --- | --- | --- |
| $a$ | 0.3136968886638644 | 0.35002757224908015 |
| $b$ | -0.010876187144810699 | -0.000003414150007291214 |
| $c$ | 0.0008384905733558252 | 3.251348274927906e-7 |
| $d$ | 0.0010679727374362854 | 1.256393741976146e-7 |
| $\beta$ | 1.8461447020546873 | 1.8264752780900957 |
| $\kappa$ | 16.125422731863043 | 23.99918856908369 |

The companion constructs the exact rational lower and upper endpoint for every coordinate and stores all twelve endpoints per box in its target. Its inventory audit requires the four ordered pairs $(\text{box},\text{phase index})=(0,0),(0,5),(1,0),(1,21)$, phase equal to index times $\pi/48$, source three, the stated centers, fixed height and exact halfwidth. Root locations are the only geometric proposals read from the subject target. The subject's floating counts and extremum-selection process are not premises; the assigned exact boxes and phases are checked directly.

## Arbitrary-phase Cartesian geometry and source derivative

At a reception with phase $\phi$, fix its radial/tangential frame, write normalized delay as $s>0$, and set $\psi=\phi-\kappa s$. Denote phase derivatives by primes. Direct differentiation gives

$$
\rho'=2(-a\sin2\phi+b\cos2\phi),\quad
p'=\frac{2(-c\sin2\phi+d\cos2\phi)}{\kappa},\quad
z'=\frac1{10}\left(-\sin\phi-\frac38\cos3\phi\right).
$$

The angular rate in normalized time is $\beta+\kappa p'$, so the factor $1/\kappa$ in $p$ cancels in its modulated rate, but not in the delayed angular displacement. With $\sigma=(-1)^j$, the source's relative angle is

$$
\alpha=j\pi/3-\beta s+p(\psi)-p(\phi).
$$

Subtracting receiver and source positions yields

$$
Q=(\rho(\phi)-\rho(\psi)\cos\alpha,
-\rho(\psi)\sin\alpha,
z(\phi)-\sigma z(\psi)).
$$

The source velocity at the emission time, expressed in this fixed reception frame, is

$$
V_s=\big(\kappa\rho'(\psi)\cos\alpha-\rho(\psi)[\beta+\kappa p'(\psi)]\sin\alpha,
\kappa\rho'(\psi)\sin\alpha+\rho(\psi)[\beta+\kappa p'(\psi)]\cos\alpha,
\sigma\kappa z'(\psi)\big).
$$

Since increasing the delay moves the source backward in time, $\partial_sQ=V_s$. Therefore the independent evaluator uses

$$
G=Q\cdot Q-s^2,\qquad
G_s=2Q\cdot V_s-2s.
$$

At a root $|Q|=s$ and $D=1-Q\cdot V_s/s=-G_s/(2s)$. Thus positive-delay ordinary roots are exactly zeros of $G$ with $G_s\ne0$. Negative $D$ is retained and does not alter the root equation. No receiver velocity is substituted for the source velocity.

The new evaluator constructs these Cartesian components and their dot product directly. It imports no subject waveform or census module. Its only imported numerical code is the previously frozen independently authored interval/census helper. The squared component evaluation and interval dot products enclose every actual point in the box; coordinate dependency may widen intervals but does not turn a parameter sample into a box proof.

## Uniform all-phase partner guards

Let $u=|a|+|b|$, $v=|c|+|d|$, $r_-=1-u$, $r_+=1+u$, and $w_+=\beta+2v$. The independent guard uses outward coefficient maxima over each entire box. The radial, angular and axial velocity components are orthogonal, so

$$
|V_s|\le V_*:=\sqrt{(2\kappa u)^2+(r_+w_+)^2+(11\kappa/80)^2}.
$$

This is uniform in phase and source. All coordinates in both boxes obey the loose exact inequalities $u<2/5$, $v<1/100$, $0<\beta<2$ and $0<\kappa<25$. They imply $r_->3/5$, $r_+<7/5$, radial speed below 20, tangential speed below 3 and axial speed below 4. Consequently $V_*<\sqrt{425}<21$.

At equal reception time distinct members have planar angles separated by a nonzero multiple of $\pi/3$, with the same radius, so their simultaneous separation is at least $r_-$. By integrating the source speed backward over delay $s$ and applying the triangle inequality,

$$
|Q_j|-s\ge r_--(V_*+1)s
>\frac35-\frac{22}{1000}=\frac{289}{500}>0
\quad(0<s\le1/1000).
$$

This proves recent exclusion for source three and every other distinct partner at every phase; it proves nothing about recent self roots, which are unnecessary to this particular obstruction. Positive radius also gives simultaneous collision avoidance among distinct members.

Every complete position has magnitude at most $\sqrt{r_+^2+(9/80)^2}$. Since

$$
\left(\frac75\right)^2+\left(\frac9{80}\right)^2
=\frac{12625}{6400}<\frac94,
$$

every complete chord is shorter than three. Thus no partner root has $s\ge3$. The independent target records sharper interval guard values, but these elementary bounds already show uniform strict recent and remote margins across both boxes and every connecting phase. No sampled speed or sampled collision check is used.

## Complete endpoint censuses

The independent helper starts with proposed root locations only. Each protected bracket has opposite strict endpoint gap signs and a derivative interval bounded away from zero, proving exactly one root by the intermediate-value theorem and monotonicity. Inclusive interval Newton intersections narrow each enclosure without losing its root. On every complement, either the whole gap interval is strictly signed or a strictly signed derivative and equal endpoint signs prove absence of roots. Exact rational adjacency checks protected and complementary intervals cover $[1/1000,3]$ with no gap or interior overlap. The guards complete the positive-delay domain.

These signs and derivative bounds are uniform over each whole closed six-coordinate box. They therefore establish the same count for every parameter vector, not merely its center.

| Box | Reception phase | Independently certified ordinary roots | Complementary intervals |
| --- | --- | ---: | ---: |
| First | $0$ | 1 | 20 |
| First | $5\pi/48$ | 3 | 44 |
| Second | $0$ | 1 | 26 |
| Second | $7\pi/16$ | 5 | 28 |

The target independently derives ten roots and 118 complementary intervals. Three roots have strictly negative source divisor and are included. Every endpoint has a complete ordinary chart for source three. There are no unresolved endpoint intervals or receptions in this independent target.

## Compact count argument, with quantifiers explicit

Fix an arbitrary parameter vector in either closed box. As phase varies over its specified closed interval, $G_3(s,\phi)$ is smooth, and every positive-delay zero stays inside the fixed compact delay interval $[1/1000,3]$ with both boundaries root-free. Suppose every zero on this phase interval were ordinary. At any fixed phase, zeros would be isolated. A closed infinite set of zeros in the compact delay interval would have an accumulation zero, contradicting nonzero delay derivative there. Hence each fiber is finite.

Around its finitely many roots, choose disjoint sufficiently small neighborhoods. The implicit-function theorem and the nonzero derivative continue exactly one local root through each neighborhood for nearby phases. On the remaining compact delay set, the absolute gap has a strictly positive minimum at the original phase; uniform continuity keeps this complement root-free for all sufficiently nearby phases. The complete count is therefore locally constant. On a connected phase interval it must be constant, contradicting the uniform endpoint counts one versus three or one versus five.

Thus there is some intermediate $s,\phi$ with $G_3=G_{3,s}=0$. The endpoint certificates are ordinary, so $\phi$ is strictly interior; the uniform guards force $s\in(1/1000,3)$. Since the fixed vector was arbitrary, the conclusion holds for every member of each box. The singular phase and delay may vary with that member; a single common singular phase is not asserted.

All relative profiles and delayed angular corrections repeat when $\phi$ increases by $2\pi$. The same geometric obstruction therefore recurs in every height cycle even if the absolute planar orientation does not return. Physical delay is $Rs$ and physical reception time is $R\phi/\kappa$ modulo $2\pi R/\kappa$; positive scaling preserves both count and nonordinary character.

A count difference of two or four does not classify a generic fold. Higher-order zeros or several events remain possible; classification needs further derivative and transversality information. Nor does a vanishing single source divisor alone prove divergence of the total canonical acceleration or decide a continuation rule. Those are distinct obligations outside this bounded review.

## Known-first evidence, independence and resources

The known stage passed and was recorded before the pilot. It verifies the static opposite-partner root $s=2$, $G=0$, $G_s=-4$, with a complete complementary census. It also verifies nine exact waveform values and first/second phase derivatives at phase zero for $a=3/10$, $b=d=\beta=0$, $c=1/1000$, $\kappa=2$, $H=1/10$:

$$
(\rho,\rho',\rho'',p,p',p'',z,z',z'')
=\left(\frac{13}{10},0,-\frac65,\frac1{2000},0,-\frac1{500},\frac1{10},-\frac3{80},-\frac1{10}\right).
$$

For the separate nonzero-phase control $a=3/10$, $b=c=d=\beta=0$, $\kappa=2$, $H=1/10$, $\phi=\pi/2$, $s=\pi/4$ and source three, the receiver/source radii are $7/10,13/10$, their relative angle is $\pi$, and direct evaluation gives

$$
Q=(2,0,9/80),\quad V_s=(0,0,3/40),\quad
G=4+81/6400-\pi^2/16,\quad G_s=27/1600-\pi/2.
$$

All quantities were narrowly enclosed. A deliberately omitted static root is rejected by the complement procedure. An exact toy reception inventory is accepted while missing, duplicated and wrong-coordinate versions are rejected. The pilot then independently certifies both receptions of the first entire box. Its measured cost supports the unchanged four-reception target. No target-first control, source revision after a target, cap increase or failed numerical stage occurred.

Both instruments use mpmath interval arithmetic. Independence concerns waveform geometry, guards, metadata and separately authored census implementation; it does not claim an independently audited arbitrary-precision arithmetic library. The frozen independent helper uses mpmath 1.3.0 at 65 decimal interval digits and records exact rational binary endpoints. No floating numerical root finder is run by the new companion, and no subject count, protected enclosure or complementary sign is imported as evidence.

| Artifact | SHA-256 |
| --- | --- |
| Frozen subject report | `51ccede4371127b3bce1fefa947904743e62c448daa6e40f7981608ab98cd9ba` |
| Frozen subject source | `82024c74526c482519018b91d48e762da93161b5bcee435eb73debe4c27235d7` |
| Subject target, exact metadata and hint locations only | `a46bb79b7ab64e3dd337c864f256254bbadb382019de52489d1fa1607a2f068b` |
| Frozen independent census helper | `f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39` |
| New independent companion | `06560fba121effe9c51628714835fc7b5942c46ad2725b7af969e493ac9cd67f` |

The subject report and source were read in full. Native `shasum -a 256` verified these identities after the independent target; the source also authenticates its helper and input before use. Native `jq` inspected all target counts, complementary intervals and negative-divisor inclusion. Local receipts are retained under `.local-data/master-equation-closure/overnight2-b/independent-fast-radial-topology/`.

| Stage | Receipt SHA-256 | Bytes | Internal seconds | Observed RSS after serialization, bytes |
| --- | --- | ---: | ---: | ---: |
| Known | `930e84cec7b598efc6d78952dde3c70ab2622860dd767ce59e87e9a8bca6c654` | 8660 | 0.107192 | 28753920 |
| Pilot | `58292d42dcc0e11dea691b198612ada40f1274a6e6b52ac07d3ed8daf5c3b94a` | 59493 | 0.354253 | 28983296 |
| Target | `3bda8372deb8b8fdf89500fdb7adedeacdfd3d0b3f90fc2becaa01c9eeb28df4` | 112469 | 0.756285 | 29474816 |

The three receipts total 180,622 bytes. Declared caps are 120 internal seconds, 180 supervised seconds, 512 MiB observed RSS, 4 MiB per receipt, 30,000 complementary leaves and one numerical/BLAS thread. The helper checks observed RSS during complement construction; this is measured accounting rather than an operating-system address-space hard limit. All stages remain well inside the declared caps.

Pilot lease `609ba16f-1168-447b-a18b-b4bb6050dd67` reports 0.427 supervised seconds, exit zero, 640 stdout bytes, zero stderr and a closed process group. Target lease `91257e10-1ad0-4734-af61-32acc232bec4` ran from `2026-10-07T10:59:51.317Z` through `2026-10-07T10:59:52.130Z`, reporting 0.827 supervised seconds, exit zero, 906 stdout bytes, zero stderr and a closed process group. Both completed before the first 15-second heartbeat interval. The known stage ran synchronously and exited zero. Numerical closure was inspected and the slot explicitly released to the parent before report writing.

Reproduction uses the shared `${AAA_VENV:-../.venv}/bin/python`, `PYTHONDONTWRITEBYTECODE=1`, and `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1`, with sequential `--stage known`, `--stage pilot`, and `--stage target`. Pilot and target use the owned-compute supervisor and a 180-second deadline. Source hashes and prior passes gate the stages, and exclusive receipt creation preserves existing evidence. The tracked companion records the required frozen input; ignored local evidence is provenance rather than a promised fresh-checkout asset. Any deliberate replay needs a separately owned fresh receipt series.

## Falsifiers and preservation boundary

An incorrect exact center or halfwidth, missing endpoint root, invalid outward derivative or gap enclosure, uncovered delay interval, or failed uniform recent/remote inequality would falsify its associated certificate. An all-ordinary connecting phase path with different complete endpoint counts under those strict guards would contradict the compact local-constancy proof. A history outside these boxes or an event lacking generic-fold properties does not contradict the accepted statement.

Only this report, its new companion, the distinct local receipts and necessary supervisor runtime records were written. Frozen subjects, proposal records, old helpers, prior reports/receipts, parent account, shared owners and corpus were not modified. Scoped whitespace checks use `git diff --no-index --check /dev/null` separately on the two new analysis files. No regular test, generator, Git mutation, recursive delegation, sidebar action or publication was performed. There is no unresolved endpoint certificate or analytical blocker in this bounded review. The parent owns integration; the ongoing allocation is not closed by this disposition.
