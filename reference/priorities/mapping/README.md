# Mapping

This directory is the operator and contributor entry point for mapping between $\mathbb{A}\mathbb{A}\mathbb{A}$ and established physics. It explains the purpose of the work, the directory organization, and how to follow a mapping from its starting question to its evidence.

It houses the overview and shared mapping method, without adding a scientific workstream. The `mapping-*` directories remain siblings under `reference/priorities/`, with their own owners and queues. This overview creates no parent queue, rank, score, or acceptance gate. Current status belongs in each owner's `priorities.md` and `work-queue.md`, not in a second status table here.

## What We Are Trying To Do

Mapping develops an explicit connection between the theory's physical ingredients and the successful equations and observations of established physics. The forward direction derives assembly, medium, and observer behavior from polarity, delayed path-history interactions, Euclidean void, and absolute time. The reverse direction asks what tested behavior requires of those underlying structures. The aim is to make these two directions meet in a common mathematical description.

Standard equations enter as effective recovery targets or comparison tools; observations enter as observer-level constraints. Neither licenses importing standard interpretations, laws, or mechanisms as architrino-level premises. The [theory-layer discipline](../../../AGENTS.md#theory-layer-discipline-governs-all-physics-reasoning-in-this-repo) governs both directions.

As the connection develops, mapping also seeks mathematical expressions that describe the derived assembly and path-history structures directly. A useful reformulation explains a relationship, removes an independent assumption, or produces a new checkable consequence while preserving the tested behavior in the claimed regime. Renaming familiar quantities is not sufficient.

Plainly: work upward from the proposed physical ingredients and backward from what nature already does. The goal is an explanation that connects them, including better mathematics where the construction supports it.

## How The Directories Are Organized

The [shared architecture](mapping-method.md#mapping-program-routing) distinguishes equation-first work, benchmark-first work, and domain integration. Cross-domain assessment consumes those results without taking over their derivations.

| Directory | Starting question | Responsibility |
| --- | --- | --- |
| [mapping-equations](../mapping-equations/priorities.md) | What does this equation require, and how can its terms arise? | Exact equation rows, geometric interpretations, comparison residuals, source-field contracts, and equation scores. |
| [mapping-benchmarks](../mapping-benchmarks/priorities.md) | What must be reproduced in this experiment, observation, or solved case? | Case definitions, comparison variables, source provenance, uncertainty and tolerance, independent references, and falsifiers. |
| [mapping-electromagnetism](../mapping-electromagnetism/priorities.md) | Can one assembly, causal-history, and sea description recover the required electromagnetic behavior? | Integration of charge, current, electric and magnetic readouts, induction, radiation, and electromagnetic response. |
| [mapping-standard-model](../mapping-standard-model/priorities.md) | How do particle-sector properties and interactions arise? | Standard Model-facing mass, flavor, gauge, confinement, weak-reaction, and collider recovery obligations within its declared scope. |
| [mapping-quantum](../mapping-quantum/priorities.md) | How do quantum statistics and measurement behavior arise? | Quantum recovery, including measures over outcomes, measurement response, interference, and Bell constraints. |
| [mapping-cosmology](../mapping-cosmology/priorities.md) | Can the same physical account explain the required cosmological observations? | Cosmological inventories and transfer relations connecting source histories to redshift, background radiation, structure, and lensing. |
| [mapping-strong-field](../mapping-strong-field/priorities.md) | How do compact objects and horizon-scale processes connect to quantitative observations? | Strong-field boundary conditions, release channels, event accounting, and quantitative recovery. |
| [mapping-nuclear-atomic-molecular](../mapping-nuclear-atomic-molecular/priorities.md) | How do nuclei, atoms, and molecules acquire their observed behavior? | Higher-assembly mechanisms and recovery targets, with underlying particle and shared-medium dependencies retained by their owners. |
| [mapping-one-nature-many-theories](../mapping-one-nature-many-theories/priorities.md) | How do the domain descriptions connect, and what has actually been explained? | Cross-domain bridge assessment, scope and completeness boundaries, and historical synthesis. |
| [mapping-open-problems](../mapping-open-problems/priorities.md) | Which public open problems have a defensible explanation to present? | Selection and claim grading for the open-problems account, consuming scientific results rather than owning a second derivation queue. |

Plainly: equations specify mathematical requirements, benchmarks specify concrete comparisons, and domain work asks whether one construction satisfies several requirements together. The last two directories assess and explain the connections. Their presence in this map does not mean every workstream is active or every target is recovered.

### What Mapping Benchmarks Means

A benchmark is a specified case against which an explanation can be checked. Here it can be an experiment, an astronomical observation, or a solved mathematical comparison. A packet must distinguish which kind it uses: agreement with a solved formula is not itself a measurement of nature.

For example, the directory contains [clock and gravitational-redshift tests](../mapping-benchmarks/gravitational-redshift-clock-tests.md), [interference](../mapping-benchmarks/double-slit-mach-zehnder.md), [Zeeman spectral splitting](../mapping-benchmarks/zeeman-effect.md), and [strong-field electromagnetic response](../mapping-benchmarks/strong-field-electromagnetic-response.md). These packets describe the comparison and its proof burden. Being listed there does not mean a benchmark has been run or passed. Its [work queue](../mapping-benchmarks/work-queue.md) owns accepted execution tasks; case-local draft steps do not create additional executable queues.

One benchmark can test several equation rows, and one equation can be tested by several benchmarks. A domain owner joins those constraints while preserving each benchmark's provenance and each equation's disposition.

Plainly: Mapping Benchmarks asks, "What exactly must our explanation reproduce, and what would show it is wrong?" It is neither a second equation catalog nor a collection of already-passed tests.

### What Remains Outside The Mapping Family

| Owner | What it supplies or controls |
| --- | --- |
| [Braid Program](../braid-program/priorities.md) | Candidate geometry, candidate adjudication, dynamical existence, retained histories, and braid evidence. Mapping supplies requirements; it does not certify the candidate for this owner. |
| [Master Equation Closure](../master-equation-closure/priorities.md) | Foundational causal-wake, acceleration, conservation-account, and shared Noether sea response obligations. Domain packets consume their results. |
| [EOM solver](../app-solver/priorities.md) | Accepted computational capabilities and their independent validation. A mapping request cannot bypass a missing solver capability. |
| [Source Mining](../source-mining/priorities.md) | Source acquisition, extraction, and provenance. The scientific owner decides how an acquired result enters a recovery argument. |
| [Equation Mapping app](../app-equation-mapping/priorities.md) | Presentation and interaction over equation records. A display or score calculation cannot create scientific evidence. |

Plainly: mapping states and connects the requirements; the physical and computational owners still have to produce the objects and evidence that satisfy them.

## Methodology In Practice

This is an orientation to the existing [bidirectional method](mapping-method.md#bidirectional-mapping-and-mathematical-reframing), not a second method specification. That document remains the shared method and mathematical architecture owner. Its [admissible native record sets](mapping-method.md#admissible-native-record-sets) express the requirement that one declared construction survive all applicable comparisons.

1. **State the target and its level.** Identify the equation, observation, or solved case; separate measured data, its effective mathematical description, and the interpretation attached to that description. Declare the regime and the exact behavior to recover. Use tested physics and accepted constraints to choose required targets; keep optional frameworks at comparison or heuristic grade.
2. **Work backward to explicit requirements.** Ask which assembly geometry, history dependence, source and receiver records, boundary conditions, or medium response would be needed. Record these as inferred constraints or conjectures unless they have been derived. Several underlying constructions may satisfy the same observation.
3. **Construct forward from the allowed primitives.** Develop the needed native derivation or obtain evidence from its scientific owner. Specify the projection that converts the physical record into the comparison variables. At the master-equation level this is acceleration-first reasoning; every new numerical instantiation uses $c_f=1$.
4. **Bind related comparisons to the same construction.** Preserve the shared history, source identities, medium state, parameters, and declared observation conditions across the relevant comparisons. State which constraints helped construct or calibrate the candidate and which evidence remains independent. Unrecorded changes made separately for each observable are not a shared explanation.
5. **Check the residual and the failure conditions.** A residual is the mismatch between the predicted and reference quantities. Use the owning packet's tolerances, negative controls, refinement requirements, and independent reference. Name the instrument and its reach. Replaying a producer's own output tests reproducibility, not independent correctness.
6. **Record the result at the authority earned.** Keep derived, measured, inferred, and guessed claims distinct. Give the scope, evidence, falsifier, and first missing prerequisite. A prescribed path, diagnostic, or populated packet cannot acquire retention, stability, physical-realization, or recovery authority merely by passing a comparison. Promote only the supported result through its existing owner.

Plainly: specify what must be explained, infer what a mechanism needs, build that mechanism from the allowed ingredients, and compare its outputs independently. Keep the failed or missing step visible; do not replace it with a stronger label.

### Example: One Spectral Benchmark Across Several Owners

The [Zeeman packet](../mapping-benchmarks/zeeman-effect.md) illustrates the ownership split. This is a routing example, not a claim that the recovery has been completed.

- **Benchmark:** `mapping-benchmarks` specifies line splitting, viewing direction, polarization, comparison provenance, and failure conditions.
- **Equations:** `mapping-equations` owns the exact atomic-spectrum and magnetic-moment/precession rows, `EQ-26` and `EQ-27`.
- **Domain integration:** `mapping-electromagnetism` checks the common magnetic-state description; `mapping-nuclear-atomic-molecular` carries the atomic assembly question within its scope.
- **Physical evidence:** the relevant assembly, photon, causal-wake, and solver owners must supply the records used by those comparisons. A benchmark description does not supply those records.

Plainly: one observed line pattern creates several connected questions. Each has one owner, and all must refer to the same declared physical case.

## Where To Read And Where To Write

Start with the relevant owner's `priorities.md`, then its `work-queue.md` and the named packet. Strategic state belongs in the tracker; accepted executable work belongs in the queue; provisional ideas belong in `brainstorming.md`; dated results belong in `work-log.md` or the owner's evidence packet. Do not create copies of another owner's task or evidence record here.

Use this overview for orientation and directory navigation. Use the [shared architecture](mapping-method.md) for method, ownership contracts, and common mathematical components. Use [Inferring Braid Requirements](../mapping-equations/inferring-braid-requirements.md) for the general reverse-inference application and the Braid Program's [candidate adjudication](../braid-program/braid-candidate-requirement-adjudication.md) for applying those requirements to candidates.

Reader-facing explanations live in [Theory Bridges](../../../content/markdown/aaa/philosophy-history/theory-bridges.md), [Theory Mapping](../../../content/markdown/aaa/philosophy-history/theory-mapping.md), and [One Nature, Many Theories](../../../content/markdown/aaa/philosophy-history/one-nature-many-theories.md). Accepted content is promoted into its corpus owner; reader-facing chapters do not depend on this priority directory.

Directory and orientation decisions are recorded in this directory's [work log](work-log.md). Scientific status and scores remain with the scientific owners.
