# Coincident-midpoint common-frequency three-axis circular configuration Root-Sheet Monotonic-Enclosure Treatment

Date: `2026-07-28`

Status: `evaluated-diagnostic`, `complete-36-channel-accounting`, `null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

## Scope and authority

This receipt records the separately declared treatment of the nine unresolved inter-binary symmetry representatives left by the [exact-circular reduction](2026-07-27-coincident-midpoint-common-frequency-exact-circular-inter-binary-reduction.md). It binds the unchanged frozen ratio box

$$
\frac{7}{8}\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\frac{9}{8},
$$

the unchanged retained-history reach $\chi_n=9/4$, the symmetric prescribed phase baseline, and the existing nine-rule fail-closed protocol. The six previously closed inter-binary channels are sealed by their summary and result hashes and are not re-evaluated.

Plainly: this packet addresses only the nine root calculations that remained after exact endpoint-inversion symmetry was applied. It does not reopen the six calculations that had already finished.

The diagnostic owner is the [root-sheet treatment protocol](../../../../src/prescribed-path-analysis/protocols/coincident-midpoint-common-frequency-root-sheet-monotonic-enclosure-treatment-protocol.v1.json) executed by the prescribed-path-only [certifier](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyRootSheetMonotonicEnclosureCertifier.mjs). The instrument does not evolve a path, invoke the EOM solver or its interval machinery, calculate energy or action, or assign a physical score.

## Declared root sheet and proof obligations

For squared prescribed separation $D^2$, define

$$
G(\alpha_1,\alpha_3,\theta,\delta)
=
D^2(\alpha_1,\alpha_3,\theta,\delta)-\delta^2,
$$

where the active radius ratios and phase-circle coordinate are sheet parameters and the positive dimensionless delay $\delta$ is the dependent root variable. The domain identifies $\theta=0$ with $\theta=2\pi$ and covers $1/32\le\delta\le9/4$. The excluded near-zero stratum and memory edge have the uniform signs

$$
G\big|_{\delta=1/32}\ge\frac{3}{1024}>0,
\qquad
G\big|_{\delta=9/4}\le-\frac{35}{64}<0.
$$

Plainly: every allowed parameter point starts on the positive side of the root equation and ends on the negative side, so at least one root lies between those delay faces. The remaining question is whether a fold can change the root count.

The completion theorem has four operative obligations:

1. the ratio-phase parameter domain is connected after its phase seam is identified;
2. neither delay endpoint admits a root;
3. no interior point admits both $G=0$ and $\partial_\delta G=0$; and
4. one declared anchor coordinate has exactly one isolated simple root whose squared residual is independently recomputed.

If any interval can still admit a root and a fold, if a seam or endpoint is uncovered, if the anchor count is not one, or if independent recomputation misses its floor, the representative remains `drawn-not-evaluated` and the packet score remains null.

Plainly: the root count can be carried across the whole connected parameter box only after endpoints, folds, seams, and one reference count are all settled. Any missing part stops the packet.

## Exact sub-field endpoint charts

Let $F=D-\delta$. Six representatives contain the sub-field inner layer as either receiver or transmitter. Two phase charts remove their avoidable interval subdivision:

- with a sub-field transmitter, hold reception phase $\theta$ fixed;
- with a sub-field receiver, hold emission phase $\epsilon=(\theta-\delta)\bmod 2\pi$ fixed.

The map

$$
(\theta,\delta)
\longleftrightarrow
(\epsilon=(\theta-\delta)\bmod 2\pi,\delta)
$$

is a bijection of the phase circle times the declared delay interval. At fixed phase in the applicable chart, only the sub-field endpoint moves as $\delta$ changes. Its prescribed dimensionless path speed is at most $15/16$, so

$$
\left.\frac{\partial F}{\partial\delta}\right|_{\theta}
\le-\frac{1}{16}
\quad\text{or}\quad
\left.\frac{\partial F}{\partial\delta}\right|_{\epsilon}
\le-\frac{1}{16}.
$$

At a positive-delay root, $G=F(D+\delta)$ and therefore

$$
\partial_\delta G
=
2\delta\,\partial_\delta F
\ne0.
$$

This exact monotonic bound excludes a fold across the full declared domain for the six eligible representatives. It is a statement about the imposed circular path coordinates, not physical transport or an EOM-retained branch.

Plainly: choosing the chart so that only the slower endpoint moves as delay changes makes the root residual decrease strictly. A strictly decreasing root cannot double back into a fold.

## Remaining interval treatment

The other three representatives contain no sub-field endpoint that supplies the exact chart bound. They retain the declared interval enclosure of $G$ and $\partial_\delta G$. Every box is either certified root-free because $G$ excludes zero or certified fold-free at possible roots because $\partial_\delta G$ excludes zero. The unchanged limits are:

- $20{,}000$ boxes per representative;
- $180{,}000$ boxes for the packet;
- maximum subdivision depth $18$;
- squared-residual exclusion floor $10^{-10}$;
- squared-delay-derivative exclusion floor $10^{-8}$; and
- four outward-padding ULPs.

The three representatives finished after $5{,}404$ evaluated boxes, with maximum depth $12$ and no unresolved box. No resource ceiling was increased.

Plainly: the exact chart handles the six cases where geometry gives a global monotonic bound. Ordinary fail-closed interval subdivision is retained for the three cases where that bound is unavailable.

## Representative result

| Representative | Fold treatment | Diagnostic disposition |
| --- | --- | --- |
| binary 1 endpoint 1 $\leftarrow$ binary 2 endpoint 2 | Emission-fixed exact chart | One root throughout the declared parameter domain |
| binary 1 endpoint 1 $\leftarrow$ binary 3 endpoint 1 | Emission-fixed exact chart | One root throughout the declared parameter domain |
| binary 1 endpoint 1 $\leftarrow$ binary 3 endpoint 2 | Emission-fixed exact chart | One root throughout the declared parameter domain |
| binary 2 endpoint 1 $\leftarrow$ binary 1 endpoint 1 | Reception-fixed exact chart | One root throughout the declared parameter domain |
| binary 2 endpoint 1 $\leftarrow$ binary 1 endpoint 2 | Reception-fixed exact chart | One root throughout the declared parameter domain |
| binary 2 endpoint 1 $\leftarrow$ binary 3 endpoint 2 | Interval fold exclusion | One root throughout the declared parameter domain |
| binary 3 endpoint 1 $\leftarrow$ binary 1 endpoint 2 | Reception-fixed exact chart | One root throughout the declared parameter domain |
| binary 3 endpoint 1 $\leftarrow$ binary 2 endpoint 1 | Interval fold exclusion | One root throughout the declared parameter domain |
| binary 3 endpoint 1 $\leftarrow$ binary 2 endpoint 2 | Interval fold exclusion | One root throughout the declared parameter domain |

Each anchor inventory used $32$ declared delay strata and found one isolated simple root. The unchanged direct-coordinate squared-residual recomputation covered all nine anchor roots; the largest normalized residual was $3.101836110544228\times10^{-16}$, below the declared $10^{-9}$ floor.

Plainly: all nine formerly unresolved representative calculations now finish under the declared rules. The direct-coordinate check confirms each reference root numerically, but it does not turn the imposed paths into physical trajectories.

## Complete channel accounting and controls

The final topology ledger accounts for all $36$ ordered channels:

| Source of disposition | Ordered channels |
| --- | ---: |
| Sealed same-transmitter and same-binary partner results | $12$ |
| Sealed prior inter-binary closure | $6$ |
| Newly evaluated root-sheet representatives | $9$ |
| Exact endpoint-inversion symmetry reuse | $9$ |
| Unresolved | $0$ |

The sealed six-channel regression control passed without re-evaluation. The phase-seam and delay-endpoint control passed. A synthetic exact fold $G=(\delta-1)^2$ remained `unresolved-possible-fold-box`. A deliberate one-box resource limit returned `drawn-not-evaluated`, null score, and visible unresolved boxes.

Plainly: every ordered channel remains visible, including the nine rows filled by exact endpoint-inversion symmetry. The negative controls show that an actual fold or insufficient budget still fails closed.

The protocol hash is `a85f1d3b668f2aab7601ea2327613b193219feab109e210586354d7648bb9d3b`. The result hash is `fe89965435198af812153696e6278adf058c1cbae507a948630fd1adda8401f4`. The [durable summary](coincident-midpoint-common-frequency-root-sheet-monotonic-enclosure-treatment-summary.v1.json) hash is `f37db3ed32ff38060e3b837d73644f9f219db9fb6543414297bcb0e902aa7e4d`. The ignored complete ledger is `.local-data/braid-program/coincident-midpoint-common-frequency/coincident-midpoint-common-frequency-root-sheet-monotonic-enclosure-treatment.v1.json.gz`.

## Closure boundary

The frozen prescribed circular family now has a complete, null-score, diagnostic root-topology disposition across all $36$ ordered channels. This closes the bounded prescribed-path inventory obligation only.

It does not establish an EOM-retained branch, stability, physical superluminal transport, physical realization, energy, action, angular-momentum dynamics, radiation, pressure, GR recovery, or physical candidate selection. Those subjects require separately authorized owners and evidence and are not opened by this receipt.

Plainly: the drawing-family root bookkeeping is complete. Nothing here says that the EOM solver or nature produces the drawing.
