# Neutral Braid

This chapter defines the base six-body family in the [Noether Braid](noether-braid.md) sequence. It owns the neutral inventory, all-pairs branch ledger, and retained-branch certificate target before shell support, exact binary grouping, or nested ordering is added.

Neutral does not mean featureless. It means the signed polarity inventory balances before any further geometry is imposed. The branch still has many attractive and repulsive channels, and the proof burden is to show that those channels can be organized into one coherent causal-return record rather than merely into a visually balanced arrangement.

A **neutral braid** is the base six-architrino case. It contains three positrinos and three electrinos, indexed by $i\in\{1,\ldots,6\}$ with polarity signs $\sigma_i\in\{+1,-1\}$ satisfying

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_{i=1}^{6}\sigma_i=0
$$

Equivalently, the compact polarity inventory is $3\epsilon_+ + 3\epsilon_-$. This polarity-neutral ledger is imposed before any binary partition, shell ordering, or near-antipodal matching is assumed. Each positive-polarity architrino has three attractive channels to negative-polarity architrinos and two repulsive channels to the other positive-polarity architrinos. Each negative-polarity architrino has the polarity-reversed version of the same count: three attractive channels to positives and two repulsive channels to negatives. That $3+2$ channel count is part of the neutral braid bookkeeping even when no binary partition has been certified.

We work in units with field speed $c_f=1$ unless stated otherwise.

The intrinsic path of architrino $i$ may be represented by a closed arclength curve

$$
\mathbf Y_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\left\| \mathbf Y_i'(s)\right\|=1
$$

The quotient domain means that $s$ and $s+L_i$ label the same point on the support curve.

Its physical trajectory is allowed to move along that support with a bounded speed factor,

$$
\mathbf X_i(T)=\mathbf Y_i(\lambda_i(T)),
\qquad
\frac{d\lambda_i}{dT}(T)=\nu_i(T),
\qquad
0<\nu_-\leq\nu_i(T)\leq\nu_+<\infty
$$

The bounded speed factor $\nu_i(T)$ is where nonuniform speed enters the architecture. A branch may temporarily push an architrino over a local hinge into a self-hit mode, but an admissible neutral braid must still return to a closed causal ledger within the branch's recovery tolerance. The neutral braid therefore allows changing support geometry, nonuniform speed, changing local curvature, and delayed multi-channel response without first reducing the motion to exact binary rows.

## Retained-Branch Certificate Target

The neutral braid claim is a theorem target, not a retained-branch result. In the proof map this rest qualification is the `NB-0` target. A candidate branch $B$ over a test window $W$ is retained only if the required rows close on one ledger identity. The master certificate can be summarized as

$$
\mathsf{R}_{\mathrm{NB}}(B,W)
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
\mathrm{Retain}_{\mathrm{NB}}(B,W)
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

The root row begins with all ordered distinct source pairs. With $I=\{1,\ldots,6\}$,

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30
$$

Same-source rows $(i,i)$ are governed by the declared same-source policy and are deliberately excluded from $\Pi_{\mathrm{all}}$; the ordered distinct-pair count is therefore $6\times5=30$. The $3$ attractive and $2$ repulsive source-site counts for each receiver are inventory facts, not a compressed force law. The force row must still be assembled from the actual retained causal roots, delays, Jacobian floors, and line-of-action vectors for these ordered pairs. A shell braid or nested shell braid can reduce this ledger only after its reduction row proves how the compressed rows are inherited from the all-pairs ledger.

The certificate should report the first blocking row as

$$
\mathsf{F}_{\mathrm{NB}}(B,W)
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

Fixed-speed octahedral diagnostics have produced scoped negative results for the `NB-0` chart. The rigid zero-offset octahedral carrier places the six sites at octahedron vertices, with three positive-polarity sites on one triangular face and three negative-polarity sites on the opposite face, rotating rigidly at fixed speed with zero common phase offset. For that carrier, the all-pairs causal-root ledger is certified for all $30$ ordered distinct source pairs, with one positive-delay root per row, support-complete memory depth $h_{\mathrm{mem}}=2$ in the same $c_f=1$ units, and a positive Jacobian floor. This root-ledger result does not retain the branch.

At the receiver node $((1,+),0)$, where the entries denote site label, polarity, and phase, the fixed-speed row has a certified nonzero dimensionless tangential residual. Here $\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)$ removes the common factor $\kappa\epsilon^2/R^2$ from the tangential force-balance residual, so zero is the fixed-speed force-closure target:

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.19802220088,0.19802220091]
$$

This interval rejects the narrow fixed-speed branch chart. The diagnostic family also rejects several overreads: the ordinary same-source positive-delay rescue is absent under the rigid exact-$c_f$ circular convention, inventory attraction bias does not imply force closure, resolved positive-delay root rows do not imply force closure, and sampled phase or polarity-phase improvements do not imply retention. These are negative results for rigid fixed-speed octahedral hypotheses, not rejections of the broader neutral braid, shell braid, nested shell braid, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.
