# Surface App

## Workstream Metadata

- Kind: `priority-app`
- Rank: unranked
- Status: `active-design`
- Claim level: `experimental constrained dynamics; app proposal`
- Execution ledger: [work queue](work-queue.md)
- Subject explanation: [manuscript](manuscript.md)
- Application scope: [requirements and design](manuscript.md#application-brief)
- Provisional extensions: [brainstorming](brainstorming.md)
- Authorization and verification: [work log](work-log.md)

## Objective

Prepare a dedicated research app that calculates and visualizes interacting architrino paths on fixed closed shapes, beginning with a neutral six-member population on a sphere and comparing an oblate spheroid and ring torus. Initial data include continuous position and velocity histories, polarity and a tangent endpoint velocity. The selected Master Equation variant and speed regime determine the total interaction acceleration; its tangent projection drives surface motion. The selected surface supplies only the normal support needed to retain it, including the curvature acceleration required by the embedded path.

## Current

The operator selected artificial surface confinement and requested a new app priority folder on 2026-10-10. **Surface** is the operator-selected name; the folder identity is `app-surface`. The application scope is captured; implementation and target runs have not begun. This design owner is unranked, with no invented attention scores or changes to the scientific ranking.

The research question is which recurring, clustered, irregular or close-approach patterns develop from specified histories, and how those outcomes change with surface shape, size and initial motion. A settled pattern is an open hypothesis. The proposed energy–size–frequency relation needs a derived same-history energy account and branch-selection rule; initial speed and radius are preparation controls until that account exists.

The operator clarified the geometric goal as a differentiable closed surface itself, excluding cube edges and corners. The intended class is a **smooth closed surface**, formally a compact smooth two-dimensional manifold without boundary embedded in Euclidean space. The [geometric explanation](manuscript.md#geometric-surface-class) includes the operator's four plain-language definitions and identifies the $C^2$ minimum required by the curvature equation. The [selected configurations](manuscript.md#surface-configurations-to-test) are sphere, oblate spheroid (compression along one axis) and ring torus (one handle). Prolate spheroids, triaxial ellipsoids and smooth two-lobed surfaces are additional proposals.

The operator requires the ignored normal interaction acceleration to be tracked only at superposition level. The [acceleration record](manuscript.md#tangent-dynamics-and-superposed-normal-acceleration) means one net normal vector for each receiving architrino after all admitted contributions and the selected receiver response; it excludes per-hit/source normal decomposition records. Keep that discarded interaction vector distinct from curvature acceleration and total artificial support. Variant and speed-domain identity must be explicit for every run; this documentation update selects no new interaction variant and launches no calculation.

## Ownership and Solver Dependency

Surface owns surface setup, research controls, visualization and reproducible experiment records. [EOM](../app-solver/priorities.md) owns the sole production evolution engine. The [spherical 3:3 research lane](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md) owns existing derivations and scientific adjudication; this app does not duplicate its campaign or change its status.

The current [EOM contract](../app-solver/contracts/evolution-contract-v1.md#initial-data-retained-history-functions) excludes future constraints from canonical evolution requests. Reading that clause and the request definition in `src/eom/include/architrino/eom/CoupledEvolution.hpp` establishes the immediate integration dependency: a separately identified experimental normal-constrained evolution mode must be specified and verified before Surface can offer calculated surface trajectories. Finding a supported constrained request and implementation would overturn this scoped dependency assessment. A rendered curve or a projected free trajectory cannot substitute for that capability.

The operator requires the standard EOM solver to support shared alternative-equation and speed-regime modes, defaulting to the canonical Master Equation with no speed limit. [Shared modes](manuscript.md#shared-solver-modes) keep interaction, speed-domain/boundary treatment and geometric support distinct, with immutable run/checkpoint identity and rejection of unsupported combinations. This is an EOM capability requirement across consumers, rather than an app-local equation selector. The [solver owner](../app-solver/priorities.md#equation-and-speed-modes) records it; existing frozen canonical contracts remain unchanged pending a versioned extension.

[Precise analytical methods](manuscript.md#precise-analytical-methods) are permitted for direct results and proven reductions of numerical work where their mathematical domain covers the requested claim and measured cost is substantially lower. Analytical evidence remains distinguishable from EOM evolution. No analytical six-member solution, cost advantage or new solver capability is established by recording this requirement.

## Application Boundary

A dedicated app is the proposed product arrangement because shape, preparation history and confinement are its central controls. Reuse Borg's suitable display and record-consumption components after inspecting their contracts; keep solver responsibilities in EOM. The app name and constrained research direction are operator-selected; the product implementation is specified in the manuscript's application brief and remains to be developed.

Exact surface confinement is the first mode. Unconstrained release tests whether a discovered pattern persists without support. Motion merely close to a surface, evolving shapes and imposed compression have different equations and remain provisional extensions. All numerical instances use $c_f=1$. Surface size, polarity balance and attractive animation establish no physical assembly, stability or energy law.

## Promotion Boundary

Application design and experimental output remain here and with their scientific owners. Any eventual corpus explanation must preserve the constraint, history domain, claim grade and independently verified result. No corpus promotion is selected by opening this folder.
