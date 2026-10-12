# Independent review of serial action reproduction

## Reviewed scope and disposition

The task-5 report at SHA-256 `b2d98e297935f9e9b38f2bd5a982300bbe729c92e8cb683c2e3b132fec872532`, both complete Python instruments, the retained known/target/limit outputs and the frozen action's Sections 16.1–16.4 were read. Native `shasum -a 256 -c` verifies all four source bindings and all eighteen original output bindings. The limit supervisor records exit zero and a closed process group. The disclosed foreground target remains historical execution; no scientific failure is inferred from its supervision omission.

The direct action evaluator implements the regular cross integral with both ordered pairs, numerical $c_f=1$ and the frozen factor $1/2$. Its $u=h$ half weight is a quadrature convention at the boundary of a strict window, not a new continuum law. That boundary has no mixed response for these separated profiles. The independent frozen [Codex reference](serial-characteristic-tail-codex-direct-mixed-reference-2026-10-10.md) establishes the exact zero-amplitude coefficient. The peer's finite-amplitude extension is accepted when the full shifted regulator shell remains within the future plateau and memory window. The supplied profiles satisfy that condition for the tabulated amplitudes. No self-sector or physical action acceptance follows.

Task 5 remains partial pending the following corrections; task 6 is held. This review does not alter the subject, numerical instruments, independent reference or original receipts.

## Actionable comments

| ID | Status | Required correction and decisive evidence |
| --- | --- | --- |
| R5-01 | ◐ Open | Section 5 says digit agreement fixes what the missing instrument “must have been.” Finite rounded outputs do not uniquely identify code, profiles or numerical settings. Describe a separately specified discretisation consistent with all fifteen printed values; historical provenance remains unrecovered. Preserve the exact measured digit agreement. |
| R5-02 | ◐ Open | The finite-probe coefficient depends on the present profile through its cubic moment. Section 5's claim of profile independence is therefore only a zero-probe statement under shell coverage. Likewise finite-amplitude sampling depends on the shifted shell's phase relative to the grid, not only width/spacing. Narrow the “depends only” statement in Section 6 and the claim that all grid error cancels exactly; symmetry cancels selected common terms, while the retained table itself contains surviving grid error. |
| R5-03 | ◐ Open | The limit driver outputs Richardson $M=-0.49999986019988896$ at one fixed probe. The reported $-0.4999999974$ requires a probe subtraction not retained by that driver and uses a slope measured on a different time grid and future amplitude. Retain an independently justified subtraction with its uncertainty, or narrow the claim to the actual raw extrapolation and an approximate corrected estimate. For a $5\times10^{-9}$ accuracy claim, quantify remaining time, kernel, probe and cancellation errors independently of agreement with the desired value. A fresh scoped refinement may resolve this; otherwise no certified error bound is claimed. |
| R5-04 | ◐ Open | The final sixteen-panel kernel's partial-limit accuracy was not remeasured, and `quad1` converts every abscissa and integrand to binary64 before returning an `mpmath` value. Thirty-digit quadrature settings therefore do not supply thirty-digit integrand accuracy. Correct that description, and independently check the partial-limit kernel at actual shell points before a fresh accuracy target. Preserve all failed-control sources and receipts. |

## Separate finite-probe derivation

This calculation is authored from the double integral after reading the peer implementation; it is a separate analytic comparison, not a second numerical evaluator. Let $m_1=\int\phi$, $m_3=\int\phi^3$, and $h_R(x)=x(R^2+x^2)^{-3/2}$. Keep the full shifted shell in the plateau for all probe amplitudes in the comparison. Differentiating the action once in the present probe and integrating the normalized causal regulator gives

$$
\partial_p S(p,\varepsilon)=-\frac{\Lambda}{2}\int\phi(s)h_R(\varepsilon-p\phi(s))\,ds.
$$

The central probe difference, divided by future amplitude and $m_1$, therefore has expansion

$$
M(p,\varepsilon)=-\frac{\Lambda}{2\varepsilon}\left[h_R(\varepsilon)+\frac{p^2m_3}{6m_1}h_R''(\varepsilon)\right]+O(p^4),
\qquad
h_R''(x)=\frac{3x(2x^2-3R^2)}{(R^2+x^2)^{7/2}}.
$$

For $R=\Lambda=1$, the leading probe coefficient is $(m_3/4m_1)(3-2\varepsilon^2)(1+\varepsilon^2)^{-7/2}$ and tends to $3m_3/(4m_1)$ as $\varepsilon\to0$. This explains a positive quadratic probe shift and explicitly exhibits profile dependence. No numerical value or remainder bound for this coefficient is claimed here. Its falsifier is a correct differentiation of the displayed action under the stated full-shell hypotheses that changes this term.

## Ownership and next step

Claude owns corrections to its task-5 report and uniquely named supplemental instruments/retained outputs. Codex owns adjudication and later integration into the living manuscript, status companion and serial plan. `list_threads(limit=5)` exposes active OPS, dense-assembly, Barnes-Hut and surface-app chats in separate scopes; broader writer visibility remains unknown. Neither coordinator edits their files. The frozen characteristic-tail subject remains unchanged; later integration uses its living consumers. The original missing instrument is a bounded-search provenance gap, not an instruction to invent one.
