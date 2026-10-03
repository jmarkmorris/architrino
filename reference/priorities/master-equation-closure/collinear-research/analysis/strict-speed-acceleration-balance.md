# Where the higher return speed comes from in the softened encounter

> **Quarantined special examination — inactive.** This audit diagnoses saved paths of the softened equation with the added quadratic receiver multiplier. Its factor comparisons and action discussion do not select a response law for current or later scenarios. The original analysis is preserved; its recommendations are historical and inactive, and reuse of the modified equation requires explicit operator re-selection. See the [collinear quarantine disposition](../README.md#quarantined-quadratic-response-examinations).

## Scope and result

This 2026-09-27 audit keeps the equation and recorded trajectories unchanged. It examines the $\ell=0.5$ stationary encounter through its second crossing, using both saved time steps from the [extended experiment](strict-speed-finite-contact-passage.md#extended-runs-and-the-first-two-turns). The question is how the distance response, source-motion weighting and proposed receiver-speed multiplier contribute to the different first and second crossing speeds.

**Measured result on the saved histories:** the distance contribution alone favors outgoing braking over acceleration during the return. The source-motion weighting reverses that balance. The receiver-speed multiplier reduces the resulting excess but does not eliminate it. The integrated complete acceleration agrees with the recorded velocity changes to about $1.02\times10^{-7}$ or better for each phase of the finer history. This accounts for the observed speed gain within the proposed equation; it does not establish its physical correctness or independently validate the full evolved trajectory.

## The three factors and what is compared

Follow the label that starts at $x=+0.5$. Let $v=x'$, and solve the original delayed arrival equation on the saved history. With $d=x(T)+x(S)$ and $T-S=|d|$, define

$$
A_0=-\frac{Gd}{(d^2+\ell^2)^{3/2}},\qquad
W=\frac{1}{1+\operatorname{sgn}(d)v(S)},\qquad
m=1-v(T)^2,\qquad A=mWA_0.
$$

$A_0$ includes polarity, coupling and the softened distance-and-direction term. $W$ accounts for source motion at emission. $m$ is the proposed receiver-speed factor. All quantities use $c_f=1$ and the original coupling product. The partner's velocity at emission is $-v(S)$.

Integrate $A_0$, then $WA_0$, then $mWA_0$ over each phase, always on the same recorded path. Only the last integral is the actual velocity change of that run. The earlier columns show how the factors alter its accumulated acceleration; they are not reruns with factors removed. Removing a factor from the dynamical equation would also change the history, distance and subsequent arrival times. The chosen order is explicit because a decomposition of multiplicative factors is not a unique attribution of causality across different models.

## Accumulated acceleration by phase

Entries are magnitudes in the direction of the acceleration for that phase. Initial acceleration is leftward; outgoing braking and return acceleration are rightward.

| Phase | Time interval | Distance term alone | With source-motion weighting | With both source and receiver factors | Recorded speed change |
| --- | --- | --- | --- | --- | --- |
| Initial approach to first crossing | 0 to 2.054357 | 0.552029 | 0.663079 | 0.580409 | Gain 0.580409 |
| Outward motion, braking to first turn | 2.054357 to 11.768426 | 0.944870 | 0.663080 | 0.580409 | Loss 0.580409 |
| Return from first turn to second crossing | 11.768426 to 22.190686 | 0.599962 | 0.797832 | 0.662823 | Gain 0.662823 |

The last two rows traverse the same spatial interval in opposite directions. Their delayed source histories differ. The distance-only accumulated braking, 0.944870, exceeds the distance-only return acceleration, 0.599962. Applying source weighting reduces the former to 0.663080 and increases the latter to 0.797832. Applying the receiver factor reduces both, leaving braking of 0.580409 and return acceleration of 0.662823. Their difference, approximately $0.082414c_f$, is the increase between first and second crossing speeds.

On this path, the source-weight contribution changes the distance-only difference from approximately $-0.344908$ to $+0.134752$. The receiver factor then reduces the excess by approximately 0.052338, leaving approximately 0.082414. It therefore does not directly add the excess in this fixed-path comparison, although it helped determine the path on which these quantities are evaluated.

The source weight ranges from about 0.633 to 1 during outgoing braking. During the return it ranges from about 0.923 to 2.966. The beginning of the return still receives some emissions from the partner's earlier outward motion, so the weight need not exceed one immediately when the receiver turns. Later, emissions from the partner's inward motion increase the weighting. This delayed change is why the current velocity alone cannot determine the arriving acceleration.

## An exact identity connecting this to the changing potential

On the regular separated chart, write

$$
F=WA_0=-\partial_x\Phi,\qquad
\Phi=-\frac{G}{\sqrt{R^2+\ell^2}},\qquad
K(v)=-\frac12\log(1-v^2).
$$

$K$ is a convenient scalar function of speed for this audit, not an assertion of primitive kinetic energy. Direct differentiation of the proposed equation gives

$$
\frac{dK}{dT}=vF,\qquad
\frac{d}{dT}(K+\Phi)=\left.\partial_T\Phi\right|_x.
$$

The time derivative on the right holds the receiver position fixed while the arriving source history changes. On the mirror history it is

$$
\left.\partial_T\Phi\right|_x=-Fv(S).
$$

This follows by differentiating $R=|x-X_j(S)|$ and $S=T-R$ at fixed $x$, using $X_j'(S)=-v(S)$. It is not an additional acceleration term. The full receiver gradient was already included in $F$.

At both crossings $R=0$ and the continuous potential limit is the same value, $-G/\ell$. Consequently its net change between crossings is zero, but $K$ increases. On the finer saved path, the independently reevaluated time-dependent potential term integrates to approximately $+0.281790$ during departure and $-0.197870$ during return, leaving $+0.083920$. The endpoint change in $K$ is approximately $+0.0839195$. The residual is about $6.08\times10^{-7}$.

Thus equal potential values at two crossings do not imply equal speed. The scalar potential is changing with the moving source history between them. A local potential-gradient representation does not supply a conserved source-plus-wake account, and no such account was derived for the added speed factor and softened interaction. This identity diagnoses the implemented rule without importing mass or an ordinary-mechanics energy law.

## Instrument, controls and limitations

The [read-only acceleration audit](../../../../../scripts/collinear-research/strict-speed-acceleration-audit.py) imports no trajectory-solver component. It reconstructs the delayed source time by bisection, using interpolation of stored position and the saved auxiliary velocity variable. It then independently reevaluates the factors, inserts the recorded event times, and integrates by the trapezoidal rule. This checks the stated expression on the stored histories, not a separately evolved solution.

Before the target histories were read, the instrument passed a stationary-source analytical acceleration/root control, an affine-history analytical root, a separately finite-differenced fixed-position potential-time derivative, an exactly integrable affine quadrature, and the derivative of $K$. The potential-time control discrepancy was about $1.74\times10^{-12}$. The trajectory instrument and its reference controls were not modified.

Both saved resolutions give the same imbalance. For $h=1/1024$, the largest phase mismatch between integrated acceleration and recorded velocity change is about $8.39\times10^{-7}$; for $h=1/2048$ it is about $1.02\times10^{-7}$. The changing-potential identity has a between-crossings residual of about $1.13\times10^{-6}$ and $6.08\times10^{-7}$, respectively. These are consistency residuals, not continuous error bounds. A different root census, an independent accurate trajectory with a different acceleration balance, or failure of the displayed derivative identity under the same assumptions would challenge the corresponding conclusion.

Input receipts and trajectories are under `.local-data/collinear-research/finite-contact/extended/`; audit outputs are under `.local-data/collinear-research/finite-contact/acceleration-audit/`. Reproduce with the shared Python environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-acceleration-audit.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-acceleration-audit.py --receipt .local-data/collinear-research/finite-contact/extended/ell-0.5-h2048-t200.json --out .local-data/collinear-research/finite-contact/acceleration-audit/h2048.json
```

## Does the source-motion weighting survive the two modifications?

**Derived answer, conditional on the stated emission and reception law:** yes. Softening the distance response does not change the factor that counts arriving emissions. Multiplying the received acceleration by the proposed receiver-speed factor also leaves that count unchanged. Neither fact derives the two modifications from the Master Equation or supplies a conserved account of both paths and their wakes.

This distinction matters for the preceding audit. Identifying the factor that reverses the measured balance does not identify an erroneous factor. Its mathematical origin must be checked separately from whether the resulting paths bind.

### Counting the arriving emissions

Use $c_f=1$. At fixed receiver position $\mathbf X$ and time $T$, let $S$ label an emission, $\mathbf r=\mathbf X-\mathbf X_j(S)$, $R=\|\mathbf r\|$, and $\mathbf n=\mathbf r/R$. The arriving emission satisfies $g(S)=R-(T-S)=0$. For a differentiable source history,

$$
g'(S)=1-\mathbf n\cdot\mathbf V_j(S)=D.
$$

For strict source speed $\|\mathbf V_j\|<1$, $D>0$ wherever $R>0$. A positive lower bound on $D$ is required for uniform estimates over an interval. The delta function below selects the arriving emission from the continuous emission history. For any continuous vector response $\mathbf H$ at an interior simple root, the change of integration variable from $S$ to $g$ gives

$$
\int \mathbf H(\mathbf r(S))\,\delta(g(S))\,dS
=\sum_{S_*}\frac{\mathbf H(\mathbf r(S_*))}{D(S_*)}.
$$

The denominator depends on the arrival condition, not on the chosen distance response. Replacing $\mathbf H=-G\mathbf r/R^3$ by $\mathbf H_\ell=-G\mathbf r/(R^2+\ell^2)^{3/2}$ therefore retains exactly the same $W=1/D$. This is also the softened-root identity already displayed in the [Master Equation's auxiliary regulator](../../../../../content/markdown/aaa/dynamics/master-equation.md). That auxiliary identity does not make a fixed positive $\ell$ a physical law.

The receiver multiplier $m(T)=1-\|\mathbf V_i(T)\|^2$ is independent of emission time in this integral. It can be taken outside the integral, giving $m\mathbf H_\ell/D$. Thus the experiment is internally consistent with an explicitly modified reception response and the original arrival geometry. The geometry does not select this particular multiplier.

The receiver's motion also changes which emission arrives next. Differentiating the arrival condition along the receiver path gives

$$
\frac{dS}{dT}=\frac{1-\mathbf n\cdot\mathbf V_i(T)}{D}.
$$

This is a rate of change of emission time along the receiver path. It is not the proposed factor $1-\|\mathbf V_i\|^2$, and it is not an additional multiplier in the Master Equation. Inserting it into the acceleration would define another law.

### Checking the same factor through the potential slope

There is a second direct check on the separated, single-root strict-speed domain. For any differentiable radial scalar $U(R)$, holding reception time and the source path fixed gives

$$
\nabla_{\mathbf X}R=\frac{\mathbf n}{D},\qquad
-\nabla_{\mathbf X}U(R)=-U'(R)\frac{\mathbf n}{D}.
$$

Choosing $U(R)=-G/\sqrt{R^2+\ell^2}$ gives precisely $W\mathbf H_\ell$. Softening changes $U'$, but not the arrival derivative. The earlier independent finite-difference check tests this identity. The scalar used here is $U(R(\mathbf X,T))$, not $WU(R)$; the factor appears once when its spatial derivative is taken. A scalar formed by separately weighting potential values by $W$ would generally have a different gradient, including derivatives of $W$.

### What the speed factor does and does not justify

The speed factor was selected to reduce acceleration as receiver speed approaches one. It is an added response assumption, as is the finite length $\ell$. There is a limited mathematical compatibility result in one dimension. Prescribe the source path independently, let $\Phi(x,T)=U(R(x,T))$, and define the mathematical variational function

$$
L(x,v,T)=v\operatorname{artanh}v+\frac12\log(1-v^2)-\Phi(x,T),\qquad |v|<1.
$$

Its velocity derivative is $\partial_vL=\operatorname{artanh}v$, so its Euler equation is

$$
\frac{\dot v}{1-v^2}=-\partial_x\Phi.
$$

This reproduces the proposed one-dimensional receiver equation. Its associated scalar $v\partial_vL-L=K+\Phi$ is the same diagnostic quantity used above and has time derivative $\partial_T\Phi$. This construction is mathematical bookkeeping derived from the chosen response, not an import of primitive mass or a physical kinetic-energy law. It also does not establish a corresponding three-dimensional variational equation.

Most importantly, the source was held prescribed in this calculation. In the coupled pair, each path also supplies the delayed source for the other member. Varying both paths in a proposed combined action changes both roles. Adding the two prescribed-source expressions without calculating those additional variations does not derive the coupled equations or a conserved wake contribution. The [causal-action discussion](../../../../../content/markdown/aaa/dynamics/causal-action-functional.md) likewise distinguishes an acceleration representation from a proved action.

### Conclusion and remaining issue

| Ingredient | What is established | What remains an assumption or open problem |
| --- | --- | --- |
| Source-motion weight $1/D$ | Derived from the retained arrival law and continuous emission measure; agrees with the delayed scalar slope | Changing emission normalization or propagation would require a new derivation |
| Softened distance response | Compatible with that same weighting | Physical reason for $\ell$ and its response shape |
| Receiver factor $1-v^2$ | Compatible as an added response; has the displayed prescribed-source one-dimensional representation | Selection from architrino primitives and coupled source/wake accounting |
| Passage through coincidence | Continuous zero limit for the softened acceleration when source speed stays uniformly below one | The zero-delay event remains an explicitly added extension, not an ordinary positive-delay root |

**Inference:** the observed gain is not grounds to remove the source weight. The unestablished part is the complete modified interaction: why this distance response and speed factor should apply, and how the two changing paths and their wakes fit together. The audit neither proves that a conserved account is impossible nor shows that a returning pair must be bounded.

The checkable boundary of the derivation is explicit: a different emission measure, a changed arrival equation, a non-simple root, or loss of strict source speed can invalidate the stated reduction. Within its assumptions, a contradiction to the displayed change-of-variable or gradient identities would overturn the result. The subsequent [complete two-path variation](strict-speed-two-path-action.md) tests the summed prescribed-partner expressions, including changes in emission times when the source path varies. It finds an additional later-reception contribution and rejects that candidate family as a derivation of the simulated causal equation. Removing $W$ to obtain a desired return would likewise choose different dynamics.
