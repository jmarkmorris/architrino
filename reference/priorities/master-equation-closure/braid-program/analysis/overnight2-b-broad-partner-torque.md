# A pointwise tangential obstruction for bounded height profiles

## Result and scope

Computer-assisted derived subject result, pending independent reconstruction. In the coefficient-one canonical equation with wake speed one, consider the complete six-member histories

$$
X_j(t)=R\bigl(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^jz(\tau)\bigr),\qquad \tau=t/R,\quad R>0.
$$

Here $j=0,\ldots,5$, the polarities alternate, $z$ is any complete $C^2$ function, and dots denote normalized-time derivatives. Suppose

$$
\frac{169}{320}\le\beta\le\frac75,\qquad
|z(\tau)|\le\frac15,\qquad |\dot z(\tau)|\le\frac25
\quad\text{for every real }\tau.
$$

Then the complete dimensionless canonical tangential acceleration is strictly positive at every reception where all contributing roots are ordinary and the canonical sum is well defined. The prescribed tangential acceleration is zero. Consequently no such history is an everywhere-ordinary exact reference at any positive scale.

This statement requires neither periodic height nor a bound on its second derivative. It does require the complete-past height and speed norms. All ordinary positive-delay self roots remain in the equation. No receiver factor, cap, root truncation or event rule is introduced. The result concerns constant planar radius and angular rate; variable radius and phase remain outside this statement.

## Geometry and acceleration equation

Rotate reception coordinates so receiver zero lies at planar position $(1,0)$. For source $j$, let

$$
s_j=(-1)^j,\qquad \alpha_j=j\pi/3-\beta d,\qquad
Z_j=z(\tau)-s_jz(\tau-d),
$$

where $d>0$ is normalized delay. Separation and delayed source velocity are

$$
Q_j=(1-\cos\alpha_j,-\sin\alpha_j,Z_j),\qquad
V_j=(-\beta\sin\alpha_j,\beta\cos\alpha_j,s_j\dot z(\tau-d)).
$$

The squared causal gap, its delay derivative and the ordinary source divisor at a root are

$$
G_j=|Q_j|^2-d^2,\qquad
\partial_dG_j=-2\beta\sin\alpha_j+2Z_js_j\dot z(\tau-d)-2d,\qquad
D_j=-\frac{\partial_dG_j}{2d}.
$$

The identity for $D_j$ uses $|Q_j|=d$ and $\partial_dQ_j=V_j$. With $h=1/5$ and $u=2/5$, every actual gap and its actual derivative are enclosed by

$$
G_j\in4\sin^2(\alpha_j/2)-d^2+[0,4h^2],
$$

$$
\partial_dG_j\in-2\beta\sin\alpha_j-2d+[-4hu,4hu].
$$

The interval errors enclose actual histories; their independent interval choices are not themselves a new dynamical law. At each partner root the dimensionless tangential row is

$$
a_{t,j}=\frac{s_j(-\sin\alpha_j)}{d^3|D_j|}.
$$

The complete equation scales as $R L=A$. For this prescribed geometry $L_t=0$, so a positive complete $A_t$ is an obstruction for every $R>0$.

## Complete partner roots

The declared calculation covers the larger domain $\beta\in[1/2,7/5]$. Every source speed is at most

$$
V_*=\sqrt{(7/5)^2+(2/5)^2}=\sqrt{53}/5<3/2.
$$

Simultaneous planar separation from every partner is at least one. For $0<d\le1/4$, the distance-minus-delay gap is bounded below by $1-(1+V_*)d>3/8$. Hence there are no recent partner roots in that interval.

Every point lies in the ball of radius $\sqrt{1+h^2}$. Every causal root therefore obeys

$$
d\le2\sqrt{1+h^2}=2\sqrt{26}/5<21/10<3.
$$

The finite complementary cover from $1/4$ through three thus includes every remaining possible partner delay and a root-free remote extension. It is a complete-history geometric bound, not a numerical cutoff.

The [subject companion](overnight2-b-broad-partner-torque.py) partitions the closed beta domain into exactly 64 equal rational cells:

$$
B_k=\left[\frac12+\frac{9k}{640},\frac12+\frac{9(k+1)}{640}\right],
\qquad k=0,\ldots,63.
$$

Each source receives a protected interval with uniform opposite endpoint signs and strictly negative gap derivative. The intermediate-value theorem and monotonicity supply exactly one ordinary root inside it for every admitted profile. Interval Newton contraction encloses the actual root; complementary sign or derivative tests exclude every other delay. The frozen interval helper checks the complete cover. Every retained partner divisor is positive, so the absolute divisor equals the signed divisor in this calculation.

Native jq inspection of the completed target gives five complete single-root partner channels in every one of the 64 cells, with no unresolved root channel or pending cell. The direct interval sum of the five tangential rows is strictly positive in cells $k=2,\ldots,63$. Their closed union is exactly $[169/320,7/5]$. Cells zero and one have enclosures containing zero; they remain unresolved and are not included in the exclusion. An enclosure containing zero neither establishes a torque zero nor an exact history.

The target receipt records every protected root interval, source divisor, complementary leaf and row sum. The positivity assertion is cellwise and uniform in every allowed height profile and reception; no phase sampling is used.

## Every self root reinforces the partner obstruction

For a self root, $s_0=1$ and $\alpha_0=-\beta d$. Its tangential numerator is $\sin(\beta d)$. The same complete-past geometric bound applies to every self root, yielding

$$
0<\beta d<\frac75\frac{21}{10}=\frac{147}{50}<3<\pi.
$$

Thus every ordinary self row has positive tangential acceleration, regardless of its signed divisor. No full numerical self census is needed for this sign argument: every possible root is within the geometric bound. Under the ordinary finite-sum premise, adding all these rows to the positive complete partner sum preserves strict positivity. A nonordinary root or undefined sum is outside the selected exact domain, rather than being removed from the sum. The partner contribution alone proves the obstruction even when there are no self roots.

This pointwise result therefore covers arbitrary bounded aperiodic height profiles with the stated axial-speed bound. It does not rely on a periodic equal-height chord, on a late-time limit or on an acceleration bound.

## Numerical sequence and provenance

The source imports the frozen subject norm-chart helper with identity a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a. Shared-code agreement with earlier subjects is not independent evidence for this new result. A separate reconstruction is required.

Before pilot use, known controls passed the exact eight-cell toy partition, complete static five-partner tangential cancellation, the independently derived flat unit-circle bound $A_t>1/10$, and exact rational remote/self-sign comparisons. This pass was recorded in the receiving research account before the pilot. The four-cell pilot used indices 0,21,42,63. All partner charts completed; three signs excluded and the first remained unresolved. The measured pilot justified only the unchanged fixed target, preserving unresolved signs. No adaptive subdivision or larger budget was used.

| Stage | Internal seconds | Supervised seconds | Peak RSS bytes | Receipt bytes |
| --- | ---: | ---: | ---: | ---: |
| Pilot | 0.17180087510496378 | 0.220 | 38338560 | 76285 |
| Target | 1.8880901248194277 | 1.951 | 40206336 | 1225712 |

Limits were 120 internal seconds, 180 supervised seconds, 512 MiB memory, eight MiB per receipt and one numerical/BLAS thread. The shared venv ran with bytecode disabled. Pilot supervisor 89fadeaf-ddca-428c-8e00-a89dd6c8ddce and target supervisor 1df126c7-7202-42b3-add0-47477c90ab53 both closed with exit zero, zero stderr and closed process groups. Both completed before the first 15-second heartbeat; per-cell progress was flushed. The known, pilot and target receipts total 1,334,415 bytes.

| Artifact | SHA-256 |
| --- | --- |
| Subject companion | 16bff043669bd6b5201f5fefaaef4808d9acf1df7c9414a5b90963a8b8861210 |
| Known receipt | addbc4c349e5198dd9b5cbf9439ec6892df7e11951a2fd0484c47c1e7ce6b5b2 |
| Pilot receipt | c97b4e1074f5d0a6eed10f6c29cd46a938fc35c389c546315c8c0b5d0c50fd1a |
| Target receipt | d31135271615f62fd1fe808e5249005ee05e93fa0bd9cebae9ccb494967cf8df |

Original receipts remain under the local runtime owner .local-data/master-equation-closure/overnight2-b/broad-partner-torque/. These paths supply local provenance, not public CI dependencies. Reproduction uses the linked source and frozen helper with sequential known, pilot and target stages; exclusive creation protects original receipts. No remote backup or archive-recovery claim is made.

## Falsifiers and remaining work

A missing partner root, an incorrect complementary interval test, a source-divisor or sign error, a false interval bound, or a gap in the rational beta union would defeat the numerical premise. An ordinary self root with $\beta d\ge\pi$ inside these complete-history bounds would defeat the analytical sign argument. A complete exact history meeting every displayed hypothesis would refute the combined result. The interval library remains a common numerical dependency until independently checked; separate implementation does not imply independent transcendental arithmetic.

The two lowest beta cells remain unresolved by this instrument. Larger heights or axial speeds, variable planar radius or phase, and arbitrary faster rotation are not excluded. No stability, existence, singular continuation or global-fate conclusion follows. The receiving parent owns independent-review integration in the [current research account](overnight2-b-followup-and-research-2026-10-07.md); shared-owner integration remains with the coordinating chat.
