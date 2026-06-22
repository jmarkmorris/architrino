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
The interval-residual check tightens the H38-side burden. If the producer image
is enclosed as the quadratic graph plus ordinary H38 interval residual hulls,
the H39 handoff pressure is $1.3098672358675488\times10^{22}$, which is only a
factor $4.000194967056995$ below the independent h-row box. The worst residual
is again $h_{38}$, and its interval hull is essentially the h38 solve interval
width rather than the graph error. A $4$-to-$8$ local subcell refinement gives
pressure exponent $1.000013406731329$, implying that brute interval residual
refinement would need about $3.290318928\times10^9$ local subcells to recover
the midpoint-residual scale. The H38 successor handoff should therefore export
a dependency-preserving residual normal form, or a piecewise residual graph,
instead of a plain interval residual box.
The first correlated-width normal form has now been tested at H39. Writing the
producer handoff as $h_i(\xi,\eta)=q_i(\xi)+c_i+r_i\eta$ improves the H39
shifted-index-$1$ pressure to $3.7189936065423036\times10^{20}$, a factor
$17.610343040598536$ below the interval-residual replay and a factor
$140.89092046871806$ below the independent h-row box. It is still
$2.336754035638012\times10^7$ above midpoint-residual scale. The dangerous
suffix is already present when only the $h_{38}$ residual width is active:
$5.0026463677528906\times10^{20}$. Thus the H38 successor cannot close the
handoff by exporting a full-width shared $\eta$ coordinate. It must expose a
sharper dependency in the $h_{38}$ solve itself, such as numerator/slope
correlation or a piecewise residual graph whose effective width is reduced
before H39 replay.
The solve-width factorization identifies which part of that solve must be
sharpened. Since the H38 row solves
$h_{38}=-N_{38}/S_{37}$, the diagnostic replays the full interval quotient, the
quotient with $S_{37}$ fixed at its midpoint, the quotient with $N_{38}$ fixed
at its midpoint, and the both-midpoint quotient. Full quotient pressure is
$5.002646364218093\times10^{20}$ and slope-midpoint pressure is
$5.002646141988511\times10^{20}$, while numerator-midpoint pressure collapses
to $4.0904191135450396\times10^{12}$. The exported solve width is therefore
almost entirely numerator width: the numerator-only solve width is
$0.9999999555775948$ of the full solve width, while the slope-only solve width
is only $9.990560893381585\times10^{-17}$ of the full solve width. The next
H38 successor handoff should expose a directed-rounded graph, factorization,
or subdomain certificate for $N_{38}$ itself; refining the inherited slope
interval is not the active closure route.
The numerator midpoint graph confirms that this is not geometric roughness of
the H38 image. A quadratic graph for $N_{38}$ over $\xi$ has maximum midpoint
residual $3.6011482546175\times10^{11}$, while the largest numerator interval
width is $3.67725335756\times10^{23}$. The H38 successor should therefore
export $N_{38}$ through a directed-rounded graph/Taylor enclosure or
subdomain-normal-form certificate before forming $h_{38}=-N_{38}/S_{37}$.
The H39 replay of that numerator graph is now explicit. Graph-only
$N_{38}(\xi)$ gives shifted-index-$1$ pressure
$4.0882852984579976\times10^{12}$, and graph plus midpoint residual gives
$4.0889087889467676\times10^{12}$. The full slope interval changes the
graph-only pressure by only $1.000000831612749$. But if the H38 successor
exports the numerator graph plus an ordinary interval-residual hull, H39
pressure returns to $5.002660154369953\times10^{20}$. Therefore the H38
successor handoff must preserve the numerator graph dependency itself; a raw
interval residual at the numerator level is already known to fail.
The latest residual-budget diagnostic converts this into an H38 successor
engineering target. On the $4$, $8$, and $16$ local subcell covers, the raw
$N_{38}$ residual hull remains essentially the full numerator interval width
and its H39 pressure scales linearly under refinement, with exponent
$1.0000016614193274$. The width scaling exponent is similarly
$1.0000016681321142$. A brute interval residual handoff would therefore need
an impractical refinement factor. The useful target is sharper: to keep the
H39 replay at h-row-midpoint scale, the worst required shrink factor from the
raw $N_{38}$ residual hull is $1.7245027326360488\times10^8$, while the sampled
midpoint residual width is at most $0.00011864454815927154$ of the allowed
budget. The H38 successor certificate should next export a directed-rounded
$N_{38}$ Taylor remainder or local normal form that proves this budget before
the solve $h_{38}=-N_{38}/S_{37}$ is applied.
The local-partition replay shows that the required fix must occur before
row-field export. A $16$-subcell H38 producer cover with local quadratic
$N_{38}$ graphs over $1$, $2$, and $4$ $\xi$ partitions keeps midpoint residual
pressure below h-row-midpoint scale, but every raw interval-residual replay
remains near $2.5013444686\times10^{20}$. The best raw-hull pressure is still
$6.970749744386734\times10^7$ above the best midpoint-residual replay. Thus a
piecewise graph built after \texttt{h38\_residual\_before\_solve} has already
become an interval field cannot close the handoff. The H38 successor needs an
expression-level $N_{38}$ provider: set $h_{38}=0$, evaluate the
\texttt{sourceEquationSeries} coefficient used as the recurrence numerator,
and certify a directed-rounded local Taylor remainder before division by the
inherited slope.
The successor module now exposes that expression-level object directly through
\texttt{evaluateH38RecurrenceNumeratorBeforeSolve}. The helper returns the
$y^{42}$ coefficient of the H38 recurrence source with $h_{38}=0$ and reports
the term decomposition of
$\delta^2/\nu^2-2+\sin\phi+\sin\delta$ before the solve by $S_{37}$. The H39
expression-level diagnostic verifies that this helper reproduces the exported
\texttt{h38\_residual\_before\_solve} interval up to formatted artifact
precision. On the live target, the direct $N_{38}$ expression width scales
linearly under $1,4,8,16$ subcells, with exponent $1.0000158789836409$; the
one-piece width is $2.9419491126351116\times10^{24}$ and the sixteen-piece
width is $1.8386372459721104\times10^{23}$. The dominant term-width source is
$\sin\delta$, not the inherited slope. On point midpoint rows, the largest term
width is only $236$ on the one-piece row, leaving a
$1.2465886070487762\times10^{22}$ gap between raw interval width and local
point-evaluation width. This is not yet a Taylor certificate, but it moves the
proof target inside the recurrence expression rather than leaving it at the
exported row-field boundary.
The H39 Taylor-budget diagnostic now turns that gap into a no-go for brute
subcovering. On the live target, an $8$-sample midpoint fit reports a point-local
term-width scale of $236$ against the one-piece raw expression width
$2.9419491126351116\times10^{24}$; with the observed width-linear exponent
$1.000023935850454$, a uniform subcover would need about
$1.245071482894444\times10^{22}$ local cells to reach point scale. The raw width
is $48.6117523761\%$ $\sin\delta$, $35.9913177414\%$ $\sin\phi$, and
$15.3969298825\%$ $\delta^2/\nu^2$. Thus the H38 successor's actionable closure
work is a directed-rounded local Taylor or normal-form enclosure of the
expression-level sine-bearing numerator coefficient, not more exported-row
partitioning. The same diagnostic also reports the rough Taylor-tiling scale:
if the cubic point-midpoint residual is treated only as a fourth-order local
scaling proxy, the direct expression needs about $67$ local $\xi$ tiles, while
the two sine terms need about $93$ and $86$ tiles respectively.
The Taylor-enclosure prototype now emits those rows explicitly rather than
leaving them as an estimate: $67$ direct-expression tiles, $93$ $\sin\phi$ tiles,
and $86$ $\sin\delta$ tiles, for $246$ component rows in total. The candidate
fourth-order remainder model puts the three component remainders at
$233.91705956302627$, $232.1086233629665$, and $228.95202748895008$, all below
the point-local scale $236$. This is still not a directed-rounded certificate,
but it is now the finite proof target for a same-domain Taylor derivative-bound
backend inside the expression-level H38 numerator.
The H39 derivative-bound prototype makes that target explicit in fourth-jet
form. It rewrites each tile obligation as $R\le M_4 h^4/24$ and emits $246$
candidate derivative rows. The sampled parent-residual proxy requires only
$0.9911739811992639$ of the available fourth-derivative budget in the worst
case. Componentwise, the proxy/required pairs are
$7.070536456828125\times10^9/7.133496834\times10^9$ for the direct expression,
$2.604439833675\times10^{10}/2.6481041153999992\times10^{10}$ for
$\sin\phi$, and
$1.878579409275\times10^{10}/1.9364088864\times10^{10}$ for $\sin\delta$.
This is not yet the H38 successor certificate; it is the finite
directed-rounded fourth-derivative enclosure target that should be proved
before exporting $h_{38}$ to H39.
The fourth-difference diagnostic now corrects that target against the live H38
producer rows. It evaluates fourth-difference stencils on the same
expression-level $N_{38}$ components and shows that the parent-residual proxy is
too optimistic as a certificate: over the $8$- and $16$-subcell stencils, the
largest finite fourth-derivative estimate is
$4.300955531321041\times10^{13}$, with worst existing-bound ratio
$4580.928151229552$. This does not send the handoff back to brute row-hull
subcovering. At the $16$-subcell scale, the observed fourth-difference retile
counts are $552$ for the direct expression, $591$ for $\sin\phi$, and $582$ for
$\sin\delta$. The H38 successor target is therefore sharper: export an
expression-level $N_{38}$ fourth-derivative enclosure or analytic normal form at
that finite scale before the solve $h_{38}=-N_{38}/S_{37}$ is applied.
The corrected-retile prototype now turns this target into concrete rows for the
next backend. With observed fourth-difference $M_4$ inflated by $2$, the
candidate emits $2051$ corrected rows: $656$ direct-expression rows, $703$
$\sin\phi$ rows, and $692$ $\sin\delta$ rows. Its worst corrected
remainder-to-point-width ratio is $0.9993542425323698$ against the point-local
scale $236$. This remains an observed-$M_4$ prototype rather than a
directed-rounded producer-image enclosure, but it replaces the abstract
"certify a better derivative bound" blocker with a finite same-domain row set
whose next obligation is a directed-rounded $M_4$ enclosure or a normal-form
identity that lowers the fourth-derivative requirement before solving for
$h_{38}$.
The $M_4$ refinement diagnostic now shows that this $2051$-row target is only
the base corrected-retile route. Adding a $32$-subcell fourth-difference
stencil rejects the base inflation: the refined observed $M_4$ scale grows by
as much as $11.480891969090306$, and the base corrected rows would miss the
point-local scale by as much as $11.473478097366211$ under the refined observed
derivative. The route stays finite after correction. With the same observed
$M_4$ inflation factor $2$ applied to the refined stencil, the candidate emits
$3576$ corrected rows: $1162$ direct-expression rows, $1140$ $\sin\phi$ rows,
and $1274$ $\sin\delta$ rows. The maximum corrected remainder-to-point-width
ratio is $0.9987550516507323$. The H38 successor handoff must therefore either
prove this refined same-domain $M_4$ enclosure with directed rounding or find a
normal-form identity that explains the $16$-to-$32$ fourth-difference growth.
The refinement diagnostic also compares the equal-spacing fourth-difference
formula with true fourth divided differences on the actual $\xi$ midpoints. The
largest nonuniform-to-uniform fourth-derivative relative correction on the
compared $16$- and $32$-subcell rows is only $0.024053174217917833$, and the
correction-to-growth-excess ratio is only $0.0022949548844558446$. This makes
the H38 handoff sharper: the fourth-difference growth is not explained by
nonuniform $\xi$ spacing, so the next successor-side advance should expose
producer-image smoothness, a fold-coordinate normal form, or source-level
cancellation before the directed-rounded $M_4$ certificate is attempted.
The H39-side localization replay further sharpens the H38 handoff. The refined
worst stencils are disjoint from the base worst stencils for the direct
expression, $\sin\phi$, and $\sin\delta$, and the $32$-subcell worst spans form
one contiguous positive-$\xi$ region with hull
$[0.9376679896182594,1.9375400034828008]$. The largest refined-to-base $M_4$
ratio is the $\sin\delta$ row at $11.480891969090306$, but its growth-increment
share is $0.43824215565670466$, so the effect is multi-component. The
successor-side normal form should therefore target shared positive-$\xi$
producer-image variation before the expression-level $N_{38}$ source is turned
into a solved $h_{38}$ interval.
A non-default $64$-stencil probe shows that the growth continues past $32$:
the maximum observed fourth-derivative estimate reaches
$2.1162902030980995\times10^{15}$, with observed retile counts $1474$ for the
direct expression, $1564$ for $\sin\phi$, and $1563$ for $\sin\delta$. This
keeps the route finite but weakens a pure "retile and prove" plan. The stronger
successor handoff is now a normal-form or producer-image smoothness argument
that stabilizes the fourth derivative, followed by a directed-rounded $M_4$
certificate on that stabilized same-domain representation.

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
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{38}$ and
$Q_{G,38},Q_{D,38}$ intervals, the $Q_D+39Q_G$ identity interval, overclaim
rejection, H39 h-row provider metadata, and CLI write/validate behavior.
