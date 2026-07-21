# A1 Dynamics and Interpretation

This specialist chapter carries the retention, phase-closure, cadence-retuning, scaling, strong-field, and downstream interpretation hypotheses specific to A1. The A1 coordinates and constrained variants are defined in [Braid Family A](braid-family-a.md#a1); the realization-independent proof contract is defined in [Braid Recovery Requirements](braid-recovery-requirements.md).

Nothing in this chapter establishes an EOM-solver-retained A1 branch. Derived identities, conditional results, hypotheses, and observer-level mappings keep their stated claim grades.

## Retention and Interpretation

The A1 geometry, its binary-2 hinge assignment, and its constrained variants are defined in [Braid Family A](braid-family-a.md#a1). The remaining material below concerns phase closure, retuning, dynamics, shielding, and downstream interpretations. It does not add coordinates to the A1 definition.

This chapter retains the compact layer aliases $I\equiv1$, $M\equiv2$, and $O\equiv3$ for equations inherited from the three-layer analysis. They denote the inner, middle, and outer A1 binaries, respectively, with $R_I<R_M<R_O$; binary 2, or $M$, is the declared hinge.

### Symmetry-Distance Diagnostic

A2's exact threefold channel pins its kinematic angular momentum along the Family-A translation direction. A1's unequal radii remove the cyclic binary-permutation symmetry, so the same pinning theorem does not apply. The resulting hypothesis is that nonzero precession may diagnose distance from the A2 symmetry channel, while decaying precession may diagnose relaxation toward it. This is an inferred diagnostic, not a proof that A1 precesses, that A1 relaxes toward A2, or that either member is retained. A retained evolution would falsify the diagnostic if its measured precession failed to track an independently defined symmetry-distance residual.

### Retention and Shielding Hypotheses

A1 retention requires more than its three-radius geometry. The high-frequency binary response, inter-binary wake exchange, binary-2 hinge transfer, and outer exposure must close into one persistent causal-return cycle. A time-averaged potential may be used as a comparison summary, but the proof burden is a same-record closure of the causal-root ledger, phase return, separator conditions, and perturbation response.

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
a\in\{I,M,O\}
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. When ordinary layer frequency is used below, $\omega_a=2\pi f_a$. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On the retuning hypothesis below, an accepted energy-level change is a one-$h_{\mathrm{act}}$ closed-cycle action transaction that moves the A1 record from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned braid should therefore carry information about the braid's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the braid.

The same closure-label machinery is the candidate carrier for branch-quantized Lorentz response. A moving A1 record should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-layer retuning of radii, frequencies, characteristic speeds, and wake exchange; the outer envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ within the preferred-frame leakage bound.

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

Here $h_{\mathrm{act}}$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $f_N$ is a representative cadence extracted from the closed A1 branch. A one-$h_{\mathrm{act}}$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh_{\mathrm{act}}$. The accepted branch may answer through one or more of the cadence, layer radii, envelope scale, envelope ratio, orientation, strain, and inter-layer wake-exchange variables. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ are defined in [Reduced A1 Closure Label](#reduced-a1-closure-label):

$$
\Delta A_{\mathrm{cyc}}=\pm h_{\mathrm{act}}
\quad\Rightarrow\quad
(f_N,\ R_I,R_M,R_O,\ \lambda,\ \xi,\ \mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO})
\longmapsto
(f_N',\ R_I',R_M',R_O',\ \lambda',\ \xi',\ \mathcal{G}_{IM}',\mathcal{G}_{IO}',\mathcal{G}_{MO}')
$$

In the simplest fixed-speed layer estimate,

$$
v_\ell\sim 2\pi R_\ell f_\ell,
\qquad
\ell\in\{I,M,O\}
$$

If a branch keeps $v_\ell$ approximately fixed while accepting the transaction, then

$$
R_\ell f_\ell\approx\text{constant},
\qquad
\Delta f_\ell>0\Rightarrow\Delta R_\ell<0,
\qquad
\Delta f_\ell<0\Rightarrow\Delta R_\ell>0
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln f_I,\ln f_M,\ln f_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
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
\Delta f_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right)
$$

where $\Lambda_{A1}$ is defined in [Reduced A1 Closure Label](#reduced-a1-closure-label), and $\theta_{\mathrm{env}}$ records the local Noether sea state and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

$$
\Delta\ln f_N
=
w_I^{(q)}\Delta\ln f_I
+
w_M^{(q)}\Delta\ln f_M
+
w_O^{(q)}\Delta\ln f_O,
\qquad
w_I^{(q)}+w_M^{(q)}+w_O^{(q)}=1
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full A1 record need not put the entire transaction into a single layer. One layer may tighten while another expands, and the outer envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

#### Action Clicks at the Field-Speed Hinge

The candidate physical implementation of the discrete action transaction — each accepted transaction realized as a controlled crossing of the causal-root fold set that changes the integer root count by one — is core-agnostic machinery and is developed at hypothesis level in [Braid Mathematics](braid-mathematics.md#action-clicks-at-the-fold-set). For this chapter's ledger the hypothesis-level consequences are that the closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one crossing, that closure-label changes are tied to causal-root bifurcation, and that many asynchronous crossings coarse-grain into the smooth cadence-space current named above. No dynamical mechanism holding a layer at the field-speed locus is asserted.

### Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether braids is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal braids at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h_{\mathrm{act}}$ itself. The fixed quantity is the closed-cycle action unit $h_{\mathrm{act}}$; the branch variable is the total action level

$$
A_N=Nh_{\mathrm{act}},
\qquad
N\in\mathbb{Z}_{>0}
$$

For the outer binary, write the outer action allocation as

$$
N_O=p_O^{(q)}N,
\qquad
I_O=N_O\hbar_{\mathrm{act}}
=p_O^{(q)}N\frac{h_{\mathrm{act}}}{2\pi}
$$

Here $p_O^{(q)}$ is the branch share carried by the outer binary and $\hbar_{\mathrm{act}}\equiv h_{\mathrm{act}}/(2\pi)$. With the reduced circular-action chart

$$
I_O=\mu_O^{\mathrm{rot}}R_O v_O
$$

Here $\mu_O^{\mathrm{rot}}$ is an effective rotational branch-response coefficient for this reduced chart. It is not a primitive mass assigned to architrinos; it is a bookkeeping response factor that must ultimately be extracted from the same branch record used by the mass-map program.

With this declaration, the action ledger determines the product

$$
\boxed{
R_O(N)\,v_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_O^{\mathrm{rot}}}.
}
$$

This is the part fixed directly by the $Nh_{\mathrm{act}}$ action ledger. It says that a higher rest level must carry a larger radius-speed product, but it does not by itself decide whether the extra product appears as larger outer radius, higher outer speed, or both. The separate functions $R_O(N)$, $v_O(N)$, and

$$
f_O(N)=\frac{v_O(N)}{2\pi R_O(N)}
$$

therefore require one more branch-closure equation.

One possible closure is a branch-pinned speed — stated as a chart hypothesis only; no mechanism holding a branch at fixed speed is established, and an earlier proposed pinning mechanism was retired when its own condition was measured false. If the outer branch keeps

$$
v_O=\beta_Oc_f
$$

with fixed $\beta_O$, then

$$
\boxed{
R_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
\qquad
f_O(N)
=
\frac{\mu_O^{\mathrm{rot}}\beta_O^2c_f^2}
{p_O^{(q)}Nh_{\mathrm{act}}}.
}
$$

This special branch gives

$$
\boxed{
R_O\propto N,
\qquad
v_O\propto N^0,
\qquad
f_O\propto N^{-1}.
}
$$

A different closure comes from a bare inverse-square radial balance. If the delayed root ledger reduces to

$$
\frac{v_O^2}{R_O}
=
\frac{K_O}{4R_O^2}\mathcal{B}_O(\beta_O;\Lambda_{A1,O})
$$

Here the factor $1/(4R_O^2)$ is the inverse-square factor for an opposite member at diameter $d=2R_O$. The coefficient $K_O$ is the reduced outer-channel coupling combination, $\mathcal{B}_O(\beta_O;\Lambda_{A1,O})$ is the dimensionless delayed-root radial balance factor, and $\Lambda_{A1,O}$ is the outer-channel sublabel inherited from the reduced A1 closure label. If $\mathcal{B}_O$ is approximately constant on the compared segment, then the same action product gives

$$
\boxed{
R_O\propto N^2,
\qquad
v_O\propto N^{-1},
\qquad
f_O\propto N^{-3}.
}
$$

Thus the $Nh_{\mathrm{act}}$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether sea return terms decide the actual rest-level scaling.

If the outer binary instead carries a declared outer energy projection

$$
E_O(N)=\zeta_O^{(q)}\mu_O^{\mathrm{rot}}v_O^2
$$

then

$$
\boxed{
v_O(N)
=
\sqrt{\frac{E_O(N)}{\zeta_O^{(q)}\mu_O^{\mathrm{rot}}}},
\qquad
R_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}\sqrt{\zeta_O^{(q)}}}
{2\pi\sqrt{\mu_O^{\mathrm{rot}}E_O(N)}}.
}
$$

This form is the safest way to use any external energy-level equation: insert the branch energy projection $E_O(N)$, then derive the corresponding outer radius and speed.

The same chart also gives a packing readout for the Noether sea. In a nearly spherical exclusion-envelope approximation, let

$$
R_{\mathrm{excl}}
=
\alpha_O^{(q)}R_O
$$

where $\alpha_O^{(q)}$ converts the outer-binary radius into the selected exclusion-interface threshold. Equal exclusion-envelope center contact then occurs at

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
R_O(N)^{-3}
$$

For example, the fixed-speed branch gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while the bare inverse-square branch with approximately constant $\mathcal{B}_O$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. These are branch diagnostics, not competing definitions of a Noether braid.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_O^{(q)},\ \mu_O^{\mathrm{rot}},\ \alpha_O^{(q)},\ \mathcal{B}_O(\beta_O;\Lambda_{A1,O})
\longrightarrow
p_O(q,\theta_{\mathrm{env}}),\ \mu_O^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_O(q,\theta_{\mathrm{env}}),\ \mathcal{B}_O(\beta_O;\Lambda_{A1,O},\theta_{\mathrm{env}})
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroidal envelope rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

### Reduced A1 Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced A1 closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{A1}$ denotes this reduced closure label:

$$
\Lambda_{A1}
=
\left(
k_I,k_M,k_O;\
\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O;\
\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO};\
\chi_c
\right)
$$

Here $k_I,k_M,k_O$ are the layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered braid chirality; the current candidate data are the `HML/HLM` ordered-braid distinction together with $\operatorname{Wr}_c$ or a multi-component causal-writhe parity.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{A1}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible A1 closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{A1}^{\mathrm{align}}
=
\left.
\Lambda_{A1}
\right|_{\substack{
v_M=c_f,\;v_O\to c_f\\
\text{coplanar/co-linear binary layers}\\
\text{precession ceases}
}}
$$
with the remaining admissible entries inherited from the layer ledgers, inter-layer ledgers, chirality entry, and emitted wake envelope. For a connected block $U$ of alignment-area patches, the local label set to be counted has the schematic form
$$
\mathcal{L}_U(\theta_{\mathrm{env}})
=
\left\{
\left(\Lambda_{A1,a}^{\mathrm{align}}\right)_{a\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(O)}(\theta_{\mathrm{env}};W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{O,\theta_{\mathrm{env}},W}
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

### Geometry and Exclusion Envelope

The same A1 motion that may supply shielding is the geometric footprint a retained branch would sweep into a dynamic exclusion envelope. That envelope is not the braid definition itself; it is the candidate excluded-region readout of the A1 assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [Braid Envelope Geometry](braid-envelope-geometry.md).

### A1 Shielding and Fermion Generations

The broader assembly program suggests reading A1's three-layer ordering as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-support-row shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **A1:** the fully shielded three-tier braid, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../assemblies/fermions/electron.md).

Any attempt to pair this shielding ladder with accessory geometry must use the current charged-fermion inventory and the [Thomson Dressing Mechanism](braid-mathematics.md#thomson-dressing-mechanism). The older four-site and two-site quark shortcut is not part of the A1 dynamics definition.

### A1 Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its layer scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across A1.

The horizon-approach hypothesis for A1 reads: as an A1 assembly approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its layer scale and cadence retune; at the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment. This is a derivation target, not an evolved-trajectory result.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It is not a claim that the inner, middle, and outer binaries become identical. It means the middle binary remains on the field-speed hinge, the outer binary is driven into the same terminal threshold, and the inner binary remains the self-hit interior branch while the assembly loses ordinary volumetric slack. Because $s_\ell=\omega_\ell\rho_\ell$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes A1 more than a particle scaffold. In this interpretation, it contains a local black-hole dual: the middle binary is the horizon-interface threshold, the inner self-hit binary is the beyond-threshold interior branch, and the outer binary is the exterior-coupling branch that can be driven into terminal alignment under strong-field stress. This is a primitive black-hole pattern inside the assembly ontology, not an assertion that an ordinary particle is an observer-level compact object.

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (A1 coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to A1 Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

The alignment limit also has a wake-signature reading, at hypothesis level. The [axial polarity dipole identity](braid-mathematics.md#moments-and-the-axial-polarity-dipole) shows that a braid's leading polarity-signed moment lives entirely on its axial extent and vanishes as the configuration flattens toward the planar limit. Terminal alignment — coplanarity at field speed — is therefore also the **dipole-quiet limit**: an assembly driven into alignment stops broadcasting its leading polarity-signed structure exactly when it reaches the horizon condition. On this reading, the darkness of the horizon boundary is not only a causal-escape statement; the infalling assembly's loudest wake channel closes as a matter of geometry, leaving only higher-moment and phase data as the distinguishable content. That surviving content is what the alignment-restricted closure label $\Lambda_{A1}^{\mathrm{align}}$ enumerates, which makes the horizon-interface entropy counting and the dipole-quiet limit two views of the same restriction.

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
