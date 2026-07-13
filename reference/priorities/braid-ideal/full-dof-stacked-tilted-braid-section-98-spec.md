# §98 Joint Triple Optimization and Full-DOF Exploration

**Date:** 2026-07-12

**Claim level:** seed-grade production-root optimization and exploratory scan; no retained-branch acceptance

**Runner:** `scripts/braid-ideal/full-dof-stacked-tilted-braid.mjs --section98`

**Fixture:** `scripts/braid-ideal/full-dof-stacked-tilted-braid-fixture.mjs`

**Owner test:** `tests/braid-ideal-full-dof-stacked-tilted-braid.test.js`

## Decision target

The single-triple decision defers the axial pump to the pro/anti pair. A triple passes only when

$$
\kappa_\star>0,
\qquad
\epsilon_{\rm bind}\le0.03,
\qquad
\operatorname{Re}\lambda_{\rm lead}\le10^{-6}.
$$

The search therefore minimizes

$$
J'
=
\epsilon_{\rm bind}
+w\max(0,\operatorname{Re}\lambda_{\rm lead}),
$$

while recording $\tau_z$ without using it as a single-triple gate. Pair pump cancellation, relative-coordinate locking, pair flutter, and payload equilibrium remain downstream gates.

## Part 0: repaired footing

The §97 control labels remain compatibility replays, not evidence that the arbitrary-config pencil reproduces either specialized corner pencil. §98 adds direct no-`controlFamily` known-answer regressions.

| Geometry | Generalized coarse $\operatorname{Re}\lambda_{\rm lead}$ | Generalized coarse flutter real part | Unstable roots |
|---|---:|---:|---:|
| Tilted spindle | $0.669281859855938$ | $0.160207150305867$ | $8$ |
| §96 flat stack | $1.985182982589085$ | $0.584727422375805$ | $5$ |

These values are pinned at $10^{-12}$. The original §96 and spindle compatibility controls still reproduce their declared bind, pump, and flutter anchors at $10^{-9}$.

The search pencil now uses the same algebraic family as the specialized spindle pencil,

$$
P(\lambda)
=
\lambda^2M
+\lambda(G-D)
+\Gamma-K.
$$

Here $M$ contains numerical integration weights, $G$ is the gyroscopic spin-transport block, $D$ is the measured delayed tilt-rate response, $\Gamma$ is the pump-circulatory block, and $K$ is the measured static torque Jacobian. The diagonal entries of $M$ are integration weights, not architrino ontology.

This repair does not make the arbitrary-config pencil numerically interchangeable with the specialized spindle pencil. On the spindle geometry, the corrected generalized lead is $0.630731170234615$, while the specialized validated lead is $0.198856884972164$. Every §98 arbitrary-config stability result is therefore labeled a coarse generalized gyroscopic-family screen. Its sign is useful as seed-grade evidence, but its magnitude is not a corner-calibrated measurement.

Non-circular worldlines now affect the record. Eccentricity changes the two transverse semiaxes; breathing changes the radius periodically; axis misalignment rotates the orbit; and the axial mode adds periodic axial displacement. Non-circular sources use retained linear segments, with every retained root returned by the production root API. Three-charge rings use three equally spaced sites. Payload and ambient-sea settings create explicit auxiliary interaction rows with their declared cadence, spacing, orientation, and strength. These are exploratory representations, not accepted payload or Noether sea constitutive realizations.

## Part 1: correlated optimization

The bounded Nelder-Mead campaign used seed `0x98c0de`, $24$ branches, and $690$ full-pencil evaluations. Every trial jointly varied all $15$ continuous coordinates

$$
(R_i,z_i,\omega_i,\phi_i,\alpha_i)_{i=1}^{3}.
$$

The continuous bounds were

$$
0.35\le R_i\le2.2,
\quad
-2.5\le z_i\le2.5,
\quad
0.35\le\omega_i\le2.5,
\quad
-\pi\le\phi_i\le\pi,
\quad
-1.4\le\alpha_i\le1.4.
$$

The branch schedule exercised all six axial orders, all eight sense patterns, all eight polarity-orientation patterns, both handedness values, and the sub-, field-, and supra-field regimes. It did not exhaust the $6\times8\times8\times2\times3$ Cartesian product; it used $24$ deterministic cross-factor branches.

Every coarse branch minimum retained positive leading growth. The lowest branch-minimum value was

$$
\min_{b\in\mathcal B}\operatorname{Re}\lambda_{\rm lead}^{(b)}
=0.0197978008023,
$$

and zero of the $24$ branch minima reached the flutter-free threshold. This is the declared branch-set floor, not a continuation-certified global lower bound.

The best standard-sampling branch was `M-O-I`, all three ring senses negative, polarity pattern $(+,-,-)$, negative handedness, and the sub-field regime. Its primary configuration was

| Ring | $R_i$ | $z_i$ | $\omega_i$ | $\phi_i$ | $\alpha_i$ |
|---|---:|---:|---:|---:|---:|
| M | $1.04230408334$ | $-1.00043993313$ | $0.450194178467$ | $-1.71983843274$ | $-0.251423501925$ |
| I | $1.22405252503$ | $0.967870264040$ | $0.450194178467$ | $2.83954617522$ | $0.356098687604$ |
| O | $2.02982194671$ | $0.0325696690911$ | $0.380304889934$ | $-1.71804747982$ | $-0.165849722041$ |

The convergence replay gives:

| Cycle samples | $\epsilon_{\rm bind}$ | $\tau_z$ | $\operatorname{Re}\lambda_{\rm lead}$ | $J'$ |
|---:|---:|---:|---:|---:|
| $3$ | $0.101507794075$ | $-0.312435439401$ | $0.384996737851$ | $0.486504531926$ |
| $6$ | $0.151773156257$ | $-0.252791415578$ | $0.374125061354$ | $0.525898217612$ |
| $12$ | $0.181764628438$ | $-0.220140963479$ | $0.394553488071$ | $0.576318116509$ |
| $24$ | $0.196863007850$ | $-0.203270837131$ | $0.393849549275$ | $0.590712557125$ |

The gate verdict is stable across the sampling ladder: bind fails and flutter remains positive. The metrics are not fully sample-flat. The leading growth is confined to $0.3741$ through $0.3946$, while the binding and pump values move materially. The accepted row is the $24$-sample result.

No binding, flutter-free triple was found. The §93 pair and payload phases remain gated and were not run.

## Part 2: deterministic full-DOF exploration

The exploratory scan used seed `0x98f00d` and $100$ points. All points varied radii, axial positions, independent cadences, phases, tilts, senses, polarity orientations, eccentricity, breathing, axis misalignment, axial-mode amplitude, drift, axial order, handedness, speed regime, charge count, payload, and ambient-sea settings. Static and rate rows used the complete set of roots returned by the production APIs within the declared window. The exploratory scoring used one cycle sample and $24$ retained segments; it is not release-grade.

### Distribution

| Result | Points |
|---|---:|
| Bind at exploratory sampling | $1$ |
| Flutter-free | $0$ |
| Pump-free | $11$ |
| Bind, pump-free, and flutter-free | $0$ |
| Finite spectrum | $99$ |
| Nonfinite spectrum, failed closed | $1$ |

The apparent binding point was point $3$: $\epsilon_{\rm bind}=0.0251832850$, $\kappa_\star=0.208317431$, $\tau_z=-0.314726567$, and $\operatorname{Re}\lambda_{\rm lead}=0.215677899$. It used the sub-field regime, no ambient sea, a neutrino-near-photon payload row, and nonzero eccentricity, breathing, misalignment, and axial-mode amplitudes. Its binding does not survive convergence: at $24$ samples, $\kappa_\star=-2.04881299$, $\epsilon_{\rm bind}=0.715109160$, and $\operatorname{Re}\lambda_{\rm lead}=3.47683575$.

The lowest exploratory growth was point $73$: $\operatorname{Re}\lambda_{\rm lead}=0.0147198353$. It used two three-charge rings, an electron payload row, no ambient sea, and nonzero breathing and axial-mode amplitudes. It was never binding: $\kappa_\star=-0.0159923$ and $\epsilon_{\rm bind}=0.999969$ at exploratory sampling. At $24$ samples, its lead is $0.520758028$ and its binding residual is $0.504781114$. The apparent near-zero growth is therefore a sampling artifact, not a new lead.

The best pump row was point $45$, with $|\tau_z|=0.00205107$, but $\epsilon_{\rm bind}=0.999013$ and $\operatorname{Re}\lambda_{\rm lead}=0.0797198$. The best joint exploratory row was point $3$, and it fails convergence as described above.

No measured continuous-feature correlation with growth was strong. The largest reported magnitude was the ambient-sea density correlation, $+0.195$, in the worsening direction. Three-charge fraction correlated at $-0.130$, but the lowest-growth three-charge point failed binding and convergence. Enabled ambient-sea rows had much larger mean growth than disabled rows in this seed representation; this does not test a constitutively closed Noether sea.

### Exact activation coverage

Observed continuous ranges were:

| Degree of freedom | Observed range |
|---|---:|
| $R_i$ | $[0.357690244,2.197976120]$ |
| $\omega_i$ after speed-regime scaling | $[0.082735224,4.378753668]$ |
| $\alpha_i$ | $[-1.398631731,1.379112615]$ |
| $z_i$ | $[-2.483121116,2.484344071]$ |
| $\phi_i$ | $[-3.121957995,3.138950505]$ |
| eccentricity | $[0.002384007,0.349705369]$ |
| breathing amplitude | $[0.000245174,0.248658551]$ |
| axis misalignment | $[-0.596983186,0.599398532]$ |
| axial-mode amplitude | $[0.000304072,0.399782149]$ |
| drift | $[0.002405691,0.894679476]$ |
| enabled sea density | $[0.053375362,0.982645714]$ |
| sea cadence | $[0.200629960,1.999638140]$ |
| sea spacing | $[0.522218355,2.971281085]$ |
| sea orientation lag | $[-3.032019718,3.134152561]$ |

The scan exercised both ring senses, both polarity orientations, two- and three-charge rings, both handedness values, all three speed regimes, all six axial orders, all four payload types, all three payload positions, all three payload internal configurations, and both enabled and disabled ambient-sea rows. Ambient sea was enabled on $50$ points. Each payload type occurred on $25$ points.

## Verdict and coverage boundary

Within the declared generalized gyroscopic-family screen, the correlated isolated-triple optimization finds a positive growth floor and misses binding. The independent $100$-point full-DOF scan finds no flutter-free point, and its only coarse binding and low-growth signals fail the sampling ladder. This is convergent seed-grade evidence against the sampled isolated rotating-triple region and supports pivoting to an open-system braid-plus-sea frame.

It is not proof that flutter is intrinsic to every isolated rotating triple. Part 1 did not exhaust the full discrete Cartesian product, did not use a continuation-certified global optimizer, and retains the generalized-versus-specialized corner discrepancy. Part 2 used coarse exploratory sampling, seed representations of three-charge rings, payloads, and ambient sea, and one spectrum failed closed. Neither part supplied an accepted Noether sea constitutive response. The production central solver was untouched, no pair or payload release phase ran, and no native release is authorized.

## No-tilt continuation: 1,000 additional points

The deterministic continuation uses seed `0x9801000` and fixes every primary ring tilt to

$$
\alpha_I=\alpha_M=\alpha_O=0.
$$

All other exposed degrees of freedom remain active, including radii, axial positions, independent cadences, phases, senses, polarity orientations, eccentricity, breathing, axis misalignment, axial-mode amplitude, drift, charge count, handedness, axial order, speed regime, payload rows, and ambient-sea rows. Axis misalignment remains active because it is a separately exposed tumble coordinate; only the per-ring tilt coordinates are fixed.

The $1{,}000$ exploratory points produced:

| Result | Points |
|---|---:|
| Bind | $0$ |
| Flutter-free | $0$ |
| Pump-free | $85$ |
| Bind, pump-free, and flutter-free | $0$ |
| Finite spectrum | $990$ |
| Nonfinite spectrum, failed closed | $10$ |

The smallest binding residual occurred at point $962$,

$$
\epsilon_{\rm bind}=0.0163794215431,
\qquad
\kappa_\star=-0.446525598242.
$$

The negative coupling fails the bind gate. At $24$ samples the same point has $\epsilon_{\rm bind}=0.975751287220$, $\kappa_\star=1.81939172814$, and $\operatorname{Re}\lambda_{\rm lead}=1.08389795006$.

The lowest exploratory growth occurred at point $852$,

$$
\operatorname{Re}\lambda_{\rm lead}=2.19381044849\times10^{-4},
\qquad
\epsilon_{\rm bind}=0.999999995717.
$$

It is pump-free only at exploratory sampling. At $24$ samples its growth is $1.34138577419$, its binding residual is $0.919626902339$, and its pump is $-0.498531295375$. The near-zero growth does not survive convergence.

The best pump row was point $150$, with $|\tau_z|=1.60150877104\times10^{-5}$, but its binding residual was $0.999972310131$ and its leading growth was $0.0509257555962$. The best joint exploratory row was point $285$, with joint objective $0.452164295523$; it still failed bind, pump, and flutter.

Observed tilt coverage was exactly $[0,0]$. The scan exercised all six axial orders, all three speed regimes, both senses, both polarity orientations, both handedness values, two- and three-charge rings, all payload types and internal configurations, and enabled ambient-sea rows on $500$ points. No correlation with leading growth exceeded $0.085$ in magnitude. No no-tilt point supplied a converged binding or flutter-free lead.
