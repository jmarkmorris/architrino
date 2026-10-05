# Global dispersal for the fixed uniform-memory preparation

## Claim, dependency and fixed law

For every sufficiently small fixed $\epsilon>0$, the [complete compatible preparation](alternatives-screen-2026-10-05-memory-formulation.md) has an all-future separated uniformly subfield mirror-planar continuation under the unchanged canonical-plus-uniform-memory equation, with $K=c_f=\lambda=\tau=1$ and every ordinary root retained. Its radius tends to infinity. Its polar angle has a finite limit, and its physical velocity tends to a nonnegative outward radial vector. The terminal speed is permitted to vanish.

**Grade:** derived in this subject, pending independent assessment of this source and its [exact-memory transition dependency](alternatives-screen-2026-10-05-memory-slow-transition.md). The proof is analytical; no numerical launch speed or explicit numerical smallness threshold is certified. Neither canonical binary fate nor the separate radial-power fate is a premise. The essential law-specific input is the weighted estimate for the exact finite-memory integral, reconstructed in the dependency.

Use its unchanged scaled variables

$$
r_0=(6\epsilon^2)^{-1},\qquad s=\epsilon T/r_0,\qquad
Y=q/r_0,\qquad h=Y\times Y',\qquad r=|Y|,\qquad
u=Y'\cdot n,\qquad v=h/r.
$$

The preparation, endpoint compatibility, complete-past regularity and initial-layer bounds remain exactly those in the two sources linked above. In particular, after its short layer $h>0$ and the fixed nonzero eccentricity event $|e|=e_*$ occurs at finite physical time. This source starts there, retaining all earlier history in each causal and memory window.

## Uniform regularized row from the exact memory estimate

Take provisional bounds

$$
h\ge\frac12,\qquad 0<z<4,\qquad |y|<4,\qquad
z=\frac{h^2}{r},\qquad y=hu,\qquad \delta=\frac\epsilon h.
$$

They imply $r>h^2/4$, $|Y'|=\sqrt{y^2+z^2}/h$, and a uniform physical speed bound $|q'|\le 12\epsilon$. Together with the prepared past and a sufficiently small $\epsilon$, the complete history therefore has speed below a fixed number less than one. There is exactly one ordinary partner root and no positive-delay ordinary self root. This is a proved consequence of the complete subfield chord bound; no root is discarded as a convention.

The weighted-memory argument in the dependency applies on this entire domain, including $z\downarrow0$. It gives the actual signed row

$$
\begin{aligned}
A_r&=-\frac{1+\epsilon u-\epsilon^2v^2/2}{r^2}+Q_r,
&|Q_r|&\le\frac{C\epsilon^3}{r^2h^3},\\
A_t&=\frac{\epsilon v+\epsilon^2uv}{r^2}+Q_t,
&|Q_t|&\le\frac{C\epsilon^3v}{r^2h^2}.
\end{aligned}
$$

These constants depend on the fixed provisional domain, not its radial upper extent or elapsed time. In particular, the source-radius comparison and $|h(\sigma)-h(s)|\le C\epsilon$ persist on arbitrarily long causal intervals. The finite-memory defect itself obeys $|A-F|\le C\epsilon^3/(h^3r^2)$ and $|(A-F)_t|\le C\epsilon^3h/r^4$. These are estimates for the exact response, not a truncation of its characteristic multiplier. Its transient has already decayed before the chosen entry, and the same Volterra estimate retains that bound thereafter.

The actual polar angle $\theta$ is strictly increasing, with $d\theta/ds=h/r^2$. Since $h'=rA_t$, division by this derivative yields

$$
h_\theta=\epsilon+\epsilon^2u+O(\epsilon^3/h^2)
=\epsilon[1+\delta y+O(\delta^2)].
$$

It is positive for sufficiently small $\epsilon$. The lower bound on $h$ is consequently preserved. Differentiate $z=h^2/r$ and $y=hu$ exactly, using $u'=h^2/r^3+A_r$. The order-$\delta y$ terms in $y_\theta$ cancel between $h_\theta u$ and the radial response. Thus

$$
\begin{aligned}
z_\theta&=-y+2\delta z+R_z,& |R_z|&\le C\delta^2z,\\
y_\theta&=z-1+R_y,& |R_y|&\le C\delta^2,\\
\delta_\theta&=-\delta^2+R_\delta,& |R_\delta|&\le C\delta^3.
\end{aligned}
$$

For example, the retained second-order terms are $2\delta^2yz$ in the first equation and $\delta^2(y^2+z^2/2)$ in the second; the displayed error bounds include them. The factor $z$ in $R_z$ is exact geometric structure and will be retained at the boundary. The last equation follows from $\delta=\epsilon/h$, rather than an independent approximation.

## Algebraic controls before the escape argument

The zero-$\delta$ comparison is the harmonic system

$$
z_\theta=-y,\qquad y_\theta=z-1.
$$

Its solution has circles centered at $(1,0)$ in the $(z,y)$ plane, as direct differentiation of $(z-1)^2+y^2$ verifies. These are auxiliary comparison curves. No conservation law for the delayed equation is asserted.

Put

$$
E=\frac12[(z-1)^2+y^2],\qquad B=(z+1)y.
$$

The following identities are the exact algebraic controls:

$$
E_\theta=2\delta z(z-1)+O(\delta^2),\qquad
F_0\cdot\nabla B=2(z-1)+(z-1)^2-y^2,
$$

where $F_0=(-y,z-1)$. Subtracting the second expression from $2z(z-1)$ gives $(z-1)^2+y^2=2E$. Consequently the corrected scalar

$$
\mathcal I=E-\delta(z+1)y
$$

obeys, on every fixed bounded portion of the provisional domain,

$$
\mathcal I_\theta=2\delta E+O(\delta^2).
$$

This calculation uses $\delta_\theta=O(\delta^2)$ and the actual remainders above. It is pointwise and avoids a fixed-period averaging argument at the boundary. The control at the central circle has $E=0$ and gives no positive drift by itself, which is why the separately proved finite-amplitude entry is needed. The control at $z=0,y=0$ has $E=1/2$ and is handled explicitly below.

## Finite-angle approach to unbounded radius

At the actual entry $|e|=e_*$, the identities $z=1+e\cdot n$ and $y=-e\cdot t$ give exactly

$$
E_b=e_*^2/2>0.
$$

Fix $e_*$ small, once, as in the transition theorem. Choose $\epsilon$ small enough that the correction $\delta B$ and the $O(\delta^2)$ derivative error are each smaller than a fixed fraction of this entry scale on $E\in[E_b/2,2]$. This choice is legitimate because $E_b$ is fixed independently of $\epsilon$ and $\delta$ is nonincreasing. While $E\in[E_b/2,1]$ and $z>0$,

$$
\mathcal I_\theta\ge cE_b\delta>0.
$$

The difference between $\mathcal I$ and $E$ excludes exit through $E=E_b/2$. This region is strictly inside $z<4,|y|<4$, because $E\le1$ implies $z\le1+\sqrt2$ and $|y|\le\sqrt2$. It also retains positive clearance $r\ge h^2/4$ and the uniform physical speed margin.

If this region persisted for an infinite polar-angle interval, $\delta_\theta=-\delta^2[1+O(\delta)]$ would imply $\int\delta\,d\theta=\infty$. Integrating the positive derivative of $\mathcal I$ would then contradict its boundedness. A finite angle endpoint with $z$ bounded away from zero is an ordinary continuation point: $h_\theta$ is bounded, $h$ stays positive, physical time is finite on that compact chart, and the root and memory denominators stay regular. Therefore either $z\to0$ at finite angle, or $E$ first reaches $1$ at finite angle.

In the latter case, the zero-$\delta$ harmonic comparison through the crossing has radius $\sqrt2$ about $(1,0)$. From every starting point on its positive-$z$ arc, it crosses $z=0$ with $y=1$ within at most one full angle period. On a slightly longer fixed interval it reaches a fixed negative value of $z$. This is a compact comparison statement with a uniform transverse crossing; the starting arc is compact after adjoining its endpoints. The actual vector field differs by $O(\delta)$ on this fixed interval and $h$ changes by only $O(\epsilon)$. A finite-interval integral estimate therefore keeps the actual $z,y$ within $O(\delta)$ of that comparison up to the first actual $z=0$ endpoint. If no such endpoint occurred, the actual positive $z$ would become negative, a contradiction. During this last comparison segment the enlarged bound $E<2$ keeps $z,y$ strictly inside the provisional box. It follows that

$$
\theta\uparrow\theta_\infty<\infty,\qquad z\downarrow0
$$

in the sense that $z$ tends to zero, without claiming monotonicity on the earlier oscillatory interval. The actual $h$ tends to a finite positive $h_\infty$, since $h_\theta$ is bounded on this finite angle interval. Bounded derivatives give a limit $y_\infty$. Positivity of $z$ before its endpoint and $z_\theta=-y+O(z)$ require $y_\infty\ge0$.

## Reconstruction at both terminal boundaries

The exact reconstruction formulas are

$$
r=\frac{h^2}{z},\qquad
\frac{ds}{d\theta}=\frac{h^3}{z^2},\qquad
q'(T)=\frac\epsilon h(yn+zt).
$$

If $y_\infty>0$, then $z\asymp\theta_\infty-\theta$, so $s\to\infty$ and $r\asymp s$. More precisely the physical velocity tends to $(\epsilon y_\infty/h_\infty)n_\infty$, a positive outward vector.

If $y_\infty=0$, then near the endpoint the second row gives $y_\theta=-1+O(\delta^2)+o(1)$. For sufficiently small launch speed it is bounded between two strictly negative constants. Integrating backward from $y_\infty=0$ gives $y\asymp\theta_\infty-\theta>0$. Retaining the factor $z$ in the first-row error gives

$$
z_\theta=-y+b(\theta)z,\qquad |b(\theta)|\le C\delta.
$$

The final-value integral formula for this linear equation gives $z\asymp(\theta_\infty-\theta)^2$. Hence

$$
s\asymp(\theta_\infty-\theta)^{-3},\qquad
r\asymp s^{2/3},\qquad q'(T)\longrightarrow0.
$$

In both cases physical time $T=r_0s/\epsilon$ tends to infinity. Thus the reciprocal-radius boundary is not a finite-time event, root singularity or speed-ceiling arrival. The complete trajectory is separated and uniformly subfield for all finite future time, while $|q(T)|\to\infty$ as $T\to\infty$. Mirror symmetry gives the opposite limiting velocity for the partner. The sign argument and root coverage remain valid through every finite-time continuation.

## Scope, falsifiers, validation and process ownership

This conclusion is preparation-scoped and existential in the small launch speed. It does not certify a numerical $\epsilon_*$, select which terminal-speed case occurs, prove robustness under arbitrary history perturbations, or establish a speed barrier for the memory law on unrelated histories. The theorem is about the unchanged fixed coefficients and its frozen complete preparation. The memory term was kept exactly in the error and continuation estimates; no negative response coefficient or effective central approximation supplied the fate by itself.

The load-bearing falsifiers are a failure of the weighted exact-memory bound on the stated changing-scale chart; loss of the transverse factor in that bound; a missing order-$\delta$ term in the regularized $y$ row; an error in the explicit corrected-scalar identity; or a zero-radius-coordinate approach with finite physical time contrary to the two reconstructed endpoint cases. Independent assessment should first check the memory-transfer dependency, then the cancellation and the $z$ factor in the first row, and finally the tangential endpoint reconstruction. The entry source's geometric seed is also indispensable: this argument supplies no entry from a formal circle alone.

Validation consists of the explicit zero-$\delta$ harmonic solution, direct differentiation of the corrected scalar, and the two endpoint reconstructions written above; these are algebraic/theorem controls, not computational measurements. No numerical instrument, target trajectory, production solver or regular test was introduced or run. No owned process remains active. Only this new source is authored here; all previous subjects and references are preserved. Independent assessment is required before the root investigator integrates a global fate claim.
