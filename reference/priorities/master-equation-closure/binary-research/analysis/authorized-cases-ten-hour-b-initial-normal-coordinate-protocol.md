# Original layer to finite normal coordinates

**Status: prospective finite coordinate calculation, before target use.** Preserve the exact original $C^{5,1}$ gradient preparation and its independently accepted [degree-fourteen layer](authorized-cases-ten-hour-reference-b-layer-residual-adjudication.md). The output is an algebraic input to the retained comparison, not a replacement history. The normal-form map and its norm/remainder premises require their own independent admission.

Let $Y^{[14]}(200;\epsilon)$ be the frozen position polynomial and $V^{[13]}=\epsilon^{-1}\partial_\sigma Y^{[14]}(200;\epsilon)$ its physical velocity polynomial. Both are exact rational polynomials. Compute

$$
r=(Y\cdot Y)^{1/2},\quad h=Y_1V_2-Y_2V_1,\quad
p=Y\cdot V/r,
$$

$$
w=h^2/r,\quad u=hp,\quad \eta=\epsilon/h,
\quad q_{\mathrm{old}}=w-1+iu.
\tag{1}
$$

The dot product in the analytic parameter extension is bilinear; conjugating the complex parameter would destroy analyticity. Choose the square-root branch with $r(0)=1$. At zero parameter $Y=e_1,V=e_2,h=1$, so every division has a nonzero fixed constant.

Write the independently retained forward normal map as $(Q(q,\bar q,\delta),\overline Q(q,\bar q,\delta),\delta S(q,\bar q,\delta))$. It is the degree-sixteen Taylor polynomial of the exact sequential-flow map and begins with $(q,\bar q,\delta)$ plus parameter order two corrections. Solve the formal equations

$$
q=q_{\mathrm{old}}-\{Q(q,\bar q,\delta)-q\},\qquad
\delta=\eta/S(q,\bar q,\delta)
\tag{2}
$$

and their conjugate equation through degree sixteen in the original $\epsilon$. Because each correction begins at degree two, successive substitution stabilizes two more orders at a time. Retain nine iterations and check the complete three forward residuals through sixteen exactly. This is finite rational Gaussian algebra, not a numerical root solve or an actual history evolution.

The output consists of rational coefficient lists for $q_0^{[16]}(\epsilon)$ and $\delta_0^{[16]}(\epsilon)$, with reality of the scalar parameter and conjugacy of the state checked. The leading cubic seed must be $q_0=-(8i/3)\epsilon^3+O(\epsilon^4)$ and $\delta_0=\epsilon+O(\epsilon^3)$. The original finite phase is retained in the full coefficient list; it is not set to the leading argument. Subsequent interval evaluation uses $a_0=|q_0^{[16]}|$, $I_0=a_0^2$, and its actual lifted initial phase.

## Analytic error obligation

On $|\epsilon|\le\rho=2^{-10000}$, the independently audited layer coefficient bounds keep $Y$ close to $e_1$ and $V$ close to $e_2$. Their bilinear square root, $h$ and all quotients in (1) stay in fixed ordinary analytic disks. The admitted normal-coordinate inverse flows are near identity on the same buffered state domain. These facts should bound the exact coordinate values by four uniformly on that parameter disk. Cauchy's estimate then gives a candidate degree-seventeen coordinate remainder below $2^{170006}\epsilon^{17}$.

For the fixed $\epsilon=2^{-200000}$ this is smaller than the original physical layer error $2^{50000}\epsilon^{14}$. The inverse-coordinate Jacobian and algebraic-state map must be explicitly bounded to combine both errors. A conservative target is total normal-state error $2^{50008}\epsilon^{14}$ and logarithmic-parameter error of the same order. Together with the nonzero cubic seed, this would meet the initial relative/logarithmic hypotheses in the [phase-stability candidate](authorized-cases-ten-hour-b-phase-stability-candidate.md), with room for conversion from absolute amplitude to its logarithm. These statements are quantitative proof obligations until independently assessed.

Finite coefficient norms can bound the omitted corrections to the cubic seed and parameter directly, proving $\epsilon^3<a_0<4\epsilon^3$ and $\epsilon/2<\delta_0<2\epsilon$. A floating-point magnitude alone does not establish these input inequalities. Exact coefficient cancellation through the first two state orders is required.

## Known cases and execution limits

Before target use, a frozen instrument must pass exact series arithmetic, square-root/inverse identities, polynomial evaluation and differentiation, and a separately solvable triangular coordinate map. For example $Q=q+c\delta^2$, $\eta=\delta(1+b\delta^2)$ gives $\delta=\eta-b\eta^3+3b^2\eta^5+\cdots$ and, for $q_{\mathrm{old}}=0$, $q=-c\eta^2+2cb\eta^4-7cb^2\eta^6+\cdots$. The full low normal-form generator control additionally checks the cubic prepared seed. A new target then binds both independently accepted input digests and requires a separately authored residual/coefficient audit.

Execution stays under owned compute with finite internal and supervisor deadlines, advancing stages, two GiB memory and 32 MiB output bounds. No scalar terminal phase is evaluated by this instrument. Its falsifiers are a conjugated parameter in (1), a wrong velocity degree, nonzero forward residual, lost cubic seed, invalid inverse-map disk or an understated conversion of the original physical layer error.
