# Conditional interval certificate for the seed-1 source-kick crossings

## Disposition

**Measured by the [independent interval checker](overnight-d-kick-crossing-independent-check.py): all 56 ordered source-kick fronts have unique transverse crossings, conditional on the exact capped receiver history lying within position error $0.1$ and velocity error $0.001$ of the retained seed-1 h4800 Hermite history.** The calculation covers every segment of the stored prefix through $t=236.16414694062496$. It does not establish that the exact history lies in this tube, does not certify the remaining ordinary-root region, and does not establish actual tail entry or escape.

A separate enlarged inventory bounds the source-kick jump correction in the receiver-translation comparison on $|\mathbf p|\le0.2$, $|\mathbf z|\le0.001$. It uses a continuous comparison history obtained by a fixed translation of each negative-time rigid reference path. This changes the reference and its initialization errors only; the prescribed exact preparation and equation remain unchanged. The resulting integrated jump budgets are conditional correction terms, not complete propagated error allowances.

## Exact-front geometry and complete event census

Fix the exact prescribed birth position $\mathbf b_j=\mathbf X_j(0)$ and define

$$
h_{ij}(t)=t-|\mathbf X_i(t)-\mathbf b_j|,
\qquad
\bar h_{ij}(t)=t-|\mathbf x_i(t)-\mathbf b_j|.
$$

The fixed birth position is shared, so $|h-\bar h|\le\epsilon_x$ rather than $2\epsilon_x$. For any capped exact receiver, $h$ is nondecreasing globally by the reverse triangle inequality; where its range is positive,

$$
h'=1-\mathbf n\cdot\mathbf V_i=D_r\ge0.
$$

Each source birth position and each left velocity were independently reconstructed from the literal radius, phase, height, and angular rate in `0186.json`, interpreted as exact parsed binary64 parameters. Sine and cosine were enclosed by degree-79 Taylor polynomials with the rigorous Lagrange remainder $|\phi|^{80}/80!$. The right exact velocity is the left velocity plus the prescribed encoded kick. Stored $X_j(0)$ was not silently identified with the exact trigonometric birth position.

For every whole Hermite receiver segment, the frozen interval primitives bound the midpoint position and velocity and their entire-segment variations using the endpoint norms of affine acceleration. Position boxes enclose the complete image of $\bar h$. A segment with upper $\bar h<-\epsilon_x$ is excluded before the crossing; a segment with lower $\bar h>\epsilon_x$ is excluded after it. The remaining segments lie inside a retained bracket with strictly negative and positive endpoint margins. Every segment preceding the bracket is certified negative and every segment following it is certified positive. Thus the event census is complete on the stored time domain; it is not a sampled root search.

On each retained bracket let $r_0$ be a lower bound on $|\mathbf x_i-\mathbf b_j|$ and let $\bar\kappa$ bound $1-\bar{\mathbf n}\cdot\dot{\mathbf x}_i$ below. The normalization inequality and the shared position tube give

$$
|\mathbf n-\bar{\mathbf n}|\le\frac{2\epsilon_x}{r_0},
\quad
|\mathbf X_i-\mathbf b_j|\ge r_0-\epsilon_x,
\quad
D_r\ge\bar\kappa-\frac{2\epsilon_x}{r_0}-\epsilon_v.
$$

The last estimate uses the true speed cap in the term involving the normal error and uses the velocity error relative to the Hermite derivative, as requested. Similarly, for either prescribed source velocity trace $\mathbf v_j^\pm$,

$$
1-\mathbf n\cdot\mathbf v_j^\pm
\ge1-\bar{\mathbf n}\cdot\mathbf v_j^\pm
-\frac{2\epsilon_x}{r_0}|\mathbf v_j^\pm|.
$$

All these estimates hold throughout each bracket, not just at the front. Positive $D_r$ there and the endpoint signs give existence and uniqueness of the exact crossing for any history in the tube. Global capped monotonicity excludes a later return to the same front. The analogous positive reference derivative and the complete sign census give a unique reference monitor crossing.

Both crossing times lie where $|\bar h|\le\epsilon_x$. Consequently the possible exact-event slab has width at most $2\epsilon_x/\bar\kappa$, and the displacement from the reference monitor event has the sharper bound $\epsilon_x/\bar\kappa$. The enclosing grid bracket can be slightly wider; the checker distinguishes its actual width from these continuous-level-set bounds.

## Measured exact-front inventory

The scan covered $959{,}448$ channel-segment boxes: $56$ channels times $17{,}133$ segments. There are $867$ retained bracket segments counted by channel. All exact-front crossing brackets lie between $4.2550444523144675$ and $13.049751714957642$.

| Certified quantity | Global bound |
| --- | ---: |
| Reference receiver factor | $\bar\kappa\ge0.6395425834829889$ |
| Exact receiver factor in the proposed tube | $D_r\ge0.6113348677974948$ |
| Exact distance to the source birth position | $r\ge4.233048922147843$ |
| Left source factor | $D_t^-\ge0.6200165204364746$ |
| Right source factor | $D_t^+\ge0.6199671490483573$ |
| Exact versus reference monitor event displacement | at most $0.15636175382629533$ |
| Width of possible exact-event slab | at most $0.3127235076525907$ |

The independent JSON retains the individual brackets, endpoint gap intervals, segment counts, and floors for all 56 channels. Several event brackets overlap. The result certifies transversality, not a fixed ordering of different channel events throughout the tube.

The exact-front coefficient floors remove the previously identified possibility of a frozen or grazing clock at source time zero within this tube. On an ordinary one-sided solution with $D_t>0$, $S'=D_r/D_t$ crosses zero transversely. The usual one-sided local construction can then be concatenated across the kick without choosing a new response law, provided the other roots, range margins, source regularity, and the finite-history tube have themselves been admitted. Simultaneous or uncertain-order crossings require consistent multi-event handling; the overlapping brackets do not authorize choosing their order from a nominal sample.

## Joining the mathematical reference continuously

The analytic negative rigid history and the encoded positive Hermite history have a small position mismatch at zero. Define the comparison reference for each source by

$$
\mathbf d_j=\mathbf X_j^{\mathrm{stored}}(0)-\mathbf X_j^{\mathrm{rigid}}(0),
\qquad
\mathbf x_j^{\mathrm{ref}}(s)=
\begin{cases}
\mathbf X_j^{\mathrm{rigid}}(s)+\mathbf d_j,&s\le0,\\
\mathbf x_j^{\mathrm{Hermite}}(s),&s\ge0.
\end{cases}
$$

The equality of the two position traces is an exact algebraic identity. Negative velocities are unchanged. The reference left trace is the analytic rigid velocity and the reference right trace is the stored $V_j(0)$, whose norms are strictly below one here. The exact negative position error is the constant $-\mathbf d_j$, the exact negative velocity error is zero, and the post-kick velocity initialization error is $(\mathbf v_j^-+\mathbf k_j)-\mathbf V_j^{\mathrm{stored}}(0)$.

**Measured by outward intervals:** the largest bound on $|\mathbf d_j|$ is $3.905159011915094\times10^{-12}$, and the largest post-kick velocity representation-error bound is $3.594631445249012\times10^{-13}$. These conservative bounds include interval inflation from evaluating the literal trigonometric data. They are not claims that the true representation discrepancies attain those values.

This repair preserves the positive Hermite path used in the tail test. It requires the eventual residual calculation to evaluate negative reference source positions on the shifted rigid path. A screen evaluated with an unshifted negative past remains a diagnostic for that different discontinuous reference and cannot silently inherit this certificate. Initialize the finite-history error envelope with the nonzero certified representation bounds, not an arbitrary smaller nominal allowance.

## Temporal mismatch lemma and its limitation

For two paths with a single transverse event, their branch labels differ only between their event times. If both branch extensions are defined and their row norms are bounded by $A_-$ and $A_+$ on the whole mismatch region, the mismatch forcing obeys

$$
\int |\mathbf g_{\mathrm{mismatch}}(t)|\,dt
\le(A_-+A_+)|t_*-\bar t_*|.
$$

This follows from the triangle inequality and the interval on which the branch indicators differ. A smaller same-state jump bound may replace $A_-+A_+$ only if it is proved throughout that entire region. Front values alone do not bound off-front branch extensions. Moreover, the reference causal front of the joined history is centered at stored $X_j(0)$, whereas the exact front is centered at the analytic birth position; comparing those two event times directly adds the known $|\mathbf d_j|$ to the position-gap allowance. The earlier $\epsilon_x$-only displacement certificate compares the exact front to its monitor with the same analytic center.

## Homotopy jump lemma and separately enlarged interval inventory

The receiver-translation identity in the [geometry comparison](overnight-d-finite-geometry-enclosure.md) uses fixed vectors $\mathbf p$ and $\mathbf z$ at each reception time. With the joined reference, a source-zero crossing along $\theta\in[0,1]$ satisfies

$$
|\mathbf x_i(t)+\theta\mathbf p-\mathbf X_j^{\mathrm{stored}}(0)|=t.
$$

For $\mathbf p\ne0$, squaring gives a quadratic in $\theta$, hence at most two isolated crossings. Endpoint roots on the same side can still produce two crossings; a temporal exact-versus-reference branch-mismatch indicator is therefore insufficient. At a crossing, $\tau=t$ and $\mathbf n$ is shared by the two one-sided limits. With $\mathbf W^\pm=\mathbf w_j(0\pm)+\theta\mathbf z$,

$$
\Delta f=\frac{\sigma_{ij}\mathbf n}{t^2}
\frac{\mathbf n\cdot[\mathbf w_j(0+)-\mathbf w_j(0-)]}{D^+D^-},
\qquad
|\Delta f|\le\frac{J_j}{t^2\delta^+\delta^-},
$$

where $J_j$ bounds the reference velocity jump. The common velocity addition cancels in its numerator. This is an exact front-jump identity, not an off-front extension estimate. Piecewise integration of the smooth translation derivative must add the signed jumps; their norm sum is bounded by twice the displayed quantity. Tangencies with no branch change add no jump. The degenerate case $\mathbf p=0$ gives no isolated translation crossings; a consistently defined source-zero trace can be used there. Endpoint and exact-front values can be treated by their declared one-sided convention, and isolated reception times do not affect the integrated energy inequality under the certified transversality.

If $|\mathbf p(t)|\le P\le0.2$, a homotopy crossing is possible only where

$$
|\bar h^{\mathrm{ref}}_{ij}(t)|
=\left|t-|\mathbf x_i(t)-\mathbf X_j^{\mathrm{stored}}(0)|\right|\le P.
$$

The new enlarged scan uses this stored center, radius $0.2$, and subtracts an additional $0.001$ from both source-factor bounds for $|\theta\mathbf z|\le0.001$. It separately certifies the whole support slab. Its global reference derivative floor is $0.6395380328398503$, left factor floor $0.5991082320125943$, and right factor floor $0.5990578425694221$. Brackets lie between $4.169658944910162$ and $13.120906304461226$; the largest continuous support-width bound is $0.6254514656834586$. The exact-receiver derivative bound from the first inventory is not being asserted for the arbitrary time-dependent homotopy translation.

Let $t_{\min}>0$, $\bar\kappa$, and $\delta^\pm$ be that channel's enlarged-slab lower bounds. The resulting adaptive integrated correction is

$$
\boxed{\displaystyle
\int J_{ij}^{\mathrm{hom}}(t)\,dt
\le\frac{4J_jP}{\bar\kappa\,t_{\min}^2\delta^+\delta^-}.}
$$

It combines at most two translation jumps per time with support duration at most $2P/\bar\kappa$. The full-slab floors remain valid for every smaller $P$. The checker records the coefficient multiplying $P$ for every channel; its largest value is $1.875997127411285\times10^{-5}$. A valid future envelope can take $P$ to be a certified maximum of $E_x^i(t)+E_x^j(S)$ over the relevant reception and source brackets, rather than always using $0.2$. This is an integrated forcing bound; it is not a pointwise homogeneous Lipschitz coefficient and must be inserted with a correct event/slab comparison argument. Growth after injection remains part of the envelope propagation.

At $P=0.2$, additionally taking the minimum with each enclosing grid-bracket width gives these receiver sums of integrated corrections:

| Receiver | Integrated homotopy jump budget upper bound |
| --- | ---: |
| 0 | $7.638416325596822\times10^{-6}$ |
| 1 | $5.243259397386311\times10^{-6}$ |
| 2 | $7.69821865678055\times10^{-6}$ |
| 3 | $7.11258551333925\times10^{-6}$ |
| 4 | $5.827215189685301\times10^{-6}$ |
| 5 | $6.422205538192643\times10^{-6}$ |
| 6 | $4.683643156499268\times10^{-6}$ |
| 7 | $3.911057454666561\times10^{-6}$ |

The jump correction assumes unique admitted auxiliary roots and the smooth derivative identity on every between-crossing homotopy piece. The enlarged front inventory does not certify those off-front root and derivative regions. Those remain independent obligations of the geometry enclosure.

## Validation and provenance

The checker imports the frozen outward interval primitives, whose arithmetic contract is recorded in the [tail interval review](overnight-d-tail-interval-independent-review-2026-10-06.md). It imports no evolution or subject diagnostic. Known cases ran before every target: exact rational primitive checks, rational Taylor references for sine and cosine, a receiver $x=3+t/4$ with analytic event time $4$, a capped receding receiver $x=t+3$ with no event, explicit factor-error subtraction, and an approaching receiver $x=3-t/2$ whose later zero range lies safely outside its event slab. No sampled speed or sampled gap was used to establish event completeness.

The new control initially encountered the frozen norm primitive's conservative subnormal square-root guard for an exactly zero vector; this checker now returns the mathematically exact zero norm in that case without changing the frozen primitive. The first target stopped because a non-event segment's position box contained zero range. Normal estimates were then restricted to the certified crossing brackets, while the valid full-domain gap boxes still exclude the irrelevant segment. The added approaching-receiver control exercises that case. Neither stop was treated as a scientific negative or silently discarded unresolved event.

The final supervised run `d4821fd1-7d5a-4510-b76b-23f1a286e166` used one worker, the shared venv, and a 180-second deadline. It completed with exit zero, elapsed supervisor wall time $1.388$ seconds, and `processGroupClosed: true`; the checker measured $1.2802$ seconds. Earlier bounded runs also closed. The full local output is `.local-data/master-equation-closure/overnight-d/kick-crossings/seed1-h4800.json`; it is local provenance, not a fresh-CI fixture.

Run controls with the shared venv and this checker path; append `--target` under the repository supervisor to reproduce the retained inventory. Its final SHA-256 is `ea6b4781df9db8bf71c508fedd8dfe02c7867ab1fdf51f5498d5cbdbbe12fafa`; the unchanged imported primitive is `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`. The output records all input hashes, including prefix NPZ `99c0555f4eb52236bcb0a3c615fb96a32a4d3a1bc488bd89081d411c62619b84`, prefix JSON `274e0fc6f36fce114848fa9b511ee213bc00ac355f23da253a4e830621488502`, and literal preparation `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d`.

Only the new checker, this review, and matching ignored results and operational receipts were written. No earlier oracle, frozen subject, shared owner, Git state, or generated artifact was modified. No additional agent was launched.

Falsifiers are a source-front event outside the retained brackets under the stipulated tube and exact cap, a nonpositive certified front factor, an interval operation violating the frozen arithmetic contract, an affine receiver translation with more than two isolated intersections of the positive-radius sphere, or a jump exceeding the derived same-front expression with its hypotheses intact. The remaining actual-entry obligation is a complete validated finite-history enclosure, including the continuous-reference initialization, residuals, off-front ordinary roots, smooth matrix bounds, and correctly propagated kick corrections. This result resolves the conditional kick-event geometry within the proposed tube; it does not establish that tube.

Final validation: controls passed again after report capture; `shasum -a 256` confirmed the retained checker and frozen imported primitive hashes above. File-scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for both new kick files (difference exit status 1). Reviewer-owned supervisor closeout returned `status: clear`.
