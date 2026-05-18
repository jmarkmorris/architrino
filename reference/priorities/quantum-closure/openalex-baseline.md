# OpenAlex Baseline For Quantum Closure

Queried on May 18, 2026. This baseline supports deferred Born-rule, measurement, pair-provenance, Bell, decoherence, and pilot-wave stress tests.

## Query Scope

- Bell, CHSH, contextuality, and experimental Bell tests.
- Decoherence, einselection, and record redundancy.
- Hidden-variable and pilot-wave comparison sources.
- Measure-theoretic probability constraints.

## Review Set

| OpenAlex work | OA cites | Corpus use |
| --- | ---: | --- |
| [Bell, EPR paradox theorem](https://openalex.org/W2135830616) | 12163 | Bell hard gate for any local pair-provenance compression. |
| [CHSH proposed experiment](https://openalex.org/W2028815089) | 7556 | Operational inequality and detector-setting benchmark. |
| [Aspect time-varying analyzer Bell test](https://openalex.org/W2014306526) | 3897 | Experimental analyzer-setting pressure. |
| [Bohm hidden-variable interpretation I](https://openalex.org/W2229076839) | 5499 | Pilot-wave comparison source; useful as stress-test language, not ontology import. |
| [Gleason Hilbert-space measure theorem](https://openalex.org/W2070217890) | 1023 | Measure-theoretic pressure on probability recovery. |
| [Kochen-Specker contextuality obstruction](https://openalex.org/W4238804566) | 1197 | Contextuality pressure for detector-response kernels. |
| [Zurek decoherence and einselection review](https://openalex.org/W2125303188) | 4205 | Record-formation and classical-readout comparator. |
| [Quantum Darwinism](https://openalex.org/W3037859133) | 524 | Redundant-record comparison after native apparatus records are defined. |

## Source Signals

- Bell-family sources require the theory to identify exactly which Bell abstraction fails after pair provenance and local detector state are compressed.
- Decoherence and Quantum Darwinism sources suggest record redundancy is a validation target, but the native event ledger still has to close first.
- Gleason and contextuality sources require probability weights to arise from a constrained measure, not from a post hoc frequency table.

## Corpus Advancement Target

Use the sources to force the Born-rule route through the shared basin grammar:

$$
p_i
=
\mu_*(B_i),
\qquad
B_i
=
\{\gamma:\pi_{\mathrm{reg}}(\Phi_{\tau_{\text{rec}}}\gamma)\in W_i\}.
$$

For Bell closure, the next review should demand the candidate source measure

$$
\rho_{\mathrm{src}}(\Pi_{AB}\mid P_{\mathrm{src}})
=
C_{\mathrm{pair}*}\mu_{\mathrm{src}}
$$

and local detector kernels before computing CHSH. Any route that assumes the quantum answer before these objects exist should be marked as a failed shortcut.

## Initial Linkages

- [transfer-operator-basin-measure](transfer-operator-basin-measure.md): measure and basin engine.
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md): spinor, measurement, and photon Gate B prerequisites.
- [residual-routing-event-ledger](../tri-binary-causal-closure/residual-routing-event-ledger.md): physical record formation.
