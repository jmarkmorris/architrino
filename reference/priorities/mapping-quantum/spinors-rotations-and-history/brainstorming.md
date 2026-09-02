# Spinors, Rotations, and History

## Purpose, Scope, and Conclusions

This exploration develops the rotation mathematics needed to assess braid and assembly descriptions of spin. It belongs to [Quantum Mapping](../priorities.md); the introductory QC-012 result and verification record live in the [parent work log](../work-log.md#qc-012--spinors-rotations-and-history-exploration). The [ordered-frame spinor target](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#ordered-frame-spinor-target) owns physical spin recovery, and the [EQ-15/EQ-27 source map](../../mapping-equations/eq-15-27-ordered-frame-loop-source-field-map.md) owns its equation-level evidence requirements. The sibling [geometric-phase and holonomy exploration](../../mapping-standard-model/geometric-phase-and-holonomy/brainstorming.md) owns the broader phase-transport investigation. No candidate, score, detector law, or corpus claim is advanced here.

The principal conclusion is a separation of obligations. A rotation double cover is exact mathematics. A physical spinor response requires a derived map from admissible assembly-and-apparatus histories into that mathematics. Fermionic exchange, probabilities, magnetic response, Lorentz covariance, and particle identification require additional constructions. The strongest exclusions developed below are an orientation-only amplitude obstruction, an endpoint-history counterexample, a tensor-product obstruction for two putative spinor cores, and a continuity obstruction to changing integer into half-integer rotation class by a smooth deformation of one unchanged effective sector.

Plainly: the mathematics tells us what a successful assembly must do, and rules out some insufficient descriptions. It does not tell us that a particular braid exists or that its motion already does these things.

The [bidirectional mapping method](../../mapping/mapping-method.md#bidirectional-mapping-and-mathematical-reframing) governs the argument: tested effective response → mathematical requirement → necessary native information and operation → candidate realization → independent discriminator. Established quantum and relativistic equations below are explicitly comparison mathematics or recovery targets. Native premises are only polarity, the Master Equation, delayed path histories, wake/action reasoning, Euclidean void, and absolute time. No primitive spinor, quantum state, particle mass, magnetic force, or detector probability is introduced. We work in normalized wake-speed units with $c_f=1$ in every numerical example; purely angular calculations are dimensionless and independent of that normalization.

## Ordinary Rotations and Their Quaternion Cover

### Rotations Act on Vectors and Ordered Frames

**Claim grade: derived, comparison mathematics.** A proper spatial rotation is a real matrix $R$ satisfying $R^{\mathsf T}R=I_3$ and $\det R=1$, where $I_3$ is the three-dimensional identity. It preserves lengths and oriented volume. An ordered orthonormal frame is three mutually perpendicular unit vectors with positive orientation, written as the columns of $F\in SO(3)$. An active rotation takes a vector $\mathbf v$ to $R\mathbf v$ and the frame to $RF$. An axis alone is a point of the sphere $S^2$ and omits rotation about that axis. None of these definitions supplies an internal phase or a path history.

Plainly: a frame records three labeled directions. A single arrow records only one direction, so it cannot say whether an object has twisted around that arrow.

For the positive rotation angle $\theta$ about the third Cartesian axis,

$$
R_z(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta&0\\
\sin\theta&\cos\theta&0\\
0&0&1
\end{pmatrix}
\qquad
R_z(2\pi)=R_z(4\pi)=I_3
$$

Plainly: the two perpendicular coordinates rotate together while the third stays fixed. The visible frame is back after one full turn and also after two. These equal endpoint matrices do not say whether the intervening paths were equivalent.

Order matters. With the usual right-oriented Cartesian axes, $R_x(\pi/2)R_y(\pi/2)\hat{\mathbf e}_z=\hat{\mathbf e}_x$, whereas $R_y(\pi/2)R_x(\pi/2)\hat{\mathbf e}_z=-\hat{\mathbf e}_y$. Products act from right to left. This is ordinary Euclidean geometry, not a magnetic right-hand-rule law. A candidate that stores only a total unsigned angle loses a distinction already present before spinors enter. Falsifier: explicit multiplication of the two rotation matrices giving the same vector would refute this worked order comparison.

Plainly: turning first about one axis and then another can end somewhere different from doing the turns in the opposite order. Rotation history cannot generally be reduced to adding angles.

### Unit Quaternions and the Two-to-One Map

A quaternion $q=a+b\boldsymbol\iota+c\boldsymbol\jmath+d\boldsymbol\kappa$ has four real coefficients and multiplication rules $\boldsymbol\iota^2=\boldsymbol\jmath^2=\boldsymbol\kappa^2=-1$ and $\boldsymbol\iota\boldsymbol\jmath=\boldsymbol\kappa=-\boldsymbol\jmath\boldsymbol\iota$, with cyclic counterparts. These bold letters are quaternion basis elements, not physical vectors or the native coupling constant $\kappa$. Its conjugate is $\bar q=a-b\boldsymbol\iota-c\boldsymbol\jmath-d\boldsymbol\kappa$. Unit quaternions satisfy $q\bar q=1$ and form the three-sphere $S^3$ in four-dimensional coefficient space. This coefficient space is not an extra spatial dimension.

Plainly: four numbers with one length constraint provide a convenient way to calculate rotations. Their special multiplication remembers the order of turns.

Identify a vector with the pure imaginary quaternion $v=v_x\boldsymbol\iota+v_y\boldsymbol\jmath+v_z\boldsymbol\kappa$. Define the cover $\varpi$ by

$$
\varpi(q)v=qv\bar q
\qquad
q_{\hat{\mathbf n}}(\theta)
=\cos\frac{\theta}{2}
+(n_x\boldsymbol\iota+n_y\boldsymbol\jmath+n_z\boldsymbol\kappa)\sin\frac{\theta}{2}
$$

Plainly: the quaternion acts on a vector from both sides. The unit vector $\hat{\mathbf n}$ chooses the rotation axis, and half the spatial angle enters the quaternion coefficients. Because both signs reverse together, $q$ and $-q$ produce the same vector rotation.

The product preserves the vector's norm, and continuity from $q=1$ fixes positive determinant. If $q$ commutes with every pure imaginary quaternion, its imaginary coefficients vanish, so the kernel of $\varpi$ is exactly $\{1,-1\}$. Every axis-angle rotation is obtained by the displayed formula. Thus $SO(3)\simeq S^3/\{q\sim-q\}$. This is a derivation of the double cover, with the quaternion construction independently documented in Woit, Chapter 6, especially §§6.2.1 and 6.2.3–6.2.4 ([source notes](#sources-and-verification-scope)).

Plainly: exactly two quaternions describe each ordinary rotation. This is a property of the description; it is not yet a pair of physically different assemblies.

The corresponding complex matrices use the Pauli matrices $\sigma_x,\sigma_y,\sigma_z$ and the two-dimensional identity $I_2$:

$$
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\qquad
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}
\qquad
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

Plainly: these three explicit matrices form the calculation basis. The ordinary complex number $i$ squares to minus one; it is different from each bold quaternion basis element.

Under $\boldsymbol\iota\mapsto-i\sigma_x$, $\boldsymbol\jmath\mapsto-i\sigma_y$, and $\boldsymbol\kappa\mapsto-i\sigma_z$, unit quaternions become the unitary determinant-one matrices $SU(2)$. A two-component spinor $\psi\in\mathbb C^2$ transforms by left multiplication:

$$
U_{\hat{\mathbf n}}(\theta)
=\exp\!\left(-\frac{i\theta}{2}\hat{\mathbf n}\cdot\boldsymbol\sigma\right)
=I_2\cos\frac{\theta}{2}
-i\hat{\mathbf n}\cdot\boldsymbol\sigma\sin\frac{\theta}{2}
\qquad
\psi' = U_{\hat{\mathbf n}}(\theta)\psi
$$

Plainly: a spinor has two complex components, and the rotation matrix acts directly on them. The exponential reduces to sine and cosine because the axis-weighted Pauli matrix squares to the identity. This is the defining two-dimensional representation, meaning a multiplication-preserving action of the rotation-cover group.

A vector encoded as $V=v_x\sigma_x+v_y\sigma_y+v_z\sigma_z$ instead transforms as $V'=UVU^\dagger$, where the dagger denotes conjugate transpose. This distinction between one-sided spinor multiplication and two-sided vector multiplication explains the sign difference without a mechanical metaphor. Both $U$ and $-U$ act identically on $V$; they act oppositely on a nonzero spinor. The algebra is independently checkable from the displayed matrices and Steane's §II, with active-rotation conventions fixed here.

Plainly: the vector formula uses the rotation matrix twice, so the two minus signs cancel. The spinor formula uses it once, so its sign survives at the representative level.

### Worked Rotation in Two Independent Formulations

Take $\psi_x=(1,1)^{\mathsf T}/\sqrt2$. Its comparison direction is $\mathbf b=\psi_x^\dagger\boldsymbol\sigma\psi_x=\hat{\mathbf e}_x$. A rotation around the third axis gives

$$
U_z(\theta)=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})
\qquad
\psi_x(\theta)=\frac1{\sqrt2}\begin{pmatrix}e^{-i\theta/2}\\e^{i\theta/2}\end{pmatrix}
\qquad
\mathbf b(\theta)=(\cos\theta,\sin\theta,0)
$$

Plainly: the two components acquire opposite phases, while the direction inferred from them rotates by the full angle. At a quarter turn the direction points along the second axis. After a full turn the direction returns but both components have changed sign.

The quaternion calculation is separate: set $a=\cos(\theta/2)$, $b=\sin(\theta/2)$, and multiply using the quaternion table rather than Pauli matrices:

$$
(a+b\boldsymbol\kappa)\boldsymbol\iota(a-b\boldsymbol\kappa)
=(a^2-b^2)\boldsymbol\iota+2ab\boldsymbol\jmath
=\cos\theta\,\boldsymbol\iota+\sin\theta\,\boldsymbol\jmath
$$

Plainly: direct quaternion multiplication produces the same visible direction as the spinor's matrix bilinear. This second calculation checks the angle and sign convention without recycling a stored output from the first calculation.

| Rotation angle | Continuously followed quaternion | Spinor relative to its initial representative | Visible ordered frame |
| --- | --- | --- | --- |
| $0$ | $1$ | $\psi_x$ | initial frame |
| $\pi/2$ | $(1+\boldsymbol\kappa)/\sqrt2$ | $(e^{-i\pi/4},e^{i\pi/4})^{\mathsf T}/\sqrt2$ | quarter turn |
| $2\pi$ | $-1$ | $-\psi_x$ | initial frame |
| $4\pi$ | $1$ | $\psi_x$ | initial frame |

Plainly: the last two rows have the same visible frame but different lifted representatives. The quaternion and spinor columns assume continuous transport from the stated starting choice, not an arbitrary sign choice at every sample.

**Claim grade: derived, comparison mathematics.** Matrix bilinears, quaternion multiplication, and the ordinary $R_z$ matrix agree exactly. The work-log receipt records an exact symbolic check as an arithmetic audit; the independent references are the quaternion construction and the published matrix derivation, not agreement between two copies of one implementation. Falsifier: an explicit component mismatch under these fixed conventions. This establishes no native trajectory or apparatus response.

### One Turn, Two Turns, and What Actually Returns

A continuous rotation path beginning at $I_3$ has a unique continuous lift beginning at $1$. A one-turn path ends at $-1$ upstairs; its double ends at $1$. Since $S^3$ is simply connected, its closed loops can be continuously contracted, and $SO(3)$ has two based loop classes, $\pi_1(SO(3))=\mathbb Z_2$. A homotopy is such a continuous deformation with endpoints fixed. The one-turn path is not contractible in $SO(3)$; the two-turn path is. This is a topological statement about paths, not a statement that every physical operation performed during the path is undone.

Plainly: two turns can be untwisted continuously within rotation-path geometry, while one turn cannot. Energy exchanged, wakes emitted, or detector records made during either path do not disappear when a mathematical loop contracts.

A belt or plate demonstration illustrates this distinction only after its constraints are specified: fixed attachment, framing, permitted motion, and avoidance of crossings. Different permitted deformations define different spaces. Neither a belt's material elasticity nor an imposed attachment is a native architrino ingredient. A single direction on $S^2$ is even less sufficient: rotation about that direction can leave the direction unchanged throughout. The full frame or equivalent relational information is therefore required for this particular lift construction.

## Sign, Ray, Phase, and Experimental Comparison

### A Sign by Itself Has No Observable Effect

**Claim grade: derived, effective quantum comparison.** For a normalized spinor $\psi$, an isolated pure-state ray identifies all representatives $e^{i\alpha}\psi$. The density matrix $\rho=\psi\psi^\dagger$ and the expectation of any matrix observable $A$ satisfy

$$
(-\psi)(-\psi)^\dagger=\rho
\qquad
(-\psi)^\dagger A(-\psi)=\psi^\dagger A\psi
$$

Plainly: reversing both component signs changes neither the density matrix nor any isolated-state measurement computed from it. Here $\alpha$ is a common phase convention, and $A$ stands for any chosen effective observable. This is the explicit counterexample to inferring a measurement solely from a minus sign.

The same counterexample is stronger for $\psi_z=(1,0)^{\mathsf T}$ rotated about the third axis: $U_z(\theta)\psi_z=e^{-i\theta/2}\psi_z$. Its ray is unchanged for every angle, not only at one turn. A full spinor representative, a physical ray, and a visible frame are different mathematical objects. A normalized spinor ray describes a direction through its Bloch vector; it does not by itself specify an entire oriented body frame.

Plainly: an axis-aligned state can accumulate a representative phase while every isolated spin measurement stays unchanged. To make that phase matter, something must retain a comparison with another route or reference.

### A Controlled Two-Path Comparison

**Claim grade: derived within effective quantum comparison.** For an ideal coherent interferometer, let $|a\rangle,|b\rangle$ label orthogonal paths; rotate the spin only in path $a$. Let $\delta$ be the controlled reference phase in path $b$, and recombine at the output $|+\rangle=(|a\rangle+|b\rangle)/\sqrt2$. Effective quantum mechanics gives

$$
|\Psi\rangle=\frac{|a\rangle\otimes U\psi+e^{i\delta}|b\rangle\otimes\psi}{\sqrt2}
\qquad
P_+=\frac14\left\|U\psi+e^{i\delta}\psi\right\|^2
=\frac12\left[1+\operatorname{Re}\!\left(e^{-i\delta}\psi^\dagger U\psi\right)\right]
$$

Plainly: the output combines two routes coherently. Only one route receives the spin operation, so its sign can change the cross term between routes. The probability $P_+$ follows here from the effective squared-amplitude rule; using it as a benchmark does not derive that rule from native dynamics.

For $\psi_x$ and $U_z(\theta)$, the overlap is $\cos(\theta/2)$, yielding $P_+=[1+\cos\delta\cos(\theta/2)]/2$. At $\delta=0$, the ideal values for zero, one, and two turns are $1,0,1$. Applying $-I_2$ to both paths instead changes the whole state by one global sign and leaves $P_+$ unchanged. Destroying path coherence removes the interference term. An independently changed phase plate can also reproduce a fringe shift, so a fringe alone does not identify its mechanism: the spin operation and nuisance phases must be separately calibrated.

Plainly: a one-arm turn swaps a bright output with a dark one in this ideal setup; a common turn of both arms does not. The comparison apparatus is part of the claim, not an optional illustration.

**Claim grade: measured, external observer-level evidence.** Rauch and colleagues' 1975 perfect-crystal neutron interferometer varied magnetic exposure between coherent paths and observed oscillations consistent with the predicted four-pi spinor period. Their instrument tested a relative neutron spin transformation; it did not observe literal rotation of microscopic constituents, prove an elementary-neutron ontology, or establish a braid mechanism. The relevant experimental setup and result are in pp. 425–427 of [the original paper](https://www.oeaw.ac.at/fileadmin/Institute/IQOQI-Vienna/PDF/publications-zeilinger/1975_Verification_of_Coherent_Spinor_Rotation_of_Fermions.pdf). Falsifier for a proposed native recovery: failure of the calibrated one-arm, common-arm, and incoherent controls using one source–path–apparatus construction.

Plainly: the experiment supplies the physical comparison missing from an isolated sign. A native explanation must account for how that comparison is prepared and read, not merely display a quaternion changing sign.

| Object being compared | What identifies equivalent descriptions? | What one turn establishes |
| --- | --- | --- |
| Visible orientation | equality of the final $SO(3)$ frame | ordinary endpoint return |
| Chosen quaternion or spinor representative | a declared initial sign and continuous lift | opposite endpoint representative |
| Isolated quantum ray | common nonzero complex rescaling, normalized to a phase | no sign-only distinction |
| Relative path phase | common rephasing of the complete preparation and readout | a possible interferometric distinction |
| Full labeled native history | only declared identity-preserving coordinate changes | no return follows from orientation alone |
| Experimentally specified response | fixed source, operations, environment, detector, and nuisance controls | a measurable difference only after response recovery |

Plainly: these six comparisons answer different questions. The first three are mathematical identifications; the last three require relational information and, for an actual experiment, a physical preparation and readout.

## Native Records and the Operation That Must Be Derived

### Minimum Information for This Test

**Claim grade: inferred, necessary information for this proposed test.** A candidate record is a description of native history, not a new primitive state variable. Write $\mathcal H_{\le T}$ for the labeled worldlines and their induced wakes up to absolute time $T$. A useful minimum description for a proposed rotation test is

$$
\Theta_T=\left(
\{\mathrm{id}_i,q_i,\mathbf X_i(T'),\mathbf V_i(T'):T'\le T\}_{i\in I},
\mathcal R_{\le T},F,\boldsymbol\phi,
\mathcal A,\mathcal N,\mathcal P,\mathcal G
\right)
$$

Plainly: $I$ lists every participating architrino; each has persistent identity, polarity, position, and velocity history. $\mathcal R$ records the relevant causal roots, $F$ an extracted ordered frame, and $\boldsymbol\phi$ internal phase relations. $\mathcal A$ identifies any accessory subset, $\mathcal N$ the environment and apparatus histories, $\mathcal P$ preparation and reaction provenance, and $\mathcal G$ the explicitly permitted relabelings. The later entries are derived summaries or declared partitions of the history, not independent substances.

The root record must identify transmitter and receiver, emission and reception times, multiplicity, continuation through branch changes, emission order, and the source tangent needed for $D_t$ and the acceleration weight. For a simple root the canonical quantities are

$$
\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=T_r-T_t
\qquad
D_t=1-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t
\qquad
W^{\mathrm{acc}}=\frac1{|D_t|}
\qquad T_t<T_r
$$

Plainly: a hit comes from a particular past emission whose expanding wake reaches the receiver now. The unit vector $\hat{\mathbf r}_t$ points from that past transmitter to the current receiver. The separation, source velocity, and root identity matter; a picture of current positions does not contain them. The factor $D_t$ measures whether the source crosses its wake condition transversely, and its reciprocal magnitude supplies the arriving acceleration weight. The displayed weight applies only to simple roots with $D_t\ne0$; a fold requires the owner's declared boundary treatment.

A finite stored history is sufficient only after a causal-memory bound or an exact equivalent boundary representation has been justified. Angular-momentum and action ledgers must be computed from this same record, including wake, accessory, apparatus, and medium transfer; no sum of primitive $m\mathbf v$ terms is licensed. The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) owns the law, the [angular-momentum bridge](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#angular-momentum-as-a-history-ledger) owns the conservation construction, and the [absolute native situation record](../../mapping-equations/inferring-braid-requirements.md#absolute-native-situation-record) owns the broader mapping interface.

Plainly: the proposed list says what information the spin test must be able to inspect. It is not a claim that a finite tuple has already been proved sufficient to restart all delayed dynamics.

### Changing Coordinates Is Not Driving a Rotation

**Claim grade: derived, native covariance on the declared regular domain.** A constant $R\in SO(3)$ applied to every worldline, wake, and apparatus preserves distances, dot products, root times, $D_t$, and polarity products. Each per-hit acceleration rotates as $R\mathbf A$, so the Master Equation is covariant. Global polarity reversal also preserves every product $q_iq_j$ at fixed worldlines. These are transformations of the complete comparison history, not operations that physically rotate one assembly relative to its surroundings.

Plainly: redrawing the whole experiment in a rotated coordinate system changes no outcome. Likewise, reversing every polarity in the complete native problem preserves the pairwise polarity products. Neither operation alone describes manipulating a particle inside an unchanged laboratory.

A time-dependent active construction $\mathbf X'_i(T)=R(T)\mathbf X_i(T)$ has

$$
\ddot{\mathbf X}'_i
=R\ddot{\mathbf X}_i+2\dot R\dot{\mathbf X}_i+\ddot R\mathbf X_i
\qquad
\mathbf r'_{rt}=R(T_r)\mathbf X_r(T_r)-R(T_t)\mathbf X_t(T_t)
$$

Plainly: the driven path acquires extra acceleration terms, and its current receiver and past transmitter are rotated by different matrices. Consequently its causal roots generally change. A time-dependent quaternion animation is not automatically a solution of the unchanged delayed law.

The necessary native operation is therefore a lawful controlled history $\mathcal T_\gamma$ induced by a specified apparatus protocol $\gamma$, together with a comparison map $\Pi_{\mathrm{eff}}$ satisfying

$$
\Pi_{\mathrm{eff}}(\mathcal T_\gamma\Theta)
\simeq D(\widetilde\gamma)\Pi_{\mathrm{eff}}(\Theta)
$$

Plainly: first evolve the actual apparatus and assembly interaction; then extract its effective response. The target is agreement with the spin representation $D$ of the continuously lifted rotation path $\widetilde\gamma$, at a declared tolerance and after independently controlled dynamical phases. Neither $D$ nor a quantum amplitude is assumed to be a native coordinate.

A full accumulated history never literally forgets a completed turn: its time domain and emitted wakes have grown. A physical return must specify a comparison of translated history windows or future-relevant states, including boundary wakes and permitted common time-origin shift. Endpoint phase parity modulo two is not sufficient if continuous phase offsets, root data, apparatus state, or future response fail to restore. The existing ordered-frame target's “full history” should be read with this explicit return equivalence; this is a proposed clarification for that owner, not an edit to its contract.

Plainly: two turns can restore the information relevant to a repeatable response without erasing the past. The return test must name exactly which information it compares and why omitted history cannot change the result.

## Two Obstructions to Over-Compressed Descriptions

### An Orientation-Only Spinor Amplitude Cannot Be Equivariant

**Conditional lemma. Claim grade: derived, comparison mathematics.** Let a candidate reduced space $X$ carry an ordinary $SO(3)$ action, and suppose a map $f:X\to\mathbb C^2$ is required to obey $f(\varpi(U)x)=Uf(x)$ for every $U\in SU(2)$. Then $f$ is identically zero. Indeed, substitute the central element $U=-I_2$:

$$
f(x)=f(\varpi(-I_2)x)=-f(x)
\quad\Longrightarrow\quad f(x)=0
$$

Plainly: the same ordinary orientation cannot be sent both to a nonzero spinor and to its negative by a single-valued rule. A nonzero spinor amplitude needs a lifted path, an appropriate bundle, or relational data beyond an ordinary orientation-only state.

This does not prohibit a ray-valued map, local sign conventions with transition functions, or a derived history-dependent effective theory. It excludes precisely the stated globally single-valued, strictly equivariant amplitude map on any space whose action factors through $SO(3)$, even a space containing additional classical history variables. A history-based recovery must therefore retain a nontrivial controlled path action or justify a projective/relational comparison; merely adding more coordinates while $-I_2$ still acts trivially does not evade the proof. Adding a free sign bit by hand escapes the algebra only by changing the premises; its native origin and response remain unproved. Falsifier: a nonzero map satisfying the displayed identity for all $U$, including $-I_2$. The [ordered-frame target](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#ordered-frame-spinor-target) is the existing consumer.

Plainly: the issue is how the physical operation acts, not how many numbers are stored. A longer record helps only if it retains the relevant distinction between operations and supports the required comparison.

### Equal Endpoints Can Have Different Lifted Paths

Let $\gamma_0(s)=I_3$ and $\gamma_1(s)=R_z(2\pi s)$ for $0\le s\le1$. They have identical initial and final orientations, yet their lifts from $1$ end at $1$ and $-1$. Any classifier depending only on the endpoint frame assigns the same answer to both. This exact counterexample extends the existing [endpoint-exchange exclusion](../../mapping-equations/inferring-braid-requirements.md#relational-geometry-exchange-and-measurement) to controlled rotation paths.

Plainly: the final photograph cannot distinguish waiting from making a full turn. The path supplies the missing distinction, though only an additional response construction can make it observable.

For an admissible-history space $\mathscr H$ and quotient $Q:\mathscr H\to X$, a proposed history sign $\eta:\mathscr H\to\{+1,-1\}$ descends to $X$ if and only if it is constant on every fiber $Q^{-1}(x)$. Necessity follows because $\eta=\bar\eta\circ Q$ assigns one value to a fiber; sufficiency follows by defining $\bar\eta(x)$ to be that common value. Thus an allowed relabeling that identifies opposite signs disproves that sign as an invariant of the quotient.

Plainly: information may be discarded only when the claimed answer is unchanged by discarding it. This is the precise test for whether a proposed parity survives a relabeling rule.

Permitted coordinate renamings must transform all dependent entries together. A bijection of arbitrary identity names is distinct from exchanging two physical trajectories; rewriting a phase origin is distinct from changing a relative phase; a common translation is distinct from moving only the assembly relative to an apparatus. Persistent role order must not be reset after a turn. Moreover, integer winding parity is not obtained automatically from real-valued writhe, which varies continuously in general: any writhe-based parity in the owner requires a separately justified integer lift and branch rule. These are necessary audit conditions, not a new topological invariant or an accepted quotient.

Plainly: a sign can be created by a naming convention just as easily as it can be erased by one. Every proposed sign must survive the actual harmless renamings while remaining sensitive to the physical operation it is meant to record.

## Spin Classes and Composition

### The Sign Does Not Determine the Spin

**Claim grade: derived, representation mathematics.** The spin-$j$ representation can be constructed as the symmetric part of $2j$ copies of $\mathbb C^2$, where $2j$ is a nonnegative integer. Symmetric tensors have basis labels corresponding to $2j+1$ possible counts of the second component. A central minus sign acts on every factor, giving

$$
V_j=\operatorname{Sym}^{2j}(\mathbb C^2)
\qquad
\dim V_j=2j+1
\qquad
D_j(-I_2)=(-1)^{2j}I_{2j+1}
$$

Plainly: a full turn distinguishes integer from half-integer representations, but not spin one-half from spin three-halves, or spin zero from spin one. The number of independent polarization components and the full rotation action must also be recovered. The symmetric-tensor construction is comparison mathematics, not a count of architrinos.

For rotations about the third axis, the basis vectors with magnetic labels $m=-j,-j+1,\ldots,j$ transform by $e^{-im\theta}$. Thus a sign test must be supplemented by the generators $J_a^{\mathrm{eff}}$, their angular-momentum scale $\hbar$, and the irreducible-sector condition

$$
[J_a^{\mathrm{eff}},J_b^{\mathrm{eff}}]
=i\hbar\epsilon_{abc}J_c^{\mathrm{eff}}
\qquad
\sum_a(J_a^{\mathrm{eff}})^2=\hbar^2j(j+1)I
$$

Plainly: the commutator says how rotations about different axes fit together. The second identity distinguishes the spin class. The alternating symbol $\epsilon_{abc}$ records axis order; $\hbar$ is the effective angular-action unit to be recovered, not an intrinsic property assigned to one architrino.

These identities can be checked on Pauli matrices for $j=1/2$ and on the ordinary vector representation for $j=1$. The native requirement is a projected response with the correct dimension, generator algebra, and action normalization on the same history. A non-gauge odd loop alone is necessary for the proposed spinorial route but insufficient to identify $j=1/2$. Woit's Chapters 8–9 supply the independent representation construction; falsifier for the proposed identification is a surviving extra $j=3/2$ sector or an incorrect generator action under a rotation about another axis.

### Worked Two-Spinor Control

Let $|\uparrow\rangle=(1,0)^{\mathsf T}$ and $|\downarrow\rangle=(0,1)^{\mathsf T}$ be effective spin basis vectors. For two factorized spin-one-half spaces, define

$$
|s\rangle=\frac{|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle}{\sqrt2}
\qquad
\mathcal V_t=\operatorname{span}\!\left\{
|\uparrow\uparrow\rangle,
\frac{|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle}{\sqrt2},
|\downarrow\downarrow\rangle
\right\}
$$

Plainly: the antisymmetric combination is one state, and the three symmetric combinations form another subspace. These are the scalar singlet and vector triplet under joint rotations; “antisymmetric” here concerns interchange of tensor factors, not yet a physical exchange-statistics law.

For any determinant-one matrix $U$, $U\otimes U$ multiplies the antisymmetric state by $\det U=1$. The symmetric subspace is the degree-two representation. In particular,

$$
V_{1/2}\otimes V_{1/2}=V_0\oplus V_1
\qquad
(-I_2)\otimes(-I_2)=I_4
\qquad
D_1(U_z(\theta))=\operatorname{diag}(e^{-i\theta},1,e^{i\theta})
$$

Plainly: two spinor signs cancel under a common full turn. The scalar is unchanged by every rotation, while the vector's three components transform differently under partial turns. This supplies both spin-zero and spin-one controls using the same mathematics.

**Conditional obstruction. Claim grade: derived.** If a two-core proposal really has the product rotation action $V_{1/2}\otimes V_{1/2}$ and its relative motion, accessories, and medium contribute only integer-spin representations, then every resulting sector has even central sign. No invariant subspace of this product can be a spin-one-half sector, because the central element already acts as $+I$ everywhere. A native two-braid construction is not assumed to satisfy these premises; neither core has an accepted spinor identification merely by being called a braid.

Plainly: a neutrino cannot be explained as two already established spin-one-half components plus only ordinary integer-spin dressing under this product rule. A different constituent assignment, a nonfactorizing joint history, or an additional nontrivial sector would have to be demonstrated. Saying “almost a photon” does not supply it.

This test is directly relevant to the [near-photon neutrino proposal](../../../../content/markdown/aaa/assemblies/fermions/neutrinos.md#referent-status) and the [planar-pair photon proposal](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-referent-status). Their common geometric ancestry does not determine a common spin, but a claimed unchanged product representation would constrain both. Falsifier for applying the obstruction to a candidate: derive a joint rotation action that does not factor in the stated way. This would defeat the application, not the tensor identity. Both owners remain read-only here.

### A Continuous Deformation Cannot Silently Change Central Sign

**Conditional lemma. Claim grade: derived.** Suppose $D_s$ is a continuous family of finite-dimensional unitary representations of $SU(2)$ on one fixed effective space, parameterized by $s$ in a connected interval. Since $D_s(-I_2)^2=I$, the negative-central-sign projector is

$$
P_-(s)=\frac{I-D_s(-I_2)}2
\qquad
\operatorname{rank}P_-(s)=\operatorname{tr}P_-(s)\in\mathbb N_0
$$

Plainly: this projector selects exactly those components that reverse sign after one full turn. Its rank is an integer but changes continuously under the assumptions, so it must stay constant.

Consequently a smooth “unlocking” or shape deformation cannot change a purely integer-spin sector into a half-integer one while keeping this continuous representation family and sector identification intact. A sector crossing, loss of an isolated mode, change in admissible quotient or boundary conditions, or a larger nonfactorizing construction can invalidate the assumptions. No gap or retained branch is established here. The claim is an obstruction to one smooth unchanged-sector story, not a universal prohibition on particle conversion. Falsifier: an explicitly continuous fixed-space representation family with a changing projector rank; an actual discontinuity instead identifies the required new construction.

Plainly: a small change in shape is not enough to explain a different turn response. The proposal must identify where the effective state space or its physical identification changes.

## Distinct Operations and Relativistic Recovery

### Rotation, Phase, Parity, Conjugation, and Exchange

| Operation or label | Effective definition | Native obligation or exclusion |
| --- | --- | --- |
| Spatial rotation | active change of spatial orientation, with spin action $D_j$ | transport complete histories relative to the apparatus; preserve unrelated charge and color labels |
| Internal phase change | change of a mode's phase relative to another mode or reference | identify a native relative phase and its transport; a common phase convention is removable |
| Parity $P$ | spatial inversion; polar vectors reverse, axial vectors do not | invert positions and velocities at fixed polarities, with all wake geometry transformed; distinguish geometry from a parity eigenvalue |
| Charge conjugation $C$ | conjugate internal charge representations | proposed native polarity reversal must transform the whole charged record, not merely one orientation label |
| Chirality | left/right Lorentz-spinor representation, selected by chiral projectors | recover the appropriate boost action and interaction coupling; geometric handedness alone is insufficient |
| Helicity | spin projection along nonzero momentum | an observer-dependent readout for a massive state, not a new polarity or weak-posture switch |
| Exchange | interchange identical effective particles along a two-object path | retain constituent identities and apparatus-relevant exchange history; no sign follows from overlap avoidance |
| Antiparticle relation | conjugate particle sector and its interactions | recover charge-conjugate channels with the same spin class; neutrality alone does not settle self-conjugacy |

Plainly: turning an object, reflecting it, reversing polarities, changing an internal phase, and exchanging two objects are different operations. A single clockwise/counterclockwise label cannot encode their distinct consequences.

A local geometric caution matters for ordered frames. If $\mathbf u,\mathbf v$ are polar displacement vectors, then $(P\mathbf u)\times(P\mathbf v)=\mathbf u\times\mathbf v$, so their cross-product normal is axial. The determinant of three such axial normals is parity-even, not automatically a mirror-odd handedness. A mirror-odd scalar can instead use a polar–axial pairing, such as a polarity-weighted displacement dotted into an angular-history vector, provided both are derived and nonzero. This distinguishes the live B1 polarity-dipole pairing from a generic determinant label. Any owner that uses “oriented normal” must specify its transformation type before assigning a parity action.

Plainly: a rotation-plane normal does not reverse under a mirror in the same way a displacement does. A picture's apparent handedness is not enough to decide which sign parity changes. This is a cross-owner clarification proposal, not a change to canonical orientation terminology.

### Weyl and Dirac Descriptions

**Claim grade: derived, effective representation comparison.** Spatial spinors alone do not supply Lorentz boosts. The relevant proper Lorentz cover is $SL(2,\mathbb C)$, acting on a Hermitian matrix $X_{\mathrm{eff}}=c_{\mathrm{eff}}t_{\mathrm{eff}}I_2+\mathbf x_{\mathrm{eff}}\cdot\boldsymbol\sigma$ by $X'_{\mathrm{eff}}=AX_{\mathrm{eff}}A^\dagger$. Its determinant is $c_{\mathrm{eff}}^2t_{\mathrm{eff}}^2-\|\mathbf x_{\mathrm{eff}}\|^2$, which is preserved because $\det A=1$. These are effective observer coordinates and an effective limiting speed, not the Euclidean-void substrate coordinates or an assumed identification with $c_f$.

Plainly: the same matrix language can represent observer spacetime transformations, but doing so adds boosts and an invariant effective interval. None of that follows from the existence of a spatial quaternion chart.

In a chiral convention with metric signature $(+---)$, a left Weyl spinor transforms by $A_L$, while a right Weyl spinor transforms by $(A_L^\dagger)^{-1}$. For a rotation $A_L=U$, the two actions coincide; for a boost they differ. One consistent active convention is

$$
A_L(\boldsymbol\theta,\boldsymbol\zeta)
=\exp\!\left[-\frac{i}{2}\boldsymbol\theta\cdot\boldsymbol\sigma-\frac12\boldsymbol\zeta\cdot\boldsymbol\sigma\right]
\qquad
A_R=(A_L^\dagger)^{-1}
\qquad
\Psi=\begin{pmatrix}\psi_L\\\psi_R\end{pmatrix}
$$

Plainly: $\boldsymbol\theta$ specifies the rotation parameters and $\boldsymbol\zeta$ the boost parameters, called rapidities. Opposite boost signs distinguish the two Weyl descriptions, whereas their rotation signs agree. For the displayed plus-sign spatial encoding of $X_{\mathrm{eff}}$, the active boost convention uses $A=A_R$. A Dirac spinor combines both descriptions in four components; four components are not four physical spin polarizations.

For a free effective massive particle, a compatible chiral-basis momentum-space Dirac comparison is

$$
\left(E_{\mathrm{eff}}+c_{\mathrm{eff}}\boldsymbol\sigma\cdot\mathbf p_{\mathrm{eff}}\right)\psi_L
=M_{\mathrm{eff}}c_{\mathrm{eff}}^2\psi_R
\qquad
\left(E_{\mathrm{eff}}-c_{\mathrm{eff}}\boldsymbol\sigma\cdot\mathbf p_{\mathrm{eff}}\right)\psi_R
=M_{\mathrm{eff}}c_{\mathrm{eff}}^2\psi_L
$$

Plainly: effective energy and momentum couple the two chiral components through the effective mass $M_{\mathrm{eff}}$. Multiplying the two operators gives the usual effective mass-shell relation. This comparison does not assign mass to an architrino or install a Dirac equation as its motion law.

The additional native burdens are an observer clock-and-ruler map, covariant dispersion, the two boost responses, compatible left/right mixing, and particle/antiparticle channels on the same histories. The free Dirac equation is parity-symmetric, but the full weak interaction is not: parity interchanges chiral sectors while charged-current coupling selects the left-chiral field. A left-chiral field also creates right-helicity antiparticles in the massless limit; “right-helicity antineutrino” does not mean an observed sterile right-chiral neutrino field. Steane's Weyl/Dirac sections support these comparison conventions; the [effective C/P/T interface](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#effective-cpt-recovery-interface) and [weak-chirality requirement](../../mapping-equations/inferring-braid-requirements.md#chirality-is-not-massive-particle-helicity) retain their native ownership.

Plainly: rotations alone cannot distinguish left from right Weyl behavior. Weak selection and boosts add tests that a geometric handedness label must still earn.

An explicit helicity counterexample uses a massive effective particle with momentum along the positive third axis and spin projection along that same axis. An observer boosted past its speed along that axis assigns momentum in the negative direction. For this collinear comparison there is no spatial Wigner rotation of the spin axis, so the helicity sign reverses without any rebuilding of the physical particle. In its rest frame the momentum direction is undefined. Chirality, defined by the left/right representation and projectors, does not become an observer-selected accessory arrangement. Falsifier for a velocity-sign-only weak selector: it changes the allowed physical interaction under this re-description of the same event.

Plainly: moving past a particle can change whether its spin is described as along or against its motion. It cannot physically move different accessories into an exposed position. A native weak selector must depend on the actual event geometry, not an arbitrary observer's velocity sign.

### Spatial SU(2) Is Not Weak SU(2)

At effective grade, a left-chiral weak doublet has both a Lorentz spinor index $\alpha$ and a weak index $a$. Write its components $\psi_{\alpha a}$. A spatial rotation $U$ and weak transformation $V$ act on different factors:

$$
\psi_{\alpha a}\mapsto U_{\alpha\beta}\psi_{\beta a}
\qquad
\psi_{\alpha a}\mapsto V_{ab}\psi_{\alpha b}
\qquad
[U\otimes I_2,I_2\otimes V]=0
$$

Plainly: one operation turns spin directions; the other acts on weak-partner labels. Their matrices may have the same size, but they operate on different information. A spatial turn must not turn an electron into a neutrino.

The effective left lepton pairs are $(\nu_e,e)_L$, $(\nu_\mu,\mu)_L$, and $(\nu_\tau,\tau)_L$. The quark pairs use $(u_i,d'_i)_L$, where $d'_i=\sum_j V^{\mathrm{CKM}}_{ij}d_j$ is a weak-basis combination of down-type mass eigenstates, not simply a fixed geometric pairing of adjacent flavor names. Charged right-chiral fields are weak singlets. This is the representation content of the PDG electroweak review, §10.1; it constrains the [quantum-number dictionary](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md), not a primitive weak gauge field. A candidate tying laboratory axis rotation directly to color or weak-partner conversion fails this independent-operation test.

Plainly: two-state spin and two-member weak families are not the same two-state system. The native description must preserve the distinction even if both are built from some common geometry.

## What Accessories Can and Cannot Establish

### Live Candidate Scope

The [candidate registry](../../braid-program/candidate-registry.md) contains several geometries, not one universal preferred core. orthogonal-axis three-binary configurations supplies three indexed binary records with differing offsets and cadences. coincident-axis three-binary configurations uses common-axis geometry. two-component circular configurations has twelve members in one declared top-level record. centered five-coordinate representative allows moving binary midpoints. F1–F4 explore deformation, pair, mode, and coupled-module constructions; phase-varying display representative is a twelve-member double-dyad chart; F6 and asymmetric counter-breathing representative use eight-member tetrahedral geometry. scoped-negative circular control and the common-cadence phase-varying display representative realization have scoped negative dispositions, which do not establish exclusions of their entire parent families. None of these names constitutes a retained spinor assembly.

Plainly: a spin-recovery test must start from each candidate's actual identities and motion coordinates. It cannot assign every candidate three nested rotating layers merely because that picture is familiar.

The two registered accessory programs each specify six added architrinos: three-binary plus six, and asymmetric counter-breathing representative plus six with an axial pair and transverse quartet. “Accessory Configuration” is a six-member term in the current glossary; this does not establish that every Standard Model target needs such a configuration. The charged-fermion dictionary also allows non-axial realizations of its protected charge inventory, while neutrinos, photons, gluon corridors, weak corridors, and scalar medium modes have different proposed architectures. A different accessory inventory would need explicit owner agreement, not silent redefinition here.

Plainly: six accessories are the declared inventory of two particular programs. The number is neither a proof of charge recovery nor a universal constituent count for particles.

An A-family normal frame can be extracted only while its declared rank and ordering survive. A B-family axis requires an additional transverse reference and phase/history data; failing the A-family three-normal determinant is not by itself a universal spinor exclusion. In asymmetric counter-breathing representative the relevant frame must be extracted from its actual polarity-resolved tetrahedral/current geometry, with frame degeneracies declared. An accessory pattern can select otherwise unresolved frame directions or remove a discrete shape symmetry, but this changes the configuration quotient and must be included in the test. The [accessory adjudication](../../braid-program/braid-candidate-requirement-adjudication.md#accessory-bearing-adjudication) supplies the dynamical prerequisites.

Plainly: accessories may make an orientation distinguishable that the bare core could not distinguish. That can help define a frame, but it is still not a derivation of spinor response.

### A Conditional Preservation Result

Let $X_B$ be a core configuration/history quotient and $X_{BA}$ an accessory-bearing quotient, with continuous frame maps $F_B$ and $F_{BA}$ into $SO(3)$. Suppose a projection $p:X_{BA}\to X_B$ and section $s:X_B\to X_{BA}$ satisfy $p\circ s=\mathrm{id}$ and $F_{BA}\circ s=F_B$. Suppose also that a continuous deformation $H(x,u)$ through admissible configurations satisfies $H(x,0)=x$, $H(x,1)=s(p(x))$, and fixes $s(X_B)$ pointwise. Basepoints are chosen in this fixed subspace. This is a frame-compatible deformation-retraction assumption, much stronger than spatial separation.

Plainly: the assumption says that adding the accessory coordinates does not create or destroy relevant loops, and that their removal can be performed without crossing a forbidden configuration or changing the frame's turn history.

**Conditional lemma. Claim grade: derived.** For a based loop $\gamma$ in $X_{BA}$, the sign from lifting its frame path equals the sign of the projected core frame path:

$$
\eta_{BA}(\gamma)=\eta_B(p\circ\gamma)
$$

Plainly: applying $F_{BA}$ to $H(\gamma(t),u)$ gives a based homotopy from the accessory-bearing frame loop to $F_B(p(\gamma(t)))$. Continuous deformation cannot change the endpoint sheet of a lifted loop, so the geometrical turn class is preserved. Here $t$ and $u$ are abstract path/deformation parameters, not native time.

This is sufficient to preserve that mathematical class; it is not necessary, and it is insufficient for retention, a spin representation, or a detector law. An independently exhibited loop whose frame parity changes during an alleged admissible retraction refutes the claimed assumptions. If an accessory has a noncontractible relative angle, changes the stabilizer, participates in exchange, crosses a root boundary, or changes a medium boundary condition, the retraction may fail. Its rotation class can no longer be inferred by simply dropping the accessory coordinates. This proposal belongs to the existing accessory and ordered-frame owners.

Plainly: nearby or distant accessories do not automatically leave the core's history class untouched. A proof of harmless attachment must examine their allowed motion and relations, not just their radius.

### Response and Factorization Are Separate Questions

If an effective tensor product has independently been derived, then a core with central sign $\eta_B$ and accessory/relative/medium sector with sign $\eta_A$ has $\eta_{BA}=\eta_B\eta_A$. Integer-spin dressing preserves a half-integer sign; another half-integer factor changes it. This is a representation identity conditional on factorization, not a constituent-count rule. A native partition of identities into two sets does not create independent Hilbert spaces, independent causal histories, or separately conserved angular momentum.

Plainly: multiplication of signs is valid only after the joint response has been shown to factor. Counting moving parts cannot supply the missing product structure.

Even class-preserving attachment can change effective charge exposure, magnetic response, weak-posture selection, phase transport, and susceptibility to apparatus driving. Delayed braid–accessory and accessory–accessory contributions remain active; lower accessory energy supplies no primitive suppression factor. The [placement owner](../../mapping-equations/inferring-braid-requirements.md#accessory-placement-relative-to-the-braid) already requires full backreaction and removal/recovery tests. Spin recovery adds the requirement that the same retained attachment preserve or explicitly change the rotation representation while those response quantities are computed without separate retuning.

Plainly: keeping the same full-turn sign does not mean keeping the same measured magnetic moment or weak response. The detailed causal interaction still matters.

## Family Requirements and Controls

### Elementary Effective Targets

The table groups shared rotation requirements but lists all Standard Model families and conjugate sectors. It uses the tested three-active-neutrino description without claiming that the minimal massless-neutrino Standard Model is complete. “Necessary” means necessary to recover the stated effective sector, not sufficient to identify a native particle. The effective inputs are the PDG lepton and gauge/Higgs tables and electroweak, QCD, neutrino, and quark-model reviews identified in the [source notes](#sources-and-verification-scope). **Claim grades:** the effective-to-native requirements are inferred necessities; the native architecture entries are guessed realizations from the linked owners, whose dynamical and spin derivations remain open. The table is not a new measurement or a derivation of the effective particle assignments.

| Family and conjugates | Required effective rotation response | Additional discriminating requirement | Native candidate burden and owner |
| --- | --- | --- | --- |
| $e^-,\mu^-,\tau^-$ and $e^+,\mu^+,\tau^+$ | $j=1/2$, central sign $-1$; two spin states per massive particle sector | conjugation changes charge, not spin class; generations share gauge assignments despite different masses and lifetimes | [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md) and [Muon and Tau](../../../../content/markdown/aaa/assemblies/fermions/muon-tau.md): depleted shielding must retain an adequate frame/history response; six charge sites alone do not provide it |
| $\nu_e,\nu_\mu,\nu_\tau$ and antineutrino production/detection channels | propagation modes $\nu_1,\nu_2,\nu_3$ carry spin $1/2$; nonzero-mass modes require massive spinor treatment | flavor preparation differs from propagation basis; ultrarelativistic weak helicity selection is not absolute chirality–helicity identity; Dirac/Majorana identity unresolved | [Neutrinos](../../../../content/markdown/aaa/assemblies/fermions/neutrinos.md): near-photon geometry must overcome the product/continuity obstructions if their assumptions apply; no stable charged-fermion axial layer is assumed |
| $u,c,t$, each with three color components; $\bar u,\bar c,\bar t$ with anticolor | $j=1/2$, central sign $-1$ independent of color and generation | charge $+2e/3$ versus $-2e/3$; rotations commute with color; charged-current flavor mixing is separate | [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md) and [Color](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md): exceptional internal-axis labels must not become laboratory directions; top is tested through short-lived production/reaction records, not stable hadrons |
| $d,s,b$, each with three color components; $\bar d,\bar s,\bar b$ with anticolor | the same $j=1/2$ requirement | charge $-e/3$ versus $+e/3$; competing same-charge axial patterns must not create unobserved species by bookkeeping alone | [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md): all six flavors need a shared spin operation with distinct flavor/charge projections and branch-specific dynamics |
| Photon $\gamma$ | massless spin-one helicity sectors $h_{\mathrm{eff}}=\pm1$; $2\pi$ action $+1$ | exactly two transverse free modes; no physical longitudinal free photon; polarization comparison distinct from isolated spin sign | [Photon gates](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface): planar-pair retention, helicity transport, analyzer response and Bose behavior are separate obligations |
| Eight gluon components $g^a$, $a=1,\ldots,8$ | massless spin-one transverse polarizations in the perturbative effective description; central sign $+1$ | adjoint color octet, not eight spatial directions or eight free asymptotic particles | [Gluons](../../../../content/markdown/aaa/assemblies/bosons/gluons.md): corridor response must reproduce spin and color algebra in controlled strong-interaction observables; no stable isolated gluon assembly is required by confinement |
| $W^+$ | massive $j=1$, three spin polarizations; central sign $+1$ | charge $+e$, chiral charged-current coupling, physical longitudinal mode | [Weak corridors](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#quantum-numbers-and-channels): directional corridor geometry must produce all three polarizations and the proper current |
| $W^-$ | massive $j=1$, three spin polarizations; central sign $+1$ | charge $-e$, conjugate channel of $W^+$ with the same spin class | same owner: polarity/charge routing must change without replacing the vector representation |
| $Z$ | massive $j=1$, three spin polarizations; central sign $+1$ | neutral self-conjugate effective boson, but not a photon; distinct neutral-current chiral couplings | same owner: neutral corridor must retain its longitudinal response and electroweak normalization |
| Higgs $H$ | $j=0$, trivial spatial rotation action | Standard Model $0^+$ scalar target; tested alternatives are constrained, not every possible CP admixture excluded | [Scalar Noether sea benchmark](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#the-higgs-boson-h-scalar-noether-sea-benchmark): radial appearance must be supplemented by scalar response, parity, resonance, and shared coupling derivations |

Plainly: fermions need the same half-integer rotation rule while preserving different charges, colors, and interaction channels. Photons and gluons need transverse vector responses, massive weak bosons also need a longitudinal polarization, and the Higgs needs a scalar response. A universal “every braid is spin one-half” rule cannot meet this table.

Antiparticles have the same $j$ and central rotation sign as their corresponding particles. Photon, $Z$, and Standard Model Higgs sectors are self-conjugate; the gluon adjoint is a real representation, so there is no additional independent octet of antigluon species. Charged $W$ sectors are conjugate to one another. Neutrino and antineutrino channel names alone do not decide whether the underlying neutral fermion is Dirac or Majorana. These distinctions constrain conjugation of the complete effective representation, not merely the sign of a native polarity inventory.

Plainly: conjugation changes the appropriate charge representation while retaining the kind of spatial rotation response. “Neutral” does not by itself mean “its own antiparticle.”

### Neutrino Flavor Is Not a Fourth Spin Coordinate

Under the effective three-mode coherent approximation, the flavor state prepared with charged lepton $\alpha$ is $|\nu_\alpha\rangle=\sum_i U_{\alpha i}^*|\nu_i\rangle$, where $U$ is the PMNS matrix and $i=1,2,3$ indexes propagation mass eigenstates. With accumulated propagation phases $\varphi_i$, the comparison amplitude is

$$
\mathcal A_{\alpha\to\beta}
=\sum_{i=1}^{3}U_{\beta i}e^{-i\varphi_i}U_{\alpha i}^*
\qquad
\varphi_i\mapsto\varphi_i+\varphi_0
\quad\Longrightarrow\quad
\mathcal A_{\alpha\to\beta}\mapsto e^{-i\varphi_0}\mathcal A_{\alpha\to\beta}
$$

Plainly: production and detection mix the propagation modes in different combinations. Only phase differences affect the standard probability; adding the same phase to all modes changes no flavor transition probability. Spin and flavor must therefore remain distinct parts of the response description.

The native constraint is a common source–path–detector construction with mode overlaps, relative phase transport, and spin response, not three different braids named after the charged leptons by assumption. Standard oscillation probabilities do not distinguish Dirac from Majorana identity; an additional lepton-number-violating channel and its mechanism are needed to address that question. The PDG neutrino review, §§14.3–14.4 and 14.9.2, supplies this effective scope. This exploration derives no PMNS coefficients, neutrino masses, probability measure, or neutral branch. The [neutral-lepton owner](../../../../content/markdown/aaa/assemblies/fermions/neutrinos.md) and [EQ-16A packet](../../mapping-equations/eq-12-16a-photon-quantum-gauge-neutrino-packet.md) remain responsible.

Plainly: a spinor sign is common to the half-integer spin response, while flavor oscillation compares differences among propagation phases. One cannot substitute for the other.

### Vector and Scalar Controls Need More Than Even Sign

For a massless channel moving along $\hat{\mathbf p}_{\mathrm{eff}}$, rotations about that momentum act on a helicity state as $e^{-ih_{\mathrm{eff}}\theta}$. The photon and perturbative gluon targets use $h_{\mathrm{eff}}=\pm1$. They are not three-state massive rest-frame multiplets: rotating to a different propagation direction also moves to a different momentum sector. A Jones vector's two polarization amplitudes therefore do not make the photon a spatial spin-one-half particle. The Pauli-matrix notation sometimes used for polarization is an internal description of those two transverse amplitudes, not the physical spatial-rotation representation.

Plainly: two components are not enough to identify spin. A photon's two components rotate with integer helicity phases, and it has no rest frame in which a third free polarization appears.

A rotationally scalar effective response must be invariant under every spatial rotation. A radial candidate motion is neither necessary nor sufficient: anisotropic microscopic motion can cancel in the projected scalar channel, while a radial perturbation of an anisotropic environment can retain directional response. Parity is another test, since a pseudoscalar is invariant under proper rotations but reverses under inversion. **Claim grade: measured, external scope.** ATLAS's 2015 diboson analysis supports the $0^+$ hypothesis against its explicitly tested alternatives; its likelihood comparisons do not prove the absence of every possible nonstandard coupling. A native scalar candidate fails if its predicted angular distributions or parity-sensitive correlations contradict those independently specified channels.

Plainly: the Higgs control asks for direction-independent response with the correct mirror behavior and interactions, not merely an animation of a breathing object.

### Hadronic Composition Is a Separate Test

At effective grade, quark–antiquark spin coupling gives $1/2\otimes1/2=0\oplus1$, and three spin-one-half factors give two copies of $1/2$ plus $3/2$. Orbital and gluonic contributions, parity, color singlet structure, and identical-quark exchange must also be included. The pion/rho and nucleon/Delta comparisons test composition of recovered constituent responses; they are not additional elementary Standard Model families. The [meson](../../../../content/markdown/aaa/assemblies/mesons/mesons.md), [quark](../../../../content/markdown/aaa/assemblies/fermions/quarks.md), and [composite-spin requirement](../../mapping-equations/inferring-braid-requirements.md#composite-spin-requires-frame-and-exchange-composition) owners retain this burden.

Plainly: a pair or triplet can support several total angular classes without changing its constituent inventory. Native binding and exchange history must select the observed channel; parallel/antiparallel arrows alone do not do that.

## Requirements Not Supplied by a Rotation Sign

### Exchange Statistics Is an Independent Construction

A single-object rotation loop and a two-object exchange path belong to different configuration spaces. Even in an effective two-spinor model, both $\operatorname{Sym}^2(V_{1/2})$ and $\bigwedge^2(V_{1/2})$ are invariant under joint rotations. Choosing a permutation symmetry is not determined merely by the one-object rotation matrices. This is a counterexample to a rotation-only statistics inference, not a counterexample to the spin–statistics theorem under its full assumptions.

Plainly: rotation covariance by itself permits both symmetric and antisymmetric two-object sectors. Extra physical principles are what select the statistics of identical particles.

Pauli's 1940 argument explicitly invokes relativistic wave equations together with positivity or spacelike commutativity assumptions. Recovering those effective conditions, or providing a native theorem that yields the same exchange law, is an additional burden. Ordinary noncolliding point positions in three spatial dimensions lead to permutation exchange classes; braid-group exchange in a plane requires confinement and path restrictions to be specified. Calling constituent worldlines a braid does not determine their exchange topology or its phase representation. The [same-record spinor pullback](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#same-record-spinor-label-pullback) is read here as a joint recovery target: its proposed equality of exchange and rotation signs needs a map relating the two operations, not just a shared record identifier.

Plainly: the missing theorem must explain why the exchange path has the same sign consequence as the full-turn spin operation. It cannot obtain that result by assigning the same symbol to both.

### Probability and Stern–Gerlach Response

**Claim grade: derived, insufficiency result.** Rotational covariance permits many response functions of the invariant $\hat{\mathbf n}\cdot\hat{\mathbf m}$. It does not select the quantum law $(1+\hat{\mathbf n}\cdot\hat{\mathbf m})/2$. For example, both that law and $(1+(\hat{\mathbf n}\cdot\hat{\mathbf m})^3)/2$ are normalized two-outcome probability rules, rotationally covariant, and agree at aligned and opposite axes, but differ at intermediate angles. At $\hat{\mathbf n}\cdot\hat{\mathbf m}=1/2$ they give $3/4$ and $9/16$, respectively. This is a precise insufficient-premise counterexample; the second law is not proposed as a physical law.

Plainly: the right symmetries and the right extreme cases do not fix the measured angle dependence. The response mechanism and its measure must supply that information.

Native Stern–Gerlach recovery requires finite-time apparatus coupling, two persistent outcome basins, angular-momentum transfer, and a derived weighting of unresolved preparation and apparatus histories. A Born-rule claim additionally requires the existing [transfer-operator and basin-measure construction](../transfer-operator-basin-measure.md). Neither quantum probability nor a tiny preassigned spin arrow may be inserted to complete the derivation. The [Stern–Gerlach owner](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) already supplies the appropriate interface.

Plainly: the theory must explain both how apparatus records form and why their frequencies follow the observed rule. A minus sign does neither job.

### Magnetic Moment and the g-Factor

There is a simple mathematical counterexample to a covering-degree-only magnetic-moment argument. In an effective spin-one-half description the interaction $H_{\mathrm{int}}=-\mu_0\boldsymbol\sigma\cdot\mathbf B_{\mathrm{eff}}$ is rotationally covariant for every real coefficient $\mu_0$, including zero. All these models have the same $SU(2)$ rotation matrices and one-turn sign; they have different magnetic responses. This uses an explicitly effective magnetic field and interaction operator, not a native force law.

Plainly: changing the magnetic coefficient does not change the spinor cover. Therefore the cover cannot determine that coefficient.

**Claim grade: derived, insufficiency result.** A leading $g=2$ requires additional effective dynamics, such as the particular minimally coupled Dirac model at its stated order, or an independently derived native current-and-angular-ledger theorem that recovers the same ratio. The [EQ-27 owner](../../mapping-equations/eq-15-27-ordered-frame-loop-source-field-map.md#eq-27-direct-geometry-layer) names a covering-degree theorem target; this exploration identifies the missing coupling premises that such a theorem must supply. Exposed current, angular history, mass-response normalization, apparatus coupling, and dressing corrections must come from the same retained branch. Falsifier for any proposed cover-only sufficiency claim is the displayed arbitrary-$\mu_0$ covariant family.

Plainly: the same spinor can be magnetically weak, strong, or neutral in comparison models. A native magnetic prediction must calculate the relevant current and response, not read the value two from a two-to-one map.

## Evidence, Ownership, and Remaining Proof Burdens

The following compact ledger states the authority of the substantive additions. A mathematical counterexample can refute a claimed implication without refuting an entire candidate family. No entry is a replacement acceptance gate or a promotion into the native registry.

| Requirement or exclusion | Source and scope | Native information or operation constrained | Necessity, sufficiency, and derivation status | Independent discriminator and existing owner |
| --- | --- | --- | --- | --- |
| Continuous lift plus relational comparison | quaternion derivation; Steane §II; Rauch interferometer | ordered frame path, phase relation, apparatus protocol | lift is exact mathematics; physical spin recovery and response remain open | quaternion versus matrix calculation; one-arm/common-arm controls; ordered-frame target and QC-001/QC-002 |
| No nonzero orientation-only equivariant spinor amplitude | central-element lemma in this document | quotient and projected amplitude | exact exclusion under stated global-map assumptions; does not exclude ray or bundle descriptions | substitute $-I_2$; EQ-15 gauge-control and spin-lift owners |
| No endpoint-only lifted-path classifier | explicit constant/one-turn paths; fiber-factorization proof | retained path, identities, root branches and permitted relabelings | history sensitivity necessary for this classifier; a stored sign is insufficient | same endpoint, opposite lift; complete-record symmetry owner |
| Spin class needs dimension and generators | symmetric-tensor derivation; Woit Chapters 8–9 | full projected rotation action and angular-action normalization | central sign necessary but insufficient to distinguish $1/2$ from $3/2$ or $0$ from $1$ | second-axis rotations and Casimir value; angular-momentum bridge |
| Two-spinor product and smooth-sector obstructions | tensor and projector proofs here | core/accessory/relative/medium factorization; sector continuity | exact conditional exclusions; native premises unestablished | derive a genuinely different joint action or locate a sector change; neutrino/photon and accessory owners |
| Separate spin, chirality, helicity, weak and color operations | Weyl/Dirac comparison; PDG electroweak/QCD content | observer map, weak posture, internal labels and operation composition | necessary effective recovery; no native representation constructed | collinear observer change; commuting spin/weak and spin/color actions; quantum-number and Lorentz owners |
| Class-preserving accessory attachment | conditional retraction lemma; live accessory charts | full attachment history and frame map, not radius alone | sufficient for frame-loop parity under assumptions; insufficient for particle response | independent loop with changed parity or failed retraction; accessory adjudication |
| Exchange, probability and magnetic response remain separate | Pauli's stated assumptions; explicit probability and magnetic countermodels | two-object histories, apparatus basins/measure, exposed currents | rotation-only sufficiency excluded; native constructions open | exchange-path map, intermediate-angle response, independently normalized moment; exchange, QC-001/QC-003, and EQ-27 owners |

Plainly: each result has a specific reach. The algebra rules out particular shortcuts, while the native owners still have to construct the histories and measurements that meet the effective targets.

### The Most Useful Next Mathematical Construction

The next construction is an apparatus-relative rotation transport on one explicitly defined labeled history domain, together with its admissible quotient. It should identify a frame extraction, a lawful controlled path, a concatenation rule, and a response projection that distinguishes the constant-path control from the one-turn loop without inserting a sign label. For a retained branch, this must preserve the causal-root, identity, and angular-ledger obligations; before a retained branch exists it can only be a conditional theorem specifying those assumptions. The first decisive question is whether the controlled transport descends through the proposed quotient while retaining a nontrivial comparison, not whether a quaternion can be attached to a snapshot.

Plainly: define exactly how a real apparatus turns a complete candidate history and what information survives when harmless coordinate choices are removed. That is the shortest mathematical bridge between the solved rotation example and a possible native spin response.

Cross-owner proposals are limited to clarifying four proof dependencies: the return equivalence for accumulated histories; the polar/axial transformation type of ordered-frame vectors; the map connecting exchange to single-object rotation; and the coupling assumptions behind a leading magnetic-moment ratio. The near-photon neutrino owner additionally needs to identify where its spin sector differs from the photon sector. These are proposals captured here, not edits or new accepted tasks in those owners.

Closure goal: Derive a non-gauge, apparatus-relative spinor response from one admissible labeled assembly history, including its lawful rotation transport and an independently specified comparison.

## Sources and Verification Scope

The exposition is self-contained. The references below serve distinct claims rather than constitute a required reading list. Standard results are effective targets or comparison mathematics; none supplies a native architrino law. The work log records the dated source inspection and arithmetic/rendering checks. AI-assisted research synthesis and drafting do not themselves constitute evidence.

- Andrew M. Steane, *An introduction to spinors* (2013), [arXiv:1312.3824](https://arxiv.org/abs/1312.3824), especially the explicit rotations in Eqs. (2), (6), §II and the later Weyl/Dirac treatment. Used for the independent matrix formulation and effective spinor conventions; the active sign convention is fixed explicitly in this document.
- Peter Woit, *Quantum Theory, Groups and Representations: An Introduction* (2017; author PDF copyright 2021), [author-hosted text](https://www.math.columbia.edu/~woit/QMbook/qmbook.pdf), Chapter 6 on quaternion rotation covers and Chapters 8–9 on spin representations and tensor products. Used to check the distinct quaternion formulation and representation construction, not as evidence of native realization.
- H. Rauch, A. Zeilinger, G. Badurek, A. Wilfing, W. Bauspiess, and U. Bonse, *Verification of coherent spinor rotation of fermions*, Physics Letters A **54**, 425–427 (1975), [DOI:10.1016/0375-9601(75)90798-7](https://doi.org/10.1016/0375-9601(75)90798-7), [institution-hosted original](https://www.oeaw.ac.at/fileadmin/Institute/IQOQI-Vienna/PDF/publications-zeilinger/1975_Verification_of_Coherent_Spinor_Rotation_of_Fermions.pdf). Used for a measured relative spin-rotation comparison, not microscopic constituent rotation.
- W. Pauli, *The Connection Between Spin and Statistics*, Physical Review **58**, 716–722 (1940), [DOI:10.1103/PhysRev.58.716](https://journals.aps.org/pr/abstract/10.1103/PhysRev.58.716). The inspected publisher abstract explicitly states the relativistic, positive-energy and spacelike-commutativity premises relevant to the limited use here; this is not a claim to have re-proved the full theorem.
- Particle Data Group, *Review of Particle Physics*, S. Navas et al., Physical Review D **110**, 030001 (2024), 2025 update: [lepton summary](https://pdg.lbl.gov/2025/tables/rpp2025-sum-leptons.pdf) and [gauge/Higgs summary](https://pdg.lbl.gov/2025/tables/rpp2025-sum-gauge-higgs-bosons.pdf). These versioned tables support the family spin/charge targets; no numerical precision fit is attempted here.
- PDG, [*Electroweak Model and Constraints on New Physics*, §10.1](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf), and [*Quantum Chromodynamics*, §9.1](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-qcd.pdf), 2025 update. Used for separate chiral weak multiplets, color representations, and the distinction between internal gauge labels and spatial spin.
- M. C. Gonzalez-Garcia and R. Wendell, PDG [*Neutrino Masses, Mixing, and Oscillations*](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), 2025 update, §§14.3–14.4 and 14.9.2. Used for flavor/propagation separation and the limits of oscillations for deciding Dirac versus Majorana identity; no latest-fit parameters are imported.
- PDG, [*Quark Model*](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-model.pdf), 2025 update, introductory quantum-number table and meson/baryon classification. Used for six-flavor coverage and the distinction between elementary targets and hadronic composition tests.
- ATLAS Collaboration, *Study of the spin and parity of the Higgs boson in diboson decays with the ATLAS detector*, European Physical Journal C **75**, 476 (2015), [arXiv:1506.05669](https://arxiv.org/abs/1506.05669). Used for the measured scalar control and its explicitly limited alternative-model tests, not a universal proof of every Higgs coupling or CP property.

Plainly: the outside sources establish what the successful effective descriptions and particular experiments say. The original lemmas above are supported by their displayed assumptions and proofs. Neither source authority nor polished exposition fills the missing native construction.
