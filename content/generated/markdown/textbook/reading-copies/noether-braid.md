# Noether Braid

## Noether Braid

The **Noether braid** is the reader-facing class of neutral six-architrino assembly scaffolds used in the Noether sea and particle-architecture program. A Noether braid is not assumed at the outset to be a set of exact binaries. The base object is a closed, polarity-neutral, bounded-speed six-body branch in which three positive-polarity architrinos (positrinos) and three negative-polarity architrinos (electrinos) maintain a persistent causal-return ledger.

For the broader cross-axis classifier, see [Noether Braid Taxonomy](../../../../markdown/aaa/noether-braid/noether-braid-taxonomy.md). The base family chapters are:

| Term | Definition | Additional structure |
| --- | --- | --- |
| [**neutral braid**](../../../../markdown/aaa/noether-braid/neutral-braid.md) | The broad six-architrino neutral case before any required binary grouping or radial organization. | Polarity balance and causal-return bookkeeping. |
| [**shell braid**](../../../../markdown/aaa/noether-braid/shell-braid.md) | A neutral braid whose six architrino paths remain in a controlled radial support band. | Radial support control, with near-antipodality only as an optional constraint. |
| [**nested shell braid**](../../../../markdown/aaa/noether-braid/nested-shell-braid.md) | A shell braid with three ordered radial support bands. | Ordered support-band structure; exact binaries are an additional proof assumption, not a separate braid type. |

These definitions name case structure, not retained-branch existence. A neutral braid requires six-body polarity balance and causal-return bookkeeping; a shell braid adds radial support and recovery residuals; a nested shell braid adds ordered support bands. Exact binary nesting, stable all-pairs roots, and observer-export behavior are theorem targets that must be certified by the branch ledger rather than read back into the definition.

The word **braid** names the six retained worldline strands together with their shared causal-return ledger. It does not by itself assert that the branch already carries a protected mathematical braid-group class. A protected braid, linking, framing, or chirality class is extra structure to be certified by the [assembly topological charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) program.

Canonical reader-facing prose uses **Noether braid**, **neutral braid**, **shell braid**, and **nested shell braid** for this material. Durable symbols and internal runtime identifiers may still contain `NS`, `noether_braid`, or `nested-shell-braid`; those strings are stable implementation identifiers, not a second taxonomy. The braid's dynamic envelope geometry is developed separately in [the nested shell braid geometry chapter](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md), while metric-level translation belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

### Document Role

This chapter is the overview and family map for the Noether braid stack. It defines the word **braid**, names the base family sequence, and explains why family labels are case structure rather than retained-branch results.

It does not carry the detailed family derivations, select a frequency family, assign a Proof ID or proof disposition, compute assembly topological charge, or export Lorentz clock/ruler deformation by itself. Neighboring chapters consume the branch record named here: [Neutral Braid](../../../../markdown/aaa/noether-braid/neutral-braid.md) owns the base six-body inventory and retained-branch certificate target, [Shell Braid](../../../../markdown/aaa/noether-braid/shell-braid.md) owns the one-band support family, [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md) owns the three-band support family, [Noether Braid Taxonomy](../../../../markdown/aaa/noether-braid/noether-braid-taxonomy.md) decodes configuration axes and compact Proof ID grammar, [Noether Braid Proof Map](../../../../markdown/aaa/noether-braid/noether-braid-proof-map.md) tracks detailed proof-run status and environment-qualified rounds, [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md) studies cases where three retained angular-momentum rows may form a full internal 3D frame, [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md) tests the nested shell braid mechanism, [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md) studies the `NSH-421` candidate family, [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) classifies retained branch charts, and [Nested Shell Braid Geometry](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md) supplies the envelope/export interface.

### Medium-Selection Burden

Branch retention is not the same question as Noether sea primacy. A retained Noether braid branch would show that one neutral assembly class can persist. It would not yet show that this class is the dominant ambient structure in the universe, because many other architrino assemblies might also be imagined.

The stronger claim is a selection theorem over candidate assembly classes. A class can serve as the ambient Noether sea population only if it can be retained as a branch and also form a dense, locally neutral, convergent, transparent, pressure-bearing, and constitutively useful medium. In the notation of [Noether Sea](../../../../markdown/aaa/spacetime/noether-sea.md#composition), the nested shell braid route must pass the ambient selection residual while competing assembly classes either fail, remain local matter or reaction branches, or appear only as higher-energy, short-lived, or environment-specific excitations.

This distinction protects the proof order. The neutral braid, shell braid, and nested shell braid rows ask whether the six-site architecture can close. The Noether sea selection row asks why that architecture should dominate the weak homogeneous medium rather than a different assembly population. A particle-like success, a metric-like export, or an appealing exclusion volume is therefore not enough by itself; the same branch class must also supply the statistical abundance, far-field cancellation, packing, and shared-response properties needed by the Noether sea.

## Neutral Braid

This chapter defines the base six-body family in the [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) sequence. It owns the neutral inventory, all-pairs branch ledger, and retained-branch certificate target before shell support, exact binary grouping, or nested ordering is added.

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

The bounded speed factor $\nu_i(t)$ is the place where speed-lapse behavior enters the architecture. A branch may temporarily push an architrino over a local hinge into a self-hit mode, but an admissible neutral braid must still return to a closed causal ledger within the branch's recovery tolerance. The neutral braid therefore allows changing support geometry, nonuniform speed, changing local curvature, and delayed multi-channel response without first reducing the motion to exact binary rows.

### Retained-Branch Certificate Target

The neutral braid claim is a theorem target, not a retained-branch result. A candidate branch $B$ over a test window $W$ is retained only if the required rows close on one ledger identity. The master certificate can be summarized as

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

Fixed-speed octahedral diagnostics have produced scoped negative results. For the rigid zero-offset octahedral carrier, the all-pairs causal-root ledger is certified for all $30$ ordered distinct source pairs, with one positive-delay root per row, support-complete memory depth $h_{\mathrm{mem}}=2$, and a positive Jacobian floor. This root-ledger result does not retain the branch. The rigid zero-offset fixed-speed neutral row has a certified nonzero tangential residual at the receiver node $((1,+),0)$,

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232]
$$

so that narrow branch chart is rejected. The diagnostic family also rejects several overreads: the ordinary same-source positive-delay rescue is absent under the rigid exact-$c_f$ circular convention, inventory attraction bias does not imply force closure, resolved positive-delay root rows do not imply force closure, and sampled phase or polarity-phase improvements do not imply retention. These are negative results for rigid fixed-speed octahedral hypotheses, not rejections of the broader neutral braid, shell braid, nested shell braid, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

## Shell Braid

This chapter defines the one-band support family in the [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) sequence. A shell braid adds controlled radial support to a [neutral braid](../../../../markdown/aaa/noether-braid/neutral-braid.md) without yet asserting the three ordered support bands of a [nested shell braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md).

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

This chapter defines the three-band support family in the [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) sequence. A nested shell braid adds ordered radial support bands to a [shell braid](../../../../markdown/aaa/noether-braid/shell-braid.md) and supplies the scaffold consumed by the nested dynamics, geometry, frequency-lock, and particle-architecture chapters.

A **nested shell braid** is a shell braid with three ordered radial support bands. It is the case used by the downstream particle-architecture and Noether sea chapters.

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

In this case, a candidate stable configuration is the **nested shell braid with exact binary assumptions**. It consists of three binaries, one in each ordered shell, and supplies the assembly scaffold later used in [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md).

-   **Why Three?** The stability of a three-shell nested structure is a theorem target tied to the three-dimensional nature of Euclidean space. Each binary defines an orbital plane or dominant support sheet. The working claim is that three mutually orthogonal support sheets can form a dynamically stable, symmetric, three-dimensional structure that is resistant to perturbation; the proof burden is to derive that role count from the delayed causal dynamics rather than assuming it.

-   **Why "Noether"?** This braid family is named in honor of Emmy Noether. Noether's theorem links symmetries in physical systems to conserved quantities. The highly symmetric nested shell braid is the candidate scaffold through which spin, branch-quantized energy records, and other conserved observer-level labels should be recovered from closure labels and emitted causal-wake envelopes.

### Properties of the Nested Shell Braid

-   **Energy-Separated Scales:** In low-energy nested shell braid conditions, the three shell binaries have energy-separated orbital radii and cadences. The innermost binary is the smallest and fastest, while the outermost is the largest and slowest. This separation of scales is crucial for the system's stability.

-   **Internal Stabilization:** The system is expected to be stable only on branches where the high-frequency causal-wake emissions from the innermost binary, inter-layer wake exchange, and outer-layer shielding close into a persistent return cycle. The time-averaged potential picture is useful, but the theorem burden is to show that the root ledger, phase closure, and separator conditions keep the coupled hierarchy on the same branch.

-   **Energy Shielding via Superposition:** From a distance, a nested shell braid appears to have far less energy and a much smaller potential signature than the raw sum of its six constituent architrinos. The rapid oscillation of the positive- and negative-polarity architrinos within the nested structure causes their wake contributions to largely cancel out through superposition. This shielding effect is the working mechanism for how highly energetic structures can form the basis for relatively low-mass observed particles; quantitative extraction remains a mass-map closure target.

### Integer Phase-Closure States

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

### Cadence-Scale Retuning Hypothesis

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

### Rest-Level Scaling Curve

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

### Reduced Nested Shell Braid Closure Label

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

### Geometry and Exclusion Envelope

The same nested shell braid motion that supplies shielding also sweeps out a persistent dynamic exclusion envelope. That envelope is not the braid definition itself; it is the geometric footprint of the nested assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [the nested shell braid geometry chapter](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md).

### The Nested Shell Braid Hierarchy and Fermion Generations

The broader assembly program suggests reading the nested shell braid hierarchy as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-support-row shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **Nested shell braid:** the fully shielded three-tier braid, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../../../../markdown/aaa/assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md).

### Nested Shell Braid Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its shell scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across the nested shell braid.

As a nested shell braid approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune. At the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It is not a claim that the inner, middle, and outer binaries become identical. It means the middle binary remains on the field-speed hinge, the outer binary is driven into the same terminal threshold, and the inner binary remains the self-hit interior row while the assembly loses ordinary volumetric slack. Because $s_\ell=\omega_\ell\rho_\ell$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes the nested shell braid more than a particle scaffold. In the nested shell braid reading, it contains a local black-hole dual: the middle binary is the horizon-interface threshold, the inner self-hit binary is the beyond-threshold interior row, and the outer binary is the exterior-coupling row that can be driven into terminal alignment under strong-field stress. This is a primitive black-hole pattern inside the assembly ontology, not an assertion that an ordinary particle is an observer-level compact object. The dynamics-facing proof burden is stated in [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md#local-black-hole-duality-target).

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell braid coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Braid Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

### The Foundation for Fermions

The Noether braid class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.

## Noether Braid Taxonomy

### Local Terms

This chapter uses four evidence-level terms in a controlled way:

| Term | Meaning in this chapter | What it does not claim by itself |
| --- | --- | --- |
| branch | A candidate whole six-architrino Noether braid history over a declared finite memory window. The branch is the object whose inventory, paths, causal roots, wakes, energy/action rows, angular-momentum rows, phases, support data, response-center data, and Noether sea row are tested together. | A branch is not a single path, a single binary row, or a visual braid drawing. It is also not automatically stable or physical. |
| retained | Evidential status for a branch, row, or chart whose required data close on the same record under the declared tolerance, event/domain convention, and stability conditions. | `Retained` does not mean assumed, preferred, or merely still under discussion. If the same-record ledgers are missing, the object remains a candidate. |
| support | The geometric region, band, envelope, or comparison chart occupied by the branch data. Shell support, nested shell support, oblate spheroidal envelope support, and axial comparison support are different ways to describe where the six paths or their derived ledgers live. | Support is not a force law and not proof of retention. A support label says how the candidate is represented geometrically, not that the delayed dynamics preserve it. |
| record | The finite ledger attached to one branch over the declared memory window. It includes only data that can still affect the next delayed update or certificate: inventory, path history, causal-root rows, wake rows, energy/action rows, momentum and angular-momentum rows, phase and plane-orientation rows, support claims, response-center and group-velocity rows, and the local Noether sea row. | A record is not a narrative summary or a loose collection of diagnostics. A proof claim must say which rows close on the same record. |

This chapter is the front door for classifying Noether braid configurations. It names the independent axes used to describe a candidate branch before a solver or proof program decides whether that branch is retained. The taxonomy is therefore a configuration language, not a classification theorem.

A Noether braid taxonomy record can be written schematically as

$$
\mathsf{Tax}_{\mathfrak B}
=
\left(
\mathsf{Inventory},
\mathsf{Support},
\mathsf{AngularMomentumFrame},
\mathsf{Polarity},
\mathsf{Handedness},
\mathsf{Speed},
\mathsf{Hinge},
\mathsf{Frequency}
\right).
$$

Each entry records a different kind of structure. Mixing the entries creates a candidate configuration; it does not by itself prove that the delayed dynamics admit a stable branch. Retention, certification, proof environment, and work status are proof-run metadata rather than configuration axes.

### Document Role

This chapter is the decoder for Noether braid configuration language. It owns the shared axes, local evidence-level terms, and compact Proof ID grammar that tell a reader what kind of braid is being discussed and which assumptions are being held fixed. The detailed proof-run records belong in [Noether Braid Proof Map](../../../../markdown/aaa/noether-braid/noether-braid-proof-map.md).

It does not prove branch retention by itself. A Proof ID names a branch-configuration effort. The proof-stack role still has to say what job the packet is doing, and the current disposition still has to say whether the result is open, blocked, rejected, retained, or certified before any success, rejection, fixture, chart, or downstream-consumer claim is made.

| Chapter | Role in the stack | Boundary |
| --- | --- | --- |
| [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) | Provides the overview and base-family map for the Noether braid stack. | Names the family sequence without carrying each family derivation. |
| [Neutral Braid](../../../../markdown/aaa/noether-braid/neutral-braid.md) | Defines the base six-body branch inventory and retained-branch certificate target. | Establishes the broad case before shell support, exact binary grouping, or nested ordering. |
| [Shell Braid](../../../../markdown/aaa/noether-braid/shell-braid.md) | Defines the one-band radial-support family. | Adds shell support without promoting the branch to nested shell structure. |
| [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md) | Defines the three-band nested support family and its branch-label scaffold. | Names the nested family without certifying dynamics or observer export by itself. |
| [Noether Braid Proof Map](../../../../markdown/aaa/noether-braid/noether-braid-proof-map.md) | Tracks current Proof IDs, work status, detailed proof records, and environment-qualified rounds. | Records proof work without redefining the configuration taxonomy. |
| [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md) | Searches the cases where three retained angular-momentum rows may form a full internal 3D frame. | Supplies search variables and frame rows without saying every Noether braid must have exact binaries. |
| [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md) | Tests whether nested shell braid motion can actually stay closed and stable. | Tests coupled shell dynamics without turning downstream exports into base branch IDs. |
| [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md) | Studies the `NSH-421` candidate where the nested rows have a `4:2:1` frequency pattern. | Studies the `4:2:1` lock without making it the default Noether braid frequency. |
| [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) | Adds topological labels after a retained branch chart exists. | Computes a topological label only after a same-record branch chart supplies the required rows. |
| [Nested Shell Braid Geometry](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md) | Describes the envelope, exclusion boundary, and deformation outputs a retained branch can emit. | Describes exclusion, deformation, and envelope rows without certifying dynamics or metric recovery alone. |

### Proof Search Roadmap

The proof program is looking for a retained Noether braid branch, not merely for a visually plausible braid sketch or a convenient fixture. The working hypothesis is that a retained Noether braid is the key assembly-level object that lets $\mathbb{A}\mathbb{A}\mathbb{A}$ build volume exclusion, charge coupling, observer clock/ruler behavior, fermion-sector structure, and later downstream assemblies. The taxonomy below exists because that hypothesis still has to be earned configuration by configuration.

The search starts with retained row sets. A candidate branch first has to keep one record coherent: inventory, paths, causal-root rows, receiver-normal branch-strength rows, wakes, action/energy rows, angular-momentum rows, support geometry, response-center rows, group-velocity rows, stability rows, and the local Noether sea row when the environment is part of the retention mechanism. Source-normal or Jacobian-only rows remain root diagnostics unless the same record also supplies the receiver-normal force/action strength consumed by the branch proof. Only after those rows close on the same record can the proof stack promote the branch toward observer exports or particle-sector roles.

The required branch is expected to satisfy the following obligations:

| Requirement | What the retained record must show | Why it matters |
| --- | --- | --- |
| Noether sea stability | The branch remains coherent when embedded among like Noether braid assemblies. A Euclidean-void fixture may be used first as a reduced test, but failure to retain in the void case is not by itself a final rejection if the missing stabilizer is the surrounding Noether sea. | A physical Noether braid should be stable in the medium it helps populate, not only in an isolated calculation. |
| Volume exclusion | The branch creates a finite exclusion envelope, support band, or nested support structure that prevents ordinary overlap and supplies a geometric occupancy boundary. | Matter-like assemblies need a way to occupy volume instead of being only pointlike ledger entries. |
| Lorentz clock/ruler deformation | A moving retained branch exports the observer clock and ruler law: the envelope geometry supplies a longitudinal-to-transverse ratio approaching $\xi=R_{\parallel}/R_{\perp}\to1/\gamma$, the extracted clock row approaches $d\tau/dt\to1/\gamma$, and preferred-frame leakage stays bounded as $v\to c_f$. | This is the route by which the assembly can recover Lorentz-compatible observer kinematics. |
| Accessory-charge coupling | The branch can couple to charge-carrying rows or axial architrino structures without losing its retained record. The location is still open: inside the support, on polar sites, at axial poles, or through an external attachment row. | Fermion and electroweak bookkeeping need a retained braid scaffold that can host or couple to additional charge structure. |
| Generation behavior | The branch supplies a controlled path from generation I to generation II and III behavior. In the current nested shell candidate route, generation II and III behavior is modeled by destabilizing one retained binary row or two retained binary rows while preserving a disciplined transition record. | The braid cannot be only a rest object; it must explain why the same broad architecture can support the observed fermion family pattern. |
| Action and energy closure | The action, energy, wake, and event ledgers close on the same branch record under the declared finite-memory window. | A visually stable configuration is not enough if it cannot conserve or route the quantities needed by later reactions. |
| Angular-momentum and orientation rows | The branch either supplies a retained rank-three angular-momentum frame, supplies a retained lower-rank alternative, or explains why the frame row is not required for that branch. | Spin, handedness, topological charge, and reduced planar charts need a disciplined orientation record. |
| Perturbation and recovery | The retained branch survives bounded perturbations, or it has a well-defined transition rule when a binary row destabilizes, a hinge is reached, or a support band reorganizes. | A physical assembly must be more than a single finely tuned fixture state. |
| Downstream export discipline | Photon-channel, mass-response, topological-charge, GR/effective-metric, and app-runtime packets consume rows from a retained branch instead of substituting diagnostics for branch retention. | This keeps downstream successes from being mistaken for proof that the underlying braid configuration has already been retained. |

The first live proof target is therefore a rest retained branch. The active shell starting point is `SH-0`: a group-zero, axis-neutral, common-sphere held-release fixture treated as one-band shell row evidence. The isolated `SH-0` round has not supplied a retained row, so the next shell round is `SH-0-sea`: the same rest shell branch tested inside a surrounding Noether sea of like assemblies. If one shell still cannot carry the required rows in the embedded setting, the search expands to nested shell braid rows such as `NSH-0`, frequency families such as `NSH-ISO`, `NSH-321`, and `NSH-421`, moving export rows such as `SH-L` and `NSH-L`, and lower-rank boundary families such as `PL-SH-0` and `PL-NSH-0`. The compact index below lists the main targets; the proof-map companion tracks the detailed status and open obligations for each effort.

These obligations close in layers. A rest branch can be retained before moving export is tested. A Euclidean-void fixture can be diagnostic before a Noether sea row is added. A retained branch can feed topological-charge, photon, mass-response, generation, and accessory-architrino packets only after those packets consume the same retained record rather than substituting their own reduced diagnostics. The proof map therefore tracks both Proof ID and current disposition; the taxonomy only defines what a candidate is claiming.

### Taxonomy Axes

| Axis | Reader-facing purpose | Example values |
| --- | --- | --- |
| Base inventory | Which six architrinos are in the candidate branch | neutral braid |
| Support geometry | Where the six paths live geometrically | shell braid, nested shell braid, oblate spheroidal envelope |
| Angular-momentum frame | Whether three retained angular-momentum rows form a full internal 3D frame | rank-three frame, planar lower-rank braid (`PL`) |
| Polarity placement | How `+++` and `---` populate opposite axial pairs | axis-neutral, axis-polarized |
| Angular-momentum handedness | Orientation of the ordered rank-three frame | positive-handed, negative-handed |
| Speed regime | Whether branch speed rows sit below, at, or above the field speed $c_f$ | sub-field, field-speed, super-field, mixed |
| Field-speed hinge occupancy | Whether one or more rows sit near $c_f$, where self-hit access may change | no hinge row, single-hinge, multi-hinge, terminal hinge |
| Frequency-ratio family | Return or winding-frequency relation | iso-frequency `1:1:1`, integer-ratio `3:2:1`, doubling-frequency `4:2:1` |

The axes are intentionally independent. A nested shell braid may be studied with or without an exact rank-three frame. A doubling-frequency family may be studied on an axis-neutral or axis-polarized polarity placement. A row with field-speed hinge occupancy may or may not belong to an iso-frequency or integer-ratio family. A positive-handed angular-momentum frame may be a candidate diagnostic without yet being a retained branch certificate.

### Base Inventory

The base inventory is the neutral six-architrino case described in [Neutral Braid](../../../../markdown/aaa/noether-braid/neutral-braid.md). It contains three positive-polarity architrinos and three negative-polarity architrinos:

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_i \sigma_i=0.
$$

This inventory says only that the candidate has the required polarity count and a shared causal-return ledger. It does not assume exact binary pairs, shell support, an orthogonal angular-momentum frame, or a protected topological class.

### Support Geometry

Support geometry records how the six paths occupy their branch support. These labels describe where the branch data live geometrically; they do not by themselves certify the branch dynamics or the observer-export law.

| Support value | Meaning | Claim level |
| --- | --- | --- |
| no declared shell support | Candidate branch whose base inventory has not declared a controlled radial band or common shell. | Absence of a support claim, not proof of branch failure. |
| shell braid | Neutral braid with one declared controlled radial support band or common shell. | Support class requiring radial control rows for retention. |
| nested shell braid | Shell braid with three ordered radial support bands. | Support class defined in [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md) and used by [Nested Shell Braid Geometry](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md) and [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md). |
| oblate spheroidal envelope | Candidate support or envelope geometry whose path-history boundary is flattened relative to a spherical shell while treating the two transverse semiaxes as equal. | Explored support variation, not a retained class by name alone and not proof of Lorentz deformation. |

Support geometry should not be confused with binary grouping or with Lorentz deformation. A branch may have shell support before it proves three persistent binary rows. Conversely, a rank-three frame may be used as a reduced diagnostic without proving that the full six-body support is a retained nested shell braid. An oblate spheroidal envelope is a geometry label: it records a branch-envelope axis ratio such as $\xi=R_{\parallel}/R_{\perp} < 1$ on the declared chart. Lorentz deformation is tested separately as a moving-branch clock/ruler export law.

### Angular-Momentum Frame

The angular-momentum-frame axis asks whether the retained branch emits enough angular-momentum rows to define a full internal 3D frame. The rows are ledger data extracted from the branch, not assumed circular orbits. The three-row or rank-three search region is developed in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md), but it remains only one region inside the broader Noether braid taxonomy rather than the definition of every Noether braid.

| Frame value | Meaning | What it does not prove |
| --- | --- | --- |
| not assigned | The branch has not yet supplied retained angular-momentum rows. | It does not reject the branch; it only leaves the frame axis open. |
| rank-three frame | The branch supplies three retained angular-momentum rows with nonzero frame determinant. | It does not by itself prove shell support, frequency lock, polarity placement, or certification. |
| planar lower-rank braid (`PL`) | The branch is lower-rank on this axis because $D_{\mathrm{plane}}=0$ or because no retained three-row frame exists. | It is not automatically the planar reduced chart and not automatically a terminal nested-shell boundary. |

For a rank-three frame, the branch record includes three angular-momentum two-form classes

$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\},
$$

with derived plane normals $\hat{\mathbf n}_a$ when the Hodge-dual direction is nonzero. The frame is volumetric only when

$$
D_{\mathrm{plane}}
=
\det
\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}
\ne 0.
$$

A planar lower-rank braid (`PL`) may still be dynamically meaningful, but it is not a promoted rank-three Noether braid branch until the three-row frame condition and its conditioning floor are supplied on the same retained record.

The planar reduced chart is different. A reduced planar chart is a proof or simulation representation that places branch data into a common plane or near-plane so a restricted calculation can be performed. Such a chart may represent a `PL` candidate, the terminal boundary of a nested shell braid, or the photon-channel bridge described by the coaxial contra-rotating pro/anti planar pair. It should therefore be named as a chart, not used as a base-family name.

### Polarity Placement

Polarity placement records how the three positive-polarity and three negative-polarity architrinos populate opposite axial pairs in an axial comparison chart. Let an axial chart have three opposite coordinate pairs

$$
A_k=\{+\hat{\mathbf e}_k,-\hat{\mathbf e}_k\},
\qquad
k\in\{1,2,3\}.
$$

The two final polarity-placement terms are:

| Term | Axial population pattern | Meaning |
| --- | --- | --- |
| axis-neutral | Each opposite axial pair contains one positive and one negative endpoint. | The schematic polarity row is `-+`, `-+`, `-+`, up to axis and endpoint relabeling. |
| axis-polarized | One opposite axial pair contains two positives, one contains two negatives, and one remains mixed. | The schematic polarity row is `--`, `-+`, `++`, up to axis and endpoint relabeling. |

These are polarity placements, not force laws. They classify a polarity placement on a chosen axial comparison chart. They do not decide whether the underlying paths are axial, circular, or retained by the delayed dynamics.

### Angular-Momentum Handedness

Angular-momentum handedness records the orientation of the ordered rank-three frame when the frame exists. If the retained branch supplies ordered plane normals $\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3$, then the sign of $D_{\mathrm{plane}}$ gives the handedness of that ordered frame:

$$
\operatorname{sgn}(D_{\mathrm{plane}})
=
\begin{cases}
+1, & \text{positive-handed},\\
-1, & \text{negative-handed}.
\end{cases}
$$

When $D_{\mathrm{plane}}=0$ or the branch has no retained three-row frame, handedness is not assigned as a rank-three property. It may still have planar chirality, circulation signs, or other lower-rank orientation diagnostics, but those are separate rows.

### Speed, Hinge, And Frequency Families

The speed regime records how retained speed rows relate to the field speed $c_f$. Sub-field rows satisfy speeds below the local field-speed hinge; field-speed rows sit at the transition scale; super-field rows enter regimes where delayed self-interaction can become available. In nested `I:M:O` notation, these rows are assigned only after the retained branch supplies the role map.

Field-speed hinge occupancy is a separate axis. It asks which row, if any, operates within a declared tolerance of $c_f$, and it must say which speed statistic is being tested: transverse carrier speed, orbital/circulation speed, or another branch-declared component. A hinge row is not automatically a self-hit row. It is the speed-regime condition at which the branch can transition from target-hit-only access toward target plus self-hit access, provided the same-source causal-root ledger and transversality rows also close.

| Hinge value | Meaning |
| --- | --- |
| no hinge row | No retained row is declared within the $c_f$ hinge tolerance. |
| single-hinge | One row is organized around the field-speed hinge. |
| multi-hinge | More than one row is organized around the field-speed hinge. |
| terminal hinge | The branch approaches a terminal-alignment regime, such as the braid symmetry-breaking point, where hinge occupancy and loss of volumetric slack must be tested together. |

The frequency-ratio family records return or winding-frequency relations. The main examples are:

| Frequency-ratio value | Meaning |
| --- | --- |
| iso-frequency `1:1:1` | Candidate family with common return rate across the three retained rows. |
| integer-ratio `3:2:1` | Candidate family with integer return rates but no repeated-doubling assumption. |
| doubling-frequency `4:2:1` | Candidate nested `I:M:O` family in which each inward row doubles the next outer row, studied in [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md). |

Frequency-ratio labels are candidate-family labels until the phase-return degree, causal-root ledger, finite-memory gluing, and stability rows close on the same branch. Hinge labels require their own speed and causal-root rows; they are not frequency-ratio names.

### Proof Status And Environment

Proof status prevents taxonomy names from being mistaken for results. It is metadata about the proof run, not a configuration axis.

| Status | Meaning |
| --- | --- |
| toy diagnostic | A simplified computation or visualization that tests a limited obstruction or analogy. |
| candidate braid | A proposed branch family or configuration class whose required ledger rows are not all certified. An isolated return-map success remains a candidate if the proof has not tested the environment needed for stability. |
| retained branch | A branch whose inventory, causal-root, receiver-normal branch-strength, wake-tail, dynamics, action, event, stability, and convergence rows close on one retained record in the declared proof environment. If the branch requires a Noether sea containing like assemblies to remain stable, then the Noether sea population-response row is part of retention rather than a later certification add-on. |
| certified braid | A retained branch record that returns under the delayed return map up to declared neutral symmetries, preserves the required non-symmetry stability margins, and satisfies the observer-export rows required of a physical branch. |

An isolated branch test is a diagnostic, not automatically a retention proof. It can show that a proposed ledger closes when neighboring braid response is suppressed or held fixed, but if the branch is stable only inside a Noether sea containing like assemblies, then retention has not been reached until that environmental row closes on the same record. That test belongs to the local Noether sea row and should not be inferred from the taxonomy name, the support geometry, or a successful rest-branch fixture.

All certified braids must reproduce Lorentz-compatible clock and ruler deformation at the observer-export layer when they are tested in a homogeneous moving-branch regime. The same retained record must then export a ruler row whose longitudinal-to-transverse deformation approaches $\xi=R_{\parallel}/R_{\perp}\to1/\gamma$, a clock row whose extracted rate approaches $d\tau/dt\to1/\gamma$, and bounded preferred-frame leakage through the declared $\epsilon_{\text{LV}}$ or two-way anisotropy diagnostic. Here `Lorentz deformation` means that moving-branch export law, not the mere presence of an oblate support label. An oblate spheroidal envelope may supply the geometric projection used to read $\xi$, but it becomes Lorentz-compatible only when the moving branch supplies the clock row and leakage bound on the same retained record.

Proof fixtures are controlled proof or simulation setups, not base braid families. A fixture is usually idealized in at least one declared way: it may suppress perturbations, constrain the branch geometry, hold the group velocity fixed, freeze a frequency or hinge relation, or omit the surrounding Noether sea population while the local branch rows are tested. The purpose is to reduce the mathematical configuration space enough that a specific closure question can be asked. A fixture result is therefore conditional on the declared constraints. Whether a row is retained or rejected inside the fixture, the next proof stage may need to relax one constraint at a time, such as adding the surrounding Noether sea response.

The [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md) program adds topological labels only after the retained branch chart supplies the needed root-complex and phase-return data. A taxonomy value can point to where that proof should be attempted, but it cannot substitute for the proof.

### Proof ID Decoder

A Proof ID names a proof-run target. It combines a support base, a proof regime, and optional modifiers. It does not assert success. Detailed work status and per-ID proof records live in [Noether Braid Proof Map](../../../../markdown/aaa/noether-braid/noether-braid-proof-map.md).

The base and frame-modifier codes are:

| Code | Meaning |
| --- | --- |
| `NB` | Broad six-worldline $3:3$ polarity-neutral candidate with no controlled shell support geometry declared. |
| `SH` | Shell braid with one declared controlled radial support band or common shell. |
| `NSH` | Nested shell braid with three ordered support bands. |
| `PL` | Lower-rank angular-momentum-frame modifier. It must be paired with a support base such as `NB`, `SH`, or `NSH`. |

The regime suffix names what is being tested:

| Suffix | Meaning |
| --- | --- |
| `0` | Rest-branch qualification with $\mathbf{V}_{\mathrm{grp}}=0$. |
| `L` | Moving-branch continuation with $\mathbf{V}_{\mathrm{grp}}>0$ and Lorentz clock/ruler export. |
| `AX` | Axis-population comparison across axis-neutral and axis-polarized placements. |
| `ISO` | Iso-frequency family, `1:1:1`. |
| `321` | Integer-ratio family, example `3:2:1`. |
| `421` | Doubling-frequency lock, `4:2:1` in role-assigned `I:M:O` order. |
| `HINGE` | Field-speed hinge occupancy. |
| `TERM` | Terminal hinge / braid symmetry-breaking point. |

An environment suffix may be appended after the regime suffix:

| Environment suffix | Meaning |
| --- | --- |
| `-sea` | The same branch configuration is tested under many-copy Noether sea embedding, with like assemblies allowed to supply the environmental response needed for retention. For example, `SH-0-sea` is not a new shell family; it is the `SH-0` rest shell test in a surrounding Noether sea. |

Read a proof packet with three independent labels:

| Label | Question it answers | Example values |
| --- | --- | --- |
| Proof ID | Which branch configuration and proof environment are being tested? | `NB-0`, `SH-0`, `SH-0-sea`, `NSH-421`, `PL-NSH-0` |
| Proof-stack role | What job is this packet doing for that branch? | branch target, row evidence, diagnostic/rejection, fixture, chart, downstream consumer |
| Current disposition | What is the present result under the packet's declared assumptions? | candidate, not tested, blocked, rejected, `not_retained`, retained |

The ID alone never supplies disposition. A candidate `SH-0-sea` embedded test, a retained `SH-0-sea` branch stable among like assemblies, and a certified `SH-0-sea` branch with observer-export closure are different proof states even though they share the same Proof ID.

### Compact Proof Index

This compact index shows the main proof-run targets without carrying the live proof ledger. Use [Noether Braid Proof Map](../../../../markdown/aaa/noether-braid/noether-braid-proof-map.md) for work status, evidence handles, and detailed per-ID records.

| Proof ID | Decoded configuration | Main proof question |
| --- | --- | --- |
| `NB-0` | Neutral braid, rest, no declared shell support. | Can the broad neutral branch retain without adding a shell-support assumption? |
| `NB-L` | Moving continuation of a retained neutral branch. | Can a retained neutral branch move and export clock/ruler rows? |
| `SH-0` | Shell braid, rest, one support band or common shell, isolated or unspecified environment. | Can shell support rows retain on the same branch record? |
| `SH-0-sea` | Shell braid, rest, one support band or common shell, embedded in a surrounding Noether sea. | Does like-assembly Noether sea response retain the one-band shell branch? |
| `SH-L` | Moving continuation of a retained shell braid. | Can a retained shell survive transport and export Lorentz rows? |
| `NSH-0` | Nested shell braid, rest, three support bands. | Can nested support, role, causal-root, energy, frame, and stability rows retain? |
| `NSH-L` | Moving continuation of a retained nested shell braid. | Can a retained nested shell branch recover Lorentz rows? |
| `NSH-AX` | Nested shell braid axis-population comparison. | Which axis settings survive same-record branch tests? |
| `NSH-ISO` | Nested shell braid iso-frequency `1:1:1` family. | Can the common return-rate family close its ledgers? |
| `NSH-321` | Nested shell braid integer-ratio `3:2:1` family. | How does a non-doubling integer family compare? |
| `NSH-421` | Nested shell braid doubling-frequency `4:2:1` lock. | Can the doubling lock close phase, role, root, frame, and stability rows? |
| `NSH-HINGE` | Nested shell braid field-speed hinge occupancy. | Which speed rows alter root access while preserving transversality? |
| `NSH-TERM` | Nested shell braid terminal hinge / braid symmetry-breaking point. | Where does closure fail or reorganize at the terminal hinge? |
| `PL-NB-0`, `PL-SH-0`, `PL-NSH-0` | Lower-rank rest comparisons on neutral, shell, or nested shell support. | Is the lower-rank case retained, terminal, or only diagnostic? |
| `PL-NB-L`, `PL-SH-L`, `PL-NSH-L` | Moving continuations of retained lower-rank branches. | Can a retained lower-rank branch export observer rows without masquerading as rank-three Lorentz closure? |

## Noether Braid Proof Map

This chapter is the live proof-map companion to [Noether Braid Taxonomy](../../../../markdown/aaa/noether-braid/noether-braid-taxonomy.md). The taxonomy chapter defines the configuration axes and Proof ID grammar. This proof map records current proof-run targets, work status, detailed proof-record fields, and environment-qualified rounds such as `SH-0-sea`.

A proof ID names a specific branch-configuration effort and does not assert success. Row evidence, diagnostics, fixtures, charts, and downstream physics packets should name the branch Proof ID they test or consume only after the support base, group-velocity regime, and local variation are declared.

A negative diagnostic remains scoped to the branch chart and assumptions that produced it. A photon, mass-response, Lorentz-export, topological-charge, GR-export, measurement, or app-runtime packet is downstream of branch retention unless the same retained record supplies the rows being exported. A planar reduced chart names a restricted proof or simulation representation; it should not be treated as a branch Proof ID unless the local calculation is explicitly testing a planar lower-rank branch or the terminal hinge. A proof fixture remains an overlay on the relevant branch Proof ID, not a Proof ID of its own.

Read every proof packet with three independent labels:

| Label | Question it answers | Example values |
| --- | --- | --- |
| Proof ID | Which branch configuration and proof environment are being tested? | `NB-0`, `SH-0`, `SH-0-sea`, `NSH-421`, `PL-NSH-0` |
| Proof-stack role | What job is this packet doing for that branch? | branch target, row evidence, diagnostic/rejection, fixture, chart, downstream consumer |
| Current disposition | What is the present result under the packet's declared assumptions? | candidate, not tested, blocked, rejected, `not_retained`, retained |

The ID alone never supplies disposition. A rejected `NB-0` diagnostic, an open `NSH-421` row-evidence packet, an isolation-only `SH-0` return map, a candidate `SH-0-sea` embedded test, a retained `SH-0-sea` branch stable among like assemblies, and a certified `SH-0-sea` branch with observer-export closure would have different proof meanings even though they share the same grammar.

Some proof efforts also carry local fixture or artifact labels. Those labels are stable evidence handles, not new base Proof IDs. A group-zero, axis-neutral, common-sphere held-release six-point fixture is `SH-0` row evidence because it declares one shell support band at rest. That classification does not make the branch retained. The result still depends on the current disposition, proof-stack role, accepted-source status, stability row, and Noether sea response row.

### Proof Burden Order

The Proof IDs name configurations, but the proof burden closes in ordered rows. A packet can supply evidence for one row while leaving the next row open.

| Proof burden | What must close on the same record | First IDs that exercise it | Promotion effect |
| --- | --- | --- | --- |
| Rest branch retention | Inventory, support, causal-root, wake-tail, dynamics, action, event, stability, and convergence rows in the declared rest environment. | `NB-0`, `SH-0`, `NSH-0`, `PL-NB-0`, `PL-SH-0`, `PL-NSH-0` | Candidate branch becomes a retained branch only in that declared environment. |
| Noether sea embedded retention | The rest retention rows plus the local Noether sea population-response row from like assemblies. | `SH-0-sea`; later `NB-0-sea`, `NSH-0-sea`, or `PL-*-sea` packets if declared. | Isolation-only diagnostics become medium-stability evidence when the environment row closes. |
| Moving observer export | Transport, response-center, clock, ruler, energy/action, and preferred-frame leakage rows for $\mathbf{V}_{\mathrm{grp}}>0$. | `NB-L`, `SH-L`, `NSH-L`, `PL-NB-L`, `PL-SH-L`, `PL-NSH-L` | Retained branch can be promoted toward certified braid status only if Lorentz-compatible export closes. |
| Assembly consumer rows | Topological charge, photon channel, mass response, accessory-architrino capture, generation behavior, GR/effective-metric export, and app-runtime packets consume the retained branch record. | Downstream packets tied back to the relevant retained Proof ID. | Consumer success classifies or exports a retained branch; it does not retroactively prove branch retention. |

### Evidence-Handle Cleanup Decisions

This pass separates three cases that should not be cleaned up the same way:
an active diagnostic packet with missing accepted-source rows, a planned
environment round with no inspected packet yet, and a candidate theorem family
whose diagnostics must not be consumed as branch proof.

| Proof ID | Existing evidence handles | Cleanup decision | First evidence blocker |
| --- | --- | --- | --- |
| `NB-0` | Neutral braid base certificate; all-pairs root ledger; rigid octahedral root/Jacobian diagnostics; finite-mode and bounded-speed successor targets when no shell support is declared. | Geometry, inventory, root-ledger, and negative diagnostics can stay under `NB-0`. Any force/action, stability, or retention read must be screened against the receiver-normal branch-strength row; source-normal/Jacobian-only or frozen-ledger rows remain diagnostic or restart-required. | No same-record neutral retained branch currently supplies accepted live roots plus $D_s$, $D_T$, $W^{\mathrm{rec}}$ / `branchWeight`, action/event/stability, convergence, and support rows. |
| `SH-0` | Held-release common-sphere fixture; octahedral root-ledger and no-go diagnostics when the declared chart has one common shell support. | Source/evidence cleanup is needed before any retention read. Keep the handles as diagnostic row evidence until seed-path, retained-history, return-response, stability, and provenance rows bind to one accepted record. | Fresh/default rows fail at `held_release_seed_path_rows[*].retained_record_id`; the active provider-backed chain is blocked at `held_release_seed_path_rows_acceptance_certificate` / `held_release_seed_path_rows.acceptance_certificate_ref`. |
| `SH-0-sea` | No inspected embedded packet is currently mapped; the row is the next environment round after isolated `SH-0` did not retain. | No legacy packet cleanup is available yet. First-packet modeling may inherit the diagnostic/candidate `SH-0` target identity, then add like-assembly population, boundary-condition, and sea-response rows. | Accepted retained-evidence claims still wait on an accepted central `SH-0` target/source record plus same-record receiver-normal, action, wake, support, event, and sea-response rows. |
| `NSH-0` | Nested shell reduction row; radial-support and role-map packets; shared nested certificate and dynamics/geometry theorem targets. | Support, role, radial geometry, and taxonomy material can stay. Any retained-branch read requires a nested branch certificate with same-record receiver-normal root strength, action/energy, frame, event, stability, and convergence rows. Exact binaries and a rank-three frame are not assumed unless the packet supplies them. | No accepted nested branch certificate with same-record receiver-normal active rows is currently mapped; support-dependent $A_0$, mass-response, or observer-export material remains downstream until inspected. |
| `NSH-421` | Doubling-frequency chapter; phase-bundle, caustic-score, Floquet, and torque/wake same-row diagnostics where used. | Source/evidence cleanup is needed to keep candidate row evidence separate from retained branch proof. The packet can remain a candidate-family theorem target until accepted branch-certificate and same-row active-ID refs exist. | Missing accepted `branch_certificate_ref`; downstream blockers include `same_retained_active_row_ids`, accepted branch chart, moving retained branch certificate, accepted transition source, and action-increment row. |
| `PL-*` | Planar reduced charts, lower-rank frame-boundary material, terminal-hinge comparisons, and possible photon-channel bridge evidence. | Geometry-only and chart material can stay. Assign `PL-NB-*`, `PL-SH-*`, or `PL-NSH-*` only when the local packet is explicitly testing lower-rank branch retention; otherwise keep the material chart-only, terminal-boundary, or downstream. Retained `PL` claims require same-record receiver-normal branch-strength rows plus the support, action/event, stability, and convergence rows for the declared support base. | No inspected lower-rank retained branch packet with support base, environment, receiver-normal root weights, action/event/stability rows, and convergence rows is mapped; `PL-NSH-0` remains chart-boundary started, not retained. |

### Current Work Index

In this index, work status is a proof-map status, not a certification claim. `Started` means at least one inspected proof packet, diagnostic, row-evidence packet, chart-boundary packet, or downstream export packet is mapped to the Proof ID. `Not started` means no inspected proof packet is currently mapped to the Proof ID. `Unassigned` means likely related material exists, but it has not been inspected enough to map without overclaiming.

| Proof ID | Proof focus | Work status | Current stage | Main proof question |
| --- | --- | --- | --- | --- |
| `NB-0` | neutral braid, rest | Started | No-declared-shell neutral rest category; only packets without a declared shell support geometry map here. | Can the broad neutral branch retain without adding a shell-support assumption? |
| `NB-L` | neutral braid, moving export | Downstream started | Observer-export rows are mapped; they wait on a retained `NB-0` branch. | Can a retained neutral branch move and export clock/ruler rows? |
| `SH-0` | shell braid, rest | Started | One-band shell support packets are active, including the group-zero axis-neutral common-sphere held-release fixture; retained branch remains open. | Can shell support rows retain on the same branch record? |
| `SH-0-sea` | shell braid, rest, Noether sea embedded | Not started | Defined as the next embedded round after isolated `SH-0` did not supply a retained row. | Does like-assembly Noether sea response retain the one-band shell branch? |
| `SH-L` | shell braid, moving export | Downstream started | Observer-export rows are mapped; they wait on a retained `SH-0` or `SH-0-sea` branch. | Can a retained shell survive transport and export Lorentz rows? |
| `NSH-0` | nested shell braid, rest | Started | Nested-shell reduction and shared-certificate targets exist; retained branch remains open. | Can nested support, role, causal-root, energy, frame, and stability rows retain? |
| `NSH-L` | nested shell braid, moving export | Downstream started | Lorentz and common-limit export rows are active; they wait on a retained `NSH-0` branch. | Can a retained nested shell branch recover Lorentz rows? |
| `NSH-AX` | nested shell braid, axis comparison | Not started | Axis-neutral and axis-polarized comparison is defined; no inspected packet is mapped yet. | Which axis settings survive same-record branch tests? |
| `NSH-ISO` | nested shell braid, iso-frequency `1:1:1` | Started | Iso-frequency energy/radius candidate is at candidate-family stage. | Can the common return-rate family close its ledgers? |
| `NSH-321` | nested shell braid, integer-ratio `3:2:1` | Started | Equation-map search names this comparison family; nested support still must be declared locally. | How does a non-doubling integer family compare? |
| `NSH-421` | nested shell braid, doubling-frequency `4:2:1` | Started | Phase-bundle, caustic-score, and Floquet rows are active candidate-theorem material. | Can the doubling lock close phase, role, root, frame, and stability rows? |
| `NSH-HINGE` | nested shell braid, field-speed hinge | Started | Middle-hinge and frequency-family comparison rows are active at candidate stage. | Which speed rows alter root access while preserving transversality? |
| `NSH-TERM` | nested shell braid, terminal hinge | Boundary started | Terminal-hinge and $D_{\mathrm{plane}} = 0$ chart-boundary evidence exists; it is not branch retention. | Where does closure fail or reorganize at the terminal hinge? |
| `PL-NB-0` | planar lower-rank neutral braid, rest | Not started | No inspected lower-rank neutral branch packet is mapped yet. | Can lower-rank behavior retain on neutral support? |
| `PL-NB-L` | planar lower-rank neutral braid, moving export | Not started | Blocked until a retained `PL-NB-0` branch exists. | Can a retained lower-rank neutral branch export observer rows? |
| `PL-SH-0` | planar lower-rank shell braid, rest | Unassigned | Possible shell material must be inspected before claiming lower-rank shell evidence. | Can one-band shell support retain without a rank-three frame? |
| `PL-SH-L` | planar lower-rank shell braid, moving export | Not started | Blocked until a retained `PL-SH-0` branch exists. | Can a retained lower-rank shell branch export observer rows? |
| `PL-NSH-0` | planar lower-rank nested shell braid, rest | Chart-boundary started | Planar-chart and $D_{\mathrm{plane}} = 0$ wall evidence exists; no retained lower-rank branch is claimed. | Is the lower-rank case retained, terminal, or only diagnostic? |
| `PL-NSH-L` | planar lower-rank nested shell braid, moving export | Not started | Blocked until a retained `PL-NSH-0` branch exists. | Can a retained lower-rank nested branch export observer rows? |

The detailed records below use the configuration decoder fields for each Proof ID: fixed effort, group velocity, support or shell count, angular-momentum frame, axis setting, frequency ratio, hinge value, energy-level relation, Noether sea environment, Lorentz deformation, and success condition. Proof-stack role, work status, and current disposition remain attached to inspected packets, fixture bullets, and the current work index rather than to the ID alone.

### Neutral Braid Proof IDs

**`NB-0` -- Neutral braid rest qualification**

- Fixed effort: Six-worldline $3:3$ inventory and one shared causal-return record.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: No shell support geometry declared.
- Angular-momentum frame: Not assigned.
- Axis setting: Not assigned by the base ID.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: One branch energy ledger required.
- Noether sea environment: Not assigned by the base ID.
- Lorentz deformation: Not tested.
- Success condition: Retain the broad neutral branch record without adding a shell-support assumption.

**`NB-L` -- Moving neutral braid continuation**

- Fixed effort: Moving continuation of a retained neutral branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: Inherited from `NB-0`, if any.
- Angular-momentum frame: Inherited or still unassigned.
- Axis setting: Not assigned unless added.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required if the neutral branch is promoted toward certification.
- Success condition: Show moving continuation, clock/ruler export, and bounded preferred-frame leakage.

### Shell Braid Proof IDs

**`SH-0` -- Shell braid rest qualification**

- Fixed effort: One controlled radial support band around a branch center.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: One support band or common shell.
- Angular-momentum frame: Not assigned by shell support.
- Axis setting: Not assigned by the base ID. Inspected fixtures include an axis-neutral held-release seed where the three positive sites occupy one triangular face and the three negative sites occupy the opposite face.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Shell support does not fix energy levels.
- Noether sea environment: Isolation-only unless the packet carries `-sea`.
- Lorentz deformation: Not tested.
- Success condition: Retain the shell support rows on the same branch record.
- Started fixture / evidence handles: group-zero, axis-neutral, common-sphere held-release six-point fixture; rigid fixed-speed octahedral root-ledger and no-go diagnostics when their declared chart includes one common shell support.
- Current fixture disposition: The held-release fixture preserves center-zero, common-sphere, common-speed, and antipodal-pair symmetry under the declared symmetry assumptions, then shows a single compression-to-expansion turn without a retained return response. It remains non-promoted diagnostic row evidence. Fresh/default seed-path rows still fail at the missing retained-record id, while the current provider-backed acquisition path is sharper: it is blocked at the missing same-record seed-path acceptance certificate. Without accepted seed-path, retained-history provenance, return, stability, and Noether sea rows, the fixture cannot count as retention evidence.
- Evidence cleanup decision: Clean this packet family before any retention read. The held-release and octahedral handles may support the `SH-0` diagnostic story, but retention requires the seed-path rows, retained-history provenance, return-response row, stability row, and later sea-response row to bind to one accepted record.
- Next environment round: `SH-0-sea`, with an explicit like-assembly population record, boundary condition, and sea-response row tied to the same target branch.

**`SH-0-sea` -- Noether sea embedded shell braid rest qualification**

- Fixed effort: The same one-band shell branch as `SH-0`, embedded in a surrounding Noether sea of like assemblies.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$ for the target branch and local sea frame unless a packet declares otherwise.
- Support / shell count: One target support band or common shell; the surrounding Noether sea does not add shells to the target branch.
- Angular-momentum frame: Not assigned by shell support.
- Axis setting: Inherited from the target `SH-0` fixture when the embedded test carries it forward.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Target branch energy/action rows plus the local Noether sea population-response row must close on the same record.
- Noether sea environment: Embedded among like assemblies.
- Lorentz deformation: Not tested.
- Success condition: Retain the shell support rows and the Noether sea response row on the same branch record, showing that the embedded environment supplies stability missing from the isolated `SH-0` round without changing the base shell classification.
- Relationship to `SH-0`: Environment-qualified continuation after isolated `SH-0` did not supply a retained row; not a new support family and not a certification claim.
- Evidence cleanup decision: This is a first-packet construction target, not cleanup of an old embedded proof packet. The embedded round should reuse the target `SH-0` branch identity and then add the like-assembly population, boundary-condition, and sea-response rows needed to test whether the surrounding Noether sea supplies the missing stability.

**`SH-L` -- Moving shell braid continuation**

- Fixed effort: Moving continuation of a retained one-band shell, whether retained through `SH-0` or `SH-0-sea`.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: One support band under transport.
- Angular-momentum frame: Optional; must be stated if used.
- Axis setting: Optional.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving shell energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required for certification in the moving regime.
- Success condition: Prove the shell survives transport and exports Lorentz-compatible clock/ruler rows.

### Nested Shell Braid Proof IDs

**`NSH-0` -- Nested shell braid rest qualification**

- Fixed effort: Three ordered support bands in a rest branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Three support bands.
- Angular-momentum frame: Must be solved; rank-three or lower-rank is not assumed.
- Axis setting: Optional axis-neutral or axis-polarized placement.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Energy/action rows $E_I,E_M,E_O$ or unordered $E_a$ must close if claimed.
- Noether sea environment: Not assigned by the base ID.
- Lorentz deformation: Not tested in the rest qualification.
- Success condition: Retain the nested support, role map, causal-root, energy, frame, and stability rows. An idealized rest proof fixture belongs here only when its declared assumptions include nested support.

**`NSH-L` -- Moving nested shell braid continuation**

- Fixed effort: Moving continuation of a retained nested shell branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: Three transported support bands.
- Angular-momentum frame: Inherited from `NSH-0` or solved during continuation.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving nested-shell energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required.
- Success condition: Recover $\xi\to1/\gamma$, $d\tau/dt\to1/\gamma$, and bounded preferred-frame leakage from the same branch record.

**`NSH-AX` -- Nested shell braid axis-population comparison**

- Fixed effort: Axis-population comparison.
- Group velocity: Start at $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Compare axis-neutral `-+`, `-+`, `-+` with axis-polarized `--`, `-+`, `++`.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Not fixed by axis population.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether either or both axis settings survive the same-record branch tests.

**`NSH-ISO` -- Nested shell braid iso-frequency family**

- Fixed effort: Common return-rate family.
- Group velocity: Start at $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: `1:1:1`.
- Hinge value: Not fixed.
- Energy-level relation: Equal frequency does not imply equal energy.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Test phase, root, support, frame, energy, and stability rows for the iso-frequency family.

**`NSH-321` -- Nested shell braid integer-ratio family**

- Fixed effort: Non-doubling integer frequency family.
- Group velocity: Start at $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: Example `3:2:1`.
- Hinge value: Not fixed.
- Energy-level relation: Integer frequency does not imply integer energy.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Compare against iso-frequency and doubling-frequency families without assuming repeated doubling.

**`NSH-421` -- Nested shell braid doubling-frequency lock**

- Fixed effort: Doubling-frequency lock in role-assigned order.
- Group velocity: Start at $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: `4:2:1` in `I:M:O` order.
- Hinge value: Not fixed unless paired with hinge rows.
- Energy-level relation: No automatic equality; solve $E_I:E_M:E_O$ from the branch ledger.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Close the integer phase-return map, role assignment, causal-root rows, frame rows, and stability rows.
- Evidence cleanup decision: Clean the candidate proof handles before treating this as branch evidence. Phase-bundle, caustic-score, Floquet, torque/wake, and rank-join diagnostics may identify useful row targets, but they cannot authorize retained-branch consumption until an accepted `branch_certificate_ref`, same retained active-row IDs, accepted branch chart, moving certificate, transition source, and action-increment row close on the same record.

**`NSH-HINGE` -- Nested shell braid field-speed hinge occupancy**

- Fixed effort: One or more rows operating near the field-speed hinge.
- Group velocity: Usually rest-branch carrier test first.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: Inherited if claimed.
- Hinge value: No hinge row, single-hinge, or multi-hinge.
- Energy-level relation: Energy consequences must be solved on the same branch.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested by the hinge row itself.
- Success condition: Show which speed statistic is at $c_f$, which roots become accessible, and whether transversality survives.

**`NSH-TERM` -- Nested shell braid terminal hinge**

- Fixed effort: Terminal hinge / braid symmetry-breaking point.
- Group velocity: Usually terminal carrier regime, not observer transport by itself.
- Support / shell count: Usually three support bands approaching loss of volumetric slack.
- Angular-momentum frame: Lower-rank or degenerating frame expected at the boundary.
- Axis setting: Coplanarity and co-linearity tested together.
- Frequency ratio: Not fixed by the name.
- Hinge value: Terminal hinge.
- Energy-level relation: Equal radii, equal frequencies, and equal energies are not implied.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested by the terminal row itself.
- Success condition: Identify the boundary where precession, root-access, action, and stability closure fail or reorganize.

### Planar Lower-Rank Proof IDs

**`PL-NB-0` -- Planar lower-rank neutral braid rest comparison**

- Fixed effort: Rest-branch lower-rank comparison on the neutral-braid support base.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: No shell support fixed.
- Angular-momentum frame: Lower-rank: $D_{\mathrm{plane}} = 0$ or no retained three-row frame.
- Axis setting: Optional.
- Frequency ratio: Optional.
- Hinge value: Optional.
- Energy-level relation: Energy rows may be diagnostic unless retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether lower-rank behavior belongs to a retained neutral branch or remains only a diagnostic toy.

**`PL-NB-L` -- Moving planar lower-rank neutral braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank neutral branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: Inherited from `PL-NB-0`.
- Angular-momentum frame: Lower-rank.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank neutral branch is promoted toward certification.
- Success condition: Test whether a lower-rank neutral branch can export observer rows without masquerading as rank-three Lorentz closure.

**`PL-SH-0` -- Planar lower-rank shell braid rest comparison**

- Fixed effort: Rest-branch lower-rank comparison on one support band.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: One support band.
- Angular-momentum frame: Lower-rank.
- Axis setting: Optional.
- Frequency ratio: Optional.
- Hinge value: Optional.
- Energy-level relation: Shell energy/action rows must close if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether shell support can retain without a rank-three frame.

**`PL-SH-L` -- Moving planar lower-rank shell braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank shell branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: Inherited from `PL-SH-0`.
- Angular-momentum frame: Lower-rank.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving shell energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank shell branch is promoted toward certification.
- Success condition: Test whether a lower-rank shell branch can export observer rows without masquerading as rank-three Lorentz closure.

**`PL-NSH-0` -- Planar lower-rank nested shell braid rest comparison**

- Fixed effort: Rest-branch lower-rank or terminal-boundary comparison on nested support.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} = 0$.
- Support / shell count: Three support bands or declared terminal nested support.
- Angular-momentum frame: Lower-rank or degenerating frame.
- Axis setting: Optional; coplanarity and co-linearity may be active near the terminal row.
- Frequency ratio: Optional.
- Hinge value: Optional or terminal hinge.
- Energy-level relation: Nested energy/action rows must close if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether lower-rank behavior is a retained nested branch, a terminal boundary of `NSH`, or only a planar reduced-chart diagnostic.

**`PL-NSH-L` -- Moving planar lower-rank nested shell braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank nested shell branch.
- Group velocity: $\mathbf{V}_{\mathrm{grp}} > 0$.
- Support / shell count: Inherited from `PL-NSH-0`.
- Angular-momentum frame: Lower-rank or degenerating frame.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving nested-shell energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank nested shell branch is promoted toward certification.
- Success condition: Test whether a lower-rank nested shell branch can export observer rows without masquerading as rank-three Lorentz closure.

## Noether Braid Configuration Space

This chapter gives the Noether braid search space for cases where three retained angular-momentum rows may form a full internal 3D frame. It comes after the family map in [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md) and the base branch definitions in [Neutral Braid](../../../../markdown/aaa/noether-braid/neutral-braid.md), [Shell Braid](../../../../markdown/aaa/noether-braid/shell-braid.md), and [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md), and before any named configuration such as the doubling-frequency `4:2:1` lock, an iso-frequency candidate, or a field-speed hinge-occupancy candidate. Within that sublocus, a rank-three branch candidate is a three-row retained state whose energies, phase offsets, angular-momentum rows, plane orientations, causal-root ledgers, frequencies, radii, speeds, and whole-branch group velocity must be solved together.

This is a search architecture and theorem target, not a completed classification theorem. The goal is to find which regions of the Noether braid configuration space support stable retained branches in a Noether sea populated by like assemblies, identify which branches remain candidate braids and which can be promoted to certified braids, and then use those branches as the entry point for assembly topological charge, energy differentials, shielding, and accessory-architrino capture.

### Document Role

This chapter owns the rank-three angular-momentum-frame search variables: unordered layer labels, angular-momentum two-form rows, the plane-frame determinant, group velocity, energy/frequency/speed/radius ledgers, role assignment, and permutation accounting. It is the place to ask whether a candidate branch supplies three retained angular-momentum rows with enough conditioning to form a volumetric internal frame.

It does not exhaust the full Noether braid class, certify nested shell support, or make `I:M:O`, `4:2:1`, iso-frequency, or field-speed hinge assumptions the default. Those are specializations that must declare their support base and same-record branch rows before they can be mapped onto a Proof ID in [Noether Braid Taxonomy](../../../../markdown/aaa/noether-braid/noether-braid-taxonomy.md).

### Scope Of The Hypothesis

The three-row exact-binary hypothesis is a decomposition strategy, not an exhaustion theorem. There may be stable Noether braid configurations that do not admit a clean split into three persistent binary rows. The reason to study this decomposition first is that three independent angular-momentum directions are enough to span the orientation data of Euclidean three-space. In that sense, the three-row exact-binary decomposition is the minimal exact-binary architecture that can test whether a stable assembly carries a full three-dimensional internal frame.

This also means that the word `binary` names a retained angular-momentum row, not necessarily a perfectly circular two-body orbit at every instant. A certified row may have a conserved or slowly bounded angular-momentum ledger while the actual architrino paths on the retained support are quasiperiodic, braided, or chaotic. On such a row, $f_a$ is a return or winding frequency, $r_a$ is a characteristic lever arm, $s_a$ is a speed row or speed statistic, and $E_a$ is the retained branch-energy row. A circular carrier chart is the cleanest comparison case, not the only admissible path geometry.

In geometric language, the three rows are derived from three retained angular-momentum two-form classes on the branch, not from three assumed circular sub-orbits. Write these classes schematically as
$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\}.
$$
The plane normal $\hat{\mathbf n}_a$ is the Euclidean Hodge-dual direction extracted from that class,
$$
\hat{\mathbf n}_a
=
\frac{\star[\omega_J^{(a)}]}
{\|\star[\omega_J^{(a)}]\|},
$$
whenever the numerator is nonzero. Thus axis language means a ledger direction derived from the retained branch record. It is not an assumption that constituent paths are axial, circular, or disjoint.

### Why Three Retained Rows

The reason to begin with three retained rows is geometric. Euclidean space has three independent spatial directions, and a stable three-dimensional assembly needs enough internal direction data to define an orientation frame rather than only a planar cycle. A single binary row supplies one orbital plane and one plane normal. Two rows can define a relative angle, but they do not by themselves supply a full nondegenerate three-axis frame. Three retained rows can, when their plane normals are independent, define a local three-dimensional frame.

Let the three retained binary planes have unit normals
$$
\hat{\mathbf n}_1,\,
\hat{\mathbf n}_2,\,
\hat{\mathbf n}_3.
$$
The plane-orientation nondegeneracy measure is
$$
D_{\mathrm{plane}}
=
\det\!\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}.
$$
The branch is genuinely three-dimensional only when $D_{\mathrm{plane}}\ne0$. Near $|D_{\mathrm{plane}}|=1$, the three planes are close to mutually orthogonal. Near $D_{\mathrm{plane}}=0$, the rank-three frame degenerates toward a coplanar or lower-dimensional support. This determinant is therefore a natural order parameter for the transition between a volumetric Noether braid branch and a planar or horizon-aligned branch.

For promotion work this becomes a nondegeneracy floor:
$$
|D_{\mathrm{plane}}|
\ge
\delta_{\mathrm{plane}}>0.
$$
It is the frame-bundle analogue of the Jacobian and separatrix floors used elsewhere: the map from three retained plane normals to an oriented internal frame loses conditioning when this determinant approaches zero. The wall $D_{\mathrm{plane}}=0$ is therefore the coplanar or horizon-aligned stratum where the frame ceases to be rank three. In current sector language, this is the boundary between a volumetric near-orthogonal sector and a planar cyclic sector; the solver must determine which side a retained branch actually occupies.

This is a statement about a derived orientation frame, not a claim that the constituent architrino paths are axial. The actual six paths may be braided, quasiperiodic, chaotic, shell-supported, or otherwise noncircular while still emitting retained angular-momentum rows from which principal directions can be extracted. Axis language in this chapter therefore means a ledger or envelope direction derived from the branch record, not a primitive path pattern.

The claim is not that every stable assembly must have three exact binary rows. The broader [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) class permits six-body branches before exact binary grouping is certified. The three-row exact-binary search inside that class is the minimal exact-binary architecture that can test full three-dimensional frame closure.

Equivalently, the three-row exact-binary locus is a sublocus of the six-body Noether braid configuration class:
$$
\mathcal{T}_{3B}^{\mathrm{locus}}
\subset
\mathcal{N}_{6\text{-body}}.
$$
A six-body branch belongs to this sublocus only when its retained angular-momentum record admits three independent rows, or equivalently a rank-three frame extraction with $D_{\mathrm{plane}}\ne0$. A planar, oblate, or lower-rank Noether braid may still be stable, but it is not a promoted rank-three Noether braid branch until the three-row frame condition is met.

### General Branch State

Use generic layer labels $a\in\{1,2,3\}$ before assigning nested `I:M:O` roles. These labels are bookkeeping labels only. They do not imply an ordering of frequency, radius, energy, speed, phase, plane orientation, or root-ledger complexity. The minimal branch record for this sublocus is
$$
\mathcal{T}_{3B}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency or return rate, $r_a$ is the characteristic radius or retained lever arm, $E_a$ is the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ is the scalar tangential speed or speed statistic, $\phi_a$ is the phase origin or offset, $\hat{\mathbf n}_a$ is the orbital-plane normal, and $\mathcal{L}_a$ is the active causal-root ledger data for that layer. On a circular carrier chart,
$$
s_a=2\pi f_a r_a.
$$
This identity is kinematic only. It does not select the frequencies, radii, speeds, energies, phase offsets, plane orientations, or causal-root ledgers.

The practical search should treat the branch energy row $E_a$, angular-momentum row, phase data, and causal-root ledger $\mathcal{L}_a$ as primary retained data. The radius and speed are then constrained by the selected carrier chart, conservation laws, and the branch's energy closure. In simple circular rows, fixed $f_a$ and $E_a$ may determine an admissible $r_a$ and $s_a$ after the kinetic, binding, and wake-energy terms are specified. In noncircular rows, the same energy may correspond to a bounded family of paths with the same return frequency but different local speed profile. Thus energy is central, but it is not by itself a complete coordinate on the Noether braid configuration space.

### Branch Group Velocity

The internal plane data do not encode group velocity. The plane normals $\hat{\mathbf n}_a$ describe the assembly's internal angular-momentum frame. The group velocity is the drift of the retained branch envelope or response center through the local Noether sea:
$$
\mathbf{V}_{\mathrm{grp}}
=
\frac{d\mathbf{X}_{\mathrm{resp}}}{dt}
\quad
\text{relative to the declared Noether sea record.}
$$
The full branch record should therefore be read as
$$
B_{3B}
=
\left(
\mathcal{T}_{3B},\,
\mathbf{X}_{\mathrm{resp}},\,
\mathbf{V}_{\mathrm{grp}},\,
\mathbf{P}_{\mathfrak B},\,
\mathbf{J}_{\mathfrak B},\,
\theta_{\mathrm{sea}}
\right),
$$
where $\mathbf{P}_{\mathfrak B}$ and $\mathbf{J}_{\mathfrak B}$ are the branch-total momentum and angular-momentum ledgers, and $\theta_{\mathrm{sea}}$ is the local Noether sea response record used to compare moving branches.

This distinction matters for the equivalence-principle and Lorentz-closure programs. In a validated low-energy regime, uniform group velocity should not become an observable composition-dependent force merely because two assemblies carry different internal plane orientations. That is an effective recovery target: the moving branch must retune its clock, ruler, and signal rows so that preferred-frame leakage stays below the declared bounds. It is not a reason to omit $\mathbf{V}_{\mathrm{grp}}$ from the dynamics. The correct statement is that $\mathbf{V}_{\mathrm{grp}}$ is a separate branch-transport variable whose observable leakage must be suppressed by common-channel closure.

This variable is unambiguous only when the response-center theorem target closes on the same branch. The exposed-energy response center, inertial response center, and wake-momentum boundary ledger must agree up to the declared response residual $\mathcal R_{\mathrm{resp}}$. If they do not, the phrase "group velocity of the branch" can point to different moment maps, and the candidate is not ready for certified-braid promotion. Thus $\mathbf{V}_{\mathrm{grp}}$ is part of the retained record, but its use as a single transport velocity is conditional on center-of-response closure.

### Candidate And Certified Braids

A **candidate braid** is a proposed Noether braid branch or branch family whose certificate rows have not all closed. A **certified braid** is a theorem-target status for a Noether braid branch, not a new primitive substance. A branch is certified only when its full retained record returns to itself under the delayed dynamics, up to declared symmetries, and its required stability, alignment, and observer-export rows close on the same record.

The retained record is not an arbitrary internal diary and it is not an arbitrary collection of architrinos. It is the finite branch chart for one Noether braid: the six-body polarity-neutral inventory of three positive-polarity and three negative-polarity architrinos, together with the path-history rows, causal-root ledger, wake-tail rows, energy/action rows, momentum and angular-momentum rows, phase data, plane-orientation data, response-center data, group-velocity row, and Noether sea record that can still affect the next delayed update of that same six-body branch. A path-history segment belongs to the retained record only while it can still enter a self-hit, partner-hit, wake-tail, boundary, or branch-return row on the declared memory window.

Let $P_T^{(\mathbf{V})}$ be the finite-memory return map over one branch period $T$, including translation by the branch group velocity $\mathbf{V}_{\mathrm{grp}}$. Let $\mathcal G_{\mathrm{sym}}$ contain only declared neutral symmetries such as global phase shift, rigid spatial rotation, translation of the response center, and permitted $S_3$ layer relabeling. A rank-three Noether braid branch $B_{3B}$ is a candidate for certified-braid promotion when there exists $g\in\mathcal G_{\mathrm{sym}}$ such that
$$
\mathcal R_{\mathrm{cert}}
=
d_{\mathfrak B}
\left(
P_T^{(\mathbf{V})}(B_{3B}),\,
g\cdot B_{3B}
\right)
\le
\epsilon_{\mathrm{cert}},
$$
on the same retained branch chart $\mathfrak B$, with the non-symmetry return directions carrying a positive stability margin. The metric $d_{\mathfrak B}$ must compare the same branch rows: causal-root ledger, energy/action ledger, angular-momentum rows, phase data, plane-orientation data, response-center motion, group velocity, Noether sea record, and assembly topological charge.

The quotient group $\mathcal G_{\mathrm{sym}}$ is not a convenience list. It must be the neutral group of the retained return map: directions removed from the stability test have zero Floquet exponent because they are declared symmetries of the full branch chart. A direction that is neutral in an isolated sub-row but unstable in the enclosing rank-three Noether braid chart is not quotiented. In that sense, the certified-braid certificate is the branch-symplectic-promotion test evaluated on the retained branch chart: the finite-memory return map must recur modulo true neutral symmetries while contracting or bounding every non-symmetry direction.

The branch-intrinsic conserved record must also export Lorentz-compatible observer rows before certification. In the homogeneous moving-branch regime, the same retained record must recover the ruler and clock deformation laws,
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}}
\to
\frac{1}{\gamma},
\qquad
\frac{d\tau}{dt}
\to
\frac{1}{\gamma},
$$
with preferred-frame leakage bounded by the declared $\epsilon_{\mathrm{LV}}$ or two-way anisotropy diagnostic. The observer components are produced through a derived moving-assembly map,
$$
C_{\mathrm{obs}}
=
\Lambda_{\mathrm{eff}}
\left(
\mathbf{V}_{\mathrm{grp}},
\theta_{\mathrm{sea}}
\right)
C_{\mathrm{branch}}
+O(\epsilon_{\mathrm{LV}}),
$$
when Lorentz closure applies. The export may dress energy-momentum, angular-momentum components, clock rates, and ruler geometry, but it does not replace the branch record itself. Topological rows such as assembly topological charge remain branch-intrinsic invariants unless the branch crosses a fold, reconnection, or other declared surgery event.

### Momentum And Principal-Direction Decomposition

A candidate for certified-braid promotion should also say how its three retained rows align with the conserved momentum ledgers. A branch whose retained record returns but whose axes do not align with branch-total momentum and angular momentum remains a return-map candidate, not a promoted certified braid. The branch-total momentum and angular momentum should be computed on the same finite window as the return map:
$$
\mathbf{P}_{\mathfrak B}
=
\mathbf{P}_{\mathrm{mech}}
+
\mathbf{P}_{\mathrm{wake}},
\qquad
\mathbf{J}_{\mathfrak B}
=
\mathbf{J}_{\mathrm{mech}}
+
\mathbf{J}_{\mathrm{wake}}.
$$
The mechanical and wake terms must use the same endpoint convention as the retained branch chart; otherwise the axis comparison is only a visualization.

When $\|\mathbf{P}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{P}
=
\frac{\mathbf{P}_{\mathfrak B}}{\|\mathbf{P}_{\mathfrak B}\|}
$$
is the transport axis. When $\|\mathbf{J}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{J}
=
\frac{\mathbf{J}_{\mathfrak B}}{\|\mathbf{J}_{\mathfrak B}\|}
$$
is the branch's total angular-momentum axis. The three retained plane normals $\hat{\mathbf n}_a$ should then be read as a principal-direction decomposition of $\mathbf{J}_{\mathfrak B}$, not as arbitrary visual decoration and not as a claim that the paths themselves lie on axes. A simple diagnostic is the angular-momentum closure vector
$$
\mathcal{R}_{J\mathrm{-axis}}
=
\left\|
\hat{\mathbf e}_{J}
-
\frac{\sum_{a=1}^{3}w_a\hat{\mathbf n}_a}
{\left\|\sum_{a=1}^{3}w_a\hat{\mathbf n}_a\right\|}
\right\|,
$$
where the weights $w_a$ are declared branch-action, branch-angular-momentum, or energy-row weights and the weighted normal sum is required to be nonzero. This is not yet a theorem: it is the axis-alignment row a solver must populate before claiming that the three retained rows faithfully decompose the assembly's conserved angular momentum.

The stronger faithful-decomposition test is spectral. Build the symmetric branch angular-momentum frame tensor
$$
\mathsf{J}_{\mathfrak B}^{ij}
=
\sum_{a=1}^{3}
J_a\,\hat n_a^i\hat n_a^j,
$$
with $J_a$ supplied by the retained branch-angular-momentum or action row. A promoted rank-three Noether braid branch should show that this tensor has three nonzero eigenvalues and that its eigenframe agrees with the retained normal frame up to the allowed $S_3$ relabeling and sign conventions. If diagonalizing $\mathsf{J}_{\mathfrak B}^{ij}$ produces a different frame, then $\mathcal{R}_{J\mathrm{-axis}}$ is not a mere visualization error: the three retained rows are not a faithful decomposition of the conserved angular-momentum ledger.

The oblate spheroidal envelope is the coarse geometry associated with this decomposition. In the rest branch, $\mathbf{P}_{\mathfrak B}=0$, so the internal angular-momentum axes and plane determinant describe the retained three-dimensional support. In a moving branch, $\hat{\mathbf e}_{P}$ marks the drift direction relative to the Noether sea, and Lorentz-closure asks whether the envelope deforms with a longitudinal-to-transverse ratio
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}},
\qquad
R_{\parallel}\ \text{measured along }\hat{\mathbf e}_{P},
$$
while the same internal angular-momentum ledger remains retained. Thus the retained-row picture is also a disciplined way to visualize an oblate spheroidal Noether braid: the three retained rows decompose the internal angular momentum into principal directions, while group velocity and total momentum select the moving-envelope axis.

### Unordered Layer Semantics

The search must not assume that one binary is inner, middle, outer, high-frequency, low-frequency, high-energy, low-energy, fast, slow, or geometrically privileged before the retained branch supplies that role. The raw search domain is therefore the labeled but unordered product
$$
\widetilde{\mathcal C}_{3B}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3):
\mathcal T_a=(f_a,r_a,E_a,s_a,\phi_a,\hat{\mathbf n}_a,\mathcal L_a)
\right\}.
$$
The symmetric group $S_3$ acts on this space by permuting the three support-row records:
$$
\pi\cdot(\mathcal T_1,\mathcal T_2,\mathcal T_3)
=
(\mathcal T_{\pi^{-1}(1)},\mathcal T_{\pi^{-1}(2)},\mathcal T_{\pi^{-1}(3)}),
\qquad
\pi\in S_3.
$$
Two rows may therefore be the same physical candidate up to a relabeling even when they appear as distinct solver outputs.

The default search policy is to keep $\widetilde{\mathcal C}_{3B}$ unquotiented. Repeated $S_3$-related solutions are useful confirmation that the solver is finding a symmetric sector rather than a one-off artifact. An analysis tool may later isolate one representative sector by computing a permutation-invariant key,
$$
\operatorname{key}(B)
=
\operatorname{sort}_{a=1}^{3}
\operatorname{fingerprint}(\mathcal T_a),
$$
but that quotient is an analysis summary, not the search domain. No branch is rejected merely because a symmetric relabeling has already appeared.

When branch counts, continuation-family cardinalities, or basin weights are reported, the quotient must be applied explicitly. If a physical branch has stabilizer subgroup $\operatorname{Stab}_{S_3}(B)$, then its orbit size in the unquotiented cover is
$$
\frac{|S_3|}
{|\operatorname{Stab}_{S_3}(B)|}.
$$
The unquotiented solver rows are useful evidence, but they are not independent physical branches. Any comparison to the finite-continuation family $\mathfrak S_{\Omega,W}^{\mathrm{ME},\eta}$ or to basin measures must reduce by the same $S_3$ orbit accounting rather than overcounting six label copies as six distinct certified braids.

The general configuration ratios are
$$
f_1:f_2:f_3,
\qquad
r_1:r_2:r_3,
\qquad
E_1:E_2:E_3,
\qquad
s_1:s_2:s_3.
$$
These ratios are reported in the current layer labels. They are not sorted ratios and they carry no inequality unless a retained branch later assigns a role order.

The branch-search problem is to find retained stable states
$$
\mathcal{T}_{3B}
\in
\widetilde{\mathcal C}_{3B}
$$
over this full variable set, then compare their energy differentials
$$
\Delta E_{ab}=E_a-E_b
$$
and ledger decompositions on the same retained row set. The doubling-frequency, iso-frequency, and broader integer-ratio families are subfamilies of $\widetilde{\mathcal C}_{3B}$, not definitions of it. Field-speed hinge occupancy is a separate speed-regime axis on the same branch rows, not a frequency-ratio family.

### Super-Field-Speed Carrier Rows

The general search naturally includes carrier speeds above the causal wake propagation speed. Since
$$
s_a=2\pi f_a r_a,
$$
fixing one row of the search does not fix the others. Even an iso-frequency family
$$
f_1=f_2=f_3
$$
can have different radii, energies, speeds, phases, and active root ledgers:
$$
r_1:r_2:r_3
\ne
1:1:1,
\qquad
s_1:s_2:s_3
\ne
1:1:1.
$$
If one retained lever arm is large enough at the common frequency, then that layer has $s_a>c_f$.

This is not a signal-speed claim. The primitive causal wake still propagates at $c_f$. A row with $s_a>c_f$ is a carrier-trajectory row in the retained branch chart. Its importance is dynamical: it changes the causal-root inventory. Super-field-speed carrier motion can create additional self-hit and partner-hit roots, force Jacobian sign changes, and move the branch into the fold and caustic regimes that feed the causal-root ledger. The possibility of one or more super-field-speed layers is therefore a reason to scan the full Noether braid configuration space rather than preselecting a single speed hierarchy.

In a certified row, the important event is not speed alone but the appearance of same-source causal roots with the required transversality floors. Still, $s_a>c_f$ is the natural warning gate for the layer's self-hit signed-root complex:
$$
C_+^{(a)}\oplus C_-^{(a)}.
$$
A branch with one super-field-speed layer can carry a different assembly topological charge structure from a branch with two or three such layers, because the self-hit ledgers and signed degrees are layer-dependent. This is another reason the search must preserve the full unordered speed tuple $s_1:s_2:s_3$ rather than collapsing immediately to a preferred hierarchy.

### Stability In A Sea Of Like Assemblies

An isolated Noether braid return map is not enough for Noether braid promotion. A retained branch must also remain stable when embedded in a Noether sea containing like assemblies. The relevant stability question is not only whether one branch closes, but whether a population of similar branches can coexist without destroying the retained ledgers.

For a candidate branch $B$ over a window $W$, write the stability target schematically as
$$
\mathrm{Stable}_{3B}(B;W,\mathcal{N}_{\mathrm{sea}})
\Longleftrightarrow
P_{\mathrm{root}}
\wedge
P_{\mathrm{phase}}
\wedge
P_{\mathrm{energy}}
\wedge
P_{\mathrm{return}}
\wedge
P_{\mathrm{sea}}.
$$
Here $P_{\mathrm{root}}$ requires persistent causal-root ledgers with positive root floors except at declared caustic transits, $P_{\mathrm{phase}}$ requires bounded phase-offset drift, $P_{\mathrm{energy}}$ requires a closed branch-energy row, $P_{\mathrm{return}}$ requires a Floquet, Conley, or comparable return certificate, and $P_{\mathrm{sea}}$ requires the same branch to remain coherent under the background Noether sea response generated by like assemblies. This last predicate is the bridge from an isolated branch search to a stable medium of assemblies.

The result of this search should be an atlas of stable regions in $\widetilde{\mathcal C}_{3B}$, not a single preferred row. Patterns may include doubling-frequency locks, iso-frequency families, integer-ratio families such as `3:2:1`, field-speed hinge-occupancy regimes, planar degenerations, and mixed regimes where one or more layers run above $c_f$ while the whole assembly remains a retained delayed branch. If a stable region is $S_3$-symmetric, the atlas may also report the corresponding quotient-sector representative, but the unquotiented evidence should remain available.

### Toward A Periodic Table Of The Noether Braid

The phrase "periodic table of the Noether braid" names the classification program, not an already completed table. The proposed atlas should classify retained branches by:

1. The compact assembly topological charge $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$ and its signed-degree refinement.
2. The frequency, radius, energy, and speed ratios of $\mathcal{T}_{3B}$.
3. The plane-orientation determinant $D_{\mathrm{plane}}$ and handedness data.
4. The energy differentials $\Delta E_{ab}$ and their wake-history decomposition.
5. The response of the branch to a sea of like assemblies.
6. The capture or exclusion behavior of additional architrinos near the branch.

The classification is topological only where the entries are invariant under branch-preserving deformation. It is dynamical where the entries depend on energy balance, phase locking, sea response, and return-map stability. A promoted table must therefore carry both topological labels and dynamical margins.

### Accessory-Architrino Capture

After a stable rank-three braid has been retained, the next search level asks whether ordinary architrinos can become bound to that braid without destroying the braid ledger. In this search-stage sense, an **accessory architrino** is not a new ontological species. It is an architrino whose trajectory becomes coupled to an already retained braid branch.

For a braid branch $B$, define a capture site as a region of phase-position-history space where an added architrino can acquire a bounded return ledger:
$$
\mathcal{C}_{\mathrm{cap}}(B)
=
\left\{
(\mathbf{x},\mathbf{v},q,\phi):
\mathrm{Retain}_{\mathrm{acc}}(B;\mathbf{x},\mathbf{v},q,\phi)=1
\right\}.
$$
The capture predicate must use the same causal-root, action, energy, and return-map conventions as the braid branch. A site is not merely a low potential region. It must preserve the braid ledger while giving the added architrino a persistent delayed-return row, finite energy exchange, and bounded phase drift.

Topologically, capture preserves the assembly topological charge of the braid branch while augmenting it with an accessory row. If $B_{\mathrm{braid}}$ has assembly topological charge $[\mathfrak B_{\mathrm{braid}}]_{\mathrm{top}}$, then an admissible captured branch should have
$$
[\mathfrak B_{\mathrm{braid}}\cup\mathrm{acc}]_{\mathrm{top}}
=
[\mathfrak B_{\mathrm{braid}}]_{\mathrm{top}}
+\Delta_{\mathrm{acc}},
$$
where $\Delta_{\mathrm{acc}}$ is supplied by the accessory row's own causal-root and return ledger while the braid entries are unchanged. If the braid values of $N_s$, $M_p$, $c_1$, signed degree, or phase-return data change, the event is not capture in this sense; it is a braid reconfiguration through a fold, reconnection, or branch surgery.

The architectural question is therefore:
$$
B
\longrightarrow
\left(
\mathcal{C}_{\mathrm{cap}}(B),
\#\mathrm{captured},
\mathrm{capture\ pattern},
\Delta E_{\mathrm{capture}}
\right).
$$
This gives the next level of search after core rank-three stability: how many accessory architrinos can couple to the retained branch, which phase windows and polar regions they occupy, and how their capture changes the energy ledger. If the captured population becomes the six-site fermion organization, the canonical language is axial architrino, axial layer, polar site, polar dyad, and axial inventory.

The six-site axial-layer target should therefore be read as a derived capture pattern, not as an assumed geometry of the core. The search question is whether there is a maximal accessory population whose capture preserves $[\mathfrak B_{\mathrm{core}}]_{\mathrm{top}}$ and organizes into a protected axial inventory. The arrangement may be axial, polar-dyad-based, planar-degenerate, or another retained capture architecture until the branch certificate decides it.

### Frame Orthogonality And Framing Anisotropy

The configuration-space program also supplies a compact theorem target for anisotropy leakage. A faithful rank-three Noether braid branch has two related order parameters: the frame determinant $D_{\mathrm{plane}}$ and a trace-free framing quadrupole $Q_A$ extracted from the same retained normal/eigenframe data. Schematically,
$$
Q_A^{ij}
=
\sum_{a=1}^{3}
\lambda_a
\left(
\hat n_a^i\hat n_a^j
-\frac{1}{3}h^{ij}
\right),
\qquad
\sum_a\lambda_a=0,
$$
with the weights $\lambda_a$ fixed by the retained action, energy, or angular-momentum tensor row rather than chosen after the fact.

The reachable theorem target is:
$$
|D_{\mathrm{plane}}|\to1
\quad\Longrightarrow\quad
\|Q_A\|\ \text{small under faithful spectral weighting},
$$
while degeneration toward $D_{\mathrm{plane}}=0$ may produce large framing anisotropy. If this implication is proved for a retained branch class, the same geometric row would suppress Lorentz period anisotropy, clock-orientation leakage, Hughes-Drever-type inertial anisotropy, and scalar-mass anisotropy. This chapter does not prove that result; it defines the configuration-space objects on which that proof can be attempted.

### Relation To The Doubling-frequency Chapter

[Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md) studies one restricted family inside this broader configuration space. It asks whether a nested `I:M:O` frequency triplet, especially the doubling-frequency `4:2:1` candidate, can close as an integer phase-bundle lock with a stable return map and controlled caustic behavior.

The doubling-frequency chapter should therefore be read as a specialized search row:
$$
\mathcal{C}_{\mathrm{dbl}}
\subset
\widetilde{\mathcal C}_{3B}.
$$
Iso-frequency, unequal-radius candidates occupy a different row:
$$
\mathcal{C}_{f=f=f}
=
\{B\in\widetilde{\mathcal C}_{3B}:f_1=f_2=f_3\}.
$$
Both rows are legitimate until the retained-branch certificates decide which, if either, survives. The general Noether braid search keeps the mathematics wide enough for the solver to discover stable configurations rather than forcing every stable Noether braid into a preselected frequency pattern.

## Noether Braid Doubling-Frequency Resonance Lock

This chapter studies resonance lock for the nested inner, middle, and outer binaries as a restricted family inside the broader [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md). Its immediate goal is specific: identify the relationship between frequency, scalar tangential speed, and radius in a reduced branch where the middle binary caustic-grazes the field-speed hinge and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md), [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md), and [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), which provide the assembly scaffold, geometry, and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the inner, middle, and outer binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. Inferentially, an integer lock is selected only after the phase-return degree/holonomy, cancellation score, and stability gap all favor the same branch.

This chapter keeps the field speed $c_f$ explicit rather than setting it to one. We work with branch labels $k\in\{I,M,O\}$. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{v}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

### Document Role

This chapter is the specialized `NSH-421` candidate-family chapter. It owns the `4:2:1` frequency-lock analysis when a nested shell braid chart declares `I:M:O` roles and tests a doubling-frequency branch under explicit support, hinge, phase-return, and stability assumptions.

It does not make doubling-frequency the default Noether braid frequency, certify the nested shell braid by kinematics alone, or replace the general integer-ratio, iso-frequency, and field-speed hinge rows in [Noether Braid Taxonomy](../../../../markdown/aaa/noether-braid/noether-braid-taxonomy.md). The `I:M:O` role map used here remains part of the same-record branch proof unless the local record has already supplied it.

### General Rank-Three Branch State

Before a doubling-frequency, iso-frequency, integer-ratio, or field-speed hinge-occupancy condition is selected, the rank-three search branch is represented by three retained rows. The general search program is defined in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md); this section records the variables needed locally for the doubling-frequency specialization. Use generic layer labels $a\in\{1,2,3\}$ before assigning the canonical `I:M:O` roles. These labels are not sorted by $f_a$, $r_a$, $E_a$, $s_a$, or any other parameter; permutation-related rows remain valid search evidence until an explicit quotient-sector analysis is declared. The minimal branch variables are
$$
\mathcal{T}_{3B}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency, $r_a$ the characteristic radius or retained lever arm, $E_a$ the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ the scalar tangential speed, $\phi_a$ the phase origin or offset, $\hat{\mathbf n}_a$ the orbital-plane normal, and $\mathcal{L}_a$ the active causal-root ledger data for that layer. On a circular layer chart the kinematic identity is
$$
s_a=2\pi f_a r_a.
$$
This identity is only a constraint among three variables. It does not by itself select the frequency ratios, energy placement, radii, speeds, or phase offsets.

The branch-search objective is therefore
$$
\text{find retained, stable } \mathcal{T}_{3B}
\text{ over }
(f_a,r_a,E_a,s_a,\phi_a,\hat{\mathbf n}_a,\mathcal{L}_a),
$$
then compare the energy differentials
$$
\Delta E_{ab}=E_a-E_b
$$
and their ledger decomposition on the same retained row set. A doubling-frequency candidate, a field-speed hinge-occupancy candidate, and an iso-frequency candidate are special conditions on this same state space. In particular, the iso-frequency condition
$$
f_1=f_2=f_3
$$
still permits different $r_a$, $s_a$, and $E_a$, because the radii or retained lever arms can differ. Different phase offsets and different active root ledgers can then carry the branch distinction even when the frequency row is common.

For nested shell braid prose, specialize the generic labels to canonical `I:M:O` order only after the retained branch supplies the role assignment. The later doubling-frequency lock discussion studies one restricted family inside this broader rank-three branch state; it is not the default assumption for all stable branch configurations.

### Status and Assumptions

The logic of the chapter is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

#### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.
The logical spine is therefore:

1. **Kinematics:** $v_k=2\pi f_k r_k$ relates speed, frequency, and radius without introducing topology.
2. **Integer closure:** Assumption 2 is the only place where the integer pair $(m,n)$ enters; it turns frequency commensurability into return-map degree/holonomy data.
3. **Selection:** Assumption 4 and the finite-$\eta$ return map decide whether one already-integer-labeled sector is dynamically preferred.

Everything before Assumption 2 is topology-free kinematics. Everything after Assumption 2 is selection among sectors that already carry integer phase-return data.

#### Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-force surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1
$$
For compact notation, the algebra below writes $v_M=c_f$ and $\beta_M=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_M(t)=c_f+\delta v_M(t),
\qquad
\langle \delta v_M\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{v}_{M,n}
=
\int_{t_n^-}^{t_n^+}
\mathbf{a}_M^{(\eta)}(t)\,dt,
\qquad
\left\|\Delta\mathbf{v}_{M,n}\right\|<\infty
$$
rather than an infinite-force constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../../../../markdown/aaa/dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the chapter. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether braid regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

#### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $T_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$
such that
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m
$$
$$
\theta_I(t+T_O)=\theta_I(t)+2\pi n
$$

Therefore the canonical `I:M:O` frequency triplet is $f_I:f_M:f_O=n:m:1$. Equivalently, in outer-normalized order, $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether braid closure problem, the simple phases $\theta_k=q_k\Omega t+\phi_k$ are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

#### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(t)\equiv \theta_M(t)-m\theta_O(t)=\phi_{MO}^\ast
$$
$$
\phi_{IO}(t)\equiv \theta_I(t)-n\theta_O(t)=\phi_{IO}^\ast
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

#### Bundle Holonomy Reading

Assumptions 2 and 3 can be restated as a phase-bundle condition. Let the outer phase be the base cycle and define the relative connection one-forms

$$
\vartheta_{MO}
=
d\theta_M-m\,d\theta_O,
\qquad
\vartheta_{IO}
=
d\theta_I-n\,d\theta_O
$$

Exact integer phase closure says the covering degrees over one outer cycle are

$$
\frac{1}{2\pi}\oint_{T_O}d\theta_M=m,
\qquad
\frac{1}{2\pi}\oint_{T_O}d\theta_I=n
$$

or equivalently

$$
\oint_{T_O}\vartheta_{MO}=0,
\qquad
\oint_{T_O}\vartheta_{IO}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{MO}^\ast,\phi_{IO}^\ast$ are the residual flat-connection data. The discrete and continuous pieces should be kept separate:

$$
(m,n)=\text{covering degrees over }S^1_O,
\qquad
(\phi_{MO}^\ast,\phi_{IO}^\ast)=\text{flat-connection moduli}
$$

Thus the lock is a flat relative-phase connection with integer holonomy, not a literal first Chern class over the outer phase circle. In the language of [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-return degree data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional layer independence. Let $\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I$ be the orbital-plane normals of the three layer binaries and define

$$
D_{\mathrm{plane}}
=
\det
\left[
\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I
\right]
$$

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of doubling-frequency precession at alignment.
For a promoted finite-$\eta$ chart this is a conditioning floor,
$$
|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0.
$$
It is the phase-bundle analogue of the basis-conditioning and aperture floors in the frame-construction and detection chapters: $D_{\mathrm{plane}}\to0$ means the three plane normals no longer define a stable oriented frame. The codimension-one wall $D_{\mathrm{plane}}=0$ is also where the near-orthogonal Noether braid phase chart degenerates toward a coplanar cyclic sector, so crossing it is a sector-wall event rather than a harmless coordinate limit.

#### Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, middle-caustic impulse record, and finite-$\eta$ return map.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-transversality floors, and the speed bounds assigned to the exterior/horizon regime.

In this branch, the middle binary is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At the regularized middle caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_n
\mathcal{F}_n\,
\delta_\eta(\theta_M-\theta_{M,n}^{\ast})\,
d\theta_M\wedge d\theta_O
+
\Omega_{\mathrm{reg}}
$$

where $\theta_{M,n}^{\ast}$ are the middle caustic phases and $\mathcal{F}_n$ is proportional to the finite caustic impulse $\Delta\mathbf{v}_{M,n}$ and its wake-history increment on the retained branch. The fulcrum statement is therefore geometric: outer/inner energy routing changes only at the middle-caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit echo bookkeeping](../../../../markdown/aaa/dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

A minimal test functional can be written before committing to a particular lock. Let $q_I=n$, $q_M=m$, and $q_O=1$, with phase variables $\theta_k=q_k\Omega t+\phi_k$. For a low-order truncation depth $L$, define
$$
S_L(t)
=
\sum_{k\in\{I,M,O\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,D_s,D_T,W^{\mathrm{rec}},J)\,
e^{ia(q_k\Omega t+\phi_k)}
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ receiver-normal branch-strength, branch-transversality, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
For the caustic-grazing middle carrier this extraction is not an ordinary smooth Fourier coefficient. A middle harmonic must carry the caustic transversality weight of the window while keeping receiver-normal force/action strength on the same retained record, schematically

$$
A_{M,a}
=
\int_0^{2\pi}
\frac{
w_{M,a}^{\mathrm{rec}}(\theta_M)
}{
|J_M(\theta_M)|+\eta_J
}
e^{-ia\theta_M}\,d\theta_M
$$

with $\eta_J$ the declared Jacobian-floor regularization and $w_{M,a}^{\mathrm{rec}}$ the branch-derived numerator computed from the same retained $D_s$, $D_T$, and $W^{\mathrm{rec}}$ row for that harmonic channel. The $J_M$ factor is a caustic-window transversality weight, not a substitute for receiver-normal branch strength. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{M,n}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite middle-caustic impulse deposits the right spectral weight into the first common resonance block.
The cycle-averaged cancellation score is
$$
C_L(m,n;\phi)
=
\frac{1}{T}\int_0^T |S_L(t)|^2\,dt
=
\sum_{\nu}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
The doubling-frequency claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_j\{1,\ldots,L\}
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the doubling-frequency candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the doubling-frequency lock.
The selection therefore has two independent requirements. The topological requirement is that the all-layer resonance block is nonempty; for the doubling-frequency candidate this is the $\nu=4$ block. The dynamical requirement is that the branch-derived complex amplitudes in that block can close a polygon after the caustic-weighted middle contribution is included. The first requirement belongs to the covering structure; the second belongs to the finite-$\eta$ delayed dynamics and cannot be inferred from topology alone.

Topologically, the same $\nu=4$ statement says the doubling-frequency lock is the first common cover of the three phase circles. The covering maps can be written

$$
T^O
\xleftarrow{\ \times m\ }
T^M
\xleftarrow{\ \times n/m\ }
T^I
$$

when $m$ divides $n$. The doubling-frequency case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each layer double-covers the one above it. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the doubling-frequency branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins.
Equivalently, the resonance blocks are the isotypic components of the integer action generated by the lock, and $\nu=\operatorname{lcm}(1,2,4)=4$ is the first common period of all three circles. The doubling-frequency tower is the unique minimal repeated cover
$$
S^1\xleftarrow{\times 2}S^1\xleftarrow{\times 2}S^1
$$
among non-identity integer towers. This is why the doubling-frequency family is also the natural candidate for a renormalization-style fixed point in the truncation analysis: repeated double covering is the simplest scale-similar phase organization.

#### Non-Assumptions

This chapter does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
This chapter studies exact integer closure. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

### Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

From Assumptions 1-2 and the exact identity, the middle carrier radius is fixed by the outer frequency:
$$
r_M=\frac{c_f}{2\pi f_M}
=
\frac{c_f}{2\pi m f_O}
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O}
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

These are the core radius relations of the chapter:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

They show that once the canonical integer lock $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$. Thus a frequency hierarchy is not yet a radius hierarchy.

### Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_I:f_M:f_O = n:m:1
$$
equivalently, $f_O:f_M:f_I = 1:m:n$ in outer-normalized order, and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_k=\frac{\beta_k c_f}{2\pi f_k}
$$
together with the carrier value $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle caustic-grazing carrier condition. The proposition makes no claim about which integer pair is dynamically preferred.

### Could $1{:}2{:}4$ Be a Solution?

If one later chooses the doubling-frequency integers
$$
m=2,
\qquad
n=4
$$
then
$$
f_I:f_M:f_O = 4:2:1
$$
equivalently, $f_O:f_M:f_I = 1:2:4$ in outer-normalized order,
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}
$$

So the doubling-frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

### What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- inner, middle, and outer frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is doubling-frequency,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The bundle-flatness and cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

### Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods only when the relative phase connection stays flat enough to replay. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a flat-bundle replay test than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage, phase-slip variance, and residual phase curvature subject to the delayed dynamics. If the bundle-flatness diagnostic and the cancellation score disagree, the cancellation score is only an effective summary and cannot by itself overrule a holonomy or return-map failure.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

### RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

The branch geometry predicts which modes are most dangerous. Smooth flat-connection layers should have rapidly decaying coefficients,

$$
|A_{O,a}|,\ |A_{I,a}|
\le
C e^{-c a}
$$

on an analytic replayable chart. The middle caustic layer instead has an algebraic pre-cutoff tail because its impulse is phase-localized:

$$
|A_{M,a}|
\lesssim
C_{\eta}\,a^{-p_{\mathrm{fold}}}
$$

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. For a generic Whitney $A_2$ fold, the normal form gives the square-root caustic scaling and the pre-cutoff exponent
$$
p_{\mathrm{fold}}=\frac{3}{2}.
$$
A cusp or higher catastrophe would change this exponent and therefore change the truncation budget. The finite-depth proof must therefore report the middle-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the flat outer and inner harmonics are irrelevant tails, while the middle caustic block is the marginal channel that can still affect selection beyond the first all-layer block.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
where
$$
L_{\mathrm{eff}}
$$
is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$
uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$
against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L
$$
For the generic $A_2$ fold exponent, the middle tail dominates the smooth outer and inner tails:
$$
|A_{M,a}|^2=O(a^{-3}),
\qquad
\varepsilon_L=O(L_{\mathrm{eff}}^{-2}).
$$
Thus a practical finite-depth certificate must choose $L_{\mathrm{eff}}$ large enough that the bound implied by $L_{\mathrm{eff}}^{-2}$ is less than $\frac12\Delta C_L$ on the same branch chart. This is a stopping rule for the selection calculation, not a new assumption about which lock wins.

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L
$$

### Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, phase-bundle topology, effective cancellation, and inference separate:

1. classify the admissible canonical integer locks $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. require nondegenerate orbital-plane data $D_{\mathrm{plane}}\neq0$ so the retained phase bundle is genuinely three-dimensional,
4. define the phase-bundle curvature and caustic-weighted cancellation functional for the low-order causal-wake multipole or effective potential,
5. determine which integer lock minimizes residual curvature and exposed leakage in the exterior/horizon regime,
6. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap on the complement of the flat moduli.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$
on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$
off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-transversality floors, caustic-impulse rows, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

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

where $T_{\mathrm{global}}$ is the global time or phase shift, $\mathfrak{so}(3)_{\mathrm{rot}}$ is the rigid spatial-rotation tangent space, $T_{\mathrm{flat}}=\operatorname{span}\{(\delta\phi_{MO},\delta\phi_{IO})\}$ is the flat-connection moduli space, and $G_{\mathrm{rel}}$ contains any declared relabeling symmetry of the retained branch chart. A lock is dynamically stable only if the return map contracts on the complement of $G$ and the flat-modulus directions remain genuinely neutral. If a flat-modulus direction becomes unstable, the frequency commensurability may remain while Assumption 3 fails through relative-phase drift.
The quotient rule is strict. A direction in $T_{\mathrm{flat}}$ is treated as a symmetry only when the holonomy-defect coordinate
$$
\Theta(t)
=
\left(
\phi_{MO}(t)-\phi_{MO}^\ast,\,
\phi_{IO}(t)-\phi_{IO}^\ast
\right)
$$
has zero Floquet exponent on the retained return map. If $\Theta$ has a positive exponent, the same direction is a lock-breaking instability, not a quotient direction. This is the retained-branch version of the embedded-binary warning in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md): a reduced subsystem's apparent neutral direction cannot be removed unless it is neutral for the full retained branch chart.

If the minimizer turns out to be the outer-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the doubling-frequency hierarchy would be a derived selection result rather than a starting assumption.

In the invariant language of [Noether Braid Topological Charge](../../../../markdown/aaa/noether-braid/noether-braid-topological-charge.md), the reduced theorem target is to find an admissible topological sector

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

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The doubling-frequency conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

#### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory
$$
z_i=(\phi_i,a_i,\nu_i,\ell_i,\hat{\mathbf{n}}_{O,i},\hat{\mathbf{n}}_{M,i},\hat{\mathbf{n}}_{I,i})\in\mathcal{S}_{m,n}
$$
define a recurrence matrix
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
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$, while the holonomy-defect coordinate is not quotiented:

$$
\Theta(t)
=
\left(
\phi_{MO}(t)-\phi_{MO}^\ast,\,
\phi_{IO}(t)-\phi_{IO}^\ast
\right)
$$

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

### Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal rank-three bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

whereas

$$
1{:}2{:}4\ \text{doubling-frequency cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the doubling-frequency Noether braid lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above.
The separating wall is the plane-degeneracy condition
$$
D_{\mathrm{plane}}=0.
$$
On one side, the near-orthogonal sector carries three independent phase circles and covering data. On the wall, the phase chart collapses into a coplanar cyclic configuration where cancellation is representation-theoretic inside one plane. Crossing this wall is therefore a change in cancellation topology, not a smooth deformation inside one sector. The reachable theorem target is that the doubling-frequency sector and the coplanar $\mathbb{Z}_3$ sector cannot be connected by a path that preserves both $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ and a positive non-symmetry Floquet gap.

For neighboring closure problems, see [Planar Bridge Closure](../../../../markdown/aaa/proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Nested Shell Braid Dynamics

This chapter formulates nested shell braid dynamics by extending the two-body delayed causal-wake system to a nested shell braid with three coupled shell binaries. Its focus is the branch geometry, high-speed response, gradient response, and diagnostic quantities needed to assess stability and alignment in absolute substrate time.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md), and [Nested Shell Braid Geometry](../../../../markdown/aaa/noether-braid/nested-shell-braid-geometry.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, and exclusion-envelope geometry.

This chapter is the canonical dynamics home for coupled speed regimes, alignment behavior, and assembly-stability mechanisms inside the nested shell braid variant. Primitive architrino ontology supplies the transceivers, polarities, causal wakes, and causal-root law; coupled stability mechanisms belong here and in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md).

### Document Role

This chapter is the nested shell braid mechanism and certificate-target chapter. It owns the coupled shell dynamics, speed-regime conventions, field-speed hinge response, causal-root ledgers, gradient response, stability/alignment diagnostics, and same-record certificate target for promoting a nested shell chart.

It does not prove that every Noether braid is a nested shell braid, select the general taxonomy, or turn downstream mass, photon, Lorentz, GR, or topological rows into independent branch IDs. Those rows are certification consumers unless the same retained nested shell braid record supplies them.

### Relation to Causal Closure

This chapter owns the dynamics baseline: the nested shell braid roles, speed-regime conventions, delay-envelope geometry, gradient response, local cycle-period diagnostics, and stability tests that define the nested shell braid mechanism. It does not try to close the full rest-mass, photon, or observer-inference proof program.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $t$. A nested shell braid branch may output absolute periods, causal-root ledgers, deformation tensors, and stability residuals; later observer-inference chapters may translate those outputs into clock, ruler, signal, and effective-geometry language.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

### Claim Scope

The claims in this chapter define a canonical dynamics baseline. They do not yet constitute a completed derivation of rest mass, photon behavior, or general relativity from first principles. The claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Nested shell braid roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, cycle-period diagnostics, and stability tests. |
| Reconstruction target | Mass response, photon-channel behavior, observer-inference exports, and weak-field matching inputs as quantities to be derived from the dynamics before downstream interpretation. |
| Open proof burden | Nested shell braid minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle export bounds, and downstream observer-geometry closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

### Causal-Closure Certificate Target

The rest-mass, moving-deformation, photon, observer-export, and event-ledger rows should be populated by one retained branch record, not by separately tuned fits. Retention is the conclusion of the certificate, not an assumption made before the rows are checked. For a candidate nested shell braid chart $q$ over a test window $W$, the shared certificate target is

$$
\mathcal{C}_{\mathrm{NSH}}^{(q)}(W)
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
\right)
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
\right)
$$

The candidate chart may be promoted to a retained branch class $q$ only if the same ledger supplies a positive Jacobian floor, inactive-root gap, finite memory depth, positive stability gap, closed event ledger, and the normalized closure residual

$$
\mathcal{U}_{\mathrm{NSH}}^{(q)}(W)
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
\le1
$$

This is a certificate target, not an additional force law. It prevents a moving-deformation ratio, a mass-response average, a photon row, or an observer-export residual from being promoted unless the same causal-root branch supplies the period, envelope, signal, observer-export, mass, sector, and event-ledger data. If a row fails on $q$, the verdict is a rejected chart or continuation target under its declared hypotheses, not evidence against the broader neutral braid or shell braid class.

### Substrate and Effective Levels

Nested shell braid dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $t$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Nested shell braids, three coupled shell binaries, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
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

The baseline nested shell braid is not a stack of three identical circular binaries. It is a nested causal lock whose shells operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of shell $\ell$ around that shell's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $\|\mathbf{v}\| = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable shell ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the nested shell braid closure problem. In a coupled lock, inter-shell wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

The same distinction applies to compact nested shell braid carriers. A finite-coordinate no-go for one compact carrier rejects that branch chart and its declared coordinates; it does not falsify the $A_0$ branch program. Raw root-key splits, observation-phase bins, and fitted residual bases remain diagnostic unless they belong to a branch-native coordinate declared before fitting. A checker-cleared coordinate may seed only a rerun candidate; it is not physical branch structure until the same branch identity survives root-ledger transport, residual checks, and stability continuation.

The perturbation status should therefore be sorted before simplification:

| Perturbation class | Dynamics role |
| --- | --- |
| Nonresonant fast terms | Average over the closed nested shell braid cycle and mostly affect convergence or small far-field corrections. |
| Resonant and near-separator terms | Change phase closure, causal-root counts, Jacobians, or Floquet multipliers, so they remain part of the branch definition. |
| Leakage terms | May be small internally while surviving as far-field multipoles or anisotropy, so they control the shielding extraction. |

### Braid Symmetry-Breaking Point

The **braid symmetry-breaking point** is the braid-level version of the single-binary field-speed threshold. A single binary crosses the symmetry-breaking point when its branch reaches the $c_f$ hinge and same-source roots can turn on. A whole nested shell braid reaches its braid symmetry-breaking point only when the outer coupling layer is also driven into terminal alignment with the middle hinge while the inner binary remains in the self-hit interior row.

The working condition is

$$
s_I>c_f,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
d_{\mathrm{align}}(q)\to0,
$$

with $d_{\mathrm{align}}$ measuring coplanarity, co-linearity, and precession cessation in the declared branch coordinates. This is not the statement that all three binaries become identical. Since

$$
s_\ell=\omega_\ell\rho_\ell,
$$

the middle and outer binaries can share the same threshold speed while retaining different frequencies, effective lever arms, energies, or action shares. Equality of speed is a causal-regime statement. Equality of radius, frequency, energy, or action would be additional branch structure that must be derived from the retained energy/action ledger.

At the braid symmetry-breaking point, the outer binary stops functioning as an ordinary sub-field-speed shielding envelope and becomes part of the interface row. The middle binary remains the hinge. The inner binary does not need to "reach" the hinge because it is already beyond it: it supplies the self-hit, maximal-curvature, history-supported row. This is why the threshold is the natural local precursor to horizon-interface language rather than a mere three-frequency coincidence.

### Planar Reduced Noether Braid Chart

The **planar reduced Noether braid chart** is the simplest controlled chart for studying the braid symmetry-breaking point. It projects three declared branch rows into a common plane or near-plane and records, for each row $a\in\{1,2,3\}$ before role assignment,

$$
\Pi_{\mathrm{pl}}(B_{3B})
=
\left(
f_a,\phi_a,\rho_a,s_a,\sigma_a^{\mathrm{plane}},\mathcal{B}_a
\right)_{a=1}^{3}
$$

together with the causal-root, receiver-normal branch-strength, wake, angular-momentum, energy-routing, and stability ledgers that would make the projection admissible. Here $f_a$ is a frequency or integer phase-lock row, $\phi_a$ is the phase offset, $\rho_a$ is the effective lever arm, $s_a=\omega_a\rho_a$ is the local speed row, $\sigma_a^{\mathrm{plane}}$ is the planar circulation sign, and $\mathcal{B}_a$ is the oriented plane bivector used for sector classification.

This chart is a reduced proof bridge, not a replacement for the full three-dimensional branch. It connects three active searches:

- the $x:y:z$ frequency-pattern search, including iso-frequency, integer-ratio, and doubling-frequency families;
- the braid symmetry-breaking point, where the planar chart becomes the terminal-alignment slice of the nested shell braid;
- the photon channel, where two planarized pro/anti braid records form the coaxial contra-rotating pro/anti planar pair.

Taxonomically, this remains a chart label. It becomes `PL-NSH-0` evidence only when the local calculation is testing lower-rank nested shell retention on a declared branch record. It becomes `NSH-TERM` evidence only when the local calculation is the terminal hinge or braid symmetry-breaking boundary. In the photon-channel use, it is bridge evidence consumed by photon closure; it does not certify a Noether braid branch by itself.

The first planar discriminator is the reduced residual

$$
\mathcal{R}_{\mathrm{pl}}
=
\max\left(
d_{\mathrm{plane}},
d_{\mathrm{root}},
d_{\Theta},
d_{\mathbf{J}},
d_E,
d_{\mathrm{wake}},
d_{\mathrm{stab}}
\right),
$$

where $d_{\mathrm{plane}}$ measures coplanar sector support from the bivector Gram matrix, $d_{\mathrm{root}}$ measures same-row causal-root identity, $d_{\Theta}$ measures phase-bundle or return-period closure, $d_{\mathbf{J}}$ measures angular-momentum ledger closure, $d_E$ measures energy/action routing, $d_{\mathrm{wake}}$ measures causal-wake pullback and provenance closure, and $d_{\mathrm{stab}}$ measures branch stability over the declared event or positive-width branch domain. A planar frequency pattern is only a candidate until this residual closes on one retained row set.

### Local Black-Hole Duality Target

The nested shell braid should also be read as carrying the local black-hole dual inside its branch structure. This is not the claim that every Noether braid is an astrophysical black hole, and it does not import conventional primordial-black-hole population models. The claim is narrower: the nested shell braid already contains the same regime split that a macroscopic black hole exposes at large scale.

| Nested shell braid row | Local branch condition | Black-hole dual row |
| :--- | :--- | :--- |
| Inner binary | $s_I>c_f$ with accepted same-source roots | interior self-hit and maximal-curvature row |
| Middle binary | $s_M=c_f$ in the accepted threshold limit | horizon-interface and symmetry-breaking row |
| Outer binary | $s_O<c_f$ in ordinary operation, with $s_O\to c_f$ under terminal strong-field alignment | exterior coupling row driven toward the interface during collapse |

In this precise sense, a nested shell braid contains a primordial black-hole analogue: a finite local version of the horizon/interior split before that split is amplified into an observer-level compact object. The middle binary supplies the threshold interface, while the inner self-hit binary supplies the beyond-threshold interior row. The phrase "primordial black-hole analogue" is therefore a statement about nested shell braid ontology, not a claim that the standard primordial-black-hole model supplies the source mechanism.

The exact-duality theorem target is to construct a map from one retained branch record to one strong-field horizon record,

$$
\mathcal{D}_{\mathrm{BH}}:
B_q
\longmapsto
\left(
\mathcal{B}_{H}^{(q)},
\mathcal{L}_{\mathrm{int}}^{(q)},
\mathcal{L}_{\mathrm{rel}}^{(q)}
\right),
$$

where $\mathcal{B}_{H}^{(q)}$ is the horizon-interface label set inherited from the branch, $\mathcal{L}_{\mathrm{int}}^{(q)}$ is the retained self-hit interior ledger, and $\mathcal{L}_{\mathrm{rel}}^{(q)}$ is the release or exterior-coupling ledger. A useful residual has to vanish on the same root ledger:

$$
\mathcal{R}_{q\leftrightarrow H}
=
\max\left(
\left|1-\frac{s_M}{c_f}\right|,
\max\left(0,1-\frac{s_I}{c_f}\right),
d_{\mathrm{align}}(q),
d_{\mathrm{led}}\left(\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)},0\right),
d_{\mathrm{rel}}\left(\mathcal{L}_{\mathrm{rel}}^{(q)},\mathcal{B}_{H}^{(q)}\right)
\right).
$$

Here $d_{\mathrm{align}}$ measures coplanarity, co-linearity, and precession cessation in the declared branch coordinates; $d_{\mathrm{led}}$ measures energy, momentum, and angular-momentum ledger closure; and $d_{\mathrm{rel}}$ measures whether the release or exterior-coupling rows are inherited from the same horizon-interface label set rather than added as a second story. The duality claim is retained only if this residual closes with the branch dynamics. Otherwise the black-hole comparison remains a suggestive regime analogy, not an exact result.

### Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A)
$$

where $E_{\text{internal}}(A)$ is the closed internal causal-history energy ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed nested shell braid dynamics.

### Spiral-Helical Motion Picture

A resting nested shell braid is modeled as a nested, phase-locked structure with three coupled binary planes. When the braid moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the inner, middle, and outer layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

### All-Layer Translating Branch Response

A translating nested shell braid is not described by one outer radius alone. The hidden state includes all three shell radii, frequencies, characteristic speeds, axes, active causal roots, and wake exchange:
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
\right)_q
$$

The moving-branch extraction starts with a primitive drift band
$$
\mathcal{D}_{\beta_f}=\{\,0\le \|\mathbf{v}_{\text{trans}}\|/c_f\le\beta_{\max}<1\,\}
$$
All causal roots in the branch ledger are solved with $c_f$ and absolute time $t$. No dressed observer-channel speed is allowed inside this branch calculation.

The strict upper end of this drift band is kinematic. A leading-side partner row must be caught by a causal wake emitted from a source behind the receiver in the co-moving branch chart. If the center drift reaches $\|\mathbf{v}_{\text{trans}}\|\ge c_f$, that forward partner row has no positive-delay root, and the causal-root ledger starves on the leading side. The resulting speed-limit statement applies to sustained center translation of an internally bound branch; it does not prohibit inner-shell self-hit histories or other internal components from entering super-field-speed regimes relative to the primitive wake speed.

For the same admitted branch $q$, extract semiaxes from the cycle-averaged nested shell braid shape tensor
$$
Q_{ab}^{(q)}(\mathbf{v}_{\text{trans}})
=
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i
$$
With drift direction $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, define
$$
R_{\parallel,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}\hat e_{\parallel}^{b}},
\qquad
R_{\perp,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}}
$$
The physical branch period is extracted from a declared layer or composite phase on that same branch ledger:
$$
T_q(\mathbf{v}_{\text{trans}})
=
\frac{2\pi}{\langle\dot{\theta}_{q}\rangle_{\mathrm{cyc}}},
\qquad
T_{q,0}=T_q(\mathbf{0})
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
\sum_{\ell,\rho}N_{\ell\rho}^{(q)}
$$
Preserving the same branch means preserving this integer ledger, the source identities of the roots, their emission-order classes, the positive Jacobian floor, and the phase-return condition over the whole cycle.
Equivalently, let $\mathcal{H}_q$ be the ordered multiset of retained hit rows represented by $N_{\text{hits},q}$.

For a retained transverse closure row $a$ with rest closure length $\ell_a>0$, a translating receiver must intercept the wake after both the internal closure displacement and the center translation have occurred. In the reduced orthogonal row,
$$
c_f^2\left(\Delta t_a\right)^2
=
\ell_a^2
+
\|\mathbf{v}_{\text{trans}}\|^2\left(\Delta t_a\right)^2
$$
so
$$
\Delta t_a(\mathbf{v}_{\text{trans}})
=
\frac{\ell_a}{\sqrt{c_f^2-\|\mathbf{v}_{\text{trans}}\|^2}}
=
\frac{\Delta t_a(\mathbf{0})}
{\sqrt{1-\|\mathbf{v}_{\text{trans}}\|^2/c_f^2}}
$$
Thus any retained ledger that requires nonzero transverse closure rows has a larger absolute-time delay per such row when $\mathbf{v}_{\text{trans}}\ne\mathbf{0}$, unless the internal geometry retunes. A branch-period decomposition has the schematic form
$$
T_q(\mathbf{v}_{\text{trans}})
=
\sum_{a\in \mathcal{H}_q}
\Delta t_a(\mathbf{v}_{\text{trans}})
+
\mathcal{R}_{\mathrm{phase},q}
$$
where $\mathcal{R}_{\mathrm{phase},q}$ records finite-memory, inter-layer, and phase-return corrections on the same retained branch chart. The theorem target is:
$$
N_{\text{hits},q}(\mathbf{v}_{\text{trans}})=N_{\text{hits},q}(\mathbf{0}),
\quad
\nu_J^{(q)}>0,
\quad
\Delta_{\mathbf{k}}^{(q)}>0
\quad\Longrightarrow\quad
T_q(\mathbf{v}_{\text{trans}})\ge T_{q,0}
$$
with strict inequality for nonzero translation unless a compensating shape retuning changes the relevant $\ell_a$ rows. This is an absolute-time period theorem target, not a statement about observer clock time.

#### Mechanical Oblation From Receiver-Normal Wake-Flux Asymmetry

Receiver-normal branch strength is the dynamics-side mechanism behind the wake-flux change that standard field language would otherwise distribute across the effective electromagnetic connection, current/displacement terms, vector-potential curl, and the Noether sea response. For a retained root row $a=(i,j,t_0)$,
$$
D_{s,a}
=
c_f-\mathbf{v}_j(t_0)\cdot\hat{\mathbf r}_{ij}(t;t_0),
\qquad
D_{t,a}
=
c_f-\mathbf{v}_i(t)\cdot\hat{\mathbf r}_{ij}(t;t_0),
\qquad
W_a^{\mathrm{rec}}
=
\left|\frac{D_{t,a}}{D_{s,a}}\right|,
\qquad
w_a
=
\frac{W_a^{\mathrm{rec}}}{r_a^2}.
$$
The branch force contribution is proportional to $w_a\hat{\mathbf r}_a$. Decompose the transceiver velocities into center translation plus internal motion,
$$
\mathbf{v}_j(t_0)
=
\mathbf{v}_{\text{trans}}
+
\mathbf{u}_j(t_0),
\qquad
\mathbf{v}_i(t)
=
\mathbf{v}_{\text{trans}}
+
\mathbf{u}_i(t).
$$
On a retained chart away from grazing, translation enters both $D_{s,a}$ and
$D_{t,a}$. A longitudinal denominator effect is therefore not an oblation proof
unless the same retained row also carries the receiver-normal numerator. The
retained-row target is the receiver-normal anisotropy
$$
\Delta_w
\equiv
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\parallel}
-
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\perp}
\sim
\mathcal{R}_{\mathrm{rec}}
$$
on the same causal-root ledger. Here $\mathcal{R}_{\mathrm{rec}}$ records internal-motion, unequal-radius, finite-memory, unpaired-row, and receiver/source-normal correction terms.

For attractive partner rows, a positive receiver-normal longitudinal anisotropy would increase the cycle-averaged longitudinal restoring stiffness. If $K_{\parallel}^{(q)}$ and $K_{\perp}^{(q)}$ denote the Hessian projections of the retained branch potential reconstructed from the same receiver-normal rows, the oblation target is
$$
K_{\parallel}^{(q)}
>
K_{\perp}^{(q)}
\quad\Longrightarrow\quad
\frac{R_{\parallel,q}}{R_{\perp,q}}
\sim
\sqrt{\frac{K_{\perp}^{(q)}}{K_{\parallel}^{(q)}}}
<1
$$
The physical squash into an oblate $R_{\parallel}<R_{\perp}$ branch is therefore not imported from a relativistic metric. In the canonical Master EOM it must be read as the mechanical response to receiver-normal wake-flux asymmetry created by translating the same causal-root ledger through the Euclidean void; any stiffness estimate that lacks same-record $D_T/D_s$ branch strength is a restart target.

A one-$h$ closed-cycle action transaction is a candidate map between stable branch states,
$$
B_q(\mathbf{v}_{\text{trans}})
\longrightarrow
B_{q'}(\mathbf{v}_{\text{trans}}+\Delta\mathbf{v})
$$
subject to the all-layer action and energy ledgers
$$
\Delta A_{\mathrm{cyc}}\equiv\Delta A_{\text{cycle}}=\sigma h,
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}=\sigma\hbar
$$
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}
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
\omega_\ell=2\pi\nu_\ell
$$

The layer-speed identities give the first kinematic constraint:

$$
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}
$$

The simple inverse rule $\Delta\ln R_\ell=-\Delta\ln\nu_\ell$ is therefore valid only on a sub-branch where $\Delta\ln s_\ell=0$. The ordinary nested shell braid speed hierarchy instead imposes inequalities and hinge tolerances:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f
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
\Delta\mathbf{y}
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
=0
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
\right)
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
\right)
$$

This map is falsifiable at the branch level. It fails if no admissible minimizer exists, if the minimizer crosses a separator while being treated as same-branch drift, if the middle hinge leaves its declared tolerance, if the envelope projection and branch-period stretch come from different retained ledgers, or if the wake-ledger residual is large enough to survive hierarchy averaging. These are not bookkeeping nuisances; they are the diagnostics that decide whether the same one-$h$ transaction can become the Noether sea cadence current used in cosmology.

The first reduced validation model for this target is [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), with runtime script `scripts/nested-shell-braid/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

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
\right)
$$
Every entry is computed in absolute time from the retained causal-root chart. Later observer-inference chapters may ask whether this packet recovers clock behavior, ruler behavior, photon synchronization, or effective geometry. Those are downstream recovery tests. They are not definitions, assumptions, or integration variables in nested shell braid dynamics.

### Terminal Alignment Label-Count Target

The black-hole entropy route requires a dynamics-side label calculation. Once a nested shell braid branch is driven to terminal alignment, the dynamics should output the admissible alignment-restricted closure labels and their neighbor-compatibility rules. For a connected block $U$ of horizon-adjacent alignment patches, the object is
$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\text{all layer ledgers close, edge wake ledgers match, and } \theta \text{ is preserved}
\right\}
/
\sim_{O,\theta,W}
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
\lambda,\lambda'\in\Lambda_{\theta}^{\mathrm{loc}}
$$
This is a counting matrix, not a thermodynamic weight. For an open strip of $N$ patches,
$$
\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\mathbf{1}^{T}
\mathsf{T}_{\theta,\nu}^{N-1}
\mathbf{1}
+
\mathcal{O}(\epsilon_{\mathrm{edge}})
$$
while a periodic strip uses $\mathrm{Tr}(\mathsf{T}_{\theta,\nu}^{N})$. If the label set is finite and the transfer rule is local, the strip entropy density is
$$
s_{\mathrm{align}}(\theta;\nu)
=
\lim_{N\to\infty}
\frac{1}{N}
\log\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\log\rho(\mathsf{T}_{\theta,\nu})
$$
where $\rho$ is the spectral radius. In a two-dimensional patch network the same target becomes the subadditive pressure
$$
s_{\mathrm{align}}(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U(\theta)\right|
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
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
$$
The horizon target is
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
\longrightarrow
\frac{1}{4}
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
\epsilon_{\mathrm{quot}}
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
\frac{s_N(\theta)}{a_N(\theta)}
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
\right)
$$
Here $\epsilon_{\mathrm{area}}$ records how much the patch-area assignment varies across the retained block, $\epsilon_{\mathrm{cons}}$ is the conservation-ledger residual, and $\epsilon_{\mathrm{var}}$ is the action-variation residual inherited from the terminal branch scaffold below. This object is the right simulation output: it can pass, fail, or converge under refinement without turning the coefficient into a definition.

**Reduced-adapter status.** The reduced circular packet family does not converge to the target coefficient. In the tested $3\le n\le5$ packets, the edge proxy gives
$$
\bar{\alpha}_8=0.22397,
\qquad
\bar{\alpha}_{16}=0.11198,
\qquad
\bar{\alpha}_{32}=0.05599
$$
while the widened $3\le n\le6$ packet gives
$$
\bar{\alpha}_{16}=0.14391,
\qquad
\bar{\alpha}_{32}=0.07196
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
\Delta\Pi=(\Delta E,\Delta\mathbf{p},\Delta J,\Delta q)
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
\right\|
$$
The executable also records the branch-summed receiver residual after the direct inverse-square term is removed:
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
\right\|
$$
where $\alpha$ ranges over sampled receiver phase keys. The dynamics-backed transfer predicate is therefore the earlier edge-match condition plus closure of the paired source-recoil ledger, the cycle residual, and $\epsilon_{\mathrm{sum}}$; $\epsilon_{\mathrm{stat}}$ remains an obstruction diagnostic. In the current executable packet this `terminal_dynamic` transfer has zero accepted edges. With $3\le n\le5$, `phase-samples = 12`, and the layer-sum area proxy, the edge-only coefficient is $\bar{\alpha}_{16}=0.09174$, but the terminal-dynamic coefficient is undefined; $\epsilon_{\mathrm{stat}}^{\max}$ is about $166.83$ and $\epsilon_{\mathrm{sum}}^{\max}$ is about $607.78$. With $3\le n\le6$, the edge-only coefficient is $\bar{\alpha}_{16}=0.12120$, while the terminal-dynamic transfer remains empty; $\epsilon_{\mathrm{stat}}^{\max}$ rises to about $322.67$ and $\epsilon_{\mathrm{sum}}^{\max}$ rises to about $1729.02$. Thus the obstruction is not merely the observer quotient or area normalization. The reduced concentric terminal ansatz fails the action-variation and cycle-support tests before it can become a horizon-interface transfer system.

The first bounded branch-family variation gives the same conclusion. The executable phase-offset family keeps the centers concentric but changes the layer phases by
$$
\phi_I=-2\pi f,
\qquad
\phi_M=2\pi f,
\qquad
\phi_O=0
$$
with tested offsets $f=1/8$ and $f=1/4$. These packets raise the delayed inter-layer root inventory to $288$ sampled roots per candidate, but the terminal-dynamic transfer still has zero accepted edges under both coarse and strict quotients. For $3\le n\le5$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.09174$ while $\epsilon_{\mathrm{stat}}^{\max}$ is about $179.54$ at $f=1/8$ and about $166.83$ at $f=1/4$; the corresponding $\epsilon_{\mathrm{sum}}^{\max}$ values are about $608.87$ and $626.17$. For $3\le n\le6$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.12120$, $\epsilon_{\mathrm{stat}}^{\max}$ reaches about $322.67$, and $\epsilon_{\mathrm{sum}}^{\max}$ reaches about $2067.83$. A bounded phase offset therefore does not rescue the reduced circular terminal ansatz.

The first shifted-center branch family is negative as well. The executable `shifted-center` family keeps the circular speeds and layer phases fixed, but places the three circular centers at
$$
\mathbf{c}_I=(-\epsilon_c R_O,0),
\qquad
\mathbf{c}_M=\left(\frac{\epsilon_c R_O}{2},\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
\qquad
\mathbf{c}_O=\left(\frac{\epsilon_c R_O}{2},-\frac{\sqrt{3}\epsilon_c R_O}{2}\right)
$$
where $R_O=1/\omega_O$ is the outer alignment radius and $\epsilon_c$ is the tested center-shift fraction. Runs at $\epsilon_c=0.01$, $0.05$, and $0.10$ again raised the delayed inter-layer inventory to $288$ sampled roots per candidate, but they produced zero terminal-dynamic transfer edges. The $\epsilon_c=0.05$ and $\epsilon_c=0.10$ packets were empty even at the edge-proxy level for $3\le n\le5$ and $3\le n\le6$. The smaller $\epsilon_c=0.01$ packet produced only one widened edge-proxy edge at $3\le n\le6$, with zero finite-block coefficient and still no terminal-dynamic edge. The sampled stationarity residuals remained large: $\epsilon_{\mathrm{stat}}^{\max}$ was about $620.96$ to $1026.11$ for $\epsilon_c=0.01$, about $965.98$ to $1103.36$ for $\epsilon_c=0.05$, and about $693.97$ for $\epsilon_c=0.10$; the branch-summed residual was larger still, reaching about $9243.89$, $4569.36$, and $5941.09$ respectively. Thus small shifted centers make the reduced chart more brittle rather than more entropy-bearing. The next useful variation must change the action kernel, the wake-memory ledger, or the observer quotient, not merely the first-order circular geometry.

At the present derivation level, the admissible one-patch labels can be enumerated as a finite branch-ledger schema, not yet as a numerical table. For a primitive outer-period closure, the integer-lock notation gives
$$
(k_I,k_M,k_O)=(n,m,1),
\qquad
1<m<n
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
\right\}
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
\right\}
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
\right)
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
\sim_{O,\theta,W}
$$

This makes the next missing equations precise. To turn the schema into an actual transfer matrix, the dynamics must supply: first, the terminal branch equations fixing $(s_\ell,R_\ell,\omega_\ell,\mathbf{A}_\ell)$ under $v_M=c_f$, $v_O\to c_f$, and coplanar/co-linear alignment; second, the inter-layer maps that reduce $\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}}$ to boundary wake data; and third, the observer-record quotient that decides which edge distinctions remain visible in $\theta$.

An edge-map scaffold can be written before the terminal branch is numerically solved. Let $\mathbf{n}_{\nu}$ be the outward unit normal for the chosen local edge direction, and let $\mathcal{B}_{\mathrm{term}}(\lambda)$ be the finite set of active layer and inter-layer causal branches retained by the terminal one-patch label. Each branch $b\in\mathcal{B}_{\mathrm{term}}(\lambda)$ has a source $j_b$, receiver $o_b$, emission time $t_{0,b}$, reception time $t_b$, winding or root index $r_b$, root type $\tau_b\in\{\text{self},\text{partner},\text{inter-layer}\}$, line of action
$$
\hat{\mathbf{r}}_b
=
\frac{\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})}
{\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|}
$$
and source-normal causal Jacobian
$$
J_b
=
1
-
\frac{\mathbf{v}_{j_b}(t_{0,b})\cdot\hat{\mathbf{r}}_b}{c_f}
$$
with
$$
D_{s,b}
=
c_f-\mathbf{v}_{j_b}(t_{0,b})\cdot\hat{\mathbf{r}}_b,
\qquad
D_{t,b}
=
c_f-\mathbf{v}_{o_b}(t_b)\cdot\hat{\mathbf{r}}_b,
\qquad
W_b^{\mathrm{rec}}
=
\left|\frac{D_{t,b}}{D_{s,b}}\right|.
$$
The branch is admissible only when its causal-root equation closes,
$$
\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|
=
c_f(t_b-t_{0,b}),
\qquad
D_{s,b}\ne0
$$
and the terminal label also satisfies the integer-lock and alignment constraints
$$
\omega_O T=2\pi,\qquad
\omega_M T=2\pi m,\qquad
\omega_I T=2\pi n
$$
$$
s_M=c_f,\qquad
s_O\to c_f,\qquad
\max_{\ell,\ell'}\arccos(\hat{\mathbf{A}}_\ell\cdot\hat{\mathbf{A}}_{\ell'})\to0
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
\right\}
$$
This equation is the derived projection target: it reduces each terminal one-patch branch ledger to the wake data presented across one edge. The still-open numerical step is solving $\mathcal{B}_{\mathrm{term}}(\lambda)$ from the full three-layer state-dependent delayed equations, including the regularized action and energy ledger that assigns the conserved increments used in $\mathcal{C}_{\theta,\nu}$.

The reduced terminal branch system can be stated as a finite residual problem on the primitive outer period. Choose $T>0$ and integers $1<m<n$, set
$$
\omega_O=\frac{2\pi}{T},
\qquad
\omega_M=m\omega_O,
\qquad
\omega_I=n\omega_O
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
\alpha\in\{+1,-1\}
$$
where $\mathbf{e}(\psi)$ is the unit vector in the common terminal plane. The phase-lock and terminal-alignment constraints are
$$
\phi_M-m\phi_O=\phi_{MO}^{\ast},
\qquad
\phi_I-n\phi_O=\phi_{IO}^{\ast}
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
0
$$
with $0<\Delta_b\le H_{\lambda}$ for the finite history window assigned to $\lambda$, layer pair $(\ell_j,\ell_o)\in\{(I,M),(I,O),(M,O),(M,I),(O,I),(O,M)\}$, signs $\alpha_j,\alpha_o\in\{+1,-1\}$, and emission phase recorded modulo $T$. The branch is kept in $\mathcal{B}_{\mathrm{term}}(\lambda)$ only if it is transversal,
$$
J_b
=
1
-
\frac{\mathbf{v}_{\ell_j,\alpha_j}(t_b-\Delta_b)\cdot\hat{\mathbf{r}}_b}{c_f}
\ne0
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
0
$$
with the same branch set also satisfying the local conservation ledger
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left(
\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b
\right)
=
(0,\mathbf{0},\mathbf{0},0)
$$
This defines the reduced solve: $\mathcal{B}_{\mathrm{term}}(\lambda)$ is the finite set of intra-layer and inter-layer roots satisfying the terminal kinematics, transversality, cycle-averaged dynamics, conservation ledger, and observer quotient. A numerical enumeration targets these equations directly; if no solution has $|J_b|$ bounded away from zero, the label must be reclassified as a grazing boundary case rather than counted as an interior transfer-matrix state.

In the symmetric common-center specialization, the inter-layer root problem reduces to scalar root curves over the outer phase. Set
$$
\mathbf{c}_I=\mathbf{c}_M=\mathbf{c}_O,
\qquad
q_I=n,\quad q_M=m,\quad q_O=1,
\qquad
u=\omega_O t\pmod{2\pi}
$$
and introduce dimensionless layer radii
$$
x_\ell
=
\frac{\omega_O R_\ell}{c_f}
=
\frac{s_\ell/c_f}{q_\ell}
$$
For a branch from source layer $\ell_j$ and sign $\alpha_j$ to receiver layer $\ell_o$ and sign $\alpha_o$, write the outer-period delay as $\delta=\omega_O\Delta$. The phase separation is
$$
\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
(q_o-q_j)u
+
q_j\delta
+
\phi_o-\phi_j
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
0<\delta\le \omega_O H_{\lambda}
$$
The corresponding inter-layer Jacobian reduces to
$$
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
1
-
\alpha_o\alpha_j
\frac{(s_j/c_f)x_o}{\delta}
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
$$

Thus an inter-layer entry of $\mathcal{B}_{\mathrm{term}}(\lambda)$ is not an arbitrary phase sample. It is a smooth $2\pi$-periodic root curve $\delta_b(u)$ of the scalar equation above, with $|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))|$ bounded away from zero and with the same emission-order class over the full outer period. The intra-layer pieces remain the self-hit and partner-hit equations already listed for each $\ell$. In this symmetric special case, the unknowns left for enumeration are therefore
$$
(m,n),\quad
(x_I,x_M,x_O),\quad
(\phi_{MO}^{\ast},\phi_{IO}^{\ast}),\quad
\{\delta_b(u)\}_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
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
\delta^2
$$
The causal-root equation is equivalent to $F_{jo}^{\alpha_j\alpha_o}(u,\delta)=0$ with $\delta>0$, and, using $q_jx_j=s_j/c_f$, its delay derivative is
$$
\partial_{\delta}F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
-2\delta\,
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
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
}
$$

This turns the symmetric terminal branch problem into a compact root-curve test before the force residual is evaluated. Any inter-layer root must lie in the geometric delay strip
$$
|x_o-x_j|
\le
\delta
\le
\min\{x_o+x_j,\omega_OH_{\lambda}\}
$$
For fixed $(m,n)$, radii, and relative phases, an interior inter-layer ledger is admissible only if its initial roots at one outer phase continue around the full $2\pi$ period as closed curves $\delta_b(u)$ that remain inside this strip, satisfy a uniform floor
$$
\delta_b(u)\ge\epsilon_{\delta}>0,
\qquad
\left|
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
\right|
\ge
\epsilon_J>0
$$
and preserve the declared emission-order and observer-record class. Failure of the delay strip rejects the candidate kinematically; failure of the Jacobian floor places it in the grazing boundary class; failure of closed return changes the root ledger over one outer period. Passing this scalar certificate is still not terminal-branch existence, because $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$ and the conservation ledger must still close, but it is the first finite rejection and continuation criterion for candidate $(m,n)$ branch labels.

The same chart projects the force residual once a certified root curve and same-record receiver-normal branch-strength row are supplied. Let $q_{\ell,\alpha}^{\mathrm{pol}}=\sigma_{\ell,\alpha}\epsilon$ denote the polarity bookkeeping unit carried by the architrino on layer $\ell$ and sign $\alpha$, distinguishing it from the layer frequency integer $q_\ell$. Write the signed coefficient inherited from the canonical per-hit law as
$$
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
=
\kappa\,
\operatorname{sign}(q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}})
\left|q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}}\right|
\frac{\omega_O^2}{c_f^2}
$$
For a certified inter-layer curve $\delta_b(u)$, the circular-frame radial component, positive outward from the common center of the receiver layer, is
$$
a_{jo,r}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
x_o-\alpha_o\alpha_j x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
and the tangential component, positive in the receiver's instantaneous direction of motion, is
$$
a_{jo,\tau}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
\alpha_o\alpha_j x_j
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
These formulas are the current canonical line-of-action acceleration projected onto the two circular-frame basis vectors. The source-normal denominator remains part of $W^{\mathrm{rec}}$ through $D_s$, so the formulas are not active closure evidence until the same retained row supplies $D_s$, $D_T$, and $W^{\mathrm{rec}}$. The intra-layer self-hit and partner-hit pieces use the same projection after substituting their own certified delay roots from the binary branch chart.

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
a_{b,\tau}(u)
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
0
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
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
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
du
$$
Since the integrand is non-negative on a smooth certified branch, $\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}=0$ is equivalent to $\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)=0$ and $\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)=0$ for the full outer period. This is the residual projection that can select or reject candidate integer locks after the scalar root curves are known. The remaining missing closure is the signed branch-strength and conservation assignment: without the polarity factors, regularized intra-layer branch weights, and conserved increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$, the chart can reject kinematic and force-residual failures but cannot yet prove that a particular $(m,n)$ is the terminal solution.

The branch-strength closure data can be stated without adding another gate. For every admitted branch $b$, the terminal ledger must record
$$
b
\mapsto
\left(
j_b,o_b,\tau_b,\delta_b(u),\hat{\mathbf{r}}_b(u),J_b(u),
D_{s,b}(u),D_{t,b}(u),W_b^{\mathrm{rec}}(u),
q_{j_b}^{\mathrm{pol}},q_{o_b}^{\mathrm{pol}},w_b^{(\eta)}(u)
\right)
$$
where $j_b$ and $o_b$ are the source and receiver architrinos, $\tau_b$ is the hit type, $D_{s,b}$ is the source-normal denominator, $D_{t,b}$ is the receiver-normal numerator, $W_b^{\mathrm{rec}}=\lvert D_{t,b}/D_{s,b}\rvert$, and $w_b^{(\eta)}$ is the regularized inverse-square receiver-normal weight assigned to that branch. On a sharp transversal inter-layer branch,
$$
w_b^{(0)}(u)
=
\frac{\omega_O^2}{c_f^2}
\frac{W_b^{\mathrm{rec}}(u)}
{\left(\delta_b(u)\right)^2}
$$
while intra-layer self-hit and partner-hit entries use the corresponding binary-root delay, source-normal denominator, and receiver-normal numerator. The branch acceleration is then the canonical per-hit law in ledger form,
$$
\mathbf{a}_b^{(\eta)}(u)
=
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(\eta)}(u)
\hat{\mathbf{r}}_b(u)
$$
The sharp limit is acceptable only when the positive delay and Jacobian-floor certificate above holds; otherwise the branch must retain its regularized weight and remain a boundary case rather than an interior terminal label.

The conservation increments attached to a branch must separate mechanical exchange from wake-history bookkeeping. Over one outer period,
$$
\Delta E_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\cdot\mathbf{v}_{o_b}(u)\,du
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
\mathbf{x}_{o_b}(u)\times\mathbf{a}_b^{(\eta)}(u)\,du
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
\Delta\mathbf{p}_b^{\mathrm{wake}}
$$
$$
\Delta\mathbf{J}_b
=
\Delta\mathbf{J}_b^{\mathrm{mech}}
+
\Delta\mathbf{J}_b^{\mathrm{wake}}
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
\mathbf{0}
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
0
$$
This completes the local bookkeeping needed for terminal enumeration: a candidate $(m,n)$ must pass scalar root continuation, force-residual cancellation, and the history-aware conservation ledger on the same branch set. What remains unsolved is not another requirement artifact but the derivation of $w_b^{(\eta)}$ and the wake-history increments from a time-translation- and Euclidean-invariant regularized action for the coupled three-layer branch.

The minimal action-level scaffold is the pullback of the exact causal-delay action in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) to the certified terminal branch chart. For branch $b$, set
$$
t=\frac{u}{\omega_O},
\qquad
t_b^0(u)=t-\Delta_b(u),
\qquad
r_b(u)=\frac{c_f}{\omega_O}\delta_b(u)
$$
The sharp branch density inherited from the exact $1/r$ causal kernel is
$$
\mathcal{I}_b^{(0)}(u)
=
\frac{1}{c_f}
\frac{1}{r_b(u)|J_b(u)|}
=
\frac{\omega_O}{c_f^2}
\frac{1}{\delta_b(u)|J_b(u)|}
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
\mathcal{I}_b^{(\eta)}(u)
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
\,w_b^{(0)}(u)
\hat{\mathbf{r}}_b(u)
$$
up to the sign convention fixed by writing the interaction term with a minus sign in the action. In other words, $w_b^{(\eta)}$ is not an independent fitting weight. It is the Euler-Lagrange pullback of the regularized causal kernel on a certified branch chart.

The strongest current action-kernel candidate is not the diagnostic same-support inverse-square adapter. Pull back the delayed-interior characteristic-tail kernel from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) before reducing to a one-period branch density. For the two-time branch, define the local characteristic coordinate
$$
u_b^{\mathrm{c}}(t_1,t_0)
=
g_b(t_1,t_0)
+
\frac{r_b(t_1,t_0)}{c_f}
$$
After endpoint-clear normalization, the candidate branch kernel is
$$
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\int_{-\infty}^{g_b(t_1,t_0)}
\frac{\delta_\eta(s)}
{c_f\left(u_b^{\mathrm{c}}(t_1,t_0)-s\right)^2}
ds
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
\frac{\delta_\eta(g_b)}{r_b^2}
$$
This is the action-level object that can replace the diagnostic inverse-square adapter once the Noether boundary terms below are computed from the same kernel. Until then, terminal enumerator rows using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ remain diagnostic branch-force rows rather than a completed action derivation.

The sharp receiver-side variation can be separated before the root is integrated out. Write the two-time branch kernel as
$$
\mathcal{L}_b^{(0)}(t_1,t_0)
=
\frac{1}{c_f}
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b(t_1,t_0)}
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
\|\mathbf{x}_{o_b}(t_1)-\mathbf{x}_{j_b}(t_0)\|
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
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1)
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
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1)
$$
The first term gives the source-normal part of the terminal branch scale after the causal root is selected:
$$
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b^2(t_1,t_0)}
=
\frac{1}{r_b^2(t_1,t_b^0)|D_{s,b}(t_1,t_b^0)|}
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{\delta_b^2(u)|D_{s,b}(u)|}
=
w_{b,\mathrm{src}}^{(0)}(u)
$$

The active force-law branch strength still requires the receiver-normal numerator, so the terminal ledger must promote $w_b^{(0)}=(\omega_O^2/c_f^2)W_b^{\mathrm{rec}}/\delta_b^2$ only after $D_{t,b}$ is recorded on the same retained branch. The second term is the nontrivial root-constraint variation. It cannot be dropped after the branch has been pulled back to $\delta_b(u)$. The terminal-chart variation proof closes exactly when the regularized two-time action satisfies, for every compactly supported or period-matched receiver variation,
$$
\lim_{\eta\to0}
\left[
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b(t_1,t_0))}{c_f r_b(t_1,t_0)}
\hat{\mathbf{r}}_b(t_1,t_0)
\right]_{\mathrm{int}}
=
\mathbf{0}
$$
where the subscript $\mathrm{int}$ means after the source-side variation, integration by parts on the root-selected chart, and the Noether boundary term have been accounted for. Equivalently, all interior force density left by varying the causal constraint must cancel into the boundary wake increments rather than adding a second independent line-of-action force. This is the exact missing identity for a complete terminal-chart variation proof. The direct $1/r$ variation supplies the source-normal scale coefficient $w_{b,\mathrm{src}}^{(0)}$; the remaining proof burden is to show that the $\delta_\eta'(g_b)$ contribution is a boundary/source-side term, vanishes under a local stationarity condition, or is cancelled by a declared counterterm under the same symmetry-preserving regularization used for the conservation ledger while the same branch records $D_{t,b}$ for $W_b^{\mathrm{rec}}$.

This identity can be narrowed one step further. On a transversal branch,
$$
\partial_{t_0}g_b(t_1,t_0)
=
-J_b(t_1,t_0)
$$
so
$$
\delta_\eta'(g_b)
=
-
\frac{1}{J_b}
\partial_{t_0}\delta_\eta(g_b)
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
\right]
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
\right]
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
\mathbf{0}
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
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0)
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
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0)
$$
On a future-reception chart for the same branch,
$$
\partial_{t_1}g_b(t_1,t_0)
=
1-\frac{\hat{\mathbf{r}}_b(t_1,t_0)\cdot\mathbf{v}_{o_b}(t_1)}{c_f}
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
\right]
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
\right|_{t_0=t_b^0}
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

For the same causal-surface local scalar class, this counterterm route is ruled out. A scalar term $a(r_b,J_b)\delta_\eta(g_b)$ must choose $a=-1/r_b$ to cancel the derivative-of-delta coefficient, but that same choice changes the direct source-normal scale contribution. The finite local delta-jet extension has the same obstruction. In the common-center inter-layer chart, the stationarity option is also ruled out by the lemma below. The terminal branch proof should therefore test branch-summed residual closure directly with $D_s$, $D_T$, and $W^{\mathrm{rec}}$ on the same retained rows; otherwise the remaining action-level option is the nonlocal characteristic-tail repair target from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian), or a richer velocity/history-dependent invariant mechanism. Neither option is a fitted scalar patch.

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
\|\mathbf{Y}_b(u,\delta)\|
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
\mathbf{0}
$$
The vector derivative can vanish only if $\partial_\delta\mathbf{Y}_b$ is parallel to $\mathbf{Y}_b$. But
$$
\partial_\delta\mathbf{Y}_b
=
\alpha_j q_j x_j\,
\mathbf{e}_{\perp}(q_j(u-\delta)+\phi_j)
$$
so parallelism forces the separation to be tangent to the source circle:
$$
\mathbf{Y}_b\cdot\mathbf{e}(q_j(u-\delta)+\phi_j)
=
0
\quad\Longleftrightarrow\quad
\alpha_o x_o\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
\alpha_j x_j
$$
On this tangent subcase, $\rho_{b,\delta\delta}=0$ and $J_b=1-\rho_{b,\delta}$. The remaining scalar stationarity condition reduces to
$$
\partial_\delta(\rho_bJ_b)
=
\rho_{b,\delta}(1-\rho_{b,\delta})
=
0
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
\right|_{\delta=\delta_b(u)}
$$
Using $t_0=t_1-\delta/\omega_O$, $r_b=(c_f/\omega_O)\rho_b$, and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the sharp receiver-side interior term becomes
$$
\mathbf{C}_{b}^{(0)}(u)
=
-
\frac{\omega_O^2}{c_f^2}
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
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
\text{for all }u
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
dt_0\,dt_1
$$
where $\mathcal{K}_{b}^{(\eta)}$ is the weighted regularized causal kernel restricted to branch $b$,
$$
\mathcal{K}_{b}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
\frac{\delta_\eta(g_b(t_1,t_0))}
{r_b(t_1,t_0)}
$$
for the pure scalar scaffold. For the delayed-interior characteristic-tail candidate, the branch kernel is instead
$$
\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
$$
with the trivial self-coincidence branch excluded in either case. Over one outer period,
$$
\Delta E_b^{\mathrm{wake}}
=
E_{b}^{\mathrm{wake}}(T)-E_{b}^{\mathrm{wake}}(0)
$$
The momentum and angular-momentum wake increments are the corresponding spatial-translation and rotation boundary terms:
$$
\Delta\mathbf{p}_b^{\mathrm{wake}}
=
\mathbf{P}_b^{\mathrm{wake}}(T)-\mathbf{P}_b^{\mathrm{wake}}(0),
\qquad
\Delta\mathbf{J}_b^{\mathrm{wake}}
=
\mathbf{J}_b^{\mathrm{wake}}(T)-\mathbf{J}_b^{\mathrm{wake}}(0)
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
\Delta\mathbf{J}_b^{\mathrm{wake}}
$$
with the mechanical increments already written above. Therefore a terminal branch proof has a precise action-level target: derive $\mathcal{I}_b^{(\eta)}$ from the normalized delayed-interior kernel, prove that its branch variation gives $w_b^{(\eta)}$ with the derivative-of-constraint residual cancelled by the receiver-gradient identity, and show that the Noether boundary terms close over the same certified branch set. Until those three steps are complete, the action scaffold supplies a constrained proof route and a rejection test, not a solved terminal $(m,n)$ selection.

The Master Equation fixes the normalized delayed-interior kernel and its energy, momentum, and angular-momentum wake-history boundary increments. The terminal-alignment proof must pull those increments back to the finite terminal branch chart, evaluate the resulting $\Delta E_b^{\mathrm{wake}}$, $\Delta\mathbf{p}_b^{\mathrm{wake}}$, and $\Delta\mathbf{J}_b^{\mathrm{wake}}$, and prove that the mechanical plus wake ledger closes on the same rows that pass the force-residual and root-ledger tests. Until that branch-summed evaluation passes, the terminal rows remain a diagnostic action packet rather than a solved terminal $(m,n)$ selection.

The concrete terminal-chart conservation test is the pullback of the Master Equation charges to $\mathcal{B}_{\mathrm{term}}(\lambda)$. Each retained row must emit
$$
\left(
j_b,o_b,\tau_b,\ell(j_b),\ell(o_b),t_{0,b},t_b,\Delta_b,
r_b,\hat{\mathbf r}_b,g_b,u_b,J_b,
K_{b,\mathrm{eff}}^{(\eta)},
\partial_{t_b}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)},
\nabla_{\mathbf{x}_{o_b}(t_b)}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}
\right)
$$
using the action-level causal scalar
$$
g_b(t_b,t_{0,b})
=
t_b-t_{0,b}
-
\frac{r_b(t_b,t_{0,b})}{c_f}
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
\mathbf{P}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
$$
\boldsymbol{\mathcal{J}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech},\lambda}
+
\mathbf{J}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
The terminal label is conserved only when the increments of all three totals vanish within the declared branch tolerance, after subtracting the Euler-residual and endpoint-leakage terms. The projected action increment $\Delta I_{\mathrm{ME}}$ and any torque integral remain numerical diagnostics until these three totals close on the same $\mathcal{B}_{\mathrm{term}}(\lambda)$ rows.

This scaffold identifies the smallest missing dynamics. The delayed equations must enumerate $\Lambda_{\theta}^{\mathrm{loc}}$ and derive the edge maps $\mathcal{E}_{\nu}^{\pm}$ from the terminal aligned branch. [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md) supplies the candidate integer phase lattice, and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#self-hit-definition-and-diagnostics) supplies the self-hit and partner-hit root vocabulary, but neither document yet computes the terminal aligned edge projections from the full three-layer dynamics.

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
2. Model the nested shell braid as inner engine, middle fulcrum, and outer shielding/interface shell.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local cycle-period diagnostics from the absolute cycle-stretch theorem target.
5. Solve all-layer branch updates for one-$h$ transactions and extract the branch-indexed period-stretch and envelope-oblation records.
6. Compute the terminal-alignment area-normalized label density $\bar{\alpha}_{\mathrm{align}}=s_{\mathrm{align}}/a_{\theta}$ from alignment-restricted closure labels, patch-area normalization, and edge wake compatibility.
7. Output alignment, closure, Floquet, grazing, branch-residual, and observer-export diagnostics.
8. Keep mass, photon, equivalence-principle, and full observer-geometry matching claims outside the primitive dynamics layer until their proof burdens close.

### Working Hypotheses

1. The formed nested shell braid has stable invariants ($R_{\text{braid}}$, $\omega_{\text{braid}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity may produce an oblate causal envelope that drives planar alignment in the terminal rung; this remains a working hypothesis until the swept-volume and branch-stability tests close.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

### Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **Partner/exterior comparison regime** (CFT bridge label) | Typically in self-hit branch ($\|\mathbf{v}\| \gtrsim c_f$ history-supported) | Near the hinge scale ($\|\mathbf{v}\| \approx c_f$) in working models | Typically $\|\mathbf{v}\| < c_f$ | Hierarchical nested shell braid operation and ordinary ladder behavior |
| **Terminal-alignment interface** (holographic bridge label) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **Self-hit interior comparison regime** (AdS bridge label) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$\|\mathbf{v}\| < c_f$" or "$\|\mathbf{v}\| = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Primitive envelope and closure diagnostics use the causal speed $c_f$. Downstream observer-channel dressing is not part of this branch scan. The corresponding kinematic parameter is
$$
\beta_f=\frac{v_{\text{trans}}}{c_f}
$$
Primitive dynamics scans must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic. Any $c_{\text{eff}}$ comparison belongs to a downstream observer-channel map.

---

### Geometry Focus

#### A) High Group Velocity Geometry (Oblate Spheroidal Envelope)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an oblate spheroidal envelope
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Use the kinematic contraction law as a theorem target to be derived from branch dynamics:
$$
\beta_f = \frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp\sqrt{1-\beta_f^2}
$$
As $\beta_f \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the primitive causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta_f^2}
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta_f^2}$, which is the triangle form of the oblate spheroidal envelope theorem target rather than a completed recovery.

**Impact on delay locking:** The round-trip delay $\Delta t_{\text{rt}}$ is the time between an outer-binary architrino’s emission and the moment its wake returns to influence that same architrino, approximating the inner and middle binaries as a compact subsystem at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the oblate spheroidal envelope is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}
$$
Then $\Delta t_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(t)$ so
$$
V(t) = \frac{4\pi}{3} R_\perp(t)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(t)}{c_f}\right)^2}
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

**Modeling at $v>0$:** Use the oblate spheroidal envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the minimal system; treat results as lower bounds until the swept-volume effect is added.

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
and, for the oblate-envelope-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how one sector's phase-closure period compares to the reference cadence:
$$
T_{\text{local}}(\theta) = T_0 \, \alpha(\theta, G_{\text{grad}})
$$
When $\alpha > 1$, local cycles are longer relative to $T_0$; when $\alpha < 1$, they are shorter. This sector-delay diagnostic remains an absolute-time branch-period record. It can be exported downstream only after the accepted branch functional $T_q(v,G_{\text{grad}})$ is derived from the full cycle and matched to the retained causal-root ledger.

**Geometric source of period shift:** The causal envelope shape sets $\Delta t_{\text{rt}}$. As the nested shell braid tilts out of planar alignment and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Primitive translation parameter:** For the branch scan, use
$$
\beta_f=\frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp \sqrt{1-\beta_f^2}
$$
Geometrically, $\beta_f$ is the primitive axis-squash control: as $\beta_f \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local cycle frequency as $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Longer causal loops (larger $\alpha$) yield lower cycle frequency at fixed absolute-time reference; any redshift interpretation belongs downstream.

---

### Minimal Models

#### Nested Shell Braid Baseline (Inner + Middle Fixed)

**Focus:** Treat the inner and middle binaries as a formed subsystem with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{braid}}$, $\omega_{\text{braid}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any subsystem element rides $\|\mathbf{v}\| = c_f$ continuously.

#### Outer-Binary Delay Loop Model with Formed Subsystem

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner and middle binaries modeled as a rigid subsystem with fixed timescales.
- Outer binary orbits that subsystem with non-coplanar planes initially.
- Translational speed $\mathbf{v}_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use oblate-envelope-based $\Delta t_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
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

**Floquet basin-robustness gap:** For a periodic nested shell braid state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|
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
\mathcal{D}_{\mathrm{NSH}}(W)
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
\right)_W
$$
The spacetime and observer-inference chapters may convert this packet into lapse, ruler, signal, connection, and weak-field comparison variables. This chapter's obligation is narrower: certify that the packet comes from one retained causal-root branch chart in absolute time.

### Observables and Diagnostics (Summary)

- Compatibility scale invariants: $R_{\text{braid}}$, $\omega_{\text{braid}}$, phase offsets.
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
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{grad}}(W)
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---

### Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

#### Nested Shell Braid Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a nested shell braid, with each binary playing a distinct dynamical role.

Nested shell braid minimality is a theorem target: the working claim is that three coupled shell binaries are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$), with shell scale and cadence retuning; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

#### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\ddot{\mathbf{x}}_i(t)=\mathbf{a}_{i,j}(t;\{t_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(t;\{t_{s,m}\})+\mathbf{a}_{\text{ext}}(t)
$$
with delay constraints (causal roots):
$$
\|\mathbf{x}_j(t_{p,k})-\mathbf{x}_i(t)\|=c_f\,(t-t_{p,k}), \quad
\|\mathbf{x}_i(t_{s,m})-\mathbf{x}_i(t)\|=c_f\,(t-t_{s,m})
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(t)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf{x}_i(t)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf{v}\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2)
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s)
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

#### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the nested shell braid regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the nested shell braid picture, each nested shell braid is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Nested Shell Braid Geometry

This chapter is the canonical home for the geometric footprint of the nested shell braid: its dynamic exclusion envelope, oblate spheroidal envelope, and assembly-level deformation channels. It sits in the Noether sea and effective-spacetime branch because the geometry of many such envelopes is the local material out of which Noether sea density, strain, and delay variables are coarse-grained. The nested shell braid scaffold itself belongs in [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md). The delayed dynamics that stabilize and deform the nested shell braid belong in [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md).

The nested shell braid is not a static object. It is a dynamic system of six architrinos organized as three ordered shell binaries when the exact-binary assumptions are active. The high-frequency paths of those constituents sweep out a persistent volume of intense wake activity. That swept volume is the nested shell braid's effective exclusion envelope.

### Document Role

This chapter is the envelope and export-interface chapter for nested shell braid geometry. It owns:

- the dynamic exclusion-envelope interpretation of a nested shell braid,
- the oblate spheroidal form of the low-energy nested shell braid envelope,
- the role of the outer binary in setting the leading boundary,
- and assembly-level deformation of the envelope under external effective fields, nearby wakes, and Noether sea conditions.

This chapter does not own:

- primitive architrino ontology; see [Architrino](../../../../markdown/aaa/foundations/architrino.md),
- the nested shell braid scaffold; see [Nested Shell Braid](../../../../markdown/aaa/noether-braid/nested-shell-braid.md),
- exact delay-root dynamics; see [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md),
- observer clocks and rulers; see [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md),
- or metric reconstruction; see [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

The role boundary is practical: [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md) tests whether a branch is retained; this chapter describes the envelope rows and deformation variables that a retained branch can emit into Noether sea, packing, clock/ruler, and effective-metric consumers.

### Dynamic Exclusion Envelope

The six architrinos within a nested shell braid are in rapid orbital motion. The superposition of their fluctuating causal-wake contributions creates a region that is difficult for other architrinos or assemblies to penetrate without being strongly accelerated, deflected, or phase-disrupted.

This region acts as a dynamic **exclusion envelope**. It is not a solid object with a hard material surface. It is a coherent region of intense wake activity defined by the collective path history of the constituent architrinos.

Another Noether braid approaching this region does not encounter a classical wall. It encounters a rapidly varying causal-wake environment whose accelerations and phase constraints can prevent stable transit through the braid volume.

#### Exclusion Envelope As Pressure Source

The dynamic exclusion envelope also supplies the native route from assembly geometry to pressure. Pressure is not introduced as a separate primitive substance. It is an effective stress readout that appears when many stable assemblies cannot be moved closer without increasing wake disruption, branch deformation, or loss of stable closure.

For a compact region $\Omega$, the first packing-pressure readout is the trace of the exclusion-stress tensor already carried by the packing channel:

$$
P_{\mathrm{pack}}(\Omega,t)
=
\frac{1}{3|\Omega|}
\int_{\Omega}
\operatorname{tr} S_{\mathrm{excl}}(\mathbf{x},t)\,d^3x
$$

Here $S_{\mathrm{excl}}$ is the coarse-grained tensor assembled from the local entries $\mathcal{S}_{j,\mathrm{excl}}^{ab}$ in the packing projector below. The factor $1/3$ extracts the isotropic pressure component in three spatial dimensions; anisotropic residuals remain in the stress tensor and must not be hidden when the local packing is directionally biased.

This is the Noether braid analogue of the familiar lesson from electron degeneracy: excluded state volume can become macroscopic pressure. The analogy is limited but useful. In ordinary electron matter, the observer-level pressure law also depends on the recovered fermionic exchange sign and momentum-state filling. In the Noether braid substrate, the corresponding pressure channel must be derived from the oblate spheroidal exclusion envelope, causal-wake disruption, and the same retained branch ledger that later recovers the fermionic exchange rule. Exclusion geometry can explain why closer packing becomes dynamically costly; spin-statistics closure is still required before the full electron pressure law has been recovered.

### Assembly-Noether Sea Interface Diagnostic

The dynamic exclusion envelope supplies a spatial approximation to a deeper ledger boundary. At the exact level, an assembly is defined by the architrinos, closure labels, and wake-exchange records phase-locked to that assembly. The surrounding Noether sea is the neighboring neutral braid population and its ambient wake record after the assembly ledger has been excluded.

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
}
$$

The first computable form comes from the same causal-root flux used in the Master Equation. Fix a coarse-graining window $W_\ell$, a channel $X$ being tested, and a sample event $(\mathbf{x},t)$. For a source constituent $j$ at emission time $t_0$, define

$$
r_{\mathbf{x}j}(t;t_0)
=
\left\|\mathbf{x}-\mathbf{x}_j(t_0)\right\|,
\qquad
g_{\mathbf{x}j}(t;t_0)
=
r_{\mathbf{x}j}(t;t_0)-c_f(t-t_0)
$$

$$
J_{\mathbf{x}j}(t;t_0)
=
1-
\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{\mathbf{x}j}(t;t_0)}{c_f},
\qquad
\mathcal{C}_{\mathbf{x}j}(t)
=
\{t_0<t:g_{\mathbf{x}j}(t;t_0)=0\}
$$

Let $\mathcal{I}_a(t)$ be the architrino constituents and bound wake records belonging to assembly $a$, and let $\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)$ be the ambient Noether sea contributors in the same coarse window after excluding $\mathcal{I}_a(t)$. Let $w_{j,a}^{\mathrm{lock}}(t_0;t)$ retain the branches phase-locked to the assembly label, let $w_j^{\mathrm{sea}}(t_0;t)$ retain the ambient branches, let $\alpha_{j,X}(\mathbf{x},t;t_0)\ge 0$ be the channel intensity inherited from branch-ledger exposure in channel $X$, and let $W_{\mathbf{x}j}^{\mathrm{rec}}(t;t_0)=\lvert D_{t,\mathbf{x}j}/D_{s,\mathbf{x}j}\rvert$ be the receiver-normal branch strength on the same root row. Then the simple-root diagnostic is

$$
\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t;\ell)
=
W_\ell *
\sum_{j\in\mathcal{I}_a(t)}
\sum_{t_0\in\mathcal{C}_{\mathbf{x}j}(t)}
w_{j,a}^{\mathrm{lock}}(t_0;t)
\frac{\alpha_{j,X}(\mathbf{x},t;t_0)W_{\mathbf{x}j}^{\mathrm{rec}}(t;t_0)}
{r_{\mathbf{x}j}^2(t;t_0)}
$$

and

$$
\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t;\ell)
=
W_\ell *
\sum_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\sum_{t_0\in\mathcal{C}_{\mathbf{x}j}(t)}
w_j^{\mathrm{sea}}(t_0;t)
\frac{\alpha_{j,X}(\mathbf{x},t;t_0)W_{\mathbf{x}j}^{\mathrm{rec}}(t;t_0)}
{r_{\mathbf{x}j}^2(t;t_0)}
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
\right)_{(\mathbf{x},t;t_0)}
$$

Here $\mathcal{L}_{j}^{\mathrm{wake}}$ is the wake-history ledger carried by the source branch and $\Lambda_j$ is the closure label or neutral braid label available on that branch. The locked weight is the assembly projector

$$
w_{j,a}^{\mathrm{lock}}(t_0;t)
=
\mathbf{1}_{j\in\mathcal{I}_a(t)}
\,
\zeta_a
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
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
\right]
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
\right)
$$

where $\zeta_{\mathrm{sea}}^{(\ell)}\in[0,1]$ retains branches belonging to the neutral braid equilibrium record in the coarse window after all resolved assembly ledgers have been removed. Thus a branch cannot contribute to the locked numerator and the ambient denominator by relabeling alone; it must pass the corresponding ledger projector.

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
\right]
$$

For any neutral braid branch quantity $f_k(t)$, write the ambient window average after resolved assembly ledgers have been removed as

$$
\left\langle f\right\rangle_{\mathrm{sea},\ell}(\mathbf{x},t)
=
\frac{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
W_\ell(\mathbf{x}-\mathbf{X}_k(t))f_k(t)
}{
\sum_{k\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
W_\ell(\mathbf{x}-\mathbf{X}_k(t))
}
$$

Let $\nu_k$ be the cadence variable of neutral braid $k$, let $\bar\nu_{\mathrm{sea}}^{(\ell)}=\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and let $\sigma_{\nu,\ell}^2=\left\langle(\nu-\bar\nu_{\mathrm{sea}}^{(\ell)})^2\right\rangle_{\mathrm{sea},\ell}$. The cadence residual of the candidate branch is

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
}
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
}
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
\right]
$$

This form rejects assembly-locked branches because any resolved locked projector $\zeta_{a'}=1$ drives the complement factor to zero in the exact ledger limit. It retains ambient Noether sea branches in the same coarse window when they remain outside all resolved assembly ledgers and agree with the locally smoothed neutral braid cadence and balance record. The tolerances $\epsilon_\nu$, $\epsilon_N$, and $\epsilon_P$ are resolution tolerances for the chosen window and ledger chart; they are not channel-specific fit parameters. Channel differences still enter through $\Pi_X$ and $Q_X$, while the assembly/complement split and neutral-equilibrium projector remain common to the diagnostic.

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
\right\|_X
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
\right)
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
\right)
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
\right)
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
\right)
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
\right\|_{\mathrm{phase}}^2}{\epsilon_{\mathrm{phase}}^2}
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
\frac{\left\|\Theta_j^{\mathrm{strain}}\right\|^2}{\epsilon_{\Theta}^2}
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
\frac{\left(\Delta\ln\xi_j\right)^2}{\epsilon_\xi^2}
$$

Here each $\Delta\ln$ term is measured relative to the declared branch reference for the channel: the weak homogeneous nested shell braid for clock/ruler calibration, the candidate neighboring braid for packing, or the pre-entry path branch for penetration.

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
a_{\parallel,j}\hat{\mathbf u}
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
\frac{\left(\Delta\ln|J_{\mathbf{x}j}|\right)^2}{\epsilon_J^2}
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
\right\}
$$

This definition makes the $\epsilon$ values derived chart scales: they are how far a retained ledger entry may move before the declared channel readout changes by more than the accepted tolerance. The practical first estimates are:

$$
\epsilon_\omega=\Delta_{\Gamma}^{\mathrm{tol}},
\qquad
\epsilon_\theta=\Delta_{\theta}^{\mathrm{tol}},
\qquad
\epsilon_\chi=\Delta_{\chi}^{\mathrm{clk\text{-}sig,tol}}
$$

for clock scans;

$$
\epsilon_{\mathrm{dir}}
=
1-\cos\theta_X^{\mathrm{tol}},
\qquad
\epsilon_{\mathrm{prov}}
=
\Delta_{\mathrm{prov},X}^{\mathrm{tol}}
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
\Delta\ln\xi^{\mathrm{stab}}
$$

for packing scans, where the stable ranges are measured over accepted neighboring-braid branches rather than chosen per atom or line. For penetration over a trial path of duration $T_{\mathrm{path}}$ and speed $v_{\mathrm{path}}$,

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
\Delta\phi_{\mathrm{path}}^{\mathrm{tol}}
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
{\epsilon_{\mathrm{cons}}^2}
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
\right\}
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
1
$$

Clock-coupling can be sensitive to weak locked-wake tails. A reaction corridor needs a stronger coherent channel but need not coincide with the full exclusion envelope. Packing asks where another stable Noether braid or assembly can remain without persistent phase disruption. Penetration asks where transit through the assembly-dominated wake becomes dynamically unstable. What must remain invariant is the level distinction: exact assembly membership is a closure-ledger fact, while $\partial\Omega_a(D_X,t)$ is a spatial interface extracted from that ledger and the surrounding Noether sea response.

### Oblate Spheroidal Form

The nested shell braid structure is anisotropic. The three shell binaries orbit and precess, with their orbital planes tending toward mutual orthogonality in stable low-apparent-energy conditions. The time-averaged envelope is therefore not perfectly spherical.

The leading boundary of the exclusion envelope is set primarily by the **outer binary**:

- it has the largest orbital radius,
- it has the slowest frequency,
- and its orbital plane defines the dominant equatorial plane of the assembly.

The inner and middle binaries supply the high-frequency internal wake structure and stabilizing density of the envelope. The outer binary supplies the main geometric boundary. Together, outer orbit sweep plus system precession naturally produce a flattened-pole, equatorial-bulge form: an **oblate spheroidal exclusion envelope**.

In low-energy prose, "nested shell braid shape" should usually mean this effective envelope, not a literal material surface.

### Canonical Geometry Variables

For the oblate spheroidal exclusion envelope, use $R_{\parallel}$ for the semiaxis along the contraction or drift-aligned direction and $R_{\perp}$ for the transverse semiaxis. The canonical shape ratio is
$$
\xi\equiv\frac{R_{\parallel}}{R_{\perp}}
$$
so $\xi=1$ denotes a spherical envelope and $\xi<1$ denotes an oblate spheroidal envelope compressed along the parallel axis.

Use
$$
\lambda\equiv\frac{R_{\perp}}{R_{\perp,0}}
$$
for the transverse scale ratio relative to a stated reference envelope. The pair $(\xi,\lambda)$ belongs first to nested shell braid geometry: $\xi$ records shape and $\lambda$ records scale.

Observer clock behavior is a downstream readout, not the definition of either geometry variable. In a successful homogeneous Lorentz-closure regime, the theory should derive
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt}\to\xi\to\frac{1}{\gamma}
$$
but this is a closure target linking the clock channel to the oblate spheroidal envelope. It should not be used to define $\xi$.

### Lorentz Projection Role

For branch-quantized Lorentz response, the envelope variables $(\xi,\lambda)$ are projection variables. They expose the geometry of a stable all-layer nested shell braid branch to external clocks, rulers, and nearby assemblies, but they do not by themselves contain the full branch state.

The hidden branch state contains the inner, middle, and outer layer radii, frequencies, speeds, axes, active causal-root ledger, and wake exchange. The outer binary controls the leading boundary because it has the largest radius and weakest shielding. Therefore the observed ruler factor is extracted through the outer envelope,
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
$$
but the branch $q$ is accepted only when the inner and middle ledgers also retune consistently with clock closure, conservation, and preferred-frame leakage bounds.

The direct Lorentz-to-geometry map comes from a closed return cycle. In a homogeneous cell, define
$$
\gamma_{\text{eff}}(v)
\equiv
\frac{1}{\sqrt{1-v^2/c_{\text{eff}}^2}}
$$
The longitudinal return time for an envelope semiaxis $R_{\parallel}$ is
$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\text{eff}}-v}
+
\frac{R_{\parallel}}{c_{\text{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\text{eff}}}\gamma_{\text{eff}}^2
$$
while the transverse causal-budget return time is
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\text{eff}}}\gamma_{\text{eff}}
$$
Requiring $T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_0)$ gives
$$
\xi_q(v)
=
\frac{R_{\parallel,q}(v)}{R_{\perp,q}(v)}
=
\frac{1}{\gamma_{\text{eff}}(v)}
+O(\epsilon_{\mathrm{LV}})
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
+O(\epsilon_{\mathrm{LV}})
$$
The envelope is therefore the visible projection of the retained causal-root ledger, not an independently assigned Lorentz surface.

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
\right)
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
\Delta\ln R_{\perp,q}
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
\Delta\ln R_{\perp,O}
$$

This approximation is a projection estimate, not a branch proof. It fails when middle-layer hinge motion, inner self-hit history, axis precession, or neighbor-induced strain contributes at the same order as the outer binary. Those failures are informative: they identify which hidden ledger entries must be retained before the retuning map can be used for clock, ruler, or Noether sea transport calculations.

### Deformability of the Envelope

The oblate spheroidal envelope is deformable because it is generated by orbit paths, not by a rigid shell. Those paths depend on the superposition of:

- internal binary wakes,
- self-hit and partner-hit closure,
- nearby assembly wakes,
- Noether sea density and stress,
- and the braid's translational state through the Noether sea.

External effective fields, nearby assembly wakes, and dense local assemblies can perturb the binary paths. The outer binary is the most exposed channel because it is the largest and most weakly shielded layer. A distortion of that outer path changes the exclusion envelope.

This gives the nested shell braid two distinct geometric roles:

1. As an assembly, it can deform while preserving nested shell braid identity across a stable regime.
2. As a medium constituent, many deforming braids can contribute to coarse-grained Noether sea density, strain, and signal-propagation changes.

The claim that those coarse-grained changes reconstruct observer-level gravity is not owned here. It belongs to [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), and [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md).

For the special-relativity-facing comparison of this deformation channel, see [the deformable Noether braid comparison](../../../../markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the focused synthesis of the closed-return quantization claim, see [Return-Cycle Lorentz Quantization](../../../../markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md).

### Geometry Interfaces

For local assembly modeling, use this page as the geometric source for:

- an oblate spheroidal envelope boundary,
- principal axes set by nested shell braid orientation,
- deformation of the outer-binary envelope under local gradients,
- and exclusion-volume changes relevant to packing, shielding, and collision channels.

For dynamics modeling, use [Nested Shell Braid Dynamics](../../../../markdown/aaa/noether-braid/nested-shell-braid-dynamics.md), where the oblate causal envelope is treated as a delay-geometry input and a simulation target.

For Noether sea modeling, use [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) and [Noether Sea Pro/Anti Coupling](../../../../markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), where many Noether braids become a coupled medium rather than isolated assembly envelopes.

### Summary Commitment

> **Nested Shell Braid Geometry Commitment:** A nested shell braid has an oblate spheroidal exclusion envelope generated by the path history of its shell binaries. The envelope is dynamic and deformable, not a rigid surface. Its deformation is an assembly-level input to Noether sea state variables, while metric and gravity-language reconstruction belongs to the spacetime branch.

> **Lorentz Projection Commitment:** In Lorentz closure, the outer-binary envelope supplies the leading observable ruler projection, while the accepted branch state remains a retained causal-root ledger. The geometry chapter records $\xi$ and $\lambda$ as projection variables; it does not reduce clock, mass, or action-ledger closure to outer-envelope shape alone.

## Noether Braid Topological Charge

This chapter gives a first-class home to the candidate topological label of a Noether braid assembly. The label combines the causal-root ledger of the delayed dynamics with the phase-return degree data of a resonance-locked nested shell braid. Its purpose is to state what can be computed from a retained branch chart, what is invariant inside a nondegenerate branch domain, and what remains a theorem target before the label can serve as a topological periodic table of assemblies. The general search domain that emits candidate Noether braid branch charts is developed in [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md).

The compact notation is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
$$
where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1$ denotes the established phase-entry slot of the retained resonance lock. In this chapter that slot means return-map degree data unless a later two-torus curvature chart is explicitly supplied. For a promoted lock with a three-phase chart this last entry is usually a pair
$$
c_1=(m,n)\in\mathbb{Z}^2
$$
rather than a scalar integer: $m$ and $n$ are the middle and inner winding numbers over one outer period.

This compact form records the count data most directly emitted by a branch solver. The conserved refinement is
$$
[\mathfrak B]_{\mathrm{deg}}
=
\left(
D_s,\,
D_p,\,
c_1
\right),
$$
where $D_s$ and $D_p$ are signed root degrees. The unsigned counts $N_s$ and $M_p$ can change by opposite-sign fold-pair birth or death, while $D_s$ and $D_p$ are the degree-like data preserved by generic fold surgery. A promoted report should therefore carry both the compact assembly topological charge and its signed-degree refinement.

This is a definition and closure target, not a completed classification theorem. It becomes a physical assembly label only after the same retained branch chart supplies positive root floors, finite memory, finite local-to-global gluing, stable return data, and a closed wake-history boundary ledger.

In the terminology of [Noether Braid Configuration Space](../../../../markdown/aaa/noether-braid/noether-braid-configuration-space.md#candidate-and-certified-braids), a candidate for certified-braid promotion is the dynamical return-map status of the full retained branch. The assembly topological charge is the branch-intrinsic topological label carried by that candidate. It is not a Lorentz-dressed observer component: moving-assembly export may transform energy-momentum and angular-momentum readouts, but $[\mathfrak B]_{\mathrm{top}}$ changes only when the retained branch crosses a fold, reconnection, or declared surgery event.

### Document Role

This chapter is the downstream classifier for retained Noether braid branch charts. It owns $[\mathfrak B]_{\mathrm{top}}$, the signed-degree refinement, invariance conditions, allowed transitions, and simulation extraction order for the topological label.

It does not certify branch retention by itself and does not create a base Proof ID. It consumes a same-record branch chart from the neutral, shell, nested shell, rank-three, or lower-rank proof effort; the label becomes physical only after the causal-root, phase-return, gluing, wake-boundary, and stability rows close on that same record.

### Source Of The Three Entries

The first two entries come from the causal-root complex of the Master Equation. On a retained branch chart, active roots are split by source identity and by Jacobian sign. For the self-hit sector,
$$
C_{s,+}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{self root},\ J_\ell>0\},
\qquad
C_{s,-}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{self root},\ J_\ell<0\}.
$$
For the partner-hit sector,
$$
C_{p,+}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{partner root},\ J_\ell>0\},
\qquad
C_{p,-}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{partner root},\ J_\ell<0\}.
$$
The unsigned ledgers are
$$
N_s
=
\dim C_{s,+}+\dim C_{s,-},
\qquad
M_p
=
\dim C_{p,+}+\dim C_{p,-}.
$$
The signed degrees
$$
D_s
=
\dim C_{s,+}-\dim C_{s,-},
\qquad
D_p
=
\dim C_{p,+}-\dim C_{p,-}
$$
are not extra entries in the compact assembly topological charge, but they are required side data and form the conserved-degree refinement $[\mathfrak B]_{\mathrm{deg}}$. A solver that reports only $N_s$ and $M_p$ has counted roots without proving which opposite-sign pairs can be born, die, or persist under deformation.

Equivalently, each source sector is a $\mathbb{Z}_2$-graded two-term root complex
$$
C_{\sigma,\bullet}
=
C_{\sigma,+}\oplus C_{\sigma,-},
\qquad
\sigma\in\{s,p\}.
$$
The unsigned ledgers $N_s$ and $M_p$ are ranks of a chosen presentation. They are useful live-channel counts, but they are not the conserved quantities across fold-pair surgery. The conserved local degree is the Euler characteristic
$$
\chi(C_{\sigma,\bullet})
=
\dim C_{\sigma,+}-\dim C_{\sigma,-}
=
D_\sigma.
$$
A generic fold birth adds one positive and one negative generator, so the presentation rank changes by two while $\chi(C_{\sigma,\bullet})$ is unchanged.

The geometric reading is intersection-theoretic. On a lifted finite-memory strip, each connected retained causal-locus component has an oriented intersection number with a generic receiver-time fiber. Let $\mathcal L_\sigma$ be the retained causal-locus chain in sector $\sigma\in\{s,p\}$ and let $F_{t_0}$ be a generic receiver-time fiber. Then
$$
D_\sigma
=
\left\langle[\mathcal L_\sigma],[F_{t_0}]\right\rangle.
$$
On a regular one-parameter family,
$$
\frac{d}{d\lambda}
\left\langle[\mathcal L_\sigma(\lambda)],[F_{t_0}]\right\rangle
=0.
$$
Fold-pair births and deaths appear as null-homologous bigons with local contributions $+1-1=0$. Summing oriented intersections in the self and partner sectors gives $D_s$ and $D_p$; summing their absolute values gives $N_s$ and $M_p$. This is the bridge to [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#geometrictopological-framework): the same causal-locus components that carry action-counting weight also supply the signed root degrees used by the assembly topological charge.

The third entry comes from the phase-return chart of a resonance-locked Noether braid. Let $\theta^O,\theta^M,\theta^I$ be the outer, middle, and inner phase coordinates on the retained return chart. Exact integer closure over one outer period $T_O$ means
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi,
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m,
\qquad
\theta_I(t+T_O)=\theta_I(t)+2\pi n.
$$
Equivalently, the relative-phase one-forms
$$
\vartheta_M=d\theta^M-m\,d\theta^O,
\qquad
\vartheta_I=d\theta^I-n\,d\theta^O
$$
have integer holonomy and become flat on a promoted phase-locked branch. Let $\rho_O:S^1_O\to\mathfrak B$ be one retained outer return cycle. The shorthand
$$
c_1[\theta^O,\theta^M,\theta^I]
=
\left(
\operatorname{deg}(\theta^M\circ\rho_O),\,
\operatorname{deg}(\theta^I\circ\rho_O)
\right)
=(m,n)
$$
records this phase-return degree data. The doubling-frequency candidate is the outer-normalized case $(m,n)=(2,4)$, equivalently canonical `I:M:O` frequency order $4:2:1$.

The symbol $c_1$ is retained as the established phase-entry notation, but it should not be read here as a literal first Chern class of principal circle bundles over the outer phase circle. Such bundles over $S^1_O$ are topologically trivial because $H^2(S^1_O;\mathbb{Z})=0$. The claim is the degree-pair claim
$$
(m,n)\in[S^1_O,S^1]\times[S^1_O,S^1]\cong\mathbb{Z}^2,
$$
with flat relative-phase recurrence on the retained return chart. If a later chart supplies a genuine two-torus curvature form, its first Chern number can be compared with this degree pair. Until then, $c_1=(m,n)$ means return-map degree data, not a curvature integral.

The phase entry is also conditional on the three support-row planes remaining independent. If $\hat{\mathbf n}_O,\hat{\mathbf n}_M,\hat{\mathbf n}_I$ are the retained orbital-plane normals, define
$$
D_{\mathrm{plane}}
=
\det\!\left[
\hat{\mathbf n}_O\ \hat{\mathbf n}_M\ \hat{\mathbf n}_I
\right].
$$
The degree pair is admissible only when
$$
|D_{\mathrm{plane}}|\ge \delta_{\mathrm{plane}}>0.
$$
When this floor fails, the three phases no longer supply an independent return chart, so $c_1$ must be suspended rather than compared across the degeneracy.

### Candidate Definition

For a finite-$\eta$ branch chart $\mathfrak B$, the assembly topological charge is admissible only when the following data are present on the same retained row set:

1. Active root rows split by source identity: self-hit and partner-hit.
2. Jacobian-sign grading for those rows: $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
3. Positive transversality floors away from declared finite caustic transits.
4. Finite memory depth and positive inactive-root gaps.
5. A finite local-to-global gluing result for the branch chart, or an explicit finite multistability family.
6. For a rank-three branch, integer phase closure, flat relative-phase connection, and a plane-independence floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$.
7. A return-map stability certificate, such as a Floquet or Conley-style branch certificate, after quotienting only true symmetry directions.
8. If the middle layer is treated as a caustic-grazing carrier, regulator-stable middle-caustic rows showing that the reported root degrees and phase-return entry do not depend on the finite-$\eta$ convention in the promoted limit.

Under those conditions the compact assembly topological charge is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1[\theta^O,\theta^M,\theta^I]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2.
$$
For a Noether braid branch without a phase-return chart, the partial assembly topological charge $(N_s,M_p)$ may be recorded, but $c_1$ is not assigned until that chart exists.

A useful refinement is a branch-preserving chirality label
$$
\chi_{\mathrm{fr}}\in\mathbb{Z}_2.
$$
This is not part of the base triple until the branch chart supplies a deformation-stable handed marker, such as framed self-linking parity or a certified maximal-curvature-binary circulation sign. It must be invariant under the same branch-preserving deformations that keep $(N_s,M_p,c_1)$ fixed, and it may flip only at an independent framing wall $\Sigma_{\mathrm{frame}}$ where the nonsingular framing floor fails. It is the natural place to record handedness, but it must not be substituted for the root and phase-return data. The two signs of the maximal-curvature-binary circulation are introduced in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#emergent-properties-and-measurement-standards).

### Invariance And Allowed Transitions

The assembly topological charge is designed to be locally invariant. Between branch boundaries, the implicit-function theorem transports each simple active root continuously, so $N_s$, $M_p$, $D_s$, and $D_p$ remain constant. At a generic fold, one positive and one negative root are created or annihilated. Therefore
$$
\Delta N_s\in 2\mathbb{Z}
\quad\text{or}\quad
\Delta M_p\in 2\mathbb{Z},
\qquad
\Delta D_s=\Delta D_p=0
$$
for an ordinary fold-pair event in the corresponding sector.

Cusp or higher singular strata are not automatically governed by the generic fold law. They require a separate regularized normal form before their ledger surgery can be promoted. Likewise, $c_1=(m,n)$ remains fixed under deformation only while the return-map degree pair is unchanged, the relative-phase connection stays flat, and the plane-independence floor remains positive. A loss of resonance lock, a plane-degeneracy transition, or a branch-fold event that changes the return chart can change the phase entry.

Near generic walls the transition stratification is product-like:
$$
\Sigma_{\mathrm{charge}}
=
\Sigma_{\mathrm{root}}
\cup
\Sigma_{\mathrm{phase}}
\cup
\Sigma_{\mathrm{plane}},
$$
with $\Sigma_{\mathrm{frame}}$ added when $\chi_{\mathrm{fr}}$ is part of the certified report. Away from intersections these are transverse codimension-one walls, so exactly one entry of the compact label or one certified refinement changes. Codimension-two intersections encode simultaneous events, such as a cusp, a root-plus-phase transition, or a plane-plus-phase transition; those require their own normal form before any ledger surgery is inferred.

The transition catalogue therefore has a native form:

| Event | Codimension | Assembly topological charge effect | Required certificate |
| --- | --- | --- | --- |
| Branch-preserving deformation | 0 on the retained chart | No change to $(N_s,M_p,c_1)$ or $(D_s,D_p,c_1)$ | Positive floors, finite memory, stable gluing |
| Self-root fold | 1 generically | $\Delta N_s=\pm2$, $\Delta D_s=0$ generically | Fold normal form and post-transit chart |
| Partner-root fold | 1 generically | $\Delta M_p=\pm2$, $\Delta D_p=0$ generically | Fold normal form and post-transit chart |
| Phase-lock jump | 1 for a resonance crossing | $\Delta c_1\ne0$ | Degree/holonomy change and return-map transition |
| Plane-degeneracy transition | 1 generically, higher with imposed symmetry | Phase-return chart may lose rank before $c_1$ can be compared | Orbital-plane determinant and return-chart continuation |
| Framing or chirality flip | 1 or higher, depending on the framing chart | $\Delta\chi_{\mathrm{fr}}\ne0$ | Framed-linking or handedness transition certificate |
| Cusp or deeper singular stratum | 2 or higher generically | Not inferred from fold law | Singular-stratum chart and regulator-stable transition data |

This is why the triple belongs in one object. The root ledgers describe which delayed causal channels are live, while the phase-return entry describes how the multi-layer branch returns to itself. Both are characteristic data of the same retained causal-root sheaf: local root sections, overlap gluing, and phase degree/holonomy must agree before an assembly label is promoted.

### Role In The Assembly Atlas

The topological atlas of assemblies should not classify objects by visual similarity alone. It should classify retained branches by deformation-stable integers that can be extracted from the same simulation record used to test the dynamics. The candidate atlas entry for a stable assembly is therefore
$$
\mathcal{Q}_{\mathrm{asm}}
=
\left(
N_s,\,
M_p,\,
c_1,\,
\chi_{\mathrm{fr}}\ \text{when certified}
\right)
$$
together with its stability margins, energy/wake ledger, and gluing status.

The intended use is constrained:

- $(N_s,M_p)$ records the binding-channel census: self-hit channels, partner-hit channels, and their signed degrees.
- $c_1=(m,n)$ records the resonance-lock return-map degree pair of a promoted Noether braid branch.
- $\chi_{\mathrm{fr}}$ records handedness only after a framed handed marker is certified.
- Physical particle identity, generation structure, spin-statistics, exclusion, and Standard Model quantum numbers are downstream mappings, not consequences of the notation alone.

Thus $(N_s,M_p,c_1)$ is the candidate conserved label that says when two assemblies occupy the same topological sector. It is not yet a proof that a given sector is an electron analogue, photon analogue, or quark analogue.
Strictly, the compact count triple is locally conserved only inside one nondegenerate branch domain. Across generic fold-pair surgery the degree-refined data $(D_s,D_p,c_1)$ are the conserved part, while $N_s$ and $M_p$ record how many live channels the retained branch currently carries.

### Simulation Extraction

A branch solver should extract the assembly topological charge in this order:

1. Build the finite-$\eta$ retained branch chart and declare its memory window.
2. Find active causal roots on the same retained row set.
3. Label each root by source identity: self or partner.
4. Record the Jacobian sign and compute $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
5. Compute $N_s$, $M_p$, $D_s$, and $D_p$.
6. Compute the lifted-strip fiber-intersection degrees that realize $D_s$ and $D_p$ whenever the causal-locus chart is available.
7. Track fold, caustic, cusp, or inactive-gap transition metadata.
8. For branches with a Noether braid phase-return chart, compute phase degree/holonomy $(m,n)$ from the returned phase chart, verify the floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$, and show that $(m,n)$ comes from the return map rather than from frequency ratios alone.
9. If a middle caustic-grazing carrier is used, test that the signed degrees and phase-return entry are stable under the declared $\eta$ refinement.
10. Test gluing and finite continuation cardinality for the local charts.
11. Test the return-map stability gap off true symmetry directions.
12. Report $[\mathfrak B]_{\mathrm{top}}$ only after the same retained rows pass these checks.

The failure modes are equally important. A candidate is not promoted if the roots are counted without signs, if self and partner rows are mixed, if the phase lock is inferred from frequency ratios without holonomy recurrence, if local branch charts do not glue, or if the continuation family is empty, infinite, or unlabeled.

### Status

The established pieces are local:

- The delay-map theorem pack in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized) proves signed degree invariance on regular families and the generic opposite-sign fold-pair law.
- The signed causal-root complex in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#signed-causal-root-complex) supplies the local chain-complex reading of active roots.
- [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock) supplies the self-hit and partner-hit ledger notation used by $(N_s,M_p)$.
- [Noether Braid Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md#exact-integer-phase-closure) supplies the integer phase-closure data whose return-map degree pair is recorded as $c_1=(m,n)$.
- [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#topological-constraints-and-assembly-stability) uses the same topological sector in the action and mass-gap theorem target.

The open proof burden is global:

- prove that a stable assembly realizes a fixed assembly topological charge over a finite branch domain;
- prove gluing of the local causal-root charts into a finite labeled continuation family;
- prove a positive stability gap for the assembly topological charge sector;
- determine whether the entries are independent or constrained by radial balance, phase flatness, and Noether sea response, starting with the reachable theorem target that for a layer winding $k_a\in\{1,m,n\}$ the layerwise self-hit degree obeys a parity or lower-bound law $D_s^{(a)}\equiv f(k_a)\pmod 2$ derived from the circular self-hit fold-birth sequence and the lifted-strip fiber-intersection formula;
- prove that caustic-grazing middle-carrier rows have regulator-stable signed degrees and phase-return entries, so the assembly topological charge does not depend on the finite-$\eta$ convention used to regularize the hinge;
- map any certified sectors to observer-level particle quantum numbers without fitting the labels afterward.

The chapter should therefore be read as the canonical definition and proof target for assembly topological charge, not as the completed topological periodic table.
