# Arclength-Inverse $M=3$ Root Frontier

Promotion status: `priority-only`. This packet refines the root-ledger interpretation in [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md). The earlier screen reported off-grid root-count loss at $\rho=0.4$ under the working root-search window

$$
\eta_{\max}=4.
$$

The refined result is sharper: the relevant roots do not annihilate. They cross the working memory/search horizon. With

$$
\eta_{\max}=4.5,
$$

the missing source-pair roots reappear, the $5$-$5$ root count is restored in the tested rows, and the residual descent mostly survives. The obstruction is therefore a finite-memory/action-window issue, not an antipodal-relaxation trigger.

---

## 1. Localized Missing Labels

The failed rows under $\eta_{\max}=4$ are confined to one same-sign cross-binary pair and its antipodal mate:

$$
+3\leftarrow+2,
\qquad
-3\leftarrow-2.
$$

Equivalently, the receiver is binary $3$ and the source is binary $2$, with the same polarity on both sides. The antipodal symmetry produces the paired missing row.

At $\rho=0.3$, the roots remain inside the old window:

| Radius $\rho$ | Grid/node | $\lambda$ | Pair | Root $\eta$ under $\eta_{\max}=4$ |
| ---: | --- | ---: | --- | ---: |
| $0.30$ | $K=12$, $n=7$ | $6.874046$ | $+3\leftarrow+2$ | $3.982231$ |
| $0.30$ | $K=24$, $n=14$ | $6.874046$ | $+3\leftarrow+2$ | $3.982231$ |
| $0.30$ | $K=18$, $n=11$ | $7.201381$ | $+3\leftarrow+2$ | $3.932606$ |

At $\rho=0.32$, the same $K=12/K=24$ root is already on the boundary:

$$
\eta\approx3.999519.
$$

At $\rho=0.34$, the old window misses it, but the extended window finds

$$
\eta\approx4.016775
$$

for both $+3\leftarrow+2$ and $-3\leftarrow-2$ on the $K=12/K=24$ phase row. At $\rho=0.4$, the extended roots are

| Radius $\rho$ | Grid/node | $\lambda$ | Pair | Root under $\eta_{\max}=4.5$ |
| ---: | --- | ---: | --- | ---: |
| $0.40$ | $K=12$, $n=7$ | $7.023431$ | $+3\leftarrow+2$ | $4.068361$ |
| $0.40$ | $K=12$, $n=7$ | $7.023431$ | $-3\leftarrow-2$ | $4.068361$ |
| $0.40$ | $K=18$, $n=11$ | $7.357881$ | $+3\leftarrow+2$ | $4.010231$ |
| $0.40$ | $K=18$, $n=11$ | $7.357881$ | $-3\leftarrow-2$ | $4.010231$ |

The old status code

$$
\texttt{m3-root-ledger-loss-at-rho-0p4}
$$

should therefore be read as

$$
\texttt{m3-memory-window-exit-at-eta-4}.
$$

It is not evidence for

$$
\texttt{m3-left-null-pair-even},
\qquad
\texttt{root-merge-risk},
\qquad
\texttt{root-annihilation}.
$$

---

## 2. Extended-Window Dynamics Rescore

The same $M=3$ trust path was rescored under $\eta_{\max}=4.0$, $4.5$, and $5.0$. The $4.5$ and $5.0$ rows agree to the displayed precision, so $\eta_{\max}=4.5$ is sufficient for this local frontier.

| Radius $\rho$ | $\eta_{\max}$ | Grid | Residual norm | Tangential RMS | $\mathcal{R}_{K}$ RMS | Root count | $\eta_{\max}^{\mathrm{active}}$ |
| ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| $0.34$ | $4.0$ | $12$ | $6.2203159796$ | $0.2435484145$ | $0.6914315977$ | $4$-$5$ | $3.7249346925$ |
| $0.34$ | $4.5$ | $12$ | $6.2118639049$ | $0.2430950275$ | $0.6905352123$ | $5$-$5$ | $4.0167747482$ |
| $0.34$ | $4.0$ | $24$ | $9.6016779433$ | $0.3109399767$ | $0.7372517048$ | $4$-$5$ | $3.8316267269$ |
| $0.34$ | $4.5$ | $24$ | $9.5984035674$ | $0.3107625303$ | $0.7370303995$ | $5$-$5$ | $4.0167747482$ |
| $0.40$ | $4.0$ | $12$ | $6.1542578400$ | $0.2381633262$ | $0.6850681447$ | $4$-$5$ | $3.7864104792$ |
| $0.40$ | $4.5$ | $12$ | $6.1458735336$ | $0.2377265142$ | $0.6841738835$ | $5$-$5$ | $4.0683608316$ |
| $0.40$ | $4.0$ | $18$ | $7.9428392554$ | $0.3111860422$ | $0.6980815386$ | $4$-$5$ | $3.9585555068$ |
| $0.40$ | $4.5$ | $18$ | $7.9359873876$ | $0.3110274954$ | $0.6974303410$ | $5$-$5$ | $4.0102305587$ |
| $0.80$ | $4.0$ | $18$ | $7.2011669905$ | $0.2579787931$ | $0.6431193930$ | $4$-$5$ | $3.9685670133$ |
| $0.80$ | $4.5$ | $18$ | $7.1782539303$ | $0.2569361188$ | $0.6411620181$ | $5$-$5$ | $4.2946170973$ |
| $0.80$ | $4.0$ | $24$ | $8.5243672403$ | $0.2502226067$ | $0.6648349943$ | $4$-$5$ | $3.9948092226$ |
| $0.80$ | $4.5$ | $24$ | $8.5142747006$ | $0.2493374020$ | $0.6642692179$ | $5$-$5$ | $4.4058154936$ |

The extra delayed hits do not destroy the descent. They slightly improve the residual in this screen. The cost is that the finite-memory row must now declare and justify a deeper active window.

---

## 3. Memory-Window Lemma

Let

$$
G_{ij,n}(\eta;\alpha)
=
\|\mathbf{Z}_i(\lambda_n;\alpha)-\mathbf{Z}_j(\lambda_n-\eta;\alpha)\|-\eta.
$$

Suppose a retained root label $a=(i,j,n,\mu)$ is present at $\rho_-$ with root $\eta_a(\rho_-)<\eta_{\max}$, and the root continues smoothly in an extended interval

$$
\eta_a(\rho)\in(\eta_{\max},\eta_{\max}^{+})
$$

for some $\rho>\rho_-$. Then the root count computed with cutoff $\eta_{\max}$ changes even though the causal root has not disappeared. The correct failure code is

$$
\texttt{memory-window-exit},
$$

not

$$
\texttt{root-annihilation}.
$$

The proof is immediate: the zero of $G_{ij,n}$ still exists in the extended bracket, so the implicit root chart has not failed. Only the finite-memory truncation has failed.

For the $M=3$ trust path, the observed boundary is:

$$
\rho_*\in(0.32,0.34)
$$

for the $K=12/K=24$ phase row near $\lambda\approx6.9$, because

$$
\eta(0.32)\approx3.999519<4,
\qquad
\eta(0.34)\approx4.016775>4.
$$

---

## 4. Interpretation

The exact-antipodal $M=3$ route is more live than the fixed-window screen suggested. Under a deeper memory window, the tested rows preserve the $5$-$5$ source-pair count through at least $\rho=0.8$, with active delays reaching approximately

$$
\eta_{\max}^{\mathrm{active}}\approx4.4058154936
$$

on $K=24$.

This does not retain a branch. The residuals remain nonzero, the support band is wide,

$$
r_{\max}\approx2.7605787625
\quad
(\rho=0.8),
$$

and the action/memory row has changed. A retained packet must now choose one of two disciplined routes:

1. keep the old $\eta_{\max}=4$ ledger and reject radii beyond the memory-window frontier;
2. declare an adaptive memory window with root brackets beyond $\eta=4$, then rerun the rank, trust, action, and event ledgers under that deeper active-root convention.

The second route is mathematically preferable if the aim is to follow the residual descent, because the extra roots are genuine continuations of the same source-pair labels. It also carries a larger proof burden: $\Gamma_K$, history action, finite memory, and event ledgers must all use the same deeper root convention.

The corresponding theorem target is stated in [adaptive-memory-action-row.md](adaptive-memory-action-row.md): in the center-gauge rest chart, a support bound $r_{\max}$ gives the sufficient cross-site memory bound $\eta_{\mathrm{mem}}\ge2r_{\max}+m_\eta$. This converts the root-window choice from a solver cutoff into an explicit branch row.

---

## 5. Status Codes

Use the following status codes for this frontier:

$$
\texttt{m3-memory-window-exit-at-eta-4},
\qquad
\texttt{m3-extended-root-recovered},
\qquad
\texttt{m3-extended-window-descent-survives},
\qquad
\texttt{m3-adaptive-memory-row-open},
\qquad
\texttt{m3-not-retained}.
$$

The following codes remain unsupported by the refined scan:

$$
\texttt{m3-left-null-pair-even},
\qquad
\texttt{root-annihilation},
\qquad
\texttt{source-pair-pruned}.
$$
