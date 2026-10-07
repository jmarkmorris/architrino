# Factored determinant exclusion on unchanged fast-height boxes

## Geometry and conclusion

This calculation continues the [phase-zero determinant cover](overnight2-b-fast-height-determinant.md). Its measured subject result excludes 66 of the 84 previously unresolved boxes using complete interval root censuses at the same reception. Eighteen boxes remain unresolved. Independent reconstruction of these new exclusions is required before acceptance.

Use the canonical equation with $K=c_f=1$, every ordinary positive-delay self and partner root, and the absolute source divisor. The complete prescribed paths are

$$
X_j(t)=R\left(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^j H\left[\cos(\kappa\tau)-\frac18\sin(3\kappa\tau)\right]\right),
\qquad \tau=t/R,\quad R>0.
$$

The unchanged parameter bounds are

$$
\beta\in[182643/100000,182644/100000],\qquad H\in[99/1000,101/1000],
$$

with frequency cells $C_k=[8+3k/32,8+3(k+1)/32]$. Only the 84 unresolved upper-height cells from the original receipt are considered. No parameter box is subdivided or narrowed.

At reception $\tau=0$, define delay $d>0$, source polarity $s=(-1)^j$, planar angle $\alpha=j\pi/3-\beta d$, and axial factor

$$
F=1-s\left(\cos(\kappa d)+\frac18\sin(3\kappa d)\right).
$$

Then $Q_r=2\sin^2(\alpha/2)$, $Q_z=HF$, and the squared causal gap and its delay derivative are

$$
G=2Q_r+H^2F^2-d^2,
$$

$$
G_d=-2\beta\sin\alpha+
2H^2F\,s\kappa\left(\sin(\kappa d)-\frac38\cos(3\kappa d)\right)-2d.
$$

At a causal root, the source divisor is $D=-G_d/(2d)$. The normalized acceleration sum is $A=\sum sQ/(d^3|D|)$, while the prescribed acceleration components are $L_r=-\beta^2$ and $L_z=-H\kappa^2$. Exactness requires $RL=A$. Eliminating the common scale gives the necessary determinant equation $A_rL_z-A_zL_r=0$.

Since the entire height slab is positive, division by $H$ preserves the exclusion:

$$
\frac{A_rL_z-A_zL_r}{H}
=\sum_{\text{all roots}}\frac{s[-\kappa^2Q_r+\beta^2F]}{d^3|D|}.
$$

A strictly nonzero interval for this complete sum therefore excludes every positive scale. This is a single-reception contradiction; a full-period root chart is unnecessary for that conclusion.

## Complete census and improved enclosure

The recent and remote guards are the same analytical guards as the original calculation. For $0<d\le1/4$, the planar self secant exceeds one, and each partner planar gap is at least $1-(1+\beta)d>0$. All roots lie below the complete diameter bound $2\sqrt{1+(9H/8)^2}<3$. The numerical census consequently covers $[1/4,3]$.

The new instrument improves only the enclosure and proposed bracket locations. It factors $Q_z=HF$ before evaluating the gap and uses the interval square operation for $Q_z^2$. It sums the displayed normalized determinant directly. Floating roots at each parameter box's midpoint supply bracket hints; their locations and number are not evidence. Protected opposite endpoint signs, a nonzero derivative throughout every bracket, and complete exclusion of every complementary interval decide whether the census is accepted.

Every successful box has counts $(1,3,1,1,1,1)$, including its positive-delay self root and the negative-divisor row in the three-root partner channel. The unresolved cells have indices

$$
58,103,104,148,149,163,193,194,195,200,202,203,236,237,238,239,240,241.
$$

Their failed derivative or complementary-interval bounds do not establish a physical obstruction. In particular the floating midpoint hints contain five roots in partner channel one at indices 194, 239 and 240. That observation suggests a parameter-dependent count change, but only a separate complete census or nonordinary-root proof can establish it.

## Evidence and reproduction

The instrument is [overnight2-b-fast-height-centered.py](overnight2-b-fast-height-centered.py), SHA-256 2552843fed16e8d94a9d94a2e76b39e3ecdb3eefe5e5c19de8cfe6a0af557496. It imports the frozen subject interval helper and floating search solely for hints; neither is an independent reference. Shared mpmath interval arithmetic remains a numerical-library boundary.

Known controls passed and were recorded before the pilot: an exact toy selection of unresolved rows, analytical complete static acceleration, quarter-height-cycle axial separation and source velocity, the independently accepted flat eight-root chart, and rejection of an intentionally omitted static root. The six-cell pilot used indices 57, 91, 126, 163, 233 and 252; five passed and index 163 remained unresolved. The measured pilot justified the unchanged 84-cell target.

Native jq inspection of the target receipt gives 66 exclusions, 18 unresolved boxes and zero pending boxes. All original receipts remain under the ignored local owner .local-data/master-equation-closure/overnight2-b/fast-height-centered/. This record and the tracked source provide the durable reproduction route. Invoke the shared venv with one numerical/BLAS thread and stages known, pilot and target, preserving the original outputs rather than overwriting them.

| Stage | Receipt SHA-256 | Internal seconds |
| --- | --- | ---: |
| Known | abc7c785d68fccd48ed503a5ce9a599907f8bf4f983fce08280d8d4012555636 | Recorded in receipt |
| Pilot | 7bb083193dc97731b07d87c89dd72e1dec663392d42fd37758daf8fbd27c75f5 | 0.764719 |
| Target | 012523a36562da24e8b5e4c21cb86fa3725acb5e171893c237724770dedd33a4 | 8.223116 |

The target's owned supervisor lease 2f0f702e-ca51-41d6-a3fd-892590e4b498 records 8.332 supervised seconds, exit zero, zero stderr and a closed process group. Observed RSS was 177,209,344 bytes; the receipt contains 5,435 complementary leaves and 4,955,911 bytes. The three receipts total 5,347,302 bytes by the recorded byte inventory. Declared caps were 120 internal seconds, 180 supervised seconds, 512 MiB, eight MiB output and 50,000 complementary leaves. No cap enlargement or adaptive parameter partition was used.

A missed root, invalid complement sign, incorrect source contraction or absolute divisor, wrong selected-box metadata, or a zero determinant within a claimed successful enclosure would falsify the corresponding exclusion. No exact spatial reference, stability conclusion, global fate or continuation through nonordinary roots follows.
