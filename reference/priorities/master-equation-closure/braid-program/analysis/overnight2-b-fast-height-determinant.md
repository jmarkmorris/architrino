# Fast-height radial and axial scale incompatibility

## Subject conclusion

Computer-assisted derived subject result, pending independent reconstruction. The canonical coefficient-one equation with wake speed one excludes the entire declared lower-height slab of the following prescribed family, at every positive scale:

$$
X_j(t)=R\bigl(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),
(-1)^jH[\cos(\kappa\tau)-\tfrac18\sin(3\kappa\tau)]\bigr),\qquad
\tau=t/R,\quad R>0.
$$

Polarities alternate, and all ordinary positive-delay partner and self roots remain in the equation. The continuously excluded slab is

$$
\frac{182643}{100000}\le\beta\le\frac{182644}{100000},\qquad
\frac{49}{1000}\le H\le\frac{51}{1000},\qquad
8\le\kappa\le32.
$$

A second height slab, $99/1000\le H\le101/1000$, has a partial exclusion on 172 of the 256 declared frequency cells. The remaining 84 cells have unresolved root certificates, not physical obstructions. The exact accepted subject cell inventory is retained in the target receipt; no interpolation across unresolved cells is claimed.

The proof is at reception phase zero only. A nonzero radial/axial determinant there is enough to exclude exact balance for the complete prescribed history, but the calculation does not certify a full-period ordinary root chart or a trajectory's fate.

## Why a fast height oscillation is a distinct question

The earlier floating higher-harmonic search ended at height frequency six. A later fixed survey at frequencies 8,12,16,24,32 found sampled axial-work means of both signs, so positivity of the previously observed axial work cannot be extrapolated through this fast regime. Yet the radial and axial equations continued to demand very different scales. The present interval calculation tests that incompatibility directly rather than interpreting optimizer failure or quadrature as a proof.

For example, the denser floating probes at $H=1/20$ and $\kappa=8,16$ gave radial scale estimates approximately 0.931375 and 0.944381, while the axial estimates were approximately 0.042641 and 0.054549. These values motivated the test. They are measured by the [proposal companion](overnight2-b-fast-height-superwake.py), not used as interval evidence. Its source and receipts remain unchanged in the receiving [research account](overnight2-b-followup-and-research-2026-10-07.md).

## Complete phase-zero geometry

At phase zero, rotate the receiver's planar axes so its position is $(1,0,H)$. For a normalized delay $d>0$, write

$$
s_j=(-1)^j,\qquad \alpha_j=j\pi/3-\beta d,\qquad u=\kappa d.
$$

The unsigned source height and its normalized-time derivative are

$$
z_s=H[\cos u+\tfrac18\sin(3u)],\qquad
\dot z_s=H\kappa[\sin u-\tfrac38\cos(3u)].
$$

The sign in the second formula follows by differentiating the complete height profile with respect to source time, then evaluating at phase $-u$. Define

$$
Z_j=H-s_jz_s,\qquad
Q_j=(1-\cos\alpha_j,-\sin\alpha_j,Z_j).
$$

The delayed source axial velocity is $s_j\dot z_s$. The squared causal gap and its actual delay derivative are

$$
G_j=4\sin^2(\alpha_j/2)+Z_j^2-d^2,
$$

$$
G_{j,d}=-2\beta\sin\alpha_j+2Z_js_j\dot z_s-2d.
$$

At an actual root, the signed source divisor is $D_j=-G_{j,d}/(2d)$. The dimensionless acceleration contribution is

$$
a_j=\frac{s_jQ_j}{d^3|D_j|}.
$$

Negative signed divisors remain in the absolute denominator; no root or channel is removed because of its sign. Summing every root gives $A=(A_r,A_t,A_z)$ at the selected reception.

## Recent and remote guards independent of fast axial velocity

For a self source the planar chord alone has length $2\sin(\beta d/2)$ while $0<d\le1/4$. Its secant ratio satisfies

$$
\frac{2\sin(\beta d/2)}d
\ge\beta\left[1-\frac{(\beta d/2)^2}{6}\right]>1
$$

throughout the declared beta interval. Therefore the full self distance-minus-delay gap is positive on this entire recent interval, independently of the axial chord.

For every partner, simultaneous planar separation is at least one and its planar source speed is $\beta$. The planar triangle inequality gives a full distance-minus-delay lower bound

$$
|Q_j(d)|-d\ge1-(1+\beta)d>0,\qquad 0<d\le1/4.
$$

Using planar source displacement here avoids introducing the potentially large axial speed into a guard that does not require it.

The complete height profile obeys $|z|\le9H/8$. Thus every positive-delay root, self or partner, satisfies

$$
d\le2\sqrt{1+(9H/8)^2}<3.
$$

The full numerical delay domain $[1/4,3]$ therefore includes every remaining possible root and a root-free remote extension. This is a complete-past diameter bound, not an imposed lookback cutoff.

## Complete roots and a scale-free determinant

For each parameter box, the [interval companion](overnight2-b-fast-height-determinant.py) tests protected root brackets with uniform opposite gap signs and a nonzero derivative throughout the bracket. Inclusive interval Newton contraction retains each actual root. Every complementary delay interval is excluded by a strict gap sign or by strict monotonicity and same-sign endpoints. Protected brackets and their complements cover the entire finite delay domain in order. Root-location hints carry no evidentiary weight.

Every certified box has the complete source counts

$$
(N_0,N_1,N_2,N_3,N_4,N_5)=(1,3,1,1,1,1).
$$

The counts include the positive-delay self root and all three roots in partner channel one. Every source divisor is bounded away from zero on its protected root enclosure. The retained target contains the roots, source divisors, acceleration rows and complementary leaves for each certified box; partial channels remain recorded when certification fails.

At phase zero the prescribed normalized radial and axial accelerations are

$$
L_r=-\beta^2,\qquad L_z=-H\kappa^2.
$$

The third-sine term has zero second derivative at phase zero. Since the exact scaled equation is $R L=A$, a common scale would require

$$
\mathcal D:=A_rL_z-A_zL_r=0.
$$

Every certified box has a strict nonzero interval enclosure for $\mathcal D$, rejecting every positive scale simultaneously. This comparison uses the complete vector contributions; separate least-squares scale fits are unnecessary.

## Exact parameter partition and measured outcome

Each height slab uses the 256 exact equal closed frequency intervals

$$
C_k=[8+3k/32,\;8+3(k+1)/32],\qquad k=0,\ldots,255.
$$

The beta interval and each height slab remain unchanged across these cells. The shared endpoints give a complete continuous frequency cover with disjoint interiors.

Native jq inspection of the completed target returned 512 evaluated boxes, 428 exclusions, 84 unresolved boxes and zero pending. All 256 lower-height cells exclude, proving the full lower-height slab stated above. In the upper-height slab, 172 cells exclude and 84 remain unresolved because a guide derivative, protected-bracket derivative or uniform endpoint test did not certify. No determinant claim is made in those unresolved boxes.

The instrument completed 20,296 complementary leaves. Its failed brackets indicate limitations of this enclosure and bracketing method; they neither prove actual root collisions nor provide exact histories.

## Controls, resources and preservation

Known controls passed and were recorded before the pilot: an exact eight-cell toy partition, complete static partner acceleration, the exact source-height separation and velocity at a quarter height cycle, and the separately accepted flat eight-root chart. At $H=1/10$, $\kappa=2$ and $d=\pi/4$, the self axial separation is $9/80$ and source axial velocity $1/5$, fixing the delayed derivative sign independently.

The pilot used cells 0,127,255 in both height slabs. Five boxes excluded and one upper-slab derivative bracket was unresolved. Runtime and receipt size supported the unchanged 512-box target. No parameter subdivision, budget enlargement or replacement of a failed result occurred.

| Stage | Internal seconds | Supervised seconds | Peak RSS bytes | Receipt bytes |
| --- | ---: | ---: | ---: | ---: |
| Known | 0.1803161669522524 | synchronous | 38322176 | 56858 |
| Pilot | 0.5909325829707086 | 0.651 | 38879232 | 287678 |
| Target | 41.48651970829815 | 41.625 | 79527936 | 24188238 |

Declared limits were 120 internal seconds, 180 supervised seconds, 512 MiB memory, 32 MiB per receipt, 50,000 complementary leaves and one numerical thread. The shared venv ran with bytecode disabled and one numerical/BLAS thread. Pilot supervisor e3bf7042-a28c-496a-a854-0754066f3495 and target supervisor 3b3338d0-a992-4cf1-869a-faa16b731aac closed with exit zero, zero stderr and closed process groups. The target heartbeat advanced from its start at 09:44:42 UTC to 09:45:12 UTC, and per-cell progress was flushed.

| Artifact | SHA-256 |
| --- | --- |
| Subject companion | b5fb9800d5648fec9f8b123b23687b06a4c418fe6bb23ffda7b2772b72909561 |
| Frozen root helper | a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a |
| Known receipt | 38e8e68db3218c9850bbc691994a622d16b20fd18884f888e6d8bdc0b9b92e86 |
| Pilot receipt | b598eb9be61df326ff44e10ad24eff186bcdfb8264ccf3a207bf29217101631e |
| Target receipt | e7e8520975a7a4a72dced5318810c49acef13dd8c5aa7f9ec7020c0d59669bed |

The three receipts total 24,532,774 bytes and remain under the local runtime owner .local-data/master-equation-closure/overnight2-b/fast-height-determinant/. These are retained local provenance, not public CI dependencies. The linked source and frozen helper provide the sequential known/pilot/target reproducer; exclusive creation protects the originals. No remote-backup or archive-recovery claim is made.

The root-cover helper is shared with earlier subject calculations, so the current result requires an independently authored geometry and root reconstruction. A denser run of the floating proposal routine would not supply that independence.

## Falsifiers and limits

A missing root, an incorrect delayed source derivative, an invalid recent or remote guard, a false bracket/complement certificate, a source-divisor error, an incorrect outward interval enclosure, a gap in the exact frequency cover or a determinant interval containing zero would defeat the associated exclusion. An exact complete history meeting every premise inside an excluded box would directly refute the combined claim.

No full-period chart, unrestricted frequency/height exclusion, physical trajectory, stability or singular continuation is established. The upper-slab unresolved cells remain open. The parent owns independent-review integration in the current research account; shared-owner integration remains with the coordinator.
