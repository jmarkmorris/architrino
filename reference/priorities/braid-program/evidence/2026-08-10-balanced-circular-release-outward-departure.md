# Balanced Circular-Release Outward-Departure Test

## Claim boundary

**Derived:** every exactly radially balanced, equal-magnitude opposite-polarity
circular release on the principal one-partner-root, no-self-root chart has a
locally outward cubic radial departure for every initial speed
$0<\beta=v/c_f<1$.

**Measured diagnostic:** two sharp-chart EOM prefixes preserve positive radial
velocity after release. The near-ceiling prefix begins at $\beta=0.99$ and ends
at $v=0.9998750943\,c_f$ without a radial turn.

**Measured closure:** a later vector-consistent retained-history run from
$100\,\mathrm{km/s}$ at radius $2\,\mathrm{kpc}$ reaches a sub-$c_f$ radial
turn near $121$ million years. The full record is in
[Physical Binary Retained-History Radial Turn](2026-08-11-physical-binary-retained-history-radial-turn.md).

**Not established:** the turn calculation does not establish later binary
fate, retention, binding, stability, or the behavior of every possible
sub-$c_f$ release.

Plainly: the outward start is a result, not a visual impression. It is not a
globally monotone outspiral: the retained-history counterexample eventually
turns inward before reaching field speed.

## Analytic release test

Use normalized units $c_f=1$. For a circular principal partner root, let
$\xi$ be the unique solution of
$$
\xi=\beta\cos\xi,
\qquad
J=1+\beta\sin\xi.
$$
With effective coupling $K=\kappa q^2$, define the positive dimensionless
radial and tangential coefficients
$$
F_r(\beta)=\frac{1}{4\cos\xi\,J},
\qquad
F_\theta(\beta)=
\frac{\sin\xi}{4\cos^2\xi\,J}.
$$
The radially balanced release radius is
$$
R(\beta)=\frac{K F_r(\beta)}{\beta^2}.
$$
At release, $\dot r(0)=\ddot r(0)=0$. Rotational equivariance of the circular
prehistory makes the first time derivative of the scalar radial acceleration
zero at the release event. The tangential equation gives
$\dot\omega(0)=a_\theta(0)/R$, so
$$
r^{(3)}(0)=2\omega(0)a_\theta(0)>0,
$$
and hence
$$
r(T)=R+\frac{\omega(0)a_\theta(0)}{3}T^3+O(T^4).
$$

Plainly: radial balance removes the constant and quadratic radial departure,
but the positive delayed tangential acceleration immediately increases the
rotation rate. That creates a positive cubic radial term at every
$0<\beta<1$.

This is a local statement. A later outward-to-inward turn remains allowed by
the exact polar flow. At any candidate radial maximum, the check is
$$
\Gamma+B_r<0,
\qquad
\Gamma=\frac{r^3\omega^2}{K}.
$$

Plainly: one root and positive tangential acceleration settle the initial
direction, but they do not by themselves forbid the delayed radial balance
from changing later.

## Independent balance check

The radii below were calculated from the closed form above with $K=1$. The EOM
solver independently certified one partner root, no self root, and the listed
$F_r$ and $F_\theta$ at the release snapshot.

| $\beta$ | $R(\beta)$ | partner roots | self roots | EOM $F_r$ | EOM $F_\theta$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 0.25 | 3.887218580845287 | 1 | 0 | 0.242951161302909 | 0.060143391723088 |
| 0.50 | 0.912195688108414 | 1 | 0 | 0.228048921921031 | 0.110211834469408 |
| 0.75 | 0.379622121308113 | 1 | 0 | 0.213537439406925 | 0.150299976526762 |
| 0.90 | 0.254686318809485 | 1 | 0 | 0.206295916295813 | 0.171173683881074 |
| 0.99 | 0.206619624785194 | 1 | 0 | 0.202507895185898 | 0.182929622735977 |

Plainly: the independent solver snapshots agree with the balance construction
and retain the intended one-root chart across representative points from
$0.25c_f$ to $0.99c_f$.

## Sharp-chart EOM prefixes

The evolution used the EOM solver with charges $\pm1/6$, coupling $36$ so that
$K=1$, $c_f=1$, circular retained prehistories, and the `sharp` chart. No
finite-width fallback contributed to either reported prefix.

| release $\beta$ | accepted end $T$ | end speed | end radius | end $\dot r$ | accepted steps | result |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0.75 | 0.0050000000 | 0.7552145395 | 0.379622207299260 | $5.16222293\times10^{-5}$ | 320 | completed prefix; radius monotone |
| 0.99 | 0.0023046875 | 0.9998750943 | 0.206619708753190 | $1.09383624\times10^{-4}$ | 46 | next step halted on root completeness; radius monotone on accepted prefix |

For the $\beta=0.75$ prefix, the cubic release law predicts the final radial
velocity to $0.215\%$ and the radius increment to $0.161\%$. For the
$\beta=0.99$ prefix, the corresponding differences are $0.305\%$ and
$0.229\%$.

Plainly: the EOM histories reproduce the analytic cubic departure and show no
turn in either accepted prefix. The near-ceiling run gets very close to
$c_f$, but it is a release from $0.99c_f$; it does not replace the missing long
trajectory from lower speed.

## Reproduction record

The EOM library was rebuilt before the diagnostic. The dedicated instrument
was then rebuilt from
`scripts/eom/antipodal-binary-spiral-law.cpp` and linked to that library.

- instrument source SHA-256:
  `fb13cd352ba29f8c51b55650022b5f9eba5cf67455385708698342ff204936cc`
- instrument executable SHA-256:
  `9617601bd1d8c13182c246defea2dc156adb1fc3c3164be7baa25b383e8cc44c`
- EOM library SHA-256:
  `4e13dcb827bda1154c029f09b361a8b06a6c01b98bc64faeda1bf5569afe88d8`
- $\beta=0.75$ CSV SHA-256:
  `9376527c1b5cad5857ca86ea7e92ef1255a656d394737a6895bfccc53a476b5c`
- $\beta=0.99$ CSV SHA-256:
  `ae8a8e7e16f9911b0d01d3de7df8dd2c2ea3377c603a4816ead05b7faec79cb7`

The two evolution commands were:

```text
.tmp/eom-native-dev/antipodal-binary-spiral-law --mode=evolve --seed=circular --s=0.75 --radius=0.3796221213081133 --history-depth=2 --history-segment-step=0.005 --duration=0.005 --step=0.0001 --minimum-step=0.00000625 --maximum-step=0.0001 --coupling=36 --chart=sharp --acceleration-tolerance=0.0001 --thread-count=4 --output=.tmp/eom-native-dev/balanced-evolve-075-sharp-0005.csv
.tmp/eom-native-dev/antipodal-binary-spiral-law --mode=evolve --seed=circular --s=0.99 --radius=0.20661962478519422 --history-depth=1 --history-segment-step=0.0025 --duration=0.005 --step=0.0003125 --minimum-step=0.0000390625 --maximum-step=0.0003125 --coupling=36 --chart=sharp --acceleration-tolerance=0.0001 --thread-count=4 --output=.tmp/eom-native-dev/balanced-evolve-099-sharp-fine.csv
```

Plainly: the commands and hashes identify exactly what produced the reported
numbers. The CSV files are local diagnostic products, while this evidence note
is the durable claim record.

## Closure status and falsifiers

The universal monotonic-outspiral conjecture is **closed negatively** by the
accepted outward-to-inward turn with $v<c_f$ in the retained-history run linked
above. The local cubic departure theorem remains unchanged.

The local theorem is falsified by a certified principal one-root circular
release satisfying radial balance but having $r^{(3)}(0)\leq0$. The global
monotonicity conjecture is falsified by a certified $v<c_f$ radial maximum,
equivalently a turn with $\Gamma+B_r<0$.

Plainly: the current answer is “outward locally, but not outward forever.”
