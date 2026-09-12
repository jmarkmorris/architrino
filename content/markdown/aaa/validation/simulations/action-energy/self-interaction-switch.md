# Self-interaction switch

An [architrino](../../../foundations/architrino.md) is a pointlike carrier of positive or negative polarity with no physical mass property. Its causal wake is a continuous family of spherical surfaces, each expanding from the position where it was emitted. A self-hit occurs geometrically when an earlier surface reaches the same architrino. The self-interaction switch denotes whether such roots contribute to the [Master Equation](../../../dynamics/master-equation.md#self-hit-regime), which sums their acceleration contributions. It is a test of retained history and branch conditions, not an additional primitive switch controlled by current speed.

## Conditions and Effects

### Geometric Roots and the Speed Condition

Let $\mathbf X_a(T)$ be architrino $a$'s path in the Euclidean void, the fixed three-dimensional space, parametrized by absolute time $T$, the common time parameter. Write $T_t$ for emission time, $T_r$ for reception time, and $c_f>0$ for the fixed wake speed. The same-transmitter root set is

$$
\mathcal{C}_{aa}(T_r)=\{\,T_t<T_r:\|\mathbf X_a(T_r)-\mathbf X_a(T_t)\|=c_f(T_r-T_t)\,\}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-5c21f41edba4512c)

The equality says that the distance from the emission position equals the wake's expansion distance. A numerical search restricts this set to its declared retained history; an empty search result does not exclude roots in omitted history. Multiple roots are distinct emission times at the same reception event and must be accounted for separately.

For a continuously differentiable path, a simple positive-delay self-root requires speed greater than $c_f$ somewhere between emission and reception. A root is simple when changing emission time crosses the root condition with nonzero derivative. The reason for the speed restriction is that chord length cannot exceed path length. If speed never exceeds $c_f$ on that interval, the root equality forces chord length, path length, and $c_f(T_r-T_t)$ to be equal. This requires straight motion at exactly $c_f$, giving a nonisolated family of roots with zero transmitter derivative. It is not an ordinary simple branch. The [delay-geometry derivation](causal-set-and-delay-geometry.md#field-speed-and-super-field-speed-multiplicity) gives the full argument.

Exceeding $c_f$ is insufficient: in normalized wake-speed units $c_f=1$, the prescribed path $\mathbf X_a(T)=(-2T,0,0)$ has separation $2\Delta$ at delay $\Delta=T_r-T_t>0$, so it never satisfies the required separation $\Delta$. Conversely, [straight variable-speed history](../../../dynamics/master-equation.md#self-hit-condition) can have simple self-roots; curvature is unnecessary, and the current receiver speed need not exceed $c_f$.

### Regular Acceleration Contributions

At positive separation define $\mathbf r=\mathbf X_a(T_r)-\mathbf X_a(T_t)$, $r=\|\mathbf r\|$, and $\hat{\mathbf r}=\mathbf r/r$. With reception fixed, the root function is $F(T_t;T_r)=r-c_f(T_r-T_t)$. Its transmitter derivative is $D_t=\partial_{T_t}F=c_f-\hat{\mathbf r}\cdot\mathbf V_a(T_t)$, where $\mathbf V_a=d\mathbf X_a/dT$. A simple root has $D_t\ne0$. A positive transversality floor bounds $|D_t|$ away from zero on the retained branch; it controls use of the acceleration formula, not whether a geometric intersection exists.

The [canonical per-hit law](../../../dynamics/master-equation.md#the-master-equation-canonical-form) gives, for a regular self-root,

$$
\mathbf A_{a\leftarrow a}(T_r;T_t)
=\frac{\kappa q_a^2}{r^2}W^{\mathrm{acc}}\hat{\mathbf r},
\qquad W^{\mathrm{acc}}=\frac{c_f}{|D_t|}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-cd180315de09143c)

Here $q_a$ is the fixed nonzero polarity and $\kappa>0$ is the acceleration coupling, with $\kappa q_a^2$ having acceleration-times-area units. The dimensionless weight $W^{\mathrm{acc}}$ comes from resolving emission history at a simple root. Receiver velocity affects which history is encountered as time advances; it supplies no additional instantaneous acceleration multiplier.

A regular branch record retains positive separation and delay margins, controlled transmitter derivatives and weights, all active roots, and exclusions or bounds for omitted roots and history. A singular root with $D_t=0$ is an unresolved event requiring the applicable continuation or regularization treatment; it is not evidence that the self-interaction contribution vanishes. Finding isolated roots or evaluating this formula alone does not certify an EOM solver trajectory.

### Coincidence and Singular Events

At an exact sharp root, $r=c_f\Delta$ with $c_f>0$ and $\Delta>0$ implies $r>0$. Thus there is no coincident positive-delay root. The convention $H(0)=0$, where $H$ selects positive delay, records exclusion of the instantaneous diagonal $T_t=T_r$. It does not bound acceleration as a root approaches that endpoint or provide a finite transition through its birth. Finite-width wake evaluation and spatial regularization require their own domain and limit controls, as explained in [Self-Energy and Regularization](self-energy.md#strict-delay-and-the-self-endpoint).

### Repulsive Character and Scale Selection

The self-interaction sign is $\sigma_{aa}=\operatorname{sign}(q_a^2)=+1$, so every regular contribution points away from the earlier emission position along $+\hat{\mathbf r}$. That direction need not point away from a chosen assembly center. An assembly is an organized collection of architrinos, and its size response depends on the projection of all contributing accelerations onto its declared geometry.

For a prescribed circle of fixed center and radius $R>0$, let $\theta$ be the angular separation between the emission and reception positions and $\mathbf e_r$ the outward unit radius at reception. Then $r=2R|\sin(\theta/2)|$ and $\hat{\mathbf r}\cdot\mathbf e_r=R(1-\cos\theta)/r=|\sin(\theta/2)|>0$ at every noncoincident root. This derived projection is outward and cannot supply the inward acceleration required to maintain the circle. The [uniform-circular analysis](../../../dynamics/master-equation.md#super-field-speed-single-architrino-uniform-circular-self-hit) is a geometric diagnostic; self-consistent motion requires the complete partner and self contributions.

In a binary or multi-binary candidate, self-repulsion can oppose inward partner contributions on that circular geometry. A proposed minimum sustainable orbital radius $d_0$, measured from a declared center, still requires full acceleration balance and persistence under the delayed dynamics. A candidate period $P_0$ is the absolute-time duration of a repeat of the relevant complete history; its angular frequency is $2\pi/P_0$, while its cycle frequency is $1/P_0$. Establishing stability requires control of perturbations about an actual solution, including how retained history returns after a cycle. Calling a radius minimal or a frequency fastest further requires comparison across a specified family of admissible solutions. No such extremum or stable structure follows from the switch or the outward circular projection alone.

Claim grade: derived for the speed restriction, coincidence exclusion, and directional projections under their stated hypotheses. A simple self-root with no super-field-speed interval, a positive-delay sharp root at zero separation, or an inward self projection on the stated fixed-center circle would refute the corresponding result. Scale selection and stable-assembly realization remain open proof obligations.
