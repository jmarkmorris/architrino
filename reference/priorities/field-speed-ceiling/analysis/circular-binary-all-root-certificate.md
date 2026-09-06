# FSC-010: Circular-Binary All-Root Certificate

**Status:** prescribed-chart certificate. **Claim grade:** derived analytic root census and compatibility calculation for the declared all-past two-label circular history, under the proposed constrained-response law. This is not a delayed-system existence theorem.

## Scope

Fix $K=\kappa|q_1q_2|>0$, $c_f>0$, and

$$
0<c_a\le c_f,
\qquad
\lambda=\frac{c_a}{c_f}\in(0,1].
$$

The certificate concerns only two labeled, opposite-polarity architrinos on the prescribed all-past antipodal circle

$$
\mathbf X_1(T)=R\mathbf e_r(T),
\qquad
\mathbf X_2(T)=-R\mathbf e_r(T),
\qquad
R|\omega|=c_a,
$$

with no other labels. It certifies the complete ordinary causal-root ledger for that declared history. It does not construct a history from initial data.

## Analytic all-parameter certificate

For an ordered partner channel, write

$$
\xi=\frac{|\omega|\Delta}{2}.
$$

The positive-delay root equation is

$$
\xi=\lambda|\cos\xi|.
$$

Every root obeys $0<\xi\le\lambda\le1<\pi/2$, hence it lies on the positive-cosine branch and solves

$$
F_\lambda(\xi)=\xi-\lambda\cos\xi=0,
\qquad 0\le\xi\le\lambda.
$$

Here $F_\lambda(0)=-\lambda<0$, $F_\lambda(\lambda)=\lambda(1-\cos\lambda)>0$, and

$$
F_\lambda'(\xi)=1+\lambda\sin\xi>0.
$$

Thus there is exactly one positive partner root $\xi_\lambda\in(0,\lambda)$. Its range, delay, and both root factors are

$$
r_{12}=2R\cos\xi_\lambda,
\qquad
\Delta=\frac{2R\xi_\lambda}{c_a},
\qquad
D_t=D_r=c_f(1+\lambda\sin\xi_\lambda)>0.
$$

Plainly: every permitted speed ratio gives one and only one delayed partner reception on the prescribed circle, and that reception stays on an ordinary simple-root chart.

For a positive-delay same-transmitter root, put $\eta=|\omega|\Delta/2$. Its equation would be

$$
\eta=\lambda|\sin\eta|.
$$

It would imply $0<\eta\le\lambda\le1$, where $\lambda\sin\eta\le\sin\eta<\eta$, a contradiction. Hence the complete ordinary two-label ledger contains exactly one partner row and no positive-delay self row for each receiver.

Plainly: once both labels and the entire past circle are declared, the root census is complete: one partner row and no self row for either receiver.

The one partner row is

$$
\mathbf A_{12}^{\mathrm{ord}}
=
-\frac{K}
{4R^2\cos^2\xi_\lambda(1+\lambda\sin\xi_\lambda)}
\left(\cos\xi_\lambda\mathbf e_r-
\sin\xi_\lambda\mathbf e_\theta\right).
$$

Its radial component is inward and its tangential component is forward. The proposed response is applied once to this complete ledger and removes the forward tangential component. Equating the retained inward acceleration with $c_a^2/R$ gives

$$
R_{\ast,\lambda}
=
\frac{K}
{4c_a^2\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)},
\qquad
|\omega_{\ast,\lambda}|
=
\frac{4c_a^3\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)}{K}.
$$

This is a symbolic residual identity for the prescribed chart, not a stability or trajectory certificate.

Plainly: the proposed ceiling response removes the forward part only after the whole ledger has been formed. The remaining inward acceleration matches the turning of exactly one radius for each speed ratio.

## Equal-speed numerical endpoint

At $c_a=c_f$, $\lambda=1$ and

$$
D=\cos D,
\qquad
R_\ast=\frac{K}{4c_f^2D(1+\sin D)},
\qquad
|\omega_\ast|=\frac{4c_f^3D(1+\sin D)}{K}.
$$

The replayable normalized $(c_f=c_a=K=1)$ arithmetic witness is bound by the [input specification](../../../../scripts/field-speed-ceiling/circular-binary-all-root-certificate-input.v1.json), [mpmath oracle](../../../../scripts/field-speed-ceiling/circular-binary-all-root-mpmath-oracle.py), [receipt](../evidence/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json), and [receipt test](../../../../tests/test_field_speed_ceiling_circular_binary_all_root_certificate.py). It supplies a reproducible arbitrary-precision decimal Dottie bracket, strict $D_t=D_r$ margin, positive raw tangential component, and a numerical check of the radial residual. This replay tests the implementation deterministically; it is not an independent or directed-rounding interval proof. The analytic monotonicity proof above, rather than sampling, certifies the full $\lambda\in(0,1]$ census.

Plainly: the theorem covers the whole speed interval analytically. The saved decimal receipt is a replayable endpoint check, not the source of the theorem.

## Claim boundary

This certificate does **not** establish a coupled retained-history solution, capture, stability, conservation, action transfer, a retuning event, a retained braid, or adoption of the proposed path-speed ceiling. It is falsified by an additional ordinary root on the declared history, failure of the displayed root-factor positivity, a backward tangential component, or a nonzero radius-balance residual under the declared response law.

## Closure goal

Use this prescribed-chart certificate as FSC-010's completed input to FSC-011, then prove or refute the required history-to-ledger Lipschitz and local contraction estimates without promoting the chart to a stable or captured binary.
