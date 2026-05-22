# Noether Swarm

The **Noether swarm** is the reader-facing class of neutral six-architrino assembly scaffolds used in the Noether-Sea and particle-architecture program. A Noether swarm is not assumed at the outset to be a set of exact binaries. The base object is a closed, charge-neutral, bounded-speed six-body branch in which three positive architrinos and three negative architrinos maintain a persistent causal-return ledger.

This chapter uses three swarm types:

| Term | Definition | Additional structure |
| --- | --- | --- |
| **neutral swarm** | The broad six-architrino neutral case before any required binary grouping or radial organization. | Charge balance and causal-return bookkeeping. |
| **shell swarm** | A neutral swarm whose six architrino paths remain in a controlled radial support band. | Radial support control, with near-antipodality only as an optional constraint. |
| **nested shell swarm** | A shell swarm with three ordered radial support bands. | The old three-layer picture; exact binaries are an additional proof assumption, not a separate swarm type. |

Older chapters in the corpus use **Noether swarm**, **nested shell swarm**, and **nested binary** for material that usually belongs to the nested shell swarm case. This chapter treats that structure as a special case of the broader Noether swarm class. The downstream corpus still mostly describes the nested shell swarm and has not yet been generalized; the older terms should therefore be read as nested shell swarm terminology unless a later page explicitly promotes the more general swarm case. The swarm's dynamic envelope geometry is developed separately in [the nested shell swarm geometry chapter](nested-shell-swarm-geometry.md), while metric-level translation belongs to [Emergent Metric](../spacetime/emergent-metric.md).

## Neutral Swarm

A **neutral swarm** is the base six-architrino case. It contains six architrinos indexed by $i\in\{1,\ldots,6\}$, with polarity signs $\sigma_i\in\{+1,-1\}$ satisfying

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_{i=1}^{6}\sigma_i=0.
$$

This charge-neutral ledger is imposed before any binary partition, shell ordering, or near-antipodal matching is assumed. Each positive architrino has three attractive channels to negative architrinos and two repellent channels to the other positive architrinos. Each negative architrino has the polarity-reversed version of the same count: three attractive channels to positives and two repellent channels to negatives. That $3+2$ channel count is part of the neutral swarm bookkeeping even when no binary partition has been certified.

The intrinsic path of architrino $i$ may be represented by a closed arclength curve

$$
Y_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\left\lVert Y_i'(s)\right\rVert=1,
\qquad
Y_i(s+L_i)=Y_i(s).
$$

Its physical trajectory is allowed to move along that support with a bounded speed factor,

$$
X_i(t)=Y_i(\lambda_i(t)),
\qquad
\dot{\lambda}_i(t)=\nu_i(t),
\qquad
0<\nu_-\leq\nu_i(t)\leq\nu_+<\infty.
$$

The bounded speed factor $\nu_i(t)$ is the place where speed-lapse behavior enters the architecture. A branch may temporarily push an architrino over a local hinge into a self-hit mode, but an admissible neutral swarm must still return to a closed causal ledger within the branch's recovery tolerance. The neutral swarm therefore allows changing support geometry, nonuniform speed, changing local curvature, and delayed multi-channel response without first reducing the motion to three exact binaries.

## Shell Swarm

A **shell swarm** is a neutral swarm whose six trajectories remain in a controlled radial band around a branch center $C(t)$. For a representative shell scale $R_*$ and band limits $R_-<R_+$, the shell condition is

$$
R_-\leq
\left\lVert X_i(t)-C(t)\right\rVert
\leq R_+,
\qquad
i=1,\ldots,6.
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}},
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell swarm. It is a one-band neutral swarm whose support is spatially organized strongly enough to produce a persistent exclusion envelope, shielding pattern, and Noether-Sea coupling channel.

Near-antipodality is an optional shell swarm constraint, not a definition of the neutral swarm. A shell branch may carry an approximate polarity-reversing matching $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$. Relative to a branch center $C(t)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(t)
=
\frac{
\left\lVert X_i(t)+X_{\iota(i)}(t)-2C(t)\right\rVert
}{R_*}.
$$

Exact antipodality, $\delta_{\mathrm{anti},i}=0$, is an ideal symmetry chart. It should not be expected in ordinary conditions: an external potential can disturb one member of the matching first, and the delayed response takes time to circulate through the full six-body causal ledger. The physical shell claim is therefore near-antipodality plus recovery,

$$
\sup_{t\in J}\delta_{\mathrm{anti},i}(t)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(t+T_{\mathrm{rec}})
\leq
\kappa\,\delta_{\mathrm{anti},i}(t)+\varepsilon_{\mathrm{drive}},
$$

for a branch interval $J$, recovery time $T_{\mathrm{rec}}$, contraction factor $0\leq\kappa<1$, and driving residue $\varepsilon_{\mathrm{drive}}$. Near-antipodality is useful because it captures the shell branch's tendency to restore opposite-side balance without pretending that the two matched architrinos remain in lockstep under perturbation.

## Nested Shell Swarm

A **nested shell swarm** is a shell swarm with three ordered radial support bands. It is the case most of the existing downstream corpus currently describes.

The geometric shell labels are

$$
I,\ M,\ O
$$

for **inner**, **middle**, and **outer** radial order. These are geometry labels: they say which support band is deepest, intermediate, or most externally exposed. They do not by themselves prove a dynamical role, a generation label, or a particle identity.

The role labels are

$$
H,\ M,\ L
$$

for **high**, **middle**, and **low** branch role. In the weak-stress nested shell swarm chart, $H$ is the high-cadence or high-stress role, $M$ is the hinge or transfer role, and $L$ is the low-cadence or external-coupling role. The letter $M$ is therefore context-dependent: in $I/M/O$ it means middle radius, while in $H/M/L$ it means the middle role between high and low branch response. The usual weak-stress branch is expected to align these two orderings approximately, but that alignment is a branch result rather than a naming axiom.

The recursive binary picture remains valuable inside this case. Just as an Electrino and a Positrino can form a stable binary, a declared binary can participate in a larger coupled support structure, and three energy-separated binaries can form a nested shell hierarchy. The key to stability is still separation of scale: each surrounding support band must have a larger radius, a lower cadence, and a compatible causal-root ledger than the deeper support band.

In this case, a candidate stable configuration is the **nested shell swarm with exact binary assumptions**. It consists of three binaries, one in each ordered shell, and supplies the assembly scaffold later used in [Nested Shell Swarm Dynamics](nested-shell-swarm-dynamics.md).

-   **Why Three?** The stability of a three-shell nested structure is a theorem target tied to the three-dimensional nature of Euclidean space. Each binary defines an orbital plane or dominant support sheet. The working claim is that three mutually orthogonal support sheets can form a dynamically stable, symmetric, three-dimensional structure that is resistant to perturbation; the proof burden is to derive that role count from the delayed causal dynamics rather than assuming it.

-   **Why "Noether"?** This swarm family is named in honor of Emmy Noether. Noether's theorem links symmetries in physical systems to conserved quantities. The highly symmetric nested shell swarm is the candidate scaffold through which spin, branch-quantized energy records, and other conserved observer-level labels should be recovered from closure labels and emitted causal-wake envelopes.

## Properties of the Nested Shell Swarm

-   **Energy-Separated Scales:** In low-energy nested shell swarm conditions, the three shell binaries have energy-separated orbital radii and cadences. The innermost binary is the smallest and fastest, while the outermost is the largest and slowest. This separation of scales is crucial for the system's stability.

-   **Internal Stabilization:** The system is expected to be stable only on branches where the high-frequency causal-wake emissions from the innermost binary, inter-layer wake exchange, and outer-layer shielding close into a persistent return cycle. The time-averaged potential picture is useful, but the theorem burden is to show that the root ledger, phase closure, and separator conditions keep the coupled hierarchy on the same branch.

-   **Energy Shielding via Superposition:** From a distance, a nested shell swarm appears to have far less energy and a much smaller potential signature than the raw sum of its six constituent architrinos. The rapid oscillation of the positive- and negative-polarity architrinos within the nested structure causes their wake contributions to largely cancel out through superposition. This shielding effect is the working mechanism for how highly energetic structures can form the basis for relatively low-mass observed particles; quantitative extraction remains a mass-map closure target.

## Integer Phase-Closure States

A nested shell swarm should be treated as a closed-cycle geometry before it is treated as a particle label. Over a stable return period $T$, each binary must return its phase together with the relevant causal-root ledger:

$$
\Theta_a(T)
=
\int_0^T\omega_a(t)\,dt
+
\Phi_a^{\text{root}}(T)
=
2\pi k_a,
\qquad
k_a\in\mathbb{Z},
\qquad
a\in\{I,M,O\}.
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On this reading, an accepted energy-level change is a one-$h$ closed-cycle action transaction that moves the nested shell swarm from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned swarm should therefore carry information about the swarm's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether-Sea wake environment, not as primitive labels pasted onto the swarm.

The same closure-label machinery is the native carrier for branch-quantized Lorentz response. A moving nested shell swarm should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-layer retuning of radii, frequencies, characteristic speeds, and wake exchange; the outer envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the usual effective $\gamma(v)$ within the preferred-frame leakage bound.

## Cadence-Scale Retuning Hypothesis

The single-swarm version of the $h$-step claim is geometric rather than merely thermal. An accepted action transaction does not add energy to a rigid object. It moves the nested shell swarm from one admissible closure branch toward another, and the swarm resolves that transaction by retuning its cadence-scale closure.

The bookkeeping distinction is

$$
h=\text{action per accepted cycle},
\qquad
A_N=Nh,
\qquad
E_N=A_N\nu_N.
$$

Here $h$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $\nu_N$ is a representative cadence extracted from the closed nested shell swarm branch. A one-$h$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh$. The accepted branch may answer through one or more of the cadence, layer radii, envelope scale, envelope ratio, orientation, strain, and inter-layer wake-exchange variables:

$$
\Delta A_{\mathrm{cyc}}=\pm h
\quad\Rightarrow\quad
(\nu_N,\ R_I,R_M,R_O,\ \lambda,\ \xi,\ \mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO})
\longmapsto
(\nu_N',\ R_I',R_M',R_O',\ \lambda',\ \xi',\ \mathcal{G}_{IM}',\mathcal{G}_{IO}',\mathcal{G}_{MO}').
$$

In the simplest fixed-speed layer estimate,

$$
v_\ell\sim 2\pi R_\ell\nu_\ell,
\qquad
\ell\in\{I,M,O\}.
$$

If a branch keeps $v_\ell$ approximately fixed while accepting the transaction, then

$$
R_\ell\nu_\ell\approx\text{constant},
\qquad
\Delta\nu_\ell>0\Rightarrow\Delta R_\ell<0,
\qquad
\Delta\nu_\ell<0\Rightarrow\Delta R_\ell>0.
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)_q^{T}.
$$

Let $A_{\mathrm{cyc},q}(\mathbf{y},\mathcal{G})$ be the closed-cycle action ledger on that chart, and let

$$
\mathcal{C}_q(\mathbf{y},\mathcal{G})=0
$$

collect the integer phase-closure, causal-root, separator, inter-layer wake-exchange, and stability conditions that define the branch. A first-order accepted retuning with sign $\sigma\in\{+1,-1\}$ must satisfy

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h,
$$

together with the branch-preservation condition

$$
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0.
$$

If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-swarm drift.

The local cadence-scale retuning map is therefore the closure target

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}
:
(\Lambda_{\text{NC}},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right),
$$

where $\theta_{\mathrm{env}}$ records the local Noether-Sea and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

$$
\Delta\ln\nu_N
=
w_I^{(q)}\Delta\ln\nu_I
+
w_M^{(q)}\Delta\ln\nu_M
+
w_O^{(q)}\Delta\ln\nu_O,
\qquad
w_I^{(q)}+w_M^{(q)}+w_O^{(q)}=1,
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full nested shell swarm need not put the entire transaction into a single layer. One layer may tighten while another expands, and the outer envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether-Sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

## Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether swarms is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal swarms at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h$ itself. The fixed quantity is the closed-cycle action unit $h$; the branch variable is the total action level

$$
A_N=Nh,
\qquad
N\in\mathbb{Z}_{>0}.
$$

For the outer binary, write the outer action allocation as

$$
N_O=p_O^{(q)}N,
\qquad
I_O=N_O\hbar
=p_O^{(q)}N\frac{h}{2\pi}.
$$

Here $p_O^{(q)}$ is the branch share carried by the outer binary. With the reduced circular-action chart

$$
I_O=\mu_O^{\mathrm{rot}}R_O v_O,
$$

the action ledger determines the product

$$
\boxed{
R_O(N)\,v_O(N)
=
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}}.
}
$$

This is the part fixed directly by the $Nh$ action ledger. It says that a higher rest level must carry a larger radius-speed product, but it does not by itself decide whether the extra product appears as larger outer radius, higher outer speed, or both. The separate functions $R_O(N)$, $v_O(N)$, and

$$
f_O(N)=\frac{v_O(N)}{2\pi R_O(N)}
$$

therefore require one more branch-closure equation.

One possible closure is a branch-pinned speed. If the outer branch keeps

$$
v_O=\beta_Oc_f
$$

with fixed $\beta_O$, then

$$
\boxed{
R_O(N)
=
\frac{p_O^{(q)}Nh}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
\qquad
f_O(N)
=
\frac{\mu_O^{\mathrm{rot}}\beta_O^2c_f^2}
{p_O^{(q)}Nh}.
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
\frac{K_O}{4R_O^2}\mathcal{B}_O(\beta_O;\Lambda_O),
$$

and if $\mathcal{B}_O$ is approximately constant on the compared segment, then the same action product gives

$$
\boxed{
R_O\propto N^2,
\qquad
v_O\propto N^{-1},
\qquad
f_O\propto N^{-3}.
}
$$

Thus the $Nh$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether-Sea return terms decide the actual rest-level scaling.

If the outer binary instead carries a declared outer energy projection

$$
E_O(N)=\zeta_O^{(q)}\mu_O^{\mathrm{rot}}v_O^2,
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
\frac{p_O^{(q)}Nh\sqrt{\zeta_O^{(q)}}}
{2\pi\sqrt{\mu_O^{\mathrm{rot}}E_O(N)}}.
}
$$

This form is the safest way to use any external energy-level equation: insert the branch energy projection $E_O(N)$, then derive the corresponding outer radius and speed.

The same chart also gives a packing readout for the Noether-Sea medium. In a nearly spherical exclusion-envelope approximation, let

$$
R_{\mathrm{excl}}
=
\alpha_O^{(q)}R_O,
$$

where $\alpha_O^{(q)}$ converts the outer-binary radius into the selected exclusion-interface threshold. Equal exclusion-envelope center contact then occurs at

$$
d_{\mathrm{nn}}=2R_{\mathrm{excl}},
$$

and the densest ordinary equal-sphere center density is

$$
\rho_{\mathrm{core},\max}^{\#}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}.
$$

The legacy density symbol is retained as packing notation for this chart. It names the maximum center density of the relevant Noether swarm exclusion envelopes, not a separate swarm type. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{core},\max}^{\#}(N)
\propto
R_O(N)^{-3}.
$$

For example, the fixed-speed branch gives $\rho_{\mathrm{core},\max}^{\#}\propto N^{-3}$, while the bare inverse-square branch with approximately constant $\mathcal{B}_O$ gives $\rho_{\mathrm{core},\max}^{\#}\propto N^{-6}$. These are branch diagnostics, not competing definitions of a Noether swarm.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether-Sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_O^{(q)},\ \mu_O^{\mathrm{rot}},\ \alpha_O^{(q)},\ \mathcal{B}_O(\beta_O;\Lambda_O)
\longrightarrow
p_O(q,\theta_{\mathrm{env}}),\ \mu_O^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_O(q,\theta_{\mathrm{env}}),\ \mathcal{B}_O(\beta_O;\Lambda_O,\theta_{\mathrm{env}}).
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroid rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether-Sea delay data from the same branch label.

## Reduced Nested Shell Swarm Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced nested shell swarm closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{\text{NC}}$ is retained here as legacy notation:

$$
\Lambda_{\text{NC}}
=
\left(
k_I,k_M,k_O;\
\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O;\
\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO};\
\chi_c
\right).
$$

Here $k_I,k_M,k_O$ are the layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered swarm chirality; the current candidate data are the `HML/HLM` ordered-swarm distinction together with $Wr_c$ or a multi-component causal-writhe parity.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{\text{NC}}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible nested shell swarm closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{\text{NC}}^{\mathrm{align}}
=
\left.
\Lambda_{\text{NC}}
\right|_{\substack{
v_M=c_f,\;v_O\to c_f\\
\text{coplanar/co-linear binary layers}\\
\text{precession ceases}
}},
$$
with the remaining admissible entries inherited from the layer ledgers, inter-layer ledgers, chirality entry, and emitted wake envelope. For a connected block $U$ of alignment-area patches, the local label set to be counted has the schematic form
$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NC},a}^{\mathrm{align}}\right)_{a\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{O,\theta,W}.
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

## Geometry and Exclusion Envelope

The same nested shell swarm motion that supplies shielding also sweeps out a persistent dynamic exclusion envelope. That envelope is not the swarm definition itself; it is the geometric footprint of the nested assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [the nested shell swarm geometry chapter](nested-shell-swarm-geometry.md).

## The Nested Shell Swarm Hierarchy and Fermion Generations

The broader assembly program suggests reading the nested shell swarm hierarchy as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-binary shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **Nested shell swarm:** the fully shielded three-tier swarm, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether Sea](../assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../assemblies/fermions/electron.md).

## Nested Shell Swarm Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its shell scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across the nested shell swarm.

As a nested shell swarm approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune. At the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell swarm coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Swarm Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md).

## The Foundation for Fermions

The Noether swarm class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether swarm assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/quantum-statistics.md): volumetric Noether swarm envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.
