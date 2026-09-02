# BP-013 Local $D_4$ Cell Certificate

Status: one regular-square vertex cell certified; full chamber cover open

## Scope

The independently authored interval oracle [certify_bp013_local_d4_cell.py](../../../../scripts/equation-mapping/certify_bp013_local_d4_cell.py) advances the alternating $2{:}2$ nonuniform-phase census by certifying one local polytope cell at the regular-square vertex of the declared $D_4$ chamber. It uses normalized wake speed $c_f=1$, equal radii, common positive circulation, the polarity word `+-+-`,

$$
|g_i-\pi/2|\leq 2\times10^{-7}
\quad(i=0,1,2,3),
$$

$$
|\beta_f-2.1472456589006224|\leq2\times10^{-7},
$$

and the chamber halfspaces

$$
g_0\leq g_1,
\qquad
g_0\leq g_2,
\qquad
g_0\leq g_3,
\qquad
g_1\leq g_3,
$$

with $g_3=2\pi-g_0-g_1-g_2$ and $g_i\geq0.01$. The interval calculation encloses that polytope in an outward-rounded coordinate hull. It is not a cover of the complete chamber $0.05\leq\beta_f\leq20$.

Plainly: this is the first certified cell of the required atlas. It settles a small neighborhood of the known square, not the global nonuniform-phase question.

## Fold separation and directed-root ownership

The oracle reconstructs the thirteen affine phase-difference forms directly from the four phase-prefix vectors, without importing either the production ring evaluator or the affine-atlas generator. It then evaluates all 78 sign-feasible fold sheets with outward-rounded `mpmath` `libmpi` arithmetic. Every sheet is strictly separated from the local hull; the smallest certified magnitude of a sheet function is

$$
5.68393533555995639209361845378744738456403\times10^{-2}.
$$

The sheet receipt retains all sixteen directed owners, all four same-transmitter owners, and 96 owner-sheet incidences. The independent causal-root implementation certifies the constant directed-root count matrix

$$
\begin{pmatrix}
1&3&1&1\\
1&1&3&1\\
1&1&1&3\\
3&1&1&1
\end{pmatrix},
$$

so the cell has 24 directed roots throughout. Parametric interval Newton enclosures retain each owner and ordinal. A separate interval subdivision excludes every complementary delay interval; it processes 120 complement boxes to maximum depth four. The minimum certified causal-root transversality magnitude is greater than

$$
0.317111568481583245104440975559379140655614.
$$

Plainly: no root is inferred from a center sample. Each directed pair owns a fixed list of transverse roots throughout the cell, and the rest of its admissible delay interval is separately proved root-free.

## Seven-row evaluation and Krawczyk inclusion

The oracle evaluates the complete planar balance obligation

$$
(t_0,t_1,t_2,t_3,r_1-r_0,r_2-r_0,r_3-r_0)
$$

with interval automatic differentiation through every owned implicit root. It applies the Krawczyk operator to

$$
(t_0,r_1-r_0,r_2-r_0,r_3-r_0)
$$

in coordinates $(g_0,g_1,g_2,\beta_f)$. The resulting image is strictly inside the declared hull. Its speed component is

$$
2.1472456587406364484156782048350024029093
<\beta_f<
2.1472456590606173725593201851216971488462.
$$

Thus the selected subsystem has exactly one zero in the hull. On the exact regular-square line, the certified signs of $t_0$ at the two speed endpoints are $(-,+)$, so continuity supplies a symmetric zero. Krawczyk uniqueness identifies that symmetric zero as the only selected-row zero in the hull. Exact quarter-turn covariance, including the harmless global polarity conjugation, makes all four tangential projections equal and all four radial projections equal at the square; therefore all seven rows vanish there. The common radial acceleration coefficient is certified in

$$
[-1.91890775863914303743714128865214037619476,
-1.9188503586610491955965395672447411106374],
$$

so the compatible radius is positive.

Plainly: the local cell contains exactly one full-vector balance, and it is the regular square. The negative radial coefficient establishes only the sign needed for a compatible prescribed circular radius.

## Claim grade, boundary, and falsifier

The result is **computer-assisted derived local cell evidence**. It proves one local zero count with outward-rounded fold separation, complete source-bound root ownership, complement exclusion, all seven residual rows, and a strict Krawczyk inclusion. The focused Node test also checks the center against the unchanged production circular evaluator; that parity is a consistency check, not the independent basis of the interval proof.

The certificate establishes no result for the rest of the $D_4$ chamber, no additional fold cell, and no `++--` result. Prescribed balance establishes no evolution, retention, stability, binding, physical identity, score, or scientific acceptance. No stability calculation is attempted.

The local conclusion is falsified by a fold sheet intersecting the declared hull, a missing or multiply owned directed root, a root in a certified complement interval, a zero-containing separation or transmitter factor, a Krawczyk image escaping the hull, equal regular-square endpoint signs, failed quarter-turn covariance, non-inward mean radial acceleration, or a second selected-row zero in the declared cell.

## Reproduction and remaining blocker

Run:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_bp013_local_d4_cell.py
node --test tests/bp013-local-d4-cell-certificate.test.js
```

The remaining exact blocker is the complete outward-rounded subdivision of the rest of the $D_4$ chamber in the monotone coordinate $\lambda=L(\beta_f)$ against the 78 affine sheets. Every resulting open cell must receive the same complete root/complement treatment and seven-row rejection, followed by interval Newton or Krawczyk on every survivor.

Closure goal: enumerate the remaining $D_4$ fold cells and certify or reject every survivor without extending this local result beyond its declared hull.
