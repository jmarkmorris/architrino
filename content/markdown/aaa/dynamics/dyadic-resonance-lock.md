# Dyadic Resonance Lock

This chapter studies resonance lock for the nested Outer, Middle, and Inner binaries as a restricted family inside the broader [Tri-Binary Configuration Space](tri-binary-configuration-space.md). Its immediate goal is specific: identify the relationship between frequency, scalar tangential speed, and radius in a reduced branch where the middle binary caustic-grazes the field-speed hinge and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](binary-dynamics.md), [Nested Shell Swarm Dynamics](../noether-swarm/nested-shell-swarm-dynamics.md), [Mapping the Planck Scale](../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), and [Noether Swarm](../noether-swarm/noether-swarm.md), which provide the assembly geometry and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the Outer, Middle, and Inner binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. Inferentially, an integer lock is selected only after the phase-bundle holonomy, cancellation score, and stability gap all favor the same branch.

This chapter keeps the field speed $c_f$ explicit rather than setting it to one. We work with branch labels $k\in\{O,M,I\}$. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{v}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

## General Tri-Binary Branch State

Before a dyadic, equal-frequency, or other special configuration is selected, a tri-binary branch is a three-layer retained state. The general search program is defined in [Tri-Binary Configuration Space](tri-binary-configuration-space.md); this section records the variables needed locally for the dyadic specialization. Use generic layer labels $a\in\{1,2,3\}$ before assigning the canonical `I:M:O` roles. These labels are not sorted by $f_a$, $r_a$, $E_a$, $s_a$, or any other parameter; permutation-related rows remain valid search evidence until an explicit quotient-sector analysis is declared. The minimal branch variables are
$$
\mathcal{T}_{3B}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency, $r_a$ the characteristic radius or retained lever arm, $E_a$ the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ the scalar tangential speed, $\phi_a$ the phase origin or offset, $\hat{\mathbf n}_a$ the orbital-plane normal, and $\mathcal{L}_a$ the active causal-root ledger data for that layer. On a circular layer chart the kinematic identity is
$$
s_a=2\pi f_a r_a.
$$
This identity is only a constraint among three variables. It does not by itself select the frequency ratios, energy placement, radii, speeds, or phase offsets.

The branch-search objective is therefore
$$
\text{find retained, stable } \mathcal{T}_{3B}
\text{ over }
(f_a,r_a,E_a,s_a,\phi_a,\hat{\mathbf n}_a,\mathcal{L}_a),
$$
then compare the energy differentials
$$
\Delta E_{ab}=E_a-E_b
$$
and their ledger decomposition on the same retained row set. A dyadic candidate, an offset middle-hinge candidate, and an equal-frequency candidate are special subfamilies of this same state space. In particular, the equal-frequency condition
$$
f_1=f_2=f_3
$$
still permits different $r_a$, $s_a$, and $E_a$, because the radii or retained lever arms can differ. Different phase offsets and different active root ledgers can then carry the branch distinction even when the frequency row is common.

For nested shell swarm prose, specialize the generic labels to canonical `I:M:O` order only after the retained branch supplies the role assignment. The later dyadic lock discussion studies one restricted family inside this broader tri-binary branch state; it is not the default assumption for all stable tri-binary configurations.

## Status and Assumptions

The logic of the chapter is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.

### Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-force surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1
$$
For compact notation, the algebra below writes $v_M=c_f$ and $\beta_M=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_M(t)=c_f+\delta v_M(t),
\qquad
\langle \delta v_M\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{v}_{M,n}
=
\int_{t_n^-}^{t_n^+}
\mathbf{a}_M^{(\eta)}(t)\,dt,
\qquad
\left\|\Delta\mathbf{v}_{M,n}\right\|<\infty
$$
rather than an infinite-force constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the chapter. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether swarm regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $T_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$
such that
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m
$$
$$
\theta_I(t+T_O)=\theta_I(t)+2\pi n
$$

Therefore the canonical `I:M:O` frequency triplet is $f_I:f_M:f_O=n:m:1$. Equivalently, in outer-normalized order, $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether swarm closure problem, the simple phases $\theta_k=q_k\Omega t+\phi_k$ are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(t)\equiv \theta_M(t)-m\theta_O(t)=\phi_{MO}^\ast
$$
$$
\phi_{IO}(t)\equiv \theta_I(t)-n\theta_O(t)=\phi_{IO}^\ast
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

### Bundle Holonomy Reading

Assumptions 2 and 3 can be restated as a phase-bundle condition. Let the outer phase be the base cycle and define the relative connection one-forms

$$
\vartheta_{MO}
=
d\theta_M-m\,d\theta_O,
\qquad
\vartheta_{IO}
=
d\theta_I-n\,d\theta_O
$$

Exact integer phase closure says the covering degrees over one outer cycle are

$$
\frac{1}{2\pi}\oint_{T_O}d\theta_M=m,
\qquad
\frac{1}{2\pi}\oint_{T_O}d\theta_I=n
$$

or equivalently

$$
\oint_{T_O}\vartheta_{MO}=0,
\qquad
\oint_{T_O}\vartheta_{IO}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{MO}^\ast,\phi_{IO}^\ast$ are the residual flat-connection data. In the language of [Effective Lagrangian](effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-bundle winding data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional layer independence. Let $\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I$ be the orbital-plane normals of the three layer binaries and define

$$
D_{\mathrm{plane}}
=
\det
\left[
\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I
\right]
$$

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of dyadic precession at alignment.

### Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, middle-caustic impulse record, and finite-$\eta$ return map.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-Jacobian floors, and the speed bounds assigned to the exterior/horizon regime.

In this branch, the middle binary is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At the regularized middle caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_n
\mathcal{F}_n\,
\delta_\eta(\theta_M-\theta_{M,n}^{\ast})\,
d\theta_M\wedge d\theta_O
+
\Omega_{\mathrm{reg}}
$$

where $\theta_{M,n}^{\ast}$ are the middle caustic phases and $\mathcal{F}_n$ is proportional to the finite caustic impulse $\Delta\mathbf{v}_{M,n}$ and its wake-history increment on the retained branch. The fulcrum statement is therefore geometric: outer/inner energy routing changes only at the middle-caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit echo bookkeeping](energy.md#self-hit-echo-and-discrete-steps-working-note).

A minimal test functional can be written before committing to a particular lock. Let $q_O=1$, $q_M=m$, and $q_I=n$, with phase variables $\theta_k=q_k\Omega t+\phi_k$. For a low-order truncation depth $L$, define
$$
S_L(t)
=
\sum_{k\in\{O,M,I\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,J)\,
e^{ia(q_k\Omega t+\phi_k)}
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ branch-strength, branch-Jacobian, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
For the caustic-grazing middle carrier this extraction is not an ordinary smooth Fourier coefficient. A middle harmonic must carry the Jacobian weight of the caustic window, schematically

$$
A_{M,a}
=
\int_0^{2\pi}
\frac{
w_{M,a}(\theta_M)
}{
|J_M(\theta_M)|+\eta_J
}
e^{-ia\theta_M}\,d\theta_M
$$

with $\eta_J$ the declared Jacobian-floor regularization and $w_{M,a}$ the branch-derived numerator for that harmonic channel. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{M,n}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite middle-caustic impulse deposits the right spectral weight into the first common resonance block.
The cycle-averaged cancellation score is
$$
C_L(m,n;\phi)
=
\frac{1}{T}\int_0^T |S_L(t)|^2\,dt
=
\sum_{\nu}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
The dyadic claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_j\{1,\ldots,L\}
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the dyadic candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the dyadic lock.

Topologically, the same $\nu=4$ statement says the dyadic lock is the first common cover of the three phase circles. The covering maps can be written

$$
T^O
\xleftarrow{\ \times m\ }
T^M
\xleftarrow{\ \times n/m\ }
T^I
$$

when $m$ divides $n$. The dyadic case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each layer double-covers the one above it. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the dyadic branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins.

### Non-Assumptions

This chapter does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
This chapter studies exact integer closure. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

## Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

From Assumptions 1-2 and the exact identity, the middle carrier radius is fixed by the outer frequency:
$$
r_M=\frac{c_f}{2\pi f_M}
=
\frac{c_f}{2\pi m f_O}
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O}
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

These are the core radius relations of the chapter:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

They show that once the canonical integer lock $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$. Thus a frequency hierarchy is not yet a radius hierarchy.

## Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_I:f_M:f_O = n:m:1
$$
equivalently, $f_O:f_M:f_I = 1:m:n$ in outer-normalized order, and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_k=\frac{\beta_k c_f}{2\pi f_k}
$$
together with the carrier value $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle caustic-grazing carrier condition. The proposition makes no claim about which integer pair is dynamically preferred.

## Could $1{:}2{:}4$ Be a Solution?

If one later chooses the dyadic integers
$$
m=2,
\qquad
n=4
$$
then
$$
f_I:f_M:f_O = 4:2:1
$$
equivalently, $f_O:f_M:f_I = 1:2:4$ in outer-normalized order,
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}
$$

So the dyadic frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

## What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- outer, middle, and inner frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is dyadic,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The bundle-flatness and cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

## Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods only when the relative phase connection stays flat enough to replay. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a flat-bundle replay test than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage, phase-slip variance, and residual phase curvature subject to the delayed dynamics. If the bundle-flatness diagnostic and the cancellation score disagree, the cancellation score is only an effective summary and cannot by itself overrule a holonomy or return-map failure.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

## RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

The branch geometry predicts which modes are most dangerous. Smooth flat-connection layers should have rapidly decaying coefficients,

$$
|A_{O,a}|,\ |A_{I,a}|
\le
C e^{-c a}
$$

on an analytic replayable chart. The middle caustic layer instead has an algebraic pre-cutoff tail because its impulse is phase-localized:

$$
|A_{M,a}|
\lesssim
C_{\eta}\,a^{-p_{\mathrm{fold}}}
$$

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. The finite-depth proof must therefore report the middle-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the flat outer and inner harmonics are irrelevant tails, while the middle caustic block is the marginal channel that can still affect selection beyond the first all-layer block.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
where
$$
L_{\mathrm{eff}}
$$
is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$
uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$
against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L
$$

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L
$$

## Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, phase-bundle topology, effective cancellation, and inference separate:

1. classify the admissible canonical integer locks $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. require nondegenerate orbital-plane data $D_{\mathrm{plane}}\neq0$ so the retained phase bundle is genuinely three-dimensional,
4. define the phase-bundle curvature and caustic-weighted cancellation functional for the low-order causal-wake multipole or effective potential,
5. determine which integer lock minimizes residual curvature and exposed leakage in the exterior/horizon regime,
6. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap on the complement of the flat moduli.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$
on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$
off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-Jacobian floors, caustic-impulse rows, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

$$
G
=
T_{\mathrm{global}}
\oplus
\mathfrak{so}(3)_{\mathrm{rot}}
\oplus
T_{\mathrm{flat}}
\oplus
G_{\mathrm{rel}}
$$

where $T_{\mathrm{global}}$ is the global time or phase shift, $\mathfrak{so}(3)_{\mathrm{rot}}$ is the rigid spatial-rotation tangent space, $T_{\mathrm{flat}}=\operatorname{span}\{(\delta\phi_{MO},\delta\phi_{IO})\}$ is the flat-connection moduli space, and $G_{\mathrm{rel}}$ contains any declared relabeling symmetry of the retained branch chart. A lock is dynamically stable only if the return map contracts on the complement of $G$ and the flat-modulus directions remain genuinely neutral. If a flat-modulus direction becomes unstable, the frequency commensurability may remain while Assumption 3 fails through relative-phase drift.

If the minimizer turns out to be the outer-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the dyadic hierarchy would be a derived selection result rather than a starting assumption.

In the invariant language of [Assembly Topological Charge](assembly-topological-charge.md), the reduced theorem target is to find an admissible topological sector

$$
[\mathfrak B]_{\mathrm{tri}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
=
\left(
N_s,\,
M_p,\,
(m,n)
\right)
$$

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The dyadic conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory
$$
z_i=(\phi_i,a_i,\nu_i,\ell_i,\hat{\mathbf{n}}_{O,i},\hat{\mathbf{n}}_{M,i},\hat{\mathbf{n}}_{I,i})\in\mathcal{S}_{m,n}
$$
define a recurrence matrix
$$
Q^{(\epsilon)}_{ij}
=
\mathbf{1}
\left[
d_{\mathcal{S}}(z_i,z_j)<\epsilon
\ \wedge\
\|\Theta_i-\Theta_j\|<\epsilon_{\Theta}
\ \wedge\
|D_{\mathrm{plane},i}-D_{\mathrm{plane},j}|<\epsilon_D
\right]
$$
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$, while the holonomy-defect coordinate is not quotiented:

$$
\Theta(t)
=
\left(
\phi_{MO}(t)-\phi_{MO}^\ast,\,
\phi_{IO}(t)-\phi_{IO}^\ast
\right)
$$

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

## Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal tri-binary bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

whereas

$$
1{:}2{:}4\ \text{dyadic cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the dyadic tri-binary lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above.

For neighboring closure problems, see [Planar Bridge Closure](../proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
