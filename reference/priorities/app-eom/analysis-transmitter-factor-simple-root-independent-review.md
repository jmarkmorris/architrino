# Independent Review of the Source-Density Simple-Root Limit

## Status

- Review target: [Source-Density Finite-Width Equation and Simple-Root Limit](analysis-transmitter-side-finite-width-simple-root-limit.md)
- Review method: independent reconstruction from the emission measure, an exact moving-receiver control, and a joint-limit audit
- Standing: priority analysis; not canon and not an EOM solver specification
- Verdict: pass after the qualifications and corrections recorded below

## Finding in plain language

The simple-root calculation is correct, but its physical and mathematical inputs must be stated separately. Uniform emission through transmitter time produces a constant numerator divided by $|D_t|$. The numerator becomes $c_f$ only because the model additionally normalizes a stationary transmitter to unit causal-hit weight.

On an interior simple-root domain with nonzero separation, the finite-width equation converges jointly to the proposed sharp equation as wake width and core scale approach zero. Receiver velocity is absent from that fixed-event limit. An exact stationary-transmitter control confirms this even when the receiver has arbitrary radial velocity at the reception event.

Claim classification: **derived mathematical review**. This review does not establish that uniform transmitter-time emission is physically correct.

## 1. Reconstruction from the emission measure

Write the uniform transmitter-time emission measure as

$$
d\mu_t
=
\lambda_{\mathrm{em}}\,dT_t,
$$

where $\lambda_{\mathrm{em}}$ is constant. At fixed reception event, the causal residual is

$$
g(T_r,T_t)
=
\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|
-c_f(T_r-T_t),
$$

with

$$
\frac{\partial g}{\partial T_t}=D_t.
$$

The one-dimensional change of variables at an interior simple root gives

$$
\int
f(T_t)\delta(g(T_r,T_t))\,d\mu_t
=
\sum_\ell
f(T_{t,\ell})
\frac{\lambda_{\mathrm{em}}}{|D_{t,\ell}|}.
$$

For a stationary transmitter, $D_t=c_f$. Requiring its causal-hit weight to equal one gives

$$
\frac{\lambda_{\mathrm{em}}}{c_f}=1,
\qquad
\lambda_{\mathrm{em}}=c_f.
$$

Therefore the proposed factor is

$$
\frac{c_f}{|D_t|}.
$$

The denominator is derived from the causal-root change of variables. The numerator is fixed by a separate static-normalization declaration. No derivative with respect to reception time occurs in this calculation.

Falsifier: a correct fixed-reception-time change of variables for this same emission measure that produces a Jacobian other than $1/|D_t|$.

## 2. Exact moving-receiver control

Let the transmitter remain at the origin. At the selected reception event, put

$$
\mathbf X_r(T_r)=R\hat{\mathbf e},
\qquad
\mathbf V_r(T_r)=\mathbf W,
\qquad
0<R<c_fh.
$$

The receiver may have any smooth past compatible with that current event. Because the transmitter is stationary, its emission-time geometry is

$$
r=R,
\qquad
g(T_r,T_t)=R-c_f(T_r-T_t),
\qquad
D_t=c_f.
$$

For a Gaussian wake profile, the finite-width acceleration is exactly

$$
\mathbf A_{r\leftarrow t}^{(\eta,\epsilon_c)}(T_r)
=
\kappa\,\sigma_{tr}|q_tq_r|
\mathbf K_{\epsilon_c}(R\hat{\mathbf e})
\left[
\Phi\!\left(\frac{R}{\eta}\right)
-
\Phi\!\left(\frac{R-c_fh}{\eta}\right)
\right].
$$

The result contains the current receiver position but not $\mathbf W$. Its sharp limit is

$$
\kappa\,\sigma_{tr}|q_tq_r|
\frac{\hat{\mathbf e}}{R^2}.
$$

The receiver-weighted candidate predicts instead

$$
\kappa\,\sigma_{tr}|q_tq_r|
\frac{\hat{\mathbf e}}{R^2}
\frac{|c_f-\hat{\mathbf e}\cdot\mathbf W|}{c_f}.
$$

The two candidates therefore make different algebraic predictions at the same reception position whenever $\hat{\mathbf e}\cdot\mathbf W\ne0$. This is an exact discriminator of the measures. It is not external physical evidence because both predictions are calculated from their respective postulates.

Falsifier: direct evaluation of the stated finite-width emission integral that depends on $\mathbf W$ while the current reception event and stationary transmitter history are held fixed.

## 3. Joint regulator limit

The reviewed theorem needs the following explicit conditions:

1. finitely many roots strictly inside the retained interval;
2. a uniform simple-root floor $|D_t|\ge\nu_t>0$;
3. separated root neighborhoods and a positive residual gap on their complement;
4. a distance floor $r\ge r_{\min}>0$;
5. continuous retained histories and spatial kernel near the roots;
6. a normalized approximate identity whose tail mass leaves every fixed nonzero residual neighborhood as $\eta\to0^+$.

Under these conditions, the causal-width limit is uniform over the finite root set. The distance floor also gives

$$
\sup_{r\ge r_{\min}}
\left\|
\mathbf K_{\epsilon_c}(\mathbf r)
-
\frac{\hat{\mathbf r}}{r^2}
\right\|
\longrightarrow0
$$

as $\epsilon_c\to0^+$. Hence the two error bounds may be added, and convergence holds for every joint refinement path $(\eta,\epsilon_c)\to(0,0)$.

Claim classification: **derived**. A simple-root, distance-bounded counterexample with path-dependent joint convergence would overturn the result.

## 4. Review corrections

The target derivation has been corrected to:

- distinguish uniform emission from static normalization;
- state an approximate-identity tail condition rather than normalization alone;
- assert the joint regulator limit supported by the distance floor;
- use an arbitrary-velocity receiver in the exact stationary-transmitter control;
- state that the exact control discriminates the candidate measures algebraically but does not select one physically.

## 5. Disposition

The simple-root mathematical obligation passes independent review on its declared domain. The result may support the priority proposal as a derived lemma. It does not by itself support canon or EOM solver migration because it excludes folds, coincident same-source birth, and physical selection of the emission measure.

Promotion classification: **promote now within the priority proposal; defer canon with the remaining blockers**.
