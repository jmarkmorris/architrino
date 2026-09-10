# Quantum Descriptions from Causal Histories

## 1. The Physical and Mathematical Mapping Problem

Quantum descriptions organize preparation, interference, transformation and measurement with a common mathematical structure. Recovering a probability table for one apparatus is only one part of that structure. A physical mapping must explain why the same preparation supports phase-sensitive comparisons, why transformations compose as they do, and why the apparatus forms records with the predicted frequencies.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate consists of polarity-bearing architrinos following definite trajectories in a Euclidean void with absolute time $T$. The Master Equation assigns acceleration through delayed source histories. Quantum states, masses, magnetic fields, Hilbert-space operators and probability rules enter this manuscript as effective recovery targets or explicitly conditional comparison mathematics. They are not premises for primitive motion. Numerical wake-speed instantiations use $c_f=1$; the coordinate and angular examples are dimensionless.

The developed mathematical results below establish distinctions and exclude shortcuts. They do not identify a retained braid as a fermion, derive the Born rule, or provide an accepted Bell mechanism. The physical construction remains open at the passage from retained histories to a common preparation–transformation–record description.

### 1.1 Three Different Spaces

Physical space locates an architrino. A history domain records what its evolution needs. An effective state space organizes predictions. These roles must remain distinct even when each is represented by coordinates.

Let $\Omega$ be an admissible history domain, with an element schematically written

$$
\omega_T=\left(\{\mathrm{id}_i,s_i,\mathbf X_i,\mathbf V_i\},\ \text{retained source histories and roots},\ \text{sea and apparatus context}\right)_T.
$$

Here $\mathrm{id}_i$ is a persistent identity and $s_i$ its polarity. The history entries include the emission and reception events, branch multiplicities, source tangents, wake contributions and reaction provenance needed by the selected prediction. They are retained physical information, not additional substances. A finite memory interval is justified only when omitted history is irrelevant or bounded for the observation window.

The domain $\Omega$ need not be a vector space. Adding two lawful trajectories need not yield another lawful trajectory or preserve their root structure. A Hilbert space of functions *on* histories therefore has different elements from the history domain itself. Counting constituents, binary layers or spatial axes does not determine its dimension.

### 1.2 From Exact Histories to Preparation Statistics

A preparation protocol $P$ leaves a distribution $\mu_P$ over unresolved histories. An apparatus protocol $C$ produces a record $o$ through a response $K_o^C(\omega)$, after any declared averaging over apparatus variables:

$$
p(o\mid P,C)=\int_\Omega K_o^C(\omega)\,d\mu_P(\omega),
\qquad K_o^C\ge0,\qquad \sum_o K_o^C=1.
$$

With all relevant variables retained, the response can be an indicator taking values zero or one. A fractional response requires a specified source for the unresolved-variable measure. Loss and no-record events belong in the outcome family when they occur; discarding them changes the question being answered.

Exact state reduction and statistical preparation equivalence impose different conditions. Two histories mapped to one exact reduced state must agree on the deterministic observables that reduction claims to predict. Two preparations are statistically equivalent within an apparatus family $\mathcal C$ when

$$
P\sim Q\quad\Longleftrightarrow\quad
p(o\mid P,C)=p(o\mid Q,C)
\quad\text{for every }C\in\mathcal C\text{ and }o.
$$

This does not require every history in a preparation to produce the same individual record. A disagreement within $\mathcal C$ beyond the declared approximation error refutes the equivalence; an experiment outside that family tests an extension of scope. The distinction is developed in [Hilbert space and braid mapping](analysis/hilbert-space-and-braid-mapping.md).

## 2. Hilbert Geometry and Its Additional Physical Burdens

### 2.1 An Arrow and Its Coordinates

Take perpendicular unit vectors $\mathbf e_1,\mathbf e_2$ and the dimensionless vector

$$
\mathbf v=3\mathbf e_1+4\mathbf e_2,\qquad \|\mathbf v\|=5.
$$

The numbers describe the arrow relative to the chosen axes. Define another orthonormal basis by

$$
\mathbf e'_1=\frac35\mathbf e_1+\frac45\mathbf e_2,
\qquad
\mathbf e'_2=-\frac45\mathbf e_1+\frac35\mathbf e_2.
$$

Each new vector has squared length one, and their dot product is zero. Substitution gives $\mathbf v=5\mathbf e'_1+0\mathbf e'_2$. The coordinates have changed from $(3,4)$ to $(5,0)$ while the arrow and its length remain fixed. This is a passive change of description. Rotating the arrow while holding the axes fixed is a physical operation of a different kind.

### 2.2 Inner Products, Functions and Completeness

An inner product supplies size and overlap. Our complex convention is conjugate-linear in the first argument and linear in the second:

$$
\langle a,b\rangle=\sum_j a_j^*b_j,
\qquad \|a\|^2=\langle a,a\rangle=\sum_j|a_j|^2.
$$

The star denotes complex conjugation. Conjugate symmetry and positive definiteness are mathematical requirements, not claims that two physically orthogonal objects do not interact. A Hilbert space is an inner-product space complete in the resulting distance: every Cauchy sequence converges to an element in the space. Completeness concerns approximation within this geometry, not completeness of a physical theory.

A whole function can be one vector. For example,

$$
\mathcal H=L^2([0,1]),\qquad
\langle f,g\rangle=\int_0^1f(u)^*g(u)\,du.
$$

Square-integrable functions differing only on a zero-measure set represent the same element. For a complete orthonormal sequence $\phi_n$,

$$
f=\sum_{n=1}^{\infty}a_n\phi_n,\qquad
a_n=\langle\phi_n,f\rangle,\qquad
\|f\|^2=\sum_{n=1}^{\infty}|a_n|^2.
$$

The series converges in the integrated-square norm. The last identity generalizes Pythagoras; by itself it is not a probability law. Ordinary Euclidean spaces are real Hilbert spaces, so neither quantum behavior nor infinitely many dimensions follows from the name.

### 2.3 Why Amplitudes Carry More Than One Set of Probabilities

As an effective quantum comparison, use orthonormal outcome vectors $\phi_A,\phi_B$ and

$$
\psi=\frac35\phi_A+\frac45\phi_B,
\qquad P(A)=\frac9{25},\qquad P(B)=\frac{16}{25}.
$$

The probabilities follow from the assumed comparison Born rule, which squares amplitude magnitudes. They have not been derived from architrino histories. The states

$$
\psi_+=\frac{\phi_A+\phi_B}{\sqrt2},\qquad
\psi_-=\frac{\phi_A-\phi_B}{\sqrt2},\qquad
\langle\psi_+,\psi_-\rangle=0
$$

both give equal A/B frequencies, yet an ideal measurement in the $\psi_+,\psi_-$ basis distinguishes them. Relative sign retains information absent from one apparatus's outcome counts. A common phase leaves a pure-state ray unchanged; relative phase can alter interference.

Quantum theory adds further structure: density operators for general preparations, unitary transformations for closed-system evolution, tensor products for subsystem composition, and rules for sequential measurements. An open subsystem need not evolve unitarily. None of these rules follows merely from writing a complex coordinate for a braid.

### 2.4 Functions of Histories and Koopman Evolution

Suppose $\Omega$ is measurable and $\mu$ is a declared probability measure. Conditional mathematics then supplies

$$
\mathcal H_{\mathrm{hist}}=L^2(\Omega,\mu;\mathbb C),
\qquad
\langle F,G\rangle_\mu=\int_\Omega F^*G\,d\mu.
$$

A history $\omega$ is an input to $F$, not automatically a vector in this Hilbert space. Under a nonatomic measure, a point history does not define an ordinary normalizable Dirac amplitude. The measure's physical origin is a separate obligation.

For an admitted evolution $\Phi_\tau$, the Koopman action is

$$
(U_\tau F)(\omega)=F(\Phi_\tau\omega),\qquad
U_\tau(aF+bG)=aU_\tau F+bU_\tau G.
$$

Composition makes this action linear even when $\Phi_\tau$ is nonlinear. A well-defined bounded operator on the chosen $L^2$ space requires additional domain assumptions. Measure preservation implies $\|U_\tau F\|_\mu=\|F\|_\mu$, an isometry. Invertible measure-preserving evolution on the same space is sufficient for unitarity. Forward determinism alone does not establish that inverse or a finite closed mode sector.

There is also an obstruction to a common shortcut. Classical bounded readouts represented by multiplication satisfy $M_fM_gF=fgF=M_gM_fF$. Their commutativity survives passage to Hilbert space. Thus vectorizing classical readouts does not automatically recover noncommuting quantum operations. This excludes that argument, not every history-based physical construction.

### 2.5 Response Geometry and a Common Quantum Representation

A second, conjectural physical route starts from responses $r_\omega(u)$ derived from histories, such as a phase-resolved apparatus response or a component of arriving acceleration. Given square integrability under a nonnegative sampling measure $\nu$, real responses generate

$$
\mathcal H_{\mathrm{resp}}=
\overline{\operatorname{span}\{r_\omega:\omega\in\Omega\}}
\subseteq L^2(\nu;\mathbb R).
$$

For finitely many responses the Gram matrix $G_{jk}=\int r_{\omega_j}r_{\omega_k}\,d\nu$ is positive semidefinite because

$$
\sum_{j,k}c_jG_{jk}c_k
=\int\left|\sum_jc_jr_{\omega_j}(u)\right|^2d\nu(u)\ge0.
$$

This identity does not establish that every vector in the completed span is physically preparable, select the sampling measure, or convert overlap into transition probability. A response distinction cannot be discarded if doing so changes a declared prediction.

Two real quadratures can be packaged as a complex number:

$$
A\cos u+B\sin u=\operatorname{Re}[(A-iB)e^{iu}].
$$

The identity motivates examining relative timing of motion, wakes and apparatus. It does not identify an orbital angle with quantum phase. The two proposed spaces—functions of histories and their response patterns—also need not coincide.

The effective recovery target is one preparation map $P\mapsto D_P$ and one family of apparatus effects $E_o^C$ on a common Hilbert space:

$$
p(o\mid P,C)=\operatorname{Tr}(D_PE_o^C),\qquad
D_P\ge0,\quad\operatorname{Tr}D_P=1,
\qquad E_o^C\ge0,\quad\sum_oE_o^C=I.
$$

For pure states and rank-one projectors this reduces to $|\langle\phi_o^C,\psi_P\rangle|^2$. Preparation mixtures, transformations, sequential records and subsystem composition must respect the same maps; a separate fit to each probability table is insufficient. The [Effective State-Vector Contract](../../../content/markdown/aaa/quantum/wavefunction-ontology.md#effective-state-vector-contract) retains this destination. The immediate discriminating question is whether two admissible histories with equal current positions and velocities but different earlier wake data produce different later responses. No such physical pair is constructed here.

## 3. Rotation, Spinor Transport and Observable Comparisons

### 3.1 Frames and the Quaternion Cover

An ordinary proper rotation $R$ satisfies $R^{\mathsf T}R=I_3$ and $\det R=1$. An ordered orthonormal frame is a matrix in $SO(3)$; an axis alone lies on $S^2$ and loses rotation about itself. Rotation order already matters before spinors enter: $R_x(\pi/2)R_y(\pi/2)\hat{\mathbf e}_z=\hat{\mathbf e}_x$, while reversing the order gives $-\hat{\mathbf e}_y$.

Unit quaternions $q=a+b\boldsymbol\iota+c\boldsymbol\jmath+d\boldsymbol\kappa$ satisfy $q\bar q=1$, with $\boldsymbol\iota^2=\boldsymbol\jmath^2=\boldsymbol\kappa^2=-1$ and $\boldsymbol\iota\boldsymbol\jmath=\boldsymbol\kappa=-\boldsymbol\jmath\boldsymbol\iota$. For a pure imaginary quaternion representing a vector, the action is $v\mapsto qv\bar q$. The axis-angle element is

$$
q_{\hat{\mathbf n}}(\theta)=\cos\frac\theta2
+(n_x\boldsymbol\iota+n_y\boldsymbol\jmath+n_z\boldsymbol\kappa)\sin\frac\theta2.
$$

The quaternions $q$ and $-q$ yield the same vector rotation. The kernel of this action is exactly $\{1,-1\}$, giving the two-to-one cover of $SO(3)$. A continuous one-turn path lifted from $1$ ends at $-1$; two turns end at $1$. Since the unit-quaternion sphere $S^3$ is simply connected, the based rotation-loop classes form $\mathbb Z_2$. This is path topology, not a claim that emitted wakes or work transactions disappear after two turns.

### 3.2 Matrices and a Worked Direction

With Pauli matrices

$$
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
$$

the same cover acts on a two-component spinor by

$$
U_{\hat{\mathbf n}}(\theta)=I_2\cos\frac\theta2
-i\hat{\mathbf n}\cdot\boldsymbol\sigma\sin\frac\theta2,
\qquad \psi'=U\psi.
$$

A vector matrix $V=\mathbf v\cdot\boldsymbol\sigma$ instead transforms as $UVU^\dagger$, so the two signs cancel. For $\psi_x=(1,1)^{\mathsf T}/\sqrt2$,

$$
U_z(\theta)\psi_x=
\frac1{\sqrt2}\begin{pmatrix}e^{-i\theta/2}\\e^{i\theta/2}\end{pmatrix},
\qquad
\psi_x(\theta)^\dagger\boldsymbol\sigma\psi_x(\theta)
=(\cos\theta,\sin\theta,0).
$$

An independent algebraic route uses $a=\cos(\theta/2)$ and $b=\sin(\theta/2)$:

$$
(a+b\boldsymbol\kappa)\boldsymbol\iota(a-b\boldsymbol\kappa)
=(a^2-b^2)\boldsymbol\iota+2ab\boldsymbol\jmath.
$$

Both computations give the same visible direction. At $2\pi$ the spinor representative changes sign while the frame returns; at $4\pi$ both return. These are exact comparison identities, not native trajectories.

### 3.3 An Isolated Sign and a Relative Sign

For an isolated pure-state comparison, $\rho=\psi\psi^\dagger$ satisfies $(-\psi)(-\psi)^\dagger=\rho$. Every matrix expectation is likewise unchanged. An axis-aligned state can remain on the same ray throughout a rotation about that axis. A representative sign alone therefore supplies no observable.

In an explicitly assumed coherent two-path interferometer, rotate only path $a$ and give path $b$ a reference phase $\delta$. Projection on the symmetric output gives

$$
P_+=\frac14\|U\psi+e^{i\delta}\psi\|^2
=\frac12\left[1+\operatorname{Re}(e^{-i\delta}\psi^\dagger U\psi)\right].
$$

For the worked state, $P_+=[1+\cos\delta\cos(\theta/2)]/2$. At $\delta=0$ the ideal zero-, one- and two-turn values are $1,0,1$. A common sign on both arms has no effect; removing coherence removes the cross term. A separate phase plate can mimic a fringe shift, so the rotation operation and nuisance phases require independent controls. The neutron-interferometer comparison and its original source scope are preserved in [Spinors, Rotations, and History](analysis/spinors-rotations-and-history.md#sign-ray-phase-and-experimental-comparison); this manuscript does not remeasure that experiment.

### 3.4 A Lawful Rotation Must Move the Whole Relevant History

At $c_f=1$, a simple causal root obeys

$$
\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=T_r-T_t,
\qquad
D_t=1-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t,
\qquad W^{\mathrm{acc}}=\frac1{|D_t|},\quad T_t<T_r.
$$

The root must be simple: $D_t\ne0$. A fold requires separate treatment. A constant rotation of every trajectory, wake and apparatus preserves distances, dot products and root times, rotating each acceleration contribution covariantly. Global polarity reversal preserves pairwise polarity products. Neither transformation describes rotating one assembly in an unchanged laboratory.

For an active time-dependent rotation,

$$
\ddot{\mathbf X}'_i=R\ddot{\mathbf X}_i+2\dot R\dot{\mathbf X}_i+\ddot R\mathbf X_i,
\qquad
\mathbf r'_{rt}=R(T_r)\mathbf X_r(T_r)-R(T_t)\mathbf X_t(T_t).
$$

Extra acceleration terms and different source/receiver rotations generally change the causal roots. A quaternion animation is not a solution of the unchanged law. The physical target is a lawful apparatus-driven transport $\mathcal T_\gamma$ and a response projection satisfying $\Pi_{\mathrm{eff}}(\mathcal T_\gamma\Theta)\simeq D(\widetilde\gamma)\Pi_{\mathrm{eff}}(\Theta)$ after declared tolerances and independently controlled dynamical phases. Return must compare specified translated history windows or future-relevant states, including boundary wakes; it cannot erase the accumulated past.

## 4. What a Spin Identification Must Establish

### 4.1 Two Exact Obstructions to Compression

Suppose a reduced space $X$ carries an ordinary $SO(3)$ action and a single-valued amplitude obeys $f(\varpi(U)x)=Uf(x)$ for every $U\in SU(2)$. Substituting $U=-I_2$ gives $f(x)=-f(x)$, hence $f=0$. This conditional lemma excludes a nonzero globally equivariant spinor amplitude when the central element acts trivially on the source space. More classical coordinates do not help if their action still factors through $SO(3)$. Ray-valued, bundle-valued or genuinely lifted relational constructions have different premises and are not excluded.

A second counterexample compares the constant path $\gamma_0(s)=I_3$ with $\gamma_1(s)=R_z(2\pi s)$. Their endpoint frames agree while their lifted endpoints differ. An endpoint-only classifier loses the distinction. More generally, a sign $\eta$ on histories descends through a quotient $Q$ exactly when it is constant on every fiber of $Q$. Arbitrary identity renaming, physical exchange, phase-origin change and relative phase change must not be conflated. Real-valued writhe also does not automatically supply an integer winding parity.

### 4.2 Central Sign, Spin Class and Composition

The comparison representation

$$
V_j=\operatorname{Sym}^{2j}(\mathbb C^2),\qquad
\dim V_j=2j+1,\qquad D_j(-I_2)=(-1)^{2j}I
$$

shows that a full-turn sign distinguishes integer from half-integer sectors, not $j=1/2$ from $j=3/2$, or $j=0$ from $j=1$. Identification also needs the generators and their effective angular-action scale:

$$
[J_a^{\mathrm{eff}},J_b^{\mathrm{eff}}]=i\hbar\epsilon_{abc}J_c^{\mathrm{eff}},
\qquad
\sum_a(J_a^{\mathrm{eff}})^2=\hbar^2j(j+1)I.
$$

The scale $\hbar$ is an effective target, not primitive architrino spin. Two spin-one-half factors give

$$
V_{1/2}\otimes V_{1/2}=V_0\oplus V_1,
\qquad (-I_2)\otimes(-I_2)=I_4.
$$

The antisymmetric state $(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt2$ is the scalar singlet; the three symmetric states are the vector triplet. Therefore two genuinely factorized spinor cores with only integer-spin relative, accessory and medium dressing cannot produce a half-integer sector. Neither constituent factorization nor core spin is established for a native two-braid proposal. A nonfactorizing joint action could invalidate the application's premises without changing the identity.

There is a related continuity obstruction. In a continuous family of finite-dimensional unitary $SU(2)$ representations on a fixed space,

$$
P_-(s)=\frac{I-D_s(-I_2)}2
$$

has continuous integer rank and hence constant rank on a connected interval. A smooth shape change cannot silently change central-sign multiplicity under these assumptions. Sector crossings, altered quotients, changed boundary conditions or loss of an isolated mode require explicit treatment. This constrains an unchanged-sector story; it does not forbid particle conversion generally.

### 4.3 Distinct Operations and Effective Relativistic Comparisons

Spatial rotation, internal phase, parity, charge conjugation, chirality, helicity and exchange act on different information. Parity reverses polar displacements and velocities, while a cross product of two polar vectors is axial. A determinant of three axial normals is parity-even; assigning it mirror-odd meaning needs another construction. A polar–axial pairing can be mirror-odd if its factors are well defined and nonzero.

Spatial spinors also do not establish Lorentz boosts. In an effective chart, $X_{\mathrm{eff}}=c_{\mathrm{eff}}t_{\mathrm{eff}}I_2+\mathbf x_{\mathrm{eff}}\cdot\boldsymbol\sigma$ transforms by $AX_{\mathrm{eff}}A^\dagger$ for $A\in SL(2,\mathbb C)$, preserving its determinant. This is an observer-level interval, not substrate geometry or an assumed equality $c_{\mathrm{eff}}=c_f$. In one chiral convention,

$$
A_L=\exp\left[-\frac i2\boldsymbol\theta\cdot\boldsymbol\sigma-\frac12\boldsymbol\zeta\cdot\boldsymbol\sigma\right],
\qquad A_R=(A_L^\dagger)^{-1}.
$$

Rotations act alike on the two chiral components, while boosts differ. The compatible free effective Dirac comparison is

$$
(E_{\mathrm{eff}}+c_{\mathrm{eff}}\boldsymbol\sigma\cdot\mathbf p_{\mathrm{eff}})\psi_L=M_{\mathrm{eff}}c_{\mathrm{eff}}^2\psi_R,
\qquad
(E_{\mathrm{eff}}-c_{\mathrm{eff}}\boldsymbol\sigma\cdot\mathbf p_{\mathrm{eff}})\psi_R=M_{\mathrm{eff}}c_{\mathrm{eff}}^2\psi_L.
$$

Here $M_{\mathrm{eff}}$ is recovered bulk mass. The effective clock/ruler map, dispersion, boost response, chiral mixing and conjugate channels must all come from the same histories. For a massive particle, an observer moving past it can reverse the momentum direction and hence helicity without rebuilding the particle. At rest helicity is undefined. Chirality is not an observer-selected accessory posture.

Spatial and weak $SU(2)$ act on separate indices: $U\otimes I$ and $I\otimes V$ commute. A spatial turn must not change an electron into a neutrino or a color component into a laboratory direction. Effective weak quark partners contain the CKM mixture $d'_i=\sum_jV^{\mathrm{CKM}}_{ij}d_j$, not a prescribed geometric pairing of adjacent flavor names.

### 4.4 Candidate Frames and Accessory Attachments

The preserved candidate survey includes orthogonal-axis, coincident-axis, two-component circular, moving-midpoint five-coordinate, deformed, coupled-module, double-dyad and tetrahedral geometries. Their identity and motion records differ. Scoped negative circular and common-cadence realizations do not exclude entire parent families. No configuration label identifies an accepted spinor assembly.

The surveyed accessory programs contain six added architrinos, but that inventory is not a universal Standard Model constituent rule. An orthogonal-axis normal frame requires its rank and ordering to survive; a common axis needs a transverse reference; tetrahedral candidates need their actual polarity/current geometry. Accessories can remove shape symmetries and thereby change the quotient.

A useful conditional preservation result makes the assumptions explicit. Let $p:X_{BA}\to X_B$ and $s:X_B\to X_{BA}$ satisfy $p\circ s=\mathrm{id}$ and compatible frame maps $F_{BA}\circ s=F_B$. If an admissible deformation retracts $X_{BA}$ onto $s(X_B)$ while fixing that subspace, each accessory-bearing frame loop is homotopic to its projected core loop. Their lifted signs agree. Spatial separation alone does not establish this retraction. Noncontractible accessory angles, changed stabilizers, exchange, root boundaries or medium conditions can defeat it. Even class-preserving attachment can change charge exposure, magnetic response and weak coupling; full backreaction remains necessary.

### 4.5 Effective Family Requirements

These are comparison requirements inherited from the source's versioned effective-physics review, not freshly verified particle measurements or candidate identifications.

| Family | Rotation and additional requirements |
| --- | --- |
| Electron, muon, tau and their antiparticles | Spin one-half, two massive spin states, conjugate charges with unchanged spin class; shared gauge assignments despite different masses and lifetimes |
| Three active neutrino flavor channels and antineutrino channels | Spin-one-half propagation modes; flavor preparation distinct from mass basis; massive treatment where needed; Dirac/Majorana identity unresolved |
| Up, charm, top and their anticolor conjugates | Spin one-half independent of color, charges $+2e/3$ and $-2e/3$; top through short-lived reaction records |
| Down, strange, bottom and their anticolor conjugates | Spin one-half independent of color, charges $-e/3$ and $+e/3$; no extra species inferred solely from alternative bookkeeping |
| Photon | Two transverse helicities $\pm1$, even central sign and no longitudinal free mode; analyzer response distinct from spin-one-half response |
| Eight gluon components | Perturbative transverse spin-one response and adjoint color algebra; eight internal components are not eight directions or isolated asymptotic particles |
| Charged weak bosons | Massive spin one with three polarizations, including longitudinal response; conjugate charge channels and chiral coupling |
| Neutral weak boson | Massive spin one with longitudinal response and neutral-current couplings; neutrality does not make it a photon |
| Higgs comparison | Scalar rotation response and the specified parity/coupling tests; radial motion alone is insufficient |

Antiparticles retain the corresponding spin class. The effective photon, neutral weak boson and Standard Model Higgs are self-conjugate; the real gluon adjoint does not introduce an independent antigluon octet. Neutrino neutrality alone does not decide self-conjugacy. Photon Jones-vector notation has two amplitudes but integer helicity phases, not a spatial spin-one-half action. Hadronic composition separately tests $1/2\otimes1/2=0\oplus1$ and three-spinor sectors $1/2\oplus1/2\oplus3/2$, together with orbital, gluonic, parity, color and exchange contributions.

### 4.6 Three Further Insufficient-Premise Results

Rotation covariance alone does not choose exchange statistics. Both symmetric and antisymmetric two-spinor sectors are invariant under joint rotations. A theorem connecting a one-object rotation loop to a two-object exchange path needs the relevant configuration spaces and physical assumptions. Calling paths braids supplies neither planar confinement nor a phase representation of exchange.

Covariance also does not select a detector probability law. Both $(1+x)/2$ and $(1+x^3)/2$, with $x=\hat{\mathbf n}\cdot\hat{\mathbf m}$, are normalized, rotationally covariant two-outcome rules agreeing at $x=\pm1$. At $x=1/2$ they give $3/4$ and $9/16$. The second is a countermodel, not a proposed law. Basin response and measure must select the observed intermediate-angle behavior.

Finally, the effective interaction $H_{\mathrm{int}}=-\mu_0\boldsymbol\sigma\cdot\mathbf B_{\mathrm{eff}}$ is covariant for every real $\mu_0$, including zero, with the same spinor cover. A two-to-one covering degree therefore does not determine a magnetic moment or $g=2$. Current, angular history, mass normalization, apparatus coupling and dressing must be derived together. These exclusions and their full proofs remain in [the spinor synthesis](analysis/spinors-rotations-and-history.md).

## 5. Deterministic Transport, Basin Measures and Records

### 5.1 A Sufficient State and Its Pushforward

For finite regularization $\eta>0$ and justified history horizon $h$, retain assembly, wake, sea, apparatus and control variables in a measurable state space

$$
\Gamma=\Gamma_{\mathrm{asm}}\times\Gamma_{\mathrm{wake}}\times\Gamma_{\mathrm{sea}}\times\Gamma_{\mathrm{reg}}\times U.
$$

The coarse map $C_{\eta,h}$ must preserve the chosen consumer statistic $O$ through the record duration $\tau_{\mathrm{rec}}$:

$$
C_{\eta,h}(\omega_1)=C_{\eta,h}(\omega_2)
\Longrightarrow
\sup_{0\le s\le\tau_{\mathrm{rec}}}
d_O(O(\Phi_s\omega_1),O(\Phi_s\omega_2))\le\varepsilon_C.
$$

A failure requires refining the state. A certified upstream branch chart can supply roots, gaps, Jacobian floors, memory bounds and return residuals; it does not supply an invariant quantum measure, outcome partition or detector law.

Write $\mathcal P_\tau\mu=(\Phi_\tau)_*\mu$ for deterministic measure pushforward. This fixes the measure-action convention throughout this manuscript. A reduced kernel is admissible only after unresolved variables $\zeta$ have a physically sourced occupation measure:

$$
K_\tau^{\mathrm{red}}(A\mid\bar\gamma)
=\int\mathbf1_A\!\left(\bar C(\Phi_\tau(\gamma,\zeta))\right)d\nu(\zeta).
$$

Choosing $\nu$ to fit the desired Born law invalidates the construction. A return section gives $R(\gamma)=\Phi_{\tau_\Sigma(\gamma)}\gamma$ and measure action $R_*$. Its first-return time, excluded boundaries and retained context must be specified.

### 5.2 Measures and Finite-Window Basins

The measure begins with preparation-limited unresolved history pushed through the same deterministic flow and retained projection. An invariant measure obeys $\mathcal P_\tau\mu_* =\mu_*$. A metastable measure instead has a declared finite-window drift bound on a specified test family containing the outcome basins. A preparation, return-section or finite-window measure must not be silently replaced by an independently fitted ensemble.

For a measurable apparatus window $W_i$, define

$$
B_i=\{\gamma:\pi_{\mathrm{reg}}\Phi_{\tau_{\mathrm{rec}}}(\gamma)\in W_i,
\ \Phi_s\gamma\in\Gamma_{\mathrm{adm}}\text{ for }0\le s\le\tau_{\mathrm{rec}}\}.
$$

The partition needs measurable basins, a null or separately resolved separatrix, and bounded escape. Return leakage is measured by $\mu_*(R^{-1}B_i\triangle B_i)$, where $\triangle$ is symmetric difference. Under these assumptions, outcome weights are the indicator integrals

$$
p_i=\int\mathbf1_{B_i}\,d\mu_* =\mu_*(B_i).
$$

This is the conditional basin-measure identity. It identifies what must be computed, not which physical measure has been established. Metastability, leakage, escape and coarse-graining errors must each be controlled. In particular, an error in an observable metric is not automatically an error in basin probability: near a separatrix a small displacement can change an indicator. A probability estimate additionally needs control of the measure of the affected boundary neighborhood or an equivalent stability bound. The additive error expression in [the source packet](analysis/transfer-operator-basin-measure.md#basin-measure-necessity-lemma) is retained as a conditional estimate with that missing conversion explicit.

Finite-window reachability asks whether a trajectory enters a target during a declared interval while remaining admissible. It is different from unbounded reachability. An actual computable embedding of halting into a retained dynamical chart would import an undecidability obstruction for that stronger question; no such embedding is established or required for ordinary record formation here.

### 5.3 A Basin Weight Becomes a Probability of a Completed Record

The record indicator $\mathbf1_{\mathrm{rec}}(i;\theta)$ requires measurable basins, controlled boundaries, finite measurement time, restartability and divergence residuals, an apparatus/environment entropy-lock criterion, closed energy–momentum–angular-momentum accounts, and a bound on unrecorded energy over the same window. Then

$$
p_i^\theta=
\frac{\mu_*(B_i)\mathbf1_{\mathrm{rec}}(i;\theta)}
{\sum_j\mu_*(B_j)\mathbf1_{\mathrm{rec}}(j;\theta)}.
$$

A zero denominator means no completed channel on that window. This is a conditional distribution over eligible records, so its normalization cannot conceal detector loss or an excluded trial population. The filter and full outcome accounting must remain available.

Born recovery further requires an independently obtained effective envelope and the equality

$$
\mu_*(B_i)=\int_{O_i}|\psi_{\mathrm{eff}}|^2\,d\Gamma_{\mathrm{eff}}.
$$

Neither side may define the other to force agreement. Self-location, betting or decision-theory credences are consumers of the physical measure. Two inference rules giving different weights to the same fixed apparatus frequencies expose why an interpretive argument alone does not derive this equality.

### 5.4 A Worked Abstract Basin Map

For $0<b(u)<1$ and $0<\lambda\le1$, consider the dimensionless comparison map

$$
f_u(s)=s+\lambda s(1-s)(s-b(u)),\qquad 0\le s\le1.
$$

Its fixed points are $0,b(u),1$, with derivatives $1-\lambda b$, $1+\lambda b(1-b)$ and $1-\lambda(1-b)$ respectively. The endpoints attract and the interior point separates their basins. For a normalized input density $q_u(s)$ with no atom on the boundary,

$$
p_0(u)=\int_0^{b(u)}q_u(s)\,ds,\qquad
p_1(u)=\int_{b(u)}^1q_u(s)\,ds.
$$

Repeated pushforward tends to $p_0\delta_0+p_1\delta_1$. The initial density is generally not invariant; the limiting atomic measure is. If $q_u=q$ and only the threshold moves, $dp_0/du=q(b(u))b'(u)$. This illustrates basin accounting and a control effect. It proves no physical doubling-frequency lock, stability gap, retained branch or quantum weight.

## 6. Apparatus Response and Effective Benchmarks

### 6.1 Spin and Photon Channels Have Different Demands

A detector kernel is a basin pullback averaged over a derived material measure:

$$
K_i^{(d)}(\gamma_{\mathrm{prep}})
=\int_{\Theta_d}\mathbf1_{B_i^{(d)}}(C_d(\gamma_{\mathrm{prep}},\zeta))\,d\nu_d(\zeta).
$$

For spin response, the physical construction needs the delayed angular-momentum ledger, a solved partition among layers and wakes, a valid frame transport, apparatus coupling, recoil and two persistent record basins. Primitive architrinos carry no preassigned spin arrows. A symbolic layer transition with unresolved coefficients is a diagnostic, not a solved branch. The polarity-domain-wall sign-sheet proposal must derive its parity from the same signed current/history and preserve it under allowed deformations, with certified folds, reconnections or declared surgery treated separately.

Photon recovery uses a separate vector channel: the candidate coaxial contra-rotating polarity-conjugate planar pair, transverse projector, helicities $\pm1$, material analyzer projector, unresolved-material measure, accepted/rejected action accounts and no longitudinal free mode. In a positive orthonormal transverse basis, the effective target fraction is

$$
\mu_{\mathrm{pass}}
=\frac{a_\perp^\dagger(\hat a\hat a^{\mathsf T})a_\perp}
{a_\perp^\dagger a_\perp},\qquad a_\perp\ne0.
$$

The dagger is conjugate transpose and $\hat a$ is a real unit analyzer direction. To obtain the ideal pass fraction from material dynamics, a derived threshold coordinate must have uniform pushforward under its return-map occupation measure. This is the open material-measure burden; writing the projector does not derive Malus' law. Polarization Bell comparisons use the doubled-angle law, not the spin-singlet angle law.

### 6.2 Source–Path–Detector Comparisons Beyond Two Outcomes

In the effective three-mode neutrino comparison,

$$
\mathcal A_{\alpha\to\beta}
=\sum_iU_{\beta i}e^{-i\varphi_i}U_{\alpha i}^*,
\qquad P_{\alpha\to\beta}=|\mathcal A_{\alpha\to\beta}|^2.
$$

The PMNS matrix mixes source/detection flavors with propagation modes. A common addition to all phases changes only the amplitude's common phase. Under the conventional vacuum relativistic phase approximation, in effective natural units,

$$
P_{\alpha\to\beta}=\delta_{\alpha\beta}
-4\sum_{i>j}\operatorname{Re}Q_{ij}\sin^2\frac{\Delta m_{ij}^2L}{4E}
+2\sum_{i>j}\operatorname{Im}Q_{ij}\sin\frac{\Delta m_{ij}^2L}{2E},
\qquad Q_{ij}=U_{\alpha i}^*U_{\beta i}U_{\alpha j}U_{\beta j}^*.
$$

This is an observer-level target. A native source ledger, phase transport, apparatus response and measure must recover it without primitive flavor switches. It establishes neither PMNS coefficients nor masses, and oscillations alone do not decide Dirac/Majorana identity.

Two further comparison interfaces test the same discipline. Tree-level scattering factorization requires the appropriate simple-pole residue, schematically $\lim_{s\to0}sA_4=A_3A_3$, with the admissible intermediate-channel sum understood and no spurious double pole. A reduced causal-history account must supply its own reaction and intermediate-assembly provenance. Effective matching writes

$$
\mathcal L_{\mathrm{eff}}=\mathcal L_{d\le4}
+\sum_i\frac{C_iO_i}{\Lambda^{d_i-4}}.
$$

The coefficients are to be mapped from branch, wake, detector and sea records. Unitarity and breakdown scales constrain this effective description; they do not install its operators as a substrate law. These interfaces remain benchmark obligations in [the strategy source](priorities.md#tier-2-lecture-note-benchmark-interfaces).

## 7. Pair Provenance and the Bell Obstruction

### 7.1 A Source Measure Must Be Produced Before a Joint Table

A preparation section $\Sigma_{\mathrm{src}}$ carries a source occupation measure $\mu_{\mathrm{src}}$. A pair map produces

$$
\rho_{\mathrm{src}}=(C_{\mathrm{pair}})_*\mu_{\mathrm{src}}.
$$

Each pair record retains parent and daughter histories, root branches through separation, relative orientations and phases, wake history, angular-momentum balance and conserved reaction provenance. It cannot be replaced by two opposite classical arrows. Its distribution must be independent of later detector settings.

For local settings $\alpha,\beta$, joint record basins live on the pair record and both local apparatus-variable spaces. A candidate law is

$$
P(a,b\mid\alpha,\beta)=
\int\mathbf1_{B_{ab}^{\alpha,\beta}}(\Pi,\zeta_A,\zeta_B)
\,d\nu_A(\zeta_A\mid\alpha,\Pi)
\,d\nu_B(\zeta_B\mid\beta,\Pi)\,d\rho_{\mathrm{src}}(\Pi).
$$

This context-indexed integral is a target construction. Its physical origin and complete-record interpretation cannot be inferred from notation. The product of conditional apparatus measures is a declared assumption in this source representation; a physical application must justify its sufficient retained record.

### 7.2 Product Screening and Four Distinct Failures

If the completed record admits local kernels for every setting under one setting-independent measure,

$$
P(a,b\mid\alpha,\beta)=\int K_A(a\mid\alpha,\Pi)K_B(b\mid\beta,\Pi)\,d\rho(\Pi),
$$

it lies in the Bell-local convex hull. Stochastic local kernels are mixtures of deterministic local tables, so shared provenance alone cannot overcome the CHSH, GHZ or Hardy obstructions. Refining an incomplete record does not evade this result if the completed record still has that form.

For a uniformly distributed opposite-axis pair with hemisphere-sign readouts, the explicit comparison is $E_{\mathrm{axis}}(\theta)=-1+2\theta/\pi$ for $0\le\theta\le\pi$. It is a local negative control, not a partial recovery of the singlet curve. A nonuniform axis distribution would require a different curve, while retaining the product-screening obstruction under the same locality assumptions.

The distinct failure categories are a setting-dependent source distribution, a far-setting-dependent marginal before causal contact, local product screening, and a malformed or incomplete record channel. They must be diagnosed separately. The effective target uses

$$
E(\alpha,\beta)=\sum_{a,b=\pm1}abP(a,b\mid\alpha,\beta),\qquad
S=E_{00}+E_{01}+E_{10}-E_{11}.
$$

The spin-singlet curve is $-\cos\theta$, with $|S|=2\sqrt2$ at optimal settings; the local bound is two. Photon curves separately involve $\cos2(\alpha-\beta)$ with state-dependent sign/phase convention. The same generated record law must preserve no-signaling marginals, measurement independence, ordering-independent observer tables and $|S|\le2\sqrt2$, with preferred-frame leakage bounded in the observer export. A superquantum value is failure. A deficit is assessed at the declared comparison settings and tolerances, not by demanding maximal violation at every setting.

### 7.3 A Table-Level Success That Exposes a Missing Mechanism

The source's generated threshold examples reproduce the singlet target using a uniform coordinate $\eta\in[0,1]$ and a sign branch $\sigma=\pm1$. Set

$$
T_{\mathrm{same}}=\frac{1-\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B}{2}.
$$

Assign outcomes $(\sigma,\sigma)$ below the threshold and $(\sigma,-\sigma)$ above it. A measure invariant under flipping $\sigma$ while holding every other variable fixed, with uniform $\eta$ pushforward, gives

$$
P(\sigma,\sigma)=\tfrac12T_{\mathrm{same}},\qquad
P(\sigma,-\sigma)=\tfrac12(1-T_{\mathrm{same}}),\qquad
E=2T_{\mathrm{same}}-1.
$$

Both marginals are one-half. These are conditional table identities. Inserting the threshold or its uniform measure to reproduce the target is not a substrate derivation or a mechanism for a remote detector setting to act locally.

The stronger completed-record test exposes the limitation. If $C_{ij}=A_iB_j$ for four local setting responses, then

$$
C_{00}C_{01}C_{10}C_{11}=+1.
$$

Each sign appears twice. The generated examples require $(-1,+1,-1,-1)$ on a middle interval, whose product is $-1$. The source reports a parity residual $1/\sqrt2$ and a declared-baseline product residual $0.35355339059327373$. The latter compares against the supplied independent-marginal baseline; it is not a completed minimization over all Bell-local models. Those source-reported values are not newly executed measurements here.

The examples are therefore failure-boundary fixtures and simulation targets. They lack completed local one-wing response signs and same-window record residuals. Nonrestartability before records complete can be investigated; persistent failure of local record autonomy after claiming completed records cannot serve as an explanation. The missing mathematical object is a lawful same-record apparatus response, not another fitted context table. The detailed negative controls and blocked intake chain remain in [the pair-provenance source](analysis/dynamic-pair-provenance-source-measure.md#complete-record-parity-audit).

### 7.4 Phase from Retained Source Data

A proposed pair coordinate uses local record-cycle phases and a relative provenance phase. In radians,

$$
\eta_{AB}=\frac1{2\pi}
[\theta_{\mathrm{rec}}^A-\theta_{\mathrm{rec}}^B+\varphi_\Pi]_{2\pi}.
$$

Equivalently, divide all phases by $2\pi$ before taking the fractional part. The source's earlier fractional-cycle diagnostic and later radian formula must not be mixed.

For a nonzero separation axis $\hat{\mathbf a}_{AB}$, the candidate layer phase is

$$
\Theta_{\ell X}^{AB}=\phi_{\ell X}(T_0^+)
+\int_{T_0}^{T_{\mathrm{sep}}}\omega_{\ell X}(T)\,dT
+\Phi_{\ell X}^{\mathrm{root}}+\Phi_{\ell X}^{\mathrm{frame}},
$$

and its angular-history-weighted phasor is

$$
Z_X^{AB}=\sum_{\ell=I,M,O}
(\hat{\mathbf a}_{AB}\cdot\mathbf J_{\ell X}^{\mathrm{bal}})e^{i\Theta_{\ell X}^{AB}}
+(\hat{\mathbf a}_{AB}\cdot\mathbf L_{\mathrm{wake},X}^{AB})e^{i\Theta_{\mathrm{wake},X}^{AB}}.
$$

The proposed relative phase is $\arg(-Z_A^{AB}\overline{Z_B^{AB}}e^{i\Phi_{AB}^{\mathrm{wake}}})$. The minus sign is part of the proposed singlet-like phase convention; angular-momentum balance alone does not establish this entire phasor map. Its wake contribution, weights and phase extraction must come from retained records.

The phase must be invariant under the allowed branch-preserving quotient. Zero phasors on a positive-measure source set make it undefined; nonzero gauge variation makes it a coordinate artifact. Finite gauge probes are diagnostics, not the supremum over every allowed transformation. Uniform pushforward, sign symmetry and the correct threshold must then follow from source and material return maps. Passing a JSON shape check, declaring a wake phase or unwrapping a layer phase establishes none of these physical facts.

### 7.5 The Missing Apparatus-Window Input

The retained apparatus-response construction needs accepted histories, local target metadata, a signed separatrix response, record-cycle phase and same-window record residuals. Its proposed response functional is

$$
\mathcal Q_{\hat{\mathbf m}}=
e^{\Lambda_{\hat{\mathbf m}}(T_{\mathrm{in}},T_{\mathrm{out}})}\Sigma_{\hat{\mathbf m}}(Z_{\mathrm{in}})
+\int_{T_{\mathrm{in}}}^{T_{\mathrm{out}}}
e^{\Lambda_{\hat{\mathbf m}}(s,T_{\mathrm{out}})}
\mathcal N_{\hat{\mathbf m}}(Z(s),s)\cdot\dot{\mathbf J}^{\mathrm{app}}_C(s)\,ds.
$$

Here $\Sigma$ is the incoming signed response coordinate, $\Lambda$ its accumulated linear growth, $\mathcal N$ its response normal and $\dot{\mathbf J}^{\mathrm{app}}_C$ the apparatus angular-history input. Any conversion weight in the latter is bulk bookkeeping, not primitive mass. Sample quadrature and a declared record threshold do not establish a retained history. The source's upstream attempt-budget milestone remains distinct from accepted continuation: residual closure, center drift, stability gap and same-branch persistence were still missing. The adapters correctly refuse signs obtained from Bell thresholds, zero-separatrix rows, missing record gates and mismatched windows. Their implementation details and historical counts remain supporting evidence, not a new execution claim.

## 8. Metastability, Switches and Deciders

### 8.1 A Threshold Slot Is Not Yet Control

The agency proposal uses a middle-binary speed near the wake speed as a candidate threshold slot:

$$
\mathcal K_M(\epsilon_M,T_W)=
\left\{\gamma:\sup_{0\le s\le T_W}
\frac{|s_M(\Phi_s\gamma)-c_f|}{c_f}\le\epsilon_M\right\}.
$$

This defines a speed window. It does not prove that every braid occupies it, that the relevant branch is retained, or that a stable separatrix exists. The proposed universal metastability interpretation remains an architectural hypothesis requiring dynamics. Even actual metastability is insufficient for agency.

A Switch changes later basin weights through an internally held bias under fixed boundary context. A Decider additionally updates, holds and reuses such bias through record-sensitive feedback. Neither introduces primitive randomness, selects among ontic worlds, or exempts itself from deterministic evolution. Biological or neural networks are possible consumers of this structure, not evidence for consciousness at every scale.

### 8.2 Fixed Context, Physical Cost and Persistence

Let $c_\Omega$ retain boundary histories, sea context and the incoming perturbation class. For an internal preparation $u$,

$$
P_{c_\Omega,u,T_W}(i)=\mu_{c_\Omega,u,T_W}(B_i(u)).
$$

A Switch requires two admitted preparations whose distributions differ by a declared distance at least $\epsilon_{\mathrm{sw}}>0$, with $c_\Omega$ fixed. Otherwise an external drive can masquerade as internal control. Work and exported energy must remain within the mechanism's failure threshold, and

$$
\tau_{\mathrm{hold}}\ge\tau_{\mathrm{lat}}+\tau_{\mathrm{rec}}.
$$

The source proposes a positive work-or-dissipation transaction below the destruction threshold, while explicitly allowing reversible ideal limits that still require a physically prepared state. That exception must be retained: a strict positive-cost inequality is not asserted here as a universal theorem for every reversible control operation.

For a Decider, $u_{n+1}=G(u_n,r_n,\chi_n)$ uses the record $r_n$ and retained memory $\chi_n$. Distinct admissible records must produce both distinguishable updates and a later basin-weight difference under the same tested context. Memory with no outcome effect is insufficient; an open-loop schedule is at most a Switch.

### 8.3 Minimality and Illustrative Models

A role graph separates sensor, threshold, bias, memory and their interactions. Deleting the sensor must remove input access; deleting the threshold removes accessible alternatives; deleting bias removes preparation dependence; deleting memory removes record-sensitive feedback; deleting coupling breaks the latency/hold relation. Roles can share physical components only when their variables and obligations remain explicit. A required environmental role cannot be hidden to claim minimality.

For the abstract two-basin model, a small bias change yields

$$
\Delta p_1\simeq
\left[-q_{c_\Omega,u}(b(u))b'(u)
+\int_{b(u)}^1\partial_u q_{c_\Omega,u}(s)\,ds\right]\Delta u.
$$

Threshold movement and preparation-measure retuning are distinct effects. At least one must exceed the comparison tolerance without changing the boundary context; repeated feedback must also retain cost and hold-time control.

Three source sketches remain illustrative. A delay oscillator,

$$
\ddot x+2\zeta\omega_0\dot x+\omega_0^2x=g(\beta)x(T-\tau),
\qquad \beta=v/c_f,
$$

has characteristic equation $\lambda^2+2\zeta\omega_0\lambda+\omega_0^2-g(\beta)e^{-\lambda\tau}=0$; it needs actual root-ledger gain and delay before it tests a braid. An action-like threshold sketch uses $\dot S=E-E_{\mathrm{ref}}$, $\dot E=-\gamma(E-E_{\mathrm{ref}})+F_{\mathrm{ext}}+\kappa M(T-\tau)$ and crossings $S=nh$. Its bracket estimate $\delta\sim|F_{\mathrm{ext}}|\tau_L$ lacks a derived physical normalization and is not a derivation of Planck's constant. Here these coefficients and coordinates belong solely to the reduced sketch.

The He–Rb–He proposal assigns a soft rubidium sensor and stiff-neighbor bias geometry. Its historical inventory estimate $2(168)+3576=3912$, minus 12 per missing electron, is an illustrative count under the source's assembly assignment, not proof of a retained or minimal Switch. These sketches, the reversible-limit qualification and the role tests remain in [Agency, Decision, and Decider Closure](analysis/agency-decision-and-decider.md).

## 9. Guidance, Coherence and Downstream Tests

### 9.1 A Single-Ontology Guidance Reduction

A conditional guidance reduction uses the same occupation measure and coarse trajectories:

$$
a^2(\bar x)=\frac{d(\pi_{\bar X*}\mu_*)}{d\bar x},
\qquad
\mathbf V_{\mathrm{eff}}(\bar x)=\int\dot{\bar X}(\gamma)\,d\mu_*(\gamma\mid\bar X=\bar x).
$$

The density requires absolute continuity with respect to the declared coordinate measure, and the conditional mean needs the corresponding integrability and conditional-measure assumptions. This supplies a comparison object, not a proven quantum envelope. Effective guidance, amplitude and context-sensitive feedback must come from assembly, wake and sea dynamics. Requiring an independent configuration-space pilot field defeats the single-ontology route.

The retained stress tests include an envelope with bounded corrections, ensembles from declared preparation histories, hydrogen-like confinement and phase locking, non-Markovian self-hit corrections, and a Lissajous-scar comparison. The latter compares a commensurate periodic-orbit family, density enhancement, near-degenerate splitting and robustness to a declared perturbation. Lissajous imagery alone supplies no physical mode or probability law. First-passage times across a separatrix and selected basin weights must use the same flow and measure; massive-superposition and weak-probe comparisons do not authorize a second collapse ensemble.

### 9.2 Register Coherence as a Survival Bound

Let $Q_0=\mathrm{id}$ and $Q_n=R_{g_n}\circ\cdots\circ R_{g_1}$ be the controlled return-map sequence. For a coherent register set $B_{\mathrm{coh}}$,

$$
C_D=\mu_*\left(\bigcap_{n=0}^DQ_n^{-1}B_{\mathrm{coh}}\right),
\qquad
D_{\max}(\varepsilon)=\sup\left\{D:C_D\ge1-\varepsilon,
\ \sum_{n=1}^D\varepsilon_{\mathrm{leak},n}+\varepsilon_{\mathrm{meta}}(D)\le\varepsilon\right\}.
$$

This expresses survival through all operations, not merely success at the final one. Coherence time, background density, delay factor, regulator, mode gaps and gate errors are candidate inputs to such a bound. Period extraction and Shor comparisons remain downstream quantitative stress tests; a metaphor about resonance does not establish usable operation depth. The detailed alternatives are retained in [the provisional guidance and coherence source](brainstorming.md#algorithmic-resonance-and-pilot-wave-closure).

## 10. Local Provenance and Biological Response Boundaries

### 10.1 A Local Constitutive Question Separate from Bell

Pair provenance may also be tested as a locally available population statistic. This is a separate constitutive proposal, not an ER=EPR mechanism. The rejected interpretation makes information into stress, creates a wormhole, or lets a remote setting change the local sea before causal contact.

A candidate tensor uses only records whose physical carriers have entered the local causal window:

$$
C_\Pi^{ab}(\mathbf x,T)=\int\chi_{\mathrm{loc}}\Pi_{\mathrm{loc}}^{ab}\,d\rho_{\mathrm{pair}},
\qquad
C_{\Pi,0}=\tfrac13h_{ab}C_\Pi^{ab},\qquad
C_{\Pi,\mathrm{tf}}^{ab}=C_\Pi^{ab}-h^{ab}C_{\Pi,0}.
$$

The trace distinguishes scalar density from directional structure; it does not turn either into compliance. A separate derived map, schematically $\delta\mathcal M_{\mathrm{pair}}^{ab}=\mathcal L^{ab}{}_{cd}C_\Pi^{cd}$, must demonstrate predictive value beyond ordinary local density, orientation, strain and wake variables. The reversible response must preserve symmetry and positivity and respect the medium's isotropy, birefringence, dispersion and preferred-frame comparisons.

Before causal contact, both the statistic and response must satisfy a zero functional derivative with respect to a remote setting:

$$
\frac{\delta C_\Pi^{ab}(\mathbf x_B,T)}{\delta\hat{\mathbf m}_A(T_A)}=0
\quad\text{when}\quad
T-T_A<\frac{\|\mathbf x_B-\mathbf x_A\|}{c_f}.
$$

Matched comparisons are isotropic and aligned pair populations at equal scalar density, provenance-scrambled records preserving one-point variables, matched non-pair populations, and pre/post carrier-arrival windows. Redundancy, missing physical carrier, absent retained consumer or a violation of causality rejects the compliance proposal. It does not reject pair provenance as a quantum source record. The [scope decision](decisions/pair-provenance-local-compliance-scope-decision.md) establishes no nontrivial medium response and grants no Bell inference from compliance alone.

### 10.2 Replication-Gated Xenon Comparisons

The preserved biological watch concerns a reported isotope-dependent anesthetic threshold, not consciousness ontology. For isotope thresholds $E_a$, its comparison is

$$
C_{\mathrm{Xe}}=\tfrac12(E_{129}+E_{131})-\tfrac12(E_{132}+E_{134}).
$$

Positive contrast in ED50 concentration means the nonzero-spin isotope group requires more anesthetic. The source reports approximately 31 percentage points for derived xenon-alone values and seven in the co-isoflurane bracket. These are unrefreshed source-reported watch values, not accepted replicated measurements in this manuscript.

The proposed nuisance model separates spin class, isotope mass, polarizability or binding proxy, delivery and residuals. Blinding, purity, preparation, co-anesthetic exposure, endpoint definition and uncertainty also matter. The adjacent 131/132 contrast tests a different dependence from same-spin-class mass-neighbor comparisons. Loss of the pattern under replication closes the watch rather than supporting promotion.

A robust result could constrain a biological endpoint kernel $\Delta p_k=\mu_*^a(B_k^a)-\mu_*^b(B_k^b)$ under fixed protocols. It would not establish that nuclear spin creates consciousness or that a biological threshold is a Decider-level choice. Radical-pair models remain comparisons; proposed organoid and fly experiments remain proposals. The source's replication and nuisance-control boundaries are retained in [the xenon watch](brainstorming.md#xenon-isotope-spin-biology-validation-watch).

### 10.3 The Remaining Physical Join

The unresolved neutrino-chirality/pro-Noether conversion idea remains a guessed branch requiring a derived chirality map and wrong-sign or conjugate-channel discriminator. It supplies no missing spin or probability construction.

Across the manuscript, the physical join is the same: an admitted history, sufficient retained variables, a sourced preparation measure, lawful apparatus operations and completed records must support a common effective description. Hilbert constructions, quaternion covers, scalar basin maps and generated tables clarify this requirement and rule out specific shortcuts. None substitutes for the missing same-history recovery.
