# Independent review of the curvature-refined exclusion

## Verdict

Claim grade: derived. The frozen [curvature-refined theorem](overnight-c-curvature-refined-exclusion.md) is valid. Under the unchanged logarithmic equation and the stated complete circular histories, the radius box $r_1=1$, $r_2\in[6/5,7/5]$, $r_3\in[8/5,9/5]$ admits no exact circular balance at any phases when $|\omega|\le3/100$. The exact strict margin is $4679079917/72711925000$. No correction to the subject is required.

The improvement is mathematical rather than a change of law. The average source velocity permits an exact cancellation in an intermediate comparison; the actual source factor remains evaluated at emission. A bound on circular acceleration controls the full difference between those velocities. Pairing the complementary distances to antipodal endpoints then reduces the aggregate error without dropping any directed hit.

This review supplies a separately reconstructed proof and exact-arithmetic corroboration. It does not admit an exact reference, establish stability, complete the interval search at higher angular rates, or confer scientific acceptance. The earlier [independent slow-theorem review](overnight-c-slow-rotation-independent-review.md) and its subject remain unchanged.

Falsifiers are a failed cancellation identity, an invalid average-to-emission velocity estimate, a missing directed row, an underestimated distance or radius maximum, erroneous exact arithmetic, or an exact full-vector solution satisfying the complete assumptions below. A result outside the radius or angular-rate bounds would not contradict this theorem.

## Fixed equation and complete root domain

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies the inverse-distance response with unchanged transmitter weight. The [C assignment](overnight-braid-research-plan-2026-10-06.md#c-logarithmic-planar-three-binary-geometry) supplies the authorized three-pair class. With $K_{\log}=c_f=1$ and unit polarities, write the complete paths as

$$
X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)},\qquad q_{a,s}=s,
\qquad a=1,2,3,\quad s=\pm1,
$$

for all real times. The phases are arbitrary. The three fixed neutral pairs are antipodal and coplanar, with coincident centers and one common angular rate. The radius normalization is a scale gauge; it does not select a preferred physical length. At reception time zero the per-hit acceleration is

$$
q_iq_j\frac{z}{|z|^2|D|},
\qquad z=X_i(0)-X_j(-\tau),\qquad |z|=\tau>0,
\qquad D=1-\frac{z}{|z|}\cdot\dot X_j(-\tau).
$$

Every ordinary positive-delay self and partner root is included. No speed ceiling, receiver factor, altered coefficient, or event prescription is used.

Claim grade: derived. Each source speed is at most $(3/100)(9/5)=27/500<1$. Distinct present positions have positive separation: at least two within an antipodal pair and at least $1/5$ between different radii. For fixed receiver and source, let $h(\tau)=|X_i(0)-X_j(-\tau)|-\tau$. Bounded source speed implies

$$
h(\tau_2)-h(\tau_1)\le-\left(1-\frac{27}{500}\right)(\tau_2-\tau_1)
\quad(\tau_2>\tau_1\ge0).
$$

For partners, $h(0)>0$ and $h(\tau)<0$ when $\tau>r_i+r_j$, giving exactly one positive root over the entire delay half-line. For self, $h(0)=0$ and strict decrease excludes every positive root. At each partner root, $D\ge473/500>0$ and the range is positive. Thus thirty directed partner hits and zero positive-delay self hits exhaust the law throughout the extended box. The argument is valid for either sign of angular rate and at every reception time. It does not reuse the earlier theorem's smaller numerical speed margin.

## Exact average-velocity comparison

Claim grade: derived. Fix one of the thirty directed roots. Write $x_i=X_i(0)$, $x_j=X_j(0)$, $y=x_i-x_j$, $d=|y|$, and $z=\tau n$ with $|n|=1$. Introduce the average source velocity and its comparison weight,

$$
u=\frac{X_j(0)-X_j(-\tau)}{\tau},
\qquad \overline D=1-n\cdot u.
$$

The exact relation is $y=\tau(n-u)$. If $v_j=|\omega|r_j$, then $|u|\le v_j$ because $u$ is the mean of source velocities with that fixed magnitude. In particular $\overline D\ge1-v_j>0$. This quantity is introduced only to compare two algebraic expressions; the actual equation continues to use $D$ at emission.

Decompose $u=\eta n+b$, where $\eta=n\cdot u$ and $b\cdot n=0$. Set $L=|n-u|^2=(1-\eta)^2+|b|^2$. Then $d=\tau\sqrt L$ and direct common-denominator subtraction gives

$$
\frac{n}{\tau(1-\eta)}-\frac{y}{d^2}
=\frac{|b|^2 n+(1-\eta)b}{\tau(1-\eta)L}.
$$

The two numerator terms are orthogonal. Their squared norm is $|b|^4+(1-\eta)^2|b|^2=|b|^2L$, so

$$
\left|\frac{z}{|z|^2\overline D}-\frac{y}{d^2}\right|
=\frac{|b|}{\overline D\,d}
\le\frac{v_j}{(1-v_j)d}.
$$

This identity isolates precisely what cancels: if the average velocity is parallel to $n$, then $b=0$ and the comparison difference is zero. Transverse average motion remains. The proof uses exact Euclidean algebra and no expansion in angular rate.

To recover the actual source weight, let $V_e=\dot X_j(-\tau)$. Since the prescribed circle has $|\ddot X_j(t)|=\omega^2r_j$ for every time, integration from emission gives

$$
|u-V_e|
\le\frac1\tau\int_0^\tau|\dot X_j(-\tau+s)-\dot X_j(-\tau)|\,ds
\le\frac1\tau\int_0^\tau\omega^2r_j s\,ds
=\frac{\omega^2r_j\tau}{2}.
$$

The difference $D-\overline D=n\cdot(u-V_e)$ therefore has magnitude at most this bound. Both weights are positive and at least $1-v_j$, yielding

$$
\left|\frac{z}{|z|^2D}-\frac{z}{|z|^2\overline D}\right|
=\frac{|D-\overline D|}{\tau D\overline D}
\le\frac{\omega^2r_j}{2(1-v_j)^2}.
$$

Adding these two comparisons proves the complete row bound

$$
\left|\frac{z}{|z|^2D}-\frac{y}{d^2}\right|
\le\frac{|\omega|r_j}{(1-v_j)d}
+\frac{\omega^2r_j}{2(1-v_j)^2}.
$$

All terms are retained. The cancellation of $\tau$ in the second bound follows from the inverse-distance kernel and the integrated velocity difference; it is not an assumption of short delay. Multiplication by $q_iq_j$ preserves this norm estimate.

## Antipodal distances and directed accounting

Claim grade: derived. For two distinct radii $a<b$, write $c=a^2+b^2$ and $x=2ab\cos\phi$. The two endpoint distances satisfy $d_-^2=c-x$ and $d_+^2=c+x$. Because $2ab<c$, both remain positive at every phase. The reciprocal sum $f(x)=(c-x)^{-1/2}+(c+x)^{-1/2}$ is even, and for $0\le x<c$ its derivative is

$$
f'(x)=\frac12\left[(c-x)^{-3/2}-(c+x)^{-3/2}\right]\ge0.
$$

It is maximized at $|x|=2ab$, proving

$$
\frac1{d_-}+\frac1{d_+}\le\frac1{b-a}+\frac1{b+a}.
$$

For the four endpoint combinations between these two binaries, equal endpoint signs have distance $d_-$ and opposite signs have distance $d_+$. Counting both directed orientations gives four rows at each distance. After multiplication by receiver radius, every numerator in the first row bound is $|\omega|ab$. Replacing each positive denominator $1-v_j$ by the common floor $1-v$, where $v\le(9/5)|\omega|$, gives the full cross-pair upper bound

$$
\frac{4|\omega|ab}{1-v}\left(\frac1{b-a}+\frac1{b+a}\right).
$$

The radius function in brackets including its prefactor is $H(a,b)=2ab^2/(b^2-a^2)$. Its exact derivatives are

$$
\frac{\partial H}{\partial a}=\frac{2b^2(b^2+a^2)}{(b^2-a^2)^2}>0,
\qquad
\frac{\partial H}{\partial b}=-\frac{4a^3b}{(b^2-a^2)^2}<0.
$$

Its maxima are therefore obtained at the largest smaller radius and smallest larger radius. For binary pairs $(1,2)$, $(1,3)$, and $(2,3)$ they are respectively $72/11$, $128/39$, and $896/75$. These separate maxima need not be attained simultaneously; summing upper bounds remains valid.

Each binary also has two directed intrapair rows at distance $2r_a$. Their combined first-order bound is $|\omega|r_a/(1-v)$. The six intrapair and twenty-four cross-pair rows therefore give

$$
E_1\le\frac{C|\omega|}{1-(9/5)|\omega|},
\qquad
C=\frac{21}{5}+4\left(\frac{72}{11}+\frac{128}{39}+\frac{896}{75}\right)
=\frac{979157}{10725}.
$$

Here $E_1$ bounds the first part of the scalar-contraction error. For the curvature part, multiply the second row bound by the receiver radius and sum all thirty rows:

$$
E_2\le\frac{\omega^2}{2(1-v)^2}\sum_{i\ne j}r_ir_j.
$$

There are two members at each radius. The ordered sum equals $(2\sum_ar_a)^2-2\sum_ar_a^2$. More directly, each of its individual positive products is increasing in every radius it contains, so its maximum is obtained with $(r_1,r_2,r_3)=(1,7/5,9/5)$. At that corner the sum is $1454/25$. This proves

$$
E_2\le\frac{727\omega^2}{25(1-(9/5)|\omega|)^2}.
$$

The ordered-sum argument avoids treating the negative square term in its compact formula as independently monotone.

## Scalar contradiction and exact endpoint

Claim grade: derived. The stationary comparison at the same present positions is $A_i^0=\sum_{j\ne i}q_iq_j(x_i-x_j)/|x_i-x_j|^2$. Pairing its two directed terms for every unordered pair gives the scalar contraction

$$
V_0=\sum_i x_i\cdot A_i^0=\sum_{i<j}q_iq_j
=\frac{(\sum_iq_i)^2-\sum_iq_i^2}{2}=-3.
$$

This is an algebraic identity of the selected kernel, without importing a mechanical virial theorem or mass. Summing the complete row estimates gives $|V-V_0|\le E_1+E_2$, where $V=\sum_i x_i\cdot A_i$. Exact circular acceleration would require $V=-\omega^2I$, with $I=2\sum_ar_a^2\le62/5$. Consequently every exact balance would have to satisfy $3\le E_1+E_2+\omega^2I$.

The displayed upper bounds increase with $u=|\omega|$ for $0\le u\le3/100$: $u/(1-(9/5)u)$ is increasing and positive, its square is increasing, and so is $u^2$. Evaluation at the endpoint therefore controls the full closed angular-rate interval. Independently reconstructed exact arithmetic gives

$$
E_1\le\frac{979157}{338195},
\qquad E_2\le\frac{6543}{223729},
\qquad \omega^2I\le\frac{279}{25000},
$$

and

$$
3-\frac{979157}{338195}-\frac{6543}{223729}-\frac{279}{25000}
=\frac{4679079917}{72711925000}>0.
$$

Thus the necessary circular identity fails uniformly, including zero angular rate, either rotation orientation, every phase, and all radius-box boundaries. A full-vector solution cannot exist when this necessary scalar identity fails. No separate tangential or stability calculation is needed for the exclusion.

## Independent arithmetic controls and receipts

The [review instrument](../evidence/overnight-c-review-curvature-exact.py) was written independently using only Python's exact rational arithmetic. It imports no subject implementation or author-side receipt. Before target arithmetic, its [controls](../evidence/overnight-c-review-curvature-controls.json) checked $1/2+1/3=5/6$, a signed rational quotient, purely longitudinal cancellation, and the mixed case $n=(1,0)$, $u=(1/5,3/10)$, $\tau=2$. In that mixed case, both sides of the squared cancellation identity equal $225/4672$. It also checked the reciprocal-distance sum $1/(2-1)+1/(2+1)=4/3$ and ordered-product sums for two and four unit-radius members. These expectations were specified before the control run.

Only after those controls passed did the target mode reconstruct the three radius maxima, directed cross-distance multiplicities, ordered radius sum, coefficients, and endpoint margin. The [target receipt](../evidence/overnight-c-review-curvature-target.json) reports four rows at each complementary distance, maximum speed $27/500$, source-clock floor $473/500$, and all exact constants displayed above. This is measured arithmetic corroboration of the analytical proof, not numerical sampling of continuous geometry.

The commands, both exiting zero under the executable shared venv, were:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-curvature-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-curvature-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-curvature-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-curvature-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-curvature-target.json
```

The instrument hash is `1a1f6ab9d620001c3ab69526f2f2e52cf075ab1b0fb5374f6132c1bbdfc5dd84`; the target mode requires a successful controls receipt matching that exact hash. `shasum -a 256` measured the frozen subject as `e4f0950f89918172cb523f6f7b14e630ef36fa8889fe76a9a3ae0e5210dedf83`, matching the assignment. Hashes establish identity, not mathematical validity.

Scoped validation parsed the new Python source with `ast.parse` under the shared venv and checked all seven relative file-link targets with `test -f`; both exited zero. `git diff --no-index --check /dev/null` on this new Markdown returned 1 against the empty source and emitted no whitespace diagnostics. Final `shasum -a 256` measurements retained the assigned curvature-subject hash and the earlier slow-subject hash `474642e44b3d51f6a288bac7558f535f68126b6b63cf30db938ce3a7bcbfa25c`. `git --no-optional-locks status --short` restricted to this review's four new paths listed those four as untracked; that inspection establishes no broader checkout condition.

Files created by this review are this companion, `evidence/overnight-c-review-curvature-exact.py`, `evidence/overnight-c-review-curvature-controls.json`, and `evidence/overnight-c-review-curvature-target.json`, all under the Braid Program owner. No subject, earlier review, shared owner, or production file was edited. No search, target evolution, or sustained computation was launched.

No mathematical blocker was found for this extension. The proof does not cover $|\omega|>3/100$, other radius ratios, noncircular or unequal-rate histories, stability, or all-future evolution. The parent owns integration and any acceptance decision; this reviewer stops with the bounded derived verdict.
