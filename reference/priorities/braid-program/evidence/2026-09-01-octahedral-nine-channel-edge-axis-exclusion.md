# Octahedral Nine-Channel Edge-Axis Exclusion

Date: 2026-09-01
Compatibility identifier: `aaa-corpus-advancement`
Status: accepted computer-assisted derived exclusion
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../platonic-moving-history-reduction.md)

## Decision

The balanced octahedral word `+++---`, in vertex order $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, has no rigid prescribed acceleration balance about

$$
\hat{\mathbf n}=\frac{\mathbf e_x-\mathbf e_z}{\sqrt 2}
$$

for any dimensionless angular speed $0\leq\beta<1$ with $c_f=1$. At receiver $+\mathbf e_x$, the prescribed rigid acceleration lies in the $x$-$z$ plane and therefore has zero $y$ component. The complete delayed acceleration sum instead obeys the outward-rounded enclosure

$$
-0.820273791914345
<F_{+x,y}(\beta)
<-0.450045806431959.
$$

The strict sign obstruction excludes this complete nine-channel stratum. This is not a result about another polarity word, another rotation axis, deformation, ordinary EOM evolution, retention, stability, binding, or physical realization.

Plainly: this octahedron would have to accelerate within one plane to preserve its rigid rotation, but its delayed interactions always push the selected vertex out of that plane. The mismatch never reaches zero anywhere below field speed.

## Certified Root And Acceleration Cover

For each distinct ordered pair $u\ne v$, the exact rigid reduction solves

$$
s_{uv}=\left\|u-Q_{\hat{\mathbf n}}(-\beta s_{uv})v\right\|,
\qquad 0<s_{uv}\leq2.
$$

The tracked oracle covers the closed numerical interval $0\leq\beta\leq1$ in 590 accepted boxes obtained from 64 initial boxes and at most five bisection levels. The scientific conclusion retains the declared strict domain $0\leq\beta<1$. It directly proves one unique partner root for each of the five transmitters seen by the obstructed $+\mathbf e_x$ receiver. The exact strict-sub-field theorem in the mathematical owner supplies the corresponding global census of 30 complete directed partner roots and no nontrivial self root. The minimum transmitter factor certified on the five directly enclosed roots is

$$
D_{uv}>0.721143338704490901046192771269617890761098683.
$$

The complete $+\mathbf e_x$ y-acceleration enclosure is

$$
F_{+x,y}([0,1])\subset
[-0.820273791914344581553066754761265013135697931,
-0.450045806431959008654263308929119395496867869].
$$

The upper endpoint is separated from zero by more than $0.450045806431959$. Because the required rigid value is exactly zero, no scale parameter can repair the failed component.

Plainly: all thirty partner delays exist uniquely and stay transverse. Even after every one of their acceleration contributions is included, the forbidden-direction component retains a large negative margin.

## Reproducibility And Independent Check

Run the interval certificate with:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_nine_channel_edge_axis.py
```

Two consecutive runs produced byte-identical standard output at SHA-256 `1542230646c8bc7dfd86a059bb5fc779a7fc177cd3bc6660927f2b2c687c9290`. The thin chart wrapper has SHA-256 `1e55917f83af6e3ca21faecf766d0d296b91657844269959dfba27b0bc15e240`; the shared interval implementation has SHA-256 `6a70226997c3c77468f1934293eda8ebc36b88b08d0d2560cf8c4dbfdfd774b8`.

Run the independent point checks with:

```sh
node --test tests/octahedral-nine-channel-edge-axis.test.js
```

The test has SHA-256 `4b155aef83ee8d609d346d95f1ac6b370a63b541ab19d560d04196a38d01a116`. At $\beta\in\{0.1,0.25,0.5,0.75,0.9,0.99\}$, the unchanged generic prescribed-history evaluator independently finds five partner roots at every receiver and reproduces the strict-negative $+\mathbf e_x$ y-acceleration inside the certified global enclosure.

The interval oracle and generic evaluator do not share a root implementation: the oracle directly encloses the rigid scalar equations with `mpmath 1.3` `libmpi`, while the point check uses the existing general moving-circular prescribed-history evaluator. The point check samples the chart and therefore does not prove continuous coverage; the outward-rounded oracle supplies that proof. The displayed exact reduction remains the mathematical authority joining root completeness to the forbidden acceleration component.

Plainly: a second implementation agrees at representative speeds and on the five-roots-per-receiver topology. The continuous conclusion still rests on the interval proof, not on those samples.

## Claim Grade And Falsifiers

- **Derived:** the declared rigid history requires zero y-acceleration at $+\mathbf e_x$, and the rigid causal-root and acceleration equations reduce to the displayed finite system.
- **Computer-assisted derived:** outward-rounded intervals certify all five partner roots needed at the obstructed receiver, their positive transmitter-factor floor, and a strictly negative complete y-acceleration over the complete declared speed chart; the separately derived strict-sub-field theorem supplies the 30-root global census.
- **Bounded nonexistence:** no rigid prescribed acceleration balance exists for this word and axis at $0\leq\beta<1$.
- **Not established:** any other word or axis, $\beta\geq1$, a deformed or non-rigid history, ordinary EOM evolution, retention, stability, binding, particle identity, score, or scientific acceptance.

A complete-root evaluation with nonnegative $+\mathbf e_x$ y-acceleration at any $0\leq\beta<1$, a missed partner or self root, a nonpositive transmitter factor, a gap in the interval cover, an error in the exact rigid projection, or an outward-rounding failure overturns the corresponding conclusion.

Plainly: this closes one precisely named nine-channel calculation and nothing broader. The next BP-016 object must select a different word-and-axis stratum and prove its own complete result.
