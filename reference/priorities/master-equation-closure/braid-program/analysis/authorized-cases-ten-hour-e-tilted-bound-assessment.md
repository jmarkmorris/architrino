# Independent assessment of the initial tilted comparison

**Derived and independently checked planning improvement; no actual departure asserted.** The coordinator reconstructed the explicit comparison in the [subject derivation](authorized-cases-ten-hour-e-tilted-initial-distance.md) and independently verified its numerical consequence with [exact rational arithmetic](../evidence/authorized-cases-ten-hour-e-tilted-bound-independent.mjs). The physical preparation and comparison orbit are unchanged. This improves a sufficient geometric bound; it introduces neither a fitted physical history nor a new evolution target.

Let the sole release displacement be $(a,b,c)$, the printed radius be $r$, and the exact reference radius be $r_*$. The orthonormal pair

$$q_1=\left(\sqrt{1-c^2/(4r_*^2)},0,c/(2r_*)\right),\qquad q_2=(0,1,0)$$

extends by $q_3=q_1\times q_2$ to a proper rotation. Its determinant is one, since $q_1\times q_2=q_3$ and all three vectors have unit length. Translate the four rotated labeled square points by $(a/2,b/2,c/4)$. Direct subtraction gives the first and third member errors $(a/2+k,b/2,c/4)$ and $(-a/2-k,-b/2,c/4)$, with $k=r-\sqrt{r_*^2-c^2/4}$; the other two errors are $(-a/2,-b/2\pm(r-r_*),-c/4)$. The triangle inequality therefore proves the subject bound for every retained exact radius. This reconstruction checks label ordering, proper rotation, the normal component and the radial correction explicitly.

For the exact decimal release data, the independent instrument proves the following rational inequalities by integer cross-multiplication:

$$\sqrt{(a^2+b^2)/4+c^2/16}<0.000176960670384,$$

$$\sqrt{(2.55921061613)^2-c^2/4}>2.5592106107,$$

$$\frac{c^2}{4\left(2.55921061613+2.5592106107\right)}<0.000000005406333.$$

Adding the full radius uncertainty $0.000000000015$ gives the strict bound $d_0<0.000176966092$ for the initial minimum maximum-member distance. These are checked squared and rational inequalities, not floating-point square-root estimates. Decimal arithmetic, signed ordering, division and a known square-root bracket passed before the target calculation.

The previously [independent trial-observable receipt](authorized-cases-ten-hour-reference-e-square-output-assessment.md) has digest `a7020e43df42983155a2bb9ab45a11bf4d2e43320076d205bc3cbcbb33254909`. Its lower RMS bounds are conservatively reduced here to $0.0003691085315$ at time ten, $0.0005162529406$ at twelve and $0.0008962742090$ at fifteen. Each reduction exceeds $10^{-50}$, covering the earlier ninety-digit point-subtraction rounding as well as the deliberately discarded decimal digits. No trajectory is reevaluated or modified.

Because RMS distance is one-Lipschitz under maximum member-position error and is no greater than the minimum maximum-member distance, independently certified position errors below the following bounds would prove more than twice the initial upper bound at the indicated observation time:

| Reception time | Sufficient uniform position-error bound |
| --- | ---: |
| $10$ | $0.0000151763$ |
| $12$ | $0.00016232075$ |
| $15$ | $0.00054234202$ |

The running consumer retains its original stricter time-fifteen budget; this assessment does not modify a frozen instrument. It permits an earlier time-ten observation if the complete actual-solution and independent propagation requirements have already been met there. The result concerns instantaneous spatial geometry only. It establishes neither history-norm instability, later fate, wake-speed arrival nor binding.

The local known and target receipts are `e-tilted-independent-known.json` and `e-tilted-independent-target.json` under the ignored Braid investigation owner. The target receipt includes both the preceding control pass and the exact rational inequalities. Falsifiers are a wrong release position, improper or relabeled comparison, excluded radius uncertainty, failed rational inequality, or missing actual-position coverage at the chosen time.
