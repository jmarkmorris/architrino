# EOM Evolution Contract v0

## Status

- Contract id: `eom_evolution_contract/v0`
- Stage: `requirements-frozen`
- Claim level: `priority-design`
- Implementation status: `native-correctness-nucleus-and-borg-shadow-executable; production-conformance-open`
- Model binding: frozen `master_eom_binding/v0`
- Optional long-term scale amendment: [`eom_evolution_contract/v0/amendment-1`](evolution-contract-v0-amendment-1-million-path-scale.md); required only when a request or result claims the million-path profile
- Initial-data type: continuous retained history functions only
- Change control: revisions require an explicit contract amendment or successor version
- Existing central solver: preserved for dependency compatibility and ineligible for this contract

## Defining Invariant

A conforming EOM implementation generates each accepted trajectory segment from the causal roots of the retained trajectory history that the same run has actually accepted.

No prescribed future path, display force, guidance acceleration, damping, boundary relaxation, undeclared softening, or self-assigned evidence label can substitute for this closed loop:

$$
\text{accepted history}
\longrightarrow
\text{causal roots}
\longrightarrow
\text{canonical acceleration}
\longrightarrow
\text{coupled accepted state}
\longrightarrow
\text{extended accepted history}.
$$

## Canonical Per-Root Calculation

For receiver $i$ at absolute time $T$, source $j$, and every admitted emission time $S<T$ satisfying

$$
\left\|\mathbf X_i(T)-\mathbf X_j(S)\right\|=c_f(T-S),
$$

define

$$
r_{ij}=\left\|\mathbf X_i(T)-\mathbf X_j(S)\right\|,
\qquad
\widehat{\mathbf r}_{ij}
=
\frac{\mathbf X_i(T)-\mathbf X_j(S)}{r_{ij}},
$$

$$
D_{s,ij}=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(S),
\qquad
D_{T,ij}=c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_i(T),
$$

and, on a certified simple-root chart,

$$
m_{ij}=\frac{D_{T,ij}}{D_{s,ij}},
\qquad
W_{ij}^{\mathrm{rec}}=\left|m_{ij}\right|.
$$

The accepted acceleration is

$$
\boxed{
\mathbf A_i(T)=
\sum_j
\sum_{S\in\mathcal C_{ij}(T)}
\kappa\,\sigma_{ij}|q_iq_j|
\frac{W^{\mathrm{rec}}_{ij}(T;S)}
{r_{ij}^{2}(T;S)}
\widehat{\mathbf r}_{ij}(T;S)
}.
$$

The `master_eom_binding/v0` record must pin the exact canonical source for this equation, $\kappa$, $c_f$, polarity convention, charge unit, causal-surface regulator $\eta$, core regulator $\epsilon_c$, coincident-endpoint convention, finite-history rule, branch aggregation, and caustic route.

## Request Contract

### Run Identity

| Field | Requirement |
| --- | --- |
| `contract_id` | Exactly `eom_evolution_contract/v0`. |
| `contract_amendment_ids` | Ordered amendment ids applicable to the request. Million-path conformance includes `eom_evolution_contract/v0/amendment-1`. |
| `run_id` | Unique immutable identifier. |
| `model_binding_id` | Content-addressed `master_eom_binding/v0` record. |
| `input_hash` | Hash over every history, model, numerical, precision, and resource input that can change the result. |
| `absolute_time_interval` | Finite $[T_0,T_1]$ with $T_1\ge T_0$. |

### Initial Data: Retained History Functions

For every path $i$, the request must provide a continuous evaluable history function on $[T_0-h_i,T_0]$ containing position and velocity. This is the initial-data type of the problem, not an optional enhancement to an instantaneous state. Position and velocity at $T_0$ are endpoint evaluations of the history function and are insufficient by themselves. Ordered samples are acceptable only when the request also supplies a declared interpolant that produces the required continuous history and carries a certified interpolation error bound.

Each history record contains:

- path identity and polarity/charge;
- coverage start and end times;
- ordered samples or segment coefficients;
- position and velocity representation;
- interpolation method and version;
- numeric representation and precision;
- interpolation and source-data error bounds;
- scale map and coordinate/time origin;
- provenance and content hash.

There is no instantaneous-state-only EOM request variant. The request contains no future state, segment, coefficient, target, constraint, or display curve for $T>T_0$.

### Numerical Controls

The request declares:

- fixed, adaptive, event-focused, individual-path, or grouped multirate mode;
- initial, minimum, and maximum steps;
- state, local-truncation, root-residual, interpolation, synchronization, and event tolerances;
- maximum correction iterations, rejected steps, and event subdivisions;
- root-continuation and independent-recovery scan policies;
- history-boundary clearance requirement;
- precision ladder, condition thresholds, escalation limit, rounding policy, and certification requirements;
- $\eta$ and $\epsilon_c$ values and refinement posture;
- deterministic/reproducible reduction policy;
- checkpoint and output cadence;
- CPU, accelerator, memory, storage, and execution limits.

`integration_tolerance` or its versioned replacement is operational: exceeding it rejects or refines a candidate step. A tolerance value that appears only in metadata is nonconforming.

## Accepted-Step State Machine

For every candidate receiver event, a conforming implementation must:

1. create one immutable view of the last accepted coupled state and retained histories;
2. account for every ordered pair $(i,j)$, including every self-pair;
3. continue known simple roots using $dS/dT=D_T/D_s$ when their chart remains valid;
4. independently scan certified intervals for new, missed, merged, or disappearing roots;
5. certify history coverage and root completeness before force accumulation;
6. compute $r$, $\widehat{\mathbf r}$, residual, $D_s$, $D_T$, $m$, $W^{\mathrm{rec}}$, polarity, charge product, regulator state, and acceleration for every consumed root;
7. route folds and caustics through the finite-width causal-surface equation and finite-impulse treatment rather than evaluating an infinite pointwise force;
8. sum the canonical acceleration under the declared deterministic/reproducible reduction policy;
9. advance all paths from the same immutable accepted state;
10. estimate error, correct or subdivide events, and accept or reject the complete coupled candidate;
11. append no candidate state or history row until the coupled step is accepted;
12. atomically append the accepted state and all continuation-critical root, regulator, controller, and provenance records.

Updating one path early and using its candidate value to advance another path in the same nominal step is prohibited.

## Ordered-Pair And Self-History Rule

Every ordered pair remains inside the logical interaction domain at every accepted receiver event. A pair must resolve to an explicit active, inactive, excluded-coincidence, or unresolved record, or to a certified exclusion/aggregation record whose membership and error bound resolve back to the pair.

The $j=i$ path uses the same causal-root and acceleration machinery as partner paths. The coincident endpoint $S=T$ is excluded by the model binding; every admitted earlier same-source root is retained. A one-path request is valid and must exercise self-history behavior.

The supported velocity domain includes $\|\mathbf V\|<c_f$, $\|\mathbf V\|=c_f$, and $\|\mathbf V\|>c_f$. Equality with $c_f$ is not alone a singularity. Actual $D_s$, $D_T$, root, fold, caustic, and receiver-normal geometry determine the numerical route. Super-field-speed curved histories may have multiple self-roots; constant-velocity straight-line super-field-speed motion is a required zero-nontrivial-self-root control.

## Root Completeness And History Coverage

The engine must isolate every admitted causal root in the retained interval, not merely the newest, nearest, easiest, or lowest-residual root. Root continuation accelerates known-branch work but never replaces independent recovery scans.

Every root-search record must identify:

- the searched emission-time interval;
- interval arithmetic, monotonicity, subdivision, sign, polynomial, or other completeness method used;
- isolated root brackets and achieved residual/enclosure;
- inactive gaps and boundary clearances;
- roots continued from prior events;
- new, merged, split, disappeared, or unresolved roots;
- certification status and precision path.

If a possible root reaches the retained-history boundary or completeness cannot be certified, the candidate step fails with `insufficient_history_depth` or `unresolved_root_set`. The contribution is never silently omitted.

## Regularization And Caustics

Softening is prohibited unless it is the regulator explicitly pinned by the model binding. Each affected root records $\eta$, $\epsilon_c$, regulator version, chart, refinement level, and whether the row is sharp-simple, finite-width, fold-transit, core-regularized, or failed.

The sharp quotient $D_T/D_s$ is consumed only on a certified simple-root chart with the required source-normal floor. A fold or caustic triggers event refinement and the finite-width causal-surface calculation. The integrator records the transition and finite velocity impulse. Persistent degeneracy, unsupported higher-order strata, simultaneous regulator failure, or failure of the regulator-convergence policy rejects the candidate step or halts the run.

## Precision And Adaptivity

Step size, event subdivision, and precision respond to:

- force and local-truncation variation;
- root residual and bracket width;
- small $|D_s|$ or $|D_T|$ and poor quotient conditioning;
- source or receiver field-speed crossings, followed by evaluation of the actual pair geometry;
- root birth, death, merge, split, or caustic proximity;
- close approach and regulator activation;
- retained-history interpolation error;
- multirate synchronization error;
- large reduction error or cancellation.

The implementation nondimensionalizes, changes local coordinate/time origins, or escalates precision when ordinary hardware arithmetic cannot certify the requested result. It may never silently lower precision. Reaching the declared maximum precision without certification rejects the candidate step or halts the run.

## Response And Evidence Contract

Every acceleration used by an accepted or rejected step must be reconstructible from emitted records produced by the same calculation. A diagnostic recomputation after evolution is not a substitute.

### Per-Root Record

| Field group | Required content |
| --- | --- |
| Identity | Run, attempted-step, receiver, source, ordered-pair, root, branch, and history-segment identities. |
| Time | Emission time $S$, reception time $T$, bracket/enclosure, and searched interval. |
| State | Source state at $S$ and receiver state at $T$, including numeric representation and error bound. |
| Geometry | $r$, $\widehat{\mathbf r}$, causal residual, $D_s$, $D_T$, signed $m=D_T/D_s$, and unsigned $W^{\mathrm{rec}}$. |
| Interaction | $\kappa$, $c_f$, $\sigma_{ij}$, $|q_iq_j|$, regularized inverse-square amplitude, signed vector contribution, and accumulation order/group. |
| Root status | Active, inactive, excluded-coincidence, unresolved, birth, death, merge, split, fold, caustic, or certified-pruned status. |
| Certification | Completeness method, condition estimate, precision path, regulator state, residual/enclosure, and acceptance result. |

### Per-Step Record

The step record contains attempted and accepted times, all input-history hashes, root-set identity, summed acceleration per receiver, error estimate, correction iterations, subdivisions, reduction policy, accepted/rejected status, rejection reason, appended-history identities, and checkpoint transition.

### Evidence Status

| Status | Meaning |
| --- | --- |
| `canonical` | The complete bound Master EOM loop ran, all required histories and roots were complete, every consumed force row used canonical factors, and numerical/regulator acceptance passed. |
| `conditional` | A force, root, or stability calculation was evaluated on prescribed history without evolving that history under this contract. |
| `reference` | An independent comparison implementation produced the result and is not the production authority. |
| `display-only` | Visual interpolation or authored motion produced the output. |
| `failed` | History, root completeness, precision, regulator, integration, storage, or other required control failed. |

Evidence status is derived from recorded capabilities actually exercised. Successful return, entrypoint name, backend identity, or caller request cannot set it directly.

## Required Failure Codes

The first contract version must distinguish at least:

- `insufficient_history_depth`;
- `unresolved_root_set`;
- `root_completeness_not_certified`;
- `unsupported_caustic_or_singular_chart`;
- `regulator_convergence_failed`;
- `precision_ceiling_exceeded`;
- `minimum_step_exhausted`;
- `coupled_correction_failed`;
- `nonfinite_state`;
- `resource_envelope_exceeded`;
- `checkpoint_or_storage_failure`;
- `cancelled_at_accepted_boundary`;
- `prohibited_future_path_input`;
- `evidence_reconstruction_failed`.

No failure may publish a rejected candidate state as accepted history.

## Validation Ladder

Before any consumer may use EOM motion for a critical decision, the implementation passes the validations applicable to that consumer's declared envelope. `VAL-01` through `VAL-16` are the base correctness ladder. `VAL-17` and `VAL-18` apply only to a request or capability claim under the optional million-path amendment and do not block bounded-population canonical runs or migrations.

| ID | Validation | Required result |
| --- | --- | --- |
| `VAL-01` | Inertial control | A certified empty active-root set gives exact constant velocity under the declared representation. |
| `VAL-02` | Straight-line self control | Constant-velocity super-field-speed straight motion produces no nontrivial same-source root. |
| `VAL-03` | Manufactured linear roots | Root times, residuals, $D_s$, $D_T$, $m$, and $W^{\mathrm{rec}}$ match the analytic result. |
| `VAL-04` | Circular partner benchmark | Numerical partner roots and acceleration components match the closed form. |
| `VAL-05` | Circular self-hit benchmark | Every signed same-source root, root birth, and $W^{\mathrm{rec}}=1$ row is recovered. |
| `VAL-06` | Accelerating receiver-normal benchmark | A case with $D_T/D_s<0$ reproduces signed orientation and unsigned force weight. |
| `VAL-07` | Symmetric binary benchmark | Complete ledgers satisfy the declared $180^\circ$ symmetry. |
| `VAL-08` | Root-fold benchmark | A root pair appears or disappears with correct signed transition data and finite integrated impulse. |
| `VAL-09` | Step convergence | $dt$, $dt/2$, and $dt/4$ converge at the claimed order. |
| `VAL-10` | History convergence | Increasing retained depth stops changing the result once all causal support is included. |
| `VAL-11` | Regulator convergence | Controlled $\eta$ and $\epsilon_c$ ladders reach the declared limit or fail explicitly. |
| `VAL-12` | Independent oracle | Production results agree with closed-form mathematics or genuinely independent code. |
| `VAL-13` | Ledger reconstruction | Emitted per-root rows reproduce accepted acceleration bit-for-bit or inside a declared rounding enclosure. |
| `VAL-14` | Restart and threading parity | Checkpoint restart and allowed worker-count changes produce equivalent results under the declared policy. |
| `VAL-15` | Input sensitivity | Cases constructed to depend on $c_f$, history depth, tolerance, precision, or regulators change or fail as predicted when each input changes. |
| `VAL-16` | Evidence negative controls | Prescribed-history, display, incomplete-root, zero-wake-with-unproved-inactivity, and failed runs cannot report `canonical`. |
| `VAL-17` | Million-path scale profile | At least $10^6$ continuous retained histories complete the amendment's certified sparse-evolution profile with complete pair coverage and streamed accepted output. |
| `VAL-18` | Block-exclusion parity | Certified block exclusion and exact surviving-pair evaluation reproduce exhaustive controls, while a projected dense noncompressible workload outside the resource envelope fails before candidate publication. |

The independent oracle may not import the production EOM root, interaction, integration, or evidence-classification implementation.

## Binary Outcome Gate

No EOM-backed consumer may decide that a binary spirals inward, spirals outward, reaches a terminal state, or remains stable until one production run supplies:

- both complete initial retained histories;
- both ordered partner root families;
- both same-source root families;
- field-speed and super-field-speed branch transitions encountered by the run;
- all receiver-normal weights and regulator transitions;
- adaptive evolution over the declared many-orbit interval;
- radius, radial velocity, angular velocity, torque, acceleration, and complete root-ledger histories;
- timestep, history-depth, precision, regulator, restart, and worker-count convergence appropriate to the claim.

A terminal circular state additionally requires

$$
\dot R\rightarrow0,
\qquad
\ddot R\rightarrow0,
\qquad
A_\theta\rightarrow0,
$$

plus a stable return map under declared small perturbations. A repeating noncircular state requires finite-period return of the complete retained history and continuation state, not merely position and velocity.

## Compatibility Boundary

Existing streaming, ABI, root, and precision components are reuse candidates only after a contract audit proves their semantics and evidence behavior. No existing component receives EOM authority because its name or output shape resembles this contract.

The current solver remains unchanged while dependencies are inventoried. Its outputs cannot satisfy `eom_evolution_contract/v0`, and its current `canonical_eom_evidence` field remains non-authoritative.
