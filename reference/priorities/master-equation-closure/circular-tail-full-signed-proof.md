# Full Signed Circular Self-Tail Inequality

Status: complete proof packet.

Claim level: analytic large-$\beta$ full signed self-tail lower bound, safe for executable integration as a tail constant packet after independent review.

Owned lane: `master-equation-closure/circular-tail/full-signed-cancellation`.

## Source Extraction

The executable source is [circular_interval_certificate.py](circular_interval_certificate.py). In lobe coordinates
$$
\xi=k\pi+y,\qquad 0<y<\pi,
$$
the full signed chart retains every lobe admitted by the self-root equation
$$
\sin y=\frac{k\pi+y}{\beta}.
$$
For each retained self sheet the executable tangential row is
$$
T_k(\beta,y)
=
\frac{\beta^2\cos y}{(k\pi+y)^2\,|1-\beta\cos y|}.
$$
Thus
$$
S_{|\sin|}(\beta)=\sum_{\text{retained sheets}}T_k(\beta,y)
$$
is the normalized full signed self tangential sum named in [circular-interval-certificate-report.md](circular-interval-certificate-report.md).

The tail handoff asks for
$$
S_{|\sin|}(\beta)\ge -K_0
$$
for every $\beta\ge\beta_{\mathrm{tail}}$ outside the declared $|J|<0.02$ windows, with
$$
K_0<10.814941315726,
\qquad
\beta_{\mathrm{tail}}=26.68479810180211.
$$

## Constants

Take
$$
K_0=3.
$$
This gives the budget margin
$$
10.814941315726-3=7.814941315726.
$$

## Branchwise Lower Bounds

Let
$$
N=\left\lfloor\frac{\beta}{\pi}\right\rfloor .
$$
For $\beta\ge\beta_{\mathrm{tail}}$, $N\ge8$. The complete lobes are $k=1,\ldots,N-1$; the possible lobe $k=N$ is the only terminal partial lobe.

### Principal Self Sheet

For the nontrivial principal self sheet $k=0$, write $\xi_0=\pi-\delta_0$. Since
$$
\sin\delta_0=\frac{\xi_0}{\beta}
$$
and $\sin\delta_0\ge2\delta_0/\pi$ on $0\le\delta_0\le\pi/2$,
$$
\delta_0\le \frac{\pi^2}{2\beta+\pi},
\qquad
\xi_0\ge p(\beta):=\pi-\frac{\pi^2}{2\beta+\pi}.
$$
The principal sheet is negative and obeys
$$
T_0(\beta)\ge-\frac{\beta}{\xi_0^2}
\ge
-\frac{\beta}{\pi^2}
-\beta\left(\frac{1}{p(\beta)^2}-\frac{1}{\pi^2}\right).
$$
The last coefficient decreases for $\beta\ge\beta_{\mathrm{tail}}$, and at the handoff it is less than $0.328$. Hence
$$
T_0(\beta)\ge-\frac{\beta}{\pi^2}-0.328.
$$

### Complete Lobe Pairs

For a complete lobe $k\ge1$, put
$$
a=k\pi,\qquad b=(k+1)\pi.
$$
Let the left and right roots be
$$
\xi_L=a+y_L,\qquad \xi_R=b-\delta_R.
$$
The left sheet has $\cos y_L>1/\beta$, so
$$
T_L\ge\frac{\beta}{\xi_L^2}.
$$
The right sheet is either nonnegative or satisfies
$$
T_R\ge-\frac{\beta}{\xi_R^2}.
$$
Therefore
$$
P_k:=T_L+T_R
\ge
\beta\left(\frac{1}{\xi_L^2}-\frac{1}{\xi_R^2}\right).
$$

The root equation and $\arcsin u\le(\pi/2)u$ give the displacement bounds
$$
y_L\le\frac{\pi(a+\pi)}{2\beta},
\qquad
\delta_R\le\frac{\pi b}{2\beta}.
$$
Using $|d(x^{-2})/dx|=2x^{-3}$, $\xi_L\ge a$, and $\xi_R\ge b/2$ on every complete lobe,
$$
P_k
\ge
\beta\left(\frac{1}{a^2}-\frac{1}{b^2}\right)
-
\left(
\frac{1}{\pi k^2}
+\frac{1}{\pi k^3}
+\frac{8}{\pi(k+1)^2}
\right).
$$
The full defect sum is bounded by
$$
E_{\mathrm{pair}}
\le
\sum_{k=1}^{\infty}
\left(
\frac{1}{\pi k^2}
+\frac{1}{\pi k^3}
+\frac{8}{\pi(k+1)^2}
\right)
<2.549.
$$
The endpoint terms telescope:
$$
\sum_{k=1}^{N-1}
\left(\frac{1}{(k\pi)^2}-\frac{1}{((k+1)\pi)^2}\right)
=
\frac{1}{\pi^2}-\frac{1}{(N\pi)^2}.
$$

### Terminal Partial Lobe

The only unpaired terminal lobe is $k=N$. If it contributes only nonnegative sheets, it does not affect the lower bound. If it has a negative right sheet, then $\xi\ge N\pi>\beta-\pi$ and
$$
\left|T_N\right|
=
\frac{\beta^2|\cos y|}{\xi^2(1+\beta|\cos y|)}
\le
\frac{\beta}{\xi^2}
\le
\frac{\beta}{(\beta-\pi)^2}.
$$
The function $\beta/(\beta-\pi)^2$ decreases for $\beta>\pi$, so on the tail domain
$$
\frac{\beta}{(\beta-\pi)^2}
\le
\frac{\beta_{\mathrm{tail}}}{(\beta_{\mathrm{tail}}-\pi)^2}
<0.049.
$$
This covers the terminal orphan and does not use cancellation at a fold edge.

## Combined Lower Bound

Combining the principal sheet, complete lobe pairs, the telescoping endpoint identity, and the terminal partial-lobe bound gives
$$
\begin{aligned}
S_{|\sin|}(\beta)
&\ge
-\frac{\beta}{\pi^2}-0.328
+
\beta\left(\frac{1}{\pi^2}-\frac{1}{(N\pi)^2}\right)
-2.549-0.049\\
&=
-\frac{\beta}{(N\pi)^2}
-2.926.
\end{aligned}
$$
Since $N\pi>\beta-\pi$,
$$
\frac{\beta}{(N\pi)^2}
<
\frac{\beta}{(\beta-\pi)^2}
\le0.049,
$$
and therefore
$$
S_{|\sin|}(\beta)>-2.975.
$$
The announced constant $K_0=3$ proves
$$
S_{|\sin|}(\beta)\ge -K_0
$$
for every $\beta\ge\beta_{\mathrm{tail}}$ outside the declared $|J|<0.02$ windows.

## Fold-Edge Accounting

At a self-branch birth both newborn sheets lie at $\cos y=1/\beta$ and have nonnegative singular sign in the tangential row. The lower bound never subtracts a negative birth singularity. The declared $|J|<0.02$ windows remain part of the finite certificate domain, but this analytic lower bound is not obtained by discarding an unbounded negative fold-edge term.

The terminal partial-lobe estimate is deliberately separated from the complete-pair telescope. This prevents the proof from assuming a right sheet exists or cancels before the partial lobe has a complete endpoint interval.

## Validation

Numerical spot checks using the executable formula gave:

| $\beta$ | $S_{|\sin|}(\beta)$ |
| ---: | ---: |
| 26.68479810180211 | -0.342955498913 |
| 30 | -0.320224540551 |
| 50 | -0.334214156859 |
| 100 | -0.333427592814 |
| 1000 | -0.333363596520 |

These checks are not used as proof; they verify that the analytic constant is conservative and that the expected limiting remainder is near $-1/3$.

## Integration Verdict

The full signed large-$\beta$ self-tail inequality closes with
$$
K_0=3.
$$
The constant is safe for executable integration, subject to a normal independent review of the proof packet.
