# Master EOM Binding v0

## Status

- Binding id: `master_eom_binding/v0`
- Stage: `frozen-mathematical-contract-amended`
- Sharp simple-root law: `bound`
- Finite-width causal-surface law: `bound`
- Core regulator: `bound`
- Common-domain matching: `regulator-limit-with-certified-remainder`
- Amendment 1:
  [common-domain regulator-limit matching](master-eom-binding-v0-amendment-1-common-domain-matching.md)
- Amendment 2:
  [run-selected certified budgets](master-eom-binding-v0-amendment-2-run-selected-certified-budgets.md)
- Certified budget ledger:
  [ratified Interactive and Research records](certified-error-budget-ledger.md)
- Production authority: `none-until-binding-and-oracle-pass`
- Evolution contract: [evolution-contract-v0.md](evolution-contract-v0.md)
- Canonical source: [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md)
- Source snapshot SHA-256: `a8654e7e384e059ca0a80a48550295c1dff7740ba3ec341887ba50c461092454`
- Source snapshot posture: accepted canonical working-tree content at binding freeze

## Purpose

This record identifies the exact mathematical law every EOM oracle, benchmark, CPU backend, accelerator backend, and production integrator must implement. It does not inherit semantics from the current solver, its ABI, Borg parameters, fixtures, or app behavior.

The binding has two execution charts:

1. the sharp branch-resolved law on certified simple causal roots;
2. a finite-width causal-surface law for regulated computation, folds, caustic transit, and core proximity.

Both charts must converge to the same receiver-normal simple-root acceleration
on their common domain. This is a regulator-limit statement, not literal
equality at fixed positive regulator values. Backend scheduling and numeric
representation may differ; the bound mathematics may not.

## State Space And Initial Data

Absolute time is $T$. For $N$ architrinos and finite memory depth $h>0$, the initial datum is

$$
\Phi_{T_0}\in C^1\!\left([-h,0],\mathbb R^{6N}\right),
\qquad
\Phi_{T_0}(\theta)
=
\left(
\mathbf X_1(T_0+\theta),\mathbf V_1(T_0+\theta),\ldots,
\mathbf X_N(T_0+\theta),\mathbf V_N(T_0+\theta)
\right).
$$

An implementation may support a stronger or weaker regularity chart, such as $W^{1,\infty}$ or an absolutely continuous history class, only when the model binding, interpolation contract, root proofs, and oracle cases declare that chart. Instantaneous endpoint values do not define an EOM initial datum.

## Bound Constants And Conventions

| Quantity | Binding |
| --- | --- |
| Absolute time | $T$ only at substrate level. |
| Field speed | $c_f>0$; its numeric value and units are run-bound inputs. Setting $c_f=1$ is an explicit nondimensional chart, not a different law. |
| Coupling | One declared universal $\kappa$ with dimensions $\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$. No Borg or backend constant may replace it. |
| Polarity | $q_i\in\{-\epsilon,+\epsilon\}$ for primitive electrino/positrino rows unless a later binding version declares another admitted charge domain. |
| Sign | $\sigma_{ij}=\operatorname{sign}(q_iq_j)$; like polarity repels and unlike polarity attracts. |
| Dynamics quantity | Acceleration. Primitive architrinos have no physical mass. |
| Force bookkeeping | $\mathbf F_i=\mu_{\mathrm{arch}}\mathbf A_i$ may use one universal conversion constant outside the dynamical kernel. |
| Coincident endpoint | $T_{\mathrm{em}}=T$ is excluded by $H(0)=0$. |
| Ordered pairs | Every $(i,j)$, including $i=j$, is inside the logical interaction domain. |
| Superposition | Linear sum of all admitted source/root contributions on a declared branch chart. |

## Causal-Root Binding

For receiver $i$ at $T$ and source $j$ at emission time $S<T$, define

$$
\mathbf r_{ij}(T,S)=\mathbf X_i(T)-\mathbf X_j(S),
\qquad
r_{ij}(T,S)=\|\mathbf r_{ij}(T,S)\|,
$$

$$
g_{ij}(T,S)=r_{ij}(T,S)-c_f(T-S).
$$

The retained causal-root set is

$$
\mathcal C_{ij}^{(h)}(T)
=
\left\{
S\in[T-h,T):g_{ij}(T,S)=0
\right\}.
$$

Every root inside the retained interval must be isolated or enclosed, and the complement must be certified root-free to the declared tolerance. A root or possible root reaching $T-h$ is `insufficient_history_depth`, not an inactive contribution.

For each root,

$$
\widehat{\mathbf r}_{ij}(T,S)
=
\frac{\mathbf r_{ij}(T,S)}{r_{ij}(T,S)},
$$

$$
D_{s,ij}(T,S)
=
c_f-\widehat{\mathbf r}_{ij}(T,S)\cdot\mathbf V_j(S),
$$

$$
D_{T,ij}(T,S)
=
c_f-\widehat{\mathbf r}_{ij}(T,S)\cdot\mathbf V_i(T).
$$

The signed source-normal root grading is

$$
\operatorname{sgn}D_{s,ij},
$$

and the simple-root transport law is

$$
\frac{dS}{dT}
=
\frac{D_{T,ij}}{D_{s,ij}}.
$$

Root continuation must be checked by independent recovery scans. It cannot establish completeness by itself.

## Sharp Simple-Root Law

On a root chart with

$$
|D_{s,ij}(T,S)|\ge\nu_s>0,
\qquad
r_{ij}(T,S)\ge r_{\min}>0,
$$

define the signed branch orientation and unsigned receiver-normal strength

$$
m_{ij}(T,S)=\frac{D_{T,ij}(T,S)}{D_{s,ij}(T,S)},
\qquad
W_{ij}^{\mathrm{rec}}(T,S)=|m_{ij}(T,S)|.
$$

The per-root acceleration is

$$
\boxed{
\mathbf A_{ij}(T;S)
=
\kappa\,\sigma_{ij}|q_iq_j|
\frac{W_{ij}^{\mathrm{rec}}(T,S)}{r_{ij}^2(T,S)}
\widehat{\mathbf r}_{ij}(T,S)
}.
$$

The total acceleration is

$$
\boxed{
\mathbf A_i(T)
=
\sum_{j=1}^{N}
\sum_{S\in\mathcal C_{ij}^{(h)}(T)}
\mathbf A_{ij}(T;S)
}.
$$

The same-source term $j=i$ is not a special force law. It uses the same root, geometry, receiver-normal, polarity, regulator, and evidence machinery. Only the coincident endpoint is excluded. Since $\sigma_{ii}=+1$, admitted same-source contributions are repulsive.

## Velocity And Separator Binding

The engine accepts finite velocities below, equal to, and above $c_f$. Speed magnitude alone does not select a numerical chart.

| Event | Exact condition | Bound route |
| --- | --- | --- |
| Source-normal caustic | $D_{s,ij}=0$ | Leave the sharp quotient chart; use a certified finite-width fold/caustic route. |
| Receiver-normal null | $D_{T,ij}=0$ with $D_{s,ij}\ne0$ | Root count is unchanged and $W^{\mathrm{rec}}=0$; record the silent branch and modulus kink. |
| Memory-boundary exit | $T-S\to h$ | Halt for insufficient history unless a larger retained history already certifies the continuation. Do not classify as an interior fold. |
| Exact $\|\mathbf V\|=c_f$ | No pair-independent event | Evaluate the actual line-of-action projections. Do not clamp or manufacture a caustic. |
| Super-field-speed history | No automatic failure | Enumerate all partner and same-source roots; retain signed root grading and branch transitions. |

Generic interior folds create or remove one positive and one negative source-normal root, so

$$
\Delta N_{ij}=\pm2,
\qquad
\Delta D_{ij}=0.
$$

Memory-boundary exits may have odd root-count changes and require separate degree bookkeeping.

## Finite-Width Causal-Surface Binding

The regulated production chart must use the same receiver-normal dynamics as the sharp chart. Let

$$
\delta_\eta(u)
=
\frac{1}{\sqrt{2\pi}\eta}
\exp\!\left(-\frac{u^2}{2\eta^2}\right),
\qquad \eta>0,
$$

and bind the polarity-blind, rotationally equivariant core kernel

$$
\mathbf K_{\epsilon_c}(\mathbf r)
=
\frac{\mathbf r}{(r^2+\epsilon_c^2)^{3/2}}
$$

### Bound Regulated Equation

The finite-width law is

$$
\boxed{
\mathbf A_i^{(\eta,\epsilon_c)}(T)
=
\kappa
\sum_j\sigma_{ij}|q_iq_j|
\int_{T-h}^{T}
\mathbf K_{\epsilon_c}(\mathbf r_{ij}(T,S))
|D_{T,ij}(T,S)|
\delta_\eta(g_{ij}(T,S))\,dS
}.
$$

For a simple root and a core kernel satisfying

$$
\mathbf K_{0}(\mathbf r)=\frac{\widehat{\mathbf r}}{r^2},
$$

the distributional limit gives

$$
\int
\mathbf K_0(\mathbf r_{ij})
|D_{T,ij}|\delta(g_{ij})\,dS
=
\sum_{S\in\mathcal C_{ij}}
\frac{\widehat{\mathbf r}_{ij}}{r_{ij}^2}
\left|\frac{D_{T,ij}}{D_{s,ij}}\right|,
$$

which is exactly the sharp receiver-normal branch law.

### Common-Domain Regulator-Limit Matching

Fix a compact reception interval $C=[T_a,T_b]$ on which retained histories
cover the complete causal domain, all sharp roots are isolated and complete,
every admitted root satisfies $|D_s|\ge\nu_s>0$, the root-free complement has
a certified residual gap, and $r\ge r_{\min}>0$. On this common simple-root
domain, the finite-width chart converges to the sharp chart as
$\eta\to0^+$ and $\epsilon_c\to0^+$. It is not bound to equal the sharp chart
at fixed positive $\eta$ and $\epsilon_c$.

Define the componentwise common-domain impulse and position moment by

$$
I^{\sharp}_k(C)=\int_C A^{\sharp}_k(T)\,dT,
\qquad
I^{(\eta,\epsilon_c)}_k(C)
=\int_C A^{(\eta,\epsilon_c)}_k(T)\,dT,
$$

$$
M^{\sharp}_k(C)=\int_C(T_b-T)A^{\sharp}_k(T)\,dT,
\qquad
M^{(\eta,\epsilon_c)}_k(C)
=\int_C(T_b-T)A^{(\eta,\epsilon_c)}_k(T)\,dT.
$$

For each vector component $k$, a positive-regulator comparison must certify
an outward pointwise enclosure

$$
E_{\mathrm{reg},k}(T)
\ge
\left|
A^{(\eta,\epsilon_c)}_k(T)-A^{\sharp}_k(T)
\right|.
$$

This enclosure includes the exact core-kernel difference, the nonzero second
and higher moments of $\delta_\eta$, finite root-tube tails, and finite-width
leakage over the certified root-free complement. Its impulse and position-
moment rows are

$$
R^{\mathrm{reg}}_{I,k}(C)
=
\int_C E_{\mathrm{reg},k}(T)\,dT,
$$

$$
R^{\mathrm{reg}}_{M,k}(C)
=
\int_C(T_b-T)E_{\mathrm{reg},k}(T)\,dT.
$$

Let $R^{\mathrm{num}}_{I,k}$ and $R^{\mathrm{num}}_{M,k}$ contain the
certified quadrature, retained-history, interpolation, and shortcut
remainders. Componentwise common-domain matching requires

$$
\operatorname{dist}\!\left(
I^{\sharp}_k(C),I^{(\eta,\epsilon_c)}_k(C)
\right)
\le
R^{\mathrm{num}}_{I,k}(C)
+
R^{\mathrm{reg}}_{I,k}(C),
$$

$$
\operatorname{dist}\!\left(
M^{\sharp}_k(C),M^{(\eta,\epsilon_c)}_k(C)
\right)
\le
R^{\mathrm{num}}_{M,k}(C)
+
R^{\mathrm{reg}}_{M,k}(C).
$$

The complete numerical-plus-regulator remainder must fit inside the unchanged
declared impulse or position-moment budget. Failure to certify the enclosure
or its budget sum is fail-closed. No regulator-matching remainder authorizes
the sharp quotient where the source-normal floor fails.

For $\mathbf r=\mathbf 0$, the complete vector product
$\mathbf K_{\epsilon_c}(\mathbf r)|D_T|$ is defined by its zero continuous
extension. The scalar $D_T$, which contains $\widehat{\mathbf r}$, is not
evaluated independently at coordinate coincidence.

## Core-Kernel Binding

The bound v0 kernel is

$$
\boxed{
\mathbf K_{\epsilon_c}^{\mathrm{P}}(\mathbf r)
=
\frac{\mathbf r}{(r^2+\epsilon_c^2)^{3/2}}
},
$$

because it is rotationally equivariant, polarity-blind apart from the external $\sigma_{ij}|q_iq_j|$ factor, smooth for $\epsilon_c>0$, zero at $\mathbf r=0$, and converges to $\widehat{\mathbf r}/r^2$ for $r>0$ as $\epsilon_c\to0^+$.

The complete receiver-normal vector integrand is continuous at coordinate
coincidence under the zero-extension rule. Its simple-root sharp limit is the
bound inverse-square receiver-normal law.

## Caustic And Regulator Route

The sharp quotient law is prohibited when its source-normal floor fails. A generic finite-order fold routes to the finite-width equation, adaptive event subdivision, transition metadata, and a finite integrated velocity impulse. The implementation never pins a state to an infinite pointwise force.

The following conditions fail closed unless a later binding version supplies a certified chart:

- persistent $D_s=0$;
- a cusp or higher singular stratum without a finite-order normal form;
- simultaneous source-normal and core-kernel failure;
- unresolved root accumulation;
- regulator-dependent transition observables that do not converge;
- an empty, infinite, or unlabeled continuation family;
- maximum precision or minimum timestep exhaustion before certification.

The regulators have independent roles:

- $\eta$ controls causal-surface width, fold resolution, and caustic impulse;
- $\epsilon_c$ controls the near-origin radial kernel.

Every run records both and states whether either sharp limit is being tested. Neither regulator may be a hidden backend constant.

## Root And Acceleration Evidence

Each consumed root row must carry the fields required by [evolution-contract-v0.md](evolution-contract-v0.md), including source and receiver identities, history segment, emission and reception times, root enclosure, signed source-normal grading, $D_s$, $D_T$, $m$, $W^{\mathrm{rec}}$, polarity, charge product, core and causal-surface regulator state, vector contribution, accumulation group, and acceptance status.

Summing the emitted vector contributions under the recorded reduction policy must reconstruct the acceleration consumed by the integrator. A backend cannot separately recompute cleaner diagnostic rows after advancing the histories.

## Binding Acceptance Conditions

This binding is frozen because:

1. the receiver-normal factor is present in both the sharp and finite-width equations;
2. the core kernel is explicit and defined at coordinate coincidence;
3. the simple-root regulator limit and the positive-regulator common-domain
   matching remainder are derived and bound;
4. $\eta$, $\epsilon_c$, $h$, $c_f$, $\kappa$, and $q_i$ are versioned run inputs or bound constants with no hidden substitutions;
5. self-pairs and all active roots are included;
6. separator and memory-boundary routes match the canonical taxonomy;
7. the source snapshot hash records the accepted canonical-source correction.

The independent oracle must still reproduce the common simple-root limit and
reject the current solver's instantaneous softened calculation and false
evidence flag before any implementation receives production authority. Those
are downstream acceptance gates, not conditions that alter the bound
mathematical contract.

## Priority Disposition

This packet's mathematical correction is `promote now`: the receiver-normal
finite-width law and coordinate-coincidence-safe core kernel have been promoted
into the canonical Master Equation. Amendment 1 binds regulator-limit matching
with a certified positive-regulator remainder; it changes neither boxed
acceleration equation nor any error budget. The binding remains a priority-
owned version and provenance record. It grants no production authority before
the precision contract and independent oracle pass.
