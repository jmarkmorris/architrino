# Three-Binary 4:2:1 Frequency Lock

This chapter studies the doubling-frequency $4{:}2{:}1$ lock within the axially separated orthogonal-axis three-binary configuration of the broader [Noether Braid Configuration Space](noether-braid-configuration-space.md). The persistent indices $a\in\{1,2,3\}$ identify its three binaries, and the frequency condition is $f_1:f_2:f_3=4:2:1$. Setting $h_1=h_2=h_3=0$ gives the zero-axial-offset, coincident-midpoint member of the same frequency chart. The candidate is definitionally frequency-separated and is tested under explicit support, field-speed-carrier, phase-return, and stability assumptions. The chart does not order the radii, make doubling frequency the default Noether braid frequency, certify the dynamics of the axially separated configuration from kinematics, or generalize to the coincident-axis three-binary locus, whose iso-frequency common-axis structure has no doubling ladder to lock.

It should be read together with [Binary Dynamics](../dynamics/binary-dynamics.md), [axially separated orthogonal-axis three-binary configuration with 4:2:1 frequency ratio](3d-braid-assemblies.md#axially-separated-constrained-variants), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Mapping the Planck Scale](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), which provide the assembly scaffold, zero-offset subset, geometry, and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the three indexed binaries are assembly components built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. As a derivation target, an integer lock is selected only after the phase-return degree/holonomy, cancellation score, and stability gap all favor the same branch.

The analysis keeps the field speed $c_f$ explicit rather than setting it to one. Here $r_a$ is the characteristic radius and $v_a=\|\mathbf{V}_a\|$ is the scalar tangential speed of one member of binary $a$ around that binary's center. These analysis variables do not replace the exact endpoint-distance coordinate $R_a$ in the taxonomy.

The general indexed state $\mathcal T_{3B}$, its $S_3$ relabeling action, and the iso-frequency and integer-ratio subfamilies are defined in [Noether Braid Configuration Space](noether-braid-configuration-space.md#unordered-layer-semantics). The doubling-frequency specialization adds the indexed relation $f_1:f_2:f_3=4:2:1$, the exact carrier identity $v_a=2\pi f_a r_a$, integer phase-return data, and the finite-$\eta$ selection and stability rows. It does not add a radius order or a permanent dynamical role assignment.

## Status and Assumptions

The lock analysis is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

## Exact Kinematic Identity

For each binary carrier,
$$
v_a = 2\pi f_a r_a = \beta_a c_f,
\qquad
0<\beta_a,
\qquad
c_f>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-e96d68c55bfa26ef)

Equivalently,
$$
f_a=\frac{v_a}{2\pi r_a},
\qquad
r_a=\frac{v_a}{2\pi f_a},
\qquad
v_a=2\pi f_a r_a
$$

[View →](../../../../equation-mapping.html#corpus-equation-e60fb027d3fbd019)

For any one binary carrier, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself. The logical spine is therefore:

1. **Kinematics:** $v_a=2\pi f_a r_a$ relates speed, frequency, and radius without introducing topology.
2. **Integer closure:** Assumption 2 is the only place where the integer pair $(m,n)$ enters; it turns frequency commensurability into return-map degree/holonomy data.
3. **Selection:** Assumption 4 and the finite-$\eta$ return map decide whether one already-integer-labeled sector is dynamically preferred.

Everything before Assumption 2 is topology-free kinematics. Everything after Assumption 2 is selection among sectors that already carry integer phase-return data.

## Assumption 1 (Candidate Caustic-Grazing Carrier)

For a reduced exterior or horizon-transition comparison chart, choose a candidate carrier index $h\in\{1,2,3\}$. The index $h$ is an analysis parameter to be compared across all admissible choices, not an axially separated orthogonal-axis three-binary configuration with 4:2:1 frequency ratio taxonomy assignment. The candidate is not pinned exactly on an infinite-acceleration surface. It is modeled as a caustic-grazing carrier whose cycle-averaged value is the field speed:
$$
v_h^{\mathrm{car}}=c_f,
\qquad
\beta_h^{\mathrm{car}}=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc8a2f18393b8b3e)

For compact notation, the frozen-chart algebra below writes $v_h=c_f$ and $\beta_h=1$ for this fixed carrier value. Every exact radius-frequency identity in that algebra uses fixed $f_h$, $r_h$, and $\beta_h=1$; the fluctuation $\delta v_h(T)$ introduced next belongs only to the caustic-impulse ledger and is not substituted into those identities.

The branch-level motion may have microscopic crossings
$$
v_h(T)=c_f+\delta v_h(T),
\qquad
\langle \delta v_h\rangle_W=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5390c7ab577ac84d)

over the declared window $W$. Each regularized crossing of the $J_h^{t}(\theta_h)=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{V}_{h,j}
=
\int_{T_j^-}^{T_j^+}
\mathbf{A}_h^{(\eta)}(T)\,dT,
\qquad
\left\|\Delta\mathbf{V}_{h,j}\right\|<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-ded68219009abda5)

rather than an infinite-acceleration constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../dynamics/energy.md#self-hit-branch-changes-and-discrete-ledgers).

This is the main regime assumption of the doubling-frequency-lock analysis. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric. It is not a claim that every Noether braid regime has any fixed binary exactly at $c_f$. A promoted result must compare the three possible $h$ assignments or prove from the retained record why only one is admissible.

## Assumption 2 (Exact Integer Phase Closure)

Let the binary-3 reference period be $P_3=\frac{1}{f_3}$. Assume that when binary 3 completes one full cycle, binaries 2 and 1 also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$

[View →](../../../../equation-mapping.html#corpus-equation-b17b3862a4a76728)

such that
$$
\theta_3(T+P_3)=\theta_3(T)+2\pi
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e3ee755bb462b90)

$$
\theta_2(T+P_3)=\theta_2(T)+2\pi m
$$

[View →](../../../../equation-mapping.html#corpus-equation-887d0ec76c657a3b)

$$
\theta_1(T+P_3)=\theta_1(T)+2\pi n
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8f2660b620aa775)

Therefore the indexed frequency triplet is $f_1:f_2:f_3=n:m:1$, with $f_2=m f_3$ and $f_1=n f_3$. After one binary-3 revolution, binaries 2 and 1 have completed whole numbers of revolutions as well, so the three-binary pattern closes exactly. Binary 3 is the phase reference because the axially separated orthogonal-axis three-binary configuration with 4:2:1 frequency ratio row assigns it the base frequency, not because it is geometrically outer.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether braid closure problem, the simple phases $\theta_a(T)=q_a\omega_3 T+\phi_a$, with $(q_1,q_2,q_3)=(n,m,1)$ and $\omega_3=2\pi f_3$, are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

## Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{23}(T)\equiv \theta_2(T)-m\theta_3(T)=\phi_{23}^\ast
$$

[View →](../../../../equation-mapping.html#corpus-equation-84f096c688ac1560)

$$
\phi_{13}(T)\equiv \theta_1(T)-n\theta_3(T)=\phi_{13}^\ast
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8a789367e3abbdf)

with constants $\phi_{23}^\ast,\phi_{13}^\ast$.

The binaries keep the same timing relationship cycle after cycle rather than drifting through one another.

## Bundle Holonomy Reading

Assumptions 2 and 3 can be restated as a phase-bundle condition. Let the binary-3 phase be the base cycle and define the relative connection one-forms

$$
\vartheta_{23}
=
d\theta_2-m\,d\theta_3,
\qquad
\vartheta_{13}
=
d\theta_1-n\,d\theta_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea01a6be817aff43)

Exact integer phase closure says the covering degrees over one binary-3 cycle are

$$
\frac{1}{2\pi}\oint_{S^1_3}d\theta_2=m,
\qquad
\frac{1}{2\pi}\oint_{S^1_3}d\theta_1=n
$$

[View →](../../../../equation-mapping.html#corpus-equation-cfcc793ba6e188ac)

or equivalently

$$
\oint_{S^1_3}\vartheta_{23}=0,
\qquad
\oint_{S^1_3}\vartheta_{13}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1455388f78e96d9)

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{23}^\ast,\phi_{13}^\ast$ are the residual flat-connection data. The discrete and continuous pieces should be kept separate:

$$
(m,n)=\text{covering degrees over }S^1_3,
\qquad
(\phi_{23}^\ast,\phi_{13}^\ast)=\text{flat-connection moduli}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f0d13a35f804b687)

Thus the lock is a flat relative-phase connection with integer holonomy, not a literal first Chern class over the binary-3 phase circle. In the language of [Effective Lagrangian](../dynamics/effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-return degree data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional binary-plane independence. Use the canonical ordered-normal determinant $D_{\mathrm{plane}}$ defined in [Noether Braid Configuration Space](noether-braid-configuration-space.md#angular-momentum-frame).

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of doubling-frequency precession at alignment. For a promoted finite-$\eta$ chart this is a conditioning floor,
$$
|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-5037aab430c37416)

It is the phase-bundle analogue of the basis-conditioning and aperture floors in the frame-construction and detection chapters: $D_{\mathrm{plane}}\to0$ means the three plane normals no longer define a stable oriented frame. The codimension-one wall $D_{\mathrm{plane}}=0$ is also where the near-orthogonal Noether braid phase chart degenerates toward a coplanar cyclic sector, so crossing it is a sector-wall event rather than a harmless coordinate limit.

## Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible binary-3-normalized integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, candidate-carrier impulse record, and finite-$\eta$ return map. The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-transversality floors, and the speed bounds assigned to the exterior/horizon regime.

For a declared comparison chart, candidate binary $h$ is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At its regularized caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_j
\mathcal{F}_j\,
\delta_\eta(\theta_h-\theta_{h,j}^{\ast})\,
\sum_{b\ne h}d\theta_h\wedge d\theta_b
+
\Omega_{\mathrm{reg}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-34848497603093d1)

where $\theta_{h,j}^{\ast}$ are the candidate-carrier caustic phases and $\mathcal{F}_j$ is proportional to the finite caustic impulse $\Delta\mathbf{V}_{h,j}$ and its wake-history increment on the retained branch. Any energy-routing fulcrum is therefore geometric and branch-derived: transfers may concentrate at the carrier caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit bookkeeping](../dynamics/energy.md#self-hit-branch-changes-and-discrete-ledgers).

A minimal test functional can be written before committing to a particular lock. Let $(q_1,q_2,q_3)=(n,m,1)$, with phase variables $\theta_k(T)=q_k\omega_3 T+\phi_k$ and $\omega_3=2\pi f_3$. For a low-order truncation depth $L$, define
$$
S_L(T)
=
\sum_{k\in\{1,2,3\}}\sum_{\ell=1}^{L}
A_{k,\ell}(\beta_k,r_k,\eta,D_t,D_r,W^{\mathrm{acc}},J_k^{t})\,
e^{i\ell(q_k\omega_3 T+\phi_k)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6233800de291e313)

The coefficients $A_{k,\ell}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ transmitter-side acceleration-weight, branch-transversality, and causal-wake ledger used to test the candidate lock. They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential. For the caustic-grazing candidate carrier this extraction is not an ordinary smooth Fourier coefficient. A carrier harmonic must carry the caustic transversality weight of the window while keeping transmitter-side acceleration/action strength on the same retained record, schematically

$$
A_{h,\ell}
=
\int_0^{2\pi}
\frac{
w_{h,\ell}^{r}(\theta_h)
}{
|J_h^{t}(\theta_h)|+\eta_J
}
e^{-i\ell\theta_h}\,d\theta_h
$$

[View →](../../../../equation-mapping.html#corpus-equation-bca27ce5edad2566)

with $\eta_J$ the declared Jacobian-floor regularization and $w_{h,\ell}^{r}$ the branch-derived numerator computed from the same retained $D_t$, $D_r$, and $W^{\mathrm{acc}}$ row for that harmonic channel. The $J_h^{t}$ factor is a caustic-window transversality weight, not a substitute for transmitter-side acceleration weight. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{h,j}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](../dynamics/master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite candidate-carrier impulse deposits the right spectral weight into the first common resonance block. The cycle-averaged cancellation score over one binary-3 reference window starting at $T_\ast$ is
$$
C_L(m,n;\phi)
=
\frac{1}{P_3}\int_{T_\ast}^{T_\ast+P_3} |S_L(T')|^2\,dT'
=
\sum_{\nu}
\left|
\sum_{(k,\ell):\,\ell q_k=\nu}
A_{k,\ell}e^{i\ell\phi_k}
\right|^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f475be1c41774e5)

The doubling-frequency claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two binaries only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_b\{1,\ldots,L\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-655390add6980257)

for distinct binary indices $k$ and $b$. If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the doubling-frequency candidate $(m,n)=(2,4)$, the first binary-3/binary-2 overlap is $\nu=2$ via $(3,\ell=2)$ and $(2,\ell=1)$; the first all-binary overlap is
$$
\nu=4
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8be52738bddeb0f)

via $(3,\ell=4)$, $(2,\ell=2)$, and $(1,\ell=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-binary block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{3,4}|,|A_{2,2}|,|A_{1,1}|)
\le
\text{sum of the other two}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b33d301f9b4bf84)

The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the doubling-frequency lock. The selection therefore has two independent requirements. The topological requirement is that the all-binary resonance block is nonempty; for the doubling-frequency candidate this is the $\nu=4$ block. The dynamical requirement is that the branch-derived complex amplitudes in that block can close a polygon after the caustic-weighted carrier contribution is included. The first requirement belongs to the covering structure; the second belongs to the finite-$\eta$ delayed dynamics and cannot be inferred from topology alone.

Topologically, the same $\nu=4$ statement says the doubling-frequency lock is the first common cover of the three phase circles. The covering maps can be written

$$
S^1_3
\xleftarrow{\ \times m\ }
S^1_2
\xleftarrow{\ \times n/m\ }
S^1_1
$$

[View →](../../../../equation-mapping.html#corpus-equation-d53b597636de7439)

when $m$ divides $n$. The doubling-frequency case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each indexed phase circle double-covers its reference neighbor. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the doubling-frequency branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins. Equivalently, the resonance blocks are the isotypic components of the integer action generated by the lock, and $\nu=\operatorname{lcm}(1,2,4)=4$ is the first common period of all three circles. The doubling-frequency tower is the unique minimal repeated cover
$$
S^1\xleftarrow{\times 2}S^1\xleftarrow{\times 2}S^1
$$

[View →](../../../../equation-mapping.html#corpus-equation-5d41d7dbdb178969)

among non-identity integer towers. This is why the doubling-frequency family is also the natural candidate for a renormalization-style fixed point in the truncation analysis: repeated double covering is the simplest scale-similar phase organization.

## Non-Assumptions

The doubling-frequency-lock analysis does **not** assume:

- common-speed closure $v_1=v_2=v_3$,
- any radius ordering or self-similar radius relation,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here. Only exact integer closure is studied here. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

## Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

Let
$$
(q_1,q_2,q_3)=(n,m,1).
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca254f0e7889a344)

The exact identity gives every characteristic radius relative to the binary-3 reference radius:
$$
r_a
=
\frac{\beta_a c_f}{2\pi q_a f_3},
\qquad
\frac{r_a}{r_3}
=
\frac{\beta_a}{q_a\beta_3},
\qquad
a\in\{1,2,3\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-3057c660ac699eb3)

If the candidate carrier is binary $h$, Assumption 1 adds only $\beta_h=1$. It does not order the other radii. Thus the frequency ratio and one field-speed condition still leave the remaining speed factors to be determined by the branch dynamics.

## Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_1:f_2:f_3 = n:m:1
$$

[View →](../../../../equation-mapping.html#corpus-equation-42abafe8aa247b4d)

and
$$
r_1:r_2:r_3
=
\frac{\beta_1}{n}:\frac{\beta_2}{m}:\beta_3.
$$

[View →](../../../../equation-mapping.html#corpus-equation-69fcc8c7b3370a8c)

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_a=\frac{\beta_a c_f}{2\pi f_a}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1068d33780e493b7)

together with $(f_1,f_2,f_3)=(nf_3,mf_3,f_3)$. The carrier choice adds $\beta_h=1$ only after $h$ is declared. $\square$

The geometry is controlled by integer phase closure plus a separately declared caustic-grazing carrier condition. The proposition makes no claim about which integer pair or carrier index is dynamically preferred.

## Could $1{:}2{:}4$ Be a Solution?

If one later chooses the doubling-frequency integers
$$
m=2,
\qquad
n=4
$$

[View →](../../../../equation-mapping.html#corpus-equation-99d23427c622cdad)

then
$$
f_1:f_2:f_3 = 4:2:1
$$

[View →](../../../../equation-mapping.html#corpus-equation-e7f9e081e0c18557)

but the radius ratios become
$$
r_1:r_2:r_3
=
\frac{\beta_1}{4}:\frac{\beta_2}{2}:\beta_3.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b738b1fe51b74e26)

So the doubling-frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

## What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- the three indexed frequencies lie on a commensurate lattice,
- the three-binary configuration repeats after one binary-3 reference period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is doubling-frequency,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The bundle-flatness and cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

## Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated binary-3 reference periods only when the relative phase connection stays flat enough to replay. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a flat-bundle replay test than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage, phase-slip variance, and residual phase curvature subject to the delayed dynamics. If the bundle-flatness diagnostic and the cancellation score disagree, the cancellation score is only an effective summary and cannot by itself overrule a holonomy or return-map failure.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

## RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L
$$

[View →](../../../../equation-mapping.html#corpus-equation-9e18cffffd15920c)

That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

The branch geometry predicts which modes are most dangerous. Smooth noncarrier binaries should have rapidly decaying coefficients,

$$
|A_{b,\ell}|
\le
C e^{-c\ell},
\qquad b\ne h
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd8f6915729836af)

on an analytic replayable chart. The candidate carrier instead has an algebraic pre-cutoff tail because its impulse is phase-localized:

$$
|A_{h,\ell}|
\lesssim
C_{\eta}\,\ell^{-p_{\mathrm{fold}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cf2183dec4bd245)

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. Here $S_L$ is the impulse-accumulated velocity-row signal obtained after integrating the regularized carrier impulse through the retained branch record; it is not the unintegrated acceleration or potential row. In a local fold coordinate $x=\theta_h-\theta_{h,j}^{\ast}$, a generic Whitney $A_2$ fold gives a velocity-row cusp $B_0+B_1|x|^{1/2}+O(x)$, whose Fourier coefficients scale as $\ell^{-3/2}$. The corresponding unintegrated acceleration-row singularity would scale as $|x|^{-1/2}$ and would not supply the $L_{\mathrm{eff}}^{-2}$ tail budget used below. Thus the velocity-row normal form gives the pre-cutoff exponent
$$
p_{\mathrm{fold}}=\frac{3}{2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-23f4ee80322d8464)

A cusp or higher catastrophe would change this exponent and therefore change the truncation budget. The finite-depth proof must therefore report the carrier-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the smooth noncarrier harmonics are irrelevant tails, while the carrier caustic block is the marginal channel that can still affect selection beyond the first all-binary block.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,\ell):\,\ell q_k=\nu}
A_{k,\ell}e^{i\ell\phi_k}
\right|^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-c739705ac308222e)

where
$$
L_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-403988a484298f5c)

is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$

[View →](../../../../equation-mapping.html#corpus-equation-4a3d14a520734218)

uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-741585d3951e8fc6)

against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L
$$

[View →](../../../../equation-mapping.html#corpus-equation-045f1a85c9f81356)

For the generic $A_2$ fold exponent, the carrier tail dominates the smooth noncarrier tails:
$$
|A_{h,\ell}|^2=O(\ell^{-3}),
\qquad
\varepsilon_L=O(L_{\mathrm{eff}}^{-2}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c9febadd4de975e)

Thus a practical finite-depth certificate must choose $L_{\mathrm{eff}}$ large enough that the bound implied by $L_{\mathrm{eff}}^{-2}$ is less than $\frac12\Delta C_L$ on the same branch chart. This is a stopping rule for the selection calculation, not a new assumption about which lock wins.

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L
$$

[View →](../../../../equation-mapping.html#corpus-equation-ccdd30ab74935a28)

## Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, phase-bundle topology, effective cancellation, and inference separate:

1. classify the admissible indexed integer locks $(n:m:1)$ under exact delayed phase closure,
2. compute the corresponding radius relations for each candidate carrier choice $h$ under $\beta_h=1$,
3. require nondegenerate orbital-plane data $D_{\mathrm{plane}}\neq0$ so the retained phase bundle is genuinely three-dimensional,
4. define the phase-bundle curvature and caustic-weighted cancellation functional for the low-order causal-wake multipole or effective potential,
5. determine which integer lock minimizes residual curvature and exposed leakage in the exterior/horizon regime,
6. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap on the complement of the flat moduli.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8572c49528b34fe3)

on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-babb4c1dbcc00902)

off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the binary phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-transversality floors, caustic-impulse rows, candidate-carrier index, and history variables needed to evaluate one binary-3-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

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

[View →](../../../../equation-mapping.html#corpus-equation-99b74565951aed05)

where $T_{\mathrm{global}}$ is the global time or phase shift, $\mathfrak{so}(3)_{\mathrm{rot}}$ is the global spatial-rotation tangent space, $T_{\mathrm{flat}}=\operatorname{span}\{(\delta\phi_{23},\delta\phi_{13})\}$ is the flat-connection moduli space, and $G_{\mathrm{rel}}$ contains any declared relabeling symmetry of the retained branch chart. A lock is dynamically stable only if the return map contracts on the complement of $G$ and the flat-modulus directions remain genuinely neutral. If a flat-modulus direction becomes unstable, the frequency commensurability may remain while Assumption 3 fails through relative-phase drift. The quotient rule is strict. A direction in $T_{\mathrm{flat}}$ is treated as a symmetry only when the holonomy-defect coordinate
$$
\Theta(T)
=
\left(
\phi_{23}(T)-\phi_{23}^\ast,\,
\phi_{13}(T)-\phi_{13}^\ast
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-747678d85346703b)

has zero Floquet exponent on the retained return map. If $\Theta$ has a positive exponent, the same direction is a lock-breaking instability, not a quotient direction. This is the retained-branch version of the embedded-binary warning in [Binary Dynamics](../dynamics/binary-dynamics.md): a reduced subsystem's apparent neutral direction cannot be removed unless it is neutral for the full retained branch chart.

If the minimizer turns out to be the binary-3-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the doubling-frequency hierarchy would be a derived selection result rather than a starting assumption.

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

[View →](../../../../equation-mapping.html#corpus-equation-796643e7e09d8333)

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The doubling-frequency conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

## Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory, let $\boldsymbol{\psi}_i=(\theta_{3,i},\phi_{23,i},\phi_{13,i})$ be the returned phase row, $\mathbf{r}^{\mathrm{bin}}_i=(r_{1,i},r_{2,i},r_{3,i})$ the binary-radius row, $\boldsymbol{\beta}_i=(\beta_{1,i},\beta_{2,i},\beta_{3,i})$ the speed-factor row, and $\mathcal{R}^{\mathrm{rec}}_i$ the returned branch record containing active-root ledger data, candidate-carrier impulse rows, and retained causal-wake history variables. The sampled state is
$$
z_i=(\boldsymbol{\psi}_i,\mathbf{r}^{\mathrm{bin}}_i,\boldsymbol{\beta}_i,\mathcal{R}^{\mathrm{rec}}_i,h_i,\hat{\mathbf{n}}_{1,i},\hat{\mathbf{n}}_{2,i},\hat{\mathbf{n}}_{3,i})\in\mathcal{S}_{m,n}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-a41b4401ef7e3a44)

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

[View →](../../../../equation-mapping.html#corpus-equation-b2de705baf0c671a)

where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$, while the holonomy-defect coordinate is not quotiented:

$$
\Theta(T)
=
\left(
\phi_{23}(T)-\phi_{23}^\ast,\,
\phi_{13}(T)-\phi_{13}^\ast
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-747678d85346703b-2)

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared binary-3-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the candidate-carrier assignment is stable under refinement or its transition is explicitly recorded, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

## Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-a51f0171fd91214c)

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal rank-three bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c34babac066f273)

whereas

$$
1{:}2{:}4\ \text{doubling-frequency cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7a50aa3db26d742a)

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the doubling-frequency Noether braid lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above. The separating wall is the plane-degeneracy condition
$$
D_{\mathrm{plane}}=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b6ac679d0cad5e11)

On one side, the near-orthogonal sector carries three independent phase circles and covering data. On the wall, the phase chart collapses into a coplanar cyclic configuration where cancellation is representation-theoretic inside one plane. Crossing this wall is therefore a change in cancellation topology, not a smooth deformation inside one sector. The reachable theorem target is that the doubling-frequency sector and the coplanar $\mathbb{Z}_3$ sector cannot be connected by a path that preserves both $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ and a positive non-symmetry Floquet gap.

For a neighboring closure problem, see [Horizon Chirality](../spacetime/horizon-chirality.md).
