# Shell Requirements and Design

## Selected scope

The operator selected a research app for distributions of architrinos supplied with initial conditions and history on a fixed closed shape. Begin with a sphere and three electrinos plus three positrinos, then extend to ellipsoids. Normal artificial support preserves the shape while the canonical delayed interaction determines tangent motion. [The manuscript](../manuscript.md) defines the equation and its scientific limits.

Shell is the proposed dedicated app name. Reuse suitable Borg rendering, camera, path playback and record inspection after checking their actual interfaces. A dedicated entry point does not justify a second solver or copied scientific catalog. No executable app is delivered by this brief.

## Experiment inputs

| Input | Required meaning |
| --- | --- |
| Shape | Fixed sphere radius and center; ellipsoid semiaxes, center and orientation. Positive finite dimensions and a smooth nonzero normal gradient. |
| Population | Stable member identities and explicit polarity counts; initial preset is 3:3. |
| Preparation | Surface-consistent continuous position and velocity histories with provenance, coverage, interpolant and error bounds. Endpoint velocity must be tangent. |
| Interaction | Exact canonical model binding, coupling, numerical $c_f=1$, self-history, causal-root and event policies. |
| Constraint | Explicit normal-only experimental support. No prescribed future path, tangent controller or implicit damping. |
| Run | Finite requested duration, tolerances and resource limits, with accepted coverage and halt reason returned by EOM. |
| Reproducibility | Full input record and deterministic seed for any generated preparation; seed alone cannot replace retained history. |

Preparation presets may include stationary points, same-surface prescribed pasts and perturbations of a verified record. Any past not satisfying the future evolution law is labeled as preparation. Import the existing spherical candidate records with their actual evidence status. Random surface points and tangent directions do not by themselves provide causal history.

## Solver ownership and capability boundary

The EOM solver remains the only forward engine. The existing [canonical contract](../../app-solver/contracts/evolution-contract-v1.md#initial-data-retained-history-functions) excludes future constraints. The proposed mode therefore needs an explicit EOM-owned experimental contract and evidence identity covering the normal-support rule, constrained history construction, error bounds, independent controls, restart and event handling. Its output must be distinguishable from accepted unconstrained canonical evolution.

Compute the interaction from the actual constrained histories and ambient Euclidean causal distances. Enforce surface and tangent consistency in accepted evolution segments, including the dense history evaluated by root finding, rather than only in displayed endpoints. Keep interaction acceleration and constraint acceleration separately available. A missing capability or unsupported event yields a stated blocker or halt; the browser must not calculate substitute dynamics or snap a free trajectory to the surface and label it evolved.

## First research experience

The primary view shows the selected translucent shape, polarity-marked members and their calculated path histories. A short explanation states what was prepared, what was allowed to evolve, what happened over the accepted interval and what remains unestablished. Shape, speed and history are named controls; physical energy is not a preparation slider without an accepted mapping.

Expose setup, Start, Pause, Reset and replay of completed records. Keep future trajectories distinct from prescribed preparation and diagnostic candidate curves. Additional inspection shows support acceleration, speed, close approaches, surface error, causal-root events and solver halts. Wake illustrations preserve ambient propagation. An optional flattening or surface-coordinate view is a presentation transform of the same three-dimensional record.

## Outcome records

Record per-member position, velocity, speed, interaction acceleration, normal support and surface/tangent residuals over accepted coverage. Report minimum pair separation, root-chart events and numerical uncertainty. Describe recurrence, clustering or irregular motion only through a named readout with its interval and error bound. Finite recurrence is a candidate observation, not a stability verdict.

Every result retains exact preparation, surface, model and constraint identity. A free-release comparison branches from the same supported history and records removal of support. A shape or scale comparison is a separate calculation with its own preparation. Physical energy, frequency, stability and assembly qualification are displayed only when their scientific source supplies the corresponding account or certificate; otherwise state the specific unestablished quantity.

## Proposed verification scope

Verification belongs with the implementation change and its agreed testing scope; this proposal creates no recurring test suite. Before target evolution, independently check zero-interaction spherical great-circle motion against the manuscript's analytical reference, recovery of the sphere when ellipsoid semiaxes are equal, and the differentiated constraint identity. Add a separately derived interacting control before reporting coupled six-member correctness. Dense-segment surface and tangent residuals, timestep/error refinement and full-history recurrence comparisons are necessary evidence for the claims they support.

The independent reference must remain separate from the implemented subject. Agreement between a projected implementation and its own output replay establishes repeatability only. No numerical target run is part of this folder-opening task.

## Later extensions

General smooth closed surfaces, near-surface bands and moving boundaries are provisional. Each requires its own declared geometric domain and equation. A dynamically shrinking shape is not included in a sweep of separate fixed-radius experiments. An energy–size–frequency map depends on the accepted history account and branch-selection result owned by the scientific lane.
