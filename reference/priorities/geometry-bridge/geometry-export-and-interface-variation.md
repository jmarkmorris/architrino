# Geometry Export and Interface Variation Packet

## Workstream Metadata

- Kind: `priority-packet`
- Bucket: [Geometry Bridge](geometry-bridge.md)
- Status: `theorem-target`
- Scope: branch-local geometry export and assembly-interface first variation

## Target Advance

This packet supplies the missing intermediate geometry object between branch-local response and full observer-level metric recovery. A retained branch response does not need to reconstruct $N$, $u^i_{\text{sea}}$, $e^a{}_i$, or $\gamma_{ij}$ before it can move an assembly boundary. It only needs the branch response of the clock-period row, shape row, exposure row, Noether sea response row, preferred-frame leakage row, and ledger residual row.

The advance is therefore:

$$
\delta\theta
\xrightarrow{\ \mathcal{L}_B\ }
\delta z_B
\xrightarrow{\ \mathcal{K}_B^{\mathrm{geom}}\ }
\left(
\delta\ln T_B,\,
\delta Q_{ab},\,
\delta\mathcal{Z}^{ab},\,
\delta\mathcal{M}_{\mathrm{sea}}^{ab},\,
\delta\mathcal{R}_{\mathrm{pf}},\,
\delta\mathcal{R}_{\mathrm{ledger}}
\right)
\xrightarrow{\ \delta D_{a,X}\ }
\delta s_X .
$$

Here $\delta s_X$ is the signed normal displacement of the assembly-Noether sea interface level set in channel $X$. This is a geometry object in substrate space and absolute time. It is not yet an effective metric, but it is already enough to compute first-order interface motion from branch-response data.

## Branch-Local Response Input

Use the branch-local residual object from the Geometry Bridge workstream:

$$
\mathcal{R}_B(z_B;\theta)=0,
$$

with retained state

$$
z_B
=
\left(
Y,\nu,\eta,J,\Lambda,\mathcal{E}_{\mathrm{hist}},
Q_{ab},\mathcal{Z}^{ab},\mathcal{M}_{\mathrm{sea}}^{ab}
\right).
$$

On a root-regular chart after quotienting gauge directions and fixing the root-ledger convention, the linear response is

$$
\delta z_B
=
\mathcal{L}_B[\delta\theta],
\qquad
\mathcal{L}_B
\equiv
-
\mathcal{G}_B D_\theta\mathcal{R}_B,
$$

where $\mathcal{G}_B$ is the bordered inverse or generalized inverse of $D_z\mathcal{R}_B$ on the retained non-gauge subspace. The domain of $\mathcal{L}_B$ is the environment/Noether sea perturbation space for the declared branch chart. Its output includes perturbations of causal-root times, root Jacobians, branch labels after admissible quotienting, cycle variables, shape tensor, exposure tensor, medium-response tensor, and ledger residuals.

## Geometry Export Map

Define the branch-local geometry export as the row projection

$$
\mathcal{K}_B^{\mathrm{geom}}
=
\Pi_B^{\mathrm{geom}}\mathcal{L}_B,
$$

with

$$
\mathcal{K}_B^{\mathrm{geom}}[\delta\theta]
=
\left(
\delta\ln T_B,\,
\delta Q_{ab},\,
\delta\mathcal{Z}^{ab},\,
\delta\mathcal{M}_{\mathrm{sea}}^{ab},\,
\delta\mathcal{R}_{\mathrm{pf}},\,
\delta\mathcal{R}_{\mathrm{ledger}}
\right).
$$

The projection $\Pi_B^{\mathrm{geom}}$ is not allowed to use a target metric benchmark. It may use only the retained branch state, the causal-root ledger, the declared channel projectors, and the branch-local response $\delta z_B$.

The row meanings are:

| Row | Definition |
| --- | --- |
| $\delta\ln T_B$ | first response of the absolute-time branch period or declared composite phase period |
| $\delta Q_{ab}$ | first response of the cycle-averaged assembly shape tensor |
| $\delta\mathcal{Z}^{ab}$ | first response of the geometry-facing exposure tensor or quotient-visible exposure tensor |
| $\delta\mathcal{M}_{\mathrm{sea}}^{ab}$ | first response of the Noether sea medium-response tensor on the same branch ledger |
| $\delta\mathcal{R}_{\mathrm{pf}}$ | preferred-frame leakage induced by branch drift, anisotropy, non-reciprocal root weights, or frame-sensitive quotient residue |
| $\delta\mathcal{R}_{\mathrm{ledger}}$ | residual change in root identity, energy, momentum, angular momentum, provenance, and event-ledger closure rows |

This map is the correct handoff to [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) only after it is branch-certified. Before that point it is still useful: it computes substrate-space deformation and interface motion without pretending that a full ADM/Cartan reconstruction has already been proved.

## Period Row First Variation

Let the branch period be extracted from a declared phase functional $\phi_B$:

$$
T_B
=
\frac{2\pi}{\Omega_B},
\qquad
\Omega_B
=
\left\langle \dot\phi_B\right\rangle_{\mathrm{cyc},B}.
$$

On a fixed branch chart with no cycle-boundary jump,

$$
\delta\ln T_B
=
-
\delta\ln\Omega_B
=
-
\frac{\delta\Omega_B}{\Omega_B},
$$

with

$$
\delta\Omega_B
=
\delta
\left\langle \dot\phi_B\right\rangle_{\mathrm{cyc},B}.
$$

If the cycle average is represented over a fixed phase interval, this row can be computed directly from the response of the phase-rate entries in $\delta z_B$. If the branch uses a causal-hit decomposition, write

$$
T_B
=
\sum_{\alpha\in\mathcal{H}_B}
\Delta t_\alpha
+
\mathcal{R}_{\mathrm{phase},B},
$$

where $\mathcal{H}_B$ is the retained ordered hit multiset and $\mathcal{R}_{\mathrm{phase},B}$ is the finite-memory/inter-layer phase-return correction. Then

$$
\delta T_B
=
\sum_{\alpha\in\mathcal{H}_B}
\delta\Delta t_\alpha
+
\delta\mathcal{R}_{\mathrm{phase},B}
+
\mathcal{R}_{\mathrm{hit\text{-}id}},
$$

and

$$
\delta\ln T_B
=
\frac{\delta T_B}{T_B}.
$$

The identity-change term $\mathcal{R}_{\mathrm{hit\text{-}id}}$ must vanish for a same-branch first variation. If it does not vanish, the perturbation has crossed a root-ledger boundary and the response belongs to a branch event rather than to $\mathcal{K}_B^{\mathrm{geom}}$ on the original chart.

For a simple causal-root row

$$
g_\alpha
=
r_\alpha-c_f(t_\alpha-t_{0,\alpha})=0,
\qquad
J_\alpha
=
1-\frac{\mathbf{v}_{s,\alpha}(t_{0,\alpha})\cdot\hat{\mathbf r}_\alpha}{c_f},
$$

the emission-time response at fixed receiver event satisfies

$$
\delta t_{0,\alpha}
=
-
\frac{\delta g_\alpha|_{t_{0,\alpha}}}{c_fJ_\alpha},
\qquad
\delta\Delta t_\alpha
=
\frac{\delta g_\alpha|_{t_{0,\alpha}}}{c_fJ_\alpha}.
$$

Thus the period row is computable from branch-response data whenever the active causal roots are simple and the same ordered hit ledger is retained.

## Shape Row First Variation

Let the branch shape tensor be the cycle average

$$
Q_{ab}
=
\frac{1}{M_B}
\left\langle
\sum_{i\in B}
\mu_i\,\rho_{i,a}\rho_{i,b}
\right\rangle_{\mathrm{cyc},B},
\qquad
\rho_i
=
\mathbf{x}_i-\mathbf{X}_B,
\qquad
M_B=\sum_{i\in B}\mu_i .
$$

Here $\mu_i$ is the branch-retained weighting used by the chart: mass-facing exposure weight, energy-ledger weight, or declared uniform constituent weight. The first variation is

$$
\delta Q_{ab}
=
\frac{1}{M_B}
\left\langle
\sum_i
\delta\mu_i\,\rho_{i,a}\rho_{i,b}
+
\mu_i
\left(
\delta\rho_{i,a}\rho_{i,b}
+
\rho_{i,a}\delta\rho_{i,b}
\right)
\right\rangle_{\mathrm{cyc},B}
-
Q_{ab}\,\delta\ln M_B
+
\delta_{\mathrm{avg}}Q_{ab},
$$

where

$$
\delta\ln M_B
=
\frac{\sum_i\delta\mu_i}{M_B}.
$$

The term $\delta_{\mathrm{avg}}Q_{ab}$ records the variation of the cycle averaging measure. In a fixed phase gauge it is the response of the phase-density or cadence weight. In a fixed absolute-time window it is the endpoint contribution from the shifted cycle boundaries. A useful fixed-phase representation is

$$
\delta_{\mathrm{avg}}Q_{ab}
=
\left\langle
\delta\ln w_{\mathrm{cyc}}
\left(
\sum_i\frac{\mu_i}{M_B}\rho_{i,a}\rho_{i,b}
-Q_{ab}
\right)
\right\rangle_{\mathrm{cyc},B},
$$

with $w_{\mathrm{cyc}}$ the declared cycle averaging density. This makes the shape response a direct projection of $\delta Y$, $\delta\nu$, $\delta\eta$, root shifts, and any branch-retained weight response.

## Exposure and Medium-Response Rows

The geometry-facing exposure tensor is the tensor component of the branch-visible exposure record. In abstract packet form,

$$
\mathcal{Z}^{ab}
=
Q_{\mathrm{geom}}
\!\left[
\Pi_{\mathrm{geom}}\mathcal{L}_B^{\mathrm{wake}}
\right]^{ab},
$$

where $\Pi_{\mathrm{geom}}$ retains the shape, stress, exclusion, cadence, delay, and orientation entries that can affect geometry-facing response, and $Q_{\mathrm{geom}}$ removes only relabelings that preserve those entries. Its first variation is

$$
\delta\mathcal{Z}^{ab}
=
D
\left(
Q_{\mathrm{geom}}\Pi_{\mathrm{geom}}
\right)_{\mathcal{L}_B^{\mathrm{wake}}}
\left[
\delta\mathcal{L}_B^{\mathrm{wake}}
\right]
+
\mathcal{R}_{Z,Q}^{ab},
$$

where $\mathcal{R}_{Z,Q}^{ab}$ is the quotient-compatibility residue. It must vanish or remain below the declared tolerance; otherwise the geometry exposure is not a well-defined quotient-visible tensor.

The Noether sea response tensor is a constitutive response of the local medium record to the exposed branch ledger:

$$
\mathcal{M}_{\mathrm{sea}}^{ab}
=
\Psi_{\mathrm{sea}}^{ab}
\left(
\mathcal{Z}^{cd},
Q_{cd},
\theta_{\mathrm{sea}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right).
$$

Therefore

$$
\delta\mathcal{M}_{\mathrm{sea}}^{ab}
=
\frac{\partial\Psi_{\mathrm{sea}}^{ab}}{\partial\mathcal{Z}^{cd}}
\delta\mathcal{Z}^{cd}
+
\frac{\partial\Psi_{\mathrm{sea}}^{ab}}{\partial Q_{cd}}
\delta Q_{cd}
+
D_{\theta_{\mathrm{sea}}}\Psi_{\mathrm{sea}}^{ab}[\delta\theta_{\mathrm{sea}}]
+
D_{\mathcal{L}}\Psi_{\mathrm{sea}}^{ab}[\delta\mathcal{L}_{E\mathbf{p}\mathbf{J}}].
$$

This is intentionally not a metric formula. It is the medium-response row that an ADM/Cartan map may later consume.

## Preferred-Frame and Ledger Residual Rows

The preferred-frame leakage row records the part of the exported packet that changes under a declared observer-frame quotient or leaves a drift/anisotropy channel visible. A minimal tensor-vector diagnostic is

$$
\delta\mathcal{R}_{\mathrm{pf}}
=
\left(
\delta u_{\mathrm{drift}}^a,\,
\delta Q_{\mathrm{tf}}^{ab},\,
\delta\mathcal{Z}_{\mathrm{tf}}^{ab},\,
\delta\mathcal{M}_{\mathrm{tf}}^{ab},\,
\delta\lambda_{\mathrm{PF}}
\right),
$$

where the trace-free projection is

$$
A_{\mathrm{tf}}^{ab}
=
A^{ab}
-
\frac{1}{3}\delta^{ab}\delta_{cd}A^{cd}.
$$

The ledger residual row is

$$
\delta\mathcal{R}_{\mathrm{ledger}}
=
\left(
\delta\mathcal{R}_{\mathrm{root}},
\delta\mathcal{R}_E,
\delta\mathcal{R}_{\mathbf p},
\delta\mathcal{R}_{\mathbf J},
\delta\mathcal{R}_{\mathrm{prov}},
\delta\mathcal{R}_{\mathrm{event}}
\right).
$$

The geometry export is branch-admissible only when these residuals remain within the same branch tolerance. If root identity, provenance, or event closure changes discontinuously, the map has detected a branch transition rather than a smooth geometry response.

## Interface Diagnostic Variation

Use the assembly-Noether sea interface diagnostic from [Nested Shell Braid Geometry](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md#assembly-noether-sea-interface-diagnostic). Write

$$
L_X(\mathbf{x},t)
=
\left\lVert
\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)
\right\rVert,
\qquad
A_X(\mathbf{x},t)
=
\left\lVert
\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)
\right\rVert,
$$

so that

$$
D_{a,X}(\mathbf{x},t)
=
\frac{L_X}{L_X+A_X}.
$$

At points where $L_X+A_X>0$, the first variation is

$$
\delta D_{a,X}
=
\frac{
A_X\,\delta L_X
-
L_X\,\delta A_X
}{
\left(L_X+A_X\right)^2
}
=
D_{a,X}(1-D_{a,X})
\left(
\delta\ln L_X-\delta\ln A_X
\right).
$$

For a simple-root locked contribution

$$
\omega_{\alpha,X}
=
w_{\alpha}^{\mathrm{lock}}
\frac{\alpha_{\alpha,X}}
{r_\alpha^2|J_\alpha|},
$$

the logarithmic response is

$$
\delta\ln\omega_{\alpha,X}
=
\delta\ln w_{\alpha}^{\mathrm{lock}}
+
\delta\ln\alpha_{\alpha,X}
-
2\delta\ln r_\alpha
-
\delta\ln|J_\alpha|
+
\delta_{\mathrm{root}}\ln\omega_{\alpha,X}.
$$

The final term is the simple-root shift contribution induced by

$$
\delta t_{0,\alpha}
=
-
\frac{\delta g_\alpha}{c_fJ_\alpha}.
$$

The ambient contribution has the same form with $w_{\alpha}^{\mathrm{lock}}$ replaced by the ambient projector $w_{\alpha}^{\mathrm{sea}}$. Therefore $\delta D_{a,X}$ is computable from the same branch response rows that supply $\delta T_B$, $\delta Q_{ab}$, $\delta\mathcal{Z}^{ab}$, and $\delta\mathcal{M}_{\mathrm{sea}}^{ab}$, plus the declared channel projector $\Pi_X$.

## Level-Set Motion

For a declared threshold $D_X$, define

$$
F_X(\mathbf{x},t)
=
D_{a,X}(\mathbf{x},t)-D_X.
$$

The interface is

$$
\partial\Omega_a(D_X,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
F_X(\mathbf{x},t)=0
\right\}.
$$

At a regular interface point where $\nabla F_X\ne0$, choose the signed unit normal

$$
\mathbf{n}_X
=
\frac{\nabla F_X}{\left\lVert\nabla F_X\right\rVert}.
$$

For a perturbation at fixed substrate time, write the displaced point as

$$
\mathbf{x}'=\mathbf{x}+\delta s_X\,\mathbf{n}_X .
$$

First-order level-set preservation gives

$$
0
=
\delta F_X
+
\nabla F_X\cdot
\left(
\delta s_X\mathbf{n}_X
\right),
$$

so

$$
\delta s_X
=
-
\frac{\delta F_X}
{\left\lVert\nabla F_X\right\rVert}
=
-
\frac{\delta D_{a,X}}
{\left\lVert\nabla D_{a,X}\right\rVert}.
$$

If the outward normal is instead declared as

$$
\mathbf{n}_{\mathrm{out}}
=
-
\frac{\nabla F_X}{\left\lVert\nabla F_X\right\rVert},
$$

then the outward signed displacement is

$$
\delta s_{\mathrm{out},X}
=
\frac{\delta F_X}
{\left\lVert\nabla F_X\right\rVert}.
$$

For unperturbed time evolution of the same level set, the normal velocity in the $\mathbf{n}_X$ convention is

$$
V_{n,X}
=
-
\frac{\partial_tF_X}
{\left\lVert\nabla F_X\right\rVert}.
$$

Thus a branch response supplies both a static interface displacement under $\delta\theta$ and, when the response is a time tangent, a normal interface velocity.

## Intermediate Geometry Theorem Target

Let $B$ be a root-regular, ledger-consistent branch chart with simple active causal roots, positive Jacobian floor, fixed hit identity, declared channel projector $\Pi_X$, and regular interface point $\nabla D_{a,X}\ne0$. If the bordered branch response $\mathcal{L}_B$ exists, then the composite map

$$
\mathcal{I}_{B,X}
:
\delta\theta
\mapsto
\delta s_X
$$

exists and is given by

$$
\mathcal{I}_{B,X}[\delta\theta]
=
-
\frac{
D_{a,X}(1-D_{a,X})
\left(
\delta\ln L_X-\delta\ln A_X
\right)
}{
\left\lVert\nabla D_{a,X}\right\rVert
},
$$

where $\delta\ln L_X$ and $\delta\ln A_X$ are computed from the root, exposure, projector, and medium-response entries of $\mathcal{K}_B^{\mathrm{geom}}[\delta\theta]$ together with the channel-local branch records.

This theorem target is the missing bridge:

$$
\text{branch-local response}
\Longrightarrow
\text{computable assembly-interface motion}
\Longrightarrow
\text{candidate ADM/Cartan input}.
$$

The middle object is not a placeholder for metric recovery. It is a substrate-space level-set response with its own formula and failure conditions. Full emergent metric recovery remains downstream and must still prove that the same exported rows recover clock, ruler, signal, lensing, and preferred-frame benchmarks.

## Failure Conditions

| Failure code | Criterion | Consequence |
| --- | --- | --- |
| `root-ledger-jump` | $\mathcal{R}_{\mathrm{hit\text{-}id}}\ne0$ or active causal-root identity changes discontinuously | same-branch first variation is invalid |
| `jacobian-floor-loss` | some active $|J_\alpha|$ reaches the branch floor | the simple-root response formula is not admissible |
| `quotient-visible-exposure-residue` | $\mathcal{R}_{Z,Q}^{ab}$ exceeds tolerance | $\mathcal{Z}^{ab}$ is not a well-defined geometry-facing exposure tensor |
| `ledger-residual-leakage` | $\delta\mathcal{R}_{\mathrm{ledger}}$ exceeds the declared tolerance | branch response cannot be exported as a single geometry packet |
| `interface-critical-point` | $\nabla D_{a,X}=0$ at the tested interface point | normal displacement is not determined by first-order level-set calculus |
| `metric-premature` | $N$, $u^i_{\text{sea}}$, $e^a{}_i$, or $\gamma_{ij}$ are used to construct $\delta s_X$ | the packet has skipped the intermediate geometry object |

## Promotion Note

This packet should remain priority-side until one worked branch supplies the response rows and verifies the failure conditions. The reader-facing promotion candidate is the theorem that a branch-certified geometry export computes assembly-interface motion before full emergent metric recovery.
