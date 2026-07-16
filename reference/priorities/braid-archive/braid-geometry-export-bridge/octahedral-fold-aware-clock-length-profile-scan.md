# Octahedral Fold-Aware Clock/Length Profile Scan

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-clock-length-criterion](octahedral-fold-aware-clock-length-criterion.md). The predecessor proves the exact scalar criterion for a center-time speed primitive:

$$
\nu_i^{\mathrm{clk}}(u)
=
\frac{L_i}{H}+A_i(u)-\overline A,
\qquad
\nu_i^{\mathrm{clk}}>0
\Longleftrightarrow
\frac{L_i}{H}>\overline A-A_{\min}.
$$

This packet evaluates that criterion on the sampled fold-aware all-root profile for the representative zero-ray point

$$
h=1,
\qquad
s=v_0,
\qquad
v_0\approx3.021564740248.
$$

It is a diagnostic profile pass, not an interval certificate.

## Sampled Forcing Profile

The scan samples receiver $1+$ over one period with no fixed speed window. At the default resolution,

$$
N=128,
\qquad
\texttt{root\_subdivisions}=5000.
$$

The sampled tangential forcing has

$$
f_{\min}\approx-1.197382931209,
\qquad
\overline f_{\mathrm{samp}}\approx0,
\qquad
f_{\max}\approx1.197382931210.
$$

The projected root count is sampled as

$$
\{7,9\}.
$$

The count drops at projected fold phases where roots coalesce in the ordinary phase chart; this is why the result remains a sampled coarea-profile diagnostic rather than an interval root-sheet certificate. The sampled Jacobian floor is

$$
|J|_{\min,\mathrm{samp}}\approx0.092353561341.
$$

## Sampled Primitive And Clock Profile

After subtracting the sampled mean to enforce the periodic primitive convention, the sampled excursion satisfies

$$
A(H)-A(0)\approx0
$$

and has

$$
A_{\min}\approx-0.256138666925,
\qquad
\overline A\approx-0.126793374075,
\qquad
A_{\max}\approx0.002551918775.
$$

The representative trace carrier has

$$
H=2\pi,
\qquad
L=2\pi v_0,
\qquad
\frac{L}{H}=v_0\approx3.021564740248.
$$

Therefore the unique sampled clock offset is

$$
\nu_0^{\mathrm{clk}}
=
\frac{L}{H}-\overline A
\approx
3.148358114323.
$$

The corrected sampled speed interval is

$$
\boxed{
2.892219447398
\lesssim
\nu^{\mathrm{clk}}(u)
\lesssim
3.150910033098.
}
$$

Thus the positivity margin is

$$
\boxed{
\nu_{\min}^{\mathrm{clk}}
\approx
2.892219447398>0.
}
$$

The sampled status is

$$
\boxed{
\texttt{sampled-fold-aware-clock-length-positive-profile}.
}
$$

## Claim Boundary

This packet certifies only a sampled profile result:

$$
\texttt{certifies\_sampled\_clock\_length\_positive\_profile=true}.
$$

It does not certify:

$$
\texttt{certifies\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The next mathematical upgrade is not another requirement row; it is an interval or chart-partition enclosure of the same quantities:

$$
A_{\min},
\qquad
\overline A,
\qquad
A_{\max},
\qquad
|J|_{\min},
$$

on the fold-aware coarea convention.

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-clock-length-profile-scan.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-clock-length-profile-scan.mjs) emits:

- the source clock/length criterion validation status;
- the sampled all-root tangential forcing summary;
- the sampled primitive summary;
- the evaluated clock/length criterion;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-fold-aware-clock-length-profile-scan.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-clock-length-profile-scan.test.js) verifies the source criterion, sampled positive clock profile, CLI validation, no fixed speed window, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it applies the exact clock/length criterion to the fold-aware profile and finds a large positive sampled margin. It should not be promoted into reader-facing AAA prose until the sampled profile is upgraded to an interval or chart-partition certificate, or until a separate theorem-target edit is scoped for the general bounded-speed clock/length theorem.

The direct successor [octahedral-fold-aware-clock-length-orbit-scan](octahedral-fold-aware-clock-length-orbit-scan.md) lifts the sampled positive profile from receiver $1+$ to all six octahedral receiver labels and finds an orbit-matched positive sampled profile.
