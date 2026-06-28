# Bell-Test Violations

## Standard-Theory Concept

Bell tests compare measured correlations against inequalities satisfied by local factorizable hidden-variable models. For the CHSH combination, local factorizable models satisfy $|S|\le2$, while quantum mechanics permits $|S|\le2\sqrt2$ and experiments violate the local bound while preserving no-signaling.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

Bell is a hard replacement constraint, not an ontology shortcut. The corpus already routes Bell through angular-momentum closure, pair provenance, detector kernels, basin measures, no-signaling, and preferred-frame leakage discipline. The relevant task is to show which Bell abstraction assumption fails when full causal history and detector response are retained, while still recovering the validated correlations and keeping absolute-frame access below Lorentz-test bounds.

## Task Queue

1. `pair_provenance` — Define the complete source-pair ledger and shared conservation record. Status: `draft`.
2. `local_response_kernels` — Construct local apparatus kernels $K_A,K_B$ from target and apparatus state. Status: `draft`.
3. `correlation_recovery` — Recover spin or photon polarization correlations within Tsirelson-compatible bounds. Status: `draft`.
4. `no_signaling_gate` — Prove that local marginals do not transmit controllable signals by deriving local-setting relabeling invariance of the joint basin measure, rather than adding no-signaling as a post-fit cancellation. Status: `draft`.
5. `ordering_invariance_gate` — Prove that observer-level spacelike-separated joint tables do not depend on whether the substrate order is $A\prec_tB$ or $B\prec_tA$ in absolute time, while also reporting the $c_f$ causal-wake reach margins for the two record-closure windows. Status: `draft`.
6. `preferred_frame_handoff` — Show that the same observer export used for Bell records keeps clock, signal-timing, analyzer-calibration, coincidence-window, and ordering preferred-frame leakage below Lorentz-test bounds. Status: `draft`.

## Closure Objects

- Pair provenance ledger $\mathcal{P}_{AB}$.
- Local detector kernels $K_A(a|\alpha,\Gamma_A,\mathcal{H}_A)$ and $K_B(b|\beta,\Gamma_B,\mathcal{H}_B)$.
- Joint basin measure $\mu_{AB}$.
- Local-setting relabeling invariance of $\mu_{AB}$ at each wing.
- Ordering-invariance residual $\Delta_{\mathrm{ord}}$ for the two absolute-time order sectors of observer-level spacelike-separated records.
- Record-formation maps $R_A,R_B$ and the commutation target $\mu_{AB}(R_A\circ R_B)=\mu_{AB}(R_B\circ R_A)$ on the spacelike-separated record algebra.
- Wake-reach margins $\Delta_{\mathrm{reach}}^{A\to B}$ and $\Delta_{\mathrm{reach}}^{B\to A}$ for the $c_f$ causal-wake relation during the measurement windows.
- Correlation target $E(\alpha,\beta)$ and CHSH statistic $S$.
- No-signaling marginal tests.
- Preferred-frame leakage residual inherited from the Lorentz / PPN observer-export channel.

## Ordering-Invariance And Wake-Reach Sign Condition

The ordering-invariance gate is a basin-measure commutation target. If $R_A$ and $R_B$ are the record-formation maps for the two wings, then the observer-accessible joint law must satisfy

$$
\mu_{AB}(R_A\circ R_B)
=
\mu_{AB}(R_B\circ R_A)
$$

on the spacelike-separated record algebra, up to the declared residual $\Delta_{\mathrm{ord}}\le\epsilon_{\mathrm{ord}}$. A useful residual form is

$$
\Delta_{\mathrm{ord}}
=
\sup_{\alpha,\beta,a,b}
\left|
P_{A\prec_tB}(a,b|\alpha,\beta)
-
P_{B\prec_tA}(a,b|\alpha,\beta)
\right|.
$$

This condition must be evaluated against the primitive causal-wake speed $c_f$, not only the dressed photon-channel speed $c_\gamma$. For record-closure windows $W_A=[t_A,t_A+\tau_A]$ and $W_B=[t_B,t_B+\tau_B]$ with $d_{AB}=\|\mathbf{x}_A-\mathbf{x}_B\|$, define

$$
\Delta_{\mathrm{reach}}^{A\to B}
=
t_B+\tau_B-t_A-\frac{d_{AB}}{c_f},
\qquad
\Delta_{\mathrm{reach}}^{B\to A}
=
t_A+\tau_A-t_B-\frac{d_{AB}}{c_f}.
$$

If both margins are negative, the record windows are mutually outside $c_f$ causal-wake reach. If either margin is nonnegative, the candidate sits in a wake-reach exposure window. For $c_f>c_\gamma$, this includes pairs that are photon-spacelike but wake-timelike. A successful Bell packet must either keep the tested record windows in the negative-margin regime or show that wake-reach coupling, timing statistics, analyzer calibration, and coincidence-window selection keep $\Delta_{\mathrm{ord}}$ below tolerance.

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
- `bell.ordering_leakage`: joint tables depend on which wing is first in absolute time for observer-level spacelike-separated records.
- `bell.wake_reach_leakage`: a photon-spacelike but wake-timelike record-window pair exposes absolute-frame order through timing statistics, analyzer response, coincidence windows, or correlation residuals.
- `bell.preferred_frame_leakage`: the correlation fit requires observer-accessible absolute-frame drift in clocks, signal timing, analyzer calibration, coincidence-window selection, or ordering statistics.
