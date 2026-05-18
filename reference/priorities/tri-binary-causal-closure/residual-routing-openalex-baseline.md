# OpenAlex Baseline For Residual Routing And Event Ledgers

Queried on May 18, 2026. This baseline supports the residual-routing theorem by reviewing conservation, scattering cuts, event generators, and detector/material ledgers.

## Query Scope

- Conservation-law and symmetry sources.
- Scattering discontinuities and unitarity-style balance.
- Particle-event generators and detector simulations as concrete ledger practices.
- Multi-output events with recoil, remnant, and material updates.

## Review Set

| OpenAlex work | OA cites | Corpus use |
| --- | ---: | --- |
| [Noether, invariant variational problems](https://openalex.org/W4237111979) | 490 | Conservation source for ledger rows. |
| [Cutkosky, discontinuities of Feynman amplitudes](https://openalex.org/W2056443041) | 1194 | Comparator for turning hidden internal structure into explicit channel cuts and output states. |
| [PYTHIA 8.2 event generator](https://openalex.org/W2125102738) | 5175 | Practical event-record model for outgoing inventories, conservation, and provenance. |
| [PYTHIA 8.3 guide](https://openalex.org/W4308821586) | 794 | Updated event-generation reference for multi-stage event structure. |
| [SHERPA event generation](https://openalex.org/W2016801295) | 2024 | Alternate event-generator comparator for channel routing. |
| [Recent developments in Geant4](https://openalex.org/W1990869665) | 3982 | Detector and material-routing comparator. |

## Source Signals

- Event records are not merely validation reports; they are structured balance objects with input terms, output terms, updates, and provenance.
- Scattering-cut literature suggests a useful analogy: a route is accepted only when the selected channel set exposes all physical discontinuity/output terms.
- Detector-simulation references force material update and secondary-channel rows to be explicit, especially for radiation and measurement.

## Corpus Advancement Target

Use the sources to strengthen each residual-route case into row-indexed form:

$$
\Delta_r(\mathsf e)
=
\sum_{\alpha\in\mathcal{I}_{\text{in}}}q_r(\alpha;X)
-
\sum_{\beta\in\mathcal{I}_{\text{out}}(I_{\mathsf e})}q_r(\beta;Y_{\mathsf e})
-
\Delta q_r^{\mathrm{upd}}(X,Y_{\mathsf e})
=0.
$$

The first worked case should be a radiation or measurement event because those cases force simultaneous photon/output, recoil, material update, and record rows. A route that only balances energy is not mature.

## Initial Linkages

- [tri-binary-causal-closure](tri-binary-causal-closure.md): photon/QED and radiation Gate C.
- [quantum-closure](../quantum-closure/quantum-closure.md): measurement-record formation.
- [strong-field-closure](../strong-field-closure/strong-field-closure.md): release-channel accounting.
