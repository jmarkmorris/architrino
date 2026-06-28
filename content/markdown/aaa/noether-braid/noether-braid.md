# Noether Braid

The **Noether braid** is the reader-facing class of neutral six-architrino assembly scaffolds used in the Noether sea and particle-architecture program. A Noether braid is not assumed at the outset to be a set of exact binaries. The base object is a closed, polarity-neutral, bounded-speed six-body branch in which three positive-polarity architrinos (positrinos) and three negative-polarity architrinos (electrinos) maintain a persistent causal-return ledger.

This chapter uses three braid types:

| Term | Definition | Additional structure |
| --- | --- | --- |
| **neutral braid** | The broad six-architrino neutral case before any required binary grouping or radial organization. | Polarity balance and causal-return bookkeeping. |
| **shell braid** | A neutral braid whose six architrino paths remain in a controlled radial support band. | Radial support control, with near-antipodality only as an optional constraint. |
| **nested shell braid** | A shell braid with three ordered radial support bands. | Ordered support-band structure; exact binaries are an additional proof assumption, not a separate braid type. |

These definitions name case structure, not retained-branch existence. A neutral braid requires six-body polarity balance and causal-return bookkeeping; a shell braid adds radial support and recovery residuals; a nested shell braid adds ordered support bands. Exact binary nesting, stable all-pairs roots, and observer-export behavior are theorem targets that must be certified by the branch ledger rather than read back into the definition.

The word **braid** names the six retained worldline strands together with their shared causal-return ledger. It does not by itself assert that the branch already carries a protected mathematical braid-group class. A protected braid, linking, framing, or chirality class is extra structure to be certified by the [assembly topological charge](../dynamics/assembly-topological-charge.md) program.

Canonical reader-facing prose uses **Noether braid**, **nested shell braid**, and **nested binary** for this material. Durable symbols and internal runtime identifiers may still contain `NS`, `noether_braid`, or `nested-shell-braid`; those strings are stable implementation identifiers, not a second taxonomy. The braid's dynamic envelope geometry is developed separately in [the nested shell braid geometry chapter](nested-shell-braid-geometry.md), while metric-level translation belongs to [Emergent Metric](../spacetime/emergent-metric.md).

## Neutral Braid

A **neutral braid** is the base six-architrino case. It contains three positrinos and three electrinos, indexed by $i\in\{1,\ldots,6\}$ with polarity signs $\sigma_i\in\{+1,-1\}$ satisfying

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_{i=1}^{6}\sigma_i=0
$$

This polarity-neutral ledger is imposed before any binary partition, shell ordering, or near-antipodal matching is assumed. Each positive-polarity architrino has three attractive channels to negative-polarity architrinos and two repellent channels to the other positive-polarity architrinos. Each negative-polarity architrino has the polarity-reversed version of the same count: three attractive channels to positives and two repellent channels to negatives. That $3+2$ channel count is part of the neutral braid bookkeeping even when no binary partition has been certified.

The intrinsic path of architrino $i$ may be represented by a closed arclength curve

$$
Y_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\left\| Y_i'(s)\right\|=1,
\qquad
Y_i(s+L_i)=Y_i(s)
$$

Its physical trajectory is allowed to move along that support with a bounded speed factor,

$$
X_i(t)=Y_i(\lambda_i(t)),
\qquad
\dot{\lambda}_i(t)=\nu_i(t),
\qquad
0<\nu_-\leq\nu_i(t)\leq\nu_+<\infty
$$

The bounded speed factor $\nu_i(t)$ is the place where speed-lapse behavior enters the architecture. A branch may temporarily push an architrino over a local hinge into a self-hit mode, but an admissible neutral braid must still return to a closed causal ledger within the branch's recovery tolerance. The neutral braid therefore allows changing support geometry, nonuniform speed, changing local curvature, and delayed multi-channel response without first reducing the motion to three exact binaries.

## Retained-Branch Certificate Target

The present neutral braid claim is a theorem target, not a retained-branch result. A candidate branch $B$ over a test window $W$ is retained only if the required rows close on one ledger identity. The master certificate can be summarized as

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
\right)
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
P_{\mathrm{conv}}
$$

Every predicate in this conjunction must use the same source-pair policy, same-source policy, memory depth, support descriptor, action convention, event interval, and inventory ledger. If any row changes those conventions, the status is a ledger mismatch rather than a retention result.

The root row begins with all ordered distinct source pairs,

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30
$$

The $3$ attractive and $2$ repellent source-site counts for each receiver are inventory facts, not a compressed force law. The force row must still be assembled from the actual retained causal roots, delays, Jacobian floors, and line-of-action vectors for these ordered pairs. A shell braid or nested shell braid can reduce this ledger only after its reduction row proves how the compressed rows are inherited from the all-pairs ledger.

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
\right)
$$

Rows through convergence block branch retention. Case-reduction and observer-export rows classify downstream structure only after the required neutral rows close. Therefore a favorable Lorentz, photon, topology, mass-map, or shell-geometry diagnostic cannot rescue an open root, tail, dynamics, action, event, stability, or convergence row.

Current fixed-speed octahedral diagnostics have produced scoped negative results. For the rigid zero-offset octahedral carrier, the all-pairs causal-root ledger is certified for all $30$ ordered distinct source pairs, with one positive-delay root per row, support-complete memory depth $h_{\mathrm{mem}}=2$, and a positive Jacobian floor. This root-ledger result does not retain the branch. The rigid zero-offset fixed-speed neutral row has a certified nonzero tangential residual at the receiver node $((1,+),0)$,

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232]
$$

so that narrow branch chart is rejected. The diagnostic family also rejects several overreads: the ordinary same-source positive-delay rescue is absent under the rigid exact-$c_f$ circular convention, inventory attraction bias does not imply force closure, resolved positive-delay root rows do not imply force closure, and sampled phase or polarity-phase improvements do not imply retention. These are negative results for rigid fixed-speed octahedral hypotheses, not rejections of the broader neutral braid, shell braid, nested shell braid, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

## Medium-Selection Burden

Branch retention is not the same question as Noether sea primacy. A retained Noether braid branch would show that one neutral assembly class can persist. It would not yet show that this class is the dominant ambient structure in the universe, because many other architrino assemblies might also be imagined.

The stronger claim is a selection theorem over candidate assembly classes. A class can serve as the ambient Noether sea population only if it can be retained as a branch and also form a dense, locally neutral, convergent, transparent, pressure-bearing, and constitutively useful medium. In the notation of [Noether Sea](../spacetime/noether-sea.md#composition), the nested shell braid route must pass the ambient selection residual while competing assembly classes either fail, remain local matter or reaction branches, or appear only as higher-energy, short-lived, or environment-specific excitations.

This distinction protects the proof order. The neutral braid, shell braid, and nested shell braid rows ask whether the six-site architecture can close. The Noether sea selection row asks why that architecture should dominate the weak homogeneous medium rather than a different assembly population. A particle-like success, a metric-like export, or an appealing exclusion volume is therefore not enough by itself; the same branch class must also supply the statistical abundance, far-field cancellation, packing, and shared-response properties needed by the Noether sea.

## Shell Braid

A **shell braid** is a neutral braid whose six trajectories remain in a controlled radial band around a branch center $C(t)$. For a representative shell scale $R_*$ and band limits $R_-<R_+$, the shell condition is

$$
R_-\leq
\left\| X_i(t)-C(t)\right\|
\leq R_+,
\qquad
i=1,\ldots,6
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}}
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell braid. It is a one-band neutral braid whose support is spatially organized strongly enough to produce a persistent exclusion envelope, shielding pattern, and Noether sea coupling channel.

Near-antipodality is an optional shell braid constraint, not a definition of the neutral braid. A shell branch may carry an approximate polarity-reversing matching $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$. Relative to a branch center $C(t)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(t)
=
\frac{
\left\| X_i(t)+X_{\iota(i)}(t)-2C(t)\right\|
}{R_*}
$$

Exact antipodality, $\delta_{\mathrm{anti},i}=0$, is an ideal symmetry chart. It should not be expected in ordinary conditions: an external potential can disturb one member of the matching first, and the delayed response takes time to circulate through the full six-body causal ledger. The physical shell claim is therefore near-antipodality plus recovery,

$$
\sup_{t\in J}\delta_{\mathrm{anti},i}(t)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(t+T_{\mathrm{rec}})
\leq
\kappa\,\delta_{\mathrm{anti},i}(t)+\varepsilon_{\mathrm{drive}}
$$

for a branch interval $J$, recovery time $T_{\mathrm{rec}}$, contraction factor $0\leq\kappa<1$, and driving residue $\varepsilon_{\mathrm{drive}}$. Near-antipodality is useful because it captures the shell branch's tendency to restore opposite-side balance without pretending that the two matched architrinos remain in lockstep under perturbation.

## Nested Shell Braid

A **nested shell braid** is a shell braid with three ordered radial support bands. It is the case most of the existing downstream corpus currently describes.

The geometric shell labels are

$$
I,\ M,\ O
$$

for **inner**, **middle**, and **outer** radial order. These are geometry labels: they say which support band is deepest, intermediate, or most externally exposed. They do not by themselves prove a dynamical role, a generation label, or a particle identity.

The role labels are

$$
H,\ M,\ L
$$

for **high**, **middle**, and **low** branch role. In the weak-stress nested shell braid chart, $H$ is the high-cadence or high-stress role, $M$ is the hinge or transfer role, and $L$ is the low-cadence or external-coupling role. The letter $M$ is therefore context-dependent: in $I/M/O$ it means middle radius, while in $H/M/L$ it means the middle role between high and low branch response. The usual weak-stress branch is expected to align these two orderings approximately, but that alignment is a branch result rather than a naming axiom.

The recursive binary picture remains valuable inside this case. Just as an Electrino and a Positrino can form a stable binary, a declared binary can participate in a larger coupled support structure, and three energy-separated binaries can form a nested shell hierarchy. The key to stability is still separation of scale: each surrounding support band must have a larger radius, a lower cadence, and a compatible causal-root ledger than the deeper support band.

Nested shell braid diagrams may therefore use logarithmic radius rather than literal radius. A log-radius diagram is a visualization convention: it may compress empty intervals between support bands and label the bands by scale, but it must preserve the declared inner/middle/outer radial order, cadence ordering, support-band widths, and branch-ledger quantities. It must not be read as evidence that a stable branch exists or that the three bands have fixed spacing in physical radius.

In this case, a candidate stable configuration is the **nested shell braid with exact binary assumptions**. It consists of three binaries, one in each ordered shell, and supplies the assembly scaffold later used in [Nested Shell Braid Dynamics](nested-shell-braid-dynamics.md).

-   **Why Three?** The stability of a three-shell nested structure is a theorem target tied to the three-dimensional nature of Euclidean space. Each binary defines an orbital plane or dominant support sheet. The working claim is that three mutually orthogonal support sheets can form a dynamically stable, symmetric, three-dimensional structure that is resistant to perturbation; the proof burden is to derive that role count from the delayed causal dynamics rather than assuming it.

-   **Why "Noether"?** This braid family is named in honor of Emmy Noether. Noether's theorem links symmetries in physical systems to conserved quantities. The highly symmetric nested shell braid is the candidate scaffold through which spin, branch-quantized energy records, and other conserved observer-level labels should be recovered from closure labels and emitted causal-wake envelopes.

## Properties of the Nested Shell Braid

-   **Energy-Separated Scales:** In low-energy nested shell braid conditions, the three shell binaries have energy-separated orbital radii and cadences. The innermost binary is the smallest and fastest, while the outermost is the largest and slowest. This separation of scales is crucial for the system's stability.

-   **Internal Stabilization:** The system is expected to be stable only on branches where the high-frequency causal-wake emissions from the innermost binary, inter-layer wake exchange, and outer-layer shielding close into a persistent return cycle. The time-averaged potential picture is useful, but the theorem burden is to show that the root ledger, phase closure, and separator conditions keep the coupled hierarchy on the same branch.

-   **Energy Shielding via Superposition:** From a distance, a nested shell braid appears to have far less energy and a much smaller potential signature than the raw sum of its six constituent architrinos. The rapid oscillation of the positive- and negative-polarity architrinos within the nested structure causes their wake contributions to largely cancel out through superposition. This shielding effect is the working mechanism for how highly energetic structures can form the basis for relatively low-mass observed particles; quantitative extraction remains a mass-map closure target.

## Integer Phase-Closure States

A nested shell braid should be treated as a closed-cycle geometry before it is treated as a particle label. Over a stable return period $T$, each binary must return its phase together with the relevant causal-root ledger:

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
a\in\{I,M,O\}
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On this reading, an accepted energy-level change is a one-$h$ closed-cycle action transaction that moves the nested shell braid from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned braid should therefore carry information about the braid's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the braid.

The same closure-label machinery is the native carrier for branch-quantized Lorentz response. A moving nested shell braid should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-layer retuning of radii, frequencies, characteristic speeds, and wake exchange; the outer envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the usual effective $\gamma(v)$ within the preferred-frame leakage bound.

## Cadence-Scale Retuning Hypothesis

The single-braid version of the $h$-step claim is geometric rather than merely thermal. An accepted action transaction does not add energy to a rigid object. It moves the nested shell braid from one admissible closure branch toward another, and the braid resolves that transaction by retuning its cadence-scale closure.

The bookkeeping distinction is

$$
h=\text{action per accepted cycle},
\qquad
A_N=Nh,
\qquad
E_N=A_N\nu_N
$$

Here $h$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $\nu_N$ is a representative cadence extracted from the closed nested shell braid branch. A one-$h$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh$. The accepted branch may answer through one or more of the cadence, layer radii, envelope scale, envelope ratio, orientation, strain, and inter-layer wake-exchange variables:

$$
\Delta A_{\mathrm{cyc}}=\pm h
\quad\Rightarrow\quad
(\nu_N,\ R_I,R_M,R_O,\ \lambda,\ \xi,\ \mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO})
\longmapsto
(\nu_N',\ R_I',R_M',R_O',\ \lambda',\ \xi',\ \mathcal{G}_{IM}',\mathcal{G}_{IO}',\mathcal{G}_{MO}')
$$

In the simplest fixed-speed layer estimate,

$$
v_\ell\sim 2\pi R_\ell\nu_\ell,
\qquad
\ell\in\{I,M,O\}
$$

If a branch keeps $v_\ell$ approximately fixed while accepting the transaction, then

$$
R_\ell\nu_\ell\approx\text{constant},
\qquad
\Delta\nu_\ell>0\Rightarrow\Delta R_\ell<0,
\qquad
\Delta\nu_\ell<0\Rightarrow\Delta R_\ell>0
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)_q^{T}
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
\sigma h
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
\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}
:
(\Lambda_{\text{NS}},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right)
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
w_I^{(q)}+w_M^{(q)}+w_O^{(q)}=1
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full nested shell braid need not put the entire transaction into a single layer. One layer may tighten while another expands, and the outer envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

## Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether braids is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal braids at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h$ itself. The fixed quantity is the closed-cycle action unit $h$; the branch variable is the total action level

$$
A_N=Nh,
\qquad
N\in\mathbb{Z}_{>0}
$$

For the outer binary, write the outer action allocation as

$$
N_O=p_O^{(q)}N,
\qquad
I_O=N_O\hbar
=p_O^{(q)}N\frac{h}{2\pi}
$$

Here $p_O^{(q)}$ is the branch share carried by the outer binary. With the reduced circular-action chart

$$
I_O=\mu_O^{\mathrm{rot}}R_O v_O
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
\frac{K_O}{4R_O^2}\mathcal{B}_O(\beta_O;\Lambda_O)
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
\frac{p_O^{(q)}Nh\sqrt{\zeta_O^{(q)}}}
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

The density symbol functions as packing notation for this chart. It names the maximum center density of the relevant Noether braid exclusion envelopes, not a separate braid type. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{NS},\max}^{\#}(N)
\propto
R_O(N)^{-3}
$$

For example, the fixed-speed branch gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while the bare inverse-square branch with approximately constant $\mathcal{B}_O$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. These are branch diagnostics, not competing definitions of a Noether braid.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_O^{(q)},\ \mu_O^{\mathrm{rot}},\ \alpha_O^{(q)},\ \mathcal{B}_O(\beta_O;\Lambda_O)
\longrightarrow
p_O(q,\theta_{\mathrm{env}}),\ \mu_O^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_O(q,\theta_{\mathrm{env}}),\ \mathcal{B}_O(\beta_O;\Lambda_O,\theta_{\mathrm{env}})
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroidal envelope rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

## Reduced Nested Shell Braid Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced nested shell braid closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{\text{NS}}$ denotes this reduced closure label:

$$
\Lambda_{\text{NS}}
=
\left(
k_I,k_M,k_O;\
\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O;\
\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO};\
\chi_c
\right)
$$

Here $k_I,k_M,k_O$ are the layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered braid chirality; the current candidate data are the `HML/HLM` ordered-braid distinction together with $Wr_c$ or a multi-component causal-writhe parity.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{\text{NS}}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible nested shell braid closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

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
}}
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
\sim_{O,\theta,W}
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

## Geometry and Exclusion Envelope

The same nested shell braid motion that supplies shielding also sweeps out a persistent dynamic exclusion envelope. That envelope is not the braid definition itself; it is the geometric footprint of the nested assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [the nested shell braid geometry chapter](nested-shell-braid-geometry.md).

## The Nested Shell Braid Hierarchy and Fermion Generations

The broader assembly program suggests reading the nested shell braid hierarchy as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-binary shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **Nested shell braid:** the fully shielded three-tier braid, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../assemblies/fermions/electron.md).

## Nested Shell Braid Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its shell scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across the nested shell braid.

As a nested shell braid approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune. At the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It is not a claim that the inner, middle, and outer binaries become identical. It means the middle binary remains on the field-speed hinge, the outer binary is driven into the same terminal threshold, and the inner binary remains the self-hit interior row while the assembly loses ordinary volumetric slack. Because $s_\ell=\omega_\ell\rho_\ell$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes the Noether braid more than a particle scaffold. In the nested shell braid reading, it contains a local black-hole dual: the middle binary is the horizon-interface threshold, the inner self-hit binary is the beyond-threshold interior row, and the outer binary is the exterior-coupling row that can be driven into terminal alignment under strong-field stress. This is a primitive black-hole pattern inside the assembly ontology, not an assertion that an ordinary particle is an observer-level compact object. The dynamics-facing proof burden is stated in [Nested Shell Braid Dynamics](nested-shell-braid-dynamics.md#local-black-hole-duality-target).

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell braid coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Braid Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

## The Foundation for Fermions

The Noether braid class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.
