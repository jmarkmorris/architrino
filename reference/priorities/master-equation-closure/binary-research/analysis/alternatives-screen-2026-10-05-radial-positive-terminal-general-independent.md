# Positive terminal speeds for every fixed radial exponent between one and three

## Result and the regularity issue

**Claim grade: derived candidate, requiring independent assessment of the new regularization argument.** For every fixed $1<p<3$, positive-terminal-speed parameters accumulate at zero in the unchanged complete compatible circle-tail family, with $K=R_*=c_f=1$. Every sufficiently small interval $(0,\epsilon_1)$ contains a member whose actual delayed future has strictly positive outward terminal velocity magnitude. Together with the admitted zero-speed accumulation result, both terminal alternatives occur arbitrarily far down each fixed-power slow family.

The proof extends the terminal-subtracted-action mechanism from the [frozen three-halves source](alternatives-screen-2026-10-05-radial-positive-terminal-existence-independent.md), but it does not simply substitute an exponent into a differentiable-flow argument. For $2<p<3$ the central vector field is continuous and generally not locally Lipschitz at the zero-radius coordinate. Moreover, for $7/3\le p<3$, the exact period has an unbounded derivative at the zero-energy oval, and the standard exact orbit primitive cannot be $C^1$ on an annulus containing that oval.

A fixed $C^1$ approximate orbit primitive is sufficient. Its directional residual can be made uniformly as small as desired before the launch threshold is chosen. Its full first derivatives are bounded once this approximation is fixed. The resulting action still has a strictly positive derivative and an exact common zero-speed endpoint value. This supplies the conditional terminal-time estimate and relative local constancy of the winding integer without differentiating the fractional flow.

No numerical admission threshold, particular positive parameter, genericity claim, ordering of terminal speeds, discreteness of the zero set, physical conserved energy or modified preparation is asserted. All constants may depend on the fixed exponent. The argument excludes $p=1$ and $p=3$.

## Unchanged family and inherited complete-history estimates

Use exactly the [fixed-power compatible preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), evaluated at the selected $p$:

$$
r_0=(2^p\epsilon^2)^{-1/(p-1)},\qquad
s=\epsilon T/r_0,\qquad q(T)=r_0Y(s).
$$

The old path is $Y_c(s)=(\cos s,\sin s)$. With $\xi=\epsilon\cos\xi$, $d_0=\epsilon/16$ and

$$
B_p=(1,0)-\frac{(\cos\xi,-\sin\xi)}
{\cos^p\xi(1+\epsilon\sin\xi)},
$$

retain $Y=Y_c$ for $s\le-d_0$ and the same patch

$$
Y=Y_c+\frac{d_0^2}{2}\zeta^3(1-\zeta)^2B_p,\qquad
\zeta=1+s/d_0,\qquad -d_0\le s\le0.
$$

The partner is its exact negative. The supplied history is complete, separated, locally $C^{2,1}$ and uniformly subfield, with positive signed geometric areal rate. The release source lies in the unchanged tail; the patch jets enforce exact acceleration compatibility. The [above-two proof](alternatives-screen-2026-10-05-radial-power-above-two-independent.md) verifies these same bounds for $2<p<3$, without changing the family.

The selected acceleration remains $-N/(R^pD)$ over the complete ordinary root census. The admitted sufficiently slow futures have exactly one simple partner root and no positive-delay self root by complete subfield chord geometry. They are global in physical time, uniformly subfield, separated, and disperse. Every finite reception interval accesses only a compact part of the retained past, with positive delay and transmitter margins. Source acceleration is bounded there, so ordinary position-velocity continuation and finite-time dependence on the supplied parameter remain valid.

Set

$$
\beta=p-1,\quad m=3-p,\quad
\alpha=\beta/2,\quad k=2/m,\quad d=\beta/m,
\quad c=\frac{\beta(p-2)}m,\quad \gamma=\frac{p\beta}{m}>0.
$$

With $r=|Y|$, $u=Y'\cdot Y/r$ and $h=Y\times Y'$, use

$$
a=h^{2/m},\quad x=r/a,\quad
z=x^{-\beta},\quad y=a^\alpha u,\quad
\delta=\epsilon a^{-\alpha},\qquad
\frac{d\chi}{ds}=a^{-(p+1)/2}x^{-p}.
$$

After the finite fixed-amplitude transition, the complete receiving and nested source windows supply the actual rows

$$
\begin{aligned}
z_\chi&=-\beta y+\beta k\delta z+E_z,
&|E_z|&\le C_p\delta^2z,\\
y_\chi&=z^\nu-1+c\delta y+E_y,
&|E_y|&\le C_p\delta^2,\\
\delta_\chi&=-d\delta^2+E_\delta,
&|E_\delta|&\le C_p\delta^3,
\qquad \nu=\frac m\beta>0.
\end{aligned}
$$

The errors depend on the actual retained delayed history. They are bounded as displayed and are never differentiated. The transverse response retains its transverse velocity factor, so no unbounded error is introduced by the weighted clock. The actual post-transition path stays in a fixed compact box and a scalar annulus away from the unique central minimum. The final bounded comparison segment, if reached, stays inside a slightly larger such annulus.

The endpoint is finite in $\chi$ and infinite in physical time, with

$$
z\to0,\qquad y\to y_\infty\ge0,\qquad
\delta\to\delta_\infty>0,\qquad a\to a_\infty<\infty.
$$

Physical terminal speed is $\delta_\infty y_\infty$. The admitted winding coordinate has a nonzero finite-prefix history and terminal integer $N_p(\epsilon)\to-\infty$ as $\epsilon\downarrow0$. These inherited conclusions are owned by the [global source](alternatives-screen-2026-10-05-radial-power-family-global.md) and [zero-speed source](alternatives-screen-2026-10-05-radial-power-family-zero-speed.md) for $1<p\le2$, and by the separately reconstructed above-two proof for $2<p<3$.

## Continuous orbit primitive and the regularity actually available

Extend only the mathematical comparison to real $z$:

$$
W(z)=\frac12|z|^{2/\beta}-\frac z\beta,\qquad
e=\tfrac12y^2+W(z),\qquad
F_0=(-\beta y,g(z)),\qquad
g(z)=\operatorname{sgn}(z)|z|^\nu-1.
$$

Since $2/\beta=1+\nu>1$, $W$ is $C^1$, $W'=g/\beta$, and $e$ is a $C^1$ first integral. The unique minimum is at $(z,y)=(1,0)$; its scalar value is $e_{\min}=1/2-1/\beta$. On an annulus away from that point the comparison has no equilibrium.

The comparison flow is unique even when $0<\nu<1$. Away from $z=0$ its field is smooth. At $z=0,y\ne0$, use $z$ as time and solve $dy/dz=-g(z)/(\beta y)$, locally Lipschitz in its dependent variable. At $(0,0)$, $W'(0)=-1/\beta$ permits a local $C^1$ inverse; on an energy level write $z=W^{-1}(e-y^2/2)$ and separate the scalar equation $y_\chi=g(z)$, whose continuous right side is bounded away from zero. No waiting trajectory is possible.

Continuous dependence follows from compactness of approximate trajectories and uniqueness of their integral-equation limits. Every central level in the compact annulus is a closed oval with a finite continuous period $Q(e)$. At each turning point $W'$ is nonzero uniformly on a sufficiently small level neighborhood; changing variables to $W(z)$ leaves a continuous bounded coefficient times the integrable square-root endpoint kernel. This proves period continuity even at the zero-energy turning point $(0,0)$.

Define

$$
I(e)=\oint y^2\,d\chi
=\frac2\beta\int_{z_-(e)}^{z_+(e)}
\sqrt{2[e-W(z)]}\,dz.
$$

Differentiating this action integral gives $I'(e)=Q(e)$. The integrand vanishes at the simple turning endpoints, and its differentiated square-root singularities are integrable with uniform local control. Thus $I$ is $C^1$, with bounded positive derivative on the compact annulus, even when $Q$ is not differentiable.

The actual scalar row is

$$
e_\chi=\delta F(z,y)+O_p(\delta^2),\qquad
F=cy^2+k(|z|^{2/\beta}-z).
$$

On a central oval, integration of $(zy)_\chi$ gives

$$
\oint(|z|^{2/\beta}-z)\,d\chi=\beta I(e),\qquad
\oint F\,d\chi=\gamma I(e).
$$

Therefore the continuous function

$$
G(z,y)=Q(e)F(z,y)-\gamma I(e)
$$

has zero integral around every central oval. Integration from the transversal $z=1,y>0$ defines a single-valued continuous primitive $B$ on the annulus, with derivative $G$ along each comparison trajectory. Continuity across the section follows from the zero orbit integral and the continuous periods and trajectories. This argument establishes continuous $B$ and its continuous directional derivative; it does not assert bounded full first derivatives.

## A fixed $C^1$ approximate primitive with uniformly small transport error

The needed approximation can be proved locally without a differentiable flow theorem. At every point of the annulus, at least one of $g(z)$ and $y$ is nonzero.

Where $g(z)\ne0$, use the coordinate map

$$
(z,y)\longmapsto(e,y).
$$

Its Jacobian is $W'(z)=g(z)/\beta\ne0$, so it is a local $C^1$ diffeomorphism. In these coordinates, $F_0$ has the form $(0,g)$, with continuous nonvanishing second component. The continuous primitive obeys

$$
\partial_y B(e,y)=G(e,y)/g(e,y),
$$

and this partial derivative is continuous. Where $y\ne0$, use $(e,z)$ instead. Its Jacobian is nonzero and $F_0$ becomes $(0,-\beta y)$, giving continuous $\partial_zB=-G/(\beta y)$.

Take finitely many such charts covering a compact annulus slightly larger than the actual post-transition range. In each chart, mollify the continuous primitive in the coordinate variables on a slightly larger rectangle. On an interior compact rectangle, both the function and its derivative in the flow coordinate converge uniformly: the latter follows by convolving its existing continuous partial derivative. The resulting local functions are $C^1$ after pullback by the $C^1$ coordinate map. Their derivative in the original $F_0$ direction consequently approximates $G$ uniformly. No derivative of $g$ is taken.

Choose a $C^1$ partition of unity $\rho_j$ subordinate to the finite chart cover. If $B_j$ denotes a local approximation, then

$$
\widetilde B=\sum_j\rho_jB_j
$$

is $C^1$ on a neighborhood of the compact annulus. Because $\sum_j\nabla\rho_j=0$,

$$
F_0\cdot\nabla\widetilde B-G
=\sum_j\rho_j(F_0\cdot\nabla B_j-G)
+\sum_j(F_0\cdot\nabla\rho_j)(B_j-B).
$$

All partition derivatives and field values are bounded. The local approximations can therefore be chosen so that, for any prescribed $\eta>0$,

$$
\|\widetilde B-B\|_\infty<\eta,\qquad
\|F_0\cdot\nabla\widetilde B-G\|_\infty<\eta.
$$

Once this approximation is fixed, $\widetilde B$ and all its first derivatives are bounded on the compact annulus. Their bound may be large and may depend on $p$ and $\eta$. No uniform control as $\eta\downarrow0$ is needed.

Choose $\eta<\gamma I_{\min}/4$, where $I_{\min}>0$ is the minimum action on this annulus, and freeze this analytical approximation before choosing the final sufficiently small launch threshold. It is a proof device applied to the comparison flow, not a change of the delayed equation, family, response or history.

## Terminal subtraction and the conditional endpoint-time bound

Let $\widetilde B_0=\widetilde B(0,0)$ and define

$$
\mathcal A=
I(e)-I(0)-\delta[\widetilde B(z,y)-\widetilde B_0].
$$

The actual coordinate path is differentiable, $I$ is $C^1$, and $\widetilde B$ has bounded first derivatives. The ordinary chain rule is therefore justified. Write

$$
F_0\cdot\nabla\widetilde B
=Q(e)F-\gamma I(e)+r_\eta,\qquad |r_\eta|\le\eta.
$$

Using the actual delayed rows, without differentiating their remainders, gives

$$
\mathcal A_\chi
=\delta[\gamma I(e)-r_\eta]+O_{p,\widetilde B}(\delta^2).
$$

After reducing the launch threshold to absorb this fixed approximation's derivative bound,

$$
\mathcal A_\chi\ge c_A\delta,\qquad
\delta_\chi\ge-C_\delta\delta^2
$$

for fixed positive constants on the entire post-transition path. The directional approximation error is first order in $\delta$ but was chosen strictly smaller than the positive leading action drift. The finite gradient bound controls only the subsequent quadratic error.

At every zero-speed endpoint, $(z,y)\to(0,0)$ and $\delta\to\delta_\infty>0$, hence exactly $\mathcal A\to0$. Thus $\mathcal A<0$ at every earlier post-transition reception on such a member. If its state at a reception is $(\mathcal A_0,\delta_0)$ and its remaining weighted time is $L$, then

$$
-\mathcal A_0
\ge\frac{c_A}{C_\delta}
\log(1+C_\delta\delta_0L),
$$

and consequently

$$
L\le
\frac{\exp[C_\delta(-\mathcal A_0)/c_A]-1}
{C_\delta\delta_0}.
$$

This follows by first integrating $\delta(t)\ge\delta_0/(1+C_\delta\delta_0t)$ and then the action derivative. It is a bound conditional on zero terminal speed, not an assumed continuity of terminal data.

For a fixed zero-speed member, the bound tends to zero at late receptions because $\mathcal A_0\to0$ and $\delta_0\to\delta_\infty>0$. At a fixed sufficiently late finite physical time, complete-history parameter continuity makes it uniformly small for nearby zero-speed members. A nearby member with $\mathcal A_0\ge0$ is already excluded from the zero-speed class by strict increase.

## Relative winding constancy and positive-speed occurrence

Put $\ell=1/\beta>1/2$ and $\kappa=\sqrt m$. The winding coordinate is written with an explicit addition of its real and imaginary components:

$$
\mathcal W=
\kappa(1-x_\delta z^\ell)
+i\left[z^\ell y-k\delta z^{\ell+1}\right].
$$

At $p=3/2$ this is the additive interpretation of the corresponding display in the frozen three-halves source; its bytes are preserved. The local corrected minimum $x_\delta=1+O_p(\delta^2)$ is a smooth function of $\delta$. The admitted phase proof gives nonvanishing $\mathcal W$ throughout each finite physical future, a continuously selected release argument, and

$$
\mathcal W\to\kappa>0,\qquad
\psi_\infty=2\pi N_p(\epsilon),\qquad
N_p(\epsilon)\to-\infty.
$$

For $\ell<1$, differentiability of $z^\ell$ at zero is not required for the following step. Choose a fixed small $\zeta>0$ so that $z<\zeta$ implies $\operatorname{Re}\mathcal W>\kappa/2$. The actual global rows give a finite bound $|z_\chi|\le M_z$.

Fix a zero-speed parameter $\epsilon_0>0$ and take a sufficiently late finite physical reception $T_0$ with small $z(T_0)$ and small negative $\mathcal A(T_0)$, while $\delta(T_0)$ stays bounded away from zero. The conditional time bound, together with finite-history continuity, makes every nearby zero-speed member's remaining weighted duration less than the time needed to move from its initial small $z$ to $\zeta$ under $|z_\chi|\le M_z$. Therefore all those remaining paths stay in the right half-plane of $\mathcal W$ and make no additional whole turn.

The transition occurs before $T_0$ for nearby parameters: its amplitude crossing is transverse, and finite-time parameter continuity preserves a later reception beyond that crossing. On the finite prefix ending at $T_0$, $\mathcal W$ has a positive minimum modulus and its lifted phase varies continuously with parameter. Subtracting the right-half-plane argument at $T_0$ leaves a continuous integer, constant on a small connected parameter neighborhood. For every zero-speed member there, this is its terminal integer $N_p$.

Thus $N_p$ is locally constant relative to the zero-speed set. If any interval $(0,\epsilon_1)$ consisted entirely of zero-speed members, it would be locally constant everywhere on that connected interval and hence constant. This contradicts its divergence as $\epsilon\downarrow0$.

Every sufficiently small interval therefore contains a positive-speed member, and a sequence of such parameters tends to zero. The already proved positive terminal strip makes the positive set open. No emptiness assumption about that open set was used as evidence; emptiness on a whole sufficiently small interval has just been contradicted.

This result does not make the zero set discrete or exclude zero-speed intervals away from zero. It does not prescribe a numerical parameter or a common sequence across different exponents. The admitted memberwise linear-radius and finite-angle conclusions apply to each positive member, with no new asymptotic coefficient claimed here.

## Why an exact $C^1$ primitive cannot simply be assumed

The approximate construction is substantive for the upper part of the interval. Let $0<\nu\le1/2$, equivalently $7/3\le p<3$. Near the left turning point $z=0$ on the zero-energy oval, $W$ has a local inverse $Z(w)$. Put $\rho(w)=-Z'(w)>0$. From $W'=g/\beta$,

$$
\rho(w)=\beta\left[1-\operatorname{sgn}(w)\beta^\nu|w|^\nu
+o(|w|^\nu)\right],
$$

and, off zero,

$$
\rho'(w)\sim-\nu\beta^{\nu+1}|w|^{\nu-1}.
$$

Fix a small negative $w_c$. The local contribution to the period is

$$
Q_{\mathrm{loc}}(e)
=\frac{\sqrt2}{\beta}
\int_{w_c}^{e}\frac{\rho(w)}{\sqrt{e-w}}\,dw.
$$

For $e<0$, differentiation after setting $v=e-w$ produces a bounded endpoint term and an integral of $\rho'(e-v)v^{-1/2}$. As $e\uparrow0$, its negative magnitude diverges like $|e|^{\nu-1/2}$ when $\nu<1/2$, and logarithmically when $\nu=1/2$. The complementary period contribution stays $C^1$, because it is away from the fractional point. Hence $Q'(e)\to-\infty$ from this side; $Q$ is continuous but not $C^1$ at zero.

Suppose an exact $C^1$ primitive $B$ solved $F_0\cdot\nabla B=Q(e)F-\gamma I(e)$ on an annulus containing the zero oval. Choose a short central arc with $z$ bounded away from zero and from its turning points, and endpoints on smooth transverse sections. Its transit time $t(e)$ and integral $A(e)=\int F\,d\chi$ are $C^1$ near zero. The arc can be chosen with $A(0)\ne0$: on the zero oval,

$$
F=-2z+pz^{1+\nu},
$$

which is nonzero on sufficiently small fixed positive-$z$ arcs. Integration of the transport equation between those sections would give

$$
B_{\mathrm{end}}(e)-B_{\mathrm{start}}(e)
=Q(e)A(e)-\gamma I(e)t(e).
$$

The left side and the second term on the right would be $C^1$, while the first term has an unbounded derivative because $A(0)\ne0$. This is a contradiction. Changing the primitive's additive function of energy does not help, since it cancels between the endpoints.

The exact continuous primitive still exists and has its continuous flow-direction derivative. The fixed approximate $C^1$ primitive used above is what supplies bounded full derivatives without a false regularity claim. No differentiability of $Q$ is used in the positive-speed proof.

## Falsifiers, source identities and validation scope

Load-bearing falsifiers are failure of continuous unique comparison flow, noncontinuous periods, failure of $I'=Q$, or failure of the zero orbit integral. For the new regularization step, a point on the annulus with neither local $C^1$ coordinate chart available, failure of uniform approximation of the existing flow-coordinate derivative, or a nonvanishing partition error despite uniform function approximation would invalidate the construction. The terminal argument fails if the fixed approximation cannot preserve a strictly positive action drift, if a zero-speed endpoint has nonzero terminal $\mathcal A$, or if the displayed finishing-time inequality is violated. The full-history parameter-continuity and nonvanishing winding premises remain independently load-bearing.

The analytical validation route is to verify the local chart mollification and partition identity independently, then reconstruct the terminal subtraction and scalar time integral. The period-derivative calculation is a separate adverse regularity control: it tests precisely the stronger exact-$C^1$ claim that this proof avoids. No target computation, new executable checker, Python process or numerical fit is used.

Antecedent identities measured with shasum -a 256 before authoring:

| Source | SHA-256 |
| --- | --- |
| Frozen three-halves positive-speed source | d6f10b81e4a9d79d221eb6eb0d9617d2d33c91b2881824a14d765475da738440 |
| Above-two global and zero-speed proof | 3cacef09ab24ae778300d0f94309155d7c940afcf31e2466468caaad1bb98b8e |
| Fixed-power global proof | 5eb796ea43033ce243560a0220a5e00614a8fc856ed3ac1bc7556b64e1e9b3b1 |
| Fixed-power zero-speed proof | 359f1e30d08863028bbf76d56d372f94874eee8fcb8d5a47fd72f23035830ac5 |
| Fixed-power complete preparation | 5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04 |

Only this new general positive-terminal source is authored. All antecedents, shared owners, preparations and frozen references remain unchanged. Scoped whitespace and final source-identity checks follow creation. The new theorem remains a candidate until independent mathematical assessment; no extension to memory or to either endpoint exponent is asserted.
