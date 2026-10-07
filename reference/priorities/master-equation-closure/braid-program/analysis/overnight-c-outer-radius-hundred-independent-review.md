# Independent review of the outer-radius bound below one hundred

## Verdict and boundary

Claim grade: derived. No mathematical defect was found in the frozen [hundred-radius theorem](overnight-c-outer-radius-hundred-bound.md), SHA-256 `c6db6f1ffde26f0f272e8899a50fe162090a91eb95f1c943313ff4b80896a788`. Retaining the exact directed radius products validly strengthens the earlier finite-radius argument. Under the unchanged logarithmic equation, any exact strictly subfield configuration of the declared three common-center neutral antipodal circular pairs with $r_1=1<r_2<r_3$ must satisfy $r_3<100$.

All relative phases, both angular directions, and zero angular rate are covered. Complete histories, unit polarities, $K_{\log}=c_f=1$, every ordinary positive-delay root, and the original transmitter factor are retained. The result does not establish existence below one hundred, exclude the full class, prove compactness of the remaining ordinary domain, or address superfield motion, stability, or actual-time contact. The bound is not proved optimal. This is independent mathematical review, not physical acceptance; the parent owns integration.

## Equation and root census

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies each ordinary contribution as

$$
q_iq_j\frac n{\tau|D|},\qquad
X_i(t)-X_j(t-\tau)=\tau n,\qquad
D=1-n\cdot\dot X_j(t-\tau),
$$

in the selected units. For each fixed finite configuration, the source speed $u r_j<1$, with $u=|\omega|$, makes distance minus delay strictly decreasing: its change over a positive delay increment is at most $-(1-u r_j)$ times that increment. Different labels have positive present separation and distance minus delay is negative beyond $r_i+r_j$. Every directed partner channel therefore has exactly one positive root. It is ordinary because $D\ge1-u r_j>0$. The self channel starts at zero and is strictly negative thereafter, so has no positive root. This establishes all 30 partner roots and zero positive self roots on the full delay half-line, without a uniform speed gap over the whole parameter domain.

Reflection maps negative angular rate to positive angular rate and reflects the phases while preserving the equation. All bounds below depend only on $u$ and radii, so they cover the full phase class. No extra root or source has been suppressed.

## Middle-radius restriction and exact coefficients

Assume for contradiction $s=r_3\ge S=100$. The [independently reviewed radius condition](overnight-c-separated-radius-independent-review.md) gives $B(r_2,s)\ge0$ as a necessary condition; its strict version also holds, but is not needed here. Both partial derivatives of $B$ are negative for radii greater than one. At $M=21/4$,

$$
B(M,S)=-\frac{68357663383}{16663366170000}<0.
$$

Hence any putative exact configuration has $r=r_2<M$. The four inner radii are $(1,1,r,r)$. Direct ordered-label summation gives

$$
C(r)=\left(\sum_i r_i\right)^2-\sum_i r_i^2
=(2+2r)^2-(2+2r^2)=2+8r+2r^2,
$$

$$
I(r)=\sum_i r_i^2=2+2r^2,\qquad
O(r)=\sum_i\sum_{\text{two outer labels}}r_i=4+4r.
$$

Thus $C$ counts all twelve directed internal products, $I$ the four kinematic terms, and $O$ all eight outer-source terms weighted by receiver radius. None is a count of unordered rows. All increase with $r>0$, so at $M$ they give the uniform upper bounds

$$
C=793/8,\qquad I=457/8,\qquad O=25.
$$

For the instantaneous inner comparison, the two directed contributions of each unordered pair contract to $q_iq_j$. The four inner polarities sum to zero and have squared sum four. Therefore the static scalar contraction is exactly $-2$ for every separated inner geometry, independent of radii and phases.

## Inserting the sums into the finite causal estimate

The [independent finite-delay derivation](overnight-c-distant-outer-independent-review.md#independent-derivation-of-the-finite-causal-correction) gives, for the internal row $j\to i$, the norm difference between its actual and instantaneous contributions as at most

$$
\frac{u r_j}{(1-u r_j)|x_i-x_j|}
+\frac{u^2r_j}{2(1-u r_j)^2}.
$$

This follows from the exact average-velocity cancellation $|n/(\tau\bar D)-y/|y|^2|=|\bar v_\perp|/(\bar D|y|)$ and the circular remainder $|\bar v-v_e|\le u^2r_j\tau/2$. It is a finite-delay bound with the actual emission factor, not a truncated expansion.

Multiplying by receiver radius $r_i$, bounding $|x_i-x_j|\ge d$ and $1-u r_j\ge1-uM>0$, then summing the actual $r_i r_j$ products gives the internal scalar error bound

$$
E_{\mathrm{int}}\le\frac{Cu}{(1-Mu)d}
+\frac{Cu^2}{2(1-Mu)^2}.
$$

For each outer source, delayed distance is at least $s-M$. The general circle-height identity at a receiver radius $a$ gives $|n\cdot V_{\mathrm{outer}}|\le ua\le uM$, so $D\ge1-uM$. Summing the eight outer rows after contraction bounds their absolute scalar contribution by $O/[(s-M)(1-Mu)]$. The required circular contraction has magnitude $I(r)u^2\le Iu^2$.

Writing actual inner contraction as $-2+e=-I(r)u^2$ gives $2=e+I(r)u^2$. Thus

$$
2\le E_{\mathrm{int}}+E_{\mathrm{outer}}+Iu^2.
$$

Every right-hand term is nondecreasing in $u$ for $0\le u<1/M$. Since $u<1/s$, replacing $u$ by $1/s$ and simplifying yields

$$
2\le\frac{C}{(s-M)d}+\widetilde H(s),\qquad
\widetilde H(s)=\frac{C/2+Os}{(s-M)^2}+\frac{I}{s^2}.
$$

The sharper numerator sums are therefore inserted with the correct multiplicity and denominator direction. The coefficient $C/2$ retains the curvature one-half; using an unordered count instead would have been incorrect.

## Monotonicity and strict separation bound

For the fixed positive constants above and $s>M$,

$$
\widetilde H'(s)=-\frac{Os+OM+C}{(s-M)^3}-\frac{2I}{s^3}<0.
$$

Independent arithmetic gives

$$
\widetilde H(S)=\frac{3329083937}{11491280000}<\frac3{10}.
$$

Thus $2-\widetilde H(s)>17/10$ for every $s\ge S$, and $s-M\ge379/4>0$. Solving the necessary inequality for $d>0$ gives

$$
d\le\frac C{(s-M)(2-\widetilde H(s))}
<\frac{793/8}{(379/4)(17/10)}
=\frac{3965}{6443}<\frac58.
$$

The first strict sign comes from the strict remainder comparison, even at $s=S$. The last follows from $8\cdot3965=31720<32215=5\cdot6443$. No endpoint at $s=100$ is lost.

Since the two same-pair separations are $2$ and $2r>2$, this minimum is cross-pair. Write the positive unit receiver as $x$, the middle endpoints as $\pm y$. The four cross distances contain two copies each of $|x-y|$ and $|x+y|$, so some middle source $y_*$ satisfies $|x-y_*|=d$. The other source obeys

$$
|x+y_*|=|2x-(x-y_*)|\ge2-d>11/8.
$$

This pairing holds for every relative phase and either source polarity; it merely designates one existing source as nearby.

## All received rows and the exact contradiction

A source with speed at most $v<1$ and present receiver distance $h$ has

$$
\frac h{1+v}\le\tau\le\frac h{1-v},\qquad
1-v\le D\le1+v.
$$

These follow directly from the full source displacement bound $|X_j(t)-X_j(t-\tau)|\le v\tau$. Consequently its unit-polarity row norm lies between $(1-v)/[(1+v)h]$ and $(1+v)/[(1-v)h]$. This bounds vectors by their actual norms and does not assume an emitted chord points in the present radial direction.

Here $v=M/S=21/400$ bounds the middle source speed and $U=1/S=1/100$ bounds the angular rate. Since $d<5/8$,

$$
|A_{\mathrm{near}}|>
\frac{379}{421}\frac85=\frac{3032}{2105}>\frac75.
$$

The other four contributions are exactly the own antipode, the opposite middle endpoint, and both outer members. The own antipode has $D_0=1+u\sin(u\tau_0/2)\ge1$ because $\tau_0\le2$ and $u<1/100$; its delay is at least $2/(1+u)$. Its norm is therefore at most $101/200$. The far middle row has present distance greater than $11/8$, giving norm strictly less than $3368/4169$. At the unit receiver the circle-height estimate bounds the two outer norms by $2s/(s-1)^2\le200/9801$; the function decreases for $s>1$. Circular kinematics requires a vector of norm $u^2\le1/10000$.

If full-vector balance held, rearrangement and the triangle inequality would give

$$
|A_{\mathrm{near}}|<
\frac{101}{200}+\frac{3368}{4169}+\frac{200}{9801}+\frac1{10000}
=\frac{49529218529}{37145790000}.
$$

The four rational terms are individually below $51/100$, $81/100$, $21/1000$, and $1/1000$. Their sum is therefore below $671/500<27/20$. But the near row is greater than $7/5=28/20$. This proves the claimed gap greater than $1/20$. Direct exact subtraction also gives

$$
\frac{3032}{2105}-\frac{49529218529}{37145790000}
=\frac{1673406055291}{15638377590000}>\frac1{20}.
$$

No cancellation direction or polarity is assumed favorable to the proof: the triangle upper bound already permits all other rows to oppose the nearby row optimally. The contradiction accounts for all five roots at this receiver and the prescribed acceleration.

## Known-first controls, receipts, and falsifiers

The [independent exact checker](../evidence/overnight-c-review-hundred-exact.py) imports no subject implementation. Its [controls](../evidence/overnight-c-review-hundred-controls.json) passed before target mode: rational multiplication; direct ordered-label sums at radii $(1,1,2,2)$ with hand-known $C=26$, $I=10$, $O=12$; the six unordered polarity products summing to $-2$; and the exact stationary-source row norm at distance two. These are algebraic controls, not assertions of exact circular solutions.

The later [target receipt](../evidence/overnight-c-review-hundred-target.json) enumerated the radius products at $M=21/4$ independently, then checked the corner, remainder, strict separation, all individual row comparisons, coarse margin, and direct exact margin. Both commands exited 0 under the shared venv in the required order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-hundred-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-hundred-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-hundred-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-hundred-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-hundred-target.json
```

Checker SHA-256: `839e0af48e4eefb6650dc7a96dd0aac95f87b2e5fbd04ec492cd3980774e2827`. Target mode requires a successful controls receipt matching its hash. The role directory was relisted before review, and `shasum -a 256` matched the frozen subject identity.

Scoped validation: standard-library `ast.parse` accepted the new checker under the shared venv, exit 0. Final `shasum -a 256` retained the subject and checker identities. `git diff --no-index --check /dev/null` on the new report emitted no whitespace diagnostics and returned 1 for the difference from an empty source.

Falsifiers are an omitted ordinary hit, failure of the earlier per-row finite-delay inequality, incorrect ordered radius products, a wrong monotonicity or strict comparison, a failure of the antipodal geometric pairing, a reversed norm bound, or an exact allowed configuration with $r_3\ge100$. Arithmetic claims can be tested directly with the separate checker; continuous root and geometry claims rest on the derivations above and their identified equation owner.

Only this report and the three `overnight-c-review-hundred-*` evidence companions were authored. No subject, previous oracle or review, shared owner, production source, or active cover was modified. No numerical search or intensive computation was performed. No mathematical blocker remains for this bounded result; integration and acceptance remain with the parent.
