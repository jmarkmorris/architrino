# Observer Export Status Row

Promotion status: `priority-only`. This packet defines the status discipline for Lorentz, photon, mass-map, color, strong-field, and cosmology observer exports from a Noether braid branch. It refines [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md), [action-and-noether-closure-row.md](action-and-noether-closure-row.md), and [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md).

The purpose is to prevent downstream recovery claims from driving the base proof. Observer exports are computed rows:

$$
\text{retained branch}
\Longrightarrow
\text{observer export statuses}.
$$

They are not branch-existence evidence by themselves.

---

## 1. Export Preconditions

An export row may be reported only after the branch packet declares:

$$
\mathsf{B}(W)
=
\left(
\mathsf{Root}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Dynamics}^{\nu},
\mathsf{Support}^{\nu},
\mathsf{Action}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Stability},
\mathsf{Inventory}
\right)
$$

on one live ledger. If any component is absent, the export may still be listed, but its status must be

$$
\texttt{not\_computed}
$$

or

$$
\texttt{blocked:<first-failure-row>}.
$$

The export packet must not silently replace a missing upstream row with a phenomenological fit.

---

## 2. Common Status Vocabulary

Every observer export uses one of these statuses:

| Status | Meaning |
| --- | --- |
| `passed` | computed on the retained branch ledger and below tolerance |
| `failed` | computed on the retained branch ledger and outside tolerance |
| `not_computed` | upstream branch rows exist but the export was not evaluated |
| `blocked:<row>` | upstream branch row is missing or failed |
| `comparison_only` | useful bridge or heuristic, not a closure target |
| `invalid_mixed_ledger` | computed on a different root, support, action, or event convention |

This vocabulary lets a retained branch packet carry honest downstream results without overpromoting them.

---

## 3. Export Tuple

The observer export block is

$$
\mathsf{Export}(B)
=
\left(
\mathsf{Lorentz},
\mathsf{Photon},
\mathsf{MassMap},
\mathsf{Color},
\mathsf{StrongField},
\mathsf{Cosmology},
\mathsf{Status}
\right).
$$

Each component has a residual and a status:

$$
\mathsf{Lorentz}
=
\left(
\mathcal{R}_{\mathrm{clk}},
\mathcal{R}_{\mathrm{ruler}},
\mathcal{R}_{\mathrm{tw}},
\mathcal{R}_{\mathrm{pf}},
\mathrm{status}
\right),
$$

$$
\mathsf{Photon}
=
\left(
\mathcal{R}_{\gamma\mathrm{\text{-}pair}},
\mathcal{R}_{\gamma\mathrm{\text{-}event}},
\mathcal{R}_{\gamma\mathrm{\text{-}trans}},
\mathrm{status}
\right),
$$

$$
\mathsf{MassMap}
=
\left(
E_{\mathrm{hist}},
\zeta,
\mathcal{Z}^{ab},
\mathcal{M}_{\mathrm{sea}}^{ab},
\mathcal{R}_{\mathrm{exposure}},
\mathrm{status}
\right).
$$

Color, strong-field, and cosmology rows may remain `not_computed` until the branch has a reason to evaluate them.

---

## 4. Lorentz Export

The Lorentz export consumes a moving branch row and reports

$$
\mathcal{R}_{\mathrm{Lorentz}}
=
\left(
\Theta_{\mathrm{clk}}-\gamma^{-1},
\xi-\gamma^{-1},
\Delta_{\mathrm{tw}},
\mathcal{A}_{\mathrm{pf}}
\right).
$$

The row passes only if the clock, ruler, two-way synchronization, and preferred-frame leakage diagnostics are computed from the same moving branch ledger. The status is `blocked:action-noether-open` if the branch has no action-derived scale or event conservation row, even when the kinematic clock ratio looks favorable.

---

## 5. Photon Export

The photon export is a transition-row target. It may pass only if the branch transition produces or consumes the canonical photon ontology as a coaxial contra-rotating pro/anti planar pair and closes the event ledger:

$$
\mathcal{R}_{\gamma}
=
\left(
\mathcal{R}_{\mathrm{coax}},
\mathcal{R}_{\mathrm{contra}},
\mathcal{R}_{\mathrm{planar}},
\mathcal{R}_{E\mathbf{p}\mathbf{J}Q}^{\gamma}
\right).
$$

A visual planar-pair match without event provenance is

$$
\texttt{blocked:photon-event-ledger-open}.
$$

---

## 6. Mass-Map Export

The mass-map export consumes internal history energy, shielding/exposure, and Noether sea medium response:

$$
m_{\mathrm{tr}}
\sim
\mathcal{F}
\left(
E_{\mathrm{hist}},
\zeta,
\mathcal{Z}^{ab},
\mathcal{M}_{\mathrm{sea}}^{ab}
\right).
$$

Topology, shell labels, or branch-family names are allowed only as parameters that change one of these quantities. They are not mass laws by themselves.

The mass-map row is `invalid_mixed_ledger` if $E_{\mathrm{hist}}$, $\zeta$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$ come from different branch conventions.

---

## 7. Strong-Field And Cosmology Exports

Strong-field and cosmology rows are downstream comparison targets unless a retained branch supplies finite-boundary continuation and observer-level translation:

$$
\mathsf{StrongField}
=
\left(
\mathcal{R}_{\mathrm{finite\text{-}boundary}},
\mathcal{R}_{\mathrm{horizon}},
\mathcal{R}_{\mathrm{event}},
\mathrm{status}
\right),
$$

$$
\mathsf{Cosmology}
=
\left(
\mathcal{R}_{a(t)},
\mathcal{R}_{H(t)},
\mathcal{R}_{z},
\mathcal{R}_{T_{\mathrm{CMB}}},
\mathrm{status}
\right).
$$

These rows must preserve the ontology distinction: the Euclidean void does not expand; observer variables are effective summaries of Noether sea evolution, transport, and clock-rate comparison.

---

## 8. Promotion Rule

The observer export block may enter a retained branch packet only as statused evidence. It may enter reader-facing corpus prose only when the statement is self-contained and claim-level safe:

| Corpus statement type | Required export status |
| --- | --- |
| theorem result | `passed` on a retained branch and proof route documented |
| theorem target | upstream rows defined and export residual stated |
| effective summary | branch status and coarse-graining assumptions declared |
| comparison | `comparison_only` or explicitly speculative |

If the upstream branch remains priority-only, export rows remain priority-only too.
