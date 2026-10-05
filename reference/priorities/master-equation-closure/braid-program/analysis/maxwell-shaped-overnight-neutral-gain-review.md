# Delayed-acceleration gain on the exact four-member circles

This proof and [directed arithmetic source](../evidence/maxwell-shaped-overnight-neutral-gain-certificate.py) are fixed before their target evaluation. The complete cases are the separately selected E and E+M four-member alternating circles with $K=c_f=1$, exact enclosed tangential zero and corresponding radial balance relation in the [independent ring certificate](maxwell-shaped-overnight-independent-ring.md#certified-complete-circular-solutions). They have twelve ordinary partner hits and no positive-delay self hits. Their balanced histories, Cartesian growing modes and disturbed numerical histories retain their separate evidence grades. The present calculation bounds only the highest delayed-acceleration coefficient.

## Exact coefficient norm

For one hit choose an orthonormal frame with first direction $\mathbf n$, second direction in the ring plane and third normal to that plane. Write source velocity $(v_n,v_t,0)$, receiver velocity $(u_n,u_t,0)$, $D=1-v_n$ and range $R$. Equal-radius, equal-rate circular geometry gives $u_n=v_n$, $u_t=-v_t$ and $v_t^2=\beta^2-v_n^2$. The source-acceleration derivative, apart from a polarity sign, is

$$
B_E=\frac1{RD^3}
\begin{pmatrix}0&0&0\\-v_t&-D&0\\0&0&-D\end{pmatrix}.
$$

Its planar row norm exceeds or equals its normal norm. The full receiver map gives

$$
B_{E+M}=\frac1{RD^3}
\begin{pmatrix}v_t^2&v_tD&0\\-Dv_t&-D^2&0\\0&0&-D^2\end{pmatrix}.
$$

The planar block is the rank-one product $(v_t,-D)^{\mathsf T}(v_t,D)$, while the normal scalar is $-D^2$. Therefore the exact three-dimensional Euclidean norms are

$$
\|B_E\|=\frac{\sqrt{2D-1+\beta^2}}{RD^3},\qquad
\|B_{E+M}\|=\frac{2D-1+\beta^2}{RD^3}.
$$

Polarity and the orthogonal delayed-to-current rotating-frame maps do not change these norms. Summing the three hit norms bounds the complete highest-derivative operator in the maximum of the four memberwise Euclidean acceleration norms. This calculation admits normal perturbations; it does not restrict the derivative to planar motion. The circle identities are essential. An arbitrary tube box requires direct coefficient enclosure or a separately justified perturbation bound rather than substitution into this circle-specific formula.

## Regularity consequence and limits

If the directed target sum is below one, the fixed circular linearization's acceleration-memory operator has a convergent causal geometric bound in that norm. Iterating its delayed highest-derivative equation gives a remainder bounded by $q^n$ times the completed acceleration-history bound, where $q<1$ is the row-sum bound. Positive minimum delay also makes each finite-time method-of-steps construction well defined. By continuity of the finite ordinary-root coefficient boxes, a sufficiently small regular neighborhood retains a gain below one, but no numerical neighborhood radius is certified here.

This controls the highest delayed derivative; the lower position and velocity terms can still produce growing modes. In particular it cannot establish linear or nonlinear stability. A nonlinear instability theorem would additionally need a verified function space and compatible-history flow for the state-dependent neutral delay, or a direct controlled departing solution. No fixed-delay theorem is automatically transferred to this law.

The instrument must pass the exact stationary and transverse rational matrix norms before reading target boxes. A norm identity failure, omitted partner, nonpositive denominator or directed row sum containing one falsifies the corresponding gain claim. A gain certificate supplies neither a whole-trajectory error enclosure nor fate beyond a speed or root boundary.

## Directed target result awaiting independent assessment

The rational matrix controls passed before target use. The directed source then enclosed the complete three-hit row sum by $0.86468335454<q_E<0.86468335455$ and $0.78930699577<q_{E+M}<0.78930699578$ on the entire certified balance parameter boxes. Widened safe bounds are $q_E<0.87$ and $q_{E+M}<0.80$. These are computer-assisted derived subject bounds, pending the separate potential-reference assessment. They are not measured singular values of sampled matrices.

Reproducer: run `${AAA_VENV:-../.venv}/bin/python reference/priorities/master-equation-closure/braid-program/evidence/maxwell-shaped-overnight-neutral-gain-certificate.py --output .local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-coordinator/neutral-gain-known-controls.json` first, then the same source with `--target` and a distinct target output path. Local provenance: `neutral-gain-target-certificate.json` under that coordinator owner. Exact endpoint export uses the preserved independently authored outward exporter. Failure of any directed sum bound would reject this subject certificate without changing the independently established growing-mode result.

## Independent assessment

The [independent potential-based norm reconstruction](maxwell-shaped-overnight-independent-ring.md#independent-delayed-acceleration-gain-reconstruction) was fixed before inspection of this subject. It derives the same source-acceleration matrix, establishes the circle projection identities, and accepts the three-dimensional norm and row-sum certificates after the known controls and directed replay. The subject bounds above are therefore accepted at computer-assisted derived grade on the exact certified circles. The reference supplies mathematical independence; replay of this arithmetic remains a verification receipt. No stronger stability, trajectory or nonlinear conclusion is promoted.
