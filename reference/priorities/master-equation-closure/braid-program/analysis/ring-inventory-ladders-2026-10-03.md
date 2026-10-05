# Alternating ring ladders for other even inventories

## Finite results and claim boundary

The new [inventory table](ring-inventory-ladders-table-2026-10-03.md) contains locally certified exact circular balance brackets in the first twenty even cells T02 through T40 for each of 2, 4, 8, 10, 12 and 24 alternating members. Every row encloses a tangential zero with opposite outward-rounded endpoint signs, a strictly positive tangential derivative, a strictly inward radial coefficient and a complete positive-delay root census. The conditional exact periodic history follows by rotational covariance at the enclosed zero. Uniqueness is certified inside each narrow speed bracket; the instrument does not count all tangential zeros throughout an entire cell. Nothing here asserts balance in odd cells or global nonexistence from a failed numerical proposal.

Claim grade: computer-assisted derived local existence and simplicity, measured rounded table entries, and derived circular covariance. Independent adjudication of the new inventory instrument is pending. A missing causal branch, an invalid level inequality, a zero-containing signed transmitter divisor, a failed endpoint sign, or an incorrect radial coefficient falsifies the corresponding row. The first-reference [common-sector stability calculation](ring-other-inventories-stability-2026-10-03.md) already supplies two simple growing witnesses at T02 for each inventory; no additional stability spectrum is computed by this table instrument.

Every number uses $K=c_f=1$. The unchanged Master Equation retains every ordinary positive-delay self root, with no cap, receiver multiplier, root exclusion, response variation or event rule. Primitive mass is absent; $Rv$ is angular momentum per member without a mass factor. The table shows that monotone decrease of $Rv$ with rung is not universal across inventories: the initial values for ten and twelve members rise before their eventual approach. This is a measured finite-table comparison, not a new conservation law.

## Complete root census and admission

For $M$ even alternating members, write

$$
X_j(T)=Q(\Omega T+2\pi j/M)R e_1,\qquad q_j=(-1)^j,\qquad \beta=\Omega R.
$$

The circular reduction has $0<x<\pi$, lattice spacing $h=\pi/M$ and

$$
F_\beta(x)=\beta\sin x-x=mh,\qquad D=1-\beta\cos x.
$$

The source index is $m\bmod M$, the delay is $2R\sin x$, and

$$
C_r=\sum\frac{(-1)^m}{4\sin x|D|},\qquad C_t=\sum\frac{(-1)^m\cos x}{4\sin^2x|D|}.
$$

In cell T$t$, $(t-1)h<F_{\max}<th$. Strict concavity gives one descending root for every $m=-M+1,\ldots,0$ and two roots for every $m=1,\ldots,t-1$. Consequently each receiver has $M+2t-2$ hits and the full ring has $M(M+2t-2)$ directed hits. Self hits are precisely the retained entries with $m$ divisible by $M$. The endpoint roots at $0$ and $\pi$ are excluded by the ordinary positive-delay chart.

The new instrument is [ring_inventory_ladders_20261003.py](../../../../../scripts/braid-program/ring_inventory_ladders_20261003.py). It imports the frozen, separately controlled new first-reference instrument, whose hash is enforced, and rebuilds the general-cell level list, coefficient sums and coefficient derivatives. The original ladder evaluator, oracle and receipts remain unchanged. A root proposal is enclosed at each endpoint of a speed bracket of half-width $10^{-60}$, with causal residual brackets of half-width $10^{-75}$. Monotone continuation $dx/d\beta=\sin x/D$ supplies the intervening root hull. Point arithmetic uses 100 decimal digits and outward-rounded interval arithmetic 85. Printed digits are not mistaken for an uncertainty certificate; the receipts retain actual interval endpoints, including exact binary bounds.

Before any target, `known.json` records the exact static-source tensor $\operatorname{diag}(-2,1)/8$, and the analytic lattice control $M=4,m=1,\beta=3\pi/4,x=\pi/2,D=1$, whose single-row tangential derivative is $1/4$. Then `controls.json` records general-cell summation parity with the frozen binary first-reference instrument; this parity is reproduction, while the analytical controls provide the independent known cases. Every target requires both control receipts to match the current instrument identity before admission. The table formatter first passed the known interval midpoint cases $[1,3]\mapsto2$ and $[2,4]\mapsto3$ before reading target receipts.

The first 120 targets completed in 255.563 wall seconds under owned run `86cd0049-2530-4617-873f-4ba7426d6b8c`, exit zero and `processGroupClosed: true`. Runtime receipts occupy 24 MiB by `du -sh` at completion. The optional extension to one hundred even cells per inventory runs under a separate owned supervisor with a 1800-second deadline and advancing 15-second heartbeats; its results are admitted only after successful local certificates, not from the launch itself.

## A fixed-inventory large-rung theorem

The argument below holds for each fixed even $M$. Constants may depend on $M$; no interchange with an $M\to\infty$ limit is made. It extends the six-member paired-tail mechanism with an explicit stronger tangential remainder, needed to justify the next radius coefficient. Claim grade: derived analytical argument, pending separately constructed adjudication. Its falsifier is a failure of the uniform inverse-branch derivative bounds or alternating variation estimate below, or a high-cell zero violating its asymptotic neighborhood. The finite tables are supporting measurements and do not prove this theorem.

Put

$$
a=\frac{M^2}{24},\qquad b=\frac{M\log2}{2\pi}.
$$

Let $q=t-1$ be odd and $\beta_q$ solve $F_{\max}(\beta_q)=qh$. At every sufficiently high odd birth there is a unique tangential zero in a fixed scaled neighborhood of

$$
\beta-\beta_q=\frac{1}{8a^2\beta_q^3}(1+o(1)).
$$

Its radial coefficient and radius obey

$$
C_r=-a\beta-b+o(1),\qquad R=\frac a\beta+\frac b{\beta^2}+o(\beta^{-2}).
$$

This is local uniqueness near the newborn pair, not a proof that no other zero lies elsewhere in a high even cell. It supplies an asymptotic exact circular locus without replacing the separate finite admissions.

## Paired old rows and the stronger tail estimate

Remove the newborn level $q$. Pair the rising root at level $l=1,\ldots,q-1$ with the descending root at level $l-M$. Because $M$ is even, both carry the same polarity $\sigma=(-1)^l$. Write these roots as $v$ and $\pi-w$, where

$$
\beta\sin v-v=lh,\qquad \beta\sin w+w=lh.
$$

Set $\epsilon=\beta^{-1}$ and $s=lh/\beta$. For a parameter $\theta\in[-\epsilon,\epsilon]$, let $V(\theta,s)$ be the ascending small inverse of $\sin V-\theta V=s$. Thus $v=V(\epsilon,s)$ and $w=V(-\epsilon,s)$. Define

$$
g(\theta,s)=\frac1{\sin V(\theta,s)},\qquad L(\theta,s)=\log\tan\frac{V(\theta,s)}2.
$$

The exact unsigned paired coefficients are

$$
p_t=-\frac1{4\beta}\partial_s\{g(\epsilon,s)-g(-\epsilon,s)\},\qquad p_r=\frac1{4\beta}\partial_s\{L(\epsilon,s)+L(-\epsilon,s)\}.
$$

The actual coefficients are $\sigma p_t$ and $\sigma p_r$. At zero parameter, $V=\arcsin s$ and $g_\theta=-\arcsin(s)/s^2$. Taylor's formula gives

$$
p_t=-\frac1{2(lh)^2}+\frac1{2\beta^2}f(s)+E_t(s),\qquad f(s)=\frac1{s^2\sqrt{1-s^2}}-\frac{2\arcsin s}{s^3}+\frac1{s^2},
$$

and

$$
p_r=\frac1{2lh}+\frac1{2\beta s}\left(\frac1{\sqrt{1-s^2}}-1\right)+E_r(s).
$$

The paired range has $s\leq1-(\pi/2+h)\epsilon+O_M(\epsilon^2)$. For every intermediate parameter $\theta\in[-\epsilon,\epsilon]$, its inverse remains at least a fixed $M$-dependent fraction of $1-s$ below its own fold. Therefore $\cos V-\theta\geq c_M\sqrt{1-s}$ when $s\geq1/2$. Implicit differentiation gives, with $\delta=1-s$,

$$
|E_t|\leq C_M\beta^{-4}\delta^{-5/2},\quad |E_t'|\leq C_M\beta^{-4}\delta^{-7/2},\quad |E_r|\leq C_M\beta^{-3}\delta^{-5/2},\quad |E_r'|\leq C_M\beta^{-3}\delta^{-7/2}.
$$

Here primes are $s$ derivatives. To obtain these bounds, differentiate $(\cos V-\theta)V_s=1$ and $(\cos V-\theta)V_\theta=V$ repeatedly: each additional derivative costs at most one power of $\delta^{-1}$, beginning with $\delta^{-1/2}$. In $g_{\theta\theta\theta s}$ and $g_{\theta\theta\theta ss}$ the highest inverse derivative is multiplied by $\theta$; $|\theta|\leq C_M\delta$ reduces its power and yields respectively $\delta^{-5/2}$ and $\delta^{-7/2}$. Symmetric Taylor's formula leaves order $\epsilon^3$ in the difference of $g$ and order $\epsilon^2$ in the sum of $L$. On $s\leq1/2$, subtract the exact small-$s$ pole $g(\theta,s)=(1-\theta)/s+O(s)$ and the logarithmic pole of $L$; the remaining derivatives are bounded uniformly. Thus the apparent lower-end singularities cancel and contribute only $O_M(\beta^{-2})$ to tangential variation and $O_M(\beta^{-1})$ to radial variation.

The function $f$ has nonnegative Taylor coefficients: if $\arcsin s=\sum_{n\geq0}c_n s^{2n+1}$, then $f=\sum_{n\geq1}(2n-1)c_n s^{2n-2}$. It is nonnegative and increasing. Its endpoint size is $O_M(\sqrt\beta)$. The radial residual $s^{-1}[(1-s^2)^{-1/2}-1]$ also has nonnegative coefficients and endpoint size $O_M(\sqrt\beta)$. Integrating the displayed derivative bounds down to $\delta\geq c_M/\beta$ proves that the paired tangential residual has supremum plus total variation $O_M(\beta^{-3/2})$, and the radial residual has supremum plus total variation $O_M(\beta^{-1/2})$. Summation by parts against $(-1)^l$, whose partial sums have absolute value at most one, controls their entire growing alternating sums by these same bounds. This step is uniform in the number of old rows; fixed-level expansions alone would not justify it.

There remain $M$ unpaired descending cap levels $m=q-M,\ldots,q-1$. Their divisor is $D\asymp_M\sqrt\beta$, sine is $1+O_M(\beta^{-1})$, and the exact identity $\cos x=(1-D)/\beta$ gives

$$
\frac{(-1)^m\cos x}{4\sin^2xD}=-\frac{(-1)^m}{4\beta}+O_M(\beta^{-3/2}).
$$

Their leading terms cancel because $M$ is even. Their radial sum is $O_M(\beta^{-1/2})$. The missing infinite alternating tails are $O_M(\beta^{-2})$ and $O_M(\beta^{-1})$. Consequently the complete old ledgers satisfy the stronger estimates

$$
C_{t,\mathrm{old}}=\frac1{2h^2}\sum_{l\geq1}\frac{(-1)^{l+1}}{l^2}+O_M(\beta^{-3/2})=a+O_M(\beta^{-3/2}),
$$

$$
C_{r,\mathrm{old}}=\frac1{2h}\sum_{l\geq1}\frac{(-1)^l}{l}+O_M(\beta^{-1/2})=-b+O_M(\beta^{-1/2}).
$$

In particular $\beta(C_{t,\mathrm{old}}-a)\to0$. The weaker statement $C_{t,\mathrm{old}}\to a$ would not be sufficient for the next radius coefficient.

## Newborn balance and consequences

At a scaled gap $F_{\max}-qh=d\beta^{-3}$, the newborn pair has offsets $x_\pm-x_*=\pm\sqrt{2d}\,\beta^{-2}(1+o(1))$, so

$$
C_{t,\mathrm{new}}=-\frac1{2\sqrt{2d}}+o(1).
$$

The limiting sum $a-1/(2\sqrt{2d})$ has its unique simple zero at $d=1/(8a^2)$. The convergence holds with one derivative in $d$ on compact positive neighborhoods: the newborn Taylor expansion is smooth there, while each old tangential speed derivative is bounded by a fixed $M$-dependent constant and there are $O_M(\beta)$ old rows, giving an old scaled derivative $O_M(\beta^{-2})$. This row bound follows by separating $|D|\geq\beta/4$ (use $\sin x\geq c_M/\beta$) from its complementary cap (where $\sin x$ has a constant floor and $|D|\geq c_M\sqrt\beta$). The implicit function theorem then gives the stated local existence and uniqueness.

The symmetric fold expansion also gives $C_{r,\mathrm{new}}=(\beta+O_M(\beta^{-1}))C_{t,\mathrm{new}}$. First-order odd root offsets cancel between the two branches; their residual asymmetry is order $\beta^{-5}$. Using $C_{t,\mathrm{new}}=-C_{t,\mathrm{old}}$ and the stronger old tangential estimate yields $C_r=-a\beta-b+o(1)$ and the radius law above.

Restoring symbols with $R_*=K/c_f^2$ and $\Omega_*=c_f^3/K$, define $\omega=\Omega/\Omega_*$. Then

$$
\frac R{R_*}=\frac a\beta+\frac b{\beta^2}+o(\beta^{-2}),\quad \omega=\frac{\beta^2}a-\frac{b\beta}{a^2}+o(\beta),\quad Rv=\frac K{c_f}\left(a+\frac b\beta+o(\beta^{-1})\right).
$$

Along the allowed discrete frequencies this implies

$$
R(\Omega)=\sqrt{\frac{aK}{c_f\Omega}}+\frac{b c_f}{2a\Omega}+o(\Omega^{-1}),\qquad v(\Omega)=\sqrt{\frac{aK\Omega}{c_f}}+\frac{b c_f}{2a}+o(1).
$$

The coefficient $b/(2a)=6\log2/(\pi M)$ decreases with fixed inventory. Adjacent local even rungs satisfy $\Delta\beta\to2\pi/M$ and $\Delta\omega/\beta\to96\pi/M^3$. Their $Rv$ tends to $M^2K/(24c_f)$ per member. These limits compare high rungs at fixed inventory; they do not describe the first rung as $M$ increases.

## Fast common-sector growth at fixed inventory

At these high-cell balances,

$$
D_\pm\sim\pm\frac{1}{2a\beta}=\pm\frac{12}{M^2\beta},\quad \ell_\pm\sim\frac{2a}{\beta}=\frac{M^2}{12\beta},\quad w_\pm\sim-\frac{\beta^3}{2a}=-\frac{12\beta^3}{M^2}.
$$

The exact tensor identity in the [six-member common-sector analysis](ring-family-symmetric-stability-2026-10-03.md#fast-growth-at-large-rung-number) applies unchanged. For each newborn row, its leading radial term is $-w\beta^2\sin x/(2RD^2)$, and substitution gives $T/\beta^8\to e_1e_1^{\mathsf T}$, independently of fixed $M$. The other three terms have orders $O_M(\beta^4)$, $O_M(\beta^6)$ and $O_M(\beta^5)$. Old level spacing $h>0$ gives uniform $\sin x\geq c_M/\beta$, $|D|\geq c_M\sqrt\beta$ and delay at least $c_M\beta^{-2}$. The old tensors sum to $O_M(\beta^7)$; $\sum\|H\|=O_M(\beta^4)$ and $\sum\|F\|=O_M(\beta^8)$.

Therefore at $z=\eta\beta^4$, delayed coefficients and their scaled derivatives vanish exponentially on positive compact $\eta$ intervals, while $\Omega=O_M(\beta^2)$. The common characteristic matrix obeys

$$
\beta^{-8}A(\eta\beta^4)\longrightarrow\eta^2I-2e_1e_1^{\mathsf T}
$$

with one derivative. Its determinant has the simple positive limiting zero $\sqrt2$. The same norm confinement as the six-member argument excludes positive real zeros above a fixed multiple of $\beta^4$, so the largest positive real common-sector root satisfies $\lambda_{\max}/\beta^4\to\sqrt2$. This is a formal linear statement at the asymptotic exact balances, pending independent adjudication. It supplies neither a finite-rung threshold, a complete complex-root count, nor a nonlinear history departure theorem for the other inventories.

## Remaining work

1. Independently adjudicate the fixed-inventory tail lemma, especially its mixed inverse-derivative bounds and the cancellation of the unpaired cap; recommendation: use an analytic branch construction independent of the numerical table instrument.
2. Adjudicate the finite inventory receipts with independently reconstructed Cartesian acceleration and causal chains; recommendation: retain local-zero scope and do not infer whole-cell uniqueness.
3. Complete any admitted hundred-rung extension and freeze its table; recommendation: preserve each actual uncertainty interval and complete self-root count.
4. Count additional differential and axial modes only after each exact balance is certified; recommendation: prioritize first-rung representatives and keep formal linear growth distinct from nonlinear history instability.

## Completed hundred-rung extension

The [complete six-inventory table](ring-inventory-ladders-all600-table-2026-10-03.md) now records all 600 admitted local balances, T02 through T200 for each inventory. This completes remaining action 3 above. Every target passed its complete causal census, signed-divisor margins, maximum-level inequalities, tangential endpoint opposition, positive tangential derivative and inward radial coefficient. The instrument identity and analytical control gates remained fixed. The owned run `02c2fb43-a5d9-4f89-8072-744a82551187` completed with exit zero in 471.397 wall seconds, all six children exited zero, stderr was empty, and the terminal lease records `processGroupClosed: true`. The retained inventory receipts occupy 494 MiB by `du -sh` after completion.

The full-table formatter passed the same known interval midpoint control before reading its target receipts. A separate finite comparison diagnostic first passed the analytic six-member values $a=3/2$, $\Delta\beta=\pi/3$ and $\Delta\omega/\beta=4\pi/9$. Its finite measured summaries are:

| Members | T02 $Rv$ | T200 $Rv$ | Fixed-$M$ limit $a$ | Largest displayed $Rv$ among these 100 rows | Cell of that maximum | T200 adjacent $\Delta\beta$ | Limit $2\pi/M$ |
| ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: |
| 2 | 0.266941943174 | 0.167368194995 | 1/6 | 0.266941943174 | T02 | 3.14160872569 | 3.14159265359 |
| 4 | 0.893646728451 | 0.669448839574 | 2/3 | 0.893646728451 | T02 | 1.57082815866 | 1.57079632679 |
| 8 | 2.89447541740 | 2.67752944361 | 8/3 | 2.89447541740 | T02 | 0.785460588828 | 0.785398163397 |
| 10 | 4.20659118090 | 4.18337616881 | 25/6 | 4.32432151255 | T08 | 0.628395807833 | 0.628318530718 |
| 12 | 5.70333779422 | 6.02363060493 | 6 | 6.15142249987 | T12 | 0.523690618347 | 0.523598775598 |
| 24 | 18.0491778833 | 24.0801730005 | 24 | 24.1460851057 | T58 | 0.261973023564 | 0.261799387799 |

These are measured midpoint comparisons within the enumerated finite rows. In particular the twenty-four-member first rung approaches its fixed-inventory action limit from below, overshoots it by T58, and then falls across the later listed rows. The theorem concerns eventual fixed-$M$ behavior, not monotonicity from the first cell. The actual radius, frequency and period values for every row are in the complete table; no physical $K$ is inferred by assigning a frequency in hertz.

Source provenance: `all600-table-summary.json` binds every current receipt by SHA-256. The extension's fixed maximum-cell CLI reran the first twenty cells, so their wall-time metadata and receipt byte hashes changed; the original first-120 table and its historical digest summary remain the preliminary snapshot. The scientific instrument stayed fixed. Rounded margin entries in both Markdown tables are diagnostics of stored outward lower bounds; their last printed digit is not an interval certificate. The exact binary bounds and full enclosures in the current receipts are authoritative.

Claim grade: computer-assisted derived finite local admissions and measured finite summaries, with independent adjudication still required. Falsifier: any failed source digest, a receipt missing its control-first gate, a missing ordinary root, a failed signed margin or balance endpoint, or a corrected finite table entry overturns the corresponding statement. Completing all 600 rows does not establish whole-cell uniqueness, odd-cell exclusion, or stability of unexamined higher-rung inventories.
