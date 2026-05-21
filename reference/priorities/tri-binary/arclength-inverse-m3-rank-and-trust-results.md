# Arclength-Inverse $M=3$ Rank And Trust Results

Promotion status: `priority-only`. This packet tests the next conservative expansion after [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md): exact-antipodal $M=3$ vector Fourier modes in the equal-period arclength-inverse chart.

No branch is retained. The $M=3$ restricted matrix has full column rank and a very small first-order range defect, and clipped steps improve the off-grid residuals while preserving the $5$-$5$ active-root convention through $\rho=0.3$ under the working root window $\eta_{\max}=4$. At $\rho=0.4$, off-grid root counts change to $4$-$5$ under that fixed window, so the larger residual improvement is rejected in this packet. The refined root-frontier packet [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) shows that the missing roots reappear for $\eta_{\max}=4.5$; the current bottleneck is therefore not local rank or root annihilation, but nonlinear root-window, support-band, and action/memory closure.

---

## 1. Chart And Seed

Use the exact-antipodal Fourier chart

$$
\mathbf{Z}_{a,+}(\theta)
=
\mathbf{Z}_{a,0}(\theta)
+
\sum_{m=1}^{M}
\left(
\mathbf{c}_{a,m}\cos m\theta
+
\mathbf{s}_{a,m}\sin m\theta
\right),
$$

and

$$
\mathbf{Z}_{a,-}(\theta)=-\mathbf{Z}_{a,+}(\theta).
$$

The $M=3$ coefficient vector has dimension

$$
3\cdot 2M\cdot 3=54.
$$

The seed is the accepted $M=2$ arclength-inverse trust row at $\rho=0.8$, embedded into $M=3$ by setting every third-harmonic coefficient to zero. This preserves the already documented seed metrics:

| Grid | Residual norm | Component RMS | Tangential RMS | $\mathcal{R}_{K}$ RMS | $S_{\min}$ | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| $K=6$ | $4.1445877938$ | $0.3453823162$ | $0.1953403385$ | $0.6625691884$ | $0.9272210785$ | $1.2020504415$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ |
| $K=12$ | $6.6522070682$ | $0.3919850606$ | $0.2797834417$ | $0.7323458041$ | $0.9272210785$ | $0.8954990374$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ |
| $K=18$ | $8.9374574420$ | $0.4300036217$ | $0.3780322295$ | $0.7724662401$ | $0.9272210785$ | $0.8330086014$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ |

The retained intrinsic row is

$$
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}}.
$$

The reciprocal row

$$
\mathcal{R}_{F}
=
\widetilde{\mathbf{F}}-\Gamma_F^{\mathrm{fit}}\mathbf{K}
$$

remains diagnostic only.

---

## 2. Equal-Period Tangent Space

Let

$$
\mathbf{L}(\alpha)
=
\left(
L_2(\alpha)-L_1(\alpha),
L_3(\alpha)-L_1(\alpha)
\right).
$$

At the embedded $M=3$ seed, the length Jacobian has singular values

$$
10.28764781,
\qquad
5.93893658.
$$

Thus

$$
\operatorname{rank}D\mathbf{L}=2,
\qquad
\dim\ker D\mathbf{L}=52.
$$

This is the first result of the screen: adding third harmonics does not create an equal-period degeneracy. The equal-period chart remains a regular codimension-$2$ manifold in the exact-antipodal $M=3$ coefficient space.

---

## 3. Restricted Linear Matrix

Define

$$
\widehat{\mathcal{R}}_3(\alpha)
=
\left(
\mathcal{R}_{\mathrm{tan}}(\alpha),
\mathcal{R}_{K}(\alpha)
\right),
$$

computed after inverse arclength reparameterization and active-root recomputation. Let $N_L$ span $\ker D\mathbf{L}$ and form

$$
A_3
=
D\widehat{\mathcal{R}}_3(\alpha_0)N_L.
$$

On the $K=6$ screen,

$$
A_3\in\mathbb{R}^{144\times52}.
$$

The finite-difference matrix has full restricted rank:

| Quantity | Value |
| --- | ---: |
| Shape | $144\times52$ |
| Numerical rank | $52$ |
| Largest singular value | $24.50400027$ |
| Smallest singular value | $0.18710689$ |
| Condition number | $130.96$ |

The top singular values were:

$$
24.50400027,\ 18.31372058,\ 16.46651313,\ 13.78421964,\ 12.44558387,\ 12.29413906,\ 11.14265863,\ 10.25921081.
$$

The bottom singular values were:

$$
0.58509573,\ 0.56988218,\ 0.50433321,\ 0.43648031,\ 0.34698465,\ 0.26517691,\ 0.21925328,\ 0.18710689.
$$

The least-squares prediction reduces the $K=6$ seed norm from

$$
4.1445877938
$$

to

$$
0.3357587601.
$$

Equivalently, the first-order column space accounts for approximately

$$
1-\left(\frac{0.3357587601}{4.1445877938}\right)^2
\approx
0.9934
$$

of the squared residual. The minimum-norm restricted step has

$$
\|\Delta\alpha_3\|\approx2.3345727952,
\qquad
\max_k|\Delta\alpha_{3,k}|\approx0.8391211106.
$$

This is a strong local direction certificate, not a branch certificate. The step remains too large to accept without trust clipping, root-ledger recomputation, and support-band accounting.

---

## 4. Nonlinear Trust Screen On $K=6$

The normalized restricted direction was clipped to radius $\rho$, then retracted back to $\mathbf{L}=0$.

| Radius $\rho$ | Residual norm | Component RMS | Tangential RMS | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{F}$ RMS | $S_{\min}$ | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient | Support $r_{\max}$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: |
| $0$ | $4.1445877938$ | $0.3453823162$ | $0.1953403385$ | $0.6625691884$ | $0.3321857543$ | $0.9272210785$ | $1.2020504415$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ | $2.3165510378$ |
| $0.05$ | $4.0583264748$ | $0.3381938729$ | $0.1908821941$ | $0.6488947300$ | $0.3242956518$ | $0.9162141382$ | $1.2063554936$ | $0.3011630987$ | $5$-$5$ | $0.7263052372$ | $2.3440902628$ |
| $0.10$ | $3.9757545728$ | $0.3313128811$ | $0.1865639291$ | $0.6358197866$ | $0.3165977439$ | $0.9041807740$ | $1.2106233215$ | $0.3047790401$ | $5$-$5$ | $0.7443749412$ | $2.3714576752$ |
| $0.20$ | $3.8211975375$ | $0.3184331281$ | $0.1783677248$ | $0.6113784287$ | $0.3017806699$ | $0.8772705858$ | $1.2190443584$ | $0.3119506381$ | $5$-$5$ | $0.7806961862$ | $2.4257116927$ |
| $0.40$ | $3.5509270388$ | $0.2959105866$ | $0.1638602482$ | $0.5686845523$ | $0.2745357127$ | $0.8148784421$ | $1.2354323759$ | $0.3258673392$ | $5$-$5$ | $0.8539834822$ | $2.5345364224$ |
| $0.80$ | $3.1512051576$ | $0.2626004298$ | $0.1419500920$ | $0.5056541449$ | $0.2294986532$ | $0.6703962905$ | $1.2666666085$ | $0.3520316916$ | $5$-$5$ | $1.0025777267$ | $2.7605787625$ |
| $1.20$ | $2.9950828285$ | $0.2495902357$ | $0.1269683371$ | $0.4827630728$ | $0.2000466897$ | $0.5196882372$ | $1.2966175003$ | $0.3522414879$ | $4$-$5$ | $1.1531295234$ | $2.9921252118$ |

The $K=6$ training screen descends monotonically. It also shows why a training grid is insufficient: the root count remains $5$-$5$ through $\rho=0.8$ on $K=6$, while off-grid rescoring below shows root-count loss earlier.

---

## 5. Off-Grid Root-Ledger Screen

The decisive rescoring was done on $K=12$ and $K=18$ using the working root window $\eta_{\max}=4$.

| Radius $\rho$ | Grid | Residual norm | Component RMS | Tangential RMS | $\mathcal{R}_{K}$ RMS | $S_{\min}$ | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient | Support $r_{\max}$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: |
| $0$ | $12$ | $6.6522070682$ | $0.3919850606$ | $0.2797834417$ | $0.7323458041$ | $0.9272210785$ | $0.8954990374$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ | $2.3165510378$ |
| $0.10$ | $12$ | $6.5093758852$ | $0.3835686525$ | $0.2678561614$ | $0.7188551464$ | $0.9041807740$ | $0.9162270079$ | $0.3047790401$ | $5$-$5$ | $0.7443749412$ | $2.3714576752$ |
| $0.20$ | $12$ | $6.3784339999$ | $0.3758528279$ | $0.2568866583$ | $0.7064493172$ | $0.8772705858$ | $0.9374185480$ | $0.3119506381$ | $5$-$5$ | $0.7806961862$ | $2.4257116927$ |
| $0.30$ | $12$ | $6.2576074645$ | $0.3687330560$ | $0.2468538974$ | $0.6949240388$ | $0.8473373682$ | $0.9590327627$ | $0.3189884707$ | $5$-$5$ | $0.8172399177$ | $2.4793876112$ |
| $0.40$ | $12$ | $6.1542578400$ | $0.3626431210$ | $0.2381633262$ | $0.6850681447$ | $0.8148784421$ | $0.9810288521$ | $0.3258673392$ | $4$-$5$ | $0.8539834822$ | $2.5345364224$ |
| $0$ | $18$ | $8.9374574420$ | $0.4300036217$ | $0.3780322295$ | $0.7724662401$ | $0.9272210785$ | $0.8330086014$ | $0.2975524017$ | $5$-$5$ | $0.7083002386$ | $2.3165510378$ |
| $0.10$ | $18$ | $8.6578224465$ | $0.4165496767$ | $0.3603668272$ | $0.7511260097$ | $0.9041807740$ | $0.8468376721$ | $0.3047790401$ | $5$-$5$ | $0.7443749412$ | $2.3714576752$ |
| $0.20$ | $18$ | $8.3938471753$ | $0.4038491605$ | $0.3432566120$ | $0.7311302730$ | $0.8772705858$ | $0.8626977117$ | $0.3119506381$ | $5$-$5$ | $0.7806961862$ | $2.4257116927$ |
| $0.30$ | $18$ | $8.1544557899$ | $0.3923314371$ | $0.3267825302$ | $0.7133785841$ | $0.8473373682$ | $0.8802942929$ | $0.3189884707$ | $5$-$5$ | $0.8172399177$ | $2.4793876112$ |
| $0.40$ | $18$ | $7.9428392554$ | $0.3821500319$ | $0.3111860422$ | $0.6980815386$ | $0.8148784421$ | $0.8993529873$ | $0.3258673392$ | $4$-$5$ | $0.8539834822$ | $2.5345364224$ |

Under this fixed root window, the largest sampled radius that preserves the off-grid active-root convention is therefore

$$
\rho=0.3.
$$

At that radius, the $K=18$ residual norm decreases by about

$$
8.76\%,
$$

from

$$
8.9374574420
$$

to

$$
8.1544557899.
$$

This is useful but not a retained dynamics solution.

---

## 6. Residual-Parity Diagnostic

In the exact-antipodal chart, the measured residual split is clean:

$$
\mathcal{R}_{\mathrm{tan}}
\quad\text{is pair-even},
\qquad
\mathcal{R}_{K}
\quad\text{is pair-odd},
$$

to roundoff scale in this evaluator. For example, at the $M=3$ seed on $K=18$,

$$
\|\mathcal{R}_{\mathrm{tan}}^{\mathrm{even}}\|_{\mathrm{RMS}}
\approx0.3780322295,
\qquad
\|\mathcal{R}_{\mathrm{tan}}^{\mathrm{odd}}\|_{\mathrm{RMS}}
\approx1.9\times10^{-17},
$$

while

$$
\|\mathcal{R}_{K}^{\mathrm{even}}\|_{\mathrm{RMS}}
\approx1.1\times10^{-17},
\qquad
\|\mathcal{R}_{K}^{\mathrm{odd}}\|_{\mathrm{RMS}}
\approx0.7724662401.
$$

This parity split does not by itself justify antipodal relaxation. The decisive trigger would be a stable left-null or residual-remainder obstruction concentrated in the pair-even rows after exact-antipodal $M=3$ has exhausted its local range. Here the $M=3$ restricted matrix has full column rank and a small first-order residual remainder. The observed failure is nonlinear root-ledger loss and support growth, not an exact-antipodal linear no-go.

---

## 7. Interpretation

The $M=3$ exact-antipodal expansion advances the proof state in three ways.

First, it shows that the equal-period arclength-inverse tangent space remains regular and locally rich:

$$
\operatorname{rank}A_3=52=\dim\ker D\mathbf{L}.
$$

Second, it improves off-grid dynamics before root loss. The accepted sampled radius $\rho=0.3$ reduces both tangential and intrinsic curvature residuals on $K=18$ while improving $d_{\min}$ and $J_{\min}$.

Third, it moves the blocker from local algebra to branch control. Under the fixed $\eta_{\max}=4$ working convention, the step that gives stronger descent also expands the support band and crosses a root-window boundary:

$$
5\text{-}5
\longrightarrow
4\text{-}5
\quad
(\rho=0.4,\ K=12,18,\ \eta_{\max}=4).
$$

The follow-up root-frontier scan shows that this is a memory-window exit: the missing same-sign binary-$3$ from binary-$2$ roots continue just beyond $\eta=4$ and are recovered by $\eta_{\max}=4.5$.

The current route is therefore:

$$
\text{continue exact-antipodal }M=3
\quad\text{with smaller trust radii, barriers, or higher-grid root guards}
$$

before opening the stronger branch-class change

$$
\text{antipodal relaxation}.
$$

Antipodal relaxation should open only if a subsequent exact-antipodal screen supplies one of:

1. a stable augmented-rank failure for $A_3$ or its refined-grid successor;
2. a left-null obstruction concentrated in pair-even rows;
3. nonlinear descent that repeatedly fails by a pair-even residual remainder rather than by support/root barriers.

Support-band growth remains a separate action-row issue. At the accepted $\rho=0.3$ row,

$$
0.8639017949
\le
\|\mathbf{Z}\|
\le
2.4793876112.
$$

At the rejected $\rho=0.4$ row, the support maximum is already about

$$
2.5345364224.
$$

A retained branch must either derive the wider support band from the scale/action ledger in [gamma-scale-action-row.md](gamma-scale-action-row.md), or find a smaller-support solve with comparable force improvement.

The successor run packet must also emit the full-precision coefficient vector, normalized restricted trust direction, clipping radius, and equal-period retraction correction. Without those data, the numerical row is a mathematical diagnostic and a continuation target, but it is not independently rerunnable as a new rank base point.

---

## 8. Status Codes

The current packet exits with:

$$
\texttt{m3-full-restricted-rank},
\qquad
\texttt{m3-linear-range-rich},
\qquad
\texttt{m3-trust-descent},
\qquad
\texttt{m3-root-count-preserved-through-rho-0p3},
\qquad
\texttt{m3-root-ledger-loss-at-rho-0p4},
\qquad
\texttt{m3-memory-window-exit-at-eta-4},
\qquad
\texttt{m3-support-traded-residual},
\qquad
\texttt{m3-nonlinear-candidate-not-retained}.
$$

The antipodal-relaxation trigger codes are not met:

$$
\texttt{m3-linear-range-defect},
\qquad
\texttt{m3-left-null-pair-even}
$$

remain `not_observed` in this screen.
