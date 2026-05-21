# Radiative Corrections: Lamb Shift And $g-2$

## Standard-Theory Concept

The Lamb shift and anomalous magnetic moments are precision QED benchmarks. Standard theory computes them from radiative corrections, renormalization, spin coupling, and loop effects. For a lepton magnetic moment,

$$
g=2(1+a),
$$

where $a$ is the anomalous contribution. These cases are not merely "UV divergence"; they test whether regularization and renormalization produce precise finite observables.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ has causal-wake regularization, mollification, angular-momentum closure, photon Gate B/C, and mass/exposure maps. These cases pressure the theory to distinguish observer-level QED loop bookkeeping from substrate causal-wake self-interaction and medium response. They should remain high-risk until spin, photon, and measurement ledgers mature.

## Task Queue

1. `regularization_dictionary` — Map QED regularization objects to causal-wake mollification and finite ledger observables. Status: `draft`.
2. `lamb_shift_proxy` — Identify the first atomic spectral shift that can be modeled from material, photon, and Noether-Sea response records. Status: `draft`.
3. `g_minus_2_gate` — Treat anomalous magnetic moment as a downstream angular-momentum and photon-correction benchmark. Status: `draft`.

## Closure Objects

- Regularized causal-wake functional with $\eta>0$ and weak-limit behavior.
- Spin and magnetic-response ledger from angular-momentum closure.
- Photon Gate B/C correction record for emitted and exchanged effective photons.
- Benchmark residuals $\delta E_{\mathrm{Lamb}}$ and $\delta a_\ell$.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md) | Keep $g-2$ downstream of spin and magnetic-response closure. |
| This file | [tri-binary-causal-closure/radiation-gate-c-benchmarks](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Route radiative corrections through photon and event-ledger gates. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Classify QED precision as a hard benchmark but not an early ontology source. |

## Failure Modes

- `qed.precision_overclaim`: precision benchmarks are claimed before spin, photon, and detector ledgers exist.
- `qed.cutoff_fit`: finite results require a fitted cutoff with no substrate meaning.
- `qed.loop_ontology_confusion`: QED loop diagrams are treated as literal substrate paths.
- `qed.atomic_split`: Lamb-shift handling conflicts with atomic spectra, blackbody, or photon Gate C records.
