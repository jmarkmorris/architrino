# Braid Histories and Persistent Assemblies

## Speed regimes to explore

Both collinear geometries and braids use exactly three top-level speed regimes. Here $v$ is the speed of an individual architrino and $c_f$ is the field propagation speed.

| Speed regime | Meaning | Field speed ceiling? |
| --- | --- | --- |
| Unrestricted $v$ | No imposed upper speed limit; speed may be below, equal to or above $c_f$. | No |
| $v\le c_f$ | Speed may reach $c_f$ but may not exceed it. | Yes; equality allowed |
| $v<c_f$ | Speed must remain below $c_f$; equality is excluded. | Yes; equality excluded |

These are ideas to explore in each geometry. The two ceiling regimes each require an equation that produces motion consistent with the stated restriction. Different ways of doing that are implementations within the same regime. A fixed lower cap is a particular choice within $v<c_f$, not a fourth top-level regime. Changes to the interaction, treatment of self acceleration or coincidence rules are recorded separately from the speed regime. A result belongs to the particular equation and history examined; the speed restriction alone does not establish it.

## 1. A persistent assembly is a condition on histories

### 1.1. From a moving picture to a dynamical object

A set of circulating points is easy to prescribe. A persistent assembly must do something more demanding: its complete past must generate the acceleration needed to continue that same motion. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the present configuration is therefore only a section through the dynamical state. Two assemblies can have identical positions and velocities now and different accelerations because their earlier paths differ.

The Braid Program studies this distinction for finite collections of polarity-bearing architrinos. A member has a persistent label, a fixed polarity and a path $\mathbf X_i(T)$ in Euclidean space with absolute time $T$. Pair, component and sector labels describe declared relationships among those paths. They do not remove interactions with other members. A relationship graph is consequently useful for organizing geometry, but its edges are not an interaction cutoff.

A braid in this setting need not have every member on one plane or circle. The relevant question is whether a bounded, nondegenerate history can continue under its own delayed acceleration and, where a return is claimed, reproduce the required history under an explicitly stated symmetry. A pair can remain identifiable while its diagnostic role changes from the faster to the slower component. Conversely, a new pairing imposed on unchanged labeled paths changes the description without changing the acceleration. These elementary distinctions prevent a visual resemblance from becoming a dynamical conclusion.

The program contains exact geometric identities, conditional theorems, computer-assisted source results, finite numerical observations and proposed physical interpretations. Their roles are developed separately below. The central open problem is a demonstrated persistent branch with a controlled neighborhood and, for energy claims, a compatible action-derived account. A catalog entry, an attractive drawing or a finite low residual does not by itself supply that object.

### 1.2. Causal roots and acceleration

At a reception event $(\mathbf X_i(T_r),T_r)$, a transmitter path contributes at every admitted earlier time $T_t$ satisfying the causal condition

$$
R_{ij}=\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|=c_f(T_r-T_t).
$$

Here $c_f$ is the wake speed. Numerical instances below use $c_f=1$; symbolic formulas retain it where the dependence matters. Define $\widehat{\mathbf r}_{ij}=(\mathbf X_i-\mathbf X_j)/R_{ij}$ and the transmitter and receiver factors

$$
D_t=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t),\qquad
D_r=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r).
$$

An ordinary root has nonzero distance and a nonzero transmitter factor. The Master Equation gives its acceleration contribution as

$$
\mathbf A_{ij}(T_r,T_t)
=\kappa q_iq_j\frac{\mathbf X_i(T_r)-\mathbf X_j(T_t)}{R_{ij}^{3}}
\frac{c_f}{|D_t|}.
$$

The signed polarity coefficients $q_i$ and coupling $\kappa$ must be those of the same declared record. A coefficient used in one experiment cannot be transferred to another simply because both depict a similar geometry. Member acceleration sums every owned partner root and every admitted nontrivial self root. Trivial zero-delay self coincidence is excluded by the declared endpoint convention; it is not evaluated by substituting zero into the singular expression.

Differentiating the causal equation along a simple root gives $dT_t/dT_r=D_r/D_t$. This is the rate at which reception follows the emitting history. It is not an additional multiplier in the acceleration kernel. The distinction becomes especially important when moving-receiver work is discussed: root playback, acceleration weight and energy-account rate are three different quantities.

Finite speeds at or above $c_f$ are not excluded from the model merely because a strict sub-field instrument cannot certify them. They require a complete multiroot treatment, including transitions and self hits. Likewise, reaching $c_f$ is not alone a fold: the relevant event is the loss of the transmitter-factor margin on a causal root.

### 1.3. What each level of evidence establishes

Geometric specification establishes which paths a record denotes. Geometric admission adds such conditions as separation, coherent history and a valid representation. Causal admission establishes the required root inventory on its stated domain. Ordinary evolution then asks whether the complete delayed acceleration continues the history without imposed future motion. Retention and return require still more: a bounded branch, an explicit return action and the necessary history comparison. These levels are not interchangeable, and a failure can occur at any one without deciding all the others.

A finite reception ladder, for example, can certify every root at its reception times while leaving the intervals between them untreated. A continuous root theorem can cover those intervals while saying nothing about acceleration balance. An EOM solver can produce an accepted short segment while failing before the requested horizon. A scalar section can return while the remaining coordinates, rates and delayed history do not. Each result is useful when its domain remains attached to it.

This hierarchy also explains why unknown, unavailable, failed and not applicable must remain distinct. An unavailable residual is not zero. A field-speed restriction in an instrument is not a physical rejection. A stationary geometric endpoint can be inapplicable to a moving-history test while still failing an exact stationary balance equation. The [candidate adjudication](analysis/braid-candidate-requirement-adjudication.md) and [analytical method](contracts/method.md) retain the detailed interfaces and tests supporting these distinctions.

### 1.4. A common ruler and an exact return

Comparing differently sized histories requires a predeclared ruler. For $m$ members, use their geometric center $\mathbf C=m^{-1}\sum_i\mathbf X_i$ and a fixed reference root-mean-square radius

$$
L_0^2=\frac1m\sum_{i=1}^{m}\|\mathbf X_i(T_0)-\mathbf C(T_0)\|^2,\qquad
\tau_0=\frac{L_0}{c_f}.
$$

The ruler is fixed for the comparison rather than continually adjusted to hide a growing residual. Uniform rescaling gives covariance of reported units; it does not establish that a scaled path solves the same EOM at unchanged coupling.

A return action must specify its spatial transformation, persistent-label permutation and any allowed polarity operation. Matching positions after that action is weaker than matching positions and rates, which is weaker than matching the relevant delayed history and causal-root correspondence. A discrete action also supplies no canonical fractional return coordinate unless an additional continuous lift is defined. An apparently short shape return may require a longer cadence or history return.

Position, rate and history residuals therefore have separate purposes. A history residual should not count the endpoint position and rate twice; it must also preserve causal timing and ownership under a bijection. A small centered shape mismatch cannot conceal the failure of that history correspondence. Neither repeated prescribed cycles nor a numerical return of one unperturbed history establishes stability of nearby histories.

## 2. Geometry, polarity and coordinate families

### 2.1. Neutral binaries and persistent endpoint labels

A useful pair-conjugate chart writes the two endpoints of binary $a$ as

$$
\mathbf X_{a,s}(T)=\mathbf C(T)+b_a\mathbf n_a
+s\left[h_a\mathbf n_a+\rho_a\mathbf u_a(T)\right],\qquad s\in\{-1,+1\},
$$

where $\mathbf u_a(T)$ is a unit vector in the plane perpendicular to the declared axis $\mathbf n_a$. Its phase is measured in that binary's fixed transverse frame. The midpoint is $\mathbf C+b_a\mathbf n_a$, the axial half-displacement is $h_a$, and the transverse radius is $\rho_a$. Opposite endpoint polarities make the pair neutral, but neutrality does not cancel its polarity-weighted displacement or its delayed acceleration.

With three fixed independent orbit axes and coincident midpoints, the three axial scales, three radii and three phases form a nine-coordinate pair-conjugate chart. Setting the axial scales to zero gives a six-coordinate coincident-midpoint submanifold. Its containing tangent remains nine-dimensional: restricting a point to a lower-dimensional set does not remove the directions available to a different experiment. Translation, common phase and persistent-index conventions must be fixed before dimensions or sensitivity ranks are compared.

For a common-axis family, removing the common axial translation leaves two relative midpoint coordinates. Opening them produces a genuine enlargement of the chart. It must first reproduce the original coincident-axis limit, including its symmetry-null directions. A nearby point is not automatically the same admitted source, and changing binary names while retaining the same paths and polarity is an exact semantic null.

The [orbiting-endpoint comparison](analysis/three-binary-orbiting-endpoint-comparison.md) and [coincident-axis analysis](analysis/coincident-axis-and-two-component-circular-analytics.md) give the complete coordinate maps. Their geometric results do not claim that every admissible coordinate point is a solution.

### 2.2. Why six-to-six matching failed, and what the five-coordinate repair does

A seemingly fair comparison between two six-coordinate descriptions can be unfair if their centering constraints remove different directions. Three vectors with zero sum are linearly dependent. Consequently, independently adjustable axial scales on three independent axes cannot also provide the assumed separate-sector centering. The original six-to-six comparison had a structural obstruction before any dynamics was run.

The repaired comparison instead selects two injectively embedded five-coordinate families. After removing the same common translation, both have tangent metric $6I_5$ under the declared member norm. Three coordinates describe a shared locus; the other two have necessarily different parity structure. This gives a controlled initialization comparison without pretending that the two families have identical nonlinear histories or symmetries.

The later bounded EOM comparison evolved four primary cases and two refinements to $T=0.15$ with $c_f=1$, using a fixed retained past and declared sampling/chunk structure. Its observed leakage is evidence on that five-coordinate slice. The record does not isolate pair conjugacy as the cause: the compared paths also differ in the prescribed noncommon coordinates and histories. The refinement rule itself included a specific normal-leakage test, rather than a proof that every diagnostic converged. Local initialization fairness, finite evolution and a causal explanation of the difference remain separate claims.

### 2.3. Circular compositions and geometric negatives

Two six-member components can share a center, occupy separated positions on a common axis, rotate in the same sense or counterrotate. Each choice must preserve its own member order, pair declarations, component membership, phase convention and history. A component called a planar braid does not make the entire two-component assembly planar; affine span belongs to the whole member set.

The coincident-center and coaxially separated source families retain both general circular and planar-boundary variants. Their finite history ranges, interpolation rules and guards define what the renderer and evaluator receive. They do not establish binding. Similarly, a co-spherical relation states equality of envelope radii under the declared geometry, not an impenetrable shell or protection against pair coincidence. The scoped negative control on one co-spherical circular chart cannot be transferred to all co-spherical histories.

A stronger analytical exclusion applies to two parallel circular planes with fixed nonzero separation and polarity segregated by plane. On the complete ordinary root chart, every cross-plane acceleration contribution has the same inward axial sign. The required fixed-height circular motion has no corresponding axial acceleration, so the sum cannot balance. This excludes that geometry at every finite admitted speed; changing the plane separation, mixing polarities or opening additional motions changes the hypotheses. A tuned radial second derivative does not remove the axial discrepancy.

A balanced sum over all members would not repair this failure. Every receiver must satisfy its own vector equation. Action/reaction-style cancellation of an aggregate is not receiver-local balance in delayed dynamics.

### 2.4. Persistent axes, frequencies and finite display histories

The eleven three-axis circular specifications form two groups of five variants—axially separated and coincident-midpoint—together with the phase-compensated symmetric representative. Their endpoint indices remain persistent when frequencies or visual roles change. An endpoint associated with the highest frequency in one row need not have that role in another, and reordering by frequency changes the identity convention.

A rational-frequency prescription has an exact common return only when all phases, circulation signs and rational tokens are included. For the proposed three-frequency slice $f_a=h_a/4$, with positive integer harmonics $h_a$, the least common return is $4/\gcd(h_1,h_2,h_3)$. Repeating two such prescribed cycles tests period and grid aliasing, not dynamical persistence. In the retained search design, geometry admission precedes frequency variation, and a speed-inapplicable row remains in the frozen population rather than being replaced with a slower favorable one.

Other sources prescribe linear centered histories, a phase-varying twelve-member path and an asymmetric counter-breathing eight-member display. A finite displayed future is a chosen path. Interpolation, reconstruction and boundary guards determine which path it is; changing those details changes the subject. An empty neutral-pair list is not evidence that an implementation secretly pairs components, and a list of component memberships is not an equation constraining their subsequent motion. The [configuration chart](configurations/configuration-chart.md) and [display catalog](configurations/configuration-display-catalog.md) preserve these individual declarations.

### 2.5. Exterior improvement and internal consistency

An exterior wake response can improve while the imposed assembly becomes less internally consistent. The historical coincident-axis accessory pilot provides such an example: selected accessory placements improved exterior ratios while worsening all three internal residuals. Its numerical convention used the recorded legacy $c_f=4$, so those values remain protocol-local history and are not combined with current normalized evidence.

A useful search therefore keeps internal axial, radial and tangential residuals, exterior exposure, cancellation, separation, root completeness and cost as distinct objectives. Hard root and separation failures cannot be traded for an attractive exterior score. Co-moving and stationary probes also answer different questions; an apparent benefit that exists only for the stationary probe may be a frame effect.

The sealed nine-configuration sample illustrates the limits of numerical search. Of 576 prescribed cases, 573 were evaluated and three remained unknown. Only 159 had applicable member scores, and all exceeded the frozen handoff ceiling; the other 414 were inapplicable. Zero rows entered the proposed descent. The lowest applicable refined peak was about $59.30$ against a ceiling of $6$, despite a very small primary/refined change. That is a bounded negative for the recorded population, not a global minimum, a closed geometric family or evidence of an attracting basin. A later lower sample cannot alter the factual minimum of the sealed earlier population.

## 3. Circular balance and the structure of causal folds

### 3.1. Chord geometry before balance

Consider members on one circle of radius $R$, with common angular rate $\omega>0$ and fixed phase offsets. Put a receiver at phase zero at reception and let a transmitter's relative phase at that time be $\delta$. For delay $\tau>0$, their chord has length $2R|\sin((\delta-\omega\tau)/2)|$. With $x=\omega\tau/2$ and $\beta=\omega R/c_f$, the causal equation becomes

$$
x=\beta\left|\sin\left(x-\frac\delta2\right)\right|.
$$

This transcendental equation, with its complete positive-root inventory and endpoint conventions, comes before any acceleration sum. Rational frequency does not make causal delay algebraic. Fold boundaries occur when roots merge and the ordinary transmitter-factor condition fails. A numerical scan that samples only the open cells can miss both narrow zeros near their boundaries and exceptional limiting behavior.

For the regular alternating polarity pattern, rotational covariance and the decorated symmetry reduce the receiver equation to common radial and tangential coefficients. Writing $q_i=\sigma_iq_0$ and defining dimensionless coefficients by

$$
\mathbf A_i=\frac{\kappa q_0^2}{R^2}
\left[C_r(\beta)\mathbf e_{r,i}+C_t(\beta)\mathbf e_{\theta,i}\right],
$$

circular consistency requires $C_t=0$ and inward radial acceleration. The compatible radius then satisfies

$$
R=-\frac{\kappa q_0^2 C_r(\beta)}{\beta^2c_f^2},\qquad C_r(\beta)<0.
$$

These are the balance equations on the declared symmetric chart. They do not establish a universal radius or speed for arbitrary phases and polarities. Complete exact vector equality at one phase, together with covariance and the exact ordinary root ledger, does establish the rigid circular solution at every phase. An approximate residual near zero is evidence toward that theorem's premises, not a replacement for them.

### 3.2. Polarity, winding and the regular census

For a regular $2N$-gon with alternating polarity, moving $N$ indices reaches the antipode. When $N$ is odd the antipodal polarity is opposite; when $N$ is even it is the same. This is exact indexing of the ideal polygon. Stored finite decimal phases and vectors carry the intended geometry but are not by themselves exact trigonometric antipodality or cancellation certificates.

A different topological fact concerns winding. On a collision-free common circle, differences between labeled angle lifts cannot cross a multiple of $2\pi$. At a common labeled return, those differences have the same integer winding. Thus labeled members share signed winding at that return, although their instantaneous angular speeds can differ. A return that permutes members is another question and must include that permutation.

The finite polarity census first studied small balanced regular inventories. Its sampled nonalternating negatives were not continuous speed exclusions. Subsequent larger inventories retained the exact polarity-orbit counts, speed samples and fold strata rather than treating a large sample as exhaustive over speed. The root geometry is independent of polarity, which allows reuse of a fixed geometric kernel in $A_i=\sigma_i\sum_s\sigma_{i+s}K_s$; such reuse does not make the resulting implementation an independent reference.

The individually stored alternating-ring specifications likewise preserve their own radii, speeds and operators. Their nonmonotone numerical rows must not be narrated as a continued branch without a continuation argument. The hundred equal-radius six-member records described next belong to a different, explicitly indexed topology ladder; those hundred records are not a census of every possible assembly.

### 3.3. A global result on the regular six-member chart

The strongest circular result concerns six alternating members with equal radius, regular phases and common circulation. The recorded proof establishes one simple tangential-balance zero in every even ordinary topology cell, and none in the initial or odd cells. Radial compatibility selects the associated radius. This is a global theorem on that chart, not a statement about unequal radii, arbitrary phases or stability.

Its support developed in distinct stages. A finite low-speed census was followed by a cover through topology cell T200 and then a separate uniform tail argument. The finite extension added 82 even-cell zeros beyond the earlier 18, yielding the hundred T02–T200 examples. It did not turn the earlier bounded record into an originally global one.

For the tail, the fold coordinate

$$
M(\beta)=\sqrt{\beta^2-1}-\arccos(1/\beta)
$$

organizes the shifted endpoint lattice with spacing $\pi/6$. Subtracting the leading inverse-square term separates an exactly summable alternating background from a controlled shape remainder. The source proof retains the shifted descending branch, including its six-level offset; losing that offset changes the background. Outward-rounded shape inequalities provide a positive old-background margin, control the distant newborn contribution and retain strict derivative dominance. The finite and high-speed domains overlap, completing the ordinary-cell conclusion.

The physical scope remains narrow even though the speed range is global. Exceptional fold roots are not ordinary simple roots. No theorem here proves an attracting neighborhood, a selected formation mechanism or an energy spectrum. The [planar frontier](campaigns/planar-three-binary-work-queue.md) retains the exact completed theorem objects and the separately deferred dynamical questions.

### 3.4. Two asymptotic limits with different answers

Increasing the fold index at fixed six-member inventory is different from increasing the number of members. Confusing these limits loses the leading correction in each.

For the fixed inventory, let $\beta_q$ denote the relevant odd fold and $\beta_n$ the nearby balance speed. The source's uniform growing-lattice argument gives

$$
\beta_n-\beta_q=
\frac{1}{18\beta_q^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}\,\beta_q^{-9/2}
+o(\beta_q^{-9/2}),
$$

where $\eta(1/2)=\sum_{j\ge1}(-1)^{j-1}/\sqrt j$ is the alternating eta value. The fractional correction comes from an old-root background of order $\beta_q^{-3/2}$. It cannot be obtained by copying the odd-fold inverse-fifth coefficient $-83/240$ into the balance expansion. A remainder bound resolving the inverse-fifth order and the complete coefficient at that order remain open. The [fold-boundary correction](evidence/2026-09-02-bp011-fold-boundary-balance-correction.md) supplies the endpoint decomposition and its uniform tail control.

For growing inventory $N$, the first fold itself approaches the speed threshold on an $N^{-2/3}$ scale. The balance lies in a much thinner layer: write $\beta=\beta_{\mathrm{fold},1}+d/N^2$. The limiting normalized tangential kernel is

$$
\frac16-\frac{1}{3\pi\sqrt{2d}},
$$

whose zero is $d=2/\pi^2$. The compatible radius has order $N^{5/3}$. The positive chamber-interior contribution of order $N^2/6$ explains why the selected zero must be sought near the fold rather than in an assumed interior continuum limit. This is an asymptotic existence and location result; it is not finite-$N$ global uniqueness, and it does not supply the first parity correction. The [boundary-layer theorem](evidence/2026-09-02-bp014-boundary-layer-balance-theorem.md) retains the root-family and complement estimates needed for that conclusion.

### 3.5. Local isolation and local history flow

Near the regular T04 solution, separate phase and radius slices each admit a small certified box, but two slice results do not prove a coupled statement. The later five-variable phase/radius/speed certificate treats the coupled $10^{-6}$ box directly, owns 72 roots and uses covariance to discharge the remaining vector equations. It identifies the unique local regular equal-radius zero in that box. A wider $2\times10^{-6}$ attempt failed interval inversion; that failure is neither an asymmetric zero nor proof that none exists outside the smaller box.

A new [Cartesian adjudication](analysis/ring-t04-isolation-independent-adjudication-2026-10-03.md) extends the coupled box to uniform halfwidth $10^{-5}$ in all five phase/radius/speed coordinates. It rebuilds the complete 72-root chart and one global weighted contraction below 0.334213. The accepted exact scalar zero supplies existence and injectivity supplies uniqueness; strict Krawczyk-image containment is not used. The [extension](analysis/ring-t04-isolation-extension-2026-10-03.md) therefore excludes a different rigid antipodal-binary common-rate circular balance in that box, while breathing, ellipses and unequal angular rates remain outside its ansatz. Its failed $10^{-4}$ root-proposal trial establishes no branch verdict.

The numerical reference has speed approximately $2.9743071761$, radius approximately $0.5617317001$ and period approximately $1.1866509259$ under its declared normalization. Its finely segmented cubic history is a controlled representation of the exact circle. Representation accuracy and independent root margins do not establish that an EOM solver has reproduced a full cycle.

A separate local history-flow result works in a nonzero $W^{2,\infty}$ neighborhood of the exact history. Root margins and noncoincidence preserve an ordinary locally Lipschitz law; a first interval $[0,0.05]$ lies below the relevant delay floor. The theorem gives local existence and uniqueness from the supplied past. Its neighborhood radius is existential, not a numerical tolerance, and it supplies neither long-term retention nor a perturbation spectrum.

The [coupled-box certificate](evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md) and supporting local-flow records therefore answer complementary questions. Global unequal-radius or phase uniqueness remains open, as do independently reproduced one-cycle evolution and a controlled nearby-history return map.

### 3.6. Excluded weave and drift directions

The orthogonal weave provides a useful negative because its proof explicitly separates ordinary cells from folds. A finite fixed-phase scan was strengthened by interval exclusions across the stated speed domain, with separate limiting treatment of exceptional folds. Some folds carry persistent factors that vanish together; others produce same-directed divergent newborn contributions. None may be silently counted as an ordinary root. The result excludes that fixed weave on its declared domain, not every orthogonal or phase-shifted assembly.

The new [orthogonal polarity adjudication](analysis/ring-orthogonal-polarity-independent-adjudication-2026-10-03.md) checks all twenty neutral six-member words, or ten global-conjugacy classes, in the explicitly declared perpendicular-plane geometry at the inherited T02 and T04 speed brackets. Every radius has a strictly nonzero transverse acceleration coefficient. This bounded full-residual screen adds nine polarity orders beyond the old weave comparison and finds no balanced three-dimensional structure at those speeds; it is not a whole-speed exclusion for the new orders.

Axial translation of a circle supplies another conditional reduction. With normalized drift $u$ and $\gamma=\sqrt{1-u^2}$, the circular reduction changes the effective speed, distance and planar acceleration, while an additional signed axial sum must vanish. The planar stationary balance does not automatically satisfy that extra equation. The independently accepted common axial coefficients at every recorded T02–T200 stationary reference are negative. The [all-hundred screw adjudication](analysis/ring-screw-all100-independent-adjudication-2026-10-03.md) applies the complete-root scaling bijection to exclude every nonzero subwake translating continuation of those selected planar-balanced branches. Unrecorded effective speeds and higher rungs remain open.

These negatives guide the remaining geometry without replacing it. Opening phases, radii, mixed polarity placement or history degrees of freedom changes the problem. A failed candidate can eliminate an exact stratum while leaving nearby or broader histories unresolved; that is a mathematical boundary, not an invitation to weaken the original test.

### 3.7. Frequency, radius and the angular diagnostic

An exact circle has angular frequency $\Omega=v/R$ and period $P=2\pi/\Omega$. Define $w=K\Omega/c_f^3$, $r=Rc_f^2/K$ and $\beta=v/c_f$. The high-rung radius law $r=3/(2\beta)+3\ln2/(\pi\beta^2)+o(\beta^{-2})$ can be inverted at the allowed discrete frequencies. Independently adjudicated derived consequences are

$$
R=\sqrt{\frac{3K}{2c_f\Omega}}+\frac{c_f\ln2}{\pi\Omega}+o(c_f/\Omega),
\qquad
v=\sqrt{\frac{3K\Omega}{2c_f}}+\frac{c_f\ln2}{\pi}+o(c_f).
$$

These formulas do not fill the gaps between exact rungs. With $K=c_f=1$, the measured hundred-rung projection gives $(R,\Omega,Rv)=(0.9759764318,1.8713883913,1.7825535758)$ on T02 and $(0.0142413034,7426.4428005724,1.5061919357)$ on T200. At T02 the leading square-root estimates of both radius and speed are 8.2673% below the recorded values, while adding the next term puts them 3.81288% above. The [frequency account](analysis/ring-frequency-account-2026-10-03.md) supplies every recorded period and adjacent jump; its [separate adjudication](analysis/ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md) checks the inversion and arithmetic.

The product $Rv$, angular momentum per member without a mass factor, has the derived asymptotic

$$
Rv=\frac K{c_f}\left[\frac32+\frac{3\ln2}{\pi\beta}+o(\beta^{-1})\right].
$$

It falls by 15.5037% from T02 to T200 in the measured table and tends to a constant at high rung. This kinematic diagnostic is not a conservation theorem for the delayed equation. Adjacent speed gaps tend to $\pi c_f/3$, whereas normalized frequency gaps satisfy $\Delta w/\beta\to4\pi/9$: absolute frequency gaps grow without bound and relative gaps tend to zero. A frequency in hertz additionally requires a physical value of $K/c_f^3$, which has not been derived. For one hertz the T02 and T200 conversions would require that ratio to be approximately $0.2978407129$ seconds and $1181.9550813$ seconds respectively; these cannot both be imposed while keeping the same physical constants.

Root inventory supplies a different discrete label. On T$_{2n}$ there are $24(n+1)$ ordered hits, of which $6[1+2\lfloor(2n-1)/6\rfloor]$ are self hits. Thus T02 has 48 total and 6 self hits, while T200 has 2424 total and 402 self hits. The instantaneous quadratic-motion proxy gain remains zero because received acceleration is radial and velocity is tangential; its cycle integral per member is $\pi Rv$. None of these numbers derives an action quantum.

Falsifiers are an inherited balance outside its supplied certificate, an incorrect root ownership or a failure of the stated asymptotic remainders. The decimal projection does not improve the exact-zero uncertainty of its source records.

The independently adjudicated [fixed-inventory extension](analysis/ring-inventory-tail-independent-adjudication-2026-10-03.md) replaces the six-member constants by $a=M^2/24$ and $b=M\ln2/(2\pi)$ at fixed even inventory. Thus $R/R_*=a/\beta+b/\beta^2+o_M(\beta^{-2})$, $Rv\to aK/c_f$, and

$$
R(\Omega)=\sqrt{\frac{M^2K}{24c_f\Omega}}+\frac{6c_f\ln2}{\pi M\Omega}+o_M(c_f/\Omega).
$$

$$
v(\Omega)=\sqrt{\frac{M^2K\Omega}{24c_f}}+\frac{6c_f\ln2}{\pi M}+o_M(c_f).
$$

These are sufficiently high local circular loci, not a proved whole-cell census for every inventory. The [600 finite references](analysis/ring-inventory-ladders-all600-table-2026-10-03.md) have separate [Cartesian balance admission](analysis/ring-inventory-ladder-independent-adjudication-2026-10-03.md). Their dimensionless speed spacing has $\Delta\beta\to2\pi/M$ and normalized frequency gap divided by $\beta$ tends to $96\pi/M^3$. The finite angular diagnostic is not universally decreasing: the 10-, 12- and 24-member displayed tables peak at T08, T12 and T58 respectively.

### 3.8. Exact circles and growing disturbances

Exactness and stability answer different questions. An undisrupted exact ring continues forever. A growing characteristic root describes a disturbance that increases near that ring. A new complete-root calculation, independently checked by Cartesian causal differentiation, certifies two distinct simple positive real common radius-and-phase roots at every recorded even rung T02 through T200. The [family account](analysis/ring-family-symmetric-stability-2026-10-03.md) and [independent adjudication](analysis/ring-symmetric-independent-adjudication-2026-10-03.md) retain each outward-rounded reference and witness. Representative rates in $K=c_f=1$ units are $(0.859629,10.658424)$ on T02, $(1.425455,89.644921)$ on T04 and $(50.554185,175882992.725135)$ on T200. These are local spectral witnesses, not a total growing-root count.

Differential-radius and phase-shear disturbances also grow. The [all-sector planar calculation](analysis/ring-differential-planar-sectors-2026-10-03.md), accepted by its [separate Cartesian adjudication](analysis/ring-planar-sector-independent-adjudication-2026-10-03.md), supplies lower bounds of 23 growing planar characteristic roots at T02 and 25 at T04, counted across independent Fourier blocks. Some are weak oscillatory modes: T02 has a sector-three pair near $0.00182619033\pm3.44838929310i$. Exhausting the sectors does not exhaust their characteristic roots or prove nonlinear fate.

Every T02–T200 reference of the 4-, 8-, 10-, 12- and 24-member alternating circles and the two-member superwake circle has an independently enclosed exact balance and two simple positive real common-sector witnesses. The [600-reference admission](analysis/ring-inventory-ladder-independent-adjudication-2026-10-03.md) precedes the [1200-witness Cartesian adjudication](analysis/ring-inventory-spectrum-independent-adjudication-2026-10-03.md). Together with the six-member references, all 700 tabulated exact circles have growing formal modes. The separately accepted six-member T02 ancient-history result below and [lowest-speed binary N02 application](../binary-research/analysis/authorized-cases-ten-hour-reference-d-neighborhood-adjudication.md) supply local nonlinear history connections in their stated classes. The N02 result includes compatible nonmirror preparations, measures departure in a history norm and retains unevaluated constants. Nonlinear connections at the other references, remaining-sector spectra and later fate stay open. The fixed-inventory tail separately extends fast growth to sufficiently high local loci without an explicit threshold.

The largest positive real common-sector rate has the independently adjudicated derived limit

$$
\lambda_{\max}\sim\sqrt2\,\frac{c_f^3}{K}\beta^4.
$$

The newest opposite-polarity root pair approaches a fold and dominates the current-position derivative. Its normalized receiver tensor tends to twice the radial projector, while all older rows are uniformly smaller and delayed emission terms are exponentially suppressed at this growth scale. The proof supplies no numerical threshold and no claim about the largest complex root. The slow branch is separately controlled below.

The separately constructed [slow-branch adjudication](analysis/ring-slow-planar-limit-independent-adjudication-2026-10-03.md) now proves, at each fixed even inventory $M$ on sufficiently high admitted local balances, a simple positive real common-planar branch with

$$
\lambda_{\rm slow}\sim\frac{c_f^3}{K}\frac{24\tau_*}{M^2}\beta,\qquad \tau_*^2+\tau_*-2\tanh\tau_*=0,\qquad \tau_*=0.71616422657180624\ldots.
$$

For six members the limiting normalized ratio is $0.47744281771453749\ldots$. Uniform complete-old-ledger bounds and the nonzero newborn Schur correction are retained. The theorem provides no finite starting rung, smallest-root ordering, complex-root dominance or nonlinear fate. Its grade is derived, independently checked.

A separate axial first variation is $z_i''=\sum_m w_m[z_i(T)-z_{i+m}(T-\Delta_m)]$, with $w_m=(-1)^mK/(\Delta_m^3|D_m|)$ when $c_f=1$. The [axial account](analysis/ring-axial-sectors-2026-10-03.md) and [independent adjudication](analysis/ring-axial-independent-adjudication-2026-10-03.md) certify growing oscillatory roots in spatial sectors 2 and 3 at T02, T04 and T06. Each reference therefore has at least four real growing axial directions. A fixed tilt is a neutral rotation symmetry; it is not a precessing plane.

For a common axial history, the coefficient of a complete uniform drift is negative, approximately $-6.043945$ on T02 and $-28.660657$ on T04 in normalized units. This is an acceleration coefficient, not a decay exponent. A velocity nudge applied only at the present initially receives zero axial acceleration from its still-flat past. The [complete common-sector contour exclusion](analysis/ring-common-axial-decay-2026-10-03.md), accepted by [independent Cartesian/full-contour adjudication](analysis/ring-common-axial-independent-adjudication-2026-10-03.md), establishes exponential linear braking at T02, T04 and T06: every nonneutral common axial root has real part below $-0.4,-1,-0.5$ respectively in $K=c_f=1$ units. A flat-past common velocity increment $U$ tends to the fixed displacement $U/[-\sum_j w_j\Delta_j]$, with velocity and acceleration decaying. These are damping bounds in one sector; growing planar and differential axial modes still make each whole ring unstable. The [separate hundred-rung full-count adjudication](analysis/ring-higher-common-axial-independent-adjudication-2026-10-03.md) completes the common axial distinction: T02–T08 have zero growing roots, T10–T64 have two, T66–T178 four, and T180–T200 six. T08 has an existential damping gap without a numerical exponent. At each higher recorded reference a nonzero flat-past common velocity preparation has growing linear components because the numerator of $U/H(s)$ cannot cancel a positive-half-plane pole. Selected simple complex witnesses locate these growth/oscillation rates. No finite nonlinear nudge or later geometry is certified.

The inherited T02 ancient-history theorem separately establishes local nonlinear orbital instability in the common planar class. The spectral witnesses establish linear instability at their other references. Apart from the separately accepted binary N02 local history connection above, their nonlinear connections remain open; neither local result determines later fate. A failed complete census, transmitter-factor margin, determinant sign or independently checked contraction bound would overturn the corresponding witness.

### 3.9. Angular input and three-dimensional obstructions

For a common planar displacement $u=(a,b)$, the per-member angular diagnostic has first variation $\delta(Rv)=2\Omega Ra+Rb'$. A common tangential velocity impulse $\delta v$ with the circular past fixed initially gives $a''(0^+)=2\Omega\delta v$ and $b''(0^+)=0$. Its formal linear transfer is $\widehat u=A(z)^{-1}e_2\delta v$. The [source/angular derivation](analysis/ring-source-and-angular-response-2026-10-03.md) is independently [adjudicated](analysis/ring-source-angular-independent-adjudication-2026-10-03.md), and the planar verifier encloses a nonzero adjugate input column at both growing roots on every recorded rung. Thus this specified linear input excites growth rather than giving a pure decaying response. It does not demonstrate a transition to an adjacent rung. For the specified smooth profile $f(T)=(\delta V/L)[1-\cos(2\pi T/L)]$ on $[0,L]$, the [independently adjudicated transform](analysis/ring-slow-drive-independent-adjudication-2026-10-03.md) has no right-half-plane zeros. Every certified nonzero-numerator growing pole is excited at any finite $L$. Its end-of-pulse factor is $(e^{\lambda L}-1)/\{\lambda L[1+(\lambda L/2\pi)^2]\}$, asymptotic to $4\pi^2e^{\lambda L}/(\lambda^3L^3)$ for long pulses. This is an external preparation followed by the baseline law, and a linear infinitesimal-input statement; it supplies no finite nonlinear duration or conserved net angular change.

A [separately adjudicated causal-count theorem](analysis/ring-rung-topology-independent-adjudication-2026-10-03.md) prevents a continuous uniformly bounded noncoincident family with ordinary cross roots from joining distinct six-member rungs. T02 has 42 cross hits and T04 has 66; each adjacent rung adds 12 or 24. For an evolving history this necessary boundary encounter requires a common all-past bound or separately proved complete delay bound, and endpoint comparison over the entire resulting causal window. A short recent cycle cannot rule out older roots. The theorem leaves singular, collisional, unbounded and irregular connections open and does not select their dynamics.

The [all-hundred screw adjudication](analysis/ring-screw-all100-independent-adjudication-2026-10-03.md) excludes every selected T02–T200 rigid screw continuation at $0<|u|<c_f$. The effective stationary rung stays fixed while planar-balanced radius and frequency become $R_0/\gamma$ and $\gamma^2\Omega_0$, where $\gamma=\sqrt{1-u^2/c_f^2}$. Its actual normalized axial acceleration is $-u(1-u^2)G_0(0)$, with every accepted $G_0(0)>0$. This rigid whole-past residual sign supplies no damping verdict for a different preparation. At $|u|=c_f$, phase-alignment roots have persistently zero transmitter factor and the ordinary equation is undefined. Above wake speed, the axial separation alone exceeds the distance a wake can travel at every positive delay, leaving no roots and no centripetal acceleration. This boundary is a root-domain obstruction, not a selected event response.

A rigid alternating-height ring, with each positive member at height $+h$ and each negative member at $-h$, cannot balance at any nonzero $h$ on an ordinary-root chart. Same-height rows have no axial component; every opposite-polarity row accelerates the upper receiver toward the lower plane. Bounded separated circular paths guarantee at least one causal hit in each opposite-polarity channel, so all such axial contributions have the same strict sign. This [independently adjudicated obstruction](analysis/ring-axial-independent-adjudication-2026-10-03.md) covers every even-member two-height alternating ring, but not unequal heights, mixed-polarity coaxial components or general precessing paths. The growing puckering mode supplies a departure direction, not an exact rigid puckered destination.

Fixed translations and fixed tilts are neutral exact symmetries. The [independently checked neutral derivatives](analysis/ring-neutral-mode-independent-adjudication-2026-10-03.md) at T02/T04 make the associated planar and axial roots simple. The first variation of rigid drift or plane-changing precession would require a generalized time companion, contradicted by the nonzero Fredholm projection. This excludes differentiable branches with the stated bounded periodic corrections; it supplies no general finite-rate or deforming three-dimensional exclusion.

The [nonrigid follow-up](analysis/ring-nonrigid-3d-followup-2026-10-03.md), independently [adjudicated](analysis/ring-followup-axis-independent-adjudication-2026-10-03.md), admits a larger complete-history class with periodic radius, phase feedback and alternating height. At exact T02/T04, the alternating-height characteristic function has no imaginary-axis zero, including zero. The original theorem excludes a differentiable periodic branch with nonzero first axial variation and a finite positive limiting deformation period, allowing coupled planar variations. The [nonlinear neighborhood proof](analysis/overnight-b-independent-anisotropic.md) now removes both branch restrictions inside explicit absolute-time neighborhoods, as follows.

Claim grade: computer-assisted derived, independently reconstructed and conditional on the admitted exact flat T02/T04 references. With the unchanged canonical equation, $K=c_f=1$ and every ordinary positive-delay partner and self root, prescribe for all real times

$$
X_j(t)=\big(r(t)\cos[\Omega t+j\pi/3+p(t)],r(t)\sin[\Omega t+j\pi/3+p(t)],(-1)^jz(t)\big),\qquad j=0,\ldots,5.
$$

Here $r,p,z$ are real $C^2$ functions with a common finite period $P>0$, $r>0$, and the polarity of member $j$ is $(-1)^j$. These are relative-periodic histories: their shape repeats in a rotating frame, without requiring the full paths to close in the fixed frame. No binary membership is assigned merely from the count of six members. Let $R_0,\Omega_0$ denote the corresponding exact flat reference. Impose, uniformly in absolute time,

$$
|r-R_0|,\ |r'|,\ |r''|,\ |p'|,\ |p''|,\ |\Omega-\Omega_0|\le2^{-20},
\qquad |z|\le h,\quad |z'|\le4h,\quad |z''|\le16h.
$$

For $h=1/32$ at T02 and $h=1/128$ at T04, every exact history in this domain has $z\equiv0$. There is no bound on accumulated phase $|p|$. Every finite period and every harmonic is covered if the absolute-time bounds hold; height alone is not the criterion. The independent instrument encloses all eight ordinary roots per receiver at T02 and twelve at T04, including one self root in each count. It bounds the inverse of the axial operator continuously over every real frequency, then controls the nonlinear changes in root delays and weights. The resulting norm inequality has contraction upper bounds $0.203077066$ and $0.086153942$, respectively, both below one, and therefore forces the axial waveform to vanish. The [independent reconstruction](analysis/overnight-b-independent-anisotropic.md#inverse-and-nonlinear-exclusion) supplies the full inequality and retained known-first receipts. Higher-order-flat branches and arbitrarily varying finite periods cannot evade this exclusion while they remain inside its bounds.

Two further results constrain finite amplitude. First, on a complete finite periodic ordinary chart with bounded summed axial coefficient, a nonzero exact height must change sign (derived, independently reconstructed in the [sign-definite obstruction](analysis/overnight-b-canonical-spatial-2026-10-06.md#sign-definite-height-obstruction)). At a positive minimum, same-polarity axial contributions are nonpositive and opposite-polarity contributions are strictly negative, contradicting the minimum's nonnegative second derivative. A nonnegative profile touching zero obeys $z''\le Mz$ for a finite $M$; integrating twice from that zero forces it to vanish, and periodicity extends this to the complete history. Reflection treats nonpositive profiles.

Second, the [independent finite-amplitude test](analysis/overnight-b-independent-fold.md) excludes its explicitly listed nine-parameter Fourier box, of halfwidth $2^{-20}$ around the specified centers, from the all-phase ordinary-root domain. For every parameter vector and every positive length scale, source $j=2$ has three positive ordinary roots at deformation phase zero and one at phase $\pi/4$. The complete root counts require an intermediate zero transmitter derivative. This is a geometric domain obstruction, not an acceleration-residual exclusion, a generic-fold classification or an actual evolution into that event.

No exact spatial reference, stability verdict or retained evolution follows from these exclusions. Sign-changing finite-amplitude histories outside the certified neighborhoods and box, as well as nonperiodic histories, remain open. A nonzero exact periodic height satisfying every neighborhood bound, an omitted root, a failed outward estimate or an invalid inherited flat-reference admission would overturn the corresponding result; the linked independent reports state the more detailed falsifiers.

Two declared complete histories with fixed exact planar radius/rate and height $0.001\cos(\nu T)$, $\nu=3$ at T02 or $10$ at T04, retain complete 48/72-hit charts, including six self hits. Independent full vector residuals have nonzero axial components, rejecting both histories as exact balances. This supplies two bounded negatives and no exact three-dimensional structure, spectrum about an imbalanced trial, or nonlinear destination.

### 3.10. The exact ring as a prescribed source

For a fixed probe with positive clearance from a periodic source, complete cycle averaging can be performed in emission time even above wake speed. The arrival map has degree one on the time circle; reversed and multiple branches enter with their absolute transmitter weights. Its pushforward identity gives the static circular source average. An alternating $2N$-member ring therefore has exactly zero cycle mean at every fixed probe. For $2N\ge4$ the field also vanishes pointwise on the ring axis. Its permitted harmonics are odd multiples of $N\Omega$, giving $3\Omega,9\Omega,15\Omega,\ldots$ for six members.

The [source derivation](analysis/ring-source-and-angular-response-2026-10-03.md) and [separate adjudication](analysis/ring-source-angular-independent-adjudication-2026-10-03.md) give a bounded far-distance coefficient expansion. At fixed harmonic its leading amplitude is inverse square in distance and includes the delay phase integral $I_k(b)=(2\pi)^{-1}\int_0^{2\pi}e^{-ik\eta+ikb\cos\eta}\,d\eta$, with $b=\beta\sin\theta$. A static neutral-multipole expansion alone does not replace this time-dependent above-speed coefficient. The limiting caustic boundary lies at $|\sin\theta|=1/\beta$; finite-distance caustics require the exact arrival map. The coefficient estimate is not a uniform pointwise bound at a caustic.

The inherited [common-time moment calculation](../neutrino-research/analysis/alternating-ring-mismatch-moments.md#angular-selection-rule) is derived algebra at self-reviewed grade. For a regular six-member alternating ring, signed position moments through degree two vanish. With first-member polarity $q_0$, first-member angle $\psi=\Omega T+\psi_0$ and in-plane unit direction $\hat n$ of angle $\phi$, its first permitted cubic projection is

$$
\sum_jq_j(\hat n\cdot\mathbf X_j)^3=\frac32q_0R^3\cos[3(\psi-\phi)].
$$

This geometric moment requires no speed restriction. It does not determine the leading delayed exterior acceleration: the accepted source coefficient retains the finite phase $\beta\sin\theta$ even at large receiver distance and can be inverse square. The inherited numerical moment-verification route remains unactivated; its self-reviewed grade is not promoted by this summary.

These are prescribed-source statements. An integrable cycle pushforward at isolated caustics does not supply pointwise EOM continuation through them. A moving probe or another ring changes the receiver trajectory and need not have this zero mean. Dynamic trapping, mutual balance and a retained assembly remain separate questions.

An arbitrary prescribed probe moving along the ring axis retains exact pointwise cancellation for every even inventory of at least four, because source ranges remain equal and transmitter factors remain one. Removing a source changes a fixed-probe mean by $-p q_jK G(x)$, and flipping it doubles that field. The [independent probe/defect adjudication](analysis/ring-probe-defect-independent-adjudication-2026-10-03.md) proves that the circular unit kernel has inward radial mean inside the source circle and outward radial mean outside, with contact excluded. These signs describe the prescribed source, not a retained coupled probe.

The same adjudication verifies full nonzero residuals at all surviving T02/T04 members after removal or polarity reversal. The flipped receiver's self product stays positive, and its residual is $2(A_{jj}-A_j^{\rm path})$. A single small radial displacement also has a nonzero exact-reference first derivative at every member; no finite displacement chart or stability about the defective configuration is asserted.

Two prescribed equal-radius exact rings with aligned polarity labels in coaxial co-rotation have a different mean from a fixed probe. With gap $h=Rd$, phase $\phi$ and fixed $\beta$, the [far mutual calculation](../photon-research/analysis/coaxial-ring-far-mean-2026-10-03.md), accepted by [separate density/Cartesian adjudication](../photon-research/analysis/coaxial-ring-far-mean-independent-adjudication-2026-10-03.md), gives

$$
\overline A_{z,-}=-\frac{27K\beta^3}{4R^2d^5}\sin[3(\phi-\beta d)]+O_\beta\!\left(\frac K{R^2d^6}\right),
$$

$$
\overline A_{z,+}=-\frac{27K\beta^3}{4R^2d^5}\sin[3(\phi+\beta d)]+O_\beta\!\left(\frac K{R^2d^6}\right).
$$

Each axial acceleration is constant in time under this prescription. The complete far cross chart has one ordinary root per source when $d>\beta$. An explicit conservative remainder applies at $d\ge64(1+\beta)$. At zero phase, both gap-acceleration signs occur at arbitrarily large separations, with leading spatial period $2\pi c_f/(3\Omega)$; at $\phi=\pi/6$ the gap acceleration vanishes exactly although the common acceleration need not vanish. Twelve additional full residual checks at $d=300,1000,10000$, T02/T04 and those phases exclude their combined preparations. The theorem is fixed-rung and prescribed; it supplies no released pair balance, binding, stability or trajectory.
### 3.11. A specified nonlinear departure and its current limit

The accepted ancient-history construction now applies to a root in the fast T02 bracket near $10.65842417404937$, without identifying it as the largest root. The [specific-mode account](analysis/ring-unstable-series-evaluation-2026-10-03.md) and [separate adjudication](analysis/ring-unstable-series-independent-adjudication-2026-10-03.md) certify invertibility at harmonics $2\lambda,3\lambda,4\lambda$; higher harmonics exceed the inherited radius-43 confinement. Explicit inverse bounds close that part of the analytic construction. Thus an actual sufficiently small ancient branch has a specified fast tangent.

The [quantitative local domain](analysis/ring-unstable-series-quantitative-domain-2026-10-03.md), accepted by [separate majorant/chart adjudication](analysis/ring-unstable-domain-independent-adjudication-2026-10-03.md), now supplies the conservative domain $|q|\le10^{-13}$ for the specified fast branch. Its complete ancient past retains the eight ordinary hits per receiver inside a $10^{-9}$ position/velocity/acceleration tube. At $|q|\le5\times10^{-14}$ the exact degree-eight Taylor polynomial has physical errors below $6.37\times10^{-17}$ in position, $9.06\times10^{-16}$ in velocity and $8.04\times10^{-14}$ in acceleration. These tail bounds concern the exact coefficient polynomial. The [separate coefficient adjudication](analysis/ring-departure-followup-coefficient-independent-adjudication-2026-10-03.md) now encloses the literal printed-coefficient rounding: coordinate/Euler/Euler-squared errors are each below $2.230\times10^{-34}$ at $|q|\le10^{-13}$. Add those errors to the exact omitted tail; separately rounded kinematic parameters need their own propagation. A [new independently adjudicated analytic continuation](analysis/ring-departure-followup-domain-independent-adjudication-2026-10-03.md), using [separately reconstructed degree-twenty coefficients](analysis/ring-departure-followup-coefficient20-independent-adjudication-2026-10-03.md), extends this same ancient branch to $|q|\le0.001$. Independent conservative exact-polynomial tail caps are $3\times10^{-10}$ in coefficient norm and $1.1\times10^{-7}$ in twice-Euler norm. The complete eight-hit chart persists for the whole past, all members stay above speed 1.80854, and simultaneous separation exceeds 0.97316. No fold, wake-speed crossing or collision occurs there. A [further separately adjudicated polynomial-centered continuation](analysis/ring-departure-followup-centered-independent-adjudication-2026-10-03.md) now reaches $|q|\le0.006$, with conservative tail caps $7\times10^{-7}$, first Euler $0.00025/21$ and second Euler $0.00025$. The complete past still retains 48 ordinary hits including six self hits; speed exceeds 1.69267, separation 0.95717 and transmitter magnitude 0.12425. No fold, wake-speed event or collision occurs in this disk. [Independent kinematics](analysis/ring-departure-followup-observables-independent-adjudication-2026-10-03.md) gives $7.0116<\dot r/q<13.8848$ throughout the real window, so one branch remains inward and the other outward without a radial turn. At the endpoints the radii lie in $[0.9693301,0.9693316]$ and $[0.9813170,0.9813185]$, with speeds $[1.7916944,1.7919619]$ and $[1.8477123,1.8479756]$. Larger sufficient-bound failures do not prove a physical obstruction. Evaluations beyond this accepted domain, including $q=0.01$, remain extrapolations; a truncated delay cannot prove an event. The outgoing branch still has no certified later destination, adjacent-rung transition or dispersal conclusion.

The [coupled Fourier search](analysis/ring-nonrigid-3d-followup-coupled-search-2026-10-03.md) permits radial and phase feedback together with alternating axial harmonics. Six numerical starts at height ratios 0.05, 0.15 and 0.30 yielded no small full-vector residual. The two selected literal complete histories are [independently rejected](analysis/ring-followup-coupled-independent-adjudication-2026-10-03.md): their complete reception-zero past charts each have 48 directed hits and six self hits, and their full Cartesian acceleration residuals exclude zero. This is a negative for those two histories, rather than an exclusion of the Fourier box or arbitrary three-dimensional motion. No stability verdict is assigned to these imbalanced preparations.

### 3.12. Separate logarithmic-response comparison

The authorized inverse-distance response uses a coupling $K_{\log}$ with squared-speed units. It is distinct from the inverse-square baseline coupling $K$. The [Log calculation](analysis/ring-logarithmic-variation-2026-10-03.md), accepted by [independent reconstruction](analysis/ring-logarithmic-independent-adjudication-2026-10-03.md), gives circular conditions $C_t(\beta)=0$ and $\beta^2=-(K_{\log}/c_f^2)C_r(\beta)$: radius cancels. An actual tangential zero with compatible negative radial coefficient would therefore select a coupling and admit a continuous positive-radius family at that coupling. No such exact finite-speed reference has yet been exhibited.

For each fixed finite positive coupling the six-member ordinary circles cannot form an unbounded-speed ladder. Radial matching at high speed would require an odd newborn pair whose tangential coefficient is $-\beta/(K_{\log}/c_f^2)+O(\log\beta)$, incompatible with zero. The separate [first-four-cell adjudication](analysis/ring-logarithmic-census-independent-adjudication-2026-10-03.md) and [rest-to-wake/T05–T20 adjudication](analysis/ring-logarithmic-extended-census-independent-adjudication-2026-10-03.md) now supply complete continuous signs below the twentieth fold, $\beta<12.001084781872981\ldots$, excluding positive-speed singular fold endpoints. No regular six-member Log circle balances there at any positive radius or coupling. The static circle also fails radial balance; exactly at wake speed there are thirty partner hits and no positive-delay self hits. Higher ordinary cells remain unclassified. There is consequently no first exact Log ring on which to base a stability verdict. These comparison results change no baseline equation or selected scenario.

The [unequal-radius investigation](analysis/overnight-c-logarithmic-braids-2026-10-06.md) considers three persistent neutral antipodal pairs with a common center, plane and angular rate. In planar complex coordinates their complete paths and polarities are

$$
X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)},\qquad q_{a,s}=s,\qquad a=1,2,3,\quad s=\pm1.
$$

The scale and orientation gauges are $r_1=1$ and $\phi_1=0$. Pair membership stays fixed; the strictly ordered-radius theorems assume $1<r_2<r_3$. The selected equation has $K_{\log}=c_f=1$, its original transmitter weight and every ordinary positive-delay hit, without a ceiling. In the strictly subfield domain $|\omega|r_3<1$, distance minus delay decreases strictly for each source. It crosses zero once in each partner channel and never at positive delay in a self channel. This proves the complete census of thirty partner hits and no self hits, rather than imposing that census as an exclusion rule.

Claim grade: derived, independently reconstructed. Every exact configuration in this strictly subfield, strictly ordered class must satisfy $r_3/r_1<35$, at all phases. The [outer-radius proof and independent review](analysis/overnight-c-outer-radius-thirty-five-independent-review.md) combine bounds on the four inner members' acceleration equations with a separate argument for nearly coincident inner radii. A sufficiently distant outer pair makes the inner equations demand a close cross-pair separation; at that separation one acceleration contribution exceeds the sum of all the others and the required circular acceleration. Exact rational inequalities close the intervening radius bands. Thirty-five is a sufficient upper bound, not an optimal value or a demonstrated solution below it. The remaining domain is not compact: radius gaps, member separation and the margin below wake speed can approach zero.

Two additional continuous exclusions have separate proof reconstructions:

- For $r_2\in[6/5,7/5]$, $r_3\in[8/5,9/5]$ and $|\omega|\le3/100$, no phases balance. The [curvature-refined argument](analysis/overnight-c-curvature-independent-review.md) bounds the complete delayed correction to an instantaneous comparison and leaves the strict exact margin $4679079917/72711925000$. The comparison is an analytical bound on the selected equation, not a replacement of its source weighting.
- For $r_2\in[26/25,53/50]$, $r_3\in[109/100,111/100]$, $\omega\in[51/50,26/25]$ and $\phi_2,\phi_3\in[-1/1000,1/1000]$, every member is above wake speed. The [aligned-sector proof](analysis/overnight-c-superfield-independent-review.md) establishes thirty partner and six positive-delay self hits, all ordinary, with strictly forward tangential contributions. The zero tangential acceleration required by the circular paths is impossible throughout this box.

The higher-rate interval calculation in the first radius box, with $\omega\in[1/10,1/2]$ and all phases, remains partial. The [independent saved-evidence audit](analysis/overnight-c-cover-independent-review.md#final-disposition-valid-partial-cover) verifies a complete partition with 114,308 excluded leaves and 35,693 unresolved leaves, 150,001 in total. It checks the exact stored residual signs, ancestry, source identities and partition coverage; it does not independently recompute the target residuals or formally verify the arithmetic library. The retained leaf limit was crossed by one because the driver checked it after processing. The explicit result is `complete_exclusion: false`, and the unresolved region cannot be discarded. The finite numerical searches likewise found no accepted candidate but provide no continuous absence proof.

No first exact logarithmic three-binary reference, stability spectrum or retained motion is admitted. The [reproduction record](analysis/overnight-c-reproduction.md) separates frozen analytical subjects, independent reviews, dependent proposal instruments and the partial-cover audit. A missing root, wrong polarity or directed multiplicity, failed comparison inequality, incorrect exact margin or exact solution inside an excluded domain would refute its corresponding theorem. A new solution outside those domains would resolve an open case without contradicting these results.

### 3.13. The low-speed endpoint and its self-root birth

The [arbitrary-inventory analytical proof](analysis/ring-arbitrary-inventory-low-speed-attempt-2026-10-03.md), accepted by [separate adjudication](analysis/ring-arbitrary-inventory-low-speed-independent-adjudication-2026-10-03.md), excludes regular equally spaced alternating circles at every finite even $M\ge2$ throughout $0\le\beta\le1$. Its complete paired tangential kernel decreases strictly to its positive midpoint, giving

$$
C_t(\beta;M)\ge C_t(\beta;2)=\frac{\sin d}{4\cos^2d(1+\beta\sin d)}>0,\qquad d=\beta\cos d,
$$

for $0<\beta\le1$, with strict inventory inequality for $M>2$. At rest $C_r\le-1/4<0$. These exact analytical signs supersede the finite-inventory scope limitation while preserving the [seven-inventory interval certificates](analysis/ring-low-speed-independent-adjudication-2026-10-03.md). They exclude this circular geometry, not general assemblies below wake speed. At fixed even $M$, the near-rest coefficient remains $(M^2+2)\beta/24+O_M(\beta^3)$.

Exactly at $\beta=1$, each receiver has $M-1$ ordinary partner roots and no positive-delay self root. The diagonal zero-delay endpoint is not a retained causal hit. For $\beta=1+\varepsilon$, a recent self root has half-angle $x=\sqrt{6\varepsilon}[1-7\varepsilon/20+O(\varepsilon^2)]$, factor $D=2\varepsilon-3\varepsilon^2/5+O(\varepsilon^3)$ and delay $2R\sqrt{6\varepsilon}[1-27\varepsilon/20+O(\varepsilon^2)]$. Its positive radial and tangential coefficients diverge as $1/(8\sqrt6\,\varepsilon^{3/2})$ and $1/(48\varepsilon^2)$. Before the first positive lattice fold the census becomes $M^2$, including $M$ self hits. These one-sided geometry laws do not prescribe crossing dynamics or an event response.

## 4. Continuous causal-root sheets

### 4.1. What carries a root from one reception to the next

A root at one reception event does not prove a root inventory on an interval. For a continuous family, one needs a common history domain, endpoint signs, a simple-root margin and control of every place a root could enter, leave or merge. On a connected compact parameter domain, a complete anchor inventory together with those conditions can make root count invariant. A sampled root count without the boundary argument cannot.

For normalized sub-field histories, define

$$
g(T_r,t)=\|\mathbf X_i(T_r)-\mathbf X_j(t)\|-(T_r-t).
$$

If the entire transmitting history has speed at most $V_{j,\max}<1$, the triangle inequality gives

$$
g(T_r,t_2)-g(T_r,t_1)\ge(1-V_{j,\max})(t_2-t_1)>0.
$$

This proof avoids differentiating a norm at an off-root coincidence. Strict nonself clearance at reception and a strict negative oldest-history sign then give exactly one nonself root within the retained interval. For a self row, the corresponding speed bound excludes every positive-delay root. The conclusion concerns the admitted finite history and cannot silently become infinite-past completeness.

At ordinary roots, uniform speed bounds additionally give

$$
\frac{1-V_{i,\max}}{1+V_{j,\max}}
\le\frac{dT_t}{dT_r}\le
\frac{1+V_{i,\max}}{1-V_{j,\max}},\qquad
R\ge\frac{\delta_{ij}}{1+V_{j,\max}}>0,
$$

where $\delta_{ij}$ is a same-time clearance lower bound on the relevant domain. These inequalities can propose an emission enclosure. They do not replace the required whole-reception face signs. Nor may a checker impose $R=T_r-T_t$ while proving those signs: that equality is a consequence at the root, not a premise on the entire face.

### 4.2. Circular reduction helps without completing the domain

The common-frequency three-binary study uses a squared-gap equation $G=\|\Delta\mathbf X\|^2-\delta^2$ to exploit circular geometry; here $\delta$ denotes the chart's dimensionless delay and $\Delta\mathbf X$ the corresponding displacement. Its early continuous ratio/phase inventories expose the difference between a useful reduction and a completed proof. The first retained inventory records 480,018 evaluated cells, 114 simple-root cells and 146,224 unresolved cells. The second uses an analytic circular reduction and endpoint symmetry, reducing the evaluated count to 180,210, with 652 simple-root cells and 98,152 unresolved cells. Reused symmetry cells have separate counts and are not additional independent evaluations.

Both records retain only 128 illustrative unresolved sample rows, not every unresolved cell's full ledger. A zero count under a possible-fold label is consequently not a proof that the entire domain is fold-free. Near-zero roots still have a separate certification obligation. The later version improves the representation and resolves selected channels, but it neither grants dynamical acceptance nor changes an unchanged split policy merely by having a newer version number.

These records are valuable negatives about the attempted cover. They show where resource limits, maximum depth and topology uncertainty persist. They also preserve exact analytical identities and control residuals, so a later proof can explain precisely which obligations it discharges rather than treating a new output as an unexplained success.

### 4.3. Emission coordinates and reception projection are separate

A circular root sheet can be simple in an emission-fixed coordinate while its projection onto reception phase still needs proof. With $\theta$ the reception phase, an emission coordinate $\epsilon=\theta-\delta$ is useful for selected receiver/transmitter roles in the bounded common-frequency chart. But counting roots in that chart does not automatically establish a one-to-one reception-time inventory. The derivative of the projection must retain its required sign throughout the domain.

The later source certificates therefore separate three objects: the root-sheet continuation, the opposite coordinate derivative controlling projection, and independently checked anchor residuals. Some channels admit exact analytical bounds; others require outward interval coverage. Symmetry can reconstruct a channel only when the complete identity, history policy and coordinate action are preserved. A finite point-control comparison tests the meaning of that reconstruction, while the continuous theorem supplies the between-point claim.

On the declared bounded radius-ratio chart, the accepted source reports complete representative/reused inter-binary roots together with the sealed same-binary and partner classes. These are continuous prescribed-history root results. They do not evaluate the full acceleration residual, establish a periodic solution or supply an energy. The [common-frequency action and root account](evidence/coincident-midpoint-common-frequency-step-action-ledger.md) preserves the exact chart interfaces and their chronology.

### 4.4. A simple root can leave the retained history

The outer-radius expansion gives a concrete reason to keep history boundaries distinct from folds. Let $\alpha$ be the outer radius divided by the fixed middle radius, and $\chi$ the dimensionless retained-delay cutoff. With the earlier $\chi=9/4$, a boundary is encountered at

$$
\alpha_{\mathrm b}=\frac{9}{8\sin(9/8)}\simeq1.2468584789674295.
$$

The obstruction is a simple root reaching the retained-history edge. It is not a root merger. An attempted extension to outer ratio $1.25$ therefore cannot inherit complete coverage merely because the root remains ordinary.

A later calculation uses the longer cutoff $\chi=145/64$ on a new left-open slice from the old boundary to $1.25$. The smaller attempted extension $289/128$ is insufficient. The new source's next history boundary lies beyond $1.25$, and its independently reviewed root/projection proof covers the new slice. This repairs the specified longer-history problem while preserving the earlier shorter-history negative. Extending a constant or periodic past is a change in the admitted history policy, not a retroactive correction to the old result.

The finite structural ledger provides another boundary: 24 phases on a small radius grid and thousands of accounting rows can reveal chart warnings but cannot certify a continuous domain. Its six emission-chart root-count warnings remain part of the source result. A large ledger and a continuous proof answer different questions.

### 4.5. From root intervals to usable acceleration bounds

Once coverage is established, the Master Equation must be evaluated over the entire accepted root interval and the same family of histories. Distance can then be intersected with causal delay and clearance bounds. An empty intersection indicates inconsistent or unresolved input; it is not a root to discard or a zero contribution.

A narrow root interval alone may still give a wide acceleration interval when its path uncertainty, denominator or correlations dominate. Increasing arithmetic precision cannot recover correlations absent from the history carrier. Conversely, a broad but valid interval may suffice for a sign exclusion without being accurate enough for a small residual metric. Inclusion and useful precision are separate properties.

This distinction governs the continuous eight-member analysis below. It also prevents the ordinary-root methods from becoming a replacement physical law: a soft core, a finite-width transition or a modified acceleration weight would define another model and requires its own authorization and evidence.

## 5. Finite ordinary evolution and its limits

### 5.1. Inward approach and binary return evidence

The stationary collinear release is described in the [collinear research account](../collinear-research/manuscript.md#1-collinear-encounter-comparison). The separate [transverse-moving binary diagnostic](../binary-research/manuscript.md#21-a-transverse-rebound-without-a-completed-return) records one rebound without a completed return. Neither result establishes a braid.

### 5.2. History correlation moves a certification frontier

The [stationary-history diagnosis](../collinear-research/manuscript.md#3-history-uncertainty-in-the-stationary-calculation) distinguishes numerical uncertainty from physical failure. More arithmetic precision alone cannot remove uncertainty in the retained histories; shared EOM solver validation remains with its existing owner.

### 5.3. Binary departures and assembly implications

The [binary account of outward departure and a later inward turn](../binary-research/manuscript.md#22-local-outward-departure-and-a-later-inward-turn) distinguishes a derived local departure from a bounded measured radial turn. Its isolated-pair results do not determine the fate of a coupled assembly.

### 5.4. Phase-varying prescribed admission and failed target-horizon evolution

The selected twelve-member phase-varying history differs from the older common-cadence circular realization that failed its prescribed test. Its individual branches, polarity sectors, orbit frames and history reconstruction are part of its identity. Continuous geometric guards and a finite prescribed-root ladder admit that exact history at their stated scope. Neither the older failure nor the newer admission is a verdict on every related family.

The subsequent experiment evolves the history using the Master Equation and fixes $\kappa=0.002$, polarity magnitude $q_0=1$ and $c_f=1$, with a retained past ending at zero and a requested horizon $T=0.5$. The prescribed future is a comparison target only; it is not fed back as the evolved solution. Three fixed integration rungs reached accepted endpoints

$$
0.017822265625,\qquad 0.00836181640625,\qquad 0.003662109375,
$$

then stopped with root completeness uncertified. The independent first-step comparison passed, but the final snapshot retained 58 certified and 86 uncertified pair rows and refused a partial acceleration comparison. No validated motion was accepted for the requested experiment. Earlier halts under refinement and only two reachable comparison times cannot establish convergence over the requested interval.

The [ordinary-evolution evaluation](evidence/2026-08-27-f5-ordinary-evolution-evaluation.md) supersedes an older planning sentence that the experiment had not yet been declared. It does not supersede the exact source identities or turn the outcome into a physical rejection. Later diagnosis conditionally attributes the obstruction to a width requirement. The stopped successor produced no new complete scientific evaluation, no retained actual failed-trial operands and no accepted uncertainty-floor witness.

It did preserve conditional mathematics: relaxed feasibility differs from a globally smooth witness; strict-slack lifting needs its original-family and join hypotheses; exact decimal arithmetic needs the actual operands; and endpoint agreement does not establish a continuous exact-solution error bound. Failure to bound acceleration uniformly over a broader family of histories under the Master Equation does not establish the same failure within the specified family of cubic histories. These supporting results explain possible limits of an instrument without claiming that the missing concrete trial was reconstructed.

### 5.5. What a completed return experiment still requires

The [binary return requirements](../binary-research/manuscript.md#23-what-a-completed-return-experiment-still-requires) distinguish a compatible circle, local existence, finite events and a completed return. The corresponding assembly experiment must additionally retain every member and every cross-pair interaction throughout its complete relevant history.

The [independently admitted graph-conditioned sharp enclosure](analysis/ring-t04-enclosure-independent-adjudication-2026-10-03.md) bounds the same per-hit kernel on its implicit causal-root graph rather than varying emission independently of the errors which move it. It retains the original error balls, both transmitter signs and every root, and falls back to the old direct enclosure if its additional guards fail. Controlled analytical error ranges and unchanged Decimal-oracle comparisons support implementation admission. The [unchanged-input retry](evidence/ring-t04-enclosure-followup-2026-10-03.md) stopped at its preserved aggregate memory cap before producing a complete response or independent checkpoint. Two reported step times supply no newly accepted prefix; the older retained prefix remains authoritative. This numerical repair supplies no retained motion or stability by itself.

### 5.6. Collinear encounter comparison

The [collinear research manuscript](../collinear-research/manuscript.md#1-collinear-encounter-comparison) owns the comparison, chronological table and numbered notes for encounters along one line. It distinguishes the unchanged Master Equation from each examined alternative and states the remaining problem in each case. These results inform braid research without supplying a retained braid.

## 6. Counter-breathing geometry and continuous residuals

### 6.1. Eight members on a six-coordinate history surface

The asymmetric counter-breathing family uses four tetrahedral axes,

$$
\mathbf n_0=\frac{(1,1,1)}{\sqrt3},\quad
\mathbf n_1=\frac{(1,-1,-1)}{\sqrt3},\quad
\mathbf n_2=\frac{(-1,1,-1)}{\sqrt3},\quad
\mathbf n_3=\frac{(-1,-1,1)}{\sqrt3}.
$$

Their sum is zero and their dyadic sum is $4I/3$. These are exact geometric identities before the circulation decoration is added. Choose transverse frames $\mathbf u_i=(\widehat{\mathbf z}\times\mathbf n_i)/\|\widehat{\mathbf z}\times\mathbf n_i\|$ and $\mathbf v_i=\mathbf n_i\times\mathbf u_i$, and put $\mathbf r_i(\psi)=\mathbf u_i\cos\psi+\mathbf v_i\sin\psi$. With circulation signs $s=(-1,-1,+1,+1)$ and offsets $\phi=(0,\pi,4\pi/3,\pi/3)$, the exact member map is

$$
\mathbf X_{i\sigma}(T)=\sigma h_\sigma(T)\mathbf n_i+
\rho_\sigma(T)\mathbf r_i\bigl(\sigma s_i\theta_\sigma(T)+\phi_i\bigr),
\qquad\sigma\in\{-1,+1\}.
$$

The six instantaneous coordinates are $(h_+,\rho_+,\theta_+,h_-,\rho_-,\theta_-)$. Their rates and the complete causal history are additional state. The regular tetrahedra belong to the track centers $\sigma h_\sigma\mathbf n_i$; the moving members generally do not themselves form regular tetrahedra.

Writing $\mathbf t_i=d\mathbf r_i/d\psi$, differentiation gives

$$
\begin{aligned}
\dot{\mathbf X}_{i\sigma}&=\sigma\dot h_\sigma\mathbf n_i+
\dot\rho_\sigma\mathbf r_i+\rho_\sigma\sigma s_i\dot\theta_\sigma\mathbf t_i,\\
\ddot{\mathbf X}_{i\sigma}&=\sigma\ddot h_\sigma\mathbf n_i+
(\ddot\rho_\sigma-\rho_\sigma\dot\theta_\sigma^2)\mathbf r_i+
\sigma s_i(2\dot\rho_\sigma\dot\theta_\sigma+\rho_\sigma\ddot\theta_\sigma)\mathbf t_i.
\end{aligned}
$$

Thus every member in a sector has squared speed $\dot h_\sigma^2+\dot\rho_\sigma^2+\rho_\sigma^2\dot\theta_\sigma^2$. This is kinematics, not kinetic energy. On a complete ordinary nondegenerate history branch, the declared symmetry makes the law tangent to this history surface. The conditional invariance theorem does not establish stability, periodicity or physical realization, and numerical leakage still tests implementation and history handling.

### 6.2. Spheres, frames and what they do not protect

The track-center radius $|h_\sigma|$ differs from the orbit-envelope radius $\sqrt{h_\sigma^2+\rho_\sigma^2}$. Two nonparallel complete circular tracks determine the common sphere, while four simultaneous points need a noncoplanarity condition to do so. Breathing produces a time-indexed family of envelopes, not a material shell. Equal envelope radii provide no lower bound on every cross-sector clearance.

The sector centroids and polarity dipole vanish by the decorated map, but sizes, pair distances and cadence are not invariants. Generic module partners are not antipodal. Actual counterrotation depends on the instantaneous independent cadence signs, so it can disappear when one cadence reverses. Common translation is an available geometric operation; a translating solution still requires delayed dynamical consistency.

Opposite-edge constructions give useful geometric and velocity-bearing frames. Position-only normals can lose rank; signed velocity-bearing rows can be orthogonal yet become undefined when a row magnitude vanishes. A conditioning ratio alone cannot prevent all rows from tending to zero. The retained examples actually bracket a row-zero crossing, so a globally nondegenerate frame must not be inferred from typical pictures. These rows share members; they are not three disjoint opposite-polarity binaries.

Face-normal closure, orbit-area rates and signed face projections describe the geometry. They do not establish spin, magnetic field, action conservation or the gluing of physical faces. The [full geometry treatment](analysis/f6c-geometry.md) gives these constructions and the exact nondegeneracy hypotheses.

### 6.3. Turns, cadence reversal and incomplete returns

Finite continuations show sector compensation and changes from tangentially dominated motion toward breathing-dominated motion. The direction called a current in these diagnostics is polarity-weighted lever-arm motion, not a primitive electromagnetic current. Oversampling selected regions does not turn the observed census into a population distribution.

A time origin generically selects one scalar turning section, not four simultaneous turns. The refined eight-member trial has distinct radial and cadence turns; its scalar return section still leaves order-one position/rate mismatch. In the retained summary, the refined Stage B trial reaches $T=0.13$, records turns near $0.06789$ and $0.10939$, and has a section near $0.11408$ with RMS mismatch about $1.413$ and maximum about $3.316$. The same trial appears in three summary arrays; those are three presentations of one observation, not three independent trials.

The return action in that record includes the proper half-turn $\operatorname{diag}(-1,-1,1)$ and a member permutation. Its source label “reflected” does not make its determinant negative. Likewise, an action-relative winding-cell label is not a completed physical revolution: the retained real windings are small fractions of a turn. Interpolated turning times are estimates, and a scalar section cannot close all twelve coordinate/rate residuals or the history.

A bounded radial-frequency continuation changed nine ratios while preserving the declared comparison. Its best improvement was below one percent, short of the frozen ten-percent threshold, so no refinement followed. Phase-grid aliasing had also spoiled an earlier apparent improvement. These observations close those tuning attempts at their measured scope. They neither prove that no periodic branch exists nor authorize restarting a closed direction without a new scientific object.

### 6.4. An exact reconstructed future is not a uniquely known past

The residual program selects the refined trial's accepted frame centers. Eight members at 81 saved times define 80 exact rational Hermite intervals. Shared positions and rates make the selected future globally $C^1$, while curvature can jump at original knots. Rounded polynomial coefficients would define another path unless their error were separately enclosed.

The original history family contains paths and their own derivatives satisfying every stored allowance. Both adjacent pieces constrain a shared endpoint; scalar allowances are componentwise rather than Euclidean vector radii. An admissible past must join the exact chosen release position and rate. The reconstruction theorem assumes that such anchored pasts exist and that the fixed future lies within all applicable evolved-piece allowances. It then proves containment in the original family, not equality with the historical trajectory or satisfaction of the EOM.

Bernstein control points provide a useful sufficient containment test. Failure of that construction need not exclude another admissible joining path. By contrast, an exact interior point outside an allowance is a counterexample to containment of the selected path. These distinctions matter because different admissible anchored pasts can produce different delayed acceleration despite sharing the same release jets and fixed future.

### 6.5. A member residual must compare two different sides

The required side is the exact second derivative of the reconstructed member history. The law side is a separately authored delayed-acceleration reference consuming the same history family and complete root cover. The EOM solver's own acceleration is not an independent reference for itself.

For the selected trial, the fixed ruler is

$$
L_0^2=\frac12(h_+^2+\rho_+^2+h_-^2+\rho_-^2),\qquad
L_0\simeq0.5320012303229503.
$$

With $c_f=1$, the normalized member residual is $\mathbf e_i=L_0(\ddot{\mathbf X}_i^{\mathrm{history}}-\mathbf A_i^{\mathrm{ME}})$. The selected coupling is the literal $10.304229970992187$; its later continuous-family interface uses a specified finite decimal polarity magnitude rather than silently substituting exact $1/6$. These source conventions differ from the twelve-member phase-varying experiment.

The full proposed measurements are

$$
R_{\mathrm{RMS}}=
\sqrt{\frac{1}{8T_f}\sum_{i=1}^{8}\int_0^{T_f}\|\mathbf e_i(T)\|^2\,dT},\qquad
R_{\mathrm{peak}}=\sup_{i,T\in[0,T_f]}\|\mathbf e_i(T)\|,
\quad T_f=0.13.
$$

These compare Cartesian member vectors before norms and aggregation. Tangent-only residuals or cancellation between members do not substitute for them. A fixed history must be chosen before its duration-weighted cells and members are summed; only then does the family-wide quantifier apply. The interval endpoints need not be jointly attainable by a single history.

A complete conditional root cover over 160 initial parent cells is an important premise, not a completed residual integral. The source records a local refined mismatch bound below $0.01234$ on $[0,0.001]$ for the declared family. Every component interval still contains zero. That bounds local mismatch without proving equality, imbalance, whole-history RMS or a score increase.

### 6.6. Correlation, quadrature and partial accepted integrals

The first coarse acceleration enclosure was valid but extremely broad. Emission-only refinement narrowed the permitted root domain through strict whole-face signs and then required a complete fresh cover. An exploratory boundary move was not itself proof of a discarded region. Later positive emission endpoints can also be causal when they remain earlier than reception; absolute sign is not the causal test.

Once a leaf has law boxes and exact affine required curvature, retaining their common time variable gives narrower bounds than subtracting unrelated scalar ranges. The exact minimum and maximum of that independent Cartesian-box relaxation can be found across at most nine internal cuts and ten quadratic pieces. Those extrema are not necessarily attainable by the correlated history family. A fixed-time box-width lower bound therefore describes a limitation of the relaxation, not irreducible physical uncertainty.

For any fixed finite polynomial $p$ and quadrature functional $Q$, the safe identity is

$$
\int f-Q[f]=\int p-Q[p]+\int(f-p)-Q[f-p].
$$

The remainder must be enclosed over the whole leaf. Agreement between embedded quadrature rules or two zero node estimates does not supply that enclosure; a nonzero function can vanish at all chosen nodes. Positive weights, exact moments, rounded polynomial coefficients and node neighborhoods each have their own proof obligations. The retained protocol shares one subdivision budget per original frame across members and metrics, including mandatory history cuts.

The measurements expose why better inputs do not always mean a tighter final answer. Narrower node geometry once widened the resulting integral because its new auxiliary polynomial increased the remainder more than it reduced the polynomial term. Bisection improved a local bound. A later request with unrefined emission evidence produced enormous widths, which were uncertainty intervals rather than enormous measured residuals.

The accepted September result covers only original parents 0–2 at the loose setting, through reception time $0.0030000000000000001$. The remaining 157 parents and both finer settings are not completed by that result. All cited integral lower bounds remain zero. Historical source-generation acceptance is preserved, while a replay against changed live source bindings fails admission; that is not a new numerical disproof of the original enclosure. The [continuous enclosure contract](evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md) and [integral/supremum treatment](evidence/2026-08-27-f6c-residual-integral-supremum-enclosure.md) supply the full conditions for extending the calculation.

### 6.7. Physical interpretations remain downstream

The six-coordinate map admits conjugation-adapted even/odd sector variables and an exact scalar-plus-directional decomposition with an inverse. For $z\in\{h,\rho,\theta\}$, put $p_h=p_\theta=-1$ and $p_\rho=1$, so the even and odd coordinates are $(z_++p_z z_-)/2$ and $(z_+-p_z z_-)/2$, respectively. Raw means and differences have that parity only for radius. This split does not establish exactly three dynamical modes: that requires a closed history reconstruction and a return operator. Polar and axial response also require reflection behavior, not rotations alone. A vector reversal under a chart action is not a spinor sign.

A return-count clock, absolute time and synchronized observer time are different constructions. A moving clock must be solved as a moving history; transforming a drawing supplies no dynamical time-dilation result. Likewise, emitted ticks and received ticks require a shared signal account. The candidate's possible clock, particle, neutrino, photon and tensor roles remain recovery targets or explicitly speculative identifications. No stability analysis may begin by linearizing a history that has not been established as a solution.

Literal eight-plus-six capture would require fourteen backreacting members. A weak acceleration on one probe is not collective capture, and six geometric seats do not establish an exclusive survival theorem. Uniform shrinking can reduce all pair distances, so the geometry supplies no singularity barrier. These concrete missing objects are more informative than assigning a physical name to an attractive shape.

## 7. Platonic histories and exact exclusions

### 7.1. A solid, a coloring and a history are different objects

A Platonic vertex set fixes geometry. A polarity word decorates it. A relationship assignment may identify a solid or a comparison structure. A motion rule and a complete history then define a dynamical test. None of these steps is implicit in the preceding one.

The rotating tetrahedron, cube, octahedron, dodecahedron and icosahedron specifications retain every operator and vector as a geometric/display declaration. Their finite decimal carriers are not an unrecorded exact-construction algorithm. The relationship registry's six assigned identities also retain explicit source and qualification limits; an association with a solid does not certify a braid or every unassigned catalog member.

For rigid rotation with axis $\widehat{\mathbf n}$ and rate $\omega$, the required acceleration is

$$
\mathbf A^{\mathrm{req}}=\omega^2\left[\widehat{\mathbf n}(\widehat{\mathbf n}\cdot\mathbf X)-\mathbf X\right].
$$

This is elementary Euclidean kinematics. It supplies a test of the delayed law rather than an imported force law. A complete acceleration component orthogonal to that required direction must vanish. A strict nonzero interval in such a component excludes rigid balance on the tested stratum, irrespective of a positive radius rescaling.

The relevant symmetry is that of the colored history. Under an improper orthogonal map, an angular-velocity axis transforms as an axial vector, including the determinant factor. Global polarity conjugation is a separate operation. Counting a finite collection of stabilizer strata therefore does not count every axis.

### 7.2. Octahedral axes: exact negative strata and open interiors

For the regular octahedron ordered as $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, the retained analysis distinguishes two balanced polarity words. The vertex-axis obstruction follows analytically because selected receiver distances and weights remain constant. Other axis strata require complete delayed sums.

For the word $+++---$ rotating about $(\mathbf e_x-\mathbf e_z)/\sqrt2$, the required acceleration at $+\mathbf e_x$ has no y component, while the certified delayed y component is strictly negative. For the antipodal-alternating word $+-+-+-$, the sum-edge axis $(\mathbf e_x+\mathbf e_z)/\sqrt2$ has a strictly nonzero forbidden x component at the y receiver. Face-diagonal and mixed-face axes have their own strict forbidden projections. These source-certified exclusions retain their scientific domain $0\le\beta<1$ even where the numerical cover used a closed cap at one.

The strict sub-field theorem supplies 30 directed partner roots and no positive-delay self roots for the rigid six-member history. Point comparisons and byte-identical repeats check separate parts of the evidence; neither alone proves continuous coverage. Each exclusion still depends on complete roots, strict factors, outward bounds and the exact required-zero projection.

The generic antipodal-alternating axis quotient is a continuous domain. Its four primitive rays are

$$
(-3,-10,11),\quad(3,-11,10),\quad(1,1,1),\quad(-11,10,3).
$$

Normalized interpolation divides it into two triangular charts. Boundary representatives can duplicate under the colored symmetry and must be joined rather than discarded. A finite scout on edges and triangle samples found no balance, but that alone left between-sample directions unresolved.

The later interval proof closes all five edges, including the shared diagonal, with 9,078 accepted boxes. In each box it fits one common signed rigid scale to representative required directions and shows that at least one of nine residual components excludes zero. Allowing signed scale makes this a necessary-condition screen containing every positive-radius balance; it is not a new physical parameter. Both triangle interiors remain open. Continuity from the excluded edges does not exclude them, and none of these strict-sub-field rigid results addresses arbitrary super-field or non-rigid histories. The [moving-history reduction](analysis/platonic-moving-history-reduction.md) records the separate channel systems and full quotient construction.

### 7.3. The static Stella endpoint is not an equilibrium

The eight Stella members form two interpenetrating tetrahedral sectors. At the stationary release, each receiver has three opposite-polarity partners at distance $1/\sqrt3$, three same-polarity partners at $\sqrt{2/3}$ and one opposite antipode at distance one. Thus there are 56 actual nonself roots. A 64-row ordered-pair account additionally records the eight explicit self exclusions; it does not add eight physical hits.

The independently authored stationary specialization of the same delayed law gives

$$
\mathbf A_i=\frac{\kappa}{R^3}
\left[\frac{3\sqrt6}{8}-\frac{1+3\sqrt3}{4}\right]\mathbf X_i.
$$

At $R=1/2$ and the declared unit normalization, the position coefficient is approximately $-5.04383561706$, giving inward acceleration magnitude approximately $2.52191780853$. The bracket is negative and nonzero. The $R^{-3}$ coefficient multiplies a position of length $R$, so the acceleration magnitude scales as $R^{-2}$; these powers refer to different quantities.

Two exact histories reach the same stationary formula for different reasons. The extended release past is stationary on $[-2,0]$ and is separately checked at depth four. The catalog history is exactly $[0,1]$ at reception one; its eight antipodal roots lie on the retained left boundary zero. Its own endpoint test is needed even though the acceleration agrees with the extended release. The packet's endpoint residual and stored isolating-range representations remain distinguishable evidence fields rather than grounds for silently changing a token.

The catalog prescription requires zero acceleration and fails this complete balance test. This excludes that exact static history. It is not a failed ordinary evolution, an exclusion of all moving Stella histories or a stability result. There is no equilibrium here about which to infer a stability spectrum.

### 7.4. A short release and a geometric packing theorem

The separately released Stella history contracts through $T=0.01$. The fine rung reaches radius $0.49987390781532354$ and radial speed $-0.02521769834861235$, with zero reported center residual and radius spread and only rounding-scale tangential speed. Its 256 complete pair certificates comprise four accepted steps of 64 accounting rows each. The solver refinement comparisons establish a short measured contraction, not independently implemented future evolution, a turn or arrival at the origin.

An initial audit incorrectly interpreted all rows in a step-failure ledger as failed steps. The corrected predeclared interpretation retained the immutable responses and checked accepted status with empty failure codes; no trajectory or threshold changed. That repair belongs to evidence interpretation and must not be described as a physical rescue of the candidate.

Private-cube packing supplies a different exact result. Place cell centers at $2\mathbf k$, $\mathbf k\in\mathbb Z^3$, with vertices $2\mathbf k+s\boldsymbol\epsilon$ for $\boldsymbol\epsilon\in\{-1,+1\}^3$ and $0<s<1$. The minimum solid separation is $2(1-s)$ and the volume fraction is $s^3$. It approaches one as $s\to1^-$ but never attains one with positive separation. At $s=1/2$, separation is one and the volume fraction is $1/8$.

This is a theorem about disjoint geometric solids and privately labeled vertices. It supplies no polarity word, causal history, acceleration balance or cross-cell cancellation. A positive gap is not a dynamical shield. Even a separately qualified isolated component would need every cross-assembly delayed contribution accounted for before an independence or medium claim could follow.

## 8. Wake diagnostics, action and physical interpretation

### 8.1. Exposure, playback and work have different dimensions

A path can produce a measurable exterior wake pattern without carrying a known energy. The delayed root account already distinguishes the signed playback factor $D_r/D_t$ from the dimensionless acceleration weight $c_f/|D_t|$. Neither is automatically an energy-flow coefficient.

A moving receiver permits a conditional work diagnostic once a differentiable kinetic scalar $K(s)$ is declared, where $s=\|\mathbf V\|$. On a chart where $\mu_K(s)=K'(s)/s$ is meaningful,

$$
\frac{dK(s)}{dT}=\mu_K(s)\,\mathbf A\cdot\mathbf V.
$$

At zero speed the declared convention must define the limiting rate. A constant quadratic coefficient can be a bookkeeping proxy; it is not primitive architrino mass. The identity derives from the chosen scalar and the actual receiver's motion, not from an imported mass law. A virtual stationary probe has zero realized work despite a nonzero acceleration response or exposure.

The same-record method accordingly keeps wake exposure, normal transport, squared acceleration exposure, complex spectral coefficients and kinetic-account rates distinct. Signal-processing “power,” meaning a squared coefficient magnitude, is not energy per unit time. A downstream consumer cannot construct an unavailable energy by relabeling a completed diagnostic.

### 8.2. Prescribed drive and a candidate energy balance

For an imposed path, required acceleration is known kinematically. If the interaction and environment inventories are complete, define the acceleration that a prescription would have to supply:

$$
\mathbf A_i^{\mathrm{drive}}=
\mathbf A_i^{\mathrm{req}}-\mathbf A_i^{\mathrm{int}}-\mathbf A_i^{\mathrm{environment}}.
$$

Multiplying the complete same-event terms by $\mu_K(s_i)\mathbf V_i$ gives the derivative of the declared kinetic account. An unexplained residual cannot simply be assigned to the drive when required self, partner or environment contributions are missing. Even a closed driven periodic identity does not establish intrinsic depletion or an unforced realized assembly.

A full energy account requires an accepted delayed action yielding the same acceleration law. The proposed time-cut interaction charge has the structure

$$
E_{\mathrm{wake},\mathfrak B}^{(\eta)}(T)=
\frac12\sum_{i,j}\int_{-\infty}^{T}dT_t\int_T^{\infty}dT_1\,
\partial_{T_1}\mathcal K_{ij,\mathfrak B}^{E,\eta}(T_1,T_t).
$$

The branch $\mathfrak B$, regulator $\eta$, endpoint convention and treatment of nontrivial self hits belong to the definition. The notation $\partial_{T_1}$ must additionally specify whether it differentiates an explicit kernel argument with path data fixed or the kernel composed with the reception history; these generally give different expressions. The accepted action must fix that convention and all boundary terms before this proposed expression defines a conserved charge. In particular, the integral crosses from past transmission to future reception. Present path jets and causal acceleration rows do not automatically determine it.

A time-cut charge is also not yet a spatial density. A control-volume account needs an action-derived allocation inside and outside the spatial region, with complementary terms and no double counting between near interaction and wake storage. Under those additional assumptions one may seek a balance of the form

$$
\frac{dE_{\mathrm{inside}}(R,T)}{dT}+\Phi_E^{\mathrm{net}}(R,T)
=P_{\mathrm{drive}}(T)+P_{\mathrm{environment}}(R,T)+\mathcal R_E(R,T).
$$

All terms must share one branch, action, root/history policy, regulator, kinetic convention, spatial partition and environment account. The residual retains incomplete memory, unresolved roots, endpoint terms, Euler mismatch and numerical error. Choosing a different identity or convention for each term does not close the equation. The [same-record energy methodology](contracts/same-record-energy-ledger-methodology.md) develops these obligations without claiming a completed energy measurement.

### 8.3. A local action identity meets a future-boundary obstruction

The common-frequency program attempted a minimal delayed-action provider before asking for action increments or angular-momentum scaling. Its local tail construction has a characteristic derivative identity that can reproduce the desired scalar acceleration dependence. A centered finite-difference check on one small prescribed circular chart passed its frozen error threshold, while all four noncentral direct-scalar controls retained a nonzero unwanted residual. These are bounded implementation checks on the proposed construction, not a retained solution or a universal action theorem.

The next test asks whether the crossing charge can be updated from data available at the time cut. Two receiver continuations share position, velocity and acceleration at the cut but differ by a later cubic displacement. Their crossing-integrand vectors differ by about $0.0070924$, above the declared $0.001$ witness floor. Neither continuation is claimed to solve the EOM. The witness establishes future dependence of this formula under the stated causal-state definition.

The missing object is a separately derived causal wake-state update that reproduces the same charges from available state. The result blocks that attempted provider and its proposed increment screen. It does not prove that every delayed action is impossible, that every possible state extension fails, or that a conserved energy has been derived. The broader restricted no-go for local scalar counterterms remains attached to its own hypotheses and supporting owner.

### 8.4. Wake transport has a useful conservation identity of its own

Normal wake transport can be derived without first resolving energy. For the source-normalized wake distribution, distributional differentiation yields

$$
\partial_T\mathcal W_j+\nabla\cdot\mathbf J_{\mathcal W,j}
=q_j\delta^{(3)}(\mathbf X-\mathbf X_j(T)).
$$

This is a transport equation for wake measure. Integrating a fixed volume containing the source paths relates its stored wake measure to the normal crossing rate and source injection. For two nested such volumes, the difference between instantaneous fluxes is the negative time derivative of the wake measure in the shell between them. Different simultaneous surface readings sample different emission phases; they do not show an individual wake front slowing down.

Tagged raw transport sums absolute source/root contributions before superposition. Residual transport takes the absolute value only after their signed sum. For a complete return cycle, complete roots and history, a fixed enclosing convex surface and periodic stored wake measure, the source derives

$$
F_{\mathrm{raw}}(S;W)=P_{\mathrm{ret}}\sum_j|q_j|,
\qquad
F_{\mathrm{signed}}(S;W)=P_{\mathrm{ret}}\sum_jq_j.
$$

The signed complete-cycle flux of a neutral assembly therefore vanishes, but this scalar says little about local cancellation. Above a predeclared positive raw denominator floor, the residual/raw ratio lies in $[0,1]$ by the triangle inequality. Its numerator and ratio can depend on radius even though the raw cycle denominator is invariant: differently delayed signed fronts overlap differently on different surfaces.

These statements require their geometric and history conditions. Moving surfaces, source crossings, unresolved folds, incomplete history or nonconvex multiple-crossing ambiguities need a new account. A far-field plateau also needs an actual radius sequence; it is not supplied by the raw invariant alone. The retained diagnostic implementation and independently authored static-source controls support this non-energy measurement, not an action-derived flux.

### 8.5. Phase-preserving spectra and exterior information loss

Frequency-resolved cancellation retains a complex coefficient for each tagged source/root contribution, temporal harmonic and angular mode. Its raw magnitude is the sum of the tagged magnitudes; its net magnitude is the magnitude of their complex sum. The ratio is meaningful only above its declared floor. Phase must survive until after superposition.

Fourier-transforming a rectified residual trace is another operation. The absolute value can create harmonics absent from the original signed trace, so those harmonics cannot be called new source-emission frequencies. The retained reducer therefore distinguishes tagged complex spectra from a spectrum of rectified residuals, and reports band coverage, inverse reconstruction and refinement limits. A separately authored two-source control fixes different cancellation ratios at two harmonics; an untagged record cannot supply that test.

An exterior coefficient map can also have a null space. If $\widetilde f=C\widetilde z$, internally different histories can share the same measured exterior coefficients. An action-derived modal charge would require its own kernel on internal variables, with endpoint, core and environment terms, together with an observability statement about $C$. Parseval norms or an assumed identity kernel do not supply that charge. Exterior-dark channels can matter internally even when the observed spectrum cancels.

### 8.6. Far-field approximation is not exact coefficient recovery

A derived angular approximation provides a useful quantitative example. For prescribed $C^3$ paths within radius $a<R$, with uniform speed $\nu<1$ and bounded acceleration and jerk, contraction estimates bound the difference between the finite-radius delayed pattern and its exact far pattern. A second estimate controls replacing delayed velocities by a common-time expansion. Increasing $R$ reduces the first error; it does not automatically reduce the second.

Under neutrality, the common-time approximation contains a vector $\mathbf U=\sum_s q_s\mathbf v_s$ and a trace-free symmetric tensor $\mathbf S=\operatorname{STF}\sum_s q_s\operatorname{sym}(\mathbf x_s\otimes\mathbf a_s)$. Sphere integration gives the exact powers of that approximation,

$$
P_1=\frac{4\pi}{3}\langle\|\mathbf U\|^2\rangle,\qquad
P_2=\frac{8\pi}{15}\langle\|\mathbf S\|_F^2\rangle.
$$

The resulting coefficient $2/5$ belongs to the approximate pattern, not automatically to the exact delayed finite-radius response. A ratio bound additionally needs its denominator amplitude to exceed the error bound. In the retained active sample the theorem-level error intervals were too large to make those ratio bounds informative, despite a strong measured empirical correlation. That is a measured prescribed-path regularity with a derived explanatory mechanism, not an individually error-certified universal coefficient law.

The [causal angular-bound treatment](evidence/2026-07-24-causal-delay-angular-bound.md) retains both errors, the denominator condition and the independent finite audit. Its historical absence of an eligible evolved cohort is an evidence-generation boundary, not a present blanket claim that no evolved history exists anywhere.

### 8.7. Energy fractions need a meaningful reference

Gross outward crossing, net outward transport, outside storage and work delivered to actual recipients are different quantities. Simultaneous inward and outward sectors can give zero net while both gross rates are nonzero. Repeated crossings can make gross transport larger than an initially available amount. A stationary virtual probe does not measure delivery to a moving external receiver.

An arbitrary ratio $E/(E+\epsilon)$ or a denominator shifted by an unexplained energy zero is not a physical loss fraction. If one branch/action supplies a lower bound $E_{\min,\mathfrak B}$, a proposed available-energy denominator is

$$
E_{\mathrm{avail}}(T_0)=E_{\mathrm{braid}}(T_0)-E_{\min,\mathfrak B}>E_{\mathrm{floor}}>0.
$$

It is invariant under a common additive shift of both energies. The absolute lower-bound value need not itself remain unchanged. A depletion fraction additionally requires an unforced realized branch, controlled environment and return, endpoint storage and a converged residual. A transport-loading ratio or a driven-transfer efficiency answers another question and need not be bounded by one in the same way.

### 8.8. From candidate assemblies to effective physics

Common-frequency levels retain continuous radius ratios unless additional accepted equations select them. A pinned dimensionless speed fixes one normalization, not the remaining ratios or a mechanism of pinning. A discrete label does not mean the members are stationary, nor does it imply a transition between labels. Provisional action-unit conventions and adjacent-label spacing are comparison choices until a branch, action charge and exchange history give them physical content.

A proposed population pressure would require admitted interacting histories, a preparation measure, complete microscopic exchange and a full stress tensor. Its trace, deviatoric part, gradients, orientation and shear cannot be replaced by packing density or isolated-record sums. Similarly, a comparison between driven translation and an environmental gradient needs one shared history, clock/ruler/signal account and explicit tidal residuals. Standard fluid, gravitational, quantum and relativistic laws enter here as recovery targets or comparisons, never as substrate inputs.

The retained mining work follows that discipline. Useful geometric, symmetry, action and numerical ideas remain attached to their sources and proof obligations; deferred and rejected leads retain their reasons. In particular, reversing motion order is not a replacement for global polarity conjugation, and an external shielded-condensate mechanism does not become a new primitive requirement. Spin-foam face matching differs from interpenetrating tracks, and a local combinatorial identity does not solve continuum or regularization problems. None of the unread external literature is treated as independently checked evidence.

The scientific picture is therefore concrete but incomplete. Exact circular solutions and scoped exclusions constrain the search; continuous root methods and finite release measurements make the limits of computation explicit; same-record residual and wake methods prevent geometry from being mistaken for retained dynamics or energy. Persistent branches, their neighborhoods, action-derived exchange and effective physical identifications remain distinct questions, each with a precise mathematical object still to supply.

<a id="5-circular-motion-and-regular-local-evolution"></a>
## 9. Binary constituents and their research owner

The [binary research chapter](../binary-research/manuscript.md#1-circular-motion-and-regular-local-evolution) owns the exact circular-pair census, regular local evolution, planar perturbations, conditional instability, and finite-prefix departure analysis. Those results retain their equation assumptions and claim grades. A multi-binary assembly must satisfy the complete coupled ledger below; isolated-pair compatibility does not establish assembly compatibility.

<a id="6-assembly-compatibility-and-the-missing-accounts"></a>
## 10. Assembly compatibility and the missing accounts

An isolated compatible circle supplies a constituent reference, but coupling several pairs changes every complete ledger. A larger assembly must satisfy its own acceleration equations before its prescribed motion can support claims about assembly transitions or accounts. The prescribed six-path example tests this distinction directly, and the binary cycle diagnostic shows why even a compatible path does not by itself define energy or action.

<a id="61-complete-ledger-closure-for-six-paths"></a>
### 10.1. Complete-ledger closure for six paths

A three-binary construction must use the full six-label ledger. For a prescribed boundary-speed constituent with unit tangent $\mathbf t_i$ and radial direction $\boldsymbol\rho_i$, compatibility requires

$$
g_i=\mathbf t_i\cdot\mathbf A_i^{\mathrm{ord}}\ge0,\qquad
(I-\mathbf t_i\mathbf t_i^{\mathsf T})\mathbf A_i^{\mathrm{ord}}=-\frac{c_f^2}{R_i}\boldsymbol\rho_i
$$

There are six scalar inequalities and twelve perpendicular scalar equalities before reduction. They must hold for the complete period, not only sampled phases. Exact speed constraints $R_i^2\omega_i^2-c_f^2=0$ are separate equalities; active inequalities have different one-sided and two-sided tangent conditions. The [independent review of the assembly program](evidence/sections-12-14-independent-review-2026-09-02.md) requires this separation explicitly.

A common period requires integer windings $\omega_iP=2\pi k_i$ and corresponding inverse-winding radius ratios at fixed speed. Relative phases must be taken through the correct integer-lattice quotient; a convenient pair of phase combinations need not distinguish every orbit when winding integers exceed one. Rotating a circle's frame while shifting its phase is a representation redundancy. Incommensurate windings give a torus trajectory rather than a finite-period cycle. Homothetic scaling balances a raw $L^{-2}$ ledger against required $L^{-1}$ curvature and gives at most one positive scale for a fixed curved shape and coupling. It is not an existence theorem. Likewise, a small-radius obstruction assumes bounded external contributions; simultaneous singular cross rows or leading cancellations leave that hypothesis class.

<a id="62-a-complete-census-with-failed-acceleration-closure"></a>
### 10.2. A complete census with failed acceleration closure

The [quarantined reference calculation](../equation-variants/field-speed-ceiling/history/analysis/quarantined-hypotheses-and-prescribed-reference-cases.md) fixes three equal-radius antipodal pairs in orthogonal planes with phases $0,2\pi/3,4\pi/3$ and normalized $c_f=R=\omega=1$. Its geometry theorem gives thirty ordinary distinct-label roots at every reception time and no self root. That complete census does not make it a solution. Write $\lambda=\kappa q_0^2>0$ for the common coupling, so the unit-coupling total $\mathbf A^{(0)}$ satisfies $\mathbf A^{\mathrm{ord}}=\lambda\mathbf A^{(0)}$. The retained [time-zero coordinate receipt](evidence/fsc-004-t0-six-path-mpmath-receipt.v1.json), produced at 100-digit precision, records these unit-coupling necessary-condition failures:

| Relative polarity orientation | Receiver and failed quantity | Recorded value, rounded |
| --- | --- | --- |
| $(1,1,1)$ | $1+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3655392199$ |
| $(1,1,-1)$ | $1+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3655392199$ |
| $(1,-1,1)$ | $1+$, binormal component of the response to $\mathbf A^{(0)}$ | $+0.8925757279$ |
| $(1,-1,-1)$ | $2+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3301014266$ |

Positive common coupling scales both the ordinary total and its minimal projected response by $\lambda$; it changes these magnitudes while preserving the negative forward signs and nonzero binormal component. All four orientations therefore fail under the minimal response for every $\lambda>0$. This is a measured negative for the prescribed geometry, supported by a time-zero arithmetic instrument together with the response's positive homogeneity; it is not an interval theorem about all other geometries or a test of an unselected redirection law. The separate 2,881-time sample scan is diagnostic, not a certified all-time floor. The antipodal labels share spatial carrier circles and the orthogonal circles intersect, so this object is a loop in labeled configuration space, not a six-component spatial link.

## 11. Four-member alternating circles under the Maxwell-shaped comparisons

### 11.1. Complete balance under two separate laws

The bounded secondary comparison selects only the four-member alternating-ring candidate under [E and E+M](../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), with $K=c_f=1$. Four labels have polarities $+,-,+,-$ and complete circular histories $\mathbf X_j(T)=r(\cos(\beta T/r+j\pi/2),\sin(\beta T/r+j\pi/2),0)$ for all time. The [independent balance certificate](analysis/maxwell-shaped-overnight-independent-ring.md#certified-complete-circular-solutions) and [separate equation assessment](analysis/maxwell-shaped-overnight-ring-equation-domain.md) establish actual solutions, rather than assigning stability to a prescribed circle. The 24-member candidate remains deferred.

At receiver zero the source half-angles satisfy $a_j+\beta\sin a_j=j\pi/4$, $j=1,2,3$, with $R_j/r=2\sin a_j$ and $D_j=1+\beta\cos a_j$. Strict subfield speed makes each root unique and excludes positive-delay self roots: twelve directed partner hits are the complete census. The common tangential coefficient has one zero in the certified bracket $0.42911716183<\beta_*<0.42911716184$, with strictly negative derivative throughout that bracket. The E and E+M signed radial coefficients are separately inward there. Define each exact radius by $r=-C_r(\beta_*)/\beta_*^2$, giving widened intervals $(2.06783883306,2.06783883308)$ and $(2.55921061613,2.55921061616)$. **Computer-assisted derived complete balance:** the tangential, radial and normal acceleration equations hold for every label by the certified zero, radial relation and rotation/polarity symmetry. The delayed source acceleration is the same circle's second derivative. Rounded beta and radius tokens are approximations to these exact references.

### 11.2. Growing perturbations outside the imposed ring symmetry

The full Cartesian variation allows twelve independent displacement components. It retains implicit emission shifts, source jerk times that shift, delayed velocity and acceleration, the receiver term and rotating-frame generators. The four cyclic sectors span this complete perturbation space; they do not constrain a disturbed assembly to remain a common-radius ring. The [independently constructed potential-derivative characteristic](analysis/maxwell-shaped-overnight-independent-ring.md#certified-growing-cartesian-modes) certifies a positive real planar shape root in $(0.3138916,0.3138919)$ for E and $(0.2110793,0.2110796)$ for E+M. A directed complex-disk proof additionally encloses one normal root in each radius-$10^{-7}$ disk centered at $0.02135268760361724+0.21506761942675150i$ and $0.00785868192262262+0.13324775149510120i$, respectively.

**Derived Cartesian linear instability:** each exact solution has growing shape and out-of-plane perturbations, with delayed source-acceleration terms retained. This is an existence certificate for unstable directions, not a complete spectrum or a nonlinear fate theorem. The [highest delayed-derivative bound](analysis/maxwell-shaped-overnight-neutral-gain-review.md) is below $0.87$ for E and $0.80$ for E+M on the exact base boxes; that bounded acceleration-memory gain does not suppress the growing lower-order modes.

### 11.3. Compatible disturbed histories and measured evolution

For an exact growing mode, a complete ancient perturbation proportional to $\epsilon e^{\lambda T}$ with a compact $O(\epsilon^2)$ compatibility correction gives a derived $O_L(\epsilon^2)$ comparison to the linear mode on each fixed finite horizon. The admitted amplitude and comparison constant depend on that horizon. This result does not control a logarithmically increasing horizon or prove finite-amplitude nonlinear instability.

The independently authored Cartesian history method and the subject RK4/quintic method separately evolve one declared rounded near-circle preparation: member zero has the constant old offset $10^{-4}r(1,0.7,1.3)$, all members retain complete shifted-circle histories, and a common-definition terminal patch makes the release compatible. Their refined histories agree on the retained interval through $10r$, with all paths, root census, source acceleration and transmitter margins recorded in the [short comparison](analysis/maxwell-shaped-overnight-independent-ring.md#short-cartesian-method-comparison). **Measured finite coupled response:** no symmetry is imposed on those futures; agreement alone supplies no actual trajectory tube or nonlinear fate. The [literal growing-mode-shaped measurements](analysis/maxwell-shaped-overnight-eigen-history-preparation.md) are different complete cases and have subject timestep refinement only; they do not inherit this independent coupled comparison.

Run to the end of their windows, the constant-offset cases all leave the monitored subfield domain (measured; subject RK4 with retained quintic history at two steps, no independent event enclosure). The [coupled-perturbation record](analysis/maxwell-shaped-overnight-coupled-perturbations.md#measured-bounded-departures-and-independent-comparison) lists, for offsets $\pm10^{-4}$ and $\pm10^{-5}$ under each law, the first observed integration knot at which a member's speed is at least $0.999$: between $T=35.53$ and $43.06$ for E and between $T=50.98$ and $62.78$ for E+M, with the smallest pair separation there between $0.69$ and $1.08$. The zero-offset approximate controls also depart, reaching the same margin at $T=108.93$ for E and $171.50$ for E+M, so a late departure cannot be attributed to the supplied offset alone. These are stopping records at a selected margin. They are not certified first crossings, arrivals at the wake speed, or a nonlinear instability theorem.

The [independently certified finite continuation](analysis/authorized-cases-ten-hour-reference-e-time10-acceptance.md) now establishes actual nonlinear spatial departure for the same literal E+M positive-offset preparation, with its complete old past and original compatible patch unchanged. Separately authored whole-cell residual and actual-error instruments cover every receiving cell, all twelve partner contributions, generated source acceleration and source seams through exact time $T=10$. Complete speed remains below $0.6$, so the domain stays strictly subfield. Let $d(X)$ denote the least maximum member-position discrepancy from a translated and properly rotated labeled square of the exact enclosed reference radius. The initial bound is $d(X(0))<0.000176966092$. At exact ten, an independent RMS lower bound and a uniform actual position error below $9\times10^{-6}$ give $d(X(10))>0.0003601085315>2d(X(0))$. The strict excess over twice the initial upper bound is greater than $0.0000061763475$. This is a finite actual-history geometric departure, including the normal and symmetry-breaking components. It does not establish permanence of departure, a history-norm instability theorem, later fate, wake-speed arrival or binding. E-only and the distinct eigen-shaped preparations retain their earlier grades.

A missing ordinary root, nonpositive radius or failed acceleration identity falsifies balance. A missing delayed-acceleration/root-shift term or a failed determinant/disk inequality falsifies the respective growing-mode certificate. A changed complete preparation or excessive cross-method discrepancy defeats the measured trajectory comparison. None of these results changes the baseline equation, BP-001 disposition, deferred return tasks or an assembly qualification rule.

## 12. Instantaneous Weber-inspired alternating square

Derived and independently confirmed by the [ring analysis](analysis/weber-overnight-ring.md) and [blind ring adjudication](analysis/weber-overnight-ring-independent-adjudication.md): the alternating square has exact balance $\Omega^2=(2\sqrt2-1)K/(4\rho^3)$, unchanged from its instantaneous inverse-square control. Its acceleration determinant is $(1+(\sqrt2-1)/x)(1-1/x)(1+\sqrt2/x)^3$, where here $x=\rho c_f^2/K$; it is singular at $x=1$ and linearly unstable at every regular radius. Measured same-lane departures and pairing do not determine all later nonlinear fates; five capped runs remain open. The ring NO GO concerns this instantaneous ring, with no implication for a delayed law or another population. Falsifiers are a bound-class history reaching contact or escape, or an independent linearization with no positive real part at a regular balanced radius.

### 12.1 Six-member hexagon and the binding-sphere search

The [six-member investigation](analysis/weber-binding-sphere-investigation.md#frozen-checkpoint-synthesis-pi-2026-10-06t035702z), with its [blind reference and adjudication ledger](analysis/weber-binding-sphere-independent-reference.md), asked whether the same instantaneous law admits a self-bound sphere of three members of each polarity moving at one common constant speed. It found none.

**Rigid reduction (derived, both lanes).** On any rigid rotation every pair separation is constant, so the law's velocity terms cancel exactly and the balance is that of the instantaneous inverse-square comparison. Equal speed on a rigid rotation forces every member onto one circle or onto two circles of equal radius.

**Alternating hexagon (derived).** The planar alternating hexagon balances at every radius with $\Omega^2=(5/4-1/\sqrt3)K/\rho^3$. Its acceleration determinant is singular only at $x=\sqrt3$, where the kernel is the polarity-breathing mode. It is linearly unstable at every regular radius through its $k=3$ polarity-breaking sector, proved blind on two routes. Its measured fate is pairing into binaries and escape, or the solve obstruction inside $\sqrt3$. No out-of-plane mode is commensurate with $\Omega$, so no non-planar periodic branch leaves the family.

**Necessary conditions (derived).** With $G=\tfrac12\sum_i\|\mathbf X_i\|^2-\sum_{i<j}\sigma_{ij}d_{ij}$ the law satisfies $\ddot G=T_{\mathrm{kin}}+H$, so a bounded equal-speed sphere has $H=-3v^2$ and constant $\sum_{i<j}\sigma_{ij}d_{ij}$. These and their per-member forms screen candidates; none is an obstruction.

**Families searched (measured, bounded negatives; adjudicated unless noted).**

| Family | Result on its stated box |
| --- | --- |
| Rigid two-circle arrangements | Segregated polarity class excluded for every height by a one-signed axial sum (derived); mixed class has no relative equilibrium for $z_0/a\in[0.01,10]$ |
| Named solids | Octahedron, prisms and antiprisms excluded at $R\in\{0.5,1,2\}$ |
| Three antipodal pairs on great circles | Residual floor $2.0$ on the grid and $0.68$ with free normals, in units of $\Omega^2R$; phase structure at residual of order one is not phase locking |
| Stacked latitude circles with integer rate ratios | Floors from $2.5$ to $3.9$; continuous ratio scans have minima only at irrational ratios, so nothing selects integer ratios |
| Six independent great circles | From random starts the only basin is the hexagon family; best other residuals $0.55$ to $1.05$ (measured same-lane, with reach established) |
| Single-curve choreographies | No non-planar branch from the hexagon and none from random seeds |
| Shooting and periodic-orbit Newton | Symmetric strata find only hexagons; the unconstrained stratum is collision-dominated at $R=1$ and covered at $R=2,3$ to twelve prefiltered starts, with the hexagon family the only basin |

The statement that the planar alternating hexagon is the only six-member equal-speed spherical history under this law is inferred from the union of these bounded negatives. It is not a theorem about every spherical history, and a class-level obstruction for non-rigid histories is open. The reference lane's ledger compares 73 quantities: 44 independently confirmed, 16 measured same-lane, 7 not comparable and 6 disagreements, each resolved without changing a number or a verdict.

At the operator's direction on 2026-10-06 the six-member search under this instantaneous law stops here. The investigation's proposed periodic-orbit continuation and the four companion tasks are not selected. The results concern this instantaneous law and this population only.

### 12.2 Great-circle and uniform-circle closure

A later operator selection on 2026-10-06 reopened two bounded items of the six-member question under the same instantaneous law: an analytical closure of the great-circle class and a collocation search at $R=1$. The [continuation synthesis](analysis/weber-binding-sphere-continuation-2026-10-06.md) owns the account; the [closure document](analysis/weber-binding-sphere-great-circle-closure.md) owns the proofs and the [independent review](analysis/weber-binding-sphere-great-circle-closure-review.md) their refereeing.

**Great circles (derived and independently confirmed).** Let six members move on great circles of one sphere at one common rate without collision. Their accelerations are then centripetal, the implicit solve disappears, and each member's equation is an identity between analytic functions of time. Every pair on different oriented circles has complex collision times at which its weight has a square-root branch point; carrying the identity once around such a time changes the sign of exactly the pairs that vanish there. So for each member the partners sharing its complex collision times sum to zero by themselves, and the partners on its own circle balance its centripetal term as an inverse-square ring. A class that sums to zero needs at least four partners on four different oriented circles, and no member can sit alone on its circle, so a solution that is not planar needs at least ten members. With at most nine members, in particular six, every great-circle solution is one planar ring in inverse-square balance. This turns the measured negatives of Section 12.1 for three antipodal great-circle pairs and for six independent great circles into a derived exclusion at every radius and rate. A separate reviewer re-derived every lemma, found no gap, and confirmed the mechanism with its own code; its falsifier search of 700 starts found planar hexagons and nothing else below residual $1.0$.

**Rings on one circle (measured).** The planar question that remains was checked from 4000 random arrangements of three positive and three negative members on one circle with free angles and rate: every converged case is the alternating regular hexagon, and no other balanced ring appeared. This is one instrument's bounded result; a proof is open.

**Uniform circular motions (derived; partly independently confirmed).** The same method covers every history in which each member moves uniformly on some circle of the sphere, about its own axis, at one common speed. Such a history that satisfies the law is a rigid rotation. The statement is derived and independently confirmed when all circles have equal radius about any axes and when all axes are parallel with any radii and rates; the second case is the stacked-latitude family, so no arrangement of members lapping parallel circles at different rates satisfies the law, for integer or any other rate ratio. For unequal radii about non-parallel axes the statement is derived, with two independent readings of its odd-ratio lemmas and a falsifier search of 333 starts that found no non-rigid state below residual $0.23$.

**Histories with finitely many harmonics (derived and refereed).** A curve on a sphere whose coordinates are finite Fourier sums and whose speed is constant is a uniformly traversed circle: in the moving frame of position direction, unit tangent and their cross product, all three are trigonometric polynomials, degrees add under multiplication, and the two frame equations then force the geodesic curvature to be constant ([Lemma 20.1](analysis/weber-binding-sphere-great-circle-closure.md#20-equal-speed-spherical-curves-with-finitely-many-harmonics-are-circles-added-2026-10-06t2343z-claim-block-corrected-2350z)). With the uniform-circle statement above, a collision-free six-member equal-speed spherical history built from finitely many harmonics of one fundamental and satisfying the law is a rigid rotation (Corollary 20.2). A non-rigid equal-speed spherical solution, if one exists, therefore has infinitely many harmonics, and a search with truncated series can detect it only as a residual that falls as harmonics are added. The independent reviewer refereed the lemma on paper and confirmed it complete as written.

**Collocation at $R=1$ (measured; first round independently re-evaluated).** The [collocation lane](analysis/weber-binding-sphere-multicurve-collocation.md) represents the six paths as truncated Fourier series and solves the law at equispaced times, which avoids the quarter-lap collisions that left the unconstrained stratum uncovered at $R=1$ in Section 12.1. Its known cases were recorded before any target: the hexagon is a zero, and with two members the same code reproduces two closed non-rigid rosettes of this law. In 625 target starts, 370 under the first residual normalization across the unconstrained, C2, C3 and D3 strata and four winding classes and 255 under an amended one, no equal-speed sphere candidate other than the hexagon appeared. On 50 harmonic ladders at three, five and seven harmonics the rosette's residual falls geometrically while no six-member residual does; apart from the hexagon the smallest last-rung residual is $0.67$. Two periodic orbits were found off the sphere, both rigid rotations whose members have unequal speeds. The lane also showed that each residual normalization is degenerate in a stated limit, so the first-round floors and the 250 second-round results that end on the speed bound are not cited as negatives. The [adjudication](analysis/weber-binding-sphere-multicurve-adjudication.md) re-evaluated all 740 first-round target results with separate code: 16 meet the candidate tolerances and all 16 are the hexagon. The result is a bounded negative on the states reached. It does not cover winding classes or the C3 and D3 strata under the amended residual, and it says nothing about histories with infinitely many harmonics beyond what the ladders test.

**The delayed adaptation on the same square (computer-assisted derived; independently checked).** Section 12 concerns the instantaneous law. Under the separately selected delayed adaptation, Section 9a of the [equation-variants manuscript](../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation), the [first ring screen](analysis/weber-delayed-ring-screen.md) of 2026-10-05 certifies by outward intervals that the alternating square has at least one balanced circle with member speed between $2.14724560$ and $2.14724572$ times the wake speed and radius near $0.41618$, and that its pairing sector has at least two positive real characteristic roots, in $[1.02,1.04]$ and $[3.60,3.70]$. A separately authored Cartesian subject reproduces the balance and both roots. Causal delay therefore does not stabilize the pairing sector at this reference. The screen makes no statement about balances below the wake speed, other sectors or nonlinear fate, and no history was evolved.

## 13. Instantaneous Darwin-inspired alternating square

Derived ring balance and blind-matched spectra are owned by the [ring analysis](analysis/darwin-overnight-ring.md) and [independent adjudication](analysis/darwin-overnight-ring-independent-adjudication.md): $v^2=2(2\sqrt2-1)/(8R-1-\sqrt2)$ exists for $R>(1+\sqrt2)/8$, and the Hessian is positive definite for $R>(2+\sqrt2)/4$ with six singular radii below it. Linear instability is checked at $R=50,100,200$ in the declared domain $R\ge46.0124548140$; $R=20,5,1$ are subject-only adapted-law results. The $m=2$ twist growth is $1.5012$–$1.5138\,\Omega$ and the $m=1,3$ deformation growth is $1.2265$–$1.2394\,\Omega$, shifted from the inverse-square square by $O(1/R)$. Blind routes match to 11–14 digits, and prepared-eigenvector growth matches to $1.5\times10^{-8}$ in the fitted linear window. No measured ring preparation survives; nonlinear later fate is open. This ring NO GO supplies no delayed-law claim or continuous-radius spectral certificate. The checkpoint counts remain 36 enumerated cases plus five class statements, 12 checked positives, six negatives, two undefined classes and seven unresolved branches. Falsifiers: an independently resolved growing pair exponent in the declared domain, or a third checked ring linearization at the three cited radii with no matching growing twist exponent. Nothing is adopted into canon.

The [owning ring analysis](analysis/darwin-overnight-ring.md#2-the-12times12-velocity-hessian-and-its-exact-spectrum) gives the axial Hessian eigenvalues $1-(2\sqrt2-1)/(4R)$, $1-1/(4R)$ (double), $1+(2\sqrt2+1)/(4R)$; in-plane eigenvalues $1-(2-\sqrt2)/(4R)$, $1-(1+\sqrt2)/(4R)$, $1-(2+\sqrt2)/(4R)$, $1+(\sqrt2-1)/(4R)$ and $1+(3\pm\sqrt{73})/(8R)$ (each double). The six singular radii are $(2-\sqrt2)/4$, $1/4$, $(2\sqrt2-1)/4$, $(1+\sqrt2)/4$, $(\sqrt{73}-3)/8$, $(2+\sqrt2)/4$; pair singular separations do not transfer. Measured same-lane exact-ring departure from round-off occurs in about four periods with fitted $1.49$–$1.51\,\Omega$, except one mixed fit at $R=100$; a $10^{-3}$ rhombic shear leaves within one period. Prepared eigenvectors give the separately matched linear rates above. These are negative results for the instantaneous adapted law only.

## 14. Rigid balances of the unchanged delayed equation away from the regular rings

Sections 11 to 13 concern comparison laws. This section returns to the unchanged delayed Master Equation, with every positive-delay causal root and no speed cap, and records the rigid balances found away from the regular alternating rings. A rigid balance is an arrangement that turns about an axis at one angular rate, with or without steady motion along that axis, and satisfies the equation exactly for all time. Values use $c_f=1$ and $K=1$.

**Slow arrangements do not balance, and they come apart into pairs.** At small speed the delayed equation is the zero-delay inverse-square comparison plus corrections of first order in speed. On a slow rigid rotor those corrections push a member forward for each opposite-polarity companion and brake it for each like-polarity one, and the sum vanishes on none of the sixteen rotors with three to six members found by a random census; all sixteen are also unstable in the zero-delay comparison, and released rotors separate into pairs (derived for the push, measured for the census and three releases; [rotor analysis](analysis/slow-rigid-rotor-first-order-torque.md)). Two slow pairs a distance apart exchange angular momentum reciprocally and disturb each other's forward push only at second order in the ratio of pair size to separation; six released arrangements unbind, end in a close approach that the runs do not resolve, or separate (derived and measured; [two-pair analysis](analysis/slow-pair-far-field-and-two-pair-coupling.md)).

**Exact balances exist once the delays are of order one.** Two like-polarity members circling a central opposite member at rest balance at $1.2757\,c_f$, where each circling member's own wake pushes it forward by the amount its partner brakes it ([charged trimer](analysis/charged-trimer-above-wake-speed.md)). Three concentric like pairs, two of one polarity and one of the other, balance with speeds $0.527$, $0.971$ and $0.561$, every member below wake speed and none receiving its own wake ([six-member balance](analysis/six-member-balance-below-wake-speed.md)). Both are enclosed in interval arithmetic with a derived root census and accepted by a [separately constructed certificate](analysis/exact-balance-enclosures-independent-adjudication-2026-10-04.md), so their existence and local uniqueness are computer-assisted derived.

**Balances are common.** A random-start [search over 211 families](analysis/rigid-balance-search-2026-10-04.md) found 93 distinct rigid balances with two to twenty members. Sixty-five have every member below wake speed, and all 65 are enclosed by one interval instrument. Counting conditions against unknowns explains their kinds. A planar arrangement has as many unknowns as conditions, so balances are isolated and the equation fixes their size. A three-dimensional arrangement at rest along its axis is overdetermined by one unless it has a mirror plane; 24 mirror-symmetric balances were found. An arrangement with no mirror plane gains the missing unknown from an axial velocity, and four balances travel steadily along their rotation axis at $0.11$ to $0.45$ of wake speed, the smallest with three members; the three-member and six-member ones have [separate](../binary-research/analysis/small-exact-balances-independent-adjudication-2026-10-04.md) [certificates](analysis/translating-six-member-balance-independent-adjudication-2026-10-04.md). Sixteen of the 65 have no net polarity.

**Nested alternating rings balance below wake speed.** A single regular alternating ring is excluded at every speed up to wake speed. Two such rings, one inside the other, balance each other for rings of 6, 8, 10, 12, 14 and 16 members; the slowest, two hexagons, moves at $0.12$ and $0.26$ of wake speed (measured, five of eleven enclosed). No nested pair of two- or four-member rings and no nested triple was found.

**None is stable.** Every one of the 93 balances has growing characteristic roots of the delayed first variation: never fewer than five, never fewer than two per member, and typically three per member, which is close to the most a system of that many coordinates could have in the zero-delay comparison. Each count is closed by a bound on the size of any growing root, evaluated in float arithmetic, and omits roots within $0.0005\,\omega$ of the axis; the counts are float measurements of formal modes, thirteen of them reproduced by separate constructions. The first references of the two-, four-, six- and eight-member alternating rings, returned by the search as controls, have 5, 15, 29 and 39 over all sectors.

**Disturbed balances run into the equation's boundary.** All 93 balances were [released](analysis/released-balances-and-nonrigid-search-2026-10-05.md) from their complete rigid pasts with small velocity kicks and followed with the full delayed equation. On the four where it was measured, the departure grows at the largest computed rate to within half a percent, so the fastest formal mode is a real motion. None returned. Every run of the 65 balances below wake speed ended, within $1.4$ periods, with a member arriving at wake speed at positive distance from the others and with no change in the root census; on the six runs where they were measured, the rate of arrival was positive and every causal root regular (measured, float, with step refinement). The parent's [curved-path obstruction](../analysis/curved-path-wake-speed-obstructions.md) proves that an arrival at a positive rate from an entirely sub-wake past, with bounded and continuous rows from the others, has no continuation with continuous, absolutely continuous velocity and ordinary roots when the equation is imposed across the event (derived; adjudicated by a delegated reviewer in the same session). Balances with a member above wake speed end with a member at wake speed, from below or from above, or far apart after births of causal roots that the instrument does not resolve; close approaches on the way are fast passages, not collisions. Searches for periodic histories that are not rigid, over breathing arrangements of one to three antipodal pairs and of two or three free members below wake speed, found none in 1,828 starts, and for a mirror opposite pair turning in one sense such a history is excluded by an exact identity: its angular momentum increases at every instant. A further search found two rigid travelling arrangements of twelve members, four triangles at four heights, one of them with no net polarity.

**Update, 2026-10-06.** Four results of an overnight continuation extend and correct the paragraph above. First, a [second search campaign](analysis/rigid-balance-search-2026-10-04.md#a-second-campaign-2026-10-06) of 101 further families found 72 more rigid balances, 61 of them below wake speed and enclosed; none is free of growing roots, so 165 distinct balances are on record with never fewer than two growing roots per member. The new ones include a three-member balance at rest below wake speed and four four-member balances with no net polarity. Second, the statement that every released balance ends at wake speed was too strong. Of 276 [releases](analysis/released-balances-and-nonrigid-search-2026-10-05.md#balances-entirely-below-wake-speed) of the 126 balances below wake speed, 274 end with a member arriving at wake speed at a measured positive rate with regular rows, and 2 end with the arrangement dispersing and every member still below wake speed; one of those, followed to 30 periods, is seven free architrinos, every pair separating, and is the first disturbed balance on record whose history does not meet the wake-speed boundary, a dissolution and not an assembly. The 28 balances with a member above wake speed were [released again](analysis/released-balances-and-nonrigid-search-2026-10-05.md#balances-with-a-member-above-wake-speed) with an integrator that resolves the births and mergers of causal roots: 38 of 55 runs converged, 31 ending with an arrival at wake speed from below, 5 with a descent to it from above, and 2, both of one three-member rotor, with dispersal. Third, a [root-birth law](../analysis/root-birth-impulse-law.md), derived at leading order and accepted with corrections by a delegated adjudicator who re-derived it blind, gives in closed form the time in which the two causal roots born from a close passage of a member above wake speed drive a slower member to wake speed; it matches a blind measurement to $0.1$ percent and holds when the passing distance times the passing speed is small in natural units. Fourth, the six-member ring reference T02 was [released](analysis/released-balances-and-nonrigid-search-2026-10-05.md#the-six-member-ring-references-released): a symmetric disturbance grows at the ring research's certified rate to within half a percent, and in three runs a member slows to wake speed from above after $0.83$ to $0.85$ of a period. All of this is under the unchanged Master Equation; the releases are float measurements.

These results change one premise of the assembly problem and leave another in place. Exact finite solutions below wake speed are not rare. A persistent one has not been found among rigid motions, so the candidates that remain are histories that are not rigid, structures held by a surrounding population, and the equation-level decisions recorded in the [parent tracker](../priorities.md). A rigid balance with no growing characteristic root, or an enclosure in the search tables that fails under a second instrument, would overturn the corresponding statement here.

## 15. Eight-member releases under the inclusive field-speed ceiling

### 15.1. Selected histories and the distinction between a stopping threshold and fate

The [completed eight-member investigation](analysis/overnight-d-ceiling-eight-member-2026-10-06.md) and its finite-history successor examine two existing neutral mirror preparations, each with its original seeds 1 and 2. They use the separately selected [inclusive ceiling response](../equation-variants/field-speed-ceiling/definition.md#13-the-velocity-constraint-and-response-order), with $K=c_f=c_a=1$, original-weight ordinary partner contributions, zero self acceleration, and removal of the positive forward acceleration only after summing all partners. No contact response, smoothing, new kick, or change to the canonical Master Equation is inferred from this investigation.

Each complete prescribed past has eight persistent members with four positive and four negative polarities. Two positive two-member circles lie at opposite axial heights, while two negative two-member circles lie in the central plane. The full assembly is spatial although each member's rigid past is planar. Component-braid membership is unassigned; this is not a three-binary configuration. For source time $S\le0$, the paths are

$$
\mathbf X_j(S)=\bigl(r_j\cos(\phi_j+\omega S),\ r_j\sin(\phi_j+\omega S),\ z_j\bigr).
$$

The literal radii $r_j$, phases $\phi_j$, heights $z_j$, common angular rate $\omega$, and original NumPy kick construction are retained in the [preparation and reproduction record](analysis/overnight-d-reproduction-notes.md). Positions are continuous at zero; the kick changes the right velocity trace while the left rigid history remains intact. Subsequent motion is unrestricted spatial motion under the selected ceiling law.

**Measured finite evidence:** the research evolutions of balance 1 reach large-separation stopping thresholds, whereas balance 0's two selected kicks reach close-approach thresholds. Separately authored numerical methods support the finite observations, with their interpolation and refinement limitations retained. These observations establish neither all-future escape nor finite-time coincidence. The aggregate release census and its terminology in registry BRD-36 remain numerical evidence; the preparation-specific conditional results below are indexed separately by BRD-38.

### 15.2. A sufficient complete-separation theorem

**Derived and independently reconstructed:** the [split-history tail theorem](analysis/overnight-d-split-history-tail.md), assessed in the [independent review](analysis/overnight-d-split-tail-independent-review-2026-10-06.md), gives a sufficient condition for all eight members to separate indefinitely. It bounds emissions before an entry time $T_0$ using their retained geometry, and emissions after $T_0$ using small velocity neighborhoods. Both parts retain the same ordinary channel and its original weight; the split adds no root exclusion.

Choose unit pair directions $\mathbf e_{ij}=-\mathbf e_{ji}$, velocity centers $\mathbf U_i$ inside the unit ball, radii $\eta_i>0$, and positive projected entry separations $d_{ij}$. Require

$$
c_{ij}=\mathbf e_{ij}\cdot(\mathbf U_i-\mathbf U_j)-\eta_i-\eta_j>0.
$$

While each velocity stays within its chosen radius, every projected separation grows at least as $d_{ij}+c_{ij}(T-T_0)$. For an old source emission at $S$, put $\ell=T_0-S$ and $\mathbf a=\mathbf X_i(T_0)-\mathbf X_j(S)$. The receiver's speed cap restricts a later arrival direction $\mathbf n$ by $\mathbf n\cdot\mathbf a\ge\ell$. This geometric restriction supplies a positive old-source transmitter-factor floor $\delta_{ij}^{\mathrm{old}}$ and a delayed-range floor $R_{ij}$. The corresponding remaining acceleration integral is at most $2/(\delta_{ij}^{\mathrm{old}}R_{ij})$. A separate bound $B_{ij}^{\mathrm{new}}$ controls post-entry emissions from their delayed onset and future velocity neighborhoods. The source provides the explicit formulas and the complete interval hypotheses for both bounds.

If the initial velocity error from its center is at most $\epsilon_i^0$, a sufficient closure inequality is

$$
\epsilon_i^0+\sum_{j\ne i}\left[\frac{2}{\delta_{ij}^{\mathrm{old}}R_{ij}}+B_{ij}^{\mathrm{new}}\right]<\eta_i
\qquad\text{for every }i.
$$

Projection after the complete sum cannot increase its norm, so the remaining integrated acceleration cannot drive a velocity out of its neighborhood. With the complete capped past, negative cutoff gaps, positive range and transmitter margins, and compatible Lipschitz source velocities, the ordinary-root and normal-cone continuation argument then extends the solution through every finite time. This is complete separation of every pair, not merely breakup into separated subclusters. A source clock may converge to a finite old emission time; flushing the release transient is not assumed. Emission exactly at $T_0$ belongs to the old part, including a clock that freezes there.

### 15.3. Independently checked neighborhood, unproved actual entry

**Computer-assisted conditional result:** the separately authored [outward-interval checker and review](analysis/overnight-d-tail-interval-independent-review-2026-10-06.md) admit a neighborhood of the retained balance-1 seed-1 history at $T_0=2732.383882001036$, approximately forty periods. The required uniform position and velocity errors are $\epsilon_x=0.1$ and $\epsilon_v=0.001$, with initial center error at most $0.001$. The checker covers all 56 ordered partner channels and 1,088,168 full or clipped source segments under its explicit binary64 outward-arithmetic contract. Its largest total allowance divided by the corresponding velocity radius is $0.9390466349354595<1$; its largest cutoff-gap upper bound is negative, $-0.8010801597283715$.

The earliest required source cutoff is $66.97634712446597$. Thus the admitted object is a set of exact regular histories within the specified errors on the required retained intervals through $T_0$. **No validated finite evolution yet places the original kicked release in that set.** The arithmetic certificate proves the implication from neighborhood membership to complete separation, not the membership premise. A separate seed-2 history also passes the analytical whole-segment formulas in ordinary binary64 arithmetic, with ratio approximately $0.95210$ under the same hypothetical errors; it has no independent interval admission. Agreement of those two different preparations is not independent evidence for either exact fate.

### 15.4. Finite-history comparison, initialization, and source-kick crossings

The [geometry-preserving comparison](analysis/overnight-d-finite-geometry-enclosure.md) and its [independent reconstruction](analysis/overnight-d-finite-geometry-independent-review-2026-10-07.md) retain signed receiver matrices before taking growth bounds, evaluate delayed errors at their own source times, and preserve a dissipative term from the original normal-cone response. They compare a time-dependent approximate path with the exact equation while retaining the residual. They are not stability calculations about an unproved equilibrium.

If $\mathbf x_i$ is the approximate position and $\mathbf w_i$ its feasible projected velocity, define errors $\mathbf e_i^x=\mathbf X_i-\mathbf x_i$, $\mathbf e_i^v=\mathbf V_i-\mathbf w_i$ and weighted size

$$
Y_i=\left(\alpha^2\|\mathbf e_i^x\|^2+\|\mathbf e_i^v\|^2\right)^{1/2},\qquad \alpha>0.
$$

The scale $\alpha$ balances the position and velocity terms; it changes no motion. The independently checked derivative and energy inequalities give a conditional upper-barrier method for $Y_i$ when all auxiliary roots, coefficient regions, defects, and delayed histories are enclosed. To connect its feasible velocity to the Hermite derivative used by the tail certificate, an upper barrier $E_i$ must also satisfy $E_i/\alpha\le0.1$ and $E_i+\|\dot{\mathbf x}_i-\mathbf w_i\|\le0.001$ throughout the required source history.

**Certified initialization:** the [independent kick inventory](analysis/overnight-d-kick-crossing-independent-review-2026-10-07.md) bounds the discrepancy between the analytic rigid birth position and the stored first node by $4\times10^{-12}$, and the right-velocity representation error by $4\times10^{-13}$. Translating only the negative-time comparison positions by that initial discrepancy makes the reference continuous and preserves the positive Hermite history. This is a comparison-reference repair, not a new preparation. With $\alpha=0.2$ on the prescribed past and at zero, the uniform barrier $E_i=2\times10^{-12}$ covers initialization. Later residuals must be evaluated on this joined reference.

**Conditional kick geometry:** the same interval instrument certifies a unique transverse reception of each of the 56 source-zero fronts on the retained prefix, provided the exact history remains within the proposed $0.1$ position and $0.001$ velocity errors. Crossing brackets lie between normalized times $4.2550$ and $13.0498$; the exact receiver-factor floor exceeds $0.6113$ and both one-sided transmitter factors exceed $0.6199$. This rules out frozen or grazing kick clocks within that region, while leaving the region's actual attainment and the other ordinary roots unproved. Overlapping brackets do not fix the ordering of different events.

The derivative comparison moves the receiver along an affine translation at each fixed reception. That segment can cross the source-zero sphere twice even when its endpoint source times lie on the same side. The independently checked correction includes both crossings. On the separately certified translation radius $0.2$ and velocity-addition radius $0.001$, integrated kick contributions are at most $7.69821865678055\times10^{-6}$ per receiver before subsequent amplification. The record supplies smaller-error adaptive coefficients. An integrated allowance cannot be injected early and then allowed to decay before a possible later crossing; its timing requires a valid pointwise, integral, or event-bracket comparison.

**Measured diagnostic limitation:** the geometry-preserving floating screen first exceeds the velocity allowance at $T\approx46$ on one grid and $T\approx47$ on its refinement, before the earliest tail source cutoff near $67$. These are sampled nominal-coefficient experiments that omit kick and complementarity contributions and use an unvalidated smaller initialization allowance. They are not exact error lower bounds, interval enclosures, or evidence that the release fails to escape. The earlier scalar estimate was still more conservative. The remaining research obligation is a validated finite-history bound preserving enough of the coupled signed delayed variation, with off-front root and matrix coverage, joined-reference residuals, and correctly propagated event contributions.

### 15.5. Approaching preparations, independent evidence, and falsifiers

For balance 0's original seeds, the [independently reviewed snapshot and external-six estimate](analysis/overnight-d-snapshot-independent-review-2026-10-06.md) bounds the other six members' contribution to either receiver of the approaching pair on a declared short window, conditional on exact retained-history and ordinary-root margins. The numerical bound is about two over a window of length $0.001$; it is not itself a validated exact-history bound. At fixed receiver velocity the post-summation ceiling map is nonexpansive in its total acceleration input, so the same conditional external contribution also bounds its absolute effect on the projected response. A separately evolved isolated pair has different positions, velocities, and source times, so no trajectory comparison or coincidence theorem follows from this fixed-state inequality. A preparation-specific delayed-range/present-distance estimate remains missing; the separate three-member [C1 contact study](analysis/ceiling-contact-two-hour-2026-10-06.md), in which coincidence of the approaching pair is inferred and not proved and the unproved step is a bound of that same kind, is not transferred to these eight-member histories.

The theorem reviews independently reconstruct the mathematical implications. The interval instruments certify their declared input neighborhoods and front regions after known-case controls; numerical refinement and separate discretizations remain finite measured evidence. This manuscript integration inspected those sources without rerunning scientific targets or independently revalidating the interval library. Actual escape of either outward candidate and actual coincidence of either approaching candidate remain open. A nonpositive recomputed interval margin, a missed root or homotopy kick crossing, failure of the reference initialization, or an exact history satisfying the complete theorem premises while violating its separation conclusion would overturn the corresponding conditional claim. A diagnostic allowance failure alone overturns none of those actual-fate possibilities.
