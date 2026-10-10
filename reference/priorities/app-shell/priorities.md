# Shell App

## Workstream Metadata

- Kind: `priority-app`
- Rank: unranked
- Status: `active-design`
- Claim level: `experimental constrained dynamics; app proposal`
- Execution ledger: [work queue](work-queue.md)
- Subject explanation: [manuscript](manuscript.md)
- Application scope: [requirements and design](contracts/requirements-and-design.md)
- Provisional extensions: [brainstorming](brainstorming.md)
- Authorization and verification: [work log](work-log.md)

## Objective

Prepare a dedicated research app that calculates and visualizes interacting architrino paths on fixed closed shapes, beginning with a neutral six-member population on a sphere and extending to ellipsoids. Initial data include continuous position and velocity histories, polarity and a tangent endpoint velocity. The solver determines the future path; the selected surface supplies only the normal acceleration needed to retain it.

## Current

The operator selected artificial surface confinement and requested a new app priority folder on 2026-10-10. **Shell** is the proposed name. The application scope is captured; implementation and target runs have not begun. This design owner is unranked, with no invented attention scores or changes to the scientific ranking.

The research question is which recurring, clustered, irregular or close-approach patterns develop from specified histories, and how those outcomes change with surface shape, size and initial motion. A settled pattern is an open hypothesis. The proposed energy–size–frequency relation needs a derived same-history energy account and branch-selection rule; initial speed and radius are preparation controls until that account exists.

## Ownership and Solver Dependency

Shell owns surface setup, research controls, visualization and reproducible experiment records. [EOM](../app-solver/priorities.md) owns the sole production evolution engine. The [spherical 3:3 research lane](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md) owns existing derivations and scientific adjudication; this app does not duplicate its campaign or change its status.

The current [EOM contract](../app-solver/contracts/evolution-contract-v1.md#initial-data-retained-history-functions) excludes future constraints from canonical evolution requests. Reading that clause and the request definition in `src/eom/include/architrino/eom/CoupledEvolution.hpp` establishes the immediate integration dependency: a separately identified experimental normal-constrained evolution mode must be specified and verified before Shell can offer calculated surface trajectories. Finding a supported constrained request and implementation would overturn this scoped dependency assessment. A rendered curve or a projected free trajectory cannot substitute for that capability.

## Application Boundary

A dedicated app is the proposed product arrangement because shape, preparation history and confinement are its central controls. Reuse Borg's suitable display and record-consumption components after inspecting their contracts; keep solver responsibilities in EOM. The name and product arrangement remain proposals, while the selected constrained research direction is recorded as operator-authorized.

Exact surface confinement is the first mode. Unconstrained release tests whether a discovered pattern persists without support. Motion merely close to a surface, evolving shapes and imposed compression have different equations and remain provisional extensions. All numerical instances use $c_f=1$. Surface size, polarity balance and attractive animation establish no physical assembly, stability or energy law.

## Promotion Boundary

Application design and experimental output remain here and with their scientific owners. Any eventual corpus explanation must preserve the constraint, history domain, claim grade and independently verified result. No corpus promotion is selected by opening this folder.
