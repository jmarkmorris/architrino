# Independent small-height crossing and periodic-profile obstruction

## Verdict and three accepted claims

**Computer-assisted derived and independently accepted:** the [small-cosine-height subject](overnight2-b-cosine-small-height.md) has a valid frequency-independent crossing-torque lower bound, and the [arbitrary-profile extension](overnight2-b-zero-height-profile-extension.md) correctly applies the same enclosure at a necessary zero. The all-positive-height/all-positive-frequency cosine synthesis is also accepted using the separately accepted complete finite cover and endpoint theorem. No mathematical repair is required.

The new [independent companion](overnight2-b-independent-small-height-profile.py) certifies $A_t>1/10$ for every zero-height reception in the complete canonical unit-radius, constant-planar-rate class with
$$
\frac{19}{100}\le\beta\le\frac{21}{100},\qquad
|z|\le\frac1{10},\qquad |z'|\le\frac{19}{20},\qquad |zz'|\le\frac{19}{400}.
$$
Here $\tau=t/R$, $z'=dz/d\tau$, and the constants are $K=c_f=1$. The dimensional physical axial velocity is exactly this normalized-time derivative. No Fourier, reflection, concavity or frequency assumption enters the zero-reception estimate. The profile may be nonperiodic for that local estimate, provided the complete-history bounds hold.

For a $C^2$ periodic profile, exact balance necessarily supplies a zero unless a signed-global-extremum contradiction already excludes it. Consequently every periodic profile satisfying the displayed bounds is excluded at every $R>0$. In particular $|z|\le1/20$, $|z'|\le19/20$ suffice. This includes identically zero height and profiles touching zero without changing sign.

For cosine height $H\cos(\kappa\tau)$, the first claim applies whenever $0<H\le1/10$ and $H\kappa\le19/20$. Combining it with the independent finite-cover and endpoint results excludes all
$$
H>0,\qquad \kappa>0,\qquad \beta\in[19/100,21/100],\qquad
\beta^2+H^2\kappa^2\le(19/20)^2.
$$
Every claim retains unit normalized radius and constant planar rate with no periodic planar phase correction. General radius/phase histories and arbitrary larger profiles remain outside these conclusions.

## Complete ordinary chart

Use complete paths
$$
X_j(t)=R\bigl(\cos[\beta\tau+j\pi/3],\sin[\beta\tau+j\pi/3],(-1)^jz(\tau)\bigr),\qquad \tau=t/R.
$$
The physical speed satisfies
$$
|V_j|^2=\beta^2+z'(\tau)^2
\le\frac{9466}{10000}<\frac{9604}{10000}=\left(\frac{49}{50}\right)^2<1.
$$
For a fixed reception the normalized distance-minus-delay gap is strictly decreasing: changing delay by $\delta>0$ can increase the distance by at most $(49/50)\delta$. Every partner's gap starts positive because its equal-time planar chord is nonzero and becomes negative in the complete past. Therefore it has exactly one positive root. For self the displacement is strictly less than the positive delay, so no positive self root exists. There are exactly five ordinary rows, all with
$$
D_{s,j}=1-\widehat Q_j\cdot V_{s,j}>\frac1{50}>0.
$$
The finite sum is complete; no memory cutoff or numerical root count supplies this chart. The lower bound from the present chord and the speed bound also keeps every partner delay away from zero. For the zero-reception argument, the more restrictive comparison bounds below enclose the roots uniformly in frequency and waveform.

## Comparison roots and source product at an arbitrary zero

Fix a reception $\tau_0$ with $z(\tau_0)=0$. Let $d>0$ be a normalized delay, $z_s=z(\tau_0-d)$, $z'_s=z'(\tau_0-d)$, $\sigma_j=(-1)^j$ and $\alpha=j\pi/3-\beta d$. The axial separation is $Q_z=-\sigma_jz_s$ and source axial velocity is $V_{s,z}=\sigma_jz'_s$. Hence
$$
Q_zV_{s,z}=-z_sz'_s=:P,\qquad |P|\le\frac{19}{400},
$$
$$
q(d)^2=4\sin^2(\alpha/2)+z_s^2.
$$
The polarity cancels in the product, including its sign. The complete source contraction is $Q\cdot V_s=-\beta\sin\alpha+P$. Therefore at a root,
$$
D_s=1+\frac{\beta\sin\alpha-P}{d},\qquad
A_{t,j}=\frac{-\sigma_j\sin\alpha}{d^2(d+\beta\sin\alpha-P)}.
$$
This uses the delayed source velocity, not the current receiver velocity. The product $P$ is enclosed with both signs; no claim of a preferred sign is made.

With $Z=1/10$, introduce comparison distances
$$
q_a(d)=\sqrt{4\sin^2[(j\pi/3-\beta d)/2]+a^2},\qquad a\in\{0,Z\}.
$$
The complete height bound gives $q_0(d)\le q(d)\le q_Z(d)$ for every delay. Each comparison distance is a norm of a planar source on a unit circle with fixed axial offset $a$, so it is Lipschitz with constant at most $\beta\le21/100$. Its gap has strictly negative secant slopes, with magnitudes between $79/100$ and $121/100$, and it has one positive root $d_a$.

At an actual root $q(d)=d$, one has $q_0(d)-d\le0$ and $q_Z(d)-d\ge0$. Strict decrease of the two comparison gaps proves
$$
\boxed{d_0\le d\le d_Z.}
$$
Neither comparison differentiates the arbitrary waveform. The derivative bound is needed for the actual complete chart; height and product ceilings suffice for the comparison and row bounds at the zero.

Every comparison root lies strictly inside $[1/2,21/10]$: its equal-time chord is at least one, so its delay is at least $1/(1+21/100)>1/2$, while $q_a\le\sqrt{4+Z^2}<21/10$. Both inequalities are exact rational-square comparisons. Within this bracket the instrument verifies the sine sign on each full rate cell. For $j=1,2,3$ it is positive and for $j=4,5$ negative. At a comparison root,
$$
\frac{\partial d_a}{\partial\beta}=-\frac{\sin\alpha}{D_a},\qquad
D_a=1+\frac{\beta\sin\alpha}{d_a}\ge1-\beta>0.
$$
Thus comparison roots decrease with $\beta$ for the first three partners and increase for the final two. Evaluating the planar comparison root at the appropriate rate endpoint supplies a uniform lower delay bound; evaluating the $Z$-comparison root at the opposite endpoint supplies a uniform upper bound. The whole-cell sine-sign intervals are retained as evidence for this monotonicity, rather than assumed from a midpoint.

The immutable [independent thin-height reference](overnight2-b-independent-thin-height.py) bisects the squared comparison gap $q_a^2-d^2$ at those endpoint rates. Since $q_a+d>0$, its sign is exactly the unsquared-gap sign. Every updated bracket endpoint has a strict outward-certified sign. An ambiguous midpoint is retained between independently sign-checked quarter points; it is never assigned a side by a floating estimate. The rational final bracket width is at most $2^{-70}$.

The new companion supplies the actual crossing comparison chord $a=Z=1/10$ and source-product interval $[-19/400,19/400]$ directly. It imports only the frozen independent bisection and scalar-kernel reference, with no subject imports or subject intervals. Substituting the delay, sine, rate and full product intervals into the factored row is inclusive. The denominator is required to be strictly positive by the interval calculation itself; every row and denominator interval is retained. Summing all five rows gives an inclusive complete tangential interval on each closed rate cell.

## Cosine specialization and the factor one half

At the descending zero of $z(\tau)=H\cos(\kappa\tau)$, writing $\ell=\kappa d$ and $v=H\kappa$ gives
$$
z_s=H\sin\ell,\qquad z'_s=-v\cos\ell,\qquad
P=-z_sz'_s=Hv\sin\ell\cos\ell.
$$
Therefore $|z_s|\le H$ and $|P|\le Hv/2$. With $H\le1/10$ and $v\le19/20$ this product is at most $19/400$, exactly the larger-profile product ceiling. Equality is attainable in the product formula at lag $\pi/4$; it comes from the sinusoid's relative height/velocity phase, not from halving the actual physical speed.

This argument is uniform over every $\ell$. A causal lag may cross multiple oscillation periods, and arbitrarily large $\kappa$ is allowed as $H$ decreases while $H\kappa$ stays bounded. The enclosure contains all these cases. No short-lag assumption enters this small-height torque theorem.

## Numerical controls, pilot and full target

The known stage first reran the frozen independent reference's signed rational serialization, square-versus-product arithmetic, static roots and complete torque cancellation, nonstatic closed-form comparison root, source-projection signs and rational chart bounds. New controls then checked all five static comparison roots with axial chord exactly $1/10$: their squared roots are $1+1/100$, $3+1/100$, $4+1/100$, $3+1/100$, $1+1/100$.

For a direct scalar-kernel control at $d=1$, $\sin\alpha=1$, $\beta=1/5$, the two product signs $P=\pm19/400$ give exact factored denominators $461/400$ and $499/400$. Both signs and the corresponding row reciprocals were checked. A separate interval evaluation at lag $\pi/4$ narrowly enclosed the cosine product $19/400$. Exact rational checks established $(1/10)(19/20)/2=19/400$ and $(1/20)(19/20)=19/400$, as well as the global speed and comparison-root bracket inequalities.

The new known receipt passed before any pilot or target use. It completed synchronously with exit zero in 0.128754 seconds, produced 15,846 bytes and reported 27,901,952 peak resident bytes after serialization. The reference file's hash and the new source hash gate later stages; both remained unchanged after the known pass.

The pilot covered the first closed rate cell $[19/100,153/800]$ with the full height and product ceilings. It certified $A_t>1/10$, measured 0.069554 internal seconds and produced 22,135 bytes, with 27,852,800 peak resident bytes after serialization. Its measured cost projected about 1.12 seconds and 0.36 MB for sixteen cells. Pilot supervisor `c38ec53f-a90f-4040-a463-4b5a25fb097b` closed in 0.114 supervised seconds with exit zero, zero stderr and `processGroupClosed: true`.

The full target then covered the sixteen closed cells
$$
\left[\frac{19}{100}+\frac i{800},\ \frac{19}{100}+\frac{i+1}{800}\right],\qquad i=0,\ldots,15.
$$
Their shared endpoints and exact final endpoint $19/100+16/800=21/100$ prove complete coverage of the declared rate interval. No height, frequency or waveform coordinate is sampled: the global ceilings are enclosed on every cell. The target returned all sixteen inclusive five-row intervals and a hull whose lower endpoint is
$$
L=\frac{10431021851406452416579220095564756601625241824519851876890821859358295}{55213970774324510299478046898216203619608871777363092441300193790394368}.
$$
Its exact recorded margin is
$$
L-\frac1{10}
=\frac{24548123869870006933157077028715681198321773233917713163804012401594291}{276069853871622551497390234491081018098044358886815462206500968951971840}>0.
$$
Both numerator and denominator are positive integers, so this establishes the proposed strict bound without a rounded decimal comparison. The upper endpoint and every individual row interval remain in the target receipt.

The target measured 0.837891 internal seconds, produced 333,414 bytes and reported 29,409,280 peak resident bytes after serialization. Supervisor `26eaedb5-7ccd-484a-a22a-50278c50a5f0` closed in 0.882 supervised seconds with exit zero, zero stderr and `processGroupClosed: true`. Known, pilot and target receipts total 371,395 bytes. The caps were 120 internal seconds, 180 supervisor seconds, 512 MiB resident memory, 8 MiB receipt bytes and one numerical thread. All stages completed well inside these bounds. The numerical slot was released to the parent after target closure.

## Necessary zero for a periodic exact profile

Assume a real $C^2$ periodic profile in the declared bounds were exact and never vanished. Continuity makes it strictly one-signed. Reflecting the entire axial coordinate if necessary reduces to $z>0$; the canonical vector law and all magnitude bounds are invariant under that reflection. A period is compact, so the continuous positive profile attains a global minimum $m>0$ at some $\tau_0$.

The canonical axial numerator for partner $j$ is $\sigma_j z(\tau_0)-z(\tau_0-d_j)$. At this minimum it is nonpositive for same-polarity partners and at most $-2m<0$ for each opposite-polarity partner. There are exactly three opposite-polarity partners, and every ordinary weight $1/(d_j^3D_{s,j})$ is strictly positive. Hence the complete canonical axial acceleration is strictly negative. Exact balance requires
$$
A_z(\tau_0)=Rz''(\tau_0),
$$
while a $C^2$ minimum has $z''(\tau_0)\ge0$. This is a contradiction. The reflected negative case is equally excluded.

The proof requires only the pointwise finite positive weights at this extremum; the admitted chart supplies stronger uniform bounds. It does not need a theorem forcing every nonzero periodic profile to change sign. Any remaining exact periodic profile must have at least one zero, including the possibility of a zero touch. The identically zero profile also has a zero reception.

At any such zero the independently certified crossing bound gives $A_t>1/10$. Constant unit radius and constant planar rate prescribe tangential acceleration identically zero, so exact balance is impossible there. This completes the arbitrary-profile exclusion. The simpler amplitude condition $|z|\le1/20$ implies $|zz'|\le(1/20)(19/20)=19/400$ and also $|z|\le1/10$, so it is an immediate corollary with no separate numerical target.

The larger amplitude and speed bounds alone yield only $|zz'|\le19/200$; the product ceiling is therefore a substantive restriction at amplitude $1/10$. It must remain explicit for arbitrary profiles. No periodicity is needed for the zero-reception estimate, but the no-zero minimum argument uses periodicity. A nonperiodic profile with no zero is outside that extension.

## Exhaustive cosine synthesis for all positive heights and frequencies

The [independent speed-coordinate completion](overnight2-b-independent-speed-coordinate.md), together with the [independent exact partition](overnight2-b-independent-domain-cover.md), now accepts the full finite cosine domain
$$
H\in[1/10,5/6],\quad \beta\in[1/20,4/5],\quad \eta\in[1/10,1],\quad
\kappa=\frac{\eta\sqrt{(19/20)^2-\beta^2}}H.
$$
This dependency includes every leaf, not just a total volume or a selection of boxes. The older partial audit's unresolved evidence remains preserved; its 144 leaves were subsequently independently excluded without changing their bounds.

For an arbitrary positive $H,\kappa$ satisfying the synthesis speed budget, define
$$
\eta=\frac{H\kappa}{\sqrt{(19/20)^2-\beta^2}}\in(0,1].
$$
The square root is strictly positive throughout $\beta\in[19/100,21/100]$. The complete disposition is:

1. If $0<H\le1/10$, then $H\kappa\le19/20$ and the independently accepted small-height bound applies.
2. If $1/10\le H\le5/6$ and $\eta\ge1/10$, the point belongs to the accepted finite domain, because the rotation interval is contained in $[1/20,4/5]$.
3. If $1/10\le H\le5/6$ and $\eta<1/10$, then $\kappa=\eta s/H<19/20<\pi/2$.
4. If $H>5/6$, then $\kappa\le s/H<(19/20)/(5/6)=57/50<\pi/2$.

The final strict comparisons follow already from $\pi>3$. Cases three and four are excluded by the [accepted unit-radius lobe-endpoint theorem](overnight2-b-independent-lobe-endpoint.md): at the preceding cosine zero the planar distance is at most two, so $\pi/\kappa>2$ makes the gap negative there, puts every unique partner root inside the positive preceding lobe, and gives strictly negative canonical axial acceleration at a reception demanding zero axial acceleration.

All boundaries are covered: $H=1/10$ belongs to the first and finite ranges, $H=5/6$ belongs to the finite range, and $\eta=1/10$ belongs to its closed rate-fraction interval. There is no upper-height gap or low-frequency gap. Every case retains total speed at most $19/20$, so the endpoint theorem's below-wake-speed chart is available. The result is an exhaustive exclusion of this cosine family in its specified rotation and speed range, not an extension to every speed below one or every spatial waveform.

## Provenance, limits and falsifiers

The independent arithmetic uses the immutable bisection/scalar-kernel reference and mpmath 1.3.0 outward intervals at 70 decimal digits. The subject shares the mpmath primitive library, but its source and numerical outputs were not imported. The independently derived comparison ordering, rate monotonicity, source-product formula and known-case suite establish the comparison above that shared arithmetic layer. This is not a formal verification of every rounding/transcendental primitive. The Moore role contributes a review lens and no separate authority.

Native `shasum -a 256` identifies the frozen and new artifacts as follows:

| Item | SHA-256 |
| --- | --- |
| Cosine small-height subject | `fd73609c278c40d5f0787d6e2e38c3ea47a18d8036693b556e20cab6b0dcdb29` |
| Subject instrument, not imported | `1dca8b7eb63910c3ded8248899bf7a34bfc0e20f43517ac0e47d433af2c24532` |
| Subject target, not used as enclosure evidence | `dbf706a8423594daa80bb1cc93d0039f539c9455d5a0cc4609f18191e518c217` |
| Arbitrary-profile analytical subject | `15c3b642636da7453bece7412cc6267a8fd1dd9ee19374aff237c2f8b3e2bc6f` |
| Frozen independent thin-height reference | `365a9d363ce32fc08b37b576aaaf51da57ac3913933e7913e0d42d8671def0c0` |
| New independent companion | `f1034766b25da7b7a648818ffb5f485135c1bea8cac1b459247a75aa93ce80c3` |
| New known receipt | `4193a4be5e6afc26e4c400cefd3661fec06d5c35e7350f976a8dace40fef2fdd` |
| New pilot receipt | `674e33fe7f80944539511b1b2e84b19aa8243cbd0759b17984c46473f5bf9abd` |
| New target receipt | `fa8362c9cdb613eecb16143d3631e9d165af44dfcdd5344706e0ff0149257671` |

Fresh local evidence is retained under `.local-data/master-equation-closure/overnight2-b/independent-small-height-profile/` as `known.json`, `pilot.json` and `target.json`. Successful paths refuse overwrite. All original inputs, independent references and previous outcomes remain frozen. The new source was unchanged between the known pass, pilot and target.

A wrong source-product sign, missing causal root, incorrect comparison-root ordering or rate monotonicity, invalid bisection bracket, nonpositive denominator or actual torque outside a retained interval would falsify the corresponding numerical theorem. An exact strictly signed periodic profile whose extremal canonical acceleration has the opposite sign would defeat the minimum argument. An exact admitted periodic profile in the stated norm/product class would refute the combined profile exclusion. A gap in the four-case cosine disposition or a failure of the accepted complete finite-cover dependency would defeat the all-height synthesis. Merely relaxing the product ceiling, variable radius/phase assumptions, periodicity, rotation range or speed budget changes the theorem's domain.

Only this report, its new companion, assigned fresh runtime evidence and supervisor-managed operational records were authored. All subjects, previous independent sources/reports/receipts, parent receiving account and shared owners remained read-only. No Git mutation, generator, delegation, sidebar action, new physical law or orbit search was used. All Python ran in the shared executable venv with bytecode writes disabled and one numerical thread. Native whitespace checks cover the two new authored files; native hashes and byte counts verify the listed evidence and preservation scope. Both supervised numerical groups are closed. Parent integration is the remaining disposition step, and this bounded review is complete.
