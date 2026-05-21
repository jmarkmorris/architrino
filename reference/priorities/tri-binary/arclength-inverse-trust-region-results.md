# Arclength-Inverse Trust-Region Results

Promotion status: `priority-only`. This packet tests whether the equal-period-restricted descent direction from [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) produces actual nonlinear improvement after clipping, length retraction, and root recomputation.

The result is positive but not retained. The restricted arclength-inverse direction gives real nonlinear descent at $K=6$, $K=12$, and $K=18$ while preserving equal period, $S_{\min}>0$, positive Jacobian margin, noncollision, and the $5$-$5$ root convention through radius $\rho=0.8$. A larger radius $\rho=1.2$ improves residuals further but loses the root-count ledger, so it is rejected.

---

## 1. Setup

Start from the equal-period projected exact-antipodal $M=2$ candidate

$$
\alpha_P.
$$

Use the arclength-inverse residual

$$
\mathcal{H}_{\mathrm{arc}}(\alpha)
=
\left(
\mathcal{R}_{\mathrm{tan}}(\alpha),
\mathcal{R}_{K}(\alpha)
\right),
$$

where

$$
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}}.
$$

The rank screen gave a restricted least-squares direction

$$
\Delta\alpha_L\in\ker D\mathbf{L}(\alpha_P)
$$

with

$$
\|\Delta\alpha_L\|\approx2.6202,
\qquad
\max_k|\Delta\alpha_{L,k}|\approx1.2809
$$

in this rescore implementation. That direction is too large to accept directly. The present test clips it to radii

$$
\rho\in\{0.01,0.02,0.05,0.10,0.20,0.40,0.80\},
$$

then retracts each trial point back to the equal-period manifold using the length row.

The retraction corrections were small. At $\rho=0.8$, the raw tangent step had

$$
\|\mathbf{L}\| \approx 0.0260,
$$

and the length retraction had norm

$$
\|\Delta\alpha_{\mathrm{ret}}\|\approx0.00538.
$$

After retraction, the length row was closed to roundoff scale.

---

## 2. $K=6$ Nonlinear Descent

On the same $K=6$ grid that supplied the rank direction, the nonlinear recomputation showed monotone descent.

| Radius $\rho$ | Residual norm | Component RMS | Tangential RMS | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{F}$ RMS | $S_{\min}$ | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| $0$ | $5.2449618188$ | $0.4370801516$ | $0.2840694568$ | $0.8267168677$ | $0.4982450480$ | $0.6903560621$ | $0.9857599789$ | $0.2925451487$ | $5$-$5$ | $0.3229992496$ |
| $0.01$ | $5.2279873733$ | $0.4356656144$ | $0.2826089181$ | $0.8242270985$ | $0.4953878100$ | $0.6932985006$ | $0.9889640444$ | $0.2925524539$ | $5$-$5$ | $0.3278194187$ |
| $0.02$ | $5.2111108343$ | $0.4342592362$ | $0.2811596436$ | $0.8217503220$ | $0.4925566898$ | $0.6962420269$ | $0.9921682522$ | $0.2925571990$ | $5$-$5$ | $0.3326382990$ |
| $0.05$ | $5.1610626946$ | $0.4300885579$ | $0.2768787918$ | $0.8143972036$ | $0.4842125929$ | $0.7050789836$ | $1.0016578798$ | $0.2925776953$ | $5$-$5$ | $0.3470873304$ |
| $0.10$ | $5.0795387083$ | $0.4232948924$ | $0.2699562206$ | $0.8023951038$ | $0.4707935018$ | $0.7198276505$ | $1.0149680949$ | $0.2926152914$ | $5$-$5$ | $0.3711444020$ |
| $0.20$ | $4.9232516644$ | $0.4102709720$ | $0.2568656530$ | $0.7793004031$ | $0.4456717007$ | $0.7493955505$ | $1.0416278318$ | $0.2927529417$ | $5$-$5$ | $0.4191712073$ |
| $0.40$ | $4.6355389669$ | $0.3862949139$ | $0.2334018478$ | $0.7364907464$ | $0.4015248591$ | $0.8086961802$ | $1.0950710119$ | $0.2934884277$ | $5$-$5$ | $0.5149110167$ |
| $0.80$ | $4.1447967550$ | $0.3453997296$ | $0.1953333036$ | $0.6626075711$ | $0.3322851770$ | $0.9279578713$ | $1.2022573776$ | $0.2976468067$ | $5$-$5$ | $0.7083388925$ |

The direction is therefore not merely a formal linear rank direction. It produces actual nonlinear descent over a substantial radius while improving $S_{\min}$, $d_{\min}$, and $J_{\min}$ on the sampled grid.

---

## 3. $K=12$ Check

The same retracted trial points were rescored on $K=12$.

| Radius $\rho$ | Residual norm | Component RMS | Tangential RMS | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{F}$ RMS | $S_{\min}$ | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| $0$ | $8.2935598352$ | $0.4887027000$ | $0.3923429415$ | $0.8952029558$ | $0.6377497575$ | $0.6904384062$ | $0.7125073672$ | $0.2925353007$ | $5$-$5$ | $0.3229992496$ |
| $0.01$ | $8.2671070257$ | $0.4871439532$ | $0.3904551744$ | $0.8926262832$ | $0.6344269476$ | $0.6932985006$ | $0.7148217612$ | $0.2925524539$ | $5$-$5$ | $0.3278194187$ |
| $0.02$ | $8.2408746199$ | $0.4855981939$ | $0.3885906295$ | $0.8900672707$ | $0.6311407053$ | $0.6962420269$ | $0.7171222826$ | $0.2925571990$ | $5$-$5$ | $0.3326382990$ |
| $0.05$ | $8.1633221747$ | $0.4810283722$ | $0.3830891003$ | $0.8824941477$ | $0.6214552664$ | $0.7050789836$ | $0.7240198100$ | $0.2925776953$ | $5$-$5$ | $0.3470873304$ |
| $0.10$ | $8.0377759232$ | $0.4736304884$ | $0.3742182101$ | $0.8702092217$ | $0.6058735017$ | $0.7198276505$ | $0.7355048126$ | $0.2926152914$ | $5$-$5$ | $0.3711444020$ |
| $0.20$ | $7.7997597596$ | $0.4596052515$ | $0.3575227648$ | $0.8468325817$ | $0.5766591586$ | $0.7493955505$ | $0.7584394546$ | $0.2927529417$ | $5$-$5$ | $0.4191712073$ |
| $0.40$ | $7.3695589872$ | $0.4342554279$ | $0.3278319264$ | $0.8042619813$ | $0.5249812386$ | $0.8083302492$ | $0.8041880103$ | $0.2934758464$ | $5$-$5$ | $0.5148350492$ |
| $0.80$ | $6.6521922424$ | $0.3919841870$ | $0.2797791589$ | $0.7323455699$ | $0.4423299501$ | $0.9272210023$ | $0.8955106014$ | $0.2975558632$ | $5$-$5$ | $0.7083002558$ |

The $K=12$ row remains positive through $\rho=0.8$. The equal-period retraction keeps the length row closed, and the active-root count remains $5$-$5$.

---

## 4. $K=18$ Off-Grid Check

Because off-grid peaks have been the recurring failure channel, selected radii were rescored at $K=18$.

| Radius $\rho$ | Residual norm | Component RMS | Tangential RMS | Tangential max | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{K}$ max | $\mathcal{R}_{F}$ RMS | $\mathcal{R}_{F}$ max | $d_{\min}/R$ | $J_{\min}$ | Root count | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| $0$ | $11.4920558215$ | $0.5529117935$ | $0.5537126280$ | $2.0955810017$ | $0.9572085097$ | $1.8460976034$ | $0.8837971640$ | $2.9281127678$ | $0.6363785568$ | $0.2925353007$ | $5$-$5$ | $0.3229992496$ |
| $0.40$ | $10.0774130727$ | $0.4848497625$ | $0.4543195874$ | $1.6217312479$ | $0.8566859876$ | $1.7106792223$ | $0.7097248290$ | $2.3086086342$ | $0.7348427868$ | $0.2934758464$ | $5$-$5$ | $0.5148350492$ |
| $0.80$ | $8.9374081330$ | $0.4300012493$ | $0.3780318107$ | $1.2630451828$ | $0.7724611626$ | $1.5951548147$ | $0.5832701328$ | $1.8477270191$ | $0.8330009620$ | $0.2975558632$ | $5$-$5$ | $0.7083002558$ |
| $1.20$ | $8.0235671105$ | $0.3860340526$ | $0.3179608207$ | $0.9957323164$ | $0.7035553109$ | $1.4952243769$ | $0.4884372729$ | $1.5018923350$ | $0.9308919560$ | $0.3050727986$ | $4$-$5$ | $0.9049759972$ |

The $\rho=1.2$ row is rejected despite better residuals because the active-root count changes:

$$
5\text{-}5\quad\longrightarrow\quad4\text{-}5.
$$

The largest acceptable sampled radius in this pass is therefore

$$
\rho=0.8.
$$

At $\rho=0.8$, the $K=18$ residual norm improves from

$$
11.4920558215
$$

to

$$
8.9374081330,
$$

a relative reduction of about

$$
22.23\%.
$$

The tangential maximum improves from

$$
2.0955810017
$$

to

$$
1.2630451828,
$$

and the reciprocal curvature maximum improves from

$$
2.9281127678
$$

to

$$
1.8477270191.
$$

The retained intrinsic curvature maximum also improves:

$$
1.8460976034
\to
1.5951548147.
$$

---

## 5. Interpretation

The equal-period-restricted arclength-inverse direction is a real nonlinear descent direction, not just a linear algebra artifact.

The new bottleneck is not local rank, equal period, or unit speed. Through $\rho=0.8$, the trial rows preserve:

$$
\mathbf{L}\approx0,
\qquad
S_{\min}>0,
\qquad
J_{\min}>0.29,
\qquad
d_{\min}>0.83R
\quad(K=18),
$$

and the active-root convention remains

$$
5\text{-}5.
$$

The remaining blocker is still finite-mode nonlinear closure:

$$
\mathcal{R}_{\mathrm{tan}}\ne0,
\qquad
\mathcal{R}_{K}\ne0.
$$

The radius $\rho=0.8$ is a useful next seed, but not a branch. It has large coefficients:

$$
\max_k|\alpha_k|\approx0.7083,
$$

and sampled support radius range approximately

$$
0.8351\le\|\mathbf{Z}\|\le2.3166.
$$

That exceeds the quiet support-band intuition of the original low-mode same-level rows. A retained packet must therefore either declare a wider support band with action/inertia consequences or continue with a smaller-radius/mode-expanded solve that achieves the same force improvement with less support growth.

---

## 6. Expansion Decision Row

If clipped trust-region improvement stalls inside exact-antipodal $M=2$, the next default expansion should be exact-antipodal $M=3$ in the arclength-inverse equal-period chart.

Reason: $M=3$ preserves exact antipodality, neutral inventory, pairwise center gauge, and the current branch class while adding higher-mode geometry. Antipodal relaxation is a stronger branch-class change and should open only after the residual split or a left-null obstruction shows a persistent pair-even component unreachable by exact-antipodal modes. Phase-diffeomorphism variables are chart variables once arclength-inverse evaluation is being used; they should not be treated as a new physical geometry direction unless the image curves and root ledger change.

The next solver target is therefore:

$$
M=3,\qquad
\mathbf{L}=0,\qquad
S_{\min}>0,
\qquad
\mathcal{H}_{\mathrm{arc}}
=
(\mathcal{R}_{\mathrm{tan}},\mathcal{R}_{K}),
$$

with roots, force, and curvature recomputed after inverse arclength reparameterization.

Failure/status codes:

$$
\texttt{restricted-trust-descent},
\qquad
\texttt{equal-period-preserved},
\qquad
\texttt{root-count-preserved-through-rho-0p8},
\qquad
\texttt{root-count-loss-at-rho-1p2},
\qquad
\texttt{support-band-growth},
\qquad
\texttt{finite-mode-nonlinear-closure-open},
\qquad
\texttt{not-retained}.
$$
