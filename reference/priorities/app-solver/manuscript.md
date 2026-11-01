# Computing Delayed Histories with the EOM Solver

This is a brief outline for a future technical manuscript. It identifies the explanations to develop; it is not a completed synthesis or new evidence of solver capability. Expansion is owned by [EOM-015](work-queue.md#eom-015--eom-solver-manuscript-development), with particular attention to the GPU execution work in EOM-010.

## 1. From retained history to computed motion

Explain why the input is a set of past paths and an absolute-time interval, and how causal roots determine acceleration and the next accepted history extension. Distinguish computed future motion from prescribed paths and display interpolation. Use the [master-equation binding](contracts/master-eom-binding-v1.md) and [evolution contract](contracts/evolution-contract-v1.md); use normalized wake-speed units in every numerical example.

## 2. History representation and complete causal roots

Develop continuous history representations, interpolation enclosures, partner and self-history accounting, root isolation and continuation, and proofs of root-free complements. Explain how folds, ambiguous roots and history boundaries require refinement, a declared event route or a failure that prevents an unsupported step.

## 3. Coupled evolution, error budgets and precision

Explain atomic coupled steps, causal synchronization, multirate evolution and event handling. Derive how root and acceleration uncertainty propagate into velocity and position, distinguishing inherited history uncertainty from new step error. Connect the [error-budget ledger](contracts/certified-error-budget-ledger.md) to precision escalation and accepted-step decisions.

## 4. What establishes numerical correctness

Explain the roles of analytic cases, the [independent dynamical oracle](contracts/independent-dynamical-acceptance-oracle.md), convergence, negative controls and reproducible continuation. Distinguish independent correctness evidence from deterministic replay and implementation parity. Describe checkpoint identity and restart without reproducing operational receipts.

## 5. CPU execution and algorithmic scaling

### A stable stationary-frontier regression obligation

The [stationary fixture repair](analysis/saturday-stationary-fixture-obligations-2026-10-11.md) distinguishes an acceptance obligation from the location at which one numerical controller happens to stop. Its no-argument fixture requires accepted reach through time `1.2399999999999993`, complete ordered-pair certification at that endpoint, and unchanged ordinary and joint retained histories after a deliberately tightened root-budget rejection. Equal-copy and deliberately altered-carrier controls precede use of the comparison functions on evolved histories. The natural rejection frontier remains diagnostic rather than an exact pinned time.

The [separate review](analysis/saturday-stationary-fixture-obligations-codex-review-2026-10-11.md#corrected-byte-disposition--october-11-2325z) accepts this bounded engineering repair. Its joint-budget obstruction is derived under the stated nonzero-radius, direction and transmitter-factor hypotheses; full-step refusal is measured, and exclusion of the earlier ordinary enclosure route remains inferred. The endpoint snapshot checks a corrector evaluation and published-history recertification, not every acceleration used to construct the polynomial. The record reader uses same-library inputs and finite-precision consistency checks. Neither the fixture nor replay establishes independent trajectories, general true-history inclusion or restored reach to the former numerical frontier. A missed minimum reach, incomplete endpoint census or changed retained carrier on rejection defeats the corresponding regression obligation; a tighter future certificate need not violate the mathematical budget bound.

### Scaling scope

Develop the relationship between measured bottlenecks, threading, vectorization, memory locality and retained-history cost. Explain certified exclusion, proposed active aggregation and exact fallback, including causal-root discovery as well as acceleration accumulation. Reconcile each capability with its implementation and evidence version; keep bounded-population acceptance distinct from the million-path target.

## 6. GPU and heterogeneous execution

Develop this chapter alongside EOM-010. Explain which work can be batched, how histories and certificates move between processors, and how irregular root searches and precision escalation affect scheduling. Cover device memory, transfers, synchronization, CPU fallback and eventual multi-GPU partitioning.

State the precision and reduction policy for each proposed backend. Explain how complete root accounting, certified error budgets, independent-oracle checks and checkpoint continuation constrain accelerator design. CPU agreement alone does not establish the mathematical rule.

Present speed and resource claims only from matched, reproducible end-to-end benchmarks, including transfers, certification and fallback costs. Report the workload and measured break-even point, unsuccessful optimizations and unresolved limits. Separate exploratory kernels from accepted EOM evolution.

## 7. Distributed histories and long runs

Explain immutable history ownership, causal data availability, streamed output, cancellation and atomic restart. Connect resource admission and dense-workload failure to complete interaction accounting. Develop distributed and million-path claims only as their separate acceptance obligations are met.

## 8. Interpreting solver output

Explain what the returned histories, root ledgers, error records and execution provenance establish. Distinguish numerical evolution from a demonstrated physical branch, persistence or stability result. Connect to the Braid Program and Master-Equation Closure manuscripts while retaining their scientific claim ownership.

## 9. Equation modes and precise analytical methods

The operator selected a shared EOM capability on 2026-10-10: support explicitly selectable alternative Master Equations and speed regimes while retaining **the canonical Master Equation with no speed limit as the default**. Numerical evolution uses the standard EOM solver. Surface, Borg and headless consumers must select the same solver-owned definitions rather than implement alternative acceleration laws locally. The registered provider boundary and v2/v8 transport implement the bounded capabilities described below; neither registration nor numerical qualification adopts an alternative into canon.

Treat the interaction law, speed regime and optional geometric constraint as separate parts of a resolved run mode:

| Setting | Required identity and behavior |
| --- | --- |
| Master Equation | Exact definition/version, parameters, causal support, self/partner rules, root accounting, superposition and receiver-response order. Canonical is the default; alternative definitions come from their scientific owner. |
| Speed regime | Unrestricted by default. A selected strict or inclusive ceiling records its threshold, admissible histories and defined boundary response or halt. No inequality silently creates a clamp or continuation rule. |
| Geometry | Unconstrained by default. A selected Surface experiment explicitly records the fixed surface and normal support, including tangent projection, curvature and receiver-total discarded-normal bookkeeping. |

No speed limit means the solver imposes no speed ceiling; it does not guarantee that acceleration is defined on every possible history. Canonical treatment of roots, singular geometry and events still applies. A selected restricted regime changes the declared domain or response and must retain its own definition. The [equation-variant registry](../master-equation-closure/equation-variants/README.md) owns scientific definitions and investigation scope; adding a selector does not establish a law's correctness or expand that scope.

Resolve and validate the mode before execution. Requests, outputs, checkpoints and restarts must preserve the complete equation/speed/geometry identity. A changed mode starts a new run or an explicitly recorded branch. Unsupported combinations reject before advancing. Alternative-law and supported-surface outputs retain distinguishable authority and do not inherit the canonical evidence label. The completed [implementation design](contracts/equation-provider-design-v1.md) recommends a v2 successor for selectable providers and surface support, preserving the existing [canonical contract](contracts/evolution-contract-v1.md) and its v1 consumers. It specifies capability negotiation, valid combinations, evaluation plans, events and restart semantics, with [Surface](../app-surface/manuscript.md#shared-solver-modes) as a concrete consumer. The v2 request/response and v8 checkpoint identifiers are implemented at the Stage C boundary below; each additional composition retains its own qualification domain.

The operator also permits analytical methods where they are precise and far less expensive than numerical evolution. An independently checked derivation can supply an analytical result directly; reproducing it numerically is required only when a current verification question needs that comparison. Exact formulas or proved reductions can also reduce work within EOM, provided their domain includes the selected law, speed regime, geometry and complete causal history relevant to the claim. Record assumptions, root completeness where required, domain, exactness or controlled error, and an explicit fallback or halt outside the proved domain. An analytical candidate path with an unchecked delayed residual remains a candidate.

Keep analytical results, numerical evolution and declared combinations distinguishable in evidence and presentation. Mathematical precision requires a derivation or certified error bound and independent checking. A cost advantage requires matched measurements of wall time and resource use, including certification and fallback; no advantage is measured here. **Claim grade: inferred** for the expected usefulness of analytical reductions. A missed causal branch, domain violation, independent residual outside the bound, or measured overhead eliminating the claimed saving falsifies the reduction's claim within its stated scope. This method choice creates no second production solver.

### Design options and recommended first increment

The issue is the scope of the existing request contract, not a need for another engine. The inspected canonical contract binds one named interaction law and excludes future constraints. The requested Surface mode introduces explicit normal support; an alternative Master Equation or a speed ceiling can also change acceleration, admissible histories or event treatment. Each therefore needs a declared meaning that survives execution, evidence interpretation and restart. A selector label alone does not supply that meaning. For example, limiting speed requires a specified response or halt at the boundary; a velocity clamp is a changed dynamical rule, not an innocuous integration setting.

The operator selected a **general equation-provider interface** on 2026-10-10. Named, versioned providers are implementations of that interface, rather than an alternative to it. The solver can know built-in providers through a registry while retaining the same interface for further modules. The remaining packaging options are:

| Arrangement | What it provides | Main design obligation | Disposition |
| --- | --- | --- | --- |
| Built-in registered providers | Modules compiled with EOM and discovered through the selected general interface, with named definitions and explicitly supported compositions. | Specify each provider's roots, response order, events, errors and checkpoint identity; preserve canonical behavior. | Implemented for canonical, canonical-with-surface and bounded logarithmic compositions. |
| Dynamically loaded providers | Separately packaged modules loaded into EOM through a versioned provider boundary. | In addition to the mathematical obligations, define binary compatibility, precision ownership, deterministic/thread-safe execution, module lifetime and reproducible restart availability. | Packaging proposal; runtime loading is not selected or implemented by choosing the general interface. |

**Claim grade: inferred.** Starting with registered built-in providers is expected to make the selected general interface concrete while preserving reproducible definitions. Focused equation, speed and geometry modules compose behind one request boundary; they do not require a separate integrator for each variant. Reconsider this arrangement if concrete providers require duplicated evolution machinery or their root/event obligations cannot fit the common boundary. Arbitrary user-entered equations are not selected by this proposal.

The completed design recommends a **v2 successor** because v1 excludes future constraints and binds one model. Preserve the existing v1 wire contract and normalize its canonical requests internally to the shared provider host. V2 explicitly records a resolved model manifest, new capability/evidence fields and constraint-aware persistence. This choice avoids inserting a surface request into a contract that excludes it; the [versioned design](contracts/equation-provider-design-v1.md#8-requests-responses-checkpoints-and-transport) specifies the compatibility boundary.

Method selection is independent of both arrangements. A precise analytical solution can answer a bounded question directly; numerical EOM evolution addresses histories outside an established analytical solution family; a combined method uses a proved formula or reduction for part of the work and EOM for the rest. These methods can coexist for the same equation mode. Select an analytical or combined method only on its established mathematical domain and substantiate any claimed cost saving with matched measurements. The [concrete specification](contracts/equation-provider-design-v1.md) now supplies the canonical and fixed-surface plans and the three speed domains with explicit halt-only boundary policies; additional speed-changing responses and alternative-law compositions require their own complete definitions. This explanation does not select a new law, authorize a target run or broaden scientific investigation scope.

### Composable equation providers and evaluation plans

Plug-ins and pipelines solve different parts of the problem. A provider supplies an interchangeable mathematical implementation; a pipeline or dependency graph specifies how the implementations are evaluated. Recommend both: a general provider interface with built-in registered modules initially, and an immutable evaluation plan for each named, versioned composition. The named composite variant is the scientific identity; its component selections and ordering are the implementation explanation. For example, **Canonical Master Equation with a surface constraint** binds canonical interaction and the [surface-constraint definition](../master-equation-closure/equation-variants/surface-constraint/definition.md), with unrestricted speed unless a separately complete ceiling specification is selected.

The shared EOM host owns retained histories, precision execution, coupled stepping, accepted-state publication, resource controls and checkpointing. Providers declare the mathematical requirements those services must satisfy. Inspection of `CertifiedAcceleration.hpp` exposes per-pair acceleration requests and rows, while `CoupledEvolution.cpp` calls acceleration snapshots inside coupled correction and accepted-state certification. These are concrete seams to investigate; this inspection does not establish that the proposed provider interface exists or that replacing a single function would implement it.

| Reusable responsibility | Provider or shared service | Contract supplied |
| --- | --- | --- |
| Causal support and roots | Causal-geometry provider using shared history and certified root services | Arrival residual/support, all admitted branches, self/partner classification, completeness and chart events. Canonical surface motion retains ambient Euclidean propagation. |
| Interaction contribution | Interaction provider | Per-arrival or history-integral acceleration, coefficients, self policy, derivative/implicit requirements and error bounds. Canonical and logarithmic reception can share causal geometry where their specifications agree. |
| Superposition | Shared deterministic reduction service | Complete accounted contributions, uncertainty and receiver totals in the selected order. No unproved omission or pre-sum nonlinear response. |
| Receiver response | Response provider | Any selected transformation of the receiver total, with its order and domain. An identity response is the canonical default. |
| Speed domain and boundary | Speed-policy provider | Unrestricted, inclusive or strict domain; admissible preparation, boundary response/halt and event obligations. Self-policy changes in a particular ceiling model remain explicit clauses. |
| Surface constraint | Constraint provider | Regular surface geometry, tangent projection, normal curvature, support and discarded-normal vector only at receiver-total level. Sphere, oblate spheroid and torus are reusable geometry implementations. |
| Singular events | Event provider coordinated by the host | Defined transition, certificate and permitted continuation, or a halt. A regular kernel does not supply an event rule implicitly. |
| Analytical reduction | Optional analytical provider | Exact formula or certified reduction, applicability domain, independent reference and fallback/halt. It changes computation only within the proved equivalence domain. |

For the ordinary canonical surface specification, an evaluation plan obtains roots from the accepted histories, evaluates admitted interactions, sums the receiver contributions, applies any response already selected by that interaction specification, splits the net vector into tangent and discarded-normal parts, supplies curvature acceleration, and passes the resulting acceleration to coupled evolution. The normal diagnostic is computed at that receiver-total split, not at individual contribution stages. The plan operates inside EOM correction and certification; it is not a filter applied to an already published free trajectory.

This sequence is an example, not a universal ordering law. Nonlinear response, speed-boundary response and surface support do not inherit permission to commute. A complete composite must specify their order or joint constrained solve. If an interaction depends on acceleration, the provider supplies its residual and required derivatives/enclosures so the host solves the coupled implicit problem; it cannot masquerade as an explicit acceleration callback. A changed causal-support law can replace the relevant root stage rather than reuse canonical roots incorrectly.

The general interface should cover: immutable definition and version metadata; preparation and capability validation; an evaluation plan with typed inputs/outputs and mathematical dependencies; ordinary evaluations or implicit residuals with certified error; event routing; and provider continuation state required for restart. Precision-sensitive evaluation must use the solver's controlled numeric services rather than silently round through an unqualified floating-point interface. The [provider contract and handoff](contracts/equation-provider-design-v1.md#3-provider-interface-and-host-responsibilities) specifies the full proposed responsibilities, v2 wire identifiers, admission, dense-history geometry errors and restart semantics. Future provider-aware checkpoints must record the resolved module definitions, parameters, composition order and provider state needed to reproduce continuation. Stage A preserves existing v7 continuation identity/bytes; its inspected manifest is descriptive and does not make v7 source/build-bound. Descriptor identity proves which law is selected, not that the law or result is correct.

Initial built-in design examples are the canonical provider, unrestricted speed policy, and a surface-constraint provider using the selected regular shapes. Logarithmic interaction and the existing strict/inclusive ceiling specifications illustrate reuse of root, reduction and geometry services; their executable combinations must still respect the scientific owners' defined scope. A registry can distinguish defined, implemented and independently accepted capabilities, with domain-specific exclusions. A known definition does not automatically become an executable provider. Dormant, withdrawn or undefined families remain identifiable research records and are not silently activated by registry discovery.

**Claim grade: inferred** for the modular architecture's expected reuse; no performance advantage is measured. Falsifiers are canonical behavior changing under the default provider, order-dependent results being conflated, required roots/events or precision obligations becoming inexpressible, or checkpoint continuation losing a module dependency. The [implementation design](contracts/equation-provider-design-v1.md) supplies the full proposed provider contract, canonical and surface plans, geometry formulas, speed-domain/halt policies, app flow and staged handoff. The [separately authored Codex review](analysis/equation-provider-design-review-2026-10-10.md) checks the constraint mathematics and records collaborated design/code corrections. [Stage B](analysis/equation-provider-stage-b-2026-10-10.md) supplies bounded engineering qualification; the [Stage D record](analysis/equation-provider-stage-d-2026-10-11.md) supplies subsequent qualification for one bounded spherical 3:3 case.

### Implemented Stage A provider boundary

The EOM solver now has a minimal C++ equation-provider interface, immutable canonical descriptor/plan, explicit selection admission and built-in canonical resolution. Public acceleration snapshots dispatch through that provider to the extracted existing complete evaluator, retaining its roots, reductions, precision routes, uncertainties and warm-start semantics. Correction and publication remain with the same coupled host. The plan records the canonical evaluator's dependencies; its nodes are descriptive metadata rather than independently executable modules or a general stage interpreter.

Omitting the optional equation selection retains legacy canonical behavior. Explicit canonical selection defaults to canonical interaction, unrestricted speed, no constraint and the numerical method, requires exactly normalized wake speed $c_f=1$, and recognizes the existing canonical chart names. Unknown or unavailable compositions reject before request-bearing public evolution, event, onset, fallback and checkpoint work. Stage C adds inclusive/strict domain checks with explicit halt policies, described below. Analytical/implicit execution and dynamic loading remain unavailable. This does not change the availability of the existing internal canonical interval, MPFR, joint or event routes.

The read-only equation-inspection CLI exposes capabilities and a resolved descriptive model identity. The manifest records exact decimal parameter identities, scientific-definition digest, complete canonical plan/digest, the existing continuation fingerprint where applicable and actual source/configuration receipt. Lexically different legacy tokens may retain different continuation fingerprints even when their exact decimal value is equal. Source identity comes from inventoried file bytes; configuration identity includes compiler, dependency, precision-header, platform and build settings, with separate multi-config identities. These receipts identify the inspected selection/build and do not add source binding to v7 checkpoints. The implemented v2 consumer boundary and v8 continuation binding are described below; inspection without histories establishes selection only.

**Claim grade: measured** for this bounded migration by the [focused Stage A receipt](analysis/equation-provider-stage-a-inventory-2026-10-10.md): canonical baseline comparison, explicit/default snapshot/evolution/checkpoint/resume checks, rejection coverage, independent identity hashing and six unchanged existing tests, including the independent interaction oracle. A retained non-timing baseline difference, admitted unsupported selector, changed canonical v7 bytes or identity mismatch would overturn the corresponding migration result. These checks preserve a tested canonical boundary; they do not establish constrained evolution, global numerical correctness or a six-member research result.

### Stage B constrained evolution

The typed C++ Surface provider adds fixed sphere, oblate-spheroid and ring-torus geometry, exact rational admission of the orthogonal frame, interval gradients/Hessians and normal support after the complete receiver sum. The same coupled host predicts and corrects its cubic histories; each acceleration snapshot carries a distinct Surface identity and receiver-total tangent, discarded-normal, curvature and support records. No per-hit discarded-normal diagnostic is added.

Surface publication additionally validates a time-slab integral map. Whole-slab partner-root brackets have uniform signs and strictly past emission; true source acceleration comes from proven analytic preparation or an immutable accepted-history carrier. Analytic interval automatic differentiation supplies the constrained Jacobian. Cubic acceleration defect, error-tube inclusion and the weighted contraction bound $h^2L_x+hL_v<1$ establish the included solution before reconstruction errors are written into retained history. Every full segment must then pass a proved distance bound, tangent-velocity bound and regular-gradient check. These enclosures enter the next delayed-root calculation; endpoint correction and step-doubling alone are insufficient.

The first numerical chart requires coherent exact paths below wake speed, ordinary sharp interaction and partner roots in already accepted history. The speed selector remains unrestricted and velocities are never altered to satisfy this chart. A coherent subwake path has no positive-delay self roots; the independent review proves this solution-domain reduction, while point snapshots preserve the canonical self/partner root ledger. Surface-consistent preparation is currently restricted to exactly admitted circular-factory families with matching exact domain endpoints. A separate Hermite reconstruction proof validates their token-defined analytic past over every segment; small nominal residuals or unverified factory roundoff do not substitute for it.

The [Stage B record](analysis/equation-provider-stage-b-2026-10-10.md) owns focused qualification and its falsifiers. Independent exact-circle controls establish the geometry-only inclusion boundary, while small interacting runs exercise the route without supplying independent interacting scientific acceptance. Surface remains unavailable through Borg v1 and v7 checkpoints, including cross-request attempts to save a Surface result as canonical. Stage C supplies separate v2 transport, v8 persistence and restricted-domain halt policies. Joint/finite-width Surface event maps remain unavailable; Stage E below supplies the bounded Surface app. Artificial support establishes no free confinement, stable assembly or energy law.

### Stage C domains, consumer transport and restart

The [v2 implementation contract](contracts/evolution-contract-v2.md) defines the shared request, inspection, evolution, cancellation and restart boundary. Canonical interaction with unrestricted speed remains the default. Inclusive and strict selectors certify the complete retained velocity tube against their respective inequalities and halt before unqualified publication; they introduce no speed-changing response. Exact rational equality and proven circular preparation are admitted analytically within their certificate domains. Computed suffixes retain their dense uncertainty. Surface still requires its sharper subwake ordinary chart, so inclusive equality alone cannot establish a supported forward Surface trajectory.

The same EOM executable serves version-dispatched v2 JSON, watched Node workers and local HTTP routes. Borg and the provider-aware browser client share JSON POST/error handling; scientific prediction remains with the EOM host. Responses retain newly accepted extensions, point/self and whole-slab root ledgers, Surface error/geometry certificates and receiver-superposed normal diagnostics. They distinguish artificial support, numerical acceptance and scientific acceptance. Cancellation targets an execution generation, queues until readiness and returns a terminal durable prefix or explicit storage failure; disposal prevents later launch from a pending inspection and drains active work.

Provider-aware v8 checkpoints bind the resolved model, original preparation, numerical controls, run identity and adaptive state. Canonical data embed the existing v7 owner with model/prefix/inner-outer consistency checks. Surface restoration revalidates chronological publications through the integral-map gate and rebuilds immutable acceleration carriers, rejecting unused or altered uploaded history. Atomic file/directory fsync supplies the durability receipt. Source/configuration identity is a bounded descriptive receipt, including Boost entry headers/library/version; it is not an executable-byte hash or a complete SDK/transitive-header inventory.

**Claim grade: measured** for engineering qualification by the [Stage C record](analysis/equation-provider-stage-c-2026-10-11.md), its manual C++/real-process/HTTP fixtures, canonical pre-change baseline comparison and unchanged selected oracle tests. Restart fingerprint equality establishes operational continuity, while separately derived polynomial/equality and exact-circle controls establish their stated mathematical boundaries. The [separate review](analysis/equation-provider-stage-c-review-2026-10-11.md) owns source and proof assessment. A non-timing canonical difference, changed-preparation restart, omitted uploaded segment, lost cancellation generation or non-durable receipt labeled durable overturns the corresponding claim. [Stage D](analysis/equation-provider-stage-d-2026-10-11.md) now qualifies one bounded interacting spherical 3:3 case; [Stage E](analysis/equation-provider-stage-e-2026-10-11.md) supplies the spherical app consumer and bounded record transport.

### Stage D bounded six-member qualification

The [Stage D calculation](analysis/equation-provider-stage-d-2026-10-11.md) uses the same EOM executable with `canonical-surface/v1`, unrestricted speed, a fixed sphere of radius $0.1$, coupling $10^{-6}$ and $c_f=1$. Three electrinos and three positrinos have alternating polarity and equatorial circular preparation at speed $0.01$ over $[-0.5,0]$. EOM determines their future over $[0,0.25]$; computed-source emissions show that generated histories feed back into the delayed interaction. Only the supplied past is prescribed.

**Claim grade: measured** by the frozen separately authored reference and [independent review](analysis/equation-provider-stage-d-review-2026-10-11.md): base, half-step and tighter-tolerance histories pass independent root/kernel, receiver-superposed projection/support, complete nominal polynomial plus error-tube geometry, midpoint equation residual and common-time refinement checks. The largest midpoint equation residual is $9.38\times10^{-11}$; central histories agree inside summed emitted error radii. This reference measures retained-curve observables; reviewed production validated inclusion remains the coherent-solution existence instrument. Contact fails closed at time zero, and an initial resource-admission failure remains preserved.

**Claim grade: derived** for finite-window causal coverage under the stated coherent speed/radius bounds: every partner has one strictly past ordinary root within the supplied memory and self has no positive-delay root. Excluding unprovided older hits additionally assumes older paths remain on this fixed sphere or within the declared radius bound. Without that assumption, qualification covers declared retained memory only. A missed root, reference value outside its production enclosure or refinement discrepancy beyond the summed radii overturns the corresponding bounded claim in the retained records. No settled pattern, stability, recurrence, free confinement or energy–size–frequency law follows. [Stage E](analysis/equation-provider-stage-e-2026-10-11.md) supplies the app, evidence labels, bounded raw-record/projection transport and actual desktop/narrow viewport observations.

### Stage E Surface consumer and complete evidence

The dedicated Surface page prepares bounded fixed-sphere experiments and consumes the same EOM solver through shared provider-aware record routes. Start, Pause, Resume and Reset retain accepted-boundary ownership. Returned manifests match inspection; any preparation edit invalidates readiness. The shared cubic history evaluator displays accepted extensions without browser dynamics. Receiver-total interval diagnostics distinguish tangent interaction, discarded normal, curvature, artificial support and total acceleration. Source/JSON controls and real EOM/browser observations are recorded in the [delivery receipt](analysis/equation-provider-stage-e-2026-10-11.md) and [separate review](analysis/equation-provider-stage-e-review-2026-10-11.md).

Opt-in record routes write bounded complete raw responses to disk and return a bounded presentation projection containing full published histories, checkpoint and model, sampled diagnostics and raw provenance. Partial/budget/storage failure retains evidence and reports its identity rather than claiming complete export. Existing direct consumer routes keep their own response path. Pinned Stage D records retain their exact independent qualification; fresh numerical and imported unverified records have distinct labels. Native chooser automation has the stated round-trip verification gap. These are engineering consumer guarantees; the [bounded oblate case](../app-surface/analysis/oblate-qualification-2026-10-12.md) now has independently checked root/kernel, geometry/tangency/support, refinement and q=1 sphere recovery. Its scientific scope is the declared off-equator preparation over [0,0.15], with conditional older-tail exclusion and production validated inclusion as its existence premise. The [oblate consumer extension](../app-surface/evidence/oblate-app-delivery-2026-10-12.md) is implemented with independent consumer/source checks and checked-run browser loading/export; [actual fresh browser lifecycle, chooser import and desktop/narrow verification](../app-surface/evidence/oblate-app-browser-delivery-2026-10-14.md) are complete with independent engineering review. The separately reviewed [inner/outer ring-torus calculation](../app-surface/analysis/torus-qualification-2026-10-14.md) now qualifies six bounded numerical cases through time 0.15 with delayed-root/kernel/support, dense geometry and four refinement checks. Each member’s endpoint meridional displacement is resolved beyond its emitted radius. Qualification binds its retained current build and stated history/domain/existence premises; the [bounded torus app delivery](../app-surface/evidence/torus-app-delivery-2026-10-15.md) now passes checked loading, fresh EOM lifecycle, real exported-file import and desktop/narrow observations. Physical retention and general EOM application delivery remain open.

### Logarithmic provider and its bounded ordinary-root domain

The registered `logarithmic/v1` provider implements the [scientific owner's inverse-distance replacement](../master-equation-closure/equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) through the shared EOM solver. Write $\mathbf d=\mathbf X_i(T)-\mathbf X_j(S)$, $r=\lVert\mathbf d\rVert$, $\mathbf n=\mathbf d/r$, $D=1-\mathbf n\cdot\mathbf V_j(S)$ and $C=\kappa_{\log}q_iq_j$, with normalized $c_f=1$. A simple positive-delay hit contributes

$$
\mathbf A=C\frac{\mathbf d}{r^2|D|},
\qquad S<T,\qquad r=T-S.
$$

The wire parameter `model.coupling` means $\kappa_{\log}>0$ for this composition. Its charge-weighted dimensions are $L^2T^{-2}$; canonical coupling has charge-weighted dimensions $L^3T^{-2}$. Matching them at a comparison length $L_*$ means $\kappa_{\log}=\kappa/L_*$ and is an explicit comparison choice, not an automatic conversion. The arbitrary reference radius of a logarithmic scalar is absent from this acceleration and from the parameter schema. Polarity products retain like-polarity repulsion and opposite-polarity attraction. There is no receiver multiplier, surface support, speed response, omitted-root prescription or contact continuation.

The implemented evolution domain is finite retained history with a coherent continuously differentiable path, certified speed strictly below one, positive delayed separation and a transmitter factor bounded away from zero. Initial histories are either one exact affine cubic segment with zero higher coefficients and zero reconstruction errors, or a history produced by the existing certified circular factory. General cubic uncertainty tubes do not establish the continuity of an underlying preparation and are refused. Computed extensions acquire their coherence and acceleration bounds from the shared publication proof. This is a numerical chart restriction: an unrestricted selection imposes no physical speed ceiling, yet this implementation declines a calculation whose true-solution tube cannot be certified wholly below one.

Each partner root on a proposed step must lie strictly before that step's accepted start. For a coherent source with speed below one, $f(S)=T-S-\lVert\mathbf X_i(T)-\mathbf X_j(S)\rVert$ is strictly decreasing. Uniform opposite signs at the retained lower boundary and the accepted step start prove exactly one partner root throughout the reception/state slab. Two sign-preserving bisections enclose the entire root family, rather than only its center. Failure of either boundary sign, separation, factor clearance or history coverage prevents publication. Thus this first route requires sufficient retained history for every partner; it does not extend to arbitrary root-free partner geometries or negative-$D$ branches.

No positive-delay self hit exists on this coherent below-wake-speed domain: integration of the speed bound gives $\lVert\mathbf X_i(T)-\mathbf X_i(S)\rVert<T-S$ for every $S<T$. The full point-root ledger still enumerates self relationships and excludes the same-time endpoint. The slab proof's self exclusion follows from this inequality; it is not a changed self-channel clause. Superwake self hits remain part of the scientific law outside this implementation domain.

#### Derivatives required by publication

The derivative used by the host includes the implicit change in emission time. For a variation $\delta\mathbf x$ of receiver position, holding the source history fixed, differentiating the causal equation gives

$$
\delta S=-\frac{\mathbf n\cdot\delta\mathbf x}{D},
\qquad
\delta\mathbf d=\delta\mathbf x-\mathbf V_j\delta S,
\qquad
\delta\mathbf V_j=\mathbf A_j\delta S.
$$

Here $\mathbf A_j$ is the source's actual acceleration at emission. It is zero on an affine preparation, comes from the circular factory's analytical enclosure on its preparation interval, and comes from an immutable previously validated acceleration carrier on computed history. The remaining chain rule is

$$
\delta r=\mathbf n\cdot\delta\mathbf d,
\qquad
\delta\mathbf n=\frac{\delta\mathbf d-\mathbf n\delta r}{r},
\qquad
\delta D=-\delta\mathbf n\cdot\mathbf V_j-\mathbf n\cdot\delta\mathbf V_j,
$$

$$
\delta\mathbf A=\frac{C}{|D|}
\left(
\frac{\delta\mathbf d}{r^2}
-\frac{2\mathbf d(\mathbf d\cdot\delta\mathbf d)}{r^4}
-\frac{\mathbf d}{r^2}\frac{\delta D}{D}
\right).
$$

These identities hold on any connected simple-root chart with fixed sign of $D$. Outward interval evaluation encloses them over the whole slab. The logarithmic radial derivative has coefficient two and denominator $r^4$; the canonical derivative has coefficient three and denominator $r^5$. Replacing only the acceleration value would leave the host's derivative certificate wrong. The shared sensitivity service selects the named radial response explicitly; its default remains canonical. No logarithmic implicit solve or joint-affine evolution is advertised by this derivative calculation.

The shared host proposes and corrects cubic segments and compares one full step with two half steps. Its retained-publication service then proves an enclosure of the continuous solution around those candidates. Let $p$ be the nominal cubic, let $h$ be its duration, and let $R_x,R_v$ bound initial position and velocity mismatch. If the entire proposed tube bounds $\lVert\mathbf A-p''\rVert_\infty$ by $M$, sufficient componentwise inclusion conditions are

$$
R_x+hR_v+\tfrac12h^2M\le\rho_x,
\qquad R_v+hM\le\rho_v.
$$

The radii $\rho_x,\rho_v$ are the candidate's retained position and velocity error bounds. The validator covers the entire segment by 64 time cells, expands these radii within a bounded iteration, and rejects any expansion exceeding the selected EOM tolerances. It also bounds position and velocity Jacobian row sums by $L_x,L_v$. For the second-order integral map, using the norm $\max(\lVert\delta x\rVert_\infty/h,\lVert\delta v\rVert_\infty)$, a sufficient contraction bound is $q=h^2L_x+hL_v<1$. For unconstrained logarithmic evolution $L_v=0$, because reception velocity is absent from the acceleration. Source derivatives and uncertainty remain included through the delayed history. Inclusion, contraction, complete slab roots and the speed chart are all required before atomic publication. This service also serves Surface; the latter adds its own geometric transform and geometry certificate.

Claim grade: derived for the displayed causal derivative, self exclusion and integral-map conditions under their stated continuity, separation and history assumptions. A coherent path satisfying the speed bound but having a positive-delay self hit, a differentiated ordinary-root row disagreeing with the chain rule, or a solution leaving an admitted integral-map tube falsifies the corresponding claim. These are local numerical-solution conditions, not a derivation of the logarithmic hypothesis from emitted-sphere accounting.

#### Independent controls and interpretation

Three analytical controls distinguish the new kernel from deterministic replay. With a stationary source and $C=1$ at displacement $(2,0,0)$, acceleration is $(1/2,0,0)$ and its position Jacobian is $\operatorname{diag}(-1/4,1/4,1/4)$. The canonical acceleration at this displacement is $(1/4,0,0)$. For source $\mathbf X_j(S)=(0,0.6S,0)$, receiver position $(1,0,0)$ and reception time zero, the exact causal root is $S=-1.25$, separation is $1.25$, transmitter factor is $0.64$, and the logarithmic contribution with $C=1$ is $(1,0.75,0)$. Its receiver-position Jacobian is $[[-1,-0.75,0],[-0.75,1,0],[0,0,1]]$, obtained by differentiating the closed-form positive root $r=(0.6y+\sqrt{y^2+0.64x^2+0.64z^2})/0.64$ at $(x,y,z)=(1,0,0)$. Changing only receiver velocity to $(0.6,0,0)$ in the stationary-source unit-separation case leaves acceleration $(1,0,0)$ unchanged. These values follow directly from the causal equation and displayed response; no research solver supplies the expected values.

A separate scalar comparison bounds the coupled opposite-polarity pair prepared at rest at $\pm0.1$, with $\kappa_{\log}=10^{-4}$ and unit charge magnitudes, through time $0.25$. Write its inward displacement as $y(T)$, with $y=0$ in the past. By symmetry, its delayed acceleration is

$$
y''(T)=\frac{10^{-4}}{[0.2-y(T)-y(S)][1-y'(S)]}.
$$

On the bootstrap box $0\le y\le0.000016$ and $0\le y'\le0.000126$, this lies between $0.0005$ and $10^{-4}/[(0.2-0.000032)(1-0.000126)]<0.000501$. Integrating the upper bound to $0.25$ gives $y\le0.00001565625$ and $y'\le0.00012525$, strictly inside the bootstrap box. Continuity therefore closes the bound across the interval, with strictly positive separated roots and below-wake-speed motion. The right endpoint lies in

$$
0.1-\tfrac12(0.000501)(0.25)^2\le X_{\mathrm{right}}(0.25)
\le0.1-\tfrac12(0.0005)(0.25)^2,
$$

$$
-0.000501(0.25)\le V_{\mathrm{right}}(0.25)\le-0.0005(0.25).
$$

Claim grade: derived for this comparison box and its first-exit argument under the specified preparation and law. A violation of the scalar reduction, denominator bounds or integrated strict margins falsifies it. The explicit-use C++ fixture checks analytical acceleration/Jacobian cases before coupled evolution, then checks intersection with this independent endpoint enclosure, computed-history consumption, narrowing under step refinement and checkpoint replay. Intersection is a consistency control; the continuous enclosure claim comes from the full-slab publication theorem and its checked obligations, not from intersection alone. Replay establishes continuity of persistence, not independent mathematical correctness.

#### Selection, identity and refusals

Select `model.compositionId: "logarithmic/v1"` in an `eom_evolution_request/v2`, with numerical method, no constraint, $c_f=1$, positive logarithmic coupling and strict error-bound checking. Omission continues to select canonical/unrestricted behavior. The capability record and both shared Node/browser clients expose `modelOptions()` and `selectModel()`; filters select compatible constraints and methods without app-local equation lists. Surface's geometry-specific consumer remains canonical-with-surface because no logarithmic surface composition is registered. These helpers discover supported controls; the EOM provider still admits the actual preparation and numerical chart.

Unrestricted, strict/halt and inclusive/halt selections share the unchanged logarithmic acceleration. Restricted selections add the existing certified domain check and never a clamp. Their supported numerical domain is still the strictly-below-one chart above; inclusive selection does not qualify equality-speed evolution. Unsupported Surface combinations, finite-width/fold/contact charts, general cubic preparations, joint/implicit evolution, optional multirate/quarter-step publication, canonical far-field/grouped bounds, v3 validated far-step execution and exploratory point evolution are explicitly refused. Root geometry may use the existing precision escalation; logarithmic acceleration uses outward binary64 intervals and halts if they cannot meet the budget. The canonical implicit-root mean-value acceleration optimization is bypassed for logarithmic rows. Causal-only traversal, root contraction, warm root exclusion and root-free history-prefix bounds reuse unchanged geometry.

The resolved manifest binds the provider, scientific source digest, mathematical plan, coupling, normalized field speed, selected domains, source/build configuration and numerical profile. Snapshot identity additionally binds the original preparation and charge/path identities. V8 binds the complete original request and controls. Its `logarithmic-revalidate-publication/v1` state reconstructs chronological publication proofs, including computed-source acceleration carriers; uploaded checksums or booleans cannot certify a trajectory. Changed model, preparation or controls refuse continuation. V7 remains canonical-only. Evolution reports `ordinary_solution_enclosure`, separate `ordinarySolutions` records, and `scientificAcceptance: false`; retained record projections summarize the ordinary certificates while retaining complete ledgers on the host. A halt preserves only the previously accepted prefix and its durability receipt.

The [solver README](../../../src/eom/README.md#logarithmic-provider) gives reproduction commands. The [work log](work-log.md#logarithmic-provider-qualification--2026-11-01) records the measured qualification, exact run receipts and limitations. This increment establishes an executable bounded alternative equation, not its adoption into canon, an energy account, a stable assembly or a physical solution outside the selected preparation/domain.
