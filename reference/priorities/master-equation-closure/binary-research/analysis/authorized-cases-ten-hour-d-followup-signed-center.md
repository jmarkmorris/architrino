# A small signed bound for the planar common-center velocity tangent

**Grade: derived candidate, awaiting independent assessment.** Along an actual member of the accepted slow mirror family, the planar common-center velocity tangent remains close to its initial value. The leading coefficient oscillates with twice the orbital angle and has zero planar average; removing it leaves an integrable coefficient of second order in the slow parameter. This replaces the large absolute-coefficient Gronwall estimate at linear grade. It does not establish a finite nonmirror neighborhood or interchange a nonlinear perturbation limit with infinite time.

The frozen inputs are the [accepted wider mirror theorem](slow-binary-wider-regime.md), its [independent assessment](slow-binary-wider-regime-independent-adjudication.md), the exact [common-center first variation](authorized-cases-ten-hour-d-center-variation.md), and its [independent assessment](authorized-cases-ten-hour-reference-d-center-adjudication.md). The law, complete histories, source-fixed $K$, and $c_f=1$ remain unchanged.

## Actual reference and the linear quantity being estimated

Let the mirror solution be $X_\pm(t)=\pm x(t)$, in its fixed plane, with $r=|x|=R_0\rho$ and physical time related to the theorem's scaled time by $s=\epsilon t/R_0$. Thus $K=4\epsilon^2R_0$, $0<\epsilon\le1/2000$, and the dimensionless angular coordinate obeys

$$
\frac{d\theta}{dt}=\frac{\epsilon h}{R_0\rho^2},\qquad
h\ge h_0\ge\frac{1999}{2000},\qquad
0.99\epsilon\le h_\theta\le1.01\epsilon.
\tag{1}
$$

The preparation also gives $1-\epsilon\le h_0\le1+\epsilon$. The last two-sided bound in (1) applies after the direct release layer, whose endpoint is $s_*=10\epsilon$, or $t_*=10R_0$. The theorem supplies finite total angle, global ordinary roots, and the full supplied past; no renewed circle is used.

Let $c(t)$ be a common-center position tangent and let $u(t)=c'(t)$. The exact linear equation is

$$
u'(t)=L(t)\int_{\sigma(t)}^t u(v)\,dv+V(t)u(\sigma(t)).
\tag{2}
$$

Here $R=t-\sigma=|x(t)+x(\sigma)|$, $n=[x(t)+x(\sigma)]/R$, $v_\sigma=x'(\sigma)$, $a_\sigma=x''(\sigma)$, $D=1+n\cdot v_\sigma$, $P=I-nn^{\mathsf T}$ and $B=I-v_\sigma n^{\mathsf T}/D$. The frozen exact coefficients are

$$
V=-\frac{Knn^{\mathsf T}}{R^2D^2},\qquad
L=-\frac K{R^3D}\left\{PB-\frac2Dnn^{\mathsf T}-\frac1Dnv_\sigma^{\mathsf T}PB+\frac{R(n\cdot a_\sigma)}{D^2}nn^{\mathsf T}\right\}.
\tag{3}
$$

They retain both opposite clock variations and the sampled source acceleration. Their finite-interval interpretation across supplied $W^{2,\infty}$ seams is the integrated first variation established in the frozen assessment. No new pointwise jerk is required here.

The fixed reference plane and its normal are invariant blocks of (2). We first estimate the planar projection of $u$ alone and write

$$
M_0=\sup_{v\le0}|u(v)|,\qquad M(t)=\sup_{v\le t}|u(v)|
\tag{4}
$$

for that block. The result is valid for any admitted common-center tangent with finite $M_0$; the past velocity need not be constant.

## The original release layer has a small total effect

The frozen coefficient proof gives $\|L\|\le4K/R^3$ and $\|V\|\le2K/R^2$. The global reference speed bound is below $0.003$, so the range inequality implies

$$
R\|L\|+\|V\|\le\frac{6K}{R^2}<\frac{2K}{r^2}.
\tag{5}
$$

The accepted release tube has $r>0.99R_0$ through $t_*=10R_0$. Therefore

$$
\int_0^{t_*}\frac{2K}{r^2}\,dt<82\epsilon^2,
\quad M(t_*)\le e^{82\epsilon^2}M_0,
\quad |u(t_*)-u(0)|\le(e^{82\epsilon^2}-1)M_0.
\tag{6}
$$

This retains the original supplied-history seam. It is a direct small-interval estimate, not a smooth-source expansion across release.

## The leading planar coefficient and its uniform error

For later reception times set $\alpha=\epsilon/h$ and $N=x/r$. The accepted causal-window estimates give

$$
\left|\frac R{2r}-1\right|\le4.1\alpha,\quad
|v_\sigma|\le4.01\alpha,\quad
|n-N|\le9\alpha,\quad
R|a_\sigma|\le34\alpha^2,
\qquad \alpha<1/1000.
\tag{7}
$$

For the direction inequality, integrate the reference velocity over the actual window: $|x(\sigma)-x(t)|\le(4.01\alpha)(2.01r)$, then normalize the chord $2rN+[x(\sigma)-x(t)]$. For the acceleration inequality, the generated source bound is below $K/r^2$, while $K/r\le16\alpha^2$ and $R\le2.01r$. The accepted positive source-of-source coverage after release justifies using generated acceleration on these windows.

Combining (3) gives the exact instantaneous coefficient

$$
RL+V=-\frac K{R^2D}
\left\{PB-\frac1Dnn^{\mathsf T}-\frac1Dnv_\sigma^{\mathsf T}PB+\frac{R(n\cdot a_\sigma)}{D^2}nn^{\mathsf T}\right\}.
\tag{8}
$$

At zero source velocity and acceleration its bracket is $I-2nn^{\mathsf T}$. Quantitatively, $D\ge1-4.01\alpha$. The three first-order bracket errors have bounds $4.03\alpha$, $4.03\alpha$, and $4.05\alpha$; the last term costs less than $35\alpha^2$. Thus the bracket differs from $I-2nn^{\mathsf T}$ by less than $12.2\alpha$. Including the outside $D^{-1}$ costs less than $16.3\alpha$. Replacing $n$ by $N$ costs at most $18\alpha$, and replacing $R^{-2}$ by $(2r)^{-2}$ has relative error below $8.3\alpha$. Consequently

$$
\left\|RL+V-\frac K{4r^2}(2NN^{\mathsf T}-I)\right\|
\le43\alpha\frac K{4r^2}.
\tag{9}
$$

There is also a memory error because (2) samples $u$ across the window. Applying (5) there, with $r(v)>0.99r(t)$, yields

$$
\sup_{v\in[\sigma,t]}|u(v)-u(t)|
\le4.2\frac K r M(t).
\tag{10}
$$

Multiplying this by the coefficient sum in (5) bounds the memory error by $8.4K^2M/r^3$. Relative to $K/(4r^2)$ this is at most $537.6\alpha^2M$. Equations (9)–(10), with $\alpha<1/1000$, therefore give the convenient conservative form

$$
u'(t)=\frac K{4r^2}\{(2NN^{\mathsf T}-I)u(t)+E(t)\},
\qquad |E(t)|\le50\alpha M(t).
\tag{11}
$$

The center tangent's delayed acceleration was estimated using its actual linear equation. It was not replaced by the reference acceleration or set to zero.

## Remove the oscillatory coefficient in angle

On the plane, $A(\theta)=2NN^{\mathsf T}-I$ has the bounded primitive

$$
Q(\theta)=\frac12
\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},
\qquad Q_\theta=A,\quad\|Q\|=\frac12.
\tag{12}
$$

Direct differentiation verifies this identity as an analytical control before its use. The ratio of the scalar coefficient in (11) to the physical angular rate in (1) is exactly $\epsilon/h=\alpha$. Thus

$$
u_\theta=\alpha A u+e,\qquad |e|\le50\alpha^2M.
\tag{13}
$$

Define $z=(I-\alpha Q)u$. Since $|\alpha_\theta|\le1.01\alpha^2$, differentiation cancels the entire first-order oscillatory term and gives

$$
|z_\theta|\le52\alpha^2M.
\tag{14}
$$

The inverse norm of $I-\alpha Q$ is at most $(1-\alpha/2)^{-1}$. Also the actual increasing angular quantity satisfies

$$
\int_{\theta_*}^{\theta_\infty}\alpha^2\,d\theta
\le\frac{\epsilon}{0.99h_0}.
\tag{15}
$$

Let $a_* =\epsilon/h_0\le1/1999$, $\chi=(1-a_*/2)^{-1}$ and $\psi=1+a_*/2$. The running-supremum integral inequality from (14) yields

$$
\sup_{t\ge0}|u(t)|
\le\chi\psi\exp\!\left(82\epsilon^2+\frac{52\chi\epsilon}{0.99h_0}\right)M_0
<1.03M_0.
\tag{16}
$$

The final inequality holds at the worst endpoints $\epsilon=1/2000$, $h_0=1999/2000$ and hence throughout the admitted range. It follows directly by bounding each exponential with $e^x\le(1-x)^{-1}$ for the positive exponent below one. The coefficient is finite and small because (15) is of order $\epsilon$, despite the much larger bound on total angle.

Undoing the two endpoint matrix corrections in (14) and adding (6) gives the stronger difference estimate

$$
\sup_{t\ge0}|u(t)-u(0)|
\le60\frac\epsilon{h_0}M_0<0.031M_0.
\tag{17}
$$

For example, the three future contributions are bounded by $(a_*/2)(1.03+e^{82\epsilon^2})M_0$ and $52\epsilon(1.03)M_0/(0.99h_0)$, followed by the release contribution $(e^{82\epsilon^2}-1)M_0$. Their sum is below $60\epsilon M_0/h_0$ on the declared interval. The already accepted integrable-acceleration argument supplies $u(t)\to u_\infty$, so (17) also holds for that limit.

For the normal component, the leading coefficient in (11) is $-1$ rather than an oscillatory matrix. Its integrating factor gives a running-supremum estimate with the same small integrated error and hence the componentwise bound $\sup|u_\perp|<1.03\sup_{v\le0}|u_\perp(v)|$. No near-identity terminal estimate is asserted in that damped component.

## The complete circular phase tangent has nonzero terminal planar velocity

For a complete circular mirror supplied past $x(t)=R_0(\cos wt,\sin wt,0)$ satisfying the accepted preparation hypotheses, use a common fixed rotation to express an idealized phase variation as

$$
X_+^\delta=\mathcal R(\delta/2)x,\qquad
X_-^\delta=-\mathcal R(-\delta/2)x.
\tag{18}
$$

Here $\mathcal R(\varphi)$ denotes spatial planar rotation by $\varphi$. The midpoint derivative at $\delta=0$ is $c=(1/2)Jx$, where $J$ rotates by $\pi/2$, and its planar velocity tangent has constant past norm $M_0=|w|R_0/2=|u(0)|>0$. Equation (17) gives

$$
|u_\infty|\ge(1-0.031)|u(0)|>0.
\tag{19}
$$

This is a nonzero first variation of the actual future midpoint velocity. It is not a proof that every finite phase perturbation has a terminal midpoint velocity, or that the historical phase tokens define this differentiable complete family. In particular, passing from the finite-time nonlinear derivative to a derivative of the nonlinear infinite-time limit requires a uniform nonlinear argument which is still absent. The exact nominal source is not relabeled.

The result gives a quantitative linear mechanism relevant to the nonmirror question: a small planar common-center velocity input is not erased at first order along the actual slow mirror trajectory. The [conditional parabolic classification](authorized-cases-ten-hour-d-primary-parabolic-tail.md) concerns finite nonlinear solutions and must not be combined with (19) without the missing interchange and complete-history control.

Falsifiers are a missing moving-source term in (3), failure of any actual-window inequality in (7), an underestimated coefficient in (9)–(11), an incorrect matrix primitive, loss of the original release coverage, or an admitted tangent violating (16)–(19). No numerical trajectory or new physical case was run. The constants are analytical bounds on the existing accepted family, not measurements of the historical trajectory.

The [exact-rational arithmetic instrument](../evidence/authorized-cases-ten-hour-d-followup-signed-center-arithmetic.mjs) passed separate known addition, division, squaring and strict-order controls before its target evaluation. Its [receipt](../evidence/authorized-cases-ten-hour-d-followup-signed-center-arithmetic.json) checks the stated coefficient inequalities, the exponential majorant below $1.03$, and the difference coefficient below $60$. This is arithmetic verification of the displayed bounds, not independent mathematical acceptance or a trajectory computation. The source inputs remain frozen under the scoped document-preservation check.
