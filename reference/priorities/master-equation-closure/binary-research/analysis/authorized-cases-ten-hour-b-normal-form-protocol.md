# Finite rotation normal form: exact calculation protocol

**Status: prospective finite method, before target use.** The source is the same fixed amplitude-gradient member and original complete history. The [coefficient construction](authorized-cases-ten-hour-b-autonomous-coefficient-protocol.md) supplies a finite comparison field; the separately accepted actual-history value estimate remains its only bridge to the delayed solution. This protocol implements the exact algebra specified by the earlier [correlated-map contract](authorized-cases-ten-hour-b-correlated-map-contract.md). It does not assume that contract's proposed quantitative remainder, phase sensitivity or last-section bounds have already been proved.

Let $x=w-1$, $q=x+iu$, $\bar q=x-iu$, and retain the current formal small parameter $\eta$. The central field is $q_\phi=iq$, $\bar q_\phi=-i\bar q$, and $(\log\eta)_\phi=0$. Write a real field as a triple $(f,\bar f,b)$, where the first two components are the equations for $q,\bar q$, and the third is the logarithmic parameter equation. Polynomials have coefficients in $\mathbb Q[i]$ and monomials $\eta^nq^j\bar q^k$.

At degree $n$, the vector homological operator acts diagonally:

$$
\mathcal L(\eta^nq^j\bar q^k)=i(j-k-1)\eta^nq^j\bar q^k,
$$

while its scalar counterpart has divisor $i(j-k)$. The vector resonances are $j=k+1$ and scalar resonances $j=k$. Retain these coefficients. Divide every other vector/scalar coefficient by its respective nonzero divisor to obtain the unique zero-group-mean generator $W_n=(g_n,\bar g_n,h_n)$. This is exactly the rotational averaging and zero-mean inversion convention of the contract; no small orbital amplitude or unknown period is a divisor.

For fields $W=(g,\bar g,h)$ and $V=(f,\bar f,b)$ define

$$
\mathscr D_W=g\partial_q+\bar g\partial_{\bar q}+h\eta\partial_\eta,
\qquad [W,V]=\mathscr D_WV-\mathscr D_VW.
\tag{1}
$$

The third component of (1) is valid for logarithmic parameter fields: the two extra products that arise when using $\eta'=\eta b$ cancel. The transformed field after the time-one coordinate map with old coordinates equal to its flow applied to new coordinates is

$$
V_{\mathrm{new}}=\sum_{j\ge0}\frac1{j!}\operatorname{ad}_{W_n}^j V,
\qquad \operatorname{ad}_WV=[W,V].
\tag{2}
$$

Since $[W_n,V_0]=-\mathcal LW_n$, this convention removes the nonresonant coefficient. Terms beyond parameter degree sixteen are discarded. Every bracket raises degree by at least $n$, so only finitely many terms of (2) contribute. Perform degrees two through sixteen in increasing order and retain every generator, resonant coefficient and original-field input digest.

The resonant output is uniquely expressible as

$$
q_\phi=\{\Lambda(I,\delta)+i\Omega(I,\delta)\}q,
\qquad (\log\delta)_\phi=B(I,\delta),\qquad I=q\bar q,
$$

through the retained degree. Here $\delta$ is the final coordinate, not silently identified with $\epsilon/H$. Reality means the second component is the conjugate of the first and $B$ is real on real states. Nonresonant remnants, a failed reality identity, or a degree exceeding the admitted grading invalidate the output.

For later section and preparation matching, retain the forward finite coordinate map as well. For scalar observables the pullback is $\exp(\mathscr D_{W_n})$. Apply it to the accumulated original-coordinate expressions at every step. For the original-parameter multiplier $S=\eta_{\mathrm{old}}/\eta$, its derivative is $(\mathscr D_{W_n}+h_n)S$. Thus the three initial observables $(q,\bar q,1)$ provide the full finite forward map. Exact flows and their inverses, rather than an unrecorded coordinate reset, define the mathematical transformation; truncated observables record their coefficients.

Before any higher-order target, known cases must check: conjugation and Gaussian rational arithmetic; the exact central rotation; the constant-translation pullback sign; the full degree-two and degree-three generators and means in the [known map controls](authorized-cases-ten-hour-b-map-known-controls.md); and their initial center/parameter shifts. A fresh independently authored reference must assess the method and higher output. Matching the constructor to its own frozen output is insufficient.

Target admission additionally requires independently checked input coefficients through sixteen, a bounded owned-compute lease with advancing stage heartbeats and deadlines, immutable receipts and at most two GiB memory and 32 MiB output. No scalar terminal phase is evaluated here. Quantitative analytic-flow remainder, actual-history transport, slow resonances, inverse section and signed last-minimum obligations remain separate. A successful exact normal form is an input to those proofs, not an actual terminal-speed result.
