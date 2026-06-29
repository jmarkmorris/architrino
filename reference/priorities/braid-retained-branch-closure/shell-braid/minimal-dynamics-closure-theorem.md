# Minimal Dynamics Closure Theorem Target

Promotion status: `priority-only`. This packet states the strongest currently defensible theorem-style closure target for shell braid dynamics after the arclength correction in [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md). It does not claim that a retained shell braid branch exists. It states what would be sufficient to retain one, what first-order and nonlinear transversality checks would imply, and which observer/export consequences remain separate obligations.

The current numerical evidence is useful but negative. The rigid zero-offset octahedral carrier has a good noncollision/root seed but fails tangential closure with dimensionless RMS about $1.1009590702$ and maximum about $2.0636859695$. Phase offsets reduce the RMS to about $0.8798$ but leave an $O(1)$ maximum residual. Common radial breathing improves tangential leakage further; under arclength timing the best screened common-breathing row reaches tangential RMS about $0.4658704026$, but the full force-versus-curvature residual remains $O(1)$, with vector dynamics RMS about $1.4628229490$ and a marginal Jacobian floor near $0.2487273439$. Therefore the theorem target below treats tangential improvement as motivation only. The retained object is a zero of the full dynamics residual on one active causal-root ledger.

---

## 1. Branch Class And Unknowns

Let the six same-level sites be indexed by

$$
i=(a,\sigma),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+,-\}.
$$

The polarity row for the neutral Noether braid search is

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon,
\qquad
\epsilon=\frac{|e|}{6}.
$$

This neutral polarity row also carries the site-count inventory from [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md): each receiver has three opposite-polarity attractive source sites and two same-polarity repulsive source sites before delayed root weights are applied.

A candidate same-level branch on a compact window $W=[t_0,t_0+T_*]$ is represented in the center-gauge chart by periodic support-band curves

$$
\mathbf{X}_i(q;\alpha)\in\mathbb{R}^3,
\qquad
q\in\mathbb{R}/2\pi\mathbb{Z},
$$

with parameter vector $\alpha$ in a finite- or Banach-dimensional chart. The branch positions are

$$
\mathbf{x}_i(t;\alpha)
=
\mathbf{C}(t;\alpha)
+
\mathbf{X}_i(q_i(t;\alpha);\alpha).
$$

For the rest-frame branch-existence theorem one imposes the center-gauge row

$$
\mathbf{C}(t)=\mathbf{C}_0,
\qquad
\dot{\mathbf{C}}(t)=\mathbf{0},
\qquad
\ddot{\mathbf{C}}(t)=\mathbf{0},
$$

after quotienting translations. Moving-center rows are observer-export rows, not part of the minimal rest-branch existence claim.

For each curve define

$$
S_i(q;\alpha)=\left\|\frac{\partial\mathbf{X}_i}{\partial q}(q;\alpha)\right\|,
$$

$$
\ell_i(q;\alpha)=\int_0^q S_i(\zeta;\alpha)\,d\zeta,
\qquad
L_i(\alpha)=\ell_i(2\pi;\alpha).
$$

The arclength clock imposes

$$
\ell_i(q_i(t;\alpha);\alpha)=c_ft
\pmod{L_i(\alpha)}.
$$

Thus

$$
\dot q_i(t;\alpha)
=
\frac{c_f}{S_i(q_i(t;\alpha);\alpha)},
$$

and the center-relative velocity and acceleration are

$$
\mathbf{u}_i(t;\alpha)
=
c_f\mathbf{T}_i(q_i(t;\alpha);\alpha),
$$

$$
\dot{\mathbf{u}}_i(t;\alpha)
=
c_f^2\boldsymbol{\kappa}_i(q_i(t;\alpha);\alpha),
$$

where

$$
\mathbf{T}_i(q;\alpha)
=
\frac{\partial_q\mathbf{X}_i(q;\alpha)}
{S_i(q;\alpha)},
$$

and

$$
\boldsymbol{\kappa}_i(q;\alpha)
=
\frac{1}{S_i(q;\alpha)}
\frac{\partial\mathbf{T}_i}{\partial q}(q;\alpha).
$$

The speed residual is therefore not an independent residual for arclength-parametrized deformed curves. It is replaced by nondegenerate arclength and common-period compatibility.

---

## 2. Active Root Ledger And Force Ledger

For receiver $i$, source $j$, and source time $s<t$, define

$$
G_{ij}(t,s;\alpha)
=
\left\|
\mathbf{x}_i(t;\alpha)
-
\mathbf{x}_j(s;\alpha)
\right\|
-
c_f(t-s).
$$

A retained active root is a labeled function

$$
s_{ij}^{\beta}(t;\alpha)<t,
$$

with

$$
G_{ij}(t,s_{ij}^{\beta}(t;\alpha);\alpha)=0.
$$

The root Jacobian is

$$
J_{ij}^{\beta}(t;\alpha)
=
1-
\frac{
\mathbf{v}_j(s_{ij}^{\beta}(t;\alpha);\alpha)
\cdot
\widehat{\mathbf{r}}_{ij}^{\beta}(t;\alpha)
}{c_f},
$$

where

$$
\mathbf{r}_{ij}^{\beta}(t;\alpha)
=
\mathbf{x}_i(t;\alpha)
-
\mathbf{x}_j(s_{ij}^{\beta}(t;\alpha);\alpha),
$$

$$
\widehat{\mathbf{r}}_{ij}^{\beta}
=
\frac{\mathbf{r}_{ij}^{\beta}}
{\|\mathbf{r}_{ij}^{\beta}\|}.
$$

The retained active-root ledger is

$$
\mathcal{A}_q(\alpha)
=
\left\{
(i,j,\beta,s_{ij}^{\beta},J_{ij}^{\beta},\chi_{ij}^{\beta})
\right\},
$$

with each status

$$
\chi_{ij}^{\beta}
\in
\{\texttt{retained-positive-delay},
\texttt{regularized-fold-layer},
\texttt{reject}\}.
$$

Rows with status `reject` cannot be used in a retained branch. A same-source row may be absent only if the declared branch class does not require it; otherwise it must be retained or regularized on the same ledger used by the force, energy, and event rows.

For each retained hit, the line-of-action causal-wake force is

$$
\mathbf{F}_{ij}^{\beta}(t;\alpha)
=
\kappa\,\mathrm{sign}(q_iq_j)
\frac{|q_iq_j|W_{ij}^{\mathrm{rec},\beta}(t;\alpha)}
{\left(r_{ij}^{\beta}(t;\alpha)\right)^2}
\widehat{\mathbf{r}}_{ij}^{\beta}(t;\alpha).
$$

The retained-root row must carry $J_{ij}^{\beta}$ as the source-normal root transversality denominator and $W_{ij}^{\mathrm{rec},\beta}$ as the receiver-normal branch-strength weight.

The total branch force on site $i$ is

$$
\mathbf{F}_i(t;\alpha)
=
\mathbf{F}_i^{\mathrm{partner}}
+
\mathbf{F}_i^{\mathrm{cross}}
+
\mathbf{F}_i^{\mathrm{self}}
+
\mathbf{F}_i^{\mathrm{med}},
$$

where each term is computed from the same root ledger. The medium-response term is allowed only if a declared constitutive row and event ledger accompany it; otherwise it is set to zero rather than used as an implicit closure channel.

---

## 3. Hard Floor Hypotheses

The theorem target separates hard floor hypotheses from residual equations. For a retained shell braid dynamics candidate, the following inequalities must hold on the same window $W$.

### H1. Curve Regularity And Arclength Nondegeneracy

The curves satisfy at least $C^2$ regularity in $q$ and the active finite- or Banach-dimensional chart is smooth enough that the residual map below is $C^1$ after root continuation. There is a uniform arclength floor

$$
S_i(q;\alpha_*)\ge s_{\min}>0
\qquad
\text{for all }i,q.
$$

### H2. Common Period Or Declared Winding

For the minimal equal-period branch,

$$
L_i(\alpha_*)=L_*(\alpha_*)
\qquad
\text{for all }i.
$$

More general winding rows must declare integers $m_i\in\mathbb{N}$ with

$$
m_iL_i(\alpha_*)=L_{\mathrm{com}}(\alpha_*),
$$

and use $T_{\mathrm{com}}=L_{\mathrm{com}}/c_f$ as the return period. The theorem below uses the equal-period row unless the winding data are explicitly included in $\Phi_q$.

### H3. Support Band And Center Gauge

There are $R>0$ and $\delta\ge0$ such that

$$
R-\delta
\le
\|\mathbf{X}_i(q_i(t;\alpha_*);\alpha_*)\|
\le
R+\delta
\qquad
\text{for all }i,t.
$$

The weighted center gauge closes:

$$
\sum_i\omega_i\mathbf{X}_i(q_i(t;\alpha_*);\alpha_*)=\mathbf{0},
\qquad
\sum_i\omega_i\mathbf{u}_i(t;\alpha_*)=\mathbf{0},
\qquad
\sum_i\omega_i=1.
$$

### H4. Noncollision

The Euclidean noncollision floor is positive:

$$
d_{\min}(\alpha_*)
=
\inf_{i\ne j,\ t\in W}
\|\mathbf{x}_i(t;\alpha_*)-\mathbf{x}_j(t;\alpha_*)\|
>
\epsilon_x.
$$

### H5. Root Finiteness, Completeness, And Transversality

For every retained receiver time, the active root set is finite, complete under the declared root policy, and has finite memory depth:

$$
|\mathcal{A}_q(t;\alpha_*)|<\infty,
\qquad
h_{\mathrm{mem}}(\alpha_*)<\infty.
$$

Every retained root is simple:

$$
J_{\min}(\alpha_*)
=
\inf_{(i,j,\beta,t)\in\mathcal{A}_q(\alpha_*)}
|J_{ij}^{\beta}(t;\alpha_*)|
>
\epsilon_J.
$$

No required root row has status `reject`.

### H6. Inventory And Event Domain

The inventory ledger is fixed on the branch:

$$
\mathcal{I}_q=(N_+,N_-;C_{\mathrm{cent}},S_{\mathrm{chor}},Q),
\qquad
Q=\epsilon(N_+-N_-).
$$

For the neutral six-site branch,

$$
N_+=N_-=3,
\qquad
Q=0.
$$

Energy, momentum, angular momentum, charge, source provenance, recoil, and Noether sea update rows are all defined on the same state history and root ledger. Rows not defined may be marked `not_computed`, but then they cannot support retention beyond the narrower dynamics-only statement.

---

## 4. Minimal Dynamics Residual

The arclength dynamics residual is the vector residual

$$
\mathcal{R}_{\mathrm{dyn},i}(t;\alpha)
=
\mathbf{F}_i(t;\alpha)
-
\ddot{\mathbf{C}}(t;\alpha)
-
c_f^2\boldsymbol{\kappa}_i(q_i(t;\alpha);\alpha).
$$

In the center-gauge branch-existence chart this reduces to

$$
\mathcal{R}_{\mathrm{dyn},i}(t;\alpha)
=
\mathbf{F}_i(t;\alpha)
-
c_f^2\boldsymbol{\kappa}_i(q_i(t;\alpha);\alpha).
$$

The older tangential and radial/support residuals are projections of this vector equation. In particular,

$$
\mathbf{T}_i(q_i(t;\alpha);\alpha)
\cdot
\mathcal{R}_{\mathrm{dyn},i}(t;\alpha)
=
\mathbf{T}_i(q_i(t;\alpha);\alpha)
\cdot
\mathbf{F}_i(t;\alpha),
$$

because $\mathbf{T}_i\cdot\boldsymbol{\kappa}_i=0$. Thus tangential closure remains necessary, but it is not enough. The curvature direction and scale must also close.

The minimal residual vector for a retained arclength dynamics branch is

$$
\mathcal{F}_{\mathrm{dyn}}(\alpha)
=
\left(
\mathcal{R}_{\mathrm{state}},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{dyn}},
\mathcal{R}_{\mathrm{inventory}},
\mathcal{R}_{E},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{return}},
\mathcal{R}_{\mathrm{stab}}
\right).
$$

The components mean:

| Residual | Required zero or pass condition |
| --- | --- |
| $\mathcal{R}_{\mathrm{state}}$ | support-band, center-gauge, endpoint, and noncollision rows pass; floor inequalities remain strict |
| $\mathcal{R}_{L}$ | $L_i-L_1=0$ for $i=2,\ldots,6$, or declared winding residuals vanish |
| $\mathcal{R}_{\mathrm{root}}$ | all retained root equations vanish and all required root statuses are populated |
| $\mathcal{R}_{\mathrm{dyn}}$ | $\mathcal{R}_{\mathrm{dyn},i}(t)=\mathbf{0}$ for every site and retained time |
| $\mathcal{R}_{\mathrm{inventory}}$ | polarity, central inventory, and charge ledger close |
| $\mathcal{R}_{E}$ | history-dressed energy/action residual closes on the same active roots |
| $\mathcal{R}_{\mathrm{event}}$ | $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, source provenance, recoil, and medium update close or are explicitly outside the claim |
| $\mathcal{R}_{\mathrm{return}}$ | the return-section gap vanishes after quotienting gauge directions |
| $\mathcal{R}_{\mathrm{stab}}$ | the declared stability class is supported by the return-map or Lyapunov row |

For a purely dynamics-only theorem, $\mathcal{R}_{E}$ and $\mathcal{R}_{\mathrm{event}}$ may be omitted from the residual map, but the result must then be named `dynamics-only` and cannot be called a retained physical branch. A retained shell braid branch candidate requires the full residual vector above, plus inventory and stability certificate rows on the same live ledger, with observer/export rows still handled separately in Section 8.

---

## 5. Theorem Target: Minimal Same-Level Dynamics Closure

**Theorem target.** Fix a branch class $q$, a support-band curve family $\mathbf{X}_i(q;\alpha)$, a root policy, a force ledger, an endpoint convention, and tolerances

$$
\epsilon_x,\epsilon_J,\epsilon_{\mathrm{tri}},\epsilon_P,\epsilon_{\mathrm{stab}}>0.
$$

Assume there exists a parameter $\alpha_*$ such that H1-H6 hold and

$$
\mathcal{F}_{\mathrm{dyn}}(\alpha_*)=\mathbf{0}
$$

in the declared residual norms, with strict noncollision, arclength, support-band, and Jacobian floors. Then $\alpha_*$ is a retained shell braid dynamics candidate on $W$.

If the event/action, inventory, and stability certificate rows are included and vanish on the same live ledger, the branch is a retained priority-side physical branch candidate. If those rows are omitted or marked `not_computed`, the result is only a retained dynamics candidate and cannot support mass, Lorentz, photon, color, strong-field, or corpus-migration claims.

This theorem target is conditional. It does not assert that such an $\alpha_*$ exists. The current screens show that rigid and common-breathing rows do not satisfy the hypotheses.

---

## 6. Transverse Zero And Continuation

Let $\mathcal{M}_{\mathrm{adm}}$ be the admissible parameter/history chart after quotienting translations, rotations, common phase, and any declared support-radius gauge. Let

$$
\widehat{\mathcal{F}}_{\mathrm{dyn}}
:
\mathcal{M}_{\mathrm{adm}}\times\Lambda
\to
\mathcal{Y}
$$

be the gauge-reduced residual map, where $\Lambda$ contains continuation parameters such as $\eta$, support-band thickness $\delta/R$, Fourier order or collocation order, phase/winding data, medium-response coefficients, and root-policy labels that are kept fixed inside one branch stratum.

A zero $(\alpha_*,\lambda_*)$ is transverse if the derivative

$$
D_{\alpha}
\widehat{\mathcal{F}}_{\mathrm{dyn}}(\alpha_*,\lambda_*)
:
T_{\alpha_*}\mathcal{M}_{\mathrm{adm}}
\to
\mathcal{Y}
$$

is surjective after removing gauge rows and after restricting to the same active-root stratum.

**Continuation consequence.** If $(\alpha_*,\lambda_*)$ is a transverse zero and the strict floors in H1-H5 hold with positive margins, then the implicit function theorem gives a local $C^1$ continuation of branch zeros for nearby continuation parameters that do not cross a root-status boundary. On this local continuation:

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J,
\qquad
S_i>s_{\min},
$$

and the active root labels persist by root transversality.

The branch continuation terminates, or must change branch label, when any of the following occurs:

$$
d_{\min}\downarrow\epsilon_x,
\qquad
J_{\min}\downarrow\epsilon_J,
\qquad
\inf S_i\downarrow0,
$$

or when a required root is born, lost, merged, exits the memory window, or changes status without a declared regularized transition.

---

## 7. Stability Consequences

Transversality of $\widehat{\mathcal{F}}_{\mathrm{dyn}}$ gives persistence of zeros. It does not by itself prove asymptotic stability. Stability requires the return-map row.

Let $\Sigma_q$ be a return section fixing the center gauge, inventory, root-status convention, and one phase gauge. Let

$$
P_{\lambda}:\Sigma_q\to\Sigma_q
$$

be the return map on admissible histories, and let $Z_*$ be the history state corresponding to $\alpha_*$. The return residual is

$$
\mathcal{R}_{\mathrm{return}}(Z_*,\lambda_*)
=
\Pi_{\mathrm{ng}}\left(P_{\lambda_*}(Z_*)-Z_*\right),
$$

where $\Pi_{\mathrm{ng}}$ removes gauge directions.

The available stability conclusions are:

1. If $\mathcal{R}_{\mathrm{return}}=0$ and $I-DP_{\lambda_*}(Z_*)$ is invertible on the non-gauge complement, then the periodic branch state is locally unique on the chosen return section and continues under small root-ledger-preserving perturbations of $\lambda$.
2. If all non-gauge Floquet multipliers of $DP_{\lambda_*}(Z_*)$ have modulus below $1-\epsilon_{\mathrm{stab}}$, except for the declared phase-neutral multiplier, the branch supports the `stable_limit_cycle` row.
3. If there are declared neutral torus directions and all transverse multipliers are below $1-\epsilon_{\mathrm{stab}}$, the branch supports the `quasiperiodic_carrier` row.
4. If the Lyapunov or multiplier split satisfies the normal-domination inequality

   $$
   \max \operatorname{Re}(\lambda_{\perp})
   <
   \min \operatorname{Re}(\lambda_{\parallel}^-)
   \le 0,
   $$

   then the branch supports an NHIM persistence row on the declared invariant set.
5. A positive-entropy or SRB claim additionally requires

   $$
   \max \operatorname{Re}(\lambda_{\parallel}^+)>0
   $$

   and an emitted $h_{\mathrm{KS}}^{(q)}$ row. Without this, the strongest supported claim is a stable limit cycle, quasiperiodic carrier, or NHIM target, depending on the spectrum.

If the return map is not computed, the branch may still be an algebraic dynamics zero, but it is not a retained stable branch.

---

## 8. Observer And Export Rows Remain Separate

The minimal dynamics theorem does not produce observer-level recovery by implication. The following rows are separate obligations even after a retained shell braid dynamics candidate exists.

| Export family | Separate object still required |
| --- | --- |
| Lorentz clock/ruler recovery | a moving-branch export $\mathcal{O}_q(\mathbf{v};W)$ with retained active roots, clock extraction, ruler extraction, two-way signal row, and preferred-frame leakage residual |
| Photon closure | a branch-transition packet recovering the coaxial contra-rotating pro/anti planar pair and closing the photon event ledger |
| Mass map | $E_{\mathrm{hist}}$, $\mathcal{Z}^{ab}$, $\zeta$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and $m_{\mathrm{tr}}$ computed by one extraction map on the same branch |
| Generation hierarchy | branch-family rows whose mass ratios pass through exposure-dressed energy and Noether sea response rather than a standalone topological label |
| Color / $SU(3)$ | a continuous phase-bundle connection, generators, curvature, and transport/confinement residuals; $\mathcal{S}_3$ remains only a discrete scaffold |
| Strong-field and cosmology comparison | finite-boundary continuation, event-ledger closure, and observer-variable translation rows |

Failure to compute these rows must be recorded as `not_computed`; it must not be converted into a pass by the existence of the rest-frame dynamics branch.

---

## 9. Linearized Necessary Screen

For a finite Fourier or collocation family near a seed row, let $A_{\mathrm{red}}$ be the gauge-reduced derivative of the chosen residual map. In the arclength formulation the row set should use period compatibility and vector force-versus-curvature residuals rather than the naive speed residual for deformed curves.

Let

$$
\mathbf{r}_{\mathrm{red}}^0
$$

be the residual vector at the seed. A first-order deformation in the selected finite mode space can cancel the selected residual rows only if

$$
\operatorname{rank}(A_{\mathrm{red}})
=
\operatorname{rank}
\left(
\begin{bmatrix}
A_{\mathrm{red}} & -\mathbf{r}_{\mathrm{red}}^0
\end{bmatrix}
\right).
$$

Equivalently,

$$
\mathbf{y}^T\mathbf{r}_{\mathrm{red}}^0=0
\qquad
\text{for every }
\mathbf{y}\in\ker(A_{\mathrm{red}}^T).
$$

If this augmented-rank equality fails, the selected finite family, root policy, gauge choice, and scale/coupling row cannot contain a transverse nonlinear zero perturbatively near the seed. If it holds, the candidate must still pass the floor screen:

$$
\Delta_x<d_{\min}^0-\epsilon_x,
\qquad
\Delta_J<J_{\min}^0-\epsilon_J,
\qquad
\Delta_{\rho}<\delta/R,
$$

and then undergo nonlinear arclength rescreening. Linear solvability is not branch retention.

---

## 10. Proof Route

The theorem target has the following proof structure.

1. **Arclength kinematics.** H1 gives inverse arclength phases $q_i(t)$ and proves $\|\mathbf{u}_i(t)\|=c_f$ identically.
2. **Root continuation.** H5 and the implicit function theorem give locally unique $C^1$ active-root labels and root derivatives on the retained stratum.
3. **Force regularity.** H4 and H5 keep inverse-square factors, source-normal denominators, and receiver-normal branch-strength rows away from singular values, so each retained line-of-action force is $C^1$ in the branch chart.
4. **Dynamics closure.** The residual equation $\mathcal{R}_{\mathrm{dyn}}=0$ is exactly the force-versus-curvature equation for fixed-speed arclength motion.
5. **Ledger compatibility.** Inventory, energy/action, and event rows must read the same state history and root ledger; otherwise the result is only a dynamics-screening row.
6. **Continuation.** Surjectivity of the gauge-reduced derivative gives local persistence of zeros by the implicit function theorem; floor strictness keeps the continuation inside the same branch stratum.
7. **Stability.** Return-map and Lyapunov rows supply the stability class. Without those rows, the theorem has no asymptotic-stability conclusion.

This is the minimal defensible closure theorem because it removes the nonphysical speed residual introduced by angle-clock deformations and replaces it with the stronger curvature equation. It also blocks the main overclaim: a better tangential residual is evidence for a deformation direction, not evidence for a retained shell braid branch.

---

## 11. Priority Decision

This packet is `priority-only`. It becomes promotion material only after a concrete run packet supplies an $\alpha_*$ satisfying the theorem hypotheses, emits the residual vector with tolerances, passes nonlinear arclength rescreening on one active-root convention, and records the observer/export rows as `passed`, `failed`, or `not_computed`.
