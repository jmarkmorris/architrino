# MEC-007 Stationary Mirror Incoming Ledger

## Scope and disposition

This record completes the bounded incoming verification required by [MEC-007](../analysis/mirror-close-approach-causal-root-boundary.md) for the stationary separated-at-rest, mirror-symmetric, opposite-polarity pair at normalized wake speed $c_f=1$. It supplies the complete partner-and-self root census, regular margins through the first receiver event $u=1$, signed relative-acceleration integral, total variation, refinement record, and an independent overlap check against the EOM solver frontier fixture. It supplies no post-threshold history or boundary value.

Disposition: `Complete` at MEC-007's declared priority scope. The unchanged sharp-law post-threshold branch remains `Not advanced` because the newborn self-root acceleration measure is not locally finite.

Plainly: the incoming encounter is now checked all the way to the first regular boundary. The result says exactly where the current law stops; it does not say what happens next.

## Independent instrument

The separately authored [stationary-mirror incoming oracle](../../../../scripts/eom/stationary-mirror-incoming-oracle.py) imports only the Python standard library and `mpmath`. It does not import `src/eom`, read an EOM fixture, or consume an EOM trajectory. Its complete machine record is [mec-007-stationary-mirror-incoming-oracle.v1.json](mec-007-stationary-mirror-incoming-oracle.v1.json), and [three focused tests](../../../../tests/test_mec007_stationary_mirror_incoming_oracle.py) bind that record to the current oracle, enforce the incoming census and terminal margins, check refinement, and compare the independent $T=1.395$ checkpoint with the EOM solver's certified intervals.

For half-position $q$, inward speed $u=-\dot q$, reception time $T$, and partner emission time $s<T$, the oracle independently restates

$$
F_T(s)=q(T)+q(s)-(T-s),
\qquad
\frac{\mathrm du}{\mathrm dT}
=
\frac{K}{(T-s)^2(1-u(s))},
$$

with $K=0.2862286103053385$. The EOM fixture's request coupling is $36K$ and each persistent label has polarity magnitude $1/6$, so the reduced ordered-partner coefficient is $(36K)(1/6)^2=K$.

Plainly: the independent calculation uses the same declared physical input but a separate equation implementation. The charge factors are applied once, so the oracle does not confuse the request-level coupling with the reduced one-row coefficient.

## Complete incoming root census

On the retained incoming chart, $u(s)<1$, so

$$
\frac{\partial F_T}{\partial s}=1-u(s)>0.
$$

The retained interval has $F_T(-20)<0<F_T(T)=2q(T)$ through the terminal event. Hence each ordered partner channel has exactly one positive-delay root and a root-free complement. For either self channel, $x(T)-T$ is strictly decreasing while $u<1$, so no two distinct times have the same value; the positive-delay self-root count is zero. The equality at $s=T$ is the excluded diagonal, not an admitted root.

Claim grade: `derived complete census` on the stationary incoming chart. A retained-history sign failure, a point with $u(s)\ge1$ before the terminal event, or an independently isolated additional root would falsify it.

Plainly: monotonicity proves that the oracle did not merely find one convenient root. There is exactly one partner root and no self root before the threshold.

## Refinement matrix

| Run | Step | Decimal digits | Root tolerance | Delayed-history representation |
| --- | ---: | ---: | ---: | --- |
| `linear_coarse` | $10^{-3}$ | 50 | $10^{-35}$ | linear |
| `hermite_coarse` | $10^{-3}$ | 50 | $10^{-35}$ | cubic Hermite |
| `hermite_medium` | $5\times10^{-4}$ | 70 | $10^{-50}$ | cubic Hermite |
| `hermite_fine` | $2.5\times10^{-4}$ | 90 | $10^{-65}$ | cubic Hermite |

Across all four runs, the terminal reception span is $5.482\times10^{-8}$, the $q$ span is $3.045\times10^{-8}$, the delayed-range span is $6.181\times10^{-8}$, and the transmitter-factor span is $2.785\times10^{-7}$. Between the two finest Hermite runs, the corresponding differences are $4.575\times10^{-10}$, $1.958\times10^{-12}$, $4.684\times10^{-11}$, and $1.576\times10^{-10}$. Independent trapezoidal integration of the signed relative acceleration approaches the exact velocity-change identity with absolute errors $2.554\times10^{-5}$, $6.459\times10^{-6}$, and $1.616\times10^{-6}$ over the three Hermite refinements.

Claim grade: `measured refinement evidence` from the named oracle. These spans are convergence diagnostics, not interval enclosures of the continuum trajectory. Failure of continued step refinement or a separately authored trajectory outside the reported convergence neighborhood would overturn the numerical witness without overturning the analytic census by itself.

Plainly: changing the time step, arithmetic precision, root tolerance, and delayed-history interpolation leaves the endpoint stable, and the independent quadrature error falls by about four each time the Hermite step is halved.

## Terminal regular ledger

The finest run reaches the first receiver field-speed event with the following values.

| Field | Finest-run value | Boundary status |
| --- | ---: | --- |
| Reception time $T_\ast$ | $1.57263966427542494723320$ | terminal incoming section |
| Half-position $q(T_\ast)$ | $0.0515067031419049260433244$ | positive |
| Coordinate separation $2q(T_\ast)$ | $0.103013406283809852086649$ | positive; no coordinate crossing |
| Partner emission $T_t$ | $1.28137504976334898003843$ | strictly earlier than reception |
| Delayed range $R_\ast$ | $0.291264614512075967194770$ | positive |
| Emission speed $u(T_t)$ | $0.471957584206090683786141$ | strictly subfield |
| Transmitter factor $D_t$ | $0.528042415793909316213859$ | positive; simple partner root |
| Receiver factor $D_r$ | $2$ | receiver threshold, not a transmitter fold |
| Per-receiver inward acceleration | $6.38952805201604388639681$ | finite and nonzero |
| Minimum retained-history margin | $19$ | positive |
| Signed relative-acceleration integral | $2$ | exact from $2\Delta u$ |
| Total variation | $2$ | equal because the relative acceleration has fixed inward sign |
| Maximum root residual in the incoming ledger | $7.723\times10^{-67}$ | below declared isolation tolerance |

The section ladder at $u=0.25,0.5,0.75,0.9,0.99,1$ is present in the machine record. Every section retains one partner root per ordered channel, zero positive-delay self roots, positive coordinate separation, positive delayed range, positive transmitter factor, and positive retained-history margin.

Claim grade: terminal coordinates and extrema are `measured`; the fixed-sign integral identity and event distinctions are `derived` on the declared chart. This ledger is falsified by a refinement-stable sign change, an omitted admitted root, loss of retained history before $T_\ast$, or an independent trajectory that fails the overlap and terminal checks.

Plainly: every regular margin remains comfortably positive when the receiver reaches speed one. The only terminal condition is the receiver-speed boundary itself.

## Independent overlap with the EOM solver

At reception time $T=1.395$, the finest independent run lies inside all three corresponding intervals certified by `eom_stationary_joint_frontier_fixture_cli`.

| Quantity | Independent oracle | EOM solver certified interval |
| --- | ---: | ---: |
| Partner emission time | $0.811744912676734338435750$ | $[0.81174152843441427,\ 0.81175147527423985]$ |
| Transmitter factor $D_t$ | $0.751325927459883057315843$ | $[0.7512916923541867,\ 0.7513555424628773]$ |
| Receiver factor $D_r$ | $1.57393865293938961617092$ | $[1.5738950799582385,\ 1.5739906197029541]$ |

Claim grade: `independently cross-checked measured overlap`. The EOM fixture and oracle have separate implementations; the fixture remains limited to its own certified frontier and is not thereby certified through $T_\ast$.

Plainly: the two instruments agree where both can speak. Only the independent oracle continues to the terminal event, so this result does not enlarge the EOM solver's accepted domain.

## Same-event and limiting-measure disposition

The canonical admission rule requires strict positive delay $T_t<T_r$, so an exact same-time, co-located diagonal row is excluded rather than assigned a finite value. Under any prescribed continuous one-sided extension that genuinely enters $u>1$, each label acquires one newborn self root with delay $\rho>0$. Writing $w_-=1-u(T_s)>0$ and $w_+=u(T_r)-1>0$, the exact measure identity is

$$
A_{\mathrm s}\,\mathrm dT_r
=
\frac{K_{\mathrm s}}{\rho^2(w_-+w_+)}\,\mathrm d\rho.
$$

As $\rho\downarrow0$, the measure has infinite total variation and, because the self row has fixed inward sign, an infinite signed inward integral. The disposition is therefore `Not advanced` for the unchanged sharp-law continuation.

Claim grade: `derived local obstruction` for the declared stationary mirror branch. A complete unchanged-law chart with every root retained and a locally finite identical self measure would falsify it.

Plainly: excluding the single zero-delay point does not remove the divergence immediately beside it. MEC-007 can close by proving that obstruction without inventing passage or rebound.

## Completion boundary

MEC-007 is complete because the exact incoming census and event ordering, the independently refined terminal ledger, the separate EOM overlap, and the exact same-event limiting-measure disposition now cover every item in its acceptance contract. No continuation, passage, rebound, coordinate-crossing outcome, outgoing history, boundary value, conservation result, physical realization, stability result, MEC closure, or EOM solver acceptance follows.

Plainly: this closes one boundary-analysis task, not the boundary itself.
