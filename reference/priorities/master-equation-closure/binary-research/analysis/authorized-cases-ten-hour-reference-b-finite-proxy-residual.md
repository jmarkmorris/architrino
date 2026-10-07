# Blind finite-proxy route to a uniform layer residual

**Derived conditional reference, frozen before the coordinator residual subject.** Assume the finite degree-fourteen coefficient data of the original compatible layer satisfy the following independently checked premises: each coefficient piece and its ordinary derivatives through fourteen are bounded by $2^{256}$ on the real interval $[-3,203]$; the required seam traces in the admitted derivative inventory agree; the low coefficients have their exact known values; and the scaled row cancels formally through degree fourteen. None of these target-data premises is accepted merely by writing this note. The selected parameter remains $\epsilon=2^{-200000}$.

Let $Y=\sum_{j=0}^{14}\epsilon^jY_j$, $q_0=\sigma-2$, and write the range correction as $z=L-2$. For each source channel $d=0,1,2$, introduce the finite proxy

$$
P_d(\sigma,z,\epsilon)=\sum_{j=0}^{12}\epsilon^j
\sum_{m=0}^{\lfloor(12-j)/2\rfloor}
\frac{(-z)^m}{m!}Y_j^{(d+m)}(q_0).
\tag{1}
$$

For a fixed real $\sigma$, this is a polynomial in complex $z,\epsilon$. It does not analytically continue a piecewise source through a seam. Its coefficients are real derivatives at a fixed point, used only to a supported order. At a knot the required derivatives have matching traces by hypothesis.

## Analytic proxy and its tail

Define the proxy range by

$$
2+z=\sqrt{[Y(\sigma;\epsilon)+P_0(\sigma,z,\epsilon)]\cdot
[Y(\sigma;\epsilon)+P_0(\sigma,z,\epsilon)]},
\tag{2}
$$

using the branch equal to two at zero. On the complex parameter disk $|\epsilon|\le\rho=2^{-1024}$ and $|z|\le1/8$, the bounded finite sums give an image strictly inside $|z|<1/8$ and a $z$-derivative smaller than $1/4$. Terms at parameter degree zero are constant, and every nonconstant term is multiplied by at least one $\epsilon$; $2^{256}\rho$ is smaller than every margin used here, even after summing the fewer than one hundred terms. Uniform contraction proves a holomorphic proxy root.

The first range coefficient vanishes because $Y_1=\sigma e_2$ is tangential. Cauchy's coefficient bound on (2) consequently gives, at the selected real parameter,

$$
|z_{\mathrm{proxy}}|\le2^{2050}\epsilon^2.
\tag{3}
$$

Use $P_d$, this range, its normalized chord and its transmitter factor in the exact rational scaled row. The range and transmitter remain near two and one on the complex disk. The resulting proxy residual is analytic there and bounded conservatively by $2^{270}$. Its first fifteen coefficients vanish by the formal cancellation premise. Therefore its Cauchy tail is bounded by

$$
2^{270}\frac{(\epsilon/\rho)^{15}}{1-\epsilon/\rho}
<2^{15631}\epsilon^{15}.
\tag{4}
$$

No complex source-time differentiation at a seam occurs in this step. The parameter analyticity belongs to the finite proxy at each fixed real reception, with constants uniform in reception.

## Comparing the proxy with the actual implicit source of the finite path

The actual finite path has $Y=e_1+\epsilon\sigma e_2+O(2^{260}\epsilon^2)$ and scaled velocity bounded by $2^{270}\epsilon$ on the relevant real interval. Its exact ordinary range therefore stays near two. The known tangential first coefficient and elementary squared-norm expansion sharpen its shift to $|z_{\mathrm{exact}}|\le2^{270}\epsilon^2$, which is weaker than necessary but smaller than (3)'s allowance.

Taylor-expand each coefficient of each real source channel across its actual shift, with $m=\lfloor(12-j)/2\rfloor$. The required derivative is continuous and Lipschitz at every crossed seam, and the next almost-everywhere derivative is bounded by the finite piece certificate. Hence its uniform remainder is bounded by the ordinary Lipschitz Taylor estimate, even when the shift crosses a knot. Its parameter degree is at least $j+2(m+1)\ge13$. The omitted source coefficients $j=13,14$ are also of degree at least thirteen.

For a deliberately loose common allowance, use (3) for every shift. There are at most seven Taylor factors in any one term and fewer than one hundred terms in the entire channel. Their coefficients and remainders are bounded by $2^{256}$ times at most $(2^{2050})^7$, with the finite summations and factorial bounds absorbed below $2^{15000}$. Thus each source-channel discrepancy is bounded by $2^{15000}\epsilon^{13}$. This bound uses only the admitted coefficient regularities. In particular the fourth derivative of the sixth source acceleration is used almost everywhere to bound a remainder, not as a pointwise Taylor coefficient at its jump.

Evaluating the true real root equation at the proxy root and using the strict range-gap derivative bounds the true/proxy range difference by twice the position-channel discrepancy. Direction and transmitter errors have the same order with a fixed bounded multiplier. The rational scaled row has a uniformly bounded Lipschitz constant on this tiny near-static box, multiplied by its outer $\epsilon^2$. A generous factor $2^{40}$ absorbs all these transports and source channels. Therefore replacing the proxy by the finite path's own exact implicit root changes its row by less than $2^{15050}\epsilon^{15}$.

Together with (4), this proves a bound below $2^{16000}\epsilon^{15}$, and hence below the proposed $2^{45000}\epsilon^{15}$, under the stated finite premises. The same data give the strict position/velocity/acceleration margins and a Lipschitz acceleration bound much smaller than one, provided the coefficient acceleration traces match at every knot. This last trace condition must be checked; separate piece norms alone do not exclude acceleration jumps.

The existing conditional neutral value-contraction theorem can then turn this residual into the physical state enclosure. This argument never upgrades the original actual history beyond $C^{5,1}$, never replaces its degree-five negative polynomial and never supplies a terminal phase. It only verifies the residual of a finite comparison using ordinary real seam-aware Taylor bounds and an analytic algebraic proxy.

Falsifiers are an unsupported derivative at a knot, a coefficient piece used outside its certified interval, a missing parameter-order cancellation, a failure of the analytic proxy contraction, or an omitted root-transport factor. No target coefficient file or coordinator residual subject was read for this reference. No target computation was run.
