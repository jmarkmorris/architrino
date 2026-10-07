# Independent review of the thin-height pointwise torque bound

**Computer-assisted derived and independently accepted:** the complete target certifies the subject's pointwise bound for its entire declared class. The separate enclosure is stronger: $11/50<A_t<21/50$ at every reception and every positive scale. The analytical reconstruction, exact retained endpoints, arithmetic dependency and final provenance are given below. No subject function or saved interval was used as the reference.

## Prepared scope and execution record

The [frozen thin-height subject](overnight2-b-thin-height-torque.md) claims pointwise dimensionless tangential acceleration $A_t>3/20$ for unit-radius complete histories with constant $\beta\in[19/100,21/100]$, arbitrary real $C^2$ height satisfying $|z|\le1/50$ and $|z'|\le19/20$ in normalized time, and all $R>0$. No height frequency, periodicity or parity restriction is imposed. The canonical equation remains $K=c_f=1$ with every ordinary positive self and partner root. At preparation, numerical acceptance is pending.

The [separately authored instrument](overnight2-b-independent-thin-height.py) imports no subject or prior instrument. It uses sign-checked bisection of the squared planar chord equation, monotonic comparison-root extrema at rate endpoints, sixteen rate cells, a factored scalar kernel and 70-decimal mpmath intervals. Its lower and upper comparison roots have exact rational brackets of width at most $2^{-70}$. A midpoint with unresolved sign is never assigned to either side; independently checked quarter-point signs retain the root between them.

The declared pilot is the first rate cell $[19/100,153/800]$ with the full target height and axial-speed bounds. The target consists of all sixteen adjacent cells of width $1/800$ covering $[19/100,21/100]$. Each stage is limited to 300 seconds, 512 MiB observed peak resident memory and 8 MiB serialized output, with one numerical thread. A process alarm bounds elapsed runtime; memory/time checks occur after each root isolation and cell. Routine tiny stages may run synchronously, subject to the measured pilot. Longer execution would use the owned supervisor; no other numerical job is authorized concurrently by the parent.

Known controls precede any pilot or target: exact signed serialization, square versus generic interval product, all five static squared chords $1,3,4,3,1$ with zero and nonzero constant axial offsets, static tangential cancellation, a nonstatic exact root at $\beta=\pi/(6\sqrt2)$ in channel two with delay $\sqrt2$, both signs of a directly specified source axial projection and both polarities, and exact global speed/diameter/lower-delay comparisons. Matching source hashes in prior known and pilot receipts gate later stages. Receipts use exclusive creation and retain exact rational interval endpoints. Operational completion is separate from the scientific $3/20$ flag.

The shared-venv built-in `compile` accepted the source before any stage without executing it or writing bytecode. Every frozen subject, previous report, instrument, receipt, parent account and shared owner remains read-only. Only this report, its independent companion and fresh evidence under `.local-data/master-equation-closure/overnight2-b/independent-thin-height/` are assigned to this review. No numerical target has run at this preparation point.

The independent known stage passed every declared control before pilot or target use, with exit zero, 0.111104 internal seconds and 26,984,448 bytes peak resident memory. It ran synchronously under the shared executable venv with all three numerical-thread environment variables set to one. The unchanged instrument SHA-256 is `365a9d363ce32fc08b37b576aaaf51da57ac3913933e7913e0d42d8671def0c0`; known receipt SHA-256 is `4d34ae2b306ef00662f23d0d6cca5353393cebce1a7a07125cb8339976666cce`. This recorded pass licenses the predeclared pilot, not a scientific target conclusion.

The predeclared one-cell pilot completed synchronously with exit zero and a strict lower torque endpoint above $3/20$. It measured 0.066195 internal seconds and 27,131,904 bytes peak resident memory. Its receipt identity is `31cd6f7cacf3b8c39fb7d7bd6f84eb99bc8688f0a96d75e0207590ddd5257425`. A sixteen-cell cost projection is approximately 1.1 seconds, leaving ample room below the 300-second stage limit; this is a planning estimate, not a measured target runtime. The pilot supports a routine synchronous full target with the unchanged known-passed source. Its one rate cell alone does not establish the full parameter claim.

A separate exact-rational readback control passed before inspecting the target for summary comparisons: the shared-venv `Fraction` parser returned $-3/8$ from its rational string and verified $11/50-3/20=7/100$. This is a summary serialization control, not another scientific target or trajectory calculation.

## Independent complete chart and normalization

Use normalized time $s=t/R$ and complete paths
$$
X_j(t)=R\bigl(\cos[\beta s+j\pi/3],\sin[\beta s+j\pi/3],(-1)^jz(s)\bigr),
\qquad j=0,\ldots,5.
$$
Physical velocity is the derivative of the dimensionless path with respect to $s$, and its squared norm is $\beta^2+[z'(s)]^2$. The stated bounds give
$$
|V_j|^2\le\left(\frac{21}{100}\right)^2+\left(\frac{19}{20}\right)^2
=\frac{4733}{5000}<\frac{4802}{5000}=\left(\frac{49}{50}\right)^2.
$$
Thus a common strict speed ceiling is $49/50$. Every partner's simultaneous planar chord is at least one. The source-fixed-reception gap has descending secant magnitudes between $1-49/50$ and $1+49/50$, so it is strictly decreasing even through any zero separation away from a root. Bounded positions have squared norm at most $1+1/2500$. Their diameter squared is $2501/625<441/100=(21/10)^2$. The gap starts positive and is negative beyond this diameter, giving exactly one positive root per partner. Self displacement is strictly less than every positive delay, so no positive self root exists.

Every root is ordinary, its separation is nonzero, and
$$
D_s=1-\widehat Q\cdot V_s>\frac1{50},\qquad
\frac12<\frac{50}{99}<\Delta<\frac{21}{10}.
$$
The lower root bound follows from simultaneous separation at least one and maximal descending gap slope $99/50$. The proof covers the complete past and every reception; no finite history cutoff or sampled root count enters it.

At the fixed receiver time the relative source angle and axial separation are
$$
\alpha_j=\frac{j\pi}{3}-\beta\Delta,
\qquad Q=(1-\cos\alpha_j,-\sin\alpha_j,Q_z),
\qquad Q_z=z(s)-\sigma_jz(s-\Delta),\quad\sigma_j=(-1)^j.
$$
Therefore $|Q|^2=2-2\cos\alpha_j+Q_z^2$, with $|Q_z|\le2h=1/25$ independently of any oscillation frequency. The height derivative bound is in normalized time and equals the physical axial speed bound; it is not a phase-frequency assumption.

## Comparison-root ordering and independent rate extrema

For a constant axial chord $a\in\{0,2h\}$, define
$$
q_a(d)=\sqrt{2-2\cos(j\pi/3-\beta d)+a^2}.
$$
It is the norm of a planar rotating chord with a fixed extra axial component. The planar endpoint speed is $\beta$, so $q_a$ is globally Lipschitz in $d$ with constant at most $\beta\le21/100$. Its gap $q_a(d)-d$ is strictly decreasing, with descending secant magnitudes in $[79/100,121/100]$, and has one positive root $d_a$ in $[1/2,21/10]$.

At the actual root, $q_0(\Delta)\le\Delta\le q_{2h}(\Delta)$. Strict gap decrease consequently implies
$$
\boxed{d_0\le\Delta\le d_{2h}.}
$$
This compares distances at the actual root; it does not replace the actual source height or derivative by a constant profile.

The independent instrument further locates the rate extrema analytically. Across the complete initial delay and rate rectangle,
$$
0<\beta d\le\frac{441}{1000}<\frac\pi3.
$$
Thus $\sin(j\pi/3-\beta d)>0$ for $j=1,2,3$ and is negative for $j=4,5$. Since $q_a>0$ near its root, implicit differentiation of $q_a(d_a,\beta)=d_a$ yields
$$
\frac{\partial d_a}{\partial\beta}
=-\frac{d_a\sin(j\pi/3-\beta d_a)}{q_a+\beta\sin(j\pi/3-\beta d_a)}.
$$
The denominator is $q_a(1-\partial_dq_a)>0$, because $|\partial_dq_a|\le\beta<1$. Hence both comparison roots decrease with rate in channels one through three and increase in channels four and five.

For each exact rate cell $[\beta_-,\beta_+]$, the actual delay is therefore bounded below by the zero-axial comparison root at $\beta_+$ for $j\le3$ or $\beta_-$ for $j\ge4$. Its upper bound is the $2h$-axial comparison root at the opposite rate endpoint. The interval program also checks the angular sine sign over each full rate/delay rectangle before using this ordering.

Each corner root is enclosed by a separately implemented bisection of
$$
F_a(d)=2-2\cos(j\pi/3-\beta d)+a^2-d^2
=[q_a(d)-d][q_a(d)+d].
$$
Because $q_a+d>0$ on the positive bracket, the sign of $F_a$ identifies the side of the unique root. Initial endpoint signs are checked explicitly. Each rational midpoint is evaluated with outward intervals. A proved positive sign moves the lower endpoint; a proved negative sign moves the upper endpoint. If the midpoint interval contains zero, both rational quarter-point signs must be proved before retaining the middle half. No unresolved sign is interpreted as a root exclusion. All final exact rational brackets have width at most $2^{-70}$ and retain independently evaluated endpoint gap signs.

This algorithm differs from the subject's family-wide secant contraction. It neither calls that contraction nor reads its resulting root intervals. The target covers all sixteen adjacent closed rational rate intervals of width $1/800$; there are no gaps at rate-cell boundaries.

## Source projection and factored scalar kernel

In the receiver frame the delayed source velocity is
$$
V_s=(-\beta\sin\alpha_j,\beta\cos\alpha_j,\sigma_jz'(s-\Delta)).
$$
Direct multiplication gives
$$
Q\cdot V_s=(1-\cos\alpha_j)(-\beta\sin\alpha_j)-\beta\sin\alpha_j\cos\alpha_j+Q_z\sigma_jz'(s-\Delta)
=-\beta\sin\alpha_j+P,
$$
where $P=Q_z\sigma_jz'(s-\Delta)$ satisfies $|P|\le2hv_z=19/500$. Therefore
$$
D_s=1+\frac{\beta\sin\alpha_j-P}{\Delta}.
$$
The canonical tangential separation is $Q_t=-\sin\alpha_j$. Factoring the positive source denominator gives the exact scalar contribution used by the independent instrument:
$$
\boxed{A_{t,j}=-\frac{\sigma_j\sin\alpha_j}{\Delta^2[\Delta+\beta\sin\alpha_j-P]}.}
$$
Every source derivative allowed by the full $19/20$ bound is retained in $P$. No current receiver velocity replaces the delayed source velocity, and no receiver factor multiplies the canonical row. The source divisor is positive on the proved chart, so its canonical absolute value equals $D_s$.

For each rate cell the interval calculation uses its full rate range, the rigorous actual-delay enclosure and $P\in[-19/500,19/500]$. It checks a strictly positive lower endpoint for the factored denominator before division, encloses each of the five signed scalar rows, and sums them. Treating correlated quantities as independent intervals can overestimate this range but cannot exclude an allowed value. A hull of the sixteen resulting sum intervals covers every rate. This is a pointwise bound over arbitrary complete height profiles, not a mean, quadrature rule or sample of selected heights.

## Completed independent result and exact evidence

The target completed all sixteen rate cells and eighty partner rows with a strict lower bound above $3/20$. Its global hull is $[L,U]$, where
$$
L=\frac{12260095628737483411512949275020345217408997509574391013893469103110275}
{55213970774324510299478046898216203619608871777363092441300193790394368},
$$
$$
U=\frac{45685276522557426940937257719881844202898931351466244841539035784623635}
{110427941548649020598956093796432407239217743554726184882600387580788736}.
$$
Its display is approximately $[0.2220469829791457,0.4137112028157365]$. The exact lower margin is
$$
L-\frac3{20}=
\frac{19890000062944034332956211201439573372338333714849635738492200172755599}
{276069853871622551497390234491081018098044358886815462206500968951971840}>0.
$$
After its recorded known control, exact rational readback additionally verified $L>11/50$ and $U<21/50$. Thus the independently checked result is
$$
\boxed{\frac{11}{50}<A_t(s)<\frac{21}{50}\quad\text{for every permitted history, every reception and every }R>0.}
$$
This strengthens, and independently accepts, the subject's requested $A_t>3/20$ conclusion. The original narrower numerical enclosure is not required for this independent bound.

The prescribed tangential acceleration is identically zero: differentiating the unit-radius planar path twice in physical time produces only its radial component $-\beta^2/R$, while the arbitrary height acceleration is axial. Canonical physical tangential acceleration is $A_t/R^2>0$. Exact balance is therefore impossible at every positive scale. No periodicity, return condition, average, height-reflection hypothesis or small-speed expansion is used. The result supplies no stability or evolved-fate conclusion.

The target returned exit zero in 0.826371 internal seconds with peak resident memory 27,394,048 bytes. The original receipt is 275,255 bytes by native `wc -c`; target SHA-256 is `19004514d41d4cb5fcae840a38cd8a226b91ccdfd5b3ffa69c4dbeb4cbec9fed`. Known and pilot receipts are 10,405 and 18,430 bytes respectively, so the three retained independent receipts total 304,090 bytes. All three synchronous commands ended with exit zero, well within the declared limits. The numerical slot was released to the parent immediately after target completion; no background reviewer job or lease was created.

## Subject audit and shared arithmetic boundary

The subject's comparison-root ordering, descending-gap secant contraction, signed tangential numerator and delayed-source projection formula are mathematically consistent with the independently derived geometry. Its global amplitude and velocity bounds cover the same complete-history class. Its `passed` field tests positivity only; the stronger claimed $3/20$ margin is a separate exact comparison of the retained endpoint. The independent source instead records an explicit `certifiedGreaterThanThreeTwentieths` flag and exact margin, separate from operational completion. A minor `,qquad` rendering defect in the frozen subject's angle display is not part of its mathematical formula and was preserved.

Both instruments use mpmath 1.3.0 intervals. This is an explicit shared arithmetic dependency, not an independent second rounding implementation. Read-only inspection of the installed `libmp/libmpi.py` confirmed outward floor/ceiling operations for the used arithmetic, positive-denominator division, integer squares, square root and interval pi, together with sine/cosine quadrant extrema and outward finalization. Known controls separately exercise interval square versus generic product, both source-projection signs, exact static and nonstatic roots, and endpoint serialization. These checks support the declared arithmetic use but do not constitute formal verification of every library routine. Scientific signs use exact serialized rational endpoints rather than display floats.

Native source hashing before and after execution confirmed that the independent source was unchanged from the known controls through both subsequent stages. Frozen subject source and receipts were read only for scope, audit and provenance; no subject function, saved root interval or golden output entered the independent computation.

| Item | SHA-256 by native `shasum -a 256` |
| --- | --- |
| Frozen subject Markdown | `9faecc05fcfb5d1bb0734f7b869a98ae02141a7b4e3f6fda23d917a281daa0c4` |
| Frozen subject instrument | `ec4bee456af7b4d96ee623ece692f0b9724e157eb9954ae6cd916b431354d40e` |
| Subject known receipt | `5ac63871d0eb63512b87d4961510565ab76860b8599a40b2b99446f51b69668f` |
| Subject pilot receipt | `ad9ab3e26d858940879a0e11d943f0b76dd6b067f2856216ee7cbfe55bc257c3` |
| Subject target receipt | `d09213aeb11fdae912e7c33906227a91634697638252e3313f18efb7da630618` |
| Independent instrument | `365a9d363ce32fc08b37b576aaaf51da57ac3913933e7913e0d42d8671def0c0` |
| Independent known receipt | `4d34ae2b306ef00662f23d0d6cca5353393cebce1a7a07125cb8339976666cce` |
| Independent pilot receipt | `31cd6f7cacf3b8c39fb7d7bd6f84eb99bc8688f0a96d75e0207590ddd5257425` |
| Independent target receipt | `19004514d41d4cb5fcae840a38cd8a226b91ccdfd5b3ffa69c4dbeb4cbec9fed` |

## Falsifiers, retention and remaining scope

An admitted complete history with $A_t\le3/20$ would directly falsify the subject claim; one outside the independently retained hull would falsify this stronger enclosure. The mathematical falsifiers include a missing ordinary root or positive self root despite the speed ceiling, reversed comparison-root ordering, wrong rate monotonicity, a root outside its sign-certified bisection bracket, an unbounded source projection, or an invalid outward primitive. The rate cells, endpoint signs, exact row intervals and source identities in the target receipt make these obligations inspectable. A high temporal frequency alone does not violate the assumptions; excessive height or axial speed, variable radius or nonconstant planar rate does.

Only this report and its independent companion were authored, with fresh assigned local receipts. No existing receipt was overwritten, and every known, pilot and target record remains retained under the independent evidence owner. The frozen subject, old oracles, parent account and shared owners were not edited. The built-in compile check and final native whitespace checks cover the new source/report only; they are not repository-wide tests. No Git mutation, generator, delegation, orbit evolution or numerical search was used.

The instrument deliberately refuses to overwrite these retained receipt names. Any fresh reproduction requires a separately preserved execution copy or an explicitly assigned fresh evidence owner, followed by its own known-first sequence; this review authorizes neither changing the frozen successful source nor deleting its receipts. No remote-backup, archive-recovery or historical-byte replay claim is made. Parent integration is the remaining disposition step; no mathematical or numerical blocker remains for this bounded class.
