# A1.3 Doubling-Frequency Resonance Lock

This chapter owns the specialized A1.3 doubling-frequency $4{:}2{:}1$ lock study inside the broader [Noether Braid Configuration Space](noether-braid-configuration-space.md). The compact aliases $I\equiv1$, $M\equiv2$, and $O\equiv3$ denote the inner, middle, and outer A1 binaries. The candidate is definitionally frequency-separated and tests that chart under explicit support, hinge, phase-return, and stability assumptions. It does not make doubling frequency the default Noether braid frequency, certify A1 dynamics from kinematics, or generalize to B1, whose iso-frequency common-axis structure has no doubling ladder to lock.

It should be read together with [Binary Dynamics](../dynamics/binary-dynamics.md), [A1.3](braid-family-a.md#a1-constrained-variants), [A1 Dynamics](braid-a1-dynamics.md#a1-dynamics), and [Mapping the Planck Scale](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), which provide the assembly scaffold, geometry, and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the inner, middle, and outer binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. As a derivation target, an integer lock is selected only after the phase-return degree/holonomy, cancellation score, and stability gap all favor the same branch.

The analysis keeps the field speed $c_f$ explicit rather than setting it to one. Branch labels $k\in\{I,M,O\}$ are used only after the retained branch supplies that role assignment. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{V}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

The general unordered state $\mathcal T_{3B}$, its $S_3$ relabeling action, and the iso-frequency and integer-ratio subfamilies are defined in [Noether Braid Configuration Space](noether-braid-configuration-space.md#unordered-layer-semantics). The doubling-frequency specialization adds a certified `I:M:O` role assignment, the exact ring identity $v_k=2\pi f_k r_k$, integer phase-return data, and the finite-$\eta$ selection and stability rows.

## Status and Assumptions

The lock analysis is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

## Exact Kinematic Identity

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
The logical spine is therefore:

1. **Kinematics:** $v_k=2\pi f_k r_k$ relates speed, frequency, and radius without introducing topology.
2. **Integer closure:** Assumption 2 is the only place where the integer pair $(m,n)$ enters; it turns frequency commensurability into return-map degree/holonomy data.
3. **Selection:** Assumption 4 and the finite-$\eta$ return map decide whether one already-integer-labeled sector is dynamically preferred.

Everything before Assumption 2 is topology-free kinematics. Everything after Assumption 2 is selection among sectors that already carry integer phase-return data.

## Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-acceleration surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1
$$
For compact notation, the algebra below writes $v_M=c_f$ and $\beta_M=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_M(T)=c_f+\delta v_M(T),
\qquad
\langle \delta v_M\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J_M^{t}(\theta_M)=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{V}_{M,j}
=
\int_{T_j^-}^{T_j^+}
\mathbf{A}_M^{(\eta)}(T)\,dT,
\qquad
\left\|\Delta\mathbf{V}_{M,j}\right\|<\infty
$$
rather than an infinite-acceleration constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the doubling-frequency-lock analysis. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether braid regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

## Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $P_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$
such that
$$
\theta_O(T+P_O)=\theta_O(T)+2\pi
$$
$$
\theta_M(T+P_O)=\theta_M(T)+2\pi m
$$
$$
\theta_I(T+P_O)=\theta_I(T)+2\pi n
$$

Therefore the canonical `I:M:O` frequency triplet is $f_I:f_M:f_O=n:m:1$. Equivalently, in outer-normalized order, $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether braid closure problem, the simple phases $\theta_k(T)=q_k\omega_O T+\phi_k$, with $\omega_O=2\pi f_O$, are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

## Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(T)\equiv \theta_M(T)-m\theta_O(T)=\phi_{MO}^\ast
$$
$$
\phi_{IO}(T)\equiv \theta_I(T)-n\theta_O(T)=\phi_{IO}^\ast
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

## Bundle Holonomy Reading

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
\frac{1}{2\pi}\oint_{S^1_O}d\theta_M=m,
\qquad
\frac{1}{2\pi}\oint_{S^1_O}d\theta_I=n
$$

or equivalently

$$
\oint_{S^1_O}\vartheta_{MO}=0,
\qquad
\oint_{S^1_O}\vartheta_{IO}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{MO}^\ast,\phi_{IO}^\ast$ are the residual flat-connection data. The discrete and continuous pieces should be kept separate:

$$
(m,n)=\text{covering degrees over }S^1_O,
\qquad
(\phi_{MO}^\ast,\phi_{IO}^\ast)=\text{flat-connection moduli}
$$

Thus the lock is a flat relative-phase connection with integer holonomy, not a literal first Chern class over the outer phase circle. In the language of [Effective Lagrangian](../dynamics/effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-return degree data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional layer independence. Let $\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I$ be the orbital-plane normals of the three layer binaries and define

$$
D_{\mathrm{plane}}
=
\det
\left[
\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I
\right]
$$

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of doubling-frequency precession at alignment.
For a promoted finite-$\eta$ chart this is a conditioning floor,
$$
|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0.
$$
It is the phase-bundle analogue of the basis-conditioning and aperture floors in the frame-construction and detection chapters: $D_{\mathrm{plane}}\to0$ means the three plane normals no longer define a stable oriented frame. The codimension-one wall $D_{\mathrm{plane}}=0$ is also where the near-orthogonal Noether braid phase chart degenerates toward a coplanar cyclic sector, so crossing it is a sector-wall event rather than a harmless coordinate limit.

## Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, middle-caustic impulse record, and finite-$\eta$ return map.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-transversality floors, and the speed bounds assigned to the exterior/horizon regime.

In this branch, the middle binary is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At the regularized middle caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_j
\mathcal{F}_j\,
\delta_\eta(\theta_M-\theta_{M,j}^{\ast})\,
d\theta_M\wedge d\theta_O
+
\Omega_{\mathrm{reg}}
$$

where $\theta_{M,j}^{\ast}$ are the middle caustic phases and $\mathcal{F}_j$ is proportional to the finite caustic impulse $\Delta\mathbf{V}_{M,j}$ and its wake-history increment on the retained branch. The fulcrum statement is therefore geometric: outer/inner energy routing changes only at the middle-caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit echo bookkeeping](../dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

A minimal test functional can be written before committing to a particular lock. Let $q_I=n$, $q_M=m$, and $q_O=1$, with phase variables $\theta_k(T)=q_k\omega_O T+\phi_k$ and $\omega_O=2\pi f_O$. For a low-order truncation depth $L$, define
$$
S_L(T)
=
\sum_{k\in\{I,M,O\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,D_t,D_r,W^{\mathrm{acc}},J_k^{t})\,
e^{ia(q_k\omega_O T+\phi_k)}
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ transmitter-side acceleration-weight, branch-transversality, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
For the caustic-grazing middle carrier this extraction is not an ordinary smooth Fourier coefficient. A middle harmonic must carry the caustic transversality weight of the window while keeping transmitter-side acceleration/action strength on the same retained record, schematically

$$
A_{M,a}
=
\int_0^{2\pi}
\frac{
w_{M,a}^{r}(\theta_M)
}{
|J_M^{t}(\theta_M)|+\eta_J
}
e^{-ia\theta_M}\,d\theta_M
$$

with $\eta_J$ the declared Jacobian-floor regularization and $w_{M,a}^{r}$ the branch-derived numerator computed from the same retained $D_t$, $D_r$, and $W^{\mathrm{acc}}$ row for that harmonic channel. The $J_M^{t}$ factor is a caustic-window transversality weight, not a substitute for transmitter-side acceleration weight. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{M,j}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](../dynamics/master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite middle-caustic impulse deposits the right spectral weight into the first common resonance block.
The cycle-averaged cancellation score over one outer-period window starting at $T_\ast$ is
$$
C_L(m,n;\phi)
=
\frac{1}{P_O}\int_{T_\ast}^{T_\ast+P_O} |S_L(T')|^2\,dT'
=
\sum_{\nu}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
The doubling-frequency claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_h\{1,\ldots,L\}
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the doubling-frequency candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the doubling-frequency lock.
The selection therefore has two independent requirements. The topological requirement is that the all-layer resonance block is nonempty; for the doubling-frequency candidate this is the $\nu=4$ block. The dynamical requirement is that the branch-derived complex amplitudes in that block can close a polygon after the caustic-weighted middle contribution is included. The first requirement belongs to the covering structure; the second belongs to the finite-$\eta$ delayed dynamics and cannot be inferred from topology alone.

Topologically, the same $\nu=4$ statement says the doubling-frequency lock is the first common cover of the three phase circles. The covering maps can be written

$$
S^1_O
\xleftarrow{\ \times m\ }
S^1_M
\xleftarrow{\ \times n/m\ }
S^1_I
$$

when $m$ divides $n$. The doubling-frequency case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each layer double-covers the one above it. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the doubling-frequency branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins.
Equivalently, the resonance blocks are the isotypic components of the integer action generated by the lock, and $\nu=\operatorname{lcm}(1,2,4)=4$ is the first common period of all three circles. The doubling-frequency tower is the unique minimal repeated cover
$$
S^1\xleftarrow{\times 2}S^1\xleftarrow{\times 2}S^1
$$
among non-identity integer towers. This is why the doubling-frequency family is also the natural candidate for a renormalization-style fixed point in the truncation analysis: repeated double covering is the simplest scale-similar phase organization.

## Non-Assumptions

The doubling-frequency-lock analysis does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
Only exact integer closure is studied here. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

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

If one later chooses the doubling-frequency integers
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

So the doubling-frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

## What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- inner, middle, and outer frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is doubling-frequency,
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

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. Here $S_L$ is the impulse-accumulated velocity-row signal obtained after integrating the regularized middle-caustic impulse through the retained branch record; it is not the unintegrated acceleration or potential row. In a local fold coordinate $x=\theta_M-\theta_{M,j}^{\ast}$, a generic Whitney $A_2$ fold gives a velocity-row cusp $B_0+B_1|x|^{1/2}+O(x)$, whose Fourier coefficients scale as $a^{-3/2}$. The corresponding unintegrated acceleration-row singularity would scale as $|x|^{-1/2}$ and would not supply the $L_{\mathrm{eff}}^{-2}$ tail budget used below. Thus the velocity-row normal form gives the pre-cutoff exponent
$$
p_{\mathrm{fold}}=\frac{3}{2}.
$$
A cusp or higher catastrophe would change this exponent and therefore change the truncation budget. The finite-depth proof must therefore report the middle-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the flat outer and inner harmonics are irrelevant tails, while the middle caustic block is the marginal channel that can still affect selection beyond the first all-layer block.

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
For the generic $A_2$ fold exponent, the middle tail dominates the smooth outer and inner tails:
$$
|A_{M,a}|^2=O(a^{-3}),
\qquad
\varepsilon_L=O(L_{\mathrm{eff}}^{-2}).
$$
Thus a practical finite-depth certificate must choose $L_{\mathrm{eff}}$ large enough that the bound implied by $L_{\mathrm{eff}}^{-2}$ is less than $\frac12\Delta C_L$ on the same branch chart. This is a stopping rule for the selection calculation, not a new assumption about which lock wins.

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

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-transversality floors, caustic-impulse rows, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

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
The quotient rule is strict. A direction in $T_{\mathrm{flat}}$ is treated as a symmetry only when the holonomy-defect coordinate
$$
\Theta(T)
=
\left(
\phi_{MO}(T)-\phi_{MO}^\ast,\,
\phi_{IO}(T)-\phi_{IO}^\ast
\right)
$$
has zero Floquet exponent on the retained return map. If $\Theta$ has a positive exponent, the same direction is a lock-breaking instability, not a quotient direction. This is the retained-branch version of the embedded-binary warning in [Binary Dynamics](../dynamics/binary-dynamics.md): a reduced subsystem's apparent neutral direction cannot be removed unless it is neutral for the full retained branch chart.

If the minimizer turns out to be the outer-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the doubling-frequency hierarchy would be a derived selection result rather than a starting assumption.

In the invariant language of [Noether Braid Topological Charge](noether-braid-topological-charge.md), the reduced theorem target is to find an admissible topological sector

$$
[\mathfrak B]_{\mathrm{freq}}
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

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The doubling-frequency conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

## Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory, let $\boldsymbol{\psi}_i=(\theta_{O,i},\phi_{MO,i},\phi_{IO,i})$ be the returned phase row, $\mathbf{r}^{\mathrm{lay}}_i=(r_{O,i},r_{M,i},r_{I,i})$ the layer-radius row, $\boldsymbol{\beta}_i=(\beta_{O,i},\beta_{M,i},\beta_{I,i})$ the speed-factor row, and $\mathcal{R}^{\mathrm{rec}}_i$ the returned branch record containing active-root ledger data, middle-caustic impulse rows, and retained causal-wake history variables. The sampled state is
$$
z_i=(\boldsymbol{\psi}_i,\mathbf{r}^{\mathrm{lay}}_i,\boldsymbol{\beta}_i,\mathcal{R}^{\mathrm{rec}}_i,\hat{\mathbf{n}}_{O,i},\hat{\mathbf{n}}_{M,i},\hat{\mathbf{n}}_{I,i})\in\mathcal{S}_{m,n}.
$$
Define a recurrence matrix
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
\Theta(T)
=
\left(
\phi_{MO}(T)-\phi_{MO}^\ast,\,
\phi_{IO}(T)-\phi_{IO}^\ast
\right)
$$

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

## Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal rank-three bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

whereas

$$
1{:}2{:}4\ \text{doubling-frequency cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the doubling-frequency Noether braid lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above.
The separating wall is the plane-degeneracy condition
$$
D_{\mathrm{plane}}=0.
$$
On one side, the near-orthogonal sector carries three independent phase circles and covering data. On the wall, the phase chart collapses into a coplanar cyclic configuration where cancellation is representation-theoretic inside one plane. Crossing this wall is therefore a change in cancellation topology, not a smooth deformation inside one sector. The reachable theorem target is that the doubling-frequency sector and the coplanar $\mathbb{Z}_3$ sector cannot be connected by a path that preserves both $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ and a positive non-symmetry Floquet gap.

For a neighboring closure problem, see [Horizon Chirality](../spacetime/horizon-chirality.md).
