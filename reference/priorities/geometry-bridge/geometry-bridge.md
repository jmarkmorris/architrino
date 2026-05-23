# Geometry Bridge: Mathematics Attack Plan

## Workstream Metadata

- Kind: `priority`
- Rank: `proposed`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Scope

This priority folder owns the focused mathematics and geometry attack plan for moving from the Master Equation of Motion to emergent assembly geometry without jumping directly to full observer-level GR. The workstream exists because the current stack has strong pieces in the Master EOM, Noether swarm architecture, nested shell swarm geometry, and emergent metric map, but it lacks one controlled intermediate object:

$$
\text{Master EOM}
\longrightarrow
\text{branch-local assembly response}
\longrightarrow
\text{Noether-Sea / observer-geometry export}.
$$

The central target is a branch-local response theorem. For a candidate assembly branch $B$, define a retained state

$$
z_B
=
\left(
Y,\nu,\eta,J,\Lambda,\mathcal{E}_{\mathrm{hist}},
Q_{ab},\mathcal{Z}^{ab},\mathcal{M}_{\mathrm{sea}}^{ab}
\right),
$$

and a local environment or Noether-Sea record $\theta$. The first bridge object is a residual equation

$$
\mathcal{R}_B(z_B;\theta)=0
$$

on a root-regular, ledger-consistent branch chart. The first variation is

$$
D_z\mathcal{R}_B[\delta z]
+
D_\theta\mathcal{R}_B[\delta\theta]
=0.
$$

After quotienting gauge directions and fixing the root-ledger convention, a valid response row has the form

$$
\delta z
=
-
\mathcal{G}_B
D_\theta\mathcal{R}_B[\delta\theta],
$$

where $\mathcal{G}_B$ is the inverse or bordered generalized inverse of $D_z\mathcal{R}_B$ on the retained non-gauge subspace.

The output is not a metric yet. The output is the geometry-export packet

$$
\mathcal{K}_{B}^{\mathrm{geom}}
:
\delta\theta
\mapsto
\left(
\delta\ln T_B,\,
\delta Q_{ab},\,
\delta\mathcal{Z}^{ab},\,
\delta\mathcal{M}_{\mathrm{sea}}^{ab},\,
\mathcal{R}_{\mathrm{pf}},\,
\mathcal{R}_{\mathrm{ledger}}
\right).
$$

Only after this packet is branch-certified should [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) consume it as candidate input for $N$, $u^i_{\text{sea}}$, $e^a{}_i$, and $\gamma_{ij}$.

## Priority List

1. `branch_local_response_object` — Define the exact residual object $\mathcal{R}_B(z_B;\theta)$ for one diagnostic branch chart, including root variables, bounded speed factors if used, branch labels, energy/action rows, shape tensor, exposure tensor, and Noether-Sea response tensor. Status: `active`. Depends on: none.

2. `root_sensitive_linearization` — Derive the root-sensitive first variation of $\mathcal{R}_B$, including $D\eta$, $DJ$, delayed force variation, support variation, speed-factor variation, and event-endpoint variation. Status: `pending`. Depends on: `branch_local_response_object`.

3. `gauge_quotient_and_bordered_inverse` — Identify translation, rotation, phase, period, root-label, and branch-family gauge directions, then define the bordered inverse or generalized inverse $\mathcal{G}_B$ used in the response equation. Status: `pending`. Depends on: `root_sensitive_linearization`.

4. `geometry_export_packet` — Compute the branch-local geometry export $\mathcal{K}_{B}^{\mathrm{geom}}$, with first rows $\delta\ln T_B$, $\delta Q_{ab}$, $\delta\mathcal{Z}^{ab}$, $\delta\mathcal{M}_{\mathrm{sea}}^{ab}$, preferred-frame leakage, and ledger mismatch residuals. Status: `pending`. Depends on: `gauge_quotient_and_bordered_inverse`.

5. `assembly_interface_variation` — Apply the response packet to the assembly-Noether-Sea interface diagnostic $D_{a,X}(\mathbf{x},t)$ and derive the first variation of the level set $\partial\Omega_a(D_X,t)$. Status: `pending`. Depends on: `geometry_export_packet`.

6. `virtual_work_curl_test` — Test whether the branch-local delayed-force response is action-compatible by computing the finite-mode virtual-work curl $\mathcal{C}_{pq}=\partial_pW_q-\partial_qW_p$ on the same retained root stratum. Status: `pending`. Depends on: `root_sensitive_linearization`.

7. `adm_cartan_projection` — Translate a passed geometry-export packet into the ADM/Cartan observer fields $N$, $u^i_{\text{sea}}$, $e^a{}_i$, and $\gamma_{ij}$ as a constitutive projection, not as substrate curvature. Status: `pending`. Depends on: `geometry_export_packet` and `virtual_work_curl_test`.

8. `minimal_worked_branch` — Choose the smallest available branch chart, likely the current exact-antipodal $M=3$ shell swarm row or a bounded-speed successor, and populate the response packet far enough to classify it as `response-passed`, `response-open`, or `response-rejected`. Status: `pending`. Depends on: `branch_local_response_object`.

9. `promotion_decision` — Promote only theorem-target material that is reader-facing and branch-safe into the AAA corpus; preserve diagnostics, failed branches, and unproven response rows in this priority folder. Status: `pending`. Depends on: `geometry_export_packet` and `minimal_worked_branch`.

## Claim Discipline

| Claim | Current status | Promotion blocker |
| --- | --- | --- |
| Master EOM supplies delayed causal-root forces | already corpus-level | none for the primitive force law |
| Assembly branch response tensor exists | theorem target | needs one root-regular branch chart and bordered response row |
| Assembly interface level set has computable first variation | theorem target | needs $D_{a,X}$ response under one branch ledger |
| Geometry export can feed ADM/Cartan fields | theorem target | needs one shared clock, shape, exposure, and medium-response record |
| Emergent metric recovery follows | downstream theorem target | needs PPN, lensing, signal, clock, ruler, and preferred-frame residuals from one record |

## Promotion Map

| Priority artifact | Candidate corpus destination | Promotion gate |
| --- | --- | --- |
| Branch-local response theorem target | [Nested Shell Swarm Dynamics](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md) | $\mathcal{R}_B$, root-sensitive linearization, and gauge quotient are stated without claiming branch retention. |
| Assembly interface variation | [Nested Shell Swarm Geometry](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md) | The level-set variation uses the existing $D_{a,X}$ diagnostic and one consistent branch ledger. |
| ADM/Cartan projection row | [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) | The projection consumes $\mathcal{K}_{B}^{\mathrm{geom}}$ and keeps metric language observer-level. |
| Action compatibility result | [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md) or [Effective Lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md) | The virtual-work curl test passes or fails with a clear status and root convention. |

## Immediate Next Packet

The next packet should be `branch-local-response-object.md`. It should define $\mathcal{R}_B(z_B;\theta)$ for one branch chart, list every state variable, list every residual row, and specify which existing priority branch is the first worked target. It should not add a new validation gate. Its value is to create the missing mathematical bridge object that lets the Master EOM act on assembly geometry before any full emergent-metric claim is attempted.

## Current Classification

This folder is `priority-only`. It should not be linked from `content/markdown/aaa` until at least one theorem-target row is promoted into a reader-facing corpus file. It may link to corpus and priority files as needed for workstream coordination.
