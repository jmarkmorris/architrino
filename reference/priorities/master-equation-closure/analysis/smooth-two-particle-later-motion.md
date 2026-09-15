# Later turns of the two disturbed architrinos

## What the extension shows

The two targets have exactly three consecutive vertical reversals on $5/4\le t\le2$ under the unmodified Master Equation at $g=16$. The [full-equation certificate](smooth-two-particle-later-certification.md) and its [independent assessment](smooth-two-particle-later-certification-independent-adjudication.md) establish an upward-to-downward turn, a downward-to-upward turn and another upward-to-downward turn, followed by continued descent through this horizon. The next upward excursion is between $25.6\%$ and $30.5\%$ of the preceding downward excursion. The approximate central values remain a first peak near $4.65142$ millionths of a lattice spacing, a trough slightly below the original plane, and a smaller second peak near $1.04083$ millionths.

Claim grade for those vertical turns and the excursion inequality: **derived by an independently accepted computer-assisted proof**. The calculation does not establish that the complete trajectories eventually settle. In the comparisons retained below, the targets' horizontal separation is still increasing at the end of this interval. That much smaller horizontal sign and the detailed neighbor-gap minima remain comparison results; the new error budget does not certify them. Shared vertical turns and a shrinking vertical excursion do not prove decay in every coordinate.

The [continuation analysis](smooth-two-particle-later-continuation.md) and its [independent adjudication](smooth-two-particle-later-independent-adjudication.md) establish existence of the actual infinite-lattice histories through this horizon. The new certificate adds global source and target residual bounds, including the infinite stationary field, and propagates them to continuous signs and extrema. The [coefficient derivation and numerical record](smooth-two-particle-later-instrument.md) and the nonlinear comparison below remain separately useful explanations and numerical evidence. Their measured precision is not the precision of the rigorous bounds.

![Later common height, separation and simultaneous neighbor gaps](../../../../.local-data/master-equation-closure/later-motion/later-motion.png)

This retained comparison figure shows the first two amplitude coefficients. The independently evaluated nonlinear changed-history comparison agrees at the displayed scale. The [new certified height figure](smooth-two-particle-later-certification.md#result-and-scope) separately displays actual error bands and turning windows. The different panels above use different vertical units: the height varies on the scale of millionths of a lattice spacing, while the change in target separation is about a thousand times smaller by the endpoint. The neighbor panels measure each pair at the same time.

## 1. The population, histories and horizon

There is one architrino at every site of the infinite simple cubic lattice $\ell\mathbb Z^3$. Polarity alternates between nearest neighbors according to $\sigma_i=(-1)^{i_1+i_2+i_3}$. The stationary contribution uses the unchanged prescribed eight-source block sum. The two disturbed targets occupy the sites $0$ and $\ell e_1$ and have opposite polarity. Numerical wake speed is $c_f=1$, dimensionless time is $t=T/\ell$, and dimensionless coupling is $g=G/\ell=16$. No dimensional lattice spacing or physical calibration is selected.

Both targets have the same supplied past displacement $\ell p(s+11/8)e_3$, where $s$ is dimensionless emission time and

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
\qquad p=0\text{ outside that interval}.
$$

Every other supplied past is stationary. All architrinos are at their anchors and at rest when forward evolution starts at $t=0$. Their received history is nevertheless disturbed: the two targets emitted their pulses earlier. The pulse's largest displacement is only $1/314928$ of a spacing. The accepted [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) shows that this exact supplied past is not an unforced solution before release. The extension keeps that supplied-history assumption and establishes no typical populated-universe behavior.

The later continuation's census contains 208 histories that become nonconstant somewhere on $0\le t\le2$: 206 environmental labels and the two targets. The infinite remaining population still contributes its stationary reference field. There are 328 entered directed old-pulse channels and 1,032 entered generated-history channels over that interval. These are interval counts, not the number of nonzero contributions at each instant.

The numerical representations have different counts because they answer different questions. The coefficient evaluator stores all 208 sites and allows 1,472 candidate directed correction rows; some candidates remain inactive. The nonlinear comparison first constructs the 76 environmental source prefixes needed at received emission times, then evaluates six later receiver paths: the two targets, their two outward axial neighbors, and the two neighbors directly above them. Four of those later receivers also belong to the 76 source labels. This reduced dependency calculation neither asserts a universe containing 82 architrinos nor replaces the infinite population by a bare finite lattice.

## 2. Which returning histories cause the later changes

The first returning family reaches each target near $\beta=\sqrt2-3/8\approx1.0392$. At the right target $e_1$, these are the four sources $e_1\pm e_2,e_1\pm e_3$, originally excited by the left target. Their combined early response produces the shared upward motion already seen in the [earlier plots](smooth-two-particle-motion-plots.md).

The extension includes three later arrival groups:

| Approximate anchor arrival time | Added history received by the right target |
| ---: | --- |
| $2\sqrt2-11/8\approx1.4534$ | Its own twelve face-diagonal neighbors return their response to its original pulse. |
| $13/8=1.6250$ | Its outward axial neighbor at $2e_1$ returns the response originally excited by the left target. |
| $\sqrt2+\sqrt3-11/8\approx1.7713$ | Four additional environmental sources enter; four sources already counted also return their response to their second old excitation. |

There are therefore 21 distinct returning environmental source identities but 25 original-pulse-to-environment-to-target paths by this horizon. Source identity and received pulse-path count are different. Each source's complete motion must include both old excitations whenever both have arrived. Actual feature times depend on the moving reception points; the continuation encloses those changes, while the nonlinear comparison solves the moving causal equations directly.

The twelve-neighbor return changes the balance of vertical acceleration contributions and precedes the first height maximum. The later histories change that balance again. This is a history-dependent explanation of the turns: an opposing acceleration must persist long enough to cancel the velocity accumulated earlier. Neither a spring law nor a damping coefficient is assumed. Source motion also persists after an exciting pulse has ended, so a completed pulse reception does not mean that its influence disappears.

## 3. An independent formula for the leading common height

The leading amplitude calculation can be performed without integrating the coefficient system. Define successive zero-initial primitives of the pulse by

$$
P_0(u)=p(u),\qquad P_n(u)=\int_0^u P_{n-1}(v)\,dv\quad(n=1,2,3,4),
$$

with all functions zero before $u=0$. Extend the integral definitions beyond $u=1/4$, using $P_0=0$ there. In particular, $P_1(1/4)=0$ and $P_2(1/4)=-1/56770560$; after the pulse, $P_2$ stays constant, $P_3$ becomes affine and $P_4$ becomes quadratic. Setting all primitives to zero after the pulse would incorrectly discard the retained displacement and velocity response.

For an exciting target $c$, source $j$ and receiving target $i=e_1$, let $k=j-c$, $d=\|k\|$, $R=i-j$, $r=\|R\|$, $m=k/d$ and $n=R/r$. Put

$$
A=\frac{3m m_3-e_3}{d^3},\qquad B=\frac{m m_3}{d^2},
\qquad J=\frac{I-3nn^{\mathsf T}}{r^3},\qquad K=\frac n{r^2}.
$$

The environmental first displacement is $g\sigma_j\sigma_c(AP_2+BP_1)$. Substituting its displacement and velocity into the first received correction gives the target displacement contribution

$$
g^2\sigma_i\sigma_c\left[-JA\,P_4+\{-JB+K(n\cdot A)\}P_3+K(n\cdot B)P_2\right]
$$

at argument $u=t+11/8-d-r$. The two appearances of environmental polarity cancel. Summing the third component over the permitted paths yields

$$
z_1(t)=256\sum_f\left[q_{f,4}P_4(t-\tau_f)+q_{f,3}P_3(t-\tau_f)+q_{f,2}P_2(t-\tau_f)\right],
$$

where $f$ indexes the four returning families and $q_{f,n}$ is the coefficient multiplying $P_n$. Their values are:

| Onset $\tau_f$ | Paths | $P_4$ coefficient | $P_3$ coefficient | $P_2$ coefficient |
| --- | ---: | --- | --- | --- |
| $\sqrt2-3/8$ | 4 | $-\sqrt2$ | $-1-\sqrt2/4$ | $-1/2$ |
| $2\sqrt2-11/8$ | 12 | $3$ | $2\sqrt2$ | $1$ |
| $13/8$ | 1 | $-1/8$ | $0$ | $0$ |
| $\sqrt2+\sqrt3-11/8$ | 8 | $-\sqrt6/3$ | $-4\sqrt2/9-2\sqrt3/9$ | $-4/9$ |

This is a **derived formula for the first amplitude coefficient**, not the full finite-amplitude trajectory. It independently reproduces the previously accepted first-family formula. The reference [implementation](smooth-two-particle-later-leading.py) uses exact symbolic coefficients and 45-digit numerical evaluation. Its known controls precede target evaluation and check the pulse integral, primitive joins and integer-shell enumeration. Its separately derived later common-height values check the coefficient integrator without sharing its integration code.

## 4. Nonlinear delayed-row comparison

The second independent instrument retains the entire finite pulse amplitude and solves moving causal roots. Write $y_i$ for displacement in lattice units. At each reception it evaluates

$$
Q_{ij}=\frac{K(i-j+y_i(t)-U_j(s))}{1-n\cdot U_j'(s)}-K(i-j+y_i(t)),
\qquad s+\|i-j+y_i(t)-U_j(s)\|=t,
$$

where $K(R)=R/\|R\|^3$ and $n$ is the received range direction. Old rows use the supplied pulse; generated rows use the calculated old-pulse-only environmental prefixes. The continuation puts all needed generated emission times below $33/32$, before generated motion reaches those emitters. Thus these prefix histories can be constructed before the six later receiver equations are integrated.

The exact equation also contains the infinite stationary term $gS_0(y_i)$. The [nonlinear comparison source](smooth-two-particle-later-nonlinear.py) explicitly omits that term and retains the finite changed-history rows. This is a declared mathematical approximation. The accepted bound $\|S_0(y)\|\le1400\|y\|^3$ makes a controlled comparison possible, but a small cubic term is not automatically a trajectory error bound. The separate [background-comparison estimate](smooth-two-particle-later-background-comparison.md) bounds its effect on target position by $6\times10^{-8}$ and velocity by $1.2\times10^{-7}$, conditional on the exact omitted-background target paths staying within $9\times10^{-6}$ of their anchors. This includes the background's earlier effect on all received source histories. The measured target maximum near $4.652\times10^{-6}$ does not certify that exact-path hypothesis. The new certificate in Section 6 supplies a direct global bound against continuous polynomials instead, enclosing integration, interpolation and stationary-field effects together and proving its polynomial neighborhood condition.

To evaluate a changed row accurately, the code avoids subtracting nearly equal inverse-cube kernels. It forms $\Delta r^2=-2R_0\cdot U+\|U\|^2$ and evaluates the inverse-cube change through `log1p` and `expm1`. Causal roots use Newton iteration with the source-velocity denominator. The largest measured final root residual in the three runs was $2.23\times10^{-16}$; this is a floating-point residual measurement, not an independent interval root certificate.

Old-source paths are integrated with an adaptive Runge–Kutta method. Their positions, velocities and accelerations are sampled on a uniform history grid and joined by quintic Hermite polynomials. The later receiver integration differentiates those same history polynomials for source velocities. Known controls passed before target use: the exact pulse support and maximum, zero changed rows, an exactly represented quintic history, and a direct 70-digit implicit old-row reference. The latter differed from the binary64 row implementation by $3.37\times10^{-18}$.

| Run | Maximum time step | History step | Measured wall time |
| --- | ---: | ---: | ---: |
| DOP853 pilot | $1/128$ | $1/2048$ | 2.822 s |
| DOP853 refinement | $1/256$ | $1/4096$ | 5.365 s |
| RK45 check | $1/512$ | $1/8192$ | 8.026 s |

The two finer runs use absolute tolerance $10^{-18}$ and relative tolerance $10^{-12}$. They share the nonlinear row implementation but use different integration methods and finer retained-history grids. Their agreement tests numerical consistency; it is not an independent check of the row equation. Across 8,193 common sample times, their largest target-height difference was $1.90\times10^{-15}$ and vertical-velocity difference was $7.38\times10^{-15}$. The separately implemented two-coefficient instrument differed from the nonlinear target positions by at most $1.11\times10^{-13}$ on the common 4,097-point grid, and from the target velocities by $4.61\times10^{-13}$. These sampled discrepancies are not certified error bars between samples or against the actual infinite-population trajectory.

## 5. Turns, separation and neighbor distances

The following measured values come from the refined nonlinear changed-row comparison. The independent leading formula and first/second coefficient calculation agree at the displayed precision.

| Event in the shared vertical motion | Time $t$ | Height $z/\ell$ |
| --- | ---: | ---: |
| First peak; upward motion turns downward | 1.50964 | $+4.65142\times10^{-6}$ |
| Trough; downward motion turns upward | 1.83544 | $-3.68110\times10^{-7}$ |
| Second peak; upward motion turns downward | 1.97391 | $+1.04083\times10^{-6}$ |

The measured peak-to-trough and trough-to-peak excursions are $5.0195293\times10^{-6}\ell$ and $1.4089411\times10^{-6}\ell$. Their ratio is $0.2806919$. This is a useful finite-interval sign of weakening vertical excursions. There are only three later extrema, the oscillation center need not be the original plane, and the targets continue to receive additional history. These values therefore supply no asymptotic decay rate or stable limiting position.

At $t=2$, the right target's horizontal displacement is approximately $6.66649\times10^{-10}\ell$ and its horizontal velocity is positive. Reflection gives separation $\ell+2x$, so the separation excess is about $1.33330\times10^{-9}\ell$. Common height is approximately $1.00867\times10^{-6}\ell$ and its vertical velocity is negative. The horizontal and vertical observations describe different components of motion.

For the right target, the outward neighbor starts at $(2,0,0)$ and the upward neighbor starts at $(1,0,1)$. Their gaps use both particles' simultaneous positions. The nonlinear grid samples give:

| Neighbor | Smallest sampled gap | Approximate time |
| --- | --- | ---: |
| Outward | $\ell(1-2.48975\times10^{-11})$ | 1.89771 |
| Upward | $\ell(1-6.43829\times10^{-6})$ | 1.51758 |

Thus the sampled gap above remains about $0.999993562\ell$, and the outward gap changes on a still smaller scale. These are numerical closest-gap estimates, not a proven global minimum. A uniform rigorous coarse bound follows separately from the continuation: all displacements stay below $\ell/128$, so every initially nearest-neighbor separation remains greater than $63\ell/64$ on the interval. Certifying the sign of the extremely small outward-gap change requires much tighter errors than this contact-exclusion bound.

## 6. Certified vertical ringing and the remaining settling question

The [full-equation certificate](smooth-two-particle-later-certification.md) completes the finite-amplitude sign proof. It defines exact $C^2$ quintic source and target paths from shared dyadic nodes, encloses every received causal root, and bounds the full acceleration residual over every time cell. The source residual norm is below $9.471749\times10^{-11}$ and the right-target residual below $1.539527\times10^{-11}$, including the stationary field at both stages. The [propagation theorem](smooth-two-particle-later-residual-propagation.md) then bounds target position, velocity and acceleration errors by $6\times10^{-8}$, $1.2\times10^{-7}$ and $2\times10^{-7}$. Continuous polynomial bounds close the required neighborhood of the anchors.

Opposite actual velocity signs at the ends of each interval, together with a fixed actual acceleration sign throughout, establish exactly one turn in each of $[1545/1024,1547/1024]$, $[1878/1024,1881/1024]$ and $[2019/1024,2024/1024]$. The directions are downward, upward and downward. Continuous sign coverage between the windows and at both ends of $[5/4,2]$ makes these exactly three consecutive turns on that interval. The following upward excursion divided by the preceding downward excursion lies between $0.256623$ and $0.304647$, strictly below $1/3$. The [independent assessment](smooth-two-particle-later-certification-independent-adjudication.md) reconstructs the derivative and propagation arguments and separately proves the signs using exact rational polynomial bounds. This establishes finite-interval vertical ringing for the actual unchanged equation.

The separately [accepted pulse-end extension](smooth-two-particle-later-pulse-ends.md) continues the same full equation through $H=259/128=2.0234375$. All eight previously unfinished paths per target deliver their pulse endpoints near $t=2.02126437$, with sixteen directed receptions in total. The same 21 source identities per target suffice: all required emission times remain inside the already evolved source prefix. Continuous full-law error bounds and independent exact polynomial signs establish strictly downward motion throughout $[2,H]$, excluding a fourth vertical turn. The added fall is between $4.300499\times10^{-8}\ell$ and $4.863000\times10^{-8}\ell$. This leg remains unfinished, so no additional completed-excursion ratio follows.

Eventual settling is a stronger question. It requires later returning histories, a bound on successive excursions, and control of drift in all relevant components. The next useful motion event is the next vertical minimum, with newly required source histories evolved and certified as the domain expands. Growth of later excursions, a persistent nondecaying component, or lasting separation drift would overturn an inference of local settling.

## Development record and reproduction

The continuation subject and independent adjudication are separate from the comparison instruments. The [coefficient note](smooth-two-particle-later-instrument.md) contains its equations, controls, refinement series, figure checks and the live EOM capability audit. The EOM solver was not run: its inspected finite retained-history request lacks the infinite stationary block-field representation required for this population. No production solver source or physical law was changed.

Retained output is under `.local-data/master-equation-closure/later-motion/`, including the three `nonlinear-*.json` receipts, their trajectory arrays, `nonlinear-comparison-summary.json`, the coefficient outputs and the leading formula output. The small summary instrument first recorded a known maximum-array-difference control before comparing the target arrays. Commands for the independent nonlinear sequence are:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-nonlinear.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-nonlinear.py target
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-nonlinear.py target --step 0.00390625 --history 4096 --atol 1e-18 --rtol 1e-12
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-nonlinear.py target --method RK45 --step 0.001953125 --history 8192 --atol 1e-18 --rtol 1e-12
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-leading.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-leading.py target
```

The numerical comparison claims would fail if an independent evaluation or refinement materially changed the displayed values. The accepted vertical certificate instead depends on complete roots, exact joins, outward residual arithmetic and strict continuous sign margins; a failure of one of those conditions would invalidate its corresponding conclusion. The exact path-sum formula would fail if an omitted permitted two-leg path or a wrong kernel coefficient were found. The new certificate preserves the earlier accepted first-return theorem and does not resolve the separate classification across $0<g\le16$.
