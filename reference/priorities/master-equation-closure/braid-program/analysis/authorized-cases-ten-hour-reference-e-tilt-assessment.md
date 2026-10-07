# Assessment of the tilted release comparison

**Derived, with independent exact arithmetic.** The [coordinator assessment](authorized-cases-ten-hour-e-tilted-bound-assessment.md) gives a valid proper rotation and translation of the same labeled radius-$r_*$ square. No physical history changes. The improvement concerns only an upper bound for initial instantaneous maximum-member distance.

Write the sole release displacement as $(a,b,c)=10^{-4}r(1,7/10,13/10)$. Taking the first rotated axis $(\sqrt{1-c^2/(4r_*^2)},0,c/(2r_*))$, the second axis $(0,1,0)$, and their cross product as the third axis produces an orthonormal positively oriented frame. With translation $(a/2,b/2,c/4)$, direct subtraction gives normal errors $c/4,c/4,-c/4,-c/4$ for the opposite pair and the remaining pair. The first pair's in-plane errors are opposite vectors $(a/2+k,b/2)$, where $k=r-\sqrt{r_*^2-c^2/4}$; the other pair has $( -a/2,-b/2\pm(r-r_*))$. Therefore every error norm is bounded by

$$
\sqrt{(a^2+b^2)/4+c^2/16}+|r-r_*|+\frac{c^2}{4\left(r_*+\sqrt{r_*^2-c^2/4}\right)}.
$$

The first squared term equals $153r^2\cdot10^{-8}/320$. The [independent rational checker](../evidence/authorized-cases-ten-hour-reference-e-tilt-check.py), SHA-256 `8dd52250b0e895be8e94dcdc53becea5e66a288e1a21345b4abd57819be36c5c`, passed decimal and squared-root bracket controls before checking all three numerical inequalities. It verifies the strict initial bound $d_0<0.000176966092$ over the entire admitted radius interval. Its local receipt is braid `reference/e-tilt-check-v1.json`.

Using the already independently assessed trial RMS lower bounds, reduced conservatively to the displayed decimals in the coordinator note, exact rational subtraction verifies these sufficient actual-position error budgets: `0.0000151763` at ten, `0.00016232075` at twelve, and `0.00054234202` at fifteen. Each implies actual instantaneous distance greater than twice the initial upper bound. The RMS-to-maximum comparison and one-Lipschitz error estimate remain those in the [independent square assessment](authorized-cases-ten-hour-reference-e-square-distance-adjudication.md).

The running frozen recurrence and its stricter stopping threshold are unchanged. An earlier observation is usable only after a complete independently certified actual-error prefix covers its exact time, using the uniform error of the containing cell. This geometric refinement alone proves no physical departure or later behavior. Falsifiers are incorrect label geometry, a nonproper frame, an excluded radius value, a failed exact inequality, or missing actual-error coverage at the claimed observation.
