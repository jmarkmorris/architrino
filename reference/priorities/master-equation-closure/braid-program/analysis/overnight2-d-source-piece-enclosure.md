# Polynomial source composition across ordinary reference knots

## Reason for the construction

A reception cell can sample several source polynomial pieces. Assigning all source times to the midpoint piece is invalid, while subdividing around every source knot can create many very small cells. The reference position and velocity are continuous at ordinary knots, and their exact polynomial differences supply a direct alternative. This is an enclosure of the already declared comparison path, not a new physical continuation or a replacement source history.

Let $S$ enclose all candidate source times in a reception interval. Assume $S$ lies strictly on positive time and within the completed reference. Choose one reference piece $k$ as a polynomial extension $Q_k(s)$ across $S$. For every actual piece $\ell$ intersecting $S$, enclose the coordinate differences

$$
E^x_c\ge\sup_{s\in S\cap I_\ell}|Q_{\ell,c}(s)-Q_{k,c}(s)|,
\qquad
E^v_c\ge\sup_{s\in S\cap I_\ell}|Q'_{\ell,c}(s)-Q'_{k,c}(s)|.
$$

Take the maximum over all intersected pieces. These are polynomial differences evaluated on the restricted source interval, so the outward polynomial arithmetic retains their cancellation before taking absolute bounds. For every candidate source time, the actual comparison values then satisfy

$$
Q_c(s)\in Q_{k,c}(s)+[-E^x_c,E^x_c],
\qquad
Q'_c(s)\in Q'_{k,c}(s)+[-E^v_c,E^v_c].
$$

Compose the extension with the candidate source-time polynomial, and add these errors to its uniform value remainder. All subsequent residual numerator, denominator and gap operations propagate those value errors. Velocity is enclosed by its separate exact piece polynomials; no position remainder is differentiated. The candidate-to-root derivative estimate continues to use the complete actual reference acceleration bound, not the extension's derivative outside its cell.

## Coverage and controls

The implementation lists every actual positive-time piece intersecting the candidate range, including endpoint traces as needed. It rejects a range reaching unfinished history or crossing source time zero. The initial velocity jump retains separate treatment. Ordinary position and velocity continuity are useful for tightness, but correctness of the displayed uniform difference enclosure follows from complete piece coverage even when a difference is large. A missing piece, insufficient polynomial-difference enclosure, or differentiation of an uncontrolled remainder would falsify the construction.

The known control uses $Q(s)=s^2$ up to time one and $Q(s)=1+2(s-1)+2(s-1)^2$ afterwards. Position and velocity join, while acceleration jumps from two to four. Extending the right polynomial to $S=[3/4,5/4]$ differs from the left position by $(s-1)^2$ and from its velocity by $2(s-1)$. Therefore coordinate error allowances $1/16$ and $1/2$ suffice and are attained. The actual instrument `overnight2-d-source-piece-enclosure.py` encloses those exact values and lists both pieces before target use.

This component awaits independent review and target application. It consumes the same exact increment-defined nodes and factored reference as the [residual checker](overnight2-d-reference-residual-independent-review.md). It does not by itself certify a residual, an error envelope or actual trajectory membership. The [parent account](overnight2-d-followup-and-research-2026-10-07.md) records its integration status and evidence.
