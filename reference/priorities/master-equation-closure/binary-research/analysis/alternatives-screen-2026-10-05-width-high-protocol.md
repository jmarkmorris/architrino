# Finite high-speed reduction and frozen final circle-cover protocol

Status: derived speed bound and frozen numerical protocol, 2026-10-05, before the new target. The selected equations remain exactly the four laws with $K_{ij}=c_f=1$, self sign $+1$, opposite-polarity partner sign $-1$, triangular reception $\delta_h(z)=h^{-1}(1-|z|/h)_+$, and $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$. The configuration is a complete all-time uniform antipodal circle about a fixed center in the Euclidean void, with positive radius $R$ and speed $\beta=R|\omega|$. Spatial rotations, fixed translations and time phase do not change the question. A moving center, different relative phase, nonuniform orbit or different law is outside it.

## Derived finite speed cutoff for radii at most two

The [complete triangular-window theorem](alternatives-screen-2026-10-05-width-circle-exclusion-analytic-window.md), SHA-256 `5d90b8d2235b73cb9dcf2958b8eb6cbf6657147535cdb6849a477d4027beddb2`, includes every age from zero through $T=2R+h$ and bounds the full inward radial input by

$$
-RA_r\le U_\triangle(R)=
\begin{cases}
MT/(2h),&T\le b,\\
\big[Mb+\log(T/b)\big]/(2h),&T>b,
\end{cases}
\qquad M=\frac2{5\rho},\quad b=\max(h,5\rho/2).
$$

This follows from the nonnegative self radial contribution, $g(r)=r^2/(r^2+\rho^2)^{3/2}\le M$, and $g(r)W((r-\tau)/h)\le1/\tau$ for $\tau>h$. The latter uses $g\le1/r$ and $\tau W((r-\tau)/h)\le r$. Older ages vanish because both circle chords are at most $2R$. These are complete-integral bounds, not quadrature estimates.

Claim grade: derived. For $0<R\le2$, each of the following strict bounds holds:

| $h$ | $\rho$ | Upper bound for $U_\triangle(R)$ |
| --- | --- | ---: |
| $1/16$ | $1/32$ | $208/5$ |
| $1/16$ | $1/64$ | $1861/40$ |
| $1/32$ | $1/32$ | $416/5$ |
| $1/32$ | $1/64$ | $472/5$ |

For the first law, $b=5/64$, $Mb=1$, and $T/b\le52<64$, so the bound is below $8(1+6\cdot7/10)=208/5$. For the second, $b=h$, $M=128/5$ and $T/h\le65$, giving $64/5+8\log65<64/5+8(6\cdot7/10+1/64)=1861/40$. For the third, $b=5/64$, $Mb=1$ and $T/b\le258/5<64$, giving $16(1+6\cdot7/10)=416/5$. For the fourth, $b=5/128$, $Mb=1$ and $T/b\le516/5<128$, giving $16(1+7\cdot7/10)=472/5$. If $T\le b$, the first branch is at most $Mb/(2h)$ and lies below the same tabulated bound. Here $\log2<7/10$ and $\log(1+t)\le t$ are the elementary inequalities proved in the referenced theorem.

Every table entry is below 100. Since radial balance requires $\beta^2=-RA_r$, all four laws have no circle with $0<R\le2$, $\beta\ge10$. This analytical tail is unbounded in speed and independent of every numerical target.

## Exact remaining rectangle and unchanged reference compatibility

The preceding [small-radius and moderate-speed certificate](alternatives-screen-2026-10-05-width-circle-exclusion-result.md) and the separately assessed large-radius work leave the new exact compact target

$$
8\le\beta\le10,\qquad2^{-9}\le R\le2.
$$

Its endpoints overlap all adjoining regions, so no numerical endpoint gap is introduced. The target includes all four laws, even where an analytical mask already excludes a box.

The numerical source is the unchanged [outward interval reference](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py), SHA-256 `fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145`. The unchanged [coverage reference](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-cover.py), SHA-256 `a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78`, supplies exact midpoint splits and the rational leaf audit. No reference, arithmetic rule, window or coefficient is edited.

The interval table reaches phase 272. Some formal wide-window boxes in this new rectangle would exceed that range, but none requires integration: for $h=1/16$ and all $R\le2$, the reference's unchanged logarithmic analytical mask bounds inward input by at most $232/5$ when $\rho=1/32$ and $292/5$ when $\rho=1/64$, both strictly below the lower required $\beta^2=64$. Thus every wide-window box is excluded before integration. For $h=1/32$, the largest possible complete endpoint is

$$
\beta_+(2+h/R_-)\le10(2+16)=180<272.
$$

Accordingly every actual interval evaluation lies inside the existing table domain. The new driver explicitly rejects an unexpected unmasked wide-window case rather than extending or truncating the table. Rejected cases are retained unresolved. All source ages and corners in valid interval calls remain covered by the unchanged range-enclosure method, including cusps and parameter-dependent touching events.

## Frozen cover and known-first sequence

For each law, eight speed intervals have endpoints $8+j/4$, $j=0,\ldots,8$. Ten radius shells have endpoints $2^k$, $k=-9,\ldots,1$. This gives 80 initial rectangles per law, 320 in total. All endpoints are exactly dyadic and cover $[8,10]\times[2^{-9},2]$ without interior gaps. The driver first applies the reference's unchanged analytical masks, then its interval integral at phase density $N=256$ when needed. Strictly positive lower residual excludes a complete box. An unresolved box is bisected in the coordinate with larger relative width, with speed breaking ties. Densities 512 and 1024 may be tried at depths at least 12 and 16. Maximum depth is 18.

The watched run is capped at 300 seconds and 40,000 processed boxes, with the stricter science cutoff at 21:47:16 UTC. Guards stop new evaluation with less than two seconds remaining. Ten-second flushed heartbeats show progress. Every depth-limited, guard-limited, table-incompatible or still-pending box is retained as unresolved. Exact rational reconstruction of every leaf from its root/path, complete sibling checks and positive finite lower-bound checks audit the whole final cover. A full exclusion is claimed only if this audit passes and there are zero unresolved boxes.

Before the target, the new driver verifies source hashes and the prior interval known receipt, reruns the independent rational/closed-form controls, and reruns the known coverage controls: acceptance of a complete three-leaf partition and rejection of a missing child, overlapping ancestor or incorrect endpoint. New exact rational controls verify every initial adjacency/endpoint, the finite speed-cutoff constants, the wide-window analytical constants and the narrow-window phase endpoint 180. Their results are recorded before target use. The coordinator must inspect the frozen driver and protocol before authorizing the watched target.

Only new `alternatives-screen-2026-10-05-width-high-*` sources and matching ignored binary-research receipts are written. Existing sources and receipts remain immutable. The instrument refuses receipt overwrite; a later rerun requires a separately frozen output name and execution bound.

## Explicit full-domain assembly, conditional on the new certificate

This is a proposed union argument, not an assertion that the unrun target has passed. Each established region keeps its original source and proof type:

| Region | Domain | Independent basis |
| --- | --- | --- |
| Low speed | $R>0$, $0<\beta\le\pi/2$ | [Complete positive-tangent theorem](alternatives-screen-2026-10-05-binary.md#15-finite-width-circle-exclusion-without-a-small-width-assumption) |
| Tiny radius | $0<R\le1/512$, $\beta\ge\pi/2$ | Complete self-sign/partner upper bound, at most $9/4<\pi^2/4$ |
| Moderate speed and radius | $1/512\le R\le2$, $\pi/2\le\beta\le8$ | Earlier complete 947-leaf radial certificate |
| Large radius | $R\ge2$, $\beta\ge\pi/2$ | [Analytical tails](alternatives-screen-2026-10-05-width-large-bounds.md) plus [complete 256-box compact certificate](alternatives-screen-2026-10-05-width-large-result.md), with final combined assessment owned by the coordinator |
| High-speed tail at small radius | $0<R\le2$, $\beta\ge10$ | The complete triangular-window bound derived above |
| Remaining compact region | $1/512\le R\le2$, $8\le\beta\le10$ | New target, pending |

To verify coverage, first take $0<\beta\le\pi/2$, which lies in the first region. Otherwise $\beta>\pi/2$. Radii at most $1/512$ lie in the second region; radii at least two lie in the fourth. The remaining radii lie strictly between these endpoints. Their speeds at most eight lie in the third region, speeds at least ten in the fifth, and intermediate speeds in the sixth. Every boundary is covered by overlapping closed domains. If the new certificate passes and all component assessments hold, this union excludes all positive radii and speeds for the selected fixed-center antipodal circle ansatz. It does not classify noncircular motions or any other law.

## Falsifiers and claim limits

A complete balanced circle inside any excluded region, a failure of a component analytical inequality, an incorrect channel sign or phase coefficient, a missed source-age/corner contribution, an outward-arithmetic failure, or a gap in the exact leaf/domain union falsifies the corresponding step. A failed or incomplete numerical cover cannot be replaced by a sampled non-finding. No spectrum or causal-stability inference is licensed by absence of circles. The coordinator independently assesses the full assembly after the target.
