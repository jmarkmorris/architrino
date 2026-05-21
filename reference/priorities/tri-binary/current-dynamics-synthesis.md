# Current Dynamics Synthesis

Promotion status: `priority-only`. This packet summarizes the current mathematical state of same-level tri-binary dynamics after the rigid, polarity, deformation, arclength, linearized, and theorem-target packets in this directory. It is a synthesis of priority-side work only. It does not retain a branch or authorize migration into `content/markdown/aaa`.

---

## 1. Main Conclusion

The rigid octahedral same-level carrier is a strong geometry/root seed, but it is not a dynamics branch.

The viable dynamics problem is not:

$$
\text{find phase offsets on a rigid carrier}.
$$

It is:

$$
\text{find six closed arclength-parametrized curves whose delayed causal-wake force equals their curvature acceleration}.
$$

The core equation is therefore

$$
\mathbf{Y}_i''(\lambda)
=
\Gamma P_i^\perp(\lambda)\widetilde{\mathbf{F}}_i(\lambda),
\qquad
\mathbf{Y}_i'(\lambda)\cdot\widetilde{\mathbf{F}}_i(\lambda)=0,
$$

on one retained active-root ledger. This is developed in [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) and formalized as a theorem target in [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md).

---

## 2. Numerical Evidence So Far

The current screens all remain negative.

| Packet | Best useful result | Blocking residual |
| --- | --- | --- |
| [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md) | composes geometry, roots, dynamics, convergence, action, Noether conservation, stability, inventory, and event rows into one promotion theorem | current $M=3$ evidence fails support-complete memory, action-derived scale, event conservation, and stability rows |
| [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) | exact noncollision floor $d_{\min}=R$, clean partner root, stable first cross-root screen | rigid neutral tangential RMS $\approx1.1010$ |
| [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md) | phase offsets reduce tangential RMS to about $0.8798$ | pointwise tangential residual remains $O(1)$ |
| [polarity-phase-rigid-screen-results.md](polarity-phase-rigid-screen-results.md) | neutral polarity reassignment reaches tangential RMS about $0.8296$ with good floors | rigid polarity/phase freedom is still insufficient |
| [low-order-deformation-search-results.md](low-order-deformation-search-results.md) | common radial breathing reduces tangential RMS to about $0.6663$ | angle-clock speed and radial/support rows fail |
| [pair-specific-deformation-search-results.md](pair-specific-deformation-search-results.md) | site-specific radial/phase coupling improves speed RMS to about $0.0689$ and keeps $J_{\min}\approx0.3663$ | tangential RMS remains about $0.8209$ |
| [arclength-deformation-search-results.md](arclength-deformation-search-results.md) | arclength common breathing reaches tangential RMS about $0.4659$ | force-versus-curvature RMS remains about $1.4628$ and $J_{\min}\approx0.2487$ |
| [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md) | common nonplanar mode improves force-versus-curvature RMS to about $1.2176$ | tangential RMS rises to about $0.7023$ and $J_{\min}\approx0.2878$ |
| [binary-specific-plane-normal-search-results.md](binary-specific-plane-normal-search-results.md) | coarse binary-specific normal modes appeared plausible | refinement fails period compatibility, tangential closure, curvature closure, and Jacobian margin |
| [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md) | six-parameter common radial-plus-normal Jacobian is full rank with condition number about $3.62$ | least-squares correction predicts only about $5.6\%$ residual-norm improvement |
| [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md) | exact-antipodal $M=2$ vector Fourier basis has full $36$-column rank and actual clipped steps reduce residual norm | period/unit rows still open; no nonlinear constrained solve yet |
| [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md) | bounded nonlinear $M=2$ solve reduces training tangential RMS to about $0.2566$ and curvature RMS to about $0.4387$ | refinement exposes off-grid residual peaks plus open period/unit rows |
| [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) | $K=12$ restart reduces tangential RMS to about $0.3763$ and curvature RMS to about $0.6255$ while preserving root count | period-length spread grows to about $0.0771R$ |
| [equal-period-projection-results.md](equal-period-projection-results.md) | minimum-norm period projection closes length spread to about $2.6\times10^{-5}R$ while keeping tangential RMS about $0.3923$ and curvature RMS about $0.6377$ | force residuals and unit-speed row remain open |
| [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) | length Jacobian rank-$2$ evidence turns equal period into a local codimension-$2$ manifold target | restricted dynamics rank/range test on $\ker D\mathbf{L}$ remains open |
| [rational-winding-screen-results.md](rational-winding-screen-results.md) | low-integer winding search chooses $(1,1,1)$; nontrivial winding is unsupported by the refined $M=2$ lengths | equal-period force/unit rows still open |
| [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md) | proves construction-speed spread is a chart row removable by arclength inverse when $S_i>0$ and lengths match | force/root/curvature closure must be recomputed in the arclength-inverse chart |
| [variable-speed-factor-extension.md](variable-speed-factor-extension.md) | replaces strict fixed speed by a bounded speed factor $\nu_i$, modifies causal-root Jacobians to $1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$, and allows short controlled self-hit intervals | the current exact-antipodal $M=3$ rows remain the $\nu_i\equiv1$ special case until root, tail, action, and proof-budget rows are rerun |
| [bounded-speed-factor-proof-stack-impact-map.md](bounded-speed-factor-proof-stack-impact-map.md) | maps the bounded speed factor through time maps, root/Jacobian rows, force dynamics, action/Noether, Krawczyk, stability, and self-hit rows | every fixed-speed packet must either declare $\nu_i\equiv1$ or emit bounded-speed successor fields |
| [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) | derives causal-time root sheets, $D_vJ_{ij}^{\nu}$, force derivatives, and bounded-speed Krawczyk envelopes | fixed-speed root-sheet and tail certificates cannot be reused after $\nu_i$ becomes a branch variable |
| [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md) | states the bounded-speed master residual, action, Krawczyk, Noether, event, and stability rows | no bounded-speed retained branch exists until the whole successor stack is rerun on one ledger |
| [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md) | gives fixed-arclength variation formulas for inverse phase, tangent, curvature, and delayed source phase | successor rank/Newton packets must include inverse-phase and root-delay terms, not fixed-construction-phase derivatives |
| [branch-tangent-sensitivity-equations.md](branch-tangent-sensitivity-equations.md) | differentiates inverse phase, retained roots, Jacobians, force terms, residuals, $\Gamma$, curl, and event margins along a coefficient-space branch tangent | no current solver packet emits the full tangent audit; successor matrices must use these rows |
| [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) | projected row has $S_{\min}\approx0.6904$, preserves $5$-$5$ roots, and reproduces the reciprocal $K=12$ force-curvature metric | $K=18$ off-grid peaks persist and intrinsic $\mathcal{R}_{K}$ RMS is about $0.96$ |
| [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) | equal-period-restricted $K=6$ matrix has full $34$-column rank and predicts about $61\%$ residual-norm reduction | predicted step is too large for branch acceptance; trust-region nonlinear solve required |
| [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md) | clipped equal-period arclength-inverse steps improve $K=6$, $K=12$, and $K=18$ residuals while preserving $5$-$5$ roots through $\rho=0.8$ | $\rho=1.2$ loses root count and $\rho=0.8$ has large support-band growth; finite-mode closure remains open |
| [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md) | exact-antipodal $M=3$ has full $52$-column restricted rank and improves $K=18$ residuals through $\rho=0.3$ while preserving $5$-$5$ roots | $\rho=0.4$ loses off-grid root count and the accepted rows still have large support-band growth; no pair-even left-null obstruction is observed |
| [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) | localizes the apparent $M=3$ root-count loss to same-sign binary-$3$ from binary-$2$ roots crossing the working $\eta_{\max}=4$ memory window | extended $\eta_{\max}=4.5$ restores $5$-$5$ roots and preserves descent, but opens a deeper memory/action convention |
| [adaptive-root-front-dynamics.md](adaptive-root-front-dynamics.md) | derives the root-front velocity law and estimates the first $\eta=4$ crossing at $\rho\approx0.32056$ | the result is a memory chart event only if later interval checks preserve bracket, gap, Jacobian, and noncollision guardrails |
| [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) | turns root-front speed, support growth, and tail-certificate margins into explicit continuation-radius inequalities | at $\rho=0.8$ with $\eta_{\mathrm{mem}}=4.5$, the active-window margin predicts only about $\Delta\rho\lesssim0.109$ before another memory exit, and support-complete radius is none without a tail certificate |
| [branch-event-classification-theorem.md](branch-event-classification-theorem.md) | classifies the first continuation events for exact-antipodal $M=3$ and separates proof-budget failure from true obstruction | current $M=3$ data classify as memory-window exit followed by active-window-only tail uncertainty, not root fold, root merger, or relaxation trigger |
| [branch-event-normal-forms.md](branch-event-normal-forms.md) | gives local event-surface equations, transversality conditions, and reset rules for the classified continuation events | current $M=3$ evidence has a memory-window normal form, while root-fold and action-obstruction normal forms remain untriggered |
| [adaptive-memory-action-row.md](adaptive-memory-action-row.md) | derives a support-bound memory criterion $\eta_{\mathrm{mem}}\ge2r_{\max}+m_\eta$ and ties adaptive memory to the action/$\Gamma$ ledger | adaptive memory keeps exact-antipodal $M=3$ live, but $\Gamma_K$ remains diagnostic until the deeper history action is computed |
| [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) | supplies distance, monotone-Jacobian, and Lipschitz slab tests for excluding roots in the tail interval | no $M=3$ tail interval has passed this certificate yet |
| [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) | gives the complementary route when tail roots exist: bracket, isolate, include them, and recompute force, $\Gamma$, curl, action, and cokernel rows | current $M=3$ tail has not yet been searched or assimilated, so the active-window residual remains non-retaining |
| [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md) | converts the $\rho=0.8$ exact-antipodal $M=3$ gap $(4.5,5.5211575250+m_\eta]$ into a finite slab exclusion-or-assimilation protocol | current $M=3$ remains `active-window-only` until this tail resolves for every required source pair and node |
| [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md) | supplies executable interval bounds for source phase intervals, distances, unit separations, Jacobians, endpoint signs, and Lipschitz constants | no interval tail run has emitted these bounds yet, so support completeness remains unproved |
| [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md) | adds interval Newton exclusion and parametric Krawczyk one-root tube tests to the support-tail execution ledger | no Newton/Krawczyk tail cells have been emitted yet |
| [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md) | derives the coefficient-box sensitivity bounds for $G$, $J$, Newton images, Krawczyk tubes, and $\rho_{\mathrm{tail}}$ | no sensitivity run has emitted the limiting tail persistence radius, so a pointwise clean tail subdivision would still be proof-budget ineligible |
| [support-complete-m3-tail-slab-schedule.md](support-complete-m3-tail-slab-schedule.md) | turns the observed/deep support-tail split into owned atomic cells and requires exactly one coefficient-box persistent terminal predicate per cell | no slab schedule has emitted terminal predicates, so the first uncertainty is still the support-tail ledger rather than action, cokernel, or event dynamics |
| [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) | upgrades nodewise tail slabs to arclength-cell exclusion or root-sheet assimilation using $\partial_\lambda G$ and implicit root-sheet bounds | no mesh-lifted tail certificate exists, so nodewise root absence would still be insufficient for curve-level support completeness |
| [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) | packages the tail run as atomic cell statuses, endpoint ownership, coefficient-box persistence, and $E_{\mathrm{tail}}$ for the master certificate | no execution ledger has been emitted, so tail failure remains the first mathematical blocker |
| [support-complete-m3-tail-algorithm-termination.md](support-complete-m3-tail-algorithm-termination.md) | proves the adaptive tail subdivision terminates under regular sheet, Jacobian, separation, and excluded-gap hypotheses | if a run does not terminate, the first failed regularity row must be classified before dynamics is interpreted |
| [support-complete-m3-tail-frontier-shrinkage.md](support-complete-m3-tail-frontier-shrinkage.md) | extracts the sampled $\eta_{\max}=5.0$ no-new-root diagnostic and splits the support tail into $(4.5,5.0]$ and $(5.0,5.5211575250+m_\eta]$ | useful subdivision guidance only; interval proof and mesh lift remain open |
| [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) | differentiates assimilated tail root sheets through delayed force, projected residuals, virtual-work curl, action-scale derivative, and Krawczyk envelopes | if tail roots exist, no action or proof-budget row is valid until these sheet derivatives are emitted on the same ledger |
| [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) | bounds the omitted delayed-force and curvature-residual perturbation if the tail is not certified absent | the current $M=3$ tail has no emitted count/Jacobian envelope, so the branch-certificate error remains unbounded |
| [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md) | proves the expected pair-even/pair-odd residual split for an antipodally closed exact-antipodal ledger | parity alone does not trigger antipodal relaxation; a stable pair-even obstruction is still required |
| [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md) | decomposes exact-antipodal obstruction and relaxation tests by row-aware pair sector and binary Fourier block | current $M=3$ data lack the support-complete adjoint cokernel basis needed before a block obstruction can be certified |
| [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) | states the cokernel inequality needed to prove no exact-antipodal zero exists in a certified support-complete ball | current $M=3$ packets do not emit the support-complete residual, left-null basis, Lipschitz bound, or tail envelope needed to apply it |
| [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md) | derives the adjoint root-transfer equations, obstruction scalars, and relaxation-column projections behind the cokernel test | current $M=3$ packets do not emit a weighted adjoint basis, root-transfer margins, or projected relaxation-column matrix |
| [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) | gives the constructive range/cokernel Newton certificate for a support-complete dynamics candidate | current $M=3$ data has descent and rank, but lacks support-complete memory, right-inverse/Lipschitz bounds, and cokernel closure after a ledger-consistent correction |
| [support-complete-m3-successor-certificate-target.md](support-complete-m3-successor-certificate-target.md) | composes the $M=3$ memory, tail, refinement, Krawczyk, cokernel, $\Gamma$, curl, and stability prerequisites into one successor theorem target | current $M=3$ data is `active-window-only`, not yet a support-complete dynamics candidate or exact-antipodal obstruction |
| [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md) | gives the ordered exact-antipodal $M=3$ solve alternative and exhaustive status list | current $M=3$ has not run the sequence, so it remains `active-window-only` and `continue-exact-antipodal` |
| [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md) | states the exact-antipodal $M=3$ residual vector, root-sensitive derivative blocks, SVD/Krawczyk corrector, action audit, and adjoint obstruction decision after tail closure | no support-complete ledger exists yet, so the corrector is the next solve after tail resolution, not a current branch certificate |
| [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md) | derives the post-tail $\Gamma_B$ row from virtual-work exactness, scalar inertia reduction, $D\Gamma_B$, and fitted/action compatibility | current $M=3$ rows still use diagnostic $\Gamma_K$ fits and have no support-complete action-scale ledger |
| [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md) | turns the exact-antipodal $M=3$ corrector into chart-radius, derivative-envelope, range-residual, cokernel-audit, and obstruction-lower-bound inequalities | current $M=3$ lacks the proof-budget constants needed to distinguish failed proof budget from true obstruction |
| [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) | composes the post-tail chart radius, derivative envelopes, Krawczyk range row, cokernel row, and action compatibility into one normalized score | no post-tail budget can run until the support-tail ledger is solved |
| [support-complete-m3-augmented-root-corrector.md](support-complete-m3-augmented-root-corrector.md) | rewrites the $M=3$ corrector with retained delays as explicit variables and proves equivalence to the implicit root-sensitive derivative by Schur complement | current $M=3$ has not emitted augmented root variables, so this is an optional but cleaner route for the next solve |
| [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md) | tests whether an $M=3$ cokernel defect is removed by higher exact-antipodal Fourier columns before calling it a true exact-antipodal obstruction | no $B_4$ or refinement-ladder defect matrix has been computed, so relaxation remains premature even after a hypothetical $M=3$ proof failure |
| [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md) | states the exact energy, momentum, angular-momentum, charge, source-provenance, and event rows required after a dynamics/action candidate | current $M=3$ has no Noether currents or event interval, so `event-action-not-computed` remains open |
| [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md) | states the exact monodromy, neutral-mode, presymplectic/Krein, energy-momentum, exchange, and nonlinear recovery rows required after dynamics/action and Noether/event closure | current $M=3$ has no root-ledger monodromy, so `root-ledger-floquet-stability-open` remains open |
| [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md) | states the exact uniform floors, root/tail convergence, force convergence, mesh/projector/aliasing limits, and scale convergence needed to pass from finite $M=3$ rows to a curve-level candidate | current $M=3$ is local finite evidence, not a certified refinement sequence |
| [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md) | integrates all exact-antipodal $M=3$ proof rows into one normalized master residual and first-failure decision theorem | current $M=3$ fails the master theorem at support-complete memory and action/convergence/event/stability rows |
| [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md) | derives the pseudo-arclength tangent/corrector framework for following a support-complete dynamics/action zero through coefficient space | no current row supplies the required support-complete zero or one-dimensional branch kernel |
| [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md) | gives the Lyapunov-Schmidt normal forms for extra-kernel branch switching and midpoint symmetry breaking | current $M=3$ data have no support-complete zero, no extra kernel direction, and no adjoint switch basis |
| [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) | requires pair-midpoint columns to span the exact-antipodal cokernel obstruction before relaxation opens | current $M=3$ data has no certified exact-antipodal obstruction, so relaxation remains premature |
| [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) | bounds off-grid residuals, root-label drift, excluded-gap failures, and projector drift between collocation nodes | current refined-grid failures mean future obstruction/closure rows need explicit $\epsilon_{\mathrm{disc}}$ rather than sampled-node trust |
| [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md) | states the uniform-refinement theorem needed to pass from finite Fourier rows to a curve-level branch | current $M=3$ evidence is local descent, not a convergent certified refinement sequence |
| [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md) | proves ordinary same-curve self roots cannot pass a positive Jacobian floor in the fixed-speed arclength chart | under variable speed, ordinary self-hit rows require the overspeed hinge, short-duration, action, and event rows from the speed-factor extension |
| [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md) | states the regulated action, weak-limit, curl, and event-ledger conditions for any fold-layer force | no fold-layer is currently included; opening it requires action/event proof, not just residual improvement |
| [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md) | states the constitutive, memory, passivity, isotropy, curl, and conservation rows for any medium-response force | no medium response is currently included; opening it requires exchange ledgers and symmetry residuals |
| [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md) | derives per-root force derivative bounds from $\eta_0$, $J_0$, and curve-variation constants | current $M=3$ packets do not emit the derivative envelope needed for trust, refinement, Krawczyk, or curl bounds |
| [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) | states the monodromy, gauge-neutral multiplier, NHIM, and perturbation-recovery rows for local branch stability | current $M=3$ rows are not stability candidates because dynamics closure and action scale remain open |
| [root-dependent-variational-equation.md](root-dependent-variational-equation.md) | writes the linearized root-delay, force, projected dynamics, and monodromy equations needed for retained-branch stability | current $M=3$ data do not yet have a dynamics/action zero to linearize |
| [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md) | turns the action row into a constrained Hessian with second root sensitivities, Morse index, and Floquet-nullity compatibility | current $M=3$ data lack support-complete dynamics, action-derived $\Gamma_B$, curl closure, and monodromy, so the Hessian is not defined |
| [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) | separates Noether/action conservative monodromy from dissipative or exchange-driven attraction | current $M=3$ data have no boundary two-form, monodromy, or medium/event dissipation row |
| [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) | identifies the expected Hessian nullity and unit multipliers generated by gauge, Noether symmetries, conserved levels, and branch-family tangents | current $M=3$ data have no retained action branch or monodromy to quotient |
| [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md) | supplies the Krein-signature unit-circle test and opposite-sign collision criterion for conservative stability | current $M=3$ data have no reduced two-form, no unit eigenspaces, and no Krein form |
| [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md) | converts conserved currents and the symplectic slice into a conservative orbital-stability test modulo symmetries | current $M=3$ data have no conserved-current leaf, augmented Hessian, or symplectic slice |
| [history-force-variationality-condition.md](history-force-variationality-condition.md) | turns the action question into a finite-mode one-form curl test on the same active-root stratum | the $M=3$ rows have not computed this curl, so $\Gamma_K$ remains fit-only |
| [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md) | proves the projection identity relating fitted $\Gamma_K$, action-derived $\Gamma_B$, force norm, and residual penalty | no current $M=3$ packet emits an action-derived $\Gamma_B$, scalar inertia reduction, or fit uncertainty band |
| [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md) | derives event conservation rows from invariance of the total branch-plus-event action on one ledger | current $M=3$ rows have no action-derived scale, event window, or Noether-Sea update, so conservation remains open |

The important positive signal is that deformation can substantially reduce tangential leakage or curvature mismatch, depending on which deformation axis is opened. The important negative signal is that low-mode improvements tend to trade one residual for another or move toward poor Jacobian floors unless the solver enforces the full intrinsic curve system. The arclength-inverse rescore adds one more caution: reciprocal force-from-curvature diagnostics can look better than the retained intrinsic curvature-from-force row, so future packets must state their $\Gamma$ convention.

---

## 3. What Changed Mathematically

The first deformation screens treated the construction angle as physical time:

$$
q_i(t)=t+\phi_i.
$$

For a deformed curve this is the wrong final chart. If

$$
\mathbf{X}_i(q)
$$

is not traversed at constant arclength speed in $q$, then the apparent speed residual partly measures the clock choice rather than a physical impossibility.

The corrected clock is

$$
\int_0^{q_i(t)}
\left\|
\mathbf{X}_i'(\zeta)
\right\|d\zeta
=
c_ft
\pmod{L_i}.
$$

Then

$$
\|\dot{\mathbf{x}}_i(t)\|=c_f
$$

holds identically, and the carrier residual becomes

$$
\mathcal{R}_{\mathrm{dyn},i}
=
\mathbf{F}_i-c_f^2\boldsymbol{\kappa}_i.
$$

Thus the new retained-branch residuals are not merely

$$
\mathcal{R}_{\mathrm{speed}},
\qquad
\mathcal{R}_{\mathrm{tan}}.
$$

They are:

$$
\mathcal{R}_L,
\qquad
\mathcal{R}_T,
\qquad
\mathcal{R}_{\mathrm{tan}},
\qquad
\mathcal{R}_{\mathrm{curv}},
$$

plus the root, support, noncollision, event/action, and stability rows.

The status of $\mathcal{R}_T$ is subtler than the force rows. In a constant-speed Fourier chart it is an algebraic row,

$$
\|\partial_{\theta}\mathbf{Z}_i\|^2-\ell^2=0,
$$

but in an arclength-inverse shape chart it is replaced by the regularity floor

$$
\min_{\theta}\|\partial_{\theta}\mathbf{Z}_i(\theta)\|>0
$$

and by the exact inverse arclength map. Thus construction-speed spread is not itself a physical force-balance failure; it is a sign that the finite Fourier phase is not yet an arclength phase.

There is now a second, broader interpretation. A bounded speed factor $\nu_i$ can be treated as a physical branch variable rather than as a chart artifact. In that row the old fixed-speed equations are the $\nu_i\equiv1$ subcase, the common period is an equal causal-time period, and the tangential force projection drives $\nu_i\nu_i'$ instead of being forced to vanish.

---

## 4. Current Dynamics Picture

The fixed-speed same-level branch has three hard constraints that must be solved together.

First, the delayed force field must be tangent-free:

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0.
$$

Second, the normal component must match curvature with one derived scale row:

$$
\mathbf{K}_i=\Gamma P_i^\perp\widetilde{\mathbf{F}}_i.
$$

Third, the same curve must preserve the active causal-root ledger:

$$
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x,
\qquad
|\mathcal{A}_i(\lambda)|<\infty.
$$

For a variable-speed branch, the first two equations are replaced by

$$
\nu_i\nu_i'
=
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i,
\qquad
\nu_i^2\mathbf{K}_i
=
\Gamma P_i^\perp\widetilde{\mathbf{F}}_i.
$$

The root ledger must also use the speed-weighted Jacobian

$$
J_{ij}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}.
$$

The screens show that these constraints pull against each other. Strong radial breathing improves tangential balance but tends to degrade Jacobian floors and does not align the full force with curvature. Site-specific radial/phase coupling protects speed and roots better, but it gives back too much tangential improvement. Common plane-normal precession improves curvature alignment, but increases tangential leakage; binary-specific normal modes fail when period and Jacobian constraints are refined.

---

## 5. Most Likely Missing Degrees Of Freedom

The next deformation family should change delayed line-of-action directions without relying only on radius.

The most plausible missing rows are:

1. plane-normal precession, so each binary plane can rotate slowly and change cross-binary causal-hit projections;
2. antipodal relaxation, so the two partners in a binary are not forced to remain exact negatives when force balance wants a small separation asymmetry;
3. a bounded speed-factor row, so small speed exchange can absorb tangential force without forcing $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0$ pointwise;
4. a controlled self/fold-layer row, if same-source delayed contributions can be regularized with a weak-limit and event ledger, or if a variable-speed self-hit mode satisfies the short-duration and action/event rows;
5. a declared Noether-Sea medium-response term, but only with a constitutive row and event/action closure.

The first three are preferable before a new medium-response channel because they keep the dynamics inside the carrier/root ledger. The speed-factor row is not free proof slack: it changes the root map, period row, tail certificates, action ledger, and same-source event policy.

---

## 6. Minimal Retention Target

A candidate branch is not retained until one packet supplies a single active-root ledger and a single curve family satisfying:

$$
\mathcal{R}_{\mathrm{curve}}
=
\left(
\mathcal{R}_{T},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{center}},
\mathcal{R}_{\mathrm{support}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{action}}
\right)
=0
$$

within declared tolerances, with

$$
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x.
$$

The linearized route is:

$$
D\mathcal{F}(\alpha_*)\delta\alpha
=
-\mathcal{F}(\alpha_*),
$$

after quotienting translations, rotations, time shift, and center gauge. The rank target in [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md) is therefore not a proof of existence; it is the gate that tells whether a chosen Fourier deformation space has enough directions to kill the current residual.

---

## 7. Immediate Mathematical Next Step

The next high-value computation is not another rigid phase search. It is a finite-mode intrinsic curve solve:

$$
\mathbf{Y}_i(\lambda)
=
\sum_{m=0}^{M}
\mathbf{a}_{i,m}\cos m\lambda
+
\mathbf{b}_{i,m}\sin m\lambda,
$$

with collocation constraints

$$
\|\mathbf{Y}_i'(\lambda_n)\|=1,
$$

and objective

$$
\mathcal{J}_{\mathrm{curve}}
=
\|\mathcal{R}_{T}\|^2
+\|\mathcal{R}_{L}\|^2
+\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+\mathcal{P}_x
+\mathcal{P}_J
+\mathcal{P}_{\mathrm{support}}.
$$

The first full collocation run should start with the rigid octahedral loop basis, then enable plane-normal precession and antipodal relaxation before introducing any self/fold-layer or medium-response channel. The common plane-normal screen is the best evidence so far that nonplanar geometry matters, the binary-specific screen shows that common-period and Jacobian barriers must be enforced during the solve rather than audited afterward, the six-variable rank screen shows that the current scalar ansatz is too small even though its columns are independent, and the $M=2$ vector rank and nonlinear screens show that the full collocation direction has enough local degrees of freedom to produce real descent. The immediate bottleneck is now coupled equality solving: the equal-period projection shows $\mathcal{R}_L$ can be closed without destroying the force progress, the rational-winding screen does not support a nontrivial winding escape, and the equal-period constraint-qualification lemma reduces the next linear algebra target to the restricted residual matrix on $\ker D\mathbf{L}$.

The next solver should compare two versions of that restricted target. In the constant-speed Fourier chart the open rows are $\mathcal{R}_T$, $\mathcal{R}_{\mathrm{tan}}$, and $\mathcal{R}_{\mathrm{curv}}$. In the arclength-inverse shape chart, $\mathcal{R}_T$ is replaced by the nondegeneracy floor $S_i>0$, and the open physical rows are $\mathcal{R}_{\mathrm{tan}}$ and the retained intrinsic curvature row

$$
\mathcal{R}_{K}
=
\mathbf{K}-\Gamma_KP^\perp\widetilde{\mathbf{F}}
$$

computed after inverse arclength reparameterization. The reciprocal row

$$
\mathcal{R}_{F}
=
\widetilde{\mathbf{F}}-\Gamma_F\mathbf{K}
$$

should remain as a comparison diagnostic only.

The latest rank and trust-region screens show that equal-period restriction does not locally kill the arclength-inverse force directions. The $M=2$ restricted matrix has full $34$-column rank, and the $M=3$ restricted matrix has full $52$-column rank. Clipped nonlinear steps produce real descent through $K=18$. The obstruction is now finite-mode nonlinear closure with controlled root ledgers, memory-window depth, and support-band size. The $M=2$ trust row $\rho=0.8$ preserves $5$-$5$ roots and reduces the $K=18$ residual norm from about $11.49$ to about $8.94$, but grows the support radius to about $2.32$. The $M=3$ continuation reduces the $K=18$ norm further to about $8.15$ at $\rho=0.3$ under $\eta_{\max}=4$. A later root-frontier scan shows the apparent $\rho=0.4$ root loss is a memory-window exit: the missing roots reappear under $\eta_{\max}=4.5$, and the $K=18$ norm at $\rho=0.4$ is about $7.94$ with $5$-$5$ roots. The estimated root-front crossing of the fixed $\eta=4$ window is $\rho\approx0.32056$. This keeps exact-antipodal $M=3$ alive but opens the action/memory burden.

The active-window rescore cannot yet be interpreted as a support-complete dynamics row. At $\rho=0.8$, the unresolved support tail is $(4.5,\ 5.5211575250]$; until the tail-exclusion certificate passes or the solver emits a positive tail count/Jacobian envelope, the omitted-force row has status `tail-force-error-unbounded`. The $\eta_{\max}=5.0$ rescore agreement gives a sampled `sampled-tail-empty-to-5` diagnostic, so the next interval pass should split the tail into $(4.5,5.0]$ and $(5.0,5.5211575250+m_\eta]$. The trust-radius reading is also tight: with $\eta_{\mathrm{act}}\approx4.4058154936$ and observed root-front speed near $0.8645$, the fixed $\eta_{\mathrm{mem}}=4.5$ row has only about $0.109$ radius of active-window headroom before the next expected memory exit.

The tail route now has two mathematically complete branches. If the tail slabs are root-free, the active-window force becomes support-complete. If the tail slabs contain roots, those roots must be bracketed, assimilated into $\mathcal{A}_{\eta}^{+}$, and the force, fitted $\Gamma_K$, action-derived $\Gamma_B$, curl row, cokernel audit, and refinement row must be recomputed. Finding tail roots is therefore not a failure by itself; failure occurs only if the extended ledger loses floors, loses descent, or exposes a support-complete obstruction.

The root-sheet variation theorem turns that assimilation route into actual dynamics. A tail root found at a node must lift to a sheet $\eta_u(\lambda)$, and the derivative $D_v\eta_u$ must enter $D\widetilde{\mathbf{F}}$, $D\mathcal{R}_K$, the virtual-work curl $\mathcal{C}^{+}$, $D\Gamma_B$, and the Krawczyk constant $L_R^{+}$. Without these terms, the next run is only a root-count extension; it is not a support-complete action or proof-budget calculation.

The branch-event classification now fixes the continuation language. The $\rho\approx0.32056$ transition is `memory-window-exit`; the unresolved interval after $\eta_{\mathrm{mem}}=4.5$ is `tail-certificate-failure` or `active-window-only`; and a failed Krawczyk inequality is only `newton-krawczyk-proof-budget-open` unless a support-complete cokernel lower bound also passes. This prevents the current data from being overread as root annihilation, relaxation evidence, or exact-antipodal impossibility.

The normal-form packet turns those labels into local dynamics. A memory-window exit has the scalar form $\eta_{\mathrm{mem}}-\eta_a=\dot e(s-s_*)+O((s-s_*)^2)$ with the root still regular; a root fold has the quadratic form $G=c_2x^2+c_1(s-s_*)+\cdots$ and stops the ordinary root ledger. These are different mathematical events and require different reset rules.

The residual-parity diagnostic does not yet justify opening antipodal relaxation. In the exact-antipodal evaluator, $\mathcal{R}_{\mathrm{tan}}$ is pair-even and $\mathcal{R}_{K}$ is pair-odd to roundoff scale, but the $M=3$ range screen is rich rather than obstructed. Antipodal relaxation should wait until a stable left-null or residual-remainder split shows a persistent pair-even obstruction unreachable by exact-antipodal modes.

The relaxation-column certificate sharpens that waiting rule. A certified pair-even exact-antipodal obstruction is only the first half of the decision; the pair-midpoint columns must also span that obstruction in the exact-antipodal cokernel. Otherwise relaxation is not the missing local degree of freedom.

The obstruction certificate now states that criterion precisely: a pair-even left-null residual becomes actionable only when its cokernel projection exceeds the certified nonlinear remainder, tail-force error, and discretization error on a support-complete ledger. The current $M=3$ evidence has not emitted those rows, so the decision remains exact-antipodal continuation with adaptive memory, not antipodal relaxation.

The constructive side is now equally explicit. A support-complete dynamics candidate needs more than descent: it must solve the range-projected equation inside a certified Kantorovich radius and then leave cokernel residual plus tail/discretization errors below the declared dynamics tolerance. This makes `descent-without-closure` the correct status for the present $M=3$ rows.

The support-complete $M=3$ successor certificate now packages that decision in one object. The next run must emit the memory policy, tail slabs, tail execution ledger, post-tail proof budget, force-derivative envelope, SVD/Krawczyk bounds, cokernel audit, discretization error, action-derived $\Gamma_B$, and curl row together. Without that composite packet, another lower residual is still only an active-window screen.

If that successor packet ever produces a dynamics/action zero, the next object is not another isolated screen but a coefficient-space branch. The continuation theorem gives the tangent equation $D\mathcal{G}\tau=0$, a pseudo-arclength corrector, and event margins for memory, support, roots, chart speed, tail completeness, curl, and $\Gamma$. This makes smooth branch dynamics a theorem target rather than a visual continuation heuristic.

The tangent sensitivity equations now give the derivative backbone for that continuation theorem. Along a branch tangent $\tau$, the derivative chain runs through inverse arclength phase, delayed root motion, Jacobian motion, per-root force motion, residual motion, fitted/action scale motion, and event-margin motion. This is the row future solvers must emit if they claim a Krawczyk, event, or Floquet certificate rather than a finite-difference screen.

The collocation-refinement row closes another gap exposed by the data. Training-grid descent is not branch evidence unless residual derivative envelopes, root-label mesh guards, excluded-gap guards, and cokernel projector drift bound the off-grid error. This is the source of $\epsilon_{\mathrm{disc}}$ in the obstruction and Newton closure certificates.

The delayed-force Lipschitz row supplies the missing constants behind those certificates. It bounds root motion, line-of-action direction motion, Jacobian variation, and the inverse-square force weight on a root-regular chart. Without those constants, the trust-radius, Krawczyk, collocation, and curl rows remain formal rather than executable.

The root-dependent variational equation is the corresponding stability operator. It linearizes root delays, Jacobians, force contributions, projected curvature dynamics, and the action-derived scale on the same retained root ledger, then builds the monodromy operator used by the Floquet certificate. This rules out frozen-root stability evidence for any retained claim.

The finite-mode convergence theorem is the endpoint of the dynamics proof stack. A single successful finite solve is not enough; a refinement sequence must carry uniform floors, support-complete memory, vanishing mesh error, vanishing continuous residuals, and a stable scale convention. Only then can the finite rows promote to a curve-level dynamics branch.

Even after dynamics closure, branch retention still needs stability on the same root ledger. The Floquet certificate makes this explicit: monodromy, gauge-neutral multipliers, transverse spectrum, NHIM domination, and nonlinear perturbation recovery must all be computed without freezing roots or changing memory convention.

The $\Gamma$ row is likewise not just a scalar fit. The fit/action identifiability identity shows that if an action-derived $\Gamma_B$ differs from the fitted $\Gamma_K^{\mathrm{fit}}$, the curvature residual grows by the mismatch times $\|P^\perp\widetilde{\mathbf{F}}\|$. A future branch packet must therefore emit the force-norm floor, fit uncertainty band, one-form curl status, scalar inertia reduction, and action-derived $\Gamma_B$ before a fitted scale can become a physical scale row.

The Noether/action theorem then connects the dynamics to conservation. Energy, momentum, angular momentum, charge, and source provenance are not independent badges; they close when the same support-complete action, event interval, central inventory, and Noether-Sea update are invariant under the corresponding generators. Until that theorem row passes, event conservation remains `event-action-not-computed`.

The $M=3$ Noether/event handoff now makes that row executable. After a support-complete exact-antipodal dynamics/action candidate, the next packet must emit a total action, generator currents, a closed-period current test, source-provenance equations, Noether-Sea and boundary exchange rows, and the event residual vector $(\mathcal{R}_E,\mathcal{R}_{\mathbf{p}},\mathcal{R}_{\mathbf{J}},\mathcal{R}_Q,\mathcal{R}_{\mathrm{src}})$ on the same ledger. A branch with good force residuals but no Noether currents is still not retained.

The $M=3$ stability handoff now closes the other non-promotion label. After dynamics/action and Noether/event closure, stability is not just "multipliers inside the unit disk." The branch must use root-dependent monodromy, Noether neutral-mode reduction, a fixed-current leaf, a conservative boundary two-form audit, Krein or energy-momentum classification, and nonlinear perturbation recovery. If the ledger is conservative, strict attraction is invalid unless a declared exchange or dissipation row supplies the contraction mechanism.

The finite-mode convergence handoff now separates a certified finite $M=3$ candidate from a curve-level branch. A single successful $M=3$ solve would still need a refinement sequence with uniform floors, convergent root and tail sheets, vanishing mesh/projector/aliasing errors, vanishing continuous residuals, and a stable action-scale convention. This is the mathematical bridge that prevents a good finite collocation row from being overread as a continuum branch.

The master retention theorem now states the complete exact-antipodal $M=3$ meaning of "solved": a single normalized master residual $\mathfrak{E}_{M3}\le1$ plus positive floors, with every certified error term accounted for and every row on one ledger. It also makes the alternatives explicit: retained exact-antipodal $M=3$ branch candidate, support-complete dynamics/action candidate, support-complete exact-antipodal obstruction, or active-window-only.

The promotion theorem now composes those obligations into one decision surface. A same-level branch promotes only when geometry, support-complete roots, dynamics, finite-mode convergence, action scale, Noether conservation, root-dependent stability, inventory, and event rows all share one ledger convention. The current $M=3$ row is useful continuation evidence, but its promotion status is still `not-retained`.

The same-source lemma removes a tempting but invalid fixed-speed escape route. In an arclength chart with $\nu_i\equiv1$, ordinary same-source roots satisfy chord length $\le$ arclength delay; equality forces a straight segment and $J_{\mathrm{self}}=0$. The variable-speed extension reopens only a controlled version: an ordinary self-hit requires an overspeed hinge, a positive $J_{\mathrm{self}}$ floor, short duration, overspeed budget, and action/event rows. Without those rows, a same-source force channel must still be a declared regularized fold-layer or split-source representative.

The fold-layer theorem keeps that route honest. A fold-layer can enter only as a regulated action term with bounded force and derivative rows, a weak-limit or finite-regulator convention, combined one-form curl, and event-ledger conservation. It is not a hidden way to add an untracked force.

The medium-response theorem applies the same discipline to Noether-Sea response. A response force must come from a constitutive object with compatible memory, bounded derivative, exchange ledgers, isotropy or preferred-orientation residual, combined curl, and Noether conservation. It cannot be used as an empirical correction term.

Until such a curve solve closes, the correct status remains:

$$
\texttt{architecture-development},
\qquad
\texttt{priority-only},
\qquad
\texttt{no-retained-same-level-branch-yet}.
$$
