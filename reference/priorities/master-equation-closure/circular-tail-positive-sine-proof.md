# Positive-Sine Circular Self-Tail Inequality

Status: complete proof packet.

Claim level: analytic large-$\beta$ positive-sine self-tail lower bound, safe for executable integration as a tail constant packet after independent review.

Owned lane: `master-equation-closure/circular-tail/positive-sine-envelope`.

## Source Extraction

The executable source is [circular_interval_certificate.py](circular_interval_certificate.py). In the positive-sine chart, `self_root_branches(beta, full_signed=False)` retains only even lobes. In lobe coordinates
$$
\xi=k\pi+y,\qquad 0<y<\pi,
$$
the retained self roots solve
$$
\sin y=\frac{k\pi+y}{\beta}.
$$
The executable self tangential row is
$$
T_k(\beta,y)
=
\frac{\beta^2\cos y}{(k\pi+y)^2\,|1-\beta\cos y|}.
$$
This is exactly the term emitted in `self_rows` and the same term named by the report's missing envelope:
$$
\sum \frac{\beta^2\cos(y)}{\xi^2|1-\beta\cos(y)|}+\frac{\beta}{12}.
$$

The priority prose in [circular-interval-certificate-report.md](circular-interval-certificate-report.md) asks for constants satisfying
$$
S_+(\beta)\ge -\frac{\beta}{12}-K_{\log}\log\beta-K_0
$$
for $\beta\ge \beta_{\mathrm{tail}}$, with
$$
K_{\log}\log\beta_{\mathrm{tail}}+K_0<8.591208140575,\qquad
\beta_{\mathrm{tail}}=26.68479810180211.
$$

Here
$$
S_+(\beta)=\sum_{\substack{k\ge0,\ k\ \mathrm{even}\\ \text{active sheets outside declared } |J|<0.02\text{ windows}}} T_k(\beta,y),
\qquad J=1-\beta\cos y.
$$

The proof below does not use a hidden fold-edge cancellation. Near a birth fold, both newborn positive-sine sheets have $\cos y>0$, hence their singular contribution is positive. The lower bound remains valid on every included sheet outside the declared $|J|<0.02$ windows, and by one-sided limiting up to the excluded fold edge.

## Constants

Take
$$
K_{\log}=0,\qquad K_0=1.24.
$$
Then
$$
K_{\log}\log\beta_{\mathrm{tail}}+K_0=1.24<8.591208140575,
$$
so the executable budget is safe with margin
$$
8.591208140575-1.24=7.351208140575.
$$

## Branchwise Lower Bounds

For the principal branch $k=0$, write the nontrivial right root as $\xi_0=\pi-\delta_0$. Since $\sin\delta_0=\xi_0/\beta$ and $\sin\delta_0\ge 2\delta_0/\pi$ on $0\le\delta_0\le\pi/2$,
$$
\delta_0\le \frac{\pi^2}{2\beta+\pi},
\qquad
\xi_0\ge p(\beta):=\pi-\frac{\pi^2}{2\beta+\pi}.
$$
The principal contribution is negative and obeys
$$
T_0(\beta)\ge -\frac{\beta}{\xi_0^2}
\ge -\frac{\beta}{\pi^2}
-\beta\left(\frac{1}{p(\beta)^2}-\frac{1}{\pi^2}\right).
$$
Direct differentiation shows that the last coefficient decreases for $\beta\ge\beta_{\mathrm{tail}}$, and at the handoff
$$
\beta_{\mathrm{tail}}\left(\frac{1}{p(\beta_{\mathrm{tail}})^2}-\frac{1}{\pi^2}\right)<0.328.
$$
Thus
$$
T_0(\beta)\ge -\frac{\beta}{\pi^2}-0.328.
$$

Now take an even lobe $k=2m\ge2$ whose complete endpoint interval is present, so $(k+1)\pi\le\beta$. Put
$$
a=k\pi,\qquad b=(k+1)\pi.
$$
Let its left and right roots be
$$
\xi_L=a+y_L,\qquad \xi_R=b-\delta_R.
$$
The left sheet has $y_L<\arccos(1/\beta)$, so $1-\beta\cos y_L<0$ and
$$
T_L\ge \frac{\beta}{\xi_L^2}.
$$
The right sheet either has $\cos y_R\ge0$, in which case it is nonnegative, or has $\cos y_R<0$, in which case
$$
T_R\ge -\frac{\beta}{\xi_R^2}.
$$
Therefore every complete even-lobe pair satisfies
$$
P_k:=T_L+T_R\ge \beta\left(\frac{1}{\xi_L^2}-\frac{1}{\xi_R^2}\right).
$$

The root equation and $\arcsin u\le(\pi/2)u$ give
$$
y_L\le \frac{\pi(a+\pi)}{2\beta},
\qquad
\delta_R\le \frac{\pi b}{2\beta}.
$$
Using $|d(x^{-2})/dx|=2x^{-3}$, $a\le\xi_L$, and $\xi_R\ge b/2$, this yields
$$
P_k
\ge
\beta\left(\frac{1}{a^2}-\frac{1}{b^2}\right)
-\left(\frac{1}{\pi k^2}+\frac{1}{\pi k^3}+\frac{8}{\pi(k+1)^2}\right).
$$
Summing this displacement defect over all even $k\ge2$ gives
$$
E_{\mathrm{pair}}
\le
\frac{\pi}{24}+\frac{\zeta(3)}{8\pi}+\pi-\frac{8}{\pi}
<0.774.
$$

Let $M$ be the largest integer with $(2M+1)\pi\le\beta$. Since $\beta\ge\beta_{\mathrm{tail}}$, $M\ge3$. The endpoint pair identity is
$$
\sum_{m=1}^{\infty}
\left(\frac{1}{(2m\pi)^2}-\frac{1}{((2m+1)\pi)^2}\right)
=
\frac{1}{\pi^2}-\frac{1}{12}.
$$
The omitted positive endpoint tail satisfies
$$
R_M
\le
\frac{1}{4\pi^2M^2},
\qquad
\beta R_M
\le
\frac{2M+3}{4\pi M^2}
\le
\frac{1}{4\pi}
<0.080.
$$

If the next even lobe is only partially present, it is handled separately from the complete endpoint-pair sum. A terminal partial lobe can only hurt the lower bound through a negative right sheet. On such a sheet $\xi>\beta-\pi$ and
$$
|T_{\mathrm{term}}|
=
\frac{\beta^2|\cos y|}{\xi^2(1+\beta|\cos y|)}
\le
\frac{\beta}{\xi^2}
\le
\frac{\beta}{(\beta-\pi)^2}
<0.049
$$
on $\beta\ge\beta_{\mathrm{tail}}$.

Combining the principal branch, the complete even-lobe pairs, and the omitted positive endpoint tail gives
$$
\begin{aligned}
S_+(\beta)
&\ge
-\frac{\beta}{\pi^2}
+\beta\left(\frac{1}{\pi^2}-\frac{1}{12}\right)
-0.328-0.774-0.080-0.049\\
&>
-\frac{\beta}{12}-1.231.
\end{aligned}
$$
Therefore the announced constants $K_{\log}=0$ and $K_0=1.24$ prove
$$
S_+(\beta)\ge -\frac{\beta}{12}-K_0
$$
for every $\beta\ge\beta_{\mathrm{tail}}$ outside the declared $|J|<0.02$ windows.

## Fold-Edge Accounting

No negative fold-edge defect is hidden in the proof. At a positive-sine birth, the two newborn roots lie with $\cos y>0$ and each row is positive. The pair estimate uses only the inequalities $T_L\ge\beta/\xi_L^2$ and $T_R\ge-\beta/\xi_R^2$; it remains true through the transition where the right sheet changes from positive to negative. The declared $|J|<0.02$ windows therefore exclude nonuniform denominators for certificate hygiene, but the lower-bound constant is not obtained by discarding a negative singular edge.

## Validation

Numerical spot checks using the executable formula gave:

| $\beta$ | $S_+(\beta)$ | $S_+(\beta)+\beta/12$ |
| ---: | ---: | ---: |
| 26.68479810180211 | -2.397848344828 | -0.174115169678 |
| 30 | -2.668790022770 | -0.168790022770 |
| 50 | -4.335029958348 | -0.168363291681 |
| 100 | -8.500544823292 | -0.167211489959 |
| 1000 | -83.500023937098 | -0.166690603764 |

These checks are not used as proof; they verify that the analytic constant is conservative and that the expected limiting remainder is near $-1/6$.

## Integration Verdict

The positive-sine large-$\beta$ self-tail inequality closes with
$$
K_{\log}=0,\qquad K_0=1.24.
$$
The constants are safe for executable integration, subject to a normal independent review of the proof packet. The packet does not close the full-signed cancellation lane.
