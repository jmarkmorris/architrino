# Independent assessment of the next target maximum or causal-root event

**Current disposition: a first global wake-speed event is certified in $87/16<t_*\le351/64$, before either target reaches its next vertical maximum.** The independently checked continuous comparison proves actual arrival and positive radial acceleration at every possible first-event label. The curved-path own-history birth theorem then excludes a $C^3$ unchanged-law continuation through that event. The first label is unresolved among 12 candidates, including both targets; arbitrary weak or nonsmooth continuation remains outside the result. The investigation retains the same complete supplied past, unmodified Master Equation, infinite alternating lattice, stationary eight-source block prescription, $g=16$ and $c_f=1$.

The certified physical decision is an own-history root-birth obstruction before a target vertical maximum. An auxiliary displacement ceiling is not such an event. A numerical speed guard alone is also insufficient: receiver speed one does not itself make a previously existing cross-channel root singular.

## 1. What reaching wake speed would have to establish

For a retained causal hit, write the unit emission-to-reception direction as $n$, the source velocity as $v_s$, and the receiver velocity as $v_r$. The [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) uses

$$
D_t=1-n\cdot v_s,\qquad
A=\frac{g\,\sigma_i\sigma_j\,n}{r^2|D_t|}.
$$

The receiver factor $D_r=1-n\cdot v_r$ controls signed root playback $ds/dt=D_r/D_t$; it is not an acceleration multiplier. Therefore a receiver reaching $|v_r|=1$ can leave its existing cross rows completely regular if their sampled source velocities retain a positive transmitter margin.

There is, however, a distinct conditional obstruction. If one label first reaches speed one with a strictly positive rate of increase, a hypothetical smooth passage would create a positive own-history root from the excluded zero-delay diagonal. Its same-label polarity product is positive. Its range and transmitter factor both shrink, and its acceleration contribution diverges. The [new curved-path theorem](smooth-two-particle-next-event-root-birth.md) makes this statement without assuming collinearity.

Speed alone is not enough. For example, a complete straight path $X(t)=2t e_1$ has speed two but no positive own-history root, because every chord has length twice its delay. This comparison history is not the supplied preparation. It demonstrates why a bare superunit-speed condition cannot replace the history and crossing hypotheses.

## 2. Independent assessment of the local birth calculation

Let $t_*=0$ for notation, $v_*=X'(0)$, $|v_*|=1$, and $\alpha=v_*\cdot X''(0)>0$. For a hypothetical $C^3$ extension define the average chord

$$
W(h,\tau)=\int_0^1 X'(h-u\tau)\,du.
$$

A positive-delay own root satisfies $|W|^2=1$. The defining integral extends this auxiliary root equation smoothly to zero delay without adding a diagonal row to the physical law. Independently differentiating at $(0,0)$ gives

$$
\partial_h(|W|^2-1)=2\alpha,\qquad
\partial_\tau(|W|^2-1)=-\alpha.
$$

The derivative with respect to $\tau$ is nonzero, so the implicit-function theorem gives a unique nearby root branch with $\tau'(0)=2$. The $C^3$ Taylor remainder then yields

$$
\tau=2h+O(h^2),\quad s=-h+O(h^2),\quad
n=v_*+O(h^2),\quad D_t=\alpha h+O(h^2).
$$

Thus, for $h>0$, the canonical same-label row is

$$
A_{\mathrm{self}}(h)=\frac{g\,v_*}{4\alpha h^3}+O(h^{-2}).
$$

The independent review accepts the coefficient, sign and three-dimensional dependence. The argument uses $v_*\cdot a_*$, not the acceleration norm; transverse acceleration components are retained in the chord expansion and do not change the leading coefficient. At the event time itself, strict subunit speed throughout the earlier past gives a strictly short chord for every positive delay, so no positive own root already exists there.

The subject's compact-delay and stationary-remote-past arguments also close the older own-root census. Every compact delay interval bounded away from zero has a strict negative chord residual at $t_*$; this margin persists for sufficiently close receptions. A stationary sufficiently remote past excludes arbitrarily large delays uniformly. All remaining roots belong to the small neighborhood handled by the implicit-function theorem. Consequently no additional own row can cancel the divergent positive projection of the unique new row.

The theorem therefore excludes a $C^3$ unchanged-law continuation when the other-label contribution remains bounded. The local theorem alone does not establish actual arrival at wake speed; §13 supplies that application to the lattice experiment. Divergence along hypothetical smooth extensions does not rule out every weak or nonsmooth continuation; those classes remain outside this result.

## 3. A first global speed event supplies a useful remainder bound

The bounded-cross hypothesis can be derived from concrete conditions appropriate to this experiment. Suppose $t_*$ is the first time any label reaches speed one, all earlier label histories have speed strictly below one, the potential changed population is finite near the event, the fixed stationary field is regular there, and distinct simultaneous labels have a uniform positive separation. A hypothetical $C^3$ extension has a finite local speed bound by continuity.

These conditions give a positive cross-delay floor. Indeed, if simultaneous separation is at least $d>0$ and source speed is at most $M$, a cross root with delay $\delta$ satisfies

$$
\delta=|X_i(t)-X_j(t-\delta)|\ge d-M\delta,
\qquad\delta\ge\frac{d}{1+M}>0.
$$

For receptions sufficiently near $t_*$, all cross emissions consequently lie in a fixed earlier interval ending strictly before $t_*$. The finitely many nonstationary source velocity histories are continuous, strictly subunit there, and stationary sufficiently far in the past. Their sampled speeds therefore have a common upper bound $1-\kappa$ with $\kappa>0$. Hence $|D_t|\ge\kappa$ on all relevant cross roots. No new cross root can appear from zero delay because of the separation floor, and the earlier source histories preserve monotonicity of the causal residual.

Positive cross range, positive transmitter margin, a finite changed-row sum and the regular stationary complement make the other-label acceleration bounded. Thus a first **global** speed-one event with a transversely increasing speed is sufficient for the conditional theorem's remainder hypothesis under these finite-disturbance and separation conditions. Monitoring only the targets would not establish this premise; a neighboring label could reach wake speed first.

## 4. Known-first exact control and independence

The separately authored reference `.tmp/mec-008-next-event/moore/self-birth-reference.py` first passed analytically known scalar-quadratic and constant-superunit-path controls. Its target then checked the noncollinear local polynomial

$$
X(t)=\left(t+\frac34t^2,t^2,0\right),
\qquad \alpha=\frac32,\quad\beta=2.
$$

For $h=1/16,1/32,1/64,1/128$, exact rational arithmetic gives

$$
X(h)-X(-h)=(2h,0,0),\quad
\tau=2h,\quad D_t=\frac32h,\quad D_r=-\frac32h,
\quad h^3 A_{\mathrm{self},1}=\frac83.
$$

This verifies the leading coefficient exactly for a genuinely curved comparison path, including the negative playback ratio $-1$. The instrument also checks the full average-chord polynomial

$$
|W|^2-1=2\alpha u+(\alpha^2+\beta^2)u^2,
\qquad u=h-\frac\tau2,
$$

away from the root, so the transverse term has not been discarded. The polynomial is neither a numerical EOM trajectory nor an alternative supplied past. This exact control checks the algebra; the general theorem rests on the independent derivative and root-census arguments above.

The reviewed theorem source has SHA-256 `cc0dc439db48c53f9aae1ad3f8d32fbe37b34b992bc370253d1f4ac1e6709ed1`. The independent control has SHA-256 `663bb192641cdb5bbd17ef0a0eae9f318b7b343b1a4c0c7a47e5707d5cb68ec4`. Known and target receipts are retained with the reference under the existing `next-event/independent` local evidence owner.

## 5. Actual-event proof obligations and falsifiers

Application requires an actual continuation to a finite event interval, no earlier target vertical maximum, a first global speed-one crossing, an identified label or controlled finite candidate set, and a positive lower bound for $v\cdot a$ at the event. The same proof must retain complete incoming histories, all causal roots, source/receiver separation, the stationary complement and bounded cross contributions. Sections 6–13 close these obligations for the supplied history. The numerical candidate only selected a useful comparison interval; the continuous residual and independent comparison establish the event.

Falsifiers for the conditional theorem are a wrong average-chord derivative, an omitted older own root under the stated complete-past assumptions, or a smooth unchanged-law extension satisfying all the hypotheses. An unbounded opposing cross contribution would violate a hypothesis and leave applicability open; it would not falsify this conditional theorem. The actual-event application would be overturned by an omitted contributing source or earlier own root, an invalid interval enclosure, a failed continuous comparison inequality, or a sign error in the event predicates. The retained census, residual, prefix and event-reference receipts identify where each premise can be checked. No post-event target maximum or weak continuation is accepted here.

## 6. Independent enclosure of the new stationary comparison center

The numerical proposal replaces a cubic-only stationary center with the exact field of the 26 labels in the unit cube, a full cubic correction, and far homogeneous field terms of degrees $5,7,9,11,13$. This remains an approximation to the unchanged infinite eight-source-block field. It does not select a different stationary summation prescription.

The unit-cube field has zero constant, linear and quadratic terms. Opposite labels cancel even field degrees; cubic coordinate symmetry makes the linear matrix a scalar multiple of the identity, while the inverse-square kernel's zero divergence makes its trace zero. Its cubic term is therefore $a_{\mathrm{near}}T$. Adding $(a_{\mathrm{center}}-a_{\mathrm{near,center}})T$ and the far higher-degree terms gives the proposed center, with both cubic uncertainties retained in the residual.

The coefficient reference is separate from the proposal's binomial expansion. For an even potential degree $l$ and monomial exponent vector $e$ with $|e|=l$, it expands the explicit Legendre polynomial. Each coefficient is a sum of terms

$$
\frac{(-1)^j(2l-2j)!}{2^l j!(l-j)!(l-2j)!}
\binom{j}{q_1,q_2,q_3}
\binom{l-2j}{e-2q}
\sum_{1<\|n\|_\infty\le24}
\frac{\sigma_n n^{e-2q}}{(|n|^2)^{l-j}\sqrt{|n|^2}},
$$

where $|q|=j$ and $2q\le e$ componentwise. The reference sums the signed monomial numerators over all 117,622 lattice labels as exact integers grouped by squared radius. It then uses exact rational reciprocal-square-root brackets and outward additions. Thus neither floating source sums nor the proposal's polynomial expansion supply the reference arithmetic.

Known controls first recover the exact six-neighbor potential coefficients $-7/2$, $21/2$, $-3/4$ and $-99/32$. The target encloses all 27 distinct far coefficients and all 110 symmetry-related monomials. The largest proposal-center error is below $2.3670\times10^{-13}$. The independently enclosed near cubic coefficient is

$$
a_{\mathrm{near}}\in[14.439125383752526,14.439125383752536],
$$

with center error below $7.106\times10^{-15}$. The coefficient receipt binds the numerical `stationary.json` by SHA-256 `d7783466deb315b7a18b98499cd475d05f165f3d40043208a1a3e9531eec48ff`.

### Infinite tails and receiver derivatives

The frozen solid-harmonic theorem bounds a homogeneous field term of degree $k$ from anchor $n$ by $(k+1)B^k/|n|^{k+2}$ and its receiver derivative by $k(k+1)B^{k-1}/|n|^{k+2}$. Outside a cube of radius $N$, the cubical shell count $24m^2+2$ therefore gives

$$
\sum_{\|n\|_\infty>N}|n|^{-(k+2)}
\le\frac{24}{(k-1)N^{k-1}}+\frac{2}{(k+1)N^{k+1}}.
$$

This controls the omitted cube-24 portion of every retained far field degree. For all omitted far degrees starting at 15, use $|n|\ge2$, $q=(B/2)^2$, and an upper bound $S_{17}$ for the sum of $|n|^{-17}$ outside the unit cube. The field and derivative tails are at most

$$
\begin{aligned}
B^{15}S_{17}\left[\frac{16}{1-q}+\frac{2q}{(1-q)^2}\right],\\
B^{14}S_{17}\left[\frac{240}{1-q}+\frac{62q}{(1-q)^2}+\frac{4q(1+q)}{(1-q)^3}\right].
\end{aligned}
$$

The reference explicitly sums shells $2$ through $8$ and adds the decreasing integral tail, giving

$$
S_{17}\le\sum_{m=2}^{8}\frac{24m^2+2}{m^{17}}+
\frac{24}{14\cdot8^{14}}+\frac{2}{16\cdot8^{16}}.
$$

A potential coefficient error $\delta c_e$ contributes at most $l|\delta c_e|B^{l-1}$ to the field and $l(l-1)|\delta c_e|B^{l-2}$ to its derivative. The first error budget uses the already accepted broad cubic interval $(14.3016,14.3271)$; §7.1 supplies a separate sharper successor. Including the broad interval's uncertainty, the near cubic uncertainty, finite coefficient rounding and both infinite tails gives, after multiplication by $g=16$, the following independent error bounds at $B=7/20$:

$$
\boxed{
\|A_{\mathrm{stationary}}-A_{\mathrm{center}}\|<0.008769370,
\qquad
\|D A_{\mathrm{stationary}}-D A_{\mathrm{center}}\|<0.075219150.}
$$

The separate `stationary-error.py` controls verify the positive series at $q=0$ and $q=1/4$ and the exact cubical shell counts before target use. These scalar bounds enclose the mathematical center's error. A residual still requires outward evaluation of that center on its receiver cells and all other acceleration rows. No physical trajectory claim follows from the center coefficients alone.

## 7. Independent check of the signed receiver Jacobian

The proposed comparison gains precision by summing signed receiver derivative matrices before bounding their norm. Let $R$ be a cross-channel displacement at its causal root, $r=|R|$, $n=R/r$, $v$ and $a$ the sampled source velocity and acceleration, and $D=1-n\cdot v>0$. At fixed reception time, implicit differentiation gives

$$
\frac{ds}{dx}=-\frac{n^{\mathsf T}}D,\qquad
\frac{dR}{dx}=M=I+\frac{vn^{\mathsf T}}D.
$$

An independent expansion of the derivative of $R/(r^3D)$ gives the symmetric form

$$
J=\frac{I}{r^3D}
+\frac{vn^{\mathsf T}+nv^{\mathsf T}}{r^3D^2}
+\frac{nn^{\mathsf T}}{r^3D^3}
\left[|v|^2+2n\cdot v-3-r(n\cdot a)\right].
$$

In particular, the source-acceleration term required by the shift in emission time is present. The independent exact-rational reference checks this expression first against known static, longitudinal-velocity and source-acceleration cases, then compares it with the subject's factored implementation on three noncollinear rational geometries. All nine entries lie in the subject's interval enclosures, and the exact matrices are symmetric.

For the changed row, write $R=R_0-y$. The subject preserves cancellation by using

$$
\begin{aligned}
r_0-r&=\frac{2R_0\cdot y-|y|^2}{r_0+r},\\
RR^{\mathsf T}-R_0R_0^{\mathsf T}
&=-R_0y^{\mathsf T}-yR_0^{\mathsf T}+yy^{\mathsf T},\\
\frac{M}{D}-I&=\frac{n\cdot v}{D}I+\frac{vn^{\mathsf T}}{D^2}.
\end{aligned}
$$

The inverse-power differences factor through $r_0-r$. These identities show that the factored subject is exactly the causal Jacobian minus the stationary-row Jacobian; every changed term contains source displacement, velocity or acceleration. A genuinely stationary source therefore remains an exact zero contribution even on a nontrivial receiver box. This is an algebraic improvement of an enclosure, not omission of a physical row.

After interval evaluation and signed summation, the inequality $\|J\|_2\le\sqrt{\|J\|_1\|J\|_\infty}$ gives a valid Euclidean operator bound, even if the interval matrix loses its exact symmetry. The reviewed factored subject has SHA-256 `76cb2d568cd5ddb16bd95c7a2cf4f89141df021ffa553d1c0f7d2989d931bb1e`; the independent reference and target receipt are `jacobian-reference.py` and `jacobian-reference-target.json` in the same independent evidence family. Application to a continuation still requires receiver boxes, source tubes and root brackets covering each full reception interval.

### 7.1. A separate sharper cubic enclosure

The known-first `cubic-shell-reference.py` sums the full cubic coefficient over the cube of radius $256$ by exact integer shell moments. For $m=|n|^2$, the signed numerator is $35n_x^4-30n_x^2m+3m^2$, and its contribution is the negative of that numerator divided by $2m^4\sqrt m$. Exact rational reciprocal-radical brackets and outward additions enclose the finite sum. The angular numerator has magnitude at most $8m^2$, so the remaining cubical shells contribute at most $48/N^2+2/N^4$ for $N=256$. Integer overflow is excluded by a bound on every absolute partial shell sum. The six-neighbor coefficient $14$, unit-cube integer groups and angular critical values were checked before target use.

This independent reference yields

$$
14.313597191615461\le a\le14.315062036797517.
$$

Its center uncertainty relative to the unchanged numerical value $14.31433$ is at most $0.000732808384539041$. The separate `stationary-error-cubic256.py` receipt combines this refinement with the existing far-coefficient enclosures and tails. At $B=7/20$, the complete stationary-center acceleration error is below $0.000511856324$ and its receiver-derivative error is below $0.004440462517$. The earlier broad-interval references and receipts remain unchanged.

### 7.2. Full polynomial derivative enclosure

For derivative evaluation, summing the 26 near-source interval matrices separately can lose their exact low-order cancellation. The new `stationary-full-coefficients.py` instead encloses the degree-$6,8,10,12,14$ potential coefficients over all $117648$ nonzero labels of the radius-$24$ cube. These coefficients include the 26 near labels. The full cubic coefficient above supplies degree four. No near-source field is added to this alternative polynomial representation.

The finite-cube tails retain the bound in §6. For the omitted field degrees $15,17,\ldots$, split the 26 near labels into the squared-radius populations $(m,c_m)=(1,6),(2,12),(3,8)$. Put $q_m=B^2/m$, and define

$$
\begin{aligned}
F(q)&=\frac{16}{1-q}+\frac{2q}{(1-q)^2},\\
D(q)&=\frac{240}{1-q}+\frac{62q}{(1-q)^2}+\frac{4q(1+q)}{(1-q)^3}.
\end{aligned}
$$

The omitted field and receiver derivative are bounded, before multiplication by $g$, by

$$
\begin{aligned}
B^{15}\left[\sum_{m=1}^3\frac{c_mF(q_m)}{m^{17/2}}+S_{17}F(B^2/4)\right],\\
B^{14}\left[\sum_{m=1}^3\frac{c_mD(q_m)}{m^{17/2}}+S_{17}D(B^2/4)\right],
\end{aligned}
$$

where $S_{17}$ is the previously derived exterior-unit-cube bound. The known-first `stationary-full-tail.py` adds the finite-cube tails with exact rational upper arithmetic. At $B=7/20$, the total receiver-Jacobian tail is below $0.011483153030$ after multiplication by $g=16$; at $B=1/10$ it is below $8.683928\times10^{-7}$. This alternative is an enclosure of the same full stationary derivative, independent of the numerical approximation's choice to evaluate near labels separately.

## 8. Independent continuous residual-row check

For a receiver velocity $w$, direct differentiation of the causal equation gives

$$
\dot s=\frac{1-n\cdot w}{D},\qquad
\dot R=w-v\dot s,\qquad
\dot r=n\cdot\dot R,\qquad
\dot n=\frac{\dot R-n\dot r}{r},\qquad
\dot D=-\dot n\cdot v-n\cdot a\,\dot s.
$$

Substituting these identities into the derivative of $n/(r^2D)$ independently reproduces the subject's factored expression

$$
\frac{d}{dt}\left(K-K_0\right)=J_{\mathrm{changed}}w+E,
$$

with

$$
E=-\frac{(I-3nn^{\mathsf T})v}{r^3D^2}
-\frac{n\left(|v|^2-(n\cdot v)^2\right)}{r^3D^3}
+\frac{n(n\cdot a)}{r^2D^3}.
$$

The separate `residual-row-reference.py` first passes exact stationary and affine-source controls, then checks both the acceleration value and complete time derivative on three noncollinear rational source/receiver jets against `residual_factored.py`. It uses the direct implicit differentiation above, not the subject's factored calculation. Every exact value lies in the corresponding outward interval. This accepts the row algebra; complete residual acceptance additionally requires full interval histories, row census, stationary remainder and receiver cells.

A useful source-prefix bootstrap is available without assuming the desired later actual solution. Stop at the first global speed-one event and at displacement radius $B=7/20$, and take $H=11/2$. The accepted source positions at time five have radius below $0.062304433$. Thus any cross receiver at time $t\le H$ has distance at least $1-B-0.062304433=0.587695567$ from the source's time-five position. A hypothetical emission $s\ge5$ can reduce that distance by at most $s-5$ under the stopped speed bound. It still exceeds $t-s$, since $0.587695567>H-5$. Consequently every cross emission lies strictly before five. The certified prefix then yields the sharper emission ceiling $H-1+B+0.062304433<4.912305$. This argument concerns the stopped actual evolution; the numerical comparison's separately enclosed prefix also remains before five.

## 9. Independent finite geometry reconciliation

The separate `coverage-reference.py` passes exact squared-threshold controls and the accepted $1278$- and $1326$-receiver censuses before examining the new archive. It independently finds $1502$ potentially affected receivers through $11/2$, $1350$ retained incoming histories and exactly $149046$ generated trial relationships, with maximum degree $223$. Exact rational squared-distance comparisons reproduce the saved relationship set. Every declared numerical zero cut is no later than the corresponding analytical first front. With source displacement below $7/100$, those trial relationships therefore contain all possible actual generated rows on the stopped receiver domain. The archive audit separately authenticates the numerical zero prefixes, preserved endpoint jets and complete incoming-label order. Original negative-time pulse corrections remain separate rows. The separate history owner's numerical-complement argument also closes: onset slack at most $1/32$ and the certified subunit incoming polynomial speed put every hypothetical first numerical reception within radius $221/32$ of an original center. Its square is $48841/1024<48$, excluding every omitted shell. Thus the infinite complementary population stays stationary on this comparison horizon. This reconciliation establishes conditional input coverage, not an actual event.

All new independent scripts and known/target receipts are retained under `.local-data/master-equation-closure/next-event/independent/`, with a SHA-256 manifest. The original through-five, displacement-boundary and enlarged-domain references remain frozen.

## 10. Refining accepted prefix errors

The new prefix comparison can sharpen errors on already accepted histories without changing those histories. Its receiver Jacobian uses the previously accepted endpoint position-error ceiling, which bounds the whole time cell because the earlier scalar majorant is nondecreasing. Thus the new comparison does not need to assume its own smaller tube in advance. Every source query ends before the current reception cell begins, so updating the earlier source-error table does not create a circular argument.

Let $P_{\mathrm{old}},V_{\mathrm{old}},A_{\mathrm{old}}$ be accepted cumulative bounds at the new endpoint. Intersecting them with the new position and velocity majorants is valid. The cumulative acceleration update must instead retain the earlier prefix explicitly:

$$
A_{\mathrm{new,prefix}}=
\min\!\left(A_{\mathrm{old}},
\max\!\left(A_{\mathrm{previous,prefix}},A_{\mathrm{new,cell}}\right)\right).
$$

This preserves a bound for the complete prefix, including inherited early accelerations. The inspected prefix-refinement family implements this update. Its positive-series propagation uses outward rational factorial reciprocals and an explicit geometric-tail ratio guard; old-pulse support uses outward receiver-radius addition. The old-pulse derivative estimate on $[13/4,5]$ may safely use range four because the nonzero emission support has $s\le-9/8$, hence $t-s\ge35/8$. The completed refinements accepted below retain these premises.

The final residual adapter also uses six fixed rational tail coefficients and two cubic endpoints. The independent `residual-constants-reference.py` checks their actual binary interval endpoints against exact fractions, after known dyadic and non-dyadic conversion controls. All eight constants are enclosed. This verifies the constants actually used; it does not claim that converting arbitrary large fraction numerators and denominators separately is a general enclosure algorithm.

### 10.1. Accepted first prefix refinement

The completed successor `prefix_refinement2.py` has SHA-256 `83ee130f8d8cd378b2bbfd65b7add8c5cbc60e4e84dfd6b87953fe9d3c00bff1`. It additionally handles the exactly zero matrix norm without an invalid negative square-root input and normalizes the archived target array's shape without changing its values. The independent `prefix-residual-coverage.py` checks all 112 cells from $13/4$ to five against the retained target and environmental residual bins. Every cell is wholly covered. Every environmental receiver omitted from one reused receipt has both actual first front and numerical exact-zero cutoff no earlier than the cell's endpoint.

The separate `prefix-arithmetic-reference.py` checks the positive propagation against 32-term exact rational series with rigorous geometric tails at zero and nonzero coefficients. It also audits every retained error-table entry: the old prefix through $13/4$ is unchanged; all new errors are no larger than the accepted old errors; the complete cumulative acceleration update matches the displayed formula; and all three error profiles are nondecreasing. These checks pass after their known controls.

This refinement is accepted as a sharper enclosure of the same already accepted histories. Its maximum position, velocity and cumulative acceleration errors at time five are respectively below

$$
0.001965487771,\qquad0.008552300855,\qquad0.039320337620.
$$

The result receipt has SHA-256 `b6be679aa49b0bc03616ca368cc7301115b0842c18588393c7443e2b0063c5de`; its error-table archive has SHA-256 `177d8faadc5d623c49db132448d7a45e8dfeba9955187202c80e8dc01b0bfaff`. No later physical event follows from this improvement alone.

### 10.2. Accepted time-dependent errors before $73/32$

The previous coarse source lookup assigned its endpoint error to every positive earlier source time. The frozen accepted proof had already derived smaller time-dependent functions. Recovering those functions sharpens the bound without changing a trajectory, residual budget or physical history. Before $33/32$ the common majorant is the delayed constant-residual solution with coefficient seven and residual $10^{-10}$. Its suffix through $57/32$ uses coefficient eight and the same residual, with the delayed source errors retained by range. The next suffix through $73/32$ uses coefficient eight and residual $10^{-8}$. The accepted source-family residuals cover the reflected target as well as the environmental paths; the larger final suffix budget includes that inherited partner.

The new `early_prefix.py` reconstructs this hierarchy and includes the acceleration bound $\rho+\lambda P+$ delayed-source error on each cell, followed by the complete cumulative maximum. The independently authored `early-profile-reference.py` starts instead from exact rational kernel coefficients, sums each update before one outward rounding, and checks all 4673 fine nodes. Every proposed bound dominates this independently derived upper comparison. The $1/64$ table is exactly the corresponding stride, and all prefix errors are nondecreasing. Known controls precede this target check, which completes in 1.351 seconds. This accepts the reconstructed profile, rather than inferring its validity from endpoint agreement.

The reconstructed subject has SHA-256 `bad54962ebd6a5f02c1cb32d8e2e2fd110e13ae62c07c1fcf23a113232d65b82`; the table archive has SHA-256 `4e9530b315b73ad78e46a134e5ccaab7f9a40c1d9de4222944abf844cb8b9d6c`. A separate successor coverage audit extends the residual mapping to all 174 reception cells from $73/32$ to five, including the original bridge and later target certificates. All cells are covered and every receiver absent from an environmental receipt has a proved joint-zero prefix. Section 10.3 records the accepted final propagation using this profile.

### 10.3. Accepted final prefix refinement

The final `prefix_refinement4.py` propagates from $73/32$ to five using the reconstructed early profile, the same frozen histories and all 174 accepted continuous residual cells. It retains exact joint-zero prefixes and the cumulative acceleration update above. The known-first `prefix-arithmetic4-reference.py` checks the full table, its monotone prefix bounds, the accepted intersections and independently bounded positive kernels. The separate earlier residual-coverage audit verifies every reused environmental and target interval. The maximum errors at time five are below

$$
P<0.000992182746,\qquad V<0.004273235143,\qquad A_{\mathrm{prefix}}<0.019567817387.
$$

The earlier pulse derivative estimate uses range three before $23/8$ and range four afterward. At the join, nonzero pulse emissions obey $s\le s_{\mathrm{end}}=-9/8$ and the zero endpoint plus pulse-speed bound gives $|y(s)|\le w_p(s_{\mathrm{end}}-s)$. The stationary-subtraction segment then has range at least $4+(1-w_p)(s_{\mathrm{end}}-s)\ge4$. Thus the improved range does not discard the displacement correction at the pulse-support edge.

The accepted subject has SHA-256 `dbf31017f3fc6efa261243cd3b617705c55bd606524fff030049130f9aa41b79`; its receipt has SHA-256 `ccacc2508b5a49d29dc186f3b4ed56fece283d781cde78401b15abe2ad2bf808`, and its array has SHA-256 `467aeec7cd3a38688e0dae4b5840dea3e8bdd3ae0c305ec9388791d2baef5a22`. This accepted table supplies the final event comparison's initial and delayed-source errors. No archived trajectory was changed.

## 11. A regularity neighborhood before the first global speed event

The accepted incoming histories satisfy the convenient common ceilings $b<7/100$, $w<1/5$ and $a<1$, including the original supplied pulses. On the stopped receiver domain $B=7/20$, $W\le1$, every cross row has range at least $d=29/50$ and transmitter factor at least $D=4/5$. Simultaneous distinct-label separation is at least $1-2B=3/10$.

The causal time derivative obeys

$$
|\dot s|\le\frac{1+W}{D},\qquad
|\dot R|\le W+w\frac{1+W}{D}=\frac32.
$$

Direct differentiation of $K=n/(r^2D)$ therefore gives the conservative bound

$$
\left|\frac{dK}{dt}\right|
\le\frac{3(3/2)}{d^3D}
+\frac{(3/2)w/d+a(1+W)/D}{d^2D^2}
<42.843981919.
$$

The stationary-row subtraction contributes at most $2W/(1-B)^3<7.282658171$ per changed row. The frozen solid-harmonic derivative theorem bounds the full stationary part by $g(3a_+B^2+C_D(B)B^4)W<384.684369$. With at most 223 changed rows and $g=16$, the exact rational `regularity-reference.py` obtains

$$
|y_i'''|<179236.536204<200000.
$$

Its known controls precede the target receipt. This is a sufficient finite regularity allowance for the enlarged local continuation argument. It does not assert retention of the earlier numerical class ceiling $65536$, and it makes no change to the equation or supplied history. Fixed earlier cross histories, a positive cross-range and transmitter margin, and a regular stationary complement provide a locally Lipschitz receiver equation. The subunit stopped history has no positive own root. Thus, once the displacement/error comparison closes, no separate cross-root, collision or unbounded-jerk obstruction can occur before the first global speed event. At that event the conditional own-root-birth theorem still requires its positive radial-acceleration premise.

## 12. Full stationary polynomial residual and dyadic refinement

The full polynomial residual subject with SHA-256 `fdaf3c84177e1a6c07cfe1b5b09d8808d66f0c0cf2741ff66465b9735fea5b11` uses the full cube-24 coefficient intervals, the broad accepted full cubic interval and the omitted near/far degree-15 tails. Its remainder is conservative relative to §7.2 because it uses the larger exterior-unit-cube bound $24/14+2/16$. The known-first constant audit verifies every rational tail coefficient and both cubic endpoints actually supplied to its inherited converter. The completed result has 32 continuous cells covering $[5,11/2]$, retains all 149046 generated relationships, and encloses source emissions below $4.799340<5$.

The midpoint derivative calculation applies to the retained stationary polynomial plus cross rows. Adding the full stationary remainder norm afterward bounds the exact acceleration defect; no derivative of an omitted remainder is silently assumed. This validates the continuous residual interpretation. Its largest per-cell bound is about $0.666199$ and is an acceleration mismatch bound, not a position or velocity error and not an actual event certificate.

The separate reception-grid successor retains this mathematics and refines $[43/8,11/2]$ into 16 cells of width $1/128$. For that invocation, endpoints, midpoints and halfwidths are all exact dyadics. The copied full-history source contraction and row accumulation match the frozen driver. Its later completed result must be intersected with the coarse bounds only on the reception intervals both cover; earlier coarse cells remain available unchanged.

## 13. Accepted actual first global wake-speed event

### 13.1. Continuous comparison and independent arithmetic

The final subject `event_comparison.py` uses the fixed accepted histories through five, the prefix errors of §10.3, the full continuous residual of §12, the signed Jacobian of §7 and the complete relationship census of §9. It constructs an auxiliary finite equation containing all cross contributions and the stationary complement, with the accepted earlier histories held fixed. Own positive roots are absent before the first global speed-one event. The auxiliary equation therefore agrees with the unchanged Master Equation up to that event; its later cross-only continuation is solely a comparison device.

For each of the 1502 potentially affected labels on each reception cell, let $e=x-\widehat x$ be the vector position error. The interval Jacobian and source-error bounds give

$$
|e''(t)|\le\lambda |e(t)|+q+\rho,
$$

where $\rho$ bounds the continuous full-equation defect of the comparison polynomial. Twice integrating this vector norm inequality and comparing its nonnegative Volterra kernel with the scalar equation $P''=\lambda P+q+\rho$ gives the propagated bounds. No differentiability inequality for the Euclidean norm $|e|$ is assumed. A strict first-exit comparison closes the whole receiver-error tube on each cell. The full 32-cell auxiliary comparison has displacement below $0.288473<7/20$, so it stays strictly inside the stationary-field and receiver domain used in the proof.

The separately authored `event-reference.py` passed exact constant-acceleration and radical/sign controls before target use. It then checked all $32\times1502=48064$ propagation steps with exact rational positive-series kernels and rigorous remainder bounds. It also checked every continuous target sign, every possible-event radial-acceleration bound, every endpoint speed witness and the partition and input hashes. The target check passed in 27.417 seconds. The reference's Euclidean speed lower bounds use exact dyadic archived velocities and an independently enclosed square root. This is more than agreement with the subject's floating output: the field, derivative, coverage and comparison inequalities were established independently above.

### 13.2. Event bracket and no earlier target maximum

All consecutive reception cells through $87/16$ have every speed upper bound below one; the last such cell has maximum below $0.948131$. At $351/64$, the auxiliary label $(-1,0,1)$ has speed lower bound

$$
|v_{(-1,0,1)}(351/64)|>1.001463393599>1.
$$

If the actual solution remained subunit through that endpoint, it would agree with the auxiliary equation there, contradicting this bound. The strict displacement margins, regular cross roots and finite regularity bounds prevent a separate earlier continuation failure. Continuity of the finite potential population's velocities therefore gives a first actual global event with

$$
\boxed{\frac{87}{16}<t_*\le\frac{351}{64}},
\qquad 5.4375<t_*\le5.484375.
$$

On every cell from five through the forcing endpoint, both targets satisfy

$$
v_z>0.132096243949.
$$

Together with the accepted earlier target-sign proof, this excludes a next target vertical maximum before $t_*$. It does not certify a maximum after the obstruction.

The first event label is unresolved. The controlled candidate set is

$$
\begin{aligned}
\{&(-1,0,1),(0,-1,0),(0,-1,1),(0,0,0),(0,1,0),(0,1,1),\\
 &(1,-1,0),(1,-1,1),(1,0,0),(1,1,0),(1,1,1),(2,0,1)\}.
\end{aligned}
$$

It includes both targets. The endpoint witness and the numerical proposal's earliest environmental identities do not select the actual first identity or exclude simultaneous first events.

### 13.3. Transversality, separation and the smooth-continuation obstruction

At any possible speed-one event, the interval polynomial bounds and position/velocity/acceleration comparisons imply

$$
v\cdot a\ge\widehat v\cdot\widehat a-V|\widehat a|-A.
$$

This formula uses $|v|=1$ at the event: writing $v\cdot a=\widehat v\cdot\widehat a+(v-\widehat v)\cdot\widehat a+v\cdot(a-\widehat a)$ proves the inequality directly. The independent reference evaluates its interval products and square-root bounds separately. On all possible first-event cells through $351/64$,

$$
v\cdot a>1.463081418064>0.
$$

The same 31-cell prefix has displacement below $0.265390942$ and source queries below $4.778039<5$. Therefore every pair of distinct labels is separated by more than $1-2(0.265390942)>0.469218116$ in lattice-spacing units. The earlier accepted prefix has a stronger separation bound. Cross ranges and transmitter factors also retain the margins in §11. The infinite stationary complement and the finite disturbed population thus satisfy the bounded-cross hypothesis of §3, including simultaneous first-event labels.

Consequently the actual first global event satisfies the curved-path birth theorem. A hypothetical $C^3$ passage would create the positive own-history row with acceleration asymptotic $g v_*/(4\alpha h^3)$ while the remaining cross contribution stays bounded. The unchanged Master Equation cannot have such a smooth continuation. This is an actual finite-time classical-continuation obstruction for the supplied preparation, before a next target maximum. It is not a collision, an auxiliary displacement-boundary failure, a determination of typical populated-universe behavior, or a theorem excluding all nonsmooth continuation classes.

### 13.4. Frozen acceptance evidence

The accepted event subject has SHA-256 `78bd10323f600b5526f3dc5741c76291b7f46618ad58d53a56f3a3956c076817`; its full receipt has SHA-256 `48e9d227e70314f45e6563a5d49ca4262d49a8bc248a320578e2deca6a4516d1`. The bound residual has SHA-256 `d2e25f2e9a3ce1c6f0e667b3c085f95f814aa9111bcda1a230f4ce44e7c31ed7`; the frozen auxiliary archive has SHA-256 `97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac`. The independent final reference has SHA-256 `2837443d591b513558dff9d467304bdd50f29393f9ba7e9794ef2ead07de5a3b`.

The reference and its known/target receipts are retained in `.local-data/master-equation-closure/next-event/independent/`. The continuation owner retains the subject, helpers, prefix tables and the known-first `event-extract2.json` extraction. The latter checks every consecutive safe cell before the bracket's left endpoint and takes candidate, sign and displacement bounds only over the 31 cells needed to force the event. The independently checked 32nd auxiliary cell is not promoted to actual post-event evolution. The optional later residual refinement is reserve evidence and is not required by this acceptance. All preceding accepted subjects and references remain frozen.
