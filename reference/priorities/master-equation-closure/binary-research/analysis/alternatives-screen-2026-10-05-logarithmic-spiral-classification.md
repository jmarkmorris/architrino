# Complete subfield classification of the inverse-distance expanding spiral

## Fixed case and theorem

**Derived theorem, awaiting independent assessment:** the fixed $p=1$, $K=R_*=c_f=1$ law has exactly one positive-frequency parameter triple $(a,\omega,\lambda)$ in the complete uniformly subfield mirror-planar ansatz

$$
q(T)=a(1+T)e^{i\omega\log(1+T)},\qquad
a>0,\quad\omega>0,\quad 0<\lambda<1,
$$

$$
1+S=\lambda(1+T),\qquad
\beta=a\sqrt{1+\omega^2}<1.
$$

It is the already admitted root near $\omega=2.2980147591220047$, $\delta=1.1160548442916221$, where $\delta=-\omega\log\lambda$. No additional winding or remote-frequency subfield branch exists. The proof below establishes global existence and uniqueness within this ansatz analytically; the earlier rational certificate identifies and encloses that unique solution.

The law is exactly the selected inverse-distance control in [equation-variants Section 15](../../equation-variants/manuscript.md#15-other-radial-response-powers), with every ordinary positive-delay self and partner root retained. No cap, receiver multiplier or response selector is added. Complete realizations use a separated supplied past with a uniform speed margin, joined compatibly to the future. The past need not satisfy the future equation before release. The entire joined history then has one common strict speed margin.

This is a parameter classification, not uniqueness of the complete supplied past: many earlier histories can realize the same future if they preserve the needed source segment and complete root census. The ansatz fixes the time scale $1+T$, spatial phase and positive chirality. Rigid rotations, time-origin changes and the corresponding scale symmetry give equivalent representations, not additional parameter branches in this fixed convention. No stability, attraction or generic perturbed-fate conclusion is inferred from classification.

The case and proof domain above are fixed without a new computational target. No new search or numerical instrument is used below. The live Henri Poincare lens supplies the analytical emphasis, not evidence or acceptance authority.

## Why the full subfield domain has no winding branches

On a complete uniformly subfield mirror history, the partner residual $T-S-|q(T)+q(S)|$ is strictly decreasing in source time, has positive remote-past limit and is negative at reception. Thus it has exactly one root. The strict chord inequality excludes every positive-delay self root.

The constant source ratio is also necessary for any future of this shape once its sampled source lies in the generated interval. To see that earlier sources eventually disappear, let the complete past speed be at most $b_0<1$. Since $|q(0)|=a$ and $|q(T)|=a(1+T)$, an old source $S\le0$ would satisfy

$$
T-S=|q(T)+q(S)|\le a(1+T)+a-b_0S,
$$

$$
(1-a)T\le2a+(1-b_0)S\le2a.
$$

Here $a<1$ follows from $\beta<1$. Hence every sufficiently late source is generated. For such a reception set $\ell=(1+S)/(1+T)$. Dividing the root equation by $1+T$ gives

$$
g(\ell)=1-\ell-a|1+\ell e^{i\omega\log\ell}|=0.
$$

The scaled source curve $a\ell e^{i\omega\log\ell}$ has derivative of constant norm $\beta<1$. Therefore $g$ is strictly decreasing on $(0,1)$, including any point where its norm argument vanishes. Also $g(0+)=1-a>0$ and $g(1)=-2a<0$. Its one root is independent of reception time, proving the constant ratio $\lambda$ rather than selecting one from several roots.

Now choose any sufficiently late causal interval $[S,T]$ lying entirely on the analytic future. Put $a_1=q(S)$, $b_1=q(T)$ and $C=(a_1+b_1)/2$. For every intermediate $u$,

$$
2|q(u)-C|\le|q(u)-a_1|+|q(u)-b_1|
\le\int_S^T|q'(v)|\,dv
=\beta(T-S)<2|C|.
$$

The whole causal path lies in an open ball not containing the origin, within the half-plane $C\cdot q>0$. Its angular lift cannot wind through that half-plane. Moreover $|b_1-a_1|<|b_1+a_1|$ gives $a_1\cdot b_1>0$. Since the spiral angle strictly increases, its actual causal angular change obeys

$$
0<\delta=\omega\log\frac{1+T}{1+S}<\frac\pi2.
$$

This is a constraint on the actual lifted angle, not an angle reduced modulo $2\pi$. It excludes all other trigonometric winding branches before any algebraic root count. The same geometric argument applies to any formal candidate with $0<\lambda<1$ and $\beta<1$ by considering the analytic spiral on the interval between positive scaled times $\lambda t$ and $t$.

## Exact Cartesian balances and a new one-dimensional reduction

Write $s=\sin\delta$ and $c=\cos\delta$ only within this section and the reduction below; both are positive on the admitted angular interval. The exact source chord has length coefficient

$$
L=\sqrt{1+\lambda^2+2\lambda c},\qquad a=\frac{1-\lambda}{L}.
$$

The [previously reconstructed Cartesian balances](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md#cartesian-equation-and-reduction-to-two-balances) are

$$
\omega s=c+\lambda^{-1},\qquad
(1-\lambda)^2\omega^2=\lambda(1+\lambda c),
$$

with the independent clock identity $\delta=-\omega\log\lambda$. The first equation is direction agreement; the second is radial magnitude agreement. At a directional zero the physical transmitter factor is exactly $D=1/\lambda$.

Set

$$
x=\lambda^{-1}>1,\qquad p=x-1>0.
$$

The two acceleration equations become

$$
\omega s=x+c,\qquad p^2\omega^2=x+c.
$$

Since $\omega>0$, division gives $p^2\omega=s$. Hence the complete balance problem is equivalent to

$$
G(x,\delta):=(x+\cos\delta)(x-1)^2-\sin^2\delta=0,
\tag{1}
$$

$$
\frac{\delta}{\sin\delta}
=\frac{\log x}{(x-1)^2},
\tag{2}
$$

with reconstruction

$$
\omega=\frac{\sin\delta}{(x-1)^2}
=\frac{x+\cos\delta}{\sin\delta},\qquad
\lambda=x^{-1},\qquad
a=\frac{x-1}{\sqrt{x^2+1+2x\cos\delta}}.
\tag{3}
$$

Equation (2) is indispensable. The algebraic curve (1) alone balances direction and magnitude but generally fails the actual source-clock relation; its other points are not solutions of the delayed equation.

## One algebraic point at every possible causal angle

Fix $0<\delta<\pi/2$. At $x=1$, $G=-s^2<0$. At $x=1+s$,

$$
G(1+s,\delta)=s^2(s+c)>0.
$$

For every $x>1$,

$$
G_x=(x-1)(3x+2c-1)>0.
$$

Therefore (1) has exactly one root $x=x(\delta)$ in

$$
1<x(\delta)<1+\sin\delta<2.
\tag{4}
$$

It is continuously differentiable, and implicit differentiation gives

$$
x'(\delta)=
\frac{\sin\delta[(x-1)^2+2\cos\delta]}
{(x-1)(3x+2\cos\delta-1)}>0.
\tag{5}
$$

Thus reciprocal source ratio increases strictly with the possible angle along the algebraic balance curve. No numerical graph or cubic-root branch selection is needed.

There is also a useful exact speed identity. From (3) and $\omega s=x+c$,

$$
\beta^2=a^2(1+\omega^2)
=\frac{(x-1)^2}{\sin^2\delta}
=\frac1{x+\cos\delta}<1.
\tag{6}
$$

The last equality uses (1). The strict inequality follows from $x>1$ and $c>0$. Thus every point on this angularly admitted algebraic balance curve is automatically subfield; imposing the clock relation does not introduce another hidden speed test. Also $D=x\in(1,2)$ there.

## Strictly monotone scalar equation and endpoint signs

Define

$$
A(\delta)=\frac\delta{\sin\delta},\qquad
B(x)=\frac{\log x}{(x-1)^2},\qquad
H(\delta)=A(\delta)-B(x(\delta)).
$$

The first function is strictly increasing, because

$$
A'(\delta)=\frac{\sin\delta-\delta\cos\delta}{\sin^2\delta}>0.
$$

Indeed the numerator vanishes at zero and has derivative $\delta\sin\delta>0$. The second function is strictly decreasing for every $x>1$:

$$
B'(x)=\frac{(x-1)/x-2\log x}{(x-1)^3}<0,
$$

since $\log x=\int_1^x t^{-1}dt>(x-1)/x$. Together with (5), these give

$$
H'(\delta)=A'(\delta)-B'(x(\delta))x'(\delta)>0.
\tag{7}
$$

At the left endpoint, (4) implies $x(\delta)\to1$ as $\delta\downarrow0$. Writing $p=x-1$,

$$
B(x)\ge\frac1{x(x-1)}\longrightarrow\infty,
\qquad A(\delta)\longrightarrow1.
$$

Therefore $H(\delta)\to-\infty$.

At the right endpoint, $x(\delta)$ tends to the unique $x_+\in(1,2)$ satisfying $x_+(x_+-1)^2=1$. Thus

$$
\lim_{\delta\uparrow\pi/2}B(x(\delta))=x_+\log x_+
<2\log2<\frac32<\frac\pi2.
$$

The logarithm bound is elementary: $1/t$ is strictly below its secant line on $[1,2]$, so $\log2<\tfrac12(1+1/2)=3/4$. Consequently the right endpoint limit of $H$ is strictly positive.

Continuity gives at least one zero of $H$, and (7) gives at most one. The crossing is strict. Equations (1)–(3) therefore produce exactly one positive-frequency subfield parameter triple on the entire allowed domain, without a bounded frequency search and without relying on the earlier numerical locator for existence.

## Converse, exact identity of the branch and endpoints

Let $\delta_*$ be the unique scalar zero, let $x_*=x(\delta_*)$, and define the parameters by (3). All are positive with $0<\lambda_*<1$. Equation (2) gives

$$
\delta_*=
\frac{\sin\delta_*}{(x_*-1)^2}\log x_*
=\omega_*\log x_*,
$$

so $\lambda_*=e^{-\delta_*/\omega_*}$ exactly. Equation (1) gives $\omega_*\sin\delta_*=x_*+\cos\delta_*$ and $(x_*-1)^2\omega_*^2=x_*+\cos\delta_*$. These are both original Cartesian acceleration balances. The chord equation follows from the definition of $a_*$, and the speed bound follows from (6). Thus the unique scalar zero supplies a genuine candidate with all required identities, rather than an extraneous eliminated root.

The already [independently certified balance rectangle](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md#independent-target-result), centered at $(\omega,\delta)=(2.2980147591220047,1.1160548442916221)$ with coordinate radius $10^{-10}$, contains an admitted subfield zero. By global uniqueness it contains this unique scalar zero. Its earlier exact enclosures for $a$, $\lambda$, speed and source-cut radius therefore identify the only branch in the full ansatz. Those enclosures are reused with their original evidence; no new numerical measurement is asserted here.

No endpoint is omitted from the declared open class. $\lambda=1$ would give zero delay despite positive radius; $\lambda=0$ is excluded and cannot arise from the strictly decreasing scaled root residual with $a<1$. The limiting angle zero has the incompatible clock sign just proved, while $\delta=\pi/2$ is incompatible with the strict causal chord geometry and does not solve the limiting scalar equation. Zero frequency is outside the requested rotating ansatz and would give zero kinematic acceleration along an affine radial path against nonzero single-partner input. Superfield or equality histories and histories whose old superfield segments introduce additional roots are outside this complete uniformly subfield classification.

## Complete compatible realization of the unique branch

The analytic spiral need be supplied only from $S_c=\lambda_*-1$ onward, not through its formal singular origin at $T=-1$. Let $q_c,v_c,a_c$ be its jets at $S_c$, and let $\beta_*<1$ be its constant speed. Choose

$$
\eta=\min\left\{\frac1{100},
\frac{|q_c|}{8(1+\beta_*+|a_c|)},
\frac{1-\beta_*}{4(1+|a_c|)}\right\}>0.
$$

On the earlier interval $[S_c-\eta,S_c]$, with $z=(T-S_c+\eta)/\eta$, prescribe

$$
V(T)=v_c(3z^2-2z^3)+\eta a_cz^2(z-1),\qquad
q(T)=q_c-\int_T^{S_c}V(u)\,du.
$$

Hold the position before that interval and retain the analytic spiral afterward. The polynomial velocity has old-end value and derivative zero and new-end value and derivative $v_c,a_c$. Thus the complete history is $C^{2,1}$ with matching jets. Its patch speed is at most $\beta_*+\eta|a_c|<1$, and its displacement from $q_c$ is at most $|q_c|/8$. The held tail and patch remain separated; the retained spiral radius is at least $a_*\lambda_*>0$.

For every $T\ge0$, the candidate source $S=\lambda_*(1+T)-1$ lies at or after $S_c$, so the needed position and source velocity are unchanged by the earlier patch. The complete uniform speed bound gives exactly that partner root and no positive-delay self roots. At release, the retained second derivative equals the full received acceleration by the two exact balances. The resulting complete causal preparation is exactly compatible.

This reuses and analytically verifies the [existing preparation construction](alternatives-screen-2026-10-05-logarithmic-spiral-formulation.md#a-complete-separated-compatible-preparation). No new branch requires a different old history. Earlier unused histories remain nonunique; the theorem fixes the future parameters, not an artificial unique preparation.

## Claim boundary, falsifiers and validation

The result classifies complete uniformly subfield solutions within the stated mirror-planar self-similar ansatz. It neither classifies all subfield binaries nor imports the separate growing-mode or nonlinear-departure results. Balance, stability and subsequent perturbed fate remain different questions. The previous exact trajectory's linear radial growth, constant speed and unbounded angular advance follow from its formula, but no new dynamical attraction claim follows from parameter uniqueness.

Load-bearing falsifiers are a complete subfield causal interval whose actual angular lift exceeds the proved half-plane range; failure of either original Cartesian balance to reduce reversibly to (1)–(2); an algebraic root $x>1$ outside the strict uniqueness in (4); failure of a derivative sign in (5) or (7); failure of the endpoint signs; or a complete compatible additional branch satisfying the same strict hypotheses. A formal multiwinding zero without a complete subfield root census, or a different history family outside this ansatz, is not a counterexample to the theorem.

Validation is analytical: complete root monotonicity, the causal half-plane argument, the two reversible balance reductions, the strict algebraic derivative, the monotonic scalar crossing, elementary endpoint bounds and the explicit compatible patch. No new numerical instrument or target was run; the earlier independent rational enclosure is used only to identify the already admitted point on the analytically unique branch. Measured repository validation: `git diff --no-index --check /dev/null` applied to this new file returned no whitespace diagnostics; that check establishes a repository fact, not mathematical correctness. This source is frozen for independent assessment before shared integration.

Only this new classification source is authored. All prior formulations, certificates, assessments, shared manuscripts, registries, ledgers and priorities remain outside its write scope. No production solver, regular test, generator or Git publication is changed. No owned process is active. The bounded classification is complete; independent assessment remains with the principal investigator.
