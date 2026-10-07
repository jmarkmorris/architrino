# Independent review of the separated-radius necessary condition

## Verdict and scope

Claim grade: derived. No mathematical defect was found in the frozen [separated-radius corollary](overnight-c-separated-radius-necessary-condition.md), SHA-256 `7e5edbbb0ff86b30fda6ba47a2044a646fcfa4a37a068ec8b4f20beb0824f3fe`. Its necessary inequality, two continuous excluded domains, and asymptotic conclusion $\limsup r_2\le5$ are valid for the declared logarithmic common-center circular class.

This is a necessary restriction. It establishes neither any exact configuration nor a sequence of such configurations. The result assumes $r_1=1<r_2<r_3$, complete circular histories, arbitrary relative phases, unit opposite polarities within each antipodal pair, $K_{\log}=c_f=1$, and $|\omega|r_3<1$. It does not cover the speed boundary, superfield histories, noncircular motion, stability, or nonlinear fate. The reviewer role provides no acceptance authority; the parent owns integration.

## Reconstruction from the equation

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) gives, at each ordinary positive-delay root, the acceleration contribution

$$
q_iq_j\frac{z}{|z|^2|D|},\qquad
z=X_i(t)-X_j(t-\tau),\quad |z|=\tau,
\quad D=1-\frac{z}{|z|}\cdot\dot X_j(t-\tau).
$$

No transmitter factor, positive-delay self channel, or source has been removed. For any fixed finite configuration, source speed $u r_j<1$, where $u=|\omega|$. The function $h(\tau)=|X_i(t)-X_j(t-\tau)|-\tau$ obeys

$$
h(\tau_2)-h(\tau_1)\le-(1-u r_j)(\tau_2-\tau_1)<0
\qquad(\tau_2>\tau_1).
$$

For different members, $h(0)>0$: within a pair the distance is twice its radius, and between pairs it is at least the positive radius difference. For $\tau>r_i+r_j$, $h(\tau)<0$. Hence each of the 30 directed partner channels has exactly one positive root, with $D\ge1-u r_j>0$. For self, $h(0)=0$ and strict decrease forbids a positive root. This controls the entire delay half-line separately for every finite radius choice; compactness or a uniform speed gap over all configurations is unnecessary.

Reflection preserves the equation and maps negative angular rates to positive ones while reflecting the phases. It suffices to use $u\ge0$. Place the positive inner receiver at one on the real axis. For its negative partner let $x=u\tau_0/2$. Since $0<\tau_0\le2$ and $u<1/r_3<1$, $0\le x<1<\pi/2$. The causal chord relation and source factor are therefore

$$
\tau_0=2\cos x,\qquad D_0=1+u\sin x.
$$

The radial projection of $z/|z|^2$ equals $1/2$ on this antipodal root, and opposite polarity gives the actual contribution $A_{r,0}=-1/(2D_0)$. Using $\sin x\le x$ and $\tau_0\le2$ yields $D_0\le1+u^2$. Thus, for $s=r_3$,

$$
A_{r,0}\le-\frac1{2(1+u^2)}
\le-\frac{s^2}{2(s^2+1)}.
$$

The negative sign and reciprocal direction are essential: the upper bound weakens the inward contribution conservatively.

For any of the four outer sources, let $b>1$ be its radius and $\theta$ its delayed angle relative to the inner receiver. Then

$$
d^2=1+b^2-2b\cos\theta,\qquad
d^2-b^2\sin^2\theta=(1-b\cos\theta)^2\ge0.
$$

Consequently $|n\cdot V_j|\le u$ and $D\ge1-u>0$, even when the full outer speed is close to one. Since $d\ge b-1$, each radial contribution, of either polarity and at any phase, is bounded above by its vector norm $1/[(1-u)(b-1)]$. There are two sources at $r=r_2$ and two at $s=r_3$. Summation gives

$$
A_{r,\mathrm{outer}}\le
\frac2{1-u}\left(\frac1{r-1}+\frac1{s-1}\right)
\le\frac{2s}{s-1}\left(\frac1{r-1}+\frac1{s-1}\right).
$$

Circular kinematics at the inner radius requires $A_r=-u^2$. Its necessary residual $F=A_{r,0}+A_{r,\mathrm{outer}}+u^2$ therefore satisfies

$$
F\le B(r,s)=\frac1{s^2}-\frac{s^2}{2(s^2+1)}
+\frac{2s}{s-1}\left(\frac1{r-1}+\frac1{s-1}\right).
$$

If $F=0$, necessarily $B\ge0$, proving the stated condition. Indeed $u^2<1/s^2$ makes this chain strict, so $B=0$ is also incompatible with an exact configuration under strict subfield speed. The subject's weaker necessary statement and its use of $B<0$ are conservative and valid; this observation is not required for either displayed exclusion.

## Monotonicity and exact corners

For all $r,s>1$, direct differentiation gives

$$
\partial_r B=-\frac{2s}{(s-1)(r-1)^2}<0,
$$

$$
\partial_s B=-\frac2{s^3}-\frac{s}{(s^2+1)^2}
-\frac2{(s-1)^2}\left(\frac1{r-1}+\frac1{s-1}\right)
-\frac{2s}{(s-1)^3}<0.
$$

Thus a negative lower corner bounds the entire upper rectangle before intersecting with $r<s$. The corner itself need not satisfy strict radius ordering for this algebraic comparison. Independent exact arithmetic gives

$$
B(7,20)=-\frac{6005717}{173713200},\qquad
B(6,30)=-\frac{9000059}{681966900},\qquad
B(11,11)=-\frac{35161}{738100}.
$$

The first two establish the subject's additional continuous excluded domains. The third agrees algebraically with the earlier radius-eleven bound, without treating equal outer radii as an admissible configuration or as a scientific control.

## Unbounded outer-radius limit

Writing

$$
C(s)=\frac{s^2}{2(s^2+1)}-\frac1{s^2}-\frac{2s}{(s-1)^2}
$$

gives $B=-C(s)+2s/[(s-1)(r-1)]$. If $C(s)>0$, the necessary condition implies

$$
r\le U(s):=1+\frac{2s}{(s-1)C(s)}.
$$

There is no hidden assumption that $r$ has a limit. The rational expansion

$$
C(s)=\frac{s^6-6s^5-s^4-4s^2+4s-2}
{2s^2(s^2+1)(s-1)^2}
$$

shows $C(s)\to1/2$ by leading coefficients and hence $U(s)\to5$. In particular, $C$ is eventually positive. More explicitly, $C(20)=22319239/57904400>0$ and

$$
C'(s)=\frac{s}{(s^2+1)^2}+\frac2{s^3}+\frac{2(s+1)}{(s-1)^3}>0.
$$

For any hypothetical exact sequence with $s_n\to\infty$, the inequality $r_n\le U(s_n)$ holds eventually. Given any $\epsilon>0$, eventually $U(s_n)<5+\epsilon$, and therefore $\limsup r_n\le5$. Nothing in this argument constructs such a sequence or excludes every middle radius at or below five.

## Independent controls, receipts, and falsifiers

The [separate rational checker](../evidence/overnight-c-review-separated-radius-exact.py) imports no subject implementation. Its [known-first controls](../evidence/overnight-c-review-separated-radius-controls.json) passed before target arithmetic: an elementary fraction sum, the hand-computed value $B(2,3)=749/180$, the static antipodal radial row $-1/2$, and the exact circle-height equality at $b=5/3$, $\cos\theta=3/5$, $\sin\theta=4/5$, $d=4/3$. These controls validate the arithmetic and geometric identity; they are not asserted to be exact six-member configurations.

The subsequent [target receipt](../evidence/overnight-c-review-separated-radius-target.json) independently summed the circular term, the antipodal upper contribution, and four source-norm bounds using exact fractions. It returned the three displayed negative corners and positive $C(20)$, and checked the expanded $C$ identity at five rational arguments. The symbolic derivation above, rather than finite substitutions, establishes monotonicity and the limiting statement.

Both shared-venv commands exited 0, in this order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-separated-radius-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-separated-radius-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-separated-radius-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-separated-radius-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-separated-radius-target.json
```

Checker SHA-256: `bf7a948aa254600a9d499fbe2a3f7c542457ff4b4f0d71e8b1198f3bab527dd5`. Target execution requires its own hash-matching passed controls receipt. The live Specialist directory was relisted, the assigned role reread, and `shasum -a 256` matched the frozen subject before review.

Scoped validation: standard-library `ast.parse` accepted the new checker under the shared venv, exit 0. Final `shasum -a 256` retained both subject and checker identities. `git diff --no-index --check /dev/null` for this new report emitted no whitespace diagnostics and returned 1 for the difference from an empty source.

Falsifiers are a missing admitted root, a wrong transmitter projection or antipodal radial formula, an incorrect reciprocal inequality direction, a nonnegative displayed corner after exact reevaluation, failure of either derivative sign, or an exact allowed configuration with $B<0$. A hypothetical exact sequence with $s_n\to\infty$ and $\limsup r_n>5$ would also contradict the result and requires inspection of the same bound chain.

Only this report and the three newly prefixed evidence companions were authored. No subject, earlier checker, shared owner, runtime cover, or publication state was changed. No sustained computation or cover replay was launched. No mathematical blocker remains for this corollary; physical acceptance and integration are outside this review.
