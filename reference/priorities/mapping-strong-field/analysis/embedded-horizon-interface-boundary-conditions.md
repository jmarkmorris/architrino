# SF-001 — Embedded Horizon-Interface Boundary Conditions

## Status And Claim Boundary

- Queue item: `SF-001` / `embedded_boundary_conditions`.
- Result grade: derived priority-contract formulation.
- Scientific status: no horizon-interface solution, retained compact branch, observer prediction, or physical black-hole mechanism is established.
- Canonical reader-facing equation: [Singularity Resolution — Canonical Strong-Field Alignment Condition](../../../../content/markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition).

This packet types the finite data that a native embedded horizon-interface problem must consume and emit. It does not choose a constitutive Noether sea law, fill an absent strong-field carrier, or import a Schwarzschild, Kerr, fluid, or spacetime metric as substrate input.

Plainly: SF-001 now says exactly what a future strong-field calculation must be given and what it must return. It does not say that such a calculation has succeeded.

## Canonical Interface Record

Let $\Omega\subset\Sigma_T$ be a compact Euclidean region, let $W=[T_i,T_f]$ be an absolute-time window, and let $C_{\partial\Omega}$ be a finite exterior collar containing the boundary. The required input record is

$$
\Theta_{\partial\Omega,W}
=
\left(
\Omega,
W,
X_\Omega(T_i),
\mathcal H_\Omega^{<T_i},
\rho_{\mathrm{NS}}|_{C_{\partial\Omega}\times W},
\Sigma_{\mathrm{sea}}|_{C_{\partial\Omega}\times W},
\mathbf u_{\mathrm{sea}}|_{C_{\partial\Omega}\times W},
\mathcal B_{\partial\Omega}|_W,
\mathcal L_{E\mathbf p\mathbf J}^{(\Omega)}|_W,
\Lambda_{\mathrm{NS}}^H,
\Pi_{\mathrm{ext}}
\right).
$$

The queue's requested $\Sigma_{\mathrm{medium}}$ slot is the canonical $\Sigma_{\mathrm{sea}}$ medium-response record; this packet does not introduce a second symbol. $\Lambda_{\mathrm{NS}}^H$ is an admissibility relation for candidate continuation labels, not a preselected winning label. $\Pi_{\mathrm{ext}}$ contains only observer-level comparison outputs already recoverable from the same source record; it cannot feed standard-physics equations back into the native update.

Plainly: The interface record includes the compact region, its retained history, the surrounding sea state and motion, every wake and conserved-ledger crossing, the allowed label rules, and the exterior readouts used to check the result.

## Required Data And Ownership

| Field | Required content | Authority at SF-001 | Failure when absent |
| --- | --- | --- | --- |
| $\Omega,W,C_{\partial\Omega}$ | Region, absolute-time window, oriented boundary, and finite exterior collar. | Declared problem geometry. | `domain_undeclared` |
| $X_\Omega(T_i)$ | Complete resolved interior state on the initial cut. | Native input. | `initial_state_incomplete` |
| $\mathcal H_\Omega^{<T_i}$ | Retained path histories needed by every delayed root entering $W$. | Native input. | `history_support_incomplete` |
| $\rho_{\mathrm{NS}}$ | Noether sea density/state trace on the collar and its one-sided boundary limits. | Native input. | `sea_density_trace_missing` |
| $\Sigma_{\mathrm{sea}}$ | Sea stress/compliance/response trace, with its constitutive producer named. | Native input; law still open. | `sea_response_trace_missing` |
| $\mathbf u_{\mathrm{sea}}$ | Sea drift/transport trace in the fixed Euclidean frame. | Native input. | `sea_transport_trace_missing` |
| $\mathcal B_{\partial\Omega}$ | Incoming and outgoing causal-wake rows, root identities, directions, delays, and owners. | Native boundary input/output. | `boundary_wake_incomplete` |
| $\mathcal L_{E\mathbf p\mathbf J}^{(\Omega)}$ | Energy-like, linear-momentum, angular-momentum, recoil, remnant, medium-update, and release rows with no duplicate ownership. | Required account interface; values must come from their scientific owner. | `boundary_ledger_open` |
| $\Lambda_{\mathrm{NS}}^H$ | Finite candidate label family plus admissibility and rejection predicates. | Native selection domain. | `label_family_undefined` |
| $\Pi_{\mathrm{ext}}$ | Exterior mass/spin/charge-like, clock, ruler, lensing, and release comparison rows produced from the same record. | Observer-level output/check only. | `exterior_projection_missing` |

The traces must be source-bound to one record identity and one precision policy. A field reconstructed from a different compact source, independently tuned exterior, or later-selected continuation does not satisfy the interface.

Plainly: A plausible picture is not enough. Every input must say where it came from, and the inside, boundary, and outside must all describe the same event history.

## Boundary Operator

The canonical shorthand $F_H=0$ is resolved at contract grade into the vector residual

$$
F_H[\Theta_{\partial\Omega,W}]
=
\left(
\mathcal R_{\mathrm{trace}},
\mathcal R_{\mathrm{delay}},
\mathcal R_{\mathrm{align}},
\mathcal R_{\mathrm{finite}},
\mathcal R_{\mathrm{ledger}},
\mathcal R_{\mathrm{embed}},
\mathcal R_{\mathrm{label}}
\right)
=\mathbf 0.
$$

| Residual | Obligation |
| --- | --- |
| $\mathcal R_{\mathrm{trace}}$ | Interior and exterior one-sided traces agree with the declared boundary state or expose a named finite jump row. |
| $\mathcal R_{\mathrm{delay}}$ | Every admitted causal-root contribution has retained history support, one owner, declared multiplicity, and regularity or quarantine status. |
| $\mathcal R_{\mathrm{align}}$ | The same record evaluates the canonical terminal-alignment target $v_2=c_f$, $v_3\to c_f$ without assigning these roles by taxonomy. |
| $\mathcal R_{\mathrm{finite}}$ | Native density, response, drift, root, wake, ledger, and continuation rows remain finite on the declared window; a failed observer chart is not a native divergence. |
| $\mathcal R_{\mathrm{ledger}}$ | Every boundary crossing and retained interior or exterior channel appears once in the account ledger within declared tolerance. |
| $\mathcal R_{\mathrm{embed}}$ | The local interface and surrounding time-dependent Noether sea are solved on one coupled record rather than as an isolated object plus a pasted background. |
| $\mathcal R_{\mathrm{label}}$ | The admissibility rule returns a finite, nonempty labeled family or an explicit no-solution verdict; it may not silently choose an outgoing history. |

SF-001 defines these components and their required inputs. Their concrete norms, tolerances, and constitutive evaluators belong to the first source-bound carrier that attempts the boundary solve. A scalar weighted sum cannot hide a failed component.

Plainly: The future solver must pass seven separate checks. A good total score cannot compensate for a missing history, an unbalanced boundary ledger, or an arbitrary continuation choice.

## Output And Consumer Handoff

A successful future instance must emit

$$
\mathcal O_H
=
\left(
\operatorname{id}(\Theta_{\partial\Omega,W}),
H_W,
\Theta_H,
\mathcal B_H,
\mathcal L_{\partial\Omega,W},
\Pi_{\mathrm{ext}},
\mathcal F_H,
\mathcal P_H
\right),
$$

where $H_W$ is the interface locus over $W$, $\Theta_H$ is its finite native state, $\mathcal B_H$ is the finite surviving label family, $\mathcal L_{\partial\Omega,W}$ is the closed boundary ledger, $\mathcal F_H$ contains the seven component verdicts, and $\mathcal P_H$ records producer, precision, source identity, and history support. The output must return `Not advanced` if any required input or component is unavailable.

SF-002 may consume $\mathcal O_H$ only after a source-bound carrier provides all fields and each residual has a declared norm, tolerance, and independent check. SF-003 may consume only the same $\mathcal B_H$ and boundary record; SF-004 may consume only release rows already owned by $\mathcal L_{\partial\Omega,W}$. No consumer may infer a solution from this contract alone.

Plainly: This packet gives later tasks a precise input socket. Until a real carrier fills every pin and passes every check, later predictions and entropy or release claims remain blocked.

## Acceptance And Falsifiers

SF-001 is complete at priority-contract grade when the formulation:

- names $\rho_{\mathrm{NS}}$, canonical $\Sigma_{\mathrm{sea}}$, $\mathbf u_{\mathrm{sea}}$, $\Lambda_{\mathrm{NS}}^H$, and $\partial\Omega$ data;
- preserves absolute time, Euclidean space, delayed histories, and acceleration-first ontology;
- distinguishes native inputs, observer-level outputs, admissibility rules, and unresolved constitutive laws;
- requires one embedded source record across interior, interface, exterior, and release rows;
- fails closed on missing histories, roots, ledgers, labels, provenance, or finite bounds;
- and gives SF-002 an explicit no-premature-consumption rule.

The formulation is falsified if a purported compliant instance omits a named input, imports an observer-level metric or standard equation as the native boundary law, solves an isolated object while holding the embedding record unrelated, merges distinct residual failures into one compensating scalar, duplicates a boundary event, selects an outgoing history without an admissibility proof, or exports an observer prediction from an incomplete record.

Plainly: The contract is testable by inspecting one candidate record. Any missing pin, hidden import, duplicate event, unrelated exterior fit, or unearned continuation rejects it.
