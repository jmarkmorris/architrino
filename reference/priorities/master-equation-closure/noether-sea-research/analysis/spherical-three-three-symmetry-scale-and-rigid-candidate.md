# Scaling and rigid triangular-antiprism conditions on a sphere

## Status and scope

This companion completes the symmetry worker's second bounded analytical slice for the [spherical 3:3 campaign](spherical-three-three-overnight-research-plan.md). Its results are derived and self-reviewed, pending independent adjudication. It preserves the [first frozen symmetry report](spherical-three-three-symmetry.md) without alteration. The canonical [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) and the selected normal sphere constraint are the only dynamical premises. No numerical survey, new instrument, evolved numerical trajectory, tangential support, energy postulate or physical confinement mechanism is introduced.

Two conclusions follow. First, fixed wake speed and fixed coupling prevent a generic moving constrained solution from being rescaled to another radius; a precise stationary/geodesic exception survives because the constraint can absorb changed radial acceleration. Second, the rigid polarity-segregated triangular antiprism at nonzero latitude cannot satisfy the normal-only constrained equation on an ordinary complete root chart. Its canonical latitude acceleration has the opposite sign from the latitude acceleration required to maintain the rotating circles. This is a specific candidate exclusion, not a global exclusion of six-member surface motion.

## General scaling of complete histories

Let $\mathbf X_i(T)$ be a complete history on a sphere of radius $R$, let $c_f>0$ be wake speed and let $K_{\mathrm{int}}=\kappa q^2>0$ be the common coupling magnitude. For positive constants $a,b,k$, define a comparison history and comparison parameters by

$$
\mathbf Y_i(t)=a\mathbf X_i(t/b),
\qquad R'=aR,
\qquad c_f'=\frac ab c_f,
\qquad K_{\mathrm{int}}'=kK_{\mathrm{int}}.
$$

The time $t=bT$ corresponds to the original time $T$, and an emission $s=bS$ corresponds to $S$. Velocities and accelerations transform as $\dot{\mathbf Y}_i=(a/b)\mathbf V_i$ and $\ddot{\mathbf Y}_i=(a/b^2)\ddot{\mathbf X}_i$. Distances multiply by $a$. The causal equation transforms exactly:

$$
|\mathbf Y_i(bT)-\mathbf Y_j(bS)|=a|\mathbf X_i(T)-\mathbf X_j(S)|
=c_f'\,b(T-S).
$$

Thus every positive-delay partner or self root corresponds bijectively, with its ordering and multiplicity preserved. Transmitter and receiver factors both multiply by $a/b$, so the transmitter weight $c_f/|D_t|$ is unchanged and a simple root remains simple. These statements compare the complete admitted root sets; they do not create a continuation through an inadmissible singularity.

The canonical acceleration and speed consequently obey

$$
\mathbf A_i'[\mathbf Y](bT)=\frac{k}{a^2}\mathbf A_i[\mathbf X](T),
\qquad s_i'(bT)=\frac ab s_i(T).
$$

The acceleration covariance needed for a generic solution is therefore

$$
\boxed{K_{\mathrm{int}}'=\frac{a^3}{b^2}K_{\mathrm{int}}.}
$$

This is a comparison between equations with transformed parameters, not authority to change the campaign's constants. With this choice, normal support transforms as $\lambda_i'=(a/b^2)\lambda_i$ and the entire vector equation transforms by the common factor $a/b^2$.

## Full residual with normal support

For any twice-differentiable prescribed sphere history with tangent velocity, let $\mathbf n_i=\mathbf X_i/R$ and $P_i=I-\mathbf n_i\mathbf n_i^{\mathsf T}$ be projection into its tangent plane. The support fixed by the sphere identity is $\lambda_i=-s_i^2/R-\mathbf n_i\cdot\mathbf A_i$. Define the full constrained residual by

$$
\mathbf F_i=\ddot{\mathbf X}_i-\mathbf A_i-\lambda_i\mathbf n_i
=P_i(\ddot{\mathbf X}_i-\mathbf A_i).
$$

The equality follows from $\mathbf n_i\cdot\ddot{\mathbf X}_i=-s_i^2/R$; this projection removes only the radial component that the authorized support supplies. Both tangent components remain and must vanish for a solution. Under the complete-history scaling above,

$$
\lambda_i'=-\frac{a}{b^2}\frac{s_i^2}{R}-\frac{k}{a^2}\mathbf n_i\cdot\mathbf A_i,
\qquad
\boxed{\mathbf F_i'=\frac{a}{b^2}\mathbf F_i+
\left(\frac{a}{b^2}-\frac{k}{a^2}\right)P_i\mathbf A_i.}
$$

These equations distinguish a reparameterized curve from a solution: rescaling a plotted path always produces another sphere path, while a nonzero transformed residual records its dynamical failure. The special coupling transformation makes every residual scale uniformly, including nonzero residuals, and maps exact constrained solutions to exact constrained solutions on corresponding admitted charts.

### Fixed coupling and fixed wake speed

At fixed $c_f$, preservation of a corresponding root of positive delay requires $a=b$. This is immediate from $ar_{ij}=c_f b(T-S)$ and the original $r_{ij}=c_f(T-S)>0$. Root-free degenerate histories would not supply this inference; the distinct complete spherical partner histories considered here have partner roots. All numerical use has $c_f=1$.

With fixed coupling as well, $k=1$ and $b=a$, so

$$
s_i'=s_i,
\qquad
\mathbf A_i'=\frac1{a^2}\mathbf A_i,
\qquad
\mathbf F_i'=\frac1a\mathbf F_i+\frac{a-1}{a^2}P_i\mathbf A_i.
$$

An original exact normal-constrained solution therefore survives a nontrivial scaling $a\ne1$ if and only if $P_i\mathbf A_i=0$ for every member and every time being claimed. The original equation then also requires $P_i\ddot{\mathbf X}_i=0$. A moving member follows a constant-speed great circle, and a resting member stays fixed, as follows from the sphere equation $\ddot{\mathbf X}_i=-(s_i^2/R)\mathbf n_i$ and $d(s_i^2)/dT=0$. This is a conditional exception: a generic great-circle prescription does not ensure that its canonical tangent acceleration vanishes.

The exception is not empty. Six stationary alternating-polarity vertices of a regular hexagon on a great circle have purely radial canonical acceleration. Reflection in the plane and reflection in each vertex's radial axis cancel the two other components of the stationary source sum. Their partner roots are their positive chord distances divided by $c_f$, their weights are one, and their self-root sets are empty. At any radius, normal support $\lambda_i=-\mathbf n_i\cdot\mathbf A_i$ supplies an exact stationary constrained solution. This is an externally supported zero-speed family, not a free assembly or evidence for the hypothesized nonzero-speed energy levels.

The often tempting choice $b=a^{3/2}$ matches inverse-square acceleration scaling at fixed coupling but would require $c_f'=c_f/\sqrt a$ to preserve corresponding causal roots. It is therefore not a scaling symmetry with fixed wake speed. Choosing it while leaving $c_f=1$ changes which past emissions arrive and invalidates the inherited root ledger. An unrelated isolated scaled curve might still solve the new equations after complete reevaluation; this derivation excludes a generic root-preserving symmetry, not every coincidental solution family.

**Falsifier and checking scope.** Any claimed generic scaling at fixed constants must satisfy the explicit root equation and transformed residual above. A nonzero $P_i\mathbf A_i$ at one time disproves nontrivial root-preserving rescaling of that exact solution. A counterexample to the stationary/geodesic exception would need to violate one of these algebraic identities while maintaining their assumptions.

## Dimensionless equation and the missing energy map

Set $\tau=c_fT/R$ and $\mathbf x_i(\tau)=\mathbf X_i(T)/R$. A prime here denotes differentiation with respect to $\tau$. The complete root equation becomes $|\mathbf x_i(\tau)-\mathbf x_j(\theta)|=\tau-\theta$, with all positive-delay roots in $(0,2]$. Define the dimensionless canonical sum $\mathbf B_i$ using the same signed vector kernel and weight, but unit radius and unit wake speed. Then

$$
\mathbf x_i''=g\mathbf B_i+\ell_i\mathbf x_i,
\qquad
g=\frac{K_{\mathrm{int}}}{Rc_f^2},
\qquad
\ell_i=\frac{R\lambda_i}{c_f^2}
=-|\mathbf x_i'|^2-g\mathbf x_i\cdot\mathbf B_i.
$$

The dimensionless initial speed is $\beta_i=|\mathbf x_i'|=s_i/c_f$. The interaction parameter $g$, the full dimensionless history and its initial tangent velocities specify this constrained problem; a pair $(g,\beta)$ alone omits shape and history. Fixed constants and a radius dilation give $g'=g/a$ even though a root-preserving time dilation keeps $\beta$ unchanged. This is the dimensionless reason that a generic solution fails to scale.

The live [Energy chapter](../../../../../content/markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) leaves both the universal kinetic scalar and complete conserved history account unresolved. Dimensional analysis supplies the length scale $K_{\mathrm{int}}/c_f^2$, but no physical energy normalization or conserved scalar follows from it. A curve labeled by energy requires an accepted account $\mathcal E$ evaluated on the same constrained history, including whatever boundary/support bookkeeping its definition requires. Zero radial acceleration power alone does not construct that account.

Suppose a future exact branch, with its remaining shape and history variables fixed by a declared rule, yields a dynamical relation $C(g,\beta)=0$ and an accepted energy value $\mathcal E(g,\beta)$. A specified value $E_0$ could locally isolate a radius and speed only after solving both $C=0$ and $\mathcal E=E_0$. For differentiable independent scalar equations, a nonzero Jacobian determinant $\det\partial(C,\mathcal E)/\partial(g,\beta)$ is a sufficient local isolation condition. Then $R=K_{\mathrm{int}}/(gc_f^2)$ and $s=c_f\beta$. If additional shape or history parameters survive, further branch-selection relations are needed. This is a conditional mathematical route; no such energy map or unique branch is supplied here. Constant total energy would not by itself imply constant individual speeds when history contributions exchange with the kinetic account.

## Rigid neutral triangular-antiprism candidate

This is a separate prescribed all-time candidate, not an alteration of the prepared release in the frozen report. Choose $0<h<1$, $\rho=\sqrt{1-h^2}$ and constant angular rate $\Omega$. For $k=0,1,2$, prescribe

$$
\mathbf X_{+,k}(T)=R\big(\rho\cos(\Omega T+2\pi k/3),\rho\sin(\Omega T+2\pi k/3),h\big),
\qquad
\mathbf X_{-,k}(T)=-\mathbf X_{+,k}(T).
$$

The upper ring has one polarity and latitude $\alpha=\arcsin h$; the lower ring has the opposite polarity and latitude $-\alpha$. Their latitudes have equal magnitude, not equal signed value. The lower triangle is staggered by $\pi/3$ modulo its threefold symmetry. All six prescribed speeds are the same constant $s=R|\Omega|\rho$. Rotation by $2\pi/3$ with the cyclic label permutation and inversion with global polarity conjugation fix every time slice of the complete history. In addition, time translation by $u$ equals spatial rotation by $\Omega u$. Constant speed follows from this stronger continuous spacetime symmetry of the prescription; it does not establish that the prescribed path satisfies the equation.

### Root equation and full tangent conditions

At reception choose the upper representative at azimuth zero. Set $\omega=\Omega R/c_f$ and $u=c_f(T-S)/R$. Let $\eta=+1$ denote a same-polarity upper source and $\eta=-1$ an opposite-polarity lower source. Its emission azimuth relative to the receiver is

$$
\delta_{\eta k}(u)=\frac{2\pi k}{3}+\frac{1-\eta}{2}\pi-\omega u.
$$

Every admitted positive-delay root is a solution in $0<u\le2$ of

$$
u^2=2\rho^2[1-\cos\delta_{\eta k}(u)]+(1-\eta)^2h^2,
\qquad
W_{\eta k}(u)=\frac1{|1+\omega\rho^2\sin\delta_{\eta k}(u)/u|}.
$$

The same-ring $k=0$ source is the receiver's own history; its positive roots are included, while $u=0$ is not an admitted ordinary hit. Every simple-root weight is strictly positive. A zero denominator leaves the ordinary chart rather than supplying a finite contribution. The geometric bound does not by itself guarantee finite root count or a convergent sum, so the following statement requires a complete admitted finite or convergent ordinary ledger.

With the unit latitude tangent $\mathbf e_\alpha=(-h,0,\rho)$, the azimuthal tangent $\mathbf e_\phi=(0,1,0)$ and the dimensionless acceleration $\mathbf B=R^2\mathbf A/K_{\mathrm{int}}$, direct projection gives

$$
B_\alpha=h\rho\sum_{\eta,k,u}\frac{(\eta\cos\delta_{\eta k}-1)W_{\eta k}}{u^3},
\qquad
B_\phi=-\rho\sum_{\eta,k,u}\frac{\eta\sin\delta_{\eta k}W_{\eta k}}{u^3},
$$

and

$$
B_n=\sum_{\eta,k,u}\frac{\eta[\rho^2(1-\cos\delta_{\eta k})+(1-\eta)h^2]W_{\eta k}}{u^3}.
$$

Each sum runs over the full positive root ledger just specified. The necessary and sufficient tangent conditions for this prescribed rigid history, on that admitted chart, are

$$
\boxed{gB_\alpha=\omega^2h\rho,\qquad gB_\phi=0,}
\qquad
\ell=-\omega^2\rho^2-gB_n.
$$

The first right-hand side is positive for nonzero rotation: the inward acceleration toward the rotation axis has a component toward increasing latitude on the sphere. Normal support cannot supply that tangent component. The second condition tests speed support, and the formula for $\ell$ accounts for all remaining radial support. Checking only $B_\phi=0$ would miss the first, decisive condition.

### Exact sign obstruction

For every source and every root, $\eta\cos\delta-1\le0$. The prefactor $h\rho$ and every admitted weight are positive. Every same-ring positive-delay hit has $\cos\delta<1$, since $\cos\delta=1$ would give zero separation within that ring and hence $u=0$. Consequently each same-ring admitted hit is strictly negative in latitude projection. At least one partner same-ring root exists for the distinct complete histories: its root function $u-d(u)$ starts negative at $u=0$ and is nonnegative at $u=2\rho$, because the distance between points on that circle is at most $2\rho$. If any required root is non-simple or otherwise inadmissible, the ordinary-chart claim stops there.

Thus a complete ordinary root chart satisfies $B_\alpha<0$. This contradicts $gB_\alpha=\omega^2h\rho\ge0$ for every $g>0$, including zero rotation. The non-equatorial rigid antiprism is therefore excluded as a normal-only constrained solution for all angular rates for which the stated complete ordinary ledger exists. The exclusion is independent of root multiplicity and of whether member speed is above or below wake speed; it relies on positivity of each admitted canonical weight, not on a one-root approximation.

The sign argument actually extends to complete histories confined to the same two fixed latitude circles with the same polarity segregation, even when azimuthal rates vary between members or in time. For a receiver that stays on its latitude circle, the required latitude component is $R h\rho\dot\phi_i^2\ge0$; the same chord projections remain nonpositive and a distinct same-ring partner gives a strictly negative contribution on an ordinary complete chart. This extension does not concern variable latitudes, mixed polarities within a latitude ring, precessing axes, additional tangential support or other spherical patterns.

At the equator $h=0$, the latitude obstruction vanishes identically. The six sites become an alternating great-circle ring, and the remaining rigid condition is $B_\phi=0$, with radial support given above. Whether any particular rotating equatorial history satisfies that complete condition is not decided here. The pole limit $\rho=0$ collapses the three sites on each ring and is outside the distinct-site candidate. A root singularity is an admission limitation, not a counterexample to the sign theorem or proof of physical fate.

**Falsifier and checking scope.** Reconstructing one admitted hit with positive latitude contribution under these exact latitude, polarity and kernel assumptions would refute the sign lemma. Alternatively, a complete non-equatorial rigid candidate satisfying both tangent residuals would refute the exclusion. The displayed root, weight and projection formulas make both checks explicit. No claim is made about arbitrary scrambled paths or about free physical stability.

## Evidence and handoff

The analytical instruments are direct substitution into the causal-root equation, vector projection and the smooth scalar root intermediate-value argument. No numerical instrument was authored or run, so no numerical control pass or timing is claimed. The stationary alternating hexagon supplies an exact scaling exception; the nonzero tangent residual supplies the negative condition that a proposed generic scaling must fail. Independent derivation by the campaign reviewer is the next dependency.

Before this slice, `shasum -a 256` measured the frozen first report as `ef75a6c34bba1e802433a5155e154d249959cb55f966bc7ebea99a538a6a3a51`. That report is not an edit target. This companion is the only file authored in this slice; the coordinator retains ownership of synthesis and trackers. The retained formulas and source links are the complete small evidence artifact. There are no bulky outputs, compute jobs, new leases or costly numerical reruns. Energy identification remains blocked by the missing accepted history-energy functional and branch selection; the geometric and scaling results do not depend on resolving it. Work on this assigned analytical slice is complete pending review, with the worker available for bounded corrections.

At the completed-slice checkpoint, `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry-scale-and-rigid-candidate.md` emitted no whitespace diagnostics (exit 1 records the file difference). Explicit `ls` and `rg` confirmed the linked source files and section headings. A second `shasum -a 256` returned the same frozen first-report identity. These scoped checks establish document hygiene and preservation only; independent mathematical adjudication remains outstanding.
