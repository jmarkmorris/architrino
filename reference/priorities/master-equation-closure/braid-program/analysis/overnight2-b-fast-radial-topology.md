# Nonordinary receptions near two rapid radial preparations

## Statement and boundary

**Subject result, pending independent reconstruction:** each of two closed six-parameter boxes contains only prescribed histories that encounter a nonordinary positive-delay root in partner channel three during a specified phase interval. The first box has one ordinary root at phase zero and three at phase $5\pi/48$. The second has one at zero and five at $7\pi/16$. Complete endpoint censuses and uniform recent and remote exclusions force an intermediate simultaneous zero of the causal gap and its delay derivative.

This result would exclude an everywhere-ordinary exact reference throughout these boxes without testing acceleration balance. It does not classify the event as a generic fold, supply an event continuation, assert a singular acceleration sum, or describe the fate of an actual solution. The preparations are complete prescribed paths. Only one partner channel is needed for the obstruction; there is no claim of a complete six-channel chart here. The underlying canonical scenario retains $K=c_f=1$, every ordinary positive-delay self and partner root and the absolute source divisor.

## Complete family and exact boxes

Let $R>0$, $\tau=t/R$, $\phi=\kappa\tau$, and for $j=0,\ldots,5$ set

$$
X_j(t)=R\big(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],
\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)\big),
$$

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=\frac{c\cos2\phi+d\sin2\phi}{\kappa},\qquad
z=\frac1{10}\left(\cos\phi-\frac18\sin3\phi\right).
$$

The six independent coordinates are $(a,b,c,d,\beta,\kappa)$. Around each center below use a closed halfwidth $2^{-24}$ in every coordinate. All displayed decimals are exact rational numbers, including their exponents.

| Coordinate | First center | Second center |
| --- | --- | --- |
| $a$ | 0.3136968886638644 | 0.35002757224908015 |
| $b$ | -0.010876187144810699 | -0.000003414150007291214 |
| $c$ | 0.0008384905733558252 | 3.251348274927906e-7 |
| $d$ | 0.0010679727374362854 | 1.256393741976146e-7 |
| $\beta$ | 1.8461447020546873 | 1.8264752780900957 |
| $\kappa$ | 16.125422731863043 | 23.99918856908369 |

These centers come from the [failed radial search](overnight2-b-fast-radial-search.md). Its sample only selected the first minimum-count and first maximum-count receptions in partner channel three. Exact phases are index times $\pi/48$; their indices are $(0,5)$ and $(0,21)$. The continuous result depends on interval certificates, not on the floating count labels or optimizer.

## Causal geometry and global guards

At a reception phase $\phi$, use the receiver's radial/tangential frame and normalized delay $s>0$. Define source values at $\phi_s=\phi-\kappa s$ and angle

$$
\alpha_j=j\pi/3-\beta s+p(\phi_s)-p(\phi).
$$

Writing primes for phase derivatives, the separation and source velocity are

$$
Q_j=(\rho-\rho_s\cos\alpha_j,-\rho_s\sin\alpha_j,z-(-1)^jz_s),
$$

$$
V_j=\big(\kappa\rho'_s\cos\alpha_j-\rho_s(\beta+\kappa p'_s)\sin\alpha_j,
\kappa\rho'_s\sin\alpha_j+\rho_s(\beta+\kappa p'_s)\cos\alpha_j,
(-1)^j\kappa z'_s\big).
$$

The causal gap and delay derivative are

$$
G_j=|Q_j|^2-s^2,\qquad
\partial_sG_j=2Q_j\cdot V_j-2s.
$$

At a root the signed source divisor is $D_j=-\partial_sG_j/(2s)$. Its nonzero sign may be positive or negative; no sign is discarded.

For every phase, let $r_-=1-|a|-|b|$, $r_+=1+|a|+|b|$ and $w_+=\beta+2(|c|+|d|)$. A uniform source-speed bound is

$$
V_*=\sqrt{[2\kappa(|a|+|b|)]^2+(r_+w_+)^2+(11\kappa/80)^2}.
$$

Distinct members have simultaneous separation at least $r_-$ because their planar angles differ by a nonzero multiple of $\pi/3$. Thus for $0<s\le1/1000$,

$$
|Q_j|-s\ge r_--(1+V_*)/1000>0.
$$

The complete diameter is bounded by $2\sqrt{r_+^2+(9/80)^2}<3$, so there are no roots with $s\ge3$. These strict interval inequalities are checked throughout each box and hold at every reception, including all phases between the selected endpoints. Collision avoidance and compactness of the root domain therefore hold without a sampled assumption.

## Why unequal counts force a nonordinary reception

Fix any one parameter vector in either box. If every root of channel three remained ordinary throughout the closed phase interval, the implicit-function theorem would continue each root locally as a unique smooth function of phase. Every reception has only finitely many roots: an infinite sequence in the fixed compact delay interval would have an accumulation root, contradicting its nonzero delay derivative.

Compactness also prevents extra roots from appearing away from the locally continued roots. Otherwise a sequence of new roots approaching a reception would converge to an endpoint root and violate local uniqueness. The strict recent and remote exclusions prevent entry through the delay endpoints. Consequently the root count is locally constant in phase and hence constant on the connected interval.

The complete endpoint counts disagree. Therefore some strictly intermediate phase has $G_3=\partial_sG_3=0$ at a positive delay in $(1/1000,3)$. This proof applies separately to every parameter vector in the closed box because the endpoint certificates and boundary guards are uniform. Each full height cycle repeats the same relative geometry. Positive physical scaling changes neither the normalized gap equation nor this obstruction.

## Instrument and evidence

The [subject companion](overnight2-b-fast-radial-topology.py) reconstructs the arbitrary-phase Cartesian geometry and imports frozen interval-waveform and census helpers. Floating roots from a separate frozen proposal instrument supply locations only. Each protected bracket has opposite strict endpoint signs and a derivative enclosure excluding zero. Interval Newton contraction encloses its unique root. The complete complementary partition uses a strict gap enclosure or a monotone derivative with same-sign endpoint gaps. No unexamined interval remains.

Known controls passed before pilot use: static opposite-partner root and derivative, independently specified waveform derivatives, exact nonzero-phase source geometry and derivative, rejection of an omitted static root, and deterministic first-extremum selection on a toy list. The exact arbitrary-phase control has $Q=(2,0,9/80)$ and $V=(0,0,3/40)$, giving $G=4+81/6400-\pi^2/16$ and $G_s=27/1600-\pi/2$.

| Evidence | SHA-256 |
| --- | --- |
| Subject companion | 82024c74526c482519018b91d48e762da93161b5bcee435eb73debe4c27235d7 |
| Frozen census helper | a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a |
| Frozen floating hints | 8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1 |
| Input proposal receipt | 0877e6ee9075080b014c71cfcc63a0c7050847bc27eaa7e4e3440095c3c1ed18 |
| Known receipt | 1c694f7fa56586eecc696f768bc24b4711f3a036374cc9544a91ba5b5442adc7 |
| Pilot receipt | 279e8dd7361b8d4ff405f85eb947e04e14afdf28555d773197830324ae3f987e |
| Target receipt | a46bb79b7ab64e3dd337c864f256254bbadb382019de52489d1fa1607a2f068b |

Original JSON receipts live in local ignored storage under .local-data/master-equation-closure/overnight2-b/fast-radial-topology. Native jq inspection records all four complete endpoint censuses, ten roots in total and 117 complementary leaves. The target measured 1.149697 internal seconds, 1.239 supervised seconds and 80,592,896 bytes maximum RSS. Its 92,233-byte receipt brings the three receipts to 144,755 bytes by native wc. Supervisor 69f85aa8-adf7-4c61-b90a-76e513827902 closed with exit zero, zero stderr and a closed process group.

Reproduce known, pilot and target sequentially with the shared venv, single-thread numerical environment and this companion's --stage argument. Existing receipts are exclusive-create and must be preserved; use a separately owned output destination for a deliberate new reconstruction. Limits were 120 internal seconds, 180 supervised seconds, 512 MiB, four MiB per receipt and 50,000 complementary leaves. No frozen helper was changed. Shared mpmath interval arithmetic is a dependency, not an independently audited arithmetic oracle.

A failed independent root census, invalid recent/remote inequality, missing complementary interval or error in the local-constancy argument would overturn the result. An ordinary history outside these two boxes does not contradict it. Independent reconstruction is required before acceptance into the current research account; the shared corpus and coordinator-owned summaries remain outside this worker's write scope.
