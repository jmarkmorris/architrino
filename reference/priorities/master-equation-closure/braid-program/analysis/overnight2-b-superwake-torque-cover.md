# Tangential balance in an admitted finite-amplitude spatial family

## Family, question and current status

The [independently admitted functional chart](overnight2-b-independent-superwake-norm-chart.md) contains a continuous family whose planar motion is a rigid rotation while its two alternating triangles have a skewed, sign-changing height. The question is whether any member can satisfy the complete canonical acceleration equation. Constant planar radius and angular rate require zero tangential acceleration at every reception. This necessary condition is independent of the common spatial scale.

Select $K=c_f=1$, all ordinary positive-delay self and partner roots, the absolute source divisor, and no response factor, ceiling or event rule. For $R>0$, write $\tau=t/R$, $\phi=\kappa\tau$, and

$$
X_j(t)=R\bigl(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^jH F(\phi)\bigr),
\qquad F(\phi)=\cos\phi-\frac18\sin3\phi.
$$

The closed parameter domain is

$$
H\in[1/20,1/9],\qquad \beta\in[73/40,457/250],\qquad \kappa\in[1/2,3]. \tag{1}
$$

All numerical endpoints are exact rationals. The domain's coordinate volume is $11/24000$; this is a parameter-space bookkeeping quantity, not a physical measure. Its height norm is at most $(9/8)H\le1/8$, and its axial physical speed is at most $(11/8)H\kappa\le11/24<1/2$. Its planar position and velocity errors relative to the reference rotating circle are zero. Therefore the entire domain lies inside the accepted all-reception functional chart. The height is positive at phase zero and negative at phase $\pi$, so it is nonplanar and sign-changing.

The accepted chart supplies eight roots at every reception, with source counts $(1,3,1,1,1,1)$, normalized delays in $(7/20,2)$ and absolute divisors above $1/20$. It includes the positive self root and the negative-divisor source-one root. This admission permits a balance calculation using that complete list; it does not assert exactness.

The [subject cover instrument](overnight2-b-superwake-torque-cover.py) completed the entire declared domain: 624 excluded leaves, no unresolved or pending boxes. Its measured strict signs propose an all-scale exclusion of this whole family. Independent partition and acceleration adjudication remain pending; subject completion alone is not independent acceptance. Every earlier failed, unresolved and partial result is retained.

## Exact tangential equation on the chart

At a receiving phase $\phi$, let $d>0$ be a normalized delay, $s_j=(-1)^j$, and $\alpha_j=j\pi/3-\beta d$. The axial separation and the source contraction are

$$
Q_z=H\bigl(F(\phi)-s_jF(\phi-\kappa d)\bigr),
\qquad C_j=-\beta\sin\alpha_j+s_j\kappa H Q_zF'(\phi-\kappa d),
$$

where $F'(\phi)=-\sin\phi-(3/8)\cos3\phi$. The squared causal gap and its delay derivative are

$$
G_j=4\sin^2(\alpha_j/2)+Q_z^2-d^2,
\qquad G_{j,d}=2C_j-2d.
$$

At a root, the signed source divisor is $D_j=-G_{j,d}/(2d)$. The complete normalized tangential acceleration is

$$
A_t(\phi)=\sum_{j,d}\frac{-s_j\sin\alpha_j}{d^3|D_j|}. \tag{2}
$$

The sum is over every root in the admitted chart. Since the prescribed planar tangential acceleration is zero, exact balance requires $A_t(\phi)=0$ at every phase and every scale. The physical canonical acceleration is $A_t/R^2$, so any strictly positive or negative enclosure for (2) excludes that parameter box for all $R>0$. The calculation tests phases $0,\pi/2,\pi/4,3\pi/4$ in that order and stops at the first strict sign. It does not infer a period mean from those four values.

## Root refinement without losing completeness

The source uses the frozen norm-chart target's complete protected root intervals and uniform derivative bounds as previously proved geometric input. For a parameter box and a selected phase, inclusive interval Newton contraction intersects the previous root interval with

$$
m-\frac{G_j(m)}{G_{j,d}(I)},
$$

where $m$ is an exact rational midpoint and the denominator encloses the derivative throughout the current interval. The derivative is also intersected with the norm chart's uniform strict derivative interval. Both are valid bounds on the same actual derivative, so their intersection is valid and keeps its sign. Every actual root remains enclosed by the mean-value theorem; contraction does not select a new root or discard another one.

At the enclosed root, the computed signed divisor is likewise intersected with its accepted chart bound. The canonical tangential row is evaluated only after that divisor excludes zero, and its absolute value is used in (2). All eight rows are summed with outward interval arithmetic. A root intersection failure is an unresolved box, never an exclusion.

This reuse is a dependency on a previously admitted chart. It is not independent evidence for the new acceleration sum or cover. Independent review must reconstruct the tangential geometry, check admission, and re-evaluate the accepted leaves using a separately authored instrument or an independently maintained reference.

## Exhaustive parameter partition and bounded execution

The target starts from the single closed box (1). An undecided box is bisected at an exact rational midpoint along its largest width relative to the initial domain. Each pair of closed children covers its parent with only a shared boundary. The queue is breadth-first. A leaf is excluded only if an interval tangential acceleration omits zero at one of the four declared phases. Depth-24 undecided leaves are retained as unresolved. A visit, wall or resource cap leaves the queue as explicit pending boxes.

The complete leaf collection consists of excluded, unresolved and pending boxes. Exact rational volume accounting checks that their volumes sum to the input volume. This is a useful internal control but is insufficient by itself to prove coverage: independent review must verify the actual dyadic partition, including boundaries and absence of gaps or overlaps. A missing same-volume region can evade volume equality.

The predeclared limits are an eighty-visit pilot followed by at most 10,000 target visits, depth 24, 1,200 internal seconds, 1,260 supervisor seconds, 512 MiB, 32 MiB per receipt and one numerical thread. The target retains all pending boxes if any cap is reached. The pilot's broad-box average would take approximately 1,541 seconds for 10,000 visits, so the target was explicitly authorized as a potentially partial cover under the unchanged wall cap. No finer-box speedup was assumed and no budget was raised.

## Completed subject target

Native receipt inspection reports 1,247 visits and 624 excluded leaves, with zero unresolved or pending boxes and exact excluded volume 11/24000. The deciding phases are zero for 238 leaves, pi/2 for 169, pi/4 for 126 and 3pi/4 for 91. The target measured 176.595164 internal seconds, 176.712 supervised seconds and 39,223,296 bytes peak RSS. Its receipt occupies 336,460 bytes. Supervisor a35138d5-673f-4e82-a714-90eecc03b535 closed with exit zero, zero stderr and a closed process group; its fixed heartbeat advanced during the run. Completion occurred within every unchanged cap. Exact partition audit and independent reconstruction of all 624 signs remain required before acceptance.

## Known controls and retained pilot

Before pilot use, the subject passed analytical static tangential cancellation, the diametric squared-gap derivative, exact profile values and derivatives at zero and $\pi/2$, and the nonstatic root $d=\sqrt2$, $\beta=5\pi/(6\sqrt2)$, $j=1$ with negative divisor $1-5\pi/12$. Its exact eight-half-cube volume control and the domain-admission inequalities also passed. These controls preceded every target evaluation and are bound to the source identity.

The eighty-visit pilot ended with two excluded leaves, no unresolved leaves and 77 pending boxes. It measured 12.330222 internal seconds, 12.452 supervised seconds and 38,469,632 bytes peak RSS. Supervisor `e7f4f2f2-fd8d-49c8-8d38-76ddbdf33a1d` closed with exit zero, zero stderr and a closed process group. The pilot receipt correctly reports incomplete scientific coverage despite successful operational completion.

| Artifact | SHA-256 |
| --- | --- |
| Subject source | `0b015edbfe46a248b48bc05d1c665e53b8f6df424cd495c1932982b3798fe49a` |
| Known receipt | `ea93b0f55a96d20fd441ae9de559d3f34fa6f83ef24e10539ce054f48cf3988a` |
| Pilot receipt | `eac0f4caac2afd2353f81510b50bd2ac98eb8800500b85750ee03906117ed16c` |
| Completed target receipt | `3400504f597a40f15d2be76dfc5b43514733ba1950e528588226ef12fbf3f9d5` |
| Frozen geometric chart target | `84c00158e4f8432978b43320c5da7c2f24087e3ff36cce866dc0f5ce46bd898d` |
| Frozen interval-helper source | `2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3` |

Local evidence is retained under `.local-data/master-equation-closure/overnight2-b/superwake-torque-cover/`. Its tracked companion and declared frozen inputs provide the reproducer; the ignored receipts are local provenance, not public CI dependencies. No evidence is deleted, moved or replaced. mpmath interval arithmetic at 55 decimal digits remains the computational arithmetic boundary.

A domain point outside the accepted geometric norms would defeat admission. An omitted causal root, incorrect source contraction, signed-divisor weight, root contraction that loses an actual root, false tangential sign, or incomplete parameter partition would defeat the corresponding exclusion. Exact balance for one member of an allegedly excluded box would directly falsify that box's result. A failure to exclude a leaf establishes no exact candidate. The parent owns integration and final disposition in [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
