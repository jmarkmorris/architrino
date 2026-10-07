# A continuous sector account and the remaining radial integral

**Disposition: derived analytical reduction, not global closure. Independent assessment pending.** The inherited radial and angular accounts can be joined continuously by changing the account used inside the radial sector. The resulting quadratic form is uniformly coercive on the admitted negative-account chart, including zero angular magnitude. This removes discrete transition costs exactly. Its derivative leaves an explicit signed radial integral that the presently accepted account budget does not bound. The actual radial equation additionally supplies a cubic budget for radial impulses; that genuine dynamics restriction still does not supply their cumulative linear sum or the required signed integral.

This bounded attempt uses the Jack K. Hale lens and the unchanged canonical nominal pair and admitted complete spatial histories, both actual clocks, original coupling and $c_f=1$. It follows the [accepted attained-sector continuation](overnight2-a-reference-after-return-sector.md). The earlier $P_c$ correction and $S_a'<k\chi$ estimate are inherited from the [frame-free subject](authorized-cases-two-hour-d-secondary-frame-free-attempt.md) and its [independent assessment](authorized-cases-two-hour-d-reference-midpoint-assessment.md), not new results. No abstract comparison is asserted to be an actual history.

The allocation began at 2026-10-07 04:51:31 UTC with a 30-minute limit. The transition-derivative calculation below was derived before the coordinator subsequently suggested examining its leading radial sign. That later suggestion and the proposed planar angular extension are acknowledged as coordinator input. The continuous hybrid and its radial derivative are separately derived here. This is a disclosed continuation of accepted work, not a blind derivation of the inherited accounts.

## Domain and controls before application

Retain $Z=dN$, $U=uN+v$, $W=(V_++V_-)/2$, $a=N\cdot W$, $b=W-aN$, $g=\sqrt{1-|b|^2}$, $k=K/d^2$, $\chi=K/d$, $\Lambda=|v|^2/\chi$ and the corrected midpoint

$$
Y=aN+\alpha b,\qquad \alpha=1-\frac\chi{2g},\qquad
Y'=k(2NN^{\mathsf T}-I)Y+\mathcal R,\qquad
|\mathcal R|\le66k\chi M.
$$

Here $M$ is the supremum over the full generated midpoint prefix, including all earlier source windows. Work first on an ordinary partial continuation from the actual negative-account stationary-radius time $T_B$, with $J<0$, generated member speeds at most $.01$ and $\chi\le1/15000$. The accepted pointwise barrier then gives $\chi<2\times10^{-24}$ and $|U|^2<C\chi$, $C=4.04$, as long as this chart persists. Also $J'\ge(3/2)k\chi$ and $0<j_B=-J_B<10^{-36}$. The fixed source condition $t>4d(t)$ persists on this provisional chart. None of these statements removes the obligation to close the midpoint bootstrap.

The analytical controls are elementary and precede use of the new formulas. For $v\perp N$, writing $A=Y\cdot N$ and $s=Y\cdot v$ gives $2|As|\le|v||Y|^2$. The cubic identity

$$
4(p^3-q^3)-(p-q)^3=3(p-q)(p+q)^2\ge0\quad(p\ge q)
$$

will check the impulse estimate. In the prescribed radial affine control with $v=b=0$ and no delayed remainder, $Y'=kY$ implies $(|Y|^2)'=2k|Y|^2$. The new radial account below must retain that growth; it does not inherit the separate cancellation of $(1+u/2)Y$. The zero-midpoint control makes every term in the new midpoint accounts vanish. These are identity controls, not additional canonical preparations.

## A continuous coercive account across all sector boundaries

Define the frame-free scalar

$$
\mathcal Q=|Y|^2+\frac{2(Y\cdot N)(Y\cdot v)}{\max(1,\Lambda)}.
\tag{1}
$$

For $\Lambda\ge1$, $H=d|v|$ and $\mu=K/H$ give $\mu(Y\cdot v/|v|)=(Y\cdot v)/\Lambda$. Thus (1) equals the inherited $S_a$ exactly. For $\Lambda\le1$, write its restriction as $\mathcal Q_r=|Y|^2+2As$. This is polynomial in the displayed vector components and remains regular at $v=0$ and $H=0$.

The preceding orthogonality control gives

$$
\left|\mathcal Q-|Y|^2\right|
\le\frac{|v|}{\max(1,\Lambda)}|Y|^2
\le\sqrt\chi\,|Y|^2.
\tag{2}
$$

Consequently $(1-\sqrt\chi)\alpha^2|W|^2\le\mathcal Q\le(1+\sqrt\chi)|W|^2$ on the full chart. In particular the account is uniformly coercive under the inherited barrier without an angular floor.

The function in (1) is locally absolutely continuous along every ordinary finite prefix. Its two formulas agree at $\Lambda=1$. The derivative formulas below apply almost everywhere in their respective sectors. On a level set with $\Lambda=1$, the derivative of $\Lambda$ is zero almost everywhere there, so the two chain-rule formulas agree at those points as well. No assumption of finitely many crossings, transversal crossings, or a nonaccumulating sequence of sector intervals is required to integrate this account.

This joining can also be checked against the inherited conversion identity. Let $G=|P_c|^2$, $P_c=[(1-u/2)I+NU^{\mathsf T}]Y$. Direct expansion gives the regular identity

$$
G-\mathcal Q_r=u(2A^2-|Y|^2)+\frac{u^2}{4}|Y|^2+s^2+uAs.
\tag{3}
$$

At $\Lambda=1$, $s=\sqrt\chi(Y\cdot T)$, so (3) is exactly the accepted $G-S_a$ conversion. Subtracting its right side throughout the radial sector removes the boundary differences identically. Their information is transferred to the radial derivative; it has not been discarded or bounded by an unsigned sum.

## Exact radial derivative and its full spatial remainder

Use the actual relative row from the [anisotropic account](authorized-cases-ten-hour-d-primary-anisotropic-account.md), retaining its current-affine central difference $Q$ and actual-delay error $e$. Put $Q_t=Q-(N\cdot Q)N$ and similarly $e_t$. Exact differentiation gives

$$
v'=-\frac{|v|^2}{d}N+\left(k-\frac ud\right)v
+\frac{2ka}{g}b+Q_t+e_t,
$$
$$
A'=kA+\frac sd+N\cdot\mathcal R,
\qquad
s'=-\frac ud s-\frac{|v|^2}{d}A
+\frac{2ka}{g}Y\cdot b+Y\cdot(Q_t+e_t)+v\cdot\mathcal R.
$$

In particular the $k s$ terms in the last derivative cancel between $Y'$ and $v'$. Since $A=a$ and $Y\cdot b=\alpha|b|^2$, the radial restriction obeys

$$
\mathcal Q_r'=\mathcal D+\mathcal E,
\tag{4}
$$
$$
\begin{aligned}
\mathcal D={}&2k(2A^2-|Y|^2)
+\frac2d\{s^2-|v|^2A^2-uAs\}
+2kAs+\frac{4k\alpha a^2|b|^2}{g},\\
\mathcal E={}&2A\,Y\cdot(Q_t+e_t)
+2\{Y+sN+Av\}\cdot\mathcal R.
\end{aligned}
\tag{5}
$$

All vectors here are spatial. No instantaneous normal component has been set to zero or factored out of the actual delayed error. The accepted bounds $|Q|\le k|U|^2\le4.04k\chi$, $|e|\le6k\chi$, $|v|\le.02$ and $|Y|\le M$ imply

$$
|\mathcal E|\le
\{2(4.04+6)+2(1+.04)66\}k\chi M^2
=157.36k\chi M^2<160k\chi M^2.
\tag{6}
$$

The $\mathcal R$ bound is the inherited full-history midpoint bound; it includes both source clocks and their moving evaluations. The affine $Q$ is not substituted for the actual acceleration.

For interpretation at $v\ne0$, let $B=Y\cdot(v/|v|)$ and let $C_n$ be its normal component. The first two purely centrifugal terms of (5) are

$$
2k\{(1-\Lambda)(A^2-B^2)-C_n^2\}.
$$

Normal damping is present, while the planar part remains indefinite for $\Lambda<1$. The mixed term $-2uAs/d$ also has no fixed sign. The quartic term $4k\alpha a^2|b|^2/g$ is nonnegative and is not uniformly of order $k\chi M^2$ when the radius has no ceiling. Pointwise sign indefiniteness is not a counterexample to an integrated actual cancellation; it identifies the terms such a proof must retain.

The radial affine control above gives $\mathcal D=2k|Y|^2$ and $\mathcal E=0$, as required. On the actual radial sector, elementary absolute values give the much weaker $|\mathcal D|<7kM^2$: the four displayed contributions are bounded respectively by $2kM^2$, $(2+2.01)kM^2$, $.02kM^2$, and $.000405kM^2$. That estimate recovers the unresolved unweighted radial impulse, rather than closing the desired account.

## Actual restrictions on crossings and radial impulses

The relative row supplies a more precise boundary test than the sign of $u$ alone. Differentiating $\Lambda=d|v|^2/K$ gives, at $\Lambda=1$,

$$
d\Lambda'=2\chi-u+\frac{4\sqrt\chi\,a b_T}{g}
+\frac{2\sqrt\chi}{k}(Q_T+e_T),
\tag{7}
$$

where $T=v/|v|$. The prescribed leading central comparison $W=0$, $Q_T=e_T=0$ gives $d\Lambda'=(2\chi-u)\Lambda$, checking both leading terms. This comparison omits the declared central-difference and delayed errors; it is not an exact current-affine evaluation at nonzero transverse speed. From the accepted tangential bounds and $|u|<\sqrt{4.04\chi}$, the remaining boundary contribution satisfies

$$
\left|d\Lambda'-(2\chi-u)\right|
\le\delta:=2.03M^2\sqrt\chi+15\chi^{3/2}.
\tag{8}
$$

An angular-to-radial crossing therefore requires $u\ge2\chi-\delta$; a radial-to-angular crossing requires $u\le2\chi+\delta$. These allow equality and tangential contact. They do not enforce a uniform opposite-sign pairing: $\delta/\chi=2.03M^2/\sqrt\chi+15\sqrt\chi$ is not controlled by a fixed small midpoint ceiling as $d\to\infty$. A positive lower bound for $\chi$ has not been admitted. Even the stronger approximation $u\simeq2\chi$ at a near-tangent crossing would not determine the transported midpoint quadratic form.

There is a genuine additional restriction on any positive-length interval $[a_0,b_0]$ contained in $\Lambda\le1$. The exact radial row and its retained errors give

$$
.97k\le-u'\le2.1k.
\tag{9}
$$

The upper bound uses $\Lambda\ge0$, $Q_r\ge0$ and $2g+|u|+6\chi<2.1$; the lower bound is the accepted radial-sector estimate. Set $I=\int_{a_0}^{b_0}k\,dt$, $p=u(a_0)$ and $q=u(b_0)$. Then $p-q\ge.97 I$. The kinetic inequality $u^2\le C\chi$ and (9) imply

$$
\begin{aligned}
J(b_0)-J(a_0)
&\ge\frac{3}{2C}\int_{a_0}^{b_0}ku^2\,dt\\
&\ge\frac{3}{2C(2.1)}\int_{a_0}^{b_0}(-u')u^2\,dt
=\frac{p^3-q^3}{2C(2.1)}\\
&\ge\frac{(.97)^3}{8C(2.1)}I^3
>\frac1{100}I^3.
\end{aligned}
\tag{10}
$$

The final rational comparison is $.912673>.67872$. Thus for every collection of disjoint actual radial intervals on a negative-account prefix,

$$
\sum_n I_n^3\le100j_B<10^{-34}.
\tag{11}
$$

The assertion follows first for finite collections and then for countably many by monotone convergence. It neither assumes those intervals exhaust a complicated boundary set nor assumes all contacts are isolated. This is an actual-dynamics inequality, unlike a freely prescribed scalar sequence. However, a bound on the sum of cubes does not bound the sum itself. That mathematical distinction alone supplies no actual history realizing divergent cumulative impulse. Equation (11) therefore narrows the allowed behavior without proving the missing signed control.

## The first remaining inequality

Integrating the continuous account gives, on every provisional negative prefix,

$$
\mathcal Q(t)\le\mathcal Q(T_B)
+\int_{\{\Lambda\ge1\}} k\chi\,ds
+\int_{\{\Lambda<1\}}\mathcal D\,ds
+160\int_{\{\Lambda<1\}}k\chi M^2\,ds.
\tag{12}
$$

All integrals in (12) are restricted to $[T_B,t]$. This identity/inequality contains no unsigned transition sum. The first and last integrals are controlled by the accepted account budget. The first missing estimate is a uniform upper bound for the signed middle integral along the actual histories.

For concreteness, one sufficient estimate that would close the existing tiny midpoint bootstrap is

$$
\int_{T_B}^{t}\mathbf{1}_{\{\Lambda<1\}}\mathcal D\,ds
\le1.8\times10^{-34}
\tag{13}
$$

for every partial ordinary negative continuation with full-prefix $M\le3\times10^{-17}$. Indeed $\mathcal Q(T_B)<(1+2\times10^{-12})7.114\times10^{-34}$, the angular integral is below $.006667\times10^{-34}$, and the last term is below $9.6\times10^{-68}$. With (2), these leave strict reserve below $|W|^2=9\times10^{-34}$. Equation (13) is a stated missing obligation, not a result of this attempt. A less restrictive signed estimate with the same reserve would also suffice.

The inherited $P_c$ calculation, the crossing restriction (8), and the cubic budget (11) do not establish (13). Nor does the planar extension of $S_a$ alone cover the spatial class: outside $\Lambda\ge1$, its normal-plane term contains the uncontrolled ratio $M^2/\Lambda$, in addition to requiring coercivity in $K/H$. Declaring a fixed plane, imposing a new angular floor, dropping either actual clock, or imposing a future radius ceiling would change the present question.

The attempt therefore stops at (13). It provides a continuous account and an actual cubic impulse restriction, but no global midpoint bound, original-member branch selection, all-future chart admission, or new fate theorem. The earlier comparison in the [midpoint obligation](authorized-cases-two-hour-d-reference-midpoint-obligation.md) remains explicitly nonphysical and is not repurposed here.

## Falsifiers and measured preservation

Falsifiers of the new derived reductions are a missing product term in (4)–(5), a failure of the exact boundary matching (3), loss of the spatial normal contribution, an actual source error outside the inherited full-history bound, an incorrect inequality orientation in (10), or a violation of the stated finite-prefix coercivity. A proof of an actual signed bound such as (13) would remove this remaining obstruction. An abstract divergent impulse sequence would not refute or establish the canonical conclusion.

Native `shasum -a 256` measured the following identities before drafting:

| Source | SHA-256 |
| --- | --- |
| Frame-free subject | `1101120a599c3b34fd02865c9f7d7d440a1904408cd8451dd6905aaec822f11b` |
| Midpoint assessment | `8913e6e69696f8376c44f602098dbd08398d67219dfcd91c41ba97bba34b596d` |
| Midpoint obligation | `23f053c19503da87e8889da03114040fb9ac45cdc24f2a0ef4efab3534c4952d` |
| After-return sector subject | `2fc9ae1ae3823adbcdcc1a8ca73de050ce18f154f5b7e29622607e27b20a9462` |
| After-return sector reference | `159f227eb6e9f7cc6293f9fb508e4d7966de7f6ea2e20e89bca33f5b56902616` |
| Anisotropic account | `2cc51820a0122215e5501747e78605894f71df6016d972d0801c9d8c5f223e16` |
| Corrected midpoint source | `6a6b6a8dc7d1ec6c204b45fed18b9fdd9b3218f1ffdc32da9d4906ed2cf03a1b` |
| Spatial bootstrap source | `8c661274200ca2eb24e7dbebf86af9aef4cde8a3f422407bda319daf676a708b` |

Only this new report is authored. No numerical target, new instrument, physical history, frozen-source or shared-owner edit, production change, generator, Git mutation, publication or additional agent is used. The parent owns independent assessment and integration into [the main A report](overnight2-a-followup-and-research-2026-10-07.md). No owned scientific process is active.

**Validation and freeze, 2026-10-07 05:06 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-canonical-transition-attempt.md` passed known controls before the target, then passed 132 math spans, six local links and whitespace. This is document validation, not mathematical acceptance. Repeated native `shasum -a 256` returned the same identities for all eight sources above. The separately derived account, derivative and cubic impulse budget are frozen for the parent's independent assessment; the signed estimate (13) remains open. This allocation stops at that concrete missing inequality, within its 30-minute limit.
