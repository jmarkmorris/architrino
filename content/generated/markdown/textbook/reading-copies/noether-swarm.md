# Noether Swarm

## Noether Swarm

The **Noether swarm** is the reader-facing class of neutral six-architrino assembly scaffolds used in the Noether sea and particle-architecture program. A Noether swarm is not assumed at the outset to be a set of exact binaries. The base object is a closed, polarity-neutral, bounded-speed six-body branch in which three positive-polarity architrinos and three negative-polarity architrinos maintain a persistent causal-return ledger.

This chapter uses three swarm types:

| Term | Definition | Additional structure |
| --- | --- | --- |
| **neutral swarm** | The broad six-architrino neutral case before any required binary grouping or radial organization. | Polarity balance and causal-return bookkeeping. |
| **shell swarm** | A neutral swarm whose six architrino paths remain in a controlled radial support band. | Radial support control, with near-antipodality only as an optional constraint. |
| **nested shell swarm** | A shell swarm with three ordered radial support bands. | The old three-layer picture; exact binaries are an additional proof assumption, not a separate swarm type. |

These definitions name case structure, not retained-branch existence. A neutral swarm requires six-body polarity balance and causal-return bookkeeping; a shell swarm adds radial support and recovery residuals; a nested shell swarm adds ordered support bands. Exact binary nesting, stable all-pairs roots, and observer-export behavior are theorem targets that must be certified by the branch ledger rather than read back into the definition.

Older chapters in the corpus use **Noether swarm**, **nested shell swarm**, and **nested binary** for material that usually belongs to the nested shell swarm case. This chapter treats that structure as a special case of the broader Noether swarm class. The downstream corpus still mostly describes the nested shell swarm and has not yet been generalized; the older terms should therefore be read as nested shell swarm terminology unless a later page explicitly promotes the more general swarm case. The swarm's dynamic envelope geometry is developed separately in [the nested shell swarm geometry chapter](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md), while metric-level translation belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

### Neutral Swarm

A **neutral swarm** is the base six-architrino case. It contains six architrinos indexed by $i\in\{1,\ldots,6\}$, with polarity signs $\sigma_i\in\{+1,-1\}$ satisfying

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_{i=1}^{6}\sigma_i=0.
$$

This polarity-neutral ledger is imposed before any binary partition, shell ordering, or near-antipodal matching is assumed. Each positive-polarity architrino has three attractive channels to negative-polarity architrinos and two repellent channels to the other positive-polarity architrinos. Each negative-polarity architrino has the polarity-reversed version of the same count: three attractive channels to positives and two repellent channels to negatives. That $3+2$ channel count is part of the neutral swarm bookkeeping even when no binary partition has been certified.

The intrinsic path of architrino $i$ may be represented by a closed arclength curve

$$
Y_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\left\| Y_i'(s)\right\|=1,
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

### Retained-Branch Certificate Target

The present neutral swarm claim is a theorem target, not a retained-branch result. A candidate branch $B$ over a test window $W$ is retained only if the required rows close on one ledger identity. The master certificate can be summarized as

$$
\mathsf{R}_{\mathrm{NS}}(B,W)
=
\left(
\mathsf{Inventory},
\mathsf{Curves}^{\nu},
\mathsf{Support},
\mathsf{Root}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Dynamics}^{\nu},
\mathsf{Action}_{\Gamma}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Convergence},
\mathsf{Status}
\right).
$$

The corresponding retention predicate is

$$
\mathrm{Retain}_{\mathrm{NS}}(B,W)
\Longleftrightarrow
P_{\mathrm{inventory}}
\wedge
P_{\mathrm{curves}}
\wedge
P_{\mathrm{support}}
\wedge
P_{\mathrm{root}}
\wedge
P_{\mathrm{tail}}
\wedge
P_{\mathrm{dyn}}
\wedge
P_{\Gamma}
\wedge
P_{\mathrm{Noether}}
\wedge
P_{\mathrm{event}}
\wedge
P_{\mathrm{stab}}
\wedge
P_{\mathrm{conv}}.
$$

Every predicate in this conjunction must use the same source-pair policy, same-source policy, memory depth, support descriptor, action convention, event interval, and inventory ledger. If any row changes those conventions, the status is a ledger mismatch rather than a retention result.

The root row begins with all ordered distinct source pairs,

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30.
$$

The $3$ attractive and $2$ repellent source-site counts for each receiver are inventory facts, not a compressed force law. The force row must still be assembled from the actual retained causal roots, delays, Jacobian floors, and line-of-action vectors for these ordered pairs. A shell swarm or nested shell swarm can reduce this ledger only after its reduction row proves how the compressed rows are inherited from the all-pairs ledger.

The certificate should report the first blocking row as

$$
\mathsf{F}_{\mathrm{NS}}(B,W)
=
\left(
\mathrm{first\_failed\_row},
\mathrm{ledger\_id},
\mathrm{margin},
\mathrm{blocking\_packet},
\mathrm{repair\_or\_rejection}
\right).
$$

Rows through convergence block branch retention. Case-reduction and observer-export rows classify downstream structure only after the required neutral rows close. Therefore a favorable Lorentz, photon, topology, mass-map, or shell-geometry diagnostic cannot rescue an open root, tail, dynamics, action, event, stability, or convergence row.

Current fixed-speed octahedral diagnostics have produced scoped negative results. For the rigid zero-offset octahedral carrier, the all-pairs causal-root ledger is certified for all $30$ ordered distinct source pairs, with one positive-delay root per row, support-complete memory depth $h_{\mathrm{mem}}=2$, and a positive Jacobian floor. This root-ledger result does not retain the branch. The rigid zero-offset fixed-speed neutral row has a certified nonzero tangential residual at the receiver node $((1,+),0)$,

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232],
$$

so that narrow branch chart is rejected. The diagnostic family also rejects several overreads: the ordinary same-source positive-delay rescue is absent under the rigid exact-$c_f$ circular convention, inventory attraction bias does not imply force closure, resolved positive-delay root rows do not imply force closure, and sampled phase or polarity-phase improvements do not imply retention. These are negative results for rigid fixed-speed octahedral hypotheses, not rejections of the broader neutral swarm, shell swarm, nested shell swarm, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

### Shell Swarm

A **shell swarm** is a neutral swarm whose six trajectories remain in a controlled radial band around a branch center $C(t)$. For a representative shell scale $R_*$ and band limits $R_-<R_+$, the shell condition is

$$
R_-\leq
\left\| X_i(t)-C(t)\right\|
\leq R_+,
\qquad
i=1,\ldots,6.
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}},
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell swarm. It is a one-band neutral swarm whose support is spatially organized strongly enough to produce a persistent exclusion envelope, shielding pattern, and Noether sea coupling channel.

Near-antipodality is an optional shell swarm constraint, not a definition of the neutral swarm. A shell branch may carry an approximate polarity-reversing matching $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$. Relative to a branch center $C(t)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(t)
=
\frac{
\left\| X_i(t)+X_{\iota(i)}(t)-2C(t)\right\|
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

### Nested Shell Swarm

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

In this case, a candidate stable configuration is the **nested shell swarm with exact binary assumptions**. It consists of three binaries, one in each ordered shell, and supplies the assembly scaffold later used in [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md).

-   **Why Three?** The stability of a three-shell nested structure is a theorem target tied to the three-dimensional nature of Euclidean space. Each binary defines an orbital plane or dominant support sheet. The working claim is that three mutually orthogonal support sheets can form a dynamically stable, symmetric, three-dimensional structure that is resistant to perturbation; the proof burden is to derive that role count from the delayed causal dynamics rather than assuming it.

-   **Why "Noether"?** This swarm family is named in honor of Emmy Noether. Noether's theorem links symmetries in physical systems to conserved quantities. The highly symmetric nested shell swarm is the candidate scaffold through which spin, branch-quantized energy records, and other conserved observer-level labels should be recovered from closure labels and emitted causal-wake envelopes.

### Properties of the Nested Shell Swarm

-   **Energy-Separated Scales:** In low-energy nested shell swarm conditions, the three shell binaries have energy-separated orbital radii and cadences. The innermost binary is the smallest and fastest, while the outermost is the largest and slowest. This separation of scales is crucial for the system's stability.

-   **Internal Stabilization:** The system is expected to be stable only on branches where the high-frequency causal-wake emissions from the innermost binary, inter-layer wake exchange, and outer-layer shielding close into a persistent return cycle. The time-averaged potential picture is useful, but the theorem burden is to show that the root ledger, phase closure, and separator conditions keep the coupled hierarchy on the same branch.

-   **Energy Shielding via Superposition:** From a distance, a nested shell swarm appears to have far less energy and a much smaller potential signature than the raw sum of its six constituent architrinos. The rapid oscillation of the positive- and negative-polarity architrinos within the nested structure causes their wake contributions to largely cancel out through superposition. This shielding effect is the working mechanism for how highly energetic structures can form the basis for relatively low-mass observed particles; quantitative extraction remains a mass-map closure target.

### Integer Phase-Closure States

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

On this reading, an accepted energy-level change is a one-$h$ closed-cycle action transaction that moves the nested shell swarm from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned swarm should therefore carry information about the swarm's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the swarm.

The same closure-label machinery is the native carrier for branch-quantized Lorentz response. A moving nested shell swarm should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-layer retuning of radii, frequencies, characteristic speeds, and wake exchange; the outer envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the usual effective $\gamma(v)$ within the preferred-frame leakage bound.

### Cadence-Scale Retuning Hypothesis

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
(\Lambda_{\text{NS}},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right),
$$

where $\theta_{\mathrm{env}}$ records the local Noether sea state and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

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

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

### Rest-Level Scaling Curve

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

Thus the $Nh$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether sea return terms decide the actual rest-level scaling.

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

The same chart also gives a packing readout for the Noether sea. In a nearly spherical exclusion-envelope approximation, let

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
\rho_{\mathrm{NS},\max}^{\#}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}.
$$

The legacy density symbol is retained as packing notation for this chart. It names the maximum center density of the relevant Noether swarm exclusion envelopes, not a separate swarm type. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{NS},\max}^{\#}(N)
\propto
R_O(N)^{-3}.
$$

For example, the fixed-speed branch gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while the bare inverse-square branch with approximately constant $\mathcal{B}_O$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. These are branch diagnostics, not competing definitions of a Noether swarm.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_O^{(q)},\ \mu_O^{\mathrm{rot}},\ \alpha_O^{(q)},\ \mathcal{B}_O(\beta_O;\Lambda_O)
\longrightarrow
p_O(q,\theta_{\mathrm{env}}),\ \mu_O^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_O(q,\theta_{\mathrm{env}}),\ \mathcal{B}_O(\beta_O;\Lambda_O,\theta_{\mathrm{env}}).
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroid rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

### Reduced Nested Shell Swarm Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced nested shell swarm closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{\text{NS}}$ is retained here as legacy notation:

$$
\Lambda_{\text{NS}}
=
\left(
k_I,k_M,k_O;\
\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O;\
\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO};\
\chi_c
\right).
$$

Here $k_I,k_M,k_O$ are the layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered swarm chirality; the current candidate data are the `HML/HLM` ordered-swarm distinction together with $Wr_c$ or a multi-component causal-writhe parity.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{\text{NS}}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible nested shell swarm closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{\text{NS}}^{\mathrm{align}}
=
\left.
\Lambda_{\text{NS}}
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
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{O,\theta,W}.
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

### Geometry and Exclusion Envelope

The same nested shell swarm motion that supplies shielding also sweeps out a persistent dynamic exclusion envelope. That envelope is not the swarm definition itself; it is the geometric footprint of the nested assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [the nested shell swarm geometry chapter](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md).

### The Nested Shell Swarm Hierarchy and Fermion Generations

The broader assembly program suggests reading the nested shell swarm hierarchy as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-binary shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **Nested shell swarm:** the fully shielded three-tier swarm, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../../../../markdown/aaa/assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md).

### Nested Shell Swarm Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its shell scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across the nested shell swarm.

As a nested shell swarm approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune. At the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell swarm coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Swarm Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md).

### The Foundation for Fermions

The Noether swarm class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether swarm assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/quantum-statistics.md): volumetric Noether swarm envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.

## Neutral Swarm

## Shell Swarm

## Nested Shell Swarm

## Nested Shell Swarm Dynamics

This chapter formulates nested shell swarm dynamics by extending the two-body delayed causal-wake system to a nested shell swarm with three coupled shell binaries. Its focus is the branch geometry, high-speed response, gradient response, and diagnostic quantities needed to assess stability and alignment in absolute substrate time.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [Noether Swarm](../../../../markdown/aaa/noether-swarm/noether-swarm.md), and [Nested Shell Swarm Geometry](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, and exclusion-envelope geometry.

This chapter is the canonical dynamics home for coupled three-binary speed regimes, alignment behavior, and assembly-stability mechanisms inside the nested shell swarm variant. Primitive architrino ontology supplies the transceivers, polarities, causal wakes, and causal-root law; coupled stability mechanisms belong here and in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md).

### Relation to Causal Closure

This chapter owns the dynamics baseline: the nested shell swarm roles, speed-regime conventions, delay-envelope geometry, gradient response, local cycle-period diagnostics, and stability tests that define the nested shell swarm mechanism. It does not try to close the full rest-mass, photon, or observer-inference proof program.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $t$. A nested shell swarm branch may output absolute periods, causal-root ledgers, deformation tensors, and stability residuals; later observer-inference chapters may translate those outputs into clock, ruler, signal, and effective-geometry language.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

### Claim Scope

The claims in this chapter define a canonical dynamics baseline. They do not yet constitute a completed derivation of rest mass, photon behavior, or general relativity from first principles. The claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Nested shell swarm roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, cycle-period diagnostics, and stability tests. |
| Reconstruction target | Mass response, photon-channel behavior, observer-inference exports, and weak-field matching inputs as quantities to be derived from the dynamics before downstream interpretation. |
| Open proof burden | Nested shell swarm minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle export bounds, and downstream observer-geometry closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

### Causal-Closure Certificate Target

The rest-mass, moving-deformation, photon, observer-export, and event-ledger rows should be populated by one retained branch record, not by separately tuned fits. Retention is the conclusion of the certificate, not an assumption made before the rows are checked. For a candidate nested shell swarm chart $q$ over a test window $W$, the shared certificate target is

$$
\mathcal{C}_{\mathrm{tri}}^{(q)}(W)
=
\left(
\mathcal{A}_q,
\nu_J^{(q)},
g_{\mathrm{inactive}}^{(q)},
h_{\mathrm{mem}}^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{D}_{\beta,q}^{\mathrm{mov}},
T_q(\mathbf{w}),
\mathcal{M}_{\mathrm{sea},q}^{ab},
\mathcal{R}_{\mathrm{mov},q},
\theta_{\mathrm{obs}}^{(q)},
\mathfrak{S}^{(q)}(W),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right).
$$

Here $\mathcal{A}_q$ is the active causal-root ledger, $\nu_J^{(q)}$ the active Jacobian floor, $g_{\mathrm{inactive}}^{(q)}$ the inactive-root gap, $h_{\mathrm{mem}}^{(q)}$ the finite memory depth, and $\Delta_{\mathbf{k}}^{(q)}$ the Floquet or branch-stability gap. The remaining rows record the moving deformation map, absolute branch period, medium-dressed mass-response tensor, moving-branch residual, observer-export packet, active sector residuals, and row-indexed event ledger. The observer-export packet is not an effective metric or clock law; it is the branch-certified data that later observer-inference chapters must consume.

The branch identity check is

$$
d_{\mathcal{A}}^{(q)}
=
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{per}}^{(q)},
\mathcal{A}_{\mathrm{env}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{env}}^{(q)},
\mathcal{A}_{\mathrm{sig}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{sig}}^{(q)},
\mathcal{A}_{\mathrm{event}}^{(q)}
\right).
$$

The candidate chart may be promoted to a retained branch class $q$ only if the same ledger supplies a positive Jacobian floor, inactive-root gap, finite memory depth, positive stability gap, closed event ledger, and the normalized closure residual

$$
\mathcal{U}_{\mathrm{tri}}^{(q)}(W)
=
\max\left(
\frac{d_{\mathcal{A}}^{(q)}}{\epsilon_{\mathcal{A}}},
\frac{\left\|\mathcal{R}_{\mathrm{mov},q}\right\|_W}{\epsilon_{\mathrm{mov}}},
\frac{\left\|\mathcal{M}_{\mathrm{sea},q}^{ab}-h^{ab}/c_{\text{eff}}^2\right\|_W}{\epsilon_{\mathrm{mass}}},
\frac{R_{\mathrm{div}T}^{(q)}+R_{\mathrm{Pois}}^{(q)}+R_{\mathrm{EFE}}^{(q)}+R_{\mathrm{var}}^{(q)}}{\epsilon_{\mathrm{GR}}},
\sup_{S\in\mathfrak{S}^{(q)}(W)}
\frac{\left\|\mathcal{R}_S^{(q)}\right\|_W}{\epsilon_S},
\frac{\left\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}\right\|_W}{\epsilon_{\mathrm{led}}}
\right)
\le1.
$$

This is a certificate target, not an additional force law. It prevents a moving-deformation ratio, a mass-response average, a photon row, or an observer-export residual from being promoted unless the same causal-root branch supplies the period, envelope, signal, observer-export, mass, sector, and event-ledger data. If a row fails on $q$, the verdict is a rejected chart or continuation target under its declared hypotheses, not evidence against the broader neutral swarm or shell swarm class.

### Substrate and Effective Levels

Nested shell swarm dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $t$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Nested shell swarms, three coupled shell binaries, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Observer-inference exports | Rest mass, photon propagation, reconstructed kinematics, geodesics, and horizon behavior as later reconstructed by assembly-built observers. |
| Inference and closure status | Mathematical closures that remain to be derived before effective claims can be treated as proved rather than reconstructed. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter only as observer-level bookkeeping reconstructed downstream from Noether sea state variables and assembly response.

### Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf{x},t)$ | Noether sea dressed assembly-channel propagation speed used only after a downstream observer-channel map has been declared. |
| $c_\gamma(\mathbf{x},t)$ | Local photon-channel speed; equality with $c_{\text{eff}}(\mathbf{x},t)$ is a photon-channel closure target for the working observer-level photon branch, not a definition. |
| Locally measured light speed | The operational speed reconstructed downstream from assembly periods, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ belongs to Noether sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level periods, rulers, or photons must declare its dressing map outside the primitive branch calculation.

### Multi-Scale Layer Locking

The baseline nested shell swarm is not a stack of three identical circular binaries. It is a nested causal lock whose shells operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of shell $\ell$ around that shell's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f.
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $\|\mathbf{v}\| = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable shell ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the nested shell swarm closure problem. In a coupled lock, inter-shell wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

The same distinction applies to compact nested shell swarm carriers. A finite-coordinate no-go for one compact carrier rejects that branch chart and its declared coordinates; it does not falsify the $A_0$ branch program. Raw root-key splits, observation-phase bins, and fitted residual bases remain diagnostic unless they belong to a branch-native coordinate declared before fitting. A checker-cleared coordinate may seed only a rerun candidate; it is not physical branch structure until the same branch identity survives root-ledger transport, residual checks, and stability continuation.

The perturbation status should therefore be sorted before simplification:

| Perturbation class | Dynamics role |
| --- | --- |
| Nonresonant fast terms | Average over the closed nested shell swarm cycle and mostly affect convergence or small far-field corrections. |
| Resonant and near-separator terms | Change phase closure, causal-root counts, Jacobians, or Floquet multipliers, so they remain part of the branch definition. |
| Leakage terms | May be small internally while surviving as far-field multipoles or anisotropy, so they control the shielding extraction. |

### Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A),
$$

where $E_{\text{internal}}(A)$ is the trapped internal causal-history ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed nested shell swarm dynamics.

### Spiral-Helical Motion Picture

A resting nested shell swarm is modeled as a nested, phase-locked structure with three coupled binary planes. When the swarm moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the inner, middle, and outer layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

### All-Layer Translating Branch Response

A translating nested shell swarm is not described by one outer radius alone. The hidden state includes all three shell radii, frequencies, characteristic speeds, axes, active causal roots, and wake exchange:
$$
B_q(v)
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
s_I,s_M,s_O;\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q.
$$

The moving-branch extraction starts with a primitive drift band
$$
\mathcal{D}_{\beta_f}=\{\,0\le \|\mathbf{v}_{\text{trans}}\|/c_f\le\beta_{\max}<1\,\}.
$$
All causal roots in the branch ledger are solved with $c_f$ and absolute time $t$. No dressed observer-channel speed is allowed inside this branch calculation.

For the same admitted branch $q$, extract semiaxes from the cycle-averaged nested shell swarm shape tensor
$$
Q_{ab}^{(q)}(\mathbf{v}_{\text{trans}})
=
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i.
$$
With drift direction $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, define
$$
R_{\parallel,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}\hat e_{\parallel}^{b}},
\qquad
R_{\perp,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}}.
$$
The physical branch period is extracted from a declared layer or composite phase on that same branch ledger:
$$
T_q(\mathbf{v}_{\text{trans}})
=
\frac{2\pi}{\langle\dot{\theta}_{q}\rangle_{\mathrm{cyc}}},
\qquad
T_{q,0}=T_q(\mathbf{0}),
$$
where the dot means $d/dt$ with respect to absolute substrate time.

#### Absolute Cycle-Stretch Theorem Target

Let
$$
N_{\text{hits},q}
=
\left(
N_{\ell\rho}^{(q)}
\right)_{\ell\in\{I,M,O\},\,\rho\in\{\mathrm{self},\mathrm{partner},\mathrm{inter}\}}
\in\mathbb{N}^{m_q}
$$
be the integer ledger of causal roots required to complete one primitive branch rotation. Its total hit count is
$$
|N_{\text{hits},q}|_1
=
\sum_{\ell,\rho}N_{\ell\rho}^{(q)}.
$$
Preserving the same branch means preserving this integer ledger, the source identities of the roots, their emission-order classes, the positive Jacobian floor, and the phase-return condition over the whole cycle.
Equivalently, let $\mathcal{H}_q$ be the ordered multiset of retained hit rows represented by $N_{\text{hits},q}$.

For a retained transverse closure row $a$ with rest closure length $\ell_a>0$, a translating receiver must intercept the wake after both the internal closure displacement and the center translation have occurred. In the reduced orthogonal row,
$$
c_f^2\left(\Delta t_a\right)^2
=
\ell_a^2
+
\|\mathbf{v}_{\text{trans}}\|^2\left(\Delta t_a\right)^2,
$$
so
$$
\Delta t_a(\mathbf{v}_{\text{trans}})
=
\frac{\ell_a}{\sqrt{c_f^2-\|\mathbf{v}_{\text{trans}}\|^2}}
=
\frac{\Delta t_a(\mathbf{0})}
{\sqrt{1-\|\mathbf{v}_{\text{trans}}\|^2/c_f^2}}.
$$
Thus any retained ledger that requires nonzero transverse closure rows has a larger absolute-time delay per such row when $\mathbf{v}_{\text{trans}}\ne\mathbf{0}$, unless the internal geometry retunes. A branch-period decomposition has the schematic form
$$
T_q(\mathbf{v}_{\text{trans}})
=
\sum_{a\in \mathcal{H}_q}
\Delta t_a(\mathbf{v}_{\text{trans}})
+
\mathcal{R}_{\mathrm{phase},q},
$$
where $\mathcal{R}_{\mathrm{phase},q}$ records finite-memory, inter-layer, and phase-return corrections on the same retained branch chart. The theorem target is:
$$
N_{\text{hits},q}(\mathbf{v}_{\text{trans}})=N_{\text{hits},q}(\mathbf{0}),
\quad
\nu_J^{(q)}>0,
\quad
\Delta_{\mathbf{k}}^{(q)}>0
\quad\Longrightarrow\quad
T_q(\mathbf{v}_{\text{trans}})\ge T_{q,0},
$$
with strict inequality for nonzero translation unless a compensating shape retuning changes the relevant $\ell_a$ rows. This is an absolute-time period theorem target, not a statement about observer clock time.

#### Mechanical Oblation From the Jacobian

The causal Jacobian is the dynamics-side mechanism behind the moving-source flux change that standard field language would otherwise hide inside a changing electric field. For a retained root row $a=(i,j,t_0)$,
$$
J_a
=
1-
\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf r}_{ij}(t;t_0)}{c_f},
\qquad
w_a
=
\frac{1}{r_a^2|J_a|}.
$$
The branch force contribution is proportional to $w_a\hat{\mathbf r}_a$. Decompose the source velocity into center translation plus internal motion,
$$
\mathbf{v}_j(t_0)
=
\mathbf{v}_{\text{trans}}
+
\mathbf{u}_j(t_0).
$$
On a retained chart away from grazing, the translation part changes the received weight by
$$
|J_a|^{-1}
=
\left|
1-
\frac{\mathbf{v}_{\text{trans}}\cdot\hat{\mathbf r}_a}{c_f}
-
\frac{\mathbf{u}_j(t_0)\cdot\hat{\mathbf r}_a}{c_f}
\right|^{-1}.
$$
Cycle-paired longitudinal rows with $\hat{\mathbf r}_a=\pm\hat{\mathbf e}_{\parallel}$ acquire the symmetric translation weight
$$
\frac12
\left(
\frac{1}{1-\beta_f}
+
\frac{1}{1+\beta_f}
\right)
=
\frac{1}{1-\beta_f^2},
\qquad
\beta_f=\frac{\|\mathbf{v}_{\text{trans}}\|}{c_f},
$$
whereas ideal transverse rows with $\mathbf{v}_{\text{trans}}\cdot\hat{\mathbf r}_a=0$ do not receive this translation amplification at the same order. Therefore the same radial inverse-square law becomes anisotropic after the branch is translated:
$$
\langle w\rangle_{\parallel}
-
\langle w\rangle_{\perp}
\sim
\frac{1}{r^2}
\left(
\frac{1}{1-\beta_f^2}-1
\right)
+\mathcal{R}_{u,J}.
$$
Here $\mathcal{R}_{u,J}$ records internal-motion, unequal-radius, finite-memory, and unpaired-row corrections.

For attractive partner rows this larger longitudinal weight increases the cycle-averaged longitudinal restoring stiffness. If $K_{\parallel}^{(q)}$ and $K_{\perp}^{(q)}$ denote the Hessian projections of the retained branch potential reconstructed from the same Jacobian-weighted rows, the oblation target is
$$
K_{\parallel}^{(q)}
>
K_{\perp}^{(q)}
\quad\Longrightarrow\quad
\frac{R_{\parallel,q}}{R_{\perp,q}}
\sim
\sqrt{\frac{K_{\perp}^{(q)}}{K_{\parallel}^{(q)}}}
<1.
$$
The physical squash into an oblate $R_{\parallel}<R_{\perp}$ branch is therefore not imported from a relativistic metric. It is the mechanical response to the $1/|J|$ wake-flux asymmetry created by translating the same causal-root ledger through the Euclidean void.

A one-$h$ closed-cycle action transaction is a candidate map between stable branch states,
$$
B_q(\mathbf{v}_{\text{trans}})
\longrightarrow
B_{q'}(\mathbf{v}_{\text{trans}}+\Delta\mathbf{v}),
$$
subject to the all-layer action and energy ledgers
$$
\Delta A_{\mathrm{cyc}}\equiv\Delta A_{\text{cycle}}=\sigma h,
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}=\sigma\hbar,
$$
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}.
$$
Thus acceleration, absorption, or any accepted transaction can change all three $\omega_\ell$, all three $R_\ell$, and all three $s_\ell$. The outer binary is the leading envelope projector because it is the exposed boundary layer. The middle binary remains the separator-sensitive hinge, and the inner binary remains the self-hit/history-supported engine. Dropping the middle or inner layer is therefore a reduced observable model, not a proof of translating-branch closure.

### Cadence-Scale Retuning Closure

The retuning-map problem is the local dynamics version of the one-$h$ transaction. On a branch chart $q$, define

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)^{T},
\qquad
\omega_\ell=2\pi\nu_\ell.
$$

The layer-speed identities give the first kinematic constraint:

$$
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}.
$$

The simple inverse rule $\Delta\ln R_\ell=-\Delta\ln\nu_\ell$ is therefore valid only on a sub-branch where $\Delta\ln s_\ell=0$. The ordinary nested shell swarm speed hierarchy instead imposes inequalities and hinge tolerances:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f,
$$

where primed quantities are evaluated after retuning and $\epsilon_M$ is the declared middle-hinge tolerance. A transaction that violates these conditions is not a smooth retuning inside the same regime; it is a branch event at the speed-regime boundary.

The first calculable closure can be written as a constrained compliance problem. Let $\mathcal{C}_q(\mathbf{y},\mathcal{G})=0$ collect the phase-closure, causal-root, separator, inter-layer exchange, and stability constraints. Let $\mathbf{K}^{\mathrm{ret}}_q$ be the positive semidefinite local compliance matrix for retuning costs on the declared branch chart. Then the candidate increment is

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}
\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y},
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h,
\qquad
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0,
$$

and to the post-retuning speed-regime inequalities above. The matrix $\mathbf{K}^{\mathrm{ret}}_q$ is not a new force law. It is the local second-variation record of how costly it is for the accepted branch to place the action increment into cadence, layer scale, envelope shape, orientation, or wake exchange. In a simulation, it should be estimated from the linearized return map or from finite retuning trials around an admitted branch.

The cadence-scale retuning map is then the projection

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}
=
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y}_{q,\sigma},
\Delta\mathcal{G}_{q,\sigma}
\right),
$$

with

$$
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y},
\Delta\mathcal{G}
\right)
=
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right).
$$

This map is falsifiable at the branch level. It fails if no admissible minimizer exists, if the minimizer crosses a separator while being treated as same-branch drift, if the middle hinge leaves its declared tolerance, if the envelope projection and branch-period stretch come from different retained ledgers, or if the wake-ledger residual is large enough to survive hierarchy averaging. These are not bookkeeping nuisances; they are the diagnostics that decide whether the same one-$h$ transaction can become the Noether sea cadence current used in cosmology.

The first reduced validation model for this target is [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), with runtime script `scripts/nested-shell-swarm/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

### Observer-Inference Export Boundary

This dynamics chapter exports branch-certified substrate records, not observer geometry. The reusable export packet is
$$
\mathcal{E}_{q}^{\mathrm{obs}}
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right).
$$
Every entry is computed in absolute time from the retained causal-root chart. Later observer-inference chapters may ask whether this packet recovers clock behavior, ruler behavior, photon synchronization, or effective geometry. Those are downstream recovery tests. They are not definitions, assumptions, or integration variables in nested shell swarm dynamics.

### Terminal Alignment Label-Count Target

The black-hole entropy route requires a dynamics-side label calculation. Once a nested shell swarm branch is driven to terminal alignment, the dynamics should output the admissible alignment-restricted closure labels and their neighbor-compatibility rules. For a connected block $U$ of horizon-adjacent alignment patches, the object is
$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\text{all layer ledgers close, edge wake ledgers match, and } \theta \text{ is preserved}
\right\}
/
\sim_{O,\theta,W}.
$$

The first calculation route is a transfer-compatibility problem. Fix a local strip direction $\nu$ on the horizon-adjacent interface. Let $\Lambda_{\theta}^{\mathrm{loc}}$ be the set of one-patch labels $\lambda$ obtained from $\Lambda_{\text{NS}}^{\mathrm{align}}$ after imposing one-patch layer closure, terminal-alignment conditions, and the Physical Observer quotient for the declared record $\theta$. Each $\lambda\in\Lambda_{\theta}^{\mathrm{loc}}$ carries two edge projections $\mathcal{E}_{\nu}^{-}(\lambda)$ and $\mathcal{E}_{\nu}^{+}(\lambda)$: the active causal-root, winding, emission-order, Jacobian-branch, and wake-exchange data presented to the two neighboring patches in the $\nu$ direction.

Define the pair-compatibility predicate $\mathcal{C}_{\theta,\nu}(\lambda,\lambda')$ to hold exactly when:

- $\mathcal{E}_{\nu}^{+}(\lambda)=\mathcal{E}_{\nu}^{-}(\lambda')$ up to the declared observer tolerance,
- the edge balance satisfies $(\Delta E,\Delta\mathbf{p},\Delta\mathbf{J},\Delta q)_{\lambda,\lambda'}=(0,\mathbf{0},\mathbf{0},0)$,
- the chirality entry $\chi_c$ and axial-frame orientation remain compatible under the coplanar/co-linear terminal-alignment condition,
- and the combined pair projects to the same observer record, $\mathcal{R}_{O,W}(\lambda,\lambda')=\mathcal{R}_{O,W}^{\theta}$.

The first counting matrix is therefore
$$
\left(\mathsf{T}_{\theta,\nu}\right)_{\lambda\lambda'}
=
\begin{cases}
1, & \mathcal{C}_{\theta,\nu}(\lambda,\lambda'),\\
0, & \text{otherwise},
\end{cases}
\qquad
\lambda,\lambda'\in\Lambda_{\theta}^{\mathrm{loc}}.
$$
This is a counting matrix, not a thermodynamic weight. For an open strip of $N$ patches,
$$
\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\mathbf{1}^{T}
\mathsf{T}_{\theta,\nu}^{N-1}
\mathbf{1}
+
\mathcal{O}(\epsilon_{\mathrm{edge}}),
$$
while a periodic strip uses $\mathrm{Tr}(\mathsf{T}_{\theta,\nu}^{N})$. If the label set is finite and the transfer rule is local, the strip entropy density is
$$
s_{\mathrm{align}}(\theta;\nu)
=
\lim_{N\to\infty}
\frac{1}{N}
\log\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\log\rho(\mathsf{T}_{\theta,\nu}),
$$
where $\rho$ is the spectral radius. In a two-dimensional patch network the same target becomes the subadditive pressure
$$
s_{\mathrm{align}}(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U(\theta)\right|,
$$
with the limit taken over blocks whose boundary-to-area ratio vanishes.

One algebraic obstruction fixes the status of the raw label-density target. A single finite unweighted or algebraic-weighted transfer matrix cannot by itself yield an exact raw coefficient $s_{\mathrm{align}}=1/4$: the spectral radius $\rho(\mathsf{T}_{\theta,\nu})$ is algebraic, while $\log\rho=1/4$ would require $\rho=e^{1/4}$, which is transcendental by Lindemann-Weierstrass. The black-hole coefficient is therefore the area-normalized density, not the raw label density by itself. If $A_{\theta}(U)$ is the effective observer-level area represented by a block and $A_{\text{align}}$ is the alignment-area scale from the Planck-alignment map, define
$$
a_{\theta}
=
\lim_{|U|\to\infty}
\frac{A_{\theta}(U)}
{|U|A_{\text{align}}},
\qquad
\bar{\alpha}_{\mathrm{align}}(\theta)
=
A_{\text{align}}
\lim_{|U|\to\infty}
\frac{\log|\mathcal{L}_U(\theta)|}{A_{\theta}(U)}
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}.
$$
The horizon target is
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
\longrightarrow
\frac{1}{4}.
$$
The special raw statement $s_{\mathrm{align}}\to1/4$ is valid only when the terminal branch also derives $a_{\theta}\to1$. Exact recovery can therefore come from an asymptotic transfer system, a weighted pressure, a block-density limit with derived area normalization, or an explicitly approximate tolerance target rather than one fixed counting matrix. A finite computation should report a convergence criterion of the form
$$
\left|
\frac{s_N(\theta)}{a_N(\theta)}
-
\frac{1}{4}
\right|
\le
C\frac{|\partial U_N|}{|U_N|}
+
\epsilon_{\mathrm{branch}}
+
\epsilon_{\mathrm{quot}},
$$
where $a_N(\theta)=A_{\theta}(U_N)/(|U_N|A_{\text{align}})$. This tests the area coefficient as a controlled limit rather than hiding it inside one finite count.

**Finite-block coefficient enumerator.** A reduced enumerator can now report the coefficient target without pretending to solve the full terminal dynamics. For a finite connected block $U_N$ of candidate labels, compute
$$
s_N(\theta)
=
\frac{1}{|U_N|}
\log|\mathcal{L}_{U_N}(\theta)|,
\qquad
a_N(\theta)
=
\frac{A_{\theta}(U_N)}
{|U_N|A_{\text{align}}},
\qquad
\bar{\alpha}_N(\theta)
=
\frac{s_N(\theta)}{a_N(\theta)}.
$$
The finite-block residual vector is
$$
\mathcal{R}_{\mathrm{coeff}}(U_N,\theta)
=
\left(
\left|\bar{\alpha}_N(\theta)-\frac{1}{4}\right|,
\frac{|\partial U_N|}{|U_N|},
\epsilon_{\mathrm{branch}},
\epsilon_{\mathrm{area}},
\epsilon_{\mathrm{quot}},
\epsilon_{\mathrm{cons}},
\epsilon_{\mathrm{var}}
\right).
$$
Here $\epsilon_{\mathrm{area}}$ records how much the patch-area assignment varies across the retained block, $\epsilon_{\mathrm{cons}}$ is the conservation-ledger residual, and $\epsilon_{\mathrm{var}}$ is the action-variation residual inherited from the terminal branch scaffold below. This object is the right simulation output: it can pass, fail, or converge under refinement without turning the coefficient into a definition.

**Current reduced-adapter status.** The present reduced circular packet family does not converge to the target coefficient. In the tested $3\le n\le5$ packets, the edge proxy gives
$$
\bar{\alpha}_8=0.22397,
\qquad
\bar{\alpha}_{16}=0.11198,
\qquad
\bar{\alpha}_{32}=0.05599,
$$
while the widened $3\le n\le6$ packet gives
$$
\bar{\alpha}_{16}=0.14391,
\qquad
\bar{\alpha}_{32}=0.07196.
$$
These values scale like a finite-label open-strip count divided by block length, with asymptotic proxy coefficient $0$, rather than trending toward $1/4$. Coarse and strict quotients coincide on these packets. The action-complete transfer has no accepted transfer edges, so its coefficient is undefined rather than near the target. This is a failure of the reduced adapter as a horizon-coefficient proof, not a failure of the coefficient target itself.

The next diagnostic transfer relation has now been made explicit. For each sampled terminal branch, pair the receiver impulse with the equal-and-opposite source recoil at the emission event and define
$$
\Delta\Pi_b^{\mathrm{pair}}
=
\Delta\Pi_{b,\mathrm{recv}}
+
\Delta\Pi_{b,\mathrm{src}},
\qquad
\Delta\Pi=(\Delta E,\Delta\mathbf{p},\Delta J,\Delta q).
$$
Also record the per-branch stationarity residual
$$
\epsilon_{\mathrm{stat}}(\lambda)
=
\max_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left\|
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf r}_b(t_b,t_0)}
{r_b(t_b,t_0)J_b(t_b,t_0)}
\right]
\right|_{t_0=t_b-\Delta_b}
\right\|.
$$
The executable now also records the branch-summed receiver residual after the direct inverse-square term is removed:
$$
\epsilon_{\mathrm{sum}}(\lambda)
=
\max_{\alpha}
\left\|
\sum_{b\to\alpha}
\frac{\operatorname{sign}(q_{j_b}q_{i_b})}{|J_b|}
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf r}_b(t_b,t_0)}
{r_b(t_b,t_0)J_b(t_b,t_0)}
\right]
\right|_{t_0=t_b-\Delta_b}
\right\|,
$$
where $\alpha$ ranges over sampled receiver phase keys. The dynamics-backed transfer predicate is therefore the earlier edge-match condition plus closure of the paired source-recoil ledger, the cycle residual, and $\epsilon_{\mathrm{sum}}$; $\epsilon_{\mathrm{stat}}$ remains an obstruction diagnostic. In the current executable packet this `terminal_dynamic` transfer has zero accepted edges. With $3\le n\le5$, `phase-samples = 12`, and the layer-sum area proxy, the edge-only coefficient is $\bar{\alpha}_{16}=0.09174$, but the terminal-dynamic coefficient is undefined; $\epsilon_{\mathrm{stat}}^{\max}$ is about $166.83$ and $\epsilon_{\mathrm{sum}}^{\max}$ is about $607.78$. With $3\le n\le6$, the edge-only coefficient is $\bar{\alpha}_{16}=0.12120$, while the terminal-dynamic transfer remains empty; $\epsilon_{\mathrm{stat}}^{\max}$ rises to about $322.67$ and $\epsilon_{\mathrm{sum}}^{\max}$ rises to about $1729.02$. Thus the obstruction is not merely the observer quotient or area normalization. The reduced concentric terminal ansatz fails the action-variation and cycle-support tests before it can become a horizon-interface transfer system.

The first bounded branch-family variation gives the same conclusion. The executable phase-offset family keeps the centers concentric but changes the layer phases by
$$
\phi_I=-2\pi f,
\qquad
\phi_M=2\pi f,
\qquad
\phi_O=0,
$$
with tested offsets $f=1/8$ and $f=1/4$. These packets raise the delayed inter-layer root inventory to $288$ sampled roots per candidate, but the terminal-dynamic transfer still has zero accepted edges under both coarse and strict quotients. For $3\le n\le5$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.09174$ while $\epsilon_{\mathrm{stat}}^{\max}$ is about $179.54$ at $f=1/8$ and about $166.83$ at $f=1/4$; the corresponding $\epsilon_{\mathrm{sum}}^{\max}$ values are about $608.87$ and $626.17$. For $3\le n\le6$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.12120$, $\epsilon_{\mathrm{stat}}^{\max}$ reaches about $322.67$, and $\epsilon_{\mathrm{sum}}^{\max}$ reaches about $2067.83$. A bounded phase offset therefore does not rescue the reduced circular terminal ansatz.

The first shifted-center branch family is now also negative. The executable `shifted-center` family keeps the circular speeds and layer phases fixed, but places the three circular centers at
$$
\mathbf{c}_I=(-\epsilon_c R_O,0),
\qquad
\mathbf{c}_M=\left(\frac{\epsilon_c R_O}{2},\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
\qquad
\mathbf{c}_O=\left(\frac{\epsilon_c R_O}{2},-\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
$$
where $R_O=1/\omega_O$ is the outer alignment radius and $\epsilon_c$ is the tested center-shift fraction. Runs at $\epsilon_c=0.01$, $0.05$, and $0.10$ again raised the delayed inter-layer inventory to $288$ sampled roots per candidate, but they produced zero terminal-dynamic transfer edges. The $\epsilon_c=0.05$ and $\epsilon_c=0.10$ packets were empty even at the edge-proxy level for $3\le n\le5$ and $3\le n\le6$. The smaller $\epsilon_c=0.01$ packet produced only one widened edge-proxy edge at $3\le n\le6$, with zero finite-block coefficient and still no terminal-dynamic edge. The sampled stationarity residuals remained large: $\epsilon_{\mathrm{stat}}^{\max}$ was about $620.96$ to $1026.11$ for $\epsilon_c=0.01$, about $965.98$ to $1103.36$ for $\epsilon_c=0.05$, and about $693.97$ for $\epsilon_c=0.10$; the branch-summed residual was larger still, reaching about $9243.89$, $4569.36$, and $5941.09$ respectively. Thus small shifted centers make the reduced chart more brittle rather than more entropy-bearing. The next useful variation must change the action kernel, the wake-memory ledger, or the observer quotient, not merely the first-order circular geometry.

At the present derivation level, the admissible one-patch labels can be enumerated as a finite branch-ledger schema, not yet as a numerical table. For a primitive outer-period closure, the integer-lock notation gives
$$
(k_I,k_M,k_O)=(n,m,1),
\qquad
1<m<n,
$$
with longer closure periods represented by common integer multiples before reduction to the primitive label. For each layer $\ell\in\{I,M,O\}$, write $\sigma_\ell=s_\ell/c_f$ in the circular reduced root chart. The binary root vocabulary supplies finite active branch sets on any resolved terminal branch:
$$
\mathcal{M}_{s,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{s,\ell}+2\pi r
=
2\sigma_\ell\sin(\tilde{\delta}_{s,\ell}/2)
\right\},
$$
$$
\mathcal{M}_{p,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{p,\ell}+2\pi r
=
2\sigma_\ell\cos(\tilde{\delta}_{p,\ell}/2)
\right\}.
$$
Branch-birth or grazing cases, where a Jacobian ceases to be transversal, must be split into their own boundary class rather than silently folded into a smooth label.

Thus the current one-patch candidate has the form
$$
\lambda
=
\left(
(n,m,1);\,
(\mathcal{M}_{s,\ell},\mathcal{M}_{p,\ell},J_{\ell},\prec_{\ell})_{\ell=I,M,O};\,
\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}};\,
\chi_c;\,
\mathcal{E}_{\nu}^{-},\mathcal{E}_{\nu}^{+};\,
\mathcal{R}_{O,W}^{\theta}
\right),
$$
where $J_{\ell}$ collects the active branch Jacobians and $\prec_{\ell}$ records the emission-order relation within the layer. The finite candidate set is the subset of these labels satisfying exact one-patch phase closure, terminal-alignment conditions, edge conservation, inter-layer wake compatibility, and the observer quotient:
$$
\Lambda_{\theta}^{\mathrm{loc}}
\subseteq
\left\{
\lambda:
\Delta E=\Delta\mathbf{p}=\Delta\mathbf{J}=0,\;
\Delta q=0,\;
\mathcal{R}_{O,W}(\lambda)=\mathcal{R}_{O,W}^{\theta}
\right\}
/
\sim_{O,\theta,W}.
$$

This makes the next missing equations precise. To turn the schema into an actual transfer matrix, the dynamics must supply: first, the terminal branch equations fixing $(s_\ell,R_\ell,\omega_\ell,\mathbf{A}_\ell)$ under $v_M=c_f$, $v_O\to c_f$, and coplanar/co-linear alignment; second, the inter-layer maps that reduce $\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}}$ to boundary wake data; and third, the observer-record quotient that decides which edge distinctions remain visible in $\theta$.

An edge-map scaffold can be written before the terminal branch is numerically solved. Let $\mathbf{n}_{\nu}$ be the outward unit normal for the chosen local edge direction, and let $\mathcal{B}_{\mathrm{term}}(\lambda)$ be the finite set of active layer and inter-layer causal branches retained by the terminal one-patch label. Each branch $b\in\mathcal{B}_{\mathrm{term}}(\lambda)$ has a source $j_b$, receiver $o_b$, emission time $t_{0,b}$, reception time $t_b$, winding or root index $r_b$, root type $\tau_b\in\{\text{self},\text{partner},\text{inter-layer}\}$, line of action
$$
\hat{\mathbf{r}}_b
=
\frac{\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})}
{\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|},
$$
and branch Jacobian
$$
J_b
=
1
-
\frac{\mathbf{v}_{j_b}(t_{0,b})\cdot\hat{\mathbf{r}}_b}{c_f}.
$$
The branch is admissible only when its causal-root equation closes,
$$
\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|
=
c_f(t_b-t_{0,b}),
\qquad
J_b\ne0,
$$
and the terminal label also satisfies the integer-lock and alignment constraints
$$
\omega_O T=2\pi,\qquad
\omega_M T=2\pi m,\qquad
\omega_I T=2\pi n,
$$
$$
s_M=c_f,\qquad
s_O\to c_f,\qquad
\max_{\ell,\ell'}\arccos(\hat{\mathbf{A}}_\ell\cdot\hat{\mathbf{A}}_{\ell'})\to0.
$$

For such a branch, define the boundary-facing datum
$$
\mathfrak{d}_{\nu}^{\pm}(b)
=
\left[
\tau_b,\,
\ell(j_b),\ell(o_b),\,
r_b,\,
t_{0,b}\bmod T,\,
\operatorname{sgn}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}),\,
J_b,\,
\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu},\,
\mathbf{a}_{o_b\leftarrow j_b}(t_b;t_{0,b})\cdot\mathbf{n}_{\nu}
\right]_{O,\theta,W}
$$
whenever $\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0$. Here $[\cdot]_{O,\theta,W}$ means that distinctions erased by the Physical Observer quotient for record $\theta$ are already identified. The edge maps are then the multisets after the observer quotient:
$$
\mathcal{E}_{\nu}^{\pm}(\lambda)
=
\left\{
\mathfrak{d}_{\nu}^{\pm}(b)
:
b\in\mathcal{B}_{\mathrm{term}}(\lambda),\,
\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0
\right\}.
$$
This equation is the derived projection target: it reduces each terminal one-patch branch ledger to the wake data presented across one edge. The still-open numerical step is solving $\mathcal{B}_{\mathrm{term}}(\lambda)$ from the full three-layer state-dependent delayed equations, including the regularized action and energy ledger that assigns the conserved increments used in $\mathcal{C}_{\theta,\nu}$.

The reduced terminal branch system can be stated as a finite residual problem on the primitive outer period. Choose $T>0$ and integers $1<m<n$, set
$$
\omega_O=\frac{2\pi}{T},
\qquad
\omega_M=m\omega_O,
\qquad
\omega_I=n\omega_O,
$$
and represent the aligned circular branch by
$$
\mathbf{x}_{\ell,\alpha}(t)
=
\mathbf{c}_{\ell}
+
\alpha R_{\ell}
\mathbf{e}\!\left(\omega_\ell t+\phi_\ell\right),
\qquad
\ell\in\{I,M,O\},
\qquad
\alpha\in\{+1,-1\},
$$
where $\mathbf{e}(\psi)$ is the unit vector in the common terminal plane. The phase-lock and terminal-alignment constraints are
$$
\phi_M-m\phi_O=\phi_{MO}^{\ast},
\qquad
\phi_I-n\phi_O=\phi_{IO}^{\ast},
$$
$$
R_\ell\omega_\ell=s_\ell,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
\mathbf{A}_I=\mathbf{A}_M=\mathbf{A}_O
$$
up to the declared terminal-alignment tolerance. The intra-layer branches use the self-hit and partner-hit equations above. The inter-layer candidates are the delayed roots
$$
F_b(\Delta_b)
\equiv
\left\|
\mathbf{x}_{\ell_o,\alpha_o}(t_b)
-
\mathbf{x}_{\ell_j,\alpha_j}(t_b-\Delta_b)
\right\|
-
c_f\Delta_b
=
0,
$$
with $0<\Delta_b\le H_{\lambda}$ for the finite history window assigned to $\lambda$, layer pair $(\ell_j,\ell_o)\in\{(I,M),(I,O),(M,O),(M,I),(O,I),(O,M)\}$, signs $\alpha_j,\alpha_o\in\{+1,-1\}$, and emission phase recorded modulo $T$. The branch is kept in $\mathcal{B}_{\mathrm{term}}(\lambda)$ only if it is transversal,
$$
J_b
=
1
-
\frac{\mathbf{v}_{\ell_j,\alpha_j}(t_b-\Delta_b)\cdot\hat{\mathbf{r}}_b}{c_f}
\ne0,
$$
and belongs to the same integer-lock, emission-order, and observer-record class as $\lambda$.

The remaining dynamics are not another gate; they are the equations that decide whether a proposed branch label exists. For each terminal branch label, the cycle-averaged squared residual must vanish:
$$
\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)
=
\frac{1}{T}
\int_0^T
\left\|
\ddot{\mathbf{x}}_{\ell,\alpha}(t)
-
\sum_{b:\,o_b=(\ell,\alpha)}
\mathbf{a}_{o_b\leftarrow j_b}(t;t-\Delta_b)
\right\|^2
dt
=
0,
$$
with the same branch set also satisfying the local conservation ledger
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left(
\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b
\right)
=
(0,\mathbf{0},\mathbf{0},0).
$$
This defines the current reduced solve: $\mathcal{B}_{\mathrm{term}}(\lambda)$ is the finite set of intra-layer and inter-layer roots satisfying the terminal kinematics, transversality, cycle-averaged dynamics, conservation ledger, and observer quotient. A numerical enumeration can now target these equations directly; if no solution has $|J_b|$ bounded away from zero, the label must be reclassified as a grazing boundary case rather than counted as an interior transfer-matrix state.

In the symmetric common-center specialization, the inter-layer root problem reduces to scalar root curves over the outer phase. Set
$$
\mathbf{c}_I=\mathbf{c}_M=\mathbf{c}_O,
\qquad
q_I=n,\quad q_M=m,\quad q_O=1,
\qquad
u=\omega_O t\pmod{2\pi},
$$
and introduce dimensionless layer radii
$$
x_\ell
=
\frac{\omega_O R_\ell}{c_f}
=
\frac{s_\ell/c_f}{q_\ell}.
$$
For a branch from source layer $\ell_j$ and sign $\alpha_j$ to receiver layer $\ell_o$ and sign $\alpha_o$, write the outer-period delay as $\delta=\omega_O\Delta$. The phase separation is
$$
\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
(q_o-q_j)u
+
q_j\delta
+
\phi_o-\phi_j,
$$
and the causal-root equation becomes
$$
\delta
=
\left[
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
\right]^{1/2},
\qquad
0<\delta\le \omega_O H_{\lambda}.
$$
The corresponding inter-layer Jacobian reduces to
$$
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
1
-
\alpha_o\alpha_j
\frac{(s_j/c_f)x_o}{\delta}
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta).
$$

Thus an inter-layer entry of $\mathcal{B}_{\mathrm{term}}(\lambda)$ is not an arbitrary phase sample. It is a smooth $2\pi$-periodic root curve $\delta_b(u)$ of the scalar equation above, with $|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))|$ bounded away from zero and with the same emission-order class over the full outer period. The intra-layer pieces remain the self-hit and partner-hit equations already listed for each $\ell$. In this symmetric special case, the unknowns left for enumeration are therefore
$$
(m,n),\quad
(x_I,x_M,x_O),\quad
(\phi_{MO}^{\ast},\phi_{IO}^{\ast}),\quad
\{\delta_b(u)\}_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)},
$$
subject to $x_M=1/m$, $x_O\to1$, branch transversality, the cycle residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$, and the conservation ledger. This is the first algebraic reduction of the terminal branch problem. It still does not select $(m,n)$ or prove existence; selection requires the residual and conservation equations to admit at least one branch set with a positive Jacobian floor.

The scalar reduction does, however, give an exact no-grazing certificate for a proposed inter-layer branch. Define the squared residual
$$
F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
-
\delta^2.
$$
The causal-root equation is equivalent to $F_{jo}^{\alpha_j\alpha_o}(u,\delta)=0$ with $\delta>0$, and, using $q_jx_j=s_j/c_f$, its delay derivative is
$$
\partial_{\delta}F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
-2\delta\,
J_{jo}^{\alpha_j\alpha_o}(u,\delta).
$$
Thus the branch Jacobian is exactly the implicit-function denominator for the scalar root. Any nonzero root with $|J_{jo}^{\alpha_j\alpha_o}|>0$ continues locally as a smooth delay curve, and along such a curve
$$
\frac{d\delta_b}{du}
=
\frac{
\alpha_o\alpha_j x_o x_j(q_o-q_j)
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\delta_b(u)
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}.
$$

This turns the symmetric terminal branch problem into a compact root-curve test before the force residual is evaluated. Any inter-layer root must lie in the geometric delay strip
$$
|x_o-x_j|
\le
\delta
\le
\min\{x_o+x_j,\omega_OH_{\lambda}\}.
$$
For fixed $(m,n)$, radii, and relative phases, an interior inter-layer ledger is admissible only if its initial roots at one outer phase continue around the full $2\pi$ period as closed curves $\delta_b(u)$ that remain inside this strip, satisfy a uniform floor
$$
\delta_b(u)\ge\epsilon_{\delta}>0,
\qquad
\left|
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
\right|
\ge
\epsilon_J>0,
$$
and preserve the declared emission-order and observer-record class. Failure of the delay strip rejects the candidate kinematically; failure of the Jacobian floor places it in the grazing boundary class; failure of closed return changes the root ledger over one outer period. Passing this scalar certificate is still not terminal-branch existence, because $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$ and the conservation ledger must still close, but it is the first finite rejection and continuation criterion for candidate $(m,n)$ branch labels.

The same chart projects the force residual once a certified root curve is supplied. Let $q_{\ell,\alpha}^{\mathrm{pol}}=\sigma_{\ell,\alpha}\epsilon$ denote the polarity bookkeeping unit carried by the architrino on layer $\ell$ and sign $\alpha$, distinguishing it from the layer frequency integer $q_\ell$. Write the signed coefficient inherited from the canonical per-hit law as
$$
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
=
\kappa\,
\operatorname{sign}(q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}})
\left|q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}}\right|
\frac{\omega_O^2}{c_f^2}.
$$
For a certified inter-layer curve $\delta_b(u)$, the circular-frame radial component, positive outward from the common center of the receiver layer, is
$$
a_{jo,r}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
\frac{
x_o-\alpha_o\alpha_j x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
\left|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))\right|
},
$$
and the tangential component, positive in the receiver's instantaneous direction of motion, is
$$
a_{jo,\tau}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
\frac{
\alpha_o\alpha_j x_j
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
\left|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))\right|
}.
$$
These formulas are just the canonical line-of-action acceleration projected onto the two circular-frame basis vectors. The intra-layer self-hit and partner-hit pieces use the same projection after substituting their own certified delay roots from the binary branch chart.

For each receiver $(\ell_o,\alpha_o)$, sum all admitted branch contributions into
$$
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,r}(u),
\qquad
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,\tau}(u).
$$
On the symmetric terminal circle, with $\mathbf{e}_{\perp}(\psi)=d\mathbf{e}(\psi)/d\psi$, the target acceleration has only inward radial component,
$$
\ddot{\mathbf{x}}_{\ell_o,\alpha_o}(t)
\cdot
\alpha_o\mathbf{e}(q_{\ell_o}u+\phi_{\ell_o})
=
-R_{\ell_o}(q_{\ell_o}\omega_O)^2,
\qquad
\ddot{\mathbf{x}}_{\ell_o,\alpha_o}(t)
\cdot
\alpha_o\mathbf{e}_{\perp}(q_{\ell_o}u+\phi_{\ell_o})
=
0.
$$
Thus the vector residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}$ reduces in this chart to the two scalar residual functions
$$
\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)
=
-R_{\ell_o}(q_{\ell_o}\omega_O)^2
-
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u),
\qquad
\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)
=
-
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u).
$$
Equivalently,
$$
\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}
=
\frac{1}{2\pi}
\int_0^{2\pi}
\left[
\left(\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)\right)^2
+
\left(\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)\right)^2
\right]
du.
$$
Since the integrand is non-negative on a smooth certified branch, $\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}=0$ is equivalent to $\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)=0$ and $\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)=0$ for the full outer period. This is the residual projection that can select or reject candidate integer locks after the scalar root curves are known. The remaining missing closure is the signed branch-strength and conservation assignment: without the polarity factors, regularized intra-layer branch weights, and conserved increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$, the chart can reject kinematic and force-residual failures but cannot yet prove that a particular $(m,n)$ is the terminal solution.

The branch-strength closure data can be stated without adding another gate. For every admitted branch $b$, the terminal ledger must record
$$
b
\mapsto
\left(
j_b,o_b,\tau_b,\delta_b(u),\hat{\mathbf{r}}_b(u),J_b(u),
q_{j_b}^{\mathrm{pol}},q_{o_b}^{\mathrm{pol}},w_b^{(\eta)}(u)
\right),
$$
where $j_b$ and $o_b$ are the source and receiver architrinos, $\tau_b$ is the hit type, and $w_b^{(\eta)}$ is the regularized inverse-square/Jacobian weight assigned to that branch. On a sharp transversal inter-layer branch,
$$
w_b^{(0)}(u)
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{
\left(\delta_b(u)\right)^2
\left|J_b(u)\right|
},
$$
while intra-layer self-hit and partner-hit entries use the corresponding binary-root delay and Jacobian. The branch acceleration is then the canonical per-hit law in ledger form,
$$
\mathbf{a}_b^{(\eta)}(u)
=
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(\eta)}(u)
\hat{\mathbf{r}}_b(u).
$$
The sharp limit is acceptable only when the positive delay and Jacobian-floor certificate above holds; otherwise the branch must retain its regularized weight and remain a boundary case rather than an interior terminal label.

The conservation increments attached to a branch must separate mechanical exchange from wake-history bookkeeping. Over one outer period,
$$
\Delta E_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\cdot\mathbf{v}_{o_b}(u)\,du,
$$
$$
\Delta\mathbf{p}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\,du,
\qquad
\Delta\mathbf{J}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{x}_{o_b}(u)\times\mathbf{a}_b^{(\eta)}(u)\,du.
$$
Because delayed momentum and energy are not purely instantaneous mechanical quantities, the full ledger entries are
$$
\Delta E_b
=
\Delta E_b^{\mathrm{mech}}
+
\Delta E_b^{\mathrm{wake}},
\qquad
\Delta\mathbf{p}_b
=
\Delta\mathbf{p}_b^{\mathrm{mech}}
+
\Delta\mathbf{p}_b^{\mathrm{wake}},
$$
$$
\Delta\mathbf{J}_b
=
\Delta\mathbf{J}_b^{\mathrm{mech}}
+
\Delta\mathbf{J}_b^{\mathrm{wake}}.
$$
For an internal causal-wake hit, $\Delta q_b=0$ because no architrino identity is created, destroyed, or transferred; nonzero charge-bookkeeping entries belong only to a declared provenance crossing of the patch boundary. The terminal conservation ledger is therefore the simultaneous closure condition
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta E_b
=
0,
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{p}_b
=
\mathbf{0},
$$
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{J}_b
=
\mathbf{0},
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta q_b
=
0.
$$
This completes the local bookkeeping needed for terminal enumeration: a candidate $(m,n)$ must pass scalar root continuation, force-residual cancellation, and the history-aware conservation ledger on the same branch set. What remains unsolved is not another requirement artifact but the derivation of $w_b^{(\eta)}$ and the wake-history increments from a time-translation- and Euclidean-invariant regularized action for the coupled three-layer branch.

The minimal action-level scaffold is the pullback of the exact causal-delay action in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) to the certified terminal branch chart. For branch $b$, set
$$
t=\frac{u}{\omega_O},
\qquad
t_b^0(u)=t-\Delta_b(u),
\qquad
r_b(u)=\frac{c_f}{\omega_O}\delta_b(u).
$$
The sharp branch density inherited from the exact $1/r$ causal kernel is
$$
\mathcal{I}_b^{(0)}(u)
=
\frac{1}{c_f}
\frac{1}{r_b(u)|J_b(u)|}
=
\frac{\omega_O}{c_f^2}
\frac{1}{\delta_b(u)|J_b(u)|}.
$$
A regularized terminal action for the branch set should therefore have the form
$$
S_{\lambda}^{(\eta)}
=
\int_0^{2\pi}
\frac{du}{\omega_O}
\sum_o
\frac{1}{2}\mu_{\text{arch}}
\left\|\mathbf{v}_o(u)\right\|^2
-
\frac{1}{2}
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\int_0^{2\pi}
\frac{du}{\omega_O}
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathcal{I}_b^{(\eta)}(u),
$$
with $\mathcal{I}_b^{(\eta)}\to\mathcal{I}_b^{(0)}$ weakly on any branch satisfying the positive-delay and Jacobian-floor certificate. Its branch variation must reproduce the terminal acceleration weight,
$$
\left[
\frac{1}{\mu_{\text{arch}}}
\frac{\delta S_{\lambda}^{(\eta)}}{\delta\mathbf{x}_{o_b}}
\right]_{\!b}
\longrightarrow
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(0)}(u)
\hat{\mathbf{r}}_b(u),
$$
up to the sign convention fixed by writing the interaction term with a minus sign in the action. In other words, $w_b^{(\eta)}$ is not an independent fitting weight. It is the Euler-Lagrange pullback of the regularized causal kernel on a certified branch chart.

The strongest current action-kernel candidate is not the diagnostic same-support inverse-square adapter. Pull back the delayed-interior characteristic-tail kernel from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) before reducing to a one-period branch density. For the two-time branch, define the local characteristic coordinate
$$
u_b^{\mathrm{c}}(t_1,t_0)
=
g_b(t_1,t_0)
+
\frac{r_b(t_1,t_0)}{c_f}.
$$
After endpoint-clear normalization, the candidate branch kernel is
$$
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\int_{-\infty}^{g_b(t_1,t_0)}
\frac{\delta_\eta(s)}
{c_f\left(u_b^{\mathrm{c}}(t_1,t_0)-s\right)^2}
ds,
$$
or the finite-endpoint version with lower limit $-h_{+}$ when the endpoint-clearance term is cancelled by the characteristic gauge. Its receiver-gradient identity is
$$
\left(
\partial_{r_b}
-
\frac{1}{c_f}\partial_{g_b}
\right)
K_{b,\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g_b)}{r_b^2}.
$$
This is the action-level object that can replace the diagnostic inverse-square adapter once the Noether boundary terms below are computed from the same kernel. Until then, terminal enumerator rows using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ remain diagnostic branch-force rows rather than a completed action derivation.

The sharp receiver-side variation can be separated before the root is integrated out. Write the two-time branch kernel as
$$
\mathcal{L}_b^{(0)}(t_1,t_0)
=
\frac{1}{c_f}
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b(t_1,t_0)},
$$
with
$$
g_b(t_1,t_0)
=
t_1-t_0
-
\frac{r_b(t_1,t_0)}{c_f},
\qquad
r_b(t_1,t_0)
=
\|\mathbf{x}_{o_b}(t_1)-\mathbf{x}_{j_b}(t_0)\|.
$$
For a receiver variation at fixed source history,
$$
\delta r_b
=
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1),
\qquad
\delta g_b
=
-
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1).
$$
Therefore
$$
\delta\!\left(\frac{\delta(g_b)}{r_b}\right)
=
-
\left[
\frac{\delta(g_b)}{r_b^2}
+
\frac{\delta'(g_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1).
$$
The first term already gives the desired terminal branch weight after the causal root is selected:
$$
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b^2(t_1,t_0)}
=
\frac{1}{r_b^2(t_1,t_b^0)|J_b(t_1,t_b^0)|}
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{\delta_b^2(u)|J_b(u)|}
=
w_b^{(0)}(u).
$$

The second term is the nontrivial root-constraint variation. It cannot be dropped after the branch has been pulled back to $\delta_b(u)$. The terminal-chart variation proof closes exactly when the regularized two-time action satisfies, for every compactly supported or period-matched receiver variation,
$$
\lim_{\eta\to0}
\left[
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b(t_1,t_0))}{c_f r_b(t_1,t_0)}
\hat{\mathbf{r}}_b(t_1,t_0)
\right]_{\mathrm{int}}
=
\mathbf{0},
$$
where the subscript $\mathrm{int}$ means after the source-side variation, integration by parts on the root-selected chart, and the Noether boundary term have been accounted for. Equivalently, all interior force density left by varying the causal constraint must cancel into the boundary wake increments rather than adding a second independent line-of-action force. This is the exact missing identity for a complete terminal-chart variation proof. The direct $1/r$ variation supplies the scale coefficient $w_b^{(0)}$; the remaining proof burden is to show that the $\delta_\eta'(g_b)$ contribution is a boundary/source-side term, vanishes under a local stationarity condition, or is cancelled by a declared counterterm under the same symmetry-preserving regularization used for the conservation ledger.

This identity can be narrowed one step further. On a transversal branch,
$$
\partial_{t_0}g_b(t_1,t_0)
=
-J_b(t_1,t_0),
$$
so
$$
\delta_\eta'(g_b)
=
-
\frac{1}{J_b}
\partial_{t_0}\delta_\eta(g_b).
$$
Substituting this into the unresolved term and integrating by parts in $t_0$ gives
$$
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\mathcal{B}_{b}^{(\eta)}(t_1)
+
\int dt_0\,
\delta_\eta(g_b)
\partial_{t_0}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right],
$$
where $\mathcal{B}_{b}^{(\eta)}(t_1)$ is the endpoint contribution at the history-window, period, or excluded coincidence boundary. The coincidence term is removed by $H(0)=0$; the remaining endpoint term vanishes only for compactly supported variations or for period-matched terminal histories.

Thus the smallest unresolved object is no longer the raw $\delta_\eta'(g_b)$ term. It is the root-chart interior derivative
$$
\mathbf{C}_{b}^{(\eta)}(t_1)
=
\int dt_0\,
\delta_\eta(g_b)
\partial_{t_0}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right].
$$
The terminal action derives the claimed line-of-action branch law exactly only if
$$
\lim_{\eta\to0}
\left[
\mathbf{C}_{b}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{src}}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}
\right]
=
\mathbf{0},
$$
where $\mathbf{C}_{b,\mathrm{src}}^{(\eta)}$ is the source-side variation of the same two-time kernel and $\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}$ is the Noether boundary contribution assigned to the wake-history ledger. This is the precise local closure condition that would be needed for the pure scalar kernel to derive the terminal line-of-action force without an added term. If this cancellation fails, the action-derived terminal force law must include an additional regularized counterterm rather than using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ alone.

The source-side calculation shows why this is a real condition rather than a notational cancellation. Holding the receiver history fixed and varying the emission point gives
$$
\delta r_b
=
-\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0),
\qquad
\delta g_b
=
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0),
$$
and therefore
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(g_b)}{r_b}\right)
=
\left[
\frac{\delta_\eta(g_b)}{r_b^2}
+
\frac{\delta_\eta'(g_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0).
$$
On a future-reception chart for the same branch,
$$
\partial_{t_1}g_b(t_1,t_0)
=
1-\frac{\hat{\mathbf{r}}_b(t_1,t_0)\cdot\mathbf{v}_{o_b}(t_1)}{c_f},
$$
so the source-side derivative-of-delta contribution becomes
$$
\int dt_1\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\widetilde{\mathcal{B}}_{b}^{(\eta)}(t_0)
-
\int dt_1\,
\delta_\eta(g_b)
\partial_{t_1}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}
{c_f r_b\left(1-\hat{\mathbf{r}}_b\cdot\mathbf{v}_{o_b}/c_f\right)}
\right].
$$
This is the coefficient of $\delta\mathbf{x}_{j_b}(t_0)$, not the coefficient of $\delta\mathbf{x}_{o_b}(t_1)$. For arbitrary compactly supported interior variations, the source and receiver variations are independent. The source-side term therefore does not cancel $\mathbf{C}_{b}^{(\eta)}$ pointwise in the receiver Euler-Lagrange equation. Noether boundary terms can cancel endpoint contributions or enforce global time-translation, spatial-translation, and rotation charges, but they cannot remove an interior receiver coefficient for compactly supported variations.

In the sharp positive-delay, transversal limit, the receiver-side interior object reduces to
$$
\mathbf{C}_{b}^{(0)}(t_1)
=
\frac{1}{|J_b(t_1,t_b^0)|}
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf{r}}_b(t_1,t_0)}
{c_f r_b(t_1,t_0)J_b(t_1,t_0)}
\right]
\right|_{t_0=t_b^0}.
$$
Thus the pure regularized $1/r$ causal kernel is promoted to an exact branch-weight derivation only under the sufficient local stationarity condition
$$
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf{r}}_b(t_1,t_0)}
{r_b(t_1,t_0)J_b(t_1,t_0)}
\right]
\right|_{t_0=t_b^0}
=
\mathbf{0}
$$
on each admitted interior branch, or under an explicit action-level counterterm whose receiver Euler derivative is
$$
\left[
\frac{1}{\mu_{\text{arch}}}
\frac{\delta S_{b,\mathrm{ct}}^{(\eta)}}{\delta\mathbf{x}_{o_b}(t_1)}
\right]_{\!b}
=
-
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathbf{C}_{b}^{(\eta)}(t_1)
$$
with the same endpoint convention used for the wake-history ledger. Such a counterterm is admissible only when derived from the same symmetry-preserving action-level mechanism, not when inserted as a fit to the accepted branch law. This is the smallest correction exposed by the variation: it preserves the direct inverse-square branch law when the stationarity condition holds, and otherwise records exactly the residual force density that the scalar kernel leaves behind.

For the same causal-surface local scalar class, this counterterm route is ruled out. A scalar term $a(r_b,J_b)\delta_\eta(g_b)$ must choose $a=-1/r_b$ to cancel the derivative-of-delta coefficient, but that same choice changes the direct $w_b^{(0)}$ scale contribution. The finite local delta-jet extension has the same obstruction. In the common-center inter-layer chart, the stationarity option is also ruled out by the lemma below. The terminal branch proof should therefore test branch-summed residual closure directly; otherwise the remaining action-level option is the nonlocal characteristic-tail repair target from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian), or a richer velocity/history-dependent invariant mechanism. Neither option is a fitted scalar patch.

**Lemma (common-center inter-layer stationarity obstruction).** In the symmetric common-center terminal chart, no positive-delay, non-grazing inter-layer branch with nonzero layer radii and nonzero source speed satisfies the per-branch stationarity condition above. Define the dimensionless separation vector
$$
\mathbf{Y}_b(u,\delta)
=
\alpha_o x_o\mathbf{e}(q_o u+\phi_o)
-
\alpha_j x_j\mathbf{e}(q_j(u-\delta)+\phi_j),
\qquad
\rho_b(u,\delta)
=
\|\mathbf{Y}_b(u,\delta)\|.
$$
Since $r_b=(c_f/\omega_O)\rho_b$ and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the branch stationarity condition is equivalent up to a nonzero scale to
$$
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
=
\mathbf{0}.
$$
The vector derivative can vanish only if $\partial_\delta\mathbf{Y}_b$ is parallel to $\mathbf{Y}_b$. But
$$
\partial_\delta\mathbf{Y}_b
=
\alpha_j q_j x_j\,
\mathbf{e}_{\perp}(q_j(u-\delta)+\phi_j),
$$
so parallelism forces the separation to be tangent to the source circle:
$$
\mathbf{Y}_b\cdot\mathbf{e}(q_j(u-\delta)+\phi_j)
=
0
\quad\Longleftrightarrow\quad
\alpha_o x_o\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
\alpha_j x_j.
$$
On this tangent subcase, $\rho_{b,\delta\delta}=0$ and $J_b=1-\rho_{b,\delta}$. The remaining scalar stationarity condition reduces to
$$
\partial_\delta(\rho_bJ_b)
=
\rho_{b,\delta}(1-\rho_{b,\delta})
=
0.
$$
The first factor would require $\rho_{b,\delta}=0$; with $q_jx_j=s_j/c_f\ne0$ and the tangent condition, that collapses the separation to $\rho_b=0$ and violates the positive-delay floor. The second factor gives $J_b=0$, which violates the Jacobian floor. Therefore per-branch stationarity is not the terminal inter-layer closure mechanism on this chart. The remaining action-level route is branch-summed residual closure over the signed admitted branch set, or a richer invariant action mechanism whose Euler derivative supplies the missing residual without fitting the force law.

**Branch-summed residual closure.** The terminal action scaffold can still close without per-branch stationarity if the receiver-side interior residual cancels across the signed admitted branch set. Define the dimensionless branch residual vector
$$
\mathbf{A}_b(u)
=
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}.
$$
Using $t_0=t_1-\delta/\omega_O$, $r_b=(c_f/\omega_O)\rho_b$, and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the sharp receiver-side interior term becomes
$$
\mathbf{C}_{b}^{(0)}(u)
=
-
\frac{\omega_O^2}{c_f^2}
\frac{\mathbf{A}_b(u)}{|J_b(u)|}.
$$
After the common nonzero scale is removed, the necessary pointwise receiver-side closure equation is
$$
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
=
\mathbf{0}
\qquad
\text{for all }u.
$$
This is a different equation from the force residuals $\mathcal{R}_{\ell_o,\alpha_o}^{r}=\mathcal{R}_{\ell_o,\alpha_o}^{\tau}=0$ and from the conservation-ledger sums. The force residual tests whether the accepted Master EOM supplies the terminal circular acceleration. The conservation ledger tests Noether bookkeeping over the same branch set. The branch-summed residual equation tests whether the scalar action scaffold has no leftover Euler derivative on that receiver after the direct inverse-square term has already been accounted for.

The regularization is admissible only if it preserves the symmetries that supply the conservation ledger. In action form this means
$$
\delta_{\tau}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\mathbf{b}}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\boldsymbol{\Omega}}S_{\lambda}^{(\eta)}=0
$$
for global time translations, spatial translations, and spatial rotations. A sufficient local form is to regularize only the causal scalar
$$
g_{ij}(t,t')
=
t-t'
-
\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|}{c_f}
$$
by a normalized $\delta_\eta(g_{ij})$, while keeping $H(0)=0$ and excluding the trivial coincidence self-branch. Such a regularizer depends on Euclidean distance and time difference, not on a coordinate origin, absolute phase convention, or observer record.

The wake-history increments are then the Noether boundary terms of this same action. For the time-translation channel, a branch contribution across a time boundary $t_\ast$ has the form
$$
E_{b}^{\mathrm{wake}}(t_\ast)
=
\frac{1}{2}
\int_{\{(t_1,t_0)\in b:\,t_0\le t_\ast<t_1\}}
\partial_{t_1}
\mathcal{K}_{b}^{(\eta)}(t_1,t_0)\,
dt_0\,dt_1,
$$
where $\mathcal{K}_{b}^{(\eta)}$ is the weighted regularized causal kernel restricted to branch $b$,
$$
\mathcal{K}_{b}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
\frac{\delta_\eta(g_b(t_1,t_0))}
{r_b(t_1,t_0)},
$$
for the pure scalar scaffold. For the delayed-interior characteristic-tail candidate, the branch kernel is instead
$$
\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0),
$$
with the trivial self-coincidence branch excluded in either case. Over one outer period,
$$
\Delta E_b^{\mathrm{wake}}
=
E_{b}^{\mathrm{wake}}(T)-E_{b}^{\mathrm{wake}}(0).
$$
The momentum and angular-momentum wake increments are the corresponding spatial-translation and rotation boundary terms:
$$
\Delta\mathbf{p}_b^{\mathrm{wake}}
=
\mathbf{P}_b^{\mathrm{wake}}(T)-\mathbf{P}_b^{\mathrm{wake}}(0),
\qquad
\Delta\mathbf{J}_b^{\mathrm{wake}}
=
\mathbf{J}_b^{\mathrm{wake}}(T)-\mathbf{J}_b^{\mathrm{wake}}(0).
$$
They are fixed by the coefficients of the boundary variations
$$
\delta_{\mathbf{b}}S_b^{(\eta)}
=
\mathbf{b}\cdot
\Delta\mathbf{p}_b^{\mathrm{wake}},
\qquad
\delta_{\boldsymbol{\Omega}}S_b^{(\eta)}
=
\boldsymbol{\Omega}\cdot
\Delta\mathbf{J}_b^{\mathrm{wake}},
$$
with the mechanical increments already written above. Therefore a terminal branch proof now has a precise action-level target: derive $\mathcal{I}_b^{(\eta)}$ from the normalized delayed-interior kernel, prove that its branch variation gives $w_b^{(\eta)}$ with the derivative-of-constraint residual cancelled by the receiver-gradient identity, and show that the Noether boundary terms close over the same certified branch set. Until those three steps are complete, the action scaffold supplies a constrained proof route and a rejection test, not a solved terminal $(m,n)$ selection.

The Master Equation now fixes the normalized delayed-interior kernel and its energy, momentum, and angular-momentum wake-history boundary increments. The terminal-alignment proof therefore no longer needs to invent the Noether terms; it must pull those increments back to the finite terminal branch chart, evaluate the resulting $\Delta E_b^{\mathrm{wake}}$, $\Delta\mathbf{p}_b^{\mathrm{wake}}$, and $\Delta\mathbf{J}_b^{\mathrm{wake}}$, and prove that the mechanical plus wake ledger closes on the same rows that pass the force-residual and root-ledger tests. Until that branch-summed evaluation passes, the terminal rows remain a diagnostic action packet rather than a solved terminal $(m,n)$ selection.

The concrete terminal-chart conservation test is the pullback of the Master Equation charges to $\mathcal{B}_{\mathrm{term}}(\lambda)$. Each retained row must emit
$$
\left(
j_b,o_b,\tau_b,\ell(j_b),\ell(o_b),t_{0,b},t_b,\Delta_b,
r_b,\hat{\mathbf r}_b,g_b,u_b,J_b,
K_{b,\mathrm{eff}}^{(\eta)},
\partial_{t_b}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)},
\nabla_{\mathbf{x}_{o_b}(t_b)}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}
\right),
$$
using the action-level causal scalar
$$
g_b(t_b,t_{0,b})
=
t_b-t_{0,b}
-
\frac{r_b(t_b,t_{0,b})}{c_f}.
$$
The chart then reports the endpoint totals
$$
\mathcal{E}_{\mathrm{term}}^{(\eta)}
=
K_{\mu,\lambda}
+
E_{\mathrm{wake,eff},\lambda}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech},\lambda}
+
\mathbf{P}_{\mathrm{wake,eff},\lambda}^{(\eta)},
$$
$$
\boldsymbol{\mathcal{J}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech},\lambda}
+
\mathbf{J}_{\mathrm{wake,eff},\lambda}^{(\eta)}.
$$
The terminal label is conserved only when the increments of all three totals vanish within the declared branch tolerance, after subtracting the Euler-residual and endpoint-leakage terms. The projected action increment $\Delta I_{\mathrm{ME}}$ and any torque integral remain numerical diagnostics until these three totals close on the same $\mathcal{B}_{\mathrm{term}}(\lambda)$ rows.

This scaffold identifies the smallest missing dynamics. The delayed equations must enumerate $\Lambda_{\theta}^{\mathrm{loc}}$ and derive the edge maps $\mathcal{E}_{\nu}^{\pm}$ from the terminal aligned branch. [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md) supplies the candidate integer phase lattice, and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#self-hit-definition-and-diagnostics) supplies the self-hit and partner-hit root vocabulary, but neither document yet computes the terminal aligned edge projections from the full three-layer dynamics.

The local-horizon coefficient requires the area-normalized terminal density
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$
in the equilibrium weak-field horizon-interface limit. This is the precise missing dynamics calculation. It fails if terminal alignment admits many inequivalent local labels with long-range constraints that restore volume or history-length scaling, if the observer quotient erases the labels needed for Page-compatible release accounting, or if the transfer rule must be retuned separately for entropy, flux, and downstream observer-geometry recovery.

### Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the nested shell swarm as inner engine, middle fulcrum, and outer shielding/interface shell.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local cycle-period diagnostics from the absolute cycle-stretch theorem target.
5. Solve all-layer branch updates for one-$h$ transactions and extract the branch-indexed period-stretch and envelope-oblation records.
6. Compute the terminal-alignment area-normalized label density $\bar{\alpha}_{\mathrm{align}}=s_{\mathrm{align}}/a_{\theta}$ from alignment-restricted closure labels, patch-area normalization, and edge wake compatibility.
7. Output alignment, closure, Floquet, grazing, branch-residual, and observer-export diagnostics.
8. Keep mass, photon, equivalence-principle, and full observer-geometry matching claims outside the primitive dynamics layer until their proof burdens close.

### Working Hypotheses

1. The formed nested shell swarm has stable invariants ($R_{\text{core}}$, $\omega_{\text{core}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity may produce an oblate causal envelope that drives planar alignment in the terminal rung; this remains a working hypothesis until the swept-volume and branch-stability tests close.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

### Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **Partner/exterior comparison regime** (CFT bridge label) | Typically in self-hit branch ($\|\mathbf{v}\| \gtrsim c_f$ history-supported) | Near the hinge scale ($\|\mathbf{v}\| \approx c_f$) in working models | Typically $\|\mathbf{v}\| < c_f$ | Hierarchical nested shell swarm operation and ordinary ladder behavior |
| **Terminal-alignment interface** (holographic bridge label) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **Self-hit interior comparison regime** (AdS bridge label) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$\|\mathbf{v}\| < c_f$" or "$\|\mathbf{v}\| = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Primitive envelope and closure diagnostics use the causal speed $c_f$. Downstream observer-channel dressing is not part of this branch scan. The corresponding kinematic parameter is
$$
\beta_f=\frac{v_{\text{trans}}}{c_f}.
$$
Primitive dynamics scans must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic. Any $c_{\text{eff}}$ comparison belongs to a downstream observer-channel map.

---

### Geometry Focus

#### A) High Group Velocity Geometry (Oblate Spheroid)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an ellipsoid
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1,
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Use the kinematic contraction law as a theorem target to be derived from branch dynamics:
$$
\beta_f = \frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp\sqrt{1-\beta_f^2}.
$$
As $\beta_f \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the primitive causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta_f^2}.
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta_f^2}$, which is the triangle form of the ellipsoid theorem target rather than a completed recovery.

**Impact on delay locking:** The round-trip delay $\Delta t_{\text{rt}}$ is the time between an outer-binary architrino’s emission and the moment its wake returns to influence that same architrino, approximating the inner and middle binaries as a compact subsystem at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the ellipsoid is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}.
$$
Then $\Delta t_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n).
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}.
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(t)$ so
$$
V(t) = \frac{4\pi}{3} R_\perp(t)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(t)}{c_f}\right)^2}.
$$
This expression belongs to the primitive branch chart; downstream dressed-channel variants must be rebuilt from an explicit observer-inference map.

---

#### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent Noether sea response gradient, not as fundamental curvature of the Euclidean void. Dense collections of standard-model assemblies perturb Noether sea density, compliance, stress, effective potential, and terminal-alignment state. The effective gravitational field in this delay-geometry model is the observer-level reconstruction of those coupled gradients.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ only in reduced scans, for example a magnitude extracted from Noether sea density/compliance/stress gradients, $\partial_r\Phi_{\text{eff}}$, or a tidal tensor. In simulations, treat $G_{\text{grad}}$ as a declared proxy around the outer-binary orbit and record which Noether sea response channel it compresses.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

#### C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the current minimal system; treat results as lower bounds until the swept-volume effect is added.

#### D) Local Cycle-Period Diagnostic

**Goal:** Define local cycle-period change as a geometric effect in the delay loop, not as distortion of substrate time or as a relativistic postulate.

**Reference cadence:** Use a declared reference assembly cadence $T_0$; the terminal-alignment normalization may specialize this to the outer-binary Planck cadence $T_0=1/f_P$.

The cadence $T_0$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $t$ remains the uniform ordering parameter for causal-hit evaluation. The local dynamics diagnostic compares assembly cycle counts to this reference cadence:
$$
C_{\text{cyc}}(\mathbf{x})
\equiv
\frac{T_0}{T_{\text{local}}(\mathbf{x})}
$$
in the rest branch of the local Noether sea cell. This quantity is a dynamics-side period ratio, not a time coordinate.

**Sector-delay diagnostic from delay geometry:** Define a reference round-trip delay $\Delta t_{\text{rt,ref}}$ and a local delay $\Delta t_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta t_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta t_{\text{rt,ref}}}
$$
and, for the ellipsoid-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how one sector's phase-closure period compares to the reference cadence:
$$
T_{\text{local}}(\theta) = T_0 \, \alpha(\theta, G_{\text{grad}}).
$$
When $\alpha > 1$, local cycles are longer relative to $T_0$; when $\alpha < 1$, they are shorter. This sector-delay diagnostic remains an absolute-time branch-period record. It can be exported downstream only after the accepted branch functional $T_q(v,G_{\text{grad}})$ is derived from the full cycle and matched to the retained causal-root ledger.

**Geometric source of period shift:** The causal envelope shape sets $\Delta t_{\text{rt}}$. As the nested shell swarm tilts out of planar alignment and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Primitive translation parameter:** For the branch scan, use
$$
\beta_f=\frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp \sqrt{1-\beta_f^2}.
$$
Geometrically, $\beta_f$ is the primitive axis-squash control: as $\beta_f \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local cycle frequency as $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Longer causal loops (larger $\alpha$) yield lower cycle frequency at fixed absolute-time reference; any redshift interpretation belongs downstream.

---

### Minimal Models

#### Nested Shell Swarm Baseline (Inner + Middle Fixed)

**Focus:** Treat the inner and middle binaries as a formed subsystem with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{core}}$, $\omega_{\text{core}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any subsystem element rides $\|\mathbf{v}\| = c_f$ continuously.

#### Outer-Binary Delay Loop Model with Formed Subsystem

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner and middle binaries modeled as a rigid subsystem with fixed timescales.
- Outer binary orbits that subsystem with non-coplanar planes initially.
- Translational speed $\mathbf{v}_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use ellipsoid-based $\Delta t_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n),
$$
and track when $\partial \Phi_n/\partial r$ changes sign.
Quantization here is emergent: only delay-locked, stable closures persist as discrete rungs, not imposed eigenmodes.

#### Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(t)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test ($SU(2)$ vs $U(1)$):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(t)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(t)$ matches only after $4\pi$, treat as $SU(2)$-like; if after $2\pi$, treat as $U(1)$-like.
- **Diagnostic hypothesis:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should be checked for a possible transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom may reduce to a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration only after the rotation test passes.

#### Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic nested shell swarm state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|.
$$
Track $\Delta_{\mathbf{k}}$ along scans in declared $\beta_f = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator cycle-period divergence, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf{v}\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{t-t_*}$ along the eigenvector of the newly activated self-hit root when the crossing parameter satisfies $s(t)-1\sim \dot{s}(t_*)(t-t_*)$ with $\dot{s}(t_*)\ne0$. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

### Observer-Export Diagnostics

Each dynamics scan should output the substrate records needed by later reconstruction chapters without forming an effective line element in this file. The scan-level packet is
$$
\mathcal{D}_{\mathrm{tri}}(W)
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
G_{\text{grad}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)_W.
$$
The spacetime and observer-inference chapters may convert this packet into lapse, ruler, signal, connection, and weak-field comparison variables. This chapter's obligation is narrower: certify that the packet comes from one retained causal-root branch chart in absolute time.

### Observables and Diagnostics (Summary)

- Compatibility scale invariants: $R_{\text{core}}$, $\omega_{\text{core}}$, phase offsets.
- Ladder records: $R_{\text{out}}(t)$, $\omega_{\text{out}}(t)$, plateau stability.
- Geometry records: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation records: inter-plane angles, precession cone angle.
- Stability records: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient record: $G_{\text{grad}}$ and its effect on stability thresholds.
- Observer-export records: $N_{\text{hits},q}$, $T_q$, $Q_{ab}^{(q)}$, $K_{\parallel}^{(q)}$, $K_{\perp}^{(q)}$, $\nu_J^{(q)}$, $\Delta_{\mathbf{k}}^{(q)}$, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$.

---

### Revision Triggers (Failure Modes)

1. **Subsystem stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

### Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should output compatible delay-geometry records on the same kind of branch packet:
$$
\mathcal{D}_{\mathrm{tri}}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{\mathrm{tri}}^{\mathrm{grad}}(W),
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---

### Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

#### Nested Shell Swarm Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the current architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a nested shell swarm, with each binary playing a distinct dynamical role.

Nested shell swarm minimality is a theorem target: the working claim is that three coupled shell binaries are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$), with shell scale and cadence retuning; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

#### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\ddot{\mathbf{x}}_i(t)=\mathbf{a}_{i,j}(t;\{t_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(t;\{t_{s,m}\})+\mathbf{a}_{\text{ext}}(t),
$$
with delay constraints (causal roots):
$$
\|\mathbf{x}_j(t_{p,k})-\mathbf{x}_i(t)\|=c_f\,(t-t_{p,k}), \quad
\|\mathbf{x}_i(t_{s,m})-\mathbf{x}_i(t)\|=c_f\,(t-t_{s,m}),
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(t)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf{x}_i(t)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf{v}\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2),
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s).
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

#### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the nested shell swarm regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the nested shell swarm picture, each nested shell swarm is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Nested Shell Swarm Geometry

This chapter is the canonical home for the geometric footprint of the nested shell swarm: its dynamic exclusion envelope, oblate spheroidal envelope, and assembly-level deformation channels. It sits in the Noether sea and effective-spacetime branch because the geometry of many such envelopes is the local material out of which Noether sea density, strain, and delay variables are coarse-grained. The nested shell swarm scaffold itself belongs in [Noether Swarm](../../../../markdown/aaa/noether-swarm/noether-swarm.md). The delayed dynamics that stabilize and deform the nested shell swarm belong in [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md).

The nested shell swarm is not a static object. It is a dynamic system of six architrinos organized as three ordered shell binaries when the exact-binary assumptions are active. The high-frequency paths of those constituents sweep out a persistent volume of intense wake activity. That swept volume is the nested shell swarm's effective exclusion envelope.

### Ownership Boundary

This chapter owns:

- the dynamic exclusion-envelope interpretation of a nested shell swarm,
- the oblate spheroidal form of the low-energy nested shell swarm envelope,
- the role of the outer binary in setting the leading boundary,
- and assembly-level deformation of the envelope under external effective fields, nearby wakes, and Noether sea conditions.

This chapter does not own:

- primitive architrino ontology; see [Architrino](../../../../markdown/aaa/foundations/architrino.md),
- the nested shell swarm scaffold; see [Noether Swarm](../../../../markdown/aaa/noether-swarm/noether-swarm.md),
- exact delay-root dynamics; see [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md),
- observer clocks and rulers; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- or metric reconstruction; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

### Dynamic Exclusion Envelope

The six architrinos within a nested shell swarm are in rapid orbital motion. The superposition of their fluctuating causal-wake contributions creates a region that is difficult for other architrinos or assemblies to penetrate without being strongly accelerated, deflected, or phase-disrupted.

This region acts as a dynamic **exclusion envelope**. It is not a solid object with a hard material surface. It is a coherent region of intense wake activity defined by the collective path history of the constituent architrinos.

Another Noether swarm approaching this region does not encounter a classical wall. It encounters a rapidly varying causal-wake environment whose accelerations and phase constraints can prevent stable transit through the swarm volume.

### Assembly-Noether Sea Interface Diagnostic

The dynamic exclusion envelope supplies a spatial approximation to a deeper ledger boundary. At the exact level, an assembly is defined by the architrinos, closure labels, and wake-exchange records phase-locked to that assembly. The surrounding Noether sea is the neighboring neutral swarm population and its ambient wake record after the assembly ledger has been excluded.

For an assembly $a$ and a declared response channel $X$, let $\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)$ denote the local coarse-grained wake/exclusion contribution tied to the assembly's accepted closure label, and let $\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)$ denote the ambient Noether sea contribution in the same region. A practical interface diagnostic is

$$
D_{a,X}(\mathbf{x},t)
=
\frac{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\|
}{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)\right\|
}.
$$

The first computable form comes from the same causal-root flux used in the Master Equation. Fix a coarse-graining window $W_\ell$, a channel $X$ being tested, and a sample event $(\mathbf{x},t)$. For a source constituent $j$ at emission time $t_0$, define

$$
r_{\mathbf{x}j}(t;t_0)
=
\left\|\mathbf{x}-\mathbf{x}_j(t_0)\right\|,
\qquad
g_{\mathbf{x}j}(t;t_0)
=
r_{\mathbf{x}j}(t;t_0)-c_f(t-t_0),
$$

$$
J_{\mathbf{x}j}(t;t_0)
=
1-
\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{\mathbf{x}j}(t;t_0)}{c_f},
\qquad
\mathcal{C}_{\mathbf{x}j}(t)
=
\{t_0<t:g_{\mathbf{x}j}(t;t_0)=0\}.
$$

Let $\mathcal{I}_a(t)$ be the architrino constituents and bound wake records belonging to assembly $a$, and let $\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)$ be the ambient Noether sea contributors in the same coarse window after excluding $\mathcal{I}_a(t)$. Let $w_{j,a}^{\mathrm{lock}}(t_0;t)$ retain the branches phase-locked to the assembly label, let $w_j^{\mathrm{sea}}(t_0;t)$ retain the ambient branches, and let $\alpha_{j,X}(\mathbf{x},t;t_0)\ge 0$ be the channel intensity inherited from branch-ledger exposure in channel $X$. Then the simple-root diagnostic is

$$
\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t;\ell)
=
W_\ell *
\sum_{j\in\mathcal{I}_a(t)}
\sum_{t_0\in\mathcal{C}_{\mathbf{x}j}(t)}
w_{j,a}^{\mathrm{lock}}(t_0;t)
\frac{\alpha_{j,X}(\mathbf{x},t;t_0)}
{r_{\mathbf{x}j}^2(t;t_0)\left|J_{\mathbf{x}j}(t;t_0)\right|},
$$

and

$$
\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t;\ell)
=
W_\ell *
\sum_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\sum_{t_0\in\mathcal{C}_{\mathbf{x}j}(t)}
w_j^{\mathrm{sea}}(t_0;t)
\frac{\alpha_{j,X}(\mathbf{x},t;t_0)}
{r_{\mathbf{x}j}^2(t;t_0)\left|J_{\mathbf{x}j}(t;t_0)\right|}.
$$

These coefficients are not fit amplitudes. For each accepted causal root, define the root-selected branch record

$$
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
j,\,
t_0,\,
\hat{\mathbf{r}}_{\mathbf{x}j},\,
r_{\mathbf{x}j},\,
J_{\mathbf{x}j},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}},\,
\Lambda_j
\right)_{(\mathbf{x},t;t_0)}.
$$

Here $\mathcal{L}_{j}^{\mathrm{wake}}$ is the wake-history ledger carried by the source branch and $\Lambda_j$ is the closure label or neutral swarm label available on that branch. The locked weight is the assembly projector

$$
w_{j,a}^{\mathrm{lock}}(t_0;t)
=
\mathbf{1}_{j\in\mathcal{I}_a(t)}
\,
\zeta_a
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right),
$$

where $\zeta_a\in[0,1]$ is one for an accepted phase-locked branch of $\Lambda_a(t)$ and zero for a rejected branch in the exact ledger limit. A regularized branch chart may replace this sharp value by

$$
\zeta_a^{(\eta_\Lambda)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\exp
\!\left[
-
\frac{
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)}
{\eta_\Lambda^2}
\right],
$$

where $d_{\Lambda_a}$ measures closure-label, phase, and branch-provenance mismatch against the accepted assembly ledger. The ambient weight is the complement projector

$$
w_j^{\mathrm{sea}}(t_0;t)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\,
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right),
$$

where $\zeta_{\mathrm{sea}}^{(\ell)}\in[0,1]$ retains branches belonging to the neutral swarm equilibrium record in the coarse window after all resolved assembly ledgers have been removed. Thus a branch cannot contribute to the locked numerator and the ambient denominator by relabeling alone; it must pass the corresponding ledger projector.

The first symbolic form of this ambient projector comes from ledger complement plus local cadence smoothing. Let $\mathfrak A_{\mathrm{res}}(\Omega_\ell,t)$ be the resolved assembly ledgers inside the same coarse window, including matter assemblies and any resolved corridor ledger that has not been declared ambient Noether sea. Define the complement factor

$$
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\prod_{a'\in\mathfrak A_{\mathrm{res}}(\Omega_\ell,t)}
\left[
1-
\zeta_{a'}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
\right].
$$

For any neutral swarm branch quantity $f_k(t)$, write the ambient window average after resolved assembly ledgers have been removed as

$$
\left\langle f\right\rangle_{\mathrm{sea},\ell}(\mathbf{x},t)
=
\frac{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
W_\ell(\mathbf{x}-\mathbf{X}_k(t))f_k(t)
}{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
W_\ell(\mathbf{x}-\mathbf{X}_k(t))
}.
$$

Let $\nu_k$ be the cadence variable of neutral swarm $k$, let $\bar\nu_{\mathrm{sea}}^{(\ell)}=\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and let $\sigma_{\nu,\ell}^2=\left\langle(\nu-\bar\nu_{\mathrm{sea}}^{(\ell)})^2\right\rangle_{\mathrm{sea},\ell}$. The cadence residual of the candidate branch is

$$
\Delta_{\mathrm{cad}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\frac{
\nu_j(t_0)-\bar\nu_{\mathrm{sea}}^{(\ell)}(\mathbf{x},t)
}{
\sqrt{\sigma_{\nu,\ell}^2+\epsilon_\nu^2}
}.
$$

Let $\mathcal N_{\ell}^{\setminus\mathrm{res}}$ be the neutral-pairing residual and $\mathbf P_{\ell}^{\setminus\mathrm{res}}$ the orientation/polarization residual of the same window after resolved assembly ledgers have been removed. The window-balance residual is

$$
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
=
\frac{
\left\|\mathcal N_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_N^2
}
+
\frac{
\left\|\mathbf P_{\ell}^{\setminus\mathrm{res}}\right\|^2
}{
\epsilon_P^2
}.
$$

The ambient acceptance is then

$$
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
\exp
\!\left[
-
\frac{1}{2}
\left(
\left(\Delta_{\mathrm{cad}}^{(\ell)}\right)^2
+
\left(\Delta_{\mathrm{bal}}^{(\ell)}\right)^2
\right)
\right].
$$

This form rejects assembly-locked branches because any resolved locked projector $\zeta_{a'}=1$ drives the complement factor to zero in the exact ledger limit. It retains ambient Noether sea branches in the same coarse window when they remain outside all resolved assembly ledgers and agree with the locally smoothed neutral swarm cadence and balance record. The tolerances $\epsilon_\nu$, $\epsilon_N$, and $\epsilon_P$ are resolution tolerances for the chosen window and ledger chart; they are not channel-specific fit parameters. Channel differences still enter through $\Pi_X$ and $Q_X$, while the assembly/complement split and neutral-equilibrium projector remain common to the diagnostic.

The channel intensity is the channel exposure of the same root-selected branch record:

$$
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
Q_X
\!\left[
\Pi_X
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right],
\qquad
\alpha_{j,X}(\mathbf{x},t;t_0)
=
\kappa\,
\left\|
\mathcal{E}_{X}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
\right\|_X.
$$

The projection $\Pi_X$ selects the channel being tested and $Q_X$ removes only equivalences that preserve that channel's benchmark. Clock-coupling keeps cadence and phase entries that perturb the clock functional. Reaction-corridor calculations keep the oriented exchange, line-defect, color, weak, or provenance entries declared by that corridor. Packing keeps scalar or tensor exclusion-stress magnitude after force signs are discarded. Penetration keeps the local acceleration and phase-disruption entries along the tested path. These channels may use different $\Pi_X$, but they must not change the causal-root kernel, the assembly/complement split, or the source branch record.

The first concrete projector family can be stated as retained entries of $\mathcal{B}_{\mathbf{x}j}^{(t_0)}$ plus derived local entries computed from the same branch. For the clock channel,

$$
\Pi_{\mathrm{clock}}
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
\delta\theta_{\mathrm{clk}}^{(j)},\,
\delta\omega_{\mathrm{clk}}^{(j)},\,
\delta\chi_{\mathrm{sea}}^{(\ell,j)},\,
J_{\mathbf{x}j},\,
\Lambda_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right),
$$

where $\delta\theta_{\mathrm{clk}}^{(j)}$ and $\delta\omega_{\mathrm{clk}}^{(j)}$ are the branch-induced phase and cadence increments of the declared clock functional, and $\delta\chi_{\mathrm{sea}}^{(\ell,j)}$ is the branch contribution to the coarse Noether sea delay factor. The quotient $Q_{\mathrm{clock}}$ may remove phase-origin choices and hidden constituent relabelings only when $\omega_{\mathrm{clk}}/\omega_0$ is unchanged.

For a reaction corridor,

$$
\Pi_{\mathrm{corridor}}
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
\hat{\mathbf{r}}_{\mathbf{x}j},\,
q_j,\,
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}},\,
\mathcal{L}_{j}^{\mathrm{corr}},\,
\mathcal{P}_{j}^{\mathrm{prov}},\,
\Theta_j^{\mathrm{strain}}
\right),
$$

where $\mathcal{L}_{j}^{\mathrm{corr}}$ is the declared strong, weak, color, electromagnetic, or material corridor ledger, $\mathcal{P}_{j}^{\mathrm{prov}}$ is the provenance record of participating architrinos and energy entries, and $\Theta_j^{\mathrm{strain}}$ is the line-defect or medium-strain entry when the corridor calculation requires one. The quotient $Q_{\mathrm{corridor}}$ may remove only corridor-basis relabelings that preserve the recovered reaction channel, provenance ledger, and line-defect energy.

For packing,

$$
\Pi_{\mathrm{packing}}
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
\left\|\mathcal{L}_{j}^{\mathrm{wake}}\right\|_{\mathrm{excl}},\,
\mathcal{S}_{j,\mathrm{excl}}^{ab},\,
R_{\parallel,j},\,
R_{\perp,j},\,
\lambda_j,\,
\xi_j
\right),
$$

where $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ is the local exclusion-stress entry and $(R_{\parallel,j},R_{\perp,j},\lambda_j,\xi_j)$ are the envelope entries exposed by the branch. Packing deliberately discards attraction/repulsion sign after the exclusion magnitude and stress tensor are retained, because the benchmark is stable adjacency rather than signed acceleration along one path.

For penetration along a declared test path with tangent $\hat{\mathbf{u}}$ at $\mathbf{x}$,

$$
\Pi_{\mathrm{penetration}}
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
\mathbf{a}_{\mathbf{x}\leftarrow j}(t;t_0),\,
\mathbf{a}_{\mathbf{x}\leftarrow j}(t;t_0)\cdot\hat{\mathbf{u}},\,
\Delta\phi_{\mathrm{disrupt}}^{(j)},\,
r_{\mathbf{x}j},\,
J_{\mathbf{x}j},\,
\Lambda_j
\right),
$$

where $\mathbf{a}_{\mathbf{x}\leftarrow j}$ is the signed branch acceleration obtained from the same causal-root law and $\Delta\phi_{\mathrm{disrupt}}^{(j)}$ is the induced phase-disruption increment on the tested transit branch. Unlike packing, penetration keeps the signed line-of-action entry because the benchmark asks whether the transit path remains dynamically stable.

The first channel norms are dimensionless stability diagnostics on these retained records. Their denominator scales are declared resolution or benchmark tolerances for the channel chart; they are not per-observable fit parameters. For clock coupling,

$$
\left\|
\mathcal E_{\mathrm{clock}}
\right\|_{\mathrm{clock}}^2
=
\frac{\left(\delta\omega_{\mathrm{clk}}/\omega_0\right)^2}{\epsilon_\omega^2}
+
\frac{\operatorname{dist}_{S^1}^2(\delta\theta_{\mathrm{clk}},0)}{\epsilon_\theta^2}
+
\frac{\left(\delta\chi_{\mathrm{sea}}^{(\ell,j)}/\chi_{\mathrm{sea}}^{(\ell)}\right)^2}{\epsilon_\chi^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right\|_{\mathrm{phase}}^2}{\epsilon_{\mathrm{phase}}^2}.
$$

For a declared reaction corridor with oriented corridor record $\hat{\mathbf c}_X$,

$$
\left\|
\mathcal E_{\mathrm{corridor}}
\right\|_{\mathrm{corridor}}^2
=
\frac{1-\hat{\mathbf r}_{\mathbf{x}j}\cdot\hat{\mathbf c}_X}{\epsilon_{\mathrm{dir}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{wake}}\big|_{\mathrm{oriented}}
\right\|_{\mathrm{oriented}}^2}{\epsilon_{\mathrm{or}}^2}
+
\frac{\left\|
\mathcal{L}_{j}^{\mathrm{corr}}
\right\|_{\mathrm{corr}}^2}{\epsilon_{\mathrm{corr}}^2}
+
\frac{d_{\mathrm{prov}}^2(\mathcal P_j^{\mathrm{prov}},\mathcal P_X^{\mathrm{prov}})}{\epsilon_{\mathrm{prov}}^2}
+
\frac{\left\|\Theta_j^{\mathrm{strain}}\right\|^2}{\epsilon_{\Theta}^2}.
$$

For packing, signs of attraction and repulsion have already been quotiented out, but exclusion magnitude and shape remain:

$$
\left\|
\mathcal E_{\mathrm{packing}}
\right\|_{\mathrm{packing}}^2
=
\frac{
\left\|
\mathcal{L}_{j}^{\mathrm{wake}}
\right\|_{\mathrm{excl}}^2
}{\epsilon_{\mathrm{excl}}^2}
+
\frac{
\left\|
\mathcal{S}_{j,\mathrm{excl}}^{ab}
\right\|_{S}^2
}{\epsilon_S^2}
+
\frac{\left(\Delta\ln R_{\parallel,j}\right)^2}{\epsilon_{\parallel}^2}
+
\frac{\left(\Delta\ln R_{\perp,j}\right)^2}{\epsilon_{\perp}^2}
+
\frac{\left(\Delta\ln\lambda_j\right)^2}{\epsilon_\lambda^2}
+
\frac{\left(\Delta\ln\xi_j\right)^2}{\epsilon_\xi^2}.
$$

Here each $\Delta\ln$ term is measured relative to the declared branch reference for the channel: the weak homogeneous nested shell swarm for clock/ruler calibration, the candidate neighboring swarm for packing, or the pre-entry path branch for penetration.

For penetration along $\hat{\mathbf u}$, decompose the signed branch acceleration into tangent and transverse parts,

$$
a_{\parallel,j}
=
\mathbf a_{\mathbf{x}\leftarrow j}\cdot\hat{\mathbf u},
\qquad
\mathbf a_{\perp,j}
=
\mathbf a_{\mathbf{x}\leftarrow j}
-
a_{\parallel,j}\hat{\mathbf u}.
$$

The dominance norm is

$$
\left\|
\mathcal E_{\mathrm{penetration}}
\right\|_{\mathrm{penetration}}^2
=
\frac{a_{\parallel,j}^2}{a_{\parallel,\mathrm{tol}}^2}
+
\frac{\left\|\mathbf a_{\perp,j}\right\|^2}{a_{\perp,\mathrm{tol}}^2}
+
\frac{\operatorname{dist}_{S^1}^2(\Delta\phi_{\mathrm{disrupt}}^{(j)},0)}{\epsilon_{\mathrm{disrupt}}^2}
+
\frac{\left(\Delta\ln r_{\mathbf{x}j}\right)^2}{\epsilon_r^2}
+
\frac{\left(\Delta\ln|J_{\mathbf{x}j}|\right)^2}{\epsilon_J^2}.
$$

The signed entries in the penetration record remain available before the norm is taken, so a stabilizing tangent push and a destabilizing tangent push are not treated as the same path-history branch. The scalar norm is used only after the sign-sensitive admissibility test has decided which branch contributes to the penetration benchmark.

The tolerance scales must be inherited from declared ledger comparisons. Let $\mathcal O_X[\mathcal B]$ be the channel readout produced from the projected branch record, and let $\Delta_X^{\mathrm{tol}}$ be the benchmark sensitivity fixed before the scan. For any retained scalar entry $y_\mu(\mathcal B)$ in channel $X$, the first admissible scale is the local pullback of that readout tolerance,

$$
\epsilon_{\mu,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\right\}.
$$

This definition makes the $\epsilon$ values derived chart scales: they are how far a retained ledger entry may move before the declared channel readout changes by more than the accepted tolerance. The practical first estimates are:

$$
\epsilon_\omega=\Delta_{\Gamma}^{\mathrm{tol}},
\qquad
\epsilon_\theta=\Delta_{\theta}^{\mathrm{tol}},
\qquad
\epsilon_\chi=\Delta_{\chi}^{\mathrm{clk\text{-}sig,tol}},
$$

for clock scans;

$$
\epsilon_{\mathrm{dir}}
=
1-\cos\theta_X^{\mathrm{tol}},
\qquad
\epsilon_{\mathrm{prov}}
=
\Delta_{\mathrm{prov},X}^{\mathrm{tol}},
$$

for corridor scans, with exact provenance closure represented by the limit $\Delta_{\mathrm{prov},X}^{\mathrm{tol}}\to0$ after regularization; and

$$
\epsilon_{\parallel}
=
\Delta\ln R_{\parallel}^{\mathrm{stab}},
\qquad
\epsilon_{\perp}
=
\Delta\ln R_{\perp}^{\mathrm{stab}},
\qquad
\epsilon_{\lambda}
=
\Delta\ln\lambda^{\mathrm{stab}},
\qquad
\epsilon_{\xi}
=
\Delta\ln\xi^{\mathrm{stab}},
$$

for packing scans, where the stable ranges are measured over accepted neighboring-swarm branches rather than chosen per atom or line. For penetration over a trial path of duration $T_{\mathrm{path}}$ and speed $v_{\mathrm{path}}$,

$$
a_{\parallel,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\Delta v_{\parallel}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
a_{\perp,\mathrm{tol}}
=
\frac{v_{\mathrm{path}}\theta_{\mathrm{path}}^{\mathrm{tol}}}{T_{\mathrm{path}}},
\qquad
\epsilon_{\mathrm{disrupt}}
=
\Delta\phi_{\mathrm{path}}^{\mathrm{tol}}.
$$

Thus tolerance derivation is a ledger-replay problem. A hydrogen line, packing calculation, or penetration test may choose a different channel tolerance because it asks a different stability question, but it may not retune the tolerance after seeing the observable.

The mismatch metric used in the regularized locked projector must also be ledger-derived. Let $\mathcal{R}_a(t)$ be the accepted reduced record of assembly $a$ containing its closure label, phase state, active causal roots, provenance entries, and conserved ledger increments. The first symbolic mismatch is

$$
d_{\Lambda_a}^2
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
d_{\mathrm{disc}}^2
+
\frac{
\operatorname{dist}_{S^1}^2
\!\left(
\phi_j-\phi_a
\right)}
{\epsilon_\phi^2}
+
\frac{
d_{\mathrm{root}}^2
\!\left(
\mathcal{R}_j,\mathcal{R}_a
\right)}
{\epsilon_{\mathrm{root}}^2}
+
\frac{
d_{\mathrm{prov}}^2
\!\left(
\mathcal{P}_j,\mathcal{P}_a
\right)}
{\epsilon_{\mathrm{prov}}^2}
+
\frac{
\left\|
\Delta\mathcal{N}_{j\to a}
\right\|_{\mathrm{cons}}^2}
{\epsilon_{\mathrm{cons}}^2}.
$$

Here $d_{\mathrm{disc}}=0$ when the discrete closure labels are compatible and $d_{\mathrm{disc}}=\infty$ when they are incompatible; $\operatorname{dist}_{S^1}$ is phase distance; $d_{\mathrm{root}}$ compares active causal-root ledgers; $d_{\mathrm{prov}}$ compares participating-source provenance; and $\Delta\mathcal{N}_{j\to a}$ collects the energy, momentum, angular-momentum, polarity, and other conserved-increment residuals needed by the assembly ledger. This makes $\zeta_a$ a branch-admission test. If any term has to be chosen separately for clock, corridor, packing, and penetration benchmarks, the interface diagnostic has reverted to a fitted surface rather than a closure-ledger projection.

For regularized simulations, the branch sum is replaced by the corresponding finite-width integral with $\delta_\eta(g_{\mathbf{x}j})$. The important constraint is that the numerator and denominator of $D_{a,X}$ use the same channel $X$, the same causal-width rule, and the same coarse-graining window. Signed force cancellation belongs in acceleration calculations; interface dominance uses retained channel magnitude so that a cancellation in one direction is not mistaken for absence of wake activity.

Then the effective assembly-Noether sea interface for a declared stability threshold $D_X$ is the level set

$$
\partial\Omega_a(D_X,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
D_{a,X}(\mathbf{x},t)=D_X
\right\}.
$$

The level-set threshold is not universal. A penetration calculation, packing calculation, clock-coupling calculation, and reaction-corridor calculation choose different $D_X$ values because they test different stability criteria. A useful ordering of first thresholds is

$$
0
<
D_{\mathrm{clock}}
\le
D_{\mathrm{corridor}}
\le
D_{\mathrm{packing}}
\le
D_{\mathrm{penetration}}
<
1.
$$

Clock-coupling can be sensitive to weak locked-wake tails. A reaction corridor needs a stronger coherent channel but need not coincide with the full exclusion envelope. Packing asks where another stable Noether swarm or assembly can remain without persistent phase disruption. Penetration asks where transit through the assembly-dominated wake becomes dynamically unstable. What must remain invariant is the level distinction: exact assembly membership is a closure-ledger fact, while $\partial\Omega_a(D_X,t)$ is a spatial interface extracted from that ledger and the surrounding Noether sea response.

### Oblate Spheroidal Form

The nested shell swarm structure is anisotropic. The three shell binaries orbit and precess, with their orbital planes tending toward mutual orthogonality in stable low-apparent-energy conditions. The time-averaged envelope is therefore not perfectly spherical.

The leading boundary of the exclusion envelope is set primarily by the **outer binary**:

- it has the largest orbital radius,
- it has the slowest frequency,
- and its orbital plane defines the dominant equatorial plane of the assembly.

The inner and middle binaries supply the high-frequency internal wake structure and stabilizing density of the envelope. The outer binary supplies the main geometric boundary. Together, outer orbit sweep plus system precession naturally produce a flattened-pole, equatorial-bulge form: an **oblate spheroidal exclusion envelope**.

In low-energy prose, "nested shell swarm shape" should usually mean this effective envelope, not a literal material surface.

### Canonical Geometry Variables

For the oblate spheroidal exclusion envelope, use $R_{\parallel}$ for the semiaxis along the contraction or drift-aligned direction and $R_{\perp}$ for the transverse semiaxis. The canonical shape ratio is
$$
\xi\equiv\frac{R_{\parallel}}{R_{\perp}},
$$
so $\xi=1$ denotes a spherical envelope and $\xi<1$ denotes an oblate envelope compressed along the parallel axis.

Use
$$
\lambda\equiv\frac{R_{\perp}}{R_{\perp,0}}
$$
for the transverse scale ratio relative to a stated reference envelope. The pair $(\xi,\lambda)$ belongs first to nested shell swarm geometry: $\xi$ records shape and $\lambda$ records scale.

Observer clock behavior is a downstream readout, not the definition of either geometry variable. In a successful homogeneous Lorentz-closure regime, the theory should derive
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt}\to\xi\to\frac{1}{\gamma},
$$
but this is a closure target linking the clock channel to the oblate envelope. It should not be used to define $\xi$.

### Lorentz Projection Role

For branch-quantized Lorentz response, the envelope variables $(\xi,\lambda)$ are projection variables. They expose the geometry of a stable all-layer nested shell swarm branch to external clocks, rulers, and nearby assemblies, but they do not by themselves contain the full branch state.

The hidden branch state contains the inner, middle, and outer layer radii, frequencies, speeds, axes, active causal-root ledger, and wake exchange. The outer binary controls the leading boundary because it has the largest radius and weakest shielding. Therefore the observed ruler factor is extracted through the outer envelope,
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)},
$$
but the branch $q$ is accepted only when the inner and middle ledgers also retune consistently with clock closure, conservation, and preferred-frame leakage bounds.

The direct Lorentz-to-geometry map comes from a closed return cycle. In a homogeneous cell, define
$$
\gamma_{\text{eff}}(v)
\equiv
\frac{1}{\sqrt{1-v^2/c_{\text{eff}}^2}}.
$$
The longitudinal return time for an envelope semiaxis $R_{\parallel}$ is
$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\text{eff}}-v}
+
\frac{R_{\parallel}}{c_{\text{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\text{eff}}}\gamma_{\text{eff}}^2,
$$
while the transverse causal-budget return time is
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\text{eff}}}\gamma_{\text{eff}}.
$$
Requiring $T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_0)$ gives
$$
\xi_q(v)
=
\frac{R_{\parallel,q}(v)}{R_{\perp,q}(v)}
=
\frac{1}{\gamma_{\text{eff}}(v)}
+O(\epsilon_{\mathrm{LV}}).
$$
The role of the geometry chapter is to record this as an envelope projection, not as a primitive definition. The derivation and closure coefficients belong to [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio).

This distinction prevents an outer-only shortcut. An outer-binary oblation model can estimate the visible deformation channel, while a mature Lorentz closure must show that the same branch update also determines the clock factor
$$
\gamma_{\mathrm{clk}}^{(q)}(v)=\frac{T_q(v)}{T_0}
$$
and that the admitted branches satisfy
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
=
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}}).
$$
The envelope is therefore the visible projection of the three-binary causal-root ledger, not an independently assigned Lorentz surface.

### Retuning Projection to Envelope Variables

The cadence-scale retuning map must project into $(\lambda,\xi)$ through the envelope geometry, not by assigning those variables independently. Let

$$
\mathbf{e}_q
=
\left(
\ln R_{\parallel,q},\,
\ln R_{\perp,q}
\right)^{T}
$$

denote the logarithmic semiaxis record of branch $q$. The envelope projection is a branch-dependent map

$$
\mathbf{e}_q
=
\mathcal{P}_{\mathrm{env}}^{(q)}
\!\left(
\ln R_I,\ln R_M,\ln R_O,\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O,\,
\mathcal{L}_{\mathrm{root}},\mathcal{L}_{\mathrm{wake}}
\right),
$$

where the axes, root ledger, and wake ledger are part of the branch data. The induced geometry increments are therefore

$$
\Delta\ln\lambda
=
\Delta\ln R_{\perp,q},
\qquad
\Delta\ln\xi
=
\Delta\ln R_{\parallel,q}
-
\Delta\ln R_{\perp,q}.
$$

In the low-stress outer-dominated branch, this reduces to the useful estimate

$$
\Delta\ln\lambda
\approx
\Delta\ln R_O,
\qquad
\Delta\ln\xi
\approx
\Delta\ln R_{\parallel,O}
-
\Delta\ln R_{\perp,O}.
$$

This approximation is a projection estimate, not a branch proof. It fails when middle-layer hinge motion, inner self-hit history, axis precession, or neighbor-induced strain contributes at the same order as the outer binary. Those failures are informative: they identify which hidden ledger entries must be retained before the retuning map can be used for clock, ruler, or Noether sea transport calculations.

### Deformability of the Envelope

The oblate spheroidal envelope is deformable because it is generated by orbit paths, not by a rigid shell. Those paths depend on the superposition of:

- internal binary wakes,
- self-hit and partner-hit closure,
- nearby assembly wakes,
- Noether sea density and stress,
- and the swarm's translational state through the Noether sea.

External effective fields, nearby assembly wakes, and dense local assemblies can perturb the binary paths. The outer binary is the most exposed channel because it is the largest and most weakly shielded layer. A distortion of that outer path changes the exclusion envelope.

This gives the nested shell swarm two distinct geometric roles:

1. As an assembly, it can deform while preserving nested shell swarm identity across a stable regime.
2. As a medium constituent, many deforming swarms can contribute to coarse-grained Noether sea density, strain, and signal-propagation changes.

The claim that those coarse-grained changes reconstruct observer-level gravity is not owned here. It belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), and [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).

For the special-relativity-facing comparison of this deformation channel, see [the deformable Noether swarm comparison](../../../../markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md). For the focused synthesis of the closed-return quantization claim, see [Return-Cycle Lorentz Quantization](../../../../markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md).

### Geometry Interfaces

For local assembly modeling, use this page as the geometric source for:

- an oblate envelope boundary,
- principal axes set by nested shell swarm orientation,
- deformation of the outer-binary envelope under local gradients,
- and exclusion-volume changes relevant to packing, shielding, and collision channels.

For dynamics modeling, use [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), where the oblate causal envelope is treated as a delay-geometry input and a simulation target.

For Noether sea modeling, use [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) and [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), where many Noether swarms become a coupled medium rather than isolated assembly envelopes.

### Summary Commitment

> **Nested Shell Swarm Geometry Commitment:** A nested shell swarm has an oblate spheroidal exclusion envelope generated by the path history of its shell binaries. The envelope is dynamic and deformable, not a rigid surface. Its deformation is an assembly-level input to Noether sea state variables, while metric and gravity-language reconstruction belongs to the spacetime branch.

> **Lorentz Projection Commitment:** In Lorentz closure, the outer-binary envelope supplies the leading observable ruler projection, while the accepted branch state remains a three-binary causal-root ledger. The geometry chapter records $\xi$ and $\lambda$ as projection variables; it does not reduce clock, mass, or action-ledger closure to outer-envelope shape alone.
