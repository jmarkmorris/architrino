# Bounded Speed Factor Extension

Promotion status: `priority-only`. This packet switches the same-level braid branch model from strict fixed carrier speed to a bounded speed factor. It keeps the fixed-speed arclength model as the special case $\nu_i\equiv1$, but no longer treats $\|\dot{\mathbf{x}}_i\|=c_f$ as mandatory branch ontology.

The extension is motivated by the possibility that an architrino may briefly cross a same-source hinge into a controlled self-hit or fold-layer mode, then return to the ordinary partner/cross-binary ledger within a short time. It does not retain a branch. It states the equations and gate rows that a bounded-speed branch must emit before it can replace the current fixed-speed screens.

Filename note: `variable-speed-factor-extension.md` is the legacy filename for the bounded speed factor packet. The canonical center-time chart for this packet is [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md); the scalar tangential solvability row is [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md).

---

## 1. Speed Factor And Time Map

Let each site curve be arclength-parametrized as before:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1.
$$

Introduce a positive dimensionless speed factor

$$
\nu_i(\lambda_i)>0.
$$

The physical velocity in the center-gauge chart is

$$
\dot{\mathbf{x}}_i(t)
=
c_f\nu_i(\lambda_i(t))\mathbf{T}_i(\lambda_i(t)),
\qquad
\mathbf{T}_i=\mathbf{Y}_i'.
$$

The branch must declare a band around the fixed-speed value:

$$
0<\nu_- \le \nu_i(\lambda_i)\le \nu_+,
\qquad
\nu_- = 1-\beta_-,
\qquad
\nu_+ = 1+\beta_+,
$$

with $\beta_-<1$ and $\beta_+$ finite. The fixed-speed packets are recovered by setting

$$
\beta_-=\beta_+=0,
\qquad
\nu_i\equiv1.
$$

The time map is no longer $\lambda=c_ft/R_*$. It is

$$
\frac{d\lambda_i}{dt}
=
\frac{c_f}{R_*}\nu_i(\lambda_i),
$$

or equivalently

$$
t_i(\lambda_i)
=
\frac{R_*}{c_f}
\int_0^{\lambda_i}
\frac{d\xi}{\nu_i(\xi)}.
$$

The dimensionless center-time form used by successor packets is

$$
u=\frac{c_f(t-t_0)}{R_*},
\qquad
\chi_i(\lambda_i)
=
\frac{c_f}{R_*}t_i(\lambda_i)
=
\int_0^{\lambda_i}
\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u).
$$

A common closed branch requires equal physical periods, or a declared winding relation:

$$
T_i
=
\frac{R_*}{c_f}
\int_0^{L_i}
\frac{d\xi}{\nu_i(\xi)},
$$

and either

$$
T_i=T_*
\qquad\text{for all }i,
$$

or

$$
m_iT_i=T_{\mathrm{com}},
\qquad
m_i\in\mathbb{N}.
$$

Equivalently, the dimensionless period row is

$$
H_i=\chi_i(L_i)=\frac{c_f}{R_*}T_i,
\qquad
H_*=\frac{c_f}{R_*}T_*,
$$

with either $H_i=H_*$ for every site or $m_iH_i=H_{\mathrm{com}}$ on a winding branch.

Thus equal arclength length is no longer the period row by itself. The retained row is equal physical return time.

---

## 2. Velocity And Acceleration

Write derivatives with respect to arclength as primes. In the center-gauge chart,

$$
\mathbf{x}_i(t)=R_*\mathbf{Y}_i(\lambda_i(t)).
$$

Then

$$
\dot{\mathbf{x}}_i
=
c_f\nu_i\mathbf{T}_i,
$$

and

$$
\ddot{\mathbf{x}}_i
=
\frac{c_f^2}{R_*}
\left(
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
\right),
\qquad
\mathbf{K}_i=\mathbf{Y}_i''.
$$

The fixed-speed model removed the tangential acceleration row because $\nu_i'=0$. The bounded speed factor model keeps it. If $\widetilde{\mathbf{F}}_i$ is the dimensionless delayed force and $\Gamma$ is the action-derived force-to-curvature scale, the intrinsic dynamics equation becomes

$$
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
=
\Gamma\widetilde{\mathbf{F}}_i.
$$

Equivalently,

$$
\nu_i\nu_i'
=
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i,
$$

and

$$
\nu_i^2\mathbf{K}_i
=
\Gamma P_i^\perp\widetilde{\mathbf{F}}_i,
\qquad
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

So the old tangential closure equation

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0
$$

is replaced by a speed-factor evolution equation. The fixed-speed row is the special case in which the tangential force projection vanishes.

---

## 3. Causal Roots With Bounded Source Speed

For a receiver site $i$ at arclength $\lambda$, define receiver time

$$
t=t_i(\lambda).
$$

For a dimensionless causal delay $\eta>0$, the source time is

$$
s=t-\frac{R_*}{c_f}\eta.
$$

The delayed source arclength $\lambda_j^-$ is determined by

$$
t_j(\lambda_j^-)=s.
$$

The root function becomes

$$
G_{ij}(\lambda,\eta)
=
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda_j^-)
\right\|
-\eta.
$$

The derivatives of the delayed source phase are

$$
\frac{\partial\lambda_j^-}{\partial\eta}
=
-\nu_j^-,
\qquad
\frac{\partial\lambda_j^-}{\partial\lambda}
=
\frac{\nu_j^-}{\nu_i},
$$

where $\nu_j^-=\nu_j(\lambda_j^-)$. Therefore

$$
G_\eta
=
\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}-1
=
-J_{ij},
$$

with the bounded-speed root Jacobian

$$
J_{ij}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}.
$$

The receiver derivative is

$$
G_\lambda
=
\widehat{\mathbf{R}}\cdot
\left(
\mathbf{T}_i
-
\frac{\nu_j^-}{\nu_i}\mathbf{T}_j^-
\right).
$$

These equations replace the fixed-speed Jacobian

$$
1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}
$$

in any bounded-speed root ledger, tail certificate, Newton row, Krawczyk row, or root-front calculation.

---

## 4. Short Self-Hit Mode

For an ordinary same-source row $i=j$, define the earlier source arclength $\lambda^-$ by

$$
t_i(\lambda^-)
=
t_i(\lambda)-\frac{R_*}{c_f}\eta.
$$

Then

$$
\eta
=
\int_{\lambda^-}^{\lambda}
\frac{d\xi}{\nu_i(\xi)}
$$

on a non-winding local segment, while the intervening arclength is

$$
h=\lambda-\lambda^-.
$$

If $\nu_i\le1$ on the segment, then $\eta\ge h$ and the chord inequality prevents a positive-Jacobian ordinary self root, just as in the fixed-speed row. Define the overspeed excess and chord deficit by

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\int_{\lambda^-}^{\lambda}
\left(1-\frac{1}{\nu_i(\xi)}\right)d\xi
,
\qquad
\mathcal{D}_i(\lambda^-,\lambda)
=
h-
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
\right\|.
$$

A same-source ordinary root lies on the hinge equation

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\mathcal{D}_i(\lambda^-,\lambda),
$$

with $\mathcal{A}_i>\mathcal{D}_i$ marking the crossed side of the hinge in a sign-change search. Thus a self-hit mode requires enough overspeed for the causal elapsed distance $\eta=h-\mathcal{A}_i$ to meet the chord length.

A controlled self-hit mode is a connected event interval

$$
\mathcal{H}_i
=
\{\lambda:\text{a same-source ordinary root with }J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0}>0\text{ exists}\}.
$$

It is admissible only if the branch emits:

$$
\operatorname{dur}_u(\mathcal{H}_i)
\le
\tau_{\mathrm{hit}}^u,
$$

where $\operatorname{dur}_u(\mathcal{H}_i)=|\chi_i(\mathcal{H}_i)|$ is the dimensionless center-time duration. Physical duration is recovered by $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$.

and

$$
\int_{\mathcal{H}_i}
(\nu_i-1)_+\,d\lambda
\le
B_{\mathrm{hit}}.
$$

The return row is

$$
\nu_i(\lambda)\to1
$$

outside a declared collar of $\mathcal{H}_i$, or more generally the physical-period and action rows must absorb the speed-factor excursion. If the self-hit interval is present but no short-duration, overspeed-budget, action, and event rows are emitted, the status is

$$
\texttt{self-hit-mode-unledgered}.
$$

This differs from the fixed-speed `regularized-fold-layer` row. A bounded-speed self-hit can be an ordinary delayed root only when the overspeed hinge equation is crossed and the positive Jacobian floor survives. If the row is instead singular or near-zero, it still requires the fold-layer action regularization.

---

## 5. Attraction/Repulsion Inventory Row

The standalone inventory theorem is [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md). This section records the bounded speed factor packet's local dependency on that row.

In a neutral three-binary same-level carrier, every architrino sees three opposite-polarity source sites and two same-polarity source sites, excluding itself:

$$
N_{\mathrm{attr}}(i)=3,
\qquad
N_{\mathrm{rep}}(i)=2.
$$

At the inventory level this gives one extra attractive channel:

$$
N_{\mathrm{attr}}(i)-N_{\mathrm{rep}}(i)=1.
$$

The force ledger must not overread this count. The actual delayed force is weighted by source delay, receiver-normal branch strength, direction, root multiplicity, and any self-hit/fold row:

$$
\widetilde{\mathbf{F}}_i
=
\sum_{j\ne i,\alpha}
\sigma_i\sigma_j
(\eta_{ij}^{\alpha})^{-2}
W_{ij,\alpha}^{\mathrm{rec}}
\widehat{\mathbf{R}}_{ij}^{\alpha}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}.
$$

The bounded-speed successor must replace $W_{ij,\alpha}^{\mathrm{rec}}$ with
the same-record $W_{ij,\alpha}^{\mathrm{rec},\nu}$ row.

The count is therefore a structural bias, not a closure proof. It should be exported as an inventory row beside the analytic force sums.

---

## 6. Bounded Speed Factor Branch Theorem Target

**Theorem target: bounded speed factor same-level branch.** Fix six closed arclength curves $\mathbf{Y}_i$, positive speed factors $\nu_i$, a source-pair policy, a same-source policy, a normalization scale $R_*$, and a support descriptor. Suppose:

1. the speed band holds: $0<\nu_-\le\nu_i\le\nu_+$;
2. the physical return periods are equal or satisfy a declared winding relation;
3. the bounded-speed causal-root ledger is finite, has positive delay floor, and uses $J_{ij}=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$ with a positive Jacobian floor and carries the receiver-normal branch strength $W_{ij}^{\mathrm{rec}}$;
4. any self-hit interval satisfies the short-duration, overspeed-budget, action, and event rows;
5. the bounded-speed dynamics equation

$$
\nu_i^2\mathbf{K}_i+\nu_i\nu_i'\mathbf{T}_i
=
\Gamma\widetilde{\mathbf{F}}_i
$$

holds for all sites;
6. the action-derived $\Gamma$, work-form curl, Noether/event ledger, support descriptor, noncollision, convergence, and stability rows all use the same bounded-speed ledger.

Then the row is a bounded-speed same-level dynamics/action candidate. It becomes a retained branch only after the master retention theorem is rerun with the bounded-speed root, force, action, and event rows.

Proof route:

1. positive $\nu_i$ gives a regular time map and inverse source phases;
2. differentiating the root equation gives the bounded-speed Jacobian and root-sheet derivatives;
3. differentiating $\dot{\mathbf{x}}_i=c_f\nu_i\mathbf{T}_i$ gives the tangential and normal acceleration rows;
4. the self-hit hinge condition identifies when ordinary same-source roots can appear;
5. bounded self-hit duration and overspeed budget prevent the self row from becoming an unledgered singular force channel;
6. action and event rows decide whether the speed-factor exchange is physical rather than a fit.

---

## 7. Output Schema

A bounded speed factor branch packet must emit:

| Field | Payload |
| --- | --- |
| `speed_factor` | $\nu_i(\lambda)$, $\nu_-$, $\nu_+$, $\nu_i'$, and speed-band status |
| `support_descriptor` | free-support, radial-sector, fixed-radius-special-case, nested, or transition support status with certified margins |
| `center_time_map` | $u$, $\chi_i(\lambda)$, $\Lambda_i(u)$, $H_i$, winding/equal-period row, and inverse source phase solver |
| `speed_ode_solvability` | zero-mean tangent forcing, primitive excursion, initial-speed interval, clock/length speed, and speed-band feasibility |
| `bounded_speed_roots` | $G_{ij}^{\nu}$, $J_{ij}^{\nu}$, root brackets, Jacobian floors, and tail certificates using $\nu_j^-$ |
| `dynamics_rows` | $\nu_i\nu_i'=\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i$ and $\nu_i^2\mathbf{K}_i=\Gamma P_i^\perp\widetilde{\mathbf{F}}_i$ |
| `normal_reconstruction` | tangent holonomy, position closure, frame monodromy, support-radial compatibility, and root-ledger persistence for the normal row |
| `self_hit_rows` | hinge intervals, $J_{\mathrm{self}}^{\nu}$ floors, $\tau_{\mathrm{hit}}^u$, $B_{\mathrm{hit}}$, action/event entries, and return rows |
| `inventory_bias` | $N_{\mathrm{attr}}=3$, $N_{\mathrm{rep}}=2$, and force-weighted attraction/repulsion sums |
| `support_action_work` | support multiplier work, hidden-external-work status, and Noether support residuals when support constraints are active |
| `action_event_rows` | speed-factor contribution to work, support work if active, $\Gamma$, Noether/event, and conservation ledgers |
| `status` | `bounded-speed-candidate`, `fixed-speed-special-case`, `self-hit-mode-unledgered`, or first failed row |

---

## 8. Current $M=3$ Reading

The existing exact-antipodal $M=3$ rows are fixed-speed rows:

$$
\nu_i\equiv1.
$$

They remain useful as the special case, but they do not certify the bounded speed factor model. A bounded-speed successor must rerun the root frontier, support-tail certificate, action scale, Krawczyk proof budget, and master retention theorem with the modified source-time map and Jacobian.

Current status:

$$
\texttt{bounded-speed-row-open},
\qquad
\texttt{self-hit-mode-unledgered},
\qquad
\texttt{not-retained}.
$$
