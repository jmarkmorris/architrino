# Octahedral Fold-Aware Cross-Binary Quarter Profile Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-representative-profile-decomposition](octahedral-fold-aware-representative-profile-decomposition.md). The predecessor proves that the representative $1+$ antipodal-partner row is pointwise null at the certified zero and that the cross-binary remainder has quarter-shift symmetry. This packet turns that symmetry into the explicit quarter-primitive formulas used by the sampled clock/length row.

It is a sampled quarter-profile certificate, not a coarea interval certificate. It does not certify the retained branch.

## Quarter Primitive Reduction

Let

$$
Q=\frac{H}{4},
\qquad
f=f_{\times},
\qquad
A(u)=\int_0^u f(q)\,dq,
\qquad
C=\int_0^Q f(q)\,dq.
$$

For the representative $1+$ cross-binary remainder, the symmetry row is

$$
f(u+Q)=-f(u),
\qquad
f(u+2Q)=f(u).
$$

Therefore, for $0\le u\le Q$,

$$
\boxed{
A(u+Q)=C-A(u),
\qquad
A(u+2Q)=A(u),
\qquad
A(u+3Q)=C-A(u),
\qquad
A(H)=0.
}
$$

The full-period primitive image is exactly

$$
\boxed{
A([0,H])
=
A([0,Q])\cup\left(C-A([0,Q])\right).
}
$$

If

$$
m_Q=\min_{0\le u\le Q}A(u),
\qquad
M_Q=\max_{0\le u\le Q}A(u),
$$

then the full-period extrema are

$$
\boxed{
A_{\min}=\min\{m_Q,C-M_Q\},
\qquad
A_{\max}=\max\{M_Q,C-m_Q\}.
}
$$

The full-period primitive mean is

$$
\boxed{
\overline A
=
\frac{1}{H}\int_0^H A(u)\,du
=
\frac{C}{2}.
}
$$

Equivalently, for the centered primitive

$$
\widetilde A(u)=A(u)-\frac{C}{2},
$$

the transport law is

$$
\boxed{
\widetilde A(u+Q)=-\widetilde A(u),
\qquad
\widetilde A(u+2Q)=\widetilde A(u).
}
$$

The entire clock/length excursion is therefore controlled by one quarter-period radius

$$
\boxed{
D_{\times}
=
\max_{0\le u\le Q}
\left|A(u)-\frac{C}{2}\right|
=
\max\left\{
M_Q-\frac{C}{2},
\frac{C}{2}-m_Q
\right\}.
}
$$

With

$$
\ell=\frac{L}{H}=v_*,
$$

the sampled centered clock profile has the exact transport form

$$
\boxed{
\nu^{\mathrm{clk}}(u)
=
\ell+\widetilde A(u),
\qquad
\nu_{\min}^{\mathrm{clk}}=\ell-D_{\times},
\qquad
\nu_{\max}^{\mathrm{clk}}=\ell+D_{\times}.
}
$$

The remaining positivity condition is the single quarter-profile inequality

$$
\boxed{
\ell>D_{\times}.
}
$$

## Sampled Quarter Profile

The executable certificate samples only

$$
\theta\in[0,\pi/2)
$$

for receiver $1+$ and uses the cross-binary tangential value, not the total tangential value. The scan keeps the certified speed ratio

$$
v_*\approx3.021564740248
$$

and imposes no fixed speed window.

At the default sampled resolution,

$$
N_Q=32,
\qquad
\texttt{root\_subdivisions}=5000,
$$

the sampled quarter integral is

$$
C_{\times,\mathrm{samp}}
\approx
-0.253586748150.
$$

The sampled quarter primitive has

$$
m_{Q,\mathrm{samp}}\approx-0.253586748150,
\qquad
M_{Q,\mathrm{samp}}\approx0.002551918775.
$$

The transported full-period sampled primitive is therefore

$$
A_{\min,\mathrm{samp}}\approx-0.256138666924,
\qquad
\overline A_{\mathrm{samp}}\approx-0.126793374075,
\qquad
A_{\max,\mathrm{samp}}\approx0.002551918775.
$$

The centered radius is

$$
D_{\times,\mathrm{samp}}\approx0.129345292849.
$$

Thus the transported sampled speed interval is

$$
\boxed{
2.892219447399
\lesssim
\nu^{\mathrm{clk}}(u)
\lesssim
3.150910033097.
}
$$

The sampled positivity margin remains large:

$$
\boxed{
\ell-D_{\times,\mathrm{samp}}
\approx
2.892219447399>0.
}
$$

## Symmetry And Fold Guards

The executable checksum verifies, on the sampled quarter grid,

$$
f_{\times}(u+Q)+f_{\times}(u)\approx0,
\qquad
f_{\times}(u+2Q)-f_{\times}(u)\approx0.
$$

It also checks that the partner row and total-minus-cross residual remain at numerical null scale:

$$
|f_{\mathrm{partner}}|\lesssim10^{-13},
\qquad
|f_{\mathrm{total}}-f_{\times}|\lesssim10^{-13}.
$$

The observed sampled root-count regimes are

$$
\texttt{cross\_root\_counts=[4,6]},
\qquad
\texttt{partner\_root\_counts=[3]}.
$$

This packet does not claim a global ordinary positive $|J|$ floor. Fold cells remain real projected singularities and must be handled by the coarea identity

$$
F_\delta=\frac{2\delta}{v^2}J.
$$

Therefore the next interval proof must still enclose the quarter-profile quantities

$$
C,
\qquad
m_Q,
\qquad
M_Q,
$$

using regular subcharts and explicit fold cells.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs) emits:

- source validation for the representative decomposition and receiver-orbit chart closure;
- no-fixed-speed-window scan parameters;
- the sampled cross-binary quarter profile;
- the quarter-shift and half-period residual checks;
- the transported primitive formulas;
- the centered clock interval $\nu_{\min}=\ell-D_{\times}$, $\nu_{\max}=\ell+D_{\times}$;
- fold guards and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-quarter-profile-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-quarter-profile-certificate.test.js) verifies source validation, speed-window removal, symmetry transport, quarter primitive formulas, centered clock positivity, fold guards, CLI emission, JSON validation, and non-retention claims.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_sampled\_cross\_binary\_quarter\_profile=true},
$$

and

$$
\texttt{certifies\_sampled\_cross\_binary\_clock\_length\_positive\_profile=true}.
$$

It does not certify:

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-cross-binary-quarter-profile-positive-clock-check}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it turns the representative cross-binary remainder into a quarter-period primitive problem with explicit full-period extrema, mean, centered excursion, and clock positivity formulas. It should not be promoted into reader-facing AAA prose until the quarter-profile quantities $C$, $m_Q$, and $M_Q$ are upgraded from sampled values to coarea interval enclosures.
