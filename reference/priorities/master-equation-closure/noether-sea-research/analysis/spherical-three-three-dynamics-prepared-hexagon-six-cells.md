# Prepared equatorial hexagon: six admitted radius–speed releases

## Result and selected histories

**Derived, pending independent review.** For each of the six selected pairs $g\in\{1/10,1,10\}$ and $\beta\in\{1/4,3/4\}$, the normally constrained prepared alternating hexagon has a unique actual release reaching angle $\Phi=1/64$. All six members retain equal speeds, which increase strictly after release. Every arriving partner source remains in its stationary past on this interval. Speed stays below $4/5$, the full ledger has five partner roots and no positive-delay self roots per receiver, and all roots are ordinary. Normal support is inward throughout the interval only for $(g,\beta)=(1/10,3/4)$; it is outward for the other five cells.

This is a bounded evolution result for the specified preparation, not the [eternally rotating prescribed history](spherical-three-three-dynamics-rotating-hexagon.md). Its domain ends at the reached angle $1/64$. The comparison makes no claim about later motion, recurrence, physical energy, or a physical provider of normal support.

Set numerical $c_f=1$, fix $K=K_{\mathrm{int}}>0$, put $\tau=T/R$ and $g=K/R$, and let $\sigma_i=(-1)^i$. The complete initial history is

$$
\mathbf X_i(T)=R\bigl(\cos(p(\tau)+i\pi/3),\sin(p(\tau)+i\pi/3),0\bigr),
$$

$$
p(\tau)=0\quad(\tau\le-1/4),\qquad
p(\tau)=\beta\tau(1+4\tau)^3\quad(-1/4\le\tau\le0).
$$

It supplies $\Phi(0)=0$ and $u(0)=\Phi'(0)=\beta$. With $y=1+4\tau\in[0,1]$, $p'=\beta y^2(4y-3)$, whose range is $[-\beta/4,\beta]$. Thus the whole preparation is sub-wake. The history is externally specified; it need not satisfy the released equation. Position and velocity match continuously at release; the released acceleration need not match the preparatory acceleration.

The selected post-release law is the canonical transmitter-weighted Master Equation plus normal support only. Equatorial reflection, rotation by $\pi/3$ with label permutation and global polarity reversal preserve the complete data and equation. Uniqueness consequently keeps all members on the equator, with positions at angles $\Phi(\tau)+i\pi/3$ and a common $u(\tau)$. Their simultaneous separation remains at least $R$.

## Exact old-source field

Let $a_k=k\pi/6$ and $x_k=a_k-\Phi/2$ for $k=1,\ldots,5$. On $0\le\Phi\le1/64$, all $x_k$ lie strictly between zero and $\pi$. The distance to old source $k$ in units of $R$ is $d_k=2\sin x_k$. Since its arriving velocity is zero, its transmitter factor is one. Projecting all five signed terms gives

$$
N(\Phi)=\frac14\sum_{k=1}^5\frac{(-1)^k}{\sin x_k},\qquad
f(\Phi)=-\frac14\sum_{k=1}^5\frac{(-1)^k\cos x_k}{\sin^2x_k}.
$$

The physical canonical acceleration is $(K/R^2)(N\mathbf n+f\mathbf t)$, with zero out-of-plane component. The normally constrained scalar equation and support are

$$
\Phi''=g f(\Phi),\qquad
\ell:=R\lambda=-u^2-gN(\Phi).
$$

At release the exact stationary geometry gives

$$
N(0)=-C_0,\quad C_0=\frac54-\frac1{\sqrt3},\qquad f(0)=0,
\qquad f'(0)=\frac{29}{8}-\frac5{6\sqrt3}>3.
$$

For the last expression, the two nearest opposite-polarity sites contribute $7/2$ in total, the two like-polarity sites contribute $-5/(6\sqrt3)$, and the antipode contributes $1/8$. These exact geometric values are analytical checks on signs and multiplicities, not numerical fixtures.

## A uniform increasing-speed bound

Here is an independent derivative bound that avoids any sampled field estimate. In unit-radius coordinates, let $\mathbf A(\mathbf x)=\sum_{k=1}^5(-1)^k(\mathbf x-\mathbf a_k)/|\mathbf x-\mathbf a_k|^3$ be the old-source vector field. During the proposed angle interval, displacement from the initial receiver position is at most $1/64$, so each old-site distance is at least $63/64$.

For the kernel $\mathbf r/|\mathbf r|^3$, the first derivative has norm $2/|\mathbf r|^3$. Its bilinear second derivative is bounded by $24/|\mathbf r|^4$, from the three terms of magnitude at most $3/|\mathbf r|^4$ and the final term of magnitude at most $15/|\mathbf r|^4$. Summing five sources therefore gives

$$
|\mathbf A|\le5(64/63)^2<6,\qquad
\|D\mathbf A\|\le10(64/63)^3<11,\qquad
\|D^2\mathbf A\|\le120(64/63)^4<128.
$$

Along the circle $\mathbf n'=\mathbf t$, $\mathbf t'=-\mathbf n$ and $f=\mathbf t\cdot\mathbf A$. Differentiating once yields $|f'|<6+11=17$. Twice yields

$$
f''=-\mathbf t\cdot\mathbf A-2\mathbf n\cdot D\mathbf A\,\mathbf t
-\mathbf t\cdot D\mathbf A\,\mathbf n
+\mathbf t\cdot D^2\mathbf A[\mathbf t,\mathbf t],
$$

and hence $|f''|<6+3(11)+128=167$. Combining with $f'(0)>3$ gives

$$
f'(\Phi)>3-\frac{167}{64}=\frac{25}{64},\qquad
\frac{25}{64}\Phi<f(\Phi)<17\Phi\quad(0<\Phi\le1/64).
$$

Integrating $u\,du=g f(\Phi)\,d\Phi$ gives the exact mathematical first integral and its bounds

$$
u^2=\beta^2+2g\int_0^\Phi f(a)\,da,
\qquad
\beta^2+\frac{25g}{64}\Phi^2<u^2<\beta^2+17g\Phi^2.
$$

This scalar calculus identity has no physical energy interpretation. It proves positive speed drift for every positive reached angle. Initially the speed derivative is zero, but its first nonzero right-sided change is

$$
u(\tau)=\beta+\frac12g f'(0)\beta\tau^2+O(\tau^4).
$$

The even expansion follows from the odd analytic field $f(\Phi)$ and initial data $\Phi(0)=0$. No externally prescribed constant angular rate is imposed after release.

## Reached interval and complete root admission

The largest upper speed bound among the selected cells is

$$
u^2<\frac9{16}+\frac{170}{4096}=\frac{1237}{2048}<\frac{16}{25}.
$$

Thus $u<4/5$ everywhere on the proposed angle interval. Since $u\ge\beta>0$, the scalar solution reaches $\Phi_*=1/64$ in dimensionless time $\tau_*$ satisfying

$$
\frac{1}{64\sqrt{\beta^2+17g/4096}}<\tau_*<\frac1{64\beta}\le\frac1{16}.
$$

Smooth bounded field and speed prevent an earlier ODE breakdown. The positive angle speed prevents an infinite approach to $\Phi_*$. Construct this fixed-source solution first; its root-history margins then close it as the actual delayed solution. At every event before the reached endpoint, its explicit partner emissions obey

$$
S_k/R=\tau-d_k\le\frac1{16}-\frac{63}{64}=-\frac{59}{64},
\qquad
-\frac14-S_k/R\ge\frac{43}{64}>0.
$$

All five roots therefore sample stationary source history with $D_t=1$. The complete prepared and released histories have physical speed below $4/5$. For a fixed receiving event, every partner delay residual has strictly positive lower Lipschitz slope at least $1/5$, so each explicit root is the unique partner root. The path-length bound excludes every positive-delay self root. All delays lie in $(0,2R]$ by the sphere diameter. No diagonal old-site term is inserted, and no additional root is discarded. Receiver factors also stay above $1/5$, although they do not enter the canonical acceleration denominator.

Consequently all six cells admit the actual event-defined interval $0\le\tau\le\tau_*$, not a putative common fixed time endpoint. There are thirty directed partner roots and zero positive-delay self roots throughout. The history symmetry described above is preserved by uniqueness and makes the six speeds exactly equal, including their common positive drift.

At the endpoint the explicit dimensionless speed comparison is

$$
\boxed{\sqrt{\beta^2+25g/262144}<u_*<\sqrt{\beta^2+17g/4096}.}
$$

These are rigorous bounds for each selected pair, not estimates of the sharp values.

## Signed support in the six cells

Direct differentiation gives $N'=-f/2$. The same first integral can thus eliminate speed from normal support:

$$
u^2=\beta^2-4g(N-N(0)),\qquad
\ell(\Phi)=3gN(\Phi)-4gN(0)-\beta^2
=gC_0-\beta^2-\frac32g\int_0^\Phi f(a)\,da.
$$

Support decreases strictly with positive angle. Uniformly through the reached endpoint,

$$
gC_0-\beta^2-\frac{51g}{16384}<\ell(\Phi)\le gC_0-\beta^2.
$$

At the endpoint the stricter two-sided loss bound is

$$
\frac{75g}{1048576}<\ell(0)-\ell(\Phi_*)<\frac{51g}{16384}.
$$

The following table gives the initial support and the largest permitted drop; its sign column is certified throughout the entire reached interval. Physical support is $\lambda=\ell/R=(g/K)\ell$, so it has the same sign.

| $g$ | $R/K$ | Initial $\beta$ | $K\omega(0)=g\beta$ | $\ell(0)$ | Upper bound on support drop | Sign throughout |
| --- | --- | --- | --- | --- | --- | --- |
| $1/10$ | $10$ | $1/4$ | $1/40$ | $C_0/10-1/16$ | $51/163840$ | Outward |
| $1/10$ | $10$ | $3/4$ | $3/40$ | $C_0/10-9/16$ | $51/163840$ | Inward |
| $1$ | $1$ | $1/4$ | $1/4$ | $C_0-1/16$ | $51/16384$ | Outward |
| $1$ | $1$ | $3/4$ | $3/4$ | $C_0-9/16$ | $51/16384$ | Outward |
| $10$ | $1/10$ | $1/4$ | $5/2$ | $10C_0-1/16$ | $255/8192$ | Outward |
| $10$ | $1/10$ | $3/4$ | $15/2$ | $10C_0-9/16$ | $255/8192$ | Outward |

For exact sign checks, $2/3<C_0<27/40$ follows by squaring the corresponding bounds on $1/\sqrt3$. The weakest positive cell has

$$
\ell>\frac1{240}-\frac{51}{163840}>0
\quad(g=1/10,\ \beta=1/4).
$$

The next potentially limiting cell has $\ell>5/48-51/16384>0$ for $g=1,\beta=3/4$; the remaining positive cells have larger lower bounds. The negative cell has $\ell\le C_0/10-9/16<27/400-9/16=-99/200<0$. No cell crosses zero within this short admitted interval. This disposition differs from the earlier meridional support reversal because both the preparation geometry and the reached interval differ.

## Angular rate and frequency convention

The dimensionless angular rate is $d\Phi/d\tau=u$. Since $c_f=1$, the physical speed is also $s=u$, while the physical angular rate and instantaneous cycles-per-time convention are

$$
\omega(T)=\frac{u(\tau)}R=\frac gK u(\tau),\qquad
\nu_{\rm inst}(T)=\frac{\omega(T)}{2\pi}=\frac{u(\tau)}{2\pi R}.
$$

Both increase on the admitted released interval. Their initial values are $\beta/R$ and $\beta/(2\pi R)$, and endpoint bounds follow by multiplying the displayed $u_*$ bounds by $g/K$ or $g/(2\pi K)$. This frequency is an instantaneous kinematic convention. It supplies neither a recurrence period nor an energy mapping; the proved motion covers only angle $1/64$ and is accelerating.

## Evidence, falsifiers and bounded completion

All six outcomes are derived from one exact five-site field, explicit derivative estimates and complete-history root bounds. No numerical instrument, quadrature, simulation, new speed grid or production solver was used. Analytical stationary values and the explicit derivative at zero are retained as checkable controls; they do not substitute for the later independent review of the proof.

Falsifiers are an error in the five signed projections, in $f'(0)$ or the derivative-norm estimates, an additional causal root despite the global sub-wake bound, failure of the stationary-emission margin, or violation of a support inequality within the reached angle interval. The next dependency is independent reconstruction of these formulas and their domain, followed by coordinator integration. No claim is made beyond $\Phi=1/64$.

Only this new dynamics-prefixed companion was authored. Prior eternal-rotation and meridional subjects remain frozen; the coordinator owns the synthesis. The checked live AGENTS and Jack K. Hale lens retain their startup identities. There is no running job, runtime payload or regeneration obligation. This completes the selected six-cell radius–speed comparison at the stated analytical grade.

Measured preservation: closing `shasum -a 256` matched the frozen rotating-hexagon hash `b0948c700dfeb0872e7f4f0785d37b896d492be9b4fcde47258467566c785640`, normal-support-transition hash `241329c6e1218a5124ec5844d247ec698821d8982deb70731a9bc8cad937c3e8`, and incoming-preparation review hash `8da60171f9f89058e06cc8362d39e4239381ba5e085360d0aca76ab576ec3a9b`. Measured hygiene: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (status 1 records the new-file difference). These are scoped preservation and document checks, not independent mathematical acceptance.
