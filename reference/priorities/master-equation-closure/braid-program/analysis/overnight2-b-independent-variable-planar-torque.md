# Independent varying-radius and phase-rate torque review

## Verdict and scope

Accepted as a computer-assisted derived positive tangential acceleration bound, together with its derived finite-duration and residual implications. The [independent companion](overnight2-b-independent-variable-planar-torque.py) certified all 64 unchanged beta cells: 320 partner roots, 893 complementary intervals, zero unresolved cells and a strictly positive common partner margin. Every ordinary self contribution is positive by the independent angle argument below. There is no repair required to the subject theorem within its stated complete-history and ordinary-sum premises.

The histories are

$$
X_j(t)=R\bigl(\rho(\tau)\cos(\theta(\tau)+j\pi/3),\rho(\tau)\sin(\theta(\tau)+j\pi/3),(-1)^jz(\tau)\bigr),\qquad \tau=t/R,
$$

with alternating polarities, $K=c_f=1$, fixed $R>0$, $\theta=\beta\tau+p$, and $\rho,p,z$ complete $C^2$ functions. The exact reviewed bounds are

$$
\frac35\le\beta\le\frac75,\qquad e=\frac1{1000},\qquad
|\rho-1|,|\dot\rho|,|\dot p|\le e,\qquad |z|\le\frac15,\quad |\dot z|\le\frac25.
$$

Dots refer to normalized time. Differentiating $X=Rx(t/R)$ shows that these normalized first derivatives determine physical velocity without an additional scale factor. All position and velocity bounds apply throughout the complete history. No bound on $p$ itself, periodicity, or uniform second-derivative bound is used. Ordinary positive-delay self and partner roots all remain in the canonical equation. The result excludes an unbounded exact future within these bounds, and bounds any finite interval of regular exactness. It does not assert that any such exact interval exists.

The Moore role was used as an analytical lens, not a source of mathematical authority. Integration belongs to the parent [research account](overnight2-b-followup-and-research-2026-10-07.md).

## Independent Cartesian derivation

Rotate the reception plane into the receiver's current radial and tangential frame. Define

$$
r=\rho(\tau),\quad s=\rho(\tau-d),\quad
\alpha=\frac{j\pi}{3}-\int_{\tau-d}^{\tau}\omega(v)\,dv,\quad
\omega=\beta+\dot p,\quad Z=z(\tau)-(-1)^jz(\tau-d).
$$

Then

$$
Q=(r-s\cos\alpha,-s\sin\alpha,Z).
$$

If $v_r=\dot\rho(\tau-d)$ and $\omega_s=\omega(\tau-d)$, the delayed source velocity is

$$
V_s=(v_r\cos\alpha-s\omega_s\sin\alpha,
v_r\sin\alpha+s\omega_s\cos\alpha,(-1)^j\dot z(\tau-d)).
$$

At fixed reception, $\partial_dQ=V_s$. The source radial derivative is $v_r$, while the delay derivative of $s$ is $-v_r$; keeping these distinct gives

$$
Q\cdot V_s=v_r(r\cos\alpha-s)-rs\omega_s\sin\alpha+Z(-1)^j\dot z(\tau-d).
$$

The independently implemented squared gap uses the equivalent chord formula

$$
G=(r-s)^2+2rs(1-\cos\alpha)+Z^2-d^2,
$$

$$
G_d=2v_r(r\cos\alpha-s)-2rs\omega_s\sin\alpha
+2Z(-1)^j\dot z(\tau-d)-2d.
$$

For an actual root $|Q|=d$, the signed source divisor and tangential row are

$$
D=1-\frac{Q\cdot V_s}{d}=-\frac{G_d}{2d},\qquad
a_{t,j}=\frac{(-1)^{j+1}s\sin\alpha}{d^3|D|}
=\frac{2(-1)^{j+1}s\sin\alpha}{d^2|G_d|}.
$$

The receiver velocity does not replace $V_s$ in these formulas. The independent row evaluator intersects the interval evaluations of the two displayed identical row expressions. Both contain the actual row, so the intersection remains valid. Every accepted partner root has positive signed divisor; self rows use the absolute divisor irrespective of sign.

For a beta cell $B$, the average angular rate over a delay and the source's instantaneous rate both lie in $W=B+[-e,e]$. Thus $\alpha\in j\pi/3-Wd$. Using the same interval $W$ for both quantities imposes no equality between them: interval multiplication encloses all their allowed joint values, with dependency discarded conservatively. Likewise both radii lie in $[1-e,1+e]$, but need not be equal. The bound $(r-s)^2\in[0,4e^2]$ is valid independently of their correlation. Height contributes $Z^2\in[0,4h^2]$ and $2Z(-1)^j\dot z_s\in[-4hu,4hu]$, with $h=1/5,u=2/5$. This explains both the validity and the improved width of the independent chord enclosure. Absolute phase cancels completely; only its integrated increment enters.

## Complete partner roots and partition audit

The maximum source speed obeys

$$
V_*^2\le e^2+(1+e)^2(7/5+e)^2+u^2<\frac94.
$$

The final strict inequality was checked as an exact rational known control. Simultaneous partner planar separation is at least $1-e$. Consequently for $0<d\le1/4$,

$$
|Q(d)|-d\ge(1-e)-(1+V_*)d>
\frac{999}{1000}-\frac58=\frac{187}{500}>0.
$$

Complete-history position bounds imply for every root, including self roots,

$$
d\le2\sqrt{(1+e)^2+h^2}<\frac{21}{10}<3.
$$

The strict squared comparison is $4((1001/1000)^2+1/25)<441/100$, also a recorded rational control. Therefore the numerical partner cover $[1/4,3]$ plus the recent analytical guard accounts for the entire positive-delay past.

For each beta cell and each partner, strict opposite endpoint signs and a strictly negative derivative certify existence and uniqueness of an actual root in a protected bracket for every admissible history. Inclusive interval Newton contraction retains that root. Complementary intervals are excluded by strict gap sign or by monotonicity with equal strict endpoint signs. The independent helper checks exact rational adjacency of the protected brackets and all complementary pieces from $1/4$ to $3$. A rough root hint never substitutes for these certificates. No past segment is discarded and no phase sample is treated as a history-wide proof.

The exact beta cells are

$$
B_k=[3/5+k/80,\;3/5+(k+1)/80],\qquad k=0,\ldots,63.
$$

The independent partition checker verifies every endpoint against this formula, the complete ordered index inventory, strict positive widths, exact adjacency, disjoint interiors and the outer endpoints. This proves a closed cover, rather than merely matching total width. Native `jq` comparison of the frozen subject target and the independent target returned identical indices and exact beta boxes for all 64 cells. No beta subdivision, expansion or other domain change occurred. Subdivision within the finite delay complement is part of the declared complete-root certification.

Measured by the independent target, every cell has five complete ordinary partner channels and a positive partner sum. The exact common lower endpoint is

$$
m=\frac{27384205617934978874192809652992363566068968954038614878859577499}{105312291668557186697918027683670432318895095400549111254310977536}>0,
$$

attained at cell zero. Thus $A_{t,\mathrm{partner}}\ge m$ at every reception for every allowed complete history. This independently calculated margin may be used in the duration bound; it is not copied from the subject.

## Self roots, exact balance and duration

For every self root, let $\delta=\int_{\tau-d}^{\tau}\omega(v)\,dv$. Since $\beta-e\ge599/1000>0$ and every root has $d<21/10$,

$$
0<\delta\le(\beta+e)d<\frac{1401}{1000}\frac{21}{10}
=\frac{29421}{10000}<3<\pi.
$$

The self tangential separation is $s\sin\delta>0$, and $s\ge999/1000$. Positive self polarity and $|D|$ make every ordinary self contribution positive, including those with negative signed divisor. This reasoning covers every possible self delay and requires no numerical self census. A nonordinary root or undefined canonical sum is outside the ordinary exactness premise, not silently omitted. A divergent positive self sum cannot cancel the positive partner sum into a finite prescribed acceleration. Therefore wherever the complete ordinary canonical sum is well defined, $A_t\ge m>0$.

Direct differentiation of the planar path gives

$$
L_t=2\dot\rho\,\omega+\rho\dot\omega,
\qquad J=\rho^2\omega,\qquad \dot J=\rho L_t.
$$

These are kinematic identities, with no imported conservation or physical energy premise. The scaling $X=Rx(t/R)$ gives physical prescribed acceleration $L/R$ and canonical acceleration $A/R^2$, so exactness is $RL=A$. Hence

$$
\dot J=\frac{\rho A_t}{R}\ge\frac{(1-e)m}{R}.
$$

Positivity of $\omega$ also gives

$$
(1-e)^2(\beta-e)\le J\le(1+e)^2(\beta+e).
$$

Expanding the difference yields exactly

$$
\Delta_\beta=(1+e)^2(\beta+e)-(1-e)^2(\beta-e)
=4\beta e+2e+2e^3.
$$

On any connected exact interval of normalized length $T$, integration gives

$$
T\le\frac{R\Delta_\beta}{(1-e)m}.
$$

For open intervals, apply the inequality to compact subintervals and take their lengths to $T$. Physical elapsed duration is $RT$, so its bound is $R^2\Delta_\beta/((1-e)m)$. Since $R$ is fixed and positive, no unbounded exact future can remain inside these bounds. Large $R$ can enlarge the finite allowance; no uniform duration independent of scale is claimed.

For $E_t=RL_t-A_t$ and $\varepsilon=\sup_I|E_t|$, if $\varepsilon<m$ then

$$
\dot J=\frac{\rho(A_t+E_t)}R
\ge\frac{(1-e)(m-\varepsilon)}R.
$$

Integration yields

$$
\sup_I|E_t|\ge m-\frac{R\Delta_\beta}{(1-e)T}
$$

when the right side is positive. If $\varepsilon\ge m$, this inequality already holds; an infinite supremum is also harmless. The physical acceleration residual is $E_t/R^2$, so this is a normalized residual bound with explicit scale dependence. The argument uses no absolute bound on $p$, no periodicity and no uniform bound on $\ddot\rho$, $\ddot p$ or $\ddot z$.

## Known-first sequence and independence

The new companion imports only the unchanged [independent interval helper](overnight2-b-independent-superwake-norm-chart.py). Its Cartesian/chord geometry and tangential evaluator were authored separately. It imports no subject or proposal code. The subject target supplies only original index/beta metadata, independently audited against the exact formula. Its root brackets, source divisors and signs are not used as evidence.

Known controls passed and were recorded before the pilot: exact eight-cell partition acceptance; missing, duplicate and overlap rejection; unequal-radius diametric values $G=21,G_d=-5$ for $r=2,s=3,d=2,v_r=1/10,\omega_s=0$; an additional quarter-turn case $G=9,G_d=-38/5$ with $\omega_s=1/4$; static five-partner cancellation and squared delays $1,3,4,3,1$; the independently derived [flat unit-circle torque bound](overnight2-b-independent-unit-circle-bounded-height.md) $A_t>1/10$; omitted-root rejection; and exact rational speed, diameter and self-angle guards. The quarter-turn control tests the source angular term that vanishes at a diametric chord.

The four-cell pilot used precisely indices 0, 21, 42 and 63. All four passed, and its measured cost was inspected before running the unchanged 64-cell target. Prior-stage pass and source-hash gates prevent target-first use. All stages used the same companion bytes. There were no failed numerical stages or source revisions after the known pass.

The arithmetic dependency remains `mpmath` 1.3.0 interval arithmetic at 65 decimal digits. Independent geometry and certificates do not establish independent transcendental arithmetic; this shared-library boundary remains explicit.

## Resources, identities and preservation

| Stage | Internal seconds | Supervised seconds | RSS after serialization, bytes | Receipt bytes |
| --- | ---: | ---: | ---: | ---: |
| Known | 0.07786979107186198 | synchronous | 29048832 | 38879 |
| Pilot | 0.17642558319494128 | 0.240 | 33800192 | 92415 |
| Target | 2.614686666056514 | 2.683 | 37109760 | 1448578 |

The target receipt records 35635200 bytes before serialization; the final instrument stdout records the higher value in the table. All three receipts total 1579872 bytes. Declared limits were 120 internal seconds, 180 supervised seconds, 512 MiB memory, eight MiB per receipt and one numerical thread. The shared venv ran with bytecode disabled and numerical/BLAS thread variables set to one. No budget enlargement occurred.

Pilot supervisor `7d334ccf-2a71-411a-8c28-11005a3a0fb2` and target supervisor `cdcd9eba-c32a-4548-84ea-cc87112e86f8` both closed with exit zero, zero stderr and `processGroupClosed=true`. Their stdout sizes were 419 and 421 bytes. The target started at 2026-10-07T09:31:54.439Z and finished at 2026-10-07T09:31:57.108Z. Both completed before the first 15-second heartbeat; no advancing timed-heartbeat claim is made. The numerical slot was explicitly released after target inspection.

| Artifact | SHA-256 |
| --- | --- |
| Frozen subject report | d7c1d07c8df979ca18784ddc81809262448e910c6414ceebacd6badd2acbb1bd |
| Frozen subject source | c738b95020369cb6a282b005e30222e01c85fe1433b834ed012a2f4e441e786e |
| Frozen subject target | 78cd8b2a35f025f1a7f84fc592c73999494091fc6041dd40f999db561e7ed2e3 |
| Frozen independent helper | f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39 |
| New independent companion | 23f5f94f7421a2ad983e585795309ca31f79a2170fc692f079bdca884c7a5645 |
| Independent known receipt | a3860b46739e9cd3b1212f1891cc8c99e9e63977b6981524448eb5ca6e1d5d09 |
| Independent pilot receipt | 374c6b2bcbee63d1e09578b39c91f31ef0d4c31bfc0cf17c9b21d13a94123c87 |
| Independent target receipt | 91edd92e8e0bebe0c4dc6a91cd72fbead9c76e36e8193411dfaa55929a9b6f84 |

Receipts `known.json`, `pilot.json` and `target.json` remain under `.local-data/master-equation-closure/overnight2-b/independent-variable-planar-torque/`; supervisor leases and logs remain under their existing local owner. These local paths are provenance, not public CI dependencies. Reproduction uses the linked source and frozen independent helper with sequential known, pilot and target stages; exclusive receipt creation protects retained runs. Original subjects, prior instruments/reports/receipts, parent account and shared owners were not edited. New durable writes are confined to this report and its companion, plus their distinct runtime evidence and supervisor records. No Git mutation, generator, recursive delegation, deletion, relocation or archive-recovery claim occurred.

## Falsifiers and limits

A wrong source radial-velocity sign, an incorrect angle-integral enclosure, an omitted partner root, a false complement or interval certificate, a nonpositive partner sum, a hole in the exact beta cover, a nonpositive self numerator under the displayed delay bound, or a scale/J-derivative error would defeat the conclusion. The receipt retains all root and complement evidence needed to inspect the computational claims. A regular exact history satisfying every displayed premise beyond the duration bound would refute the combined result.

The bound does not imply pointwise kinematic impossibility, because a variable planar history can have positive prescribed tangential acceleration for a finite time. It excludes sustained exactness beyond the derived duration. Larger radius/rate deviations, incomplete past bounds, nonordinary events, undefined canonical sums, or changing $R$ are outside the reviewed theorem. No existence, stability, continuation or global-fate conclusion is inferred. This bounded review is complete; parent integration and the ongoing allocation remain separate.
