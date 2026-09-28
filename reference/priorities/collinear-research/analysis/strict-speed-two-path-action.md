# Testing an action for both collinear paths

## Result and scope

**Derived result:** adding the two prescribed-partner variational expressions does not reproduce the causal equation used in the softened encounter. Varying a path changes both its reception of earlier emissions and the later reception of its own emissions by the partner. The second effect contributes an additional term involving a later partner position. A factor of one half fixes double counting for stationary paths but does not remove that later-path dependence for moving paths.

This rejects the candidate family specified below as a derivation of the simulated equation. It identifies no missing term in the implementation of that equation. The additional term must not be inserted into a causal simulation on the authority of this calculation. Nor does this result rule out every action, a formulation with independently evolving wake variables, or every collinear breather.

The question follows the [source-weight compatibility calculation](strict-speed-acceleration-balance.md#does-the-source-motion-weighting-survive-the-two-modifications). That calculation held the source path fixed. Here both paths may vary independently. Reflection symmetry is imposed only after deriving the two equations, so it cannot hide a contribution from one of the paths.

## The equation to be reproduced

Use $c_f=1$ and two one-dimensional positions $x_i(t)$, with $i=1,2$ and $j$ the other label. Write $v_i=\dot x_i$. The positive constants $G$ and $\ell$ are the attraction strength and introduced softening length. The equation studied in the encounter is

$$
\frac{\dot v_i(t)}{1-v_i(t)^2}=F_i^-(t),\qquad
F_i^-(t)=-\frac{U'(R_{ij}(t))n_{ij}(t)}{D_{ij}(t)},\qquad
U(R)=-\frac{G}{\sqrt{R^2+\ell^2}}.
$$

Here the earlier emission time $s=s_{ij}(t)$ solves

$$
t-s=R_{ij}(t)=|x_i(t)-x_j(s)|,
\qquad n_{ij}=\operatorname{sgn}(x_i(t)-x_j(s)),
\qquad D_{ij}=1-n_{ij}v_j(s)>0.
$$

$F_i^-$ denotes the acceleration expression before multiplication by the receiver-speed factor; the superscript marks dependence on earlier emissions. It is not a primitive force. The derivative $U'(R)=GR/(R^2+\ell^2)^{3/2}$ is positive for $R>0$.

Work on separated portions of continuously differentiable histories with sufficient additional smoothness for the displayed variations, $|v_i|\le b_*<1$, and simple interior arrival roots. The variations are smooth and supported away from the time-window boundaries. All later receptions of the varied emissions used below must lie inside the integration window. Fixed earlier histories are supplied wherever roots need them. The proof does not assign a zero-delay contact term or prove a contact continuation. Failure on this regular separated domain is sufficient to reject a candidate intended to reproduce the equation everywhere.

## The candidate and its counting factor

Define

$$
k(v)=v\operatorname{artanh}v+\frac12\log(1-v^2),\qquad
k'(v)=\operatorname{artanh}v,\qquad k''(v)=\frac1{1-v^2}.
$$

For a fixed reception window $I$, test the explicit family

$$
\mathcal S_\alpha[x_1,x_2]
=\int_I\left[k(v_1)+k(v_2)
-\alpha\{U(R_{12}(t))+U(R_{21}(t))\}\right]dt.
$$

An action here means a scalar function of complete paths whose first change under small path variations is required to vanish. This is a mathematical candidate built from the proposed equation, not an accepted physical action or a mass assignment. The constant $\alpha$ tests the counting convention: $\alpha=1$ literally adds the two prescribed-partner expressions; $\alpha=1/2$ gives the usual single pair count in the stationary comparison. Both will be checked rather than assuming either solves the problem.

## Varying the emission time as well as the positions

Let $\eta_i(t)$ denote a small change of path $i$ at the same absolute time. Vary the arrival equation at fixed reception time $t$. The emission time moves too, and its change obeys $\delta s=-\delta R$. Consequently,

$$
\delta R
=n\{\eta_i(t)-\eta_j(s)-v_j(s)\delta s\}
=n\{\eta_i(t)-\eta_j(s)\}+nv_j(s)\delta R,
$$

so

$$
\delta R=\frac{n}{D}\{\eta_i(t)-\eta_j(s)\},\qquad
\delta U(R)=\frac{U'(R)n}{D}\{\eta_i(t)-\eta_j(s)\}.
$$

The first term is the previously derived receiver variation. The second is the contribution lost when the source path is incorrectly held fixed in a two-path action. Both changes belong to the same arrival condition; no new interaction has been postulated in deriving them.

## Collecting all contributions at the time a path changes

To obtain the equation for path $i$ at time $t$, collect its reception contribution and its emission contribution. For the latter, let $\tau=\tau_{ji}(t)>t$ be the later time when the partner receives the emission from $x_i(t)$:

$$
\tau-t=R^+_{ji}=|x_j(\tau)-x_i(t)|,\qquad
n^+_{ji}=\operatorname{sgn}(x_j(\tau)-x_i(t)).
$$

The time change between emission and later reception is

$$
\frac{d\tau}{dt}
=\frac{1-n^+_{ji}v_i(t)}{1-n^+_{ji}v_j(\tau)}.
$$

Changing variables in the source-variation integral cancels its original source denominator $1-n^+_{ji}v_i(t)$. The contribution left at emission time is

$$
F_i^+(t)
=\frac{U'(R^+_{ji})n^+_{ji}}{1-n^+_{ji}v_j(\tau)}.
$$

The plus superscript labels dependence on a later reception. It does not mean a positive direction. Integrating the variation of $k$ by parts gives the complete interior first variation:

$$
\delta\mathcal S_\alpha
=\sum_{i=1}^2\int
\left[-\frac{\dot v_i}{1-v_i^2}
+\alpha\{F_i^-+F_i^+\}\right]\eta_i(t)\,dt.
$$

Thus this candidate yields

$$
\frac{\dot v_i}{1-v_i^2}=\alpha\{F_i^-+F_i^+\},
$$

whereas the simulation uses only $F_i^-$. This is the precise mismatch. On a finite window only later receptions inside that window contribute. The stated support assumptions keep all relevant receptions in the interior; the mismatch therefore cannot be attributed to a time-boundary term. If multiple later receptions were allowed, their contributions would have to be summed. Strict subfield motion makes a given emitted sphere intersect a given receiver path at most once, on the domain where that intersection exists.

The later-path dependence is a mathematical consequence of varying the complete candidate. It is not evidence that the architrino receives information from the future. It shows that this candidate does not generate the intended causal initial-history equation.

## Static normalization does not repair moving paths

For two stationary prescribed paths a distance $a>0$ apart, the right label has

$$
F_1^-=F_1^+=-U'(a).
$$

These are comparison paths, not claimed equilibria. The summed candidate with $\alpha=1$ doubles the required attraction; $\alpha=1/2$ restores its static magnitude. With that normalization the moving-path residual is

$$
\frac12(F_i^-+F_i^+)-F_i^-=\frac12(F_i^+-F_i^-).
$$

Even mirror symmetry does not make it vanish identically. On prescribed locally affine mirror paths $x_1(t)=a+bt$, $x_2(t)=-a-bt$, with $a>0$ and $0<b<1$, evaluate at $t=0$. The earlier and later ranges for label 1 are $R_-=2a/(1+b)$ and $R_+=2a/(1-b)$, giving

$$
F_1^-=-\frac{U'(2a/(1+b))}{1+b},\qquad
F_1^+=-\frac{U'(2a/(1-b))}{1-b}.
$$

They are not the same function of $a,b,\ell$. These paths test an identity; they are not evolved solutions. More generally, two paths can agree up to $t$ but differ near the later reception. They then have the same $F_i^-$ and different $F_i^+$. No fixed nonzero counting constant can eliminate that dependence over the admitted path class. A zero counting constant removes the interaction entirely.

## Independent finite-change check of the derivative

The [variation-check instrument](../../../../scripts/collinear-research/strict-speed-two-path-variation-check.py) evaluates the candidate action directly on slightly displaced prescribed paths, solves each delayed root again, and compares the centered difference of the action with the derived first variation. It imports no trajectory solver and uses no simulated encounter history. The reference is the displayed analytic variation; this is a numerical check of that derivation on declared paths, not an independent theorem proof or trajectory certificate.

Before the moving-path target, the instrument passed an exact affine-root control and a stationary-path first-variation control. The latter has the analytically known contribution from both roles and disagreed with the direct action difference by approximately $6.64\times10^{-10}$.

The target uses $G=1$, $\ell=0.5$, $\alpha=1/2$, $x_1(t)=1+0.1t$, $x_2(t)=-1-0.15t$, and reception window $[-2,4]$. These are comparison inputs, not the stationary encounter's coupling or histories. The compact displacement shape is $h(t)=(1-(t/0.4)^2)^4$ for $|t|<0.4$, zero otherwise. Path variations are $\eta_i=w_i h$. At displacement size $10^{-4}$ the results are:

| Displaced paths, weights $(w_1,w_2)$ | Derived complete first variation | Direct action difference | Prediction using only the simulated causal expression |
| --- | --- | --- | --- |
| $(1,0)$ | -0.073847729 | -0.073847726 | -0.083006622 |
| $(0,1)$ | 0.074068838 | 0.074068838 | 0.080178466 |
| $(1,-0.7)$ | -0.125695915 | -0.125695913 | -0.139131548 |

The largest discrepancy between the complete derivative and direct action difference is below $2.40\times10^{-9}$ at that displacement size. The causal-only expression fails these comparisons by much more. Larger displacement checks at $10^{-3}$ and $3\times10^{-4}$ also support the complete derivative; rounding and quadrature errors need not decrease monotonically at the smallest displacement. Outputs are retained under `.local-data/collinear-research/finite-contact/two-path-variation/`.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-two-path-variation-check.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-two-path-variation-check.py --target
```

## Consequence for the breather investigation

This candidate action route is closed negatively: it does not justify the implemented causal softened equation. The equation remains a proposed response law with measured crossing and return behavior. The calculation supplies no reason to insert the extra term, tune the source weight, or claim that a breather is impossible.

An action is also not a prerequisite for asking whether the equation admits bounded repeated motion. That question can be addressed directly. The next useful target is a necessary balance over a repeat cycle of the causal equation, using the [existing changing-potential identity](strict-speed-acceleration-balance.md#an-exact-identity-connecting-this-to-the-changing-potential). A periodic path must repeat its relevant history, not merely its instantaneous position and speed. Establishing or excluding such a cycle is closer to the breather objective than testing further arbitrary action candidates. This is a recommendation, not a claim that the current balance already excludes every cycle.

**Falsifier and limits:** an error in the emission-time variation, the time-change factor, or the complete first variation would overturn this rejection. A counterexample to the static or moving-path controls would likewise require revision. A different action with explicitly stated extra variables, constraints, or variation rules lies outside the tested family and must be assessed separately. The result supplies no verdict on the whole theory or on the existence of a breather under a different justified law.
