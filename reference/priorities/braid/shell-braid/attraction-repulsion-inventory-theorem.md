# Attraction/Repulsion Inventory Theorem

Promotion status: `priority-only`. This packet isolates the inventory observation behind the neutral same-level tri-binary carrier: with three architrinos of each polarity, every architrino has three opposite-polarity attractive source sites and two same-polarity repulsive source sites, excluding itself. The row is a structural inventory bias. It is not a force-closure proof, a retained dynamics branch, or permission to bypass root, action, event, and stability rows.

This packet refines the inventory row sketched in [variable-speed-factor-extension.md](variable-speed-factor-extension.md), uses the force convention in [force-balance-reduction.md](force-balance-reduction.md), and is compatible with the exact-antipodal parity convention in [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md) and [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md). Its weighted force and moment consequences are developed in [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md).

---

## 1. Polarity Signs And Site Inventory

Let the neutral same-level tri-binary site set be

$$
I=\{1,2,3\}\times\{+,-\},
$$

with binary label $b(i)\in\{1,2,3\}$ and polarity sign

$$
\sigma_i\in\{+1,-1\},
\qquad
\sigma_{(a,+)}=+1,
\qquad
\sigma_{(a,-)}=-1.
$$

The branch inventory row is neutral:

$$
N_+=3,
\qquad
N_-=3,
\qquad
Q=\epsilon(N_+-N_-)=0.
$$

For a receiver $i$, define the opposite-polarity and same-polarity source-site sets, excluding the receiver itself:

$$
A_i=\{j\in I:j\ne i,\ \sigma_j=-\sigma_i\},
\qquad
R_i=\{j\in I:j\ne i,\ \sigma_j=\sigma_i\}.
$$

Then

$$
N_{\mathrm{attr}}(i)=|A_i|=3,
\qquad
N_{\mathrm{rep}}(i)=|R_i|=2.
$$

Equivalently,

$$
N_{\mathrm{attr}}(i)-N_{\mathrm{rep}}(i)=1,
$$

and the unweighted signed source count is

$$
C_i
=
\sum_{j\ne i}\sigma_i\sigma_j
=
N_{\mathrm{rep}}(i)-N_{\mathrm{attr}}(i)
=
-1.
$$

Since opposite polarity gives $\sigma_i\sigma_j=-1$, the negative sign of $C_i$ is the inventory-level attraction bias.

The binary split is also fixed:

$$
N_{\mathrm{attr}}^{\mathrm{partner}}(i)=1,
\qquad
N_{\mathrm{attr}}^{\mathrm{cross}}(i)=2,
\qquad
N_{\mathrm{rep}}^{\mathrm{cross}}(i)=2.
$$

There is no ordinary same-source contribution in this site count. Same-source roots, self-hit intervals, or fold-layer representatives are separate root-ledger rows.

---

## 2. Delayed Root Weights

For a retained delayed hit $r=(i,j,\alpha)$ at receiver phase $\lambda_i$, write

$$
\eta_r>0,
\qquad
\mathbf{R}_r
=
\mathbf{Y}_i(\lambda_i)-\mathbf{Y}_j(\lambda_j^-),
\qquad
\widehat{\mathbf{R}}_r
=
\frac{\mathbf{R}_r}{\|\mathbf{R}_r\|}.
$$

In the fixed-speed row,

$$
J_r=1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

In the bounded speed factor row,

$$
J_r^\nu
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

Let

$$
w_r^\Phi
=
\frac{1}{\eta_r|J_r|},
\qquad
w_r^F
=
\frac{1}{\eta_r^2|J_r|}
$$

in the fixed-speed row, with $J_r$ replaced by $J_r^\nu$ in the bounded-speed row. These are positive root weights once the root ledger has emitted positive delay and Jacobian floors.

The signed delayed potential inventory seen by receiver $i$ is

$$
\Phi_i^{\mathrm{site}}
=
\sum_{j\ne i}\sigma_i\sigma_j,
$$

while the root-weighted delayed potential row is

$$
\Phi_i
=
\sum_{r\in\mathcal{A}_i}
\sigma_i\sigma_{j(r)}w_r^\Phi
+
\Phi_{i,\mathrm{self}}
+
\Phi_{i,\mathrm{med}}.
$$

The architrino part splits as

$$
\Phi_i^{\mathrm{attr}}
=
-
\sum_{\substack{r\in\mathcal{A}_i\\ j(r)\in A_i}}
w_r^\Phi,
\qquad
\Phi_i^{\mathrm{rep}}
=
\sum_{\substack{r\in\mathcal{A}_i\\ j(r)\in R_i}}
w_r^\Phi.
$$

Thus the unweighted row says there are three negative potential channels and two positive potential channels, but the root-weighted row is controlled by $\eta_r$, $J_r$, and root multiplicity.

---

## 3. Delayed Force Sums

With the force convention of [force-balance-reduction.md](force-balance-reduction.md), the dimensionless delayed force is

$$
\widetilde{\mathbf{F}}_i
=
\sum_{r\in\mathcal{A}_i}
\sigma_i\sigma_{j(r)}
w_r^F\widehat{\mathbf{R}}_r
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}.
$$

The attractive and repulsive architrino-site parts are

$$
\widetilde{\mathbf{F}}_i^{\mathrm{attr}}
=
-
\sum_{\substack{r\in\mathcal{A}_i\\ j(r)\in A_i}}
w_r^F\widehat{\mathbf{R}}_r,
\qquad
\widetilde{\mathbf{F}}_i^{\mathrm{rep}}
=
\sum_{\substack{r\in\mathcal{A}_i\\ j(r)\in R_i}}
w_r^F\widehat{\mathbf{R}}_r.
$$

Here $\widehat{\mathbf{R}}_r$ points from the delayed source toward the receiver. Therefore the attractive contribution carries the minus sign and points toward the delayed source, while the repulsive contribution points away from the delayed source.

For projection tests, define

$$
\Theta_i^{\mathrm{attr}}
=
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_i^{\mathrm{attr}},
\qquad
\Theta_i^{\mathrm{rep}}
=
\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_i^{\mathrm{rep}},
$$

and

$$
\mathbf{N}_i^{\mathrm{attr}}
=
P_i^\perp\widetilde{\mathbf{F}}_i^{\mathrm{attr}},
\qquad
\mathbf{N}_i^{\mathrm{rep}}
=
P_i^\perp\widetilde{\mathbf{F}}_i^{\mathrm{rep}}.
$$

The fixed-speed force-closure rows are still

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0,
\qquad
\mathbf{K}_i=\Gamma P_i^\perp\widetilde{\mathbf{F}}_i.
$$

The bounded-speed rows are still

$$
\nu_i\nu_i'
=
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^\nu,
\qquad
\nu_i^2\mathbf{K}_i
=
\Gamma P_i^\perp\widetilde{\mathbf{F}}_i^\nu.
$$

The inventory theorem supplies only the signs and source-site counts inside these sums. It does not supply the vector directions, root weights, action-derived scale, or projection cancellations. The downstream force-moment packet converts these sums into tangent-power, normal-curvature-drive, and support-radial-moment diagnostics; those diagnostics remain weighted projection rows, not retained-branch closure.

---

## 4. Structural Bias Versus Closure

The unweighted count gives a real structural asymmetry:

$$
3\text{ attractive source sites}
\quad\text{versus}\quad
2\text{ repulsive source sites}.
$$

Equivalently, if every nonself source site contributed one identical scalar unit with no delay, no Jacobian weighting, no root multiplicity, and no direction, the receiver would see one net attractive unit:

$$
\sum_{j\ne i}(-\sigma_i\sigma_j)
=
N_{\mathrm{attr}}(i)-N_{\mathrm{rep}}(i)
=
1.
$$

This is the correct inventory meaning of the operator's observation.

It is not a force-closure proof for five independent reasons.

1. The actual retained ledger is a root ledger, not just a site ledger. A source site may have zero, one, or several retained roots inside the declared memory convention.
2. The weights $w_r^\Phi$ and $w_r^F$ depend on delay and Jacobian factors. A long-delay attractive root can be smaller than a short-delay repulsive root.
3. The force is vector-valued. Attractive and repulsive channels can project differently onto $\mathbf{T}_i$, $P_i^\perp$, and any support-band normal.
4. Same-source, fold-layer, and medium-response rows are outside the $3$-$2$ site count and must be separately absent, regularized, or included.
5. Dynamics closure requires the same weighted force ledger to pass tangential, curvature, action, Noether/event, convergence, and stability rows.

Thus the theorem target is:

$$
\text{inventory attraction bias}
\ne
\text{retained force closure}.
$$

The executable counterexample witness closes the overread hypothesis by rejection:

$$
\texttt{closed-rejected:inventory-bias-implies-force-closure}.
$$

This rejects only the inference from the $3$-$2$ source-site inventory count to fixed-speed force closure; it does not reject the inventory theorem itself. The witness uses the rigid octahedral all-pairs ledger, where every receiver has $N_{\mathrm{attr}}=3$ and $N_{\mathrm{rep}}=2$, but the fixed-speed tangential residual interval at $((1,+),0)$ excludes zero.

The useful conclusion is narrower but important: any same-level neutral branch certificate should emit the $3$-$2$ inventory row beside the weighted force sums, so a later action or observer-export packet can distinguish structural polarity bias from solved dynamics.

---

## 5. Symmetry And Exact-Antipodal Implications

Let the exact-antipodal involution be

$$
\iota(a,+)=(a,-),
\qquad
\iota(a,-)=(a,+).
$$

Then

$$
\sigma_{\iota i}=-\sigma_i.
$$

The source-site sets transform as

$$
\iota(A_i)=A_{\iota i},
\qquad
\iota(R_i)=R_{\iota i},
$$

so

$$
N_{\mathrm{attr}}(\iota i)=N_{\mathrm{attr}}(i)=3,
\qquad
N_{\mathrm{rep}}(\iota i)=N_{\mathrm{rep}}(i)=2.
$$

The attraction bias is pair-even:

$$
N_{\mathrm{attr}}(\iota i)-N_{\mathrm{rep}}(\iota i)
=
N_{\mathrm{attr}}(i)-N_{\mathrm{rep}}(i).
$$

If the root ledger is closed under $\iota$ and uses the same memory convention, then paired roots satisfy

$$
\eta_{\iota r}=\eta_r,
\qquad
J_{\iota r}=J_r,
\qquad
\widehat{\mathbf{R}}_{\iota r}=-\widehat{\mathbf{R}}_r,
\qquad
\sigma_{\iota i}\sigma_{\iota j}
=
\sigma_i\sigma_j.
$$

Therefore

$$
\widetilde{\mathbf{F}}_{\iota i}^{\mathrm{attr}}
=
-
\widetilde{\mathbf{F}}_i^{\mathrm{attr}},
\qquad
\widetilde{\mathbf{F}}_{\iota i}^{\mathrm{rep}}
=
-
\widetilde{\mathbf{F}}_i^{\mathrm{rep}},
$$

and hence

$$
\widetilde{\mathbf{F}}_{\iota i}
=
-
\widetilde{\mathbf{F}}_i
$$

before self or medium terms, provided those terms also obey the same antipodal closure rule.

This matches the residual-parity result in [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md): vector force and curvature rows are pair-odd, while scalar tangential force projections are pair-even because both $\mathbf{T}_i$ and $\widetilde{\mathbf{F}}_i$ flip sign. The $3$-$2$ bias therefore does not itself justify antipodal relaxation. A relaxation chart opens only after a support-complete exact-antipodal obstruction and the projected-column test in [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md).

---

## 6. Bounded-Speed Ledger Entry

For a bounded speed factor branch, this inventory row enters the center-time root ledger as a source-site invariant plus a weighted root summary.

The source-site invariant is

$$
\mathcal{I}_{i}^{\mathrm{pol}}
=
\left(
A_i,R_i;
N_{\mathrm{attr}}=3,
N_{\mathrm{rep}}=2
\right),
$$

and it is independent of $\nu_i$.

The weighted bounded-speed force summary is

$$
W_{i,\nu}^{\mathrm{attr}}(u)
=
\sum_{\substack{r\in\mathcal{A}_i^\nu(u)\\ j(r)\in A_i}}
\frac{1}{\eta_r(u)^2|J_r^\nu(u)|},
$$

$$
W_{i,\nu}^{\mathrm{rep}}(u)
=
\sum_{\substack{r\in\mathcal{A}_i^\nu(u)\\ j(r)\in R_i}}
\frac{1}{\eta_r(u)^2|J_r^\nu(u)|}.
$$

The corresponding vector rows are

$$
\widetilde{\mathbf{F}}_{i,\nu}^{\mathrm{attr}}(u)
=
-
\sum_{\substack{r\in\mathcal{A}_i^\nu(u)\\ j(r)\in A_i}}
\frac{\widehat{\mathbf{R}}_r(u)}
{\eta_r(u)^2|J_r^\nu(u)|},
$$

$$
\widetilde{\mathbf{F}}_{i,\nu}^{\mathrm{rep}}(u)
=
\sum_{\substack{r\in\mathcal{A}_i^\nu(u)\\ j(r)\in R_i}}
\frac{\widehat{\mathbf{R}}_r(u)}
{\eta_r(u)^2|J_r^\nu(u)|}.
$$

A bounded-speed packet should emit:

| Field | Payload |
| --- | --- |
| `polarity_inventory` | $\sigma_i$, $A_i$, $R_i$, $N_{\mathrm{attr}}=3$, $N_{\mathrm{rep}}=2$ |
| `bounded_speed_root_weights` | $\eta_r$, $J_r^\nu$, $W_{i,\nu}^{\mathrm{attr}}$, $W_{i,\nu}^{\mathrm{rep}}$ |
| `bounded_speed_force_split` | $\widetilde{\mathbf{F}}_{i,\nu}^{\mathrm{attr}}$, $\widetilde{\mathbf{F}}_{i,\nu}^{\mathrm{rep}}$, self and medium rows if present |
| `bounded_speed_projection_split` | attraction/repulsion contributions to $\mathcal{R}_{\parallel,i}^\nu$ and $\mathcal{R}_{\perp,i}^\nu$ |
| `force_moment_decomposition` | handoff to weighted tangent-power, normal-drive, support-radial moment, and antipodal parity rows |
| `inventory_bias_status` | `structural-attraction-bias`, never `force-closure-proof` |

The bounded-speed root ledger should not replace the source-site count by root multiplicity. Both rows matter: the site count records central inventory, while root multiplicity and weights record realized causal history.

---

## 7. Exact-Antipodal Root Ledger Entry

An exact-antipodal root ledger should emit the same inventory row twice: once for the receiver and once for its antipodal mate, with a parity check.

Required fields:

| Field | Payload |
| --- | --- |
| `antipodal_polarity_map` | $\sigma_{\iota i}=-\sigma_i$ |
| `antipodal_inventory_pair` | $N_{\mathrm{attr}}(i)=N_{\mathrm{attr}}(\iota i)=3$, $N_{\mathrm{rep}}(i)=N_{\mathrm{rep}}(\iota i)=2$ |
| `source_set_parity` | $\iota(A_i)=A_{\iota i}$ and $\iota(R_i)=R_{\iota i}$ |
| `root_ledger_parity` | each retained $r=(i,j,\alpha)$ has paired $\iota r=(\iota i,\iota j,\alpha)$ under the same memory convention |
| `force_split_parity` | $\widetilde{\mathbf{F}}_{\iota i}^{\mathrm{attr}}=-\widetilde{\mathbf{F}}_i^{\mathrm{attr}}$ and $\widetilde{\mathbf{F}}_{\iota i}^{\mathrm{rep}}=-\widetilde{\mathbf{F}}_i^{\mathrm{rep}}$ |
| `inventory_bias_parity` | the scalar $3$-$2$ bias is pair-even |

If a memory-window change drops a root for one receiver but not for its antipodal mate, the inventory count remains true but the force-split parity row is not certified. The status should be

$$
\texttt{inventory-count-ok-root-parity-open}.
$$

If the root ledger is antipodally closed but the dynamics residual does not close, the status should be

$$
\texttt{structural-attraction-bias-not-closure}.
$$

---

## 8. Theorem Target

**Theorem target: attraction/repulsion inventory theorem.** Fix a neutral same-level tri-binary site inventory with three positive and three negative polarity signs, one of each polarity in each binary. For every receiver $i$, excluding the ordinary same-source row:

1. $i$ has exactly three opposite-polarity source sites and two same-polarity source sites;
2. the unweighted signed source count is $C_i=-1$, equivalently there is one extra attractive source site;
3. the partner/cross split is one partner attraction, two cross-binary attractions, and two cross-binary repulsions;
4. under exact antipodality, the scalar inventory bias is pair-even and the weighted vector force split is pair-odd on an antipodally closed root ledger;
5. the delayed potential and force rows are weighted by delay, Jacobian, root multiplicity, direction, and any self/medium rows, so the inventory bias is not a proof of fixed-speed or bounded-speed dynamics closure.

Proof route:

1. Count opposite and same signs in a $3$-$3$ polarity inventory after removing the receiver.
2. Use $\sigma_i\sigma_j=-1$ for opposite polarity and $\sigma_i\sigma_j=+1$ for same polarity.
3. Split the opposite-polarity set into the same-binary partner and the two cross-binary opposite-polarity sites.
4. Insert the sign split into the delayed potential and line-of-action force sums.
5. Apply the exact-antipodal involution to source sets, delayed root geometry, Jacobians, and force directions.
6. Compare the resulting weighted sums with the fixed-speed and bounded-speed dynamics equations to show that the count supplies only an inventory row.

Current status:

$$
\texttt{priority-only},
\qquad
\texttt{structural-attraction-bias},
\qquad
\texttt{closed-rejected:inventory-bias-implies-force-closure},
\qquad
\texttt{force-closure-open}.
$$
