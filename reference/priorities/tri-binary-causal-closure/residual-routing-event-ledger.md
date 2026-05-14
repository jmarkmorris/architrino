# Residual-Routing and Event-Ledger Theorem Packet

This detailed priority file supports [Tri-Binary Causal Closure](tri-binary-causal-closure.md). It owns the shared proof grammar for transitions that route unresolved action into a physical channel while closing the same event ledger.

## Core Theorem Target

The common pattern is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{core}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}.
$$

A sector event is promotable only when it names the residual $\mathcal{R}$, identifies the admissible channel or basin $\{B_i\}$, and closes the event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ without an untracked loss term.

This is a dynamics and transition theorem first. [Validation Gates](../validation-gates/validation-gates.md) should test whether accepted sector closures survive together; it should not own this derivation.

## Event State And Ledger Object

For a local transition attempt, write the input state as

$$
X
=
\left(
\Gamma,
\mathcal{H},
\rho_{\text{core}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t),
Z_S
\right),
$$

where $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, and $Z_S$ denotes sector-local variables such as apparatus state, nuclear configuration, weak-corridor data, or horizon-interface boundary data. A routed sector event is a triple

$$
\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e}),
$$

where $I_{\mathsf e}\subseteq I$ is the finite selected channel set from $\{B_i\}_{i\in I}$ and $Y_{\mathsf e}$ is the list of outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records assigned by those channels. A sector with mutually exclusive basins has $|I_{\mathsf e}|=1$; radiation, scattering, and reaction vertices may need $|I_{\mathsf e}|>1$ because photon output, recoil, and medium update can be simultaneous terms in one closed event.

The event ledger is the structured balance object

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf{p}},
\Delta_{\mathbf{J}},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e).
$$

Here $\Delta_E$ is scalar energy balance, $\Delta_{\mathbf{p}}$ is vector momentum balance, $\Delta_{\mathbf{J}}$ is angular-momentum balance including mechanical, core, radiation, apparatus, medium, and causal-wake entries where applicable, $\Delta_{\mathrm{pol}}$ is polarity / charge bookkeeping, $\Delta_{\mathrm{arch}}$ is architrino and Noether-core inventory bookkeeping, $\Delta_{\mathrm{path}}$ is source identity, emission time, active causal-root branch, and branch-Jacobian provenance, $\Delta_{\mathrm{med}}$ is the mismatch between computed Noether-Sea update and recorded medium update, and $\Delta_{\mathrm{rem}}$ is the mismatch between computed post-event remnant state and recorded remnant state.

Ledger closure means

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}
$$

componentwise across this tuple. Nonzero physical recoil, medium heating, remnant excitation, or outgoing product energy is allowed only as a named output term inside $Y_{\mathsf e}$; the corresponding balance component must still vanish after that output is included.

For any resolved sector event with input terms $\mathcal{I}_{\text{in}}$ and selected output terms $\mathcal{I}_{\text{out}}(I_{\mathsf e})$, the first three ledger rows have the common form

$$
\Delta_E
=
\sum_{\alpha\in\mathcal{I}_{\text{in}}}E_{\alpha}
-
\sum_{\beta\in\mathcal{I}_{\text{out}}(I_{\mathsf e})}E_{\beta},
$$

$$
\Delta_{\mathbf{p}}
=
\sum_{\alpha\in\mathcal{I}_{\text{in}}}\mathbf{p}_{\alpha}
-
\sum_{\beta\in\mathcal{I}_{\text{out}}(I_{\mathsf e})}\mathbf{p}_{\beta},
$$

$$
\Delta_{\mathbf{J}}
=
\sum_{\alpha\in\mathcal{I}_{\text{in}}}\mathbf{J}_{\alpha}
-
\sum_{\beta\in\mathcal{I}_{\text{out}}(I_{\mathsf e})}\mathbf{J}_{\beta}.
$$

The remaining rows are equality tests on finite inventories, polarity / charge ledgers, causal-wake branch records, Noether-Sea updates, and remnant states. A sector may add rows to $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$, but it may not remove these rows when claiming promotion.

## Required Contract

| Field | Required content |
| --- | --- |
| Residual | Define $\mathcal{R}$ from the local state, causal-wake ledger, density field, Noether-Sea delay factor, and any sector variables. |
| Threshold or separatrix | State the critical surface, basin boundary, channel boundary, or return-map condition that selects an admissible route. |
| Candidate channels | List the allowed routes: retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. |
| Event ledger | Close $E$, $\mathbf{p}$, $\mathbf{J}$, charge/provenance, recoil, medium update, and remnant state where applicable. |
| Benchmark recovery | Name the observer-level benchmark recovered by the route. |
| Failure condition | State what fails if the residual needs sector-specific retuning, hidden loss, or an omitted provenance field. |

## Admissible Channel Definition

Given $X$ and $\mathcal{R}(X)$, a candidate channel $B_i$ is admissible when there exists a boundary functional $g_i$ and a channel output assignment $Y_i$ satisfying

$$
X_{\text{post}}\in B_i,
\qquad
\partial B_i=\{X:g_i(X,\mathcal{R})=0\},
\qquad
g_i(X,\mathcal{R})\ge 0,
$$

and the ledger built from $(X,\{i\},Y_i)$ can close after every sector-required recoil, medium, remnant, inventory, and provenance row is included. The boundary $g_i=0$ may be a threshold, separatrix, critical surface, return-map crossing, record-forming basin boundary, or release-channel boundary, but it must be stated as a test on the same state variables used by the residual.

For a multi-output event, a selected finite route $I_{\mathsf e}\subseteq I$ is admissible when every $i\in I_{\mathsf e}$ has its boundary condition satisfied, the combined output assignment $Y_{\mathsf e}$ is compatible with all selected channels, and

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(X,I_{\mathsf e},Y_{\mathsf e})=\mathbf{0}.
$$

If two selected channels demand incompatible remnant states, incompatible Noether-Sea updates, or duplicate use of the same constituent inventory, the combined route is not admissible even when each single channel passes its own scalar threshold.

## Residual-Routing Promotion Lemma

Fix a sector $S$ with acceptance set $\mathcal{C}_S$, and let $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ denote the cross-sector acceptance intersection from [Validation Gates](../validation-gates/validation-gates.md). A candidate event $\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e})$ is promotable as a sector event if the following five conditions hold:

1. **Replayable residual:** $\mathcal{R}(X)$ is computed from $\Gamma$, $\mathcal{H}$, $\rho_{\text{core}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and explicitly named sector variables, with no hidden sector-specific residual term.
2. **Boundary selection:** each selected $B_i$ has a stated $g_i(X,\mathcal{R})\ge0$, and every excluded channel required by the sector either has $g_k(X,\mathcal{R})<0$ or is explicitly ruled out by a compatibility condition.
3. **Admissible output:** $Y_{\mathsf e}$ names all outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records required by the selected channel set.
4. **Ledger closure:** $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after adding sector-required charge, polarity, architrino-inventory, path-history, Noether-Sea, and remnant rows.
5. **Acceptance compatibility:** $\mathsf e\in\mathcal{C}_S$ and the promoted claim does not empty $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$.

Under these conditions, the event may be promoted because the residual is replayable from the local causal state, the channel boundary selects an allowed route, the output assignment names every physical sink and remnant, the event ledger has no hidden balance term, and the sector benchmark survives the shared validation intersection. If any condition fails, the event remains a provisional map or a failed route rather than a promoted sector closure.

## Consumer Map

| Consumer packet | Local responsibility | Shared theorem burden consumed here |
| --- | --- | --- |
| [radiation-gate-c-benchmarks.md](radiation-gate-c-benchmarks.md) | First worked case for atomic transitions, bremsstrahlung, synchrotron, Compton-like scattering, pair channels, and blackbody recovery. | Derive the route from $\mathcal{R}_{\Theta}$ to photon, retuning, non-radiative, and reaction channels with a closed event ledger. |
| [condensed-matter-medium-transport.md](../mass-map/condensed-matter-medium-transport.md) | Critical-transport residual separating reversible medium-dressed inertia from dissipative transport. | Use the shared contract when $\mathcal{R}_{\text{tr}}$ crosses into excitation, radiation, medium heating, or branch transition. |
| [weak-sector-gauge-closure.md](../standard-model-closure/weak-sector-gauge-closure.md) | Weak-corridor provenance, charged-current handedness, and effective gauge compatibility. | Use the shared event ledger for weak reactions so outgoing lepton / antilepton cores and charged transaction deltas have source accounting. |
| [nuclear-binding-closure.md](../standard-model-closure/nuclear-binding-closure.md) | Hadronic-to-nuclear coarse graining, residual strong channels, beta stability, and first nuclear benchmarks. | Use the shared residual-routing contract for residual strong channels, beta transitions, recoil, and binding-energy ledgers. |
| [quantum-closure.md](../quantum-closure/quantum-closure.md) | Measurement-record formation after transfer-operator and invariant-measure closure. | Use the shared event ledger when a basin outcome becomes an apparatus record with energy, momentum, angular momentum, recoil, and medium updates. |
| [strong-field-closure.md](../strong-field-closure/strong-field-closure.md) | Horizon-interface release channels and information-accounting consequences. | Use the shared routing grammar for jets, diffuse outflow, dark-sector escape, remnant updates, and failure diagnostics. |

## First Worked Case

[Radiation Gate C](radiation-gate-c-benchmarks.md) remains the first worked case because it already names the residual input state

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma(t),
\mathcal{C}_{o'j}(t),
J_{o'j},
\rho_{\text{core}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t)
\right),
$$

and supplies a concrete routing set

$$
\mathcal{B}_{\Theta}
=
\{
B_{\text{retune}},
B_{\gamma},
B_{\text{recoil}},
B_{\text{med}},
B_{\text{nr}},
B_{\text{rxn}}
\}.
$$

The retuning channel is admissible only when the return map carries the post-drive state back to the same stable rung:

$$
g_{\text{retune}}
=
\mathcal{R}_{\text{retune}}-\mathcal{R}_{\Theta}\ge0,
\qquad
E_{\text{exc}}^{\text{post}}=0.
$$

The photon channel is admissible only when the planar-mode drive and available excitation energy both pass the inherited Gate C scaffold:

$$
g_{\gamma}
=
\min\left(
\mathcal{S}_{\gamma}-\mathcal{S}_{\gamma,*},
E_{\text{exc}}-E_{\gamma,\min}
\right)\ge0.
$$

The recoil and medium channels are admissible non-photon terms when $E_\gamma=0$ or when photon output does not exhaust the ledger, provided the selected route includes explicit $\Delta E_{\text{recoil}}$, $\Delta \mathbf{p}_{\text{recoil}}$, $\Delta E_{\text{med}}$, $\Delta \mathbf{p}_{\text{med}}$, and recorded Noether-Sea update terms. The non-radiative channel $B_{\text{nr}}$ denotes a closed residual core or bound-excitation remnant with no outgoing photon and no product inventory change; it is admissible only when $\Delta_{\mathrm{rem}}=0$ after the remnant state is recorded.

The reaction channel is admissible only when a sector reaction gate supplies product inventory and provenance:

$$
g_{\text{rxn}}\ge0,
\qquad
\Delta E_{\text{rxn}}\ne0
\quad\text{or}\quad
\Delta_{\mathrm{arch}}^{\text{products}}\ne0,
$$

with the full reaction ledger supplying charge / polarity, architrino inventory, Noether-core provenance, recoil, and path-history rows.

The radiation ledger instance is

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{core remnant}}
+
\Delta E_{\text{rxn}}.
$$

Its vector rows must also close:

$$
\Delta \mathbf{p}_{\text{asm}}
+
\mathbf{p}_{\gamma}
+
\Delta \mathbf{p}_{\text{med}}
+
\Delta \mathbf{p}_{\text{recoil}}
+
\Delta \mathbf{p}_{\text{rxn}}
=
\mathbf{0},
$$

$$
\Delta \mathbf{J}_{\text{core/wake}}
+
\mathbf{J}_{\gamma}
+
\Delta \mathbf{J}_{\text{med}}
+
\Delta \mathbf{J}_{\text{recoil}}
+
\Delta \mathbf{J}_{\text{rxn}}
=
\mathbf{0}.
$$

This worked case promotes only the shared grammar: $\mathcal{R}_{\Theta}$ selects a finite channel set, the selected route records photon, recoil, medium, non-radiative, or reaction outputs, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ closes all scalar, vector, inventory, provenance, medium, and remnant rows. Radiation Gate C still owns the derivation of $\mathcal{S}_{\gamma}$, $E_{\gamma,\min}$, benchmark recoveries, and photon-specific failure modes.

## Sector Ownership Rule

Sector packets own:

1. the local residual definition;
2. the admissible channel list;
3. the benchmark recovery target;
4. the sector-specific failure modes.

This packet owns:

1. the shared routing theorem schema;
2. the event-ledger field contract;
3. the rule that untracked loss, unbalanced provenance, or sector-specific retuning blocks promotion;
4. the comparison table showing which sector packet has consumed the contract.

## Promotion Boundary

The shared packet may appear in [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md) and [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) as a theorem-target contract before any channel is closed. It promotes beyond that contract only after at least one worked case closes:

1. a named residual;
2. a named threshold or separatrix;
3. a channel decision;
4. a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ event ledger;
5. a benchmark recovery;
6. a failure diagnostic.

## Failure Modes

- **Residual replay failure:** two records with the same $(\Gamma,\mathcal{H},\rho_{\text{core}},\chi_{\text{sea}},Z_S)$ produce different $\mathcal{R}$ values or different selected channel sets without an additional recorded state variable.
- **Boundary failure:** a resolved event occurs while every required $g_i(X,\mathcal{R})<0$, or two mutually exclusive channels both require $g_i(X,\mathcal{R})\ge0$ with incompatible $Y_i$.
- **Ledger residual failure:** after all sector-required rows are included, $\Delta_E\ne0$, $\Delta_{\mathbf{p}}\ne\mathbf{0}$, or $\Delta_{\mathbf{J}}\ne\mathbf{0}$.
- **Inventory / provenance failure:** $\Delta_{\mathrm{pol}}\ne0$, $\Delta_{\mathrm{arch}}\ne0$, or $\Delta_{\mathrm{path}}\ne0$ after the claimed Noether-Sea, corridor, source-identity, emission-time, causal-root, and branch-Jacobian records are included.
- **Medium / remnant failure:** $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term.
- **Retuning failure:** the same benchmark family can be recovered only by changing the residual definition, the channel boundary $g_i$, or the Noether-Sea variables $\rho_{\text{core}}(\mathbf{x},t)$ and $\chi_{\text{sea}}(\mathbf{x},t)$ between sector cases.
- **Cross-sector failure:** $\mathsf e\notin\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$, so the local routing succeeds only by violating another required weak, quantum, gravity, hadronic, radiation, cosmology, conservation-law, or direct-observation acceptance gate.

## Related Priorities

- [tri-binary-causal-closure](tri-binary-causal-closure.md)
- [radiation-gate-c-benchmarks](radiation-gate-c-benchmarks.md)
- [mass-map](../mass-map/mass-map.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [energy](../../../content/markdown/aaa/dynamics/energy.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md)
- [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md)
- [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md)
- [condensed-matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md)
- [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md)
- [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md)
