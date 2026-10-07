# Independent review of signed delayed error transport

## Disposition and scope

**Derived disposition:** the [frozen signed-transport note](overnight2-d-signed-transport.md) gives the correct nominal signed operator on genuinely smooth ordinary-root charts, the correct sign and magnitude of the isolated source-front timing correction, and a valid conditional first-exit implication for its resolvent inequality. None of these results certifies the original eight-member trajectory. This review independently reconstructs the calculus from the selected acceleration kernel and gives explicit counterexamples to extending the claims beyond their stated smoothness and norm boundaries. No pilot implementation or target numerical result was used as evidence.

**Required domain clarification:** “$C^1$, piecewise $C^2$” and exclusion of the source-zero velocity jump do not by themselves give a single classical first variation at every reception time. An ordinary reference interpolation knot can have distinct one-sided source accelerations. At a nominal root on such a knot, the acceleration row can have different one-sided derivatives even though the reference position and velocity are continuous. The note's introductory smooth-domain restriction makes its conditional claim defensible, but any application must explicitly partition these knot crossings or prove an integrated remainder estimate across them. Section 4 supplies an exact counterexample and the corresponding correction to the application domain.

The selected law remains the [inclusive field-speed ceiling](../../equation-variants/field-speed-ceiling/definition.md), with $K=c_f=c_a=1$, original partner weights, zero self acceleration, and projection only after the complete ordinary sum. On the strict-interior charts considered here the normal-cone reaction is zero. This is error transport about a time-dependent reference with residual, not a stability calculation about an equilibrium. The Jack K. Hale role supplied a hereditary phase-space lens only; the equations and explicit derivations supply the authority.

## 1. Independent differentiation of the complete delayed row

Consider a differentiable family of compatible position and velocity histories on one smooth source branch, with reference position $\mathbf x$, reference velocity $\mathbf w=\dot{\mathbf x}$, and first variations $\mathbf u,\mathbf v=\dot{\mathbf u}$. Fix a reception time $t$ and one channel from $j$ to $i$. Let its reference source time be $s$, delay $\tau=t-s>0$, direction $\mathbf n=(\mathbf x_i(t)-\mathbf x_j(s))/\tau$, and positive transmitter factor $D=1-\mathbf n\cdot\mathbf w_j(s)$. Put $\mathbf p=\mathbf u_i(t)-\mathbf u_j(s)$ and $\mathbf a_j=\dot{\mathbf w}_j(s)$; the latter is the reference source acceleration, not a claim that the reference solves the equation.

Differentiating the root equation directly with respect to the family parameter gives

$$
\delta s=-\frac{\mathbf n\cdot\mathbf p}{D},\qquad
\delta\tau=-\delta s,\qquad
\delta\mathbf n=\frac{(I-\mathbf n\mathbf n^\top)(\mathbf p-\mathbf w_j\delta s)}{\tau}.
$$

The source velocity changes both because the path changes and because the source time moves. Consequently

$$
\delta\mathbf V_j(s)=\mathbf v_j(s)+\mathbf a_j\delta s,
\qquad
\delta D=-\mathbf w_j\cdot\delta\mathbf n-\mathbf n\cdot\mathbf v_j(s)-\mathbf n\cdot\mathbf a_j\delta s.
$$

For the selected ordinary row $\mathbf f=\sigma_{ij}\mathbf n/(\tau^2D)$, these identities give

$$
\delta\mathbf f
=\sigma_{ij}\left[
\frac{\delta\mathbf n}{\tau^2D}
+\frac{2\mathbf n\delta s}{\tau^3D}
-\frac{\mathbf n\delta D}{\tau^2D^2}
\right]
=B_{ij}\mathbf p+C_{ij}\mathbf v_j(s),
$$

where

$$
N=\frac{(I-\mathbf n\mathbf n^\top)(I+\mathbf w_j\mathbf n^\top/D)}{\tau},
$$

$$
B_{ij}=\sigma_{ij}\left[
\frac{(I+\mathbf n\mathbf w_j^\top/D)N}{\tau^2D}
-\frac{2\mathbf n\mathbf n^\top}{\tau^3D^2}
-\frac{(\mathbf n\cdot\mathbf a_j)\mathbf n\mathbf n^\top}{\tau^2D^3}
\right],
\qquad
C_{ij}=\frac{\sigma_{ij}\mathbf n\mathbf n^\top}{\tau^2D^2}.
$$

These are the subject's referenced matrices evaluated with feasible reference velocity equal to the position derivative. In the more general geometry comparison those two quantities need not coincide; its separate root factor $\gamma$ must then be retained. This derivation confirms the negative sign of the source-acceleration term and the positive sign of the direct delayed-velocity term.

Summing these vectors with their original polarity signs before taking a norm gives exactly the stated nominal delayed operator. Subtracting the reference equation $\ddot{\mathbf x}=\mathbf a[\mathbf x]+\boldsymbol\rho$ gives the forcing $-(0,\boldsymbol\rho)$. Strictly speaking this is an inhomogeneous linear error approximation, or a forced variational equation, about a possibly defective reference. A derivative of a family of exact solutions about an exact solution is the corresponding zero-residual special case. No premise that the reference is an equilibrium is used.

**Independent analytic control:** for a static source, $D=1$, $\mathbf a_j=0$, and the derivative of the explicit map $\sigma\mathbf r/|\mathbf r|^3$ is $B=\sigma(I-3\mathbf n\mathbf n^\top)/\tau^3$. Independent differentiation of the velocity denominator gives $C=\sigma\mathbf n\mathbf n^\top/\tau^2$. At $\tau=2$, $\mathbf n=(1,0,0)$ and $\sigma=1$, these are $\operatorname{diag}(-1/4,1/8,1/8)$ and $\operatorname{diag}(1/4,0,0)$, respectively. This is an exact algebraic control, not a target run.

## 2. The source-time remainder and its necessary topology

Let $S$ denote the exact source time and $s$ the reference source time at the same reception. On a smooth connecting homotopy the fixed endpoint errors are $\mathbf p=\mathbf e_i^x(t)-\mathbf e_j^x(S)$ and $\mathbf z=\mathbf e_j^v(S)$. They are held fixed during the homotopy. If its root factor is bounded below by $\gamma_*>0$, integration of $ds/d\theta=-\mathbf n\cdot\mathbf p/\gamma$ gives $|S-s|\le |\mathbf p|/\gamma_*$. The bound does not require differentiating the unknown errors along the homotopy.

The exact smooth row difference minus its nominal first variation can be written as

$$
\begin{aligned}
\mathcal R_{ij}={}&(\overline B-B)\mathbf p+(\overline C-C)\mathbf z\\
&-B[\mathbf e_j^x(S)-\mathbf e_j^x(s)]
+C[\mathbf e_j^v(S)-\mathbf e_j^v(s)].
\end{aligned}
$$

The barred matrices are the integrated homotopy derivatives. This independently recovers the subject's two source-time terms and shows what its coefficient-variation term contains. A bounded derivative modulus for $B,C$ over the entire homotopy region controls the first line. Absolute continuity gives the displayed derivative-times-time-shift estimate for the second line. A trace jump requires its full additional allowance.

**Derived limitation:** merely knowing that derivative bounds are finite is insufficient for a quadratic remainder in an amplitude-only radius $r$. One needs coefficient variation $O(r)$, time displacement $O(r)$, and delayed-error variation $O(r^2)$. For position error, compatibility $\dot{\mathbf e}^x=\mathbf e^v$ gives the last property when velocity error is $O(r)$. For velocity error, a uniform $O(1)$ bound on its derivative gives only $O(r)$; an $O(r)$ derivative bound, a suitable modulus estimate, or a separate structure-sensitive integral argument is needed to obtain $O(r^2)$. Residual terms independent of the error radius may instead belong in the separately propagated defect allowance. Source smoothness sufficient for a first derivative also need not supply a Lipschitz derivative sufficient for a quadratic Taylor bound.

An explicit compatible-history example demonstrates the failure in an amplitude-only phase space. Take a static one-dimensional reference source at zero and a stationary receiver at $2$, with reception $t=3$ and reference source time $s=1$. For $0<r\ll1$, perturb the receiver position by $r$ and the source position and velocity by

$$
e_j^x(u)=-r^2\cos((u-1)/r),\qquad
e_j^v(u)=r\sin((u-1)/r).
$$

These are compatible, strictly subunit-speed prescribed histories. They are not asserted to solve the selected dynamics. Their amplitude norm is $O(r)$, while the source velocity-error derivative has amplitude one. The exact root satisfies

$$
S-1=-r-r^2\cos((S-1)/r),
\qquad (S-1)/r\longrightarrow-1.
$$

The reference delayed velocity error is zero, whereas the actual delayed velocity error is $-r\sin(1)+O(r^2)$. Direct expansion of the ordinary acceleration row gives

$$
f_{\mathrm{exact}}-f_{\mathrm{ref}}
=-\frac r4-\frac{r\sin(1)}4+O(r^2).
$$

The nominal operator gives $-r/4+O(r^2)$. Its remainder is therefore $-r\sin(1)/4+O(r^2)$, which is not quadratic and is not $o(r)$. This is a counterexample to a Fréchet first variation on the unrestricted continuous amplitude history space, not a counterexample to directional differentiation along a fixed smooth family or to the subject's conditional criterion. It makes the stated phase-space caveat substantive.

## 3. Source-front timing and the sign of the velocity variation

At an isolated source-zero reception, define $h(t)=t-|\mathbf x_i(t)-\mathbf b_j|$ with source birth position $\mathbf b_j=\mathbf x_j(0)$. At its positive-time zero $t_*$, let $\kappa=1-\mathbf n\cdot\dot{\mathbf x}_i(t_*)>0$. Direct differentiation of the moving zero gives

$$
0=\kappa\,\delta t_*-\mathbf n\cdot[\mathbf u_i(t_*)-\mathbf u_j(0)],
\qquad
\delta t_* = \frac{\mathbf n\cdot[\mathbf u_i(t_*)-\mathbf u_j(0)]}{\kappa}.
$$

There is no velocity reset in the selected law. The jump belongs to the ordinary acceleration. With source velocity traces $\mathbf w_j^\pm$, positivity of both transmitter factors gives

$$
\Delta\mathbf a_{ij}
=\frac{\sigma_{ij}\mathbf n}{t_*^2}
\left(\frac1{D_t^+}-\frac1{D_t^-}\right)
=\frac{\sigma_{ij}\mathbf n}{t_*^2}
\frac{\mathbf n\cdot(\mathbf w_j^+-\mathbf w_j^-)}{D_t^+D_t^-}.
$$

To check the sign independently, integrate an acceleration input $a_-+\Delta a\,H(t-t_*-\epsilon d)$, where $H$ is the step function and $d$ is the event-time variation. Its velocity contribution is $a_-t+\Delta a(t-t_*-\epsilon d)_+$. At fixed times away from the event its derivative with respect to $\epsilon$ is $-\Delta a\,d\,H(t-t_*)$. Hence the one-sided velocity variation has jump $-\Delta a\,\delta t_*$. The position variation is continuous. This exact integrated control confirms the subject's sign without importing its pilot or derivative implementation.

Every finite-$\epsilon$ velocity difference quotient in this control is continuous, but its pointwise limit has a nonzero jump. Uniform convergence across the moving event is impossible: a uniform limit of continuous functions is continuous. A discontinuous nominal variation consequently cannot serve as a continuous finite-error reference under an unqualified supremum-norm approximation. One may use event-aligned coordinates with a separately justified norm and transformation, or retain continuous histories and bound all admissible injection times in the event slab.

The result assumes an isolated transverse event, a differentiable family of event positions, complete one-sided ordinary rows, and strict-interior response on both sides. Simultaneous fronts, changing event order, grazing, or onset of the ceiling require their own treatment. The finite-difference two-crossing homotopy budget in the prior kick review remains a distinct necessary obligation when that construction is used; the isolated first variation does not remove it.

## 4. Ordinary interpolation knots are additional derivative boundaries

Here is a local ordinary-root counterexample, placed at source time one to separate it from source-zero kick reception. Keep the receiver stationary at coordinate $2$ and consider reception time $3$. Near $s=1$, prescribe a source

$$
x_j(s)=\tfrac12 a_\pm(s-1)^2,
\qquad a_-=0\ \text{for }s<1,
\qquad a_+=\tfrac12\ \text{for }s>1.
$$

The source position is $C^1$ and piecewise $C^2$, its velocity is strictly below one in a neighborhood, and the nominal root has delay two and factor one. Translate the receiver by a scalar $p$. The root obeys $s-1=-p+O(p^2)$, so positive and negative translations access different acceleration branches. With polarity sign one, direct expansion of the ordinary row gives

$$
f(p)=\begin{cases}
\tfrac14-\tfrac14p+O(p^2),&p>0,\\
\tfrac14-\tfrac38p+O(p^2),&p<0.
\end{cases}
$$

Thus a single two-sided derivative does not exist at this reception. The denominator is positive and neither source velocity nor acceleration row has a jump there; the difficulty is a kink in the row's derivative. This can arise at ordinary cubic-Hermite interpolation knots.

**Application correction:** restrict the nominal derivative formulas to roots strictly within smooth source pieces and declare one-sided coefficients at crossings. For the integrated error equation, bounded derivative jumps and a certified transverse source clock can make the exceptional reception slab shrink with the root perturbation, allowing a separate integrated remainder bound. That bound must be proved; a pointwise quadratic remainder across the knot does not follow. A reference with continuous source acceleration removes this particular kink, but quantitative derivative-modulus and residual bounds are still needed. This review makes no claim about any proposed replacement reconstruction.

## 5. Conditional resolvent implication and continuation

On a compact smooth chart, eliminate the fixed negative-history values into the known term $g_b$. Integrating the signed linear error equation yields a causal Volterra operator $K_b$ on the remaining unknown continuous history over $[0,b]$. Bounded coefficients and a complete admitted delay map make the integral operator well defined. In a fixed weighted supremum norm, if the sum of the relevant coefficient norms is bounded by $M$, causal nesting gives

$$
\|K_b^n\|\le\frac{(Mb)^n}{n!}.
$$

This follows by integrating over the ordered time simplex; every delayed argument is no later than its reception argument, and prescribed negative arguments have already been removed. Therefore the Neumann series $\sum_{n\ge0}K_b^n$ converges, constructs $(I-K_b)^{-1}$, and gives the conservative bound $\|R_b\|\le e^{Mb}$. The positive-delay method of steps invoked by the subject is another construction on a chart with a positive delay floor. Neither construction asserts that the resulting bound is small enough for this release.

Suppose the exact identity $e_b=g_b+K_be_b+N_b(e_b)$ holds, all three stated estimates hold uniformly for every prefix, the initialization is strictly within the proposed ball, and the compatible prefix error functional is continuous. Multiplying the identity by $R_b$ gives

$$
\|e_b\|\le a+G(C\|e_b\|^2+\varepsilon).
$$

At a first exit through $\|e_b\|=r$, the strict inequality $a+G(Cr^2+\varepsilon)<r$ contradicts this bound. This proves the subject's a posteriori implication. The defect allowance $\varepsilon$ is an integral-operator allowance in the chosen norm, not an unintegrated pointwise acceleration residual unless a separate estimate converts it. Uniform prefix estimates are essential; endpoint cancellation alone does not control earlier excursions.

A small correction for one forcing does not control the inverse. As an exact counterexample, set $Kq(t)=\int_0^t\operatorname{diag}(0,M)q(s)\,ds$. For $g=(\delta,0)$, the solution is $z=(\delta,0)$; for the unit forcing $g=(0,1)$, it is $(0,e^{Mt})$. Thus the first small response coexists with $\|R_T\|\ge e^{MT}$. This is a mathematical operator control, not a model of the architrino release.

The first-exit argument bounds an existing solution while it remains in the admitted chart. Existence through the entire target prefix additionally requires simultaneous positive range and factor margins, complete accessible histories, controlled source regularity, strict-interior speed margin, and restart before any chart boundary. A derivative-based history norm needs its own continuous exit functional or a replacement continuation argument. An isolated-event variational equation with jumps is not the smooth continuous-history Volterra operator just reviewed; extending the certificate through events requires explicitly incorporating their phase-space and forcing treatment.

## 6. Remaining admission obligations and falsifiers

The strongest accepted result is a conditional signed error route, with the interpolation-knot clarification above. Actual finite-history admission still requires a continuous joined reference with validated initial and negative-history discrepancies; complete off-front root regions and matrix variation bounds; a norm that controls source-time evaluation or separately justified integrated estimates; a rigorous bound on the full signed inverse rather than one residual response; residual bounds for the same joined reference; front and ordinary-knot contributions propagated over every possible injection time; and simultaneous continuation through all relevant source histories to the required tail interval. The [geometry review](overnight-d-finite-geometry-independent-review-2026-10-07.md) and [kick review](overnight-d-kick-crossing-independent-review-2026-10-07.md) remain conditional inputs with their original limits.

The smooth derivative claim is falsified by a smooth compatible family, positive root margins, and a directional derivative differing from the formulas in Section 1. The source-time warning is independently testable by the explicit oscillatory family in Section 2. The event sign is falsified by a differentiable isolated transverse event whose integrated acceleration shift violates the exact control in Section 3. The interpolation-knot qualification is independently testable by the two one-sided slopes in Section 4. The first-exit implication is falsified only by a solution crossing the strict radius while the exact prefix identity, all uniform bounds, norm continuity, and chart hypotheses hold. Failed or absent bounds are failures to apply the criterion, not falsifiers of the criterion or evidence against the physical release.

## Evidence and validation receipt

This review used direct implicit differentiation, direct differentiation of the ordinary acceleration kernel, exact algebraic controls, explicit compatible-history counterexamples, and the ordered-simplex inverse estimate. It ran no numerical target, imported no subject code, and made no numerical finite-history or fate claim. The controls above are exact mathematical examples; no in-session computational instrument was needed to establish them.

The subject SHA-256 measured by `shasum -a 256` before review was `2f0b618b214ee6cc82519317cebf8396162f072daab64330e308f51b34b4ecd7`. Only this new review companion is within the reviewer's write scope. The subject and prior reviews remain frozen. The receiving [research report](overnight2-d-followup-and-research-2026-10-07.md) is maintained by the parent researcher; this reviewer did not edit it or the shared owners.

Final validation: a second `shasum -a 256` read returned the same frozen subject hash. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-signed-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit shell `test -f` checks passed for the five local link destinations in this review; there are no fragment targets. The derivations and examples were reread against the displayed root and kernel identities. No numerical job or child agent was started.
