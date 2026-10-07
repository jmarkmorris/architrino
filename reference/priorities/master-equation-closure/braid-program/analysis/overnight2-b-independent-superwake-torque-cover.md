# Independent audit of the above-wake tangential cover

## Verdict and accepted domain

**Accepted: every point of the declared closed three-parameter box is excluded from exact canonical balance at every positive scale.** The independently reconstructed exact partition contains 624 leaves and 1247 nodes, with no missing region, positive-volume overlap, unresolved leaf or pending box. A separately authored interval evaluator certifies every leaf's tangential acceleration sign at its recorded phase, retaining every self and partner root. This acceptance combines the independently accepted complete geometric chart with the new independent acceleration and partition checks; it does not use subject signs as evidence.

The [frozen subject](overnight2-b-superwake-torque-cover.md) considers $K=c_f=1$, complete histories, all ordinary positive-delay roots, the canonical absolute source divisor, and no added response law. For $R>0$, $\tau=t/R$ and $\phi=\kappa\tau$,

$$
X_j(t)=R\bigl(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^j H F(\phi)\bigr),
\qquad F(\phi)=\cos\phi-\tfrac18\sin3\phi,
$$

with

$$
H\in[1/20,1/9],\qquad \beta\in[73/40,457/250],\qquad \kappa\in[1/2,3].
$$

The independently established common absolute sign margin is the positive rational

$$
m=\frac{19627241370865211579892879896906172454476499094273716667569147287}{3369993333393829974333376885877453834204643052817571560137951281152}.
$$

For every parameter point there is a certified deciding phase from $\{0,\pi/2,\pi/4,3\pi/4\}$ at which $|A_t|\ge m>0$. The deciding phase can depend on the leaf containing the point. This is not a single common phase, a period mean, or an already proved perturbation-neighborhood result. The value is about $0.005824$; the exact rational above is the evidence-bearing bound. For later arguments needing strict inequality against a stated rational, $|A_t|>m/2$ follows immediately.

The review uses the Ramon E. Moore lens under the Specialist charter, not a role-based grant of mathematical authority. No standard-physics premise enters the calculation.

## Admission independently checked

Since $|F|\le9/8$ and $|F'|\le11/8$,

$$
|z_j|\le\frac98\frac19=\frac18,\qquad
|\dot z_j|\le\frac{11}{8}\frac19\,3=\frac{11}{24}<\frac12.
$$

The dot is normalized-time differentiation, equal to physical velocity after the common spatial/time scaling. Planar position and velocity errors from the unit rotating hexagon are zero. Thus every domain point satisfies the complete-history hypotheses of the [independently accepted functional chart](overnight2-b-independent-superwake-norm-chart.md). Its global guards, eight protected roots and complementary exclusions apply at every reception, including every selected phase used here. Source counts are $(1,3,1,1,1,1)$, all normalized delays lie in $(7/20,2)$, and all absolute source divisors exceed $1/20$. The middle source-one root has negative signed divisor and the source-zero root is a positive self root. Both are retained.

All paths are complete and smooth. Positive unit planar radius separates simultaneous members. Because $H>0$, $F(0)=1$ and $F(\pi)=-1$, every member of this family is spatial and sign-changing. Those facts establish the question's intended geometry, not balance.

## Independent geometry and tangential row

At receiver zero rotate the planar frame by its reception angle. For source offset $j$, put $s=(-1)^j$, $\alpha=j\pi/3-\beta d$, and $\psi=\phi-\kappa d$. The normalized difference and delayed source velocity are

$$
Q=(1-\cos\alpha,-\sin\alpha,Z),\qquad
Z=H\bigl(F(\phi)-sF(\psi)\bigr),
$$

$$
V_s=\bigl(-\beta\sin\alpha,\beta\cos\alpha,sH\kappa F'(\psi)\bigr).
$$

Their dot product is

$$
C=Q\cdot V_s=-\beta\sin\alpha+ZsH\kappa F'(\psi).
$$

The receiver velocity is absent from this source contraction. Differentiating $Q$ with respect to delay gives $V_s$, so the squared causal gap and its actual derivative are

$$
G=2(1-\cos\alpha)+Z^2-d^2,\qquad G_d=2(C-d).
$$

At a root, $|Q|=d$ and

$$
D=1-C/d=-G_d/(2d).
$$

The canonical polarity multiplier relative to receiver zero is $s$, including $s=1$ for self. The tangential projection of $Q$ is $-\sin\alpha$, hence each normalized tangential acceleration contribution is

$$
a_t=\frac{-s\sin\alpha}{d^3|D|}
=\frac{-2s\sin\alpha}{d^2|G_d|}.
$$

The evaluator independently computes both equal row forms and intersects their interval enclosures. This is a valid reduction of interval dependency overestimation: at each actual root both forms have the same value. It never replaces $|D|$ by signed $D$, drops self, or changes a negative-divisor row's polarity. Summing all eight rows gives $A_t$.

The physical canonical tangential acceleration is $A_t/R^2$. Prescribed planar angular rate and radius are constant, so the prescribed tangential acceleration is identically zero. A strict nonzero interval for $A_t$ at even one reception prevents exact balance, independently of $R$. Since $\kappa>0$, every selected phase is attained along the complete history for every positive scale. This explains why each whole leaf is excluded by a single phase and why no period-average inference is involved.

## Independent root refinement and arithmetic boundary

The new [companion](overnight2-b-independent-superwake-torque-cover.py) imports only the frozen independent norm-chart helper, whose identity is checked before use. It loads the frozen independent chart target, not the subject chart target, as its certified geometric dependency. That chart already proves the complete ordinary list and excludes its complement. Reusing this previously accepted proof is explicit dependence on a geometric theorem; the new acceleration evaluator is separately authored and imports no subject code.

Each parameter leaf starts from the independent chart's delay enclosures. On each current interval the evaluator computes $G_d$ from the actual waveform and intersects it with the independent chart's strict derivative bound valid on the protected interval. Both bounds contain the same derivative at every delay under consideration. For a rational midpoint $q$, every actual root $d_*$ obeys the mean-value identity $d_*=q-G(q)/G_d(\xi)$ for some intermediate $\xi$. Inclusive interval Newton intersection therefore retains every root for every parameter point. The code uses at most 40 such intersections, stopping at exact interval stagnation; lack of further contraction is not a root deletion.

At the resulting enclosure the evaluator intersects the independently evaluated expressions $1-C/d$ and $-G_d/(2d)$ with the independent chart's signed-divisor interval. These intersections are used only to bound values at actual roots. Each divisor still excludes zero. The two row forms above are intersected and all rows summed outwardly. An empty intersection or unresolved sign is recorded as unresolved, never as exclusion. The target actually has neither case.

Arithmetic is exact `Fraction` bookkeeping plus shared mpmath 1.3.0 interval arithmetic at 65 decimal digits. The helper's rational-to-interval conversion is outward; the square of $Z$ is evaluated as an interval square. Trigonometric and arithmetic inclusion relies on the shared mpmath interval library. This is an independently authored geometry/evaluation reference relative to the subject, not an independently implemented transcendental library. The prior reference, its source and all its receipts remain frozen.

## Exact closed partition audit

Subject receipt data supply only the 624 boxes, their depths and chosen phases. The partition auditor takes an independently declared rational domain. It first rejects duplicate boxes and any invalid or out-of-domain interval. Starting at the entire domain, a node is a leaf only when exactly one recorded box equals it. Otherwise the auditor splits the longest width relative to the initial domain at its exact midpoint, with the declared coordinate tie order. Every candidate leaf must lie wholly in exactly one child; a box crossing that split fails. Both children must be covered recursively. Empty children, nonmatching nodes and depth inconsistencies fail.

At each accepted split the two closed children cover their closed parent and have disjoint interiors; their common face belongs to both. Induction up the reconstructed tree establishes true coverage, including boundaries, without positive-volume overlaps. No volume-equality shortcut is used. Exact volume is checked only as a secondary invariant:

$$
\left(\frac19-\frac1{20}\right)
\left(\frac{457}{250}-\frac{73}{40}\right)
\left(3-\frac12\right)=\frac{11}{24000}.
$$

The independent audit reconstructs 1247 nodes, 624 leaves and maximum depth 12. Every reconstructed leaf depth equals its recorded subject depth. Every independent result preserves its original zero-based index, exact three interval pairs and phase. No subject leaf is subdivided, expanded, replaced or discarded.

After computation, native `jq -s` comparison of the two full receipts confirmed that independent indices are exactly $0,\ldots,623$, all corresponding boxes and phases are identical, every result retains counts $(1,3,1,1,1,1)$, and all newly computed strict signs agree with the subject signs. The comparison is an identity/disposition check after the independent calculation; it is not the source of those signs.

## Known-first controls and complete result

The instrument passed its known stage before any real partition audit or target evaluation. Its exact partition control accepts the eight closed half-cubes and reconstructs their 15-node tree. It rejects a missing leaf, a duplicate, an overlapping box and an equal-total-volume replacement with both overlap and gap. The last control specifically defeats a volume-only audit.

Analytical geometry controls check the static complete partner torque sum of zero, static gap and derivative, $F(0)=1$, $F'(0)=-3/8$, $F(\pi/2)=1/8$, $F'(\pi/2)=-1$, and the exact admission inequalities. The nonstatic control uses $j=1$, $H=0$, $d=\sqrt2$ and $\beta=5\pi/(6\sqrt2)$. Then $\alpha=-\pi/2$, $G=0$, the tangential numerator is $-1$ and

$$
D=1-\frac{5\pi}{12}<0.
$$

Both independently evaluated divisor expressions enclose this exact value. These controls test the source-velocity sign and absolute-divisor requirement at a negative-divisor root. The known pass was recorded and reported before pilot use.

The pilot checked the 16 spread indices $0,41,83,124,166,207,249,290,332,373,415,456,498,539,581,623$, with all 16 excluded. It also audited the full partition. Its measured 1.061138 seconds supported the unchanged 624-leaf target under the declared wall cap; no finer-box speedup was assumed. The matching source-bound pilot pass is required by the target entry point.

**Measured target result:** all 624 independently evaluated leaf signs are strict, with no unresolved or pending result. The deciding-phase counts are 238 at zero, 169 at $\pi/2$, 126 at $\pi/4$ and 91 at $3\pi/4$. Every result retains all eight final root enclosures, signed-divisor enclosures, gap and derivative intervals, row intervals and contraction counts. The proof covers the continuous closed domain, not merely 624 sampled points.

The common margin $m$ stated above is computed by exact rational comparison across all 624 strict intervals, taking the nearer-to-zero endpoint's absolute value. Its minimizing original index is 541, at phase $\pi/2$, in the unchanged box

$$
H\in[83/1440,59/960],\quad
\beta\in[29227/16000,2923/1600],\quad
\kappa\in[81/32,43/16].
$$

Its lower torque endpoint is exactly $m$. This margin belongs to the independently evaluated intervals; the subject's weaker recorded minimum was not adopted. The reduction in interval overestimation comes from the independently evaluated/intersected divisor and row expressions, not parameter subdivision. A functional-neighborhood transfer would require its own continuity estimates and is not established here.

## Resources, receipts and frozen identities

The declared limits were 1200 internal seconds, 1260 supervisor seconds, 512 MiB resident memory, 16 MiB per receipt and one numerical thread. The shared venv ran with bytecode disabled and `OPENBLAS_NUM_THREADS`, `OMP_NUM_THREADS` and `MKL_NUM_THREADS` set to one. No cap or domain was expanded.

| Stage | Internal seconds | Receipt bytes | Observed RSS after serialization | Scientific disposition |
| --- | ---: | ---: | ---: | --- |
| Known | 0.007653959095478058 | 2205 | 29130752 | All controls passed |
| Pilot | 1.0611379998736084 | 292642 | 31752192 | All 16 selected leaves excluded |
| Target | 49.90555733302608 | 9196282 | 65028096 | All 624 leaves excluded |

Pilot supervisor `e488b264-cddb-4f70-8dd9-2127d93d722d` reports 1.133 supervised seconds, exit zero, zero stderr and a closed process group. Target supervisor `ccb01fe7-0884-4684-8eeb-15d9de064e24` reports 50.003 supervised seconds, exit zero, zero stderr and a closed process group. Its 15-second supervisor heartbeat advanced, and the instrument's approximately 10-second progress records reported 141, 273, 409 and 519 completed leaves before final completion. The pilot and target stdout logs occupy 408 and 769 bytes respectively. An intervening sandboxed supervisor `list --active` inspection failed with host process-identity `EPERM`; the already running supervised job continued, and its final authoritative lease confirmed closure. No successful process census is inferred from that failed inspection. The numerical slot was released after the completed target was inspected.

| Artifact | SHA-256 |
| --- | --- |
| Frozen subject report | `d2aee6019d7c4c5f3d7a5282a3a2c6d34b25cd570e7ca69834cffd3ec6a0b328` |
| Frozen subject source | `0b015edbfe46a248b48bc05d1c665e53b8f6df424cd495c1932982b3798fe49a` |
| Frozen subject target input | `3400504f597a40f15d2be76dfc5b43514733ba1950e528588226ef12fbf3f9d5` |
| Frozen independent chart helper | `f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39` |
| Frozen independent chart target | `0ca2f541041d56c81917f92ea7aeb46ed89dda3304b7f03489fb02259e7f593a` |
| New independent source | `ba6e7e19865f6feb07020b960d0bd253b8d3339e67f854469beb64c1e2cbb63c` |
| New known receipt | `abaa1a46a9037a73517a32082f563db6a4ed12174ab7daabb2bb5cda1c581d2c` |
| New pilot receipt | `c20a0f55668e5eeb7fff692fcf0d10c96db91bb35277cd0f84490594977eedd0` |
| New target receipt | `b2c4633d6ea4360ea0f7cce15e17c6bdbcfc4a24cc711c81c1e959207e49f7f8` |

The three new receipts total 9491129 bytes under `.local-data/master-equation-closure/overnight2-b/independent-superwake-torque-cover/`. The companion's exclusive writes preserve existing receipts. Reproduction uses its sequential `--stage known`, `--stage pilot`, `--stage target` modes with the shared venv and declared frozen dependencies; long stages run through the owned supervisor. These ignored local evidence paths are provenance, not public CI dependencies. No remote-backup or archive-recovery claim is made.

## Falsifiers, preservation and remaining scope

An admissible domain point with a missing chart root, incorrect source contraction, lost root under interval contraction, signed rather than absolute divisor weighting, false interval sign, or a hole in the exact reconstructed partition would defeat the respective argument. An exact canonical solution within the box would directly refute the accepted all-scale exclusion. A profile outside the displayed waveform or parameter domain is outside this theorem; the common sign margin alone does not extend the result to it. Shared interval-library defects remain an explicit computational boundary.

The full mathematical result combines analytically derived admission and acceleration formulas with measured interval signs and exact rational partition reconstruction. It supplies no existence or stability result and does not exclude unrelated above-wake spatial families. No repair to the subject is required. Only this report, its companion and distinct local receipts were authored; supervisor leases/logs remain in their established runtime owner. Frozen subjects, prior independent sources and receipts, the parent account and shared corpus files were not edited. Native SHA-256 checks identify the unchanged frozen inputs, and native `git diff --no-index --check /dev/null` checks whitespace of the two new authored files. No repository-changing Git operation, generator, recursive delegation or additional numerical domain was used. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining disposition step; this bounded independent review is complete.
