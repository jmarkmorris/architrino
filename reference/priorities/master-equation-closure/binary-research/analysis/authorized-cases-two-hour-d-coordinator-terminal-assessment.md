# Independent assessment of positive terminal relative speed

**Derived assessment, 2026-10-06.** The coordinator read and independently reconstructed the [frozen terminal-speed reference](authorized-cases-two-hour-d-reference-positive-terminal.md), SHA-256 `5c2fa1d9ca6b7285870d03c9228af08e4aa5e764a821d5f69eeaedc05af5aad5`. This is a disclosed-result assessment, not a blind derivation. It accepts the new theorem using the already independently checked [outward continuation](authorized-cases-outgoing-d-reference-assessment.md) and actual delayed-row estimates at their existing scopes.

**Accept:** every actual canonical pair admitted by that outward nonnegative-account theorem has a nonzero limiting relative velocity. Its separation therefore grows linearly with a strictly positive limiting rate. This supersedes the older outward theorem's unresolved zero-terminal possibility, without changing its entry hypotheses or proving entry for the remaining negative-account nominal branch. No uniform numerical lower rate is established.

## Independent reconstruction

Keep the reference notation, $c_f=1$, fixed source coupling $K$, and the complete supplied histories. The existing theorem supplies ordinary global continuation, $J\ge0$, increasing separation, generated member speeds below $\beta=1/20$, $\chi=K/d\le10^{-4}$, integrable individual accelerations and individual velocity limits. Its virial estimate is $I'>9K/(5d)$ for $I=du$.

The chain rule on an outward interval gives $d(I^2)/dd=2dI'>18K/5$. At $d\ge100d_e$, dropping the nonnegative entry value of $I^2$ therefore gives $u^2\ge(891/250)\chi>(81/25)\chi$. A tangent entry causes no division problem: $I'>0$ makes the subsequent interval strictly outward, and continuity supplies its starting limit.

Assume temporarily that $U_\infty=0$. Integrability makes the remaining-impulse representation exact. Each member's canonical acceleration is bounded by $c_\beta K/d^2$, with $c_\beta=441/380$. Changing variables using $u>(9/5)\sqrt{K/d}$ yields

$$
|U(t)|\le 2c_\beta\int_t^\infty\frac K{d(s)^2}\,ds
\le\frac{20c_\beta}{9}\sqrt\chi
=\frac{49}{19}\sqrt\chi
<\frac{13}{5}\sqrt\chi.
$$

Thus the transverse fraction $\Lambda=|v|^2/\chi$ is below $7$ on the whole sufficiently late interval. This estimate does not assume an angular floor, bounded angular magnitude, a limiting direction or mirror symmetry.

To check that the next sign estimate is valid away from $J=0$, substitute directly into the [exact identity (18)](authorized-cases-ten-hour-d-primary-anisotropic-account.md). Its terms, divided by $k\chi$, have the following lower bounds:

| Exact term | Lower bound |
| --- | --- |
| Leading scalar term | $2(1-2\beta^2)-2\beta$ |
| $U\cdot Q$ | $-3\beta\Lambda/(2g_0^5)$ |
| $-\chi Q_r$ | $-\beta^2/g_0^3$ |
| Midpoint affine remainder | $-2\beta^3(g_0^{-4}+g_0^{-2})$ |
| Actual relative remainder | $-20\beta-10\chi$ |
| Actual midpoint remainder | $-10\beta\chi/g_0$ |

Here $g_0=\sqrt{1-\beta^2}$. The second row uses $\Lambda$; every other velocity factor uses only the generated speed bound. In particular, the relative remainder follows from $|U-\chi N|\le2\beta+\chi$ and $|e_{\rm rel}|\le10k\chi$. The midpoint remainder retains $|e_{\rm ctr}|\le5k\chi$ and $|b|\le\beta$. No boundary substitution has entered.

Since $g_0>.99$ and $g_0^{-j}<1.1$ for $j\le5$, the sum is greater than

$$
1.89-.5775-.00275-.00055-1-.001-.000055
=.308145>\frac14.
$$

Consequently $J'>(1/4)k\chi>0$ on that whole late interval. Yet $U\to0$ and $\chi\to0$ would give $J\to0$ directly from its definition. Once its derivative is positive, a nonnegative $J$ acquires a strictly positive value and cannot converge to zero. This contradiction excludes $U_\infty=0$. Finally, integrating the convergent relative velocity gives $Z(t)/t\to U_\infty$ and $d(t)/t\to|U_\infty|>0$.

## Scope, controls and falsifiers

The exact remaining-impulse identity and elementary integral are the analytical controls; all displayed constants were reconstructed above. The original strict complete-past speed bound still governs the root census. The smaller $.05$ bound applies only to generated windows, whose nested source coverage is inherited from the outward theorem. Source acceleration is retained through the actual-error estimates; its derivative is not required. The original locally Lipschitz velocity seams remain admissible. No physical energy law is assumed.

This assessment also upgrades any separately admitted safe inward-turn branch once it reaches the outward theorem. It neither determines the actual sign of $J$ or the radial test on a negative-account state nor turns a prescribed comparison into an actual history. A missing non-boundary term, a failure of the inherited source-window estimate, or an actual admitted outward solution with $U_\infty=0$ would falsify the conclusion. No numerical scientific target or long-running computation was used.
