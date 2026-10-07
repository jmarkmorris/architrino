# A finite Laurent-logarithmic evaluation of the retained slow map

**Status: prospective analytical and implementation protocol, before target use.** This retains the original fixed gradient preparation. The input is the independently checked finite normal form and initial state enclosure, when available. The [actual phase-stability candidate](authorized-cases-ten-hour-b-phase-stability-candidate.md), analytic flow remainder and final signed section each require separate admission. No large scalar phase is evaluated here.

## Slow variable and exact finite coefficient recursion

Write $I_0=a_0^2$, $b=(a/a_0)^{2/3}$ and $\delta=\delta_0 b^{-1}k(b)$, with $k(1)=1$. The final fixed amplitude $a=1$ corresponds to $B_*=I_0^{-1/3}$. Define the analytic quotients

$$
F(I,\delta)=1+\frac32\frac{B(I,\delta)}{\Lambda(I,\delta)},
\qquad H(I,\delta)=\frac{\Omega(I,\delta)}{\Lambda(I,\delta)/\delta^3}.
\tag{1}
$$

Here $B(I,\delta)$ in the numerator is the normal form's logarithmic-parameter polynomial; $B_*$ is the endpoint scalar. The known cubic controls give $F(I,0)=0$ and $H(I,0)=1/2$. Expand $F=\sum_{n=1}^{13}f_n(I)\delta^n+O(\delta^{14})$ and $H=\sum_{n=0}^{13}h_n(I)\delta^n+O(\delta^{14})$. Division is ordinary finite rational polynomial algebra because the denominator has constant two. The coefficients through thirteen depend only on the admitted normal form through sixteen.

The exact retained slow equation is

$$
\frac{dk}{db}=\frac{k}{b}F(I_0b^3,\delta_0b^{-1}k).
\tag{2}
$$

Expand $k=1+\sum_{j=1}^{13}\delta_0^j k_j(b,I_0)$. At degree $j$, the right side of (2) uses only $k_1,\ldots,k_{j-1}$. Integrate its Laurent-logarithmic polynomial from one to $b$, choosing $k_j(1,I_0)=0$ exactly. A term $b^m(\log b)^r$ has a finite primitive by integration by parts for $m\ne-1$ and primitive $(\log b)^{r+1}/(r+1)$ for $m=-1$. Retain every resonant logarithm. No finite-frequency or slow resonance is dropped.

The phase increment is

$$
\psi(1)-\psi_0=\delta_0^{-3}\int_1^{B_*}
\frac32 b^2 k(b)^{-3}H(I_0b^3,\delta_0b^{-1}k(b))\,db.
\tag{3}
$$

Construct the integrand and its primitive through degree thirteen in $\delta_0$ using the same exact ring. Every coefficient is a finite sum of rational multiples of $I_0^j b^m(\log b)^r$. At the endpoint put $x_0=I_0^{1/3}$, so $b=x_0^{-1}$ and $\log b=-\log x_0$. Endpoint values are therefore finite Laurent-logarithmic expressions in one positive algebraic input $x_0$. The lower endpoint is evaluated exactly, including all constants. This eliminates the need to integrate the enormous number of physical turns.

The independent leading control is $k=1$, $H=1/2$, giving

$$
\psi(1)-\psi_0=\frac{I_0^{-1}-1}{4\delta_0^3}.
\tag{4}
$$

With $a_0\sim(8/3)\epsilon^3$ and $\delta_0\sim\epsilon$, its leading term is $9/(256\epsilon^9)$, but only the full corrected finite expression may be used for a terminal comparison. Known controls must also include the exact primitive of $b^{-1}$ and a nonzero logarithmic-power term, and a prescribed slow coefficient with a separately solvable equation.

## Uniform analytical truncation target

For fixed real $0<I_0<1$ and $1\le b\le I_0^{-1/3}$, the argument $I_0b^3$ stays in $[0,1]$. Under the proposed finite coefficient norms, the exact equation (2) is analytic in complex $\delta_0$ on $|\delta_0|\le\rho=2^{-10000}$. A bootstrap $|k-1|<1/2$ closes because the nonconstant right side is bounded by a constant times $\rho b^{-2}$, whose integral is uniformly finite regardless of the upper endpoint. The exact constants and denominator margins are independent review obligations; no large upper endpoint is inserted into an unweighted Gronwall factor.

On that complex disk, the normalized phase function

$$
\mathcal T(\delta_0,I_0)=I_0\delta_0^3\{\psi(1)-\psi_0\}
$$

is bounded by sixteen: the factor $I_0\int_1^{I_0^{-1/3}}b^2db$ is less than one third, while $k^{-3}$ and $H$ have fixed analytic bounds. Cauchy truncation at degree thirteen then gives the candidate explicit error

$$
|\psi(1)-\psi^{[13]}(1)|
\le\frac{32\rho^{-14}\delta_0^{14}}{I_0\delta_0^3}
<2^{140022}\epsilon^5
\tag{5}
$$

for the declared $I_0\ge\epsilon^6$, $\epsilon/2\le\delta_0\le2\epsilon$. The same analytic bootstrap bounds the degree-thirteen endpoint multiplier error by $4\rho^{-14}\delta_0^{14}$. This is an analytical truncation estimate for the retained finite normal form, distinct from the actual-history phase error. Its proof and exact constants must be independently checked before using it.

## Coordinate and section obligations

The original finite layer defines explicit position and velocity polynomials at scaled time 200. Their exact algebraic conversion to $r,h,w,u,\eta$ followed by the exact inverse normal-form flows determines the initial comparison input. A specialized Taylor polynomial through degree sixteen can approximate this analytic coordinate evaluation, with a Cauchy remainder on the same small disk. Its error must be shown smaller than the accepted $2^{50000}\epsilon^{14}$ physical input tolerance. The leading cubic seed and original phase are controls, not free choices.

The endpoint $a=1$ is only an intermediate evaluation section. The inverse map's actual grazing curve and the adjacent physical $u=0$ sections must still be matched. The known low generators give $a_g(\delta)=1+(5/4)\delta^2+O(\delta^4)$ and a phase near $\pi$. Consequently a candidate leading correction from $a=1$ to the grazing curve is $5/(8\delta_1)$, where $\delta_1$ is the retained slow parameter at $a=1$. If the quartic radial coefficient $\Lambda_4(1)$ does not vanish, the constant correction $-5\Lambda_4(1)/16$ must also be retained. These statements are not a substitute for an independently proved section remainder, monotonicity and signed-minimum test.

An eventual evaluator must use directed intervals at enough precision to cover the large phase's absolute error and retain the exact input/output digests. It may run only after the formal recursion, uniform truncation estimate, initial-coordinate enclosure and final decision contract have passed independent review and its own analytical controls have passed first. A zero-containing critical interval remains unresolved. No candidate is skipped and no physical path is continued through an unresolved infinite-radius boundary.

Falsifiers are an omitted logarithmic resonance, a nontriangular coefficient, wrong endpoint power, loss of the uniform complex slow bound, an unproved initial-coordinate precision, or a final section interpreted without its inverse map. No physical history, law, speed domain, actual differentiability assumption or production solver is changed.
