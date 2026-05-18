# OpenAlex Baseline For Dyadic Resonance Lock

Queried on May 18, 2026. This baseline supports the reduced phase-amplitude return-map program for dyadic resonance selection.

## Query Scope

- Nonlinear oscillations, bifurcations, and return maps.
- Synchronization, phase locking, and oscillator ensembles.
- Mode-locking and recurrence diagnostics.
- Biological and physical oscillator references useful only as reduced-map comparators.

## Review Set

| OpenAlex work | OA cites | Corpus use |
| --- | ---: | --- |
| [Guckenheimer-Holmes nonlinear oscillations](https://openalex.org/W2089876099) | 16158 | Core reference for bifurcation and return-map discipline. |
| [Pikovsky-Rosenblum-Kurths synchronization](https://openalex.org/W1620414136) | 5687 | Main comparator for phase locking and oscillator synchronization. |
| [Strogatz nonlinear dynamics and chaos](https://openalex.org/W2605543710) | 4735 | General reduced-map and stability reference. |
| [Winfree biological time geometry](https://openalex.org/W2088678566) | 3626 | Phase-response and entrainment comparator, not an ontology import. |
| [Kuramoto synchronization paradigm](https://openalex.org/W2168448159) | 3477 | Mean-field oscillator benchmark for phase-locking intuition. |
| [Recurrence plots for complex systems](https://openalex.org/W2081681829) | 3746 | Diagnostics reference for recurrence and return-map structure. |

## Source Signals

- The dyadic claim needs a return-map stability proof or numerical certificate; integer ratios alone are not enough.
- Synchronization literature distinguishes entrainment, phase locking, basin capture, and global stability. The dyadic program should declare which one it has.
- Recurrence diagnostics can help decide whether a candidate `1:2` branch is an attractor or only a transient near-lock.

## Corpus Advancement Target

Use the sources to formalize the finite-$\eta$ two-layer return map:

$$
R_{\eta}:(\phi,a,\nu,\ell)\mapsto(\phi',a',\nu',\ell'),
$$

where $\phi$ is relative phase, $a$ is an amplitude or radius coordinate, $\nu$ is speed/frequency data, and $\ell$ records active branch counts. The `1:2` claim should require

$$
R_{\eta}(\gamma_{1:2})=\gamma_{1:2},
\qquad
\rho(DR_{\eta}|_{N})<1
$$

on non-symmetry directions $N$. The corpus should not promote `1:2:4` until the chained map passes the same diagnostic.

## Initial Linkages

- [transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md): basin measure and metastability grammar.
- [simulations](../simulations/simulations.md): finite-$\eta$ executable diagnostics.
- [master-equation-closure](../master-equation-closure/master-equation-closure.md): branch-chart and causal-root input.
