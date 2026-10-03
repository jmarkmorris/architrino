# Independent adjudication of the T02 nonlinear history connection

## Verdict and inherited premises

The [nonlinear history construction](t02-admissible-nonlinear-history-connection.md) establishes local orbital instability of the exact T02 ring in the declared common in-plane radius and phase class. The construction is accepted at **derived conditional** grade: the nonlinear analytic argument below has been reconstructed independently, while the exact circular balance, complete reference ledger, positive characteristic-root witnesses and spectral confinement remain premises supplied by the [frozen characteristic certificate](t02-symmetric-characteristic-independent-evaluation.md). This adjudication does not independently recalculate that interval matrix or upgrade its numerical authority.

The substantive advance is the existence of small complete-past paths that satisfy the unchanged nonlinear Master Equation at every past time. They are not prescribed exponential preparations whose residual is merely small. Translated copies begin arbitrarily close to the circular history and subsequently leave a fixed small neighborhood, before any root chart changes. The theorem establishes neither later escape nor the absence of other retained states. It changes no candidate qualification or ratified evolution method.

The input reviewed had SHA-256 `31df0ae1149628865a2b63534ffdf2c97b6ad3ef9cd2a675a31e132d75ff3855`, measured directly by the known-control input inventory in `.tmp/t02-nonlinear-adjudication/inputs.json`. The author reported that this version would remain fixed during adjudication; the closing digest check, rather than that report, determines whether these exact bytes remained the input.

Wake speed is $c_f=1$, and the numerical reference uses coupling $K=1$. The Master Equation supplies acceleration directly. All ordinary positive-delay hits are retained, including six self hits; the zero-delay self endpoint is excluded. No speed cap, receiver multiplier, altered event rule, production evolution, or conservation premise enters this review. The geometry/dynamics Specialist lens supplies a review perspective rather than theorem authority.

## 1. Independent root-neighborhood argument

Let the circular paths be $\mathbf X_i^0(T)=Q(\Omega T+\alpha_i)R\mathbf e_1$, with $\alpha_i=i\pi/3$ and alternating polarities. Define delay $d=T-S$ and the gap

$$
h_{ij}(T,d)=\|\mathbf X_i(T)-\mathbf X_j(T-d)\|-d.
$$

For a simple root, $\partial_dh=-D$, where $D=1-\mathbf n\cdot\mathbf V_j(T-d)$. Thus either sign of $D$ is admissible; requiring $D>0$ would erase the rising branch in the actual T02 ledger. Assume uniform position and velocity closeness to the circular paths throughout the complete past and the finite departure segment. The position bound is $b$ and the velocity bound is also $b$ in the selected units.

Three bounds independently protect the inactive complement.

1. **Remote past.** Positions lie in the radius-$R+b$ ball. A causal hit obeys $d=\|\mathbf X_i(T)-\mathbf X_j(T-d)\|\leq2(R+b)$. Selecting $H>2(R+b)$ excludes every emission older than $H$ exactly. This excludes its receiver incidence, not its existence as a wake label. A finite delay window without this global position bound would be insufficient.
2. **Recent self emissions.** Project the same-path chord onto the circular tangent at reception. The reference projection is $R\sin(\Omega d)$, and the perturbation changes that projection by at most $bd$. Hence $h_{ii}(T,d)\geq[\beta\sin(\Omega d)/(\Omega d)-b-1]d$, with $\beta=\Omega R>1$. Choose $d_0>0$ so this bracket is positive on $(0,d_0]$. Its positive limit at zero excludes roots that could otherwise accumulate at the removed diagonal. Present position closeness alone would not give this bound; uniform velocity closeness is essential.
3. **Recent partner emissions.** Distinct equal-time reference sites are separated by at least $R$. Their perturbed separation is at least $R-2b$. A source moves by at most $(\beta+b)d$, giving $h_{ij}(T,d)\geq R-2b-(\beta+b+1)d$ for $i\ne j$. Reducing $d_0$ and $b$ makes this uniformly positive.

On the remaining interval $[d_0,H]$, isolate the finitely many exact roots in disjoint ordered-pair brackets. At each root the signed derivative is nonzero, so a sufficiently small neighborhood retains its unique root, derivative sign, positive delay and positive range. On the compact complement the exact gap has a strictly positive absolute minimum. Uniform position perturbations change the gap by at most $2b$, which preserves that minimum after shrinking the neighborhood. Uniform velocity perturbations also preserve the signed slopes inside the active brackets. These estimates work even at complement points where the Euclidean norm is not differentiable, because only its Lipschitz estimate is used there.

The premises of this argument are precisely the certified reference census and its nonzero signed factors, not a sampled root scan. It gives the same eight roots per receiver, hence 48 directed hits. The dependence on complete-history bounds is genuine: a remote excursion in a history that is close only on $[-H,0]$ could supply an additional old root.

Claim grade: derived root-neighborhood theorem conditional on the reference root census. Falsifier: a history satisfying these complete bounds and acquiring a root outside the brackets contradicts one of the displayed gap estimates or the compact minimum.

## 2. Direct local evolution and compatibility

The root neighborhood gives a positive delay floor $d_*>0$. On a forward step shorter than $d_*$, every emission evaluation lies in supplied data. Write the current receiver position and velocity as a finite-dimensional state. Each root delay is a continuously differentiable function of that state and the supplied $C^2$ past: the ordinary implicit derivative divides by signed $D\ne0$. The resulting acceleration is a finite continuously differentiable function, so a contraction for the ordinary differential integral equation supplies a unique short continuation.

For clarity, evaluation of the delayed velocity requires exactly the stated regularity. If $f\in C^2$ and $s=s(f)$ is the moving emission argument, then

$$
\delta[f'(s(f))]=h'(s(f))+f''(s(f))\,\delta s.
$$

Both terms are continuous in the $C^2$ topology. There is no delayed acceleration in the original law; the acceleration here is a derivative of its delayed-velocity evaluation. The first variation of a root contribution is consequently

$$
\delta\mathbf a=\frac{\sigma K}{r^2|D|}\left[\delta\mathbf n-\mathbf n\left(2\delta r/r+\delta D/D\right)\right],
$$

with signed $D$ in the logarithmic derivative. This verifies the sign convention independently of the retained evaluator.

For the rotating displacement history $\phi\in C^2([-H,0],\mathbb R^2)$, the compatible subset is $\phi''(0)=\mathcal F(\phi)$. A variation supported in the recent root-free interval can have zero endpoint value and first derivative while changing its second endpoint derivative arbitrarily. It leaves every root evaluation and the receiver position and velocity unchanged. The derivative of the compatibility map is therefore onto $\mathbb R^2$, and its zero set is locally a continuously differentiable codimension-two submanifold.

Repeating the short-step argument gives local uniqueness and fixed-time differentiable dependence on compatible histories while the chart margins persist. To see why the dependence is in the $C^2$ norm, differentiate the integral equation for position and velocity and then use the differentiable acceleration formula above for its second derivative. The carried portion of the input history is a bounded linear translation. Compatibility makes the carried and evolved second derivatives agree at the join, including in the variational equation. No third source derivative is required for these fixed-time maps. This statement does not assert differentiability in time of the shift as a map into $C^2$.

The parent ceiling theorem is unnecessary and has incompatible speed/sign assumptions. The direct argument is a finite-delay ordinary-chart argument for the unchanged equation. Its domain includes complete pasts with the remote-exclusion bound; an arbitrary finite segment without such a past extension is not the same state.

Claim grade: derived local compatible flow. Falsifier: two continuations inside the same root neighborhood, or a failure of the displayed evaluation derivative in its declared $C^2$ domain, defeats this assertion.

## 3. Independent analytic-space reconstruction

The nonlinear existence proof needs more than a formal mode. Its essential mathematical device is to evaluate every source strictly inside an analytic disk, where differentiation is bounded even when it is unbounded on the disk boundary.

Let $\mathcal W_+$ contain series $p(w)=\sum_{n\geq1}p_nw^n$ with $\sum\|p_n\|<\infty$. Use its unital enlargement $\mathbb C\oplus\mathcal W_+$ for constants, products, inverses, exponentials and square roots. The subject's notation omits this harmless unit enlargement; it is made explicit here so its algebra operations have a declared domain. Convolution gives $\|fg\|\leq\|f\|\|g\|$.

Suppose an argument series $f$ has zero constant coefficient and $\|f\|\leq q<1$. Then

$$
\|p\circ f\|\leq\sum_{n\geq1}\|p_n\|q^n\leq\|p\|,
\qquad
\left\|\sum_{n\geq1}n^k p_nf^n\right\|\leq\left(\sup_{n\geq1}n^kq^n\right)\|p\|.
$$

The second bound controls every fixed Euler derivative of the source. Derivatives with respect to the argument are controlled as well: $\|D_f^k(p\circ f)[h_1,\ldots,h_k]\|$ is bounded by $\sup_{n\geq k}n(n-1)\cdots(n-k+1)q^{n-k}\,\|p\|\prod\|h_j\|$. On a slightly larger argument ball still below one, these estimates imply analytic dependence rather than only existence of the composition.

For an exact positive delay $\Delta_j$, write $d_j=\Delta_j+\delta_j(w)$ and $f_j(w)=we^{-\lambda_*d_j(w)}$. For sufficiently small $\|\delta_j\|$,

$$
\|f_j\|\leq e^{-\lambda_*\Delta_j}e^{\lambda_*\|\delta_j\|}<q<1.
$$

The finite positive delay floor is thus the mechanism preventing loss of analytic derivatives. A zero-delay root would give a leading factor one and would invalidate this argument.

The causal equation uses the complex bilinear square root of $\mathbf r_j\cdot\mathbf r_j$, continued from its positive nonzero reference value. It does not use a conjugate-linear norm as a purported analytic map. At $p=0$, its derivative in $\delta_j$ is multiplication by $-D_j\ne0$. The implicit analytic solution exists in the unital algebra, has $\delta_j(0)=0$, and obeys $\|\delta_j\|\leq C\|p\|$. Restriction to real coefficients gives real positive delays. On this real neighborhood, replacing $|D_j|$ by its fixed-sign expression $\operatorname{sgn}(D_j^0)D_j$ restores exactly the canonical row. Finite inversion, square roots, rotations and the smoothed source evaluations therefore make the acceleration map $\mathcal B(p)$ analytic on a small coefficient ball.

An important distinction is that $\mathcal Dp=\lambda_*wp'(w)$ is unbounded on $\mathcal W_+$. It is not used as a bounded current-time map in $\mathcal B$. Only delayed source derivatives occur there, and the inequalities above control them. The current-time Euler terms remain on the left of the equation and are inverted coefficientwise. This prevents the apparent derivative-loss objection.

### Coefficient grading and a quadratic remainder

Analytic dependence on amplitude alone would not prove that a remainder starts at $w^2$. Here the composition also preserves coefficient order. A source argument $f_j$ starts at $w$, each delay perturbation has zero constant term, and all root operations are local products and analytic inverses around nonzero constants. If $p$ starts at order $w$, every nonlinear product of at least two perturbation factors starts at order $w^2$. Its $w$ coefficient is exactly the ordinary first variation, including the emission shift of the base source velocity. Hence

$$
\mathcal N(p)=\mathcal B(p)-\mathcal B(0)-D\mathcal B(0)p
$$

has no constant or first-order coefficient. Analyticity on a smaller ball yields finite constants for $\|\mathcal N(p)\|\leq C\|p\|^2$ and $\|\mathcal N(p)-\mathcal N(\widetilde p)\|\leq C(\|p\|+\|\widetilde p\|)\|p-\widetilde p\|$. These are estimates in the same coefficient norm; a mere pointwise Taylor expansion would not suffice.

Claim grade: derived bounded analytic map and coefficient grading. Falsifier: a source argument leaving the strict disk, a delayed zero range or zero signed factor, or a first-order coefficient in $\mathcal N$ invalidates the fixed point below.

## 4. Nonresonance, inversion and convergent ancient paths

Accept the characteristic premises $G(0)>0$, at least one positive real zero, and no right-half-plane zero outside radius 43. They imply a largest positive real root $\lambda_*$: $G(0)>0$ excludes an interval near zero, and a nonzero analytic function has only finitely many zeros on the remaining compact real interval. A real null vector $a\ne0$ of $A(\lambda_*)$ exists. Neither simplicity nor a count of complex roots is needed.

For every integer $n\geq2$, $n\lambda_*>\lambda_*$, so $A(n\lambda_*)$ is invertible by maximality. This handles possible resonances that a series at a specified smaller witnessed root would leave open. From the finite-root first variation,

$$
A(n\lambda_*)=(n\lambda_*)^2I+2\Omega n\lambda_*J+O(1),
\qquad
\|A(n\lambda_*)^{-1}\|\leq C_2n^{-2}
$$

for sufficiently large $n$. Delayed terms $n\lambda_*e^{-n\lambda_*\Delta_j}$ decay. A Neumann inverse of the dominant quadratic matrix proves the bound; finitely many smaller $n$ contribute finite constants. Thus the inverse coefficient multiplier $\mathcal R$ is bounded in $\mathcal W_+$ and improves the coefficient summability by two powers of $n$.

Set $p=\varepsilon wa+v$, with $\|a\|=1$ and $v$ starting at order two. The constant equation is the exact circle balance, the first coefficient is $A(\lambda_*)\varepsilon a=0$, and all later coefficients are equivalent to

$$
v=\mathcal R\mathcal N(\varepsilon wa+v).
$$

If $B=\sup_{n\geq2}\|A(n\lambda_*)^{-1}\|$, this map sends $\|v\|\leq4BC\varepsilon^2$ into itself and has Lipschitz constant at most $4BC\varepsilon<1$ after reducing $\varepsilon$. The contraction yields an actual convergent series. Since $n^2A(n\lambda_*)^{-1}$ is bounded, $\sum n^2\|v_n\|=O(\varepsilon^2)$. Therefore the substituted path $u(T)=p(e^{\lambda_*T})$ and its first two absolute-time derivatives converge uniformly on $T\leq0$, including the endpoint. The coefficient identities can legitimately be differentiated and summed there.

Since $v$ starts at order two, the same weighted sums give uniformly

$$
u(T)=\varepsilon e^{\lambda_*T}a+O(\varepsilon^2e^{2\lambda_*T}),
\qquad
u'(T)=\lambda_*\varepsilon e^{\lambda_*T}a+O(\varepsilon^2e^{2\lambda_*T}),
$$

with a corresponding second-derivative estimate. The physical position and velocity deviations are bounded uniformly throughout the complete past because the reference rotations are bounded. Reducing $\varepsilon$ places them in Section 1's root neighborhood. The analytic rows consequently sum every canonical hit and no others. The path solves the nonlinear equation throughout its complete past, and its endpoint compatibility follows from that equation. This is the required connection to admissible coupled histories.

Claim grade: derived convergent ancient-history construction conditional on the characteristic premises. Falsifier: a positive real root beyond the assumed maximum, an unbounded inverse multiplier, or failure of strict delayed evaluation defeats this construction. The result does not specify whether $\lambda_*$ is one of the two recorded witnesses.

## 5. Orbit separation and the precise instability conclusion

Fix a sufficiently small nonzero $\varepsilon_0$. A rigid phase shift has constant rotating displacement and zero rotating derivative. The constructed history has $\|u'(0)\|\geq\lambda_*\varepsilon_0/2$, so its $C^2$ distance from that phase family is bounded below. Constant spatial translations do not change this conclusion: their six receiver-frame coordinates average to zero because $\sum_iQ(-\alpha_i)=0$. The average is a bounded projection in the full labeled history norm.

For $L>0$, the reduced autonomous equation admits the shifted path $u_L(T)=u(T-L)$ up to $T=L$. Its complete initial history is at most $C\varepsilon_0e^{-\lambda_*L}$ from the circle, and its endpoint history is the same fixed noncircular history, up to a harmless common rigid phase. It leaves a fixed small neighborhood while the 48-root chart persists. Local uniqueness identifies the constructed trajectory with the continuation of its own compatible data. This proves the claimed local orbital Lyapunov instability; no abstract delay-equation instability theorem is required.

The subject explicitly proves separation from phase shifts and translations. If an orbit definition also quotients all rigid three-dimensional rotations, that extra quotient should be named rather than silently inferred from the same averaging derivative. It can also be handled here. The constructed path is real analytic on $T<0$. If its endpoint history on $[-H,0]$ coincided with a rigidly rotated and translated circular history, analyticity would extend that equality to the complete past. Its exponential convergence to the reference as $T\to-\infty$ would then force the rigid circular histories to coincide, contradicting its nonzero leading coefficient. Moreover, the rotation group is compact and translations relevant to a bounded distance can be restricted to a compact ball. The orbit is thus closed in the labeled $C^2$ history space, and this particular endpoint has a positive distance from it. The time-shift argument gives instability relative to that larger fixed-radius, fixed-frequency rigid orbit as well. This supplementary argument concerns mathematical orbit distance, not candidate qualification.

Instability in an invariant common symmetric class is enough to disprove stability of that same rigid solution under unrestricted perturbations. It does not determine every other sector, prove a unique unstable manifold, establish departure in each witnessed mode, decide later nonlinear fate, or exclude a nearby modulated retained assembly. A numerical collapse protocol and physical identification do not follow from this theorem.

Claim grade: derived local orbital instability with the preceding declared premises and topology. Falsifier: a valid bounded orbit approximation with zero endpoint-history distance, or a failure of autonomy or local continuation uniqueness, invalidates the respective orbit conclusion.

## Review disposition and validation

| Question | Disposition |
| --- | --- |
| Complete root census under whole-history closeness | ✓ Done: independent recent-self, partner, compact-complement and remote bounds reconstructed |
| Compatible $C^2$ ordinary-chart local evolution | ✓ Done: direct stepwise argument; no ceiling theorem imported |
| Analytic source evaluation and implicit delays | ✓ Done: strict-disk derivative bounds and unital coefficient algebra supplied |
| Quadratic remainder and coefficient order | ✓ Done: amplitude estimates and coefficient grading both established |
| Nonresonance, inverse bounds and series convergence | ✓ Done: maximal positive real root and two-power summability gain suffice |
| Local orbit separation | ✓ Done: phase/translation argument checked; complete rigid-rotation quotient addressed separately |
| Interval balance, positive-root witnesses and confinement | ◐ Partial: inherited frozen premises, not independently recomputed by this adjudication |
| Later nonlinear fate or assembly qualification | ○ Not done: outside this local theorem and this assignment |

This adjudication supports mathematical use of the reviewed local theorem at its conditional grade. It supplies no operator selection, new response law, scientific qualification, evolution run or change to the ratified candidate method. The subject's phrase “smooth submanifold” is read here as continuously differentiable, the regularity established from $C^2$ input histories; no unlimited differentiability is claimed. The frozen characteristic subjects, evaluator, receipts and original variation reference have not been edited.

The analytical controls preceding target interpretation were the elementary causal-gap derivative $\partial_dh=-D$, convolution norm inequality, strict-disk Euler bound, quadratic fixed-point model, and the known rigid phase/translation projections. These controls are independently derived above; no numerical characteristic implementation was run as a putatively independent reference.

Scoped syntax and preservation checks are recorded in `.tmp/t02-nonlinear-adjudication/validation.json`. The validator first accepts known fenced-code and mathematical-link controls, renders a valid mathematical control and rejects malformed TeX, and passes SHA-256 `abc` before reading the target. `node .tmp/t02-nonlinear-adjudication/validate.mjs` then rendered all 133 mathematical spans, resolved both document links and compared the 12 directly observed input digests, including the exact reviewed subject, without a mismatch. Those checks establish document syntax and preservation, not the mathematics. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new document; exit one denotes its difference from the empty baseline. No Python or production evolution is invoked. Only this adjudication and unique scratch material are written; shared queues, logs, synthesis, qualification and corpus are left to the coordinator.
