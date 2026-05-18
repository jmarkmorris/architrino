# OpenAlex Baseline For Standard Model Closure

Queried on May 18, 2026. This baseline gives the Standard Model workstream a compact source set for electroweak, flavor, confinement, scalar, and nuclear-bridge recovery.

## Query Scope

- Electroweak unification and weak-interaction symmetry.
- CKM/PMNS-style flavor mixing and neutrino appearance.
- QCD asymptotic freedom, confinement, and nuclear-force coarse graining.
- Higgs-sector discovery benchmarks.

## Review Set

| OpenAlex work | OA cites | Corpus use |
| --- | ---: | --- |
| [Weinberg, lepton model](https://openalex.org/W2070151728) | 7266 | Electroweak benchmark for weak/gauge closure. |
| [Glashow, weak-interaction partial symmetries](https://openalex.org/W2232454336) | 4649 | Weak symmetry comparator for axial-frame exposure and gauge covariance. |
| [Kobayashi-Maskawa CP-violation framework](https://openalex.org/W2995204290) | 209 | CKM target for overlap-integral derivation. |
| [T2K electron-neutrino appearance indication](https://openalex.org/W2115891487) | 1347 | PMNS/neutrino-mixing benchmark pressure. |
| [Gross-Wilczek asymptotically free gauge theories](https://openalex.org/W2136764900) | 1406 | QCD running and strong-sector benchmark. |
| [Wilson, quark confinement](https://openalex.org/W2172949211) | 4408 | Confinement target for hadronic closure. |
| [CMS Higgs discovery benchmark](https://openalex.org/W2167727518) | 9937 | Scalar-sector acceptance target. |
| [Modern theory of nuclear forces](https://openalex.org/W2096487969) | 1849 | Nuclear potential and hadronic-to-nuclear bridge reference. |

## Source Signals

- Electroweak and flavor papers require one weak-sector exposure/gauge packet, not separate local stories for `V-A`, CKM, PMNS, and weak-corridor provenance.
- QCD and confinement sources force quark mass predictions to be checked against color/topological exposure and hadron energetics.
- Higgs-sector papers should enter as scalar residual benchmarks after mass-map and weak-sector handoffs, not as primitive scalar ontology.

## Corpus Advancement Target

Use the sources to state Standard Model closure as a product of shared objects:

$$
\theta_{\mathrm{SM}}
=
\left(
\mathcal{E}_{\mathrm{weak}},
\mathcal{E}_{\mathrm{color}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{M}_{\text{sea}}^{ab},
\{B_i\}_{\mathrm{reaction}},
\mathcal{B}_{\mathrm{SM}}
\right).
$$

The first review pass should bind each benchmark to the object it tests: weak overlap, confinement, scalar residual, reaction provenance, or nuclear coarse graining. If a benchmark cannot be assigned to one of those objects, it should remain a comparison note rather than a closure target.

## Initial Linkages

- [mass-map](../mass-map/mass-map.md): scalar response, quark masses, and hierarchy checks.
- [exposure-quotient-theorem](../mass-map/exposure-quotient-theorem.md): weak, color, photon, and vector-corridor visibility.
- [residual-routing-event-ledger](../tri-binary-causal-closure/residual-routing-event-ledger.md): reaction provenance and event closure.
