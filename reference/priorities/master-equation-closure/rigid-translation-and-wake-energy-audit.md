# Rigid Translation And Wake-Energy Audit

## Status

- Date: `2026-07-24`
- Authority: provisional closure packet
- Scope: canonical per-hit law, scalar action scaffold, prescribed-record diagnostic
- Numerical units: $c_f=1$
- Promotion: none

This packet records exact algebra, a display-only catalog diagnostic, a
dimensional correction, and downstream impact routing. It does not certify a
moving braid, a new interaction law, an energy conservation theorem, or a
radiation mechanism.

## Exact Rigid-Pair Residual

For a rigid common drift
$\mathbf V=\beta_f c_f\hat{\mathbf e}$, an unordered pair with instantaneous
unit separation $\hat{\mathbf n}_{ij}$ and signed inverse-square coefficient
$$
w_{ij}
=
\sigma_{ij}\frac{|q_iq_j|}{d_{ij}^2}
$$
has the exact canonical pair sum
$$
\mathbf A_{ij}+\mathbf A_{ji}
=
2\kappa\beta_f w_{ij}
\left[
\hat{\mathbf e}
-2(\hat{\mathbf n}_{ij}\cdot\hat{\mathbf e})\hat{\mathbf n}_{ij}
\right].
$$
For a frozen $N$-member geometry, define
$$
W=\sum_{i<j}w_{ij},
\qquad
\mathsf M=\sum_{i<j}w_{ij}
\hat{\mathbf n}_{ij}\hat{\mathbf n}_{ij}^{\mathsf T},
\qquad
\mathsf K=W\mathsf I-2\mathsf M.
$$
Then
$$
\sum_i\mathbf A_i
=
2\kappa\beta_f\mathsf K\hat{\mathbf e},
\qquad
\mathsf K\hat{\mathbf e}=\mathbf0
\iff
\mathsf M\hat{\mathbf e}=\frac{W}{2}\hat{\mathbf e}.
$$

Plainly: exact rigid drift requires the signed pair directions to balance in
their second directional moment. Rotational appearance alone is insufficient.

This is a failed velocity-ansatz test, not a primitive momentum statement.
Neither a uniform polarity prefactor nor a charge-weighted sum removes it:
like-polarity pairs retain the common-mode residual, while unlike-polarity
weighting trades that component for a nonzero separation-direction component.
For a universal differentiable mechanical map
$\sum_i f(\mathbf V_i)$, common drift gives
$D f(\mathbf V)\sum_i\mathbf A_i$; any nondegenerate local response therefore
inherits the same obstruction. The theory has not derived $f$, however, and
the quadratic $\tfrac12\mu_{\text{arch}}\|\mathbf V\|^2$ row remains a
bookkeeping convention.

Plainly: changing the polarity labels does not make the assumed common velocity
solve the acceleration equation. A future nonlinear kinetic account could
change a conservation audit, but it cannot make the displayed velocities
constant when their calculated derivatives are not.

For a planar configuration containing the drift direction, the condition is
$$
\sum_{i<j}w_{ij}e^{2\mathrm i\psi_{ij}}=0.
$$
Regular equal-weight triangles and squares pass. An alternating-polarity square
also passes because its edge and diagonal direction classes cancel separately.
An equal-weight regular tetrahedron fails in every direction because
$\mathsf M=(W/3)\mathsf I$.

The independent reference is direct addition of the two exact ordered-root
forms in Proposition 5. The separate executable reference is
[`analyze-rigid-translation-residual.mjs`](../../../scripts/equation-mapping/analyze-rigid-translation-residual.mjs),
with focused tests in
[`rigid-translation-residual.test.js`](../../../tests/rigid-translation-residual.test.js).

## Timescale Boundary

For a frozen eigenmode
$\mathsf K\hat{\mathbf e}=\lambda\hat{\mathbf e}$ and mean velocity
$\mathbf U=N^{-1}\sum_i\mathbf V_i$,
$$
\frac{d\mathbf U}{dT}
=
\frac{2\kappa\lambda}{Nc_f}\mathbf U,
\qquad
\tau_{\mathrm{drift}}
=
\frac{Nc_f}{2\kappa|\lambda|}.
$$
If $\kappa|\lambda|/N=C_ga_{\mathrm{int}}$ and
$t_{\mathrm{dyn}}=v_{\mathrm{int}}/a_{\mathrm{int}}$, then
$$
\frac{\tau_{\mathrm{drift}}}{t_{\mathrm{dyn}}}
=
\frac{c_f}{2C_gv_{\mathrm{int}}}.
$$

Plainly: the familiar $c_f/v_{\mathrm{int}}$ estimate is only a scaling law.
Geometry, a possible near-null, and the definition of a full cycle control the
actual number of cycles.

## Prescribed Borg Catalog Screen

The analyzer samples each piecewise-cubic prescribed worldline over one
declared return period, forms the frozen signed operator at every sample, and
finds the best single drift direction across all samples. The relative residual
is normalized by the signed-coefficient magnitude. Pass requires an all-phase
relative residual no larger than $10^{-6}$.

| Record | Best all-phase relative residual | Verdict |
| --- | ---: | --- |
| A1 general | 0.594823 | fail |
| A1.1 | 0.614425 | fail |
| A1.2 | 0.593834 | fail |
| A1.3 | 0.575651 | fail |
| A1.4 | 0.554679 | fail |
| A2 | 0.330063 | fail |
| A3 general | 0.577426 | fail |
| A3.1 | 0.576836 | fail |
| A3.2 | 0.574534 | fail |
| A3.3 | 0.522872 | fail |
| A3.4 | 0.557964 | fail |
| B1.1 | 0.689738 | fail |
| B1.2 | 0.399396 | fail |
| B1.3 | 0.163271 | fail |
| C1 | 0.280575 | fail |
| C2 | 0.610012 | fail |
| C3 | 0.604962 | fail |
| C4 | 0.442520 | fail |
| C5 | 0.267155 | fail |
| C6 | 0.206855 | fail |

Plainly: all 20 current catalog entries fail this necessary rigid-drift screen.
They are prescribed, display-only geometries, not certified solutions, so this
does not show that a physical braid fails or cannot deform into a moving branch.

No certified braid is present in the current catalog. The requested
certified-braid pass/fail step therefore has no eligible subject. Claim grade:
measured diagnostic on prescribed records. Falsifier: a rerun on the same
source hashes producing an all-phase residual at or below tolerance, or a
certified evolved braid whose full translating return map closes despite the
frozen diagnostic.

## Transmitter-Only Law-Family Search

The canonical perpendicular projection and the observer-level comparison form
remain separated by a factor that varies as $\gamma_f^2$, so no constant
normalization of $\kappa$ reconciles them.

The stronger three-property impossibility claim is false as algebra. Define
$$
\mathbf s_{ij}
=
\mathbf r_{ij}
-\mathbf V_j(T_t)(T_r-T_t),
$$
$$
\mathbf A_{ij}^{H}
=
\kappa\sigma_{ij}|q_iq_j|
H(b_j^2,\zeta_{ij}^2)
\frac{\mathbf s_{ij}}{\|\mathbf s_{ij}\|^3},
$$
with
$$
b_j^2=\frac{\|\mathbf V_j(T_t)\|^2}{c_f^2},
\qquad
\zeta_{ij}
=
\frac{\mathbf V_j(T_t)\cdot\mathbf s_{ij}}
{c_f\|\mathbf s_{ij}\|},
\qquad
H(b^2,0)=\sqrt{1-b^2}.
$$
Rigid pair reversal changes $\mathbf s_{ij}$ to $-\mathbf s_{ij}$ and leaves
the scalar arguments unchanged. This family therefore gives exact pair
cancellation, uses no receiver velocity, and recovers the declared transverse
target. The simplest example is $H=\sqrt{1-b^2}$.

Plainly: receiver velocity is not forced by the three algebraic requirements.
What remains unproved is whether the theory's wake ontology can derive this
different line of action and weight.

Claim grade: guessed counterexample family. It is not canonical, not derived
from uniform absolute-time emission, and not derived from the current scalar
action. It must not be used in the EOM solver or any physics verdict. The
decision gate is now a derivation test inside the existing
`causal_wake_update_law` priority, not permission to relax the
no-receiver-velocity axiom.

At comparison level, the scalar kernel $\delta(\tilde g)/r$ lacks the
velocity-contraction numerator present in vector-current direct-action
kernels. Replacing that numerator by a constant is an inferred structural
source of missing cancellation terms, but causal-only time asymmetry and the
unclosed variation residual are additional candidates. A complete scalar
variation that closes the residual would falsify that attribution.

## Wake-Energy Dimensional And Sign Audit

With
$$
[\kappa]=\frac{L^3}{T^2Q^2},
\qquad
[\tilde g]=T,
\qquad
[\delta(\tilde g)]=T^{-1},
$$
the former kernel coefficient $\kappa/c_f$ makes
$(\kappa q^2/c_f)\delta(\tilde g)/r$ an acceleration. The double time integral
therefore has length dimensions, not action dimensions. The corrected
time-normalized kernel is
$$
\mathcal K_{ij}
=
\mu_{\text{arch}}\kappa\sigma_{ij}|q_iq_j|
\Theta(T_1-T_t)
\frac{\delta(\tilde g_{ij})}{r_{ij}}.
$$
The equivalent length-normalized form uses
$\mu_{\text{arch}}\kappa c_f\,\delta(g)/r$.

Plainly: the time-normalized delta already contributes one inverse time. The
universal bookkeeping conversion, not an extra inverse wake speed, supplies
the energy scale.

For the live sign convention $\sigma=+1$ for like-polarity repulsion, the sharp
interaction charge is
$$
E_{\mathrm{wake}}^{\mathrm{sharp}}
=
+\frac12\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\mu_{\text{arch}}\kappa\sigma_{ij}|q_iq_j|
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}}.
$$
The delta collapse produces $W^{\mathrm{acc}}$ once. The boundary form therefore
uses
$$
E_{\mathrm{wake}}(T)
=
-\frac12\sum_{i,j}
\int_{-\infty}^{T}dT_t
\int_T^\infty dT_1\,
\partial_{T_1}\mathcal K_{ij}(T_1,T_t),
$$
consistent with the interaction entering the action with an outer minus sign.

Plainly: the former inverse-square expression had the wrong units and counted
the root weight twice. The former positive boundary derivative also gave the
wrong static sign.

No executable accepted result was found to compute the malformed expression.
Existing positive-work records use the work integral with
$\mu_{\text{arch}}$ already present. No measured result is demoted; formal
conservation claims remain conditional until the corrected action and its
Euler residual close on one independently evolving wake state.

The consumer census is:

- `content/markdown/aaa/dynamics/master-equation.md` owns the scalar action,
  regularized diagnostic, boundary charge, and characteristic-tail forms;
- `content/markdown/aaa/dynamics/effective-lagrangian.md` repeats the
  regularized action and boundary charge;
- `content/markdown/aaa/dynamics/energy.md`,
  `content/markdown/aaa/dynamics/binary-dynamics.md`, and
  `content/markdown/aaa/validation/simulations/action-energy/` consume the
  conditional charge and residual contract but do not numerically evaluate the
  malformed kernel;
- `scripts/equation-mapping/finite-window-conservation-residual.mjs` validates
  supplied wake-charge and crosswalk scalars. It does not construct them, so
  its prior fixtures are interface tests rather than evidence for either
  energy formula;
- the prescribed-path `wakeFlux` reducers explicitly label their outputs as
  causal-wake measures, not energy, potential, work, or leakage, and are
  unaffected;
- no implementation under `src/` or `tests/` was found to compute the
  malformed inverse-square energy expression.

Plainly: the defect was in the formal source equations, not in a hidden
accepted numerical engine. Downstream conservation packets still need new
corrected inputs before they can become evidence.

## Acceleration Blindness And Radiation Boundary

Derived: one fixed canonical hit reads transmitter position and velocity but no
transmitter acceleration or higher derivative. A sequence of retained hits can
still encode an accelerated path through changing velocities, roots, weights,
and directions.

Inferred boundary: absence of a separate acceleration-dependent $1/r$
acceleration term does not prove absence of energy transport to infinity.
Acceleration falloff and energy-current falloff are different questions, and
the Architrino-native wake-energy current is not yet derived.

Derived non-claim: there is no primitive instantaneous
acceleration-derivative self-term in the canonical law. This does not exclude
delayed self-hit exchange, assembly recoil, photon emission, or an effective
radiation-reaction law after coarse graining.

Falsifiers: a canonical fixed-hit implementation reading transmitter
acceleration overturns the first statement; a derived nonzero far-boundary
wake-energy current establishes radiation without overturning it; an accepted
assembly reduction producing an effective self-reaction term overturns any
stronger no-reaction claim.

## Consumer Impact Verdicts

| Consumer | Verdict | Required treatment |
| --- | --- | --- |
| Master Equation | rewrite applied | Correct energy kernel and sign; add exact residual, candidate-family boundary, and fixed-hit acceleration scope. |
| Energy | rewrite applied | State action normalization and reject inverse-square energy substitution. |
| Effective Lagrangian | rewrite applied | Correct scalar-kernel prefactors and boundary-energy sign. |
| Causal Action Functional | unaffected | Its inverse-area scalar statistic is not the action-energy kernel or a dynamics record. |
| Binary Dynamics | grade constraint | A translating binary needs the exact residual null or a deforming evolved branch; no current certified translating branch is demoted. |
| Detecting the Absolute Frame | grade constraint | Residual is not an operational detector until a stable translating assembly and readable response are derived. |
| Constructing the Absolute Frame | unaffected | Ontic reconstruction from complete tagged wake data does not rely on rigid braid drift. |
| Special-relativity braid bridge | rewrite applied | Record the exact obstruction and display-only catalog boundary. |
| Noether-braid family chapters | grade constraint | Prescribed records remain display-only and cannot become translating-solution evidence. |
| Comparative Glossary | unaffected | No accepted terminology or level mapping changed. |
| Radiation | rewrite applied | Separate fixed-hit acceleration blindness from far-zone energy transport. |
| Bremsstrahlung | rewrite applied | Mark acceleration input as a path-derived provisional diagnostic. |
| Synchrotron | rewrite applied | Separate transmitter root-density bunching from receiver root playback. |

Plainly: the audit changes the canonical action bookkeeping and narrows several
claims. It does not revoke any accepted braid, because the current catalog
contains no certified moving braid and the measured catalog rows are
display-only.

## Next Acceptance Step

The next theory step remains item 1 in
[Master-Equation Closure](priorities.md): derive one independently evolving
wake state. That derivation must decide whether the canonical emission-site
line of action survives, whether the candidate transmitter-history
cancellation family has any ontological basis, and whether the same update
produces the corrected energy, momentum, and angular-momentum accounts. No
receiver-velocity relaxation is authorized by this packet.
