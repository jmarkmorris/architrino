# A1 Dynamics and Interpretation

This specialist chapter carries the retention, phase-closure, cadence-retuning, scaling, strong-field, and downstream interpretation hypotheses specific to A1. The A1 coordinates and constrained variants are defined in [Braid Family A](braid-family-a.md#a1); the realization-independent proof contract is defined in [Braid Recovery Requirements](braid-recovery-requirements.md).

Nothing in this chapter establishes an EOM-solver-retained A1 branch. Derived identities, conditional results, hypotheses, and observer-level mappings keep their stated claim grades.

## Retention and Interpretation

The A1 geometry, persistent binary indices, and constrained variants are defined in [Braid Family A](braid-family-a.md#a1). The remaining material below concerns phase closure, retuning, dynamics, shielding, and downstream interpretations. It does not add coordinates to the A1 definition.

All equations use the persistent indices $a\in\{1,2,3\}$. The indices do not encode a radius order or preassign a field-speed carrier, self-hit channel, shielding rank, or envelope-leading path. Any such diagnostic must be extracted from the same retained branch record used by the equation in which it appears.

### Symmetry-Distance Diagnostic

A2's exact threefold channel pins its kinematic angular momentum along the Family-A translation direction. A1 does not require the equal geometry and cyclic binary-permutation symmetry used by that theorem, so the same pinning result does not apply to a general A1 record. The resulting hypothesis is that nonzero precession may diagnose distance from the A2 symmetry channel, while decaying precession may diagnose relaxation toward it. This is an inferred diagnostic, not a proof that A1 precesses, that A1 relaxes toward A2, or that either member is retained. A retained evolution would falsify the diagnostic if its measured precession failed to track an independently defined symmetry-distance residual.

### Retention and Shielding Hypotheses

A1 retention requires more than its prescribed binary coordinates. The three binary responses, inter-binary wake exchange, any branch-derived field-speed transfer, and the full envelope exposure must close into one persistent causal-return cycle. A time-averaged potential may be used as a comparison summary, but the proof burden is a same-record closure of the causal-root ledger, phase return, separator conditions, and perturbation response.

Far-field cancellation is a separate hypothesis. Rapid positive- and negative-polarity motion may suppress the exposed wake signature relative to the raw sum of the six constituent contributions, but quantitative shielding and any mass-map consequence remain closure targets. A same-record far-field calculation that does not show the required suppression would falsify that hypothesis without altering the A1 geometric definition.

### Integer Phase-Closure States

An A1 record should be treated as a closed-cycle geometry before it is treated as a particle label. Over a stable return duration $T_{\mathrm{ret}}$ beginning at a chosen absolute-time origin $T_0$, each binary must return its phase together with the relevant causal-root ledger:

$$
\Theta_a(T_0;T_{\mathrm{ret}})
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}\omega_a(T')\,dT'
+
\Phi_a^{\text{root}}(T_0;T_{\mathrm{ret}})
=
2\pi k_a,
\qquad
k_a\in\mathbb{Z},
\qquad
a\in\{1,2,3\}
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. When ordinary layer frequency is used below, $\omega_a=2\pi f_a$. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On the retuning hypothesis below, an accepted energy-level change is a one-$h_{\mathrm{act}}$ closed-cycle action transaction that moves the A1 record from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned braid should therefore carry information about the braid's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the braid.

The same closure-label machinery is the candidate carrier for branch-quantized Lorentz response. A moving A1 record should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-binary retuning of radii, frequencies, characteristic speeds, and wake exchange; the full path-history envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ within the preferred-frame leakage bound.

### Cadence-Scale Retuning Hypothesis

The single-braid version of the $h_{\mathrm{act}}$-step claim is geometric rather than merely thermal. An accepted action transaction does not add energy to a rigid object. It moves the A1 record from one admissible closure branch toward another, and the braid resolves that transaction by retuning its cadence-scale closure. The symbol $h_{\mathrm{act}}$ denotes the closed-cycle action unit in this chart; it is distinct from the finite-memory depth $h_{\mathrm{mem}}$ used in dynamics chapters, and its comparison with the observer-level Planck constant $h$ remains part of action-scale closure.

The bookkeeping distinction is

$$
h_{\mathrm{act}}=\text{action per accepted cycle},
\qquad
A_N=Nh_{\mathrm{act}},
\qquad
E_N=A_N f_N
$$

Here $h_{\mathrm{act}}$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $f_N$ is a representative cadence extracted from the closed A1 branch. A one-$h_{\mathrm{act}}$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh_{\mathrm{act}}$. The accepted branch may answer through one or more of the cadence, binary radii, envelope scale, envelope ratio, orientation, strain, and inter-binary wake-exchange variables. The inter-binary ledgers $\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23}$ are defined in [Reduced A1 Closure Label](#reduced-a1-closure-label):

$$
\Delta A_{\mathrm{cyc}}=\pm h_{\mathrm{act}}
\quad\Rightarrow\quad
(f_N,\ R_1,R_2,R_3,\ \lambda,\ \xi,\ \mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23})
\longmapsto
(f_N',\ R_1',R_2',R_3',\ \lambda',\ \xi',\ \mathcal{G}_{12}',\mathcal{G}_{13}',\mathcal{G}_{23}')
$$

In the simplest fixed-speed layer estimate,

$$
v_a\sim 2\pi R_a f_a,
\qquad
a\in\{1,2,3\}
$$

If a branch keeps $v_a$ approximately fixed while accepting the transaction, then

$$
R_a f_a\approx\text{constant},
\qquad
\Delta f_a>0\Rightarrow\Delta R_a<0,
\qquad
\Delta f_a<0\Rightarrow\Delta R_a>0
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln f_1,\ln f_2,\ln f_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)_q^{T}
$$

Let $A_{\mathrm{cyc},q}(\mathbf{y},\mathcal{G})$ be the closed-cycle action ledger on that chart, and let

$$
\mathcal{C}_q(\mathbf{y},\mathcal{G})=0
$$

collect the integer phase-closure, causal-root, separator, inter-layer wake-exchange, and stability conditions that define the branch. A first-order accepted retuning with action sign $s_{\mathrm{act}}\in\{+1,-1\}$ must satisfy

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
s_{\mathrm{act}}h_{\mathrm{act}}
$$

together with the branch-preservation condition

$$
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0
$$

If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-braid drift.

The local cadence-scale retuning map is therefore the closure target

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,s_{\mathrm{act}})}
:
(\Lambda_{A1},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta f_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi
\right)
$$

where $\Lambda_{A1}$ is defined in [Reduced A1 Closure Label](#reduced-a1-closure-label), and $\theta_{\mathrm{env}}$ records the local Noether sea state and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

$$
\Delta\ln f_N
=
w_1^{(q)}\Delta\ln f_1
+
w_2^{(q)}\Delta\ln f_2
+
w_3^{(q)}\Delta\ln f_3,
\qquad
w_1^{(q)}+w_2^{(q)}+w_3^{(q)}=1
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full A1 record need not put the entire transaction into a single binary. One binary may tighten while another expands, and the path-history envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

#### Action Clicks at the Field-Speed Hinge

The candidate physical implementation of the discrete action transaction — each accepted transaction realized as a controlled crossing of the causal-root fold set that changes the integer root count by one — is core-agnostic machinery and is developed at hypothesis level in [Braid Mathematics](braid-mathematics.md#action-clicks-at-the-fold-set). For this chapter's ledger the hypothesis-level consequences are that the closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one crossing, that closure-label changes are tied to causal-root bifurcation, and that many asynchronous crossings coarse-grain into the smooth cadence-space current named above. No binary is assigned this role by the taxonomy, and no dynamical mechanism holding a branch at the field-speed locus is asserted.

### Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether braids is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal braids at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h_{\mathrm{act}}$ itself. The fixed quantity is the closed-cycle action unit $h_{\mathrm{act}}$; the branch variable is the total action level

$$
A_N=Nh_{\mathrm{act}},
\qquad
N\in\mathbb{Z}_{>0}
$$

For any declared binary channel $a\in\{1,2,3\}$, write its action allocation as

$$
N_a=p_a^{(q)}N,
\qquad
I_a=N_a\hbar_{\mathrm{act}}
=p_a^{(q)}N\frac{h_{\mathrm{act}}}{2\pi}
$$

Here $p_a^{(q)}$ is the branch share carried by binary $a$ and $\hbar_{\mathrm{act}}\equiv h_{\mathrm{act}}/(2\pi)$. With the reduced circular-action chart

$$
I_a=\mu_a^{\mathrm{rot}}R_a v_a
$$

Here $\mu_a^{\mathrm{rot}}$ is an effective rotational branch-response coefficient for this reduced chart. It is not a primitive mass assigned to architrinos; it is a bookkeeping response factor that must ultimately be extracted from the same branch record used by the mass-map program.

With this declaration, the action ledger determines the product

$$
\boxed{
R_a(N)\,v_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_a^{\mathrm{rot}}}.
}
$$

This is the part fixed directly by the $Nh_{\mathrm{act}}$ action ledger. It says that a higher rest level must carry a larger radius-speed product in the selected channel, but it does not by itself decide whether the extra product appears as larger radius, higher speed, or both. The separate functions $R_a(N)$, $v_a(N)$, and

$$
f_a(N)=\frac{v_a(N)}{2\pi R_a(N)}
$$

therefore require one more branch-closure equation.

One possible closure is a branch-pinned speed — stated as a chart hypothesis only; no mechanism holding a branch at fixed speed is established, and an earlier proposed pinning mechanism was retired when its own condition was measured false. If the selected binary channel keeps

$$
v_a=\beta_ac_f
$$

with fixed $\beta_a$, then

$$
\boxed{
R_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_a^{\mathrm{rot}}\beta_ac_f},
\qquad
f_a(N)
=
\frac{\mu_a^{\mathrm{rot}}\beta_a^2c_f^2}
{p_a^{(q)}Nh_{\mathrm{act}}}.
}
$$

This special branch gives

$$
\boxed{
R_a\propto N,
\qquad
v_a\propto N^0,
\qquad
f_a\propto N^{-1}.
}
$$

A different closure comes from a bare inverse-square radial balance. If the delayed root ledger reduces to

$$
\frac{v_a^2}{R_a}
=
\frac{K_a}{4R_a^2}\mathcal{B}_a(\beta_a;\Lambda_{A1,a})
$$

Here the factor $1/(4R_a^2)$ is the inverse-square factor for an opposite member at diameter $d=2R_a$. The coefficient $K_a$ is the reduced channel coupling combination, $\mathcal{B}_a(\beta_a;\Lambda_{A1,a})$ is the dimensionless delayed-root radial balance factor, and $\Lambda_{A1,a}$ is the selected channel sublabel inherited from the reduced A1 closure label. If $\mathcal{B}_a$ is approximately constant on the compared segment, then the same action product gives

$$
\boxed{
R_a\propto N^2,
\qquad
v_a\propto N^{-1},
\qquad
f_a\propto N^{-3}.
}
$$

Thus the $Nh_{\mathrm{act}}$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether sea return terms decide the actual rest-level scaling.

If the selected binary channel instead carries a declared energy projection

$$
E_a(N)=\zeta_a^{(q)}\mu_a^{\mathrm{rot}}v_a^2
$$

then

$$
\boxed{
v_a(N)
=
\sqrt{\frac{E_a(N)}{\zeta_a^{(q)}\mu_a^{\mathrm{rot}}}},
\qquad
R_a(N)
=
\frac{p_a^{(q)}Nh_{\mathrm{act}}\sqrt{\zeta_a^{(q)}}}
{2\pi\sqrt{\mu_a^{\mathrm{rot}}E_a(N)}}.
}
$$

This form is the safest way to use any external energy-level equation: insert the branch energy projection $E_a(N)$, then derive the corresponding channel radius and speed.

The same chart also gives a packing readout for the Noether sea, but the packing scale must be extracted from all six paths rather than from a preselected binary. In a nearly spherical exclusion-envelope approximation, let

$$
R_{\mathrm{excl}}
=
\alpha_{\mathrm{env}}^{(q)}R_{\mathrm{env}}
$$

where $R_{\mathrm{env}}$ is a branch-derived characteristic radius of the full path-history envelope and $\alpha_{\mathrm{env}}^{(q)}$ converts it into the selected exclusion-interface threshold. Equal exclusion-envelope center contact then occurs at

$$
d_{\mathrm{nn}}=2R_{\mathrm{excl}}
$$

and the densest ordinary equal-sphere center density is

$$
\rho_{\mathrm{NS},\max}^{\#}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}
$$

The density symbol functions as packing notation for this chart, distinct from the physical Noether sea density field $\rho_{\text{NS}}(\mathbf X,T)$; the $\#$ marks a center number density for the relevant Noether braid exclusion envelopes. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{NS},\max}^{\#}(N)
\propto
R_{\mathrm{env}}(N)^{-3}
$$

If the branch independently proves that one selected channel $a$ controls $R_{\mathrm{env}}$ with a fixed proportionality, then its fixed-speed estimate gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while its bare inverse-square estimate with approximately constant $\mathcal{B}_a$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. Without that boundary-leading certificate, the single-channel exponents do not transfer to packing. These are branch diagnostics, not competing definitions of a Noether braid.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_a^{(q)},\ \mu_a^{\mathrm{rot}},\ \alpha_{\mathrm{env}}^{(q)},\ \mathcal{B}_a(\beta_a;\Lambda_{A1,a})
\longrightarrow
p_a(q,\theta_{\mathrm{env}}),\ \mu_a^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_{\mathrm{env}}(q,\theta_{\mathrm{env}}),\ \mathcal{B}_a(\beta_a;\Lambda_{A1,a},\theta_{\mathrm{env}})
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroidal envelope rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

### Reduced A1 Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced A1 closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{A1}$ denotes this reduced closure label:

$$
\Lambda_{A1}
=
\left(
k_1,k_2,k_3;\
\mathcal{G}_1,\mathcal{G}_2,\mathcal{G}_3;\
\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23};\
\chi_c
\right)
$$

Here $k_1,k_2,k_3$ are the binary winding counts over the chosen return period. The binary ledgers $\mathcal{G}_1,\mathcal{G}_2,\mathcal{G}_3$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-binary ledgers $\mathcal{G}_{12},\mathcal{G}_{13},\mathcal{G}_{23}$ record delayed exchange roots and phase-lock constraints between binary pairs. The branch label $\chi_c$ records braid chirality derived from the indexed path record, for example through $\operatorname{Wr}_c$ or a multi-component causal-writhe parity; it must not be inferred from a high/middle/low radius ordering.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{A1}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible A1 closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. Define the branch-derived field-speed and self-hit index sets on a declared window $W$ by
$$
\mathcal H_q(W)
=
\left\{a:\sup_{T\in W}|s_a(T)-c_f|\le\varepsilon_hc_f\right\},
\qquad
\mathcal S_q(W)
=
\left\{a:\text{a retained same-transmitter root row exists on }W\right\}.
$$
These sets preserve the binary indices and derive their roles from the retained record. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{A1}^{\mathrm{align}}
=
\left.
\Lambda_{A1}
\right|_{\substack{
|\mathcal H_q(W)|\ge2,\;|\mathcal S_q(W)|\ge1\\
\text{coincident binary axes along }\hat{\mathbf u}_A\\
\text{precession ceases}
}}
$$
with the remaining admissible entries inherited from the binary ledgers, inter-binary ledgers, chirality entry, and emitted wake envelope. For a connected block $U$ of alignment-area patches, the local label set to be counted has the schematic form
$$
\mathcal{L}_U(\theta_{\mathrm{env}})
=
\left\{
\left(\Lambda_{A1,p}^{\mathrm{align}}\right)_{p\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(\mathrm{env})}(\theta_{\mathrm{env}};W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{\mathrm{env},\theta_{\mathrm{env}},W}
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

### Geometry and Exclusion Envelope

The same A1 motion that may supply shielding is the geometric footprint a retained branch would sweep into a dynamic exclusion envelope. That envelope is not the braid definition itself; it is the candidate excluded-region readout of the A1 assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [Braid Envelope Geometry](braid-envelope-geometry.md).

### A1 Shielding and Fermion Generations

The broader assembly program suggests reading the number of retained binary support rows as a candidate hierarchy of fermion shielding tiers. This proposal counts support; it does not rank the three A1 binaries by radius:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-support-row shielding tier:** one additional retained support row, corresponding to the Generation-II shielding tier.
-   **A1:** a retained three-support-row braid, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many retained support rows participate in shielding; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../assemblies/fermions/electron.md).

Any attempt to pair this shielding ladder with accessory geometry must use a complete six-architrino [Accessory Configuration](braid-mathematics.md#accessory-configuration). The six sites may lie inside, across, or outside the braid envelope, and their polarity and position records must be declared. Accessory Configuration geometry is not part of the A1 dynamics definition.

### A1 Alignment and Planck-Scale Framing

Maximal curvature, same-transmitter-root access, field-speed occupancy, energy-transfer leverage, and external exposure are branch diagnostics, not A1 member assignments. A retained record may place these diagnostics on different binary indices, may place more than one diagnostic on one index, or may fail to supply a unique assignment. The sets $\mathcal H_q(W)$ and $\mathcal S_q(W)$ above record two of these distinctions without changing the binary identities.

The horizon-approach hypothesis for A1 is therefore permutation-neutral: as the assembly approaches its terminal-alignment target, the three binary axes converge to the Family-A translation direction, precession ceases, at least two branch-derived speed rows approach the field-speed locus, and at least one retained same-transmitter-root row remains available. Which indices satisfy those conditions, and how their frequencies, radii, and energy rows retune, must be measured on the evolved branch. This is a derivation target, not an evolved-trajectory result.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It does not assign permanent roles to binaries 1, 2, or 3 and does not claim that their radii, frequencies, or energies become equal. Because $s_a=\omega_a\rho_a$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes A1 more than a particle scaffold. In this interpretation, a retained branch may contain a local black-hole dual in which the horizon-interface, same-transmitter-root, and exterior-coupling diagnostics coexist while the binary axes align. The mapping is branch-derived and may not be unique. It is a primitive assembly-level pattern, not an assertion that an ordinary particle is an observer-level compact object.

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (coincident A1 binary axes with branch-derived field-speed occupancy), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to A1 Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

The alignment limit also has a wake-signature reading, at hypothesis level. The [axial polarity dipole identity](braid-mathematics.md#moments-and-the-axial-polarity-dipole) shows that a braid's leading polarity-signed moment lives entirely on its axial extent and vanishes as the configuration flattens toward the planar limit. Terminal alignment — coincident binary axes with the required branch-derived speed rows — is therefore also the **dipole-quiet limit**: an assembly driven into alignment stops broadcasting its leading polarity-signed structure exactly when it reaches the horizon condition. On this reading, the darkness of the horizon boundary is not only a causal-escape statement; the infalling assembly's loudest wake channel closes as a matter of geometry, leaving only higher-moment and phase data as the distinguishable content. That surviving content is what the alignment-restricted closure label $\Lambda_{A1}^{\mathrm{align}}$ enumerates, which makes the horizon-interface entropy counting and the dipole-quiet limit two views of the same restriction.

### The Foundation for Fermions

The Noether braid class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.


### A1 Dynamics

The A1 mechanism program — how a three-layer assembly could keep compatible branch
records as one moving delayed system, with same-record closure across period, active-root ledger,
deformation map, medium response, observer export, and event ledger — is an open
obligation, not carried in this chapter. The realization-independent
machinery lives with the shared mathematics in [Braid Mathematics](braid-mathematics.md#substrate-and-effective-levels).
Results enter this chapter only when established at their stated claim level.

For the strong-field continuation, see [Black Holes](../spacetime/black-holes.md) and
[Horizon Chirality](../spacetime/horizon-chirality.md).
