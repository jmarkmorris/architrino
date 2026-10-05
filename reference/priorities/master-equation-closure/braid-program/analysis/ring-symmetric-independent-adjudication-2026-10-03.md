# Independent adjudication of common planar ring growth

The common radius-and-phase first variation in [the family account](ring-family-symmetric-stability-2026-10-03.md) is accepted on its declared exact ordinary-root references. A separately constructed Cartesian instrument encloses opposite determinant signs, a nonzero determinant derivative and a nonzero tangential-input numerator at both witnessed positive roots on every recorded even rung T02 through T200. This is a conditional independently checked local spectral result. It counts neither the full spectrum nor nonlinear departure histories beyond the inherited T02 theorem.

## Independent construction

The subject factorizes its first variation into separation and fixed-emission velocity tensors. The new [adjudication instrument](../../../../../scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py) instead constructs the receiver and emission positions, source velocity and source acceleration in Cartesian coordinates for each column of a trial perturbation. It differentiates the causal time first, then differentiates range, direction, source velocity and the signed transmitter factor. It imports no subject tensor, coefficient, characteristic matrix, scalar oracle or production solver.

At an ordinary root, write $\delta q$ for the fixed-emission separation change. The causal equation gives

$$
\delta S=-\frac{\mathbf n\cdot\delta q}{D},\qquad
\delta\mathbf r=\delta q-\mathbf v\delta S,
\qquad
\delta\ell=\mathbf n\cdot\delta\mathbf r,
\qquad
\delta\mathbf n=\frac{\delta\mathbf r-\mathbf n\delta\ell}{\ell}.
$$

Including the acceleration at the moved emission, $\delta\mathbf v=\delta\mathbf v_f+\mathbf a_s\delta S$ and $\delta D=-\delta\mathbf n\cdot\mathbf v-\mathbf n\cdot\delta\mathbf v$. Direct differentiation of the unchanged per-hit acceleration therefore gives

$$
\delta\mathbf A=\frac{\sigma K}{\ell^2|D|}\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta\ell}{\ell}+\frac{\delta D}{D}\right)\right].
$$

This independently recovers the subject's factorization, including its signed $D$ divisor on reversed arrival branches. For a common exponential perturbation, emission displacements contain the actual source rotation and $e^{-z\ell}$; their velocities include both $z$ and $\Omega J$. The co-rotating acceleration side is $z^2I+2\Omega zJ-\Omega^2I$. These terms independently recover the subject characteristic matrix. The verifier differentiates the same direct column construction with respect to $z$ to enclose its determinant derivative, rather than importing the subject's derivative expression.

The receiver reference has $\mathbf n=(\sin x,\cos x)$, delay $2R\sin x$, and $D=1-\beta\cos x$. Strict concavity of $\beta\sin x-x$ supplies precisely the descending levels $-5,\ldots,0$ and both branches of levels $1,\ldots,t-1$ in T$t$. This independently establishes the complete level inventory. The verifier consumes the subject's exact binary reference enclosures, checks this inventory and nonzero transmitter factors, and verifies that each retained root interval contains zero in its causal residual. It then recomputes all characteristic columns from those reference enclosures. Reference inclusion and exact balance remain premises supplied by the subject's separate endpoint and balance certificates and the accepted ladder; overlap of a residual with zero alone is not a new root-inclusion proof.

## Controls and target record

Before a spectral target, the new instrument passed the analytical Cartesian static-source derivative $\operatorname{diag}(-2,1)/8$ at separation 2 for both polarities, and the exact circular range and transmitter-factor identities at a chosen ordinary geometry. The latter geometry is an algebraic control, not a configuration being given a stability verdict. The known-control receipt was recorded before the first target on this instrument identity.

The first target recomputed all sixteen selected positive-root brackets using mpmath 1.3.0 outward interval arithmetic at 100 decimal digits, with 110-digit point carriers and $K=c_f=1$. The completed family extension then recomputed all 200 witness brackets across the hundred recorded rungs using the unchanged independent instrument. Every bracket had strict opposite endpoint signs, a derivative of fixed nonzero sign throughout the bracket, and at least one strictly nonzero component of $(-A_{12},A_{11})^{\mathsf T}$. The receipts are `.local-data/ring-exploration/symmetric-adjudication/known.json` and `target.json`; the selected supervised target exited zero after 10.607 seconds and the full-family target after 128.317 seconds. Both process groups closed. The operational supervisor measures job ownership and completion, not mathematical validity.

Reproduce in this order:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py --stage target
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_symmetric_independent_adjudication_20261003.py --stage target --rungs {2..200..2}
```

## Verdict and boundaries

Accepted, derived conditional: the first variation, characteristic matrix, complete level census and tangential-input transfer identity. Accepted, computer-assisted derived conditional on the exact-reference certificates: existence, uniqueness within each displayed bracket and simplicity of all 200 witnessed growing roots, plus formal tangential-kick excitation without cancellation at their poles. The numerical root values are measured locating displays.

A present-time velocity impulse with fixed past is a piecewise smooth external preparation. Its formal Laplace input is $A(z)\widehat u=e_2\delta v$, and a nonzero adjugate column at a simple growing root proves excitation in that linear input problem. It does not construct a compatible ancient nonlinear history, prove a finite driven history stays on its root chart, or establish a specific rung transition. A slow torque requires a specified temporal profile: its transform can alter or cancel pole weights. The existing independently adjudicated T02 nonlinear theorem remains a distinct result.

The finite root table establishes no all-rung theorem by itself. The separately [adjudicated fast-root asymptotic](ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md#6-c1-spectral-limit-and-largest-real-root-confinement) supplies a growing largest positive real common-sector root at every sufficiently high rung, with no numerical threshold. The differential planar and axial sectors are distinct obligations; the [axial adjudication](ring-axial-independent-adjudication-2026-10-03.md) separately checks T02, T04 and T06 witnesses.

Falsifiers: an exact reference outside its supplied balance interval, a missing positive-delay self or partner level, a zero transmitter factor, an error in the Cartesian causal derivative, a failed outward determinant endpoint sign, a derivative containing zero, or a zero-containing input numerator defeats the corresponding local claim. A verified finite-amplitude history with different fate does not refute these local spectral witnesses; nonlinear fate is unclaimed here.
