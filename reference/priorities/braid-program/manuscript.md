# Braid Histories and Persistent Assemblies

## 1. A persistent assembly is a condition on histories

### 1.1 From a moving picture to a dynamical object

A set of circulating points is easy to prescribe. A persistent assembly must do something more demanding: its complete past must generate the acceleration needed to continue that same motion. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the present configuration is therefore only a section through the dynamical state. Two assemblies can have identical positions and velocities now and different accelerations because their earlier paths differ.

The Braid Program studies this distinction for finite collections of polarity-bearing architrinos. A member has a persistent label, a fixed polarity and a path $\mathbf X_i(T)$ in Euclidean space with absolute time $T$. Pair, component and sector labels describe declared relationships among those paths. They do not remove interactions with other members. A relationship graph is consequently useful for organizing geometry, but its edges are not an interaction cutoff.

A braid in this setting need not have every member on one plane or circle. The relevant question is whether a bounded, nondegenerate history can continue under its own delayed acceleration and, where a return is claimed, reproduce the required history under an explicitly stated symmetry. A pair can remain identifiable while its diagnostic role changes from the faster to the slower component. Conversely, a new pairing imposed on unchanged labeled paths changes the description without changing the acceleration. These elementary distinctions prevent a visual resemblance from becoming a dynamical conclusion.

The program contains exact geometric identities, conditional theorems, computer-assisted source results, finite numerical observations and proposed physical interpretations. Their roles are developed separately below. The central open problem is a demonstrated persistent branch with a controlled neighborhood and, for energy claims, a compatible action-derived account. A catalog entry, an attractive drawing or a finite low residual does not by itself supply that object.

### 1.2 Causal roots and acceleration

At a reception event $(\mathbf X_i(T_r),T_r)$, a transmitter path contributes at every admitted earlier time $T_t$ satisfying the causal condition

$$
R_{ij}=\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|=c_f(T_r-T_t).
$$

Here $c_f$ is the wake speed. Numerical instances below use $c_f=1$; symbolic formulas retain it where the dependence matters. Define $\widehat{\mathbf r}_{ij}=(\mathbf X_i-\mathbf X_j)/R_{ij}$ and the transmitter and receiver factors

$$
D_t=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t),\qquad
D_r=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r).
$$

An ordinary root has nonzero distance and a nonzero transmitter factor. On the sharp ordinary chart used by the retained analyses, its acceleration contribution is

$$
\mathbf A_{ij}(T_r,T_t)
=\kappa q_iq_j\frac{\mathbf X_i(T_r)-\mathbf X_j(T_t)}{R_{ij}^{3}}
\frac{c_f}{|D_t|}.
$$

The signed polarity coefficients $q_i$ and coupling $\kappa$ must be those of the same declared record. A coefficient used in one experiment cannot be transferred to another simply because both depict a similar geometry. Member acceleration sums every owned partner root and every admitted nontrivial self root. Trivial zero-delay self coincidence is excluded by the declared endpoint convention; it is not evaluated by substituting zero into the singular expression.

Differentiating the causal equation along a simple root gives $dT_t/dT_r=D_r/D_t$. This is the rate at which reception follows the emitting history. It is not an additional multiplier in the acceleration kernel. The distinction becomes especially important when moving-receiver work is discussed: root playback, acceleration weight and energy-account rate are three different quantities.

Finite speeds at or above $c_f$ are not excluded from the model merely because a strict sub-field instrument cannot certify them. They require a complete multiroot treatment, including transitions and self hits. Likewise, reaching $c_f$ is not alone a fold: the relevant event is the loss of the transmitter-factor margin on a causal root.

### 1.3 What each level of evidence establishes

Geometric specification establishes which paths a record denotes. Geometric admission adds such conditions as separation, coherent history and a valid representation. Causal admission establishes the required root inventory on its stated domain. Ordinary evolution then asks whether the complete delayed acceleration continues the history without imposed future motion. Retention and return require still more: a bounded branch, an explicit return action and the necessary history comparison. These levels are not interchangeable, and a failure can occur at any one without deciding all the others.

A finite reception ladder, for example, can certify every root at its reception times while leaving the intervals between them untreated. A continuous root theorem can cover those intervals while saying nothing about acceleration balance. An EOM solver can produce an accepted short segment while failing before the requested horizon. A scalar section can return while the remaining coordinates, rates and delayed history do not. Each result is useful when its domain remains attached to it.

This hierarchy also explains why unknown, unavailable, failed and not applicable must remain distinct. An unavailable residual is not zero. A field-speed restriction in an instrument is not a physical rejection. A stationary geometric endpoint can be inapplicable to a moving-history test while still failing an exact stationary balance equation. The [candidate adjudication](analysis/braid-candidate-requirement-adjudication.md) and [analytical method](contracts/method.md) retain the detailed interfaces and tests supporting these distinctions.

### 1.4 A common ruler and an exact return

Comparing differently sized histories requires a predeclared ruler. For $m$ members, use their geometric center $\mathbf C=m^{-1}\sum_i\mathbf X_i$ and a fixed reference root-mean-square radius

$$
L_0^2=\frac1m\sum_{i=1}^{m}\|\mathbf X_i(T_0)-\mathbf C(T_0)\|^2,\qquad
\tau_0=\frac{L_0}{c_f}.
$$

The ruler is fixed for the comparison rather than continually adjusted to hide a growing residual. Uniform rescaling gives covariance of reported units; it does not establish that a scaled path solves the same EOM at unchanged coupling.

A return action must specify its spatial transformation, persistent-label permutation and any allowed polarity operation. Matching positions after that action is weaker than matching positions and rates, which is weaker than matching the relevant delayed history and causal-root correspondence. A discrete action also supplies no canonical fractional return coordinate unless an additional continuous lift is defined. An apparently short shape return may require a longer cadence or history return.

Position, rate and history residuals therefore have separate purposes. A history residual should not count the endpoint position and rate twice; it must also preserve causal timing and ownership under a bijection. A small centered shape mismatch cannot conceal the failure of that history correspondence. Neither repeated prescribed cycles nor a numerical return of one unperturbed history establishes stability of nearby histories.

## 2. Geometry, polarity and coordinate families

### 2.1 Neutral binaries and persistent endpoint labels

A useful pair-conjugate chart writes the two endpoints of binary $a$ as

$$
\mathbf X_{a,s}(T)=\mathbf C(T)+b_a\mathbf n_a
+s\left[h_a\mathbf n_a+\rho_a\mathbf u_a(T)\right],\qquad s\in\{-1,+1\},
$$

where $\mathbf u_a(T)$ is a unit vector in the plane perpendicular to the declared axis $\mathbf n_a$. Its phase is measured in that binary's fixed transverse frame. The midpoint is $\mathbf C+b_a\mathbf n_a$, the axial half-displacement is $h_a$, and the transverse radius is $\rho_a$. Opposite endpoint polarities make the pair neutral, but neutrality does not cancel its polarity-weighted displacement or its delayed acceleration.

With three fixed independent orbit axes and coincident midpoints, the three axial scales, three radii and three phases form a nine-coordinate pair-conjugate chart. Setting the axial scales to zero gives a six-coordinate coincident-midpoint submanifold. Its containing tangent remains nine-dimensional: restricting a point to a lower-dimensional set does not remove the directions available to a different experiment. Translation, common phase and persistent-index conventions must be fixed before dimensions or sensitivity ranks are compared.

For a common-axis family, removing the common axial translation leaves two relative midpoint coordinates. Opening them produces a genuine enlargement of the chart. It must first reproduce the original coincident-axis limit, including its symmetry-null directions. A nearby point is not automatically the same admitted source, and changing binary names while retaining the same paths and polarity is an exact semantic null.

The [orbiting-endpoint comparison](analysis/three-binary-orbiting-endpoint-comparison.md) and [coincident-axis analysis](analysis/coincident-axis-and-two-component-circular-analytics.md) give the complete coordinate maps. Their geometric results do not claim that every admissible coordinate point is a solution.

### 2.2 Why six-to-six matching failed, and what the five-coordinate repair does

A seemingly fair comparison between two six-coordinate descriptions can be unfair if their centering constraints remove different directions. Three vectors with zero sum are linearly dependent. Consequently, independently adjustable axial scales on three independent axes cannot also provide the assumed separate-sector centering. The original six-to-six comparison had a structural obstruction before any dynamics was run.

The repaired comparison instead selects two injectively embedded five-coordinate families. After removing the same common translation, both have tangent metric $6I_5$ under the declared member norm. Three coordinates describe a shared locus; the other two have necessarily different parity structure. This gives a controlled initialization comparison without pretending that the two families have identical nonlinear histories or symmetries.

The later bounded EOM comparison evolved four primary cases and two refinements to $T=0.15$ with $c_f=1$, using a fixed retained past and declared sampling/chunk structure. Its observed leakage is evidence on that five-coordinate slice. The record does not isolate pair conjugacy as the cause: the compared paths also differ in the prescribed noncommon coordinates and histories. The refinement rule itself included a specific normal-leakage test, rather than a proof that every diagnostic converged. Local initialization fairness, finite evolution and a causal explanation of the difference remain separate claims.

### 2.3 Circular compositions and geometric negatives

Two six-member components can share a center, occupy separated positions on a common axis, rotate in the same sense or counterrotate. Each choice must preserve its own member order, pair declarations, component membership, phase convention and history. A component called a planar braid does not make the entire two-component assembly planar; affine span belongs to the whole member set.

The coincident-center and coaxially separated source families retain both general circular and planar-boundary variants. Their finite history ranges, interpolation rules and guards define what the renderer and evaluator receive. They do not establish binding. Similarly, a co-spherical relation states equality of envelope radii under the declared geometry, not an impenetrable shell or protection against pair coincidence. The scoped negative control on one co-spherical circular chart cannot be transferred to all co-spherical histories.

A stronger analytical exclusion applies to two parallel circular planes with fixed nonzero separation and polarity segregated by plane. On the complete ordinary root chart, every cross-plane acceleration contribution has the same inward axial sign. The required fixed-height circular motion has no corresponding axial acceleration, so the sum cannot balance. This excludes that geometry at every finite admitted speed; changing the plane separation, mixing polarities or opening additional motions changes the hypotheses. A tuned radial second derivative does not remove the axial discrepancy.

A balanced sum over all members would not repair this failure. Every receiver must satisfy its own vector equation. Action/reaction-style cancellation of an aggregate is not receiver-local balance in delayed dynamics.

### 2.4 Persistent axes, frequencies and finite display histories

The eleven three-axis circular specifications form two groups of five variants—axially separated and coincident-midpoint—together with the phase-compensated symmetric representative. Their endpoint indices remain persistent when frequencies or visual roles change. An endpoint associated with the highest frequency in one row need not have that role in another, and reordering by frequency changes the identity convention.

A rational-frequency prescription has an exact common return only when all phases, circulation signs and rational tokens are included. For the proposed three-frequency slice $f_a=h_a/4$, with positive integer harmonics $h_a$, the least common return is $4/\gcd(h_1,h_2,h_3)$. Repeating two such prescribed cycles tests period and grid aliasing, not dynamical persistence. In the retained search design, geometry admission precedes frequency variation, and a speed-inapplicable row remains in the frozen population rather than being replaced with a slower favorable one.

Other sources prescribe linear centered histories, a phase-varying twelve-member path and an asymmetric counter-breathing eight-member display. A finite displayed future is a chosen path. Interpolation, reconstruction and boundary guards determine which path it is; changing those details changes the subject. An empty neutral-pair list is not evidence that an implementation secretly pairs components, and a list of component memberships is not an equation constraining their subsequent motion. The [configuration chart](configurations/configuration-chart.md) and [display catalog](configurations/configuration-display-catalog.md) preserve these individual declarations.

### 2.5 Exterior improvement and internal consistency

An exterior wake response can improve while the imposed assembly becomes less internally consistent. The historical coincident-axis accessory pilot provides such an example: selected accessory placements improved exterior ratios while worsening all three internal residuals. Its numerical convention used the recorded legacy $c_f=4$, so those values remain protocol-local history and are not combined with current normalized evidence.

A useful search therefore keeps internal axial, radial and tangential residuals, exterior exposure, cancellation, separation, root completeness and cost as distinct objectives. Hard root and separation failures cannot be traded for an attractive exterior score. Co-moving and stationary probes also answer different questions; an apparent benefit that exists only for the stationary probe may be a frame effect.

The sealed nine-configuration sample illustrates the limits of numerical search. Of 576 prescribed cases, 573 were evaluated and three remained unknown. Only 159 had applicable member scores, and all exceeded the frozen handoff ceiling; the other 414 were inapplicable. Zero rows entered the proposed descent. The lowest applicable refined peak was about $59.30$ against a ceiling of $6$, despite a very small primary/refined change. That is a bounded negative for the recorded population, not a global minimum, a closed geometric family or evidence of an attracting basin. A later lower sample cannot alter the factual minimum of the sealed earlier population.

## 3. Circular balance and the structure of causal folds

### 3.1 Chord geometry before balance

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

### 3.2 Polarity, winding and the regular census

For a regular $2N$-gon with alternating polarity, moving $N$ indices reaches the antipode. When $N$ is odd the antipodal polarity is opposite; when $N$ is even it is the same. This is exact indexing of the ideal polygon. Stored finite decimal phases and vectors carry the intended geometry but are not by themselves exact trigonometric antipodality or cancellation certificates.

A different topological fact concerns winding. On a collision-free common circle, differences between labeled angle lifts cannot cross a multiple of $2\pi$. At a common labeled return, those differences have the same integer winding. Thus labeled members share signed winding at that return, although their instantaneous angular speeds can differ. A return that permutes members is another question and must include that permutation.

The finite polarity census first studied small balanced regular inventories. Its sampled nonalternating negatives were not continuous speed exclusions. Subsequent larger inventories retained the exact polarity-orbit counts, speed samples and fold strata rather than treating a large sample as exhaustive over speed. The root geometry is independent of polarity, which allows reuse of a fixed geometric kernel in $A_i=\sigma_i\sum_s\sigma_{i+s}K_s$; such reuse does not make the resulting implementation an independent reference.

The individually stored alternating-ring specifications likewise preserve their own radii, speeds and operators. Their nonmonotone numerical rows must not be narrated as a continued branch without a continuation argument. The hundred equal-radius six-member records described next belong to a different, explicitly indexed topology ladder; those hundred records are not a census of every possible assembly.

### 3.3 A global result on the regular six-member chart

The strongest circular result concerns six alternating members with equal radius, regular phases and common circulation. The recorded proof establishes one simple tangential-balance zero in every even ordinary topology cell, and none in the initial or odd cells. Radial compatibility selects the associated radius. This is a global theorem on that chart, not a statement about unequal radii, arbitrary phases or stability.

Its support developed in distinct stages. A finite low-speed census was followed by a cover through topology cell T200 and then a separate uniform tail argument. The finite extension added 82 even-cell zeros beyond the earlier 18, yielding the hundred T02–T200 examples. It did not turn the earlier bounded record into an originally global one.

For the tail, the fold coordinate

$$
M(\beta)=\sqrt{\beta^2-1}-\arccos(1/\beta)
$$

organizes the shifted endpoint lattice with spacing $\pi/6$. Subtracting the leading inverse-square term separates an exactly summable alternating background from a controlled shape remainder. The source proof retains the shifted descending branch, including its six-level offset; losing that offset changes the background. Outward-rounded shape inequalities provide a positive old-background margin, control the distant newborn contribution and retain strict derivative dominance. The finite and high-speed domains overlap, completing the ordinary-cell conclusion.

The physical scope remains narrow even though the speed range is global. Exceptional fold roots are not ordinary simple roots. No theorem here proves an attracting neighborhood, a selected formation mechanism or an energy spectrum. The [planar frontier](campaigns/planar-three-binary-work-queue.md) retains the exact completed theorem objects and the separately deferred dynamical questions.

### 3.4 Two asymptotic limits with different answers

Increasing the fold index at fixed six-member inventory is different from increasing the number of members. Confusing these limits loses the leading correction in each.

For the fixed inventory, let $\beta_q$ denote the relevant odd fold and $\beta_n$ the nearby balance speed. The source's uniform growing-lattice argument gives

$$
\beta_n-\beta_q=
\frac{1}{18\beta_q^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}\,\beta_q^{-9/2}
+o(\beta_q^{-9/2}),
$$

where $\eta(1/2)=\sum_{j\ge1}(-1)^{j-1}/\sqrt j$ is the alternating eta value. The fractional correction comes from an old-root background of order $\beta_q^{-3/2}$. It cannot be obtained by copying the odd-fold inverse-fifth coefficient $-83/240$ into the balance expansion. A sharp inverse-fifth remainder and the complete next balance coefficient remain open. The [fold-boundary correction](evidence/2026-09-02-bp011-fold-boundary-balance-correction.md) supplies the endpoint decomposition and its uniform tail control.

For growing inventory $N$, the first fold itself approaches the speed threshold on an $N^{-2/3}$ scale. The balance lies in a much thinner layer: write $\beta=\beta_{\mathrm{fold},1}+d/N^2$. The limiting normalized tangential kernel is

$$
\frac16-\frac{1}{3\pi\sqrt{2d}},
$$

whose zero is $d=2/\pi^2$. The compatible radius has order $N^{5/3}$. The positive chamber-interior contribution of order $N^2/6$ explains why the selected zero must be sought near the fold rather than in an assumed interior continuum limit. This is an asymptotic existence and location result; it is not finite-$N$ global uniqueness, and it does not supply the first parity correction. The [boundary-layer theorem](evidence/2026-09-02-bp014-boundary-layer-balance-theorem.md) retains the root-family and complement estimates needed for that conclusion.

### 3.5 Local isolation and local history flow

Near the regular T04 solution, separate phase and radius slices each admit a small certified box, but two slice results do not prove a coupled statement. The later five-variable phase/radius/speed certificate treats the coupled $10^{-6}$ box directly, owns 72 roots and uses covariance to discharge the remaining vector equations. It identifies the unique local regular equal-radius zero in that box. A wider $2\times10^{-6}$ attempt failed interval inversion; that failure is neither an asymmetric zero nor proof that none exists outside the smaller box.

The numerical reference has speed approximately $2.9743071761$, radius approximately $0.5617317001$ and period approximately $1.1866509259$ under its declared normalization. Its finely segmented cubic history is a controlled representation of the exact circle. Representation accuracy and independent root margins do not establish that an EOM solver has reproduced a full cycle.

A separate local history-flow result works in a nonzero $W^{2,\infty}$ neighborhood of the exact history. Root margins and noncoincidence preserve an ordinary locally Lipschitz law; a first interval $[0,0.05]$ lies below the relevant delay floor. The theorem gives local existence and uniqueness from the supplied past. Its neighborhood radius is existential, not a numerical tolerance, and it supplies neither long-term retention nor a perturbation spectrum.

The [coupled-box certificate](evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md) and supporting local-flow records therefore answer complementary questions. Global unequal-radius or phase uniqueness remains open, as do independently reproduced one-cycle evolution and a controlled nearby-history return map.

### 3.6 Excluded weave and drift directions

The orthogonal weave provides a useful negative because its proof explicitly separates ordinary cells from folds. A finite fixed-phase scan was strengthened by interval exclusions across the stated speed domain, with separate limiting treatment of exceptional folds. Some folds carry persistent factors that vanish together; others produce same-directed divergent newborn contributions. None may be silently counted as an ordinary root. The result excludes that fixed weave on its declared domain, not every orthogonal or phase-shifted assembly.

Axial translation of a circle supplies another conditional reduction. With normalized drift $u$ and $\gamma=\sqrt{1-u^2}$, the circular reduction changes the effective speed, distance and planar acceleration, while an additional signed axial sum must vanish. The planar stationary balance does not automatically satisfy that extra equation. The recorded low-order T02–T36 analysis finds a strictly negative axial weight on its admitted nonzero-drift range, excluding that translating family there. The global stationary tangential tail does not extend this finite axial exclusion to higher cells.

These negatives guide the remaining geometry without replacing it. Opening phases, radii, mixed polarity placement or history degrees of freedom changes the problem. A failed candidate can eliminate an exact stratum while leaving nearby or broader histories unresolved; that is a mathematical boundary, not an invitation to weaken the original test.

## 4. Continuous causal-root sheets

### 4.1 What carries a root from one reception to the next

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

### 4.2 Circular reduction helps without completing the domain

The common-frequency three-binary study uses a squared-gap equation $G=\|\Delta\mathbf X\|^2-\delta^2$ to exploit circular geometry; here $\delta$ denotes the chart's dimensionless delay and $\Delta\mathbf X$ the corresponding displacement. Its early continuous ratio/phase inventories expose the difference between a useful reduction and a completed proof. The first retained inventory records 480,018 evaluated cells, 114 simple-root cells and 146,224 unresolved cells. The second uses an analytic circular reduction and endpoint symmetry, reducing the evaluated count to 180,210, with 652 simple-root cells and 98,152 unresolved cells. Reused symmetry cells have separate counts and are not additional independent evaluations.

Both records retain only 128 illustrative unresolved sample rows, not every unresolved cell's full ledger. A zero count under a possible-fold label is consequently not a proof that the entire domain is fold-free. Near-zero roots still have a separate certification obligation. The later version improves the representation and resolves selected channels, but it neither grants dynamical acceptance nor changes an unchanged split policy merely by having a newer version number.

These records are valuable negatives about the attempted cover. They show where resource limits, maximum depth and topology uncertainty persist. They also preserve exact analytical identities and control residuals, so a later proof can explain precisely which obligations it discharges rather than treating a new output as an unexplained success.

### 4.3 Emission coordinates and reception projection are separate

A circular root sheet can be simple in an emission-fixed coordinate while its projection onto reception phase still needs proof. With $\theta$ the reception phase, an emission coordinate $\epsilon=\theta-\delta$ is useful for selected receiver/transmitter roles in the bounded common-frequency chart. But counting roots in that chart does not automatically establish a one-to-one reception-time inventory. The derivative of the projection must retain its required sign throughout the domain.

The later source certificates therefore separate three objects: the root-sheet continuation, the opposite coordinate derivative controlling projection, and independently checked anchor residuals. Some channels admit exact analytical bounds; others require outward interval coverage. Symmetry can reconstruct a channel only when the complete identity, history policy and coordinate action are preserved. A finite point-control comparison tests the meaning of that reconstruction, while the continuous theorem supplies the between-point claim.

On the declared bounded radius-ratio chart, the accepted source reports complete representative/reused inter-binary roots together with the sealed same-binary and partner classes. These are continuous prescribed-history root results. They do not evaluate the full acceleration residual, establish a periodic solution or supply an energy. The [common-frequency action and root account](evidence/coincident-midpoint-common-frequency-step-action-ledger.md) preserves the exact chart interfaces and their chronology.

### 4.4 A simple root can leave the retained history

The outer-radius expansion gives a concrete reason to keep history boundaries distinct from folds. Let $\alpha$ be the outer radius divided by the fixed middle radius, and $\chi$ the dimensionless retained-delay cutoff. With the earlier $\chi=9/4$, a boundary is encountered at

$$
\alpha_{\mathrm b}=\frac{9}{8\sin(9/8)}\simeq1.2468584789674295.
$$

The obstruction is a simple root reaching the retained-history edge. It is not a root merger. An attempted extension to outer ratio $1.25$ therefore cannot inherit complete coverage merely because the root remains ordinary.

A later calculation uses the longer cutoff $\chi=145/64$ on a new left-open slice from the old boundary to $1.25$. The smaller attempted extension $289/128$ is insufficient. The new source's next history boundary lies beyond $1.25$, and its independently reviewed root/projection proof covers the new slice. This repairs the specified longer-history problem while preserving the earlier shorter-history negative. Extending a constant or periodic past is a change in the admitted history policy, not a retroactive correction to the old result.

The finite structural ledger provides another boundary: 24 phases on a small radius grid and thousands of accounting rows can reveal chart warnings but cannot certify a continuous domain. Its six emission-chart root-count warnings remain part of the source result. A large ledger and a continuous proof answer different questions.

### 4.5 From root intervals to usable acceleration bounds

Once coverage is established, the sharp acceleration must consume the entire accepted root enclosure and the same history family. Distance can then be intersected with causal delay and clearance bounds. An empty intersection indicates inconsistent or unresolved input; it is not a root to discard or a zero contribution.

A narrow root interval alone may still give a wide acceleration interval when its path uncertainty, denominator or correlations dominate. Increasing arithmetic precision cannot recover correlations absent from the history carrier. Conversely, a broad but valid interval may suffice for a sign exclusion without being accurate enough for a small residual metric. Inclusion and useful precision are separate properties.

This distinction governs the continuous eight-member analysis below. It also prevents the ordinary-root methods from becoming a replacement physical law: a soft core, a finite-width transition or a modified acceleration weight would define another model and requires its own authorization and evidence.

## 5. Finite ordinary evolution and its limits

### 5.1 Inward approach is not a completed breathing cycle

The stationary two-member release begins at $(\pm0.5,0,0)$ with zero velocity and a constant past. Its separately recomputed release acceleration is inward, approximately $\mp0.28622861030534$ along the axis. The retained refinement ladder advances through increasingly close approach, but all recorded motion remains inward. It establishes no certified crossing, positive-separation inner turn, outer turn or recapture.

The failure frontier belongs to cross-pair certification rather than nontrivial self roots. Extending the same constant past from depth 10 to 20 or 40 produced identical streams in one recorded control. That checks sensitivity to the cutoff of that particular constant history; it does not prove that different endpoint-matched histories are forgotten. Symmetric zero midpoint and transverse drift likewise do not establish a general conservation law.

A distinct transverse-moving release, with speed $0.25$, produces a retained rebound. Its refined first separation minimum is near $0.775771$, with interpolated zero radial speed near $T=1.71867$. The longest retained rung reaches $T=2.4$ while still moving outward and has no outer maximum. The declared return requires minimum–maximum–minimum order, so the record contains one rebound and zero completed return intervals. Period and return drift are undefined, not zero.

An earlier removed run had also motivated the breathing investigation, but its numerical authority was withdrawn when its raw bundles were removed. The later retained moving release bears its own identity and evidence; it does not revive the withdrawn run. The [stationary diagnostic](evidence/2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md) and [moving return-map account](evidence/2026-07-24-current-solver-two-architrino-breather-return-map.md) keep the experiments separate.

### 5.2 History correlation moves a certification frontier

The stationary frontier initially stopped near $T=1.24$ despite opposite root-face signs and positive transmitter and receiver factors. The diagnosis identified a missing accepted joint-history carrier. This was an ordinary simple-root width problem, not a fold or absence of a physical root.

A validation-only carrier then certified the formerly blocked step to $1.245$. Further retained correlation advanced the frontier to $1.365$, a traversal-carrier repair to $1.38$, and a refined prefix to $1.395$. These changes retained the root-time tolerance $10^{-5}$. The next step still failed because its certified width exceeded that tolerance. Repeating interval arithmetic more often changed almost nothing when the retained-history remainder was the limiting term.

The chain is evidence of specific capability improvements, not a completed stationary fate. Direct/traversal parity through the same exact-pair implementation checks an interface. A fixture that expects an atomic rejection can pass while the requested future evolution remains unresolved. An in-process history carrier also does not become checkpoint persistence until its serialization and restart obligations are actually supplied.

### 5.3 Local outward departure and a later inward turn

A radially balanced circular two-member past has another behavior. On its principal one-partner-root, no-self-root chart with $0<\beta<1$, the initial radial velocity and acceleration vanish, but the delayed tangential acceleration is positive. Rotational covariance and the exact polar equations give

$$
r^{(3)}(0)=2\omega(0)a_\theta(0)>0,\qquad
r(T)=R+\frac{\omega(0)a_\theta(0)}3T^3+O(T^4).
$$

Thus the initial departure is outward at cubic order. The derivation is acceleration-first and does not import an angular-momentum conservation argument. It is local: positive tangential acceleration does not prohibit a later radial maximum, nor must it make total speed increase when radial acceleration projects negatively on velocity.

A longer retained circular-history release supplies the source's measured counterexample to universal monotone outspiral. Its observer mapping starts at radius 2 kpc and member speed 100 km/s, while the actual numerical evolution remains normalized to $c_f=1$. The first radial-velocity sign change is bracketed at normalized times 18,547.75–18,548.00, mapped to roughly 120.989–120.991 million years, with radius about 2.00840092573 kpc. The earlier total-speed maximum and this radial maximum are distinct events.

That long run explicitly changes root and acceleration tolerances through a fingerprint-bound continuation sequence and records overlap controls. It is not one unchanged refinement ladder. The independent circular reference checks release calibration, not the complete later trajectory. The [radial-turn result](evidence/2026-08-11-physical-binary-retained-history-radial-turn.md) therefore supports a bounded measured negative to universal monotonicity; it supplies no later inward fate, repeated excursion, binding or persistent branch.

### 5.4 Phase-varying prescribed admission and failed target-horizon evolution

The selected twelve-member phase-varying history differs from the older common-cadence circular realization that failed its prescribed test. Its individual branches, polarity sectors, orbit frames and history reconstruction are part of its identity. Continuous geometric guards and a finite prescribed-root ladder admit that exact history at their stated scope. Neither the older failure nor the newer admission is a verdict on every related family.

The subsequent sharp ordinary-evolution experiment fixes $\kappa=0.002$, polarity magnitude $q_0=1$ and $c_f=1$, with a retained past ending at zero and a requested horizon $T=0.5$. The prescribed future is a comparison target only; it is not fed back as the evolved solution. Three fixed integration rungs reached accepted endpoints

$$
0.017822265625,\qquad 0.00836181640625,\qquad 0.003662109375,
$$

then stopped with root completeness uncertified. The independent first-step comparison passed, but the final snapshot retained 58 certified and 86 uncertified pair rows and refused a partial acceleration comparison. No validated motion was accepted for the requested experiment. Earlier halts under refinement and only two reachable comparison times cannot establish convergence over the requested interval.

The [ordinary-evolution evaluation](evidence/2026-08-27-f5-ordinary-evolution-evaluation.md) supersedes an older planning sentence that the experiment had not yet been declared. It does not supersede the exact source identities or turn the outcome into a physical rejection. Later diagnosis conditionally attributes the obstruction to a width requirement. The stopped successor produced no new complete scientific evaluation, no retained actual failed-trial operands and no accepted uncertainty-floor witness.

It did preserve conditional mathematics: relaxed feasibility differs from a globally smooth witness; strict-slack lifting needs its original-family and join hypotheses; exact decimal arithmetic needs the actual operands; and endpoint agreement does not establish a continuous exact-solution error bound. Point-acceleration nonuniformity on a broader sharp-history family is not a counterexample within an unchanged fixed-cubic family. These supporting results explain possible limits of an instrument without claiming that the missing concrete trial was reconstructed.

### 5.5 What a completed return experiment still requires

The exact regular-circle theorem, a short local existence result and the measured binary events provide different parts of a future return analysis. None completes it alone. A full cycle needs a retained history long enough for every causal root, a precise action on labels and rates, independent equation comparison and a refinement ladder that reaches the common target. A nearby-history experiment additionally needs its perturbation histories to lie inside the actual admissible neighborhood.

Only genuine symmetry directions may be removed before interpreting growth or multipliers. A finite-width prescribed pass region is not an attracting basin, and a numerical spectrum about a non-equilibrium has no stability referent. The existing deferred return and perturbation questions therefore remain scientifically substantive even where the corresponding bounded mathematical investigation is administratively complete.

## 6. Counter-breathing geometry and continuous residuals

### 6.1 Eight members on a six-coordinate history surface

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

### 6.2 Spheres, frames and what they do not protect

The track-center radius $|h_\sigma|$ differs from the orbit-envelope radius $\sqrt{h_\sigma^2+\rho_\sigma^2}$. Two nonparallel complete circular tracks determine the common sphere, while four simultaneous points need a noncoplanarity condition to do so. Breathing produces a time-indexed family of envelopes, not a material shell. Equal envelope radii provide no lower bound on every cross-sector clearance.

The sector centroids and polarity dipole vanish by the decorated map, but sizes, pair distances and cadence are not invariants. Generic module partners are not antipodal. Actual counterrotation depends on the instantaneous independent cadence signs, so it can disappear when one cadence reverses. Common translation is an available geometric operation; a translating solution still requires delayed dynamical consistency.

Opposite-edge constructions give useful geometric and velocity-bearing frames. Position-only normals can lose rank; signed velocity-bearing rows can be orthogonal yet become undefined when a row magnitude vanishes. A conditioning ratio alone cannot prevent all rows from tending to zero. The retained examples actually bracket a row-zero crossing, so a globally nondegenerate frame must not be inferred from typical pictures. These rows share members; they are not three disjoint opposite-polarity binaries.

Face-normal closure, orbit-area rates and signed face projections describe the geometry. They do not establish spin, magnetic field, action conservation or the gluing of physical faces. The [full geometry treatment](analysis/f6c-geometry.md) gives these constructions and the exact nondegeneracy hypotheses.

### 6.3 Turns, cadence reversal and incomplete returns

Finite continuations show sector compensation and changes from tangentially dominated motion toward breathing-dominated motion. The direction called a current in these diagnostics is polarity-weighted lever-arm motion, not a primitive electromagnetic current. Oversampling selected regions does not turn the observed census into a population distribution.

A time origin generically selects one scalar turning section, not four simultaneous turns. The refined eight-member trial has distinct radial and cadence turns; its scalar return section still leaves order-one position/rate mismatch. In the retained summary, the refined Stage B trial reaches $T=0.13$, records turns near $0.06789$ and $0.10939$, and has a section near $0.11408$ with RMS mismatch about $1.413$ and maximum about $3.316$. The same trial appears in three summary arrays; those are three presentations of one observation, not three independent trials.

The return action in that record includes the proper half-turn $\operatorname{diag}(-1,-1,1)$ and a member permutation. Its source label “reflected” does not make its determinant negative. Likewise, an action-relative winding-cell label is not a completed physical revolution: the retained real windings are small fractions of a turn. Interpolated turning times are estimates, and a scalar section cannot close all twelve coordinate/rate residuals or the history.

A bounded radial-frequency continuation changed nine ratios while preserving the declared comparison. Its best improvement was below one percent, short of the frozen ten-percent threshold, so no refinement followed. Phase-grid aliasing had also spoiled an earlier apparent improvement. These observations close those tuning attempts at their measured scope. They neither prove that no periodic branch exists nor authorize restarting a closed direction without a new scientific object.

### 6.4 An exact reconstructed future is not a uniquely known past

The residual program selects the refined trial's accepted frame centers. Eight members at 81 saved times define 80 exact rational Hermite intervals. Shared positions and rates make the selected future globally $C^1$, while curvature can jump at original knots. Rounded polynomial coefficients would define another path unless their error were separately enclosed.

The original history family contains paths and their own derivatives satisfying every stored allowance. Both adjacent pieces constrain a shared endpoint; scalar allowances are componentwise rather than Euclidean vector radii. An admissible past must join the exact chosen release position and rate. The reconstruction theorem assumes that such anchored pasts exist and that the fixed future lies within all applicable evolved-piece allowances. It then proves containment in the original family, not equality with the historical trajectory or satisfaction of the EOM.

Bernstein control points provide a useful sufficient containment test. Failure of that construction need not exclude another admissible joining path. By contrast, an exact interior point outside an allowance is a counterexample to containment of the selected path. These distinctions matter because different admissible anchored pasts can produce different delayed acceleration despite sharing the same release jets and fixed future.

### 6.5 A member residual must compare two different sides

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

### 6.6 Correlation, quadrature and partial accepted integrals

The first coarse acceleration enclosure was valid but extremely broad. Emission-only refinement narrowed the permitted root domain through strict whole-face signs and then required a complete fresh cover. An exploratory boundary move was not itself proof of a discarded region. Later positive emission endpoints can also be causal when they remain earlier than reception; absolute sign is not the causal test.

Once a leaf has law boxes and exact affine required curvature, retaining their common time variable gives a sharper relaxation than subtracting unrelated scalar ranges. The exact minimum and maximum of that independent Cartesian-box relaxation can be found across at most nine internal cuts and ten quadratic pieces. Those extrema are not necessarily attainable by the correlated history family. A fixed-time box-width lower bound therefore describes a limitation of the relaxation, not irreducible physical uncertainty.

For any fixed finite polynomial $p$ and quadrature functional $Q$, the safe identity is

$$
\int f-Q[f]=\int p-Q[p]+\int(f-p)-Q[f-p].
$$

The remainder must be enclosed over the whole leaf. Agreement between embedded quadrature rules or two zero node estimates does not supply that enclosure; a nonzero function can vanish at all chosen nodes. Positive weights, exact moments, rounded polynomial coefficients and node neighborhoods each have their own proof obligations. The retained protocol shares one subdivision budget per original frame across members and metrics, including mandatory history cuts.

The measurements expose why better inputs do not always mean a tighter final answer. Narrower node geometry once widened the resulting integral because its new auxiliary polynomial increased the remainder more than it reduced the polynomial term. Bisection improved a local bound. A later request with unrefined emission evidence produced enormous widths, which were uncertainty intervals rather than enormous measured residuals.

The accepted September result covers only original parents 0–2 at the loose setting, through reception time $0.0030000000000000001$. The remaining 157 parents and both finer settings are not completed by that result. All cited integral lower bounds remain zero. Historical source-generation acceptance is preserved, while a replay against changed live source bindings fails admission; that is not a new numerical disproof of the original enclosure. The [continuous enclosure contract](evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md) and [integral/supremum treatment](evidence/2026-08-27-f6c-residual-integral-supremum-enclosure.md) supply the full conditions for extending the calculation.

### 6.7 Physical interpretations remain downstream

The six-coordinate map admits even/odd sector variables and an exact scalar-plus-directional decomposition with an inverse. It does not establish exactly three dynamical modes: that requires a closed history reconstruction and a return operator. Polar and axial response also require reflection behavior, not rotations alone. A vector reversal under a chart action is not a spinor sign.

A return-count clock, absolute time and synchronized observer time are different constructions. A moving clock must be solved as a moving history; transforming a drawing supplies no dynamical time-dilation result. Likewise, emitted ticks and received ticks require a shared signal account. The candidate's possible clock, particle, neutrino, photon and tensor roles remain recovery targets or explicitly speculative identifications. No stability analysis may begin by linearizing a history that has not been established as a solution.

Literal eight-plus-six capture would require fourteen backreacting members. A weak acceleration on one probe is not collective capture, and six geometric seats do not establish an exclusive survival theorem. Uniform shrinking can reduce all pair distances, so the geometry supplies no singularity barrier. These concrete missing objects are more informative than assigning a physical name to an attractive shape.

## 7. Platonic histories and exact exclusions

### 7.1 A solid, a coloring and a history are different objects

A Platonic vertex set fixes geometry. A polarity word decorates it. A relationship assignment may identify a solid or a comparison structure. A motion rule and a complete history then define a dynamical test. None of these steps is implicit in the preceding one.

The rotating tetrahedron, cube, octahedron, dodecahedron and icosahedron specifications retain every operator and vector as a geometric/display declaration. Their finite decimal carriers are not an unrecorded exact-construction algorithm. The relationship registry's six assigned identities also retain explicit source and qualification limits; an association with a solid does not certify a braid or every unassigned catalog member.

For rigid rotation with axis $\widehat{\mathbf n}$ and rate $\omega$, the required acceleration is

$$
\mathbf A^{\mathrm{req}}=\omega^2\left[\widehat{\mathbf n}(\widehat{\mathbf n}\cdot\mathbf X)-\mathbf X\right].
$$

This is elementary Euclidean kinematics. It supplies a test of the delayed law rather than an imported force law. A complete acceleration component orthogonal to that required direction must vanish. A strict nonzero interval in such a component excludes rigid balance on the tested stratum, irrespective of a positive radius rescaling.

The relevant symmetry is that of the colored history. Under an improper orthogonal map, an angular-velocity axis transforms as an axial vector, including the determinant factor. Global polarity conjugation is a separate operation. Counting a finite collection of stabilizer strata therefore does not count every axis.

### 7.2 Octahedral axes: exact negative strata and open interiors

For the regular octahedron ordered as $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, the retained analysis distinguishes two balanced polarity words. The vertex-axis obstruction follows analytically because selected receiver distances and weights remain constant. Other axis strata require complete delayed sums.

For the word $+++---$ rotating about $(\mathbf e_x-\mathbf e_z)/\sqrt2$, the required acceleration at $+\mathbf e_x$ has no y component, while the certified delayed y component is strictly negative. For the antipodal-alternating word $+-+-+-$, the sum-edge axis $(\mathbf e_x+\mathbf e_z)/\sqrt2$ has a strictly nonzero forbidden x component at the y receiver. Face-diagonal and mixed-face axes have their own strict forbidden projections. These source-certified exclusions retain their scientific domain $0\le\beta<1$ even where the numerical cover used a closed cap at one.

The strict sub-field theorem supplies 30 directed partner roots and no positive-delay self roots for the rigid six-member history. Point comparisons and byte-identical repeats check separate parts of the evidence; neither alone proves continuous coverage. Each exclusion still depends on complete roots, strict factors, outward bounds and the exact required-zero projection.

The generic antipodal-alternating axis quotient is a continuous domain. Its four primitive rays are

$$
(-3,-10,11),\quad(3,-11,10),\quad(1,1,1),\quad(-11,10,3).
$$

Normalized interpolation divides it into two triangular charts. Boundary representatives can duplicate under the colored symmetry and must be joined rather than discarded. A finite scout on edges and triangle samples found no balance, but that alone left between-sample directions unresolved.

The later interval proof closes all five edges, including the shared diagonal, with 9,078 accepted boxes. In each box it fits one common signed rigid scale to representative required directions and shows that at least one of nine residual components excludes zero. Allowing signed scale makes this a necessary-condition screen containing every positive-radius balance; it is not a new physical parameter. Both triangle interiors remain open. Continuity from the excluded edges does not exclude them, and none of these strict-sub-field rigid results addresses arbitrary super-field or non-rigid histories. The [moving-history reduction](analysis/platonic-moving-history-reduction.md) records the separate channel systems and full quotient construction.

### 7.3 The static Stella endpoint is not an equilibrium

The eight Stella members form two interpenetrating tetrahedral sectors. At the stationary release, each receiver has three opposite-polarity partners at distance $1/\sqrt3$, three same-polarity partners at $\sqrt{2/3}$ and one opposite antipode at distance one. Thus there are 56 actual nonself roots. A 64-row ordered-pair account additionally records the eight explicit self exclusions; it does not add eight physical hits.

The independently authored stationary specialization of the same delayed law gives

$$
\mathbf A_i=\frac{\kappa}{R^3}
\left[\frac{3\sqrt6}{8}-\frac{1+3\sqrt3}{4}\right]\mathbf X_i.
$$

At $R=1/2$ and the declared unit normalization, the position coefficient is approximately $-5.04383561706$, giving inward acceleration magnitude approximately $2.52191780853$. The bracket is negative and nonzero. The $R^{-3}$ coefficient multiplies a position of length $R$, so the acceleration magnitude scales as $R^{-2}$; these powers refer to different quantities.

Two exact histories reach the same stationary formula for different reasons. The extended release past is stationary on $[-2,0]$ and is separately checked at depth four. The catalog history is exactly $[0,1]$ at reception one; its eight antipodal roots lie on the retained left boundary zero. Its own endpoint test is needed even though the acceleration agrees with the extended release. The packet's endpoint residual and stored isolating-range representations remain distinguishable evidence fields rather than grounds for silently changing a token.

The catalog prescription requires zero acceleration and fails this complete balance test. This excludes that exact static history. It is not a failed ordinary evolution, an exclusion of all moving Stella histories or a stability result. There is no equilibrium here about which to infer a stability spectrum.

### 7.4 A short release and a geometric packing theorem

The separately released Stella history contracts through $T=0.01$. The fine rung reaches radius $0.49987390781532354$ and radial speed $-0.02521769834861235$, with zero reported center residual and radius spread and only rounding-scale tangential speed. Its 256 complete pair certificates comprise four accepted steps of 64 accounting rows each. The solver refinement comparisons establish a short measured contraction, not independently implemented future evolution, a turn or arrival at the origin.

An initial audit incorrectly interpreted all rows in a step-failure ledger as failed steps. The corrected predeclared interpretation retained the immutable responses and checked accepted status with empty failure codes; no trajectory or threshold changed. That repair belongs to evidence interpretation and must not be described as a physical rescue of the candidate.

Private-cube packing supplies a different exact result. Place cell centers at $2\mathbf k$, $\mathbf k\in\mathbb Z^3$, with vertices $2\mathbf k+s\boldsymbol\epsilon$ for $\boldsymbol\epsilon\in\{-1,+1\}^3$ and $0<s<1$. The minimum solid separation is $2(1-s)$ and the volume fraction is $s^3$. It approaches one as $s\to1^-$ but never attains one with positive separation. At $s=1/2$, separation is one and the volume fraction is $1/8$.

This is a theorem about disjoint geometric solids and privately labeled vertices. It supplies no polarity word, causal history, acceleration balance or cross-cell cancellation. A positive gap is not a dynamical shield. Even a separately qualified isolated component would need every cross-assembly delayed contribution accounted for before an independence or medium claim could follow.

## 8. Wake diagnostics, action and physical interpretation

### 8.1 Exposure, playback and work have different dimensions

A path can produce a measurable exterior wake pattern without carrying a known energy. The delayed root account already distinguishes the signed playback factor $D_r/D_t$ from the dimensionless acceleration weight $c_f/|D_t|$. Neither is automatically an energy-flow coefficient.

A moving receiver permits a conditional work diagnostic once a differentiable kinetic scalar $K(s)$ is declared, where $s=\|\mathbf V\|$. On a chart where $\mu_K(s)=K'(s)/s$ is meaningful,

$$
\frac{dK(s)}{dT}=\mu_K(s)\,\mathbf A\cdot\mathbf V.
$$

At zero speed the declared convention must define the limiting rate. A constant quadratic coefficient can be a bookkeeping proxy; it is not primitive architrino mass. The identity derives from the chosen scalar and the actual receiver's motion, not from an imported mass law. A virtual stationary probe has zero realized work despite a nonzero acceleration response or exposure.

The same-record method accordingly keeps wake exposure, normal transport, squared acceleration exposure, complex spectral coefficients and kinetic-account rates distinct. Signal-processing “power,” meaning a squared coefficient magnitude, is not energy per unit time. A downstream consumer cannot construct an unavailable energy by relabeling a completed diagnostic.

### 8.2 Prescribed drive and a candidate energy balance

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

The branch $\mathfrak B$, regulator $\eta$, endpoint convention and treatment of nontrivial self hits belong to the definition. In particular, the integral crosses from past transmission to future reception. Present path jets and causal acceleration rows do not automatically determine it.

A time-cut charge is also not yet a spatial density. A control-volume account needs an action-derived allocation inside and outside the spatial region, with complementary terms and no double counting between near interaction and wake storage. Under those additional assumptions one may seek a balance of the form

$$
\frac{dE_{\mathrm{inside}}(R,T)}{dT}+\Phi_E^{\mathrm{net}}(R,T)
=P_{\mathrm{drive}}(T)+P_{\mathrm{environment}}(R,T)+\mathcal R_E(R,T).
$$

All terms must share one branch, action, root/history policy, regulator, kinetic convention, spatial partition and environment account. The residual retains incomplete memory, unresolved roots, endpoint terms, Euler mismatch and numerical error. Choosing a different identity or convention for each term does not close the equation. The [same-record energy methodology](contracts/same-record-energy-ledger-methodology.md) develops these obligations without claiming a completed energy measurement.

### 8.3 A local action identity meets a future-boundary obstruction

The common-frequency program attempted a minimal delayed-action provider before asking for action increments or angular-momentum scaling. Its local tail construction has a characteristic derivative identity that can reproduce the desired scalar acceleration dependence. A centered finite-difference check on one small prescribed circular chart passed its frozen error threshold, while all four noncentral direct-scalar controls retained a nonzero unwanted residual. These are bounded implementation checks on the proposed construction, not a retained solution or a universal action theorem.

The next test asks whether the crossing charge can be updated from data available at the time cut. Two receiver continuations share position, velocity and acceleration at the cut but differ by a later cubic displacement. Their crossing-integrand vectors differ by about $0.0070924$, above the declared $0.001$ witness floor. Neither continuation is claimed to solve the EOM. The witness establishes future dependence of this formula under the stated causal-state definition.

The missing object is a separately derived causal wake-state update that reproduces the same charges from available state. The result blocks that attempted provider and its proposed increment screen. It does not prove that every delayed action is impossible, that every possible state extension fails, or that a conserved energy has been derived. The broader restricted no-go for local scalar counterterms remains attached to its own hypotheses and supporting owner.

### 8.4 Wake transport has a useful conservation identity of its own

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

### 8.5 Phase-preserving spectra and exterior information loss

Frequency-resolved cancellation retains a complex coefficient for each tagged source/root contribution, temporal harmonic and angular mode. Its raw magnitude is the sum of the tagged magnitudes; its net magnitude is the magnitude of their complex sum. The ratio is meaningful only above its declared floor. Phase must survive until after superposition.

Fourier-transforming a rectified residual trace is another operation. The absolute value can create harmonics absent from the original signed trace, so those harmonics cannot be called new source-emission frequencies. The retained reducer therefore distinguishes tagged complex spectra from a spectrum of rectified residuals, and reports band coverage, inverse reconstruction and refinement limits. A separately authored two-source control fixes different cancellation ratios at two harmonics; an untagged record cannot supply that test.

An exterior coefficient map can also have a null space. If $\widetilde f=C\widetilde z$, internally different histories can share the same measured exterior coefficients. An action-derived modal charge would require its own kernel on internal variables, with endpoint, core and environment terms, together with an observability statement about $C$. Parseval norms or an assumed identity kernel do not supply that charge. Exterior-dark channels can matter internally even when the observed spectrum cancels.

### 8.6 Far-field approximation is not exact coefficient recovery

A derived angular approximation provides a useful quantitative example. For prescribed $C^3$ paths within radius $a<R$, with uniform speed $\nu<1$ and bounded acceleration and jerk, contraction estimates bound the difference between the finite-radius delayed pattern and its exact far pattern. A second estimate controls replacing delayed velocities by a common-time expansion. Increasing $R$ reduces the first error; it does not automatically reduce the second.

Under neutrality, the common-time approximation contains a vector $\mathbf U=\sum_s q_s\mathbf v_s$ and a trace-free symmetric tensor $\mathbf S=\operatorname{STF}\sum_s q_s\operatorname{sym}(\mathbf x_s\otimes\mathbf a_s)$. Sphere integration gives the exact powers of that approximation,

$$
P_1=\frac{4\pi}{3}\langle\|\mathbf U\|^2\rangle,\qquad
P_2=\frac{8\pi}{15}\langle\|\mathbf S\|_F^2\rangle.
$$

The resulting coefficient $2/5$ belongs to the approximate pattern, not automatically to the exact delayed finite-radius response. A ratio bound additionally needs its denominator amplitude to exceed the error bound. In the retained active sample the theorem-level error intervals were too large to make those ratio bounds informative, despite a strong measured empirical correlation. That is a measured prescribed-path regularity with a derived explanatory mechanism, not an individually error-certified universal coefficient law.

The [causal angular-bound treatment](evidence/2026-07-24-causal-delay-angular-bound.md) retains both errors, the denominator condition and the independent finite audit. Its historical absence of an eligible evolved cohort is an evidence-generation boundary, not a present blanket claim that no evolved history exists anywhere.

### 8.7 Energy fractions need a meaningful reference

Gross outward crossing, net outward transport, outside storage and work delivered to actual recipients are different quantities. Simultaneous inward and outward sectors can give zero net while both gross rates are nonzero. Repeated crossings can make gross transport larger than an initially available amount. A stationary virtual probe does not measure delivery to a moving external receiver.

An arbitrary ratio $E/(E+\epsilon)$ or a denominator shifted by an unexplained energy zero is not a physical loss fraction. If one branch/action supplies a lower bound $E_{\min,\mathfrak B}$, a proposed available-energy denominator is

$$
E_{\mathrm{avail}}(T_0)=E_{\mathrm{braid}}(T_0)-E_{\min,\mathfrak B}>E_{\mathrm{floor}}>0.
$$

It is invariant under a common additive shift of both energies. The absolute lower-bound value need not itself remain unchanged. A depletion fraction additionally requires an unforced realized branch, controlled environment and return, endpoint storage and a converged residual. A transport-loading ratio or a driven-transfer efficiency answers another question and need not be bounded by one in the same way.

### 8.8 From candidate assemblies to effective physics

Common-frequency levels retain continuous radius ratios unless additional accepted equations select them. A pinned dimensionless speed fixes one normalization, not the remaining ratios or a mechanism of pinning. A discrete label does not mean the members are stationary, nor does it imply a transition between labels. Provisional action-unit conventions and adjacent-label spacing are comparison choices until a branch, action charge and exchange history give them physical content.

A proposed population pressure would require admitted interacting histories, a preparation measure, complete microscopic exchange and a full stress tensor. Its trace, deviatoric part, gradients, orientation and shear cannot be replaced by packing density or isolated-record sums. Similarly, a comparison between driven translation and an environmental gradient needs one shared history, clock/ruler/signal account and explicit tidal residuals. Standard fluid, gravitational, quantum and relativistic laws enter here as recovery targets or comparisons, never as substrate inputs.

The retained mining work follows that discipline. Useful geometric, symmetry, action and numerical ideas remain attached to their sources and proof obligations; deferred and rejected leads retain their reasons. In particular, reversing motion order is not a replacement for global polarity conjugation, and an external shielded-condensate mechanism does not become a new primitive requirement. Spin-foam face matching differs from interpenetrating tracks, and a local combinatorial identity does not solve continuum or regularization problems. None of the unread external literature is treated as independently checked evidence.

The scientific picture is therefore concrete but incomplete. Exact circular solutions and scoped exclusions constrain the search; continuous root methods and finite release measurements make the limits of computation explicit; same-record residual and wake methods prevent geometry from being mistaken for retained dynamics or energy. Persistent branches, their neighborhoods, action-derived exchange and effective physical identifications remain distinct questions, each with a precise mathematical object still to supply.
