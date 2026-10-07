# Independent speed-coordinate audit of the remaining 144 cosine-domain leaves

## Verdict and exact scope

**Computer-assisted derived and independently accepted:** the new standalone audit excludes all 144 unchanged leaves that remained unresolved in the [frozen independent domain audit](overnight2-b-independent-domain-cover.md). The new target has 120 strict tangential exclusions and 24 strict axial exclusions, with no unresolved or pending leaf. Combining these results with the previously verified exact partition and its 3,875 independently excluded leaves establishes the whole-domain obstruction for the stated unit-radius, constant-planar-rate, cosine-height class at every $R>0$.

The exact closed domain is
$$
\frac1{10}\le H\le\frac56,\qquad
\frac1{20}\le\beta\le\frac45,\qquad
\frac1{10}\le\eta\le1,
\qquad \nu=\frac{19}{20},\qquad
s=\sqrt{\nu^2-\beta^2},\qquad v=\eta s,\qquad\kappa=\frac vH.
$$
The complete six-member histories have unit normalized radius, no periodic planar phase correction, constant planar rate $\beta$, and common height $H\cos\phi$, with alternating member polarity and axial sign. The canonical constants remain $K=c_f=1$. The scalar $v$ denotes the axial velocity amplitude $H\kappa$, not the complete vector velocity. All ordinary positive-delay roots remain included. The scope does not include arbitrary height profiles, varying radius, general planar phase corrections, larger domains, existence, stability or nonlinear fate.

The [new independent instrument](overnight2-b-independent-speed-coordinate.py) imports neither subject code nor either previous independent instrument. Its formulas below were separately derived from the relative geometry. It uses the authenticated previous independent target only to select its exactly 144 unresolved boxes and preserve their original indices. Every original interval is unchanged, and no box is subdivided. The previous partial verdict and all prior source, report and receipt bytes remain frozen.

## Complete chart and relative geometry

The physical speed is bounded by
$$
|V_j|^2\le\beta^2+v^2
=\beta^2+\eta^2(\nu^2-\beta^2)\le\nu^2<1.
$$
The distance-minus-delay gap is globally strictly decreasing, with every secant magnitude in $[1-\nu,1+\nu]=[1/20,39/20]$. Every partner has a positive equal-time separation and hence precisely one positive root; the complete-past gap becomes negative. Every positive self delay has displacement at most $\nu d<d$, so no positive self root exists. At the descending zero $\phi=\pi/2$, the equal-time partner chord is at least one and the normalized position norm is at most $\sqrt{1+H^2}$. Thus the complete five-root chart obeys
$$
\frac{20}{39}\le d_j\le2\sqrt{1+H^2},\qquad
\frac1{20}\le D_{s,j}\le\frac{39}{20}.
$$
These bounds hold for every parameter in every retained box. No finite past cutoff is used to infer completeness.

For source $j$, set $\sigma_j=(-1)^j$, $\alpha=j\pi/3-\beta d$ and $\ell=vd/H=\kappa d$. The separation and delayed source velocity in the reception frame are
$$
Q=(1-\cos\alpha,-\sin\alpha,-\sigma_jH\sin\ell),
\qquad
V_s=(-\beta\sin\alpha,\beta\cos\alpha,-\sigma_jv\cos\ell).
$$
Consequently
$$
q^2=|Q|^2=4\sin^2(\alpha/2)+H^2\sin^2\ell,
\qquad Q\cdot V_s=-\beta\sin\alpha+Hv\sin\ell\cos\ell.
$$
Define $C=\beta\sin\alpha-Hv\sin\ell\cos\ell$. At a root $q=d$,
$$
D_s=1+\frac Cd,\qquad W=dD_s=d+C.
$$
The canonical complete components are the sums of
$$
T_j=\frac{-\sigma_j\sin\alpha}{d^2W},\qquad
Z_j=\frac{-H\sin\ell}{d^2W}.
$$
These are source-divisor rows. The current receiver velocity is not substituted into their divisor. Both prescribed components vanish at this crossing, so a strict sign of either complete sum contradicts exact acceleration balance for every positive common scale.

The cancellation $H^2\kappa=Hv$ follows directly from the parameter map. Evaluating $Hv$ preserves the absence of height dependence in $v=\eta s$. Evaluating $H^2(v/H)$ with independent occurrences of an interval $H$ generally enlarges the range. Both are valid enclosures; one can be too wide to decide a sign. This algebraic observation motivates a new inclusion method, while its actual success is established only by the completed target.

## Two independently inclusive root contractions

For fixed parameters and delay varying inside a current inclusive root interval $I$, differentiation gives
$$
q_d=-\frac Cq,\qquad
(q-d)_d=-\left(1+\frac Cq\right),\qquad
(q^2-d^2)_d=-2(d+C).
$$
The unsquared expression uses $q$ away from the root. Replacing that $q$ by $d$ off the root would be unjustified. The instrument evaluates the actual chord norm $q(I,B)$ over the full delay interval and parameter box.

Let $m$ be the exact rational midpoint of $I$. If $q(I,B)$ has a strictly positive lower endpoint, the interval for $1+C/q$ encloses the negative unsquared-gap derivative magnitude on the whole segment joining $m$ to each root. It can be intersected with the independently known global secant range $[1/20,39/20]$. Calling the resulting positive interval $S$, the mean-value theorem gives
$$
d(p)\in m+\frac{q(m,p)-m}{S}\subseteq m+\frac{q(m,B)-m}{S}.
$$
If the interval for $q$ includes zero, the instrument retains the global range alone. That fallback follows from the Lipschitz speed estimate and does not differentiate a zero norm. Empty intersections fail the calculation.

The squared-gap derivative supplies an additional contraction whenever its interval lies strictly below zero:
$$
d(p)\in m-\frac{q(m,B)^2-m^2}{[-2(I+C(I,B))]}.
$$
The positive starting interval prevents spurious sign ambiguity from squaring: $q^2-d^2=(q-d)(q+d)$ with $q+d>0$. Both images contain every true root before intersection with the current interval. The implementation intersects their valid images, iterating up to 100 times or until the exact interval endpoints stop changing. This iteration count supplies no existence claim by itself; the complete chart already establishes existence and uniqueness. Every retained iterate remains inclusive, including on stagnation.

Midpoint rationals and all arithmetic are enclosed outward. The use of an interval containing the exact midpoint can widen the result but preserves the midpoint evaluation needed by the theorem. Root receipts retain all five intervals and counts of unsquared local, global fallback and squared-Newton steps for the whole box and its center.

## Explicit parameter derivatives after cancellation

Let $i$ range over $(H,\beta,\eta)$, and let $\delta_{iH}$ and $\delta_{i\beta}$ be coordinate indicators. Direct differentiation of the physical-speed map gives
$$
(v_H,v_\beta,v_\eta)=\left(0,-\frac{\eta\beta}{s},s\right),\qquad
(\kappa_H,\kappa_\beta,\kappa_\eta)=\left(-\frac v{H^2},\frac{v_\beta}{H},\frac sH\right).
$$
Differentiating the unsquared root equation at fixed reception phase gives
$$
D_s d_i=q_{p_i}\big|_{d\ \mathrm{fixed}}.
$$
Using $q=d$ only after this differentiation, and simplifying $H^2\kappa_i=Hv_i-v\delta_{iH}$ before interval evaluation, yields
$$
\boxed{d_i=\frac{-\sin\alpha\,\delta_{i\beta}+(H/d)\sin^2\ell\,\delta_{iH}+(Hv_i-v\delta_{iH})\sin\ell\cos\ell}{D_s}.}
$$
The total angle derivatives are
$$
\alpha_i=-d\delta_{i\beta}-\beta d_i,\qquad
\ell_i=\frac{dv_i+vd_i-\ell\delta_{iH}}H.
$$
Since $W=d+\beta\sin\alpha-Hv\sin\ell\cos\ell$,
$$
\begin{aligned}
W_i={}&d_i+\delta_{i\beta}\sin\alpha+\beta\cos\alpha\,\alpha_i\\
&-(\delta_{iH}v+Hv_i)\sin\ell\cos\ell
-Hv\cos(2\ell)\ell_i.
\end{aligned}
$$
For row numerators $N_T=-\sigma_j\sin\alpha$ and $N_Z=-H\sin\ell$,
$$
(N_T)_i=-\sigma_j\cos\alpha\,\alpha_i,\qquad
(N_Z)_i=-\delta_{iH}\sin\ell-H\cos\ell\,\ell_i,
$$
$$
\boxed{\partial_i\left(\frac N{d^2W}\right)=\frac{N_i-N(2d_i/d+W_i/W)}{d^2W}.}
$$
These formulas include all effects of the implicit root, coordinate map and source velocity. In particular $(Hv)_H=v$, with no residual division by $H$ in this coefficient. The instrument implements these explicit derivatives and sums all five rows; it does not use subject derivative code or a dual-number implementation.

At roots the value intervals for $D_s$ and $W$ can be intersected with the valid chart bounds and $dD_s$. These intersections narrow values of the exact functions. The displayed derivatives are evaluated directly and never obtained by differentiating a clamp. The chart's uniform ordinary-root margin and positive $H,s$ justify smooth implicit roots along each center-to-point segment in a closed leaf.

For each complete component, the centered integral mean-value enclosure is
$$
F(B)\subseteq F(c)+\sum_i[\partial_i F(B)]\,[-r_i,r_i].
$$
Here $c$ and half-widths $r_i$ are exact rational values, the center field is independently interval-evaluated with its own roots, and full-box derivatives enclose every point of the segment. Intersecting this interval with the inclusive direct field interval is valid. No sampled center value or floating residual is accepted as a whole-leaf sign.

## Known-first controls and measured pilot

The known stage ran before access to any real target leaf. It checked interval squares separately from generic interval products, exact speed-coordinate values and derivatives, cancelled-product derivatives, a nondegenerate interval dependency example, all five static root lengths and complete zero fields, exact full static gradients, and a nonstatic closed-form root with its divisor, root derivatives and both delay slopes.

The nonzero coordinate control is $(H,\beta,\eta)=(2,57/100,1/2)$. It gives
$$
s=\frac{19}{25},\quad v=\frac{19}{50},\quad \kappa=\frac{19}{100},\quad
(v_H,v_\beta,v_\eta)=\left(0,-\frac38,\frac{19}{25}\right),
$$
$$
(\kappa_H,\kappa_\beta,\kappa_\eta)=\left(-\frac{19}{200},-\frac3{16},\frac{19}{50}\right),\qquad
\partial_{(H,\beta,\eta)}(Hv)=\left(\frac{19}{50},-\frac34,\frac{38}{25}\right).
$$
For $H\in[1,2]$ and fixed $v=2/5$, the direct range of $Hv$ is $[2/5,4/5]$, whereas independent-factor evaluation of $H^2(v/H)$ encloses $[1/5,8/5]$. The recorded outward intervals contain these exact ranges and verify the strict width difference. This is a known dependency example, not target evidence.

At the static extension $\beta=\eta=0$, the chord lengths are $1,\sqrt3,2,\sqrt3,1$ and the complete fields vanish. The exact gradients are
$$
\nabla T=(0,19/12,0),\qquad \nabla Z=(0,0,-133/48).
$$
The nonzero entries follow from $\sum_j-\sigma_j/d_j^2=19/12$ and $-\nu\sum_j1/d_j^2=-133/48$. This static extension tests the formulas without claiming that zero rates lie in the target domain.

For the nonstatic control take $H=1/2$, $\beta=0$, $\eta=10\pi/(19\sqrt5)$ and partner one. Then $\kappa=\pi/\sqrt5$, $d=\sqrt5/2$, $\alpha=\pi/3$, $\ell=\pi/2$ and $D_s=1$. The root derivatives are $d_H=1/\sqrt5$, $d_\beta=-\sqrt3/2$, $d_\eta=0$. The unsquared derivative is $-1$ and squared derivative is $-2d=-\sqrt5$. Their exact signs, squared magnitudes and narrow enclosures were checked. This distinct control checks both root contractions away from the static cancellation.

The known stage returned exit zero in 0.013738 seconds, produced 8,831 bytes and reported 27,639,808 peak resident bytes after serialization. Its recorded success and unchanged source identity gate both later stages. The pilot selects eight spread unresolved-list indices $\lfloor143i/7\rfloor$, $0\le i\le7$, without changing their boxes. It excluded all eight, six tangentially and two axially, in 0.334931 internal seconds. It produced 146,477 bytes and reported 118,554,624 peak resident bytes after serialization, including loading the full previous input receipt. The empirical projection was approximately 6.03 seconds and 2.64 MB for 144 leaves, within the declared limits. The actual target result, rather than that projection, determines acceptance.

Pilot supervisor `f9e0b5f2-1c9d-424c-b937-cb33a5542347` closed with exit zero, zero stderr and `processGroupClosed: true` after 0.400 supervised seconds. The target started after that closure. The caps remained 300 internal seconds, 360 supervisor seconds, 512 MiB resident memory, 16 MiB receipt bytes and one numerical thread. The source emits progress at five-second intervals; both stages finished before the first such interval, and terminal receipts provide their completion evidence.

## Completed target and combination with the full partition

Native `jq` inspection of the target reports 144 processed rows, 120 tangential exclusions, 24 axial exclusions, no unresolved leaf, no pending index and no exception. It independently reevaluated 1,440 roots: five whole-box and five center roots per leaf. Every row retains its exact unchanged parameter box, original subject index, unresolved-list index, final/direct/center/centered component intervals, all three full gradients, source divisor and $W$ intervals, implicit root partials and contraction-step counts.

The target measured 4.426556 internal seconds and produced 2,599,564 receipt bytes. It reports 122,486,784 peak resident bytes before serialization; the retained supervisor stdout reports 129,646,592 after serialization. All three receipts total 2,754,872 bytes by native `wc -c`. The target supervisor `2abd586a-2415-481c-990f-11e1d8c0700d` closed in 4.498 supervised seconds with exit zero, zero stderr and `processGroupClosed: true`. The numerical slot was explicitly released to the parent after closure.

A native `jq -s` comparison of the sorted pairs `(original index, exact box)` from the previous target's unresolved rows and this target's complete rows returned `true`. The instrument additionally checks that the frozen input contains exactly 144 distinct original indices and iterates every selected index once. There is consequently no new subdivision, missing assigned box, duplicate substitution or altered interval in this disposition.

The [previous independent audit](overnight2-b-independent-domain-cover.md) established an exact binary tiling of the entire original domain by 4,019 closed leaves, with 8,037 tree nodes and total volume $99/200$. Its inductive partition proof includes shared boundaries and excludes gaps and overlapping interiors; it was not inferred from volume alone. That audit independently excluded 3,875 leaves and retained precisely the present 144 unresolved boxes. The two independent leaf collections therefore cover the same verified partition: $3875+144=4019$. Every domain point belongs to at least one closed leaf with a strict complete-component sign, including points on shared leaf boundaries.

It follows that no history in the stated closed domain can satisfy the canonical full-vector acceleration equation at every reception, for any $R>0$, because at its descending zero one required zero component has a strictly nonzero canonical value. This is an exclusion theorem for prescribed histories in this domain. It establishes no allowed history outside the domain and no stability result. The older unresolved verdict remains a valid record of its earlier instrument's limitations; its source and receipt are not retroactively altered to claim success.

## Identities, arithmetic boundary and preservation

The new method uses mpmath 1.3.0 at 50 interval decimal digits, with rational parameter endpoints and exact rational encodings of computed binary interval endpoints. The subject and independent instruments share this arithmetic library. The separately derived coordinate formulas, root contractions and explicit gradients provide independent implementation evidence above that common primitive layer. They do not formally verify every mpmath transcendental operation. The Moore role is a mathematical review lens and supplies no additional acceptance authority.

Native `shasum -a 256` records these identities:

| Item | SHA-256 |
| --- | --- |
| New independent speed-coordinate source | `1bc9afafd32681e81c9f5f07b48ca16a7a3e3698c15fc332326e6e008ac06a39` |
| New known receipt | `8cbd257e2e309b038d816588c831ac8ef267c31eb89d3add2c8ea1dcf683de68` |
| New pilot receipt | `a6b6e341345e7b816e931a8bd40e8522741f70291b10314c35e00a9d009b865e` |
| New target receipt | `81be2e3e11820a2a0ea936f15f8f06b9a79dbfe801e3b4309022279e213263eb` |
| Frozen input independent-domain target | `b4d5927370c804f27d3990dd387b77f0077a76a2535703b7055101d689e965fc` |
| Frozen prior independent-domain report | `6f566e9b9947f8757ca03ef5eea3884014530651955cd11e5034d7dff2b73d8d` |
| Frozen prior independent-domain source | `b451d57ca7194392e03546cf3292bc8cb97ff496eedcfe8b1882900773b24f19` |
| Frozen earlier scalar-gradient reference | `f15fe190bb85be4b8a7f1b8140c1748db04f540e5f5fa510a6705f180b56156a` |

The new runtime owner is `.local-data/master-equation-closure/overnight2-b/independent-speed-coordinate/`, containing `known.json`, `pilot.json` and `target.json`. Retained receipt paths refuse overwrite. The new source identity is unchanged between known success, pilot and target. All earlier subject and independent sources, reports and runtime evidence remain available under their original owners.

Direct falsifiers are a missing positive causal root, a true root outside its retained interval, misuse of the off-root norm in the local slope, an incorrect derivative of $Hv$, a missing implicit-root term, a wrong source divisor or an actual field value outside the retained inclusive component range. A parameter in one of the new boxes satisfying both necessary zero components would refute the corresponding sign certificate. An exact admitted history anywhere in the combined domain would refute the combined obstruction. A box/index mismatch would defeat the union argument even if every individually checked sign were correct. Wrong common-library rounding would affect the numerical certificates and remains an explicit shared dependency.

Only this report, its new standalone companion, fresh assigned runtime receipts and supervisor-managed operational records were written. All old independent references, subjects, reports, receipts, parent account and shared owners stayed read-only. No Git mutation, generator, delegation, sidebar action, new physical law, numerical orbit search or expanded domain was used. The shared executable venv ran with one numerical thread and bytecode writing disabled. Final native hashes verify the stated frozen identities and new receipts; native whitespace checks cover only the two new authored files. Both supervised groups are terminal, and parent integration of the accepted combined result is the remaining disposition step. This bounded review is complete.
