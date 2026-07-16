# Global Angular-Momentum Drain — Adversarial Feasibility Memo

Date: 2026-07-11
Verdict: **UNDECIDED**
Claim level: priority-only conservation analysis and deciding-calculation specification. No retained-branch claim, no sea-drain existence claim, no corpus promotion, and no score movement.

## Executive Verdict

The global-drain route is **not proved open**, but the present record does not support a global **BARRED** verdict either.

[Section 82](fold-crossing-chart-spec.md#82-the-corrected-radiation--self-torque-instrument-audit-rebuild-of-7881) closes one carrier class: the canonical field of the prescribed rigid-circular braid has no $1/r$ radiation tail, and its far-field angular-momentum flux vanishes on both measured channels. It therefore cannot carry the sign-definite axial angular-momentum pump to infinity. That result does **not** prove that a populated Noether sea has zero collective angular-momentum current. A non-radiating bound assembly can still exchange angular momentum with neighboring assemblies, and a chain or continuum of such exchanges can carry a material stress current even when no constituent emits an isolated-braid radiation field.

The adversarial failure is instead sharper: **absorption is not drainage**. Unless the full coupled braid-plus-sea dynamics produces a nonzero large-scale angular-momentum current and a terminal counter-torque or reservoir, sea uptake only relocates the secular accumulation. In a rotationally closed system angular momentum cannot be dissipated away; it can only be transferred, stored, carried through a boundary, or returned through a closed circulation. The existing [coupled-complex instrument](coupled-braid-sea-complex-fixed-point-instrument-spec.md) tests local response channels, not this thermodynamic-limit transport and terminal ledger.

The route therefore remains undecided pending one calculation: derive and evaluate the zero-frequency, long-wavelength angular-momentum continuity and transport kernel of the **same retained Noether sea population**, with the braid pump inserted as a localized source and with energy export carried in the same record. That calculation either exhibits the missing material current or proves that every allowed current vanishes or accumulates.

## What a Global Drain Must Accompl

Let $V_R$ be a ball of radius $R$ containing the pumped braid and a resolved Noether sea population. Let $L_z(V_R)$ include mechanical assembly angular momentum plus every field/wake contribution required by the canonical conservation law. The exact control-volume ledger must have the form

$$
\frac{dL_z(V_R)}{dt}
=
\dot L_{z,\mathrm{pump}}
+\int_{V_R}s_{z,\mathrm{sea}}\,dV
-\Phi^{\mathrm{field}}_z(R)
-\Phi^{\mathrm{mat}}_z(R),
$$

where:

- $\dot L_{z,\mathrm{pump}}>0$ is the sign-definite axial pump booked at the braid subsystem boundary;
- $s_{z,\mathrm{sea}}$ is any genuine local source term remaining after pairwise braid-sea and sea-sea exchanges have been written as internal transfers;
- $\Phi^{\mathrm{field}}_z$ is the canonical field/wake angular-momentum flux;
- $\Phi^{\mathrm{mat}}_z$ is angular momentum carried through sea assembly motion, orientation transport, or interassembly stress.

A true steady global drain must satisfy all of the following on one record:

$$
\left\langle\frac{dL_z(V_R)}{dt}\right\rangle=0,
\qquad
\lim_{R\to\infty}
\left\langle\Phi^{\mathrm{field}}_z(R)+\Phi^{\mathrm{mat}}_z(R)\right\rangle
=\dot L_{z,\mathrm{pump}},
\qquad
\langle s_{z,\mathrm{sea}}\rangle=0
$$

outside explicitly declared source/sink regions. The flux must have the pump's sign and rate, remain nonzero under increasing $R$, and not be supplied by secular growth of the sea's local spin, orientation, strain, or flow. Because a torque at nonzero cadence also transfers power, the same solution must close the energy ledger; exporting angular momentum while accumulating the associated energy is not a true steady state.

For a finite closed domain, the outer boundary must exert the compensating torque or the current must return through a closed circulation. For an infinite domain, a formal constant-flux solution is insufficient unless its boundary condition at infinity, causal establishment, and total stored angular momentum/energy are controlled. A diffusion front that expands forever can make a fixed inner region look stationary while the global state continues to accumulate; that is **quasi-steady relocation**, not the requested true steady state.

## Section 82 Confronted Directly

Section 82 establishes, at its declared seed grade, that the isolated rigid-circular braid's canonical electric/branch and velocity-odd antisymmetric fields are bound. Thus

$$
\lim_{R\to\infty}\Phi^{\mathrm{field}}_z(R)=0
$$

for that source and measured stress prescription. If the global drain exists, the missing carrier must therefore be

$$
\lim_{R\to\infty}\Phi^{\mathrm{mat}}_z(R)=\dot L_{z,\mathrm{pump}},
$$

or a collective field mode that does not exist in the isolated-braid reconstruction and is derived from the populated medium rather than inserted as a new surrogate $1/r$ tail.

The important logical boundary is that isolated-source non-radiation is not a theorem of zero material transport. Neighbor-to-neighbor torque can transmit angular momentum through bound objects, just as a medium can transmit shear stress without each microscopic constituent radiating independently. The §82 no-$1/r$ result bars the previously asserted outgoing isolated-braid radiation carrier. It does not evaluate the sea's $k\to0$, $\omega\to0$ collective response and therefore cannot by itself bar a global drain.

## The Relocation Test

Sea absorption has three mutually exclusive dispositions.

### 1. Local storage — barred as a steady drain

If a sea shell receives the braid's positive torque while its outgoing sea-sea torque is smaller, then

$$
\frac{dL_{z,\mathrm{shell}}}{dt}
=\Phi^{\mathrm{mat}}_z(R_{\mathrm{in}})-\Phi^{\mathrm{mat}}_z(R_{\mathrm{out}})>0.
$$

The shell's spin, orientation, strain, or drift then grows secularly. This is the same obstruction moved outward by one shell. Dissipative relaxation does not repair angular-momentum conservation; it can spread ordered angular momentum among more degrees of freedom, but it cannot remove the total.

### 2. A pumped sea population — barred unless the population pump cancels in the full ledger

If every sea constituent occupies the same sign-definite pumped spindle branch, replacing one matter braid by many sea braids creates a volumetric source density rather than a sink. Pro/anti or axis-balanced populations may cancel the **vector sum** of their pumps over a cell, but that coarse cancellation is not enough: each constituent must remain bounded, and the cell must show equal and opposite microscopic torque transfers rather than two locally secular spins hidden by averaging.

This point is presently open because the Noether sea assembly class and its retained population state are themselves closure targets. The corpus identifies the medium as a balanced population of neutral Noether braids, but the existing metabolism loop is explicitly not self-consistently closed. No current result proves that a representative sea cell has zero intrinsic axial source after all pair and wake transactions are booked.

### 3. Collective transport or closed circulation — not barred, but unproved

A genuine steady state is possible in principle if sea constituents remain bounded while pairwise torques generate a material current. Outside exchange regions the current must obey

$$
\nabla\!\cdot\mathbf J_{L_z}=0,
$$

with the braid-source boundary injecting $\dot L_{z,\mathrm{pump}}$ and a remote counter-torque, boundary reservoir, or return branch removing the same amount. This channel need not give any isolated constituent a $1/r$ radiation tail.

The closed-metabolism picture is admissible only in this stronger form. "Sea feeds braid; braid returns wake to sea" must become a same-record circulation in which the sea's loss on the feed leg equals its gain on the return leg, every participating assembly remains bounded, and the current closes without a hidden positive source. If the return current merely loads successive sea shells, the loop is open in bookkeeping even if it is drawn closed schematically.

The cosmology-lane distinction "local brake barred, global drain open" should therefore be read as a **route classification**, not an existence result. The local equatorial response no-go removes one constitutive coefficient. It does not supply the nonzero large-scale transport coefficient, remote boundary condition, or zero-source representative sea cell needed by the global route.

## The Deciding Calculation

The single load-bearing calculation is the **retained-population angular-momentum Ward identity and zero-frequency transport solve** for a homogeneous Noether sea, evaluated with one localized spindle-pump insertion.

Companion derivation: [Retained-Sea Angular-Momentum Ward Identity and Transport Kernel](retained-sea-angular-momentum-ward-identity-and-transport-kernel.md) gives the exact mechanical exchange/defect partition, the required wake completion, the low-frequency pole classification, the localized-source boundary solve, and the minimal modeled balanced cell. Its fail-closed verdict remains **UNDECIDED** at the missing same-record wake storage/current and retained balanced-cell response.

1. Start from the canonical delayed interaction on a resolved periodic sea population and derive a microscopic partition of every torque transaction into local angular-momentum density $\ell_z$, material current $J^i_{L_z}$, and any required field/wake storage. The result must satisfy, before coarse graining,

   $$
   \partial_T\ell_z+\partial_iJ^i_{L_z}=s_z.
   $$

   Pair exchanges that only relocate angular momentum must cancel from the volume integral. Any residual $s_z$ must be identified as an external torque or as a defect in the proposed conservation ledger.

2. Linearize the retained homogeneous sea state and compute its long-wavelength response to an applied axial torque density:

   $$
   J^i_{L_z}(\mathbf k,\omega)
   =\mathcal K^{ij}_{L}(\mathbf k,\omega)\,f^j_z(\mathbf k,\omega).
   $$

   The decisive limit is $\mathcal K_L(\mathbf k\to0,\omega\to0)$, including the order of limits and any ballistic, diffusive, pinned, or gapped pole. This is a collective population calculation; an isolated-braid far-field reconstruction cannot substitute for it.

3. Insert the measured pump as a localized source, solve the steady boundary-value problem, and evaluate on expanding surfaces

   $$
   \Phi^{\mathrm{mat}}_z(R)
   =\oint_{S_R}J^i_{L_z}n_i\,dA.
   $$

   Simultaneously require bounded local sea state, zero undeclared volume source, no secular growth outside the source, and the matching energy flux at the pump power.

The decision rule is fail-closed:

- **OPEN** if one retained population state gives $\Phi^{\mathrm{mat}}_z(R)\to\dot L_{z,\mathrm{pump}}$ with bounded local variables, zero undeclared $s_z$, a declared remote counter-torque/return branch, and the same-record energy balance.
- **BARRED for the current ontology** if the Ward identity forces $\mathcal K_L(\mathbf k,0)=0$ in every admissible retained sea state, or if every nonzero-current solution necessarily has secular storage, an intrinsic same-sign volume pump, unbounded energy/angular momentum, or no terminal counter-torque.
- **Not decided** by a finite cage absorbing torque for a finite time, by cancellation of vector-averaged pumps, by a local $\chi''$ response, or by adding an outgoing $1/r$ field that the canonical law does not contain.

## Investment Gate for jh11

A full native release is premature if its only new feature is a larger local sea cage. Such a run can show transient uptake but cannot decide the relocation problem. The native investment becomes proof-moving only if it implements or measures the continuity partition above far enough to extract $\mathcal K_L(\mathbf k,\omega)$ and expanding-surface $\Phi^{\mathrm{mat}}_z(R)$, with a declared terminal ledger. The minimal precursor is therefore the analytical Ward-identity derivation and a retained periodic-cell transport calculation; without it, jh11 risks reporting another local absorber while leaving the global drain untouched.

## Promotion Disposition

- Current packet: **priority-only**.
- Likely eventual corpus destinations: `content/markdown/aaa/noether-braid/spindle-braid.md` for the drain verdict and `content/markdown/aaa/spacetime/noether-sea.md` for the collective continuity mechanism.
- Promotion gate: only an OPEN or BARRED result under the decision rule above. The present UNDECIDED verdict should not alter reader-facing canon.

Closure goal: derive the retained Noether sea angular-momentum Ward identity and evaluate its $k\to0$, $\omega\to0$ transport kernel so the global drain is either exhibited with a terminal ledger or barred by conservation and zero transport.
