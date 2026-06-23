# Bell-Test Violations

## Standard-Theory Concept

Bell tests compare measured correlations against inequalities satisfied by local factorizable hidden-variable models. For the CHSH combination, local factorizable models satisfy $|S|\le2$, while quantum mechanics permits $|S|\le2\sqrt2$ and experiments violate the local bound while preserving no-signaling.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

Bell is a hard replacement constraint, not an ontology shortcut. The corpus already routes Bell through angular-momentum closure, pair provenance, detector kernels, basin measures, and no-signaling. The relevant task is to show which Bell abstraction assumption fails when full causal history and detector response are retained, while still recovering the validated correlations.

## Task Queue

1. `pair_provenance` — Define the complete source-pair ledger and shared conservation record. Status: `draft`.
2. `local_response_kernels` — Construct local apparatus kernels $K_A,K_B$ from target and apparatus state. Status: `draft`.
3. `correlation_recovery` — Recover spin or photon polarization correlations within Tsirelson-compatible bounds. Status: `draft`.
4. `no_signaling_gate` — Prove that local marginals do not transmit controllable signals. Status: `draft`.

## Closure Objects

- Pair provenance ledger $\mathcal{P}_{AB}$.
- Local detector kernels $K_A(a|\alpha,\Gamma_A,\mathcal{H}_A)$ and $K_B(b|\beta,\Gamma_B,\mathcal{H}_B)$.
- Joint basin measure $\mu_{AB}$.
- Correlation target $E(\alpha,\beta)$ and CHSH statistic $S$.
- No-signaling marginal tests.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [angular-momentum-spin/photon-measurement-bell-gates](../braid-angular-momentum-spin/photon-measurement-bell-gates.md) | Keep Bell downstream of spin/photon detector-response closure. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Make Bell a joint basin-measure and pair-provenance proof target. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add Bell/CHSH/Tsirelson as a replacement constraint with no-signaling. |

## Failure Modes

- `bell.classical_axis`: the model reduces to classical-axis linear correlations.
- `bell.signal_transfer`: correlations require controllable superluminal signal transfer.
- `bell.measurement_independence_blur`: source, settings, and detector records are conflated without a precise assumption map.
- `bell.no_pair_ledger`: singlet or polarization correlations are asserted without source-pair provenance.
