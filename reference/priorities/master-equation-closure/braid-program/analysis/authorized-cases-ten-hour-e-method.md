# Finite-history certificate for the original E+M four-member perturbation

## Case and evidence boundary

The selected target is exactly the E+M positive constant-offset member in [the retained perturbation owner](maxwell-shaped-overnight-coupled-perturbations.md). This analysis seeks a rigorous finite nonlinear departure bound for that member. The existing exact-circle balance and Cartesian instability certificates remain separate results. No generic small-amplitude theorem, altered history, extra member, or speed-margin knot is substituted for the target.

Set $K=c_f=1$, $\beta=0.429117161835$, $r=2.559210616145$, $\omega=\beta/r$, and $\epsilon=10^{-4}$. The fixed labels have polarities $(+,-,+,-)$. The complete old paths are

$$
\mathbf C_j(T)=r(\cos(\omega T+j\pi/2),\sin(\omega T+j\pi/2),0)+\epsilon r\mathbf w_j,
\qquad \mathbf w_0=(1,0.7,1.3),\quad \mathbf w_1=\mathbf w_2=\mathbf w_3=0.
$$

All printed decimals denote their exact real decimal values in this mathematical case; machine approximations must be enclosed as errors. At reception zero the complete old-tail causal roots determine the selected acceleration $F_j$. Define $\Delta\mathbf a_j=F_j-\mathbf C_j''(0)$ and the exact common patch width from the owner,

$$
\delta=\min\left\{\frac{\tau_{\min}}8,\frac{1-\beta}{12a_{\max}},\sqrt{\frac{d_{\min}}{16a_{\max}}}\right\},
\quad a_{\max}=\max_j\|\Delta\mathbf a_j\|,\quad
 d_{\min}=\sqrt2r-2\epsilon r\sqrt{1+0.7^2+1.3^2}.
$$

Here $\tau_{\min}$ is the minimum old-tail partner delay, and a zero maximum correction removes its denominator terms. The complete prescribed history is $\mathbf C_j(T)$ before $-\delta$ and $\mathbf C_j(T)+\Delta\mathbf a_jT^2(1+T/\delta)^3/2$ on $[-\delta,0]$. This is a $C^{2,1}$ history: position and its first two derivatives are continuous, and acceleration is Lipschitz. The third derivative can jump at the patch boundary and at release. Exact endpoint compatibility follows because launch roots sample the unchanged older tail. The base decimals approximate the independently certified circle; no spectrum is assigned to the rounded base.

The equation is exactly [Sections 7–8](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response). At a positive-delay root $S$, let $R=T-S=\|\mathbf X_i(T)-\mathbf X_j(S)\|$, $\mathbf n=(\mathbf X_i-\mathbf X_j)/R$, $\mathbf v=\mathbf X_j'(S)$, $\mathbf a=\mathbf X_j''(S)$, $\mathbf u=\mathbf X_i'(T)$ and $D=1-\mathbf n\cdot\mathbf v$. Then

$$
\mathbf F_i=\sum_{j\ne i}(-1)^{i+j}L_{\mathbf u}\left[\frac{(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)}{R^2D^3}+B_E\mathbf a\right],
\quad L_{\mathbf u}\mathbf z=(1-\mathbf u\cdot\mathbf n)\mathbf z+\mathbf n(\mathbf u\cdot\mathbf z),
$$

$$
B_E=\frac{(\mathbf n-\mathbf v)\mathbf n^{\mathsf T}-DI}{RD^3}.
$$

The complete strict-speed history excludes positive-delay self roots geometrically and gives exactly twelve directed partner roots while separation is positive. Delayed source acceleration is retained. There is no boundary response at unit speed.

## Frozen proof method before new target evaluation

Status: ◐ Partial — independently submitted for method admission; no new numerical target evaluation has been performed by this worker.

The subject trial is the existing retained full Cartesian quintic path in the ignored evidence owner, `maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json`, restricted to a finite horizon no later than $10r$. Its independently compared early interval is documented in [the independent ring source](maxwell-shaped-overnight-independent-ring.md#short-cartesian-method-comparison). The independent comparison is a numerical cross-check, not a trajectory enclosure. Every retained number, interpolation formula, launch mismatch and source identity must be frozen before use. Exact rational Hermite reconstruction from stored position, velocity and acceleration endpoints is a possible certificate trial; any difference from machine-evaluated history is included in the proof and cannot change the physical past.

A proof proceeds by positive-delay steps. Let $\widehat{\mathbf X}$ be the trial and let $e_x,e_v,e_a$ enclose its errors against the actual solution on the completed source history. The root-shift estimate follows from the monotonic causal gap. With source speed bounded by $b<1$, the shift obeys

$$
|S-\widehat S|\le\frac{e_{x,i}(T)+e_{x,j}(\widehat S)}{1-b},
$$

provided the errors cover the full source interval between the two roots. Source acceleration is split at the actual root,

$$
\|\mathbf X_j''(S)-\widehat{\mathbf X}_j''(\widehat S)\|
\le e_{a,j}(S)+J_j|S-\widehat S|,
$$

where $J_j$ bounds the trial's acceleration Lipschitz constant across every crossed segment and seam. Corresponding position and velocity bounds use the trial velocity and acceleration bounds. This avoids requiring a derivative of the unknown error history. It does require completed acceleration-error bounds, a whole-interval trial defect, and continuous root coverage.

The proposed residual instrument evaluates the exact rational trial and the explicit full response with directed interval arithmetic. To avoid mistaking sampled residuals for a supremum, a Taylor bound for the residual on every reception cell must cover the full cell and every source segment it touches. Polynomial seams are split or enclosed explicitly. The retained sampled defects and exact-circle acceleration gain $q<0.80$ are not substituted for these bounds.

The finite target is a lower bound on distance from the exact circular orbit. Define the two member diagonals $\mathbf A=\mathbf X_0-\mathbf X_2$ and $\mathbf B=\mathbf X_1-\mathbf X_3$, and $H=\mathbf A\cdot\mathbf B$. For every translated and spatially rotated exact square of radius $r_*$, the diagonals are perpendicular and each has length $2r_*$. If $d$ is the largest member distance from such a configuration, then

$$
|H|\le 2d\,\|\mathbf B\|+4r_*d,
\qquad d\ge\frac{|H|}{2\|\mathbf B\|+4r_*}.
$$

Indeed, subtract the comparison diagonals $\mathbf A_*,\mathbf B_*$ and use $\|\mathbf A-\mathbf A_*\|,\|\mathbf B-\mathbf B_*\|\le2d$ in $H=(\mathbf A-\mathbf A_*)\cdot\mathbf B+\mathbf A_*\cdot(\mathbf B-\mathbf B_*)$. The lower bound is valid for arbitrary three-dimensional deformations. It does not discard the target's normal component or constrain its evolution. The initial distance upper bound is $\epsilon r\sqrt{1+0.7^2+1.3^2}+|r-r_*|$ by choosing the same initial phase and center. A useful certificate must exceed that initial upper bound, preferably by a factor of two, rather than merely certify that the supplied nonzero perturbation is nonzero.

Stopping conditions are the first proof-domain failure, a certified departure threshold, or the selected finite horizon. A failed enclosure is a limitation of this proof method unless an actual physical domain event has separately been enclosed. A unit-speed event requires a continuous crossing certificate; the retained $0.999$ knot does not establish one. Radius decrease establishes neither capture nor binding.

Claim grade: derived for the displayed root-shift, acceleration-transport and diagonal inequalities under their stated premises; guessed for numerical feasibility of closing the finite certificate. Falsifiers are a root shift outside the monotonic-gap bound, a trial acceleration seam not covered by $J_j$, an omitted source acceleration contribution, a false whole-cell defect bound, or a configuration violating the diagonal inequality. The separately assigned independent worker freezes a mathematical reference before reading new subject conclusions. No numerical certificate is claimed by this method record.
