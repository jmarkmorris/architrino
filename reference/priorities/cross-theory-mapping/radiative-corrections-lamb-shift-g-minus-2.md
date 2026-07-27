# Radiative Corrections: Lamb Shift And $g-2$

## Standard-Theory Concept

The Lamb shift and anomalous magnetic moments are precision QED benchmarks. Standard theory computes them from radiative corrections, renormalization, spin coupling, and loop effects. For a lepton magnetic moment,

$$
g=2(1+a),
$$

where $a$ is the anomalous contribution. These cases are not merely "UV divergence"; they test whether regularization and renormalization produce precise finite observables.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ has causal-wake regularization, mollification, angular-momentum closure, photon Gate B/C, and mass/exposure maps. These cases pressure the theory to distinguish observer-level QED loop bookkeeping from substrate causal-wake self-interaction and medium response. They should remain high-risk until spin, photon, and measurement ledgers mature.

## Vacuum-Effect Benchmark Bundle

The durable lesson from vacuum-language sources is not that empty space has hidden magic. The useful benchmark bundle is that Lamb shift, anomalous magnetic moments, vacuum polarization, pair production, and boundary-sensitive effects all force the theory to recover finite observer-level corrections from Noether sea response, causal-wake dressing, material boundaries, and event ledgers.

Use one bundle record for these comparisons:
$$
\Theta_{\mathrm{vac\ eff}}
=
\left(
\theta_{\mathrm{sea}},
\mathcal W_{\mathrm{wake}},
\mathcal B_{\mathrm{mat}},
\mathcal L_{\gamma},
\mathcal L_{\mathrm{pair}},
\mathcal R_{\mathrm{bench}}
\right).
$$
Here $\theta_{\mathrm{sea}}$ is the retained Noether sea state, $\mathcal W_{\mathrm{wake}}$ is the causal-wake dressing or self-interaction record, $\mathcal B_{\mathrm{mat}}$ is the material or atomic boundary branch when present, $\mathcal L_{\gamma}$ is the photon Gate B/C ledger, and $\mathcal L_{\mathrm{pair}}$ is the pair-channel provenance ledger. The benchmark residual should decompose as
$$
\mathcal R_{\mathrm{bench}}
=
w_L\mathcal R_{\mathrm{Lamb}}
+w_g\mathcal R_{g-2}
+w_{\mathrm{pol}}\mathcal R_{\mathrm{vac\ pol}}
+w_{\mathrm{pair}}\mathcal R_{\mathrm{pair}}
+w_C\mathcal R_{\mathrm{Casimir}}.
$$
The weights select the active benchmark family; they are not fit knobs. The value of the bundle is same-record discipline: a calculation may use QED loop language as an observer-level comparison, but it must not switch Noether sea state, boundary response, photon ledger, or pair provenance separately for each correction.

## Precision Benchmark Boundary

QED precision is a hard recovery constraint, not an ontology proof. Agreement among precision observables and independent extractions of $\alpha$ constrains the observer-level electromagnetic record and the effective gauge bookkeeping that $\mathbb{A}\mathbb{A}\mathbb{A}$ must recover. It does not remove the implementation burden: the same benchmark packet must still show how causal-wake regularization, Noether sea response, photon ledgers, spin response, material boundaries, and detector records produce the finite correction being compared.

## Task Queue

1. `regularization_dictionary` — Map QED regularization objects to causal-wake mollification and finite ledger observables. Status: `draft`.
2. `lamb_shift_proxy` — Identify the first atomic spectral shift that can be modeled from material, photon, and Noether sea response records. Status: `draft`.
3. `g_minus_2_gate` — Treat anomalous magnetic moment as a downstream angular-momentum and photon-correction benchmark. Status: `draft`.
4. `vacuum_effect_bundle` — Keep Lamb shift, anomalous magnetic moments, vacuum polarization, pair channels, and Casimir-style boundary effects on one Noether sea, wake, material-boundary, photon, and pair-provenance record when they are compared as vacuum-sensitive effects. Status: `draft`.

## Closure Objects

- Regularized causal-wake functional with $\eta>0$ and weak-limit behavior.
- Spin and magnetic-response ledger from angular-momentum closure.
- Photon Gate B/C correction record for emitted and exchanged effective photons.
- Shared vacuum-effect carrier $\Theta_{\mathrm{vac\ eff}}$ with Noether sea state, causal-wake dressing, material boundary branch, photon ledger, and pair-channel ledger.
- Benchmark residuals $\delta E_{\mathrm{Lamb}}$ and $\delta a_\ell$.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | angular-momentum-spin | Keep $g-2$ downstream of spin and magnetic-response closure. |
| This file | [Radiation](../../../content/markdown/aaa/reactions/radiation.md) | Route radiative corrections through photon and event-ledger gates. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Classify QED precision as a hard benchmark but not an early ontology source. |

## Failure Modes

- `qed.precision_overclaim`: precision benchmarks are claimed before spin, photon, and detector ledgers exist.
- `qed.cutoff_fit`: finite results require a fitted cutoff with no substrate meaning.
- `qed.loop_ontology_confusion`: QED loop diagrams are treated as literal substrate paths.
- `qed.atomic_split`: Lamb-shift handling conflicts with atomic spectra, blackbody, or photon Gate C records.
