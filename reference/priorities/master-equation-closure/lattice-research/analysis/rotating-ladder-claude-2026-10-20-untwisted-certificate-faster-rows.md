# Interval certificates for the untwisted rotating alternating ladder at radii 1 and 0.4

## Result

The untwisted [rotating alternating ladder](rotating-alternating-ladder.md) balances exactly under the unchanged Master Equation at pair radius $R=1$ and at $R=0.4$, in units $K=c_f=1$, with every rung $k\in\mathbb Z$ on both rails retained. At each radius there is exactly one balance in an explicit box, and it is enclosed as follows. Here $\delta=d/R$ and $\varepsilon=\omega R$; all displayed intervals are rounded outward from the stored binary endpoints, except the uniqueness boxes, which are rounded inward.

| Radius $R$ | Uniqueness box: $\delta$ | Uniqueness box: $\varepsilon$ | Enclosure of $\delta$ | Enclosure of $\varepsilon$ | Enclosure of $d$ | Enclosure of $\omega$ |
| --- | --- | --- | --- | --- | --- | --- |
| $1$ | $[2.97328320573,\ 2.97328340572]$ | $[0.484398494234,\ 0.484398534233]$ | $[2.9732832688,\ 2.9732833426]$ | $[0.4843985107,\ 0.4843985178]$ | $[2.9732832688,\ 2.9732833426]$ | $[0.4843985107,\ 0.4843985178]$ |
| $0.4$ | $[2.214446143,\ 2.214466142]$ | $[0.8722121937,\ 0.8722141936]$ | $[2.214455363,\ 2.214456923]$ | $[0.8722131646,\ 0.8722132227]$ | $[0.8857821452,\ 0.8857827689]$ | $[2.180532911,\ 2.180533057]$ |

The certified half-widths are $3.7\times10^{-8}$ in $\delta$ and $3.5\times10^{-9}$ in $\varepsilon$ at $R=1$, and $7.8\times10^{-7}$ and $2.9\times10^{-8}$ at $R=0.4$. The recorded float values ($\delta\approx2.973283306$, $\varepsilon\approx0.4843985142$ at $R=1$; $\delta\approx2.214456143$, $\omega\approx2.180532984$ at $R=0.4$) lie inside the enclosures. The [small-speed existence theorem](rotating-ladder-small-speed-existence.md) gives no explicit speed threshold and does not reach member speeds $0.48$ and $0.87$; these are the first proved balances of the ladder at such speeds.

**Claim grade.** Derived, as a computer-assisted proof, under the same dependencies as the [R = 1000 certificate](rotating-ladder-claude-2026-10-20-untwisted-certificate.md): Lemmas 1 and 2 of the existence proof as adjudicated; mpmath 1.3.0 `iv`; the correctness of the frozen kernel `ladder_interval_kernel.py`, imported unchanged; and the self-reviewed tail bounds of that note's Section 3. **Claim boundary.** Existence and uniqueness of the balance in each uniqueness box, at that radius, for rigid untwisted rotation with complete history. Nothing about stability, other branches, other radii, or twisted or translating structures.

## What differs from the R = 1000 certificate

The method is that of the R = 1000 note: a two-dimensional Krawczyk test for $F=(G,\ S-R\varepsilon^2)$, with the head $\lvert k\rvert\le N$ in interval arithmetic and the tail $\lvert k\rvert>N$ enclosed by proved bounds. Only the following changed.

- **Driver.** A new driver, `certify_untwisted_fast.py`, takes $R$, the seed, $N$ and the box radii as arguments. Its float guess boxes for the roots are scaled by $1/(1-\varepsilon^2)$, because $\lvert\partial\tau/\partial\varepsilon\rvert\le1/L$ is no longer close to $1$. It keeps every attempt in the receipt and flushes a progress file. The frozen R = 1000 files were not modified.
- **Truncation.** $N=10^4$ at $R=1$ and $N=4\times10^4$ at $R=0.4$. At $N=10^4$ the $G$ tail bound at $R=0.4$ would be $I_2\approx2.1\times10^{-6}$, so $N$ was raised.
- **Runs.** Both rows ran under the owned-compute supervisor (owner task `local_f1a9eed9-…`). Each certified on its first attempt, with box radii $(10^{-7},\ 2\times10^{-8})$ at $R=1$ and $(10^{-5},\ 10^{-6})$ at $R=0.4$.

## Hypotheses of the tail bounds at these speeds

Write $L=1-\overline\varepsilon^2$ and $P=1+\overline\varepsilon^2$; over the uniqueness boxes $L\ge0.7653$ at $R=1$ and $L\ge0.2392$ at $R=0.4$. Every fact used in Section 3 of the R = 1000 note was rechecked for $0\le\varepsilon<1$ (derived).

- **(F1)** $\tau\ge\lvert z\rvert$ holds at every speed.
- **(F2)** $z^2\le P\tau^2$ uses only $0\le\operatorname{sinc}^2\le1$.
- **(F3)** $L\tau\le w\le P\tau$, $\lvert w'\rvert\le P$ and $\lvert w''\rvert\le\varepsilon^3$ use only $\lvert\sin x\rvert\le\lvert x\rvert$ and $L>0$.
- **(F4)** $\lvert s\rvert\le\tau$ and $\lvert s''\rvert\le\varepsilon$ hold at every speed.
- **(F5)** The implicit-derivative bounds need only $w\ge L\tau>0$.
- **Alternating-remainder lemma.** Its hypotheses hold: $\lvert f_\nu\rvert\le1/(L\tau^2)\to0$; $\lvert f_\nu'\rvert\le a_3\overline\delta\sqrt P/(L\tau^3)$ is integrable on $[M,\infty)$; and $\lvert f_\nu''\rvert$ is integrable by the bound of that note.
- **The $\partial_\varepsilon G$ tail bound.** It carries $1/\underline\varepsilon$ and $1/\underline\varepsilon^2$ and needs $\underline\varepsilon>0$; here $\underline\varepsilon\ge0.48$.

All constants grow like powers of $1/L$: $a_3$ and $c_4$ scale as up to $L^{-3}$, and $\alpha_4$ as up to $L^{-5}$. They stay finite, so no bound fails; they are only larger. The Taylor branch of $\operatorname{sinc}$ is not used, because the smallest delay angle, that of the rung partner, is about $0.88$ at $R=1$ and $1.36$ at $R=0.4$, far above the branch threshold $10^{-3}$.

## Known-case controls, run before the targets

- **`controls_fast.py`** passed at 22:15:11Z (receipt `controls_fast_receipt.json`; 18.5 s).
  - A separately written float evaluator of the raw three-vector law matched the kernel's reduction at $(2.973283306,\ 0.4843985142)$ and $(2.214456143,\ 0.8722131936)$. It used $k\in\{0,1,2,7,40,1000\}$ on both rails. Agreement was relative $4\times10^{-16}$ in delay, $3.1\times10^{-13}$ tangential and $2.5\times10^{-13}$ radial, and the axial pairs cancelled exactly. This tests the reduction at these speeds.
  - Root enclosures started from the Lemma 1 bracket alone were certified in at most 7 Newton steps and contained the bisection roots.
  - Enclosures of $G$ and $S$ at $N=300$ and $N=3000$ overlapped at both points.
- **Driver known case.** The new driver at $R=1000$ (receipt `fast_known_case_R1000_receipt.json`; 69 s) certified the same enclosure as the frozen R = 1000 run. It contains the PI's independent 55-digit reference point $(\delta,\varepsilon)=(3.34503529272328827\ldots,\ 0.01384081428068128\ldots)$. I have not seen how that reference was computed; it is independent of this kernel.
- **Failure record.** The first $R=0.4$ run certified on its first attempt but then crashed before writing its receipt. The cause was a command-line defect: the empty reference arguments `"" ""` were parsed as numbers. Its logs are kept as `fast_R0p4.log` and owned-compute log `f98848fb-3ef2-4030-ab23-dcfb87b208ba`. The driver was corrected to treat empty strings as no reference and rerun unchanged otherwise; there is no failed receipt to preserve.

## Measured enclosures

All values are over the uniqueness box and rounded outward. Measured by the kernel; certified by the Krawczyk proposition of the R = 1000 note.

| Quantity | $R=1$, $N=10^4$ | $R=0.4$, $N=4\times10^4$ |
| --- | --- | --- |
| $G(\tilde x)$ | $[-5.870,\ 5.870]\times10^{-9}$ | $[-1.3239,\ 1.3239]\times10^{-7}$ |
| $S(\tilde x)-R\tilde\varepsilon^2$ | $[-1.989,\ 1.989]\times10^{-9}$ | $[-9.623,\ 9.623]\times10^{-10}$ |
| $\partial_\delta G$ | $[0.17182718,\ 0.17209401]$ | $[0.21242882,\ 0.21695338]$ |
| $\partial_\varepsilon G$ | $[0.29446811,\ 0.29486434]$ | $[0.39615406,\ 0.39784742]$ |
| $\partial_\delta S$ | $[0.022768102,\ 0.022796397]$ | $[-0.017729305,\ -0.017228506]$ |
| $\partial_\varepsilon S-2R\varepsilon$ | $[-0.75535171,\ -0.75523192]$ | $[-0.59816593,\ -0.59770968]$ |
| Tails: $I_2$; $S$ | $5.870\times10^{-9}$; $1.989\times10^{-9}$ | $1.3239\times10^{-7}$; $9.623\times10^{-10}$ |
| Tails: $\partial_\delta G$, $\partial_\varepsilon G$, $\partial_\delta S$, $\partial_\varepsilon S$ | $1.332$, $1.969$, $0.1399$, $0.5913$ $(\times10^{-4})$ | $22.12$, $7.193$, $1.863$, $0.8525$ $(\times10^{-4})$ |
| Largest row sum of $\lvert I-Y\mathbf J\rvert$ (upper bound) | $\le0.00200$ | $\le0.0169$ |
| $S$ over the box | $[0.23464186,\ 0.23464198]$ | $[0.30429420,\ 0.30431049]$ |

The row-sum bounds are outward roundings of sums of upper endpoints stored in the receipts. The certifying test itself compares the interval upper endpoint with $1$ in interval arithmetic. The `normC_upper` floats in the JSON, like every float width there, are approximate diagnostics.

The $\partial_\varepsilon G$ tail enters the column $\mathbf J_{\cdot2}$. Through $Y$ it enters both $C_{12}=-(Y_{11}\mathbf J_{12}+Y_{12}\mathbf J_{22})$ and $C_{22}=-(Y_{21}\mathbf J_{12}+Y_{22}\mathbf J_{22})$, the latter through $Y_{21}$; both stay small here.

The fields `rows_evaluated` (20,001 and 80,001) and `newton_iterations_max` (at most 3) in the receipts are statistics of the head rows $\lvert k\rvert\le N$ only. The two boundary rows at $k=N+1$ used in the $G$ tail are separate certified calls in each evaluation.

**Why these widths.** The $\delta$ half-width is about $Y_{11}I_2$ plus $Y_{12}$ times the $S$ tail: $5.5\times5.9\times10^{-9}+2.2\times2.0\times10^{-9}$ at $R=1$, and $4.9\times1.3\times10^{-7}+3.3\times9.6\times10^{-10}$ at $R=0.4$. Since $I_2$ falls as $N^{-2}$ and run time grows as $N$, a narrower box costs proportionally more rows.

## Side conditions

These are derived over each uniqueness box:

- Member speed is at most $0.48439854$ at $R=1$ and $0.87221420$ at $R=0.4$, strictly below $1$, so $D_\nu\ge L>0$.
- Every source has exactly one causal root, and the receiver has no positive-delay self root (Lemma 1, valid for all $\varepsilon<1$).
- Since $\delta>2$, every pair of members is at least $2R$ apart.
- All series converge absolutely, the axial component vanishes exactly, and $S>0$.

## Falsifiers

- An independently computed balance at $R=1$ or $R=0.4$ lying outside the enclosure by more than its own error.
- A second zero of $F$ in a uniqueness box.
- An independently evaluated tail exceeding the stated bounds at these speeds.
- A raw-law row at these speeds disagreeing with the reduction beyond float error.

## Reproduction

These files are in [`../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/`](../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/), run with the shared virtual environment.

- `controls_fast.py`, 18.5 s.
- `certify_untwisted_fast.py 1000 3.345035293 0.01384081428 10000 1e-9 2e-10 fast_known_case_R1000_receipt.json 3.34503529272328827 0.01384081428068128`, 69 s.
- `certify_untwisted_fast.py 1 2.973283306 0.4843985142 10000 1e-7 2e-8 fast_R1_receipt.json`, 72 s under the supervisor.
- `certify_untwisted_fast.py 0.4 2.214456143 0.8722131936 40000 1e-5 1e-6 fast_R0p4_receipt.json "" "" 3`, 259 s under the supervisor.

Logs are in `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/untwisted-certificate/`, together with the progress files and the supervisor's output.

## Independent review disposition and correction

Codex reviewed this note and its driver as frozen (note SHA-256 `e559667600faccbee44574a9d9ecc763ca86e57688f33e53611e81336c921bed`, frozen 2026-10-20T22:28:35Z) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T22:54:29Z. The tail hypotheses hold at these speeds (they need $L>0$, a positive lower speed where the derivative bound divides by it, and positive spacing, not small speed; lower $L$ about $0.765$ and $0.239$), all six tail formulas passed an exact-rational transcription check at $N=10^4$ and $4\times10^4$, and independent scalar rows and derivatives were enclosed at fourteen probes per radius. The driver passes the right residuals, the full Jacobian including $-2R\varepsilon$, the whole box and every tail entry.

**Correction (exact radius).** The driver parses the radius as a binary float, so the $R=0.4$ run used $R_b=3602879701896397/9007199254740992$, which exceeds $2/5$ by $1/45035996273704960$. Codex made the exact correction from the saved valid enclosures, $F_2\to F_2+(R_b-\tfrac25)\tilde\varepsilon^2$ and $J_{22}\to J_{22}+2(R_b-\tfrac25)\varepsilon(X)$, and re-ran the Krawczyk test in rational arithmetic with every printed endpoint enlarged by one last decimal unit: strict inclusion holds with contraction factors about $0.001993$ ($R=1$) and $0.016873$ (exact $R=2/5$), and both images lie inside the published enclosures. The enclosures stated above therefore hold for exact $R=2/5$, on the provenance of this recorded rational extension (which assumes the original enclosures and covers serialization by the one-unit enlargement); the original receipt alone certifies the binary radius $R_b$. A future driver should parse the radius exactly. ($R=1$ is exact in binary.)

**Independent reference.** Codex's separately written high-precision sum gives at $R=1$ the point $\delta\approx2.97328330572630$, $\varepsilon\approx0.48439851423314$, and at $R=2/5$ approximately $(2.214456142679680,\ 0.872213193658181)$, both inside the certified enclosures (numerical references, not outward certificates).
