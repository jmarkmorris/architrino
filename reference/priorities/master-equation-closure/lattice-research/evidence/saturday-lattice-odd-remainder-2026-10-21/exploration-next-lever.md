# Exploration after chunk 2: which term limits the signed estimate, and why a row-wise split does not remove it (2026-10-21)

**Status: exploration, not evidence, and not reviewed.** This record keeps three floating explorations run after the chunk-2 instrument, so that the next estimate can start from them. None of their numbers is a bound, none is quoted as a result in the reviewed notes, and none was checked by Codex. The scripts and outputs are in `.tmp/saturday-agents-2026-10-21/lattice/` and `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/`; each ran through the owned-compute supervisor, and one disclosed completed run is retained for each.

| Exploration | Script (SHA-256) | Run id, requested | Output (SHA-256) |
| --- | --- | --- | --- |
| x5 | `explore5.py` (`ac98d67e…d5b7`) | `a40e1911-baf4-4f6e-a660-9fd21a8c4a2e`, 03:18:02Z | `x5.out` (`ef965dc0…413`) |
| x6 | `explore6.py` (`a7ee3a1a…27b`) | `342811b1-efce-4d5e-907f-8da15b8208a5`, 03:19:40Z | `x6.out` (`1befa804…614`) |
| x7 | `explore7.py` (`6c50bcc2…5b7`) | `9f7f041c-beaf-4c0b-8543-af077463dba1`, 03:30:43Z | `x7.out` (`a9a564a8…48e`) |

## 1. The largest remaining part is the envelope variation inside the brackets (x5)

At the accepted-chart endpoint $(d,y)=(0.053,0.0070225)$ of the chunk-2 estimate $F_{\rm odd}$, the largest monomial of the accepted bracket polynomial of Lemma L.3 is $A\,q$, coefficient $0.9803$ (with $q=\mu_*d$), contributing about $0.00180$ of the total $C_LF_{\rm odd}\approx0.00687$; the next is $A\,y$ (coefficient $2.6119$, about $0.00069$). The $A\,q$ term is the receiver displacement times the envelope variation $D_\ell$ across a mirror pair, which Lemma L.3 bounds by $r/20$ of the seed bound. Ranking by hypothetical deletion in the all-chart lower envelope of Proposition H (orientation for an invalid estimate): the certified reach $0.0805$ would move to $0.105$ without the brackets, $0.1085$ without the receiver cubic and $0.091$ without the signed odd main term.

## 2. The envelope-gradient term has a small signed lattice tensor (x6)

The pair's envelope-variation bracket $B_D=[f_\ell(\alpha,\bar\Phi+D)-f_\ell(\alpha,\bar\Phi)]-[f_\ell(-\alpha,-\bar\Phi+D)-f_\ell(-\alpha,-\bar\Phi)]$ has the exact bilinear leading term $4Q_\ell^{\rm pol}((\alpha,\bar\Phi),(0,D))$, where $Q_\ell$ is the quadratic coefficient of the row along the amplitude line (the order-two coefficient in the proof of Lemma O.1). The quadratic part in $D$ cancels between the two brackets. For a pure staggered mode, $D_\ell\approx-\sigma_i\sigma_\ell\Lambda^ke^{-\Lambda r}M\ell$ with $M$ the spatial gradient of the envelope, $\lVert M\rVert\le\rho_Pd/20$. Summed over the lattice, the receiver part is $-2\sigma_i\mathcal G_1[\alpha,M]$ with a cubic-invariant tensor $\mathcal G_1$. A floating sample over unit $\alpha$ and orthogonal $M$ gave $\sup\lvert\mathcal G_1\rvert\approx2.01$, so the signed coefficient of $A\,d$ would be about $2\cdot2.01\,\rho_P/20\approx0.186$, against $0.9803\,\mu_*\approx0.90$ for the accepted absolute bound. The component bound of the kind used in Lemma O.3 for a matrix argument, $\lvert\kappa_1-\kappa_A-\kappa_B-\kappa_C\rvert+3\lvert\kappa_A\rvert+\lvert\kappa_B\rvert+\lvert\kappa_C\rvert$, gives about $3.39$ (x7), a weaker but rigorous norm bound once the components are enclosed.

## 3. A row-wise even/odd split loses the gain (x7)

Writing each pure-seed row as half its odd part plus half its even part, $f_\ell=\tfrac12\mathcal O_\ell+\tfrac12\mathcal E_\ell$, makes the quadratic sum exact: by the parity $Q_{-\ell}=-Q_\ell$, only the envelope-gradient cross term survives. But the fourth-order even remainder $\mathcal E_\ell-2Q_\ell$, bounded row by row in absolute value, contains no envelope factor, and its parity cancellation between $\pm\ell$ is lost. In the draft instrument (`row_barrier_draft.py` in the scratch folder, SHA-256 `b28e80bb…ca3e`, never run formally) its half-sum at $(0.053,0.0070225)$ was about $0.00135$, comparable to the signed cubic main term, and the row-wise estimate passed at $0.053$ only as narrowly as $F_{\rm odd}$ and failed on the chart $(1/12,0.3)$ at $0.064$, where $F_{\rm odd}$ passes.

## 4. The precise missing estimate

A bound
$$
\bigl\lvert B_D-4Q_\ell^{\rm pol}\bigl((\alpha,\bar\Phi),(0,D)\bigr)\bigr\rvert\le C_1\,m^2\,\lvert D\rvert_3+C_2\,m\,\lvert D\rvert_3^2,
$$
uniform over the tube, where $m=\lvert\alpha\rvert+P$ and $\lvert D\rvert_3$ bounds $D$ and its first three time derivatives on the source window, would keep the envelope factor $r/20$ in every remainder term. It is the analogue of Lemma L.2 for the source-history derivative of the row: the two sampling-time shifts and the two root perturbations must be expanded to second order in $D$ and to first order in the receiver and source sizes, as Lemma R does for the odd part. With the signed tensor $\mathcal G_1$ in place of the $A\,q$ bracket term, the orientation figures above suggest a saving of about $0.0008$–$0.0014$ in $C_LF$ at $(0.053,0.0070225)$, worth a seed-size gain of a few percent inside the accepted chart, where the speed cap $3/16$ then binds, and somewhat more on larger charts.
