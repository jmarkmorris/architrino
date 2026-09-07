# Point-Cloud Negative Control And Wake-Energy Audit

## Status

- Date: `2026-07-24`
- Authority: provisional closure packet
- Scope: canonical per-hit law, relative-periodic branch contract, scalar action scaffold
- Numerical units: $c_f=1$
- Promotion: none

This packet records exact fixed-point-cloud algebra, the moving-assembly test that supersedes an invalid prescribed-catalog screen, a dimensional correction, and downstream impact routing. It does not certify a moving braid, a new interaction law, an energy conservation theorem, or a radiation mechanism.

## Exact Fixed-Point-Cloud Pair Residual

For a fixed point cloud with common group velocity $\mathbf V=\beta_f c_f\hat{\mathbf e}$, an unordered pair with instantaneous unit separation $\hat{\mathbf n}_{ij}$ and signed inverse-square coefficient
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

Plainly: a frozen point cloud can translate without deforming only when its signed pair directions balance in their second directional moment. Candidate braids have internal orbital motion and are not subject to this restriction.

This is a failed velocity-ansatz test, not a primitive momentum statement. Neither a uniform polarity prefactor nor a charge-weighted sum removes it: like-polarity pairs retain the common-mode residual, while unlike-polarity weighting trades that component for a nonzero separation-direction component. For a universal differentiable mechanical map $\sum_i f(\mathbf V_i)$, common group velocity gives $D f(\mathbf V)\sum_i\mathbf A_i$; any nondegenerate local response therefore inherits the same obstruction. The theory has not derived $f$, however, and the quadratic $\tfrac12\mu_{\text{arch}}\|\mathbf V\|^2$ row remains a bookkeeping convention.

Plainly: changing the polarity labels does not make the assumed common velocity solve the acceleration equation. A future nonlinear kinetic account could change a conservation audit, but it cannot make the displayed velocities constant when their calculated derivatives are not.

For a planar configuration containing the group-velocity direction, the condition is
$$
\sum_{i<j}w_{ij}e^{2\mathrm i\psi_{ij}}=0.
$$
Regular equal-weight triangles and squares pass. An alternating-polarity square also passes because its edge and diagonal direction classes cancel separately. An equal-weight regular tetrahedron fails in every direction because $\mathsf M=(W/3)\mathsf I$.

The independent reference is direct addition of the two exact ordered-root forms in Proposition 5. The separate executable reference is [`analyze-fixed-point-cloud-residual.mjs`](../../../../scripts/equation-mapping/analyze-fixed-point-cloud-residual.mjs), with focused tests in [`fixed-point-cloud-residual.test.js`](../../../../tests/fixed-point-cloud-residual.test.js).

## Timescale Boundary

For a frozen eigenmode $\mathsf K\hat{\mathbf e}=\lambda\hat{\mathbf e}$ and mean group velocity $\mathbf U=N^{-1}\sum_i\mathbf V_i$,
$$
\frac{d\mathbf U}{dT}
=
\frac{2\kappa\lambda}{Nc_f}\mathbf U,
\qquad
\tau_{\mathrm{drift}}
=
\frac{Nc_f}{2\kappa|\lambda|}.
$$
If $\kappa|\lambda|/N=C_ga_{\mathrm{int}}$ and $t_{\mathrm{dyn}}=v_{\mathrm{int}}/a_{\mathrm{int}}$, then
$$
\frac{\tau_{\mathrm{drift}}}{t_{\mathrm{dyn}}}
=
\frac{c_f}{2C_gv_{\mathrm{int}}}.
$$

Plainly: the familiar $c_f/v_{\mathrm{int}}$ estimate is only a scaling law. Geometry, a possible near-null, and the definition of a full cycle control the actual number of cycles.

## Closed-Surface Response Is Not A Flux Invariant

Consider one inertial transmitter in normalized units, with $\mathbf X_j(T)=\beta_fT\hat{\mathbf e}$, $0\leq\beta_f<1$, and evaluate the canonical sign-stripped response on the native slice $T_r=0$. Let $\mathbf b=\beta_f\hat{\mathbf e}$, let $r=-T_t$ be the retained emission distance, let $\hat{\mathbf n}$ point from the emission event to the evaluation point, and set $p=\mathbf b\cdot\hat{\mathbf n}$. The causal-root geometry and normalized response are
$$
\mathbf X
=
r(\hat{\mathbf n}-\mathbf b),
\qquad
D_t
=
1-p,
\qquad
\mathbf a_0(\mathbf X)
=
\frac{\hat{\mathbf n}}{r^2(1-p)}.
$$
The physical acceleration contribution is $\kappa\sigma_{ij}|q_iq_j|\mathbf a_0$. A closed-surface integral of $\mathbf a_0$ is a read-only functional of the per-hit law. It does not represent a shell of passive test architrinos: every physical architrino is a transceiver and would change the many-body history.

Plainly: the response may be sampled mathematically at many locations without pretending that a rigid physical shell of noninteracting probes exists.

The inertial transmitter history is admissible in the no-hit sector. A positive-delay same-transmitter root on this branch would require $\beta_f r=r$, which has no solution for $r>0$ when $\beta_f<1$.

For any closed surface $S$, define the sign-stripped response sum
$$
\Psi_S
=
\int_S\mathbf a_0\cdot d\mathbf S.
$$
For a sphere of radius $R$ centered on the transmitter's current position, the closed-surface response sum is independent of $R$ and equals
$$
\frac{\Psi_{\mathrm{cc}}(\beta_f)}{4\pi}
=
\frac{1}{2}
\left[
1
+
(1-\beta_f^2)
\frac{\operatorname{artanh}(\beta_f)}{\beta_f}
\right].
$$
The continuous value at $\beta_f=0$ is one. The radius cancellation follows because $\mathbf a_0$ is homogeneous of degree $-2$ under scaling about the current transmitter position, while surface area is homogeneous of degree $+2$.

Plainly: enlarging this specially centered sphere weakens the response by the same factor that it enlarges the area. That scale cancellation does not yet make the result a conserved source total.

Surface independence fails exactly. The causal-root identity
$$
\nabla_{\mathbf X}r
=
\frac{\hat{\mathbf n}}{1-p}
$$
gives
$$
\mathbf a_0
=
-\nabla_{\mathbf X}\!\left(\frac{1}{r}\right),
\qquad
\nabla_{\mathbf X}\cdot\mathbf a_0
=
\frac{\beta_f^2-2p+p^2}{r^3(1-p)^3}.
$$
The divergence is generally nonzero away from the transmitter's current position. Therefore closed surfaces that do not enclose that position can still have a nonzero response sum.

An exact enclosing-surface counterexample is the causal isochron emitted at one chosen time $T_t=-\tau$. It is a sphere of radius $\tau$ centered at $-\beta_f\tau\hat{\mathbf e}$, and it encloses the transmitter's current position for $\beta_f<1$. Its response sum is
$$
\Psi_{\mathrm{iso}}(\beta_f)
=
4\pi\frac{\operatorname{artanh}(\beta_f)}{\beta_f},
$$
which differs from $\Psi_{\mathrm{cc}}$ for every $\beta_f>0$. At $\beta_f=1/2$, the two values are approximately $11.4603$ and $13.8056$.

Plainly: two closed spheres can surround the same transmitter and return different totals. The current-centered result is therefore a concentric-sphere response identity, not a Gauss-type flux law.

Claim grade: derived. The concentric-sphere formula survives, but the proposed surface-invariant interpretation fails. The result creates no effective-continuum, neutral-assembly, absolute-frame-observable, or wake-energy consequence because the substrate theory has no derived continuity or boundary law that consumes this surface functional. A future native derivation of such a consumer would reopen that routing question.

Falsifiers: direct quadrature of a current-centered sphere that disagrees with $\Psi_{\mathrm{cc}}$ overturns the retained identity. Equality of $\Psi_{\mathrm{cc}}$ and $\Psi_{\mathrm{iso}}$ at any declared $\beta_f>0$, or vanishing of the displayed divergence at all regular points, would overturn the non-invariance verdict.

## Retraction Of The Prescribed-Catalog Screen

The former catalog screen sampled each prescribed orbit at a sequence of phases, discarded the members' internal velocities and accelerations, and treated each phase as a separate fixed point cloud. Its numerical residuals therefore measured only those artificial frozen overlays. They were not residuals of the recorded moving paths and were not a necessary condition for a translating orbiting assembly.

Plainly: the screen stopped the architrinos on their orbits before testing them. Its catalog pass/fail verdicts had no valid subject.

The table of catalog failures is withdrawn. The underlying fixed-pair and fixed-point-cloud identities remain valid as analytic negative controls, but the analyzer is barred from candidate-catalog adjudication. Prescribed records remain display-only chart hypotheses; their declared-period closure can be checked for record integrity, but it cannot establish or refute a moving solution.

Claim grade: derived correction to the scope of the instrument. Falsifier: an analysis showing that the removed screen evaluated the candidates' actual internal position, velocity, acceleration, and delayed-root histories rather than frozen position samples. The removed implementation did not do so.

## Relative-Periodic Moving-Assembly Replacement

For group speed $u$ along $\hat{\mathbf e}$, the candidate branch is
$$
\mathbf X_a^{(u)}(T)
=
uT\hat{\mathbf e}+\boldsymbol\xi_a^{(u)}(T).
$$
The internal orbit may deform with $u$. For some period $P_u$ and allowed member permutation $\pi$, relative-periodic closure requires
$$
\boldsymbol\xi_a^{(u)}(T+P_u)
=
\boldsymbol\xi_{\pi(a)}^{(u)}(T),
\qquad
\dot{\boldsymbol\xi}_a^{(u)}(T+P_u)
=
\dot{\boldsymbol\xi}_{\pi(a)}^{(u)}(T).
$$
Consequently,
$$
d_{ab}(T+P_u)
=
d_{\pi(a)\pi(b)}(T),
$$
but $d_{ab}(T)$ need not be constant.

Plainly: a valid moving assembly keeps orbiting internally. After one cycle, its complete internal state returns even though the assembly has translated and identical members may have exchanged roles.

The EOM-solver evolution must satisfy the full residual
$$
\mathbf R_a^{(u)}(T_r)
\equiv
\ddot{\mathbf X}_a^{(u)}(T_r)
-
\sum_j\sum_{T_t\in\mathcal C_{aj}(T_r)}
\mathbf A_{aj}(T_r;T_t)
=
\mathbf0
$$
along the orbit. Its retained causal roots must return under
$$
(a,j,T,T_t)
\longmapsto
(\pi(a),\pi(j),T+P_u,T_t+P_u),
$$
including root identity, multiplicity, $D_t$, acceleration weight, inactive intervals, finite-memory contents, and event conventions.

Plainly: the replacement test follows the actual moving architrinos and the actual delayed hits. It does not replace the orbit with a static shape.

Acceptance requires all of the following:

1. An EOM-solver evolution record, not a prescribed-geometry replay.
2. Position and velocity return modulo the common translation and allowed permutation.
3. The full acceleration residual along the evolved orbit.
4. Return of the retained causal-root and finite-memory ledger.
5. The applicable stability or Floquet certificate about the occupied branch.

For first-order continuation from a rest branch, write
$$
\boldsymbol\xi^{(u)}
=
\boldsymbol\xi^{(0)}
+u\boldsymbol\chi
+O(u^2).
$$
The full delayed equation produces
$$
\mathcal L\boldsymbol\chi
=
-\mathbf B_{\hat{\mathbf e}},
$$
after neutral translation, phase, and permitted relabeling modes are fixed. Solvability for periodic $\boldsymbol\chi$ is the correct small-group-speed question. Setting $\boldsymbol\chi=\mathbf0$ is the fixed-point-cloud restriction, not a necessary condition for a deformable moving branch.

Plainly: the first-order test asks whether the orbit can adjust to motion while remaining a solution. The invalid catalog screen prohibited that adjustment before it began.

Claim grade: derived acceptance contract. No eligible EOM-solver branch record is currently adjudicated by this packet, so it reports no moving-assembly pass/fail result.

## Prescribed-History Falsification And Search Guidance

For a prescribed record whose moving-endpoint packet certifies the complete declared isolated acceleration inventory, the individual equation residuals $\mathbf R_i^{\mathrm{path}}(T)$ provide a stricter screen than their vector sum. On a declared time grid $G_W$, define

$$
E_\infty(W)
=
\max_{\substack{i\\T\in G_W}}
\left\|\mathbf R_i^{\mathrm{path}}(T)\right\|,
\qquad
E_2(W)
=
\left[
\frac{1}{N|G_W|}
\sum_i\sum_{T\in G_W}
\left\|\mathbf R_i^{\mathrm{path}}(T)\right\|^2
\right]^{1/2}.
$$

A sampled value above the declared tolerance plus numerical-convergence bound falsifies that exact isolated prescribed history. Equal-and-opposite member residuals cannot hide behind a zero summed row. A sampled near-zero remains diagnostic: it is not a relative-periodic branch, return-symmetry, taxonomy, stability, retention, or physical-realization result.

Plainly: the summed screen can miss two equally wrong architrinos whose errors cancel. The member screen checks each architrino before doing any addition.

For first and second declared half-cycle windows on the same grid,

$$
E_\infty(P)
=
\max\left\{
E_\infty(P/2,1),
E_\infty(P/2,2)
\right\}.
$$

The corresponding full-cycle RMS squared is the row-count-weighted mean of the two half-cycle RMS squares. Therefore the half-cycle row is a staged early-rejection device, not an independent positive objective: failure of the first evaluated half saves the second half's work, while survival requires the other half and time-grid refinement. Search ordering is refined full-cycle $E_\infty$ first and refined full-cycle $E_2$ second; the two half peaks and their imbalance remain diagnostics.

Plainly: the full-cycle worst error is exactly the worse half's worst error. One good half never excuses a bad second half.

The live reducer is `prescribed-record-analytics/pointwise-member-residual-search-screen.v1`. It reuses the existing complete-cycle moving-endpoint causal-root packets and does not evolve paths, sample frozen overlays, invoke the EOM solver, or alter the accepted return-symmetry group. Unit checks use hand-authored residual ledgers, including a summed-cancellation counterexample, a clean-first-half and bad-second-half row, a cyclic phase relabeling, and an incomplete-inventory negative control. The causal-root path remains checked separately by the common-axis root-residual test rather than by the acceleration reducer.

Measured diagnostic pilot: `buildCompactMonteCarloCampaign` ran one deterministic bounded taxonomy draw per active member with the coverage protocol and seed `member-residual-bounded-pilot-2026-07-24`. It drew 20 rows in 131.750 wall seconds on the operator's current machine. Five rows reached an eligible complete-inventory residual score; 15 did not reach that instrument, so they are unknown rather than passing. All five eligible rows were already falsified by the summed screen, so this small evaluated subset contained zero cases where summed cancellation concealed a member failure. Their first-half versus second-half peak Pearson correlation was $0.9924$, and first-half versus full-cycle peak correlation was $0.99999996$.

Plainly: this pilot proves neither that cancellation hiding is rare nor that one half is generally predictive. It had only five eligible rows, all far from zero, and most catalog draws never reached the screen.

Claim grades: the partition identities and falsification scope are derived. The five-row pilot values are measured and diagnostic-only, produced by the named instrument, and apply only to that seed, protocol, implementation state, and eligible subset. The search ordering is inferred from the exact identities plus the need to resolve peak residuals before average residuals.

Falsifiers: a hand ledger for which the full-cycle peak differs from the worse half peak overturns the partition implementation; an independently checked causal root missing from a certified packet invalidates its screen; a repeated stratified pilot with materially different half-to-full ranking overturns the proxy correlation; and any attempt to promote a near-zero without the second half, refinement, or independent root-residual check violates the search contract.

### Stratified Endpoint-Only Follow-Up

The reproducible endpoint-only runner `scripts/eom/run-endpoint-residual-search.mjs` evaluated six deterministic draws for each of the 20 active catalog members: one exact catalog-reference record, two local-neighborhood draws, and three full bounded-taxonomy draws. The screening grids used 12 and 24 cycle samples. Every eligible row required complete declared isolated acceleration inventories at both resolutions and a separately computed geometric causal-root residual no larger than $10^{-12}$. The campaign seed was `stratified-endpoint-residual-search-2026-07-24-v1`.

| Stratum | Drawn | Eligible complete inventory | Unknown | Member failures hidden by the summed screen |
| --- | ---: | ---: | ---: | ---: |
| catalog reference | 20 | 13 | 7 | 8 |
| local neighborhood | 40 | 25 | 15 | 16 |
| full bounded taxonomy | 60 | 24 | 36 | 0 |
| total | 120 | 62 | 58 | 24 |

All 62 eligible rows were falsified as their exact isolated prescribed histories by the pointwise member residual. None was near zero. Twenty-four would not have been falsified by the summed-acceleration screen because their member residuals canceled in the sum. These 24 rows demonstrate the stricter screen's value on this bounded sample; they do not estimate a population frequency.

Plainly: the old total found zero in 24 cases only because different architrinos' errors canceled. Checking the architrinos separately exposed those prescribed records as inconsistent with their complete evaluated acceleration inventories.

The runner then selected the eight smallest member residuals plus up to eight summed-cancellation cases, with overlaps retained only once. Thirteen distinct rows were reevaluated on 48- and 96-sample cycle grids. All 13 remained complete-inventory eligible and all remained falsified. The smallest refined full-cycle peak was the C1 catalog-reference row,

$$
E_\infty(P)=9.300748709368706,
\qquad
\varepsilon_{\mathrm{adj}}=1.0163904445571462\times10^{-9},
$$

so even the leading sampled row exceeded its own adjudication threshold by approximately $9.15\times10^9$. No near-zero basin was found in this bounded search.

Plainly: the best row was not narrowly outside tolerance. Its worst member error was billions of times larger than the numerical allowance.

Of the 58 unknown screening rows, 57 lacked a complete certified acceleration inventory at one or both resolutions. One otherwise complete C5 local-neighborhood row failed the independent root check because its recomputed maximum residual was $1.000088900582341\times10^{-12}$ against the declared $10^{-12}$ bound. It remains unknown; the few-ulps excess was not rounded into a pass.

The diagnostic result is retained locally at `.local-data/braid-analysis/endpoint-residual-search/stratified-v1.json`. Its timing-independent result hash is `83b7104f27503e4ae4cdf7c5da7e93e7143b09f541c18e48e0815a8338d53fc8`. The screening stage took 10.651 wall seconds on the operator's current machine; the dense refinements followed in the same run. The local artifact contains exact sampled specifications, protocol hashes, primary and refined screen summaries, inventory reasons, and independent root checks, but no acceptance-bearing raw-ledger archive.

Claim grade: measured diagnostic-only for the named seed, bounded strata, protocols, implementation, and machine. The result falsifies only the 62 exact eligible prescribed histories. It does not exclude any taxonomy member, establish nonexistence of nearby branches, adjudicate the 58 unknown rows, or provide branch, stability, retention, or physical-realization evidence.

Next blocker: the current bounded coordinate draws did not approach the near-zero region. Further search should not merely increase the same random quota. It needs a directed coordinate optimizer over the complete-inventory domain, using the refined full-cycle member peak as the primary objective, while preserving a held-out stratified audit and the independent causal-root residual check.

## Transmitter-Only Law-Family Search

The canonical perpendicular projection and the observer-level comparison form remain separated by a factor that varies as $\gamma_f^2$, so no constant normalization of $\kappa$ reconciles them.

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
Fixed-pair reversal changes $\mathbf s_{ij}$ to $-\mathbf s_{ij}$ and leaves the scalar arguments unchanged. This family therefore gives exact pair cancellation, uses no receiver velocity, and recovers the declared transverse target. The simplest example is $H=\sqrt{1-b^2}$.

Plainly: receiver velocity is not forced by the three algebraic requirements. What remains unproved is whether the theory's wake ontology can derive this different line of action and weight.

Claim grade: guessed counterexample family. It is not canonical, not derived from uniform absolute-time emission, and not derived from the current scalar action. It must not be used in the EOM solver or any physics verdict. The decision gate is now a derivation test inside the existing `causal_wake_update_law` priority, not permission to relax the no-receiver-velocity axiom.

At comparison level, the scalar kernel $\delta(\tilde g)/r$ lacks the velocity-contraction numerator present in vector-current direct-action kernels. Replacing that numerator by a constant is an inferred structural source of missing cancellation terms, but causal-only time asymmetry and the unclosed variation residual are additional candidates. A complete scalar variation that closes the residual would falsify that attribution.

## Wake-Energy Dimensional And Sign Audit

With
$$
[\kappa]=\frac{L^3}{T^2Q^2},
\qquad
[\tilde g]=T,
\qquad
[\delta(\tilde g)]=T^{-1},
$$
the former kernel coefficient $\kappa/c_f$ makes $(\kappa q^2/c_f)\delta(\tilde g)/r$ an acceleration. The double time integral therefore has length dimensions, not action dimensions. The corrected time-normalized kernel is
$$
\mathcal K_{ij}
=
\mu_{\text{arch}}\kappa\sigma_{ij}|q_iq_j|
\Theta(T_1-T_t)
\frac{\delta(\tilde g_{ij})}{r_{ij}}.
$$
The equivalent length-normalized form uses $\mu_{\text{arch}}\kappa c_f\,\delta(g)/r$.

Plainly: the time-normalized delta already contributes one inverse time. The universal bookkeeping conversion, not an extra inverse wake speed, supplies the energy scale.

For the live sign convention $\sigma=+1$ for like-polarity repulsion, the sharp interaction charge is
$$
E_{\mathrm{wake}}^{\mathrm{sharp}}
=
+\frac12\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\mu_{\text{arch}}\kappa\sigma_{ij}|q_iq_j|
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}}.
$$
The delta collapse produces $W^{\mathrm{acc}}$ once. The boundary form therefore uses
$$
E_{\mathrm{wake}}(T)
=
-\frac12\sum_{i,j}
\int_{-\infty}^{T}dT_t
\int_T^\infty dT_1\,
\partial_{T_1}\mathcal K_{ij}(T_1,T_t),
$$
consistent with the interaction entering the action with an outer minus sign.

Plainly: the former inverse-square expression had the wrong units and counted the root weight twice. The former positive boundary derivative also gave the wrong static sign.

No executable accepted result was found to compute the malformed expression. Existing positive-work records use the work integral with $\mu_{\text{arch}}$ already present. No measured result is demoted; formal conservation claims remain conditional until the corrected action and its Euler residual close on one independently evolving wake state.

The consumer census is:

- `content/markdown/aaa/dynamics/master-equation.md` owns the scalar action, regularized diagnostic, boundary charge, and characteristic-tail forms;
- `content/markdown/aaa/dynamics/effective-lagrangian.md` repeats the regularized action and boundary charge;
- `content/markdown/aaa/dynamics/energy.md`, `content/markdown/aaa/dynamics/binary-dynamics.md`, and `content/markdown/aaa/validation/simulations/action-energy/` consume the conditional charge and residual contract but do not numerically evaluate the malformed kernel;
- `scripts/equation-mapping/finite-window-conservation-residual.mjs` validates supplied wake-charge and crosswalk scalars. It does not construct them, so its prior fixtures are interface tests rather than evidence for either energy formula;
- the prescribed-path `wakeFlux` reducers explicitly label their outputs as causal-wake measures, not energy, potential, work, or leakage, and are unaffected;
- no implementation under `src/` or `tests/` was found to compute the malformed inverse-square energy expression.

Plainly: the defect was in the formal source equations, not in a hidden accepted numerical engine. Downstream conservation packets still need new corrected inputs before they can become evidence.

## Acceleration Blindness And Radiation Boundary

Derived: one fixed canonical hit reads transmitter position and velocity but no transmitter acceleration or higher derivative. A sequence of retained hits can still encode an accelerated path through changing velocities, roots, weights, and directions.

Inferred boundary: absence of a separate acceleration-dependent $1/r$ acceleration term does not prove absence of energy transport to infinity. Acceleration falloff and energy-current falloff are different questions, and the Architrino-native wake-energy current is not yet derived.

Derived non-claim: there is no primitive instantaneous acceleration-derivative self-term in the canonical law. This does not exclude delayed self-hit exchange, assembly recoil, photon emission, or an effective radiation-reaction law after coarse graining.

Falsifiers: a canonical fixed-hit implementation reading transmitter acceleration overturns the first statement; a derived nonzero far-boundary wake-energy current establishes radiation without overturning it; an accepted assembly reduction producing an effective self-reaction term overturns any stronger no-reaction claim.

## Consumer Impact Verdicts

| Consumer | Verdict | Required treatment |
| --- | --- | --- |
| Master Equation | rewrite applied | Correct energy kernel and sign; retain the fixed-point-cloud negative control, add the relative-periodic moving-assembly contract, and state fixed-hit acceleration scope. |
| Energy | rewrite applied | State action normalization and reject inverse-square energy substitution. |
| Effective Lagrangian | rewrite applied | Correct scalar-kernel prefactors and boundary-energy sign. |
| Causal Action Functional | unaffected | Its inverse-area scalar statistic is not the action-energy kernel or a dynamics record. |
| Binary Dynamics | grade constraint | A translating binary needs a relative-periodic evolved branch with full state, root-ledger, residual, and stability closure. The fixed-point-cloud null is not a branch requirement. |
| Detecting the Absolute Frame | grade constraint | Residual is not an operational detector until a stable translating assembly and readable response are derived. |
| Constructing the Absolute Frame | unaffected | Ontic reconstruction from complete tagged wake data does not rely on a fixed-point-cloud translation model. |
| Special-relativity braid bridge | rewrite applied | Scope the exact residual to a fixed-point-cloud negative control and route moving assemblies to the relative-periodic contract. |
| Noether-braid family chapters | unaffected | Their relative-periodic moving-branch program was not validly adjudicated by the withdrawn frozen-overlay screen. Prescribed records remain display-only. |
| Comparative Glossary | unaffected | No accepted terminology or level mapping changed. |
| Radiation | rewrite applied | Separate fixed-hit acceleration blindness from far-zone energy transport. |
| Bremsstrahlung | rewrite applied | Mark acceleration input as a path-derived provisional diagnostic. |
| Synchrotron | rewrite applied | Separate transmitter root-density bunching from receiver root playback. |

Plainly: the audit changes the canonical action bookkeeping and corrects the moving-assembly test. It does not revoke, reject, or demote any candidate braid; the withdrawn catalog rows never evaluated their internal orbital dynamics.

## Next Acceptance Step

The next moving-assembly acceptance step is to continue an eligible rest branch with the EOM solver at $c_f=1$ and produce the relative-periodic record defined above. The evolved record must retain the actual internal orbit, permit its dynamical deformation with group velocity, and return the full state and causal-history ledger before any stability verdict.

The broader theory step remains item 1 in [Master-Equation Closure](../priorities.md): derive one independently evolving wake state. That derivation must decide whether the canonical emission-site line of action survives, whether the candidate transmitter-history cancellation family has any ontological basis, and whether the same update produces the corrected energy, momentum, and angular-momentum accounts. No receiver-velocity relaxation is authorized by this packet.
