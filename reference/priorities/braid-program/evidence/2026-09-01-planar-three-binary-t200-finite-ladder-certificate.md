# Planar Three-Binary T200 Finite-Ladder Certificate

Date: 2026-09-01
Status: accepted finite computer-assisted certificate
Claim grade: computer-assisted derived finite zero census
Subject: equal-radius, regular-phase planar common-center three-binary circular acceleration ledger with $c_f=1$

## Decision

The ordinary topology cells T00 through T200 now have a continuous-domain zero census. The earlier accepted certificate covers T00 through the declared $eta_f=20$ boundary. A new source-bound T36 transition certificate covers the remainder of T36 through its right fold at

$$
\beta_{36}=20.3958325218432359865221830823630531\ldots,
$$

and a new T37-through-T200 certificate covers every later ordinary cell through the right fold of T200 at

$$
\beta_{200}=106.285847116555051360793084482450534\ldots.
$$

Exactly one simple tangential zero with strictly inward radial coefficient occurs in every even cell T02 through T200. No tangential zero, including no even-multiplicity touching zero, occurs in T00, T01, or any intervening odd cell through T199. Every T38-through-T200 zero bracket strictly contains the decimal speed in its tracked source configuration and reproduces the exact directed-root count $12t+24$ for cell T$t$.

Plainly: the one hundred displayed modes are now the complete answer on their entire finite topology range. There is no hidden extra balance between them through T200. This does not prove that the pattern continues forever.

## Independent Interval Method

The tracked oracle [certify_planar_three_binary_equal_radius_ladder.py](../../../../scripts/equation-mapping/certify_planar_three_binary_equal_radius_ladder.py) implements the accepted integer-level equation directly,

$$
F_{\beta_f}(v)=\beta_f\sin v-v=\frac{m\pi}{6},
\qquad 0<v<\pi,
$$

without importing the prescribed-path search implementation. Strict concavity,

$$
F_{\beta_f}''(v)=-\beta_f\sin v<0,
$$

limits every admissible level to one rising and one descending root. Point solves propose root locations only. Outward-rounded endpoint signs and a fixed root-Jacobian sign certify each branch enclosure. Fold neighborhoods are discharged by proving that the fixed-sign newborn contribution exceeds an outward-rounded absolute bound on every pre-existing branch. On the compact remainder of each topology cell, every accepted interval box has either a sign-definite tangential ledger or a fixed-sign derivative with endpoint signs that prove zero absence or uniqueness. The oracle fails closed on an unresolved root, fold neighborhood, transversality interval, ledger box, derivative box, radial sign, source inclusion, or resource limit.

Plainly: this is an interval proof over continuous speed cells, not a dense grid. A point evaluator suggests where a root lies, but directed interval arithmetic must prove the root and prove that no other crossing was missed.

## Certified Results

The T36 transition run processed 29 boxes to maximum depth 14 and certified the known T36 zero across the full cell remainder. Its minimum branch-transversality lower bound is

$$
0.0017448239837598626836226887497826043\ldots.
$$

The T37-through-T200 run certified 164 topology cells: 82 zero-free odd cells and 82 unique-zero even cells. It processed 3,996 boxes to maximum depth 20; no topology used more than 41 boxes. The minimum branch-transversality lower bound over the compact covers is

$$
0.0003271929917670244492465750663007342\ldots.
$$

Across the 82 newly certified zeros, the smallest derivative lower bound is greater than $123570.1889365177$, and the largest radial upper bound is less than $-32.0093606021$. At T200 the certified speed bracket is

$$
105.7622250967279728634247711890597020351900\ldots
<\beta_f<
105.7622250967279728634247711890597020355841\ldots,
$$

which strictly contains the tracked T200 source coordinate.

Plainly: all certified zeros are simple and have a compatible positive circular scale. The proof becomes more finely resolved at high topology but retains a positive distance from every causal fold.

## Source And Artifact Binding

The oracle is tracked at SHA-256 `98dd98c858adc6f38b846e4691a56f298ab7f23c48723331a51f660be2667b4d`. It binds the unchanged accepted scalar theorem evidence at SHA-256 `1669066391ac4ba783be843b7f77fa11d3d9c3332085d3cbea570b8cc2ae3e54` and the ordered collection of 100 tracked balance configurations at collection SHA-256 `065049558c1303a6d38ecd76fcb001b882019498c3590a7972ef6cf05094d9ce`.

The verbose receipts remain in ignored analytical storage:

| Receipt | SHA-256 | Bytes | Lines |
| --- | --- | ---: | ---: |
| `.local-data/braid-analysis/b13-velocity-search/2026-09-01-planar-three-binary-equal-radius-t36-transition-interval-certificate.v1.json` | `040589a0f21f51223abc3a82e9dc6ee32ed9a49d121c73ad4ecf72b29bd76114` | 5,148 | 113 |
| `.local-data/braid-analysis/b13-velocity-search/2026-09-01-planar-three-binary-equal-radius-t37-t200-interval-certificate.v1.json` | `6f8d68a6c8c0f381a56d135be44eedd88d854b4928179ef386df1459e82a2934` | 297,750 | 8,249 |

Reproduce them with:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_planar_three_binary_equal_radius_ladder.py --first-topology 36 --max-topology 36 --output .local-data/braid-analysis/b13-velocity-search/2026-09-01-planar-three-binary-equal-radius-t36-transition-interval-certificate.v1.json
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_planar_three_binary_equal_radius_ladder.py --first-topology 37 --max-topology 200 --output .local-data/braid-analysis/b13-velocity-search/2026-09-01-planar-three-binary-equal-radius-t37-t200-interval-certificate.v1.json
```

Plainly: Git retains the proof program and compact receipt, while the reproducible per-box ledger remains outside the tracked branch.

## Claim Boundary And Remaining Blocker

This certificate upgrades the finite T02-through-T200 list from existence-only above $eta_f=20$ to complete-simple-ledger uniqueness on every ordinary cell through T200. It does not establish any result in T201 or later cells, nor release, retention, perturbation stability, binding, transitions, a physical energy spectrum, score, or scientific acceptance.

The global equal-radius ladder theorem remains open. Its exact remaining blocker is now a uniform analytic tail beginning immediately after the T200 right fold. That proof must bound the old-root background, newborn pair, and their derivatives uniformly in the topology index and must prove the alternating one-zero/no-zero disposition in every later cell. Finite extension to a larger topology index would move the boundary but would not close the infinite theorem.

Plainly: the finite uncertainty has been removed for every displayed mode. What remains is an all-later-cells theorem, not another search for the first hundred balances.

## Falsifier

A missed admissible level, failed branch endpoint sign, root-Jacobian interval containing zero, unresolved fold neighborhood, extra tangential zero, missing predicted zero, non-simple accepted zero, non-inward radial coefficient, accepted source coordinate outside its certified bracket, mismatched directed-root count, failed outward rounding, or failed reproduction under the bound arithmetic kernel overturns the corresponding finite claim.

Closure goal: join this complete T00-through-T200 finite certificate to a uniform analytic proof for every later topology cell.
