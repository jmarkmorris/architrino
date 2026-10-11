# EOM Equation Providers and Surface Implementation Design

## Status, ownership and delivery boundary

This packet completes the implementation design requested on 2026-10-10 and records the reviewed Stage A and Stage B boundaries. Implementation and measured verification are recorded separately in the [Stage A migration receipt](../analysis/equation-provider-stage-a-inventory-2026-10-10.md) and [Stage B constrained capability record](../analysis/equation-provider-stage-b-2026-10-10.md). The successor transport/checkpoint contract and later app/scientific stages remain a design and agent handoff. The operator selected the general provider interface, canonical/no-limit default, fixed-surface experiment and precise analytical methods. Dynamic binary loading remains deferred.

EOM owns execution, numerics, model resolution and persistence. [The equation registry](../../master-equation-closure/equation-variants/README.md) owns scientific definitions and investigation scope. [Surface's manuscript](../../app-surface/manuscript.md) owns the app brief and research interpretation. The frozen [v1 evolution contract](evolution-contract-v1.md), [canonical binding](master-eom-binding-v1.md), [precision contract](precision-dynamic-range-and-certification-contract.md) and [error ledger](certified-error-budget-ledger.md) remain their existing authorities; this packet proposes new capabilities without rewriting their recorded acceptance.

**Claim grades:** the constraint identities and geometry controls below are derived and [independently reviewed by Codex](../analysis/equation-provider-design-review-2026-10-10.md). Constrained numerical solution/enclosure acceptance remains open. Architecture and expected reuse are inferred, with no measured performance advantage. Repository seams are measured by reading the named headers and implementations, within those files only. No interacting six-member solution, attractor, stability verdict, energy–radius law or physical confinement is established. A default-law change, missed root, unbudgeted geometry error, non-normal support or restart identity mismatch falsifies the corresponding design obligation.

## Review integration and Stage A boundary

The operator requested Codex review and collaboration followed by Stage A implementation here. The separately authored [review](../analysis/equation-provider-design-review-2026-10-10.md) independently checks the support identity, defining-function invariance, three geometries, great-circle control and dense-polynomial obstruction. No formula correction was required. Its five implementation-boundary findings are accepted with the following dispositions.

Stage A implemented the minimal C++ provider boundary: immutable descriptor/plan, exact selection admission, registry resolution and complete acceleration-snapshot evaluation. Public canonical snapshots dispatch to the canonical provider's extracted existing evaluator. Its plan describes the evaluator's dependencies; a general stage-node interpreter, additional response modules and implicit residual execution remain later capabilities. Stage B now supplies typed `canonical-surface/v1` ordinary constrained evolution for the bounded preparation/chart domain in its record. Restricted-speed and implicit compositions remain unavailable.

Read-only CLI capabilities and model inspection originated in Stage A and now describe the Stage B Surface capability. Full v2 evolution requests, HTTP integration and provider-aware checkpoints remain Stage C. Legacy v1 framing and v7 continuation fingerprints/bytes are preserved. An explicit semantically identical canonical selection may use v7; its inspected source/plan manifest is descriptive and does not add a build-bound restart guarantee. Surface is admitted only through its typed snapshot/evolution route; canonical event/onset/chart and v7 checkpoint operations reject it. Certificate-only and low-level canonical APIs retain their declared scope.

The inspected manifest records exact model parameters and the existing complete model-control fingerprint, plus separately identified scientific definitions, plan and actual compiled source/configuration digests. It is not a complete v2 continuation manifest. Build identity comes from source bytes/configuration, never Git HEAD. Explicit new selections require exact decimal $c_f=1$; omitted legacy selections preserve their recorded numerical meaning. Capabilities retain existing domain-specific acceptance limits and advertise no blanket independent acceptance.

## 1. Architectural decisions

Use one EOM host and one production evolution path. A provider describes mathematics; a resolved evaluation plan describes dependencies and ordering; the host performs correction, certification, publication and restart. Ship providers compiled into EOM initially. Consumers request registered compositions rather than assemble arbitrary pipelines. A new scientifically defined composition requires registration and capability qualification.

Separate four selections: interaction definition, speed domain/boundary rule, optional geometry constraint, and computation method. Omission selects the canonical Master Equation, unrestricted speed, unconstrained geometry and numerical EOM evolution. A Surface request explicitly selects **Canonical Master Equation with a surface constraint**. Numerical examples and fixtures instantiate $c_f=1$.

Use a **v2 successor** for requests that select providers or surface support. The v1 contract excludes future constraints and binds a single model; an optional selector inserted into its existing payload would be ambiguous to older consumers. Keep the existing v1 request, bridge and evidence meaning unchanged. Normalize v1 internally to a canonical/unrestricted/unconstrained plan, preserving its existing numerical defaults and regulator settings. Both versions use the same host. No v1 response claims the new constrained capability.

The v2 proposed identifiers are **eom_evolution_contract/v2**, **eom_evolution_request/v2**, **eom_evolution_response/v2**, **eom_resolved_model/v1** and **eom_equation_capabilities/v1**. These are design identifiers, not currently registered runtime schemas. The implementation agent must check for concurrent definitions before allocating them. A schema collision requires reconciliation with its actual owner.

## 2. Registry and immutable model manifest

Each registered definition carries a stable id, semantic version, source-relative scientific definition, content digest, implementation build identity, parameter schema, numeric capabilities, event capabilities and restart-state schema. Scientific disposition, implementation availability and independent acceptance are separate fields. A known but dormant, withdrawn, undefined or unimplemented family cannot become executable through discovery.

The registry resolves complete compositions. Initial composition keys are canonical/v1 and canonical-surface/v1; canonical/v1 references the existing canonical binding, not a rewritten equation. Every resolved manifest includes:

| Field | Meaning |
| --- | --- |
| composition | Named complete equation, version and definition digest; canonical or canonical-with-surface identity. |
| components | Causal support, interaction, self policy, complete reduction, receiver response, speed policy, constraint, events and optional analytical reduction; ids, versions, parameters and digests. |
| evaluationPlan | Ordered stages or residual graph, typed connections, derivative requirements and digest. |
| parameters | Exact decimal tokens and normalized units; coupling, regulators and geometry are included. No binary64 conversion before admission. |
| capabilities | Implemented numeric routes and qualified mathematical domain, including explicit exclusions. |
| provenance | EOM build, scientific definition records, method, preparation identity and complete model digest. |

Canonical serialization sorts object keys, preserves ordered stage arrays and uses provider-normalized decimal tokens with one defined representation. Hash the resulting bytes using the repository's content-addressing convention. Do not use display names, seeds or rounded rendered values as model identity. The resolved manifest is immutable for an evolution branch.

Capability queries return supported compositions and their admissible options. Unknown ids, missing versions, incompatible responses, unsupported precision/chart combinations and invalid geometry reject before history mutation. Querying the registry is read-only and does not authorize a target research run.

## 3. Provider interface and host responsibilities

Implement the interface in the C++20 EOM library. The following are proposed types and method contracts, not code already present:

| Interface | Required operations and outputs |
| --- | --- |
| EquationProvider | descriptor(); validatePreparation(); makePlan(); assessDomain(); restoreState(). Return typed diagnostics and capability requirements. |
| CausalProvider | arrival residual and derivatives; support interval; root/event classification; complete-root/exclusion certification through shared services. |
| InteractionProvider | contribution evaluation for every admitted row; outward interval bounds; required state/root derivatives; optional implicit residual. |
| ReceiverResponseProvider | transform the complete receiver total; domain, ordering, derivatives and enclosure. Identity is canonical. |
| SpeedPolicy | certify prepared histories and candidate segments; boundary event isolation; defined response or halt. |
| SurfaceGeometry | fixed defining function, gradient, Hessian and higher derivative bounds required by the selected corrector; regularity bounds on state/time boxes. |
| ConstraintProvider | constrain the receiver total within correction; total acceleration, geometry error debit and receiver-total diagnostics. |
| AnalyticalProvider | applicability proof/certificate; exact result or certified reduction; complete residual/root obligations and fallback/halt. |

Concrete implementation units should be EquationProvider.hpp/.cpp, EquationRegistry.hpp/.cpp and EquationPlan.hpp/.cpp under the existing include and source owners, followed in Stage B by SurfaceConstraint.hpp/.cpp and SurfaceGeometry.hpp/.cpp. Equivalent subdivision is acceptable when it preserves these responsibilities. Stage A registers the canonical provider and describes identity response/unrestricted/no-constraint within its fixed plan. Executable restricted-speed policies and selected geometry providers belong to the later stages. There is no external binary ABI in this increment.

An EvaluationContext contains immutable accepted histories, receiver/state enclosures, reception interval, numeric context, resource envelope and complete accounting ledger. Results distinguish success, refinement required, event requiring a declared route, unsupported capability and terminal failure. Every failure identifies stage, receiver, time enclosure and mathematical reason.

All certification uses the existing outward interval/MPFR services and exact token provenance. A nominal double evaluation may aid prediction or display; it cannot serve as the sole acceleration, derivative, domain or surface certificate. Providers must supply certified interval evaluation and the derivatives needed by the host. Joint-affine execution also requires a compatible correlated evaluation/enclosure; an ordinary interval result cannot be relabeled joint.

The initial Surface implementation may select the existing ordinary interval route explicitly. Optional joint state is either supported by a certified Surface transform or rejected during admission; do not silently discard it. A separately declared and evidenced host fallback may later enable that transition. Finite-width events, acceleration-dependent interactions and other unsupported routes must be rejected or halted according to the capability record.

Provider instances are immutable and reentrant. Numerical scratch state is owned by an evaluation/task context. Any mathematical memory required by a provider is explicit continuation state, serialized and hashed. No hidden global state, thread-dependent random choice or consumer-side acceleration callback is allowed.

### Typed data and call boundary

Use the existing Interval and IntervalVector types for regular certification and the host numeric context for MPFR escalation. EquationPlan is immutable and contains StageSpec nodes, dependency edges, numeric requirements and a plan digest. StageSpec identifies its module, required input types and produced output types. The host validates graph completeness and unsupported cycles before evaluation; a declared residual node is the architectural place for an implicit solve.

| Proposed type | Required content |
| --- | --- |
| ProviderDescriptor | Stable id/version, definition digest, parameter schema, scientific disposition, implemented routes, acceptance domains and state schema. |
| PreparationCertificate | History coverage/hashes, continuity and reconstruction bounds, shape/tangent admission, speed domain, root-support requirements and exclusions. |
| RootLedgerView | Immutable accounted self/partner rows, certified complements, branch/event identities and history references. |
| ContributionBatch | Bound interaction contributions and uncertainty with immutable accounting ids; no normal-decomposition fields. |
| ReceiverTotal | Deterministic complete sum, response identity/order, receiver state and uncertainty. |
| GeometryJet | Defining-function value, gradient, Hessian and requested higher derivatives with interval bounds, frame and regular-tube certificate. |
| ConstraintResult | Total constrained acceleration, derivative enclosures, geometry budget debit and receiver-total diagnostics. |
| DomainCertificate | Admissible time slab, speed/geometry bounds, boundary-time enclosure when present, and evidence of completeness. |
| ProviderState | Versioned mathematical continuation state; explicitly empty for stateless initial providers. |
| ProviderFailure | Status kind, stable reason code, stage/path/accounting ids, time/state enclosure, exhausted resource and permitted retry. |

EvaluationResult<T> is a tagged result containing either T or ProviderFailure; failures are never a nominal zero acceleration. These C++20 signatures state the proposed boundary:

    const ProviderDescriptor& EquationProvider::descriptor() const;
    EvaluationResult<PreparationCertificate> EquationProvider::validatePreparation(
        const PreparationView&, const ResolvedModel&, NumericContext&) const;
    EvaluationResult<EquationPlan> EquationProvider::makePlan(
        const ResolvedModel&, const HostCapabilities&) const;
    EvaluationResult<DomainCertificate> EquationProvider::assessDomain(
        const CandidateHistoryView&, const ResolvedModel&, NumericContext&) const;
    EvaluationResult<ProviderState> EquationProvider::restoreState(
        const SerializedProviderState&, const ResolvedModel&) const;
    EvaluationResult<ContributionBatch> InteractionProvider::evaluate(
        const EvaluationContext&, const RootLedgerView&) const;
    EvaluationResult<GeometryJet> SurfaceGeometry::evaluate(
        const StateTimeBox&, unsigned derivativeOrder, NumericContext&) const;
    EvaluationResult<ConstraintResult> ConstraintProvider::evaluate(
        const EvaluationContext&, const ReceiverTotal&, const GeometryJet&) const;

The implementation supplies the declared dependency types rather than treating this sketch as a standalone compilable header. Output derivative requirements are encoded in the plan and must be fulfilled for the selected route. An ImplicitResidualProvider additionally evaluates the coupled residual, Jacobian and inclusion/uniqueness requirements; absence of that capability rejects a residual plan. State restoration precedes evaluating any restarted plan.

Use typed failures for unknown_provider, unsupported_model_combination, preparation_surface_uncertified, surface_regularity_uncertified, surface_error_budget_exhausted, speed_domain_violation, speed_domain_uncertified and provider_state_mismatch. Preserve underlying EOM root/event/correction codes and their provenance instead of hiding them behind a generic provider failure. Reason-code allocation must reconcile with the live error registry during implementation.

### Actual integration seams and migration

Reading NativeCoupledEvolutionRequest in [CoupledEvolution.hpp](../../../../src/eom/include/architrino/eom/CoupledEvolution.hpp) identifies retained-history and numerical controls without a general mode selector. Reading [CertifiedAcceleration.hpp](../../../../src/eom/include/architrino/eom/CertifiedAcceleration.hpp) identifies pair requests and rows; [JointAccelerationSnapshot.hpp](../../../../src/eom/include/architrino/eom/JointAccelerationSnapshot.hpp) identifies the separate joint reduction/certification obligation. Acceleration snapshots appear inside correction and acceptance in [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp). These are inspected seams, not proof that a single callback replacement suffices.

Extract the canonical evaluation into a provider without altering its kernel, root rules, reduction order or event policy. Route every predictor, corrector, endpoint recertification and accepted-state snapshot through the resolved plan. Audit exact-pair, traversal/exclusion, far-field, MPFR and joint paths: reuse only when the provider's capability certificate covers the route. Cache keys include model/plan identity.

A causal exclusion based only on unchanged Euclidean arrival geometry may be shared. An acceleration approximation or sensitivity bound tied to the canonical kernel cannot be reused for a different kernel without a corresponding certificate. The surface transform adds its own nonlinear uncertainty and derivative obligations even when canonical pair evaluation is unchanged.

## 4. Complete evaluation plans

### Canonical default

1. Resolve canonical binding and unchanged retained-history/event policies.
2. Enumerate and certify all admitted self and partner causal roots, or account for certified exclusion/aggregation.
3. Evaluate canonical acceleration contributions with their original uncertainty.
4. Perform the existing deterministic complete receiver reduction.
5. Apply identity response, unrestricted speed policy and identity constraint.
6. Execute shared coupled correction, recertification and atomic history publication.

The no-op stages must preserve the existing numerical result and deterministic claim fields; do not perturb reduction or rounding merely to pass through new interfaces. Compatibility is implementation parity. Mathematical correctness retains its independently authored reference requirement.

### Canonical Master Equation with a surface constraint

1. Use the same ambient Euclidean arrival relation and canonical self/partner accounting on actual retained histories.
2. Evaluate admitted canonical contributions and reduce the complete receiver total.
3. Apply only the receiver response bound by the complete specification; the initial response is identity.
4. Compute tangent projection, discarded normal interaction vector and curvature from the same receiver-state enclosure.
5. Supply the resulting constrained acceleration and its derivatives/enclosures to the coupled corrector.
6. Certify geometry, speed domain, errors and root coverage over candidate dense histories, then publish all paths atomically.

No normal projection occurs on individual hits. The only discarded-normal diagnostic is one vector per receiving architrino at each recorded reception, after complete superposition and the selected response. Base per-root acceleration and causal provenance remain available as required by EOM, without per-root/per-source normal decomposition fields.

An acceleration-dependent equation instead declares an implicit residual graph coupling interaction, response, acceleration and constraint. For example, the residual includes the constrained relation $\mathbf a-P\mathbf A(\mathbf a)-\mathbf A_{\rm geom}=0$. The host must certify the required solution and uniqueness/domain conditions; explicit projection cannot substitute. The interface reserves this typed path, but no implicit alternative becomes executable in the first delivery.

## 5. Surface equation and geometry providers

Let $\phi(\mathbf X)=0$ define the fixed regular surface, $\mathbf g=\nabla\phi\ne0$, $H=\nabla^2\phi$, $\mathbf V=\dot{\mathbf X}$ and $P=I-\mathbf g\mathbf g^{\mathsf T}/\|\mathbf g\|^2$. Let $\mathbf A$ be the bound receiver-total interaction acceleration. The geometry provider and constraint module implement

$$
\mathbf A_{\rm tan}=P\mathbf A,\qquad
\mathbf A_{\rm discarded}=(I-P)\mathbf A,\qquad
\mathbf A_{\rm geom}=-\frac{\mathbf V^{\mathsf T}H\mathbf V}{\|\mathbf g\|^2}\mathbf g,
$$

$$
\ddot{\mathbf X}=\mathbf A_{\rm tan}+\mathbf A_{\rm geom},\qquad
\mathbf C=\mathbf A_{\rm geom}-\mathbf A_{\rm discarded}.
$$

Here $\mathbf C$ is total imposed support; it is distinct from discarded interaction and curvature. Differentiating $\phi(\mathbf X)=0$ gives $\mathbf g\cdot\mathbf V=0$ and $\mathbf g\cdot\ddot{\mathbf X}+\mathbf V^{\mathsf T}H\mathbf V=0$. A normal support has form $\lambda\mathbf g$; substituting $\ddot{\mathbf X}=\mathbf A+\lambda\mathbf g$ determines $\lambda$ and the displayed equation uniquely on its ordinary chart. Thus $P\mathbf C=0$ and, for tangent velocity, $\mathbf V\cdot\mathbf C=0$. This is a kinematic identity, not an imported energy law or constant-speed premise.

Use body coordinates $\mathbf y=U^{\mathsf T}(\mathbf X-\mathbf O)$ with fixed orthogonal orientation $U$ and center $\mathbf O$. Transform gradient by $U$ and Hessian by $UHU^{\mathsf T}$. Admit a normalized orientation only when its construction and enclosure are recorded; never silently repair an invalid rotation.

| Shape | Defining function and admissibility |
| --- | --- |
| Sphere | $\phi=\mathbf y\cdot\mathbf y-R^2$, $R>0$; $\mathbf g=2\mathbf y$, $H=2I$ in body coordinates. |
| Oblate spheroid | $\phi=\mathbf y^{\mathsf T}D\mathbf y-1$, $D=\operatorname{diag}(R^{-2},R^{-2},(qR)^{-2})$, $R>0$, $0<q<1$; $\mathbf g=2D\mathbf y$, $H=2D$. Permit $q=1$ as the declared spherical comparison limit. |
| Ring torus | $\phi=s^2-4L^2(y_1^2+y_2^2)$, $s=\mathbf y\cdot\mathbf y+L^2-r^2$, $L>r>0$; $\mathbf g=4s\mathbf y-8L^2(y_1,y_2,0)$ and $H=8\mathbf y\mathbf y^{\mathsf T}+4sI-8L^2\operatorname{diag}(1,1,0)$. |

The torus uses a polynomial defining function to avoid a cylindrical square-root singularity away from its surface. On the zero set, $s>0$ for $L>r$, so taking the positive square root recovers $(\sqrt{y_1^2+y_2^2}-L)^2+y_3^2=r^2$. It therefore represents the selected ring surface. Certification still requires a strictly positive gradient-norm lower bound on each admitted tube.

The surface class is a compact smooth embedded two-dimensional manifold without boundary. $C^2$ suffices for the displayed ordinary acceleration identity; a corrector requiring higher derivatives must require them explicitly. All three selected analytic shapes supply those derivatives. An interval box in which $\|\mathbf g\|$ cannot be bounded away from zero triggers subdivision/precision escalation, then a regularity failure if unresolved; it is not permission to divide by a nominal gradient.

Different regular defining functions for the same surface yield the same tangent and curvature rule on the exact surface and tangent bundle. Off-surface numerical behavior can differ; record the chosen definition and certify its geometry tube. No unrecorded rescaling of $\phi$ changes the manifest.

## 6. Retained histories, dense constraints and numerical errors

Reading [History.hpp](../../../../src/eom/include/architrino/eom/History.hpp) shows piecewise cubic histories with position/velocity error enclosures and a provenance-bound circular factory. Use this retained-history owner; do not create a parallel Surface history store. A nonconstant Cartesian polynomial cannot stay exactly on a sphere: the highest-degree coefficient of its squared norm is a positive sum of squares. Endpoint projection alone therefore cannot establish exact dense surface motion.

The first implementation retains Cartesian cubic approximations with certified error tubes for the constrained equation. It must establish constraint accuracy throughout each entire segment and propagate that uncertainty into delayed roots and acceleration. It must not label a cubic centerline as an exact surface curve. Surface display evaluates those accepted records; it does not hide drift by snapping displayed points.

For every prepared and candidate segment, certify continuous coverage, joins, position/velocity reconstruction bounds, a regular geometry tube, a surface-distance error bound and a tangent-velocity error bound. A local residual-to-distance certificate may use a proved geometry-specific bound; the bare ratio $|\phi|/\|\mathbf g\|$ is only a local approximation unless its bound is proved on the tube. Tangent error uses the certified normal-component bound $|\mathbf g\cdot\mathbf V|/\|\mathbf g\|$.

The host owns named surfacePositionTolerance and surfaceTangentVelocityTolerance in length and velocity units, respectively. It includes geometry-evaluation, reconstruction and drift uncertainty in the existing position/velocity error ledger. These tolerances bound numerical approximation; they do not soften the mathematical equation into a new attraction law. Accepted state enclosures must cover the solution of the constrained equation with surface-consistent initial data, not merely pass centerline residual checks. Derivative and local correction/existence obligations remain those of the selected EOM certification route.

Use interval subdivision over dense segments; isolated endpoint or sample checks are insufficient. Apply the same rule to supplied preparation. An exact analytical preparation is allowed through a provenance-bound evaluator and certified approximation/error tube. Generic cubics with no evidence of an underlying surface-consistent preparation are rejected rather than inferred to be exact because their endpoints lie on the surface.

Refine time steps and precision when geometry, roots, domain or combined budgets cannot certify. Publish no candidate path until all members pass. No tangent damping, renormalized speed, endpoint-only retraction, root deletion or unchecked derivative approximation may be introduced as a numerical repair.

For a compact fixed surface with admitted diameter bound $D_\Sigma$, an interacting causal root satisfies $0<T-S\le D_\Sigma/c_f$. This follows from the ambient distance relation and bounded surface diameter. It provides a finite sharp-law history-window bound when all transmitter and receiver paths stay on that same surface; it does not prove root completeness or an infinite-past finite-width integral bound. Use a certified bound and reconstruction uncertainty if enabling retention pruning. Retain existing finite-history rules by default; enabling a new pruning rule requires its own declaration and proof.

## 7. Three speed regimes and boundary semantics

The [existing taxonomy](../../master-equation-closure/equation-variants/manuscript.md#three-speed-options) owns unrestricted, inclusive $\|\mathbf V\|\le c_f$ and strict $\|\mathbf V\|<c_f$ domains. Below/equal/above wake speed are observed states, not alternative mode names. The initial implementation supports domain checking with explicit halt rules, separately from speed-changing responses.

| Selected regime | Initial declared policy |
| --- | --- |
| Unrestricted | No ceiling. Preserve the chosen interaction's actual root/event domain; unrestricted does not mean every history has defined acceleration. |
| Inclusive ceiling | Verify the complete prepared/accepted domain is $\|\mathbf V\|\le1$. Permit a certified equality input only if its underlying equation chart is defined. Halt at the first boundary contact requiring an unspecified forward response; no velocity clamp. |
| Strict ceiling | Verify the complete prepared/accepted domain is $\|\mathbf V\|<1$. Publish only a certified prefix before boundary contact. Equality is outside the domain and cannot be an accepted terminal state of this regime. |

For a speed certificate, enclose $\|\mathbf V(T)\|^2$ over entire dense segments, including reconstruction errors and between-endpoint extrema. Strict certification needs an upper bound below one, not an epsilon-based reinterpretation of equality. An interval straddling the boundary requires refinement; exhaustion returns speed_domain_uncertified. A verified violation in initial history rejects admission. A future crossing halts at the last certified admissible prefix, with an event-time enclosure; never claim an uncomputed exact contact time.

A generic inclusive equality input may be mathematically admissible yet not forward-advanceable under the initial halt-only policy. Return that distinction explicitly, without claiming ceiling enforcement. A proved inward boundary continuation could later be registered as an additional complete boundary policy.

The taxonomy's examined inclusive response is a separately selected equation clause: it removes the speed-increasing component of the finite summed vector at equality and separately specifies zero self response. The initial Surface plan does not import either clause. Combining that response with Surface requires a complete scientific specification of self accounting, order, ordinary domain, boundary persistence and event handling. Register it as known/unavailable until those obligations are reviewed and implemented. A ceiling response cannot be inferred merely from the inclusive selector.

## 8. Requests, responses, checkpoints and transport

A v2 request includes schema, contractId, run/branch ids, requested composition and component options, exact model parameters, histories with hashes/enclosures, preparation provenance, absolute-time interval, numeric budgets, resource envelope and output/checkpoint cadence. Only registered component options are accepted; no caller-supplied acceleration function or future curve is accepted. Existing fields carry their established meanings. Numerical field speed must be one in new requests.

The v2 JSON keys are schema, contractId, runId, branch, model, paths, preparation, interval, numerics, resources and output. Model contains compositionId/version, bindingRef, speed (domain, boundaryPolicy, threshold), constraint (kind, geometry definition/frame/parameters) and method. Numerics adds surfacePositionTolerance and surfaceTangentVelocityTolerance to the preserved EOM controls. Paths retain stable ids, polarity, exact retained-history tokens, reconstruction bounds and hashes. Branch is null for an initial run or contains parent run/checkpoint and transition time. Admission reports field-specific errors; a Surface run requires constraint.kind=surface and the registered surface composition. A named constrained composition cannot resolve to constraint.kind=none.

The v2 response keys are schema, contractId, runId, branchId, status, resolvedModel, acceptedCoverage, publishedExtensions, ledgers, surfaceDiagnostics, evidence, halt and checkpoint. Capability reports separate implemented from independentlyAccepted and carry supported options/exclusions for every composition. The same DTO owns headless and browser requests; app-specific display state is outside it.

The host returns the fully resolved manifest before evolution in an inspect-request operation. Capability and inspection operations let Surface present unavailable combinations before launching. Requests missing optional model settings resolve to canonical/unrestricted/unconstrained. A Surface request missing its fixed geometry is invalid; the app constructs the explicit constrained request.

The v2 result contains status, accepted time/coverage, published extensions, root/accounting/error/step ledgers, resolved manifest, method provenance, geometry diagnostics, halt reason and checkpoint reference. Every receiver-total diagnostic includes reception interval, path id, net interaction acceleration, tangent interaction, discarded normal vector, curvature acceleration, total support and their uncertainty. Geometry drift/domain records identify full certified time slabs rather than isolated samples.

Evidence has separate axes: computation method, equation identity, imposed constraint and numerical acceptance. A numerical certificate for the constrained equation is experimental constrained evolution, not unconstrained canonical or physical assembly acceptance. Analytical results identify their derivation and domain; prescribed preparation and replay identify their provenance. Extend v2 evidence fields explicitly instead of inserting a surface result into an old canonical flag.

Use the existing process-client/bridge owner as the transport seam. Preserve the v1 Borg framing and commands. Add version-dispatched v2 inspection/capability/evolution operations to the same EOM executable/process service, with a consumer-neutral request DTO. The proposed v2 transport uses one UTF-8 JSON object per request line and one final JSON response line on stdout; progress records use stderr and preserve accepted-step semantics. No multiline/raw provider code is transmitted. Use a maintained JSON parser with duplicate-key rejection and field/type validation; do not introduce an ad hoc parser that skips unknown model fields. Select its build integration against the actual dependency inventory before Stage C transport implementation. Stage A's separate read-only CLI accepts explicit option/value pairs and does not decode v2 evolution requests.

The browser service routes are GET /api/eom/v2/capabilities, POST /api/eom/v2/inspect and POST /api/eom/v2/evolve. Reading [BorgEomHttpClient.js](../../../../src/apps/borg/BorgEomHttpClient.js), [BorgEomShadowRunner.js](../../../../src/apps/borg/BorgEomShadowRunner.js), [BorgNativeEomProcessClient.mjs](../../../../scripts/eom/BorgNativeEomProcessClient.mjs) and [start-local-dev.mjs](../../../../scripts/dev/start-local-dev.mjs) shows the v1 schema, Borg-specific evidence/retention handling, process protocol and local HTTP seam. Extract common lifecycle/transport into shared EOM clients; retain thin Borg compatibility adapters for its specific retention and v1 semantics. Surface must not use the existing runner's canonical evidence whitelist for constrained results.

Cancellation is cooperative at an atomic accepted boundary: persist the continuation checkpoint and return accepted coverage before releasing the worker. Pause uses this operation and resumes from that exact checkpoint. If cancellation/storage cannot complete within the declared resource deadline, report the last durable checkpoint and the explicit failure; progress counts alone are not a recoverable checkpoint. Never claim the most recent observed accepted state is durable without its receipt.

Implement schema validation in the request builder, bridge and C++ admission path. They all reject unknown/unsupported options rather than silently stripping a selector. Wire decimal fields remain strings; lengths and budgets cannot be reinterpreted by browser numeric formatting. The browser trusts only a returned, matching resolved model digest.

Reading [Checkpoint.hpp](../../../../src/eom/include/architrino/eom/Checkpoint.hpp) and [Checkpoint.cpp](../../../../src/eom/src/Checkpoint.cpp) identifies model fingerprints and the current v7 checkpoint format. Propose the next available format, initially v8, carrying the full manifest/digest, provider continuation state, domain/event state, geometry certificate metadata and existing adaptive/joint/history state. Keep the v7 reader and canonical continuation path. A v7 checkpoint cannot be resumed under surface support or a changed speed/equation selection.

On restart, check model digest, definitions/build compatibility, provider-state schema, numerical controls and retained-history hashes before advancing. Keep requested end-time extension semantics separate from model identity. Canonical migrations must preserve existing fingerprint comparisons; a new v2 run uses the new identity path. Do not silently upgrade an old checkpoint's scientific meaning.

A mode change creates an explicit new branch, with parent run/checkpoint, transition time, new resolved model and retained past. A later free-release branch may retain the physically actual supported past while choosing unconstrained future evolution, labeled accordingly; it must never relabel that past as free evolution. Free-release tooling is a later qualification stage, not required for the first Surface delivery.

## 9. Analytical methods

An analytical provider can return a precise bounded result directly or accelerate an equivalent stage inside EOM. Its applicability certificate must bind equation, speed, shape, histories, root support, time interval, assumptions and exactness/error. The host falls back to numerical evaluation only when that route is itself supported and the fallback is part of the requested method policy; otherwise it halts or rejects.

The first analytical control is zero-interaction motion on a unit sphere:

$$
\mathbf X(T)=(\cos(T/2),\sin(T/2),0),\qquad
\dot{\mathbf X}(T)=\tfrac12(-\sin(T/2),\cos(T/2),0),\qquad
\ddot{\mathbf X}(T)=-\tfrac14\mathbf X(T).
$$

This is a geometry-only harness case with $c_f=1$ and supplied receiver-total $\mathbf A=0$. It tests tangent speed, curvature and constrained integration; it does not validate interacting root accounting. A full canonical request with zero coupling still retains its declared root/self obligations unless an independently justified route specifies otherwise. The production provider must not special-case this reference trajectory to make a test pass. A separately authored derivation/reference remains frozen while its numerical subject is changed.

No precise interacting 3:3 analytical provider is claimed. Add further reductions only on independently checked domains. Any claim that analysis costs substantially less requires matched wall-time/resource measurements including certification and fallback. Those measurements are absent here.

## 10. Surface app delivery

Surface owns preparation and presentation; EOM owns every computed future path. The [app brief](../../app-surface/manuscript.md#application-brief) remains the product owner. Build a dedicated Surface entry point using shared Borg camera/playback/record components where their inspected contracts fit. Do not copy Borg's solver/catalog logic or place shape equations in a browser dynamics engine.

The proposed app paths are surface.html and src/apps/surface/ for the browser composition, following the existing standalone-app architecture. Shared browser transport and accepted-history evaluation belong under src/apps/shared/; process transport remains under scripts/eom/; the C++ providers remain under src/eom/. Reuse the existing EomCubicHistoryEvaluation.mjs for accepted-history display. Extract genuinely common Borg presentation components into their existing shared runtime owner only after inspecting camera/trail/lifecycle obligations, leaving Borg adapters intact. Update authored standalone-launch/navigation sources under their actual owner; generated navigation remains generator-owned.

Numerical execution requires a reachable EOM service advertising the selected capability. A static hosted Surface page can prepare experiments and replay retained records when no service is connected; its run action reports unavailable rather than inventing local dynamics. The first viewer gate is the bounded local-service workflow, with deployment integration a separate actual-service decision.

The experiment flow is: choose fixed shape and dimensions; choose population (3:3 preset); import or create a provenance-bound past; set tangent preparation; choose available equation/speed options; inspect the resolved request; run a bounded calculation; inspect accepted histories and diagnostics; save/export the complete record. Preserve a general population interface so six members are a preset rather than a hard-coded provider restriction.

The first screen shows shape, polarity-marked paths and absolute-time playback. A compact experiment panel shows dimensions, preparation coverage, equation, speed regime, duration and precision controls. The result view foregrounds facts, insights and conclusions with their evidence level: what motion was calculated, recurring geometry observed and what remains unqualified. Expose details for accepted interval, surface/tangency errors, discarded normal acceleration, curvature, total support and halt reason. Avoid presenting recurrence as settling or an attractor.

UI states are editing, admission/inspection, ready, running, paused, completed, halted, cancelled and unavailable. Editing a resolved experiment invalidates its readiness. Completed and halted states show only accepted coverage, retaining a reproducible record. Pause checkpoints at an accepted boundary; Resume validates and continues that identity. Reset cancels the owned active run and starts an editable experiment without deleting saved records. Cancellation returns certified durable coverage or the explicit storage/cancellation failure described above. Failed admission preserves the editable preparation and concrete error. Unavailable modes show their missing capability; they do not start a default-mode run.

Show prescribed preparation distinctly from computed extension. Offer per-member selection and receiver-total normal arrows; arrows are sampled solver diagnostics, not browser recomputations. Keep raw ledgers and full manifest available by inspection/export. No per-source normal breakdown control is present.

Sphere is the first interacting viewer gate. Admit oblate and torus inputs through the same geometry interface; demonstrate their viewers/calculations after the spherical gate. Additional shapes, pattern classification, energy interpretation and free-release qualification remain later work. The app entry point can be built while scientific acceptance is pending, but its run action stays unavailable until EOM reports the selected capability.

## 11. Delivery sequence and acceptance

| Stage | Deliverable and concrete completion evidence |
| --- | --- |
| A — Canonical extraction and model resolution | Minimal typed provider boundary, built-in registry, immutable descriptive manifest/plan, canonical snapshot adapter and read-only CLI capability/inspection operations. All request-bearing public entries reject unknown/incompatible selections before mutation. Existing canonical fixtures and frozen independent references retain their scoped outcomes; v1 payloads and v7 fingerprints/checkpoints remain unchanged. Only canonical/unrestricted/unconstrained numerical execution is available. |
| B — Geometry and constrained evolution | Sphere, oblate and ring-torus geometry; ordinary constrained acceleration inside all correction/certification calls; full-segment constraint/tangency enclosures; receiver-total diagnostics and geometry error debits. Independent review/reference checks gradients, Hessians, support identity and geometry-only great-circle evolution. |
| C — Domains and persistence | All three declared speed-domain/halt policies; between-endpoint boundary detection; versioned v2 transport and checkpoint identity; uninterrupted/restarted continuation parity, mismatch rejection and atomic cancellation. No capped-response capability is implied. |
| D — Bounded interacting Surface gate | Complete 3:3 sharp ordinary constrained run with all self/partner accounting, refinement, independent interaction reference, supported history coverage and explicit halt on unsupported events. A failed case remains a valid failed record, not a successful research result. |
| E — App consumer | Dedicated Surface preparation/run/inspect/export flow, returned-manifest matching, evidence labels, accepted-only playback and viewport verification. Oblate and torus calculations pass their same scoped controls before being shown as available. |

Stage A is implemented with the [scoped compatibility receipt](../analysis/equation-provider-stage-a-inventory-2026-10-10.md). The operator subsequently selected Stage B's geometry and constrained evolution; its implementation and bounded qualification are owned by the [Stage B record](../analysis/equation-provider-stage-b-2026-10-10.md). The separately authored review supplies the constrained integral-map proof, coherent subwake self-exclusion, analytic Hermite reconstruction lemma and implementation corrections. The first chart is ordinary sharp method-of-steps with accepted source acceleration carriers; unsupported domain/event routes fail closed under the unrestricted speed selection. Stage C and later still require subsequent implementation authorization and retain the listed evidence-gate dependency order. No large campaign or new recurring test enrollment follows from this request.

### Focused validation plan

Use the existing build and test owners in [src/eom/README.md](../../../../src/eom/README.md). Build into the project's ignored build/scratch owner selected by the implementation session, rather than copying an old external build path by habit. Use the shared Python venv only where executable. This plan proposes focused change validation; regular suite value, timing and blocking enrollment follow the repository testing procedure.

Required cases are canonical default/v1 parity against preserved outputs plus the existing independent oracle; sphere curvature and great-circle evolution; oblate $q=1$ recovery; ring-torus inner/outer/meridional geometry; translated/rotated shape covariance; constraint invariance under a regular defining-function change; all positive-delay self/partner roots; invalid or insufficient preparation; dense between-endpoint drift/speed violation; gradient uncertainty; precision/budget exhaustion; unsupported chart and provider rejection; checkpoint mode/geometry mismatch; thread determinism; atomic cancellation; and app import/run/export identity.

Use mathematically different geometry references where possible: a parameterized torus tangent/normal calculation can check the polynomial implicit geometry, rather than duplicate its formulas. Preserve the existing interaction oracle unchanged. A separately authored reviewer/reference checks the derived rule; production/reference agreement alone does not independently prove a rule they both newly encode.

The interacting acceptance matrix is finite and owner-scoped. It includes refinement of root, step, geometry and precision controls and independently evaluated delayed residuals on retained output, with exact definition and error domain. It does not require finding a stable pattern. Record the last accepted interval and missing gate if the calculation cannot advance.

## 12. Implementation-agent handoff

**Operator-selected allocation: Codex review/collaboration, Stage A implementation, then Stage B implementation in this Codex task.** A separately authored Codex review is recorded above. This allocation is not a measured comparative-capability claim. Stage C and later dependent implementation remain outside the present authorization.

The initial Stage A implementation prompt was:

> Implement Stage A only. Read live AGENTS.md, startup routing, software architecture and the EOM/Surface owners. Use the existing shared checkout, inspect concurrent changes and preserve unrelated work. Build the minimal EOM-owned provider interface with immutable descriptor/plan, exact selection admission, built-in canonical registration and complete acceleration-snapshot evaluation through the extracted existing evaluator. Preserve omitted-selector canonical behavior, v1 framing and v7 fingerprints/bytes. Guard every request-bearing public evolution, event, onset, fallback and checkpoint entry before computation/publication; reject unavailable compositions. Add read-only capabilities/model inspection, with actual source/configuration identities and precise availability boundaries. Keep the plan descriptive rather than claiming a general interpreter. Preserve independent interaction references, compare against a captured pre-change baseline and run focused validation with separate review. Record evidence and unresolved gates in the owning manuscript and receipt. Later Surface, restricted-speed, implicit, v2 transport/checkpoint and app stages require subsequent operator implementation authorization. Do not launch a research campaign or publish Git.

The implementation agent's first artifact is a scoped code-path inventory mapping every acceleration/correction/certification call, wire field, checkpoint binder and consumer to its provider migration obligation. Its next artifact is the Stage A canonical compatibility receipt. This replaces an open-ended instruction to “add plug-ins” with an executable dependency sequence.

The separate reviewer receives the constraint derivation, three geometry formulas, composition order, speed-domain/halt semantics, dense-history enclosure strategy and independent control matrix. The review must state assumptions and falsifiers and identify any missing error/existence obligation. It must not edit the production subject and reference together or reinterpret the artificial support as physical confinement.

## 13. Open acceptance obligations

The design specifies the interface, first compositions, speed-domain semantics, geometry, wire/persistence strategy, app flow and delivery gates. The separately authored mathematical/runtime review, Stage A compatibility receipt and Stage B bounded constrained capability record are the current implementation owners. The interacting 3:3 scientific gate and app delivery remain open. SURFACE-001's design/review obligation is complete; EOM-007 retains later implementation dependencies. Additional response laws, joint-affine Surface support, constrained event maps, dynamic binary loading and new shape/energy investigations remain unavailable or deferred until individually specified and qualified.
