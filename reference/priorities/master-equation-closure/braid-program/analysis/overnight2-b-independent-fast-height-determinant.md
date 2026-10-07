# Independent fast-height phase-zero determinant review

## Accepted scope

Accepted as a computer-assisted derived exclusion on exactly the 428 selected original boxes. The independently authored [companion](overnight2-b-independent-fast-height-determinant.py) certified complete phase-zero root counts $(1,3,1,1,1,1)$ and a strictly positive radial/axial determinant on all 256 lower-height cells and the same 172 upper-height cells selected by the frozen subject. There were no unresolved boxes within this independent target. The subject's other 84 upper-height cells were not evaluated here and remain outside acceptance.

The family, with alternating polarities and $K=c_f=1$, is

$$
X_j(t)=R\bigl(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^jH[\cos(\kappa\tau)-\tfrac18\sin(3\kappa\tau)]\bigr),\qquad \tau=t/R,
$$

where $R>0$ and $182643/100000\le\beta\le182644/100000$. The entire closed slab $H\in[49/1000,51/1000]$, $\kappa\in[8,32]$ is excluded at every positive scale. The upper slab $H\in[99/1000,101/1000]$ is excluded only on its 172 specified closed frequency cells. This is a complete all-root obstruction at reception phase zero; it neither certifies a full-period ordinary chart nor asserts a trajectory's existence, stability or fate.

The review used the Moore lens and Specialist charter without assigning proof authority to a role. The parent [research account](overnight2-b-followup-and-research-2026-10-07.md) owns integration.

## Independently reconstructed geometry

At normalized reception time zero, use the receiver's current radial/tangential plane coordinates. For source $j$, set $s_j=(-1)^j$, $w=-\kappa d$ and $\alpha=j\pi/3-\beta d$. Direct evaluation of the prescribed profile and its source-time derivative gives

$$
z_s=H(\cos w-\tfrac18\sin3w),\qquad
v_{s,z}=-s_jH\kappa(\sin w+\tfrac38\cos3w).
$$

The source-time derivative is evaluated before substituting the negative emission phase; it is not the derivative with respect to positive delay. Factoring the common height amplitude yields

$$
Z=H[1-s_j(\cos w-\tfrac18\sin3w)],\qquad
Q=(1-\cos\alpha,-\sin\alpha,Z).
$$

The planar source velocity is $(-\beta\sin\alpha,\beta\cos\alpha)$. Its dot product with the planar separation simplifies to $-\beta\sin\alpha$, so

$$
G=2(1-\cos\alpha)+Z^2-d^2,
\qquad
G_d=2[-\beta\sin\alpha+Zv_{s,z}-d].
$$

The independent evaluator uses the interval square $Z^2$, including its nonnegative lower endpoint when $Z$ straddles zero. It does not replace the square by an independent product of two copies. Factoring $H$ in $Z$ also preserves that exact common amplitude before interval evaluation. These are separately derived enclosures rather than replayed subject intervals.

At a causal root, $|Q|=d$ and

$$
D=1-\frac{Q\cdot V_s}{d}=-\frac{G_d}{2d},\qquad
a_j=\frac{s_jQ}{d^3|D|}=\frac{2s_jQ}{d^2|G_d|}.
$$

The companion intersects the interval evaluations of these two identical row expressions component by component. Each contains the true row; their intersection therefore retains it. The source velocity supplies the divisor. Receiver velocity is not substituted, and a negative signed source divisor is retained inside the absolute denominator.

For the quarter-height-cycle control $H=1/10$, $\kappa=2$, $d=\pi/4$, the emission phase is $w=-\pi/2$. Thus $\cos w=0$, $\sin3w=1$, $z_s=-H/8$, the self axial separation is $9H/8=9/80$, and $v_{s,z}=H\kappa=1/5$. These exact values independently fix both delayed signs.

## Complete recent and remote exclusions

The recent guards use planar geometry only. Large axial velocity does not invalidate them or need to be bounded by one.

For a self source and $0<d\le1/4$, its planar chord has length $2\sin(\beta d/2)$. The global interval satisfies $\beta>9/5$ and $\beta<15/8$, so $0<\beta d/2<15/64<1/4$. The sine remainder inequality on this interval gives

$$
\frac{|Q|}{d}\ge\frac{2\sin(\beta d/2)}d
\ge\beta\left(1-\frac{(\beta d/2)^2}{6}\right)
>\frac95\frac{95}{96}=\frac{57}{32}>1.
$$

Thus the full self distance-minus-delay gap is positive throughout the recent interval. For each partner, simultaneous planar separation is at least one and planar source speed is $\beta$. By the planar triangle inequality,

$$
|Q|-d\ge1-(1+\beta)d>1-\frac{23}{32}=\frac9{32}>0.
$$

The complete height profile obeys $|z|\le9H/8\le909/8000<1/8$. Every root consequently satisfies

$$
d\le2\sqrt{1+(9H/8)^2}<\frac{\sqrt{65}}4<3.
$$

This bounds the entire positive-delay past, not merely an inspected history window. All remaining possible roots lie in $[1/4,3]$, including self roots and every branch in the three-root partner channel.

For every channel and parameter box, uniform opposite endpoint signs and a strict derivative sign prove exactly one ordinary root in each protected bracket. Inclusive interval Newton contraction retains every root in that bracket. The complement is certified by strict gap sign or by a strict derivative together with equal strict endpoint signs. Exact rational adjacency of the protected brackets and complementary pieces verifies coverage of the whole finite delay interval. Rough guide locations are only bracket-search hints; the endpoint, derivative and complement tests supply the evidence.

The target retains 3424 root certificates and 19549 complementary intervals. Native `jq` inspection confirmed all 428 source-count vectors equal $(1,3,1,1,1,1)$ and every channel has an exact complete cover. Each box retains one self root. Partner channel one has signed-divisor order $(+,-,+)$, with 428 negative-divisor rows retained across the target. A parity checksum or successful root iteration alone would not establish this completeness.

## Scale incompatibility and exact parameter inventory

At phase zero, direct differentiation of the prescribed path yields

$$
L_r=-\beta^2,\qquad L_t=0,\qquad L_z=-H\kappa^2.
$$

The third-sine term has zero second derivative at this reception. Physical prescribed acceleration is $L/R$ and the canonical sum is $A/R^2$, so exactness requires $RL=A$. Eliminating the common scale between the radial and axial equations gives the necessary condition

$$
\mathcal D=A_rL_z-A_zL_r=0.
$$

Every independent target interval for $\mathcal D$ is strictly positive. Thus neither a positive scale nor any other nonzero common scale can satisfy both equations at that reception. No tangential balance, least-squares fit or floating proposal output is required for this obstruction.

Each slab has the fixed exact cells

$$
C_k=[8+3k/32,\;8+3(k+1)/32],\qquad k=0,\ldots,255.
$$

The independent metadata audit checks the ordered $(\mathrm{slab},k)$ inventory for all 512 original boxes, every height endpoint, the beta endpoints as rational numbers, every frequency cell against this formula, positive widths, exact shared closed endpoints and the outer endpoints 8 and 32. This is an exact partition audit, not just a volume comparison. Subject exclusion flags select which fixed boxes are assigned to this review; they do not supply determinant signs or root enclosures. The selected counts were independently checked as 256 and 172 before numerical evaluation.

The independently certified upper-slab set consists precisely of the cells in $\{0,\ldots,255\}$ outside the following unchanged 84-index list, written as inclusive ranges:

$$
57\text{--}58,\quad91\text{--}97,\quad100\text{--}105,\quad126\text{--}135,\quad145\text{--}151,\quad163\text{--}173,\quad190\text{--}197,\quad199\text{--}211,\quad233\text{--}252.
$$

The target also stores that exact outside-review inventory explicitly. Native `jq` comparison returned identical selected indices, heights and frequency endpoints and identical outside-review indices against the frozen subject target. No parameter subdivision, accepted-set expansion or interpolation through unresolved cells occurred. Shared boundary points retain the inclusion supplied by adjacent accepted closed cells; no conclusion about the interior of an unreviewed cell follows.

## Independent controls and preserved metadata failure

The new companion imports only the frozen [independent interval/census helper](overnight2-b-independent-superwake-norm-chart.py). Its geometry and acceleration evaluator were authored separately. No subject source or numerical enclosure is imported. Both implementations share `mpmath` 1.3.0 interval arithmetic; the independent run uses 65 decimal digits. This establishes implementation-level geometric and root-cover independence, not independently implemented transcendental arithmetic.

The initial known controls passed and were recorded before any target metadata was processed. They included an exact eight-cell partition; rejection of missing, duplicate and overlapping partitions; complete static partner roots with squared delays $1,3,4,3,1$; static acceleration

$$
(A_r,A_t,A_z)=(-5/4+1/\sqrt3,0,0);
$$

the quarter-height-cycle values above; the independently accepted flat eight-root chart with its negative divisor; and omitted-root rejection. The static radial formula follows by summing two odd adjacent rows contributing $-1$ in total, two even rows contributing $1/\sqrt3$, and the opposite odd row contributing $-1/4$. Static self absence is separately checked on the finite delay domain and follows analytically from $G=-d^2$ for all positive delay.

The initial pilot stopped before evaluating a single box. Its metadata check compared the literal subject string `182644/100000` against the reduced spelling `45661/25000`. This was an instrument parsing defect, not a root, determinant or physical failure. The initial source bytes were preserved as `instrument-initial.py`, and both `known.json` and failed `pilot.json` remain untouched. The failed pilot records `completed=false`, `passed=false`, an empty results list and `ValueError('beta mismatch')`.

The correction compares beta endpoints as exact `Fraction` values, adds an equivalent-rational known control and writes subsequent receipts under a distinct `-rational-metadata` suffix. Geometry, arithmetic precision, fixed boxes and budgets were unchanged. All known controls passed again and were recorded before the corrected pilot. The corrected pilot used exactly lower-slab indices 0, 127, 255 and upper-slab indices 0, 255. All five passed. Its measured cost and size supported the unchanged 428-box target. The target source-hash gates require both the fresh known pass and corrected pilot pass.

## Measured resources and supervisor closure

| Stage | Internal seconds | Supervised seconds | RSS after serialization, bytes | Receipt bytes |
| --- | ---: | ---: | ---: | ---: |
| Initial known | 0.20406329073011875 | synchronous | 29392896 | 66028 |
| Failed metadata pilot | 0.07397999987006187 | 0.134 | 117473280 | 768 |
| Corrected known | 0.21508245868608356 | synchronous | 29442048 | 66028 |
| Corrected five-box pilot | 0.800371624995023 | 0.863 | 117784576 | 356386 |
| Corrected 428-box target | 59.33891862491146 | 59.494 | 176128000 | 28510622 |

The target receipt records pre-serialization RSS 118358016 bytes; final stdout records the larger post-serialization peak in the table. The five receipts total 28999832 bytes, and the preserved initial source adds 11673 bytes, for 29011505 bytes of retained local review files excluding the supervisor's separate operational logs. Native `wc -c` measured these sizes.

Declared caps remained 120 internal seconds, 180 supervised seconds, 512 MiB memory, 32 MiB per receipt and one numerical thread. The shared venv ran with bytecode disabled and numerical/BLAS thread variables set to one. No budget increase or parameter subdivision occurred. The helper's finite complement-cell cap was not reached.

The failed pilot supervisor `8181cc6e-0759-40bc-bfd7-aa77ee2aa9d0` closed with exit one, zero stderr and `processGroupClosed=true`; it retained 451 stdout bytes. Corrected pilot supervisor `02153e8d-c30a-4a21-8c49-3d89e6e9e5bc` and target supervisor `7bb8e6ad-934f-442d-90ea-d11816b66397` closed with exit zero, zero stderr and closed process groups; their stdout sizes were 1092 and 56032 bytes. The target started at 2026-10-07T09:53:08.944Z, had an advanced heartbeat at 09:53:53.953Z and finished at 09:54:08.425Z. Per-box progress was flushed, and an authenticated-running lease with an earlier advanced heartbeat was inspected during execution. The numerical slot was explicitly released after completed-target inspection.

## Identities and retention

| Artifact | SHA-256 |
| --- | --- |
| Frozen subject report | d344166b96f06f6b76fdd0881bbf806568414a645846f9df7b0c6b87cc193bba |
| Frozen subject source | b5fb9800d5648fec9f8b123b23687b06a4c418fe6bb23ffda7b2772b72909561 |
| Frozen subject target | e7e8520975a7a4a72dced5318810c49acef13dd8c5aa7f9ec7020c0d59669bed |
| Frozen independent helper | f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39 |
| Preserved initial independent source | b3a501ab6cc1062c83819f54f7c790e429ff6683ccb011dde075fa84eaa10dbb |
| Corrected independent source | 721a07f3e70df968f8677eaf79c381f497395fcb0e2b0a5716574a31956521d2 |
| Initial known receipt | 8b1af59bdac1184d19d5dde518ab9b098cb6eb3572f20a571288dfd3f98c14f9 |
| Failed metadata pilot receipt | b2a1b4cbc9ab33d3c30f4c7e3c2d1dca867ad3a8c9cff67c69b4036ce2d4cbb9 |
| Corrected known receipt | b5ce6ef9e2d3c1dc1b5e8f40b714af9cf8904a8b72316ac58caf6c9672c266d5 |
| Corrected pilot receipt | 1b5c0c0336f8f385795a802099ba2a11ef43547a30a48687907d959c28bd5d5b |
| Corrected target receipt | d640717574a04246cdda6f2b9363d0cdee00c9ce466184c31eb0a238b93f825e |

All review receipts and the initial source snapshot remain in `.local-data/master-equation-closure/overnight2-b/independent-fast-height-determinant/`; leases and logs remain with the existing supervisor owner. The current linked companion and frozen independent helper form the reproducer. The initial source snapshot records old bytes and is not a relocated executable entrypoint. Exclusive receipt creation prevents overwriting these runs. These local paths supply provenance, not public CI dependencies or a remote archive-recovery claim.

Native hashing rechecked the subject report, subject source, subject target and independent helper against their frozen identities after the run. All prior subjects, instruments, reports, receipts, parent account, corpus and shared owners remained read-only. New writes were limited to this report, its companion, their distinct runtime evidence and the required supervisor records. No recursive delegation, sidebar chat, Git mutation, generator, deletion or evidence relocation occurred.

## Falsifiers and remaining limits

A wrong source-time derivative, false recent planar guard, missing positive-delay self or partner root, invalid protected bracket/complement enclosure, signed rather than absolute divisor, incorrect interval square, defective outward arithmetic, gap in the exact parameter cover, or determinant enclosure containing zero would defeat the corresponding acceptance. Every root, source divisor, acceleration row, complement and determinant needed for scrutiny is retained in the target. An exact complete history in one of the accepted boxes would directly refute the combined result.

The 84 unreviewed upper-height cells remain unresolved by this review, and their subject failures are preserved rather than classified as physical failures. No full-period ordinary chart, unrestricted fast-height exclusion, orbit existence, stability, continuation or global fate is inferred. This bounded review is complete; parent integration remains separate from the ongoing research allocation.
