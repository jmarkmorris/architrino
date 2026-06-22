# Octahedral Fold-Aware Clock/Length Orbit Scan

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-clock-length-profile-scan](octahedral-fold-aware-clock-length-profile-scan.md). The predecessor applies the exact clock/length criterion to receiver $1+$ at the representative zero-ray point. This packet lifts that sampled diagnostic to the full octahedral receiver orbit

$$
\{1+,1-,2+,2-,3+,3-\}.
$$

It is an orbit-completion diagnostic, not an interval certificate.

## Receiver-Orbit Sample

At the orbit-scan resolution

$$
N=64,
\qquad
\texttt{root\_subdivisions}=5000,
$$

the six receiver rows use the same representative zero-ray data

$$
h=1,
\qquad
s=v_0,
\qquad
v_0\approx3.021564740248.
$$

Every receiver row samples the same projected fold-aware root-count set:

$$
\{7,9\}.
$$

The sampled orbit has

$$
\texttt{receiver\_count}=6,
\qquad
\texttt{all\_receiver\_labels\_covered=true}.
$$

The sampled forcing means return to numerical zero across the orbit, and the primitive summaries match to the emitted precision:

$$
\Delta A_{\min}=0,
\qquad
\Delta\overline A=0,
\qquad
\Delta A_{\max}=0.
$$

The orbit status is

$$
\boxed{
\texttt{sampled-octahedral-receiver-orbit-matched}.
}
$$

## Orbit Clock/Length Margin

The common sampled clock speed interval at this resolution is

$$
\boxed{
2.858541947085
\lesssim
\nu^{\mathrm{clk}}(u)
\lesssim
3.184587533410.
}
$$

The weakest sampled positivity margin over the six receiver orbit is

$$
\boxed{
\nu_{\min,\mathrm{orbit}}^{\mathrm{clk}}
\approx
2.858541947085>0.
}
$$

Thus the sampled orbit status is

$$
\boxed{
\texttt{sampled-fold-aware-clock-length-receiver-orbit-positive-profile}.
}
$$

This strengthens the prior single-receiver result. The sampled clock/length row is no longer merely a $1+$ signal; it is orbit-symmetric at the sampled resolution.

## Claim Boundary

This packet certifies only the sampled receiver-orbit profile:

$$
\texttt{certifies\_sampled\_receiver\_orbit\_positive\_profile=true}.
$$

It does not certify:

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The next mathematical upgrade is an interval or chart-partition certificate for the receiver-orbit quantities:

$$
A_{\min,i},
\qquad
\overline A_i,
\qquad
A_{\max,i},
\qquad
|J|_{\min,i},
\qquad
i\in\{1+,1-,2+,2-,3+,3-\}.
$$

That certificate must own the projected fold phases where the ordinary phase chart reports the root-count set $\{7,9\}$.

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-clock-length-orbit-scan.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-clock-length-orbit-scan.mjs) emits:

- the source profile-scan validation status;
- six receiver profile rows;
- orbit symmetry spreads for primitive and clock quantities;
- the weakest sampled positivity margin;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-fold-aware-clock-length-orbit-scan.test.js](../../../tests/neutral-braid-octahedral-fold-aware-clock-length-orbit-scan.test.js) verifies six-label coverage, sampled orbit matching, no fixed speed window, CLI validation, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it upgrades the sampled clock/length signal from one receiver to the whole octahedral receiver orbit. It should not be promoted into reader-facing AAA prose until the sampled orbit is upgraded to an interval or chart-partition certificate, or until a separate theorem-target edit is scoped for the general bounded-speed clock/length theorem.

The direct successor [octahedral-fold-aware-clock-length-orbit-symmetry-reduction](octahedral-fold-aware-clock-length-orbit-symmetry-reduction.md) records the sampled receiver-orbit equality as a candidate one-receiver reduction for the future interval proof. It keeps interval replacement conditional on a signed-cyclic chart-closure proof.
