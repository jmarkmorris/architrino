# Equations, Histories and Effective Physics

## 1. What an equation mapping must explain

### 1.1. From physical records to observer equations

An equation can describe observations accurately while leaving the underlying mechanism unresolved. The equation-mapping problem asks how a specified physical construction produces the variables, coefficients and relations that an observer measures. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the proposed construction begins with architrinos: elementary objects carrying one of two polarities, moving through a fixed three-dimensional Euclidean void in a universal absolute time. Each object's past motion contributes causal wakes, meaning outward-propagating disturbances that can reach another object after a finite delay. An assembly is an organized collection of these objects and their interacting histories. The Noether sea is the proposed ambient population of neutral assemblies, interacting through their causal histories; it is distinct from the spatial container.

These commitments specify a proposed substrate beneath the familiar descriptions of relativity, quantum theory and cosmology. They do not establish that the proposal reproduces those descriptions. Special relativity constrains how physical clocks, rulers and energy measurements relate when observers move relative to one another. Quantum theory constrains interference, measurement statistics and reaction outcomes. Cosmological equations connect inferred matter distributions, radiation and large-scale evolution. Their successful equations therefore enter the analysis as effective recovery targets or observational constraints. They supply no primitive architrino mass, magnetic interaction, quantum probability law or expanding spatial container.

A useful mathematical description separates a physical history from its readout. Let $\mathcal H$ denote a declared collection of constituent paths, active causal roots, surrounding sea state, boundaries and events. Let $\Pi_\alpha$ be a specified rule for extracting observable $\alpha$ from that history. The recovery comparison has the form

$$
O_\alpha^{\mathrm{pred}}=\Pi_\alpha(\mathcal H),
\qquad
\mathcal R_\alpha
=d_\alpha\!\left(O_\alpha^{\mathrm{pred}},O_\alpha^{\mathrm{ref}}\right)
$$

Here $O_\alpha^{\mathrm{ref}}$ is a measured or independently solved reference, $d_\alpha$ measures the discrepancy in a declared norm and normalization, and $\mathcal R_\alpha$ is the residual. This is a framework for stating a comparison. The physical content lies in constructing $\mathcal H$, deriving the readout and justifying the reference and error bound. A small residual produced by assigning the desired observable to an input does not explain that observable.

### 1.2. One construction across several observations

Related observables constrain the same underlying construction. A clock period, a geometric envelope and a momentum response cannot be explained jointly by fitting three unrelated histories. The paths, sea state, branch identity, observation window and calibration conventions must remain shared wherever the proposed mechanism says they are shared. A change in an apparatus setting is legitimate when the physical setting is declared; an unrecorded change in a constitutive coefficient to repair each comparison separately is a new assumption.

The reverse direction of mapping starts with these restrictions. Given a collection of observer constraints, it identifies the set of histories whose declared projections could satisfy them. The forward direction constructs histories from the substrate law and then evaluates their projections. Their intersection may be empty, may contain several distinct families, or may narrow to a branch within a restricted model. Agreement with finitely many observations generally does not identify a unique underlying geometry. Exact equality of detector outputs can define an equivalence relation; overlap within tolerances generally cannot, because overlap need not be transitive.

The elementary distinction between a necessary and a sufficient condition governs the entire account. A closed visible curve may be necessary for a proposed recurring assembly, yet fail to repeat its delayed history. A complete repeated history may exist without being stable. A stable assembly may still have the wrong exposed charge or spectrum. An internally consistent observer equation may fail its empirical comparison. Each implication requires its own argument.

### 1.3. Mathematical and evidential levels

The strongest claims in this treatment are conditional mathematical statements whose assumptions and reasoning are explicit. Candidate geometries and constitutive interpretations remain hypotheses. Historical computational results are attributed to the source records that report them; their reproduction, calibration and independent correctness are separate questions. A record with every expected field populated can establish structural completeness while leaving the physical construction absent.

Coordinates retain their physical level. Absolute time is $T$, constituent position is $\mathbf X$, and primitive wake speed is $c_f$. Observer coordinates are $t_{\mathrm{eff}}$ and $\mathbf x_{\mathrm{eff}}$, introduced only after a readout map is declared. A clock's accumulated time $\tau$ is a derived physical readout. A cycle duration is denoted by $P$, with the returning object specified: position, shape, current or complete history. Symbolic derivations retain $c_f$ where useful; numerical examples use normalized wake-speed units, $c_f=1$.

## 2. Causal roots and finite histories

### 2.1. Which past emissions contribute

For an emission to influence a receiver, its wake must arrive at the receiver's present position. Let transmitter $t$ occupy $\mathbf X_t(T_t)$ at emission time $T_t$, and let receiver $r$ occupy $\mathbf X_r(T_r)$ at reception time $T_r$. A causal root is a past emission time satisfying

$$
\left\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\right\|
=c_f(T_r-T_t),
\qquad T_t<T_r
$$

The distance equals the distance that the wake can travel during the elapsed absolute time. One receiver event can have several such roots for the same transmitter. Every active root contributes; selecting a convenient root changes the dynamical problem. Roots corresponding to the same constituent at different times also require an explicit self-interaction convention.

Write $r=\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|$ and let $\hat{\mathbf r}_t$ be the unit vector from the transmitter's emission position to the receiver. If $q_t$ and $q_r$ are the signed polarities and $\kappa>0$ is the coupling, the stated primitive contribution is

$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=\kappa\,\operatorname{sign}(q_tq_r)
\frac{|q_tq_r|}{r^2}
\frac{c_f}{|D_t|}
\hat{\mathbf r}_t
$$

This is an acceleration contribution along the line connecting the two events. The transmitter factor and receiver factor are

$$
D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t,
\qquad
D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}_t
$$

The velocities $\mathbf V_t$ and $\mathbf V_r$ are derivatives of constituent positions with respect to absolute time. The total acceleration sums the displayed contribution over all transmitters and all retained active roots. It contains no primitive magnetic cross product or conversion through an architrino mass.

### 2.2. Acceleration weight and root playback

The factor $c_f/|D_t|$ measures how transmitter motion compresses or dilates the arriving sequence of wake surfaces. Receiver motion enters a different quantity: the signed rate at which emission time changes as reception time advances along a smooth root branch. Differentiating the causal condition gives

$$
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}
$$

This signed playback derivative can reverse sign. The acceleration weight is nonnegative and depends only on the transmitter factor at the hit. Replacing the weight by the magnitude of playback would insert a receiver factor absent from the stated primitive law.

The formulas require a regular root with $D_t\ne0$ and nonzero separation. A simple-root chart preserves root number and supplies a positive lower bound on $|D_t|$. An ordinary fold, where two roots join, needs its own local analysis. Excluding coincident-time self-interaction does not supply a rule for continuation through a coincident same-transmitter root birth. Neither a regular-domain formula nor the successful treatment of an ordinary fold settles that singular event.

### 2.3. What finite memory retains

A finite-history calculation declares a reception window, a memory duration, the active and inactive roots, a regularization convention, collision or core exclusions, the history supplied at the boundary and the surrounding sea record. These choices determine the acceleration being calculated. Two consumers that use different memory cutoffs or root selections are not evaluating the same history merely because their present positions agree.

Inactive-root gaps matter as well as active roots. A root that enters through a history boundary, disappears under translation or approaches a singular Jacobian can invalidate a smooth continuation argument. A finite root ledger must therefore record why omitted roots are outside the declared domain, and how truncation error is bounded. Positive geometric separation, root transversality and section-crossing margins are independent restrictions.

The retained root law is the primitive starting point of the mapping program on its specified domain. The derivation of conserved assembly accounts, a globally persistent orbit or a constitutive sea response remains additional work. Exact evaluation of a chosen finite history cannot establish that the chosen history is itself generated by the same law.

## 3. From a recurring point to a persistent assembly

### 3.1. A return map and its limited conclusion

A recurring configuration can be sought by following a candidate state to a transverse section: a set crossed by the motion that removes the arbitrary choice of phase along an orbit. Let $P_{N,u}$ be the finite-history return map at group speed $u$, with $N$ identifying the declared finite representation. Let $g$ be an allowed symmetry, such as an explicitly declared translation, rotation or strand permutation. A relative-periodic point satisfies

$$
F_{N,u}(x)=P_{N,u}(x)-g\cdot x=0
$$

The state $x$ includes the data required by that finite representation. A relative-periodic point returns to a symmetry-related copy of itself. Removing each neutral symmetry with one independent condition makes the residual square: the number of unknown coordinates and scalar equations agrees. Interval Newton or Krawczyk inclusion can then enclose a zero under the relevant mathematical hypotheses.

The width of the enclosing box bounds uncertainty in the point. It does not prove that every state in the box remains there under evolution. An invariant region requires a separate return or trapping argument; an attracting orbit requires stability information; a basin requires a statement about a set of initial histories. The source material contains both the point-enclosure formulation and stronger invariant-cell wording. The point theorem supplies the defensible conclusion, while the stronger formulations remain unresolved obligations rather than consequences of box width.

### 3.2. Complete history, continuation and stability

A finite representation must next be connected to the delayed-history problem. That connection needs a declared topology for histories, a reconstruction map, consistency under refinement, control of the omitted tail and uniform margins against root, collision and section singularities. A sequence of finite approximations does not establish a full-history solution without a limit argument that preserves the equation.

Strand identity also extends through history. Raw labels require a labeled cover, meaning compatible descriptions that preserve which constituent is which, together with a root itinerary and predeclared allowed permutations on overlapping descriptions. Reusing a label string does not prove this compatibility. A physical branch must carry these identities through its events and overlaps.

Only after existence and the full-history connection are established can continuation across a connected interval of group speeds support a transport comparison. Stability comes after those existence statements and must use the actual occupied solution. A spectrum computed about a prescribed curve that is not an equilibrium or recurring solution has no stability interpretation for that curve.

### 3.3. Translating geometry and local solvability

A translating binary supplies a compact candidate geometry. Its two constituent paths can be written schematically as

$$
\mathbf X_\sigma(T)
=uT\,\hat{\mathbf e}
+\sigma\,\boldsymbol\rho(\theta(T)),
\qquad \sigma\in\{-1,+1\}
$$

Here $\hat{\mathbf e}$ is the translation direction, $u$ is the group speed, and $\boldsymbol\rho$ describes the relative orbit with phase $\theta$. This is an ansatz, a proposed form of the motion. Substitution into the causal-root law must determine whether it is a solution. Forward-root starvation, where a required class of wake returns disappears, invalidates the proposed branch even if an observer comparison remains numerically small.

Near a circular planar control, write the branch equation as $\mathcal F(\boldsymbol\rho,\Omega,\beta_f)=0$, where $\Omega$ is phase frequency and $\beta_f=u/c_f$. The complete linearization $L$ includes the variation of every retained causal root. With first- and second-order shape corrections $\boldsymbol\rho_1,\boldsymbol\rho_2$, the source's ordered solvability equations are

$$
L\boldsymbol\rho_1+\mathcal F_{\beta_f}=0
$$

$$
L\boldsymbol\rho_2-a_2\Omega_0\mathcal F_\Omega
=-\frac12\mathcal F_{\beta_f\beta_f}
-\mathcal F_{\rho\beta_f}\boldsymbol\rho_1
-\frac12\mathcal F_{\rho\rho}
[\boldsymbol\rho_1,\boldsymbol\rho_1]
$$

The coefficient $a_2$ describes the second-order period response in the declared expansion. Symmetry can remove an odd period coefficient without removing the first-order shape correction. The mixed term and quadratic shape term therefore remain essential. Projecting the second equation onto each adjoint null mode, a vector annihilating the image of $L$, imposes compatibility conditions. A coefficient quotient is valid only with a nonzero denominator and consistency across all such modes.

This local reduction assumes finitely many simple roots, fixed root count, a positive transmitter-Jacobian floor and positive collision separation. Independent incompatible compatibility conditions can obstruct a local solution. Counting apparent equations alone does not prove incompatibility; independence and the available free constants must be established. Extending a computation cannot repair a demonstrated local obstruction, while an unsuccessful search is not itself a nonexistence theorem.

## 4. Clocks, shape and conserved accounts

### 4.1. A conditional return-time comparison

The familiar Lorentz factor describes the relation between moving and reference clock or ruler readouts in special relativity. For a declared signal channel with speed $c_\star$ and group speed $v<c_\star$, define

$$
\beta_\star=\frac{v}{c_\star},
\qquad
\gamma_\star=(1-\beta_\star^2)^{-1/2}
$$

The channel speed may be the primitive wake speed or a derived dressed signal speed, depending on the comparison. Those roles are not interchangeable. In a simple effective return construction, longitudinal outward and inward legs traverse a distance parameter $R_\parallel$ with relative speeds $c_{\mathrm{eff}}-v$ and $c_{\mathrm{eff}}+v$. A transverse leg has available transverse speed $\sqrt{c_{\mathrm{eff}}^2-v^2}$. The return durations are therefore

$$
P_\parallel
=\frac{R_\parallel}{c_{\mathrm{eff}}-v}
+\frac{R_\parallel}{c_{\mathrm{eff}}+v}
=\frac{2R_\parallel}{c_{\mathrm{eff}}}\gamma_{\mathrm{eff}}^2
$$

$$
P_\perp
=\frac{2R_\perp}{\sqrt{c_{\mathrm{eff}}^2-v^2}}
=\frac{2R_\perp}{c_{\mathrm{eff}}}\gamma_{\mathrm{eff}}
$$

Equal return durations imply $R_\parallel/R_\perp=\gamma_{\mathrm{eff}}^{-1}$. This is a conditional geometric result: the assumed paths and signal law give the ratio. It does not derive a self-maintaining binary, a universal signal channel or the complete clock law. The observer targets $d\tau/dt_{\mathrm{eff}}=\gamma_\star^{-1}$ and $L_\parallel/L_0=\gamma_\star^{-1}$ require independent clock and ruler projections of one retained branch.

### 4.2. Shape contains more information than an axis ratio

A longitudinal-to-transverse ratio cannot detect every deformation. It misses transverse splitting and shear away from the chosen axes. A stronger comparison uses the complete directional support and the centered second moment of a declared geometric measure.

For a centered assembly envelope $K$, its support function is $h_K(\mathbf n)=\sup_{\mathbf x\in K}\mathbf n\cdot\mathbf x$. It records the furthest extent in each direction $\mathbf n$. For a centered measure $\mu$, the second-moment tensor is $M=\int\mathbf x\mathbf x^{\mathsf T}\,d\mu(\mathbf x)$. Under a declared affine deformation $A$ and pushforward of that same measure, the targets are

$$
h_{AK}(\mathbf n)=h_K(A^{\mathsf T}\mathbf n),
\qquad
M'=AMA^{\mathsf T}
$$

The superscript $\mathsf T$ denotes matrix transpose. These relations are geometric identities under their stated map, not evidence that the assembly undergoes that map dynamically. A longitudinal length contraction produces a squared factor in the corresponding aligned moment. A general triaxial tensor can rotate its principal axes. Support fixes the convex hull, so it cannot recover holes or other internal nonconvex structure. An ellipsoid fitted to the envelope is a further approximation with its own error.

### 4.3. Clock and ruler calibration without inserting the answer

A coframe is a collection of linear measuring rules assigning time and spatial components to displacements. A candidate moving coframe must be constructed from wake returns, root histories and fixed calibration conventions before its components are compared with the Lorentz factor. Inserting $\gamma_\star$ into its definition would make the comparison circular.

The calibration fixes the return event, equal-time rules, center, axes and reference measurement. Independent changes to the time, longitudinal and transverse legs can alter a reciprocity product while preserving selected scalar agreements. A negative control that deliberately rescales a leg therefore tests a different failure from simply inserting the target Lorentz factor.

Shared support is necessary but does not prohibit every hidden adjustment. The stronger comparison transports a source-frozen construction to held-out points and tests independently defined endpoint projections. A one-dimensional out-and-back speed path does not provide a nontrivial curvature measurement. Connection, torsion and phase-holonomy language requires the corresponding geometric structure; a zero diagnostic bearing one of those names does not supply it.

The local period and envelope targets have respective even-power coefficients $(1/2,3/8)$ and $(-1/2,-1/8)$ through fourth order in $\beta_\star$. A separate restricted branch parametrization in the sources uses $(-1/3,-4/3,-1/9,2/9)$. These are different coefficient bases. Their relationship requires the declared fixed-action projection and an actual same-branch extraction; a missing projection cannot be assigned a zero residual.

### 4.4. Conserved quantities require complete accounting

Energy, momentum and angular momentum are assembly-level accounts to be derived from the delayed dynamics. Their standard conservation laws do not automatically follow from summing receiver-local acceleration contributions. A proposed action principle must reproduce the stated acceleration law under a declared regularization and supply the associated symmetry charges. The source account explicitly leaves that construction unresolved.

A finite event joins incoming and outgoing assemblies with wake, medium, boundary and remnant changes. For any proposed conserved quantity $Q$, the balance has the schematic form

$$
Q_{\mathrm{out}}-Q_{\mathrm{in}}
+\Delta Q_{\mathrm{wake}}
+\Delta Q_{\mathrm{sea}}
+\Delta Q_{\mathrm{remnant}}
+Q_{\mathrm{boundary}}=0
$$

Each term uses a common event and a declared sign convention. The quantity retained as sea content must not also be counted as exchange through the boundary. The complete event record additionally preserves polarity, constituent inventory and path updates. Combining quantities with different units in a numerical norm requires stated scales or weights.

Moving boundaries need a relative-current convention. If $q_Q$ is a density, $\mathbf J_Q$ its laboratory current and $\mathbf v_{\partial\Omega}$ the boundary velocity, the transport flux is $(\mathbf J_Q-q_Q\mathbf v_{\partial\Omega})\cdot\mathbf n$, where $\mathbf n$ is the outward normal. A printed flux using only $\mathbf J_Q\cdot\mathbf n$ is consistent only if its current already includes the relative-boundary correction or the boundary is stationary. This is an operational definition that must be fixed before interpreting a residual.

### 4.5. Exposed energy and effective mass

An assembly's effective mass is proposed to describe how its retained internal history is exposed through the surrounding sea. Let $E_{\mathrm{internal}}$ be a derived internal-energy account and $\zeta$ an exposure factor. The quantity $\zeta E_{\mathrm{internal}}$ has energy units when $\zeta$ is dimensionless, even if a source labels it as a rest source with an $M$ symbol. In a homogeneous isotropic effective limit, the candidate mass relation is

$$
M_0\approx
\alpha_m\frac{\zeta E_{\mathrm{internal}}}{c_{\mathrm{eff}}^2}
$$

The coefficient $\alpha_m$ represents the declared medium-response normalization. This candidate formula introduces no primitive mass for an architrino. An anisotropic medium first requires a tensor response relating exposed energy and center motion to momentum; a scalar mass limit is an additional specialization.

The effective mass-shell comparison is $E^2-c_\star^2\|\mathbf p\|^2=M_0^2c_\star^4$, with energy $E$, momentum $\mathbf p$ and rest mass $M_0$ read from the same assembly and channel. Its scalar agreement is necessary when the stronger accounts have been established, but it cannot replace them. In particular, fitting a velocity-dependent rest mass or a new sea coefficient at each speed defeats the shared construction. Clock, shape, signal, energy, exposure and momentum must meet on one dynamically retained history.

## 5. Photon transport and effective electromagnetic fields

### 5.1. A localized carrier and a distributed wake

The photon proposal distinguishes an organized moving assembly from the causal wakes associated with its constituents. A coaxial, oppositely rotating planar pair with conjugate polarities is a candidate morphology. Its axis, separation, internal phase and motion would have to produce the effective photon readouts. The proposed morphology is not a retained solution merely because a diagram or prescribed path displays it.

Photon energy $E_\gamma$, frequency $\nu$, momentum $\mathbf p_\gamma$ and propagation wavelength $\lambda_\gamma$ must refer to the same source-to-receiver record. The effective comparisons include $E_\gamma=h\nu$, $\|\mathbf p_\gamma\|=h/\lambda_\gamma$ and $E_\gamma=c_\gamma\|\mathbf p_\gamma\|$, where $h$ is the action unit and $c_\gamma$ the declared photon-channel speed. Recovering these relations also requires the source's depletion and the receiver's capture or scattering accounts. The propagation wavelength is not automatically the pair radius, constituent separation or spatial extent of a packet.

Constituent velocity separates kinematically into packet translation and internal motion. When the internal component is perpendicular to the translation, the squared constituent speed is the sum of their squared magnitudes. Consequently, a null packet readout, meaning an effective energy-momentum relation with zero rest mass, does not imply that each constituent moves at the packet's speed. This kinematic observation establishes neither a universal constituent speed ceiling nor a dynamically stable photon.

### 5.2. Transverse modes, polarization and propagation

Polarization describes the orientation or handedness of the photon's transverse response relative to its propagation axis. The recovery target contains exactly two transverse modes, a helicity readout describing handedness along that axis, an analyzer response and a bound on longitudinal leakage. For a linearly polarized comparison, Malus's relation gives a transmitted intensity proportional to the squared cosine of the angle between the incoming polarization and analyzer axis. That relation must be extracted from a shared packet and analyzer interaction; assigning the cosine to the detector model is a comparison construction.

Transport must also preserve the declared dispersion relation and exclude an unobserved rest branch. A source-free frequency decrease is incomplete unless the path account records where the corresponding energy and momentum go. Conversely, absorption followed by re-emission can create a new packet with a new event identity; it cannot be silently treated as uninterrupted transport of an unchanged photon.

Fermat's stationary optical path is a useful effective target: neighboring admissible paths have stationary travel-time or optical-phase functional under the appropriate medium assumptions. It compares alternatives mathematically and does not assert that one photon physically traverses every path. Interface refraction also requires material response and recoil. A stationary spatial path integral does not by itself establish the variational rule for an arbitrarily time-dependent medium.

### 5.3. From event records to a field equation

An electromagnetic potential is an effective description that organizes electric and magnetic readouts and their propagation. In a declared gauge, the source uses the comparison $\Box_{\mathrm{eff}}A_{\mathrm{eff},\mu}=J_{\mathrm{eff},\mu}$. The wave operator $\Box_{\mathrm{eff}}$ belongs to an observer chart, $A_{\mathrm{eff},\mu}$ is a potential readout and $J_{\mathrm{eff},\mu}$ is the effective charge-current source. The normalization, metric, channel speed and gauge convention are part of that comparison.

The proposed maps are

$$
A_{\mathrm{eff},\mu}
=\mathcal A_\mu[
\mathcal L_{\mathrm{wake}},
\mathcal L_\gamma,\Theta_{\mathrm{sea}}],
\qquad
J_{\mathrm{eff},\mu}
=\mathcal J_\mu[
\mathcal L_{\mathrm{charge}},
\mathcal L_{\mathrm{event}}]
$$

Here each $\mathcal L$ denotes the named wake, photon, exposed-charge or event record, and $\Theta_{\mathrm{sea}}$ is the common surrounding sea state. The functions $\mathcal A_\mu$ and $\mathcal J_\mu$ are construction targets. They must derive their outputs from these records rather than introduce independent substrate fields.

The wave-equation residual is only one comparison. Effective charge continuity, energy transport through a control surface, momentum and angular-momentum exchange, stress and gauge invariance must use the same control volume and event. Gauge invariance means that a change of descriptive chart leaves the physical history and observables unchanged. It cannot hide a changed source, sea state or branch.

Solved wave equations provide several distinct inverse constraints. A causal Green function constrains which source events can contribute. Plane-wave and short-wavelength solutions constrain phase propagation and dispersion. Cavity modes constrain boundary response and mode counting. Scattering solutions constrain phase shifts and flux accounting. These constraints concern the required effective map; none establishes that a potential or wavefunction is a primitive object.

### 5.4. A complete photon-target event

A photon-target event joins the incoming and outgoing photon, its transverse-mode handoff, a retained target branch, recoil, angular-momentum change, sea state and conserved event accounts. An explicit zero medium or remnant contribution is a physical assertion within the declared regime, not an omitted term. If any of these projections belongs to a different event, numerical agreement of the individual formulas cannot close the joint comparison.

The sources' normalized Compton example uses effective comparison inputs and demonstrates recoil algebra within its chosen assumptions. It does not supply the underlying photon or target histories. Even a retained energy-momentum photon event would leave effective current continuity, stress transport, gauge invariance and interaction vertices as additional electromagnetic obligations. An atomic spectral carrier and a radiation-producing mechanism likewise remain distinct from the shared photon support they consume.

## 6. The action unit and recurring motion

### 6.1. Four readouts of one action

The action unit connects quantities with different physical meanings. In standard quantum comparisons, frequency determines photon energy, wavevector determines momentum, an orbit integral counts action and angular momentum is related to a winding label. Recovering the same constant in these relations requires more than identifying a periodic motion.

The candidate action construction uses one retained recurring branch and independently defined readouts

$$
h_E=\frac{E_\gamma}{\nu},
\qquad
h_p=\frac{2\pi\|\mathbf p\|}{\|\mathbf k\|},
\qquad
h_\Phi=\oint p\,dq,
\qquad
h_J=\frac{2\pi J}{n}
$$

The wavevector $\mathbf k$ measures phase change per distance in radians, $q$ and $p$ are a derived orbit coordinate and its action-conjugate momentum, $J$ is an angular-momentum readout and $n$ is the declared winding number. The notation $p$ here does not introduce primitive constituent momentum or mass. Its physical definition must come from the retained reduction.

The equality of these four quantities is conditional on a consistent cycle convention. The standard comparison $\oint p\,dq=nh$ refers to a complete winding-$n$ orbit. It does not equal $h$ for arbitrary $n$ without division by $n$ or a primitive-cycle definition. The source places an unnormalized orbit integral beside the common-unit equality, so that convention remains unresolved. An explanation cannot silently impose $n=1$ to repair it.

### 6.2. Why a selected frequency is insufficient

A scalar delayed oscillator illustrates a failure mode. A nearly rigid frequency can coexist with continuously varying amplitude and therefore with varying orbit area. The source toy, translated from its time symbol to an absolute-time comparison coordinate, is

$$
\ddot x(T)
=-\omega^2x(T)+g\,x(T-\Delta)
-\gamma\dot x(T)+\mu x(T)(1-x(T)^2)
$$

This is a mathematical comparison model, with dimensionless amplitude $x$, fixed delay $\Delta$, frequency parameter $\omega$, delayed coupling $g$, damping parameter $\gamma$ and nonlinear coefficient $\mu$ in compatible units. It is not a derivation of damping or inertia for an architrino.

Zero is an equilibrium of the printed toy. Its linear perturbation gives the characteristic equation

$$
\lambda^2+\gamma\lambda+\omega^2-\mu
-g e^{-\lambda\Delta}=0
$$

The term $-\mu$ follows from the linear part of $\mu x(1-x^2)$. The source's separately printed characteristic omits it. An absorbed-frequency definition or a different model could reconcile the expressions, but such a definition must be supplied before the characteristic supports a bifurcation claim. This algebraic inconsistency is retained as a limitation of the scaffold.

A Hopf bifurcation is the birth of a small periodic orbit as a pair of characteristic roots crosses the imaginary axis. The proposed use requires a simple transverse crossing, control of all other roots and a nonzero first Lyapunov coefficient, which determines the leading nonlinear bifurcation behavior. Those conditions do not quantize the orbit area. A continuously varying small orbit is a useful negative control against equating periodicity with a universal action unit.

### 6.3. Locking, stability and local constancy

The stronger candidate is a locked three-binary branch: three paired motions whose relative recurrence remains synchronized over a parameter region. The proposed integer winding plateau is a region in which the winding label remains fixed while parameters vary. The action readouts must coincide throughout that plateau and separate in the predicted way when locking fails at its boundary. Constancy must survive a change of section, refinement and retained-mode representation.

The monodromy operator is the linearized evolution over one period. For a stable autonomous orbit, its phase-shift direction gives a unit multiplier while transverse multipliers lie inside the unit circle with a declared gap. A transverse Poincare map removes that phase direction. These are different operators; a requirement for exactly one unit multiplier must say which is being used. Additional neutral directions, vanishing nonlinear coefficients or small-divisor resonances can invalidate the proposed readout.

The action unit is also required to be locally constant across the relevant patch of sea states. Photon speed and material response can vary through their own constitutive maps, but fitting a new action value to each spectral, thermal or coupling observation would abandon the shared explanation. The orbit integral, off-shell variational action and stored-wake throughput are distinct constructions whose relationship remains to be derived.

## 7. Finite measures, records and reactions

### 7.1. Statistical readouts of deterministic histories

Deterministic microscopic motion can still require statistical prediction when preparation leaves unresolved histories. A finite measure assigns weights to those histories over a declared window. It is not an additional probability substance. Let $\mu$ be that preparation measure, $\Phi_T$ the deterministic history evolution and $\pi_{\mathrm{rec}}$ a map to the recorded outcome. The record measure is the pushforward

$$
\mu_{\mathrm{rec},T}
=(\pi_{\mathrm{rec}}\circ\Phi_T)_*\mu
$$

A pushforward assigns to a set of recorded outcomes the weight of initial histories that produce them. A density exists only after a reference volume measure and sufficient regularity have been specified. A current additionally needs the corresponding evolved velocity and vector-measure convention. Writing density and current symbols does not establish those mathematical properties.

The Born-current target joins three claims: the projected density agrees with the reference probability density, the projected current agrees with its reference, and both satisfy the appropriate continuity relation. A small numerical continuity defect alone establishes neither of the other two. The same preparation measure, flow, position projection and detector conventions must produce all three readouts.

### 7.2. Refinement and outcome boundaries

Finite windows and finite spatial resolution can hide distinctions between histories. Refinement asks whether those distinctions become controlled as the window or resolution changes. Restricting a record to a smaller domain and then projecting it should agree, within a controlled defect, with projecting and then restricting. A family of such compatible local records is the mathematical content behind the source's sheaf and gluing language. Naming that structure does not prove compatibility.

An outcome boundary is a set of histories separating different recorded classes. If the measure of every shrinking neighborhood of that boundary tends to zero, arbitrarily fine classification need not leave a finite ambiguous weight. The proposed condition is

$$
\mu\!\left(N_\epsilon(\partial\mathcal B)\right)\longrightarrow0
\quad\text{as}\quad\epsilon\longrightarrow0
$$

Here $\partial\mathcal B$ is the boundary of the outcome partition and $N_\epsilon$ its $\epsilon$-neighborhood in a declared history metric. A finite decreasing list of samples does not prove this limit. Positive boundary measure permits unresolved classification to affect reported weights and must remain visible.

### 7.3. Cross sections and form factors

A cross section measures how much of a prepared incoming flux enters a specified reaction class under a stated normalization. A candidate deterministic expression has the structure

$$
\sigma_{a\to b}
=\frac{1}{\Phi_{\mathrm{in}}P_{\mathrm{obs}}}
\int_{\Gamma_a}
\mathbf1_b(\Phi_{P_{\mathrm{obs}}}(x))
K_{\mathrm{det}}(x)\,d\mu_a(x)
+\mathcal R_\sigma
$$

The prepared ensemble is $\Gamma_a$, its measure is $\mu_a$, $\Phi_{\mathrm{in}}$ is incoming flux, $P_{\mathrm{obs}}$ is the observation duration and $\mathbf1_b$ selects the final class. The detector response is $K_{\mathrm{det}}$ and $\mathcal R_\sigma$ is the declared approximation error. Units depend on the flux and measure normalization. Elastic, inelastic and lost events must remain distinct classes.

A form factor describes how an extended exposed distribution changes a scattering readout as momentum transfer varies. Its comparison Fourier transform consumes an exposure measure, not a freely fitted spatial profile. If a quotient removes descriptive redundancy, it must preserve that measure. Rotation covariance compares a rotated preparation and correspondingly rotated readout, while elastic-regime purity separately bounds leakage into inelastic events. A few covariant samples cannot establish global covariance, and a successful form-factor fit does not establish the regime.

### 7.4. First exit, branching and resonance width

A metastable branch persists for a time and can leave through several reaction corridors. Define its first-exit time as the earliest time the evolved history leaves the declared branch region. Exit corridors are measurable parts of the resulting boundary image. Their weights must add before detector processing; defining a corridor retrospectively by a detector's favored line shape changes the underlying question.

Intrinsic escape rates, branching fractions, central energy, line shape and lifetime must be projections of the same branch and first-exit measure. If $\gamma_k$ is an escape rate in inverse-time units, the total rate is $\sum_k\gamma_k$ and the comparison energy width is $\Gamma_E=\hbar\sum_k\gamma_k$ when the declared exponential-lifetime regime applies. Then $\tau_{\mathrm{life}}=\hbar/\Gamma_E$. An energy width and an inverse-time rate cannot both be denoted by an undifferentiated $\Gamma$ without this conversion.

A finite-window exit fraction divided by the window duration is not generally the constant hazard governing a lifetime. For the comparison exponential law with hazard $k>0$, that quotient is $(1-e^{-kP_{\mathrm{obs}}})/P_{\mathrm{obs}}$, whereas the hazard is $k$. The measure's normalization, inclusion of exits before the window ends and treatment of non-exiters must therefore be declared. A small-window limit, stationary-flux interpretation or another justified convention is needed before identifying a finite-window quotient with the inverse lifetime.

Thresholds, interference and detector broadening can modify a simple resonance line shape. They require explicit treatment rather than independent fitting of width and branching weights. The source's charged-pion and elastic-scattering records test successive record and source conditions, but do not construct the missing underlying finite-history measure. Structural row acceptance remains separate from retention of the complete statistical carrier.

## 8. Ordered frames, weak exposure and neutrino phase

### 8.1. Rotation of a frame and spinor comparison

An ordered frame records distinguishable directions attached to an assembly. A loop of such frames can return to its visible orientation while retaining information about how it rotated. The rotation group $SO(3)$ is the set of proper three-dimensional rotations. Its closed loops have two topological classes, expressed by $\pi_1(SO(3))=\mathbb Z/2$. The double-cover group $\mathrm{Spin}(3)=SU(2)$ distinguishes the two lifts that a visible frame alone cannot.

The candidate spinor recovery asks for an actual retained frame-history loop in the nontrivial class, a corresponding lift and restoration after the doubled loop. This mathematical target resembles the sign change of a spin-$1/2$ quantum state under a full rotation and its restoration after twice that rotation. A visible vector's reversal or an ordinary closed spatial curve does not establish it. Nor does assigning a minus sign to a coordinate label.

A quotient is descriptive gauge only when it preserves the physical history class. Angular-momentum accounts and the path exchanging two assemblies must use the same branch before an exchange sign can be inferred. The effective Dirac and Klein–Gordon equations, which govern relativistic spinor and scalar propagation in standard comparisons, remain downstream targets. The double cover alone does not recover those propagation equations or the spin-statistics connection.

### 8.2. Magnetic moment requires quantitative normalization

A magnetic moment measures the leading response of a localized effective current distribution to an effective magnetic readout. In this proposal, an exposed-current integral supplies a candidate moment from assembly history. Its origin, normalization, angular-momentum account, exposed charge, mass and apparatus conventions must be fixed together.

The leading gyromagnetic comparison $g=2$ is a quantitative relation between moment and angular momentum. The topology of a double cover supplies no such numerical normalization by itself. The source therefore treats a covering-degree explanation as a theorem target requiring an additional moment/action bridge. A later anomaly correction describes departure from the leading value through the declared dressing mechanism; it cannot compensate for an unfixed leading normalization.

The magnetic readout is a curl-like component of the independently recovered effective electromagnetic connection. It introduces no primitive magnetic field acting on an architrino. The moment map and the effective electromagnetic event construction remain separate prerequisites, even when an effective assembly-level alignment or gradient response combines them.

### 8.3. One visible weak sector

A weak-sector projection specifies which parts of a retained assembly and reaction history are accessible to a weak-interaction preparation or detector. A quotient removes descriptive redundancy, while exposure determines the physically visible contribution. These operations must preserve one underlying branch and domain. Gauge chart changes cannot alter the physical reaction.

The familiar $V-A$ comparison selects a particular handed combination of vector and axial weak response. Flavor mixing compares preparation and detection labels with propagation or reaction modes; CKM and PMNS are the standard matrices used for quark and lepton comparisons. Their entries, chirality, reaction provenance, gauge covariance and sea response must arise from compatible projections. Matching a few overlap entries does not supply the full weak dynamics.

The source's muon record distinguishes directly reported charged-electron spectrum, polarization, lifetime and Michel-fit information from inferred neutral-lepton bookkeeping. Its accepted observer-source projection rows do not derive a microscopic weak branch or the missing $V-A$ response. Those historical source acceptances are preserved at their evidential level.

### 8.4. Common phase and observable differences

Neutrino oscillation comparisons concern changes in the flavor detected after propagation. A proposed common internal cadence can be invisible to these comparisons if it contributes only a common phase. Let $H_\nu^{\mathrm{eff}}$ be a phase-rate generator, normalized in inverse observer-time units. Decompose it as

$$
H_\nu^{\mathrm{eff}}
=\omega_f C_0\mathbf1+H_\nu^{\mathrm{res}}
$$

The scalar $\omega_f C_0$ is the common cadence contribution, $\mathbf1$ the identity operator and $H_\nu^{\mathrm{res}}$ the residual generator. For constant generators, evolution through observer duration $\Delta t_{\mathrm{eff}}$ factors as

$$
e^{-iH_\nu^{\mathrm{eff}}\Delta t_{\mathrm{eff}}}
=e^{-i\omega_f C_0\Delta t_{\mathrm{eff}}}
e^{-iH_\nu^{\mathrm{res}}\Delta t_{\mathrm{eff}}}
$$

The first factor cancels from transition probabilities because it multiplies every amplitude equally. A varying common scalar can still factor after integration. A general varying residual needs time-ordered evolution unless its generators commute at different times. The source's additional mass-squared-response convention requires an explicit conversion to phase rate before either exponential is meaningful.

Two independent eigenvalue gaps remain observable after subtracting a common offset. If the adjacent gaps are normalized to $1$ and $r$, the traceless three-mode spectrum is

$$
\left(-\frac{r+2}{3},\frac{1-r}{3},\frac{2r+1}{3}\right)
$$

Its components sum to zero and its adjacent differences are $1$ and $r$. The source's schematic $r=32.5$ gives $(-11.5,-10.5,22)$, a near doublet and a separated singlet. Those numbers illustrate a declared ratio; they are not a new measurement or a derivation of neutrino masses. Static phase offsets move an interference origin but cannot generate the phase-rate differences accumulated with propagation or their observed energy dependence.

### 8.5. Candidate cancellations and unresolved mode maps

Equal carrier frequencies do not require equal residual eigenvalues. The source proposes three paired motions with a shared cadence and distinct phase, exposure and coupling readouts. Raw pair labels acquire inner, middle and outer roles only through retained geometry. A sampled lever-arm ratio does not establish a shell ordering or a return period.

Three equal phasors separated by thirds of a turn cancel. If phase offsets are written as $(0,1/3,2/3)$, an exponential must convert turns to radians through $2\pi$; interpreting those three numbers directly as radians gives a different sum. The proposed exterior cancellation must also leave a nonzero internal residual generator. Cancelling every effective phase difference would erase the oscillation comparison it is meant to explain.

The source proposes five locking partitions: all three paired motions locked, three choices of a locked pair with one separate motion, and all three independent. A reduction from these five candidate classes to three propagation modes requires a map; it is not a five-generation prediction. Near-photon handedness and survivor/mirror asymmetry remain further hypotheses. A penalty that vanishes when both spectral radii equal one cannot establish strict survivor stability and mirror instability. Actual retained branches and explicit spectral gaps or independently justified suppression measures are required.

## 9. Spectral precision and coupling

### 9.1. Atomic lines as joint envelope and clock comparisons

An atomic spectrum contains reproducible transition frequencies between states. Its gross hydrogenic comparison relates wavelength to two principal labels through a common Rydberg coefficient. In the proposed recovery, those labels must be derived from an atomic envelope; they cannot be inserted as primitive quantum numbers.

Let $E_{\mathrm{env}}^{(\ell)}(a)$ and $E_{\mathrm{env}}^{(\ell)}(b)$ be envelope-energy readouts for two states at resolution $\ell$. Let $\Gamma_N^{(\ell)}$ be the declared cadence conversion, with inverse $C_N^{(\ell)}=1/\Gamma_N^{(\ell)}$, and let $c_{\gamma,0}^{(\ell)}$ be the local photon-channel speed. The candidate coefficient is

$$
\widehat R_{\mathrm H}^{(\ell)}(a,b)
=
\frac{
C_N^{(\ell)}
[E_{\mathrm{env}}^{(\ell)}(a)-E_{\mathrm{env}}^{(\ell)}(b)]/h
}{
c_{\gamma,0}^{(\ell)}(n_b^{-2}-n_a^{-2})
}
$$

The integers $n_a,n_b$ are recovered principal-label readouts, and the energy-to-frequency conversion uses the same action unit $h$. A common coefficient across transitions is meaningful only when the envelope gaps, clock conversion, emission events and photon propagation are independently specified. Dividing observed wavelengths by the known line factor reproduces the Rydberg relation without deriving the envelope.

The focused hydrogen comparison uses the $3\to2$ and $4\to2$ lines at two admissible resolutions. Both require one branch, static response and line-set identity. Physical density, normalized density, delay, scale, shape ratio and relative core radius are separate response coordinates. A fitted scalar cannot silently replace them all. Nor is the envelope scale the photon wavelength.

### 9.2. Precision corrections remain distinguishable

Fine structure resolves smaller spin-sensitive level differences; hyperfine structure includes nuclear and electronic angular-momentum coupling; Zeeman and Stark comparisons describe response to applied effective magnetic and electric fields. Lamb-class shifts test additional radiation and wake-dressing contributions. Reduced-mass and recoil terms reflect that the atom and emitted or absorbed radiation share momentum. These corrections must remain identifiable rather than being absorbed into a new cadence factor for each line.

The complete spectral comparison therefore separates transition-independent scale, envelope-gap residual, event balance, recoil, spin-sensitive structure and radiation/wake dressing. Photon support, the action-period construction, Compton recoil and coupling normalization are necessary related inputs, but none is the hydrogen envelope itself. The source's successful and failing toy scenarios establish internal diagnostic expectations at their stated level; they do not supply an atomic retained history.

### 9.3. Reference coupling and scale dependence

The fine-structure coupling $\alpha$ is a dimensionless measure of effective electromagnetic interaction strength. A recovery requires an observable charge convention, an action unit, a photon speed and an electromagnetic response normalization fixed on one sea preparation. The convention or scheme specifies how the compared charge is extracted; without it, a statement about a changing coupling is ambiguous.

Running describes the dependence of a measured effective coupling on the energy or resolution scale of a probe. In this proposal, that dependence belongs to the common electromagnetic response kernel, exposed-charge map and declared inventory of accessible thresholds. At fixed sea preparation, it cannot be obtained by privately changing the action unit or photon speed. A withheld precision observation, such as a magnetic anomaly not used in calibration, then tests the resulting prediction independently.

The sources locate ultraviolet divergence and renormalization comparisons here as questions about scale dependence, threshold activation, charge exposure and wake dressing. This is distinct from the blackbody ultraviolet problem, which concerns equilibrium radiation mode energy at high frequency. Neither comparison establishes a substrate renormalization theorem. A fitted running curve with missing photon and action carriers remains a description of the fit.

### 9.4. Charged-lepton mass roots after prediction

The Koide comparison concerns a declared rest or pole-mass triplet for the electron, muon and tau. It must be evaluated after the three masses have been predicted by one frozen exposure, shielding and sea-response map. Choosing masses to satisfy the comparison would erase its predictive role. Running masses require a separate scheme and scale.

For positive mass readouts $M_0,M_1,M_2$, define

$$
Q=\frac{M_0+M_1+M_2}
{(\sqrt{M_0}+\sqrt{M_1}+\sqrt{M_2})^2},
\qquad
\mathbf R=(\sqrt{M_0},\sqrt{M_1},\sqrt{M_2}),
\qquad
\mathbf d=\frac{(1,1,1)}{\sqrt3}
$$

The vector $\mathbf d$ is the equal-generation direction. If $\theta$ is the angle between $\mathbf R$ and $\mathbf d$, direct substitution gives $\cos^2\theta=1/(3Q)$. Thus $Q=2/3$ is equivalent to an acute angle $\theta=\pi/4$.

Decompose $\mathbf R=R_d\mathbf d+\mathbf R_{\mathrm{tr}}$ with $\mathbf R_{\mathrm{tr}}\cdot\mathbf d=0$. The difference between transverse and equal-generation squared norms obeys

$$
\frac{\|\mathbf R_{\mathrm{tr}}\|^2-|R_d|^2}
{\|\mathbf R\|^2}
=1-2\cos^2\theta
=1-\frac{2}{3Q}
$$

These are algebraically equivalent descriptions of the same triplet, not independent tests. Common positive rescaling of all masses leaves the ratios and angle unchanged, and permutation leaves them unchanged as well. A match therefore fixes neither the absolute mass scale nor the generation ordering.

Interpreting mass roots as physical coframe lengths or the norm difference as a moment map remains a candidate geometric explanation. Scalar square roots alone construct neither that transport geometry nor a symplectic group action. Correlated mass uncertainties must be propagated through the nonlinear angle, and a narrow match must be assessed against a declared comparison family. A miss remains meaningful. The source's small observed-triplet residual is historical comparison arithmetic, not a retained prediction; the charged-lepton scope does not establish a universal quark relation.

## 10. Recoil, frequency exchange and radiation mechanisms

### 10.1. Conditional Compton and threshold relations

Compton scattering compares the wavelength change when a photon transfers energy and momentum to a target. Under the isolated elastic effective photon and target dispersion assumptions, the target initially at rest gives

$$
\lambda_\gamma'-\lambda_\gamma
=\frac{h}{M_T^{\mathrm{exp}}c_\gamma}
(1-\cos\theta)
$$

The scattering angle is $\theta$, the exposed target mass is $M_T^{\mathrm{exp}}$ and the primed wavelength belongs to the outgoing photon. This is conditional effective algebra from the declared energy-momentum accounts and dispersion relations. A nonzero medium or remnant exchange changes the problem and cannot be hidden while retaining the isolated formula.

The source replay computes the outgoing energy from this comparison relation and balances the recoil momentum afterward. Its very small residuals consequently establish consistency of that algebraic construction. They provide no independent recovery of the equation used to construct the output. The underlying incoming and outgoing photon, target, recoil and transverse-mode histories remain separate physical requirements.

Photoelectric emission adds a material capture or work-function readout. The comparison $K_{\max}=h\nu-\Phi_{\mathrm{work}}$ relates the largest emitted kinetic energy to the photon frequency and the material work function $\Phi_{\mathrm{work}}$. A pair-production comparison additionally requires momentum balance: a nominal photon energy above twice the effective rest energy is not sufficient for an isolated single-photon event. A momentum-balancing environment or a suitable two-photon invariant condition is necessary, together with the identity-routed recruitment and product accounts. A threshold comparison does not create architrinos from nothing.

### 10.2. Signed exchange along a path

An intervening electron population can increase or decrease photon frequency. The source's signed path increment is

$$
Y^{\mathrm{ex}}
=-\ln\!\left(\frac{\nu^+}{\nu^-}\right)
$$

The incoming and outgoing frequencies are $\nu^-$ and $\nu^+$. A boost gives $Y^{\mathrm{ex}}<0$, a decrease gives $Y^{\mathrm{ex}}>0$, and unchanged frequency gives zero. Additive increments compose multiplicative frequency ratios, provided every increment refers to the declared successive path events.

Energy changes in the photon, target, medium, recoil and remnant must close on that same path, together with momentum and angular momentum. These categories need disjoint definitions: calling one contribution target energy and another recoil energy does not ensure they are independent. Packet identity must be preserved through the stated exchange or explicitly replaced when the event is absorption, re-emission or another reaction.

Inverse Compton scattering is the effective comparison in which energetic electrons boost photon frequency. The source uses the mean factor approximately $(4/3)\gamma_e^2$ with the Thomson-limit restriction $4\gamma_e h\nu^-\ll m_ec_\gamma^2$. Here $\gamma_e$ is the electron Lorentz comparison factor and $m_e$ its effective mass. The mean factor additionally requires a declared electron/photon angular distribution and averaging regime; it is not a deterministic ratio for every encounter.

### 10.3. Thermal and kinematic column comparisons

The Sunyaev–Zeldovich comparisons describe radiation changes associated with an electron column. Thermal exchange depends on the electrons' temperature; kinematic exchange depends on their coherent line-of-sight motion. In their stated effective regimes, the relevant column quantities are

$$
\tau_e=\sigma_T\int n_e\,d\ell_{\mathrm{eff}},
\qquad
y=\int
\frac{k_BT_e}{m_ec_\gamma^2}
n_e\sigma_T\,d\ell_{\mathrm{eff}}
$$

Here $\tau_e$ is the optical depth, $\sigma_T$ the Thomson comparison cross section, $n_e$ the electron number density, $T_e$ the electron temperature and $k_B$ the temperature-to-energy comparison constant. The path length is measured in the declared observer chart. The parameter $y$ weights the same column by electron thermal energy.

For the Rayleigh–Jeans part of a weak thermal distortion, the source compares $\Delta T_{\mathrm{rad}}/T_{\mathrm{rad}}\simeq-2y$. The kinematic comparison is $\Delta T_{\mathrm{rad}}/T_{\mathrm{rad}}\simeq-\tau_e v_\parallel/c_\gamma$, with an explicit sign convention for the line-of-sight velocity $v_\parallel$. These formulas must share the photon path, electron column, temperature and thermal record. An isolated fit to a temperature decrement does not establish those physical inputs.

This bounded exchange mechanism does not identify all cosmological redshift with scattering. Cosmological use also has to preserve blackbody shape, anisotropy, polarization, damping and lensing. The origin of a thermal spectrum and the formation of acoustic structure remain separate questions.

### 10.4. Radiation power must name its source

Radiation comparisons require a mechanism and an output channel. Curved charged-assembly motion, encounter radiation, thermal emission and reaction-driven release are different source mechanisms. Electromagnetic photons and effective tensor disturbances are different carrier families. Sharing an energy-transfer label does not make them interchangeable.

The Larmor and Liénard comparisons concern effective radiated power from accelerated charged matter. Synchrotron comparisons join characteristic frequency, power, pitch angle, polarization and source cooling in a curved-motion regime. Bremsstrahlung and free-free comparisons involve encounter and thermal populations. Their effective formulas constrain the required source histories; adding a primitive radiation-reaction interaction to force agreement would change the substrate law.

The proposed synchrotron record joins the source branch, sea magnetic state, departure from closure, excitation above a stable branch, planar-mode drive, output photon, depletion and recoil/wake/medium/remnant accounts. Power, spectrum, cooling and polarization must reuse that source and field history. A critical-frequency proportionality that suppresses coefficients or pitch dependence cannot be used quantitatively until they are restored under declared conventions.

The ratio of source energy to instantaneous power is a local characteristic cooling scale. It is not generally the elapsed time for a finite energy change when power evolves with the source. Integrating that changing history is a distinct requirement. A diagnostic rejecting a non-synchrotron source from a synchrotron-specific comparison rejects that substitution; it does not refute other radiation mechanisms.

## 11. Populations, response and thermal radiation

### 11.1. Continuum quantities from a finite population

A continuum description smooths many individually resolved objects into densities and currents. It is useful when those readouts converge as resolution changes and their errors remain controlled. The proposed Noether-sea construction starts with a retained population of assemblies, including position, velocity, exposure, cadence, branch history and boundary events. Assembly mass weights are derived bookkeeping quantities; they introduce no intrinsic architrino mass.

For a smoothed branch observable $M_a$, its transport flux $\mathbf J_a$, classified source $S_a$ and unresolved remainder $r_a$, the candidate moment balance is

$$
\partial_T M_a+\nabla_{\mathbf X}\cdot\mathbf J_a
=S_a+r_a
$$

The subscript $a$ identifies the observable being averaged. Differentiating a smoothed sum provides a starting identity, but branch creation, loss, retuning, boundary crossing and history truncation must be accounted for before interpreting it as a physical continuity law. Cadence density, energy density and momentum density need their own moment definitions and common population.

Refinement must control both the retained population and the smoothing convention. An apparent density balance obtained by privately changing population labels or kernel widths is not a common continuum limit. A source term must identify the underlying association, dissociation, transport or exchange events.

### 11.2. Acoustic and elastic response

An acoustic comparison describes the propagation of small disturbances; an elastic comparison describes the stress associated with a small deformation. Both are effective response laws. In a declared linear regime, the elastic target is

$$
\delta\sigma_{ij}
=C_{ij}{}^{kl}\,\delta\epsilon_{kl}
+r_{\sigma,ij}
$$

The stress perturbation is $\delta\sigma_{ij}$, strain is $\delta\epsilon_{kl}$, the constitutive tensor is $C_{ij}{}^{kl}$ and $r_{\sigma,ij}$ is the error. The tensor must arise from the same density, orientation, strain and delayed-history record used for acoustic propagation.

A longitudinal comparison joins the squared dispersion speed $c_{\mathrm{disp}}^2$ to $C_{1111}/\rho_{\mathrm{NS}}$ under the appropriate effective mass-density convention. Matching these scalars is insufficient without stress response, common normalization and convergence under the same refinement. An acoustic metric also contains a conformal amplitude, drift and spatial blocks. Fitting its propagation cone does not fix its energy-response normalization.

The candidate delayed susceptibility maps perturbations of one set of observables to another. Its causal Fourier-space real and imaginary parts can be compared through a Kramers–Kronig-type relation only after the analytic domain, transform convention, decay or subtraction conditions and finite-window errors have been specified. Causality alone does not supply every hypothesis of that comparison.

### 11.3. One response column, several effective laws

A density-compression perturbation is proposed as a shared test of the sea response. The same perturbation should determine changes in channel speed, stress or compliance, clock lapse, spatial metric, effective gravity, pressure and low-acceleration behavior. An absent output is missing information, not a measured zero. Since these outputs have different units, a combined residual also requires a component metric or explicit normalization.

The sources report a score-neutral accepted density-provider route and additional pressure and output-projection handoffs. They also preserve older mock and retained-attempt routes. These are distinct source records: missing fields in one slice do not negate fields supplied by another. Their reported acceptance establishes the stated source and interface conditions, not a new independently verified constitutive law in this treatment. Broader physical population and observational transfer claims remain additional obligations.

### 11.4. Entropy and thermalization

Entropy compares the measure of histories compatible with a coarse description. The proposed finite-window expression has the form $S=k_B\ln\mu(\mathcal C)$, where $\mathcal C$ is an admissible coarse-state set and the measure normalization must make the logarithm meaningful. A thermal balance separates internal production, boundary flow and coarse-graining error. Positive entropy production and a Boltzmann collision law are recovery targets for the declared population and process, not primitive laws applied to a single architrino.

Thermalization requires physical mixing and exchange mechanisms. The candidate thermal depth integrates an inverse thermalization timescale along a source-to-decoupling history, with contributions from capture/release, Compton-like exchange, pair processes and nonradiative medium channels. A large assigned depth does not derive the channel rates that produce it. The same population and event record must support radiation, source reactions and later thermal observables.

A state with a vanishing photon-number current is not the same as a theory with no conserved photon-number constraint. The former can occur in a special state even when such a constraint exists. Neither statement alone establishes equilibrium. This distinction matters when the chemical potential, a parameter associated with a conserved-number constraint in the equilibrium comparison, is set to zero.

### 11.5. Blackbody mode counting and occupancy

The Planck spectrum joins two ingredients: the number of available radiation modes in a frequency interval and the mean occupation of each mode. In the equilibrium photon comparison with zero chemical potential,

$$
\bar n_\nu
=\frac{1}{e^{h\nu/(k_BT_{\mathrm{temp}})}-1},
\qquad
u_\nu
=\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{e^{h\nu/(k_BT_{\mathrm{temp}})}-1}
$$

The frequency is $\nu$, temperature is $T_{\mathrm{temp}}$, mean occupation is $\bar n_\nu$ and spectral energy density is $u_\nu$. The factor $8\pi\nu^2/c_\gamma^3$ counts modes in the declared three-dimensional effective propagation regime, including two transverse polarizations. Multiplying it by the photon energy $h\nu$ and occupation gives the second relation.

Recovering this comparison requires independently justified mode counting, the two physical transverse modes, an equilibrium measure and thermalization. A maximum-entropy calculation is conditional on the declared constraints and mode measure; it does not create those physical ingredients. A separate temperature for every frequency bin or an action unit fitted from the same spectrum removes the joint prediction.

The Rayleigh–Jeans ultraviolet failure is a useful comparison control: classical equipartition combined with the high-frequency mode count gives excessive spectral energy. A successful recovery must explain why its population follows the appropriate occupancy law. This issue is distinct from scale-dependent coupling and ultraviolet renormalization. A blackbody-shaped fit alone does not establish the cosmic source, its thermal history or its acoustic fluctuations.

## 12. Effective geometry and frequency transfer

### 12.1. Geometry as a common readout

An effective metric organizes the intervals, clock rates and propagation paths inferred by observers. It is a readout of physical clocks, rulers and signals, distinct from the Euclidean spatial metric of the proposed substrate. Its lapse describes the local clock conversion, its drift relates spatial transport to the observer slicing, and its spatial metric describes inferred spatial intervals.

The proposed map takes density, delay, stress, alignment, flow and causal-history information into a coframe and effective metric. A weak-response expansion can organize the lapse as

$$
N
=1+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N+\mathcal R_N
$$

The perturbations $\delta n$ and $\delta\chi$ are normalized density and delay changes, $\varphi$ is a dimensionless potential readout, the $A_N$ quantities are response coefficients, $Q_N$ collects the declared higher-order response and $\mathcal R_N$ the remainder. This expression organizes a candidate constitutive expansion. Its coefficients must be extracted from one sea record rather than chosen separately for each clock observation.

Spatial compliance also has trace-free strain response, which a scalar delay factor cannot encode. Matter, clocks and photons must share the effective geometry wherever the proposed recovery requires universality. A separately fitted photon metric would evade the joint test.

### 12.2. Weak-gravity comparisons

Weak gravitational tests connect clock shifts, signal delays, deflection, acceleration and orbit precession. The parameterized post-Newtonian comparison expresses possible weak-field departures through coefficients that can be constrained across these observations. Its parameters are effective observational descriptors, not new substrate constants.

For example, the point-mass deflection comparison is

$$
\alpha_{\mathrm{def}}
=2(1+\gamma_{\mathrm{PPN}})
\frac{G_{\mathrm{eff}}M}{b\,c_\gamma^2}
$$

The deflection angle is $\alpha_{\mathrm{def}}$, impact parameter is $b$, effective source mass is $M$, coupling is $G_{\mathrm{eff}}$ and $\gamma_{\mathrm{PPN}}$ is the spatial-curvature comparison parameter. A lapse-only or scalar-delay calculation can miss part of the required deflection. The complete clock, spatial, signal and source response must therefore be compared together rather than repairing lensing with an independent coefficient.

The sources report a score-neutral weak-field record covering metric, clock, redshift, Shapiro delay, lensing, acceleration, parameterized post-Newtonian, null and massive-action readouts. That source report coexists with rejected attempts and does not establish every downstream cosmological or material response. Preferred-frame leakage, clock/signal splitting, scalar half-lensing and hidden metric adjustment remain different falsifiers.

### 12.3. Action and null propagation consume the same geometry

An effective proper-time action describes massive assembly trajectories in an observer metric. Its stationary paths can reproduce the geodesic comparison when the metric and clock map have already been established. It is not a replacement primitive acceleration law. Null or eikonal propagation similarly constrains phase travel in that effective geometry and must use the same signal-channel response.

The source asks for massive action, clock/ruler readouts, acceleration and null propagation to be bound to one physical record. Agreement between two formulas obtained from the same fitted metric checks their mutual consistency; it does not independently derive that metric from causal histories.

### 12.4. Endpoint clocks, source shifts and path transfer

An observed frequency ratio can combine several effects. The emitter and receiver have their own clock cadences; the source transition can change; relative motion can alter the readout; and intervening propagation can exchange energy with a medium. A signed logarithmic budget keeps those roles separate:

$$
\ln(1+z_X)
=\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,E\to R}
-\ln B_X(E)
-\ln D_v
$$

The redshift convention is $1+z_X=\nu_{\mathrm{emitted}}/\nu_{\mathrm{received}}$. The factors $\Gamma_{N,E}$ and $\Gamma_{N,R}$ are inverse-cadence readouts at the endpoints, $Y_{X,E\to R}$ is the signed path term, $B_X(E)$ the source/launch factor and $D_v$ the declared kinematic factor. Their definitions must be consistent before the logarithms are combined.

The shape ratio $\xi$, overall assembly scale and cadence conversion are distinct variables. A conditional relation $\Gamma_N=1/\xi$ under shape locking does not establish a universal Lorentz law or permit material scale to be absorbed into shape. Sea delay and photon signal delay can also have different reference speeds.

Every path segment must retain its energy, recoil, medium and remnant account. Image sharpness, chromaticity, coherence and time-dilation compatibility constrain the same transfer mechanism. A spectral fit that changes the source population or endpoint clocks to repair each path does not recover this common map. The accepted weak-field and homogeneous-cosmology handoffs reported by the sources do not supply the separately missing full transfer carrier.

## 13. Compact support, release and horizons

### 13.1. Distinct scales in compressed matter

Compression changes several different structures. Atomic orbital extent describes a bound electronic envelope. Fermi spacing describes the typical spacing of delocalized effective electrons in a state-counting comparison. Internal braid scale describes a proposed constituent assembly. Effective metric scale describes observer intervals. A change in one does not establish a corresponding change in the others.

For electron number density $n_e$, the standard degenerate-electron comparisons give spacing proportional to $n_e^{-1/3}$ and Fermi momentum proportional to $\hbar n_e^{1/3}$. The nonrelativistic and relativistic pressure laws scale as $n_e^{5/3}$ and $n_e^{4/3}$ respectively. Combined with the effective gravitational support estimate $P_{\mathrm{grav}}\sim G M^2/R^4$, these yield the familiar nonrelativistic mass-radius exponent and the composition-dependent Chandrasekhar mass scale.

These relations constrain a recovery; they do not supply primitive exclusion statistics, constituent mass or a pressure law for architrinos. In a fixed composition family, the comparison has $R\propto M^{-1/3}$ in the nonrelativistic regime and $M_{\mathrm{Ch}}\propto Y_e^2$, where $Y_e$ is electron number per baryonic inventory unit in the declared effective dictionary. The coefficient family must remain fixed across those tests.

### 13.2. Radial support and reactions

A compact-star comparison joins local pressure, density, enclosed mass, composition and an equation of state. With $\rho_m$ explicitly defined as effective mass density, a conventional Tolman–Oppenheimer–Volkoff comparison can be written

$$
\frac{dm}{dr_{\mathrm{eff}}}
=4\pi r_{\mathrm{eff}}^2\rho_m
$$

$$
\frac{dP_{\mathrm{eff}}}{dr_{\mathrm{eff}}}
=-
\frac{
G_{\mathrm{eff}}
(\rho_m+P_{\mathrm{eff}}/c_0^2)
(m+4\pi r_{\mathrm{eff}}^3P_{\mathrm{eff}}/c_0^2)
}{
r_{\mathrm{eff}}^2
(1-2G_{\mathrm{eff}}m/(r_{\mathrm{eff}}c_0^2))
}
$$

The enclosed observer mass is $m$, radius is $r_{\mathrm{eff}}$, pressure is $P_{\mathrm{eff}}$ and $c_0$ is the speed used by this effective comparison. These equations summarize relativistic hydrostatic support. They are not substrate equations or proof of a retained stellar interior.

The source calls its density symbol energy density while printing mass-density versions of these terms. The displayed comparison here declares mass density explicitly; an energy-density version requires the corresponding factors of $c_0^{-2}$. The unresolved source dictionary cannot be settled merely by setting the primitive wake speed to one.

Electron capture changes composition and the electron support reservoir. It must carry nuclear transformation, neutrino, heat, recoil, photodisintegration where applicable, medium and remnant accounts. Fitting a new electron fraction without those events changes the support model. White-dwarf scaling likewise does not prove neutron-star support or a continuation to a horizon.

The proposed compact-region comparison binds state counting, pressure regime, reaction inventory, energy and momentum balance, material-scale response, metric response and radial support. A scalar average of logarithmic material scales and a determinant-based metric volume scale can agree while anisotropic components differ. Full material-to-metric consistency needs more information than one scalar collapse residual.

### 13.3. Accretion and release channels

Accretion describes the supply of matter and energy to a compact source; release describes the outgoing radiation, winds, jets and feedback. The source comparisons include inflow, opacity-limited luminosity, growth time, thin-disk flux, radiative efficiency, launch scale, mass loading and collimation. Effective magnetic-flux or jet-power formulas are observational targets, not primitive magnetic mechanisms.

A state-dependent release selector is proposed to allocate energy among jet, wind, radiation and possible dark-sector channels. Its physical meaning requires a retained source history showing which channels are available and how their populations change. The same record must explain launch, acceleration, loading, dissipation, radiation and environmental feedback. A distant lobe or cavity does not independently determine the launch history.

The launch-speed comparison with an escape scale $\sqrt{2G_{\mathrm{eff}}M/R_{\mathrm{launch}}}$ has a declared weak or nonrelativistic domain; it does not settle relativistic motion close to a horizon. Photon, synchrotron-like, Compton-like, hadronic, pair-cascade, cosmic-ray and neutrino outputs require their own channel and event accounts. Repeated recycling cannot provide an unaccounted energy source.

The source's existing accretion-release check is an identity check and explicitly does not evaluate release arithmetic. Its narrow source and control results cannot establish a release population. They preserve the distinction between a required physical parent and its individual radiation children.

### 13.4. Horizon, light ring and interior

A black-hole-proper comparison concerns the compact interface and interior, not merely its accretion or jet boundary. For the nonrotating effective exterior, the horizon, circular photon orbit and innermost stable circular orbit have respective scales

$$
r_s=\frac{2G_{\mathrm{eff}}M}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3G_{\mathrm{eff}}M}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6G_{\mathrm{eff}}M}{c_0^2}
$$

Their different coefficients express different geometric questions. An interface is not automatically a photon orbit. Any proposed coincidence in a rotating limiting regime requires its own branch and orientation conditions.

For a neutral Kerr comparison with $M>0$ and dimensionless spin $\chi_J=c_0\|\mathbf J\|/(G_{\mathrm{eff}}M^2)$ satisfying $|\chi_J|\le1$, the horizon radius and area targets are

$$
r_+=\frac{G_{\mathrm{eff}}M}{c_0^2}
\left(1+\sqrt{1-\chi_J^2}\right),
\qquad
A_H=\frac{8\pi G_{\mathrm{eff}}^2M^2}{c_0^4}
\left(1+\sqrt{1-\chi_J^2}\right)
$$

The angular momentum is $\mathbf J$. The existence of an effective-charge field in a source record does not extend these neutral formulas to a charged geometry. The related surface-gravity, temperature and area-entropy comparisons require the same mass, spin and action conventions. In particular, the standard area relation is $S_{\mathrm{BH}}=k_Bc_0^3A_H/(4G_{\mathrm{eff}}\hbar)$; writing it does not count microscopic states.

The proposed substrate interface is specified by an equation $F_H=0$ extracted from sea density, stress, flow, terminal braid labels and boundary history. Suggested terminal speed and alignment limits remain candidate conditions. Conditional planar-photon attachment, interior continuation, finite-curvature bounds, horizon-label ensemble and event conservation are separate requirements. A bounded scalar on one finite window cannot establish a global event horizon or uniform interior regularity.

Accretion may supply declared boundary data, and merger or collapse may require a ringdown readout. Neither substitutes for the interface. A proposed entropy or information-flow recovery needs the same retained state ensemble and event history; a private area fit or detached remnant label is insufficient.

## 14. Gravitational radiation from source to remnant

### 14.1. Inspiral and radiated power

A gravitational-wave comparison joins source motion, a propagating tensor response, detector strain and the final remnant. The leading circular-inspiral formulas are useful because they tie several observables to the same source parameters. They do not describe every stage of an arbitrary merger.

For effective component masses $m_1,m_2$, define total mass $M=m_1+m_2$, reduced mass $\mu=m_1m_2/M$ and chirp mass

$$
\mathcal M_c
=\frac{(m_1m_2)^{3/5}}{(m_1+m_2)^{1/5}}
$$

In the leading circular comparison, frequency evolution and orbit shrinkage obey

$$
\frac{df_{\mathrm{GW}}}{dt_{\mathrm{eff}}}
=\frac{96}{5}\pi^{8/3}
\left(\frac{G_{\mathrm{eff}}\mathcal M_c}{c_{\mathrm{GW}}^3}\right)^{5/3}
f_{\mathrm{GW}}^{11/3}
$$

$$
\frac{da}{dt_{\mathrm{eff}}}
=-\frac{64}{5}
\frac{G_{\mathrm{eff}}^3m_1m_2M}{c_{\mathrm{GW}}^5a^3}
$$

The effective separation is $a$, wave frequency is $f_{\mathrm{GW}}$ and tensor-channel propagation speed is $c_{\mathrm{GW}}$. These comparison masses and coordinates must be derived assembly and observer readouts in a successful substrate account.

The quadrupole describes the source's second spatial moment with a declared trace convention. The leading power target joins its third time derivatives to radiated power; in the circular specialization it becomes

$$
P_{\mathrm{GW}}
=\frac{32}{5}
\frac{G_{\mathrm{eff}}^4\mu^2M^3}
{c_{\mathrm{GW}}^5a^5}
$$

Source quadrupole, chirp, shrinking orbit and energy loss must all use one event history. Fitting the chirp mass without the corresponding radiated energy and angular momentum does not close that joint account.

### 14.2. Detector normalization and ringdown

Detector strain is a calibrated projection of a tensor disturbance, not automatically the two polarization amplitudes themselves. The source's strain-flux coefficient requires a declared polarization basis. If the two basis tensors each have squared norm two, the tensor derivative contraction is twice the sum of squared polarization-amplitude derivatives. A coefficient written for the tensor contraction cannot be copied unchanged onto that sum. A norm-one basis or rescaled amplitudes uses a different convention.

This normalization issue is explicit rather than a declaration of a universally wrong factor in the source. Quadrupole trace, time averaging, polarization basis, calibration, masking and detector response must be specified before comparing power coefficients. Agreement of two arrays derived with the same convention does not independently verify the convention.

Ringdown describes the damped response associated with the final compact-object comparison. Its frequency scale is $c_{\mathrm{GW}}^3/(G_{\mathrm{eff}}M_f)$ and its damping-time scale is $G_{\mathrm{eff}}M_f/c_{\mathrm{GW}}^3$, multiplied by functions of the declared final spin and mode. These are not universal numerical coefficients. The final mass, spin and angular-momentum account must agree with the preceding radiated history.

### 14.3. Event evidence and constitutive evidence

The source uses GW150914 as a versioned observational candidate, with detector strain, source-parameter, waveform and extraction provenance requirements. These are source-transcribed historical references in this treatment; the original detector products and papers are not freshly analyzed. An event-release identifier or a complete source-field specification does not supply the retained tensor response of the proposed sea.

Every source, quadrupole, chirp, orbit-change, strain-flux, remnant and detector projection requires row-specific evidence on a common source window and event. Source and detector artifacts can constrain the observer comparison, while sea and tensor rows still need their constitutive derivation. An electromagnetic or neutrino coincidence cannot replace the tensor carrier.

The complete source-contract ladder in the packet remains explicitly short of retained evidence, and its intake template remains artifact-incomplete. That negative result is substantive: a completed specification is not a populated physical calculation. The missing source carrier cannot be bypassed by a bundle cited wholesale or by hashes without usable retained artifacts.

## 15. Sea strain, pressure and cosmological projection

### 15.1. A candidate stored-energy mechanism

A strained assembly can store energy when accepting channels are closed or slow. The proposed outer-binary mechanism uses this possibility to connect retained sea history with effective stress and pressure. It does not postulate a new vacuum substance. Each braid carries an outer radius, cadence, phase, energy and path history, and its environment selects a reference branch only after density, delay, boundary and source-loading conditions have been declared.

For reference radius $R_{\mathrm{eq}}>0$, define scalar strain $\epsilon_O=(R_O-R_{\mathrm{eq}})/R_{\mathrm{eq}}$. The candidate energy expansion is

$$
E_O
=E_{\mathrm{eq}}
+\frac12K_OR_{\mathrm{eq}}^2\epsilon_O^2
+O(\epsilon_O^3)
$$

The stiffness $K_O$ must come from the retained branch response. Before the expansion supports a stability statement, the reference must satisfy its equilibrium or balance conditions. Fitting $K_O$ to a dark-energy target does not derive that response.

A population energy density can then use number density times mean per-braid strain energy, or mass density times an appropriate specific energy. Those are different dictionaries. The source alternates inventory-counting and mass-weighted density language, so the conversion must be supplied before its stored-energy formula joins the shared density provider.

### 15.2. Channel current and stationary balance

The source proposes an energy-cadence potential

$$
\mu_{O,b}
=\frac{\partial E_{O,b}}{\partial N_b}
+\Omega_{O,b}
+\frac{\partial E_{O,b}}{\partial\nu_{O,b}}
$$

The inventory weight is $N_b$, cadence is $\nu_{O,b}$ and $\Omega_{O,b}$ denotes additional phase/history terms. With dimensionless inventory and dimensional cadence, the two derivatives have different units. The expression remains a candidate requiring cadence normalization or conversion coefficients; it is not yet a defined physical potential.

Conditional on a consistent potential, the proposed signed exchange current is

$$
J_{ab}
=\Gamma_{ab}\mathcal A_{ab}
(\mu_{O,a}-\mu_{O,b})
$$

The coefficient $\Gamma_{ab}$ sets the exchange scale and $\mathcal A_{ab}$ represents availability of an accepting channel. Positive $J_{ab}$ means transport from $a$ to $b$. Closed channels can leave strain stored even away from a lower-energy reference.

The condition $\sum_bJ_{ab}+J_{a\partial W}\approx0$ expresses zero net outflow, including boundary exchange. It permits equal inflow and outflow and does not require every channel current to vanish. It therefore cannot establish detailed balance or a global minimum. The source's separate site balance uses $\sum_b(J_{ba}-J_{ab})$; for reciprocal coefficients and signed net currents, $J_{ba}=-J_{ab}$, producing twice the usual outgoing sum. A directed-event interpretation, half normalization or another explicit current convention is needed to reconcile those expressions. The manuscript does not silently choose one.

### 15.3. Stress does not follow from stored energy alone

Stress is proposed as the response of retained energy to a declared coarse deformation. Pressure is the volume derivative with the retained inventory, history and available channels specified. Under a tensile-stress convention, the isotropic pressure contribution is minus one third of the tension trace, with additional kinetic and source terms.

Positive stored strain energy does not by itself imply negative total pressure. The tensile contribution must dominate the other terms, and the deformation derivative must be derived on the same record. Opening a channel can change relaxation, loading or boundary transport; a cascade describes those changed exchanges rather than an unaccounted new energy source.

The proposed construction consequently proceeds from a density record through cadence and boundary state, a reference branch, stiffness, channel currents, stress and pressure, then effective equation-of-state and coupling readouts. The sources report accepted score-neutral slices of this chain and preserve blocked attempts alongside them. Neither a local handoff nor a fitted pressure coefficient supplies the general constitutive law.

### 15.4. Gravity and pressure must share their source

The effective Poisson comparison tests the relation between a potential Laplacian and declared source density plus sea response. The tensor comparison tests curvature, effective stress-energy and any separately defined cosmological term. A scalar acceleration agreement cannot establish the full tensor relation. Likewise local gravity, cosmological pressure, growth, lensing and low-acceleration behavior cannot each use a privately fitted effective coupling.

A pure cosmological-constant comparison and a time-dependent pressure component are different regimes. With mass density $\rho_m$ and pressure $P_{\mathrm{eff}}$, the effective accelerated-expansion condition concerns a sufficiently negative total combination $\rho_m+3P_{\mathrm{eff}}/c_0^2$. It does not follow from nonzero strain or a positive energy reservoir alone.

The source uses an effective Lambda both as a curvature scale and, elsewhere, as a rate-squared term. These conventions differ by $c_0^2$ in an expansion-rate equation. Density, pressure, coupling and Lambda therefore need a common dictionary before their residuals can be compared. A component represented through Lambda must also not be counted a second time inside total stress-energy.

## 16. Shared cosmological and astrophysical observations

### 16.1. Effective expansion in a fixed spatial container

An effective scale factor describes the observer reconstruction of relative distance evolution. In this proposal it must be derived from evolving assembly and sea records in a fixed Euclidean void. It does not describe an expanding primitive spatial container.

To make the comparison units explicit, let $a_{\mathrm{eff}}$ be dimensionless, $H_{\mathrm{eff}}=(1/a_{\mathrm{eff}})\,da_{\mathrm{eff}}/dt_{\mathrm{eff}}$, $\rho_m$ effective mass density, $P_{\mathrm{eff}}$ pressure, $k$ a curvature parameter with inverse-length-squared units and $\Lambda_{\mathrm{geo}}$ a curvature-scale cosmological term. A conventional homogeneous comparison is

$$
H_{\mathrm{eff}}^2
=\frac{8\pi G_{\mathrm{eff}}}{3}\rho_m
-\frac{k c_0^2}{a_{\mathrm{eff}}^2}
+\frac{c_0^2\Lambda_{\mathrm{geo}}}{3}
$$

$$
\frac{d\rho_m}{dt_{\mathrm{eff}}}
+3H_{\mathrm{eff}}
\left(\rho_m+\frac{P_{\mathrm{eff}}}{c_0^2}\right)
=\mathcal S_m
$$

The source term $\mathcal S_m$ has mass-density-per-time units and must derive from declared association, dissociation, recycling, transport or sea exchange. These equations state a consistent observer comparison convention; they do not repair the sources' mixed dictionary or derive the effective map. A time-dependent coupling or cosmological component requires its own consistent exchange accounting.

The same source must determine scale, expansion rate, angular and luminosity distances, redshift, radiation temperature, equality scales and sound horizon. A homogeneous handoff with internally matching fields does not supply those predictive transfer laws.

### 16.2. A common source window

The proposed joint observation record connects source, readout, thermal provenance, galaxy response and conserved events. Its shared fields include density, delay, cadence, flow, response tensor, baryonic and neutral-assembly loading, temperature history, baryon-to-photon ratio $\eta$, effective relativistic count $N_{\mathrm{eff}}$ and light-element yields. Local-reactor, recycling and compact-source windows are allowed candidate families in the source dictionary; none is established as a replacement cosmological history.

Different physical windows need not have numerically identical states. They need common provenance and explicit transformations carrying loading, energy and observer calibration between them. A declared transformation can have a nonzero bounded residual; an undisclosed independent fit cannot.

A combined residual should retain growth, cosmic microwave background, light-element yields, galaxy response, homogeneous evolution, thermal accounts and cross-family consistency. Positive weights and declared normalizations are necessary. Reusing the same lensing information in two components creates dependence; a weighted sum of squared discrepancies is not automatically an independent-data likelihood. The effective coupling must be checked as well, even though one printed shared-key list omits it.

### 16.3. Growth and the matter spectrum

The linear-growth comparison describes the evolution of a small matter-density contrast $\delta$ in an effective homogeneous background:

$$
\frac{d^2\delta}{dt_{\mathrm{eff}}^2}
+2H_{\mathrm{eff}}\frac{d\delta}{dt_{\mathrm{eff}}}
-4\pi G_{\mathrm{eff}}\bar\rho_m\,\delta=0
$$

The mean effective matter density is $\bar\rho_m$. The proposed sea response can make $G_{\mathrm{eff}}$ depend on scale and frequency; it must be derived from a retained response about an admissible branch. A quasi-static rational response with a denominator containing stiffness and wavenumber terms requires a nonzero denominator and a valid linearization. The denominator's appearance does not establish equilibrium or stability.

The familiar power-spectrum factorization $P(k,z)=P_{\mathrm{seed}}(k)\mathcal T(k)^2D(z)^2$ separates the seed spectrum, transfer function and growth factor. A scale-dependent response generally requires $D(z,k)$ or another explicitly separable approximation. Additive residual functions cannot be freely adjusted to absorb every disagreement.

Growth rate, matter power, lensing, shear, redshift-space distortion, halos, clusters, baryon acoustic oscillations, equality and free streaming constrain the same loading and response. The source's diagnostic chain successively consumes earlier outputs, including an inversion back to inherited matter-power samples. That inversion checks consistency of the chain, not an independent observation.

Its nonlinear prescription is explicitly $P_{\mathrm{nonlinear}}=P_{\mathrm{linear}}(1+\Delta_L^2)$ with $\Delta_L^2=k^3P_{\mathrm{linear}}/(2\pi^2)$ under a dimensional power-spectrum convention. Having no newly fitted coefficient does not derive nonlinear structure formation. The source-reported values and small residuals remain limited readout diagnostics.

### 16.4. Microwave-background transfer

The cosmic microwave background comparison joins the thermal spectrum with correlations of sky temperature and polarization. In one standard Fourier normalization,

$$
C_\ell^{XY}
=\frac{2}{\pi}\int k^2\,dk\,
P(k)\,\Delta_{X\ell}(k)\Delta_{Y\ell}(k)
$$

The angular index is $\ell$, $X$ and $Y$ label temperature or polarization channels, $P(k)$ is the declared seed spectrum and $\Delta_{X\ell}$ are transfer functions in the same normalization. Predicting these functions requires thermalization, acoustic propagation, damping, lensing, frame and instrument records; the integral alone does not supply them.

A large thermalization depth before decoupling must coexist with bounded later scattering, spectral distortion and image degradation. Opacity is distinct from the sea delay factor. Foreground separation, calibration, dipole/frame correction, scalar/tensor bounds, directional distance comparisons and matter loading cannot use private source histories. A blackbody fit alone leaves all of these transfer constraints unresolved.

### 16.5. Recombination, visibility and acoustic clocks

Recombination compares how the free-electron fraction changes as electrons and nuclei associate. A Saha relation gives an equilibrium ionization comparison, while a schematic Peebles-type rate balances recombination and photoionization. Their levels, rates and temperature conventions must be fixed before a detailed multilevel claim is made.

The effective Thomson scattering rate is $\Gamma_T=n_e\sigma_Tc_\gamma$. For optical depth from an emission time to a fixed observation time, use

$$
\tau_T(t_{\mathrm{eff}})
=\int_{t_{\mathrm{eff}}}^{t_{\mathrm{eff,obs}}}
\Gamma_T(s)\,ds,
\qquad
g_{\mathrm{vis}}(t_{\mathrm{eff}})
=\Gamma_T(t_{\mathrm{eff}})e^{-\tau_T(t_{\mathrm{eff}})}
$$

The visibility $g_{\mathrm{vis}}$ is the probability-density comparison for last scattering per unit observer time in this convention. Its sign and normalization depend on the integration limits. A conformal-time density requires the time-conversion factor.

The acoustic comparison uses $c_s=c_\gamma/\sqrt{3(1+R_b)}$, where $R_b$ is a declared baryon-to-photon loading parameter, and a comoving sound horizon obtained by integrating $c_s/a_{\mathrm{eff}}$ over observer time. Diffusion damping must use the same scattering rate and loading. The compact oscillator printed in the source requires a choice of physical or comoving wavenumber: with physical-time derivatives and comoving $k$, its frequency term includes $c_s^2k^2/a_{\mathrm{eff}}^2$. A local physical-wavenumber or appropriately converted conformal-time form is a different convention.

Equilibrium ionization, non-equilibrium rate, decoupling, visibility, sound horizon, diffusion damping and acoustic transfer are coupled comparisons of one source history. A fitted ionization curve, visibility without optical depth or private baryon loading fails that construction. The proposed source-window identifier is a placeholder until retained temporal and physical support exists.

### 16.6. Light-element and explosive-source reactions

Light-element comparisons connect weak conversion, expansion or source timescale, relativistic loading and nuclear reaction exposure. The neutron/proton freezeout estimate compares weak conversion rates with the effective evolution rate. The approximate abundance ratio depends on temperature, the neutron-proton effective mass difference and any declared neutrino asymmetry. These are recovery constraints; they do not supply a source temperature history or weak rate from the substrate.

The common yield vector includes helium-4, deuterium, helium-3 and lithium, with $\eta$, $N_{\mathrm{eff}}$, photons, neutrinos and other declared relativistic channels on the same epoch convention. A change that repairs one isotope while privately changing acoustic loading or neutrino energy fails the joint comparison. Light-element-to-microwave transfer preserves helium and photon/neutrino provenance; microwave-to-growth transfer preserves the seed, equality scale and assembly loading.

Stellar and explosive nucleosynthesis is a distinct source-window problem. Its comparisons include shock jumps, blast expansion, thermonuclear runaway, neutrino heating, radioactive heating, approximate peak-luminosity balance, nuclear statistical equilibrium and reaction networks. The explicit Sedov–Taylor comparison has

$$
R_s\propto
\left(\frac{E_{\mathrm{blast}}(\Delta t_{\mathrm{eff}})^2}
{\rho_{\mathrm{ambient}}}\right)^{1/5}
$$

The shock radius is $R_s$, source energy is $E_{\mathrm{blast}}$ and ambient mass density is $\rho_{\mathrm{ambient}}$. Its regime restricts geometry, injection and losses; it is not an arbitrary explosive history.

Reaction yields, electron fraction, radioactive inventory, photon output, neutrino heating, remnant, ejecta and medium changes must share that source and event account. Peak light alone does not establish the inventory supplying it. The source's explosive checker verifies identities before arithmetic and reports no accepted source or evaluated physical residual. Its specified supernova, nova and kilonova comparison labels create no populated event taxonomy.

### 16.7. Galaxy response and its limits

The radial-acceleration relation compares observed centripetal acceleration with that inferred from baryons. In a deep low-acceleration comparison, $g_{\mathrm{obs}}\simeq\sqrt{g_{\mathrm{bar}}a_\star}$ implies the baryonic Tully–Fisher relation $v_f^4=G_{\mathrm{eff}}M_ba_\star$ under the corresponding circular outer-orbit assumptions. The transition scale $a_\star$ is proposed as an environmental sea-response output, not a primitive constant.

The sources also propose three regimes: Newtonian response at high acceleration, square-root response in an intermediate range and $f\,g_{\mathrm{bar}}$ in the deepest range. Their lower transition scale is $a_\star/f^2$. An ordered nonempty intermediate regime needs $a_\star>0$ and $f>1$; the asymptotes do not derive a smooth transition, screening or stability.

One printed diagnostic-child equation is disputed:

$$
g_{\mathrm{response}}
=g_{\mathrm{bar}}
\left(\sqrt{\frac14+\frac{a_\star}{g_{\mathrm{bar}}}}-\frac12\right)
g_{\mathrm{bar}}
$$

The bracket is dimensionless, but the two outer factors give acceleration-squared units. Its asymptotes also differ from the stated total response. Removing one factor would repair that dimension while leaving an additional-response expression tending to $a_\star$ at high acceleration, so the total-versus-additional convention remains unresolved. No replacement law is accepted here. Source-reported passing flags cannot certify the printed expression without an independently checked implementation and definition.

Galaxy morphology, baryonic feedback, lensing/dynamics agreement, clusters, local gravitational tests, binary pulsars, gravitational waves, electron-column observations and large-scale matter response remain coupled constraints. A galaxy fit that creates an unacceptable long-range profile or privately changes the effective coupling is not a shared recovery.

## 17. Solved comparisons and source evidence

### 17.1. What a solved equation can constrain

A solved equation is useful when it supplies a definite relation or support property for an existing recovery question. Its falsifier must survive translation: a wrong arrival time, missing mode, incompatible gap, unbalanced flux or inconsistent record measure can reject a proposed map. A solution imported without a physical carrier only restates the target.

The six retained clue families have different roles. Causal Green functions constrain support and root weights. Massless plane waves constrain phase and group speeds in a declared nondispersive regime. Cavity solutions constrain boundary conditions and transverse mode count. Scattering solutions constrain phase and flux together. A Klein–Gordon comparison constrains a stable mode gap through $\omega^2=c_{\mathrm{eff}}^2\|\mathbf k\|^2+\omega_0^2$, with action and mass/exposure conventions shared. A Schrödinger Gaussian constrains density, spreading and current from one finite measure and flow. None supplies an ontic scalar field or wavefunction.

For a moving scalar source, define the comparison arrival function

$$
g(T_t)
=T-T_t-\frac{\|\mathbf X-\mathbf X_t(T_t)\|}{c_f}
$$

At a simple nonzero-distance root, $g'(T_t)=-1+\hat{\mathbf n}\cdot\mathbf V_t/c_f$, where $\hat{\mathbf n}$ points from source emission to observation. The delta-composition identity therefore gives an absolute Jacobian denominator in the scalar source sum:

$$
\sum_i
\frac{q(T_{t,i})}
{4\pi r_i\,|1-\hat{\mathbf n}_i\cdot\mathbf V_i/c_f|}
$$

This follows under the declared scalar operator and source normalization and includes every simple root. It explains the source-weight structure of that comparison. It does not derive the primitive inverse-square acceleration kernel from a scalar wave equation. Degenerate roots with zero derivative lie outside the formula.

Arbitrary bound-state spectra without an assembly, boundary and exposure map; generic unassigned solitons; physical-wavefunction substitutions; and phase shifts without flux/event balance are explicitly rejected as sufficient inverse clues. The useful information is the controlled constraint, not the familiarity of the solution.

### 17.2. Public detector records and hidden histories

A public detector dataset can support measured event quantities while leaving microscopic source and medium histories inaccessible. The source's CERN photon intake manifest specifies an intended local mirror, extraction environment, event selection, endpoints and row-specific provenance. Its frozen outcome is verification-incomplete, with the local mirror absent in that manifest.

A dataset URL, provider checksum or complete extraction plan is not the retained local artifact. Conversely, obtaining that artifact would not automatically reveal source depletion, every angular-momentum exchange, sea state or an independently measured photon frequency. Each required row needs evidence appropriate to that quantity.

An explicit zero channel is justified only when the channel is absent under the declared event model and support. It cannot replace an unmeasured, inaccessible or out-of-window contribution. Synthetic source, receiver or path identifiers likewise cannot establish physical identity. This distinction prevents observational availability from being mistaken for a fully resolved underlying history.

## 18. Inferring structure from observations

### 18.1. Roles, constraints and nonuniqueness

An experiment distinguishes a source, a traveling carrier, nearby matter, several environmental scales, a receiver and a boundary. These are roles in a history. One assembly can occupy more than one role, and the distinction does not introduce a different primitive ontology for each. Direct interaction, essential sea mediation and mixed interaction remain competing explanations until a common history and measurement discriminate them.

An inverse requirement consists of an observable and its uncertainty, the transformations under which it is compared, its controlled parameter dependence, and the identities and accounts that must persist through those comparisons. Admissible constructions lie in the intersection of these requirements under fixed rules. Changing a receiver, environmental response or identity assignment separately for each datum prevents that intersection from testing one construction.

Inventory, recurrence, transformation behavior, spatial exposure, response rank, reaction basins and environmental dependence provide different clues. None generally determines a unique geometry. A two-channel optical response does not count constituents. Three independent flavor phases do not establish three spatial lobes. A frequency ratio does not establish a topological winding without a valid return map.

The inverse problem must also retain the distinction between a measured output returning, a symmetry-reduced shape returning and a complete delayed history returning. A projection can hide an evolving coordinate; a quotient can remove a physical identity if its declared symmetry is too large. Finite-history return is itself conditional on the history domain and cannot certify an unexamined infinite past.

### 18.2. Motion, rank and mass response

Circulation, breathing, precession, nutation, twist, traveling phase, permutation, beats, intermittent return and event cadence can all contribute temporal structure. A line in a measured spectrum does not choose among them. Formation, recurrence, propagation, transition gaps and escape likewise define different inverse time scales. Identifying all of them with one orbital period discards potentially decisive information.

Response ranks are effective constraints: two photon transverse channels; two spin-analysis outcomes; an observable distinction between an ordinary rotation and a nontrivial lifted frame cycle; three color labels with eight traceless operators; three neutrino modes with two independent gaps; and the scalar and vector polarization patterns. Their recovery requires the correct transformation and measurement rules as well as the count. The equality of an operator-space dimension to eight does not imply eight elementary constituent objects.

The proposed mass-response grammar couples internal bookkeeping to a positive environmental response and a structural exposure. Schematically it has the form

$$
m_{\mathrm{tr}}\sim\alpha_m E_{\mathrm{internal}}\,\operatorname{tr}(Z_A M_{\mathrm{sea},+}).
$$

Here the normalization, dimensions and positivity of the structural factor $Z_A$, the sea response $M_{\mathrm{sea},+}$ and the conversion $\alpha_m$ are obligations. This is a constitutive hypothesis, not an established microscopic mass law. Stable rest masses, conjugate masses, generation ratios, photon energy–frequency relations, wavelength, action, inverse-mass length scales, translation phase, thresholds, running couplings and the charged-lepton mass relation constrain different parts of that hypothesis. Agreement with one does not define the others.

### 18.3. Isotropy with a persistent oriented response

For a nonzero second-moment tensor $M$, an anisotropy diagnostic is

$$
\Delta_{\mathrm{iso}}=\frac{\left\|M-\frac{\operatorname{tr}M}{3}I\right\|_F}{\|M\|_F}.
$$

The Frobenius norm measures the size of the traceless part relative to the whole tensor. The diagnostic abstains at $M=0$. An approximately isotropic scalar response can coexist with an oriented current or frame response, but both must be obtained from the same preparation and averaging window. Randomizing an ensemble's orientation does not prove isotropy of an individually prepared object. Rapid motion by itself does not prove uniform orientation sampling.

The candidate explanations are a highly symmetric static support with a separate frame, dynamical orientation averaging, cancellation of anisotropic scalar contributions while oriented currents add, or a derived compensating sea response. These are alternatives to discriminate. A circulation-based effective magnetic moment also needs its own response tensor. For a charged effective object one may compare with

$$
\boldsymbol\mu=\frac{q_{\mathrm{label}}}{2m_{\mathrm{obs}}}\,G\mathbf J,
\qquad G\longrightarrow2I,
$$

as a recovery target. It does not describe a neutral object's nonzero moment by setting its charge label to zero. Neutral moments require an independently exposed internal-current account. Conjugate objects, generations, proton–neutron comparisons, charged scalar–fermion comparisons and driven versus static response therefore test more than one scalar normalization.

### 18.4. Universal rules and scale-dependent response

The proposed coupling grammar separates source preparation, exposure, propagation and action response. Under one frozen background, changing the probe scale is allowed to change a response kernel or cross a physical threshold; it is not permission to refit branch identity, charge normalization, action conversion, propagation speed, density or delay independently at each scale. A probe scale is not automatically a constituent radius.

Electric universality, electromagnetic running and moments, weak flavor mixing, strong running and confinement, and scalar response to internal changes are distinct tests. Charge quantization alone neither selects six sites nor derives a generation structure. An anomaly comparison does not specify a morphology, and unification of effective couplings remains an optional explanatory target until the underlying response law supports it.

## 19. Symmetry, flavor and relational measurement

### 19.1. Family coordinates and noncommuting operations

Color change, weak transitions, isospin comparisons, generation change, excitation and conjugation constrain which coordinates may change and which spectators must persist. Sharing a family rule is weaker than sharing a literal history identifier. Isospin comparisons also do not impose exact equality of observed masses.

Composition tests compare rotation with color change, generation change with charge and color labels, conjugation with parity, color closure with constituent changes, weak transitions with spectators, and rotation with exchange. Their domains matter: a projection onto a singlet is not an invertible group action. When two physical operations fail to commute, the difference must appear in the event or response record. Noncommutation cannot excuse a missing identity or account.

A local charge index may be written $q=q_0\kappa_Q$, where $q_0$ is universal and $\kappa_Q$ is discrete on a declared admissible chart. Local constancy requires that chart and its continuity assumptions. Inventory imbalance, topology, exposure eigenclasses, phase-permutation classes and composite constructions are candidate realizations; no one is derived by the notation. Baryon and lepton bookkeeping require additive, conjugation-sensitive provenance distinct from charge, color and generation. A neutral object need not have zero baryon or lepton label, and a confined fractional role does not demonstrate an isolated fractional-charge object.

Composite angular response includes internal motions, relative frames, orbital or corridor contributions and any included sea response. A product of one-dimensional support, frame, flavor, color and corridor characters is justified only when that factorization has been established. Otherwise exchange acts on a joint state. Pion–rho, nucleon–delta, identical-flavor baryon and proton–neutron comparisons constrain different parts of this construction; aligned arrows do not determine spin, parity or exchange behavior.

### 19.2. Flavor information that simple labels cannot carry

Consider the labels $111$, $110$ and $100$. Adjacent Hamming distances are both one. Any response that depends only on that distance must assign equal adjacent overlaps. It cannot recover unequal adjacent mixing entries. This is a no-go result for the distance-only response, not for using those labels inside a richer construction.

An ordinary phase assignment on a connected tree has no gauge-invariant cycle phase: phases can be removed successively from the leaves. Its cycle count is $E-V+1=0$, with $E$ edges and $V$ vertices. A three-node chain therefore needs additional closed routes or history structure to carry a nonremovable interference phase. This does not rule out all possible CP-sensitive histories.

For two or more response routes with fixed nonnegative magnitudes $w_\gamma$, split each phase into conjugation-even and conjugation-odd parts. If conjugation reverses only the odd parts, expansion of the squared sum gives

$$
P-P_C=-4\sum_{\gamma<\delta}w_\gamma w_\delta
\sin(\Delta\phi_{\mathrm{even}})\sin(\Delta\phi_{\mathrm{odd}}).
$$

Thus both kinds of relative phase are needed for this particular asymmetry. The response amplitudes and their sum still require derivation; they are not primitive probabilities imposed on architrinos.

A complete unitary change of basis preserves a universal neutral response: $U^\dagger(nI)U=nI$. Likewise a common loop response cancels an off-diagonal flavor sum when complete unitarity gives $\sum_k U_{\mu k}U_{ek}^*=0$. A truncated overlap matrix need not be unitary and cannot invoke that cancellation automatically. The same construction must distinguish ordinary muon decay from rare charged-lepton flavor changes, capture from conversion, charged-current mixing from leading neutral-current flavor conservation, loop effects from leading nulls, weak CP effects from static dipole limits, and neutrino oscillation from lepton-number-changing events.

Exactly three robust classes require more than three named candidates. One must identify stable components or physical modes, preparation and detection, separation margins and the exclusion of an accessible fourth class. Topological indices, basins, modes, phase-lock or permutation structure, and support tiers are competing mechanisms. Cross-sector matching must follow from a common rule rather than data-dependent relabeling or freely adjusted shielding.

### 19.3. Orientation, parity and response rank

Helicity is the sign of the effective angular momentum projected onto nonzero translation momentum. It is observer-dependent for a massive effective object and undefined at zero momentum. Physical weak exposure must instead be defined using the source, object and apparatus directions. Reprojection, physical motion reversal, a rest preparation, parity, event conjugation and the nearly massless limit provide different controls.

One candidate sign chart separates geometric orientation $o$, polarity-assignment sign $c$ and their product $\chi=oc$. In that chart conjugation reverses $c$ and $\chi$ while preserving $o$; parity reverses $o$ and $\chi$ while preserving $c$. Circulation and the lifted spinor sheet remain separate data. These are declared transformation rules, not a proof that the physical history implements them. Forward-causal time reversal cannot be reduced to reversing the absolute clock while keeping the rest of the history fixed.

A three-dimensional response matrix decomposes into scalar, antisymmetric and symmetric traceless parts:

$$
K=\frac{\operatorname{tr}K}{3}I+\frac{K-K^T}{2}
+\left(\frac{K+K^T}{2}-\frac{\operatorname{tr}K}{3}I\right).
$$

The axial object associated with the antisymmetric part is not a polar vector. A scalar representation is not a matrix of rank zero. Similarly, a Gram matrix of evolved response rows yields a channel rank only after its inner product, units and threshold are fixed. Spatial transverse and longitudinal projectors require an actual map from those rows to spatial components.

An electroweak-like mass comparison would require a generalized problem $Hv=\lambda G_{\mathrm{kin}}v$ with a positive kinetic metric, a valid equilibrium and an action normalization. The target eigenvalues $0,m_W^2,m_W^2,m_Z^2$ do not follow from an unnormalized Hessian. Two free transverse photon channels, three massive vector polarizations, scalar parity and excluded channels remain separate effective obligations.

### 19.4. Exchange, Bell constraints and contextuality

Identical unordered endpoints can result from no exchange, one exchange or a double exchange. An endpoint-only model cannot distinguish their history classes. Planarity alone does not establish bosonic statistics; even the mathematical classification of planar exchanges differs from that in three dimensions. Packing and exclusion also do not derive the complete fermionic exchange law.

A complete delayed history does not automatically evade Bell factorization. If the model still has

$$
P(a,b\mid x,y)=\int P_A(a\mid x,\Pi)P_B(b\mid y,\Pi)\,d\rho(\Pi),
$$

with a preparation measure independent of the settings $x,y$, it remains in that factorizing class. Calling $\Pi$ a richer history changes none of those premises. A proposed recovery must identify which premise actually fails while preserving the tested marginal and no-signaling constraints and the permitted causal timing. The source's suggestion of finite-speed coordination and its prohibition on otherwise unavailable detector-to-detector transfer therefore leave an unresolved mechanism requirement.

Contextuality imposes a further joint-consistency burden. In the Mermin–Peres comparison, compatible products of dichotomic observables obey a classical overall sign constraint that differs from the quantum target. Recovering separate contextual marginals is insufficient if no common operation and compatibility rule connects them. These are effective comparison constraints, not instructions to insert quantum probabilities into the substrate.

## 20. Reactions, formation and finite-lived structures

### 20.1. Identity-preserving surgery

A restricted six-site catalogue assigns $Q/e=(n_+-n_-)/6$ and labels generation patterns by the number of active binary roles. Those are candidate bookkeeping conventions. They do not derive six-site necessity, free-particle identity or every neutral weak exposure from literal polarity counts.

An admissible event needs a bijection between incoming identities plus any declared pool and outgoing identities plus the remnant. Association, dissociation, relocking, exceptional-axis changes, weak triad changes, planar release or capture, and backreaction are proposed operations on this account. The existence of a bijection is necessary; it does not establish a dynamically reachable path or its measure.

Scattering poles, resonant exits, factorization residues, total channels and excluded spurious poles must refer to the same intermediate basin or corridor. A formal virtual line is not an added substrate object. An ideal boundary prescription such as $i0$ does not specify a finite physical width.

For two photons the effective invariant-energy comparison is

$$
s=2E_1E_2(1-\cos\theta)\geq4m_e^2c_\gamma^4.
$$

Here $s$ has units of energy squared. Collinear photons give zero; opposite directions maximize it at fixed energies. The threshold is a continuous kinematic boundary, not evidence of a fixed microscopic jump. Two-photon, material-assisted single-photon and slowly varying strong-field precursors may approach the same product basins through different histories. Each requires the identity pool, recoil and angular accounts, conjugate products and actual access to those basins. The reverse annihilation comparison is a separately prepared forward-causal event with its environment and wakes; reversing a bookkeeping arrow is insufficient.

### 20.2. Suppression, exclusion and normalized measures

A small channel may reflect disconnected support, cancellation, zero exposure, a narrow admitted region, low preparation measure or absence of a product basin. These mechanisms predict different controls. Allowed, suppressed, zero and stable-over-window outcomes must therefore remain distinct.

Uniform suppression cannot produce an asymmetry in a separately normalized outcome distribution. If $w_R=\zeta w_L$ over the same support, with a constant $\zeta>0$, division by the total weight removes $\zeta$. A zero factor removes the support entirely; it is a different case. Absolute unnormalized rates can retain the factor, but that does not rescue a claim about normalized angular or flavor distributions.

Electron and proton stability, confinement, excluded fractional charges, weak parity, pion branching, static dipole limits, exchange exclusion, absent free longitudinal photons and strong flavor constraints consequently impose different null requirements. A singlet label does not prove confinement; a CP-sensitive loop does not justify a static dipole; a phase-dependent weak response does not establish its normalization.

### 20.3. Six clocks and a well-defined lifetime

Formation, internal recurrence, coherent relative-phase transport, first exit, ensemble dispersion and environmental or detector broadening are six distinct clocks or time-dependent diagnostics. Let $A$ be a candidate basin, $Q_A$ its identity and account predicate, $\Phi_T$ the finite-history evolution and $\mu_0$ a finite prepared measure. A positive hold duration $\Delta_{\mathrm{hold}}$ can retrospectively certify a time $t_0$ when a successful persistence interval began. The completion time of that interval is instead $t_0+\Delta_{\mathrm{hold}}$.

The source calls the infimum of qualifying interval starts “completed formation.” For a positive hold those conventions differ. A lifetime measured from the certified onset exceeds one measured from the end of the same hold by $\Delta_{\mathrm{hold}}$. The infimum also needs an attainment or boundary convention. Neither the terminology nor the displayed infimum settles it. Comparisons below require one explicitly common convention.

Condition on a formed subset $F_A$ with $\mu_0(F_A)>0$. Survival requires membership in $A$ at every intermediate time since the declared formation timestamp, not only at the final endpoint. Its normalized measure is $S_A(T)$. Where it is differentiable and positive, the hazard is

$$
\lambda_A(T)=-\frac{d}{dT}\log S_A(T).
$$

An approximately constant hazard over a specified interval supports an exponential effective description there. It does not postulate exponential decay for every history. Conditioning on a successful hold can itself create a survivor plateau when age is measured from the hold's onset.

First-exit measures assigned to daughter corridors precede detector response. Branching fractions need a complete partition or a declared overlap rule, including surviving and unclassified histories in finite windows. A total exit rate without daughter identities does not determine a reaction geometry.

### 20.4. Coherence, lines and competing formation times

For two relative phases, a coherence diagnostic is

$$
C_{ab}(T)=\left\langle e^{i[\theta_a(T)-\theta_b(T)]}
e^{-i[\theta_a(0)-\theta_b(0)]}\right\rangle.
$$

Its magnitude can decrease through dispersion, environment, packet separation, source bandwidth or detector averaging while the assembly survives. Its argument is an accumulated phase, not a rate. An angular-rate diagnostic requires differentiating an unwrapped argument on a regular interval where $C_{ab}\neq0$; converting to cycles introduces $2\pi$. A mixed preparation need not identify one underlying phase gap.

Observed spectra combine an underlying spectrum with environmental preparation and a detector kernel. A conditional integral over those variables is more general than a translation-invariant convolution. No such kernel is derived merely by writing the integral.

The comparisons must distinguish stable electrons from unstable charged-lepton relatives, coherent neutrino transport from rare detection, nested atomic basins from broadened lines, formed hadronic parents from damped oscillators, vector transaction corridors from scalar response, and proton stability from unstable singlet resonances. In the top-quark comparison, the absolute exit time and the color-singlet formation time must be evaluated on one production history. Independently tuned clocks cannot establish that the top exits before a singlet forms. A Higgs-width inference is additionally fit-dependent and provides a weaker direct lifetime clue than an unqualified clock measurement.

## 21. Topology, support and candidate morphologies

### 21.1. Three protections and their validity domains

Causal-root counts, signed degrees and phase-return degrees describe different structure. At an ordinary generic fold a root pair can appear with opposite orientation signs, changing the count while preserving the signed degree. That rule requires the generic fold and a valid chart. A phase-degree pair called $c_1$ in the source is not thereby a first Chern class; the relevant bundle and curvature construction would still be needed.

A framing relation such as $\mathrm{Lk}=\mathrm{Wr}+\mathrm{Tw}$ requires a valid closed framed ribbon and positive separation. Visual crossings, geometric chirality, circulation and spinor parity are distinct. Point constituents do not become impenetrable because a drawing assigns them thickness. A frequency ratio also does not establish a return winding without the retained history.

Topological protection preserves an invariant within its collision, closure and framing domain. Dynamical protection returns nearby compatible histories toward a branch. Barrier protection bounds every admissible exit by a positive action or derived effective-energy barrier. Prescribed recurrence supplies none of these by itself. The source reports no Standard Model assembly carrying all three on one retained record.

### 21.2. Causal geometry does not classify spatial support

Equal causal counts and degrees are not established as a complete classifier of component knots and links. Conversely, fixed unparameterized curves can carry different cadences and causal-root geometry. Unlink, square-knot, Hopf, Whitehead and Borromean examples are proposed discriminating controls, not already established matched physical counterexamples.

Ordinary linking terminology must first have disjoint closed components. Equal-radius orthogonal circles about one midpoint intersect; opposite members may traverse the same support; phase shifts need not separate unparameterized curves. A translating helix remains open until an appropriate return or closure is justified. Avoiding simultaneous collisions does not make overlapping traced supports into disjoint link components.

For a nonnegative weighted covariance of centered trajectories,

$$
C_W=\sum_a\int w_a(T)[X_a(T)-\bar X(T)][X_a(T)-\bar X(T)]^T\,dT,
\qquad p_W=\frac{\lambda_{\min}(C_W)}{\operatorname{tr}C_W},
$$

the diagnostic requires a positive trace. Positive semidefiniteness gives $0\leq p_W\leq1/3$. Zero means the included relative coordinates lie in a common null plane almost everywhere on positively weighted support. Extending that statement pointwise needs continuity and temporal support of the weights. Because the centroid moves, it does not necessarily describe one fixed affine plane containing the absolute swept curves.

For example, the closed geometric curves $X_\pm(T)=(\pm r\cos T,\pm r\sin T,h\sin2T)$ have a planar centered pair and hence $p_W=0$, while neither absolute curve lies in one affine plane for positive $r,h$. Independent Fourier coefficients in a putative plane equation force its normal to vanish. This is a geometric counterexample to the stronger planarity inference, not an EOM solution or a disjoint-link construction. A positive $p_W$ similarly establishes three-axis spread of the measured relative coordinates, not volume filling or impenetrability.

The Gauss integral classifies pairwise linking only for valid disjoint closed curves. A numerical enclosure must isolate an integer and preserve separation. Even then pairwise linking is incomplete, which is why more discriminating link controls remain necessary.

### 21.3. Six proposed families and their exclusions

The inverse programme retains six broad candidate families: a framed retained rotor; scalar breathing or deformation; a coherent network of clocks and permutations; a propagating transverse phase carrier; a confined composite or corridor network; and a metastable transaction or escape corridor. They organize competing constructions and event connections rather than introduce a proved taxonomy of particles.

A rotor needs independently tracked polarity, circulation, frame and exchange histories; an ordinary one-rotation return of every physical row defeats a claimed nontrivial lifted return. A scalar deformation needs invariant response without compulsory angular leakage and with an actual radial or constitutive referent. A clock network needs at least two independent gaps and coherent history, rather than one common phase with fixed offsets. A transverse carrier needs source-to-receiver phase, two transverse channels, admitted helicity and no inappropriate free longitudinal or rest branch. A composite network needs retained constituents, color closure, strain, form factors and exits; closure alone does not prove confinement. A transaction needs formed carriers, finite survival, product routing and bounded participation of the environment.

Release and capture of transverse packets, constituent association, weak or strong network reconfiguration, and repartition into conjugate pairs are proposed edges between these families. Each needs a derived event history. A visual transformation of shapes gives no evidence of the event's probability or reachability.

The source excludes stronger interpretations: no retained Standard Model topology is certified; prescribed charts are not solutions; a near-photon neutrino residual remains referent-pending without a retained photon base; support dimension does not determine statistics; contra-rotation alone does not establish a photon; an axis or frame determinant does not establish spinor closure; a closed corridor graph does not prove confinement; and lifetimes or oscillation probabilities do not uniquely select an internal motion.

## 22. Local charts for framed candidate assemblies

### 22.1. A functional blueprint before a parts list

The proposed fermion blueprint combines a causal-root graph, a carried frame, a physical history lift, signed counterflows, three equivalent internal ports, an independent generation coordinate, distinct charge and weak exposures, an identity-return permutation, association and event ports, and explicit environmental histories. These are inferred functions; the proposed counterflow cage, nested cycle network and permutation-return network are guessed implementations. One trajectory can supply several functions, and many constituents can realize one function. No fixed parts count follows.

The conjunction is demanding: scalar isotropy with an axial response; visible ordinary-rotation return with a nontrivial physical lifted history; independent charge, moment and weak posture; equivalent color-facing ports; exactly three robust generation classes; nontrivial overlaps and phases; and identity-preserving reactions. Precision fits cannot substitute for complete rotation and permutation tests, independent reversal behavior, autonomous lift, generation exhaustion, observer-reprojection controls, an actual retained basin, an allowed transition with a nearby null, or direct/sea comparisons. A simpler retained construction meeting all the same constraints would challenge the claimed necessity of this particular blueprint.

### 22.2. One triad, its representation and its tangent

The first chart uses three declared right-handed orthonormal orbit frames $(u_a,v_a,n_a)$, a common axial displacement $h$, radius $\rho>0$, circulation sheet $q\in\{-1,1\}^3$ and lifted phases with reference $\phi_{\mathrm{base}}=(0,2\pi/3,4\pi/3)$. Write

$$
b_1=\frac{(1,-1,0)}{\sqrt2},\qquad
b_2=\frac{(1,1,-2)}{\sqrt6},\qquad
\phi=\phi_{\mathrm{base}}+\vartheta\mathbf1+\eta_1b_1+\eta_2b_2.
$$

The two basis vectors span the zero-sum plane. Means and basis dot products invert this phase split on a declared angular branch. A regular ordered frame permits a unique rigid presentation with center zero and frame identity. That removes duplicate descriptions of the augmented record, not persistent identities, conjugation, circulation sheets or physical port permutations.

For port $a$, define $r_a=u_a\cos\phi_a+v_a\sin\phi_a$ and $t_a=-u_a\sin\phi_a+v_a\cos\phi_a$. With $d_a=hn_a+\rho r_a$, the six labeled positions are

$$
X_{a,\sigma}=C+\sigma d_a,\qquad \sigma\in\{-1,1\}.
$$

The endpoint sign $\sigma$ is not primitive polarity. On fixed frames and discrete sheets, pair means and differences recover the center and displacements, and axis projections, transverse norms and lifted angles recover the continuous rows. Bare positions do not recover circulation, cadence or an arbitrary frame history.

For a moving local frame with skew angular matrix $\Omega_a$, direct differentiation gives

$$
\dot d_a=\dot h n_a+h\Omega_an_a+\dot\rho r_a
+\rho\Omega_ar_a+\rho\dot\phi_a t_a,
\qquad V_{a,\sigma}=\dot C+\sigma\dot d_a.
$$

The source's phase-rate family $\dot\phi=\omega q+\zeta$, with $\omega>0$ and $\mathbf1^T\zeta=0$, is restricted. It imposes $\sum_a\dot\phi_a=\omega\sum_aq_a$ and does not include every rate vector with the same signs. For example $(a,a,-3a)$, $a>0$, has signs $(+,+,-)$ but a negative sum, whereas that sheet's prescribed sum is positive.

A local phase chart also need not be invariant under literal permutation of lifted phases. At zero relative displacement and common phase $-\pi/3$, the phase vector is $(-\pi/3,\pi/3,\pi)$. A cyclic permutation can move $\pi$ outside the first port's open branch. A compensated action, transformed orbit frame or adjacent chart may resolve this; cyclic symmetry of the residual disk alone does not specify it.

### 22.3. Composition and internal deformations

The second chart joins two six-member triads with full relative displacement and orientation, two phases, distinct circulation signs and a nontrivial port permutation. With the first frame as reference, the relative rotation has local coordinates $Q=\exp([w]_\times)$ for $\|w\|<\pi$. The boundary requires another chart. Relative pose and both phases survive the common rigid quotient; a relative sign product cannot replace two independently retained signs.

Differentiation of this rotation uses $\dot Q Q^T=[J_l(w)\dot w]_\times$, where

$$
J_l(w)=I+\frac{1-\cos\theta}{\theta^2}[w]_\times
+\frac{\theta-\sin\theta}{\theta^3}[w]_\times^2,
\qquad \theta=\|w\|.
$$

The continuous value at zero is $I$. This positive-sign convention follows from integrating the rotated infinitesimal generator in the differential of the exponential. It is a coordinate identity, not a binding law. Exact conjugate symmetry can cancel charge, current and weak exposure simultaneously, so a charged composite interpretation still needs a derived sector-specific asymmetry or an independently justified charge-facing account.

The third chart permits separate axial, radial and phase rows, each decomposed into a mean and two zero-sum coordinates. Its six relative continuous coordinates do not select three modes. Six return-permutation sheets record possible labeled comparisons without demonstrating that evolution realizes them. An exactly-three generation interpretation needs isolated modes or basins with the same charge, color and weak representation, appropriate return characters and exclusion of other admitted classes.

The fourth chart combines a six-member framed triad with a particular twelve-member counterflow module. Its inventory is eighteen, and its equal-member center is $(C_F+2C_C)/3$. The midpoint would be incorrect. Its relative displacement and rotation, inherited component phases, variant tags and discrete sheets form a product chart. That product establishes neither association nor a closed exchange loop: the six- and twelve-member components are unequal tagged objects. A suggested component-exchange history must close the actual labeled record rather than borrow the symmetry of identical components.

### 22.4. Exact guards do not certify an unselected history

For a nonempty interval $I$, define the exact speed and separation margins by

$$
S[I]=\sup_{T\in I}\max_i\|V_i(T)\|,
\qquad d[I]=\inf_{T\in I}\min_{i<j}\|X_i(T)-X_j(T)\|.
$$

A selected subfield method requires $S[I]<1$ in normalized $c_f=1$ units; collision clearance requires $d[I]>0$. These are uniform interval conditions. On noncompact domains pointwise strict inequalities need not give strict supremum or infimum margins. On a compact interval, continuity and exclusion of every coincidence give a positive attained minimum. Samples do not establish that exclusion.

For antipodal ports with lengths $R_a=\|D_a\|$, all pair distances reduce to same-port $2R_a$ and cross-port minima

$$
\sqrt{R_a^2+R_b^2-2|D_a\cdot D_b|}.
$$

This covers fifteen pairs in a six-member triad. Two triads have $15+15+36=66$ pairs. The eighteen-member composite has $15+66+72=153$. Relabeling cannot remove cross-component pairs. Optional subtraction of declared geometric radii is a conditional control, not evidence for primitive hard cores.

Triangle and operator-norm inequalities give sufficient speed bounds from translation, shape rates, frame rates and angular rates. Failure of a conservative bound need not violate the exact speed condition because vector contributions can cancel. Conversely, writing an exact functional supplies no evaluated history or interval certificate.

### 22.5. Doubled return and motion fingerprints

An order-two nontrivial loop in an admissible physical configuration space is one proposed carrier of doubled return. A nondegenerate $SO(3)$ frame has the familiar relevant loop structure, but its loop must survive the full configuration space and physical quotient, affect a non-gauge readout and connect to the angular, exchange and apparatus records.

An order-two element of the base loop group is not necessary for every doubled readout. An integer winding $n$ on a circle can act on a two-sheet readout by $n\bmod2$: one winding changes the sheet and two restore it, although the winding-one loop has infinite order. This abstract counterexample weakens the source's claimed universal minimum to an order-two action on the readout. It supplies no physical fermion mechanism. Contractible topology, silent noncontractible topology and a changed readout that fails to restore are three different failures.

A useful fingerprint combines scale, traceless second moment, kinematic circulation, ordered-frame rate, twist, exposure, spatial phase, identity permutation, active roots and exits, together with spectral cross-phases and output/shape/history return residuals. Windows, normalization, quotient and frequency conventions must be common. Zero traceless second moment does not prove spherical shape: six equal points on the coordinate axes have the same isotropic second moment as a spherical shell. Zero total signed circulation also need not mean that no constituents orbit; opposite orbiting pairs can cancel. The richer fingerprint is intended to discriminate precisely these ambiguities.

## 23. Electric and magnetic recovery from one history

### 23.1. An environment distinct from its receiver

A provisional joint map assigns effective electric and magnetic readouts to source, sea and boundary histories. A receiver has a separate response map. If two receiver classes require different definitions of the field for the same environment, the proposed field is not yet receiver-independent. A direct, sea and mixed partition is a diagnostic decomposition within a declared weak regime, not a universal additive constitutive law.

Candidate sea variables include occupancy, cadence distribution, drift, polar exposure, axial circulation, trace-free alignment, strain or response memory and incoming boundary history. None is an effective electric field, magnetic field, charge density or metric by definition. Every retained variable must be computed from resolved histories or bounded as absent.

For matched opposite-polarity diagnostic receivers at the same event, define

$$
A_{\mathrm{even}}=\frac{A_++A_-}{2},\qquad
A_{\mathrm{odd}}=\frac{A_+-A_-}{2},\qquad
A_\sigma=A_{\mathrm{even}}+\sigma A_{\mathrm{odd}}.
$$

The proposed electric foothold is the polar, polarity-odd contribution, including any derived sea modification. It is not the identity $E_{\mathrm{eff}}=A_{\mathrm{odd}}$. One actual architrino receives its own hit sum; it does not perform this comparison or experience an additional effective-field cause.

Continuous causal-isochron emission can give a stationary coarse readout through successive receptions of a stationary source history. Isochrons are provenance geometry, not interacting material sheets. Addition of contributions is exact at fixed histories, roots and receiver events; superposition of dynamically interacting assemblies remains a recovery target because their paths, roots and environment can change.

### 23.2. Translation, internal response and tomography

For $N$ persistent members, the source-tagged average and internal residual are

$$
A_{\mathrm{grp}}^{\mathrm{src}}=\frac1N\sum_a A_a^{\mathrm{src}},\qquad
a_{a,\mathrm{int}}^{\mathrm{src}}=A_a^{\mathrm{src}}-A_{\mathrm{grp}}^{\mathrm{src}},
\qquad\sum_a a_{a,\mathrm{int}}^{\mathrm{src}}=0.
$$

This is an equal-identity kinematic decomposition, not a center-of-mass law. A matched neutral pair in a uniform polarity-odd drive can have zero leading centroid acceleration and nonzero separation drive $2A_{\mathrm{odd}}$. Gradients, unequal exposure, causal roots and phase offsets alter the cancellation and provide geometric information. Source-only increments do not describe autonomous evolution without the assembly's other contributions.

A noncancelling charge-facing set can supply translation while a paired core mainly deforms, but the algebra does not locate that set or prove that charge needs accessory constituents. A discrete exposure or history index could play the role. Weak deformation needs bounded scale, shape, phase, frame, root and basin changes; large internal speed alone is not protection, and primitive momentum is unavailable as its denominator.

Uniform and gradient electric-like preparations, uniform and gradient magnetic-like preparations, independent reversals, oscillatory drive, mixed controls and amplitude continuation probe different response rows. Their first and second derivatives are diagnostic Jacobians and Hessians extracted from matched fixed-law histories. They are not primitive susceptibilities. A resonance peak need not be an orbital cadence, a two-spot output need not reveal a pre-existing binary arrow, and a mixed response can originate in apparatus or material structure.

### 23.3. What would distinguish direct and sea response

The proposed comparison begins with five prescribed-record cases: source absent; direct source with sea transmitters omitted; source with frozen reference sea; source with responsive sea; and source removal followed until the direct history clears. At common receiver events, the responsive-minus-frozen polarity-odd difference measures participation inside the candidate model. It does not establish physical necessity.

Necessity requires a later fully coupled evolution in which suppressing a derived sea response removes a required behavior restored by the unchanged full model. The shared requirements include sign and parity, sourced divergence, stationary curl and range, boundary storage and relaxation, receiver-independent identity, translation versus deformation, neutral gradients, dynamic polarizability, nonlinear continuation and pair backreaction. No family passes this matrix in the source. Its missing retained responsive sea and receiver histories cannot be replaced by an authored constitutive knob.

A scalar sea change alone cannot carry a polar direction, though source geometry can supply direction while scalar sea variables change magnitude. Neutral-sector common and differential accelerations similarly distinguish bulk translation from internal polarization without changing net charge. Geometric pro/anti orientation is a separate label.

### 23.4. Common carrier, skew response and signed current

One proposed common carrier is an oriented finite history two-chain whose faces retain identities, roots, acceleration weights, roles, area and boundary edges. With a fixed smoothing and normalization, its time–space and space–space components can define effective electric and magnetic charts. The conditional identity relating the exterior derivative of that chart to the chain boundary exposes unmatched edges. It supplies neither the faces from evolved histories nor the sourced constitutive law, impedance, screening or propagation spectrum.

A weak velocity-linear group response $\delta A=\sigma K V+O(\|V\|^2)$ obeys a no-work target only if $V^TKV$ has no leading quadratic term for every sufficiently small $V$. Writing $K=S+A$ with $S^T=S$ and $A^T=-A$ gives $V^TAV=0$, so the target forces $S=0$. Thus the leading kernel is skew. This is a derived constraint on an effective response, not a primitive magnetic force. A symmetric contribution requires its separate energy-transfer account.

For a declared center and exposure convention, the candidate signed current moment is

$$
m_{\mathrm{cur}}=\frac12\sum_a e_a\sigma_a y_a\times v_{a,\mathrm{int}}.
$$

With constant exposure and signed angular velocities about a common fixed oriented axis, circular tracks centered on the full assembly center give a mean proportional to $eR^2(\omega_+-\omega_-)\hat n$. Same-sense opposite polarities cancel when their signed angular velocities are equal and their exposure and radius are matched; opposite senses can add. The centering condition is essential: an isolated equal-weight pair described about its own moving midpoint has $y_-=-y_+$ and $v_{-,\mathrm{int}}=-v_{+,\mathrm{int}}$, so its opposite-polarity internal signed moment cancels identically. Transport about a larger assembly center is a different contribution.

At one event, a skew comparison kernel also gives group and relative responses proportional to $(1-s_v)KV_+/2$ and $(1+s_v)KV_+$ when $V_-=s_vV_+$. Equal velocities cancel the group row; opposite velocities cancel the relative row. Whole-cycle averages can differ from these instantaneous rows. Neither relation establishes a physical moment normalization or the nontrivial history lift needed for a fermion.

## 24. Visibility, contradiction and accessory response

### 24.1. Exposed moments do not reveal the whole object

Static multipoles, exposed currents, ordered transport and detector outcomes are distinct maps. A dipole changes with origin when total exposed charge is nonzero. A vanishing static dipole can coexist with nontrivial transport, but neither fact alone recovers CP behavior.

The effective Fourier comparison $F(q)=\int e^{iq\cdot x}\rho_{\mathrm{exp}}(x)\,d^3x$ gives $1-q^2\langle r^2\rangle/6+O(q^4)$ only under its normalized isotropic convention and suitable moment regularity. A neutral signed exposure cannot be normalized by a zero total integral; a signed second moment need not be nonnegative. A finite second moment alone does not guarantee the displayed fourth-order remainder.

Pointlike response to finite resolution, a low-transfer slope, diffraction zeros, electric versus magnetic profiles, neutral electric structure, angular anisotropy, elastic persistence, inelastic thresholds, high-transfer correlations, jets, decay angles and flight lengths constrain different maps. Magnitude-only data lose phase, and no one such curve uniquely determines a knot or full assembly size. Whole-record covariance and more than one exposed channel are needed to reduce ambiguity.

### 24.2. Local visibility and finite inference

At a declared branch, the common derivative null space is the intersection of the kernels of all admitted source-to-detector derivatives. Adding probes can only shrink that local first-order space. A positive lower derivative bound on admissible non-gauge perturbations is useful, but does not by itself make the nonlinear map injective on finite changes.

For the elementary comparison $F(u)=u-u^2$, the derivative at zero is one while $F(1)=F(0)$. A finite-neighborhood inference therefore needs a remainder or injectivity estimate. For example, if the linear lower bound is $c\|\delta\|$ and the remainder is at most $L\|\delta\|^2/2$, the residual is bounded below by $c\|\delta\|-L\|\delta\|^2/2$ on that neighborhood. This qualifies the source's linear visibility claim without asserting a physical response law.

Similarly, forty-two information distinctions in the source do not prove forty-two independent continuous coordinates. Discrete sheets lack ordinary derivatives; derivative rank can vanish at critical points; distinct readout functions can depend on one parameter. A locally constant charge function and a varying response function can coexist on one interval. The stronger no-go for one monotonic nondegenerate scalar controlling several independently varying readouts has different premises.

### 24.3. Joint failures and evidence classes

Candidate viability concerns the joint intersection of requirements, not pairwise compatibility or a weighted score. The source's thirty-five pruning cores distinguish conditional contradictions from underdetermination. Their rejected shortcuts include distance-only flavor, labels without composed operations, charge-only moments, frequency-only geometry, snapshot statistics, threshold-only pair formation and history language that retains Bell factorization. Each rejection is limited by its stated premises; its proposed repair exposes missing information rather than demonstrating a repaired candidate.

Inventory, retention, motion, topology, symmetry, exposure, events and quantitative recovery remain separate pass, fail or abstain entries. Missing roots, identities, products or fixed-law provenance are failures, not parameters to refit. A rejected matter candidate can be reconsidered for another role only with an explicit change of claim.

Complete transformed-history siblings can test implementation covariance. They do not independently establish the kernel, nature or a retained particle. Likewise a wide difference enclosure containing zero demonstrates compatibility, not a small error or equality by itself. Enclosure completeness, width and tolerances must accompany any such comparison.

### 24.4. Accessories and the limits of one-way diagnostics

Six proposed accessories are associated identities outside the braid's own inventory, not necessarily outside its dynamic envelope. Their delayed acceleration contributions depend on actual transmitter roots, separation and line-of-action velocity. An accessory energy or inertial denominator is not part of the primitive kernel.

About an actual retained history, response can be separated into rigid motion, admitted branch changes and destructive transverse directions under a declared metric. Small raw acceleration is not uniformly sufficient for small transverse response without a bounded response operator: the abstract relation $\delta q=a/\varepsilon$ becomes large at small nonzero stiffness. This example is a logical limit, not a stability analysis of an unestablished braid. Conversely, large inputs can cancel in the relevant projection.

The alternatives are exterior symmetric polar shells, boundary shells, symmetric interiors, asymmetric exteriors and asymmetric interiors. Six polar sites can occupy the three positive and negative body axes, with seven polarity-count classes and distinct decorations. A proposed finite exterior annulus balances close-loading risk against distant cancellation, but no actual retaining annulus is established. A two-plus-four axial/transverse placement on the later eight-member candidate is another conditional geometry, requiring fourteen-member full-system evolution for six accessories.

The diagnostic order separates an unaccessorized retained braid, one accessory against a fixed braid, prescribed accessories driving braid response, mutually interacting accessories against a fixed braid, fully coupled evolution, and finally removal or transfer with classified braid recovery. The intermediate one-way cases cannot establish an accessory-dressed retained assembly. Shape and basin, roots, all pair clearances, association, full account partition, reaction provenance and every polarity stratum remain required on the complete system.

## 25. Counterflow with exact sector centering

### 25.1. A useful circular construction and its failure

Constant equal-magnitude opposite angular velocities $+\omega$ and $-\omega$, with $\omega\ne0$, on one circle make the relative phase advance at twice the individual rate. The two members meet twice per individual orbital period, once per relative-phase cycle. Parallel planes at offsets $\pm h$ replace coincidence by

$$
d^2=4h^2+4\rho^2\sin^2(\Delta\theta/2),
$$

but also separate opposite polarities axially. Two reversed dyads on unequal radii can cancel that mean axial dipole while their signed currents add. Within each axis the separation has the floor $\min(2|h|,|\rho_1-\rho_2|)$. Three identical modules on orthonormal axes give twelve members, eighteen within-axis pairs and forty-eight cross-axis pairs. The local floor says nothing about the cross-axis pairs or binding.

Identical cycle-averaged tensors of the form $\alpha I+\beta n_an_a^T$ sum to an isotropic second moment because $\sum_an_an_a^T=I$. Equal currents can point along the body diagonal. The averaging window, origin, exposure and phase-compatible history symmetry are essential. These identities do not imply all-order isotropy or a static dipole null.

The source's normalized circular example used radii 0.25 and 0.40, offset 0.20 and angular rates one. Its reported dense sampled clearance was 0.0706633508. A subsequent same-record projection audit found an almost vanishing mean dipole but dipole RMS 2.0866807207, a moving centroid and nonzero centroid-relative anisotropy. Thus the positive sampled clearance did not make the combined proposal viable. A later phase-grid compromise improved several sampled values without achieving simultaneous nulls. The old common-cadence realization remains demoted in the source.

Under equal exposure, nonzero common cadence, fixed orthogonal circular planes and exact stationary-centroid and dipole nulls for all time, each polarity's position sum must vanish. The complex circular basis is invertible: representative columns $(0,1,i\epsilon_1)$, $(i\epsilon_2,0,1)$ and $(1,i\epsilon_3,0)$ have determinant $1-i\epsilon_1\epsilon_2\epsilon_3\neq0$. Hence each axis's two phasors must cancel. Unequal magnitudes cannot; equal radii and opposite phase restore a shared counterrotating circle and its collision obstruction. This is a conditional two-ring no-go. Unequal derived exposure, additional tracks, noncircular or phase-varying motion, a compensating module or quantitatively tolerated leakage change its premises and remain unselected alternatives.

### 25.2. A phase-varying reconstruction

For each polarity choose three real coordinates $u,v,w$ and transverse resultants

$$
c_1=(0,v,w),\qquad c_2=(u,0,-w),\qquad c_3=(-u,-v,0).
$$

Their sum is zero. For a resultant of length $\kappa$, let $e=c/\kappa$ and $t=n\times e$. On the strict triangle domain $|\rho_1-\rho_2|<\kappa<\rho_1+\rho_2$, define

$$
\alpha=\frac{\kappa^2+\rho_1^2-\rho_2^2}{2\kappa},\qquad
\beta=\sqrt{\rho_1^2-\alpha^2},
$$

$$
r_1=\alpha e+\eta\beta t,\qquad
r_2=(\kappa-\alpha)e-\eta\beta t,\qquad\eta\in\{-1,1\}.
$$

The vectors have exactly the prescribed unequal radii and sum to $c$. Positive $\beta$ distinguishes the two persistent branches. Paired axial offsets cancel within each polarity, so each six-member sector is centered on the full center and the unweighted polarity-position sum vanishes exactly. Arbitrary observer exposure weights need not preserve that null.

There are nine continuous internal coordinates—height, two radii and three resultants per polarity—and six binary branch signs, hence sixty-four sign assignments. The source's phrase “six branch sheets” refers to six sign coordinates, not six complete assignments. On a fixed supplied ordered frame and admitted reconstruction image, means, transverse norms, resultant components and the sign of the triangle-tangent projection recover the record. Smooth inverse composition gives rank nine there. Applied to arbitrary twelve-position data, these averages do not certify image membership or recover a unique frame.

Differentiation requires the full chain rule. In particular,

$$
\dot\kappa=e\cdot\dot c,\qquad
\dot e=\frac{\dot c-\dot\kappa e}{\kappa},\qquad
\dot\alpha=\frac{\dot\kappa}{2}
+\frac{\rho_1\dot\rho_1-\rho_2\dot\rho_2}{\kappa}
-\frac{\rho_1^2-\rho_2^2}{2\kappa^2}\dot\kappa,
$$

$$
\dot\beta=\frac{\rho_1\dot\rho_1-\alpha\dot\alpha}{\beta}.
$$

The positive denominators and fixed branch are indispensable. For world positions $X_i=C+Ey_i$, with $\dot E=\Omega E$, velocities are $\dot C+\Omega Ey_i+E\dot y_i$. The old fixed-circle speed 0.40 does not transfer. Squared pair distances are smooth on the regular chart, but distance norms can fail to be differentiable at collisions and minima can fail at ties. Triangle regularity alone does not prove collision clearance.

### 25.3. Prescribed periodicity and its explicit margin

Set the three coordinates of each polarity to phase-shifted cosines of amplitude $A_\sigma$ and common positive frequency $\omega$. Their squared sum is $3A_\sigma^2/2$, giving

$$
\frac{A_\sigma}{\sqrt2}\le\kappa_{a\sigma}(T)
\le A_\sigma\sqrt{\frac32}.
$$

The sufficient amplitude domain is

$$
\sqrt2|\rho_1-\rho_2|<A_\sigma
<\sqrt{\frac23}(\rho_1+\rho_2).
$$

It is nonempty precisely when the radius difference is less than the radius sum divided by $\sqrt3$. The resulting fixed-branch worldlines and tangents are analytic for every real time. Their labeled positions and velocities repeat after $2\pi/\omega$, including every translated finite history window. This is a return period, not necessarily the minimum, and not an EOM fixed point. Individual reconstructed angular rates need not be constant or equal.

A conservative speed enclosure follows from the resultant-rate bound, the positive triangle margins and endpoint bounds for $\alpha'$ and $\beta$. The endpoint reduction is justified because $1/2-(\rho_1^2-\rho_2^2)/(2\kappa^2)$ is monotone, while $\beta^2$ is concave in $\kappa^2$. The source reports a later selected display record with a normalized 0.5 speed enclosure and implementation checks. Those attributed results apply to that prescribed record; they neither validate every regular coordinate row nor establish binding, stability or retention.

### 25.4. Three ports still need physical modes

A Hermitian circulant with first row $(a,z,z^*)$ has Fourier eigenvalues $a+2\operatorname{Re}(z\omega_3^k)$, where $\omega_3=e^{2\pi i/3}$. For $z=x+iy$ these are

$$
a+2x,\qquad a-x-\sqrt3y,\qquad a-x+\sqrt3y.
$$

Nonzero $y$ splits the two oriented responses, but three pairwise-distinct values also require $y\neq\pm\sqrt3x$. The source's pair-splitting condition is therefore insufficient for three distinct modes. A physical Gram metric, retained mode operator, exclusion of additional modes and distinct measured responses remain missing.

Two circulants on the same space commute and share a Fourier basis. If generation and weak exposure are both only functions of that cycle, they cannot determine nontrivial nondegenerate basis overlap. A noncommuting endpoint or exposure operator is a candidate requirement, not an inserted mixing matrix or proof of the observed pattern.

## 26. Tetrahedral geometry and a decisive circular negative

### 26.1. Eight members and different symmetry choices

Four tetrahedral unit directions satisfy $\sum_i n_i=0$, $n_i\cdot n_j=-1/3$ for distinct indices, and $\sum_i n_in_i^T=4I/3$. Separated-plane counterrotating dyads on these axes use eight members. Averaged axial dipoles cancel by the first identity, and second moments can be isotropic by the last. All equal circulation signs also cancel the signed current. One exceptional sign instead gives a current along its axis with a three-module stabilizer.

A different circular control uses two signs of each sense and a specific phase pattern to obtain exact instantaneous sector centering and dipole nulls. Its three unordered two-versus-two partitions correspond to body-axis choices; they do not identify three generations or color labels. This control remains scoped-negative after its member-acceleration test, even though its geometric identities remain useful.

### 26.2. A printed clearance error with a valid limited minimum

For the source's normalized equal height and radius 0.30 control, one representative squared distance is

$$
d^2(T)=-\frac3{25}\sin^2T+\frac{3\sqrt2}{25}\sin T+\frac3{10}.
$$

Its source-printed half-angle stationary numerator contains factors $(u-1-\sqrt2)(u-1+\sqrt2)$, where $u=\tan(T/2)$. Differentiation instead gives, up to the positive denominator,

$$
-3\sqrt2(u-1)(u+1)(u^2-2\sqrt2u+1).
$$

The discrepancy is demonstrated at the printed extra root $u=1-\sqrt2$, or $T=-\pi/4$: the derivative of the stated squared distance is $6/25$, not zero. The frozen factorization cannot serve as a valid stationary-point proof.

The representative minimum nevertheless follows without that factorization. The polynomial is concave in $\sin T\in[-1,1]$, and its positive linear coefficient selects $\sin T=-1$, giving $\sqrt{(9-6\sqrt2)/50}$. This verifies the representative only. The source's complete twenty-eight-pair classification remains an attributed result requiring its own exhaustive support, and neither result establishes dynamics.

### 26.3. Root regularity and member equations

For the prescribed bounded circular history with speed 0.30, the transmitter-time causal residual is strictly monotone by the speed bound. Every distinct ordered partner has one positive-delay root; no positive-delay self root exists. The derivative factors lie between 0.70 and 1.30. Delay and root-distance bounds additionally depend on the complete prescribed geometry and clearance. They do not transfer automatically to released paths.

The source's diagnostic evaluated 7,168 partner rows at 1,024 receiver events. The aggregate acceleration nearly canceled, but fitting one common positive coefficient left a member RMS residual 0.2990089834 against a required circular acceleration magnitude 0.30. Some acceleration directions were more than ninety degrees from the required direction. Positive common scaling cannot correct that directional error. Aggregate cancellation is therefore insufficient, and the isolated circular realization is rejected at the stated diagnostic scope.

Neutral polarity enumeration, a finite phase lattice, aspect/cadence screens, nested shells and stationary anchors supplied additional bounded negatives. Exact fixed-path assignment enumeration differs from finite sampled search. Neither licenses a universal no-go for noncircular paths, changed inventory, varying cadence or a coupled sea. The reported radial, tangential and axial residuals and dominant cross-module channels remain evidence about that prescribed control.

## 27. Six-coordinate breathing and necessary return

### 27.1. A conditional invariant symmetry surface

Allow each polarity independent height $h_\sigma$, radius $\rho_\sigma>0$ and phase $\theta_\sigma$. On the balanced circular control, $s_i=(-1,-1,1,1)$ and the fixed phase offsets are $(0,\pi,4\pi/3,\pi/3)$. For each tetrahedral axis $n_i$, let $r_i$ be the unit circular direction at angle $\sigma s_i\theta_\sigma+\phi_i$ and $t_i$ its unit angular tangent in the declared transverse frame. The positions are $X_{i\sigma}=\sigma h_\sigma n_i+\rho_\sigma r_i$. The circular phase identities preserve sector centering for arbitrary differentiable histories of these coordinates. Direct differentiation gives

$$
A_{i\sigma}=\sigma\ddot h_\sigma n_i
+(\ddot\rho_\sigma-\rho_\sigma\dot\theta_\sigma^2)r_i
+\sigma s_i(2\dot\rho_\sigma\dot\theta_\sigma+\rho_\sigma\ddot\theta_\sigma)t_i.
$$

Define the evaluated axial, radial and signed tangential projections by $H_{i\sigma}=\sigma n_i\cdot A_{i\sigma}$, $R_{i\sigma}=r_i\cdot A_{i\sigma}$ and $Q_{i\sigma}=\sigma s_i t_i\cdot A_{i\sigma}$. If they agree across all modules within a polarity, write their common values as $H_\sigma,R_\sigma,Q_\sigma$. The coordinate equations are

$$
\ddot h_\sigma=H_\sigma,\qquad
\ddot\rho_\sigma=R_\sigma+\rho_\sigma\dot\theta_\sigma^2,\qquad
\ddot\theta_\sigma=\frac{Q_\sigma-2\dot\rho_\sigma\dot\theta_\sigma}{\rho_\sigma}.
$$

The geometric centrifugal and mixed-rate terms arise from differentiation, not additional primitive interactions. Negative $R_\sigma+\rho_\sigma\dot\theta_\sigma^2$ means negative radial acceleration, not instantaneous contraction. A growing radius can decelerate without yet turning.

The source's improper order-four transformation and module permutation preserve the complete ansatz. Given complete nondegenerate causal roots, polarity-product covariance and a unique ordinary solution with compatible past, they force the within-sector projection equalities. This is a conditional invariant symmetry surface. A symmetric endpoint alone is insufficient, and positivity, clearance, admissible roots and continued existence are separate guards.

### 27.2. Current normalization and breathing

The later source defines an unhalved current $m=\sum_i\sigma_iX_i\times\dot X_i$. Its equal-radius unit-cadence mean at radius 0.30 is $(-8\rho^2/\sqrt3,0,0)$, approximately $(-0.4156922,0,0)$. An earlier audit reports half that value. The one-half convention in §23.4 could explain the relation, but the intervening source passages do not declare that conversion. Both values must retain their definitions; combining them as one measured normalization would conceal an unresolved convention.

The current can remain on the same body axis while its magnitude changes or vanishes. Axial–radial shear $b_\sigma=h_\sigma\dot\rho_\sigma-\dot h_\sigma\rho_\sigma$ contributes even when angular rate is zero. Thus a persistent axis and a cadence reversal do not determine the current or a physical spin. Nor is the current functional already a recovered magnetic moment.

Necessary rate-return conditions include

$$
\int_0^P H_\sigma\,dT=0,\qquad
\int_0^P(R_\sigma+\rho_\sigma\dot\theta_\sigma^2)\,dT=0,\qquad
\int_0^P\rho_\sigma Q_\sigma\,dT=[\rho_\sigma^2\dot\theta_\sigma]_0^P=0.
$$

They follow by integrating the coordinate equations. They do not ensure coordinate return, matching delayed history, a basin or stability.

### 27.3. Finite turns and whole-history residuals

The source reports ordinary finite releases with radial maxima, axial maxima, phase reversals and low symmetry leakage. Different records realize different turns. Their existence does not establish a common cycle. One time-origin choice generically supplies one scalar section; imposing four zero breathing rates simultaneously requires additional synchronization. A section crossing must also be transverse and matched in the remaining coordinates, rates and history.

A prescribed harmonic history can be compared with the acceleration generated from its complete past at frozen phase samples. Subtracting the imposed acceleration yields a stronger residual than a release sign. The source's apparent eight-phase improvement failed at doubled sampling; later refined harmonic and phase-modulated rows still had large residuals. A scalar recrossing could be made small by approaching a short nearly tangent return, so flight time, excursion, lifted phases, identity action and nontrivial turn or winding markers remain essential.

The reported six-acceleration RMS mixes length and phase units, and the eleven-component section residual mixes coordinates and rates. Those values rank rows only within the fixed chart, normalization and weighting used by the source. They are not coordinate-invariant error measures. No weights or rescaled historical results are invented here.

### 27.4. Direct, reflected and observable returns

A direct return preserves lifted phases modulo integer windings and restores cadences, heights, radii and their rates. A reflected shape action can instead map phases to $(-\theta_+-\pi/3,-\theta_-+\pi/3)$ while reversing cadences. Proper rotation and same-polarity permutation may identify the shape, but labeled paths and complete history still require the declared action. An endpoint match is not a relative periodic solution.

If a complete relative return sends an axial current to its negative, then $m(T+P)=-m(T)$ and $m(T+2P)=m(T)$, with zero fixed-frame mean over two periods. This is an observable-specific symmetry return. Special states, including zero current, can return earlier. It is ordinary vector transformation, not a spinor sign or proof of a fermionic $4\pi$ history.

The source's stored-record census found no nonzero direct winding among its eligible evolved records. Improved reflected scalar residuals retained substantial unmatched components and encountered certification limits. These are finite archive negatives with declared eligibility, not exhaustive physical exclusions.

## 28. Current capacity, directional response and the remaining closure

### 28.1. Fixed-shape capacity is not a retained motion

The orthogonal speed decomposition is

$$
v_\sigma^2=\dot h_\sigma^2+\dot\rho_\sigma^2+(\rho_\sigma\dot\theta_\sigma)^2
=\|q_\sigma\|^2.
$$

Here $q_\sigma=(\dot h_\sigma,\dot\rho_\sigma,\rho_\sigma\dot\theta_\sigma)$ is the sector-rate vector, distinct from a polarity label. Its fractions require nonzero speed. The below-one bound belongs to the selected subfield certification method, not a universal constituent-speed theorem.

At fixed shape the unhalved current is a linear functional $I=C\cdot Q$ on $Q=(q_+,q_-)$, with $C$ its shape-dependent coefficient vector, distinct from the geometric center used earlier. For $C\neq0$, the Euclidean minimum-norm carrier of current $I_0$ is $Q_0=I_0C/\|C\|^2$; all other carriers add a vector orthogonal to $C$. A separated pair's opening rate adds a second linear constraint. Let the rows of $A$ be the current and distance-rate coefficient vectors and let $b$ contain their specified target current and opening rate. For independent rows of $A$, the minimum-norm solution is

$$
Q_*=A^T(AA^T)^{-1}b.
$$

It satisfies the constraints and is orthogonal to their common kernel. Rank loss, incompatible targets or collision require a separate disposition. The remaining linear directions are not thereby retained dynamical modes.

Minimizing the largest sector speed is a different problem. On a nondegenerate branch with both sector constraints active, a weighted minimum has the form

$$
Q_\lambda=W_\lambda^{-1}A^T(AW_\lambda^{-1}A^T)^{-1}b,
\qquad W_\lambda=\operatorname{diag}(I_3,\lambda I_3),\quad\lambda>0,
$$

with equal resulting sector norms. Positive multipliers for the two active speed constraints give this conditional minimax solution. Single-active and degenerate cases are outside the formula. The source's improved endpoint speed and finite matched continuation do not establish a regulated history or return.

### 28.2. Handoffs, conversion and numerical boundaries

Differentiating a current separates changing shape coefficients from acceleration of the rate vector. Current persistence, corridor opening, speed decrease and rate-vector curvature are independent diagnostics. A speed decrease can coexist with large perpendicular acceleration. A current-only minimum can close a corridor that the actual release opens.

Source censuses and local neighborhoods report opposed sector-current derivatives, substantial cancellation, finite current-preserving handoffs and conversion from tangential to breathing contributions around cadence reversal. Their denominators differ by eligibility and deduplication; locally oversampled neighbors are not independent samples of a basin measure. Efficiency and the complementary neutral norm fraction are linked by an identity and do not independently verify each other.

The root-time pressure diagnostic divides a certified enclosure width by a chosen tolerance. It can approach one while geometric clearance and transmitter factors remain healthy. Changing only the tolerance allowed one source record past an earlier certification wall and changed the subsequent failure channel. This supports a numerical-certification interpretation, not a demonstrated physical singularity. The stricter and looser contracts remain different records. Smooth geometry, a cadence zero and current persistence do not replace complete roots, controlled pressure, every corridor and identity-history return.

### 28.3. Conjugation and the explicit sign contradiction

On a continuous lifted-phase branch, even and odd coordinates are half-sums and half-differences of the polarity-sector rows. Sector exchange preserves the even part and reverses the odd part. Wrapped-angle averages cannot replace this local chart. An effective charge readout is proposed to be odd, while scalar and mass-facing readouts are proposed to be even; their actual exposure maps remain unestablished.

For complete global polarity inversion, every pair product obeys $(-q_t)(-q_r)=q_tq_r$. With identical geometric histories, boundary data, law and a unique ordinary branch, roots and acceleration therefore remain unchanged. Polarity-weighted current reverses by its definition. Inverting only a receiver while holding an external source fixed changes their products and is a separate response experiment.

The source correctly states the external-source caveat, but then requires group response to reverse under complete source-and-receiver conjugation. That sentence conflicts with its polarity-product law: simultaneous inversion does not reverse geometric group acceleration. Reversal of an odd readout or relabeled sector does not repair the contradiction. The held-source effective response remains a distinct recovery obligation; no new charge law is inferred here.

### 28.4. Directional coordinates and three-mode claims

For four tetrahedral scalar deviations with zero sum, define $Z=\sum_i\delta z_i n_i$. Their dot products give

$$
\|Z\|^2=\frac43\sum_i\delta z_i^2,\qquad
\delta z_i=\frac34n_i\cdot Z.
$$

This is an invertible coordinate correspondence between a three-dimensional zero-sum space and a spatial triplet. Even/odd singlets and triplets suggest scalar loading, exposure imbalance, polar response and circulation-weighted axial response. Proper rotations alone do not distinguish polar from axial behavior, and a spatial triplet is not internal color.

Three even configuration coordinates do not imply three physical modes: their rates and delayed history enlarge the state. Only a selected invariant history graph $\iota$, embedding reduced coordinates into complete admitted histories, can justify a closed derivative of the return map $\mathcal R$ followed by the even-coordinate projection $P_{\mathrm{even}}$:

$$
M_{\mathrm{even}}^{\mathrm{red}}=D(P_{\mathrm{even}}\circ\mathcal R\circ\iota).
$$

A three-dimensional derivative has a cubic characteristic polynomial, but can have repeated or defective eigenvalues. Exactly three admissible long-lived modes additionally require selection of the graph, shared charge and transformation properties, derived mass/lifetime/reaction differences, disposition of every extra mode and a complete higher-to-lower event account. A noncommuting weak operator is a possible overlap mechanism, not a supplied solution.

### 28.5. What the assembled programme has and has not obtained

The equation families supply conditional algebra, observer constraints, explicit coordinate maps, prescribed histories, several informative negatives and source-reported finite continuations. Their strongest common unresolved object is an accepted EOM-evolved retained family with source, sea, carrier and receiver histories on one account. A candidate fixture, valid chart, instantaneous tangent surface, scalar section crossing or finite current handoff does not establish it.

The source's final radial-frequency continuation improved its eligible reflected-section residual by only 0.781421%, below its predeclared 10% material-change criterion. That direction closed without refinement. This negative is retained rather than converted into a suggestion to widen the same search. Dated demotions and separately reported later prescribed-coordinate overlays also remain distinct; neither reports a retained H4/H5 physical promotion.

After a common retained family exists, direct/sea/mixed electric behavior, signed magnetic response, complete history-chain closure and the first fixed-law transition still need independent comparisons. Pair backreaction additionally requires certified conjugate product basins and exact inventory. Until then, the equations are a structured set of recovery obligations and bounded candidate results. Their mathematical clarity does not license a stronger claim about nature.
