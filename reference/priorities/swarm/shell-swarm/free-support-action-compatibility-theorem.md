# Free-Support Action Compatibility Theorem

Promotion status: `priority-only`. This packet adds the action and Noether compatibility row for free-support bounded speed factor branches. It refines [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md), [gamma-scale-action-row.md](gamma-scale-action-row.md), [force-balance-reduction.md](force-balance-reduction.md), and [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md).

The target is:

$$
\text{free-support dynamics}
+\text{same action ledger}
+\text{closed support work row}
\quad
\Longrightarrow
\quad
\text{Noether-compatible support constraints}.
$$

This packet does not retain a branch, compute a causal-root ledger, or authorize corpus migration.

---

## 1. Scale Versus Support Descriptor

The action scale $R_*$ is a normalization scale. It fixes the dimensionless clock and interaction-energy unit:

$$
u=\frac{c_f(t-t_0)}{R_*},
\qquad
E_\epsilon(R_*)=\frac{\kappa\epsilon^2}{R_*}.
$$

It is not, by itself, the branch support radius. The actual support data are a support descriptor

$$
\mathcal{D}_{\mathrm{supp}}
=
\left(
\mathbf{C},
R_i^-(u),
R_i^+(u),
\delta_i(u),
\text{sector labels}
\right),
$$

or, in a same-level constant-band shorthand,

$$
R-\delta\le\rho_i(u)\le R+\delta.
$$

Thus a retained packet must declare both rows:

| Row | Meaning |
| --- | --- |
| $R_*$ | normalization scale used by root, action, force, and mass rows |
| $\mathcal{D}_{\mathrm{supp}}$ | support-band data constraining the actual radius $\rho_i(u)$ |

The equality $R_*=R$ is an optional gauge or sector choice. It is not a theorem consequence. If a packet silently identifies them, its support/action status is

$$
\texttt{support-scale-descriptor-collapsed}.
$$

---

## 2. Support Barriers And Multipliers

For a free-support bounded speed factor branch, write

$$
\mathbf{X}_i(u)=\mathbf{Y}_i(\Lambda_i(u)),
\qquad
\rho_i(u)=\|\mathbf{X}_i(u)-\mathbf{C}\|,
$$

and

$$
\mathbf{n}_i(u)
=
\frac{\mathbf{X}_i(u)-\mathbf{C}}{\rho_i(u)}.
$$

The general band row is encoded by upper and lower barriers

$$
B_i^+(u)=\rho_i(u)-R_i^+(u)\le0,
\qquad
B_i^-(u)=R_i^-(u)-\rho_i(u)\le0.
$$

The support constraint multipliers are nonnegative measures or functions

$$
\mu_i^+(u)\ge0,
\qquad
\mu_i^-(u)\ge0,
$$

with complementarity

$$
\mu_i^+(u)B_i^+(u)=0,
\qquad
\mu_i^-(u)B_i^-(u)=0,
$$

on the retained event window. In a smooth active-boundary sector they may be ordinary functions. At impacts, grazing contacts, or nonsmooth wall transitions they must be treated as measures, and the event ledger must record the endpoint impulses.

The dimensionless support constraint action row is

$$
\mathcal{S}_{\mathrm{supp}}^\nu
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_{u_-}^{u_+}
\left(
\mu_i^+ B_i^+
+\mu_i^- B_i^-
\right)
du.
$$

This row belongs inside $\mathcal{S}_{\mathrm{constraints}}^\nu$. It is admissible only on the same center-time chart, root ledger, endpoint convention, and support descriptor used by the dynamics rows.

---

## 3. Support Work One-Form

For a chart direction

$$
v=(\xi,\rho_\nu),
$$

where $\xi_i=D_v\mathbf{Y}_i$ and $\rho_{\nu,i}=D_v\nu_i$, the bounded-speed clock-corrected curve variation is

$$
\Xi_{v,i}(u)
=
\xi_i(\lambda_i)
-\nu_i(\lambda_i)\mathbf{T}_i(\lambda_i)
\phi_{v,i}(\lambda_i),
$$

with $\lambda_i=\Lambda_i(u)$ and

$$
\phi_{v,i}(\lambda)
=
-
\int_0^\lambda
\frac{\rho_{\nu,i}(s)}{\nu_i(s)^2}
\,ds.
$$

The radial variation is

$$
D_v\rho_i
=
\mathbf{n}_i\cdot\Xi_{v,i}
-\mathbf{n}_i\cdot D_v\mathbf{C}.
$$

If the support descriptor is also varied, then

$$
D_vB_i^+
=
D_v\rho_i-D_vR_i^+,
\qquad
D_vB_i^-
=
D_vR_i^- -D_v\rho_i.
$$

With fixed support descriptor, the support virtual-work one-form is

$$
\omega_{\mathrm{supp}}^\nu(v)
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_{u_-}^{u_+}
\left(
\mu_i^+-\mu_i^-
\right)
\mathbf{n}_i\cdot\Xi_{v,i}
\,du
-
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_{u_-}^{u_+}
\left(
\mu_i^+-\mu_i^-
\right)
\mathbf{n}_i\cdot D_v\mathbf{C}
\,du.
$$

Equivalently, the support multiplier contributes the radial generalized force row

$$
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu
=
\left(
\mu_i^+-\mu_i^-
\right)\mathbf{n}_i.
$$

Therefore the full action work one-form on a fixed support descriptor is

$$
\omega_{\mathrm{tot}}^\nu(v)
=
D_v\mathcal{S}_{\mathrm{car}}^\nu
+\omega_{\mathrm{hist}}^\nu(v)
+\omega_{\mathrm{supp}}^\nu(v)
+D_v\mathcal{S}_{\mathrm{speed}}^\nu
+D_v\mathcal{S}_{\mathrm{sea/event}}^\nu
+D_v\mathcal{S}_{\mathrm{other\ constraints}}^\nu.
$$

The curve Euler-Lagrange row receives the support-radial term

$$
\nu_i\nu_i'\mathbf{T}_i
+\nu_i^2\mathbf{K}_i
-\Gamma_B^\nu\widetilde{\mathbf{F}}_i^\nu
-\Gamma_B^\nu
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu
=\mathbf{0},
$$

or, in radial projection,

$$
\frac{d^2\rho_i}{du^2}
-
\frac{\nu_i^2\left(1-(r_i')^2\right)}{r_i}
-
\Gamma_B^\nu
\mathbf{n}_i\cdot\widetilde{\mathbf{F}}_i^\nu
-
\Gamma_B^\nu
\left(
\mu_i^+-\mu_i^-
\right)
=0.
$$

If the dynamics packet instead treats support viability as an inequality-only admissible set, then the same term must appear as a variational inequality:

$$
\omega_{\mathrm{tot}}^\nu(w-v)\ge0
$$

for all admissible variations $w$ in the tangent cone of the support band. Omitting either the multiplier row or the variational inequality leaves the radial/free-support action row open.

---

## 4. Support Work And Closed-Branch Noether Compatibility

The support power density in causal time is

$$
\mathcal{P}_{\mathrm{supp},i}^\nu(u)
=
E_\epsilon(R_*)
\nu_i(u)
\left(
\mu_i^+-\mu_i^-
\right)
\mathbf{n}_i\cdot\mathbf{T}_i.
$$

Since

$$
\frac{d\rho_i}{du}
=
\nu_i\mathbf{n}_i\cdot\mathbf{T}_i,
$$

this can be written as

$$
\mathcal{P}_{\mathrm{supp},i}^\nu(u)
=
E_\epsilon(R_*)
\left(
\mu_i^+-\mu_i^-
\right)
\frac{d\rho_i}{du}.
$$

The integrated support work over a branch window $W=[u_-,u_+]$ is

$$
\mathcal{W}_{\mathrm{supp}}^\nu(W)
=
\sum_i
\int_{u_-}^{u_+}
\mathcal{P}_{\mathrm{supp},i}^\nu(u)
\,du.
$$

For a closed branch with periodic support descriptor, support-band barriers do no net work over one period if at least one of the following rows is certified:

1. the constraints are inactive almost everywhere:

$$
\mu_i^+=\mu_i^-=0
\quad
\text{except on a zero-work set};
$$

2. active contacts are ideal unilateral constraints:

$$
B_i^\pm=0
\quad\Longrightarrow\quad
\frac{d\rho_i}{du}=0
\quad
\text{on the active support of } \mu_i^\pm;
$$

3. the barriers come from a periodic support potential

$$
U_{\mathrm{supp}}(\rho_i,u+H_*)=U_{\mathrm{supp}}(\rho_i,u),
$$

with

$$
E_\epsilon(R_*)
\left(
\mu_i^+-\mu_i^-
\right)
=
-
\frac{\partial U_{\mathrm{supp}}}{\partial\rho_i},
$$

so that

$$
\mathcal{W}_{\mathrm{supp}}^\nu([0,H_*])
=
-
\sum_i
\left[
U_{\mathrm{supp}}(\rho_i,u)
\right]_0^{H_*}
=0;
$$

4. nonzero support exchange is explicitly assigned to the Noether-Sea/event ledger:

$$
\mathcal{W}_{\mathrm{supp}}^\nu(W)
+
\mathcal{W}_{\mathrm{sea/event,supp}}^\nu(W)
=0.
$$

Under any of these rows, the support multipliers do not act as unledgered external work. The bounded speed factor exchange row is then upgraded to

$$
\mathcal{E}_{\mathrm{exch}}^\nu(W)
=
\sum_i
\left[
E_{\mathrm{spd},i}^\nu
\right]_{u_-}^{u_+}
-
\sum_i
\int_W
\left(
E_\epsilon(R_*)
\nu_i\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^\nu
+
\mathcal{P}_{\mathrm{supp},i}^\nu
+
\mathcal{P}_{\mathrm{other\ constr},i}^\nu
+
\mathcal{P}_{\mathrm{sea/event},i}^\nu
\right)
du.
$$

If $\mathcal{P}_{\mathrm{supp}}^\nu$ is nonzero and is omitted from this row, the energy current is not closed.

---

## 5. Noether Identity With Support Constraints

For a symmetry generator $\zeta$ acting on branch histories, speed factors, support descriptor data, and event variables, the Noether identity becomes

$$
\delta_\zeta\mathcal{S}_{\mathrm{tot}}^\nu
=
\left[
\mathcal{J}_\zeta^\nu
\right]_{u_-}^{u_+}
+
\int_{u_-}^{u_+}
\sum_i
\left\langle
\mathrm{EL}_{Y,i}^\nu,
\delta_\zeta\mathbf{Y}_i
\right\rangle
du
+
\int_{u_-}^{u_+}
\sum_i
\mathrm{EL}_{\nu,i}^\nu
\delta_\zeta\nu_i
\,du
+
\mathcal{R}_{\zeta,\mathrm{supp}}^\nu
+
\mathcal{R}_{\zeta,\mathrm{exch}}^\nu
+
\mathcal{R}_{\zeta,\mathrm{sea}}^\nu
+
\mathcal{R}_{\zeta,\mathrm{boundary}}^\nu.
$$

The support residual is

$$
\mathcal{R}_{\zeta,\mathrm{supp}}^\nu
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\sum_i
\int_{u_-}^{u_+}
\left(
\mu_i^+D_\zeta B_i^+
+
\mu_i^-D_\zeta B_i^-
\right)
du.
$$

For time translation, the support row is Noether-compatible only if the support descriptor is time-periodic or its explicit time dependence is ledgered:

$$
\partial_uR_i^\pm=0
\quad
\text{or}
\quad
\mathcal{R}_{\partial_u,\mathrm{supp}}^\nu
\text{ is included in the event exchange}.
$$

For spatial translations and rotations, compatibility requires that the center and support descriptor transform with the branch:

$$
D_\zeta
\left(
\rho_i-R_i^\pm
\right)
=0
$$

for rigid Euclidean motions, or that the resulting work be recorded as a boundary or medium-response exchange. A support band fixed to an external laboratory center while the branch is translated or rotated is an external structure and breaks the corresponding Noether current unless its exchange is explicit.

The conservation bound must therefore include the support residual:

$$
|\mathcal{R}_{\zeta}^\nu|
\le
C_{\zeta,Y}\|\mathrm{EL}_{Y}^{\nu}\|
+
C_{\zeta,\nu}\|\mathrm{EL}_{\nu}^{\nu}\|
+
C_{\zeta,\mathrm{supp}}
\|\mathcal{R}_{\zeta,\mathrm{supp}}^\nu\|
+
C_{\zeta,\mathrm{exch}}
\|\mathcal{R}_{\mathrm{exch}}^\nu\|
+
\epsilon_{\mathrm{curl}}^\nu
+
\epsilon_{\mathrm{root}}^\nu
+
\epsilon_{\mathrm{tail}}^\nu
+
\epsilon_{\mathrm{disc}}^\nu
+
\epsilon_{\mathrm{endpoint}}^\nu.
$$

---

## 6. Theorem Target

**Theorem target: free-support action compatibility.** Fix one free-support bounded speed factor branch chart, one active causal-root ledger, one support descriptor $\mathcal{D}_{\mathrm{supp}}$, one endpoint convention, and one event window. Suppose:

1. the bounded-speed root ledger has finite memory, positive Jacobian floors, and the same source-pair policy used by the history work row;
2. the action scale row derives $\Gamma_B^\nu=E_\epsilon(R_*)/(m_{\mathrm{car}}c_f^2)$ or emits a tensorial inertia row;
3. the support barriers $B_i^\pm\le0$ pass viability and have multipliers $\mu_i^\pm\ge0$ satisfying complementarity;
4. the support virtual-work one-form $\omega_{\mathrm{supp}}^\nu$ is included in the total one-form or replaced by an equivalent variational inequality;
5. the support work over every declared closed branch window vanishes, is periodic-potential exact, or is assigned to the Noether-Sea/event exchange ledger;
6. all Noether currents use the same root, speed-factor, support, action, endpoint, and event conventions.

Then the radial/free-support rows are action-compatible: their multiplier contribution is part of $\mathcal{S}_{\mathrm{constraints}}^\nu$, their support work is not hidden external power, and the bounded-speed Noether conservation envelope may include them through $\mathcal{R}_{\zeta,\mathrm{supp}}^\nu$. In the zero-error closed-branch limit with no sea/event support exchange,

$$
\mathcal{W}_{\mathrm{supp}}^\nu([0,H_*])=0,
\qquad
\mathcal{R}_{\zeta,\mathrm{supp}}^\nu=0,
$$

for every retained symmetry generator $\zeta$.

This theorem target does not prove existence of a branch. It states the compatibility obligations that prevent support-band constraints from becoming hidden external work.

---

## 7. Failure Modes

| Failure code | Trigger |
| --- | --- |
| `support-scale-descriptor-collapsed` | $R_*$ is treated as the actual support radius without declaring the support descriptor |
| `support-multiplier-missing` | active support barriers are used in dynamics but no multiplier, potential, or variational inequality row is supplied |
| `support-work-unledgered` | $\mathcal{W}_{\mathrm{supp}}^\nu(W)\ne0$ and no Noether-Sea/event exchange row absorbs it |
| `support-noether-breaking-external-center` | translation or rotation currents are claimed while the support center or band is fixed to an external structure |
| `support-clock-mismatch` | support work is evaluated in arclength while force, action, and Noether rows use bounded-speed causal time |
| `support-action-ledger-mismatch` | support, force, action, speed-factor, or event rows use different root ledgers, endpoint conventions, or support descriptors |
| `hidden-external-support-work` | support constraints change branch energy, momentum, or angular momentum but are omitted from the conservation residuals |
| `free-support-action-open` | first unresolved support/action compatibility row |

Current priority status:

$$
\texttt{free-support-action-compatibility-open},
\qquad
\texttt{not-retained}.
$$
