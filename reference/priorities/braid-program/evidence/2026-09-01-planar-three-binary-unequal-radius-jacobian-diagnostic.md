# Planar Three-Binary Unequal-Radius Jacobian Diagnostic

Date: 2026-09-01
Status: accepted measured diagnostic; interval box remains open
Claim grade: measured pointwise local-isolation evidence

## Decision

At the accepted regular-phase T04 balance, the five independent compatibility rows

$$
\left(
a_{t,1},
a_{t,2},
a_{t,3},
\frac{a_{r,2}}{r_2}-a_{r,1},
\frac{a_{r,3}}{r_3}-a_{r,1}
\right)
$$

have a measured rank-three Jacobian with respect to $(r_2,r_3,\beta_f)$. The three tangential rows alone form a nonsingular square subsystem. This is a strong pointwise local-isolation signal and supplies a concrete interval-Newton target. It does not certify any neighborhood or exclude an unequal-radius balance away from the point.

Plainly: changing the two relative radii and common angular rate produces three independent first-order sideways responses. Near T04, those responses do not show a free unequal-radius direction, but only a continuous-box proof can exclude one.

## Instrument And Coordinates

The tracked [diagnostic](../../../../scripts/equation-mapping/diagnose_planar_three_binary_unequal_radius_jacobian.py) uses $R_1=R$, $R_2=r_2R$, $R_3=r_3R$, fixed binary phases $(0,2\pi/3,4\pi/3)$, common positive circulation, and $c_f=1$. For every evaluation it independently solves the unequal-radius chord equation

$$
\beta_f
\sqrt{
r_i^2+r_j^2-2r_ir_j\cos(\phi_i-\phi_j+\theta)
}
-\theta=0
$$

for all 36 directed receiver-transmitter channels, excludes the coincident self root, evaluates the emission-site acceleration contribution, and constructs all six receiver radial and tangential rows. Receiver-compatible scale requires $a_{r,i}/r_i$ to agree across the three binaries.

Plainly: unequal radii change both the wake travel distance and each transmitter speed. The diagnostic recomputes those changes directly rather than importing equal-radius receiver equivalence.

## Measured Result

At

$$
(r_2,r_3,\beta_f)
=
(1,1,2.9743071761172935680273801996244059\ldots),
$$

the diagnostic reproduces 72 directed roots and a minimum transmitter-factor magnitude of $0.1168060287362930795\ldots$. Centered finite-difference rungs at $10^{-6}$, $3\times10^{-7}$, and $10^{-7}$ retain the same 72-root count on every perturbed evaluation. The final measured Jacobian is

$$
\begin{pmatrix}
0.08762910456 & -0.84563925190 & 307.84573375127\\
916.38579179698 & 0.08762910456 & 307.84573375130\\
-0.84563925190 & 916.38579179686 & 307.84573375126\\
2574.75677514331 & -20.69340897925 & 8.48\times10^{-11}\\
20.69340897925 & 2554.06336616371 & -3.23\times10^{-11}
\end{pmatrix}.
$$

The determinant of its leading three tangential rows is

$$
2.5873151621897995401716175633086\times10^8,
$$

and the full $5\times3$ singular values are approximately $2735.237125$, $2715.453745$, and $511.948887$. The maximum Jacobian-entry change between the last two rungs is $1.67255\times10^{-4}$.

Plainly: the measured subsystem is far from singular. The remaining work is not to guess which equations to certify; it is to enclose this already identified subsystem and the complete unequal-radius root chart on a declared box.

## Binding And Reproduction

The diagnostic is tracked at SHA-256 `51b081cbaed7cbf77cd8f26a6c7a9ad13b0ed91e96bbf831d59a938439ef2165`. It binds the exact T04 source configuration at SHA-256 `569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8` and the accepted phase-box certificate at SHA-256 `916e65532efbed3d543a75ba74c4f93d0d1fd9b95ff8c4f16f825866af307fec`.

Reproduce the diagnostic with:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/diagnose_planar_three_binary_unequal_radius_jacobian.py
```

## Next Certificate

On a declared positive ratio box around $(r_2,r_3)=(1,1)$ and a declared T04 speed interval:

1. certify every unequal-radius causal root by interval Newton and exclude roots on every complement box;
2. prove positive collision clearance and transmitter-factor magnitude throughout the box;
3. enclose the three positive-endpoint tangential rows and their $3\times3$ Jacobian with outward-rounded arithmetic;
4. contract the parameter box strictly by interval Newton;
5. use the accepted equal-radius T04 bracket to place the known symmetric zero inside the box; and
6. discharge every remaining tangential row and both independent receiver-scale rows at that unique point by the exact half-turn and $120^\circ$ covariance that applies only on the equal-radius line.

Plainly: if the interval Newton image lies strictly inside the box, the selected tangential equations have only the known equal-radius zero there. Since any full-vector balance must satisfy those three equations, no unequal-radius full-vector balance can hide in that box.

## Claim Boundary And Falsifier

This diagnostic establishes pointwise measured rank only. It establishes no interval uniqueness, unequal-radius zero census, wider ratio-domain result, evolution, retention, stability, binding, physical identity, score, or scientific acceptance. A missed causal root, changed source identity, perturbed root-topology mismatch, nonconvergent derivative ladder, singular independently evaluated subsystem, or independent point recomputation outside the reported precision falsifies the corresponding measured claim.

Closure goal: replace the pointwise rank signal with a complete source-bound interval root chart and interval-Newton zero census on one declared T04 unequal-radius box.
