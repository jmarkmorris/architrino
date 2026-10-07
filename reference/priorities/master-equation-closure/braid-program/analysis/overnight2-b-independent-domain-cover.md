# Independent audit of the complete cosine-domain crossing cover

**Verdict: exact partition accepted; full-domain exclusion not independently established.** The completed independent audit verifies all 4,019 leaf boxes as a complete exact partition and establishes exclusion on 3,875 of them. Its direct and centered intervals remain unresolved on 144 leaves. Those retained intervals are a concrete limitation of this independent enclosure method, not evidence of an exact history or a demonstrated error in the subject. All fifteen endpoint-theorem leaves pass independently. No extra subdivision or revised instrument was used to close the remaining leaves.

## Scope and acceptance rule

This review independently checks the exact partition and every leaf of the [frozen same-domain cover](overnight2-b-centered-domain-cover.md). The target is the closed parameter domain
$$
\frac1{10}\le H\le\frac56,\qquad \frac1{20}\le\beta\le\frac45,\qquad \frac1{10}\le\eta\le1,
\qquad \kappa=\frac{\eta\sqrt{(19/20)^2-\beta^2}}H.
$$
The canonical constants remain $K=c_f=1$. Histories have unit normalized radius, constant planar rate, no periodic planar phase correction and height $H\cos\phi$. Every ordinary positive-delay partner and self root belongs to the canonical sum. This review changes neither the domain nor any retained box, and performs no additional subdivision.

The [new audit companion](overnight2-b-independent-domain-cover.py) imports only the immutable [independent scalar and explicit-gradient reference](overnight2-b-independent-centered-crossing.py). It never imports the subject wrapper, centered subject or subject root contractor. The subject receipt supplies authenticated rational boxes and reporting labels; its field intervals, root bounds and claimed signs are not used to establish an independent exclusion. A subject label is retained for comparison, not treated as evidence. The independent endpoint test is applied without consulting that label.

There are two separate obligations: exact coverage of the whole domain by the input boxes, and a strict independently established necessary-component obstruction on each box. Operational completion is a third, distinct statement. An unresolved independent enclosure is retained even if the subject claims a sign; it is not a counterexample and cannot be promoted to an independent exclusion.

## Complete chart and the necessary crossing components

Write $s=\sqrt{(19/20)^2-\beta^2}>0$. The physical speed satisfies
$$
|V_j|^2\le\beta^2+H^2\kappa^2
=\beta^2+\eta^2[(19/20)^2-\beta^2]\le(19/20)^2<1.
$$
For a fixed reception, changing the normalized emission delay by $\delta>0$ changes the source position by at most $(19/20)\delta$. The unsquared distance-minus-delay gap therefore decreases by at least $\delta/20$. Its zero-delay value is positive for every partner, and it becomes negative in the complete past. There is exactly one positive root per partner. For self the displacement is at most $19\Delta/20<\Delta$, excluding every positive self root. This proves the complete five-row chart rather than assuming a finite delay search found all rows.

At the descending zero $\phi=\pi/2$, each equal-time partner chord is at least one. The source-speed and diameter bounds give
$$
\frac{20}{39}\le d_j\le2\sqrt{1+H^2},\qquad
\frac1{20}\le D_{s,j}\le\frac{39}{20}.
$$
The strict positive source-divisor bound makes every root ordinary and permits the implicit derivatives throughout each closed parameter leaf. The prescribed tangential acceleration vanishes because radius and planar angular rate are constant; the prescribed axial acceleration vanishes because $z''=-H\cos\phi=0$ at this reception. Thus a strict sign of either complete canonical component at the crossing excludes exact balance at every $R>0$.

For partner $j$ put $\sigma_j=(-1)^j$, $\alpha=j\pi/3-\beta d$ and $\ell=\kappa d$. In the receiver frame the normalized separation is
$$
Q=(1-\cos\alpha,-\sin\alpha,-\sigma_jH\sin\ell),\qquad
q^2=4\sin^2(\alpha/2)+H^2\sin^2\ell.
$$
The source velocity contraction is $Q\cdot V_s=-\beta\sin\alpha+H^2\kappa\sin\ell\cos\ell$. At the positive root $q=d$ define
$$
W=dD_s=d+\beta\sin\alpha-H^2\kappa\sin\ell\cos\ell.
$$
The canonical tangential and axial rows are respectively
$$
T_j=\frac{-\sigma_j\sin\alpha}{d^2W},\qquad
Z_j=\frac{-H\sin\ell}{d^2W}.
$$
These use the delayed source velocity and its divisor; no receiver-velocity divisor is substituted. All five rows are summed before a component sign is tested.

## Independently reconstructed endpoint theorem

Let $a=\pi/\kappa$ be the delay to the preceding height zero. At both ends the common height is zero, so the normalized partner distance at delay $a$ is purely planar and at most two. If $2\kappa<\pi$, then $a>2$, hence the gap at $a$ is at most $2-a<0$. Since the gap is strictly decreasing and initially positive, every partner root satisfies $0<d_j<a$. Thus $0<\kappa d_j<\pi$, every $H\sin(\kappa d_j)$ is strictly positive, and the complete axial sum is strictly negative. This conflicts with zero prescribed axial acceleration.

For a whole parameter box, $\kappa=\eta s/H$ increases with $\eta$ and decreases with positive $H$ and $\beta$. The exact maximizing corner is therefore $(H_-,\beta_-,\eta_+)$. The audit independently evaluates
$$
2\kappa_{\max}=\frac{2\eta_+\sqrt{(19/20)^2-\beta_-^2}}{H_-}
$$
with outward interval arithmetic and requires its upper endpoint to be strictly smaller than the lower endpoint of the interval for $\pi$. Every successful receipt row preserves both intervals. Equality or overlap does not pass. This independently checks the analytic endpoint leaves without copying the subject's upper bounds.

## Independent interval inclusion and derivative reference

The frozen independent reference was analytically accepted in the [473-leaf review](overnight2-b-independent-centered-crossing.md). Its mathematical formulas apply to the full present domain even though that earlier numerical acceptance concerned only 473 other boxes. Reusing the formulas does not transfer the earlier numerical sign verdict to new boxes: every current box is evaluated afresh.

Roots start in the complete chart interval. For the squared gap $F=q^2-d^2$, the derivative is
$$
F_d=-2\beta\sin\alpha+2H^2\kappa\sin\ell\cos\ell-2d.
$$
When its interval is strictly negative, the interval Newton image at an exact rational midpoint encloses every root by the parameterwise mean-value theorem. Otherwise the globally established gap secant magnitude $[1/20,39/20]$ gives a valid fallback. Intersection retains all roots; an empty intersection is an error. A fixed finite iteration count or stagnation may widen the final enclosure but cannot justify discarding a root.

The audit first tries a direct complete-component interval. If neither component excludes zero, it evaluates the independent centered enclosure on the same unchanged box. For coordinates $(H,\beta,\eta)$,
$$
\kappa_H=-\kappa/H,\qquad \kappa_\beta=-\eta\beta/(Hs),\qquad \kappa_\eta=s/H,
$$
$$
d_i=\frac{-\sin\alpha\,\delta_{i\beta}+(H/d)\sin^2\ell\,\delta_{iH}+H^2\sin\ell\cos\ell\,\kappa_i}{D_s}.
$$
Then $\alpha_i=-d\delta_{i\beta}-\beta d_i$, $\ell_i=d\kappa_i+\kappa d_i$, and
$$
W_i=d_i+\delta_{i\beta}\sin\alpha+\beta\cos\alpha\,\alpha_i
-(2H\delta_{iH}\kappa+H^2\kappa_i)\sin\ell\cos\ell-H^2\kappa\cos(2\ell)\ell_i.
$$
For either row numerator $N$, direct differentiation gives
$$
\partial_i\frac{N}{d^2W}=\frac{N_i-N(2d_i/d+W_i/W)}{d^2W}.
$$
The reference explicitly evaluates these derivatives rather than the subject's dual-number operations. Valid narrowing of divisor and $W$ values does not alter or differentiate the displayed derivative formulas. The centered enclosure is
$$
F(c)+\sum_{i=1}^3[\partial_iF(B)]\,[-r_i,r_i],
$$
with independent interval roots at the exact rational center $c$, whole-box derivative bounds and exact rational half-widths $r_i$. The integral mean-value theorem along the center-to-point segment proves inclusion. Its intersection with the direct enclosure remains inclusive. This can still contain zero because of interval overestimation; no mandatory improvement is assumed.

The shared mpmath 1.3.0 outward interval library is an explicit dependency common to subject and reference. Separate analytical derivatives, scalar root contraction, factored row evaluation and exact controls provide independence above that shared arithmetic layer; they do not constitute an independent formal implementation of transcendental rounding. The reference uses 50 decimal digits and exports exact rational representations of all interval endpoints.

## Exact partition proof and adversarial known cases

The partition checker reads only exact rational box endpoints. It first requires three positive-width intervals within the declared domain and rejects duplicate boxes. Starting with the full domain, it chooses the coordinate of greatest width relative to the original domain, resolving ties by coordinate order, and bisects that coordinate at the exact midpoint. This is a verification of the declared binary partition structure, not a numerical refinement of any leaf.

At a node, an exactly matching input leaf is accepted only if it is the sole remaining box there. Otherwise every assigned box must fit entirely in exactly one child; a straddler is rejected and both children must receive boxes. Recursion terminates only at exact input boxes. By induction, each accepted node is the union of its accepted closed descendant leaves, with disjoint interiors: the two closed children cover their parent and meet only in their shared splitting plane. The leaf endpoint requirements include those planes, so boundary points are covered too. An empty child detects a gap, and a node with both an exact leaf and another assigned box detects overlap. Duplicate detection and the one-child assignments prevent multiple consumption. The exact total volume is an additional consistency check, not the coverage proof.

This checker intentionally verifies the declared binary tiling class; it need not accept every arbitrary valid rectangular partition. Rejection of another partition geometry would be a checker limitation. Acceptance here supplies the constructive inductive coverage proof, independently of the subject's reported traversal or volume total.

Before accessing the target partition, the known stage accepted an eight-subcube unit-cube cover with fifteen nodes and exact volume one. It rejected a missing subcube, a duplicate, a strictly overlapping box, and an adversarial collection whose volume remains exactly one despite a gap and overlap. The latter replaces two adjacent subcubes by one extended box and one narrowed box; it demonstrates why the volume check alone is insufficient. All controls are recorded in the known receipt.

The same known stage reran the frozen reference's static five-root controls, zero fields, exact derivatives $T_\beta=19/12$ and $Z_\eta=-133/48$, nonzero coordinate-map derivatives, nonstatic exact root and its three derivatives, square-versus-product checks and a centered quadratic inclusion. The static derivative constants follow respectively from $\sum_j-\sigma_j/d_j^2=19/12$ and $-(19/20)\sum_j1/d_j^2=-133/48$, with $d_j=1,\sqrt3,2,\sqrt3,1$. Endpoint controls separately accepted a known small rate and rejected a known large rate. The known receipt passed before pilot or target use, and source plus reference hashes gate the later stages.

## Known stage and measured pilot

The known stage ran synchronously under the shared executable venv, one numerical thread, and no bytecode writes. It completed with exit zero in 0.039238 internal seconds, using 28,688,384 peak resident bytes and producing 6,805 receipt bytes.

The pilot selected sixteen spread indices $\lfloor i(4019-1)/15\rfloor$, $0\le i\le15$, from the unchanged leaf list. It first checked the complete exact partition, obtaining 4,019 leaves, 8,037 nodes, maximum depth 23 and exact volume $99/200$. All sixteen pilot leaves independently excluded zero: one by endpoint theorem, three by direct axial intervals, two by direct tangential intervals and ten by centered tangential intervals. The pilot measured 0.480991 internal seconds, 43,876,352 peak resident bytes and 102,768 receipt bytes. Linear planning projection was approximately 121 seconds and 26 MB for all leaves; this empirical projection supported launch, without guaranteeing any target signs or final resource cost.

Pilot supervisor lease `e1a395ce-970b-43d1-b4a7-7e29f91515dd` closed with exit zero, zero stderr and `processGroupClosed: true` after 0.531 supervised seconds. The target began only after pilot closure. The target limits are 900 internal seconds, 960 supervisor seconds, 512 MiB resident memory, 64 MiB per retained receipt and one numerical thread, as expressly assigned for this review. The immutable reference's in-memory operational deadline was set to the authorized 900 seconds; its file and mathematical routines were not modified. Five-second progress reports preserve completed-leaf and unresolved counts, with supervisor ownership and heartbeat records outside the scientific receipt.

## Completed target and remaining scientific obligation

Native `jq` inspection of the retained target reports completed execution, 4,019 processed rows, no pending index and no exception. The exact partition audit again passed with 8,037 nodes, 4,019 leaves, depth at most 23 and volume $99/200$. Its independently derived dispositions are:

| Independent method | Leaves |
| --- | ---: |
| Endpoint theorem | 15 |
| Direct axial interval | 992 |
| Direct tangential interval | 842 |
| Centered axial interval | 128 |
| Centered tangential interval | 1,898 |
| Unresolved independent intervals | 144 |

Thus 3,875 leaves are independently excluded, and `allAssignedLeavesExcluded` is false. The receipt's `completed` and `passed` flags record successful audit execution and checks, not full-domain exclusion. None of the 144 unresolved results may be omitted from the scientific verdict.

All fifteen subject endpoint leaves are independently endpoint-excluded at original zero-based indices `0, 1, 2, 3, 5, 6, 7, 9, 12, 13, 15, 18, 20, 25, 27`. The 144 unresolved leaves were labelled by the subject as 25 direct axial, 118 direct tangential and one centered tangential exclusions. These subject labels were not used to turn independent intervals into signs. The unresolved set spans indices 8 through 2382, with its exact membership and unchanged rational boxes retained in rows whose `kind` is `unresolved`. A reproducible native read is:

```bash
jq '[.rows[] | select(.kind == "unresolved") | {subjectLeafIndex, box, torque, axial}]' .local-data/master-equation-closure/overnight2-b/independent-domain-cover/target.json
```

For example, the first unresolved box, index 8, is
$$
H\in[17/60,7/15],\qquad \beta\in[1/20,19/80],\qquad \eta\in[13/40,11/20].
$$
Both final independent complete-component intervals contain zero there. Their exact rational endpoints, direct intervals, center intervals, gradients, whole-box and center root bounds are retained; this is not a missing calculation or a pending parameter box. A resolved leaf may have a different independently signed component from the one used by the subject. The valid scientific conclusion follows from the retained independent component, not agreement with the subject's method label.

The target measured 81.005667 internal seconds, reported 82,247,680 peak resident bytes at the end of the numerical stage, and produced 24,314,851 receipt bytes. The resource sample is taken before final JSON serialization and is not an external measurement of peak memory over serialization. Per-leaf reference budget checks enforced the stated observed resident limit during numerical evaluation. Native `wc -c` independently checks output sizes. Known, pilot and target receipts total 24,424,424 bytes, below the specifically authorized 64 MiB receipt allowance. All successful and unresolved root/gradient evidence remains retained.

Target supervisor lease `0efb1146-9e93-47ba-bcc6-577bd22aea53` closed with exit zero, zero stderr and `processGroupClosed: true` in 81.149 supervised seconds. Progress reports advanced through 438, 812 and subsequent completed-leaf counts to 3,988, then the final 4,019-row receipt. The last intermediate count recorded the same final 144 unresolved leaves. The pilot lease was already closed before target launch. The numerical slot was explicitly released to the parent after this target closure; no reviewer-owned numerical job remains from these stages.

The complete geometric partition is accepted independently. The subject's whole-domain exclusion remains scientifically unaccepted by this audit until the 144 retained boxes receive an independent sign proof or other independently justified exclusion. No counterexample was found or claimed, and this review does not reject the subject's intervals as incorrect merely because a different contractor gives wider intervals. Further methods, refinement, reruns or amended budgets are outside this completed bounded assignment. The parent should integrate the partition acceptance, the 3,875 leaf exclusions and the exact 144-leaf remaining obligation separately.

## Provenance, falsifiers and preservation

Native `shasum -a 256` measured the following identities after completion:

| Item | SHA-256 |
| --- | --- |
| Frozen subject Markdown | `9d26e5db237f11876a1c10465b6232ce9ab1d553bc2500d7fa3d3bd73fa87bb2` |
| Frozen subject wrapper, not imported | `c06df9541a302df3ccffbe99658a5dd0c9be5b0e844bd0921f6cfde3f2f87172` |
| Subject input target receipt | `5b9df247c7c6c1f3ce94c8da96a13657f21ad7bee51057f9539713520e645180` |
| Immutable independent reference | `f15fe190bb85be4b8a7f1b8140c1748db04f540e5f5fa510a6705f180b56156a` |
| New independent audit companion | `b451d57ca7194392e03546cf3292bc8cb97ff496eedcfe8b1882900773b24f19` |
| New known receipt | `7b6bd3668a13b39e3d8f156e130c28bc8f3df32279359c9042d5410b0a98a33a` |
| New pilot receipt | `4139b8fc20050e64b6be7d51f3c1ecdd8c2cb1d71c2c26df3b95acd6d3912f0a` |
| New target receipt | `b4d5927370c804f27d3990dd387b77f0077a76a2535703b7055101d689e965fc` |

The independent runtime owner is `.local-data/master-equation-closure/overnight2-b/independent-domain-cover/`; the three receipt names are `known.json`, `pilot.json` and `target.json`. The source identity was unchanged between the recorded known success, pilot and full target. These are fresh independently evaluated receipts, not reproduction of a subject's numerical output. Receipt paths refuse overwrite.

An omitted parameter point, overlapping interior, accepted duplicate, incorrect exact endpoint, missing child or incorrect common domain would falsify the partition claim. A root outside its retained interval, a missing causal root, incorrect source divisor, wrong implicit derivative, a derivative outside its retained range or a direct/centered interval not containing the actual component would falsify the affected independent exclusion. An admitted exact history in an independently excluded leaf would directly refute that leaf's conclusion. A history in an unresolved leaf is not excluded by this audit. For endpoint rows, failure of the strict maximizing-corner comparison or the monotone-gap implication would defeat their analytical exclusion. None of these obligations is settled merely by supervisor exit zero or agreement of total volumes.

Before launch, a sandboxed supervisor-list inspection returned `spawn EPERM` while obtaining host process identities. It launched no numerical job. The supervised pilot and target then ran through the authorized host-access path and retained their terminal leases and logs. This operational limitation did not cause a fallback to unowned computation or a different Python interpreter.

Only this report, its new companion, assigned fresh runtime evidence and supervisor-managed operational records were written. The subject, independent reference, earlier reports and receipts, parent receiving account and shared owners were preserved read-only. No subject source was imported or edited, no existing receipt was overwritten, and no Git mutation, generator, recursive delegation, sidebar action or new physical law was used. The shared venv executed all Python stages with bytecode writing disabled and one numerical thread. Final native whitespace checks apply only to the two new authored files, and final hashes check the frozen dependencies and retained receipts. No repository-wide test or scientific closure beyond the explicitly accepted partition and leaves is claimed.
