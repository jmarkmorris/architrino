# Planar Three-Binary T04 Phase-Jacobian Diagnostic

## Disposition

**Status:** Strong local full-column-rank signal; interval phase-box census remains open.

**Closure goal:** Test whether the equal-radius phase-deformation task has a nondegenerate local coordinate system at exact T04 before launching an interval zero census.

**Claim grade:** **Independently measured local diagnostic.** The instrument implements the circular causal-root equation and acceleration sum directly at 90 decimal digits and does not import the JavaScript prescribed-path evaluator or EOM solver. Central differences do not constitute an interval derivative proof, so this packet does not establish local isolation or exclude a nearby asymmetric branch.

Plainly: all three available coordinate directions change the complete residual independently at T04. That is the right signal for an isolation proof, but the signal still needs a continuous-box certificate.

## Declared coordinates and residual

Fix one binary phase at $\phi_1=0$ and write

$$
\phi_2=\frac{2\pi}{3}+\delta_2,
\qquad
\phi_3=\frac{4\pi}{3}+\delta_3.
$$

The six member phases are

$$
0,\ \pi,\ \phi_2,\ \phi_2+\pi,\ \phi_3,\ \phi_3+\pi,
$$

with fixed labeled polarity word `+-+-+-`, one common positive radius, one common angular frequency, and $c_f=1$. At every evaluation the instrument enumerates the complete ordinary circular-root set, computes all six receiver acceleration vectors, removes only the common mean radial coefficient through the compatible-scale relation, and retains twelve planar residual components.

The coordinate vector is

$$
\mathbf u=(\delta_2,\delta_3,\beta_f).
$$

At the frozen T04 value $\beta_f=2.974307176117293568\ldots$, the independently calculated maximum residual component is $1.0851\times10^{-67}$.

Plainly: the diagnostic varies the two independent phase gaps and the common speed. It does not assume the regular-hexagon cancellation after either phase offset moves.

## Measured Jacobian

The instrument used centered differences with steps $10^{-12}$, $10^{-16}$, and $10^{-20}$. The maximum entry change between the last two rungs is $2.83\times10^{-25}$. The full $12\times3$ residual Jacobian has measured singular values

$$
4.68218995883718549\ldots,
\qquad
8.10979089939483546\ldots,
\qquad
754.0649664905363186\ldots.
$$

The tangential residuals of receivers $0$, $2$, and $4$ alone give the square sub-Jacobian

$$
\begin{pmatrix}
0.4241997498921138\ldots & -3.4023679421401637\ldots & 307.8457334684516031\ldots\\
2.9781681922480499\ldots & 0.4241997498921138\ldots & 307.8457334684516031\ldots\\
-3.4023679421401637\ldots & 2.9781681922480499\ldots & 307.8457334684516031\ldots
\end{pmatrix},
$$

with measured determinant

$$
9524.2261906440225125\ldots.
$$

The full Jacobian therefore has a strong measured column-rank margin at the exact point. If an interval enclosure of this sub-Jacobian remains nonsingular on a compact box and an interval Newton image lies strictly inside that box, the three selected tangential equations have one unique zero there. Every full-vector balance is a zero of those three equations, so that result would also give a full-balance zero census after the remaining nine residual components are checked at the isolated zero.

Plainly: three carefully chosen tangential equations are enough to locate a possible balance in the three open coordinates. The other nine equations remain acceptance checks; they are not discarded.

## Exact next certificate

The next object is a source-bound interval Newton certificate on a declared box

$$
|\delta_2|\leq\delta_*,
\qquad
|\delta_3|\leq\delta_*,
\qquad
|\beta_f-\beta_{\mathrm{T04}}|\leq b_*.
$$

It must enclose every causal root with unchanged owner and ordinal, prove positive separation and nonzero transmitter-factor margins throughout the box, enclose the selected $3\times3$ Jacobian with no singular member, and map the box strictly into itself. It must then evaluate all twelve residual components at the isolated interval zero. The box sizes $\delta_*$ and $b_*$ remain unchosen; selecting them from pointwise condition numbers alone would not certify coverage.

Plainly: the measured Jacobian tells the interval proof where to start and which equations to use. It does not choose a safe box or prove that roots cannot fold inside that box.

## Reproduction and boundaries

Run:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/diagnose_planar_three_binary_phase_jacobian.py
```

Two consecutive executions produced byte-identical standard output at SHA-256 `1e9d1ca8d2028667bd0c838015b1ae57d4e5ae6e26040e36e80b5fb3c1ad3699`.

This packet establishes no certified phase-box zero census, local-isolation theorem, absence of asymmetric branches, evolution, retention, stability, binding, physical identity, score, or scientific acceptance. An interval Jacobian containing rank loss at T04, a missed causal root, failure of difference-rung convergence, or a certified nearby asymmetric full-vector zero overturns the diagnostic disposition.
