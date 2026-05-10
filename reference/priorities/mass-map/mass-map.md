# Noether-Core Stability and First Mass Map

## Workstream Metadata

- Kind: `priority`
- Rank: `2`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active`

## Task Queue

1. `derive_first_attractor_family` — Derive the first tri-binary attractor family with shielding extraction. Status: `next`. Depends on: none.
2. `derive_zeta` — Derive zeta(A) and target a baseline electron-mass prediction. Status: `pending`. Depends on: `derive_first_attractor_family`.
3. `mass_hierarchy_check` — Test the first mass map against hierarchy ratios and hadron constraints. Status: `pending`. Depends on: `derive_zeta`.

## Scope

This is the parameter-closure and first mass-formula bucket. Treat [parameter-ledger.md](../../../content/markdown/aaa/validation/parameter-ledger.md) as bookkeeping only. The live target is one reusable derived mass map.

This workstream is the organizer for mass-side integration. It should decide what belongs in canonical AAA prose, what remains an active theorem target, and what must be routed to other priority workstreams before any stronger mass claim is deployed.

## Source-of-Truth Map

| Layer | Document | Ownership |
| --- | --- | --- |
| Canonical mass chapter | [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md) | Reader-facing statement of the current mass thesis, definitions, and conservative explanatory path. |
| Energy ledger source | [Energy](../../../content/markdown/aaa/dynamics/energy.md) | Energy-zero convention, assembly energy bookkeeping, and the operational definition of inertial mass. |
| Dynamics baseline | [Tri-Binary Dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md) | Noether-core roles, speed-regime conventions, delay geometry, stability diagnostics, and metric/connection reconstruction diagnostics. |
| Proof synthesis | [Tri-Binary Causal Closure](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Active-development bridge from tri-binary closure to rest mass, inertia, proper time, photon behavior, and effective geometry. |
| Proof-control ledger | [Tri-Binary Dependency Map](../tri-binary-causal-closure/tri-binary-dependency-map.md) | Open theorem burdens and deployment handoff routes, especially shielding, momentum skew, slow-fast tri-binary minimality, and metric closure. |
| Quantitative mass workstream | This document | First derived mass map, shielding extraction, baseline electron-mass target, and hierarchy checks. |

## Mass Claim Maturity Buckets

### Canonical

- Individual architrinos do not carry a primitive particle-specific inertial mass parameter.
- Inertial mass is defined operationally by the force-response coefficient of a stable assembly.
- The current mass thesis is that observed rest/inertial mass is the externally exposed response of trapped internal causal history, shaped by shielding and Noether-Sea coupling.
- The canonical mass chapter should state this thesis conservatively and route unresolved derivations to this workstream.

### Roadmap

- Derive $m_0(A)c_{\text{eff}}^2\sim \zeta(A)E_{\text{internal}}(A)$ from a closed tri-binary root ledger rather than using it as a heuristic.
- Derive the first-order momentum skew that makes trapped internal energy behave as inertial mass under acceleration.
- Show that inertial and gravitational response share the same shielded-energy coefficient within equivalence-principle bounds.
- Derive the slow-fast tri-binary minimality theorem needed before claiming that three nested binaries are the universal stable matter unit.

### Priority

- Compute one robust tri-binary attractor family with radii, frequencies, branch data, and Floquet stability gap.
- Extract $\zeta(A)$ from far-field wake cancellation and shielding geometry.
- Produce a baseline electron-mass prediction and at least one hierarchy check, such as $m_\mu/m_e$.
- Decide whether Noether-Sea drag remains a separate additive mass contribution, or whether it should be absorbed into the same medium-dressed response tensor used by the causal-closure synthesis.

## Program Notes

- For scorecard purposes, this is the main Parameter Closure + Mass Formulas bucket.
- If the goal is the fastest score lift, pair this workstream with [chapter-authoring](../../op/chapter-authoring.md) for Parameter Closure + Coverage.
- Keep the constants question attached to the mass map only when it sharpens the derivation. Otherwise it belongs in background notes, not in the active deliverable.

## Concrete Deliverables

- Derive one tri-binary attractor family with radii, frequencies, binding scales, and a shielding-extraction protocol.
- Derive $\zeta(A)$ strongly enough to predict a baseline electron mass and a first hierarchy check such as $m_\mu / m_e$.
- Decide which shared inputs survive across the mass-side program, especially $\kappa$, the role of $\eta$, and whether the first map also constrains $h$ and $G$.

## First Quantitative Deliverable: Reference Attractor Family $A_0$

The first mass-side calculation should not begin with a particle label. It should begin with the simplest stable Noether-core attractor family that can emit the data needed for a mass calculation.

Define $A_0$ as a neutral, rest-branch tri-binary Noether core in a weak homogeneous Noether-Sea cell. The family contains three nested pro/anti binaries:

| Layer | Role | Baseline branch |
| --- | --- | --- |
| Inner binary $I$ | active path-history memory carrier | self-hit/history-supported, typically near or above the primitive field-speed separator |
| Middle binary $M$ | commensurability buffer and phase-lock hinge | near-separator transition branch |
| Outer binary $O$ | shielding and boundary-coupling interface | sub-field-speed observer-facing branch |

This reference family should be solved first in the local rest frame of the Noether-Sea cell with $G_{\text{grad}}=0$ and $u^i_{\text{sea}}=0$. Primitive wake geometry may use $c_f$, but all observer-facing mass outputs must declare the dressing map to $c_{\text{eff}}$ or mark it as unresolved. The family must not be calibrated to the electron mass or to any charged-lepton hierarchy value; those comparisons are downstream tests.

### Required Output Contract

| Quantity class | Required outputs | Why mass needs it |
| --- | --- | --- |
| Geometry | $R_I,R_M,R_O$; radius ratios; binary-plane normals $\mathbf{n}_I,\mathbf{n}_M,\mathbf{n}_O$; inter-plane angles; handedness; center-of-closure frame | Fixes the spiral-helical Noether-core shape and the lever arms that determine stored energy, shielding, and external response. |
| Phase and winding | $\omega_I,\omega_M,\omega_O$; $T_I,T_M,T_O$; closed-cycle period $T_{\mathbf{k}}$; phase offsets; layer windings $(k_I,k_M,k_O)$; inter-layer closure integers $q_{ij}$ | Turns the causal knot into an integer-labeled attractor rather than a loose configuration sketch. |
| Root ledger | partner-hit counts; self-hit counts; inter-layer hit channels; signed parity/degree data; any separator events $\Delta N\in 2\mathbb{Z}$ | Supplies the causal-history inventory whose trapped energy is proposed to appear externally as mass response. |
| Stability | closure residuals; return-map residuals; leading Floquet multipliers; basin gap $\Delta_{\mathbf{k}}$; sensitivity to small perturbations | Distinguishes accepted attractors from integer-closed but dynamically unstable rungs. |
| Internal energy ledger | layer energies $E_I,E_M,E_O$; interaction/wake terms; total $E_{\text{internal}}(A_0)$ in dimensionless units; action per closed cycle | Provides the unshielded energy reservoir in $m_0(A)c_{\text{eff}}^2\sim\zeta(A)E_{\text{internal}}(A)$. |
| Shielding extraction | far-field multipole coefficients; exposed leading amplitude; naive constituent sum; preliminary $\zeta(A_0)$; angular anisotropy/leakage tensor | Converts stored internal motion into the externally visible response coefficient instead of assuming $\zeta$. |
| Medium response | local lapse precursor $N$; spatial compliance response $\gamma_{ij}$ or homogeneous baseline; response tensor for acceleration and gradient probes; equivalence residual placeholder | Connects inertial response, gravitational response, and the later Cartan/ADM reconstruction. |
| Mass-facing summary | dimensionless exposed-energy coefficient $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$; unresolved constants list; calibration-free comparison handles | Gives the first object that can later be compared with a particle mass after constants and dressing are fixed. |

### Acceptance Gates

The $A_0$ deliverable is not accepted until all of the following are true:

1. The closure residuals are below a declared tolerance over at least one full closed cycle.
2. The non-symmetry Floquet gap satisfies $\Delta_{\mathbf{k}}>0$ for the reported branch.
3. The reported branch has no secular drift in the local rest frame after symmetry modes are removed.
4. The shielding estimate is stable under increasing far-field extraction radius and angular resolution.
5. No observed particle mass, electron radius, charged-lepton ratio, or measured $\alpha$ value is used as a fitting input.
6. The output is sufficient to evaluate the roadmap expression $m_0(A)c_{\text{eff}}^2\sim\zeta(A)E_{\text{internal}}(A)$ as a prediction once the dressing constants are supplied.

### Immediate Work Packet

1. Formalize the $A_0$ state vector: six architrino trajectories, three binary center frames, three binary phase variables, and the shared Noether-Sea cell data.
2. Write the closure equations for partner hits, self hits, and inter-layer hits with path-history delays and integer winding labels.
3. Define the numerical output schema for the required output contract above before running simulations.
4. Run the simplest reduced $A_0$ scan: homogeneous Noether-Sea cell, zero drift, no imposed external gradient, and primitive speed selector $c_\star=c_f$ for wake intersections.
5. Promote only stable, calibration-free outputs into the $\zeta$ and hierarchy steps.

## Core Work

- Solve the exact 6-body non-Markovian path-history equations for the tri-binary and locate the relevant limit cycles or other robust attractors.
- Derive the minimum radius $R_{\text{min}}$, radii ratios, frequency structure, binding scales, shielding and leakage factors, and far-field cancellation directly from the delayed $1/r^2$ kernel rather than from calibration targets.
- Turn $\zeta$ from a placeholder into a derived quantity and use it to predict the baseline electron mass plus a first hierarchy check such as $m_\mu / m_e$.
- Test whether the same derived geometry explains the structural origin of the fine-structure constant $\alpha$ from $\kappa$ and $c_f$.
- Test the first map against electron / muon / tau or hadron constraints.

## Open Decisions

- Decide which quantities survive as shared inputs across the whole mass-side program, especially $\kappa$ and the physical role of $\eta$.
- Decide whether the first mass map should also constrain the bridge to $h$ and $G$, or whether those constants should remain downstream until the mass derivation is stable.

## Related Priorities

- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [simulations](../deferred/simulations.md)
- [3x3](../3x3/3x3.md)

## Related AAA Notes

- [parameter-ledger](../../../content/markdown/aaa/validation/parameter-ledger.md)
- [noether-core](../../../content/markdown/aaa/assemblies/noether-core.md)
- [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md)
- [architrino-si-base-units](../../../content/markdown/aaa/validation/architrino-si-base-units.md)
