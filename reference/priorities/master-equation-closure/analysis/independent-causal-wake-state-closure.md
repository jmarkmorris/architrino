# Independent Causal Wake-State Closure

## Status

- Claim level: `derivation-target`
- Priority rank: `1` within Master Equation closure
- Current result: `regular-kinematic-substate-derived; lineage-gated-quintic-candidate-partial; account-complete-update-still-open`
- Canonical regular-domain law: unchanged transmitter-side acceleration
- Required outcome: one causal update that closes the coincident transition and conserved accounts together

## Closure Question

What is the smallest independently evolving wake state, derived from Architrino primitives, that can be appended to retained path histories so that one causal update:

1. reproduces $c_f/|D_t|$ acceleration on certified simple-root charts;
2. crosses coincident same-transmitter root birth with finite accumulated acceleration and a unique accepted continuation;
3. closes energy, momentum, and angular momentum without defining wake changes as the negative residual of the motion changes?

This is a research program, not an accepted ontology change. The state must be derived before it can be promoted.

The first full attempt is [Independent Causal Wake-State Minimum and Obstruction](analysis-independent-causal-wake-state.md). It derives necessary direction-resolved information and distinguishable coupling, energy, momentum, and boundary outputs. It does not prove a coordinate-minimal representation or that those outputs must be independent primitive state variables. It also proves that the current primitives do not select the coincident-birth maturity law, the motion-account functions, an emission capacity, or a reception transfer. The route therefore remains not advanced until one new Architrino-native construction supplies all four together.

The first authorized new construction is [Diagonal-Birth-Lineage Causal-Wake Candidate](diagonal-birth-lineage-causal-wake-candidate.md). Its frozen cubic profile fails receiver-sensitivity integrability. Its separately frozen lineage-gated quintic successor passes the exact quadratic and arbitrary finite odd-order local magnitude and receiver-sensitivity tests while preserving ordinary folds by provenance. It remains priority-only because persistent tangencies, lineage certification, event-map uniqueness, regulator independence, and all three conserved accounts are unresolved.

Research input: [Wake Reception Transfer, Motion Accounts, and Coincident-Birth Maturity](../../../office-of-research/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md) sharpens the allocation, account-measure, birth-integrability, regulator, extraction, and angular-booking questions. It is priority-only research guidance; it does not amend this closure status, select a constitutive update, or establish conservation or unique continuation.

## Regular Kinematic Substate Result

The regular-domain emission, propagation, and reception geometry now has an explicit autonomous state realization. Each emission label stores the transmitter identity, emission time, fixed emission-site center, expanding radius, and polarity-weighted emission measure. After emission,

$$
\dot{\mathbf C}_{t,e}=\mathbf0,
\qquad
\dot R_{t,e}=c_f.
$$

The local reception direction is the expanding surface normal, which is the canonical emission-site-to-receiver direction. Fixed-reception source-time collapse of the constant emission measure independently yields $c_f/|D_t|$. The executable reference is `scripts/equation-mapping/derive-causal-wake-update-law.mjs`, with focused checks in `tests/causal-wake-update-law.test.js`.

Claim grade: derived on certified regular support from the existing fixed-speed causal-surface postulate. This is `promote now` for the regular direction and weight, and it has been captured in the Master Equation.

The same derivation rejects the inertially extrapolated direction as a local response of the present wake state. Redirecting only the acceleration breaks surface-normal response. Moving each emitted center inertially changes surface element speeds away from the fixed absolute value $c_f$ and produces a different causal support and collapse denominator.

This does not overturn the negative result below. The transparent kinematic state has no derived maturity, energy, momentum, reception-transfer, or account-bearing boundary law. It therefore does not cross coincident same-transmitter birth or close the three conserved accounts. Promotion classification for the full packet remains `defer with blocker`.

For the present-state interpretation, causal-root solving is an intersection lookup against the retained emitted-surface ledger. It does not reconstruct or revise the transmitter history. Counterfactual receiver displacement is used only as a local sensitivity test with the transmitter history frozen and one isolated simple root followed. At a fold or coincident root birth that local derivative fails, and a complete root census plus a separately derived transition rule is required.

The quadratic same-transmitter control now gives a decisive unchanged-law boundary. Every sufficiently small positive-age row is a noncoincident simple root. Exact preservation of the sharp row at every such root requires unit maturity throughout that open one-sided neighborhood, while finite accumulated acceleration requires a nontrivial integrable suppression there. A value assigned only at the exact diagonal cannot satisfy both. Any finite continuation must therefore add a new open-neighborhood boundary/core prescription or a separately derived domain rule; the unchanged current primitives do not contain one.

## Required State And Update

The retained state must be no larger than necessary:

$$
\mathcal S_T
=
\left(\{\mathcal H_i^T\}_{i=1}^{N},\mathcal W_T\right).
$$

The derivation must state every component of $\mathcal W_T$, its units or nondimensional scaling, and which components are independent initial data. It must then supply one deterministic or explicitly multivalued causal update

$$
\left(\mathcal S_{T+\Delta T},\Phi_{\partial}[T,T+\Delta T]\right)
=
\mathcal U_{\Delta T}(\mathcal S_T),
$$

including emission, propagation, reception, same-transmitter near-origin behavior, retained-history truncation, and boundary flux. No update may inspect a future receiver path.

## Mandatory Reductions And Accounts

Away from singular support, the update must reduce to

$$
\mathbf A_i(T)
=
\sum_j\sum_{T_t\in\mathcal C_{ij}(T)}
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^{2}|D_{t,ij}|}
\hat{\mathbf r}_{ij}.
$$

At coincident same-transmitter birth it must certify

$$
\int_{T_0}^{T_0+\epsilon}\|\mathbf A_{ii}(T)\|\,dT<\infty
$$

and convergence to one accepted post-transition state under every declared numerical refinement.

The same update must derive motion, wake, and boundary accounts satisfying

$$
\Delta E_{\mathrm{motion}}+\Delta E_{\mathcal W}+\Phi_E=0,
$$

$$
\Delta\mathbf P_{\mathrm{motion}}+\Delta\mathbf P_{\mathcal W}
+\boldsymbol\Phi_P=\mathbf 0,
$$

$$
\Delta\mathbf L_{\mathrm{motion}}+\Delta\mathbf L_{\mathcal W}
+\boldsymbol\Phi_L=\mathbf 0.
$$

The motion accounts are not licensed to import single-architrino mass, $m\mathbf v$, or $\tfrac12mv^2$. Their maps must be derived from the same Architrino-native construction.

## First Executable Packet

The smallest useful test contains:

1. one regular partner-root control with fixed geometry and varied receiver velocity, verifying unchanged instantaneous acceleration and changed signed playback;
2. one ordinary transmitter-side fold control, verifying the known finite accumulated acceleration;
3. the exact quadratic same-transmitter birth control, verifying a finite, regulator-independent complete transition rather than an event-only patch;
4. one nonsymmetric two-architrino retained-history control, so momentum and angular-momentum accounts cannot close by symmetry alone;
5. one finite retained-history boundary control, verifying explicit boundary flux rather than hidden loss.

Every control must emit the pre-update state, post-update state, wake-state change, motion-account change, boundary flux, refinement identity, and the reconstructed conservation residuals.

The bounded candidate instrument `scripts/equation-mapping/analyze-causal-wake-birth-lineage-candidate.mjs` currently checks the cubic rejection, finite odd-order quintic powers, lineage-gated ordinary-fold transparency, continuous irreversible release, persistent-tangent quarantine, and the $D_r=0$ finite-shell account obstruction. These are candidate tests, not an accepted continuation or conservation certificate.

## Falsifiers

The candidate fails if:

- $\mathcal W_T$ is defined after evolution from the residual it must cancel;
- a present update depends on a future receiver state;
- the regular-domain acceleration differs from $c_f/|D_t|$ at fixed causal geometry;
- the same-transmitter transition depends on regulator path or resumes a nonintegrable open post-birth branch;
- a reception map claims energy closure without reading the present receiver velocity, except under a separately derived constant motion-energy account;
- an allocation rule makes the extraction cap depend on $D_r$ and thereby changes regular acceleration at a receiver-side playback fold;
- one reception updates account content away from the intercepted direction without a separately derived nonlocal redistribution rule;
- two regulator families inside the declared dominated class produce different birth impulses;
- energy closes while momentum or angular momentum does not;
- a boundary loss is omitted rather than emitted as flux;
- the construction imports electromagnetic potentials, gauge theory, Lorentz acceleration, physical architrino mass, or another observer-level field law as a premise.

## Promotion Boundary

Promotion requires an independent derivation or reference calculation for the regular control, the coincident transition, and all three accounts. Agreement between two implementations of the same assumed update checks implementation parity only. Until these gates pass, this packet remains priority-only and the EOM solver must continue not to advance at the unsupported coincident event.

## First-wave integration: channel identity and provenance

The [finite independent adjudication](mec-008-independent-adjudication.md) accepts distinct-label coordinate contact but excludes newborn near-diagonal self roots in that construction. It therefore leaves the same-transmitter MEC-008 target open. The lineage-gated quintic candidate does not apply to the contact's different-label newborn channels. The [affine raw-history control](pairwise-causal-root-ledger-closure.md#exact-ten-branch-control) supplies ten exactly reconstructed branches and unique corner incidence, pending independent adjudication. Prescribed corner attachment does not supply smooth EOM self-birth lineage or a continuation map. Allocation, source capacity, and all three same-update accounts remain unresolved; signed block summation in a population is not a capacity theorem.

## Second-wave review integration

The [independent affine review](mec-005-affine-independent-adjudication.md) accepts ten branches, four self branches, eighteen boundary points and complete complements/incidence at bounded prescribed-corner scope. It does not supply smooth EOM self-birth lineage, general-envelope certification or physical accounts.

The allocation analysis derives a conditional finite-aggregate-budget obstruction even for receiver-dependent/nonlocal sharing, provided funded acceleration is bounded by a population-independent function vanishing at zero allocation. That observation assumption is additional, not a consequence of the Master Equation. Nondepleting observation and separate account channels remain open; independent review is now required.

## Third-wave disposition

The [allocation adjudication](allocation-independent-adjudication.md) accepts finite-sharing and playback-throughput obstructions, boundary additivity and complete-past accumulation at their stated conditional scope. These additional account-architecture assumptions are not EOM primitives. No conserved accounts or general impossibility of account construction follows. The new [summation candidate](population-delayed-summation.md) reports admissible small history changes causing signed block-sum divergence; the [derivative candidate](population-history-derivative.md) reports a discontinuity obstruction in the same reviewed norm. Both remain derived candidates pending independent xhigh adjudication. Population evolution and exhaustion must not proceed on assumed convergence or continuity.

## Accepted self-delay floor and chord quantifiers

The [independent self-delay adjudication](mec-008-self-delay-independent-adjudication.md) accepts a uniform positive delay floor for recent simple self roots on the declared sharp-EOM class: bounded velocity on recent chord intervals, a common forward cone, locally absolutely continuous receiver velocity, integrable negative projection of the actual remaining acceleration, complete finite simple recent-root sections, and regular initial/cutoff sections with positive entrance delay. No uniform root-count or transmitter-factor margin is assumed. This excludes isolated regular self-diagonal approach under those hypotheses. Singular lineages, uncontrolled opposing remainders, and endpoints without finite continuous velocity remain unresolved. MEC-007 and the finite distinct-label contact result retain their accepted scopes; general MEC-008 remains open.

Fixed-reception self-root accumulation requires field speed and vanishing quadratic and cubic chord coefficients. Moving-reception accumulation instead satisfies the joint residual equation; continuous endpoint velocity requires field speed, and incoming C2 accumulation additionally requires zero endpoint speed derivative. Cubic vanishing is not generally necessary for a moving-reception sequence. These geometric conditions establish neither EOM reachability nor a universal speed ceiling.
