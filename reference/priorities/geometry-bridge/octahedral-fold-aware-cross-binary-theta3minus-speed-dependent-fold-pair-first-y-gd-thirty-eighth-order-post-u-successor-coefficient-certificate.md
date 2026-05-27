# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Thirty-Eighth-Order Post-U Successor Coefficient Certificate

Promotion status: `priority-only`.

This packet continues the coefficient-preserving post-$U$ successor row after
the certified $h_{37,\varepsilon}$ packet. It certifies the next zero-touching
seed coefficient, $h_{38,\varepsilon}$, and the induced thirty-eighth-order
quotient coefficients $Q_{G,38}$ and $Q_{D,38}$. It converts the constant term
of the $T_G^{(38)},T_D^{(38)}$ quotient tails into a directed-rounded
coefficient row; the remaining quotient tail begins at order $39$.

No fixed speed band is imposed. The certificate uses only the certified positive
speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Successor Coefficient Equation

The root graph is extended to

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{37}h_{k,\varepsilon}y^{k+3}
+h_{38,\varepsilon}y^{41}
+O(y^{42}).
$$

The coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{42}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le37}+y^{38}X_{38,\varepsilon},\nu)
\right)
=
C_{38,\varepsilon}(\nu)
+S_{38,\varepsilon}(\nu)X_{38,\varepsilon}
+O(y),
$$

with the inherited fold-null slope

$$
S_{38,\varepsilon}
=
\varepsilon\beta F_{\eta\eta},
\qquad
F_{\eta\eta}
=
(\partial_\delta-\partial_\phi)^2F\big|_{(\delta_f,\phi_f)},
\qquad
X_{38,\varepsilon}(0,\nu)=h_{38,\varepsilon}(\nu).
$$

This is a coefficient solve one row beyond the already-certified
$h_{37,\varepsilon}$ row. It does not by itself certify a finite
$X_{38,\varepsilon}$ root-tail tube or retained branch status.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{37}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{42}$ contain zero after the $h_{38}$ solve | `true` |
| maximum source coefficient residual interval witness | $4.80032721613\times10^{24}$ |
| minimum $h_{38}$ solve-slope clearance | $0.792719244976$ |
| $h_{38}$ interval hull | $[-1.85548531397\times10^{24},1.85548531397\times10^{24}]$ |
| $Q_{G,38}$ interval hull | $[-1.58063981796\times10^{24},1.58063984386\times10^{24}]$ |
| $Q_{D,38}$ interval hull | $[-6.16449539105\times10^{25},6.16449529005\times10^{25}]$ |
| maximum $Q_G$ thirty-eighth-order coefficient loss on $0\le y\le0.001796875$ | $7.42184443712\times10^{-81}$ |
| maximum $Q_D$ thirty-eighth-order coefficient loss on $0\le y\le0.001796875$ | $2.89451933048\times10^{-79}$ |
| maximum $|Q_{D,38}+39Q_{G,38}|$ interval witness | $1.23289906811\times10^{26}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=38$ contain zero | `true` |
| minimum remaining $Q_G$ thirty-ninth-order-tail budget | $1.01837521179\times10^{106}$ |
| minimum remaining $Q_D$ thirty-ninth-order-tail budget | $1.01830785559\times10^{106}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_thirty\_eighth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It also certifies the coefficient identity containment

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le38.
$$

For H39 replay, each branch row now also carries a dependency-preserving h-row
provider record. The record lists the inherited $h_0,\ldots,h_{37}$ predecessor
fields, the current $h_{38}$ recurrence solve, provider provenance, a dependency
witness, and a candidate-only claim boundary. This is provenance for the
certified h-row replay, not a new H39 closure claim.

## Refined-Subcover Candidate Seam

The h38 producer can now be run as a local candidate subcover by supplying a
predecessor artifact through the h25-to-h38 successor chain. The h24 producer
accepts explicit speed samples, while each successor builder can consume the
artifact emitted by the previous row. This does not change the standard
128-cell certificate above: nonstandard local subcovers keep the h38 artifact
claim false, because their predecessor artifacts do not satisfy the fixed
standard full-cover validator.

The seam is nevertheless executable and mathematically useful for H39. On the
dominant first H39 row, a two-piece local predecessor replay over the original
`speed.0.first-y` cell recomputes $h_0,\ldots,h_{38}$ on the two narrower cells.
The local h38 rows remain row-certified, and H39 row-$1$ pressure falls from
$5.239383640054425\times10^{22}$ to a refined local maximum
$2.6197784892373247\times10^{22}$. The pressure change is therefore produced
by actual predecessor recurrence transport, not by provider metadata over the
same interval box. The open burden is to turn this candidate seam into a
certified full-cover refinement or a lower-dimensional recurrence-transport
certificate.

The follow-up H39 scaling diagnostic uses this seam on $1,2,$ and $4$ local
subcells of the same dominant speed cell. The resulting H39 pressures scale
almost exactly as the local speed-cell width, with observed exponent
$1.0000353436$. This is useful evidence for the h38 packet: the recurrence
chain is the right producer-side object, but brute subcovering is not the
certificate strategy. A successful H39 handoff should expose the deterministic
h-row recurrence graph, or a certified low-dimensional enclosure of that graph,
through the h-row provider boundary.
The first low-dimensional handoff candidate is now explicit. The one-noise
affine h-row diagnostic takes the two refined H38 subcell midpoint rows and
forms $h_i(\xi)=c_i+\xi d_i$ for $h_0,\ldots,h_{38}$. On the live H39 row this
reduces the sampled shifted-index-$1$ pressure from the independent-box value
$5.239724324430226\times10^{22}$ to $6.978672999045361\times10^{12}$. The h38
successor packet should therefore treat the exported intervals as a lossy
view: the H39 handoff needs a certified affine graph or graph-plus-residual
provider, not just wider provenance metadata over the same interval box.
The follow-up affine graph subdivision replay confirms that the graph itself is
stable under interval replay: the full $\xi\in[-1,1]$ graph interval gives
$6.998682228480771\times10^{12}$, only about $1.0029$ times the worst sampled
one-noise value. It also passes through the H39 dependency-preserving h-row
provider seam. The h38-side certificate burden is now specifically to certify
that the recurrence image is enclosed by this affine graph with bounded
residual coordinates, rather than to emit only independent h-row intervals.
Finer midpoint residual checks show the pure affine graph misses the producer
image most strongly in $h_{38}$, but graph-plus-residual replay still stays at
$3.996425126569277\times10^{13}$ against the independent-box pressure
$5.239724324430226\times10^{22}$. That makes the h38-side handoff concrete:
export a directed-rounded affine graph-plus-residual provider.
The next handoff candidate is sharper: a quadratic h-row graph in the same fold
coordinate $\xi$ fitted from four local H38 midpoint rows over
$\xi\in[-2,2]$. Its H39 graph-only replay reaches
$5.043803779445108\times10^{12}$, and the graph-plus-residual replay against
$4$- and $8$-subcell producer midpoint checks reaches
$1.5919512026398383\times10^{13}$. Compared with the affine
graph-plus-residual reference $3.9986141541875766\times10^{13}$, this shows the
producer residual is partly curvature of the h38 recurrence image. The h38-side
handoff target is therefore upgraded from affine graph-plus-residual to
polynomial graph-plus-residual. A cubic comparison does not materially improve
the pressure, so the directed-rounded producer-image enclosure should target
the lower-degree quadratic graph first. This remains candidate-only until that
enclosure is proved.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
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

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-thirty-seventh-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirty-ninth-order-successor-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by thirty-ninth-order successor tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The predecessor $h_{37}$ coefficient packet left

$$
T_G^{(38)}
=
\operatorname{Shift}_{40}\!\left(
P-L-y^2A_{G,37}
\right).
$$

This packet certifies the constant coefficient of that shifted quotient:

$$
T_G^{(38)}
=
Q_{G,38}
+yT_G^{(39)}.
$$

Equivalently,

$$
A_{G,38}=A_{G,37}+Q_{G,38}y^{38},
\qquad
T_G^{(39)}
=
\operatorname{Shift}_{41}\!\left(
P-L-y^2A_{G,38}
\right),
$$

and

$$
A_{D,38}=A_{D,37}+Q_{D,38}y^{38},
\qquad
T_D^{(39)}
=
\operatorname{Shift}_{41}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,38}
\right).
$$

The next correlated identity is therefore

$$
T_D^{(39)}
=
-40T_G^{(39)}
-\mathcal D_y^{(X_{39})}T_G^{(39)},
\qquad
\mathcal D_y^{(X_{39})}
=
y\partial_y+\Xi_\varepsilon\partial_{X_{39}}.
$$

The new quotient-tail budget floors are

$$
B_{G,39}=1.01837521179\times10^{106},
\qquad
B_{D,39}=1.01830785559\times10^{106}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{38}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{42}$ after the
  $h_{38}$ solve;
- induced $Q_{G,38}$ and $Q_{D,38}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,38}+39Q_{G,38}\ni0$;
- inherited $h_{37}$, $Q_{G,37}$, and $Q_{D,37}$ provenance;
- dependency-preserving h-row provider metadata for the H39 evaluator boundary;
- explicit open continuous tail, full quotient, scaled-remainder, `I1`, and
  retention rows.

The companion test
[neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{38}$ and
$Q_{G,38},Q_{D,38}$ intervals, the $Q_D+39Q_G$ identity interval, overclaim
rejection, H39 h-row provider metadata, and CLI write/validate behavior.
