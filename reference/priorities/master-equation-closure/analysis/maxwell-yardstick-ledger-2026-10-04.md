# Maxwell yardstick ledger: canonical and comparison responses on the regular reference histories

**Status: comparison completed for the histories listed in Section 2; no equation is selected.** On 2026-10-04 the operator selected the first option of the [Maxwell-derived response assessment](maxwell-derived-response-assessment-2026-10-03.md#7-options-and-assessment): keep every authorized equation unchanged and use the electromagnetic point-source response purely as a labeled yardstick. This ledger evaluates, on each existing reference history where the yardstick is defined, what the [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) gives and what the yardstick gives, and records the difference. All numbers use $c_f=1$.

The results are at self-reviewed derived or measured grade as marked, and have not been separately adjudicated. Nothing here changes a registry row, a task status or the [authorized variations](../equation-variants/README.md).

## 1. What is compared, and what the comparison can mean

A *row* is the formula for the acceleration that one arriving hit contributes to the receiver; the equation of motion is that row summed over all admitted hits. Four rows are evaluated on the same prescribed history. Their formulas are derived in [Section 2 of the assessment](maxwell-derived-response-assessment-2026-10-03.md#2-the-three-response-rows).

| Label | Row | Standing |
| --- | --- | --- |
| Canonical | $\sigma K\,\mathbf n/(R^2D)$ | The baseline law |
| G | Gradient of the scalar $1/(RD)$ at the receiver | The amplitude-gradient row, selected only for the regular finite pair; elsewhere it appears here solely as one part of the yardstick |
| E | G plus the velocity-carrying wake term | The complete transmitter part of the yardstick; unselected |
| E+M | E plus the receiver-velocity response | The full yardstick: the observer-level electromagnetic response between two point charges; unselected |

The yardstick is defined only where every transmitter is strictly below the field speed on the whole history, the members are separated, and each partner supplies exactly one ordinary root. On that domain a member has no positive-delay self hit, so no self contribution enters any column.

Two limits on interpretation apply throughout. First, the yardstick is an observer-level law for charged bodies. Whether it should hold between two individual architrinos is exactly what $\mathbb{A}\mathbb{A}\mathbb{A}$ does not assume: the recovery obligation is that assemblies and their surroundings reproduce it, so a difference recorded here is a difference at the pair level, not a failed prediction. Second, the entries are evaluations on prescribed histories. Except where a history is stated to balance, they say nothing about what a system evolved under any of these rows would do.

## 2. Coverage

Identifiers refer to the [geometry configuration registry](../configurations/geometry-configuration-registry.md).

| Registry rows | History | Treatment here |
| --- | --- | --- |
| LAT-1, LAT-7 static part | Checkerboard at rest | Section 3.1 |
| Master Equation Proposition 5 | Pair in common translation | Section 3.2 |
| COL-1 | Collinear mirror pair released from rest, incoming segment | Section 3.3 |
| BIN-1, BIN-7 | Antipodal uniform circle below the field speed | Section 3.4 |
| BRD-12, NEU-2 | Regular alternating rings below the field speed | Section 3.4 |
| BIN-2, BIN-8 | Slow nearly circular pair | Section 3.5, estimate only |
| QRK-2 | Stationary probe near a periodic host | Section 3.6 |
| LAT-2, LAT-3, LAT-4, BIN-5 | Moving lattice branches; campaign grid | In the yardstick's domain but not evaluated. The lattice cases need delayed sums over moving sources under the $1/R$ acceleration term, which is a separate summability problem |
| COL-7, COL-8, BIN-3, BIN-4, BRD-1, BRD-2, BRD-4, BRD-13 to BRD-18, PHO-1, PHO-2, PHO-4 | Histories at or above the field speed | Outside the yardstick's domain. Its rows are undefined where a transmitter factor $D$ reaches zero or changes sign |

## 3. Results

### 3.1 Everything at rest

For a stationary transmitter and a stationary receiver, $\mathbf v=\mathbf a=\mathbf u=0$ and $D=1$, so all four rows reduce to $\sigma K\,\mathbf n/R^2$. The checkerboard at rest is therefore the same exact equilibrium under every column, with the same block summation. **Derived.** The rows differ as soon as members move, so the lattice's linear response is not covered by this statement.

### 3.2 Common translation

The table is in the [assessment](maxwell-derived-response-assessment-2026-10-03.md#common-translation). In summary, the canonical row already gives the yardstick's transverse entry $1/\gamma_f$ exactly, and differs in the longitudinal entry by a term of first order in speed and in the parallel entries by $\pm\beta$ against the yardstick's $-\beta^2$. **Derived.**

### 3.3 Collinear mirror pair

When transmitter and receiver move on one line, write $v_n$ and $a_n$ for the transmitter's velocity and acceleration at emission along the line of action, positive toward the receiver, so that $D=1-v_n$. The rows reduce exactly to

$$
\text{canonical}=\frac{\sigma K}{R^2D},\qquad
\text{G}=\sigma K\left[\frac{1}{R^2D^2}+\frac{a_n}{RD^3}\right],\qquad
\text{E}=\frac{\sigma K\,(1+v_n)}{R^2D},\qquad
\text{M}=0 .
$$

Three consequences follow. **Derived.**

- On a line the yardstick is the canonical row multiplied by $1+v_n$. The $1/D^3$ weight collapses to $1/D$ because $(1-v_n^2)(1-v_n)=D^2(1+v_n)$, and the delayed-acceleration term vanishes identically. The receiver-velocity response also vanishes. Collinear motion is therefore the one geometry in which the yardstick and the canonical law have the same singular structure.
- For an approaching partner, $0\le v_n<1$, so the yardstick's pull is between one and two times the canonical pull. At the adjudicated first arrival at field speed of the released mirror pair, the [interval enclosure](../collinear-research/analysis/stationary-binary-first-interval.md) gives the partner factor $D_{t,\ast}\in[0.52701,0.52841]$; the yardstick-to-canonical ratio there is $2-D_{t,\ast}\in[1.4716,1.4730]$, and the G-to-canonical ratio is at least $1/D_{t,\ast}\ge1.892$.
- The yardstick does not remove the collinear obstruction. Under the E row with the acceleration-first law, each member of a pair released at separation $2a$ has inward acceleration at least $K/(2a)^2$ for as long as the motion stays in the domain, since $R\le2a$ and $(1+v_n)/D\ge1$. Its speed therefore reaches the field speed, or the pair reaches contact, no later than $T=(2a)^2/K$. At that point the yardstick supplies no continuation at all, because its rows are undefined there. This is conditional on a solution existing up to that time, which is **inferred** from the amplitude-gradient local theorem and not proved for the E row.

### 3.4 Uniform circle and regular alternating rings

$M$ members sit equally spaced on a circle of radius $R_0$ with alternating polarity and common speed $\beta<1$. The table gives the leading small-speed tangential acceleration of one member, positive in its direction of motion, in units of $K/R_0^2$.

| Members $M$ | Canonical | G | E and E+M |
| --- | --- | --- | --- |
| 2 | $+\tfrac14\beta$ | $+\tfrac13\beta^3$ | $-\tfrac23\beta^3$ |
| 4 | $+0.750\,\beta$ | $-\tfrac13\beta^3$ | $+\tfrac23\beta^3$ |
| 6 | $+1.583\,\beta$ | $-\tfrac13\beta^3$ | $+\tfrac23\beta^3$ |
| 8 | $+2.750\,\beta$ | $-\tfrac13\beta^3$ | $+\tfrac23\beta^3$ |
| 12 | $+6.083\,\beta$ | $-\tfrac13\beta^3$ | $+\tfrac23\beta^3$ |

The $M=2$ row restates the mirror-circle result. The cubic coefficients for $M\ge4$ are **measured** at $\beta=0.01$ (values $-0.3334$ and $+0.6668$ for $M=6,8,12$; $-0.3330$ and $+0.6662$ for $M=4$) and identified with $\mp\tfrac13$ and $\pm\tfrac23$ without a proof. The receiver-velocity response never contributes tangentially, because it is perpendicular to the receiver's velocity; that part is **derived**.

The $\pm\tfrac23$ values have an independent check from the comparison theory, stated before the evaluation was run. In that theory a rotating pair of opposite charges radiates as a dipole, and the partner's share of the resulting loss is a backward $\tfrac23\beta^3$; an alternating ring with four or more members has no dipole moment, so the partners must instead cancel each member's own radiation loss, which requires a forward $\tfrac23\beta^3$. The evaluation agrees with both. This uses the comparison theory's energy bookkeeping only to predict the yardstick's own numbers.

**The canonical push is the whole discrepancy at low speed.** The canonical tangential term is linear in speed and grows with ring size; the yardstick has no linear term at all. The canonical all-even exclusion of subfield rings rests on exactly this positive term.

**Across the full subfield range the yardstick's tangential residual changes sign for every ring with four or more members.** It is positive at low speed, negative at high speed, and crosses zero once on a grid of step $0.001$. The canonical residual never changes sign, in agreement with its adjudicated theorem, and neither row changes sign for the pair.

| Members $M$ | Zero of the E and E+M tangential residual, $\beta_\ast$ | Radial sum $C_r$ under E+M at $\beta_\ast$ | Balancing radius $R_0=K\lvert C_r\rvert/\beta_\ast^2$ | Radial sum under E alone |
| --- | --- | --- | --- | --- |
| 4 | $0.4291$ | $-0.4713$ | $2.559\,K$ | $-0.3808$ |
| 6 | $0.6034$ | $-0.7273$ | $1.998\,K$ | $-0.4378$ |
| 8 | $0.6891$ | $-0.9944$ | $2.094\,K$ | $-0.4528$ |
| 10 | $0.7406$ | $-1.2665$ | $2.309\,K$ | $-0.4313$ |
| 12 | $0.7754$ | $-1.5413$ | $2.563\,K$ | $-0.3762$ |
| 24 | $0.8666$ | $-3.2154$ | $4.282\,K$ | $+0.5690$ |

At $\beta_\ast$ the tangential acceleration vanishes and the radial acceleration is inward, so choosing the radius in the fourth column makes the received acceleration equal the centripetal acceleration $\beta_\ast^2/R_0$ of the prescribed motion. By the ring's symmetry the same holds for every member. Under the full yardstick, a regular alternating ring with at least four members therefore has an exact, complete, strictly subfield circular history at one speed, with no self hits. Under E alone the same holds for $M=4$ to $12$ at a different radius, and fails at $M=24$, where the radial sum is outward. **Measured** by floating-point evaluation with a bracketed sign change; the existence of the zero then follows from continuity of the rows in $\beta$ on the subfield domain. No interval enclosure has been computed and no stability calculation has been made.

This is the sharpest contrast in the ledger. The canonical law excludes every subfield ring and balances rings only above the field speed, where self hits supply the missing term. The yardstick balances rings below the field speed with no self hits. That balance is not standard electrodynamics either: the comparison theory adds a self term representing each body's own radiation loss, which the positive-delay admission rule excludes here.

**By-product outside its selected scope.** The G column alone also changes sign on rings, with zeros at $\beta\approx0.353$, $0.511$, $0.596$, $0.651$, $0.691$ and $0.803$ for $M=4,6,8,10,12,24$ and inward radial sums there. The amplitude-gradient investigation is selected for the regular finite pair only, so this is recorded as an observation about one part of the yardstick, not as an amplitude-gradient ring result.

### 3.5 Slow nearly circular pair

No coupled evolution was computed. A leading-order estimate is available from slow change of the product $R_0v$ under the tangential term, using the low-speed circular relation $v^2=K/(4R_0)$ that all four rows share. The estimate was first applied to its two known cases, where it reproduces the independently adjudicated rates.

| Row | Leading tangential term | Estimated slow drift | Adjudicated result |
| --- | --- | --- | --- |
| Canonical | $+K\beta/(4R_0^2)$ | $d(R_0^2)/dT=+K$ | Squared radius grows at rate $K/c_f$ (BIN-2) |
| G | $+K\beta^3/(3R_0^2)$ | $d(R_0^3)/dT=+K^2/2$ | Cubic-radius drift $K^2/(2c_f^3)$ (BIN-8) |
| E and E+M | $-2K\beta^3/(3R_0^2)$ | $d(R_0^3)/dT=-K^2$ | None |

Under the yardstick the slow pair would contract, at twice the amplitude-gradient rate and with the opposite sign, where the canonical and amplitude-gradient laws expand. As it contracts it speeds up, and the estimate ceases to apply well before the field speed. **Inferred**; a controlled statement needs the same kind of remainder analysis that the two adjudicated cases received.

### 3.6 Stationary probe near a periodic host

For a probe at rest at a point with positive clearance from a periodic, strictly subfield host, the average over one host period of the canonical row, the G row and the E row are all equal, and equal to the static inverse-square pull of the host's time-averaged distribution:

$$
\big\langle\mathbf A\big\rangle=\frac{\sigma K}{P}\int_0^P\frac{\mathbf x-\mathbf X_j(S)}{\|\mathbf x-\mathbf X_j(S)\|^3}\,dS .
$$

For the canonical row this follows by changing the averaging variable from reception time to emission time, since $dT=D\,dS$ on the one-root chart cancels the weight $1/D$. For G, the same change of variable shows that the average of $1/(RD)$ is the average of the instantaneous $1/\|\mathbf x-\mathbf X_j(S)\|$, and the gradient commutes with the average. The extra term in E is a time derivative of a periodic quantity at a fixed point and averages to zero. The receiver-velocity response vanishes for a probe at rest. **Derived**, and checked numerically to $5\times10^{-16}$ on a two-member host whose instantaneous canonical and E rows differ by $0.26$.

The yardstick and the canonical law therefore agree exactly on everything a slow, heavy probe would sense on average near a bound periodic assembly. The existing conclusion that the cycle average offers no point restoring in every direction holds for all four columns.

### 3.7 Isolating transmitter and receiver changes on identical histories

Sections 7 and 8 of the [variation manuscript](../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response) define the two comparison kernels: the complete transmitter response $\mathbf E=\mathbf G+\mathbf W$ and that same response plus $\mathbf M=\mathbf n(\mathbf u\cdot\mathbf E)-(\mathbf u\cdot\mathbf n)\mathbf E$. This section compares them at identical positions, reception times, receiver velocities and complete source histories. Each source is uniformly subfield, each sampled root is ordinary, and $c_f=K=1$. No ceiling response, radiation self term, finite reception width or trajectory integration is added. The standard-physics structure is a labeled comparison, not a canonical substrate premise.

**The receiver contribution changes direction while preserving instantaneous speed input.** For the same prescribed history the acceleration difference is $\sigma K\mathbf M$, and

$$
\mathbf u\cdot\big(\mathbf A^{E+M}-\mathbf A^E\big)
=\sigma K\big[(\mathbf u\cdot\mathbf n)(\mathbf u\cdot\mathbf E)
-(\mathbf u\cdot\mathbf n)(\mathbf u\cdot\mathbf E)\big]=0.
$$

This identity is derived, including after summing over sources. It is a statement about $d\|\mathbf u\|^2/dT=2\mathbf u\cdot\mathbf A$ at the same state, not a physical energy account. On actual evolutions the extra turning changes positions and sampled roots, which can change subsequent transmitter input and speed. Consequently identical instantaneous speed derivatives do not imply identical future speeds or stability.

For a stationary receiver $\mathbf M=0$. For collinear source motion and collinear receiver velocity, $\mathbf E$, $\mathbf n$ and $\mathbf u$ lie on the same line and the two terms defining $\mathbf M$ cancel, even when the source accelerates. For planar circular reception, $\mathbf u=\beta\hat{\mathbf e}_\theta$ and the source response lies in that plane. Thus $\mathbf M$ is purely radial, so the tangential components of E and E+M are identical at every speed in the regular domain. These are exact derived statements, not small-speed approximations.

For common translation with transverse separation $d$, let $\mathbf b=\beta\hat{\mathbf e}_x$, the receiver be at $d\hat{\mathbf e}_y$ at $T=0$, and the source pass through the origin. Define $\gamma_f=(1-\beta^2)^{-1/2}$. The delayed root has $R=\gamma_f d$, $\mathbf n=(\beta,\sqrt{1-\beta^2},0)$ and $D=1-\beta^2$. Substitution gives

$$
\mathbf A^E=\frac{\sigma K}{d^2}\gamma_f\hat{\mathbf e}_y,
\qquad
\mathbf A^{E+M}=\frac{\sigma K}{d^2}\sqrt{1-\beta^2}\hat{\mathbf e}_y.
$$

The receiver contribution reduces this transverse response by the factor $1-\beta^2$. For parallel separation it vanishes. At $\beta=0.6$, $d=K=1$ and positive $\sigma$, the transverse E and E+M accelerations are $1.25$ and $0.80$; the leading parallel accelerations are both $+0.64$, and the trailing parallel accelerations are both $-0.64$. The canonical transverse response is $(0.60,0.80,0)$: removing its longitudinal residual comes from changing the transmitter response; adjusting the transverse magnitude comes from M. These numerical evaluations reproduce the derived formulas in Section 3.2.

For the opposite-polarity antipodal circle of radius one, the following measured values separate the contributions. Radial is positive outward; tangential is positive along the receiver's motion. Both E columns use exactly the same prescribed circle and emission root.

| Speed $\beta$ | Canonical tangential | E tangential = E+M tangential | E radial | M radial | E+M radial |
| --- | ---: | ---: | ---: | ---: | ---: |
| 0.02 | +0.004998668 | −0.000005327 | −0.249850175 | −0.000100020 | −0.249950195 |
| 0.10 | +0.024836114 | −0.000648492 | −0.246356520 | −0.002511864 | −0.248868384 |
| 0.50 | +0.110211835 | −0.048810236 | −0.196872752 | −0.064806273 | −0.261679025 |
| 0.90 | +0.171173686 | −0.149873514 | −0.166385717 | −0.199426957 | −0.365812674 |

The low-speed cancellation of the canonical linear push, and the backward cubic residual that replaces it, therefore belong to E, not M. Adding M strengthens inward input at these sampled speeds without correcting the circular tangential imbalance. This does not establish a contracting coupled pair: the source acceleration in these evaluations is prescribed centripetal acceleration, not acceleration obtained by solving either candidate equation.

On the regular alternating rings already covered in Section 3.4, the tangential zero is shared by E and E+M. The receiver term changes radial feasibility and the required radius. The new potential-derivative instrument independently checks both terms at the two illustrative zeros:

| Members | Measured zero speed | E radial | M radial | E+M radial | Circular balance radius under E | Circular balance radius under E+M |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 4 | 0.429117162 | −0.380775024 | −0.090481956 | −0.471256980 | $2.067839K$ | $2.559211K$ |
| 24 | 0.866589575 | +0.568972590 | −3.784404052 | −3.215431462 | No positive radius at this zero | $4.281662K$ |

These are floating-point candidate balances, not certified root enclosures or stability results. Scaling follows because the circular source acceleration scales as $\beta^2/R_0$, so the whole response scales as $K/R_0^2$; the centripetal requirement is $-\beta^2/R_0$. An inward radial coefficient $C_r$ therefore requires $R_0=-KC_r/\beta^2$. The 24-member case illustrates a structural role for receiver-dependent turning that the two-member circle cannot demonstrate. It also retains the missing radiation self account discussed in Section 3.4.

As a nonsymmetric control, the source history is $\mathbf X(S)=(0.9\cos(0.6S),0.9\sin(0.6S),0.2\sin(0.3S))$, with speed bounded by $0.55$. At $\mathbf x=(2.3,-1.1,0.7)$, $T=0.4$ and $\mathbf u=(0.2,0.3,-0.1)$, the measured E and M kernels are $(0.352740628,-0.453695539,0.082307855)$ and $(-0.095581011,0.051593036,-0.036382915)$. The receiver velocity dotted with M cancels as predicted. Setting the receiver at rest at the same reception event removes M exactly while preserving E. This checks that the circular conclusion is not being inferred from a symmetry-only instrument.

The three path-speed regimes remain distinct. These calculations inhabit a uniformly subfield subset. They also describe that subset of unrestricted or inclusive-ceiling proposals, but establish no equality event, ceiling enforcement or superfield extension. No result at $\beta=0.9$ is a limiting theorem at $\beta=1$.

**Evidence and falsifiers.** The [reproducible instrument](../evidence/maxwell-transmitter-receiver-controls.mjs) evaluates the fixed manuscript formulas, and independently differentiates $\Psi$ and $\Psi\mathbf v$ to obtain E and $\mathbf u\times\nabla\times(\Psi\mathbf v)$ to obtain M. The comparison identity between the curl and $\mathbf n\times\mathbf E$ comes from the [Maxwell point-source solution](https://www.feynmanlectures.caltech.edu/II_21.html); it is used only to validate the comparison kernel. Stationary and affine exact known cases passed before targets, with maximum error below $3\times10^{-13}$. The [measurement receipt](../evidence/maxwell-transmitter-receiver-controls.json) records three differentiation step sizes for the pair and generic cases and the per-source derivative check at each tabulated ring zero. Maximum discrepancy is below $4\times10^{-12}$ for the pair/generic cases and below $5\times10^{-11}$ at the ring endpoints. These are measured finite-difference checks, not rigorous error bounds or independent adjudication of coupled dynamics. A nonzero circular tangential M, nonzero collinear M, failed potential-derivative agreement, or an outward full radial sum at the stated ring zero overturns the corresponding result.

## 4. Reading the ledger

The ledger separates what the canonical law already has in common with the yardstick from what organized structure would have to supply.

**Already in common, exactly.** Everything static. The cycle-averaged pull of any periodic subfield assembly on a body at rest. The transverse interaction of two members in common translation. The singular structure of collinear approach.

**Different, and of first order in speed.** The longitudinal term in common translation and the forward tangential push on every circle and ring. Both come from one source: a canonical hit points away from where the transmitter was, and the yardstick points away from where a uniformly moving transmitter now is. The receiver-velocity response, which is the magnetic part proper, enters at second order for slow regular circular or affine histories and adds no direct instantaneous speed input. Subsequent turning can change the future trajectory and transmitter input.

**What this implies for recovery.** If magnetic behavior is to emerge at the assembly level, the first thing the assembly and its surroundings must do is cancel the first-order line-of-action term on time scales short of a cycle, since the cycle average already agrees. The ledger does not show that they do. It does show that the obligation is narrower than "produce a magnetic field": it is to remove an instantaneous first-order term whose period average is already correct. **Inferred** from the entries above.

**What this does not imply.** The subfield ring balance in Section 3.4 is a property of the yardstick used as a law. It does not suggest that such rings exist under the canonical equation, and it is not evidence for adopting the yardstick; under the acceleration-first law the same row still drives the collinear pair to the field speed in finite time and is undefined beyond it.

## 5. Falsifiers

- A static configuration on which any two columns differ overturns Section 3.1.
- A collinear evaluation in which the E row is not $1+v_n$ times the canonical row, or in which the delayed-acceleration term is nonzero, overturns Section 3.3.
- For $M\ge4$, a small-speed E coefficient different from $+\tfrac23$, or a G coefficient different from $-\tfrac13$, overturns the tabulated identification.
- An interval-arithmetic evaluation showing that the E tangential residual keeps one sign on $0<\beta<1$ for some $4\le M\le24$ in the table overturns the ring balance for that $M$.
- A periodic strictly subfield host and a stationary probe with positive clearance for which two of the three cycle averages differ overturns Section 3.6.

## Development and validation record

Three Node scripts under `.tmp/maxwell-variation/` produced the numbers. `check.mjs` is the finite-difference instrument recorded in the assessment, which validates the closed-form rows against numerically differentiated wake quantities after its known cases. `ledger.mjs` adds the ring sum. Its known cases were run before its targets and passed: the canonical radial sum at $\beta=10^{-6}$ equals the adjudicated $C_r(0;M)=\tfrac14\sum_j(-1)^j\csc(j\pi/M)$ to eight decimals for $M=2,4,6,8,12$; the $M=2$ values reproduce the earlier mirror-circle evaluation; and the canonical tangential sum is positive and at least the binary value on a sample grid, as its adjudicated theorem requires. `ledger2.mjs` cross-checks the summed E row on rings against finite differences of the summed wake quantities at four points (agreement to eight decimals), locates the zeros by bisection, and evaluates the probe average. The first probe test used two opposite members on one circle, whose averages cancel identically and so tested nothing; it was replaced by a host with members on different radii. `collinear.mjs` confirms the two collinear reductions at one accelerated sample point.

The slow-drift estimate in Section 3.5 is an algebraic calculation with no instrument; its two known cases are the adjudicated BIN-2 and BIN-8 rates.

All evaluations are double-precision floating point on prescribed histories. They are measured checks of row algebra and of sign changes. They establish no coupled evolution, stability property, secular fate or physical account.
