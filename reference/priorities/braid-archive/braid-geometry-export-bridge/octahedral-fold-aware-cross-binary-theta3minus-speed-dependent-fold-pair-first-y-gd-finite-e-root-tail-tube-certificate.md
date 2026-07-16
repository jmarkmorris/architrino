# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Finite E Root-Tail Tube Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.md). It tests the next closure route: whether the certified seed $E_\varepsilon(0,\nu)=h_{21,\varepsilon}$ can be inflated into a finite $E_\varepsilon(y,\nu)$ root-tail tube by direct endpoint signs on the existing Taylor-cancelled scaled root graph.

It does not certify the finite $E_\varepsilon$ tube. It certifies the obstruction to the direct route: the existing direct $H_\varepsilon$ evaluator preserves the $J$ and direct $\partial_EH$ signs on positive first-y subcells, but it sees $E$ only through the tiny factor $y^{21}E$. Therefore it cannot resolve the $\operatorname{Shift}_{25}$ cancellation needed for the finite tube.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Direct-H Obstruction

The root-tail equation should be solved in shifted form:

$$
R_\varepsilon(y,E,\nu)
=
\operatorname{Shift}_{25}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le20}+y^{21}E,\nu)
\right).
$$

The direct diagnostic instead evaluates the already available scaled root-graph equation

$$
H_\varepsilon(y,h,\nu)
$$

with

$$
h=h_{\varepsilon,\le20}+y^{21}E.
$$

This route is useful as a negative control. It preserves the monotone derivative sign, but the derivative seen by the direct evaluator is suppressed by

$$
\partial_EH_\varepsilon
=
y^{21}\partial_hH_\varepsilon,
$$

so endpoint signs cannot be forced by any physically useful finite seed padding. The certificate evaluates positive first-y subcells only and records `raw_y_inverse_division_used=false`; the zero-touching endpoint still requires symbolic shifting.

## Certified Result

The diagnostic uses $16$ first-y subcells and evaluates the $15$ positive subcells for both branches over all $128$ speed cells, giving $3840$ direct probe rows. The candidate tube is

$$
E_{\varepsilon,\mathrm{tube}}
=
[h_{21,\varepsilon}^{-}-10^{16},h_{21,\varepsilon}^{+}+10^{16}].
$$

Across the direct probe rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| positive-y direct probe rows | $3840$ |
| inherited root-tail seed artifact valid | `true` |
| all direct $H$ endpoint signs fail to certify the tube | `true` |
| all direct $H$ endpoint intervals contain zero | `true` |
| all direct $J$ signs certified | `true` |
| all direct $\partial_EH$ signs certified | `true` |
| all rows avoid raw $y^{-1}$ division | `true` |
| all finite $E_\varepsilon$ tubes remain open | `true` |
| all $\operatorname{Shift}_{25}$ finite-y evaluators remain open | `true` |
| minimum direct $J$ clearance | $0.791609030532$ |
| minimum direct $\partial_EH$ clearance | $9.06225663729\times10^{-84}$ |
| maximum additional $E$ padding required by the direct endpoint-sign route | $1.09002045649\times10^{80}$ |
| direct left-endpoint $H$ interval hull | $[-0.000994320972445,0.00099428717414]$ |
| direct right-endpoint $H$ interval hull | $[-0.000994320972445,0.00099428717414]$ |
| inherited remaining $Q_G$ twenty-second-order-tail budget | $2.16128325002\times10^{59}$ |
| inherited remaining $Q_D$ twenty-second-order-tail budget | $2.16114031195\times10^{59}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-finite-E-root-tail-tube-obstruction-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_direct\_H\_obstruction\_to\_finite\_E\_root\_tail\_tube=true}.
$$

It does not claim:

$$
\texttt{certifies\_shift\_25\_finite\_y\_residual\_evaluator=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_E\_root\_tail\_tube=false},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-twenty-first-order-root-tail-seed` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-direct-H-finite-E-obstruction` | directed-rounded obstruction certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift25-E-root-tail-tube` | requires finite-y $\operatorname{Shift}_{25}$ evaluator |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by finite $E_\varepsilon$ root-tail tube |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.mjs). It emits:

- direct positive-y endpoint-sign rows for $H_\varepsilon(y,h_{\le20}+y^{21}E,\nu)$;
- inherited seed intervals and post-seed $Q_G,Q_D$ tail budgets;
- direct $J$ and direct $\partial_EH$ sign clearances;
- the additional $E$ padding that direct endpoint signs would require;
- explicit open flags for the finite $\operatorname{Shift}_{25}$ evaluator, finite $E_\varepsilon$ tube, full quotient, scaled remainder, `I1`, and retained branch status.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-e-root-tail-tube-certificate.test.js) validates schema, no-fixed-speed-window discipline, direct-H obstruction metrics, overclaim rejection, and CLI write/validate behavior.
