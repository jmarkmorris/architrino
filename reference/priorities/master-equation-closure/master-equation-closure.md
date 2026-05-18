# Master-Equation Closure for Lorentz, GR, Quantum, and Core Dynamics

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `37.80`
- Cost: `5.5`
- ROI: `6.87`
- Status: `active`

## Task Queue

1. `circular_asymptotics` — Extend higher-winding and large-$\beta$ circular self-force asymptotics. Status: `in_progress`; the branchwise large-$\beta$ self-hit estimates partially advance the self-hit side, but the full bare-kernel circular MCB verdict remains open. Depends on: none.
2. `spiral_branch_chart_test` — Certify whether any admissible variable-pitch spiral roots realize negative weighted tangential drive with positive Jacobian floors and finite memory depth, using the promoted variable-pitch formulas, radial-turn inequality, and weighted tangential obstruction test. Status: `next`. Depends on: `circular_asymptotics`.
3. `lorentz_gr_bridge` — Close the Lorentz and weak-field GR bridge from the coarse-grained delayed medium. Status: `pending`. Depends on: `spiral_branch_chart_test`.

## Scope

Keep dynamics, geometry, and mapping centered on [master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md). This workstream now also carries the Lorentz / metric / clock / ruler bridge to GR and the deep closure burden for quantum and core dynamics.

This file remains the control surface for the workstream. No sibling detailed priority file is needed yet; if the program grows, the natural split is one action-kernel / Noether-boundary packet, one circular/spiral closure packet, and one Lorentz/GR bridge packet.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `circular_asymptotics` | This file | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) | Higher-winding and large-$\beta$ circular self-force asymptotics are extended beyond the current leading-order footholds. |
| `spiral_branch_chart_test` | This file | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) and [dyadic-lock](../dyadic-lock/dyadic-lock.md) | One admissible variable-pitch candidate reports partner and self roots, positive Jacobian floors, finite memory depth, radial-turn status, and weighted tangential-drive verdict. |
| `lorentz_gr_bridge` | This file | [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Moving tri-binary contraction and clock retuning are extracted first; only after that independent moving-assembly packet closes may coarse-grained medium response be used for weak-field GR and PPN targets. |

## Completed Kernel Handoff

`characteristic_tail_noether_closure` is closed at the local action-kernel level. [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) now fixes the endpoint-clear normalized delayed-interior characteristic-tail kernel, proves the receiver-gradient identity
$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$
and defines the corresponding energy, momentum, and angular-momentum wake-history increments across a time cut. [effective-lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md) and [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md) now consume that kernel as the available action-level repair rather than as a missing Noether-boundary placeholder.

This completion does not certify a branch or terminal label. Downstream consumers must still pull the increments back to their retained branch charts and prove closure of $K_{\mu}+E_{\mathrm{wake,eff}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}$, and $\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}$ with the same root-ledger, memory-depth, and Jacobian-floor conditions used by the Master EOM. The corpus now states this as a concrete branch-chart conservation test rather than as an open handoff phrase: the required output is the retained-chart pullback of the three Noether totals, with exact wake-history charges separated from work-integral and torque-projection diagnostics.

`spiral_turning_conditions` is also promoted into [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). The corpus now contains the variable-pitch extension, corrected partner Jacobian, self-branch Frenet analogue, radial-turn inequality, and weighted tangential obstruction test. The active priority is no longer to state those formulas; it is to certify or falsify a concrete branch chart that consumes them.

## Live Targets

- Numerical branch-chart evaluation of the normalized delayed-interior characteristic-tail kernel and its Noether wake-history boundary terms under the stated pullback contract.
- Bare-void branch response tensor for isolated assemblies, computed from branch-chart momentum susceptibility before Noether-Sea dressing.
- Full 3D translating tri-binary NFDE / DDE control for emergent $\gamma$-scaling.
- Transfer-operator and invariant-measure control for Born-rule emergence.
- Exact 6-body core stability and shielding extraction for the first-principles mass program.

## Fixed Footholds

- New circular self-hit branches are born at $\tan\xi=\xi$.
- Each such branch is born on a Jacobian-null surface.
- Circular self-branch count grows only linearly.
- The circular self-hit sum is branchwise sign-resolved: radial self terms are outward, higher-winding tangential self terms are not sign-definite, the positive-sine subchart has a backward order-$\beta$ signed tangential residue, and the full signed $|\sin\xi|$ chart cancels the order-$\beta$ signed tangential terms to a bounded remainder while retaining order-$\beta$ absolute tangential activity.
- The symmetric isolated circular two-body ansatz has a partner-side tangential obstruction; the full self-sector cancellation and radial balance must still be certified before a bare-kernel circular MCB no-go or existence theorem is promoted.

## Breather Certificate Routing Gate

Use the collinear-breather certificate as the smallest finite-root-ledger test for the master-equation stack. A full pass validates the certificate pattern, not particle stability. A seed/pre-ledger failure rejects only the chosen candidate or itinerary. A branch-chart failure is a stronger obstruction: higher-dimensional closure claims must then add no-proliferation, Jacobian-floor, inactive-gap, and memory-depth controls before leaning on finite root ledgers. A monodromy failure means the branch may close as an integer ledger but cannot be used as an attractor. A topology failure blocks global branch-sum reasoning across folds until the dual-mollified $\eta>0$ well-posedness and continuity package is tightened.

## Chapter State To Preserve

- The null separatrix and Jacobian-null surface now function as an amplitude wall for the self branch, not by themselves as a proof of circular closure.
- The exact partner-only circular formulas are already recorded at theorem level, including the strict tangential-positivity corollary for the isolated sub-$c_f$ circular binary.
- The non-circular spiral benchmark now includes the variable-pitch extension, corrected partner Jacobian, self-branch Frenet analogue, radial turn inequality, and weighted tangential obstruction test.

## Parallel Tracks

- Circular closure: higher-winding asymptotics, full circular self-force asymptotics, bare-kernel MCB no-go or existence, then non-circular periodic closure.
- Spiral closure: variable-pitch or other non-circular ansatz, self-branch Frenet decomposition, radial-turning conditions, and comparison against the circular obstruction.

## Circular Work Order

1. Treat the self-hit side as partially advanced: preserve the branchwise large-$\beta$ estimates, distinguish the positive-sine subchart from the full signed $|\sin\xi|$ chart, keep radial self terms outward, and keep higher-winding tangential self terms branchwise rather than sign-definite.
2. Finish the remaining circular asymptotics: super-field-speed partner branch asymptotics, radial balance against the outward self terms, and Jacobian-null window control.
3. Prove either the bare-kernel circular MCB no-go theorem or an existence theorem; do not treat the Jacobian-null wall as circular closure.
4. Push the isolated binary to non-circular periodic-orbit closure.

## Spiral Intuition To Preserve

- The circular ansatz hard-codes constant radius, constant speed, constant curvature, rigid branch geometry, and sign-definite tangential contributions.
- A true spiral introduces radial velocity, varying curvature, intersections between later tighter turns and earlier wider-turn wakes, changing Jacobian amplification, and the possibility of a turning point before singular continuation.
- The live question remains: does the symmetric delayed spiral admit a self-consistent limit cycle or radial turning point that the circular ansatz misses?
- The next concrete spiral target is the branch-chart certification test: enumerate admissible partner and self roots for one variable-pitch candidate, certify positive Jacobian floors and finite memory depth, test the radial turn inequality, and decide whether the weighted tangential sum can become negative without extra medium, tri-binary, or multi-body structure.

## Branch-Chart Closure Object

Definition. For a candidate history $\Gamma=\{\mathbf{x}_i(t)\}_{i=1}^N$ on a returned section $\mathcal{S}$ with memory horizon $h$, shell width $\eta$, and core scale $\epsilon_c$, the master-equation branch-chart closure object is
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{ret}},
\lambda_{\mathrm{sec}}
\right).
$$
Here $\mathcal{R}^{\mathrm{act}}$ is the finite list of active causal-root tuples $(i,j,\ell,t,t_{0,\ell})$ satisfying $F_t^{(ij)}(t_{0,\ell})=0$ and $0<t-t_{0,\ell}\le h$; $\mathcal{G}^{\mathrm{inact}}$ is the list of inactive complement intervals with certified gaps $g_a^{(ij)}=\inf_{I_a}|F_t^{(ij)}|$; $\nu_J=\inf_{\mathcal{R}^{\mathrm{act}}}|J_{ij}(t;t_{0,\ell})|$ is the active Jacobian floor; $h_{\mathrm{mem}}=\sup_{\mathcal{R}^{\mathrm{act}}}(t-t_{0,\ell})$ is the certified memory depth; $\mathcal{R}_{\mathrm{ret}}=P_{\mathcal{S}}(\Gamma)-\Gamma$ is the returned-section residual; and $\lambda_{\mathrm{sec}}$ is the non-symmetry stability margin of the returned section.

Condition. A branch chart is admissible for a local master-equation claim only when
$$
\nu_J>0,\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}}g_a^{(ij)}>0,\qquad
h_{\mathrm{mem}}<h<\infty,\qquad
\|\mathcal{R}_{\mathrm{ret}}\|\le \varepsilon_{\mathrm{ret}},
$$
and either the section-anchored monodromy satisfies
$$
\rho(M_{\mathcal{S}}|_{E_\perp})\le 1-\lambda_{\mathrm{sec}}
\quad\text{with}\quad
\lambda_{\mathrm{sec}}>0,
$$
or a certified boundary-trapping budget replaces the spectral margin.

Proof route. The positive Jacobian floor gives simple-root persistence by the implicit-function theorem; the positive inactive gaps exclude unlisted causal roots on the chosen complements; the finite memory depth keeps the dual-mollified absolute-time law on a compact history window; and the returned-section residual plus section stability converts a root ledger into a controlled candidate cycle rather than only an integer branch count.

Projection handoff. Proof-program and simulation artifacts populate $\mathfrak{B}$ by projection; they do not redefine their native packet schemas. The handoff contract is:

| $\mathfrak{B}$ field | Upstream projection |
| --- | --- |
| $\mathcal{R}^{\mathrm{act}}$ | Copy the externally owned active root rows into the tuple list $(i,j,\ell,t,t_{0,\ell})$, preserving receiver, source, branch label, evaluation time, emission time, source class, and simple/fold status when present. |
| $\mathcal{G}^{\mathrm{inact}}$ | Emit the inactive complement intervals $I_a$ and the certified gaps $g_a^{(ij)}=\inf_{I_a}|F_t^{(ij)}|$ that exclude unlisted causal roots on the same memory window. |
| $\nu_J$ | Take the infimum of $|J_{ij}(t;t_{0,\ell})|$ over every active branch actually used in the branch-sum, including deep-past or ancestry branches when they contribute to the certified active ledger. |
| $h_{\mathrm{mem}}$ | Take the supremum of all retained active delays $t-t_{0,\ell}$ and compare it with the declared horizon $h$. |
| $\mathcal{R}_{\mathrm{ret}}$ | Project the proof-program return map, returned sample residuals, or simulation continuation residuals to one section residual $P_{\mathcal{S}}(\Gamma)-\Gamma$ with a declared norm and tolerance. |
| $\lambda_{\mathrm{sec}}$ | Use the symmetry-quotiented monodromy margin when available; if the proof-program certificate uses boundary trapping instead of spectral contraction, record the positive trapping budget as the replacement for the spectral margin. |

If one projection is unavailable, the corresponding field remains an explicit missing proof artifact for that candidate. This blocks local promotion through $\mathfrak{B}$, but it is not a new validation gate and does not authorize this workstream to edit or reinterpret the upstream proof-program or simulation artifacts.

## Bare-Void Response Tensor Target

Claim level. The bare-void response tensor is a priority theorem target for an accepted assembly branch chart. It is not primitive ontology, not a particle-specific mass parameter, not the polarity bookkeeping unit $q$, not the universal kinetic-proxy coefficient $\mu_{\text{arch}}$, not the shielding factor $\zeta(A)$, and not the Noether-Sea dressed mass-response tensor $\mathcal{M}_{\text{sea}}^{ab}$.

Definition target. Let $A$ be a finite assembly in Euclidean void with no surrounding Noether Sea, and let $\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})$ be a $C^1$ family of returned branch charts generated by a small center-of-mass drift from a rest chart $\mathfrak{B}(\mathbf{0})$. The active root ledger, inactive complements, regulator $\eta$, memory horizon, and returned section must remain under the branch-chart projection contract on a drift ball $B_\delta(0)$, with positive Jacobian floor and positive inactive-root gaps throughout that ball. Pull back the branch-chart Noether momentum total
$$
P_{A,\mathrm{tot}}^a(\mathbf{V}_{\mathrm{cm}})
=
P_{\mathrm{mech},\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})}^a
+
P_{\mathrm{wake,eff},\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})}^{(\eta),a}.
$$
The theorem-target tensor is the drift susceptibility
$$
\mathcal{I}_{A,\mathrm{void}}^{ab}
\equiv
\left.
\frac{\partial P_{A,\mathrm{tot}}^a}
{\partial V_{\mathrm{cm},b}}
\right|_{\mathbf{V}_{\mathrm{cm}}=\mathbf{0}}.
$$

Interpretation. $\mathcal{I}_{A,\mathrm{void}}^{ab}$ measures how an accepted assembly's mechanical plus wake-history momentum changes under an infinitesimal center-of-mass drift in bare Euclidean void. It is an assembly-level branch response, not a fundamental architrino property. In a scalar isotropic subcase, the comparison target is
$$
\frac{1}{E_{\mathrm{internal}}(A)}
\mathcal{I}_{A,\mathrm{void}}^{ab}
\stackrel{?}{\longrightarrow}
\frac{h^{ab}}{c_f^2},
$$
where $c_f$ is the primitive field speed. This is only a bare-void comparison. It must not be substituted for the observer-facing $c_{\text{eff}}$ denominator in the mass roadmap until the Noether-Sea dressing map has been derived.

Proof burden. A proof packet for $\mathcal{I}_{A,\mathrm{void}}^{ab}$ must:

1. construct the drift family $\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})$ with the same declared root-ledger identity, finite memory depth, regulator, returned section, and section-stability control as the rest chart;
2. prove persistence of active roots and inactive gaps on $B_\delta(0)$, including a positive Jacobian floor and no unlisted causal roots;
3. pull back $P_{\mathrm{mech}}+P_{\mathrm{wake,eff}}^{(\eta)}$ to the drift family and show differentiability at $\mathbf{V}_{\mathrm{cm}}=\mathbf{0}$;
4. separate regulator, memory-window, and branch-refinement dependence from the tensor coefficient by a controlled convergence statement;
5. report whether the response scalarizes to an isotropic coefficient or remains a genuine tensor with anisotropic residuals.

Relation to the mass map. If certified, $\mathcal{I}_{A,\mathrm{void}}^{ab}$ becomes a bare assembly susceptibility input to the mass-map program. It does not by itself produce observed mass. The Noether-Sea dressed tensor $\mathcal{M}_{\text{sea}}^{ab}$ still has to be derived from the surrounding medium response, shielding/exposure map, and observer-channel effective speed. In particular,
$$
\mathcal{M}_{\text{sea}}^{ab}
\neq
\frac{1}{E_{\mathrm{internal}}(A)}
\mathcal{I}_{A,\mathrm{void}}^{ab}
$$
unless a separate dressing theorem proves that the bare-void susceptibility passes unchanged through the Noether Sea, which is not the current thesis.

Failure modes. The target fails for the candidate chart if no $C^1$ drift family with stable root-ledger identity exists, if a Jacobian floor or inactive-root gap closes, if the derivative depends on undeclared deep-past memory, regulator width, or root-ledger refinement, if the returned-section momentum balance has an uncontrolled boundary residual, if the response requires external Noether-Sea boundary data despite being advertised as bare void, or if isotropic scalarization is asserted while certified anisotropic tensor terms remain.

## Spiral Branch-Chart Test

Definition. For the symmetric variable-pitch spiral with $p(\theta)=-r'(\theta)/r(\theta)$, partner roots at receiver angle $\theta$ are the certified finite set
$$
\mathcal{P}(\theta)
=
\left\{
\Delta>0:
r(\theta)\Lambda_p(\theta,\Delta)=c_f(t(\theta)-t(\theta-\Delta)),
\ |J_{12}(\theta,\Delta)|\ge\nu_J
\right\},
$$
and self roots are the certified finite set
$$
\mathcal{S}(\theta)
=
\left\{
\Delta>0:
r(\theta)\Lambda_s(\theta,\Delta)=c_f(t(\theta)-t(\theta-\Delta)),
\ |J_{11}(\theta,\Delta)|\ge\nu_J
\right\}.
$$
The inactive complement is the remaining $\Delta$-domain in the finite memory interval $0 < t(\theta)-t(\theta-\Delta)\le h_{\mathrm{mem}}$, partitioned into intervals with positive causal-root gaps.

Condition. A radial turn corridor $I_\ast$ is admissible only if it contains a point $\theta_\ast$ with
$$
p(\theta_\ast)=0,\qquad p'(\theta_\ast)\le0,
$$
and the certified active roots satisfy the radial-turn inequality
$$
\mathcal{T}_r(\theta_\ast)
\equiv
r_\ast\dot\theta_\ast^2
-
\sum_{\Delta_p\in\mathcal{P}(\theta_\ast)}
\frac{\kappa |q_1q_2|\,(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(\theta_\ast)}
\frac{\kappa q_1^2\,(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3 |J_{11,s}|}
>0.
$$

Definition. The weighted tangential-drive diagnostic on a corridor $I_\ast$ is
$$
\mathcal{D}_T(I_\ast)
\equiv
\int_{I_\ast}w(\theta)
\left[
\sum_{\Delta_p\in\mathcal{P}(\theta)}
\frac{|q_1q_2|\,S_T^p(\theta,\Delta_p)}
{\Lambda_p^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(\theta)}
\frac{q_1^2\,S_T^s(\theta,\Delta_s)}
{\Lambda_s^3 |J_{11,s}|}
\right]d\theta,
$$
where $w(\theta)\ge0$ is a declared quadrature weight on the returned section and the tangential numerators are the variable-pitch partner/self numerators recorded in the master-equation chapter.

Verdict. The bare isolated spiral passes the tangential obstruction test only if at least one admissible radial turn corridor has $\mathcal{D}_T(I_\ast)\le-\varepsilon_T$ for a declared margin $\varepsilon_T>0$; it fails the bare-kernel spiral route if every admissible radial turn corridor has $\mathcal{D}_T(I_\ast)\ge0$ or if the negative contribution occurs only after losing a Jacobian floor, an inactive-root gap, or finite memory depth.

### Candidate VP-1 Branch-Chart Packet

The smallest current variable-pitch test packet is
$$
p(\theta)=-a\sin\theta,\qquad a=\frac{1}{10},
$$
with
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),\qquad
t(\theta)=\frac{\theta}{\Omega},\qquad
\frac{\Omega R_\ast}{c_f}=b_\ast=\frac{7}{2}.
$$
Use the symmetric isolated pair
$$
\mathbf{x}_1(\theta)=r(\theta)\mathbf{e}_r(\theta),\qquad
\mathbf{x}_2(\theta)=-r(\theta)\mathbf{e}_r(\theta).
$$
The candidate radial-turn corridor is
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],\qquad
\theta_\ast=0,
$$
so $p(0)=0$ and $p'(0)=-a<0$.

For this packet,
$$
\rho(\theta,\Delta)
=
\frac{r(\theta-\Delta)}{r(\theta)}
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
\qquad
p_0=p(\theta-\Delta),
$$
and
$$
b(\theta)=\frac{\Omega r(\theta)}{c_f}
=
b_\ast\exp(a(1-\cos\theta)).
$$
The partner roots are the finite certified solutions of
$$
F_p(\theta,\Delta)\equiv
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}=0,
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and the self roots are the finite certified solutions of
$$
F_s(\theta,\Delta)\equiv
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}=0,
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta}.
$$
The candidate Jacobians are
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
and
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
The root domain is
$$
D_h=(0,4\pi],\qquad h=\frac{4\pi}{\Omega},
$$
with interval certification on $D_{\mathrm{cert}}=[\Delta_{\mathrm{co}},4\pi]$ for a declared $\Delta_{\mathrm{co}}>0$ and a separate excluded-coincidence clearance on $0<\Delta<\Delta_{\mathrm{co}}$.

The active-root Jacobian floor must satisfy
$$
\nu_J
=
\min\left\{
\inf_{\theta\in I_\ast,\ \Delta_p\in\mathcal{P}(\theta)}
|J_{12}(\theta,\Delta_p)|,
\inf_{\theta\in I_\ast,\ \Delta_s\in\mathcal{S}(\theta)}
|J_{11}(\theta,\Delta_s)|
\right\}
>0.
$$
The inactive complements of the certified root tubes must be partitioned into boxes $Q_a^p,Q_a^s$ with
$$
g_a^p=\inf_{Q_a^p}|F_p(\theta,\Delta)|>0,\qquad
g_a^s=\inf_{Q_a^s}|F_s(\theta,\Delta)|>0,
$$
and the excluded self-coincidence interval must satisfy
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<\Delta_{\mathrm{co}}}
\frac{|F_s(\theta,\Delta)|}{\Delta}>0.
$$

The finite-memory bound is supplied by
$$
\rho\le e^{2a},\qquad
\Lambda_{p,s}\le1+e^{2a},\qquad
b(\theta)\le b_\ast e^{2a}.
$$
Thus any retained root obeys
$$
\Delta\le b_\ast e^{2a}(1+e^{2a})<4\pi,
$$
and therefore
$$
h_{\mathrm{mem}}
\le
\frac{b_\ast e^{2a}(1+e^{2a})}{\Omega}
<h.
$$

Use the quadrature weight
$$
w(\theta)=\cos^2(3\theta),\qquad \theta\in I_\ast.
$$
Candidate VP-1 passes the bare isolated spiral test only if the certified chart has
$$
\mathcal{T}_r(0)>0
$$
and
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,\qquad \varepsilon_T>0.
$$
It fails if $\nu_J=0$, an inactive gap closes, near-coincidence self roots cannot be separated from $\Delta=0$, $h_{\mathrm{mem}}\ge h$, $\mathcal{T}_r(0)\le0$, or $\mathcal{D}_T(I_\ast)\ge0$. It also fails if the negative tangential verdict requires roots outside the certified chart. The comparison to circular asymptotics is only the circular obstruction: at $\theta_\ast=0$, both tangential numerators reduce to $\rho\sin\Delta$, so principal roots with $0<\Delta<\pi$ keep the circular positive-tangential sign.

## Promotion Lemma

Lemma. If a candidate history $\Gamma$ has a branch-chart closure object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active Jacobian floor, positive inactive-root gaps, finite memory depth, bounded returned-section residuals, and a stable returned section, then the candidate may support a master-equation closure claim on that chart.

Proof sketch. Positive floors make the branch list locally complete and differentiable; finite memory reduces the causal functional to the certified history window; bounded returned residuals put the candidate within the declared section tolerance; and section stability prevents the result from being only a transient root enumeration. The lemma does not prove global closure across folds, $\eta\to0$ limits, or other histories; it licenses promotion from a candidate ledger to a local theorem target.

## Maximum-Curvature Wall

Keep the maximum-curvature-wall question tied to both tracks. The Jacobian-null boundary amplifies the full self branch, so the tangential contribution also blows up. That is an obstruction, not yet a resolution.

## Lorentz And GR Bridge Program

- Treat the Lorentz / GR bridge as a two-stage theorem program:
  1. prove that moving tri-binaries in the Noether Sea realize $R_\parallel = R_\perp / \gamma$ and $T(v) = T_0 \gamma$ as a stable delayed-dynamics attractor rather than by tuning;
  2. coarse-grain the same causal medium into a constitutive response that yields $g_{\mu\nu}^{\mathrm{eff}}$, weak-field PPN closure, and suppressed preferred-frame leakage.
- Keep the two stages independent in proof order. The moving-assembly extraction uses the delayed root equations, branch admissibility, hierarchy averaging, and clock/ruler observables; weak-field PPN supplies downstream tests of the dressed medium response, not a prerequisite for extracting the homogeneous moving-assembly laws.
- Close $d\tau/dt = F(v,\rho,\Phi)$ and the substrate-to-metric functional.
- Derive the weak-field map from hit-density and medium variables to $g_{\mathrm{eff}}$ constraints in [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md).
- Derive the constitutive closure from the coarse-grained medium itself rather than postulating it:
  - take the continuum limit of the $\eta$-regularized delayed action and effective medium Lagrangian seriously;
  - compute the relevant continuum stress-strain or equivalent constitutive variables of the causal medium;
  - derive the PPN numbers $\gamma$, $\beta$, and $\alpha_i$ to Cassini / LLR precision;
  - recover the weak-field targets $\gamma_{\mathrm{eff}} = 1$, $\beta_{\mathrm{eff}} = 1$, and vanishing preferred-frame coefficients $\alpha_1$, $\alpha_2$, $\alpha_3$;
  - and show Shapiro delay and light-bending equivalence to GR at the advertised $10^{-5}$ level.

## Moving-Assembly Extraction Packet

The first Lorentz bridge object is a homogeneous moving-tri-binary theorem target, not a PPN calculation. Fix a drift band
$$
\mathcal{D}_{\beta}=\{\,0\le\beta_f\le\beta_{\max}<1\,\},
\qquad
\beta_f=\frac{v}{c_f},
$$
and an admitted branch class $q$ with translated attractor family $\boldsymbol{\rho}^{\star}_q(s;\beta_f)$, positive active Jacobian floor, positive inactive-root gaps, finite memory depth, stable monodromy or certified trapping, and no undeclared branch transition inside the band. Primitive causal roots are always solved with the field speed $c_f$:
$$
\left\|\mathbf{x}_{o}(t)-\mathbf{x}_{j}(t_0)\right\|
=
c_f(t-t_0).
$$
The observer-channel speed $c_\star$ is declared only after the branch chart is chosen: $c_\star=c_f$ for a primitive wake chart and $c_\star=c_{\text{eff}}(\mathbf{x},t)$ for a Noether-Sea dressed clock/ruler channel. The photon specialization $c_\star=c_\gamma(\mathbf{x},t)$ is separate and remains a photon-channel closure target. With this convention
$$
\beta_\star=\frac{v}{c_\star},
\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-\beta_\star^2}}.
$$

Extract the moving shape from the cycle-averaged tensor
$$
Q_{ab}^{(q)}(v)
=
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i.
$$
Let $\hat{\mathbf e}_{\parallel}$ be the drift direction and let $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^a\hat e_{\parallel}^b$. The extracted semiaxes are
$$
a_{\parallel,q}(v)
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}(v)\hat e_{\parallel}^{b}},
\qquad
a_{\perp,q}(v)
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}(v)}.
$$
The clock period observable is extracted from a declared clock phase $\theta_{\mathrm{clk},q}$ on the same branch:
$$
T_q(v)
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
T_0=T_q(0).
$$

The moving-assembly residuals are
$$
R_{\parallel}^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)},
\qquad
R_T^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}
-
\gamma_\star(v).
$$
The extraction packet passes on $\mathcal{D}_{\beta}$ only if, for every retained drift speed,
$$
\left|R_{\parallel}^{(q)}(v)\right|
\le
C_{\parallel}\epsilon_{\mathrm{LV}}\beta_\star^2,
\qquad
\left|R_T^{(q)}(v)\right|
\le
C_T\epsilon_{\mathrm{LV}}\beta_\star^2,
$$
and the same branch chart gives the two-way leakage bound
$$
\Delta_{\mathrm{tw}}^{(q)}(\beta_\star,\theta)
=
\Delta_{\mathrm{tw,Lor}}(\beta_\star,\theta)
+
\Delta_{\mathrm{tw,PF}}^{(q)}(\beta_\star,\theta),
\qquad
\sup_{\mathcal{D}_{\beta},\theta}
\left|\Delta_{\mathrm{tw,PF}}^{(q)}\right|
\le
C_{\mathrm{tw}}\epsilon_{\mathrm{LV}}.
$$
Preferred-frame leakage may also appear as clock/shape sidebands, drift-dependent channel splitting $c_{\text{eff}}-c_f$, photon-channel splitting $c_\gamma-c_{\text{eff}}$, or weak-field coefficients $(\alpha_1,\alpha_2,\alpha_3)$ after metric dressing. Those downstream leakage terms may falsify the bridge, but they do not define the moving-assembly extraction.

Failure modes for this packet are concrete: no stable translated attractor on the drift band, loss of Jacobian floor or inactive-root gaps, unbounded memory depth, branch transition treated as smooth drift, residuals above the leakage bounds, a clock period and ruler semiaxis extracted from different branch ledgers, identification of $c_f$ with $c_\star$ without a dressing map, or Lorentz agreement obtained only by tuning a PPN coefficient or per-observable clock/ruler rule after the moving branch has been extracted.

## Lorentz/GR Bridge Contract

Definition. The Lorentz/GR bridge theorem target is the packet
$$
\mathfrak{L}_{\mathrm{GR}}
=
\left(
\mathcal{C}_{\mathrm{mov}},
\mathcal{T}_{\mathrm{clk}},
\mathcal{K}_{\mathrm{med}},
\mathcal{G}_{\mathrm{eff}},
\mathcal{L}_{\mathrm{PF}}
\right),
$$
where $\mathcal{C}_{\mathrm{mov}}$ is the moving-assembly contraction law, $\mathcal{T}_{\mathrm{clk}}$ is the clock retuning law, $\mathcal{K}_{\mathrm{med}}$ is the coarse-grained medium constitutive response, $\mathcal{G}_{\mathrm{eff}}$ is the effective metric functional, and $\mathcal{L}_{\mathrm{PF}}$ is the preferred-frame leakage bound.

Condition. The moving-assembly contraction law is accepted on a declared drift band only when the translated attractor family has extracted semiaxes satisfying
$$
\mathcal{C}_{\mathrm{mov}}:\qquad
\frac{a_\parallel(v)}{a_\perp(v)}
=
\frac{1}{\gamma_\star(v)}+R_{\parallel}(v),
\qquad
|R_{\parallel}(v)|\le C_\parallel\epsilon_{\mathrm{LV}}\beta_\star^2.
$$

Condition. The clock retuning law is accepted on the same drift band only when the reference clock channel satisfies
$$
\mathcal{T}_{\mathrm{clk}}:\qquad
\frac{T(v)}{T_0}
=
\gamma_\star(v)+R_T(v),
\qquad
|R_T(v)|\le C_T\epsilon_{\mathrm{LV}}\beta_\star^2,
$$
with $c_\star=c_f$ for primitive branch charts and $c_\star=c_{\text{eff}}(\mathbf{x})$ for Noether-Sea dressed clock/ruler comparisons.

Definition. The coarse-grained medium constitutive response is the map
$$
\mathcal{K}_{\mathrm{med}}:
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij}),
$$
and it is admissible only if the same coefficients predict clock redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.

The coefficient-level weak-field target is not only the arrow above. Let
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2},
$$
and let $\sigma_{ij}$ denote the retained stress projection from the continuum Noether-Sea record. The constitutive rows must have the form
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\sigma)
+O(c_0^{-6},\epsilon_{\mathrm{LV}}),
$$
$$
\gamma_{ij}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}),
$$
$$
u^i_{\text{sea}}
=
B^i{}_j w^j\frac{U}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}),
$$
$$
\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j.
$$
Here $w^i$ is the medium drift relative to the comparison frame and $U$ is the positive PPN potential. The lapse row supplies the clock-redshift and $\beta_{\mathrm{PPN}}$ coefficients, the spatial-compliance row supplies the shared Shapiro/lensing $\gamma_{\mathrm{PPN}}$ coefficient, and the shift row supplies the preferred-frame leakage coefficients. These rows remain theorem targets until derived from the same continuum Noether-Sea record that fixes $n$, $\chi_{\text{sea}}$, $\Phi_{\text{eff}}$, and stress.

Definition. The effective metric functional is
$$
\mathcal{G}_{\mathrm{eff}}[\mathcal{K}_{\mathrm{med}}]
:\qquad
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}\big(dx^i-u^i_{\text{sea}}dt\big)\big(dx^j-u^j_{\text{sea}}dt\big),
$$
with weak-field acceptance condition
$$
(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_1,\alpha_2,\alpha_3)
=
(1,1,0,0,0)+O(\epsilon_{\mathrm{LV}}).
$$

Condition. The preferred-frame leakage bound is
$$
\mathcal{L}_{\mathrm{PF}}
\equiv
\max\left(
\mathcal{E}_{\text{shape}},
\mathcal{E}_{\text{clock}},
\sup_{\beta,\theta}|\Delta_{\text{tw}}(\beta,\theta)|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|,
|C_{Uv}|
\right)
\le
\epsilon_{\mathrm{LV}},
$$
with the empirical target below current Lorentz-violation bounds and with no special retuning of $\kappa$, $\eta$, or axial details between observables.

## Falsifier Ledger

Falsifier. A Jacobian-null wall falsifies a branch-chart promotion when $\nu_J=0$ on an active chart and no dual-mollified finite-crossing control supplies a bounded replacement for the branch-sum formula.

Falsifier. Infinite memory depth falsifies a finite closure packet when $h_{\mathrm{mem}}$ cannot be bounded inside the declared memory horizon or when returned-section residuals depend on untracked deep-past history.

Falsifier. Branch proliferation falsifies local closure when $\sup_{t,i,j}B^{\mathrm{active}}_{ij}(t)=\infty$ on the candidate chart or when unlisted active roots appear inside an inactive complement.

Falsifier. Tangential-drive sign obstruction falsifies the bare isolated spiral route when every admissible radial turn corridor has $\mathcal{D}_T(I_\ast)\ge0$ or when the negative verdict requires roots outside the certified branch chart.

Falsifier. Regulator dependence falsifies promotion when the radial-turn verdict, tangential-drive verdict, contraction coefficients, or clock coefficients change under controlled $\eta\to0$ or $\epsilon_c\to0$ refinement rather than converging in the declared weak/integrated sense.

Falsifier. Preferred-frame leakage above bound falsifies the Lorentz/GR bridge when $\mathcal{L}_{\mathrm{PF}}>\epsilon_{\mathrm{LV}}$ on the calibration band or when the PPN vector fails $(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_1,\alpha_2,\alpha_3)=(1,1,0,0,0)+O(\epsilon_{\mathrm{LV}})$.

Falsifier. Ad hoc tuning falsifies the bridge when closure holds only for an isolated value of $\kappa$, a chosen regulator width $\eta$, or axial-structure-specific details rather than on an open admissible parameter family with fixed observable-extraction rules.

## Dependency Interface

Interface. The proof-program lane owns candidate histories, branch-chart certificates, monodromy diagnostics, returned-sample residuals, topology certificates, and pass/fail artifact files; this master-equation closure file consumes those rows only through $\mathfrak{B}$ and does not edit or redefine the proof-program artifacts.

Interface. The simulations lane owns run protocols, root ledgers, conservation-pullback rows, convergence plots, regularization sweeps, branch residuals, drift-response coefficients, and leakage estimates; this file consumes those outputs as numeric or interval inputs to $\mathfrak{B}$, $\mathfrak{L}_{\mathrm{GR}}$, and $\mathcal{I}_{A,\mathrm{void}}^{ab}$ and does not own the simulation artifacts.

Interface. The dyadic-lock and angular-momentum lanes may consume the promotion lemma as a shared admissibility gate for phase-amplitude maps, root-ledger transactions, and conserved-functional claims, but this file does not certify dyadic selection, spin closure, or angular-momentum partition rules.

Interface. Quantum closure may consume $\mathfrak{B}$ only as certified branch-chart input to its retained causal-wake state, coarse-graining map, and finite-$\eta$ flow or return map. $\mathfrak{B}$ does not supply an invariant measure, a basin partition, a Born-rule weight, a detector law, or a Bell-family probability table. Those remain quantum-side objects that must be derived from the transfer-operator packet after the branch data are retained.

Interface. Mass-map closure may consume $\mathfrak{B}$ only as Tier 0 / Tier 1 branch-certificate input: finite active roots, inactive gaps, Jacobian floor, memory depth, returned-section residual, and stability margin. After the bare-void response tensor target is certified, mass-map closure may consume $\mathcal{I}_{A,\mathrm{void}}^{ab}$ as a separate susceptibility input, but not as $\mathcal{M}_{\text{sea}}^{ab}$ or observed mass. $\mathfrak{B}$ does not supply $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, $\mathcal{M}_{\text{sea}}^{ab}$, or a particle-facing mass comparison. Those remain downstream Tier 2 / Tier 3 extraction objects after a stable branch has passed.

Interface falsifier. If a downstream basin weight, shielding coefficient, or response tensor changes under root-ledger refinement, inactive-gap refinement, memory-depth extension, or controlled $\eta$ refinement while the claimed upstream branch identity is held fixed, the handoff is under-specified and the downstream claim is blocked.

## Empirical Stakes

- The absolute-time and Euclidean-void ontology survives only if the exact compensation works at modern Lorentz-violation bounds below $10^{-17}$.
- If the contraction or clock-slowing law requires ad hoc tuning of $\kappa$, $\eta$, or axial-structure-specific detail, the bridge fails.
- Match GR in the weak field first, then let strong-field deviations emerge as predictions rather than assertions.

## Longer-Tail Dynamics Program

1. Run a retained-branch simulation packet that evaluates the normalized Noether wake increments for energy, momentum, and angular momentum under the conservation-pullback contract.
2. $\eta \to 0$ existence and uniqueness theory for the exact shell model.
3. Controlled kinetic or coarse-grained equation from the master law.
4. Lorentz-suppression emergence for moving assemblies in the full dynamics, ideally independent of axial-layer details.
5. Effective magnetic and Lorentz-force emergence from assemblies.
6. Full attractor landscape for binaries and tri-binaries.
7. Quantum closure from the master equation.

## Related Priorities

- [breather-proof](../proof-programs/breather-proof/breather-proof.md)
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md)
- [mass-map](../mass-map/mass-map.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)

## Related AAA Notes

- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
- [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md)
- [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md)
