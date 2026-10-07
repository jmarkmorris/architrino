# Independent review of the outer-radius bound below thirty-five

## Verdict and limits

Claim grade: derived. The frozen [thirty-five-radius theorem](overnight-c-outer-radius-thirty-five-bound.md), SHA-256 `d082bd6040cd7b7270ea2c414373a95fce5ca9faee5ff35a6ba12666ef786275`, is valid. No mathematical defect was found. The complementary-distance estimate has the correct directed multiplicities; all four separated bands have strict exact margins; and the near-radius band has the claimed full-vector contradiction. Together they exclude $r_3\ge35$ in the unchanged strictly subfield common-center circular class.

The assumptions remain complete histories $X_{a,\sigma}(t)=\sigma r_a e^{i(\omega t+\phi_a)}$, fixed antipodal neutral pair identities, unit polarities, $r_1=1<r_2<r_3$, arbitrary phases, $K_{\log}=c_f=1$, and $|\omega|r_3<1$. Every ordinary positive-delay root and its original transmitter factor is retained. The result gives no exact configuration below 35, no whole-class exclusion, no stability or superfield result, and no compactness or continuation through collision or speed boundaries. Thirty-five is not established as optimal. The reviewer role does not grant physical acceptance; the parent owns integration.

## Root census and scalar reference

The [selected logarithmic equation](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) gives each ordinary contribution as $q_iq_j n/(\tau|D|)$, where the causal chord is $\tau n$ and $D=1-n\cdot V_j(t-\tau)$. For each fixed finite configuration, $u r_j<1$ with $u=|\omega|$. Therefore distance minus delay decreases over any positive delay increment by at least $(1-u r_j)$ times that increment. It is positive at zero for distinct labels, and negative beyond $r_i+r_j$. Each of the 30 directed partner channels has one positive root with $D\ge1-u r_j>0$. For self it starts at zero and is strictly negative at every positive delay. This proves complete partner-root coverage and no positive self roots over the entire delay half-line.

The four inner labels have radii $(1,1,r,r)$ and two polarities of each sign. Their instantaneous comparison contraction is

$$
\sum_i x_i\cdot A_i^0=\sum_{i<j}q_iq_j=-2.
$$

The equality follows by grouping the two directed terms for each unordered pair; it uses no equilibrium assumption. The relevant exact radius sums are

$$
C(r)=\sum_{i\ne j}r_ir_j=2+8r+2r^2,
\quad I(r)=\sum_i r_i^2=2+2r^2,
\quad O(r)=2\sum_i r_i=4+4r.
$$

There are twelve internal directed rows and eight outer-to-inner rows. The outer receivers' remaining ten rows are still present in the full equation; the proof only needs necessary consequences of the four inner equations.

## Complementary-distance sum reconstructed

For a single antipodal pair of radius $a$, each of its two directed factors $r_ir_j/d_{ij}$ is $a^2/(2a)=a/2$. Thus the two inner pairs contribute $1+r$ to the internal weighted reciprocal-distance sum.

For the cross-pair rows, let $k=1+r^2$ and $c=\cos\phi_2$. The two present distances are $d_\pm=\sqrt{k\pm2rc}$. There are two unordered cross-pair pairs at each distance, hence four directed rows at each distance; every radius product is $r$. Therefore the exact sum before taking a phase bound is

$$
\sum_{i\ne j}\frac{r_ir_j}{d_{ij}}
=1+r+4r\left((k-2rc)^{-1/2}+(k+2rc)^{-1/2}\right).
$$

The reciprocal sum is even in $c$. On $0\le c\le1$ its derivative is

$$
r\left((k-2rc)^{-3/2}-(k+2rc)^{-3/2}\right)\ge0,
$$

because both arguments are positive when $r>1$. Its maximum is thus at $|c|=1$, where the two distances are $r-1$ and $r+1$. This proves

$$
\sum_{i\ne j}\frac{r_ir_j}{d_{ij}}
\le1+r+4r\left(\frac1{r-1}+\frac1{r+1}\right)
=1+r+\frac{8r^2}{r^2-1}.
$$

The right side is the phase maximum, not the exact sum at a general phase. The fraction $8r^2/(r^2-1)$ has derivative $-16r/(r^2-1)^2<0$. On $L\le r\le M$, bounding the increasing term by $1+M$ and the decreasing fraction by its value at $L$ gives the conservative bound

$$
A_{L,M}=1+M+\frac{8L^2}{L^2-1}.
$$

This proof justifies the entire phase interval and radius band without sampling or optimizing phase numerically.

## Finite causal inequality on each separated band

The [independently derived finite comparison](overnight-c-distant-outer-independent-review.md#independent-derivation-of-the-finite-causal-correction) bounds the internal row difference by

$$
\frac{u r_j}{(1-u r_j)d_{ij}}+
\frac{u^2r_j}{2(1-u r_j)^2}.
$$

It follows from exact subtraction using the average source velocity, followed by the circular remainder $|\bar v-v_e|\le u^2r_j\tau/2$; the actual emission factor remains present. After multiplication by receiver radius, the first sum is at most $A_{L,M}u/(1-Mu)$. The second is at most $C(M)u^2/[2(1-Mu)^2]$.

For either outer source and any inner receiver of radius $a\le M$, the delayed range is at least $s-M$. The circle-height identity $\ell^2-s^2\sin^2\theta=(a-s\cos\theta)^2$ gives projected source speed at most $ua$, so $D\ge1-Mu$. The outer scalar error is therefore at most $O(M)/[(s-M)(1-Mu)]$. The required circular scalar norm is at most $I(M)u^2$.

Writing actual inner contraction as $-2+e=-u^2\sum_i r_i^2$ gives the necessary inequality

$$
2\le\frac{A_{L,M}u}{1-Mu}
+\frac{C(M)u^2}{2(1-Mu)^2}
+\frac{O(M)}{(s-M)(1-Mu)}+I(M)u^2.
$$

All terms increase or stay constant with $u\in[0,1/M)$. Substituting $u\le1/s$ yields $A_{L,M}/(s-M)+(C(M)/2+O(M)s)/(s-M)^2+I(M)/s^2$. The first and last terms decrease with $s>M$, and the middle term has derivative

$$
-\frac{O(M)s+O(M)M+C(M)}{(s-M)^3}<0.
$$

Therefore its upper value on $s\ge35$ occurs at $s=35$. Independent exact evaluation confirms:

| Band | $A_{L,M}$ | Upper value $Q_{L,M}$ | Positive margin $2-Q_{L,M}$ |
| --- | --- | --- | --- |
| $[2,3]$ | $44/3$ | $392509/376320$ | $360131/376320$ |
| $[3,4]$ | $14$ | $1462249/1177225$ | $892201/1177225$ |
| $[4,5]$ | $218/15$ | $1333/882$ | $431/882$ |
| $[5,6]$ | $46/3$ | $5646527/3090675$ | $534823/3090675$ |

Each positive margin contradicts the required scalar contraction throughout that band, for all phases and all allowed angular rates.

## The near-radius band

For $1<r\le2$, let $d$ be the minimum inner present distance. Using $M=2$, $C=26$, $I=10$, $O=12$ and the simpler weighted-distance bound $\sum r_ir_j/d_{ij}\le C/d$ gives

$$
2\le\frac{26}{(s-2)d}+H(s),\qquad
H(s)=\frac{13+12s}{(s-2)^2}+\frac{10}{s^2}.
$$

The same derivative argument makes $H$ decreasing. Exact arithmetic gives $H(35)=108263/266805<41/100$. For every $s\ge35$ it follows that

$$
d<\frac{26}{33(159/100)}=\frac{2600}{5247}<\frac12.
$$

Strictness holds even at $s=35$ because $H(35)<41/100$. The final comparison is $5200<5247$. Same-pair distances are at least two, so the minimum is cross-pair. If $x$ is the positive unit receiver, antipodal symmetry lets one middle endpoint $y_*$ realize $|x-y_*|=d$. The opposite endpoint obeys $|x+y_*|\ge2-d>3/2$. Its polarity can be either sign; the argument uses norms.

A source with speed bounded by $v<1$ and present separation $h$ has $h/(1+v)\le\tau\le h/(1-v)$ by the full source-displacement bound, and $1-v\le D\le1+v$. Its row norm is therefore bounded below by $(1-v)/[(1+v)h]$ and above by $(1+v)/[(1-v)h]$. With $v=2/35$ and $U=1/35$,

$$
|A_{\mathrm{near}}|>\frac{66}{37}>\frac74.
$$

The receiver's other four rows are its own antipode, the far middle endpoint, and both outer sources. The own antipode has $D_0=1+u\sin(u\tau_0/2)\ge1$ and $\tau_0\ge2/(1+u)$, so its norm is at most $18/35$. The far middle row is strictly below $74/99$ by its separation greater than $3/2$. The two outer row norms sum to at most $2s/(s-1)^2\le35/578$ by the unit-receiver circle-height estimate. Required circular acceleration has norm at most $U^2=1/1225$.

Full-vector balance would therefore imply

$$
|A_{\mathrm{near}}|<
\frac{18}{35}+\frac{74}{99}+\frac{35}{578}+\frac1{1225}
=\frac{92747407}{70096950}<\frac43.
$$

This contradicts the near lower bound by more than $5/12$. Direct exact subtraction of the less-rounded comparison values gives $66/37-92747407/70096950=1194744641/2593587150>0$. All five ordinary partner rows at the receiver are included; the earlier census excludes hidden repeated hits or positive self hits.

## Complete radius coverage

For $s\ge35$, the [preceding independently reviewed radius condition](overnight-c-separated-radius-independent-review.md#monotonicity-and-exact-corners) already excludes $r_2\ge6$ because $s\ge30$. Every remaining $1<r_2<6$ belongs to $(1,2]$ or one of $[2,3]$, $[3,4]$, $[4,5]$, $[5,6]$. Shared integer endpoints are covered twice rather than omitted; the extra endpoint six is harmless. The root census and estimates remain valid on each shared endpoint because the inner radii still differ. Thus the cases prove the claimed continuous exclusion, including $s=35$.

## Independent controls and exact receipts

The [separate checker](../evidence/overnight-c-review-thirty-five-exact.py) imports no subject implementation. Its [known-first controls](../evidence/overnight-c-review-thirty-five-controls.json) passed before target mode: the elementary fraction sum; direct twelve-row weighted-distance enumeration for aligned radii $(1,1,2,2)$ giving $41/3$; orthogonal radii $(1,1,4/3,4/3)$ using exact $3$-$4$-$5$ distances and giving $131/15$; and $C=26$, $I=10$, $O=12$ at $r=2$. These geometry controls exercise both complementary-distance multiplicities without claiming an exact circular solution.

The later [target receipt](../evidence/overnight-c-review-thirty-five-target.json) confirms all four band constants and margins, the near-band remainder and strict distance comparison, every cancellation term, and the exact vector comparison gap. Continuous conclusions come from the analytical bounds above, not those finite substitutions alone.

Both commands exited 0 under the shared venv in the listed order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-thirty-five-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-thirty-five-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-thirty-five-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-thirty-five-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-thirty-five-target.json
```

Checker SHA-256: `4ffea3a92825053fee158e0ed58c42bb1bcb84acc24f386195fd9f17a2922c34`. Target mode requires successful controls matching that checker hash. The live role directory was relisted and the assigned role reread; `shasum -a 256` matched the assigned subject hash before review.

Scoped validation: standard-library `ast.parse` accepted the new checker under the shared venv, exit 0. Final `shasum -a 256` retained the subject and checker identities. `git diff --no-index --check /dev/null` on the new report emitted no whitespace diagnostics and returned 1 for the difference from an empty source.

Falsifiers are a missing ordinary root, wrong directed complementary-distance multiplicity, a failure of the phase maximum or radius monotonicity, an omitted band or source, a wrong per-row delay/source-factor bound, a failed exact margin, a wrong near/far pairing, or an exact allowed configuration with $r_3\ge35$. The exact checker can refute the numerical fractions directly; a geometric counterexample requires revisiting the stated equation and analytical bounds.

Only this report and its three `overnight-c-review-thirty-five-*` evidence companions were authored. Frozen subjects, earlier reviews and instruments, shared owners, production files, and the active cover were not changed by this review. No numerical search, sustained job, or cover replay was launched. No mathematical blocker remains for this result; final-cover evidence adjudication remains separate.
