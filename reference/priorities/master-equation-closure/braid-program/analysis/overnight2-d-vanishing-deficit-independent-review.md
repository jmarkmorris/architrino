# Independent review of approach with vanishing source-history deficit

## Disposition and frozen scope

**Derived disposition:** the coupled range estimate, power-law deficit specialization, upper-radius barrier and finite positive-separation horizon in [the frozen subject](overnight2-d-vanishing-deficit-approach.md) are valid under the stated hypotheses. No required mathematical correction was found. The permissible linear deficit decay at $p=1$ is a genuine strengthening of the earlier sufficient estimate. This is conditional mathematics for the original balance-0 investigation; it establishes neither original entry nor attained contact and uses no conclusion from the C1 preparation.

The subject SHA-256 is `19d6b30894064e5ae50ff3d53b5816bbb9079104e4916f5802112dee221c7ecb`, measured unchanged before and after review. The supporting [pair-approach theorem](overnight2-d-pair-approach-rate.md) was read at SHA-256 `41bc9f9a123df453f55ff7a39ebfb8d783a0cba806636f88affac4d120039473`, and the [complete-delay geometry](overnight2-d-approach-delay-geometry.md) at `708e4deea970af5394c890da79ff3b0ca8f65785b5ebb1d4061d43a42740ee51`. The retained weaker draft `vanishing-deficit-before-coupled-range-improvement.md` is outside this adjudication and is not accepted by association. The Ramon E. Moore role supplied the review lens, not mathematical authority.

## Independent coupled derivation

For one directed channel, let $R>0$ be its causal delay/range in units $c_f=1$, $n$ its unit delayed direction, and $m=R^{-1}\int_{t-R}^tV(q)\,dq$ its complete mean source velocity. Position continuity and absolutely continuous source motion give $d=R(n-m)$. The full-interval speed bound implies $|m|\le1$. With $\eta=1-n\cdot m$,

$$
n\cdot d=R\eta,\qquad
\frac{r^2}{R^2}=|n-m|^2=2\eta-(1-|m|^2)\le2\eta.
$$

Thus $r>0$ implies $\eta>0$, and $R\ge r/\sqrt{2\eta}$. For receiver $i$, $u\cdot n_i=R_i\eta_i/r$; for the reverse channel, $-u\cdot n_j=R_j\eta_j/r$. Applying the two directional allowances $|V_i+n_i|\le kR_i$ and $|V_j+n_j|\le kR_j$ at almost every reception gives

$$
\dot r\le-R_i\left(\frac{\eta_i}{r}-k\right)-R_j\left(\frac{\eta_j}{r}-k\right).
$$

This is the decisive coupling: each negative inward term and its positive directional-error allowance retain the same range. If $\eta_i,\eta_j>kr$, both coefficients in parentheses are positive, so substituting a lower range bound has the correct inequality direction. Consequently

$$
\dot r\le-f(\eta_i;kr)-f(\eta_j;kr),\qquad
f(\eta;c)=\frac{\eta-c}{\sqrt{2\eta}}.
$$

Direct differentiation yields

$$
\partial_\eta f(\eta;c)=\frac{\eta+c}{2\sqrt2\,\eta^{3/2}}>0
\qquad(\eta>0,\ c\ge0).
$$

Therefore substituting the common lower bound $\eta\ge a\rho^p$, where $r=\ell\rho$, gives

$$
\dot r\le-\sqrt{2a}\,\rho^{p/2}\left(1-\frac{k\ell}{a}\rho^{1-p}\right)
$$

whenever $a\rho^p>k\ell\rho$. For $0\le p\le1$ and $0<\rho\le\bar\rho$, the factor in parentheses is bounded below by its value at $\bar\rho$. The subject's $\nu>0$ proves the needed positivity as well as the uniform rate

$$
\dot\rho\le-\frac\nu\ell\rho^{p/2}.
$$

The lower bound must concern each full delayed history. A pointwise source factor, a current speed, or an endpoint snapshot is insufficient. The two channels may have different actual ranges and deficits; only their directional constant and lower power-law bound have been taken common. No equality of those histories is assumed.

## Barrier, regularity and horizon

For $k>0$ and $p<1$, strict positivity of the coefficient at $\bar\rho$ persists on some interval immediately above that radius. If an absolutely continuous separation starting below the radius crossed upward, a subinterval of that crossing would stay in this strip while its derivative is negative almost everywhere. Integrating the derivative contradicts the positive net increase. This supplies the upper barrier without assuming a classical derivative at the first-contact time. For $p=1$ the positive coefficient is constant; for $k=0$ it is positive throughout the positive-radius domain. The same argument applies.

On a compact positive-separation subinterval, continuity supplies a positive lower radius. The power transformation is continuously differentiable there, so the absolutely continuous chain rule is legitimate even though its derivative may become unbounded at zero. Integration gives

$$
\rho(t)^{1-p/2}\le\rho(t_0)^{1-p/2}-(1-p/2)\frac\nu\ell(t-t_0).
$$

The right side reaches zero at the stated time. No longer positive-separation ordinary interval can preserve all premises. The conclusion allows earlier failure of directional control, the complete deficit bound, an ordinary factor, or another continuation condition. An endpoint outside the existing interval is not an attained physical contact, and the argument supplies no continuation law through a singular event.

Positions need only the inherited absolute continuity, and the speed bound and differential inequalities may hold almost everywhere. Velocity jumps in the prescribed source history do not alter the complete path integral when position is continuous; any event-dependent direction premise must still be valid on its appropriate reception traces. This result neither proves complete root uniqueness nor selects among roots at a nonordinary event.

The units are consistent in normalized wake-speed units: $\eta,a,\rho$ are dimensionless; $k\ell$ is dimensionless, since $kR$ is the normalized velocity allowance. The factor $1/\ell$ converts the dimensionless separation rate to normalized inverse time. Changing the arbitrary scale $\ell$ consistently changes the dimensionless parameters and leaves the physical inequality unchanged.

## Endpoint exponents and strength of the improvement

At $p=0$ and $0<a\le2$, the new margin is $\sqrt{2a}-\sqrt{2/a}\,k\bar r$, whereas the earlier equal-channel margin is $\sqrt{2a}-2k\bar r/a$. Their difference is

$$
\frac{k\bar r}{a}\left(2-\sqrt{2a}\right)\ge0.
$$

The gain is strict for $0<a<2$ with positive directional allowance; the estimates coincide at $a=2$ or zero allowance. The frozen note correctly states that the sufficient condition is at least as permissive. Integration should retain this qualification rather than claim strict improvement for every allowed parameter.

At $p=1$, the inward and directional terms scale with the same square-root power. The radius-independent condition $a>k\ell$ gives the finite duration $2\ell\sqrt{\rho(t_0)}/\nu$. For $k>0$ and $p>1$, $a\rho^p/(k\ell\rho)\to0$ as $\rho\downarrow0$; the given lower bound alone eventually stops ensuring the sign condition. This does not prove failure of the actual directional geometry or exclude contact.

When $k=0$, the sign restriction causing $p\le1$ disappears. The same integration yields a finite bound for the nonnegative exponents $p<2$, including $1<p<2$. At $p=2$, the scalar equality has exponential positive decay rather than a finite zero; for $p>2$ it has algebraic positive decay. These scalar controls explain the integration threshold without claiming physical trajectories. If the phrase “any $p<2$” is read as including negative exponents, the algebra still gives a conditional horizon, but $\eta\le2$ forces failure of the divergent lower-deficit premise before arbitrarily small separation. The decreasing-deficit interpretation in the note uses $p\ge0$.

## Independent exact controls

The reviewer-authored `.tmp/overnight2-d-review-vanishing-deficit/independent-controls.py` passed under the shared venv before any original target or producer control receipt was inspected; neither was needed. Its SHA-256 is `7a19c8d23cab924ce5e95b7aa1413cfc1823d7034e4c6b85d3937f214e679a32`.

- A constant unit mean source velocity $(7/25,24/25)$ and direction $(1,0)$ give $\eta=18/25$, $r=6R/5$, and equality in the range bound. With $R=1$ and $k=1/10$, the two forms of the coupled single-channel inward contribution both equal $1/2$.
- Writing $\eta=2q^2$ makes $f=q-c/(2q)$. Its difference at rational $q_2>q_1>0$ factors as $(q_2-q_1)(1+c/(2q_1q_2))>0$, independently confirming monotonicity. Conversely the geometric values $R=2,r=1,\eta=1/2,k=1$ have $\eta<kr$: the true upper contribution is one while substituting the range lower bound gives $1/2$. This explicitly demonstrates why the positive-sign gate cannot be dropped.
- Independent critical-exponent constants $\ell=2,k=1/8,a=1/2$ give $\nu=1/2$. The scalar curve $\rho(t)=(1/2-t/8)^2$ satisfies the exact rate and stays below $1/4$ while positive, with horizon four. These differ from the subject's illustrative constants.
- For $p=0,a=1/2,k=\ell=1,\bar\rho=3/8$, the new inward margin is $1/4$ while the old margin is $-1/2$; the new duration is $3/2$. Separate exact controls verify equality of the estimates at $a=2$.
- With $k=0,p=3/2,\sqrt{2a}=\ell=1$, the scalar curve $\rho(t)=(1/2-t/4)^4$ has horizon two and derivative $-\rho^{3/4}$. With positive $k\ell=1$, $p=3/2,a=1/2,\rho=1/16$, the supplied lower deficit is $1/128<k\ell\rho$, exposing the loss of the sufficient sign for $p>1$.

The control script and small receipt are retained under the ignored runtime owner `independent-review-instruments/overnight2-d-review-vanishing-deficit/`. Receipt SHA-256: `c38c7b2dddefcb7bd3b1c0684806894a61b8e532d2d760adfc0bd1d3623cc444`. A known SHA256(abc) check preceded exclusive copying; original and retained control bytes matched. These controls test geometry and scalar implications, not a coupled master-equation release.

## Remaining application obligations and preservation

An actual application still needs admitted original capped entry, both directional bounds over the interval, any external-acceleration premise used to obtain them, both complete source-history deficit lower bounds and the independent ordinary continuation. None is supplied by this review or by floating retained close-pair observations. During this theorem-only stage, no original science output, active partial, active log or producer control receipt was read. The only authored analysis is this new companion; private controls and retained evidence were added without modifying any earlier subject, oracle, review or preparation.

A complete unit-speed source violating $r^2\le2R^2\eta$, a positive-coefficient range substitution reversing the stated order, an admissible pair violating the coupled rate, or a longer positive-separation ordinary continuation with every hypothesis intact would falsify the corresponding result. Failure to verify the sign gate, both complete delay intervals or the strict barrier prevents application. The conditional extension is complete; original entry, actual contact and post-event continuation remain open.

## Separate retained-snapshot screen adjudication

**Measured disposition:** the newly assigned floating screen is accepted as arithmetic on the specified encoded snapshots, with no promotion to a unit-speed geometric or physical certificate. The screen source [overnight2-d-vanishing-deficit-screen.mjs](overnight2-d-vanishing-deficit-screen.mjs) remained at SHA-256 `44023d4852b87bcac25d7f0b163b9a9c4a8b2ba207a9963235113820e2a3c189`; its retained output `vanishing-deficit-screen.json` remained at `635e6bef9b38d53cbc69b31c2d93d0ef2c72c4e46a837d00812be68f2a8ecf0a`. The theorem-only version of this companion was preserved before this append as `independent-review-instruments/overnight2-d-review-vanishing-deficit/theorem-only-review.md`, SHA-256 `8a0df444b33c0034e7fefb8e97a4c7620235e015fbe15da7a1f80d3124b12814`.

The independent `screen-audit.py` uses 90-digit Decimal arithmetic from exact binary64 input encodings, plus exact rational receiver squared norms. Before loading these snapshots, it passed a separate 3–4–5 vector control: row $(-3,-4,0)$, present displacement $(3,4,0)$, range ten and $k=1/20$ give $r=5$, $\eta=1/2$, margin $1/4$ and channel rate $-1/4$. Directed inventory, duplicate/missing rejection, deliberately changed-rate rejection and SHA256(abc) controls also passed. Its reconstruction is independent of the screen's JavaScript norm and dot-product evaluation, but remains high-precision numerical arithmetic, not a directed-rounding interval enclosure.

The six recorded dependencies all matched their bytes. The audit checked the literal balance-0 opposite polarities, each snapshot's binding to that literal input and its matching endpoint metadata, exactly one row for each directed pair, both selected receivers and emitters, positive ranges and source factors, encoded endpoint positions/velocities and capped flags. The original snapshot producer's `row_from_source` was read at SHA-256 `ab9b60d40416883241e0290bb2543baa6daf82889a2f6d6ab9a1a70965b575bb`: it returns the polarity product times $n/(R^2|D_t|)$. With opposite polarities and positive recorded $D_t$, reconstructing $n$ as minus the normalized row has the correct sign. No new root evaluation or complete-history integral was performed.

Independent reconstructed values, rounded here for display, are:

| Preparation and direction | Geometric deficit $n\cdot d/R$ | Margin $\eta-3r$ | Conditional algebraic channel rate |
| --- | ---: | ---: | ---: |
| Balance 0 seed 1, $3\leftarrow4$ | 0.3775897792863772 | 0.3716194112601085 | -0.4276350344647887 |
| Balance 0 seed 1, $4\leftarrow3$ | 0.3905579643629011 | 0.3845875963366325 | -0.4351485355177567 |
| Balance 0 seed 2, $2\leftarrow5$ | 0.3775584122383284 | 0.3715856028183004 | -0.4276138916349788 |
| Balance 0 seed 2, $5\leftarrow2$ | 0.3907446850144813 | 0.3847718755944533 | -0.4352530096387443 |

The pair sums are approximately $-0.8627835699825454$ and $-0.8628669012737231$. Independently reconstructed nominal radial rates are approximately $-0.9764551986385813$ and $-0.9765796644851852$. The largest absolute screen/reconstruction difference over all compared scalar and direction fields, including deficit divided by separation, was $5.525\times10^{-14}$. This agreement validates the encoded arithmetic and row selection; the nominal rates lying below the algebraic values do not validate a physical inequality whose premises are unproved.

All four recorded source speeds exceed one: respectively `1.0000000002159668`, `1.0000000000968934`, `1.0000000001558695`, and `1.0000000000628881`. Exact rational squared-norm checks show that none of the four encoded receiver velocities has norm exactly one: receivers 3 and 2 are slightly above one, receivers 4 and 5 slightly below. Recorded capped flags do not alter those encoded values. A small excess remains a failed exact premise; no speed-feasibility repair, root error or history integral enclosure has been supplied. The geometric deficit numbers therefore cannot be used as certified complete-source lower bounds or extended along a later approach.

The snapshot input identities were `0b16f799eb0ae9e686e8ea3f5507852b0028da52754f6efa472eba14c4adf3b3` and `6fa8e440360f7b97a4e929228db8fc6c3793cbf7508de3c26e2e1f231ba698c5`; corresponding endpoint metadata identities were `bfd4cbde4746bc5fd2830c820036ecf9fe9c513f9e1f5a3ff7ff15f154718ad4` and `4efcfd097ae3c621b5e73ce7613f23b777a89b72f3a9c315b3001af7a4872653`. The literal input identity was `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d`. This is the screen's declared snapshot/metadata provenance; it is not a fresh audit of the earlier trajectory evolution.

The independent audit script and exact captured output are retained beside the theorem controls. Their SHA-256 values are `a4063cdac0f49b0c0bb2872608e65cce3ee0d54cbd1c5a18e3c33e1556633ea0` and `ee72244568b8ebcdfed1beb489bc897cb4adb0d27e6c2392d0cddc169c56ed9b`. The script copy was exclusive and byte-verified; the source screen was inspected but not rerun. No active continuation partial or log was read, and no source, snapshot or target receipt was modified. A changed dependency, wrong directed row or polarity, disagreement in independently reconstructed arithmetic, or use of these observations as complete feasible-history evidence would defeat this limited disposition. No required repair was found for the fixed floating-screen application.
