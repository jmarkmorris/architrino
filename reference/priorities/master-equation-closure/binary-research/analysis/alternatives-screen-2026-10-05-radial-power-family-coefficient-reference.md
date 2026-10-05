# Independent changing-scale coefficients for fixed radial powers

## Scope and provenance

This coordinator reference derives the local changing-scale coefficients independently for every fixed $1<p\le2$, with $K=R_*=c_f=1$. It addresses the new [complete preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), while preserving the earlier three-halves and canonical sources. The worker's proposed first-order growth coefficient was disclosed before this calculation; the algebra below is reconstructed directly from the source clock and acceleration, rather than accepted from that disclosure. It is a mathematical reference for the coefficient rule. It does not by itself prove a finite-amplitude transition, global fate, numerical admission threshold or uniformity as $p\downarrow1$.

Set $c=p-1$, $k=3-p$, $r_0=(2^p\epsilon^2)^{-1/(p-1)}$, $Y=q/r_0$ and $s=\epsilon T/r_0$. The selected mirror row is

$$
Y''=-\frac{2^pN}{R_d^pD},\qquad R_d=|Y(s)+Y(\sigma)|,\qquad s-\sigma=\epsilon R_d,\qquad D=1+\epsilon N\cdot Y'(\sigma).
$$

The preparation is the complete circular tail and exact old-sourced endpoint patch named above; it is not assumed to obey the future equation before release. On any fixed compact changing-scale chart with positive radius, the complete uniform subfield bound gives one partner root and no positive-delay self root. The following local expansion assumes and retains that chart, including its supplied-past windows. Its constants may depend on fixed $p$ and the chart.

Write $r=|Y|$, $u=Y'\cdot n$, $v=Y'\cdot t$, $h=rv$, and

$$
a=h^{2/k},\qquad x=r/a,\qquad y=a^{c/2}u,\qquad \delta=\epsilon a^{-c/2},\qquad \frac{d\eta}{ds}=a^{-(p+1)/2}.
$$

Thus $v=a^{-c/2}/x$ exactly. These are coordinates on a delayed solution, not a circular solution or a conserved physical account.

## Direct source expansion

Put $L=R_d/(2r)$. Integral Taylor expansion over the whole actual source window, using its central acceleration and its controlled first-order discrepancy, gives

$$
L=1-\epsilon u+\epsilon^2\left(u^2-r^{1-p}+\frac{v^2}{2}\right)+O(\delta^3),
$$

$$
N_r=1-\frac{\epsilon^2v^2}{2}+O(\delta^3),\qquad N_t=-\epsilon v+O(\delta^3),
$$

$$
D=1+\epsilon u+\epsilon^2(2r^{1-p}-v^2)+O(\delta^3).
$$

For example, the transverse displacement is $-(s-\sigma)v$ to cubic order in local units. Dividing it by $R_d=(s-\sigma)/\epsilon$ cancels the potentially spurious second-order $uv$ term in $N_t$. The source velocity change has radial leading term $(s-\sigma)r^{-p}$. Substitution into $N\cdot Y'(\sigma)$ gives the stated transmitter coefficient. These steps use integral acceleration bounds, not an actual jerk hypothesis or differentiation of a remainder.

The exact product expansion is

$$
L^{-p}D^{-1}=1+c\epsilon u+\epsilon^2\left[\frac{c(p-2)}2u^2+(p-2)r^{1-p}+\left(1-\frac p2\right)v^2\right]+O(\delta^3).
$$

Multiplying by the two direction components therefore gives

$$
A_r=-r^{-p}\left\{1+c\epsilon u+\epsilon^2\left[\frac{c(p-2)}2u^2+(p-2)r^{1-p}-\frac c2v^2\right]+O(\delta^3)\right\},
$$

$$
A_t=\epsilon v r^{-p}\left[1+c\epsilon u+O(\delta^2)\right].
$$

The last remainder retains the transverse factor on the compact chart. Extending it uniformly to an unbounded-radius chart is a separate weighted source-window obligation; the local calculation does not silently discharge it.

## Intrinsic equations and the signed oscillation coefficient

Let $A=2/k$ in the following formulas; it is a scalar coefficient, not the acceleration vector. Exact differentiation of the coordinates and substitution of the physical components yield

$$
\frac{a_\eta}{a}=A\delta x^{-p}+Ac\delta^2yx^{-p}+O(\delta^3),\qquad
\delta_\eta=-\frac c k\delta^2x^{-p}+O(\delta^3),
$$

$$
x_\eta=y-A\delta x^{1-p}-Ac\delta^2yx^{1-p}+O(\delta^3),
$$

$$
\begin{aligned}
y_\eta={}&x^{-3}-x^{-p}+\alpha\delta yx^{-p}\\
&+\delta^2\left[\left(\frac{c^2}{k}-\frac{c(p-2)}2\right)y^2x^{-p}-(p-2)x^{1-2p}+\frac c2x^{-p-2}\right]+O(\delta^3),\\
\alpha={}&\frac{c(p-2)}k.
\end{aligned}
$$

The first-order coefficient in $y_\eta$ is negative for $p<2$. Its sign alone does not determine the relative radial oscillation. The correct velocity for the moving radius is

$$
w=y-A\delta x^{1-p}.
$$

Differentiating this explicit coordinate, while never differentiating an error term, gives near its corrected center

$$
x_\eta=w+O(\delta^2w+\delta^3),
$$

$$
w_\eta=x^{-3}-x^{-p}+\gamma\delta x^{-p}w+\delta^2F_2(x)+O(\delta^2w^2+\delta^3),
$$

$$
\gamma=\alpha+Ac=\frac{p(p-1)}{3-p}>0,\qquad
F_2(x)=\left[\frac{2c^2}{k^2}-(p-2)\right]x^{1-2p}+\frac c2x^{-p-2}.
$$

Since $(x^{-3}-x^{-p})'|_{x=1}=-k$, the corrected equilibrium coordinate is

$$
x_\delta=1+\frac{F_2(1)}k\delta^2+O(\delta^4).
$$

At $p=3/2$, these formulas give $A=4/3$, $\alpha=-1/6$, $\gamma=1/2$ and $F_2(1)/k=35/54$, independently matching the frozen three-halves coefficients. At $p=2$, they give $A=2$, $\alpha=0$, $\gamma=2$ and $F_2(1)/k=5/2$. These substitutions are exact algebraic controls, not numerical evolution evidence.

The release has $x=1$, $y=0$, $\delta=\epsilon$, hence $w=-A\epsilon$ and a nonzero first-order oscillation seed. If a separately proved corrected-amplitude argument controls the displayed errors through a fixed transition, its leading growth relative to the changing scale is

$$
\frac{d\log J}{d\log a}=\frac{\gamma}{2A}+\text{controlled error}
=\frac{p(p-1)}4+\text{controlled error}.
$$

Consequently the prospective transition scales are $a_b\asymp\epsilon^{-4/[p(p-1)]}$, physical speed $\asymp\epsilon^{1+2/p}$ and physical time $\asymp\epsilon^{-2-6/(p-1)}$. These are conditional deductions from a transition argument, not an admission of that argument. The local first-order secular radius solves $a^p=1+[2p/(3-p)]\tau$, $\tau=\epsilon^2T/r_0$, at leading order; an actual uniform secular estimate still needs its continuation and error proof.

## Candidate global coordinate and its unproved obligations

A useful independent coordinate identity is $z=x^{-c}$ and $d\chi/d\eta=z^{p/c}$. Formal substitution of the already displayed first-order terms gives

$$
z_\chi=-cy+\frac{2c}{k}\delta z+\cdots,\qquad
y_\chi=z^{k/c}-1+\alpha\delta y+\cdots,\qquad
\delta_\chi=-\frac c k\delta^2+\cdots.
$$

The central comparison has the directly differentiated scalar

$$
e=\frac c2y^2+\frac{z^{1+k/c}}{1+k/c}-z,
$$

and its leading planar divergence is $(2c/k+\alpha)\delta=\gamma\delta>0$. This suggests a positive orbit-action change. It does not establish an actual all-future delayed theorem until the omitted terms are bounded uniformly at $z=0$, the full source window and old patch are controlled, and the physical-time reconstruction is proved. For noninteger $k/c$, the central field must not be called polynomial or analytically continued through negative $z$ without a specified extension. A locally $C^1$ extension is available for fixed $k/c\ge1$, but its use and needed derivatives must be justified in the target proof.

Falsifiers are an additional second-order source term, a failure of the old-source patch to be compatible, an incorrect coordinate derivative, loss of the transverse factor in a claimed uniform tail bound, or use of these local conditional formulas as a global conclusion. No target instrument or new physical premise is used in this reference.
