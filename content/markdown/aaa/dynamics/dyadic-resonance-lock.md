# Dyadic Resonance Lock

This chapter studies resonance lock for the nested Outer, Middle, and Inner binaries. Its immediate goal is specific: identify the relationship between frequency, scalar tangential speed, and radius in a reduced branch where the middle binary caustic-grazes the field-speed hinge and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](binary-dynamics.md), [Nested Shell Swarm Dynamics](../noether-swarm/nested-shell-swarm-dynamics.md), [Mapping the Planck Scale](../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), and [Noether Core](../noether-swarm/noether-swarm.md), which provide the assembly geometry and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the Outer, Middle, and Inner binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. Inferentially, an integer lock is selected only after a cancellation score and a stability gap both favor it.

This chapter keeps the field speed $c_f$ explicit rather than setting it to one. We work with branch labels $k\in\{O,M,I\}$. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{v}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

## Status and Assumptions

The logic of the chapter is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0.
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k.
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.

### Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-force surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1.
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
\left\|\Delta\mathbf{v}_{M,n}\right\|<\infty,
$$
rather than an infinite-force constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the chapter. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether-core regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $T_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n,
$$
such that
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi,
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m,
$$
$$
\theta_I(t+T_O)=\theta_I(t)+2\pi n.
$$

Therefore $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether-core closure problem, the simple phases $\theta_k=q_k\Omega t+\phi_k$ are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(t)\equiv \theta_M(t)-m\theta_O(t)=\phi_{MO}^\ast,
$$
$$
\phi_{IO}(t)\equiv \theta_I(t)-n\theta_O(t)=\phi_{IO}^\ast,
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

### Assumption 4 (Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one that yields the strongest cycle-averaged cancellation of the relevant low-order causal-wake multipole or effective potential signal.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-Jacobian floors, and the speed bounds assigned to the exterior/horizon regime.

A minimal test functional can be written before committing to a particular lock. Let $q_O=1$, $q_M=m$, and $q_I=n$, with phase variables $\theta_k=q_k\Omega t+\phi_k$. For a low-order truncation depth $L$, define
$$
S_L(t)
=
\sum_{k\in\{O,M,I\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,J)\,
e^{ia(q_k\Omega t+\phi_k)}.
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ branch-strength, branch-Jacobian, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
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
\right|^2.
$$
The dyadic claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_j\{1,\ldots,L\}.
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the dyadic candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}.
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the dyadic lock.

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
\frac{c_f}{2\pi m f_O}.
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}.
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}.
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O},
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

These are the core radius relations of the chapter:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

They show that once the integer lock $(1:m:n)$ is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$. Thus a frequency hierarchy is not yet a radius hierarchy.

## Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_O:f_M:f_I = 1:m:n,
$$
and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}.
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
n=4,
$$
then
$$
f_O:f_M:f_I = 1:2:4,
$$
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}.
$$

So the dyadic frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

## What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- outer, middle, and inner frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables.

What exact lock does not give by itself:

- that the preferred lock is dyadic,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

## Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a resonance-and-superposition argument than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage and phase-slip variance subject to the delayed dynamics.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

## RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L.
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2,
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
\Delta C_L>2\varepsilon_L.
$$

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L.
$$

## Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, effective cancellation, and inference separate:

1. classify the admissible integer locks $(1:m:n)$ under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. define a cycle-averaged cancellation functional for the low-order causal-wake multipole or effective potential,
4. determine which integer lock minimizes that functional in the exterior/horizon regime,
5. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap.

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

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, radii, speeds, active branch data, branch-Jacobian floors, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are the symmetry directions removed before testing stability, such as global time shift, global spatial rotation, and any declared relabeling symmetry of the retained branch chart.

If the minimizer turns out to be $(1,2,4)$, then the dyadic hierarchy would be a derived selection result rather than a starting assumption.

### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory
$$
z_i=(\phi_i,a_i,\nu_i,\ell_i)\in\mathcal{S}_{m,n},
$$
define a recurrence matrix
$$
Q^{(\epsilon)}_{ij}
=
\mathbf{1}
\left[
d_{\mathcal{S}}(z_i,z_j)<\epsilon
\right],
$$
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$. A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check.

## Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity can still be kept as a separate symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$

That identity may help characterize a radiative-stealth phase arrangement of an already-formed lock, but it should not be confused with the frequency-selection assumptions above.

For neighboring closure problems, see [Planar Bridge Closure](../proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
