# Geometric Phase and Holonomy

## Purpose, Result, and Ownership

This synthesis develops the [bidirectional mapping method](../../mapping/mapping-method.md#bidirectional-mapping-and-mathematical-reframing) for phase and gauge recovery: established effective phenomenon → required mathematical structure → native state and operation → possible assembly realization → independent falsifier. The main result is a conditional exclusion: **a native reduction whose entire operational memory consists of independent additive phase counters cannot reproduce an order-sensitive non-Abelian comparison**. The proof below also explains why endpoint shapes, constituent counts, and axis names are insufficient. This is a restriction on proposed representations, not a rejection of the Master Equation or any complete braid family.

Plainly: a carrier must remember enough for the receiver to distinguish routes that nature distinguishes. Three named axes or several clocks do not automatically supply that memory or the operations that act on it.

**Claim grade: derived** for the displayed comparison mathematics and conditional lemmas; **inferred** for the resulting necessary native requirements; **guessed** for particular core, accessory, or medium assignments. No native transport law, retained assembly, detector probability law, gauge recovery, or score increase is established here. The mathematical falsifiers are failures of the shown identities under their stated hypotheses; native falsifiers are specified with each construction. Reported experimental facts are separately marked as measured by their source instrument, not by a repository calculation.

Plainly: the mathematics can rule out an inadequate description before a physical carrier exists. It cannot certify a carrier merely because the carrier has enough adjustable coordinates.

The introductory SMC-012 result is recorded in the [parent work log](../work-log.md#2026-08-28--smc-012-geometric-phase-and-holonomy-exploration). The scientific owners remain [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md), [Gauge Symmetries](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md), and [Weak-Sector Gauge Closure](../weak-sector-gauge-closure.md). General inverse requirements remain in [Inferring Braid Requirements](../../mapping-equations/inferring-braid-requirements.md); candidate admission remains in the [registry](../../braid-program/candidate-registry.md) and [adjudication](../../braid-program/braid-candidate-requirement-adjudication.md). The [spinor exploration](../../mapping-quantum/spinors-rotations-and-history/brainstorming.md) is a read-only companion, not a second owner of gauge transport.

## Phase and Transport: Definitions With a Comparison Rule

A **phase convention** is a choice of normalized representative for a complex line: vectors differing by a common factor of unit modulus describe the same ray. It is not a physical rotation of an assembly or a shift of a source relative to its reference. A **connection** specifies how to compare neighboring fibers, the spaces of allowed transported objects above points of a base space. A **holonomy** is the resulting transformation after closed transport with endpoints identified. **Curvature** measures the leading failure of transport around an infinitesimal loop to be the identity. These definitions require both a base and a transport rule; a loop drawn on a page supplies neither by itself.

Plainly: the base says which settings change, the fiber says what is carried, and the connection says how to carry it. Holonomy is what is left when the settings return and the carried object is compared with its initial reference.

Use a smooth dimensionless path parameter $s\in[0,1]$, a base point $b=C(s)$, an orthonormal local frame $E(b)$ whose columns span the comparison fiber, and a coefficient column $z(s)$, so the transported vector is $\psi(s)=E(C(s))z(s)$. A dagger means conjugate transpose. In the embedded-vector-space example the induced connection is the anti-Hermitian matrix-valued one-form $\mathcal A=E^\dagger dE$. Its parallel rule, curvature, and transport matrix are

$$
\frac{dz}{ds}=-\mathcal A_s z,
\qquad
\mathcal A_s=\mathcal A_{C(s)}\!\left(\frac{dC}{ds}\right),
\qquad
\mathcal F=d\mathcal A+\mathcal A\wedge\mathcal A,
\qquad
\mathcal U[C]=\mathcal P\exp\!\left(-\int_C\mathcal A\right)
$$

Plainly: $z$ contains the carried components, $E$ translates those components into an actual vector, and $\mathcal A_s$ supplies their change per step along $C$. The symbol $d$ means differentiation on the base; the wedge combines oriented area directions and matrix multiplication. $\mathcal F$ records the small-loop mismatch. $\mathcal P$ means later steps multiply on the left, preserving their order. Here $\mathcal U$ is a mathematical transport map, not a new substrate variable.

For a one-dimensional complex fiber, write the real Berry connection as $a_{\mathrm B}=i n^\dagger dn$ for a unit representative $n$. Then $\mathcal A=-i a_{\mathrm B}$. A **dynamical phase** is accumulated by the effective time-evolution generator; a **geometric phase** is the remaining phase of the transported ray after that dynamical term is removed using a declared rule. They are not separated merely by calling one term a clock and another a twist. In the smooth, gapped, isolated-eigenstate adiabatic limit, with observer time $t_{\mathrm{eff}}$, energy eigenvalue $E_n$, and measured action scale $\hbar$, the comparison Schrödinger equation gives

$$
\psi=e^{i\alpha}n,
\qquad
i\hbar\frac{d\psi}{dt_{\mathrm{eff}}}=H_{\mathrm{cmp}}\psi,
\qquad
\frac{d\alpha}{dt_{\mathrm{eff}}}=-\frac{E_n}{\hbar}+i n^\dagger\frac{dn}{dt_{\mathrm{eff}}}
$$

$$
\alpha_{\mathrm{dyn}}=-\frac{1}{\hbar}\int E_n\,dt_{\mathrm{eff}},
\qquad
\alpha_{\mathrm{geom}}=\arg\!\left[n(0)^\dagger n(1)\right]+\int_C a_{\mathrm B}\pmod{2\pi}
$$

Plainly: substituting the phase times the instantaneous eigenvector into the effective evolution law separates the energy-clock contribution, $\alpha_{\mathrm{dyn}}$, from the change of eigenvector. The endpoint overlap compares the final representative with the initial one, so $\alpha_{\mathrm{geom}}$ is meaningful even when those representatives use different endpoint phases. $H_{\mathrm{cmp}}$ is an effective comparison Hamiltonian, not the architrino acceleration law. The formula for the geometric phase assumes a closed ray, so the endpoint overlap is nonzero; general open-path comparisons need a separately stated closure.

This is the setting of Simon's [holonomy interpretation](https://authors.library.caltech.edu/records/2pepc-k9f58), whose first two pages separate the energy phase from parallel transport in an isolated eigenline. A gap means this eigenvalue remains separated from the others throughout the path. Adiabaticity means a sufficiently slow, smooth traversal suppresses transitions out of that line. Neither assumption is required for the definition of a general connection or for the static magnetic Aharonov-Bohm benchmark. Rate-dependent corrections must be bounded before an experimental residual is called purely geometric.

Plainly: Berry's example follows one selected mode without jumping to another. That is a special physical implementation of transport, not a requirement imposed on every phenomenon discussed here.

### Worked Control: Pure Phase Relabeling

Take a constant physical line with fixed unit vector $n_0$ and zero comparison Hamiltonian. Describe it along any closed parameter loop by $n'(s)=e^{i\chi(s)}n_0$. The object transported is still the same vector in the same line; only its local label changes. The parallel coefficient and endpoint comparison are

$$
a'_{\mathrm B}=-d\chi,
\qquad
z'(1)=e^{-i[\chi(1)-\chi(0)]}z'(0),
\qquad
n'(0)^\dagger n'(1)=e^{i[\chi(1)-\chi(0)]}
$$

$$
e^{i\alpha_{\mathrm{geom}}}
=
\frac{n'(0)^\dagger n'(1)}{|n'(0)^\dagger n'(1)|}
\exp\!\left(i\int_C a'_{\mathrm B}\right)
=1
$$

Plainly: the apparent phase accumulated by the coefficient is exactly canceled by the changed endpoint label. $\chi$ is the arbitrary labeling angle, $z'$ the relabeled coefficient, and the unit-modulus overlap supplies the endpoint conversion. Nothing moved, nothing remembered a physical route, and no detector comparison changed.

A periodic convention on the loop requires $e^{i\chi(1)}=e^{i\chi(0)}$; the real angle may differ by an integer multiple of $2\pi$. A nonperiodic frame on the cut interval is also usable, but its endpoint transition cannot be discarded. Omitting that transition manufactures a false phase. The dynamical contribution is zero in this control because the effective Hamiltonian was chosen zero, not because all phase evolution is geometric.

**Claim grade: derived.** This is a sufficient zero-effect control for the declared constant-line setup. Independent check: multiply the two endpoint factors directly, or retain the constant vector in a fixed frame and find identity transport. Falsifier: any claimed nonzero closed comparison in this setup identifies a missing endpoint factor or an active physical change. Existing owner: the [passive/active covariance distinction](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md#gauge-covariance-recovery-target).

Plainly: a valid calculation must give the same answer in the moving labels and in the fixed labels. Renaming the labels must not create an effect.

### Worked Loop: An Eigenline Over the Direction Sphere

Consider the explicitly effective two-level Hamiltonian $H_{\mathrm{cmp}}(\hat{\mathbf n})=E_*\hat{\mathbf n}\cdot\boldsymbol\sigma$ with $E_*>0$, where $\boldsymbol\sigma$ denotes the three Pauli matrices and $\hat{\mathbf n}=(\sin\theta\cos\varphi,\sin\theta\sin\varphi,\cos\theta)$ is a unit control direction. The positive eigenvalue is $E_*$, its gap is $2E_*$, and a northern-chart eigenvector is

$$
n(\theta,\varphi)=\begin{pmatrix}\cos(\theta/2)\\ e^{i\varphi}\sin(\theta/2)\end{pmatrix},
\qquad
n^\dagger dn=i\sin^2(\theta/2)\,d\varphi,
\qquad
a_{\mathrm B}=-\frac{1-\cos\theta}{2}\,d\varphi
$$

Plainly: $\theta$ and $\varphi$ locate the control direction, not an architrino position. The two entries of $n$ describe the selected comparison mode. Differentiating them shows how that mode changes as the direction moves; $E_*$ controls the energy gap but does not appear in this geometric connection.

Transport that eigenline around $C_{\theta_0}$, with fixed $\theta_0$ and increasing $\varphi$ from zero to $2\pi$. The representative returns exactly, so the endpoint overlap contributes no phase. Its curvature and loop result are

$$
f_{\mathrm B}=da_{\mathrm B}=-\frac12\sin\theta\,d\theta\wedge d\varphi,
\qquad
\alpha_{\mathrm{geom}}(C_{\theta_0})=-\pi(1-\cos\theta_0)=-\frac{\Omega(C_{\theta_0})}{2}
$$

$$
\theta_0=\frac{\pi}{3}
\quad\Longrightarrow\quad
\Omega=\pi,
\qquad
e^{i\alpha_{\mathrm{geom}}}=-i
$$

Plainly: $f_{\mathrm B}$ is the curvature of this eigenline connection, and $\Omega$ is the oriented solid angle inside the control loop. At a polar angle of sixty degrees the cap has solid angle $\pi$, giving a residual phase of minus ninety degrees. The loop closes in the control settings but not in the parallel-transported vector. Reversing the path changes the sign; shrinking the cap continuously changes the answer. This holonomy is therefore not determined by the loop's topological class alone.

An independent calculation uses neighboring overlaps rather than differentiating the eigenvector. Set $c_\theta=\cos(\theta_0/2)$, $s_\theta=\sin(\theta_0/2)$, and sample $N$ equal azimuthal steps. Parallel transport is the limit of successive orthogonal projections onto the selected lines. The normalized cyclic overlap product is

$$
\mathcal U_N
=
\left[
\frac{c_\theta^2+s_\theta^2e^{-2\pi i/N}}
{|c_\theta^2+s_\theta^2e^{-2\pi i/N}|}
\right]^N,
\qquad
\lim_{N\to\infty}\arg\mathcal U_N\equiv-2\pi s_\theta^2\pmod{2\pi}
$$

Plainly: each factor compares a mode with the next mode directly. Taking many small steps gives the same minus-half-solid-angle result without using the connection integral. The finite-step product is a comparison instrument with discretization error; its limiting formula is an analytic reference, not a saved output from the instrument being checked.

For a traversal lasting an observer-time interval $\Delta t_{\mathrm{eff}}$, the energy phase is $-E_*\Delta t_{\mathrm{eff}}/\hbar$. A coherent reference prepared in the same mode, with equal energy-phase integral, isolates the residual by recombination; otherwise that dynamical difference must be retained. The source preparation, actual control path, leakage from the chosen eigenline, reference phase, receiver analyzer, and detector response are part of the physical experiment. A mathematical phase factor alone is not an observation.

**Claim grade: derived** for the eigenvector, integral, and projection limit; **inferred** for the requirement that a proposed native realization preserve an analogous route-sensitive relational record. The independent falsifiers are disagreement of the two calculations after refinement, a changed answer under a legitimate phase convention, or unresolved nonadiabatic leakage in a claimed physical Berry comparison. Existing owners: the gauge chapters and the [path-sensitive requirement](../../mapping-equations/inferring-braid-requirements.md#cross-sector-geometry-requirements). No native eigenline or effective energy operator is supplied by this example.

Plainly: the calculation proves a property of the specified two-level model. A braid explanation still owes the physical modes, their transport, and the apparatus comparison.

## Polarization, Magnetic Flux, and Rotation Are Different Experiments

### Worked Polarization Geometry

For ideal geometric polarization transport, the base is the sphere of propagation directions $\hat{\mathbf k}$, not position space. The carried object is a transverse polarization vector $\mathbf e\cdot\hat{\mathbf k}=0$. Assume lossless isotropic propagation, sufficiently smooth bending, and no unresolved birefringence or twist-induced optical activity. The geometric rule is tangent-plane parallel transport, $P_\perp d\mathbf e/ds=0$, where $P_\perp=I-\hat{\mathbf k}\hat{\mathbf k}^{\mathsf T}$. Ordinary optical propagation still has a dynamical phase; this rule concerns the polarization after that contribution is separated.

Plainly: light changes direction while its polarization is carried in the perpendicular plane. The rule forbids an extra turn within that moving plane. A real fiber can add other rotations, so its material behavior cannot be silently identified with the geometric rule.

Use the orthonormal tangent vectors $\mathbf e_\theta,\mathbf e_\varphi$ on the direction sphere, and write $\mathbf e=\cos\beta_{\mathrm{pol}}\mathbf e_\theta+\sin\beta_{\mathrm{pol}}\mathbf e_\varphi$. Direct differentiation gives $\mathbf e_\varphi\cdot d\mathbf e_\theta=\cos\theta\,d\varphi$, hence

$$
d\beta_{\mathrm{pol}}=-\cos\theta\,d\varphi,
\qquad
\Delta\beta_{\mathrm{pol}}(C_{\theta_0})=-2\pi\cos\theta_0
\equiv\Omega(C_{\theta_0})\pmod{2\pi}
$$

Plainly: $\beta_{\mathrm{pol}}$ is the polarization's angle relative to the moving tangent axes. Those axes turn as the direction changes, and parallel transport subtracts that turn. Returning to the starting direction leaves the polarization rotated by the cap's solid angle, modulo a full turn. The axis of linear polarization alone is measured modulo a half-turn; a coherent field comparison can also retain its sign.

A second, exact check avoids spherical-coordinate differentiation. Follow the three short great-circle arcs $\hat{\mathbf k}:\mathbf e_z\to\mathbf e_x\to\mathbf e_y\to\mathbf e_z$, starting with polarization $\mathbf e_x$. Parallel transport along each arc is the ordinary rotation about its fixed normal. The transported vector follows $\mathbf e_x\to-\mathbf e_z\to-\mathbf e_z\to\mathbf e_y$. The spherical triangle encloses solid angle $\pi/2$, and the vector has turned by $\pi/2$ at the original direction, agreeing with the curvature result.

**Claim grade: derived.** The independent checks are the three explicit rigid rotations and the spherical area. Falsifier: a claimed tangent-parallel calculation returning a different final vector for these same oriented arcs. A measured optical test instead needs input polarizer, fiber direction and material history, output analyzer, and receiver intensity record. Tomita and Chiao's [optical-fiber experiment](https://doi.org/10.1103/PhysRevLett.57.937) reports such a classical polarization measurement; this synthesis does not reproduce its raw data or uncertainty analysis.

Plainly: one can verify the geometric right-angle turn with three simple rotations. That proves the transport geometry; measuring it in a fiber also requires controlling the fiber's own effects.

For circular vectors $n_\pm=(\mathbf e_\theta\pm i\mathbf e_\varphi)/\sqrt2$, the same real rotation is represented by opposite complex phases. With this basis convention, $a_\pm=\pm\cos\theta\,d\varphi$, and their loop factors are $e^{\mp i\Omega}$. The factor of solid angle differs from the spin-one-half eigenline example. A two-component Jones description of polarization is therefore not evidence that a photon transforms as a spin-one-half particle. Polarization is an internal transverse response with its own representation of spatial rotations; it is not an electric-charge phase of the photon.

Plainly: linear polarization combines two circular components. Opposite phases of those components rotate the visible polarization. Two components in a calculation do not identify the particle's spin or its electric charge.

### The Magnetic Aharonov-Bohm Benchmark

The magnetic Aharonov-Bohm setup compares two coherent charged-particle arms with common source and receiver events, passing on different sides of an excluded flux region. The base is the accessible observer-space region, and the effective transported object is the charged amplitude relative to its reference arm. For static sources, vanishing effective electromagnetic field on the arm interiors, and controlled nongauge dynamical contributions, define $q_{\mathrm{eff}}$ as signed charge and the dimensionless connection one-form $a_{\mathrm{em}}=(q_{\mathrm{eff}}/\hbar)\mathbf A_{\mathrm{eff}}\cdot d\mathbf x_{\mathrm{eff}}$. Then

$$
\mathcal U_{\mathrm{rel}}
=\mathcal U[C_2]^{-1}\mathcal U[C_1]
=\exp\!\left(\frac{i q_{\mathrm{eff}}}{\hbar}\oint_{C_1-C_2}\mathbf A_{\mathrm{eff}}\cdot d\mathbf x_{\mathrm{eff}}\right)
=\exp\!\left(\frac{i q_{\mathrm{eff}}\Phi_B}{\hbar}\right)
$$

Plainly: $C_1$ and $C_2$ are the two arms and $\Phi_B$ is the oriented enclosed flux. Subtracting their integrals makes a closed comparison. Reversing the arm orientation or charge reverses the phase. The effective potential $\mathbf A_{\mathrm{eff}}$ and measured $\hbar$ summarize the standard benchmark; this equation does not insert either as an architrino primitive.

On a cylindrical annulus around an ideal excluded flux tube, choose $\mathbf A_{\mathrm{eff}}=\Phi_B\mathbf e_\varphi/(2\pi r_{\mathrm{eff}})$. Locally its curl vanishes. For winding number $w$, however,

$$
a_{\mathrm{em}}=\frac{q_{\mathrm{eff}}\Phi_B}{2\pi\hbar}\,d\varphi,
\qquad
da_{\mathrm{em}}=0,
\qquad
\mathcal U_w=\exp\!\left(iw\frac{q_{\mathrm{eff}}\Phi_B}{\hbar}\right)
$$

Plainly: the radius $r_{\mathrm{eff}}$ cancels between the potential and the circular path length. The connection has zero curvature on the accessible annulus but keeps a nontrivial loop phase. The integer $w$ counts turns around the excluded region. Topology permits this effect; the chosen flux fixes its value. A loop's topology alone does not determine that value.

A proposed gauge removal uses $\chi=q_{\mathrm{eff}}\Phi_B\varphi/(2\pi\hbar)$ in a passive convention with $a'_{\mathrm{em}}=a_{\mathrm{em}}-d\chi$. This removes the local one-form but is globally single-valued for this charge only when $q_{\mathrm{eff}}\Phi_B/\hbar\in2\pi\mathbb Z$. Otherwise the endpoint transition restores the same holonomy. Multiple charged sectors require one globally compatible gauge description; the global group quotient and allowed flux sectors are additional data, not consequences of a local charge table. Stokes' theorem cannot be applied using a spanning disk that lies wholly in the field-free annulus, because that disk does not exist there.

**Claim grade: derived** for this annulus calculation; **measured** for the shielded-flux relative phase reported by Tonomura and colleagues' [electron-holography experiment](https://doi.org/10.1103/PhysRevLett.56.792). Its instrument compares beams through and outside a superconducting-coated toroidal magnet; its scope is a flux-dependent interference record, not a microscopic ontology. Independent native falsifier: no phase survives at the benchmark's local-response tolerance, or the phase requires a private fitted law, unexplained arm deflection, or a gauge-dependent detector prediction. The [existing Aharonov-Bohm owner](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md#aharonov-bohm-holonomy-benchmark) retains the quantitative acceptance contract.

Plainly: a harmless change of labels cannot erase the flux-dependent comparison. A native explanation must account for the source, shield, both arm histories, reference, receiver, and detector together; a measured null in the effective local response does not mean every constituent acceleration or source-history contribution vanishes.

The native obligation is especially restrictive here. If a candidate's entire phase update is a function only of the effective field evaluated on each arm, and it supplies no source, boundary, history, or global-transition information, it predicts identical updates for all these field-free arms. It therefore cannot recover flux dependence. The restriction does not exclude a source-history mechanism or require an independent wake degree of freedom. A causal wake is fixed by transmitter histories; any phase or action extracted from it must be a derived functional, including the calibrated action-to-phase conversion. Writing $\Delta\alpha=\Delta\mathcal S/\hbar$ is a target unless both the action functional and its operational phase readout are derived.

Plainly: a model that reads only zero local field cannot distinguish two different enclosed fluxes. It needs access to information the local field summary discarded, and must show how that information reaches the comparison apparatus.

### Rotation Sign and the Limits of the Analogy

For a spatial rotation of a spin-one-half comparison state, the lifted operator about the third axis is $\mathcal D(\vartheta)=\exp(-i\vartheta\sigma_3/2)$, so $\mathcal D(2\pi)=-I$ and $\mathcal D(4\pi)=I$. The base is the ordinary rotation group $SO(3)$; continuous lifting to its double cover $SU(2)$ retains the two loop classes. This is not the Berry direction-sphere experiment: an active rotation need not be adiabatic, and physical implementation can add dynamical phases. The sign of a lone ray is unobservable; an arm-selective rotation compared with an unrotated coherent reference can retain a relative minus sign. The native spinor lift and its measurement burden remain with the [spinor exploration](../../mapping-quantum/spinors-rotations-and-history/brainstorming.md).

Plainly: a full spatial turn can change the sign in a spinor description, but a sign becomes a physical test only relative to another controlled path. A weak doublet uses the same abstract matrix group for a different internal action; it is not a spatially rotated pair of particles.

| Example | Object and base | Transport and comparison | Description freedom and physical distinction |
| --- | --- | --- | --- |
| Pure convention control | Fixed line; arbitrary parameter loop | Constant physical vector; endpoint conversion cancels the apparent phase | Local phase labels only; no physical cycle |
| Berry eigenline | Isolated effective mode; control sphere | Adiabatic eigenline following; remove energy phase and recombine with reference | Phase of each eigenvector is arbitrary; solid angle remains |
| Geometric polarization | Transverse vector; propagation-direction sphere | Tangent-plane parallel transport; compare input/output analyzer frames | Tangent-frame choices are arbitrary; material rotation must be separated |
| Magnetic Aharonov-Bohm | Charged coherent arms; region around excluded flux | Effective electromagnetic transport; compare common endpoints | Single-valued gauge descriptions preserve flux holonomy; no adiabatic eigenmode premise |
| Spinor rotation sign | Spinor; closed spatial-rotation path | Continuous rotation lift; controlled relative-arm comparison | Quaternion sign at one isolated point is a coordinate choice; lifted path comparison is additional data |

Plainly: each row identifies what goes around a loop, which rule remembers the route, and how a receiver compares the result. Similar formulas do not identify their sources, carriers, or mechanisms.

## Non-Abelian Transport and What Is Actually Invariant

### Basis Changes, Composition, and Basepoints

For a unitary change of local frame $E'=Eg$, coefficients change as $z'=g^{-1}z$. Differentiating this relation in the parallel equation gives

$$
\mathcal A'=g^{-1}\mathcal A g+g^{-1}dg,
\qquad
\mathcal F'=g^{-1}\mathcal Fg,
\qquad
\mathcal U'[C]=g(b_1)^{-1}\mathcal U[C]g(b_0)
$$

Plainly: $g$ changes component labels while keeping the transported vector fixed. The extra derivative term compensates for labels that change along the path. Curvature and transport matrices change by the corresponding basis conversion; individual matrix entries are not invariants. The endpoints $b_0,b_1$ specify which conversions are needed.

For $C_1:b_0\to b_1$ followed by $C_2:b_1\to b_2$, uniqueness of the linear transport equation gives $\mathcal U[C_2\circ C_1]=\mathcal U[C_2]\mathcal U[C_1]$. Reversing the same mathematical path under the same connection gives the inverse. A closed-loop matrix transforms by conjugation at its basepoint. If $p:b_0\to b_1$ transports the reference and a loop $C$ is based at $b_0$, the corresponding loop at $b_1$ is $p\circ C\circ p^{-1}$ and

$$
\mathcal U[p\circ C\circ p^{-1}]
=\mathcal U[p]\mathcal U[C]\mathcal U[p]^{-1}
$$

Plainly: composition joins the end of one route to the beginning of the next. Moving the loop's reference point carries its comparison basis with it, conjugating the matrix. A different connector $p$ can give a different matrix; its eigenvalues and traces of powers remain the same for this transported loop. This inverse-path identity does not assert that a delayed native experiment can be physically undone without restoring its histories.

For unitary loop matrices, the unordered eigenvalue set, determinant, and all traces of powers are conjugacy data; the eigenvalue set determines the conjugacy class. A single trace need not do so in arbitrary dimension and never specifies the orientation of several holonomies relative to each other. Curvature transforms covariantly too. Neither curvature components nor arbitrary holonomy entries are gauge-invariant measurements. A detector needs normalized preparation $z_0$ and an analyzer matrix $0\le M_{\mathrm{det}}\le I$, with the effective probability comparison

$$
p_{\mathrm{det}}=z_0^\dagger\mathcal U^\dagger M_{\mathrm{det}}\mathcal U z_0,
\qquad
z'_0=g(b_0)^{-1}z_0,
\qquad
M'_{\mathrm{det}}=g(b_1)^{-1}M_{\mathrm{det}}g(b_1)
$$

Plainly: the scalar $p_{\mathrm{det}}$ is unchanged when state, transport, and analyzer are relabeled together. Changing the transport labels while freezing the analyzer's old entries compares different physical preparations. The quadratic detection formula is effective comparison mathematics; a native derivation must recover it rather than install it as a primitive probability rule.

### Worked Ordered-Transport Counterexample

Take the base to be a two-torus with dimensionless angular coordinates $(u,v)$, each periodic modulo $2\pi$, and a trivial two-dimensional complex fiber. Specify the comparison connection $\mathcal A=(i/8)(\sigma_1\,du+\sigma_3\,dv)$ and no additional dynamical generator. The first loop increases $u$ from zero to $2\pi$ at $v=0$; the second increases $v$ at $u=0$. Integrating $dz=-\mathcal A z$ on these constant-generator loops gives the transports $U,V$. Choose preparation $z_0$ and analyzer direction $z_+$ at their common basepoint:

$$
U=\frac{1}{\sqrt2}\begin{pmatrix}1&-i\\-i&1\end{pmatrix},
\qquad
V=\begin{pmatrix}e^{-i\pi/4}&0\\0&e^{i\pi/4}\end{pmatrix},
\qquad
z_0=\begin{pmatrix}1\\0\end{pmatrix},
\qquad
z_+=\frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}
$$

Plainly: $U$ mixes the two components, whereas $V$ gives them opposite phases. $z_0$ is the preparation and $z_+$ is the analyzer direction. Both matrices are unitary with determinant one. They are explicitly specified comparison operations, not transports claimed to have emerged from a braid.

Apply $U$ then $V$, and compare with $V$ then $U$. Direct multiplication gives

$$
VU z_0=e^{-i\pi/4}z_+,
\qquad
UV z_0=\frac{e^{-i\pi/4}}{\sqrt2}\begin{pmatrix}1\\-i\end{pmatrix},
\qquad
|z_+^\dagger VUz_0|^2=1,
\qquad
|z_+^\dagger UVz_0|^2=\frac12
$$

Plainly: the same source and analyzer distinguish the two orders: one output lies exactly along the analyzer, and the other has half its squared projection there. A common overall phase cancels, but the relative component phase does not. This is an order-sensitive effective comparison, not a new experimental measurement.

Yet $\operatorname{tr}(VU)=\operatorname{tr}(UV)=1$, and $VU=V(UV)V^{-1}$. Thus even complete conjugacy data of these two individual products cannot distinguish them without reference to the preparation and analyzer. Their relative loop is $K=(UV)^\dagger VU$. Direct calculation gives $\operatorname{tr}K=1$ and $\det K=1$, so its eigenvalues are $e^{\pm i\pi/3}$, whereas commuting operations would give $K=I$ and trace two. Under a common basepoint relabeling, $K$ is conjugated; its trace remains a valid joint comparison.

**Claim grade: derived.** Independent check: the Pauli identity $\sigma_i\sigma_j=\delta_{ij}I+i\epsilon_{ijk}\sigma_k$ gives the same products from $U=e^{-i\pi\sigma_1/4}$ and $V=e^{-i\pi\sigma_3/4}$, independently of entrywise multiplication. Falsifier: a different analyzer probability or characteristic polynomial under those exact definitions. The lesson constrains candidate transport records; it does not establish that a weak or color experiment implements these particular loops.

Plainly: tracing each completed loop can discard the information needed to compare their order. Either retain the source/analyzer relation or form a joint relative loop that keeps the missing relation.

This connection has $\mathcal F=(i\sigma_2/32)\,du\wedge dv$, since $[\sigma_1,\sigma_3]=-2i\sigma_2$. The two loop orders are homotopic on the torus, but their transports differ because the connection is not flat. The comparison admits smooth single-valued unitary frame changes on the torus, with preparation and analyzer transformed together as above.

Plainly: even paths that can be continuously deformed into one another can produce different transport when curvature is present. The example has an explicit base, route, rule, and receiver comparison; none of that supplies a physical braid realization.

### Curvature, Topology, and Degenerate Modes

With the convention $dz=-\mathcal A z$, a small positively oriented coordinate rectangle of sides $\delta u,\delta v$ has transport $I-\mathcal F_{uv}\delta u\delta v+O(\delta u^2\delta v+\delta u\delta v^2)$. For constant connection components, its four factors give the commutator contribution $-[\mathcal A_u,\mathcal A_v]\delta u\delta v$. This explains why a non-Abelian curvature contains more than ordinary derivatives. Conversely, a globally defined pure convention $\mathcal A=g^{-1}dg$ has zero curvature and identity closed holonomy. Flatness alone permits nontrivial holonomy on a multiply connected domain, as the annulus demonstrates; on a simply connected domain with a smooth flat connection and no excluded singularities, all contractible-loop holonomies are identity.

Plainly: curvature controls small-loop mismatch, while holes or excluded regions can preserve global mismatch even when local curvature vanishes. Changing the path can change a curved-connection holonomy without changing its topology. A visible knot is neither necessary nor sufficient for a gauge phase.

Wilczek and Zee's [non-Abelian adiabatic construction](https://doi.org/10.1103/PhysRevLett.52.2111) uses a different physical setup from an arbitrary sequence of matrices: a smooth eigenspace of dimension greater than one, separated by a gap from other states. If its eigenvalue is common across that space, the dynamical phase is scalar and the projected equation after removing it is $dz=-E^\dagger dE\,z$. If modes split or mix with excluded modes, the projected dynamical generator is a matrix and must be retained alongside the geometric term; the two generally cannot be separated by subtracting one scalar integral. Degeneracy means equal eigenvalues here, not a singular spatial metric.

Plainly: several modes can be carried together and mix as settings change. Their ordinary clock evolution separates cleanly only when it is common to all of them. Non-Abelian gauge recovery does not require that every physical weak or color process be an adiabatic degenerate-mode experiment.

## Conditional Exclusions of Inadequate Native Descriptions

### A Quotient Must Preserve Every Claimed Future Comparison

Let $\Theta$ be a complete native situation record, $\pi(\Theta)$ a proposed reduced record, $\Phi_C$ a native evolution under a declared source-control history $C$ on a domain where that evolution is well defined, and $\mathscr D$ the receiver statistic the reduction claims to predict. These are targets for construction, not existing transport capabilities. An exact deterministic reduction can support a well-defined effective operation only if

$$
\pi(\Theta_1)=\pi(\Theta_2)
\quad\Longrightarrow\quad
\pi(\Phi_C\Theta_1)=\pi(\Phi_C\Theta_2)
\quad\text{and}\quad
\mathscr D(\Phi_C\Theta_1)=\mathscr D(\Phi_C\Theta_2)
$$

Plainly: if two full histories are called the same reduced state, they must remain indistinguishable in every future comparison the reduction claims to predict. Otherwise the reduced state forgot necessary information. $\Phi_C$ advances the native history, $\pi$ discards detail, and $\mathscr D$ reads the apparatus. A statistical reduction requires equality of the predicted distributions under declared preparation ensembles, not equality of every individual detector event; the displayed pointwise condition applies only when pointwise prediction is claimed.

**Conditional lemma, claim grade: derived.** Suppose the reduced state at the receiver depends only on endpoint shape and instantaneous rates, and the detector depends only on that reduced state and identical apparatus inputs. If two histories end with equal retained inputs, they necessarily produce the same detector result. Proof: both arguments of the same detector function are equal. Thus a reproducible route-dependent result excludes that reduction. It does not exclude deterministic mechanics, because a complete history or apparatus record can differ at the same visible endpoint. Independent falsifier of a candidate reduction: a matched endpoint pair with different future response under the same continuation, checked against the complete records rather than a same-code endpoint fingerprint.

Plainly: determinism does not say that a photograph determines the future. In delayed dynamics the two photographs may conceal different earlier emissions that still matter.

The existing [recurrence-depth analysis](../../mapping-equations/inferring-braid-requirements.md#recurrence-depth) already separates visible return from history return. The added requirement here is operational closure of the quotient: a purported gauge equivalence must survive all of the source-to-receiver continuations being claimed. A full physical history does not literally loop in absolute time. A closed base path means settings or selected configuration variables return while absolute time increases and the complete record may change.

Plainly: the loop closes in a description of settings, not in time. What remembers the route can be internal geometry, an emitted history, the source, a medium, or the apparatus; its location must be established by the native calculation.

### Independent Phase Counters Cannot Supply an Order-Sensitive Action

Assume a proposed carrier retains only $k$ phase counters $\boldsymbol\phi\in(\mathbb R/2\pi\mathbb Z)^k$ for the relevant operations. Each closed control $C$ acts by a state-independent addition $F_C(\boldsymbol\phi)=\boldsymbol\phi+\boldsymbol\delta_C$, and the later detector uses only the final counters and the same external inputs. Then

$$
F_DF_C(\boldsymbol\phi)
=\boldsymbol\phi+\boldsymbol\delta_C+\boldsymbol\delta_D
=F_CF_D(\boldsymbol\phi)
$$

Plainly: $\boldsymbol\delta_C$ and $\boldsymbol\delta_D$ are the two phase increments. Addition commutes, so the final counters cannot say which operation happened first. Adding more independent counters does not change that fact.

**Conditional lemma, claim grade: derived.** Under these hypotheses every detector function of the final counters predicts equal outcomes in the two orders. Hence no such reduction realizes the ordered example above or a noncommuting effective transport action distinguished by an admissible preparation/analyzer pair. Proof: apply the same detector function to the equal final arguments. Independent check: ordinary addition on a torus, contrasted with the explicit matrix/analyzer calculation. Falsifier of the exclusion would require an order-sensitive result while satisfying all hypotheses; state-dependent increments, mode mixing, retained source order, or an apparatus memory instead violate a hypothesis and provide candidate escape routes.

Plainly: the exclusion is precise. It rules out independent additive clock memory as the whole explanation. It does not rule out coupled oscillators or history-dependent deformations whose operations change what the next operation can do.

This is a necessary operational requirement, not evidence that all microscopic updates must themselves be matrices. If a reduced effective action is linear and complex, noncommuting unitary transport needs dimension at least two. A nontrivial continuous unitary representation of the full color Lie algebra needs at least three complex dimensions: a nonzero representation of the simple eight-dimensional algebra $\mathfrak{su}(3)$ is injective, while $\mathfrak u(2)$ has dimension four. These are dimensions of an effective response space, not counts of architrinos, axes, classical coordinates, or temporal frequencies. An infinite history space can supply a finite effective space without assigning one constituent per component.

Plainly: two-component and three-component effective descriptions require enough independent responses to support their operations. Counting microscopic pieces does not establish that response dimension.

### Permutations of Three Labels Do Not Recover Continuous Color Transport

A finite set of three exceptional-axis labels admits a permutation action, and permutations can fail to commute. Nevertheless, a continuous homomorphism from connected $SU(3)$ into the discrete permutation group $S_3$ is constant: a connected image in a discrete space is one point, and the identity must map to the identity. Adding only diagonal phase changes gives the monomial subgroup, whose connected part contains diagonal phases but no continuous mixing of different basis directions. It still lacks the full color algebra.

**Claim grade: derived.** The exclusion applies when the entire color state and allowed operation set are the finite labels, or diagonal phases plus permutations. Independent check: connectedness and the missing off-diagonal infinitesimal generators. Falsifier of a candidate assignment: its alleged small color rotation is either a discontinuous relabeling or cannot generate a coherent off-diagonal comparison. A derived continuous internal mode space would escape this exclusion, but the derivation must include its comparison norm and response, not simply call the span $\mathbb C^3$.

Plainly: three labels can be shuffled in different orders, but color recovery requires more than shuffling. It needs continuously variable mixing and the correct invariant comparisons. The [color chapter's algebra closure](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md#algebra-closure-rigorous-statement) proves an algebra after the complex space and admissible operators are specified; it does not derive those premises from three spatial axes.

## Native State, Dynamics, and the Missing Constitutive Map

Use the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) without adding a phase or gauge variable. On a simple-root chart in normalized wake-speed units, $c_f=1$, a native situation contains persistent member identities, polarities $q_i$, worldlines $\mathbf X_i(T')$, and all prior history and incoming boundary data needed for the claimed future window. The source, reference, receiver, accessories if present, apparatus, and relevant medium constituents belong to that joint record. Wakes and causal roots are reconstructed from these histories; they are not independently adjustable state contents. Symbolically,

$$
\Theta=\left\{\bigl(i,q_i,\mathbf X_i(T')\bigr):T'\le T\right\}_{\mathrm{needed\ histories}}
\quad\text{with declared boundary inputs},
\qquad
r_{ij,\ell}=T_r-T_{j,\ell}
$$

$$
\mathbf A_i(T_r)
=
\sum_{j,\ell}
\kappa\,\operatorname{sign}(q_iq_j)|q_iq_j|
\frac{\hat{\mathbf r}_{ij,\ell}}
{r_{ij,\ell}^{2}\left|1-\mathbf V_j(T_{j,\ell})\cdot\hat{\mathbf r}_{ij,\ell}\right|}
$$

Plainly: $T$ is absolute time, $T_r$ a reception time, and $T_{j,\ell}<T_r$ a legal earlier emission from transmitter $j$ on root $\ell$. The delayed separation is $r_{ij,\ell}=\|\mathbf X_i(T_r)-\mathbf X_j(T_{j,\ell})\|>0$, and $\hat{\mathbf r}_{ij,\ell}$ points from that emission to receiver $i$. Each contribution is an acceleration along this line, weighted by polarity, inverse-square separation, and transmitter motion; $\kappa$ is the accepted coupling. The sum includes every required self and partner simple root, with a nonzero displayed denominator. Singular events need the owner's continuation rule. No primitive mass, quantum amplitude, or connection appears in this law.

A native transport construction must identify a relational observable $\pi_b(\Theta)$ and a controlled family of actual source histories such that the induced comparison closes,

$$
\pi_{b_1}(\Phi_C\Theta)
\simeq\mathcal U[C]\pi_{b_0}(\Theta)
$$

Plainly: evolve the complete history first and then read the comparison variables. The result must agree with transporting the initial comparison variables by one derived effective rule. The approximate equality needs a stated regime and tolerance. It is not achieved by assigning the desired matrix $\mathcal U[C]$ to each path afterward.

The base must be enlarged if hidden history changes the result at fixed nominal controls. For example, resetting a source position without resetting its earlier emissions does not repeat the experiment. Similarly, the path-composition law applies to compatible intermediate histories, not to concatenating independently prepared snippets with missing incoming wakes. An effective reversible holonomy can coexist with irreversible apparatus recording, but only after their roles and discarded data are declared. Neither a global quantum amplitude nor a finite-dimensional internal tensor product is assumed in this construction.

Plainly: joining two experiments requires matching what the second experiment receives from the first, including delayed influences. An apparently simple phase law can be a valid summary only after those dependencies are controlled.

| Requirement and source scope | Native information or operation constrained | Necessity, status, and independent falsifier | Existing owner |
| --- | --- | --- | --- |
| Convention invariance; constant-line control | A quotient of complete records that changes descriptions without changing source/reference/receiver comparisons | Necessary; derived control and inferred native requirement. Fail if admissible relabeling changes the same detector prediction | [Gauge covariance](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md#gauge-covariance-recovery-target) |
| Route sensitivity; Berry and Aharonov-Bohm benchmarks | Relational mode/history state plus source, boundary, and reference information beyond instantaneous local field and endpoint shape | Necessary in the claimed coherent regime; carrier unconstructed. Fail by equal reduced inputs with unequal independently established outcomes | [Gauge benchmarks](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md#aharonov-bohm-holonomy-benchmark) |
| Noncommuting transport; ordered example and effective weak/color algebra | Operations that alter relative modes or future response, not only independent phase additions or finite axis labels | Necessary for full non-Abelian recovery; mathematically derived exclusions, native realization unknown. Fail the order comparison while preserving all proposed inputs | [Weak closure](../weak-sector-gauge-closure.md), [color](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) |
| Composition and detector closure; transport equation | Compatible intermediate histories, preparation and analyzer rules, reproducible record formation | Necessary; comparison derivation only. Fail concatenation, refinement, or repeat preparation under one fixed readout | [Mapping method](../../mapping/mapping-method.md), [electron detection](../../../../content/markdown/aaa/assemblies/fermions/electron.md#assembly-and-detection-map) |
| Separation of geometric and dynamical parts; eigenline and polarization cases | Independently extracted clocks, mode gaps where relevant, material response, and leakage bounds | Necessary for a geometric attribution, not for all coherent transport. Fail if residual changes with traversal rate beyond the declared error or requires per-path subtraction fits | [Photon gates](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface), [neutral phase owner](../../mapping/mapping-method.md#common-component-5-common-clock-plus-residual-phase-operator) |

Plainly: these requirements constrain what the same native history must predict. They do not add acceptance gates or declare that a proposed record already exists. A different instrument or an analytic result must supply the comparison; replaying the same code is not independent evidence.

## Braid Cores, Accessories, and Coupled Histories

### What the Live Candidate Families Can and Cannot Supply

The [live registry](../../braid-program/candidate-registry.md) contains six-worldline orthogonal-axis three-binary and coincident-axis three-binary geometries, twelve-worldline two-component circular records, the sector-differential three-pair geometry centered five-coordinate representative, the F-series extensions, and the eight-member asymmetric counter-breathing representative geometry. orthogonal-axis three-binary configurations and centered five-coordinate representative provide different multi-direction and internal-deformation charts; coincident-axis three-binary configurations has one common axis; the opposed-circulation two-component circular members supply a different possible relative-mode structure. F1–F4 explore independent circulation, coupled triads, mode/permutation structure, and framed counterflow; phase-varying display representative has a twelve-member phase-varying prescribed construction; asymmetric counter-breathing representative has six polarity-resolved coordinates on its exact symmetry surface. These are geometry opportunities, not established gauge representations.

Plainly: the search already contains several architectures. Their usable distinction here is which internal relations and histories they can express, not how closely a drawing resembles a familiar particle.

At the inspected state, the adjudication leaves retained-branch requirement H5 unresolved throughout. It preserves bounded ordinary-release evidence for selected A3, centered five-coordinate representative, and asymmetric counter-breathing representative histories, prescribed evidence for other rows, and scoped negatives for the common-cadence circular phase-varying display representative realization and scoped-negative circular control. This synthesis does not rerun or independently revalidate those dynamical results and draws no broader family rejection from them. The two accessory continuations are specifically a three-binary braid plus six accessories, and asymmetric counter-breathing representative plus six accessories in a two-axial/four-transverse arrangement. They imply twelve and fourteen total members respectively, not a universal six-member core with six additions.

**Claim grade: inferred** for the possibility that relative phases, frame relations, or polarity-differential coordinates furnish transport memory; **guessed** for any assignment to weak, color, or particle identity. Independent falsifier: a complete fixed-law, source-driven history yields only a removable label change, fails the quotient/ordering comparisons, or loses the branch before the required comparison window. Existing owners are the registry, adjudication, and [accessory-placement analysis](../../mapping-equations/inferring-braid-requirements.md#accessory-placement-relative-to-the-braid). No candidate score or status changes follow.

Plainly: coordinates can suggest where to look, but only their evolution and comparison can show what they carry. An unresolved test is not a failed family and not a positive result.

### An Accessory Does Not Merely Add a Label

An accessory can change the admissible coupled histories, source-facing exposure, relative modes, and available reaction paths. It can also remove a useful degeneracy or destroy the base branch. Its effect is not small merely because its energy bookkeeping is small: the Master Equation contains no source-energy denominator. The existing staged accessory program separates prescribed probes and one-way response from full mutual evolution; only the latter can support an associated assembly claim. In particular, no independent factorization $\Theta=\Theta_{\mathrm{core}}\times\Theta_{\mathrm{acc}}\times\Theta_{\mathrm{sea}}$ is assumed. These words name portions of one interacting record.

Plainly: adding an accessory changes both sides of an interaction. Holding the core fixed is a useful probe, but it cannot establish how the complete assembly carries a phase when everything responds.

A precise comparison-level test clarifies what it would mean for dressing to preserve a representation. Let $J:\mathcal V\to\widetilde{\mathcal V}$ be an isometric embedding, $J^\dagger J=I$, of an effective undressed response space into a dressed one. Let $S$ be unitary transport of the full dressed space, $\Pi_J=JJ^\dagger$ its retained-subspace projector, and $V_J=J^\dagger S J$ the compressed transport. Then

$$
V_J^\dagger V_J
=I-J^\dagger S^\dagger(I-\Pi_J)SJ
$$

Plainly: $J$ says which dressed modes represent the original response, $S$ moves all dressed modes, and $V_J$ keeps only the selected part. The subtracted term measures leakage into excluded modes. The compressed transport preserves norm exactly only when that leakage vanishes. Merely deleting accessory coordinates can therefore destroy the apparent unitary transport.

**Conditional lemma, claim grade: derived.** The subtracted matrix is $B^\dagger B$ for $B=(I-\Pi_J)SJ$, so it vanishes exactly when the image of $J$ is invariant under $S$. If in addition $SJ=J\rho$ for the desired undressed transport $\rho$, and preparations/analyzers are carried through $J$, all comparisons restricted to that image agree. This relation is an intertwiner: native dressing and effective transport must commute on the selected response space. Independent check: orthogonal decomposition into retained and leaked components proves the same norm identity without matrix expansion. Falsifier: nonzero omitted-channel norm or inconsistent analyzer predictions under the claimed embedding. The hypotheses are not established for any listed accessory assembly.

Plainly: an accessory may preserve the original comparison only if it does not secretly send part of the carried state into modes the reduced description ignores. This is a sufficient mathematical condition for preservation, not a claim that physical accessories satisfy it.

If an accessory changes representation content, preserving every invariant is neither expected nor required. The burden is to preserve spectator comparisons while deriving the changed ones. A generation modification must keep electric and color representation content while changing its allowed mass-facing response and lifetimes. A weak transition changes electric charge in the active sector but must close the source/product/corridor ledger. A color reconfiguration preserves flavor and electric charge. A scalar response may alter mass-facing coefficients without acquiring a preferred spatial axis. These are different operations; accessory count cannot choose among them.

Plainly: the useful question is which measured comparisons an attachment changes and which it leaves alone. Calling an accessory “weak,” “color,” or “scalar” does not answer that question.

## Particle-Family Requirements

### Representation Content Before and After Electroweak Breaking

The following are established **effective recovery constraints**, not constituent assignments. Write $(d_c,d_L)_Y$ for color-representation dimension, weak-representation dimension, and hypercharge in the convention $Q_{\mathrm{em}}=\mathsf T_3+Y/2$, where $Q_{\mathrm{em}}=q_{\mathrm{eff}}/e$ and $e>0$. A bar marks the conjugate color representation. Left and right refer to effective chirality, not the direction of motion or a laboratory handedness label. The [PDG electroweak review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf), sections 10.1–10.2, specifies the chiral multiplets and broken-phase fields; its [neutrino review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf) uses the half-sized hypercharge convention, converted here by $Y=2Y_{\mathrm{source}}$.

Plainly: the tuple says how an effective field responds to color and weak basis changes, and which hypercharge it carries. Those numbers count response components, not physical pieces. A chirality label and a spatial spin label constrain different transformations.

For each of the three generations, the effective chiral fields are

$$
L_L=(\nu,\ell)_L:(1,2)_{-1},
\qquad
\ell_R:(1,1)_{-2},
\qquad
Q_L=(u,d')_L:(3,2)_{1/3}
$$

Plainly: $L_L$ is a lepton weak doublet and $Q_L$ a quark weak doublet, with $d'$ a weak-basis down-type combination. Charged-lepton right components are weak singlets. The neutrino's right component is a conditional extension, not an observed requirement of the minimal massless model; neutrino masses and mixing require an extension. Neutrino flavor names identify source and detector channels rather than three separate mass eigenmodes.

The remaining quark fields and scalar field are $u_R:(3,1)_{4/3}$, $d_R:(3,1)_{-2/3}$, and $\Phi_H:(1,2)_{+1}$. A Dirac-neutrino extension can include $\nu_R:(1,1)_0$; a Majorana description requires its own mass-generation construction. The symbol $u$ denotes an up-type flavor here. All formulas in this section are comparison-level representation bookkeeping. Internal gauge transformations act on these components; spatial rotations act on spin/polarization. A gauge basis change alone changes no physical preparation. A physical transition between weak components requires an interacting source and balanced charge transfer, not a relabeling of an isolated electron as a neutrino.

Plainly: a two-entry weak field does not mean that arbitrary coherent mixtures of different electric charges can be prepared in isolation. The apparatus and charge exchange needed for a physical comparison cannot be omitted.

The effective neutral fields mix after symmetry breaking. With $s_W=\sin\theta_W$, $c_W=\cos\theta_W$, effective hypercharge field $B_\mu^{\mathrm{eff}}$, and weak fields $W_\mu^{a,\mathrm{eff}}$, the standard comparison relations are

$$
A_\mu^{\mathrm{eff}}=c_W B_\mu^{\mathrm{eff}}+s_W W_\mu^{3,\mathrm{eff}},
\qquad
Z_\mu^{\mathrm{eff}}=-s_W B_\mu^{\mathrm{eff}}+c_W W_\mu^{3,\mathrm{eff}},
\qquad
W_\mu^{\pm,\mathrm{eff}}=\frac{W_\mu^{1,\mathrm{eff}}\mp iW_\mu^{2,\mathrm{eff}}}{\sqrt2}
$$

Plainly: the photon and neutral weak field are different combinations of the pre-breaking neutral fields, while the charged weak fields combine the other two weak directions. The index $\mu$ is an effective observer-chart component, not a primitive timespace metric index. These equations constrain a shared native response map; they do not identify the measured mixing angle with an accessory's geometric angle.

The pre-breaking scalar doublet contains four real comparison components. In the broken effective description, three supply the longitudinal vector channels and one neutral scalar remains as the Higgs excitation. Thus a native scalar candidate must recover the joint scalar/vector response and coupling pattern, not merely exhibit a radial oscillation. The effective gauge redundancy persists through this reorganization; symmetry-breaking language does not mean that arbitrary gauge conventions become measurable.

Plainly: a scalar-looking motion is only the beginning. It must reproduce both the observed scalar channel and its specific relation to the weak-vector channels.

### Compact Family Matrix

Every native statement in the last two columns is **inferred as a necessary recovery requirement**, with candidate realization **guessed or unresolved**. The matrix does not require a Berry experiment on every species or a free colored-particle interferometer. The representations constrain the applicable amplitudes, gauge-invariant reactions, and color-singlet observations. Shared preparation, interaction, and detector rules are required across generations, but one particle's history is not another particle's history.

| Particle family, including all generations | Effective representation and phase response | Required native distinction and existing owner | Independent discriminating comparison |
| --- | --- | --- | --- |
| Charged leptons $e^-,\mu^-,\tau^-$ | Spin one-half; left component in $(1,2)_{-1}$, right in $(1,1)_{-2}$; electric charge $-1$ for both after breaking | Common electric phase response, distinct left/right weak exposure, generation-independent gauge content while mass-facing response and survival differ. [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md), [muon/tau](../../../../content/markdown/aaa/assemblies/fermions/muon-tau.md) | Wrong charge-phase slope, unsuppressed right charged current, or gauge content changing when the generation-support candidate changes |
| Active neutrino channels $\nu_e,\nu_\mu,\nu_\tau$ and $\bar\nu_e,\bar\nu_\mu,\bar\nu_\tau$ | Spin one-half; active left fields share $(1,2)_{-1}$; $Q_{\mathrm{em}}=0$, but weak currents and relative propagation phases remain | Source/path/detector coherence with three propagation modes and two independent gaps; conditional sterile/Dirac/Majorana branches. [Neutrinos](../../../../content/markdown/aaa/assemblies/fermions/neutrinos.md#referent-status) | All relative phases cancel, weak response disappears with charge neutrality, or one fixed neutral history cannot serve preparation and detection |
| Up-type quarks $u,c,t$, each in three colors | Spin one-half; left components in $(3,2)_{1/3}$, right in $(3,1)_{4/3}$; electric charge $+2/3$ | Continuous triplet color response independent of flavor and spatial spin; common weak transition grammar. [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md), [color](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Axis permutation alone cannot reproduce infinitesimal color mixing; a color change alters electric charge or flavor |
| Down-type quarks $d,s,b$, each in three colors | Spin one-half; left components in $(3,2)_{1/3}$, right in $(3,1)_{-2/3}$; electric charge $-1/3$ | Same color response as up-type; distinct charge and source-derived weak-basis/mass-basis relation. The two proposed down-axis pattern families require native selection. [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md) | Both pattern families appear as extra low-energy species, or strong transport changes the selected flavor/charge |
| Charged antileptons $e^+,\mu^+,\tau^+$ and all antiquarks $\bar u,\bar c,\bar t,\bar d,\bar s,\bar b$ | Conjugate representations: color $\bar3$ for antiquarks, opposite hypercharge and electric charge; antiparticles of left fields have conjugate right-chiral field descriptions | Whole-history polarity-conjugation map must recover conjugate gauge response and reaction provenance, independently of pro/anti spatial orientation. [Quantum-number owner](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | Correct charge sign but wrong color conjugation, weak chirality relation, or source/product inventory; neutrino conjugacy remains conditional |
| Photon $\gamma$ | Spin one; two free transverse helicities, electric/color neutral; neutral mixed gauge mode after breaking | Transverse phase/polarization transport, coherent emission/reception, no physical free longitudinal channel. [Photon gates](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface) | Extra free longitudinal response, missing polarization holonomy, or charge AB phase assigned to the neutral photon |
| Gluons, eight color components | Spin one; color adjoint $(8,1)_0$; two transverse perturbative on-shell helicities; no free colored asymptotic particles | Adjoint transport derived from the same triplet operation, nonlinear color interactions and singlet composition. [Gluons](../../../../content/markdown/aaa/assemblies/bosons/gluons.md) | Nine independent color gauge channels, absent off-diagonal transport, wrong color factors, or a free long-range color channel in the claimed hadronic regime |
| $W^+$ | Massive spin-one charged weak mode; electric charge $+1$, three physical polarizations in the broken-phase pole description | Charge-raising weak response with balanced source/product transfer and longitudinal channel. [Weak closure](../weak-sector-gauge-closure.md), [bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Charge transfer supplied by an arbitrary phase label, wrong charged-current chirality, or missing longitudinal response |
| $W^-$ | Charge conjugate of $W^+$; electric charge $-1$; three physical polarizations | Charge-lowering response on the same event grammar, not a separately fitted negative-charge mechanism. [Weak closure](../weak-sector-gauge-closure.md) | Conjugate process requires incompatible source histories, couplings, or charge accounting |
| $Z$ | Neutral massive spin-one mode; three physical polarizations; chiral neutral currents | Neutral weak response distinct from photon transport and distinct left/right couplings where required. [Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Neutrality incorrectly removes weak response, or photon and $Z$ share an identical polarization/propagation record |
| Higgs $h_H$ | Spin-zero neutral physical excitation after breaking; pre-breaking parent $\Phi_H:(1,2)_{+1}$ | Scalar response tied to the same mass-facing and weak-vector response, with its own formation and exit record. [Scalar owner](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#the-higgs-boson-h-scalar-noether-sea-benchmark) | Orientation-dependent scalar response, wrong correlated coupling pattern, or a breathing label with no scalar/vector matching |

Plainly: equal spin does not mean equal gauge response, electric neutrality does not mean absence of phase, and three generations do not mean three colors. The table uses these observed distinctions to separate native obligations. A photon, a short-lived weak corridor, a scalar response, and a charged fermion need not share one braid architecture.

The photon, $Z$, and physical Higgs are self-conjugate effective species; $W^+$ and $W^-$ form a conjugate pair. Gluons use the real adjoint representation, not a second independent inventory of eight antigluons. A gluon color component is still basis-dependent. Moreover, a gauge potential transforms with the connection's derivative term, whereas curvature and homogeneous perturbations transform in the adjoint. Calling a gauge field an adjoint mode does not turn its raw components into invariant particle labels.

Plainly: antiparticle accounting follows each field's representation. Electric neutrality alone does not settle that accounting, and a name assigned to one color component does not make it observable in isolation.

The neutrino entries deliberately do not decide Dirac versus Majorana, absolute masses, mass ordering, sterile content, or a microscopic handedness mechanism. Oscillation experiments require nontrivial relative propagation, but do not establish an unobserved right-handed weak doublet or the proposed near-photon lock. The live neutrino owner explicitly marks that lock and residuals defined about it as referent-pending. For a Majorana interpretation, a mass eigenmode is self-conjugate, while neutrino versus antineutrino labels still distinguish operational charged-current production/detection channels. For a Dirac interpretation, gauge-singlet right fields can supply mass partners without acquiring ordinary left weak-doublet couplings. Neither option follows from electric neutrality or a classical spatial mirror.

Plainly: neutrino and antineutrino experimental channels do not by themselves settle whether their mass modes are separate particles. The native source and detector construction must resolve that distinction without assuming the answer.

### Electric Neutrality Does Not Remove Weak or Geometric Response

On the effective lepton doublet, $\mathsf T_3=\operatorname{diag}(1/2,-1/2)$ and $Y=-I$, so

$$
Q_{\mathrm{em}}=\begin{pmatrix}0&0\\0&-1\end{pmatrix},
\qquad
\mathsf T_+=\begin{pmatrix}0&1\\0&0\end{pmatrix},
\qquad
\mathsf T_-=\begin{pmatrix}0&0\\1&0\end{pmatrix},
\qquad
[Q_{\mathrm{em}},\mathsf T_\pm]=\pm\mathsf T_\pm
$$

Plainly: the neutrino component has zero electric charge because two effective contributions cancel, but the off-diagonal weak operators still connect it to the charged component. The commutator says how much electric charge changes in that effective transition. A physical event must carry the opposite balance in its source or products; a gauge convention change cannot perform the transaction.

**Claim grade: derived** at the effective representation level. This makes a specific native obstruction: a single scalar “exposure strength” that multiplies all gauge response and vanishes whenever electric charge vanishes cannot represent the active neutrino channel. Distinct sector projections, or a joint response whose electromagnetic projection cancels while its weak projection remains, are necessary. Independent falsifier: neutral weak production/detection is recovered with that same vanishing scalar and no other response-bearing data. Owner: [weak exposure](../weak-sector-gauge-closure.md#weak-exposure-operator). The equation does not identify $\mathsf T_\pm$ with a literal motion of two accessories.

Plainly: a common zero switch for all interactions is too crude. Neutrality must cancel the electric comparison without erasing the weak one.

### Color, Spectators, and Composite Tests

The [PDG QCD review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf), section 9.1, specifies triplet quarks, adjoint gluons, and color-singlet hadrons. An elementary derivation distinguishes the triplet from its transport channels. For $\psi\in\mathbb C^3$ and $G\in SU(3)$, matter transforms as $\psi\mapsto G\psi$. An operator $X$ on that space transforms as $X\mapsto GXG^{-1}$ and decomposes as

$$
X=\frac{\operatorname{tr}X}{3}I+\left(X-\frac{\operatorname{tr}X}{3}I\right),
\qquad
3\otimes\bar3=1\oplus8
$$

Plainly: a three-component matter state is not an eight-component gluon. Operators acting on three components have nine directions: one scalar identity and eight traceless directions. Color gauge transport uses the traceless part. Counting nine possible pairs of axis labels does not derive why the scalar direction is not an additional gluon channel.

A scalar spectator operator $M$ that commutes with every matrix of an irreducible triplet must be proportional to identity. One can check this without invoking a representation theorem: commuting with all diagonal color rotations makes $M$ diagonal, and commuting with every pairwise mixer makes its three diagonal entries equal. Therefore a candidate that implements a passive color change as a physical rotation of a laboratory axis, with orientation-dependent mass-facing or electric response, fails the spectator test. Effective weak and color transformations act on distinct factors of the left quark field and commute there; this effective tensor structure does not prove that core and accessories factor as independent native subsystems.

**Claim grade: derived** for the conditional matrix statements, **inferred** for the native spectator requirement. Independent falsifier: one fixed projection recovers the full irreducible color action while a supposed scalar spectator demonstrably remains non-scalar on that same effective space. The necessity applies to gauge comparisons with the complete apparatus/background transformed consistently; it does not prohibit a physical colored background from affecting dynamics. Owner: [multiplet and operation requirements](../../mapping-equations/inferring-braid-requirements.md#multiplet-orbits-constrain-which-coordinates-may-change).

Plainly: changing the internal color basis must not quietly change an unrelated scalar property. Physical background interactions are separate from a passive relabeling and must be retained in the experiment.

Hadrons supply composition tests, not additional elementary rows. For three triplet factors, the antisymmetric tensor obeys

$$
G_{aa'}G_{bb'}G_{cc'}\epsilon_{a'b'c'}=(\det G)\epsilon_{abc}=\epsilon_{abc}
$$

Plainly: applying the same color transformation to all three factors leaves their antisymmetric singlet unchanged because the determinant is one. The indices label color components, not spatial directions, and $\epsilon_{abc}$ is the alternating tensor, not the architrino polarity magnitude. This is an independent algebraic composition check; confinement and a physical baryon still need their native coupled histories.

For constituents at separated endpoints, comparison at one basepoint requires the connecting transport, so a native hadron cannot be certified by assigning three colors in one snapshot. Likewise, quark–antiquark singlets require compatible conjugate transport. Gluon adjoint response, baryon singlets, and meson singlets must consume one color rule. The required tests belong to the [color](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) and [confinement](../qcd-confinement-hadronization-recovery-targets.md) owners.

Plainly: color cancellation has to survive transport between the constituents. A static list of three complementary names is not a composition law.

### Flavor Phase Is Not a Gauge Connection by Definition

For a coherent three-mode neutrino comparison with a unitary light-sector mixing approximation, let $U_\nu$ be the source/detector mixing matrix and $\alpha_j$ the propagation phase of mass mode $j$. Sterile leakage, unresolved wave-packet separation, and detector averaging require separate corrections. The effective flavor-transition probability is

$$
P_{a\to b}
=\left|\sum_{j=1}^3(U_\nu)_{bj}(U_\nu)_{aj}^{*}e^{-i\alpha_j}\right|^2,
\qquad
\alpha_j=\alpha_{\mathrm{common}}+\delta\alpha_j
$$

Plainly: the source prepares a mixture of propagation modes, each mode accumulates its own phase, and the detector recombines them. $a,b$ label flavor channels and the star means complex conjugation. The common phase multiplies the whole sum and cancels from the probability, leaving differences between the three residual phases. This is the standard comparison rule, not an assumed native amplitude law.

Thus a phase common to every mode cannot recover oscillations; the three-mode description retains two phase differences after removing the common phase. This counts relative information, not independently tunable experimental knobs: in vacuum the two differences evolve with one baseline/energy ratio and two fixed mass-squared gaps. Fixed vacuum mixing relates propagation and interaction bases and is not itself a gauge holonomy around a control loop. Matter-dependent propagation can introduce ordered matrix evolution, but that does not identify the PMNS matrix with a weak gauge connection. For quarks, a rephasing-invariant CKM product such as $\operatorname{Im}(V_{ij}V_{kl}V_{il}^*V_{kj}^*)$, with distinct row and column indices, can retain a physical relative phase while phases of individual entries are conventional. That invariant is not automatically a Berry phase or a literal spatial braid winding.

**Claim grade: derived** for common-phase cancellation and rephasing cancellation; **inferred** for the need for a nonscalar native residual with the correct source/detector couplings. Independent falsifier: a single common phase and static labels reproduce the full independently specified oscillation pattern without any additional phase-bearing operation. Existing owners: [common clock plus residual phase](../../mapping/mapping-method.md#common-component-5-common-clock-plus-residual-phase-operator) and [flavor mixing](../../mapping-equations/inferring-braid-requirements.md#flavor-mixing-requires-weighted-geometry-and-a-cycle). Numerical values and fit conventions remain with their benchmark owners.

Plainly: subtracting the common clock must leave real relative evolution. Calling that remainder a phase does not yet identify the physical process that creates it.

For a Majorana mass description, arbitrary rephasing of each mass eigenfield does not preserve a fixed real mass term. Nevertheless, extra column phases in $U_\nu$ cancel between $(U_\nu)_{bj}$ and $(U_\nu)_{aj}^*$ in the displayed oscillation amplitude. Thus this oscillation comparison does not measure the additional Majorana phases; other lepton-number-sensitive comparisons have different permitted phase removals. This is **derived** by the column-factor cancellation, conditional on the effective amplitude above, and agrees with the [PDG neutrino review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), §§14.3–14.4. Its falsifier is a surviving column factor in that same declared amplitude, not a phase in a different process.

Plainly: a phase can disappear from one measurement without being an arbitrary label everywhere. The admissible convention changes belong to the complete model and experiment being compared.

### Anomaly Arithmetic Constrains a Whole Inventory

Gauge anomalies are failures of quantum gauge consistency in the effective theory; their cancellation is a recovery constraint, not a force or constituent law. Count one generation using only left-chiral fields, converting right fields into conjugates. In the order $Q_L,u_R^c,d_R^c,L_L,\ell_R^c$, the hypercharges are $(1/3,-4/3,2/3,-1,2)$ with multiplicities $(6,3,3,2,1)$. The Abelian and mixed sums are

$$
6\left(\frac13\right)+3\left(-\frac43\right)+3\left(\frac23\right)+2(-1)+2=0
$$

$$
6\left(\frac13\right)^3+3\left(-\frac43\right)^3+3\left(\frac23\right)^3+2(-1)^3+2^3=0
$$

$$
[SU(3)]^2Y:\quad2\left(\frac13\right)-\frac43+\frac23=0,
\qquad
[SU(2)]^2Y:\quad3\left(\frac13\right)-1=0
$$

Plainly: the first sum is the mixed gravitational/hypercharge consistency sum and the second the cubic hypercharge sum. The final two use the shared fundamental trace normalization, which cancels from their zero tests. Color and weak multiplicities are essential: dropping them changes the test. These are checks on the full effective fermion inventory, not derivations of the inventory from polarity counts.

The color cubic anomaly cancels as $2-1-1=0$ between triplets and conjugate triplets. Each generation has four left weak doublets when the three quark colors are counted, so the familiar $SU(2)$ doublet parity obstruction is absent. A gauge-singlet right neutrino contributes zero to these sums; these tests therefore do not decide Dirac versus Majorana. Scalars and vector fields are not added as chiral-fermion contributions to this arithmetic.

**Claim grade: derived** for the displayed sums conditional on the stated effective representations; **inferred** for their constraint on a native assembly dictionary. The consistency conditions are owned by [Gauge Symmetries](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md#gauge-redundancy-and-anomaly-ledger), including its chiral-regulator caveat. Independent falsifier: recomputing the sums from the actual derived inventory, including spectator multiplicities and any extra light chiral modes, leaves an uncanceled gauge anomaly. A correct sum alone is insufficient: the native reduction must also preserve the relevant effective quantum current identities and exclude unobserved channels.

Plainly: particle families must fit together, not just work individually. An extra accessory mode with a new chiral gauge response can spoil the collective consistency even if an isolated charge table looks plausible.

## Conclusions and Cross-Owner Proposals

The strongest exclusion is the additive-counter lemma: no number of independent state-independent phase clocks can reproduce a genuinely order-sensitive comparison. The strongest constructive refinement is the dressing identity: a reduced core response remains norm-preserving only when the omitted accessory modes do not receive leaked transport amplitude in the declared effective comparison. Both conclusions are conditional mathematics, independently checkable without an EOM run. Neither installs complex amplitudes or unitary operations as native ontology.

Plainly: useful transport needs coupled, relational memory, and reducing a dressed assembly requires proving that the discarded part does not carry away the very information being compared.

The most useful next native construction is **one source-driven relative-mode transport on an actual history-valid assembly, with a reference and receiver comparison derived from the same record**. First identify the joint mode observable and its admissible relabelings. Then use two compatible source-control histories, read the carried relation and detector response, and test whether order changes an invariant comparison after ordinary timing effects are accounted for. A retained branch is a prerequisite for a recurring-particle claim; a bounded history can support only a bounded response statement. The source control must act through legal constituent acceleration contributions. A prescribed loop of effective matrices, a fitted susceptibility, or a sweep over an assumed connection cannot supply this construction.

Plainly: make one physical history carry something that a second physical history can read. That is a smaller and more decisive step than assigning every particle an abstract connection.

Cross-owner proposals remain here, without edits to their owners. The gauge chapters can use the endpoint-transition control to sharpen what counts as a pure convention. The color owner can use the finite-label obstruction to separate its conditional matrix algebra from native realization. Weak closure can use the neutral-exposure exclusion and charge-transfer commutator. The accessory program can use the conditional leakage/intertwiner identity once it has an actual coupled branch. The quantum companion retains spatial lifts, spinor signs, and exchange-statistics work; none of the examples here proves spin-statistics, Bell correlations, or a Born rule.

Plainly: these are proposed refinements of existing obligations, not new queues, replacement contracts, or promotions into the corpus.

Closure goal: Derive one operationally closed, source-to-receiver transport of native relational state from a complete coupled history, without inserting a phase law or gauge connection.

## Sources and Verification Scope

The references serve distinct mathematical or experimental dependencies. The derivations, exclusions, and native requirements above are written out so their logic does not depend on source authority alone. Source inspection for this synthesis is recorded in the work log; no source's inaccessible full text is represented as having been checked.

- Barry Simon, *Holonomy, the Quantum Adiabatic Theorem, and Berry's Phase* (1983), *Physical Review Letters* **51**, 2167–2170, [doi:10.1103/PhysRevLett.51.2167](https://doi.org/10.1103/PhysRevLett.51.2167), [Caltech full text](https://authors.library.caltech.edu/records/2pepc-k9f58). Pages 2167–2168 supply the isolated-eigenline transport and curvature interpretation. The full-text scan was inspected; the worked eigenvector and overlap checks here give an independently checkable sign convention.
- Frank Wilczek and A. Zee, *Appearance of Gauge Structure in Simple Dynamical Systems* (1984), *Physical Review Letters* **52**, 2111–2114, [doi:10.1103/PhysRevLett.52.2111](https://doi.org/10.1103/PhysRevLett.52.2111). The publisher abstract was inspected for the non-Abelian adiabatic extension; full text was not accessible in this pass. The frame-transformation and ordered-matrix results used here are derived explicitly rather than attributed to uninspected equations.
- Y. Aharonov and D. Bohm, *Significance of Electromagnetic Potentials in the Quantum Theory* (1959), *Physical Review* **115**, 485–491, [doi:10.1103/PhysRev.115.485](https://doi.org/10.1103/PhysRev.115.485). The publisher record and abstract identify the historical benchmark; the annulus calculation is self-contained and the existing corpus owner supplies the recovery contract. No full-text equation-number claim is made.
- A. Tonomura and colleagues, *Evidence for Aharonov-Bohm Effect with Magnetic Field Completely Shielded from Electron Wave* (1986), *Physical Review Letters* **56**, 792–795, [doi:10.1103/PhysRevLett.56.792](https://doi.org/10.1103/PhysRevLett.56.792). The inspected publisher abstract supports the toroidal source, shielding, and electron-holography comparison. It is not a raw-data reanalysis or verification of all systematic errors.
- A. Tomita and R. Y. Chiao, *Observation of Berry's Topological Phase by Use of an Optical Fiber* (1986), *Physical Review Letters* **57**, 937–940, [doi:10.1103/PhysRevLett.57.937](https://doi.org/10.1103/PhysRevLett.57.937), with listed erratum **57**, 2471. The inspected abstract supports the classical polarization comparison with momentum-space solid angle. The historical word “topological” is not used here to claim invariance under arbitrary homotopy; the erratum's full content and experimental error budget were not inspected, so no quantitative experimental precision is asserted.
- Particle Data Group, *Review of Particle Physics*, 2025 update of S. Navas and colleagues, *Physical Review D* **110**, 030001 (2024): [Electroweak Model and Constraints on New Physics](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf), §§10.1–10.2; [Quantum Chromodynamics](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf), §9.1; [Neutrino Masses, Mixing, and Oscillations](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), §§14.1–14.4 and 14.9. The relevant representation, symmetry-breaking, and neutrino-assumption passages were inspected. These are effective benchmark specifications; no current numerical fit or full review reanalysis is claimed.

AI assistance contributed research synthesis, mathematical drafting, and validation support. The proofs and named external instruments carry the evidence; generated prose carries no independent scientific authority.
