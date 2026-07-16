# Specific Branch Response Closure

Promotion status: `priority-only`.

This packet closes the first layer of [specific-branch-response-insertion](specific-branch-response-insertion.md). It reduces the certified rigid octahedral all-pairs response from a raw midpoint quadrature table to a symmetry-resolved root-ledger response:

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\,\varepsilon
\left(
n^an^b-\frac13h^{ab}
\right),
\qquad
n=\frac{1}{\sqrt3}(1,1,1).
$$

The result remains a root-ledger geometry response, not a retained dynamics branch. It does not claim action closure, observer metric recovery, or GR recovery.

## Symmetry Closure

Under equal all-pairs exposure, the rigid octahedral root ledger is invariant under the simultaneous cyclic relabeling

$$
1\to2\to3\to1
$$

and the corresponding cyclic coordinate permutation

$$
(x,y,z)\to(y,z,x).
$$

It is also invariant under the antipodal sign pairing of source rows. Therefore any phase-averaged rank-two response tensor built from the equal all-pairs ledger must have equal diagonal entries and equal off-diagonal entries:

$$
T^{ab}
=
\alpha h^{ab}
+
\beta
\begin{pmatrix}
0&1&1\\
1&0&1\\
1&1&0
\end{pmatrix}^{ab}.
$$

The trace-free part is one-dimensional:

$$
T_{\mathrm{tf}}^{ab}
=
3\beta
\left(
n^an^b-\frac13h^{ab}
\right),
\qquad
n=\frac{1}{\sqrt3}(1,1,1).
$$

This is a real closure statement. The root ledger cannot export an arbitrary trace-free spatial-compliance tensor under equal all-pairs exposure. It can export only the axial trace-free mode along the tri-diagonal axis $n$.

The antipodal-partner rows contribute no off-diagonal term after phase averaging. The entire axial trace-free response comes from the cross-binary root population.

## Why Full Octahedral Cancellation Does Not Apply

If the delayed response tensor were invariant under the full signed octahedral group, then a signed half-turn such as

$$
S_x=\operatorname{diag}(1,-1,-1)
$$

would imply

$$
T=S_xTS_x^T.
$$

That would force $T^{12}=-T^{12}$ and $T^{13}=-T^{13}$, hence $\beta=0$ in the matrix above. Together with cyclic symmetry, the trace-free tensor would vanish.

The certified time-oriented causal-root ledger does not supply that stronger symmetry. Cross-binary roots reduce to

$$
F_{\kappa}(\tilde\theta,y)
=
y^2-2+\sin(2\tilde\theta-y)+\kappa\sin y,
\qquad
\kappa=\delta_{ij}\varepsilon_{ab}.
$$

Cyclic relabeling preserves the orientation label $\varepsilon_{ab}$ and therefore preserves the $\kappa$ structure. Signed coordinate flips or orientation-reversing reflections do not preserve the same time-oriented root ledger in this form. The two cross-root delay bands are also different:

$$
\kappa=+1:
\quad
y\in[0.636732650805282,1.418310091622525],
$$

$$
\kappa=-1:
\quad
y\in[1.409624004002596,1.979320146556212].
$$

Thus equal external exposure $\mathsf W_{\mathrm{ext},ij}=1$ is not the same thing as full octahedral orbit-constant weighting after delayed causal roots are solved. The geometry-facing weights $1/(y^2J)$ are root-dependent and preserve only the certified cyclic reduction. The trace-free axial mode is therefore symmetry-allowed, not a contradiction.

## One-Dimensional Root-Band Reduction

For cross-binary rows, the certified source packet reduces all twenty-four rows to

$$
F_{\kappa}(\tilde\theta,y)
=
y^2-2+\sin(2\tilde\theta-y)+\kappa\sin y
=0,
\qquad
\kappa\in\{+1,-1\}.
$$

Define

$$
s_\kappa(y)=2-y^2-\kappa\sin y,
\qquad
c_\kappa(y)=\sqrt{1-s_\kappa(y)^2}.
$$

The certified root bands are

$$
[a_+,b_+]=[0.636732650805282,1.418310091622525],
$$

and

$$
[a_-,b_-]=[1.409624004002596,1.979320146556212].
$$

On the two phase branches with $\cos(2\tilde\theta-y)=\pm c_\kappa(y)$, the fixed-speed Jacobians are

$$
J_\kappa^\pm(y)
=
\frac{2y\mp c_\kappa(y)+\kappa\cos y}{2y}.
$$

Thus the cross-binary phase averages reduce to endpoint-singular but one-dimensional integrals:

$$
\bar y_\kappa
=
\frac1\pi
\int_{a_\kappa}^{b_\kappa}
\frac{
y(2y+\kappa\cos y)
}{
c_\kappa(y)
}\,dy,
$$

$$
\overline{y/J}_\kappa
=
\frac1\pi
\int_{a_\kappa}^{b_\kappa}
\frac{2y^2}{c_\kappa(y)}\,dy,
$$

and

$$
\overline{1/J}_\kappa
=
\frac1\pi
\int_{a_\kappa}^{b_\kappa}
\frac{2y}{c_\kappa(y)}\,dy.
$$

The endpoint singularities are square-root singularities inherited from the turning points of the implicit root graph. They are integrable and are removed numerically by the substitution

$$
y=\frac{a_\kappa+b_\kappa}{2}
+
\frac{b_\kappa-a_\kappa}{2}\sin u,
\qquad
-\frac{\pi}{2}<u<\frac{\pi}{2}.
$$

With midpoint quadrature in $u$, the reduced integrals give

| Class | $\bar y_\kappa$ | $\overline{y/J}_\kappa$ | $\overline{1/J}_\kappa$ |
| --- | ---: | ---: | ---: |
| $\kappa=+1$ | $1.0448480207$ | $0.8657990962$ | $0.7976961896$ |
| $\kappa=-1$ | $1.7117798937$ | $1.6500381468$ | $0.9700333846$ |

The antipodal-partner row has

$$
y_*=1.47817026643,
\qquad
J_*=1.673612029183.
$$

Therefore

$$
\boxed{
\frac{
6y_*/J_*+12\overline{y/J}_{+}+12\overline{y/J}_{-}
}{
6y_*+12\bar y_{+}+12\bar y_{-}
}
=
0.8460213966
}
$$

and

$$
\boxed{
\frac{
6/J_*+12\overline{1/J}_{+}+12\overline{1/J}_{-}
}{30}
=
0.8265938388.
}
$$

These are the reduced forms of the period-response coefficient and equal-locked interface coefficient from the insertion packet:

$$
\delta\ln T_{\mathrm{oct,root}}
=
0.8460213966\,\varepsilon,
\qquad
\delta s_X
\approx
\frac{
1.6531876776\,\varepsilon\,D_{a,X}(1-D_{a,X})
}{
\|\nabla D_{a,X}\|
}.
$$

## Axial Trace-Free Response Coefficient

For the off-diagonal tensor coefficient, the twelve cross-binary rows in a fixed $\kappa$ class reduce to a scalar integrand

$$
q_\kappa(\phi)
=
\frac{
2\left(\kappa\sin y_\kappa-\sin(2\phi-y_\kappa)\right)
}{
y_\kappa^2
},
$$

where $y_\kappa=y_\kappa(\phi)$ is the unique cross-root of $F_\kappa(\phi,y)=0$. Thus

$$
\mathcal Z_{\mathrm{off}}
=
\frac1{30}
\sum_{\kappa=\pm1}
\overline{
\frac{q_\kappa}{y_\kappa^2J_\kappa}
},
$$

and

$$
\frac{\delta\mathcal Z_{\mathrm{tf,off}}}{\varepsilon}
=
-\frac2{30}
\sum_{\kappa=\pm1}
\overline{
\frac{q_\kappa}{y_\kappa^2J_\kappa^2}
}.
$$

The all-pairs quadrature at increasing phase counts gives the same axial coefficient. In the notation

$$
\delta\mathcal Z_{\mathrm{oct,tf}}^{ab}
=
\zeta_{\delta Z}\varepsilon
\left(
n^an^b-\frac13h^{ab}
\right),
$$

the coefficient is

$$
\boxed{
\zeta_{\delta Z}
\approx
-0.000680152657812.
}
$$

Equivalently, each off-diagonal entry is

$$
\boxed{
\delta\mathcal Z_{\mathrm{oct,tf}}^{12}
=
\delta\mathcal Z_{\mathrm{oct,tf}}^{13}
=
\delta\mathcal Z_{\mathrm{oct,tf}}^{23}
\approx
-0.000226717552604\,\varepsilon.
}
$$

The corresponding unvaried trace-free exposure coefficient is

$$
\mathcal Z_{\mathrm{oct,tf}}^{ab}
\approx
-0.009307998908
\left(
n^an^b-\frac13h^{ab}
\right).
$$

Reduced one-dimensional quadrature and direct all-thirty-pair bisection agree to roundoff. A conservative numerical bracket from the reduced quadrature sweep is:

| Quantity | Bracket |
| --- | ---: |
| $\delta\ln T_{\mathrm{oct,root}}/\varepsilon$ | $[0.84602139663999,\ 0.84602139664000]$ |
| $\langle1/J\rangle_{\mathrm{oct}}$ | $[0.82659383882050,\ 0.82659383882051]$ |
| $\mathcal Z_{\mathrm{oct}}^{12}$ | $[-0.003102666302727,\ -0.003102666302726]$ |
| $\delta\mathcal Z_{\mathrm{oct,tf}}^{12}/\varepsilon$ | $[-0.000226717552605,\ -0.000226717552603]$ |

The convergence of the reduced quadrature is:

| Reduced nodes | $\delta\ln T/\varepsilon$ | $\langle1/J\rangle$ | $\mathcal Z_{\mathrm{off}}$ | $\delta\mathcal Z_{\mathrm{tf,off}}/\varepsilon$ |
| ---: | ---: | ---: | ---: | ---: |
| $24$ | $0.8460109944$ | $0.8265980465$ | $-0.0031028809$ | $-0.0002763400$ |
| $48$ | $0.8460213989$ | $0.8265938399$ | $-0.0031026668$ | $-0.0002267118$ |
| $72$ | $0.8460213966$ | $0.8265938388$ | $-0.0031026663$ | $-0.0002267176$ |
| $120$ | $0.8460213966$ | $0.8265938388$ | $-0.0031026663$ | $-0.0002267176$ |
| $92160$ | $0.8460213966$ | $0.8265938388$ | $-0.0031026663$ | $-0.0002267176$ |

This closes the symmetry question: the trace-free response is not a generic numerical artifact. It lies in the unique axial mode allowed by the certified equal all-pairs root ledger, and the coefficient is nonzero to the displayed quadrature stability.

## Closure Status

| Row | Status | Meaning |
| --- | --- | --- |
| scalar period response | `reduced-root-integral-closed` | the all-pairs coefficient is reduced to two one-dimensional cross-root integrals plus the exact partner row |
| equal-locked interface response | `reduced-root-integral-closed` | $\langle1/J\rangle_{\mathrm{oct}}$ is reduced to the same root-band integrals |
| trace-free exposure direction | `symmetry-closed` | equal all-pairs exposure permits only the axial tensor $n^an^b-h^{ab}/3$ |
| trace-free exposure coefficient | `quadrature-sign-closed` | the coefficient is nonzero and stable across refined all-pairs quadrature, but not yet an interval-arithmetic theorem |
| retained dynamics branch | `response-open` | the rigid octahedral dynamics/action row remains unretained |

## Theory Consequence

The geometry bridge now has a concrete root-ledger mechanism:

$$
\mathsf D_\varepsilon=(1+\varepsilon)I
\quad\Longrightarrow\quad
\delta y=\frac{y}{J}\varepsilon
\quad\Longrightarrow\quad
\delta\mathcal Z_{\mathrm{tf}}^{ab}
=
-0.0006801526578\,\varepsilon
\left(
n^an^b-\frac13h^{ab}
\right).
$$

An isotropic support deformation can therefore export a directed trace-free spatial-compliance response because the delayed causal-root Jacobian distribution is not isotropic under the full rotation group. The exported axis is not inserted by hand; it is the tri-diagonal axis left by the certified all-pairs root ledger.

This is still not an observer metric. It is the branch-local geometry source that an ADM/Cartan projection must either consume, cancel by medium response, or reject by a Weyl-versus-dynamical-potential residual.
