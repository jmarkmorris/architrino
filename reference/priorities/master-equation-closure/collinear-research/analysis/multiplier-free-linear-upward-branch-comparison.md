# Multiplier-free linear upward-branch comparison

## Scenario and measured comparison

The [complete selected linear law](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law) uses $c_f=1$, $k=0.2862286103053385$, held release from $x=0.5$, every earlier partner and self root, and absolute source weights. Its [postfold continuation](multiplier-free-linear-postfold-continuation.md) arrives at an upward crossing of $v=-1$ near $T_c=16.16657432$, $x_c=-9.02233775$. The [independent event theorem](multiplier-free-linear-postfold-independent-check.md#existence-of-both-upward-crossing-branches-and-uniqueness-obstruction) derives an upper finite trace and a smaller-trace family under explicit smooth-history and source-gap hypotheses. That theorem supplies the boundedness mechanism; the new numerical subject approximates selected members and checks their next events. It selects no physical branch.

The new [comparison instrument](../../../../../scripts/collinear-research/linear-upward-branch-continuation.py) produces numerical approximations to three distinct outgoing continuations:

| Continuation | Parameter at local terminal source coordinate | Next measured event | Event time, h8192 | Position | Velocity |
| --- | ---: | --- | ---: | ---: | ---: |
| Upper trace | No free parameter | Outer turn | 16.30683070384 | -9.09044890495 | 0 |
| Smaller trace, sample A | $c_0=0.001$ | Outer turn | 16.30899839261 | -9.09262409655 | 0 |
| Smaller trace, sample B | $c_0=-0.03$ | Downward speed recrossing | 16.16863799277 | -9.02440141614 | -1 |

Samples A and B use the same smaller right acceleration trace, approximately 0.00018828795, while the upper trace is approximately 7.52740728. Their numerical next events differ despite sharing that trace. The separate theorem establishes a lawful smaller-trace family; the finite-cutoff computations approximate members without an exact enclosure or exact-member certificate. These measured trajectories neither classify the whole family nor establish sample B's eventual fate. Its new downward self-birth is the next required event analysis. No cap, impulse, root suppression, damping or prescribed reversal is introduced.

## Source-coordinate equation and root completeness

Let $q=T_c-S>0$ locate the newly born self root in the incoming source, and let $\tau=T-T_c>0$. Define

$$
p(q)=-(1+v(T_c-q))>0,\qquad w=1+v(T)>0,\qquad
D(q)=P(T_c-q)-P(T_c),
$$

where $P=T+x$ and $Q=T-x$. The exact arrival relation gives receiver $P=P_c+D(q)$ and hence $x=P_c+D(q)-T$. With $H(T,P)$ the sum of the surviving older partner and self rows, the complete outgoing equations are

$$
\tau_q=\frac{p}{w},\qquad
w_q=\frac{p}{w}\left[H(T,P)-k\frac{\tau+q}{p}\right].
$$

The bracket includes the new self row with its actual negative displacement and absolute source slope $p$. The older rows solve $Q(S_p)=P$ and $P(S_s)=P$ on the earlier ascending sector. Their contributions are $+k(T-S_p)/|Q'(S_p)|$ and $-k(T-S_s)/|P'(S_s)|$. The newborn incoming-source hit supplies a second earlier solution of the self equation; it is represented explicitly by $S=T_c-q$, rather than recovered by subtracting nearly equal clock values.

Until the first turn or downward recrossing, the computed receiver has $x<0$ and $-1<v\le0$, so both receiver clocks increase. The source guards are $Q(T)>P_{\max}$, $P(T)<Q(T_c)$ and $P(T)<P_{\max}$. The complete incoming $Q$ is monotone, and the incoming $P$ has an earlier maximum followed by the minimum at $T_c$. These guards admit exactly one partner and two self roots in the incoming history. The new outgoing $P,Q$ are increasing, so their only matching same-clock hit is the excluded exact diagonal. Their $P$ is below receiver $Q$, and their $Q$ is above receiver $P$, excluding partner hits from the evolved segment. Consequently a complete frozen incoming past suffices for this bounded comparison; this is a derived availability guard, not extrapolation of source data beyond its domain.

The instrument checks these inequalities during evolution. The [independent outgoing geometry analysis](multiplier-free-linear-upward-branch-independent-check.md) derives the same complete one-partner/two-self census from the global clock hypotheses. Its statement is conditional on the entire given history, not merely on the current acceleration or a narrow source slice. Full supplied-polynomial extrema and census measurements belong to the separately owned independent audit. At the h8192 upper turn, $Q-P_{\max}\approx12.12360$ and $Q(T_c)-P\approx17.97253$; at sample B's recrossing the corresponding gaps are approximately 11.91936 and 18.04468. No earlier partner or self row is removed. If either gap closes, or a new source extremum intervenes, the frozen-source chart must be withdrawn.

A separate read-only complete-input check used the shared venv and SciPy cubic Hermite derivative-root enumeration on the hash-bound h8192 incoming $t,x,v$ arrays. Before target use it recovered the unique derivative root at zero for the exact control $f(S)=S^2$ represented by values and slopes at $S=-1,0,1$. On the entire supplied input it then returned $P$ derivative roots at 12.411882235168012 and 16.16657431666812, no $Q$ derivative roots, and initial $Q'=1$. This independently measures the complete polynomial monotonic sectors assumed by the numerical source guard. It does not establish an exact selected-release history or outgoing integrated-equation agreement.

## Supplied curvature and stable local evaluation

The supplied numerical source is a cubic Hermite position history. At the h8192 speed event its left curvature is $B_L=7.60290257907$, whereas the surviving older-row acceleration is $H_0=7.60289015654$. They remain distinct in the trace equation

$$
b=H_0-\frac{k}{B_L}-\frac{k}{\sqrt{B_Lb}}.
$$

For the final h4096 supplied source, $B_L=7.60290294579$ and $H_0=7.60289051905$. Source refinement changes these values; agreement between them is not asserted as an exact equation fact.

Within the incoming final polynomial cell, the instrument evaluates

$$
p(q)=B_Lq-\frac12Cq^2,\qquad
D(q)=\frac12B_Lq^2-\frac16Cq^3,
$$

with $C$ the source third derivative at the event. The event slope is set algebraically to its localized value zero in this centered expression, avoiding catastrophic subtraction in $P(T_c-q)-P_c$. The recorded velocity localization residual is $1.11\times10^{-15}$ for h8192 and $-5.11\times10^{-15}$ for h4096. This finite-precision event normalization is disclosed; the original histories and independent oracles remain unchanged. Outside that cell, the existing cubic polynomial source clock supplies $p,D$ directly.

## Upper trace and smaller-family boundary formulation

For $z=\tau/q$, $W=w/q$ and logarithmic coordinate $\eta=\log q$, each finite trace has $z_0=B_L/W_0$, $W_0=\sqrt{B_Lb}$. The numerical variables are relative deviations $y=(z/z_0-1,W/W_0-1)$. At the smaller fixed point their limiting Jacobian is

$$
J=\begin{pmatrix}-1&-1\\-kB_L/W_0^3&-2\end{pmatrix}.
$$

For h8192, its eigenvalues are approximately -201.94541248 and +198.94541248. Forward fixed-point seeding would amplify an uncontrolled positive-mode error and would not identify a particular family member. The instrument instead solves a mixed boundary-value problem: the stable eigencoordinate is set to zero at $q_{\min}=q_0e^{-L}$, and the positive eigencoordinate is prescribed to $c_0$ at $q_0=10^{-5}$. The latter is a terminal eigenparameter, not a finite-time velocity impulse or a physical selector.

The independent theorem's stable/unstable integral formulation explains this boundary condition. The exact bounded stable component integrates forcing from $\eta=-\infty$, whereas the positive component is prescribed at the terminal end. For smooth forcing $F(q,0)=O(q)$, omission of the stable tail at $q_{\min}$ gives an $O(q_{\min})$ boundary discrepancy, subsequently damped by the negative eigendirection. The positive mode is propagated by the boundary solve from its terminal value; it is not launched uncontrollably forward from a cutoff. This is the rigorous qualitative boundedness rationale for the method. The numerical truncation and residual below do not themselves prove an exact contracted tube, an interval enclosure or exact realization of the measured member. The exact local existence statement remains the separately derived theorem under its hypotheses.

The initial boundary interval used $L=8$, receiver tolerance $10^{-9}$ and BVP tolerance $10^{-7}$. The final interval uses $L=12$, receiver tolerance $10^{-11}$ and BVP tolerance $10^{-9}$. This changes $q_{\min}$ from $3.35\times10^{-9}$ to $6.14\times10^{-11}$. The final local reception cutoff is about $1.23\times10^{-8}$ after birth for the small-trace samples. The maximum relative tube deviation is approximately 0.025285 for sample A and 0.005709 for sample B, and final BVP RMS residuals are below $10^{-9}$. Their prescribed terminal states agree across the two cutoff settings at approximately $10^{-14}$. Such measured stability supports the cutoff approximation; no continuous error bound is inferred from the solver's RMS residual.

The absolute sign of $c_0$ relative to the fixed point is not the sign of displacement from a nonautonomous particular member. The forcing shifts that member's terminal eigencoordinate. An exploratory sample at $c_0=-0.001$ also turns; this does not contradict the recrossing sample at $c_0=-0.03$ or license a sign-only classification of the family. All parameter values and outputs are retained.

The upper fixed point has only negative-real-part eigenvalues. It is approximated at the same source cutoff by its fixed-point values and refined by reducing that cutoff; bounded forcing creates a vanishing startup defect whose negative modes decay forward. Its exact branch uniqueness is conditional on the event theorem, and the numerical startup is not treated as a proof.

## Decisive events and refinement

After the boundary solve, Radau evolves the exact source-coordinate equation. At the lower recrossing, $w\downarrow0$ makes $\tau_q$ singular. The integration changes to $w$ as independent variable once acceleration is strictly negative:

$$
\frac{dq}{dw}=\frac{w}{pA},\qquad
\frac{d\tau}{dw}=\frac1A.
$$

These equations remain regular at $w=0$ and locate the downward crossing without a velocity floor. The earlier attempt to integrate the same small sample directly to zero required a step below floating-point spacing; that failed run supplied no trajectory claim. The new coordinate was checked against an exact constant-negative-acceleration reference before its target run.

| Sample | h4096 final event time | h8192 final event time | h4096 position | h8192 position | Change from initial to final h8192 settings in event time |
| --- | ---: | ---: | ---: | ---: | ---: |
| Upper turn | 16.30683069958 | 16.30683070384 | -9.09044891446 | -9.09044890495 | $6.9\times10^{-13}$ |
| Small sample A turn | 16.30899838854 | 16.30899839261 | -9.09262410625 | -9.09262409655 | $-1.1\times10^{-12}$ |
| Small sample B recrossing | 16.16863799543 | 16.16863799277 | -9.02440142914 | -9.02440141614 | $-7.3\times10^{-12}$ |

This is measured cutoff/receiver/source refinement, not a formal convergence order. Quoted six-decimal event geometry is stable on these refinements. The [independent integral audit](multiplier-free-linear-upward-branch-integral-check.md) checks numerical equation consistency on positive-cutoff windows. The two turning samples have small refined source-time residuals; sample B's tiny clock range is outside the frozen source-time service's resolution, and its separate reception-time check retains a conditioning limitation. The conditional family counterexample is established by the independent derivation, without promoting sample B to an independently resolved integral certificate.

The final h8192 complete event ledgers are:

| Event | Channel | Source time | Absolute source Jacobian | Acceleration contribution |
| --- | --- | ---: | ---: | ---: |
| Upper turn | Partner | 8.06311083953 | 0.29934499408 | +7.88250522712 |
| Upper turn | Old self | 7.09771338219 | 1.78615931299 | -1.47574341995 |
| Upper turn | New self | 16.02624916018 | 0.99428400657 | -0.08077215845 |
| Sample A turn | Partner | 8.06308577523 | 0.29934111659 | +7.88470403282 |
| Sample A turn | Old self | 7.09770918166 | 1.78615940230 | -1.47609138724 |
| Sample A turn | New self | 16.02625670631 | 0.99423734504 | -0.08139782754 |
| Sample B recrossing | Partner | 7.80633029826 | 0.26406260925 | +9.06425834836 |
| Sample B recrossing | Old self | 7.05733096370 | 1.78690298581 | -1.45946185647 |
| Sample B recrossing | New self | 16.16656410049 | 0.00007767259 | -7.64242976661 |

All these rows have negative displacement and positive delay. Total event acceleration is about +6.325990 at the upper turn, +6.327215 at sample A's turn and -0.03763327 at sample B's recrossing. The latter reaches a new downward self-birth; a fourth incoming-source hit must appear in any finite-trace downward continuation. No postrecross trajectory is computed here. Its next obligation is that new self-birth, followed by any reception of the earlier self-source minimum; neither a later turn nor no eventual turn is asserted.

## Exact controls and retained evidence

All controls ran before targets. A piecewise source with exact parabolic minimum, curvature $B=8$ and constant older-row acceleration $H=8$ supplies exact fixed-point upper and small solutions. Their regular-singular residual and zero-parameter BVP error are at most $8.60\times10^{-12}$. A linear mixed-eigenmode BVP has exact solution $E_+c_0e^{\lambda_+\eta}$ with zero stable component; its maximum comparison error is $4.86\times10^{-13}$. The parabolic upper evolution reaches its exact outer turn to $7.88\times10^{-14}$. A constant-negative-acceleration recrossing chart has exact $q_f^2=q_i^2+w_i^2/B$ and $\tau_f=\tau_i+w_i$ for acceleration -1; its endpoint error is $2.78\times10^{-17}$. These validate algebraic modes, boundary orientation and integration-coordinate mappings on known cases; they do not independently check target root completeness.

Every final output contains the complete joined $t,x,v$ history from held release at $T=0$ through the event, separate outgoing $q,T,x,v$ arrays, the upward event and next-event endpoints. Receiver-time regression is rejected, as is every unexpected duplicate; only the exact shared BVP/evolution boundary node may be deduplicated. Valid-boundary and invalid-order controls passed before final reruns. Original earlier NPZ histories are copied by hash before reading; the original files and all earlier subjects, independent oracles and proofs are preserved. Source-coordinate output is retained because near the smaller birth trace, $P-P_c$ can be below floating-point clock resolution even while $T-T_c$ is resolved. A frozen polynomial integral audit must state its positive cutoff and conditioning reach, especially for sample B's short nearly stationary-$P$ segment. No tiny clock difference is promoted into an interval certificate.

Reproduce final settings with the shared executable venv and either incoming h4096 or h8192 postfold file:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-upward-branch-continuation.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-upward-branch-continuation.py --history .local-data/collinear-research/linear-postfold-continuation/resolved-h8192-q1e-06-tol1e-12-step0.01.npz --branch upper --logspan 12 --tol 1e-11 --bvp-tol 1e-9
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-upward-branch-continuation.py --history .local-data/collinear-research/linear-postfold-continuation/resolved-h8192-q1e-06-tol1e-12-step0.01.npz --branch small --parameter .001 --logspan 12 --tol 1e-11 --bvp-tol 1e-9
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-upward-branch-continuation.py --history .local-data/collinear-research/linear-postfold-continuation/resolved-h8192-q1e-06-tol1e-12-step0.01.npz --branch small --parameter -.03 --logspan 12 --tol 1e-11 --bvp-tol 1e-9
```

Ignored receipts and dense histories belong to `.local-data/collinear-research/linear-upward-branch-continuation/`. Each JSON records original input and subject hashes, distinct source curvature and older acceleration, terminal parameter, cutoff, BVP residual, event ledger and output. The receiver-order guard caught overlapping output grids that mapped near-identical source coordinates to the same floating-point receiver time; output grids now use disjoint boundary mesh blocks and accepted integration nodes. This corrects sample construction rather than silently discarding regressing points. Prior outputs are preserved under `preliminary-pre-clock-guard/`, and all six final trajectories were rerun after exact controls under the final subject hash. Final watched runs completed with exit zero in 1.477–6.060 seconds; the ten-second heartbeat threshold was not reached. No job remains active. This comparison adds no standing test, tracker edit, production path, generator write or Git publication.

Falsifiers are failure of the centered source-coordinate identity, a missing earlier root under the stated clock guards, failure of exact controls, loss of BVP cutoff convergence, departure from the bounded local tube without a declared continuation, or an independent integrated-equation disagreement beyond measured interpolation and conditioning limits. A finite sample does not settle all-family motion; a later claim for sample B requires the new self event to be resolved rather than omitted.
