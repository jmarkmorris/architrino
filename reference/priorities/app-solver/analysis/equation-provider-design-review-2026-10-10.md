# Independent Codex Review of the EOM Equation-Provider Design

## Scope and disposition

This separately authored review assesses [the implementation design](../contracts/equation-provider-design-v1.md) as read on 2026-10-10 and the named EOM seams below. The root implementation agent owns design integration and production edits; this reviewer has not edited either the production subject or an independent oracle. The operator selected Codex review and collaboration followed by Stage A implementation. This review supports a canonical-only Stage A after the corrections below; it does not accept constrained numerical evolution, an interacting assembly result, a complete v2 transport, or a new restart guarantee.

**Grades and instruments:** the surface identities and geometry results below are independently derived algebraically. Implementation-seam observations are measured by direct source reads and `rg` within `src/eom/` and the named process client. No solver execution, benchmark or numerical acceptance test was performed by this reviewer. Findings are falsified by a contrary declaration/body in the cited live seam or a counterexample satisfying the derivation's stated regularity/tangency assumptions.

## Independent mathematical assessment

Let a fixed surface have a regular defining function $\phi$, gradient $\mathbf g\ne0$, Hessian $H$, and a tangent velocity $\mathbf V$ at $\phi=0$. Suppose the imposed support is normal, so $\mathbf a=\mathbf A+\lambda\mathbf g$, where $\mathbf A$ is the complete receiver-total acceleration after the selected response. Two derivatives of the constraint give

$$
\mathbf g\cdot\mathbf V=0,\qquad
\mathbf g\cdot\mathbf a+\mathbf V^{\mathsf T}H\mathbf V=0.
$$

Consequently

$$
\lambda=-\frac{\mathbf g\cdot\mathbf A+\mathbf V^{\mathsf T}H\mathbf V}{\|\mathbf g\|^2},\qquad
\mathbf a=\left(I-\frac{\mathbf g\mathbf g^{\mathsf T}}{\|\mathbf g\|^2}\right)\mathbf A-\frac{\mathbf V^{\mathsf T}H\mathbf V}{\|\mathbf g\|^2}\mathbf g.
$$

This independently recovers the design's formula, its sign and uniqueness among normal supports. The difference $\mathbf C=\mathbf a-\mathbf A$ is parallel to $\mathbf g$, hence $P\mathbf C=0$ and $\mathbf V\cdot\mathbf C=0$. These are local kinematic identities. They imply neither a physical energy law nor fixed speed: $\frac{d}{dT}\|\mathbf V\|^2=2\mathbf V\cdot\mathbf A$, which need not vanish. $C^2$ regularity suffices for these identities along a twice differentiable constrained curve; local existence/uniqueness of the actual delayed evolution additionally requires the selected kernel and constrained vector field's regularity and root chart. The initial analytic geometries satisfy the needed higher geometry smoothness; the kernel/event obligations are not supplied by this algebra.

A regular change of defining function leaves the rule invariant on the exact tangent bundle. Locally write $\widetilde\phi=h\phi$ with $h\ne0$. On the surface, $\widetilde{\mathbf g}=h\mathbf g$ and $\widetilde H=hH+\nabla h\otimes\mathbf g+\mathbf g\otimes\nabla h$. Tangency kills the last two terms in $\mathbf V^{\mathsf T}\widetilde H\mathbf V$. Both the projector and curvature vector are therefore unchanged. This proof applies on the surface; numerical off-surface extensions can differ, as the design correctly states.

For the sphere, $\mathbf g=2\mathbf y$ and $H=2I$ imply $\mathbf A_{\rm geom}=-\|\mathbf V\|^2\mathbf y/R^2$. With $R=1$, $c_f=1$, $\mathbf A=0$ and $\mathbf X(T)=(\cos(T/2),\sin(T/2),0)$, the velocity has constant magnitude $1/2$ and $\ddot{\mathbf X}=-\mathbf X/4$. This independently verifies the geometry-only control, without validating root accounting or an interacting request.

For the oblate spheroid, differentiation of $\phi=\mathbf y^{\mathsf T}D\mathbf y-1$ gives $\mathbf g=2D\mathbf y$ and $H=2D$. At $q=1$, the defining function is $R^{-2}(\|\mathbf y\|^2-R^2)$; the invariance result proves exact spherical recovery. The domain $R>0$, $0<q<1$, with the separately declared $q=1$ comparison limit, is coherent.

For the ring torus, direct differentiation of $\phi=s^2-4L^2\rho^2$, $s=\|\mathbf y\|^2+L^2-r^2$, $\rho^2=y_1^2+y_2^2$, gives the design's gradient and Hessian. Independently parameterize the surface by $\rho=L+r\cos\theta$ and $y_3=r\sin\theta$. On this surface $s=2L\rho$ and

$$
\mathbf g=8L\rho r(\cos\theta\,\mathbf e_\rho+\sin\theta\,\mathbf e_3),\qquad
\|\mathbf g\|=8L\rho r\ge8Lr(L-r)>0.
$$

This verifies the normal direction and regularity on the exact ring torus using a different representation. The bound is not an interval-tube certificate; implementation must prove a lower bound on each enclosing tube. Translation and a genuinely orthogonal fixed frame preserve the formulas by the stated gradient/Hessian transformation.

The dense-history warning is correct. For a nonconstant real Cartesian polynomial $\mathbf p(T)$, its highest-degree squared-norm coefficient is the sum of squared leading coefficients and is positive; therefore $\|\mathbf p(T)\|^2$ cannot be identically constant. Sphere endpoints and centerline samples cannot certify a surface trajectory. Existing cubic histories may approximate constrained motion only with full-segment errors and enclosures covering the constrained solution. Residual checks alone do not prove that enclosure or existence claim. The design already preserves this distinction, so no formula change is requested.

The speed-domain distinction is also coherent. A strict domain requires a certified upper bound below one over the entire accepted segment; inclusive membership does not define a speed-changing response. The initial halt-only policy is a deliberately limited numerical capability. It must not advertise ceiling enforcement or inherit the examined ceiling variant's zero-self clause.

## Required design corrections for Stage A

| Finding | Concrete modification and acceptance boundary |
| --- | --- |
| ◐ Partial — Stage A transport scope conflicts with later Stage C | Define Stage A as typed C++ resolution plus read-only CLI capability/model inspection. Keep v2 evolution, HTTP routes, provider-aware checkpoints, constrained geometry and speed policies in dependent stages. A CLI inspection operation is not a complete v2 request/admission API. Unsupported combinations must reject rather than resolve to canonical. |
| ◐ Partial — a snapshot wrapper alone leaves independently callable model-bound helpers | Route public acceleration snapshots through the resolved canonical provider, and validate selection at every request-bearing public evolution/event/continuation/checkpoint entry. Preserve canonical-only low-level instruments and certificate-only helpers under their existing contracts. Add rejection checks for the independently callable entries, not only the main evolution loop. |
| ◐ Partial — source/plan manifest versus v7 continuation identity | Preserve exact v1/v7 fingerprints and checkpoint bytes for omitted or semantically identical canonical selectors. State that the separate inspected manifest is descriptive in Stage A; v7 does not acquire a provider/build-bound restart guarantee. Unknown/noncanonical selectors must reject before fingerprinting, writing or continuation. Provider-aware restart identity belongs to the successor format. |
| ◐ Partial — build identity cannot be inferred from Git HEAD | Record actual compiled source/configuration identity, or explicitly state source identity unavailable. A Git commit id or a scientific document digest alone does not identify a dirty build. Include the relevant source inventory and build options, not merely a changed outer wrapper. Rebuild after source/configuration changes before taking a receipt. |
| ◐ Partial — exact parameters and numerical routes must be represented honestly | Include coupling, chart/regulators and applicable model controls in any claimed complete model manifest. Do not collapse decimal tokens through binary64. Require exact $c_f=1$ for explicit new selections while preserving provenance-bound legacy requests without silently relabeling them. Report ordinary/joint/event availability at its existing scoped acceptance, and label unimplemented plan-node execution, Surface, implicit and capped-response routes unavailable. |

These are implementation-boundary corrections, not objections to the displayed surface geometry. After integration, Stage A can proceed without first solving the Stage B geometry-enclosure and existence problem.

## Inspected code-path inventory and guard obligations

The following inventory is measured by direct reads and `rg` in the listed files; it is not a claim about every consumer outside that scope.

- [CoupledEvolution.hpp](../../../../src/eom/include/architrino/eom/CoupledEvolution.hpp) declares a request without equation selection and public snapshot, atomic-step, evolution, fold impulse, regulator convergence, common-domain and pinned-fold onset entry points. The coincident-endpoint helper consumes certificates rather than a request; it cannot validate a selector that is absent from its contract.
- [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp) has ordinary snapshots in predictor, corrector, endpoint/event and accepted-state paths, and separate joint acceleration/corrector calls. Canonical-only admission makes retaining these internal paths valid in Stage A. Later Surface support must replace or reject every model-specific sensitivity/joint/event route; snapshot extraction alone is insufficient then.
- `validate_request` is called at the atomic/evolution host boundary. Standalone snapshot and event APIs are independently callable, so unsupported selection guards cannot exist only inside that validator. The reusable-snapshot path must remain restricted to the same admitted canonical identity.
- [Checkpoint.cpp](../../../../src/eom/src/Checkpoint.cpp) hashes numerical controls, path ids/polarities and integration-method controls into the legacy model fingerprint. It does not bind a new provider manifest, scientific definition digest or actual build digest. Checkpoint creation, direct fingerprinting and resume therefore need canonical-only admission guards while preserving the old hash token sequence. Resume eventually enters evolution, but guarding before fingerprint checks preserves clear unsupported-model failure and prevents an unsupported checkpoint being created independently.
- [CMakeLists.txt](../../../../src/eom/CMakeLists.txt) owns the C++20 library/executable inventory, MPFR/GMP dependencies and existing Boost Property Tree dependency for the F5 adapter. New CLI inspection must use a maintained parse/serialization route appropriate to its actual input shape, reject unknown arguments and retain exact strings. Adding a JSON operation with duplicate-key rejection requires a parser that preserves enough information to perform that rejection; Property Tree's mere availability is not evidence of complete schema validation.
- [eom_borg_shadow_cli.cpp](../../../../src/eom/native/eom_borg_shadow_cli.cpp) owns existing protocol/version and inspection operations. Adding independently named read-only capability/inspection operations must preserve the existing protocol-version output and Borg result framing. No change to the existing canonical evidence whitelist can grant Surface authority.

## Stage A review receipt and focused verification

✓ Done — Independent algebraic review of the normal-support identity, three geometry definitions, exact-surface defining-function invariance, sphere control and dense-polynomial obstruction is recorded above. This closes the design's separate local mathematical review requirement at the displayed identity/control level. It does not close Surface numerical qualification.

○ Not done — Root integration must record the dispositions of the required Stage A corrections in the design and owning queue. This reviewer has not changed those shared owners.

○ Not done — Implementation acceptance requires rebuilt focused checks: canonical selector versus omission has identical root/acceleration/history/checkpoint deterministic fields; unsupported selectors fail at snapshot, atomic, evolution, standalone event and checkpoint entry points before publication; capability/inspection outputs are stable and accurately unavailable for future modes; manifest parameter/source identity is deterministic; legacy protocol framing and existing independently authored references retain their scoped outcomes. Timing/resource diagnostics may vary and cannot be used for byte parity.

○ Not done — A separately qualified Stage B must certify constrained solution enclosures, geometry derivatives, full dense segment errors and delayed-root propagation. No production geometry or independent numerical oracle was changed in this review.

## Collaboratively agreed Stage A subset

The implementation agent accepted the corrections in this review before production edits. Freeze the initial EquationProvider interface to descriptor, canonical-only admission, immutable plan description and complete snapshot evaluation. A request appends an optional typed EquationSelection: omission preserves the legacy request, while explicit selection admits only canonical/unrestricted/unconstrained numerical evaluation with exact numerical $c_f=1$. The public snapshot function dispatches to the provider; the provider calls the existing extracted canonical snapshot body without changing its arithmetic, roots, reduction or event rules. The initial plan graph describes the certified canonical operation and its dependencies; it is not an implemented arbitrary stage interpreter. Later capability additions require explicit contracts rather than claiming all proposed interfaces are implemented now.

The separate manifest combines the actual request controls/legacy model fingerprint with exact model-parameter tokens and source/plan identity. The v7 continuation fingerprint stays unchanged, and inspection explicitly retains that limited restart meaning. CMake-generated actual source/configuration identity covers the numerical header/source inventory and changes on rebuild/reconfiguration; it does not use Git HEAD. Generated identity metadata is excluded from its own input inventory.

Read-only CLI capability/model-inspection operations are Stage A deliverables. The complete v2 evolution DTO, HTTP routes, geometry/domain enforcement, successor checkpoint and arbitrary pipeline execution remain unavailable. Capability output separates implemented routes from acceptance domains and explicitly preserves existing canonical scoped acceptance without a blanket independentlyAccepted assertion.

✓ Done — The implementation agent's stated revisions address the review's Stage A design blockers. Verification of the integrated live packet and implementation remains the next review step. These agreed boundaries complete this independent design review, including the local mathematical review required by SURFACE-001; they do not complete EOM runtime or Surface numerical acceptance.

## Integrated design verification

✓ Done — Direct reads of the live packet's Review integration and Stage A boundary, proposed module staging, Stage A delivery row and allocation on 2026-10-10 confirm that all five required corrections are integrated. Canonical-only Stage A may proceed. Two minor text clarifications were returned to the implementation agent: JSON-parser choice belongs before Stage C transport, and the full-roadmap reusable prompt must not imply authorization to execute stages beyond the operator's current Stage A request. They do not block the scoped canonical implementation.

## First Stage A code review

The following observations are measured by direct reads of the new provider/registry/plan/CLI/CMake files and `git diff` restricted to CoupledEvolution and Checkpoint on 2026-10-10. The canonical snapshot body is unchanged in that diff apart from its private-seam name; the wrapper dispatches to the registered canonical provider. Checkpoint changes add selection guards while preserving the legacy hash-token and serialization bodies. These source observations support the intended extraction but do not substitute for rebuilt baseline/oracle results.

| Finding | Disposition requested |
| --- | --- |
| ○ Not done — malformed signed exponent admitted | The decimal normalizer strips a leading exponent plus and then permits a minus, so `1e+-0` incorrectly normalizes to one. Reject a second exponent sign and retain a negative test. |
| ○ Not done — external dependency identity can become stale | MPFR/GMP library and MPFR header hashes are included at configure time, but their files are not in the configure dependency list. Add those dependencies; include the compiled GMP header and relevant configuration inputs. Multi-config generators must either get per-configuration identity or be explicitly unsupported, since an empty build type otherwise omits Debug/Release flags. |
| ○ Not done — unknown chart in model inspection | The inspection CLI currently accepts arbitrary chart-policy strings into a successful manifest. Reject unsupported chart enums for explicit selection/inspection while preserving legacy omission semantics; this is model-selection validation, not a claim of history admission. |
| ○ Not done — incorrect focused fixture status | The focused fixture expects the snapshot status `certified`, but the preserved public snapshot contract emits `certified_complete`. Correct the fixture expectation rather than the production result. |

✓ Done — Every inspected request-bearing public entry has direct or transitive selection admission before scientific computation. In particular, common-domain chart calls the guarded public snapshot first; an earlier request to add an explicit guard was a clarity suggestion, not an actual bypass. Certificate-only continuation remains within its original scope. Provider evaluation also admits its own context, preventing use of a previously obtained canonical provider with a noncanonical request.

✓ Done — The capabilities/inspection boundary explicitly labels the source/plan manifest as descriptive and v7-unbound, the graph as descriptive, and Surface/restricted/implicit/v2/checkpoint capabilities unavailable. The CLI does not parse a new evolution request or alter Borg framing. Its arbitrary option rejection and duplicate-option handling are present.

○ Not done — Final review depends on integration of the remaining findings and rebuilt focused receipts. Canonical parity must exclude timing diagnostics, retain full deterministic root/history/checkpoint comparison, and keep the existing independent scientific reference unchanged.

## Revised Stage A source verification

✓ Done — Subsequent direct reads of EquationPlan.cpp verify rejection of a second exponent sign after plus, while preserving exact digit/exponent normalization without binary64. EquationProvider.cpp now rejects unknown chart enums for explicit selections. The focused fixture uses the existing complete snapshot status and adds the malformed exponent negative control. Common-domain chart has an explicit admission guard in addition to its already guarded first snapshot call.

✓ Done — Subsequent direct reads of EquationSourceIdentity.cmake and the target include paths verify dependency tracking for compiler, MPFR/GMP libraries and both headers; the configuration preimage now includes architecture, sysroots, compiler target and linker flags. Multi-config generators produce a header per configuration with the corresponding build type and compiler flags, and the library uses the matching configuration include directory. The claim remains descriptive source/configuration provenance, not complete executable binary identity or v7 binding.

✓ Done — No remaining source-review blocker was found in this bounded Stage A diff after these corrections. This disposition concerns the inspected provider/plan/registry, guarded public seams, source/configuration generator and read-only CLI. Runtime acceptance still requires the implementation agent's rebuilt receipts, including independent-reference outcomes; none is inferred from source inspection alone.

## Final scoped Stage A acceptance review

✓ Done — This reviewer independently inspected the named supervised leases and stdout/stderr logs in the [Stage A receipt](equation-provider-stage-a-inventory-2026-10-10.md). Eight inspected leases are completed with exit zero. The focused provider output reports 102 guard rejections, canonical snapshot/evolution/resume parity, v7 byte parity, worker-count parity and zero publication callbacks. The selected unchanged unittest run reports six tests passing; its retained argument list selects static/superfield and binary interaction oracles, checkpoint continuity/tamper checks, joint precision, event fallback and cancellation. Direct source reads confirm the first two selected methods call the separately implemented oracle, and scoped `git diff --name-only` reports no changes to that test file or scripts/eom/oracle in this checkout. This is a bounded unchanged-reference result, not acceptance of every existing test or every future provider.

✓ Done — A separately executed reviewer Node check ran SHA-256, ordered-JSON, timing-projection and negative-status controls before reading target records. It independently matched the before/after canonical fixture's complete deterministic projection, excluding only fields ending in `_wall_seconds`, and verified that the retained baseline copy equals its supervised stdout. It also independently matched current compiled model/plan hashes, all source-inventory hashes, source/configuration preimages, combined build identity and scientific definition digests. Model/plan targets are longer than a single SHA block and are checked against Node crypto. This checks content identity and migration parity; it does not make the baseline an independent scientific oracle.

✓ Done — The same reviewer check inspected compiled Debug and Release capability outputs and their configuration preimages. Source digests agree; configuration/build digests differ. The retained build stdout shows the intended per-configuration provider/registry objects and inspection executable being compiled and linked. This supports the declared multi-config identity boundary without claiming binary-byte identity.

✓ Done — Direct reads of current EOM manuscript/design/queue and Surface status owners distinguish completed Stage A and SURFACE-001 design/review from unavailable constrained numerics, restricted domains, v2 transport/checkpoints and the app. EOM-007 remains open. No unsupported capability or scientific confinement claim was found in that scoped account.

**Acceptance disposition:** the reviewed canonical-only Stage A is complete at its stated boundary. No remaining blocker was found in the inspected implementation, final identities, retained focused compatibility checks or owner integration. Later Surface numerical acceptance still requires Stage B constrained solution/enclosure and full dense-history/root/error controls. A changed numerical source, non-timing baseline discrepancy, admitted unsupported selection, v7 compatibility difference or mismatched retained identity falsifies the corresponding Stage A receipt and requires its scoped revalidation. A definition-only metadata refresh requires its identity rebuild/check; it does not by itself justify repeating unchanged numerical campaigns.

The multi-block hash scope above is measured by a separate Node byte-length read of current CLI inspection: compact model JSON is 2035 bytes and compact plan JSON is 977 bytes, each exceeding the 64-byte SHA-256 block size. This size observation supports only that scope, not a performance claim.

## Stage B review: solution inclusion and dense-history obligations

The operator selected Stage B implementation after Stage A. This independently authored assessment preserves the canonical baseline and reviews a constrained ordinary interval route. Source observations are measured by direct reads of candidate construction, ordinary endpoint correction, atomic step-doubling/error inflation and endpoint recertification in CoupledEvolution.cpp, plus History.hpp. The ordinary route propagates start/end acceleration radii into a cubic, settles endpoint acceleration, inflates by coarse/fine discrepancy and recertifies the endpoint. These operations do not by themselves bound the constrained acceleration or truncation defect at every intervening time. Dense surface/tangent residual checks likewise establish geometry of an enclosure, not existence/inclusion of the dynamical solution. The Stage B route needs an additional validated time-slab certificate before publication.

### A sufficient bounded ordinary route

Use the existing host to construct a candidate cubic $\mathbf p$ on $[t_0,t_0+h]$, with candidate velocity $\mathbf q=\mathbf p'$. Certify an error tube componentwise or in a declared norm, $\|\mathbf X-\mathbf p\|\le r_x$ and $\|\mathbf V-\mathbf q\|\le r_v$, for every path and the entire slab. The mathematical acceleration field is

$$
F(T,\mathbf X,\mathbf V;\mathcal H)=P(\mathbf X)\mathbf A(T,\mathbf X;\mathcal H)-\frac{\mathbf V^{\mathsf T}H(\mathbf X)\mathbf V}{\|\mathbf g(\mathbf X)\|^2}\mathbf g(\mathbf X),
$$

where $\mathcal H$ is the already accepted/prepared past. A first supported method-of-steps domain may require all active positive-delay roots throughout the tube to satisfy $S<t_0$. Then no unknown current-slab source history enters this field. Any root that reaches uncertified/evolving source data halts or requires a separately implemented general delayed integral certificate; it cannot use a nominal future cubic as if already accepted.

Assume the complete ordinary root chart, regular geometry tube and locally Lipschitz field are certified on that slab. Let initial state errors be $e_x,e_v$ and enclose the complete defect

$$
D\ \ge\ \sup_{T,\,(\mathbf X,\mathbf V)\ \mathrm{in\ tube}}\|F(T,\mathbf X,\mathbf V;\mathcal H)-\mathbf p''(T)\|.
$$

For the integral map, sufficient tube self-inclusion is

$$
r_v\ge e_v+hD,\qquad r_x\ge e_x+he_v+\tfrac12h^2D.
$$

These bounds include initial uncertainty and all numerical rounding, root, interaction and geometry enclosures. They are not obtained from start/end acceleration widths. Strict headroom is a practical robust acceptance condition; exhaustion requires subdivision/refinement or a named failure. Uniform per-segment history radii may store these bounds, even if time-dependent radii would be tighter. Accepted past uncertainty enters the evaluation of $F$ and its defect rather than being omitted from the tube.

A contraction certificate must use the actual integral map and declared state norm. If acceleration Lipschitz bounds are $L_x,L_v$, its second-order block bound is

$$
K=\begin{pmatrix}\tfrac12h^2L_x&\tfrac12h^2L_v\\hL_x&hL_v\end{pmatrix}.
$$

For positive weights $w_x,w_v$, a sufficient contraction constant is

$$
k=\max\left(\tfrac12h^2(L_x+L_vw_v/w_x),\ h(L_xw_x/w_v+L_v)\right)<1.
$$

Choosing $w_x=hw_v$ gives the sufficient condition $h^2L_x+hL_v<1$. A bare $h(L_x+L_v)$ is not this certificate. Apply this bound to the population-wide coupled block norm if sources inside the slab are ever admitted; the current bounded route avoids that dependency by method-of-steps. The contraction and self-inclusion establish an included unique fixed point for the supplied exact past and initial datum. Uniform certificates over a family of admissible pasts establish inclusion for each member, not a claim that every arbitrary curve inside a positional box is a valid past.

Because the displayed off-surface extension satisfies $\mathbf g\cdot F+\mathbf V^{\mathsf T}H\mathbf V=0$ throughout its regular tube, the exact included solution satisfies $d^2\phi(\mathbf X)/dT^2=0$. Exact prepared initial conditions $\phi(\mathbf X(t_0))=0$ and $\mathbf g\cdot\mathbf V(t_0)=0$ therefore preserve the surface constraint. Small initial residuals are not equivalent: they yield a linearly drifting $\phi$, not an exact surface trajectory. The preparation certificate must identify and verify the exact underlying surface-consistent initial curve/datum.

### Whole-slab causal chart

A particularly tractable bounded route requires a certified source speed bound below one on the actual underlying history, with $c_f=1$. For

$$
f(T,\mathbf X,S)=T-S-\|\mathbf X-\mathbf X_s(S)\|,
$$

one has $\partial_S f=-1+\mathbf n\cdot\mathbf V_s<0$ away from coincidence. Uniform opposite endpoint signs over the complete reception/state tube and a root interval strictly before $t_0$ establish exactly one partner root for each admitted reception/state, with the retained complement separately accounted. Bound separation and $1-\mathbf n\cdot\mathbf V_s$ away from zero over that complete root tube. Do not infer those bounds from endpoint snapshots. Root number, source-segment joins, retention/memory coverage and all self/partner accounting remain part of admission. An oldest retained sign is not by itself a theorem about unknown earlier history; preserve the existing finite-history obligation or prove a surface-diameter/history-window exclusion under its declared assumptions.

For a self history with an exact $C^1$ curve and speed bounded strictly below one across the entire relevant interval, integration gives $\|\mathbf X(T)-\mathbf X(S)\|<T-S$ for $S<T$, hence no positive-delay self root. This is a derived exclusion with continuous-history and uniform-speed premises, not self suppression. The coincident endpoint retains its existing separate rule. The same speed premise must hold over the exact solution tube and every crossed prepared/accepted join. An unrestricted selected regime can have this limited qualified numerical chart; it must report unavailable continuation when the chart fails without clamping velocity or presenting a new speed law.

The receiver-position sensitivity used for interaction Lipschitz bounds needs the true source acceleration along root intervals. The derivative of a nominal cubic is insufficient when only position/velocity errors are certified. Analytic preparation can supply a true acceleration enclosure; subsequently evolved histories require explicit validated acceleration carriers. A first implementation may halt when a root leaves that analytic certified domain, with its capability and accepted coverage labeled accordingly. It must not advertise unrestricted interacting continuation from that limited route.

### Full-segment geometry certificates

Evaluate state/history enclosures, including their reconstruction errors, over every covering time cell. For a sphere, the distance is exactly $|\|\mathbf y\|-R|$. For an oblate spheroid with $u=\mathbf y^{\mathsf T}D\mathbf y>0$, radial projection $\mathbf z=\mathbf y/\sqrt u$ lies on the surface, so

$$
\operatorname{dist}(\mathbf y,\Sigma)\le\|\mathbf y-\mathbf z\|=\|\mathbf y\|\,\frac{|\sqrt u-1|}{\sqrt u}.
$$

This is a valid upper bound, not a nearest-point assertion. For the ring torus, on the admitted tube with $\rho=\sqrt{y_1^2+y_2^2}>0$, distance is $|\sqrt{(\rho-L)^2+y_3^2}-r|$. The closest point lies in the same meridional plane, and $L>r$ keeps its radial coordinate positive. These identities/bounds provide independently derived alternatives to an unproved $|\phi|/\|\mathbf g\|$ estimate.

The normal velocity component at each enclosed state is bounded by $|\mathbf g\cdot\mathbf V|/\|\mathbf g\|$, using a positive gradient-norm lower bound and all errors. Distinguish a level-set tangent residual at an off-surface approximate state from an exact constraint on the included solution. Subdivide until the full slab is covered or report failure; finite sample agreement is insufficient. Pose/orientation must identify an actually orthogonal underlying frame, not a merely approximately orthogonal matrix inferred from interval overlap.

### Validated source-acceleration carrier

Recommend an EOM-owned, versioned per-path/per-segment carrier separate from nominal polynomial differentiation. Bind it to exact history fingerprint, segment time tokens and index, resolved equation/geometry identity, complete included state tube, a full-time acceleration enclosure, proof method and inclusion certificate identity. Record derivative capabilities explicitly; the initial canonical receiver-position sensitivity requires true source acceleration, while future kernels may require higher derivatives. Analytic preparation carriers bind the underlying analytic evaluator and its exact parameters/domain. Computed carriers bind the validated field enclosure $F(\mathrm{tube})$ used by that segment's inclusion proof.

A request-side dictionary keyed only by path id or nominal endpoint is insufficient. The host publishes history and carrier atomically, checks coverage across every root interval and join, and rejects missing/stale/mismatched carriers. Caller-supplied acceleration numbers without their verified certificate cannot become accepted source derivatives. No true-acceleration bound follows from arbitrarily small position/velocity error alone: high-frequency perturbations can have small position/velocity amplitude and unbounded acceleration. This mathematical obstruction is why the carrier is necessary.

Stage B may use in-memory carriers under a precisely limited non-restart capability. Surface cannot use v7 to save/resume incomplete carrier state or relabel those histories canonical. Provider-aware persistence remains Stage C. The legacy canonical path and its history fingerprints stay unchanged when no carrier/constraint is selected.

**Stage B disposition:** the bounded method-of-steps/analytic-past route is mathematically sufficient when every stated full-slab, regularity, preparation and contraction obligation is actually certified. Geometry modules, dense residual checks and endpoint correction alone remain insufficient. This review supplies a proof route and receiving interfaces; it is not a measured claim that the implementation already executes it. Missing source-acceleration coverage, a root reaching the uncertified slab, failed tube inclusion or a failed full-segment geometry certificate must stop publication.

A necessary self-root qualification is that the speed exclusion applies to one coherent joined $C^1$ path. Independent Cartesian receiver and history error boxes do not encode that coherence. One rigorous implementation is an explicitly proved reduction: validate the partner-only constrained ODE, prove the included exact solution joins the exact prepared past and stays below wake speed, and then derive that it has no positive-delay self roots and is consequently a solution of the complete selected canonical equation. Another route supplies a coherent trial-history space. Neither route may relabel arbitrary point-box root omission as complete canonical accounting; the solution-domain self-exclusion theorem and its premises must be recorded.

Surface output must additionally bind its selected equation/constraint identity and distinct constrained evidence. The shared C++ host/certificate container does not license inherited canonical acceptance flags; v1 Borg evidence and v7 checkpoint operations remain unavailable for Surface until their explicit successor contracts exist. The first qualified chart can be ordinary sharp, below wake speed and restricted to analytically certified source-emission intervals while still selecting unrestricted speed: failure of that numerical chart is a halt, not a speed clamp or an imposed ceiling.

## Stage B implementation review — first source disposition

This reviewer read the new SurfaceGeometry, SurfaceConstraint, SurfacePublication and SurfaceEquationProvider implementations, the exported headers, the coupled atomic-publication integration and checkpoint guards. The review is read-only on the implementation and analytical control; the findings below arise from direct source inspection rather than inferred test failures. The integral-map certificate uses the reviewed second-order self-inclusion bounds and weighted contraction constant $h^2L_x+hL_v$, evaluates all 64 covering time cells including reconstruction errors, and obtains receiver-position derivatives from the existing sharp sensitivity calculation plus interval differentiation of the constraint. Its partner-root threshold bisections preserve uniform endpoint signs and require roots strictly before the accepted atomic start. Its immutable linked carrier binds the model and complete history fingerprint and supplies bounded true acceleration from earlier validated slabs. These are the appropriate proof seams, conditional on valid initial analytical reconstruction and exact population admission.

| Finding | Required correction and falsifier |
|---|---|
| ○ Not done — initial analytical reconstruction premise | The existing circular factory evaluates Hermite endpoints/coefficient arithmetic in binary64 and adds fixed epsilon-scale roundoff radii. Its exact token-defined circular evaluator can disagree by order one for large exact phase/time parameters; surface residual tests cannot detect wrong phase. Stage B must independently certify that the entire exact analytical preparation is enclosed by the stored cubic position/velocity tubes, or establish a rigorous restricted admission with the same obligation. A validated Hermite reference using exact interval analytical endpoint states, coefficient differences and a proved derivative remainder is one suitable route. Keep the canonical factory unchanged. An admitted preparation whose analytical curve escapes its retained error tube falsifies the inclusion/root/derivative proof. |
| ○ Not done — exported population admission | certify_surface_publication checks path counts and looks up ids, but does not require unique ids and exact equality with the request population. Repeated authentic input/candidate paths can omit another source and validate a different population. Require exact nonempty unique id sets before proof evaluation. An accepted duplicate/missing population falsifies the completeness claim. |
| ○ Not done — checkpoint cross-model source guard | create_native_evolution_checkpoint guards the request's provider but not the source certificate/history provenance. A Surface result supplied with an otherwise canonical request can lose its carriers and acquire a canonical v7 fingerprint. Reject Surface schema/evidence/carriers even when the request is canonical. Successful cross-request Surface-to-v7 checkpoint creation falsifies the stated Stage C boundary. |
| ○ Not done — new evidence resource scope | estimate_coupled_working_set_bytes counts original tokens/path/pair workspace and does not include growing Surface carrier/certificate diagnostics. Bound the new evidence under an explicit finite run budget or narrow and separately enforce its resource contract. Also select the Surface evolution schema on the early memory-budget halt branch. A Surface memory halt with canonical schema or evidence growth excluded from a claimed memory admission bound falsifies that scope. |

The named preliminary Surface lease 6f207b07-0e6d-49a9-a51e-29611491f017 was independently read as completed with exit zero and empty stderr, after the named rebuilt lease. Its stdout reports sphere, oblate and ring-torus two-step circles and geometry/dense negative controls. The current fixture source also contains subsequently added interacting, carrier, cache, thread and cancellation checks; those later additions are not inferred to have run from the earlier stdout. The three circle controls are independent analytical inclusion cases. An interacting smoke run is architecture/numerical proof execution evidence, not an independently known interacting trajectory.

**Interim disposition:** Stage B's proof construction is promising and consistent with the reviewed bounded route, but acceptance remains open on the explicit initial reconstruction and public mode/population guards above. No endpoint-only argument is used to close those obligations.

### Independent analytical Hermite reconstruction lemma

Let $H$ be the exact cubic Hermite interpolant of one scalar analytical coordinate $f$ and its first derivative at $0,h$, with $h>0$ and $|f^{(4)}|\le M_4$. The exact Hermite remainder gives $|f(t)-H(t)|\le M_4 t^2(t-h)^2/24\le M_4h^4/384$. The velocity bound can be proved separately without differentiating a remainder whose intermediate point depends on time. Put $e=f-H$. Its endpoint conditions are $e(0)=e(h)=e'(0)=e'(h)=0$. Rolle's theorem supplies $c\in(0,h)$ with $e'(c)=0$. The degree-two interpolation remainder for $e'$ at the three nodes $0,c,h$ therefore yields

$$
e'(t)=\frac{e^{(4)}(\xi)}6\,t(t-c)(t-h),\qquad |e'(t)|\le\frac{M_4h^3}{24},
$$

where the node cases have zero error, and otherwise the usual intermediate-point formula applies. The bound follows from $|t-c|\le h$ and $t(h-t)\le h^2/4$. Thus the proposed larger velocity remainder $M_4h^3/8$ is safely conservative. For the token-defined circular preparation, rigid rotations preserve the norm of its fourth derivative, so $M_4=\rho|\omega|^4$ bounds every coordinate including tilted circles.

An implementation can enclose the ideal Hermite coefficient intervals from exact analytical endpoint position/velocity enclosures at the exact retained segment tokens, bound the difference between those ideal coefficients and the stored coefficients over the full local $[0,h]$, and add the remainders above. Comparison against the retained position/velocity error tokens proves the needed analytical reconstruction premise. Every arithmetic step, duration and parameter must use outward interval bounds. This proof is independent of the old factory's nominal binary64 coefficient construction and does not require changing it.

The population obligation also applies to SurfaceEquationProvider::evaluate, because its selected_model_identity binds the full request while its root population comes from the separately supplied context.histories. Exact population admission is required before emitting a complete snapshot with that identity. The public provider.evaluate seam must also independently reject canonical consumption of Surface carriers; a guard only in the snapshot convenience wrapper can be bypassed by direct provider use.

### Revised Stage B source verification

✓ Done — Direct subsequent reads of SurfaceConstraint.cpp show an analytical reconstruction proof over every original segment: exact interval endpoint data, ideal Hermite coefficient enclosures, stored-versus-ideal coefficient bounds and the independently derived position/velocity remainders $M_4h^4/384$ and $M_4h^3/24$. These are compared against the lower bounds of retained error tokens. The factory itself is unchanged. Exact factory-domain endpoints are required; unsupported appended preparations fail closed. The current exact endpoint equality additionally rejects some decimal endpoint requests whose unchanged factory rounds its mesh endpoints; that is an admission limitation, not a correctness defect.

✓ Done — Surface publication and Surface snapshot evaluation now require exact unique nonempty population id sets. Checkpoint creation rejects constrained schema/evidence and Surface carriers under a canonical request. The canonical provider's own public evaluate rejects those carriers, in addition to the convenience snapshot guard. These changes close the inspected direct-call bypasses.

✓ Done — surface_request_identity now uses escaped structured JSON, binding compiled build and scientific-definition digests, shape, coupling, normalized wake speed and original path/history identities. The linked evidence chain remains immutable and atomically created with accepted retained history. Existing v7 binding/bytes remain separate.

✓ Done — The early resource halt selects the constrained evolution schema, and Surface's admission estimate reserves a finite allowance for new persistent/duplicated diagnostics and temporary proof workspaces based on max_step_attempts, population and id storage. This is an admission estimate, not measured resident memory or a universal allocator bound.

**Revised source disposition:** no remaining mathematical or mode/population blocker was found in the inspected bounded Stage B route after these corrections. This statement is source/proof review only. Final measured qualification remains dependent on rebuilt final fixtures, unchanged canonical parity/reference outcomes and honest owner/capability scope. Surface remains ordinary sharp, coherent subwake and strictly past-root method-of-steps, with exact admitted analytical circular preparation and in-memory carriers; this review does not qualify generic preparations, joint/finite-width routes, restricted-speed laws, persisted continuation or an application.

## Final scoped Stage B acceptance review

✓ Done — This reviewer independently read the completed final numerical build and fixture leases named in the [Stage B record](equation-provider-stage-b-2026-10-10.md), including the six unchanged Python methods under the shared venv. The unittest receipt cb0b385e-e33f-486b-942f-053ad1825e5a reports all six methods passing in 23.964 seconds. The selected static/superfield and binary methods use the independently authored interaction oracle. Scoped `git diff --name-only` reports no changes to that test file or scripts/eom/oracle. Those results establish the named canonical reference/compatibility boundary, not independent interacting Surface trajectory acceptance.

✓ Done — The subsequent label-only rejection-schema correction was independently read in rejected_step, and the refreshed build f531f90e-d09b-452c-b5da-14453716a9b5 and refreshed Surface, canonical and provider leases ca22f4a7-0c8c-4d18-8677-d4873e9e9846, 4035efaf-6bbc-4fee-9bf2-f75514b72c27 and 8e2673be-373e-49c6-a5a8-51bead862f90 were independently read as completed with exit zero and empty stderr. Surface stdout reports two accepted steps on each of the three circle controls, 25 accepted computed-source carrier steps, interacting/thread/mode/cancellation checks and dense geometry/preparation negatives. Provider stdout reports 102 guard rejections and canonical snapshot/evolution/v7/resume/thread parity. The retained earlier six-method Python result remains applicable to that label-only change; no numerical implementation change is inferred from a schema correction.

✓ Done — Direct reads of the final fixture and SurfaceSolutionCertificate root records show checks of uniformly positive lower residual, uniformly negative upper residual and positive transmitter factor on every retained partner slab. The 25-step control explicitly requires a root whose acceleration source extends beyond analytical preparation, so it exercises accepted computed-history derivative carriers. Its radius 0.1, angular speed 0.1, speed 0.01 and coupling $10^{-6}$ are explicit fixture assumptions. The failed faster case is not accepted by adjusting a production gate; its narrower-domain continuation result remains an engineering control without an independently known interacting trajectory.

✓ Done — Separately executed read-only reviewer Node checks passed known SHA-256, ordered-JSON, timing projection and negative-status cases before target reads. They matched the refreshed canonical payload against the original pre-Stage-A baseline, excluding only keys ending `_wall_seconds`; checked all 74 current source inputs, configuration/source/build preimages, definition hashes and canonical/Surface manifest/plan hashes; and confirmed distinct sphere/oblate/torus model identities. Current source/build digests are `9a9a24be46cdd7cffca8fde9a90bef9ce34ae75bd5861b99cbdfbb21eee49ad3` and `e88e4e471445e79acc04ddba86b612de95858075a7fb81ea1516a3e09fd78e2c`. The current CoupledEvolution.cpp hash matches its generated input receipt, including the quadratic population allowance for newly retained partner-root records. No resource-only edit was outstanding after the final numerical fixtures; a reviewer follow-up based on the earlier allowance was corrected by this current source/hash inspection.

✓ Done — Direct reads of current EOM/Surface manuscripts, README capability boundaries and the Stage B evidence owner retain the restricted ordinary proof domain and exact preparation admission, distinguish independent circle controls from interacting implementation checks, and leave Stage C provider-aware transport/checkpoints/restricted-speed policies, Stage D independently qualified interacting 3:3 research and Stage E app delivery open. Live capabilities identify Surface as implemented through typed C++, with independentlyAccepted=false, checkpoint=false and wireEvolution=false. Outer typed containers carry constrained schemas, with selected model identity in snapshots and immutable history carriers. No physical confinement, stability, assembly formation, energy law or cost advantage follows from this receipt.

**Acceptance disposition:** the inspected Stage B implementation is complete at its bounded typed-C++ engineering and mathematical proof boundary. The separately derived geometry, Hermite preparation, coherent subwake root reduction and second-order Picard route provide independent mathematical justification; rebuilt focused controls execute the corresponding gates and preserve the tested canonical behavior. No remaining blocker was found in the reviewed subject and its refreshed receipts. This disposition does not close the interacting 3:3 scientific gate or later delivery stages. An accepted unproved preparation, missing/stale carrier, incomplete population, failed full-slab root/inclusion/contraction or dense geometry premise, cross-model checkpoint/cache admission, non-timing canonical discrepancy or compiled identity mismatch falsifies its corresponding scoped qualification and requires revalidation. Any later numerical source change requires its own bounded review/checks; document-only owner closure is not a numerical rerun obligation.
