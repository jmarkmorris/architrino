# Direct reproduction of the characteristic-tail cross-action coefficient (serial task 5, 2026-10-11)

This report covers the finite-difference table in Section 16.1A of the [characteristic-tail analysis](characteristic-tail.md#161a-independent-verification-audit), which that analysis says "has no current standalone replay artifact". The frozen candidate, its regulator, its endpoints, its ordered-pair factor of one half and its strict causal window are unchanged. Every number here uses $c_f=1$, $R=1$, $\Lambda=1$ and $h=3$. Nothing in this report evaluates a self term, repairs the candidate, or accepts it as an action.

**Outcome.** The historical instrument was not found. A separately written evaluator, which integrates the double-integral cross action itself and takes a second difference of the action, reproduces all fifteen values of the historical table to the six decimals printed, and approaches the exact mixed coefficient $-1/2$: its raw extrapolation in future amplitude at fixed probe is $-0.4999998602$, and with the derived probe term removed it is $-0.4999999930$, about $10^{-8}$ from $-1/2$. That figure is an observed agreement with measured error contributions, not a certified bound (Section 11, which also records the corrections made after the coordinator's review). I derived that coefficient from the action before opening the coordinator's reference, and the two derivations agree. So the table is reproduced and explained; its original provenance is still missing and is not repaired by this work.

## 1. What was searched for, and what was found

The search was bounded to this checkout: the table's digits (`0.495379`, `0.500907`, `499702`, `0.498803`) in every file under `reference/`, `.local-data/`, `scripts/` and `src/`; file names matching the candidate's name, its record label, "cross action" or "tail action" anywhere outside dependency and repository-internal folders; and the commit that introduced the first digit string.

- The digits occur only in copies of the characteristic-tail analysis itself and in one reading checkpoint that quotes it. Three other files contain one of the strings by coincidence, inside unrelated numbers.
- The name search finds only copies of the analysis, the coordinator's reference, and one short exploration report that contains no instrument.
- The digit string entered the repository in the commit that added the analysis; that commit adds no script whose name refers to the tail or to a cross action.

No instrument, driver, output or receipt behind the table was found. This is an absence within that search, not a statement that none ever existed.

## 2. The mixed coefficient, derived from the action

I did this derivation before opening the coordinator's reference.

**Setting.** Transmitter $a$ sits at the origin and receiver $b$ at $R\,\mathbf e_x$. Displace the transmitter now and the receiver later, both along $\mathbf e_y$:

$$
\mathbf X_a(s)=p\,\phi(s)\,\mathbf e_y,\qquad \mathbf X_b(t)=R\,\mathbf e_x+\varepsilon\,\psi(t)\,\mathbf e_y .
$$

Here $\phi$ is a smooth present profile, $\psi$ a smooth future profile whose support lies entirely after that of $\phi$, and $p$, $\varepsilon$ are small amplitudes.

**Only one ordered pair contributes.** In the pair where $b$ receives at $t$ from $a$ at $s$, the separation is $r=\sqrt{R^2+w^2}$ with $w=\varepsilon\psi(t)-p\phi(s)$. In the reverse pair the mixed dependence needs $a$ displaced at a reception time and $b$ displaced at an earlier emission time; but $b$ is displaced only later than $a$, so the causal window $0<t-s$ excludes it. The frozen factor of one half therefore multiplies a single term.

**The kernel's derivative.** With the time difference $u=t-s$ held fixed, the kernel $K=\int_{-h}^{u-r}\delta_\eta(z)\,(u-z)^{-2}dz$ depends on $r$ only through its upper limit, so $\partial K/\partial r=-\delta_\eta(u-r)/r^2$.

**The mixed derivative.** At $p=\varepsilon=0$ the first derivatives of $r$ vanish and $\partial_p\partial_\varepsilon r=-\phi\psi/R$. Hence $\partial_p\partial_\varepsilon K=\delta_\eta(t-s-R)\,\phi(s)\psi(t)/R^3$, and

$$
\partial_p\partial_\varepsilon S=-\frac{\Lambda}{2R^3}\int\phi(s)\Bigl[\int\psi(t)\,\delta_\eta(t-s-R)\,dt\Bigr]ds=-\frac{\Lambda}{2R^3}\int\phi .
$$

The inner integral is exactly one when $\psi=1$ on the whole regulator shell $[s+R-\eta,\,s+R+\eta]$ for every $s$ in the support of $\phi$, and when $0<R-\eta$ and $R+\eta<h$. This is exact at finite regulator width: no limit $\eta\to0$ is taken. Per unit $\int\phi$ the coefficient is $-\Lambda/(2R^3)=-1/2$.

**Finite future amplitude, exactly.** Differentiating once in $p$ at fixed $\varepsilon$ gives $\partial_pS=-(\varepsilon/2)\,(R^2+\varepsilon^2)^{-3/2}\int\phi$, because on the shell $r=\sqrt{R^2+\varepsilon^2}$ is constant and the regulator still integrates to one. So a difference quotient in $\varepsilon$ returns $-\tfrac12(1+\varepsilon^2)^{-3/2}$ for small probe: $-0.498802$, $-0.499700$, $-0.499925$ and $-0.499981$ at $\varepsilon=0.04$, $0.02$, $0.01$ and $0.005$. A central difference in the probe adds an error of second order in $p$.

**Comparison with the coordinator's reference.** After the derivation and the evaluator were written I read the [coordinator's direct mixed reference](serial-characteristic-tail-codex-direct-mixed-reference-2026-10-10.md), SHA-256 `9a6b49078c057135f0d030a807e38a644786c5a026d340a7e228f69a565dd312`, in full. It reaches the same coefficient by the same three steps: the separation's mixed derivative, the upper-limit derivative of the kernel, and the vanishing of the reverse ordered pair. I checked each displayed identity and its support and endpoint-clearance conditions and found no error. It leaves the finite-amplitude constant unquantified; the exact law above supplies it for the future amplitude.

## 3. The instrument

`evidence/serial-characteristic-tail-cross-action-2026-10-10.py`, SHA-256 `85534d620fecd91425b036f5737cc35ab2871467ce943e867765b9968c959a43`.

- **What it integrates.** The interaction part of the frozen action for both ordered pairs of the two worldlines, over the whole interval $I=[-3.2,4.8]$, with the window $0<t-s<h$.
- **Kernel.** $K$ is computed from its defining integral in $z$ by composite Gauss–Legendre quadrature, 16 panels of 16 nodes. Against the reference helper `quad1` its relative error at large $u$ is about $10^{-11}$. That helper sets 30-digit quadrature but converts every abscissa and integrand value to double precision, so it is a double-precision reference, not a 30-digit one (review comment R5-04). With six panels the partial-limit values inside the shell were accurate to about $2\times10^{-9}$ against the same helper. The sixteen-panel kernel is audited against a reference that is 30-digit throughout in Section 11.1.
- **Time integrals.** The two-dimensional trapezoid rule on a uniform grid, with half weights at the ends of $I$ and on the edge $t-s=h$.
- **Profiles.** $\phi$ is a unit-height compact bump on $(-0.1,0.1)$. $\psi$ rises smoothly on $[0.35,0.65]$, equals one on $[0.65,1.35]$ and falls on $[1.35,1.65]$. The plateau covers the regulator shell for every $s$ in the probe's support at all three widths; both supports lie inside $[T_-+h,\,T_+-h]=[-0.2,1.8]$; and $\psi$ starts after $\phi$ ends.
- **Measured quantity.** $M=[S(\varepsilon,p)-S(\varepsilon,-p)-S(-\varepsilon,p)+S(-\varepsilon,-p)]/(4\varepsilon p\int\phi)$, a second difference of the action. The Euler formula is not used anywhere in the evaluation.
- **Two normalisations.** $M$ divides by the exact $\int\phi$. $M_{\rm grid}$ divides by the grid's own trapezoid value of $\int\phi$, which is what a probe applied at grid nodes amounts to.

## 4. Controls, run and recorded before the target

Fourteen controls pass in the retained `known.json`; the target ran only after them.

| Control | Result |
| --- | --- |
| Regulator integrates to one at $\eta=0.2$, $0.1$, $0.05$ | within $10^{-12}$ |
| Regulator is exactly zero at and beyond $\pm\eta$ and at the endpoint $-h$ | exact |
| Kernel at large $u$ equals $(1+3m_2/u^2)/u^2$ with $m_2$ the regulator's second moment | residual $1.0\times10^{-11}$ |
| Kernel vanishes for mismatch at or below $-\eta$; does not depend on $r$ at fixed $u$ once the mismatch exceeds $\eta$ | exact; $10^{-13}$ |
| Finite difference of the kernel in $r$ at fixed $u$ equals $-\delta_\eta/r^2$ | within $10^{-6}$ |
| Separable action, kernel replaced by $r^2$: second difference equals $+\mathrm{trap}(\phi)\,\mathrm{trap}(\psi)$ | $1.0000000016$ against $1$ |
| Same, against the continuum value $+\int\psi=1$ | $0.99984$, the trapezoid error of $\phi$ at spacing $0.01$ |
| Negative: future profile supported on $[1.6,1.8]$, missing the shell | exactly $0$ |
| Negative: $\Lambda=0$ | exactly $0$ |

The separable control has a derivation of its own: $r^2=R^2+(\varepsilon\psi-p\phi)^2$, so the mixed derivative of $-\tfrac12r^2$ is $+\psi(t)\phi(s)$, and the reverse pair is again excluded by the window.

## 5. Target: the historical table, value by value

Base setting: time spacing $0.005$, regulator width $0.1$, probe $5\times10^{-4}$, future amplitude $0.02$. Each row changes one setting.

| Refinement | Value | Historical | $M_{\rm grid}$ (this work) | $M$ (this work) |
| --- | --- | --- | --- | --- |
| Time spacing | $0.04$ | $-0.495379$ | $-0.495378949$ | $-0.491094893$ |
| | $0.02$ | $-0.500907$ | $-0.500907097$ | $-0.502119040$ |
| | $0.01$ | $-0.499621$ | $-0.499620563$ | $-0.499540528$ |
| | $0.005$ | $-0.499702$ | $-0.499701835$ | $-0.499703711$ |
| | $0.0025$ | not in the table | $-0.499700015$ | $-0.499700012$ |
| Regulator width | $0.2$ | $-0.499700$ | $-0.499700015$ | $-0.499701891$ |
| | $0.1$ | $-0.499702$ | $-0.499701835$ | $-0.499703711$ |
| | $0.05$ | $-0.499622$ | $-0.499622334$ | $-0.499624210$ |
| Action probe | $10^{-3}$ | $-0.499701$ | $-0.499701437$ | $-0.499703313$ |
| | $5\times10^{-4}$ | $-0.499702$ | $-0.499701835$ | $-0.499703711$ |
| | $2.5\times10^{-4}$ | $-0.499702$ | $-0.499701934$ | $-0.499703811$ |
| | $1.25\times10^{-4}$ | $-0.499702$ | $-0.499701959$ | $-0.499703836$ |
| Future amplitude | $0.04$ | $-0.498803$ | $-0.498803270$ | $-0.498805143$ |
| | $0.02$ | $-0.499702$ | $-0.499701835$ | $-0.499703711$ |
| | $0.01$ | $-0.499927$ | $-0.499926750$ | $-0.499928627$ |
| | $0.005$ | $-0.499983$ | $-0.499982995$ | $-0.499984872$ |

**Reading (measured).** $M_{\rm grid}$ equals all fifteen historical values at the six decimals printed. This shows that one separately specified discretisation is consistent with all fifteen printed values: the trapezoid rule on a uniform time grid, a probe normalised on the grid, a central second difference, base settings $0.005$, $0.1$, $5\times10^{-4}$ and $0.02$, and a future profile equal to one across the regulator shell. Fifteen numbers rounded to six decimals do not identify code, profiles or settings uniquely, so this does not say what the historical instrument was; its code, profiles, settings and receipts remain unrecovered (review comment R5-01). The agreement at every time spacing, including the coarse ones where the value is off by one percent, is plausible for the following reason, which holds only in the limit of zero probe and only while the plateau of $\psi$ covers the whole shifted shell: there the grid quotient is the exact law times a trapezoid sum of the regulator, and the shape of $\phi$ cancels against its own grid integral. At finite probe the coefficient does depend on the present profile, through the ratio of its cubic moment to its integral (Section 11.2); for a profile with values between zero and one that term is at most $0.75\,p^2$, which is $7.5\times10^{-7}$ at the largest probe in the table, below one unit in the sixth printed decimal (review comment R5-02).

## 6. Discrepancy map: why the table is not exactly $-1/2$

Three separate effects, each identified by its own refinement.

1. **Future amplitude (derived, and measured).** The exact law $-\tfrac12(1+\varepsilon^2)^{-3/2}$ accounts for the whole amplitude row: the measured $M_{\rm grid}$ differs from it by $-1.7\times10^{-6}$ at amplitudes $0.02$, $0.01$ and $0.005$, which is effect 2, and by $-0.9\times10^{-6}$ at $0.04$, where the shell's own shift of $\varepsilon^2/2$ moves the regulator by a sixth of a grid step and changes that sampling error.
2. **Time sampling of the regulator (measured).** At regulator width over time spacing equal to $2.5$, $5$, $10$, $20$ and $40$ the offset from the exact law is $+4.3\times10^{-3}$, $-1.2\times10^{-3}$, $+8.0\times10^{-5}$, $-1.8\times10^{-6}$ and below $10^{-8}$. At the one amplitude tested, $0.02$, two settings with the same ratio agree: width $0.05$ at spacing $0.005$ and width $0.1$ at spacing $0.01$ both have ratio ten and give $-0.499622334$ and $-0.499620563$, equal to five decimals and different in the sixth. The offset is therefore governed mainly by that ratio, not only by it: it also depends on where the shifted shell, at delay $\sqrt{R^2+\varepsilon^2}$, falls relative to the grid, which is what item 1 shows at amplitude $0.04$ (review comment R5-02). So the regulator-width row of the table mostly measures time resolution. This is consistent with the derivation, in which the width drops out exactly in the continuum.
3. **Probe size (measured).** The probe row follows $M(p)=M(0)+0.53\,p^2$; at the base probe the shift is $1.3\times10^{-7}$.

Putting them together at the finest spacing: $M_{\rm grid}=-0.499700015$ at $\varepsilon=0.02$, $p=5\times10^{-4}$; removing the probe shift gives $-0.499700148$; the exact law gives $-0.499700150$. The remaining amplitude dependence is the exact law itself, whose limit is $-1/2$.

**The limit, measured under supervision.** A second driver ran the same evaluator at spacing $0.0025$ for amplitudes $0.01$ and $0.005$: $M=-0.4999248722$ and $-0.4999811132$, against the exact law's $-0.4999250094$ and $-0.4999812506$. Both differ from the law by $+1.37\times10^{-7}$, the probe shift of effect 3. The Richardson combination $(4M(0.005)-M(0.01))/3$, which removes the even amplitude error, is $-0.4999998602$. That is the raw result of the retained driver, at one fixed probe, and it is $1.4\times10^{-7}$ from $-1/2$. The earlier version of this report then subtracted a probe shift to reach $-0.4999999974$ and claimed agreement within $5\times10^{-9}$. That subtraction was not retained by the driver and used a slope measured at another spacing and amplitude; the claim is withdrawn and replaced by Section 11.3 (review comment R5-03).

**Cancellation.** The action is about $-4.234$ and the second difference about $-2.4\times10^{-6}$ at the base setting, so the difference quotient loses between $5.9$ and $6.9$ decimal digits across the table, most at the smallest amplitudes. Double precision leaves about nine significant digits in $M$, which is what the separable control shows ($1.6\times10^{-9}$). The four actions in each quotient are computed on the same grid, and the two pairs related by reflecting both amplitudes agree to the last bit, as that reflection symmetry of the arithmetic requires. The second difference removes the parts of the grid error that do not depend on both amplitudes; the part that does depend on both survives, and it is exactly the grid error visible in the table (review comment R5-02).

**The two normalisations.** $M$ and $M_{\rm grid}$ differ by the trapezoid error of $\int\phi$, which is $3.8\times10^{-6}$ relative at spacing $0.005$ and far larger at coarse spacing. It is a property of my smooth probe profile, not of the action.

## 7. What this does and does not establish

- **Derived:** the mixed coefficient of the regular cross sector of the frozen action is $-\Lambda/(2R^3)$ per unit $\int\phi$, exactly at finite regulator width, and $-\tfrac12\Lambda(R^2+\varepsilon^2)^{-3/2}$ at finite future amplitude.
- **Measured, with a separately written double-precision evaluator of the action, controls first:** the historical table's fifteen values are reproduced to six decimals, and the evaluator's extrapolated value at spacing $0.0025$ is about $10^{-8}$ from the derived value, with the measured contributions listed in Section 11.3. No certified error bound is claimed.
- **Not established:** the provenance of the historical table; any statement about the candidate's self sector, which diverges as the analysis shows; any acceptance of the candidate as an action. The present Euler coefficient depending on a future path is the analysis's negative finding, and this work confirms its size, not its acceptability.
- **Independence.** My derivation and the coordinator's were written separately and agree. My evaluator shares no code with anything; its agreement with the historical table is agreement of a discretisation, which is why it extends to the coarse, unconverged rows.

**Falsifiers.** A correct differentiation of the frozen double integral that gives a different mixed coefficient. A separately written evaluator of the same action that, after passing its own controls, converges elsewhere. A recovered historical instrument would not falsify anything here if its settings differed from those of Section 5: it would only show a second discretisation consistent with the same printed digits.

## 8. Disclosures

1. **Three control runs failed before the passing one, each for a fault of mine or of the host, and all are retained with their sources.** The first stopped because the shared environment's compiled quadrature library fails to load on this host; I replaced its use by high-precision software quadrature. The second failed two controls I had misposed: I compared the separable action with its continuum value at $10^{-6}$, ignoring the trapezoid error of the probe at that spacing, and I tested the far kernel at $10^{-9}$ with a kernel quadrature that was then accurate to $1.4\times10^{-9}$; I corrected the first expectation and raised the kernel quadrature from six panels to sixteen. The third failed a $10^{-9}$ tolerance on the exact separable identity, which is below the rounding floor of the second difference; I set it to $10^{-7}$ and recorded the measured $1.6\times10^{-9}$. No target ran before the controls passed.
2. **Supervision.** The target took 164 seconds in the foreground without the compute supervisor. The limit run that followed was started under the supervisor with my session as owner.
3. **Consistency, not recovery.** The settings in Section 5 are one specification consistent with the printed digits; they are not the historical settings.
4. **One platform limit:** the compiled scientific library named above cannot be imported in the shared environment on this host today. Nothing else was blocked.

## 9. Retention

Sources in the parent `evidence/` folder: `serial-characteristic-tail-cross-action-2026-10-10.py` and `serial-characteristic-tail-cross-action-limit-2026-10-10.py`. Fresh owner `.local-data/master-equation-closure/serial-characteristic-tail-action-2026-10-10/`: the three failed control runs with the source as it stood at each, the passing `known.json`, `target.json`, the limit run's output and supervisor status, and two manifests, `outputs.sha256` and `sources.sha256`. The second covers both instruments, the frozen analysis and the coordinator's reference. No frozen source, reference or earlier receipt was changed.

## 10. Remaining obligations and proposed integration

**Remaining for task 5.** None that I can do: the historical instrument is not in the checkout. If it exists elsewhere, comparing its settings with Section 5 would close the provenance question.

**Integration.** The frozen characteristic-tail analysis stays unchanged; my earlier proposal to edit it is withdrawn. Integration into its living consumers belongs to the coordinator. The points available for it are: this report and its instruments as a separately written reproduction, the statement that the original instrument is still missing, the exact finite-amplitude law, the derived finite-probe term, and the observation that the regulator-width row mostly reflects time resolution.

## 11. Corrections after the coordinator's review (2026-10-11)

The coordinator reviewed this report at SHA-256 `b2d98e297935f9e9b38f2bd5a982300bbe729c92e8cb683c2e3b132fec872532` and raised four comments, R5-01 to R5-04, in its [review](serial-characteristic-tail-action-codex-review-2026-10-11.md). Those exact bytes are retained as `report-as-reviewed-b2d98e29.md` in the supplement owner named in Section 11.5. Sections 3, 5, 6, 7, 8 and 10 above were corrected in place where they were wrong, each with its comment number; the numbers in the tables did not change. The two original instruments, their outputs and both original manifests are unchanged.

A third instrument, `serial-characteristic-tail-cross-action-accuracy-2026-10-11.py`, imports the evaluator unchanged. Its nine known cases passed and were recorded before anything else ran: the regulator bump's integral against its tabulated value and against a second quadrature rule; a rational integral with a closed form; the closed form of the second derivative used in Section 11.2 against numerical differentiation; the probe expansion of Section 11.2 against an exact closed form for a constant profile, together with the negative case that dropping the quadratic term leaves a visible error; the reference kernel's far value against its moment series; its exact zero below the shell; and the evaluator's own fourteen controls. It ran once, under the compute supervisor, in 201 seconds.

### 11.1 Kernel audit at sixteen panels (R5-04)

The reference here is 30-digit throughout: abscissae, regulator and integrand are high-precision numbers, and only the two inputs $r$ and $g$ are double-precision values, passed exactly to both evaluations. The evaluator's kernel was compared with it at three radii ($1$, $\sqrt{1+0.01^2}$, $\sqrt{1+0.04^2}$) and twelve upper limits: nine inside the shell from $g=-0.0999$ to $g=0.0999$, and three at or beyond its edge.

- Inside the shell (partial limits) the largest absolute error is $1.9\times10^{-13}$, on kernel values of order one. The relative error is at most $2.3\times10^{-13}$ at every point except $g=-0.0999$, where the kernel itself is about $10^{-223}$ and the relative error $2\times10^{-4}$ has no effect.
- At and beyond the edge the relative error is $1.1\times10^{-13}$.

This is a sample of thirty-six points, not a uniform bound. It does not by itself bound the kernel's contribution to the second difference, which depends on how the quadrature error varies with both amplitudes; I did not measure that.

### 11.2 The finite-probe term (R5-02, and the coordinator's derivation)

I checked the coordinator's derivation step by step from the action. With the plateau covering the whole shifted shell, $\partial K/\partial r$ at fixed $u$ is $-\delta_\eta(u-r)/r^2$ and $\partial r/\partial p=-\phi(s)\,(\varepsilon-p\phi(s))/r$; the regulator integrates to one over the receiver time, and $r$ does not depend on that time on the plateau, so

$$
\partial_pS=-\frac{\Lambda}{2}\int\phi(s)\,h_R\big(\varepsilon-p\phi(s)\big)\,ds,\qquad h_R(x)=\frac{x}{(R^2+x^2)^{3/2}} .
$$

Differentiating $h_R$ twice gives $h_R''(x)=3x(2x^2-3R^2)(R^2+x^2)^{-7/2}$, which I obtained by hand and the instrument confirms numerically. Because $h_R$ and $h_R''$ are odd, the antisymmetrised quotient is

$$
M(p,\varepsilon)=-\frac{1}{2}(1+\varepsilon^2)^{-3/2}+\frac{m_3}{4m_1}\,(3-2\varepsilon^2)(1+\varepsilon^2)^{-7/2}\,p^2+O(p^4)
$$

for $R=\Lambda=1$, with $m_1=\int\phi$ and $m_3=\int\phi^3$. This is the coordinator's result; I found no error in it. For a constant profile the quotient has an exact closed form, and the expansion matches it to its fourth-order remainder (known case).

For the evaluator's profile, $m_1=0.1206900322$, $m_3=0.0854867461$ and $m_3/m_1=0.7083165402$, so the derived coefficient is $0.53124$ at zero amplitude, $0.53102$ at $0.01$ and $0.53035$ at $0.02$. The value $0.53$ that Section 6 read off the probe row at amplitude $0.02$ agrees with this. The coefficient depends on the present profile through $m_3/m_1$, so the earlier statement that the result does not depend on the shape of $\phi$ holds only at zero probe.

### 11.3 Accuracy at the finest spacings (R5-03)

New rows, all at regulator width $0.1$, with $M$ normalised by the exact $\int\phi$:

| Spacing | Probe | Amplitude | $M$ | Exact law |
| --- | --- | --- | --- | --- |
| $0.0025$ | $5\times10^{-4}$ | $0.01$ | $-0.4999248722$ (retained limit run) | $-0.4999250094$ |
| $0.0025$ | $5\times10^{-4}$ | $0.005$ | $-0.4999811132$ (retained limit run) | $-0.4999812506$ |
| $0.0025$ | $2.5\times10^{-4}$ | $0.01$ | $-0.4999249716$ | $-0.4999250094$ |
| $0.0025$ | $2.5\times10^{-4}$ | $0.005$ | $-0.4999812103$ | $-0.4999812506$ |
| $0.00125$ | $5\times10^{-4}$ | $0.01$ | $-0.4999248766$ | $-0.4999250094$ |

**What can be said without using the value $-1/2$.**

- *Probe.* On the same grid and amplitudes, the two probe sizes give a measured quadratic coefficient of $0.5299$ at amplitude $0.01$ and $0.5181$ at $0.005$, against the derived $0.5310$ and $0.5312$. The first agrees to $0.2$ percent. The second is $2.5$ percent low, which is a difference of $2.5\times10^{-9}$ in $M$; at that amplitude and the smaller probe the second difference is $3\times10^{-7}$ against an action of $4.23$, a loss of $7.1$ digits, so I attribute that difference to rounding. That attribution is an inference, not a measurement. The fourth-order probe remainder is of order $p^4$, below $10^{-12}$.
- *Time sampling.* Halving the spacing from $0.0025$ to $0.00125$ at amplitude $0.01$ moves $M$ by $-4.4\times10^{-9}$. Of that, $2.6\times10^{-9}$ is the trapezoid error of $\int\phi$ on the coarser grid, which the exact normalisation does not share, and $1.8\times10^{-9}$ is the sampling of the regulator. This was measured at one amplitude only.
- *Kernel.* Section 11.1: at most $2\times10^{-13}$ per kernel value at the sampled points; its effect on the second difference was not measured.
- *Rounding.* Estimated from the digits lost, about $4\times10^{-10}$ to $1.6\times10^{-9}$ per row at these settings, and $2.5\times10^{-9}$ observed in the probe comparison above. Not bounded.

**Results.** Removing the derived probe term $0.531\,p^2$ from the two retained limit rows leaves $-0.4999250050$ and $-0.4999812460$, each $4.4\times10^{-9}$ to $4.6\times10^{-9}$ above the exact law. At amplitude $0.01$ that equals the time-sampling error measured above; at $0.005$ no time refinement was run, and the equality is an inference. Their amplitude extrapolation $(4M(0.005)-M(0.01))/3$ is $-0.4999999930$. Using instead the measured probe extrapolation $(4M(p/2)-M(p))/3$ at each amplitude gives $-0.4999999887$. Both subtractions are justified by the structure of the quotient, which is even in $p$ and even in $\varepsilon$, and by the derivation of Section 11.2, not by their agreement with $-1/2$.

So the supported statement is: **at spacing $0.0025$ the extrapolated value is between $0.7\times10^{-8}$ and $1.1\times10^{-8}$ from $-1/2$, and the measured time, probe and rounding contributions, a few times $10^{-9}$ each, account for a difference of that size.** No certified bound is claimed, and the earlier figure of $5\times10^{-9}$ is withdrawn. At spacing $0.00125$ the single row, with the derived probe term removed, is $-0.4999250094$, within $2\times10^{-11}$ of the exact finite-amplitude law; that is one row, its estimated rounding is larger than that difference, and no amplitude extrapolation was run at that spacing, so it is recorded as an observation and not as an accuracy claim.

### 11.4 Disposition of the review comments

| Comment | Disposition |
| --- | --- |
| R5-01 | Corrected in Sections 5, 7 and 8: the settings are one specification consistent with the fifteen printed values; nothing about the historical instrument is recovered. The measured digit agreement is unchanged. |
| R5-02 | Corrected in Sections 5 and 6: profile independence is a zero-probe statement under shell coverage; the sampling offset depends mainly, not only, on width over spacing, and also on where the shifted shell falls on the grid; the second difference cancels only the grid error that does not depend on both amplitudes. The finite-probe term is derived and its coefficient computed in Section 11.2. |
| R5-03 | The $5\times10^{-9}$ claim is withdrawn. Section 11.3 retains the subtraction in an instrument, justifies it by derivation, measures the time and probe contributions on matching grids, and states an observed agreement of about $10^{-8}$ with no certified bound. |
| R5-04 | Corrected in Section 3: the first reference helper is double precision. Section 11.1 audits the sixteen-panel kernel at shell points against a reference that is 30-digit throughout. All failed-control sources and receipts are preserved unchanged. |

### 11.5 Retention and what remains

Supplement instrument in the parent `evidence/` folder: `serial-characteristic-tail-cross-action-accuracy-2026-10-11.py`. Fresh owner `.local-data/master-equation-closure/serial-characteristic-tail-action-supplement-2026-10-11/`: the report as reviewed, the instrument source as run, `accuracy.json` and its progress log, the supervisor's start record and final status (run `05a25df9-f609-45b4-bf8c-947e977763c4`, completed, exit zero, process group closed), and two manifests. The command was the shared environment's interpreter on that instrument with the retained `limit.json` as its one argument, started by the supervisor with a 480-second deadline.

**Not done.** No amplitude extrapolation at spacing $0.00125$; no time refinement at amplitude $0.005$; no measurement of how kernel quadrature error or rounding enters the second difference; no uniform kernel bound. Each would be needed for a certified error bound, which this report does not claim. The historical instrument remains unrecovered.
