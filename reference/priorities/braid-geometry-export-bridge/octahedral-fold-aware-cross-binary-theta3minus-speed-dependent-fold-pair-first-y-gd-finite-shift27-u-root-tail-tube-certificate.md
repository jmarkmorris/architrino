# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Finite Shift27 U Root-Tail Tube Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record   and ^{\mathrm{rec}} are regenerated and accepted.

This packet continues the $U$-seed coefficient solve in
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.md). It closes the finite positive-y root-tail tube for the sharper post-seed coordinate $U_\varepsilon(y,\nu)$, without claiming the continuous $G,D$ quotient-tail bound.

The proof advance is a coefficient-shifted $\operatorname{Shift}_{27}$ evaluator for the finite $U_\varepsilon$ root-tail tube. The zero endpoint is inherited from the certified seed $U_\varepsilon(0,\nu)=h_{23,\varepsilon}(\nu)$; the positive first-y subcells are certified by endpoint signs, the shifted derivative identity $\partial_U R_{\varepsilon,27}=J$, and containment of the induced $E_\varepsilon$ image inside the predecessor $E_\varepsilon$ tube.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Shifted U Tube

The post-seed root graph is written

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le22}(y,\nu)+y^{23}U_\varepsilon(y,\nu),
$$

so

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{22}h_{k,\varepsilon}y^{k+3}
+y^{26}U.
$$

For a finite tube around the $U$ seed,

$$
U_{\varepsilon,\mathrm{tube}}
=
[h_{23,\varepsilon}^{-}-10^{16},h_{23,\varepsilon}^{+}+10^{16}],
$$

the certified evaluator is

$$
R_{\varepsilon,27}(y,U,\nu)
=
\operatorname{Shift}_{27}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le22}+y^{23}U,\nu)
\right).
$$

The coefficient-shift policy is zero-safe: coefficients $y^0$ through $y^{26}$ are dropped only after interval containment of zero has been certified. No raw division by a zero-touching $y$ interval is used.

The finite $U_\varepsilon$ tube also has to remain compatible with the already-certified $E_\varepsilon$ tube. The executable certifies

$$
E_\varepsilon(y,\nu)
=
h_{21,\varepsilon}(\nu)
+yh_{22,\varepsilon}(\nu)
+y^2U_\varepsilon(y,\nu)
$$

inside the predecessor $E_{\varepsilon,\mathrm{tube}}$ on every positive-y subcell.

For each positive first-y subcell and each branch, the endpoint signs are tested on the left and right endpoints of $U_{\varepsilon,\mathrm{tube}}$. The expected branch orientation is

$$
(-):\quad R_{\varepsilon,27}(U^-)\lt0,\quad R_{\varepsilon,27}(U^+)\gt0,\quad \partial_U R_{\varepsilon,27}\gt0,
$$

and

$$
(+):\quad R_{\varepsilon,27}(U^-)\gt0,\quad R_{\varepsilon,27}(U^+)\lt0,\quad \partial_U R_{\varepsilon,27}\lt0.
$$

Together with the seed at $y=0$, these directed-rounded signs certify a finite first-y tube for $U_\varepsilon(y,\nu)$ on the root graph.

## Certified Result

The certificate uses $16$ first-y subcells and evaluates the $15$ positive subcells for both branches over all $128$ speed cells, giving $3840$ finite $\operatorname{Shift}_{27}$ rows. The shifted Taylor series is carried to order $52$.

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branches | $2$ |
| first-y cell | $[0,0.001796875]$ |
| positive-y subcells | $15$ |
| finite $\operatorname{Shift}_{27}$ row count | $3840$ |
| shift power | $27$ |
| shifted series order | $52$ |
| lower shifted coefficients checked | $27$ |
| $U$ tube padding | $10^{16}$ |
| predecessor $E$ tube padding | $10^{16}$ |
| inherited $U$-seed artifact valid | `true` |
| all rows certified | `true` |
| all lower shifted coefficients $y^0$ through $y^{26}$ contain zero | `true` |
| all $\operatorname{Shift}_{27}$ endpoint signs certified | `true` |
| all $\partial_U R_{\varepsilon,27}$ signs certified | `true` |
| all induced $E_\varepsilon$ images stay inside the predecessor $E_\varepsilon$ tube | `true` |
| all rows use coefficient shifting | `true` |
| all rows avoid raw $y^{-1}$ division | `true` |
| all finite $\operatorname{Shift}_{27}$ $U_\varepsilon$ root-tail tubes certified | `true` |
| minimum $\operatorname{Shift}_{27}$ endpoint clearance | $7.91945473751\times10^{15}$ |
| minimum $\partial_U R_{\varepsilon,27}$ clearance | $0.791609030532$ |
| maximum $U$ tube absolute upper bound | $1.00042189028\times10^{16}$ |
| maximum induced $E_\varepsilon$ image absolute upper bound | $1.52078404798\times10^{11}$ |
| maximum lower shifted residual $y^0$ through $y^{26}$ | $1.97711797436\times10^{16}$ |
| maximum shifted trigonometric remainder | $7.48652331468\times10^{-134}$ |
| $R_{\varepsilon,27}$ left-endpoint interval hull | $[-7.94245748911\times10^{15},7.93409158004\times10^{15}]$ |
| $R_{\varepsilon,27}$ right-endpoint interval hull | $[-7.93409158056\times10^{15},7.94245748175\times10^{15}]$ |
| inherited $h_{23}$ interval hull | $[-4218031991090,4218902780690]$ |
| inherited $Q_{G,23}$ interval hull | $[-3594155902090,3594155902090]$ |
| inherited $Q_{D,23}$ interval hull | $[-86259741650100,86259741650100]$ |
| inherited remaining $Q_G$ twenty-fourth-order-tail budget | $6.69384967266\times10^{64}$ |
| inherited remaining $Q_D$ twenty-fourth-order-tail budget | $6.69340696994\times10^{64}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-finite-shift27-U-root-tail-tube-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_shift\_27\_finite\_y\_residual\_u\_evaluator=true},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_shift27\_U\_root\_tail\_tube\_positive\_y=true},
$$

$$
\texttt{certifies\_first\_y\_zero\_endpoint\_U\_seed=true},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_U\_root\_tail\_tube=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_U\_tail\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The claim level is a directed-rounded coefficient-shifted finite-y $\operatorname{Shift}_{27}$ residual evaluator for the $U_\varepsilon$ root-tail tube on positive first-y subcells, with endpoint signs, $\partial_U R_{\varepsilon,27}=J$ signs, and predecessor $E_\varepsilon$-tube containment certified over the no-fixed-speed-window speed cover. It closes the finite $U_\varepsilon$ tube row for the root graph. It does not close the continuous $G,D$ quotient-tail bound, full quotient enclosure, scaled remainder, `I1` closure, quadrature, or retained branch status.

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-twenty-third-order-u-seed-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift27-U-root-tail-tube` | directed-rounded positive-y certified |
| `theta3minus.fold-pair-first-y-GD-twenty-fourth-order-U-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by twenty-fourth-order $U$ tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Next Blocker

The remaining first-y blocker is no longer the finite root-tail tube. The next required certificate is the directed-rounded continuous $U_\varepsilon$-coordinate $G,D$ quotient-tail bound. Its active tails are

$$
T_G^{(24)}
=
\operatorname{Shift}_{26}\!\left(P-L-y^2A_{G,23}\right),
\qquad
T_D^{(24)}
=
\operatorname{Shift}_{26}\!\left(D_{\mathrm{pair}}-L-y^2A_{D,23}\right),
$$

with identity

$$
T_D^{(24)}
=
-25T_G^{(24)}
-y\partial_yT_G^{(24)}.
$$

That successor must bound $T_G^{(24)}$ and $T_D^{(24)}$ inside the inherited twenty-fourth-order budgets before the full directed-rounded first-y $G,D$ enclosure can be claimed.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift27-u-root-tail-tube-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-finite-shift27-u-root-tail-tube-certificate.mjs). It emits:

- the coefficient-shifted $R_{\varepsilon,27}=\operatorname{Shift}_{27}(F_\varepsilon)$ evaluator;
- lower-coefficient zero-containment rows for $y^0$ through $y^{26}$;
- positive first-y endpoint-sign rows for the finite $U_\varepsilon$ tube;
- shifted derivative sign rows using $\partial_U R_{\varepsilon,27}=J$;
- induced $E_\varepsilon=h_{21,\varepsilon}+yh_{22,\varepsilon}+y^2U_\varepsilon$ image-containment rows against the predecessor $E_\varepsilon$ tube;
- inherited $h_{23}$ seed, $Q_{G,23}$, $Q_{D,23}$, and remaining twenty-fourth-order quotient-tail budgets;
- explicit open flags for the continuous $U$-coordinate $G,D$ quotient-tail bound, full quotient enclosure, scaled remainder, `I1`, and retained branch status.
