# Directed validation specification for displacement barriers

The [measured diagnostic](alternatives-screen-2026-10-05-width-entry-feasibility.md) nominates symmetric five-percent speed barriers for three cases. This specification freezes the intended directed validation object before target application. It does not label a sampled pass as a certificate.

## Exact mathematical object encoded by finite data

Read the finest retained trajectory only as candidate construction data. Its binary64 numbers are interpreted as exact dyadic constants. Set nominal displacement nodes to the stored binary64 values of $1/2-x_i$, nominal kinetic nodes to the stored binary64 values of $v_i^2/2$, and nodal derivatives to the recorded inward acceleration. Between nodes define the exact rational cubic Hermite polynomial in displacement using these dyadic endpoint values and derivatives. The polynomial is a candidate barrier template, not an assumed exact trajectory. Its Bernstein controls must prove positive derivative and positive kinetic values.

At the initial node use exact dyadic $d_*,u_*$ and the preparation-shaped template $u_*(d/d_*)^{2/3}$ for $0\le d\le d_*$. Its travel time is $3d_*^{2/3}d^{1/3}/u_*$. The source variable $r=(d/d_*)^{1/3}$ removes the endpoint singularity: $d=d_*r^3$, source time measure $3d_*dr/u_*$, and travel time $3d_*r/u_*$. Define $l=(19/20)u_{\rm template}$ and $m=(21/20)u_{\rm template}$, with these factors exact rationals. No interpolation-order claim is needed if the barrier inequalities are proved directly.

The [exact original coefficient enclosure](alternatives-screen-2026-10-05-width-entry-preparation-result.md) supplies the actual preparation. Check its whole power-law segment against the template by cubing positive coefficient bounds. Cover the tiny interval between actual release displacement and the nominal seam explicitly; do not identify the approximate nominal coefficient with the true one. Validate future inequalities from the smallest possible actual release displacement through $d=1/2$.

## Outward arithmetic and complete integration

Basic interval addition, subtraction, multiplication and division use IEEE binary64 arithmetic enlarged to neighboring representable numbers. Positive square and cube roots are enclosed and verified by outward-rounded squaring/cubing; failure to verify is an unresolved arithmetic case. The instrument must pass exact dyadic/rational containment controls and boundary cases before targets. It must not use an unchecked transcendental approximation as a directed endpoint.

Enclose the nominal travel integral by monotone Darboux bounds for $1/u_{\rm template}$ on a complete partition, initially 64 subintervals per Hermite segment. Positive derivative of the exact cubic supplies monotonicity. Accumulate lower and upper travel bounds outward. Every source interval is retained or excluded by an interval window bound; the preparation is integrated in its cube-root variable and the stationary old tail by its exact CDF formula.

For each receiver-displacement interval, enclose both complete functional bounds from the assessed [barrier theorem](alternatives-screen-2026-10-05-width-entry-position-barriers.md), and compare them with interval bounds on the exact candidate derivatives. Source interval integration uses range enclosures times interval length, so it covers nonsmooth triangular edges without an unproved quadrature-error estimate. The common source domain through the receiver's left endpoint contributes to both bounds; the small variable-endpoint strip through its right endpoint contributes only to the upper bound. Its ranges and ages are intersected with the nonnegative physical domain before extension. This overcounts the upper integral and never adds a potentially absent positive term to the lower integral.

Initial receiver intervals follow every Hermite seam. A failed strict comparison triggers declared source refinement through the existing 64-way partition and receiver bisection to a bounded depth. Every final receiver interval must have both strict directed margins. Any unresolved interval, unsupported preparation overlap, nonpositive template segment or arithmetic failure prevents a certificate. A retained partial run may identify where the bound fails, but cannot certify the omitted interval.

## Known-first and operational plan

Independent exact controls include binary-neighbor arithmetic, square/cube-root containment, a constant or polynomial Hermite profile, monotone travel-integral bounds, triangular min/max cases, and the already assessed complete affine-plus-held-tail row at $c=2,d=3/10$. Analytical references remain frozen. The previous comparison and direct-audit sources remain unchanged.

The first targets are the three diagnostic-positive laws $(1/16,1/32),(1/16,1/64),(1/32,1/64)$, using separate receipts and complete provenance. The fourth constant-width profile failed its measured inequalities and is not silently treated as admitted. Every long run uses the owned-compute supervisor, fixed-cadence progress and a deadline before the campaign science cutoff. Actual wall/CPU/RSS costs and unresolved interval counts determine whether refinement remains feasible.

> Claim grade: proposed instrument specification implementing the independently assessed barrier implication. Only successful complete directed inequalities plus exact preparation coverage would establish a contact-speed enclosure; neither candidate data nor the protocol alone does so.
