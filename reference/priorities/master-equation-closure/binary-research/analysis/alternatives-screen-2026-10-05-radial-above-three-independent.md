# Independent fate of the compatible radial family above cubic power

## Derived candidate and fixed-power conclusion

**Claim grade: derived candidate, requiring separate independent assessment.** Fix any exponent $p>3$. Evaluate the same complete circle-tail preparation and compatibility-patch formula at that exponent, retaining $K=R_*=c_f=1$, the original transmitter factor and every ordinary self/partner root. For every sufficiently small positive physical launch speed $\epsilon$, its actual mirror-planar future is uniquely ordinary, separated and uniformly subfield for all physical time. It eventually moves outward, its radius tends to infinity, its areal rate has a finite positive limit, its angle has a finite limit, and its terminal physical speed is strictly positive.

Write $\beta=p-1$ and $\kappa=\sqrt{p-3}$. The small-launch conclusions are

$$
V_\infty(\epsilon)
=\epsilon\sqrt{\frac{p-3}{p-1}}
+O_p\!\left(\epsilon^2\log\frac1\epsilon\right),
$$

$$
\theta_\infty(\epsilon)
=\frac1\kappa\log\frac1\epsilon+O_p(1),\qquad
h_\infty(\epsilon)
=1+\frac\epsilon\kappa\log\frac1\epsilon+O_p(\epsilon).
$$

Here $h$ is the scaled geometric areal rate defined below, and the release angle is zero. The parameter threshold and constants may depend on the fixed exponent. A fixed outward radius is reached after scaled time $\kappa^{-1}\log(1/\epsilon)+O_p(1)$. Thus the sufficiently small family contains no zero-terminal-speed members for any fixed $p>3$.

This derivation was developed independently before reading any new coordinator analysis for $p>3$. It does not continue the singular scale $h^{2/(3-p)}$, use a positive-frequency oscillator argument about a saddle, assume physical central-energy conservation, or treat the supplied circle as a solution. The initial radial acceleration is inward; the proof identifies how the exact delayed torque nevertheless selects the eventual outward branch. No numerical admission threshold, arbitrary-history fate, nonmirror stability, stable binding, joint limit through $p=3$ or superfield continuation is established. The analytical role is a lens rather than an acceptance authority.

## The unchanged formula at a new fixed exponent

Let the opposite mirror labels be $q(T),-q(T)$. The selected physical response is radial magnitude $R^{-p}$ with the unchanged canonical transmitter weight and complete ordinary root convention of the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration). Use the [same preparation formula](alternatives-screen-2026-10-05-radial-power-family-preparation.md):

$$
r_0=(2^p\epsilon^2)^{-1/\beta},\qquad
s=\epsilon T/r_0,\qquad q(T)=r_0Y(s),
$$

$$
Y''=-\frac{2^pN}{R_d^pD},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,
\quad D=1+\epsilon N\cdot Y'(\sigma).
$$

Primes on scaled variables denote $s$ derivatives. Physical velocity is $q'(T)=\epsilon Y'(s)$. The coefficient $2^p$ follows exactly from $\epsilon^2/r_0=(2r_0)^{-p}$.

Supply $Y_c(s)=(\cos s,\sin s)$ for $s\le-d_0$, with $d_0=\epsilon/16$. For $-d_0\le s\le0$ supply $Y=Y_c+\phi B_p$, where

$$
\phi=\frac{d_0^2}{2}z_p^3(1-z_p)^2,\qquad z_p=1+s/d_0,
$$

$$
B_p=(1,0)+A_{c,p},\qquad
A_{c,p}=-\frac{(\cos\xi,-\sin\xi)}{\cos^p\xi(1+\epsilon\sin\xi)},
\qquad \xi=\epsilon\cos\xi\in(0,\epsilon).
$$

For each fixed $p$, Taylor bounds on the compact small-$\xi$ interval give $|B_p|=O_p(\epsilon)$. Consequently position, velocity and acceleration perturbations are $O_p(\epsilon^3)$, $O_p(\epsilon^2)$ and $O_p(\epsilon)$. For sufficiently small exponent-dependent $\epsilon$, the supplied radius stays in $[3/4,5/4]$, scaled speed is below two, acceleration is bounded, and supplied areal rate is positive and $1+O_p(\epsilon^2)$. No uniform bound in unbounded $p$ is claimed.

The patch jets vanish through second derivative at the old seam and are $(0,0,1)$ at release. Thus the complete past is locally $C^{2,1}$, with $Y(0)=(1,0)$, $Y'(0)=(0,1)$ and $Y''(0-)=A_{c,p}$. Its unique circular release root $\sigma=-2\xi<-\epsilon<-d_0$ lies in unchanged old history. Under any complete physical speed margin $b<1$, the partner delay residual has derivative at least $1-b$, is negative at zero and tends to positive infinity. This gives exactly one positive partner root; the strict speed chord inequality excludes every positive-delay self root. Patching therefore preserves that source and the exact received acceleration. The preparation remains exactly compatible.

The supplied past is prescribed data rather than a delayed solution. At release, define $r=|Y|$, $u=r'$, $h=Y\times Y'$ and $v=h/r$. Then $r=1,u=0,h=1$ and

$$
u'(0)=1-\frac{\cos^{1-p}\xi}{1+\xi\tan\xi}<0.
$$

Indeed $p-1>2$ gives $\cos^{1-p}\xi>\sec^2\xi>1+\xi\tan\xi$, the second strict inequality following from $\tan\xi>\xi$. Expansion also gives $u'(0)=-(p-3)\epsilon^2/2+O_p(\epsilon^4)$. A proof that simply assumes outward radial motion from release would miss this sign.

## Complete source geometry and two response estimates

Exact polar kinematics is

$$
r'=u,\qquad u'=h^2/r^3+A_r,\qquad
h'=rA_t,\qquad \theta'=h/r^2,
$$

where $A_r,A_t$ are the receiving radial and transverse components of $Y''$. No physical angular-momentum law is attached to $h$.

The complete causal segment lies in the open ball centered at the midpoint of its source and receiving positions with radius half the partner range. This follows by adding the two strict path-length bounds to the segment endpoints. The ball lies in one open half-plane through the origin, and the endpoint dot product is positive. Since the complete past has positive areal rate, a first-loss argument gives a lifted angular increment in $(0,\pi/2)$ and the exact torque

$$
h'=\frac{2^p r r_\sigma\sin(\theta-\theta_\sigma)}{R_d^{p+1}D}>0.
$$

In particular $h\ge1$ at generated times. This reconstructs the needed part of the [rotating-class geometry](alternatives-screen-2026-10-05-radial-rotating-class.md) for the fixed response and complete history.

Two response estimates will be used at different stages. On a fixed near-release region $r\asymp1$, bounded $u,h$, the complete root margin and bounded supplied/generated acceleration permit integral Taylor expansion over the actual causal interval of length $O_p(\epsilon)$. It gives

$$
\frac{R_d}{2r}=1-\epsilon u+O_p(\epsilon^2),\qquad
D=1+\epsilon u+O_p(\epsilon^2),\qquad
N_r=1+O_p(\epsilon^2),
$$

and hence

$$
A_r=-r^{-p}[1+\beta\epsilon u+O_p(\epsilon^2)],\qquad
h'=\epsilon h r^{-p}[1+O_p(\epsilon)].
$$

For the transverse row, integration of $h/r^2$ on the complete causal window gives $N_t=-\epsilon h/r[1+O_p(\epsilon)]$. The supplied circle and patch have acceleration bounded uniformly for fixed $p$ and sufficiently small $\epsilon$, so these estimates cover the seam and release without a jerk bound. The radial $O_p(\epsilon^2)$ remainder is essential for branch selection; a bare $O_p(\epsilon)$ radial error would not establish the sign of the launch seed.

For the later unbounded-radius stage, a coarser but uniform estimate suffices. On a provisional domain $r\ge r_*>0$, $1\le h\le2$ and $|u|\le4$, all complete scaled speeds are bounded by a fixed constant. Small enough $\epsilon$ gives a common physical margin $b<1/2$. The complete root bounds yield

$$
\frac{2r}{1+b}\le R_d\le\frac{2r}{1-b},\qquad
D\ge1-b,\qquad \ell=s-\sigma\le C_p\epsilon r.
$$

Every intermediate radius on the source interval differs from $r(s)$ by $O_p(\epsilon r(s))$. Generated old areal rates do not exceed the receiving one; supplied values are comparable to one. These facts first bound the lifted angle by $C_ph(s)\ell/r(s)^2$ and give $0<h'/h\le C_p\epsilon r^{-p}$. Integration on a generated source interval improves the ratio of source to receiving areal rates to $1+O_p(\epsilon^2r^{1-p})$. A window reaching supplied time has $s=O_p(\epsilon)$, because $r(s)\le1+4s$ and $s\le C_p\epsilon r(s)$; its supplied bounds give the same sufficient comparison. Reintegration of the angle then retains the relative transverse factor. Thus, uniformly with no upper radius bound,

$$
A_r=-r^{-p}[1+O_p(\epsilon)],\qquad
h'=\epsilon h r^{-p}[1+O_p(\epsilon)].
$$

All error functions refer to the complete actual history. They are not differentiated or treated as autonomous functions. No source segment is reset to a circle after release, and no old root is removed.

## The moving comparison saddle selects the outward branch

For the central radial expression

$$
f(r,h)=h^2r^{-3}-r^{-p},
$$

the zero at fixed $h$ is

$$
r_c(h)=h^{-2/(p-3)}=h^{-2/\kappa^2}.
$$

It is a comparison saddle: $f_r(r_c,h)=(p-3)r_c^{-p-1}>0$. It is not an equilibrium of the delayed equation. Positive actual torque moves $r_c$ inward. Define the actual displacement from this moving comparison radius by $w=r-r_c(h)$ and let $j=h-1$. Since the torque estimate is relative, its exact bounded-error form gives

$$
w'=u+\epsilon B(s),\qquad
B(s)=\frac{2}{\kappa^2}r_c r^{-p}[1+O_p(\epsilon)]>0.
$$

Near $(r,h)=(1,1)$, $B=2/\kappa^2+O_p(|w|+|j|+\epsilon)$. The radial equation becomes

$$
u'=\Lambda(r,h)w-\beta\epsilon u r^{-p}+O_p(\epsilon^2),\qquad
\Lambda(r,h)=\kappa^2+O_p(|w|+|j|),
$$

while $j'=\epsilon[1+O_p(|w|+|j|+\epsilon)]$. The smooth divided difference $\Lambda$ is defined by $f(r,h)=\Lambda(r,h)(r-r_c(h))$; it is not a linearization about a putative delayed circle.

On every fixed scaled-time interval, ordinary integral comparison yields $w,u,j=O_p(\epsilon)$ and the limits

$$
\frac{w(s)}\epsilon\longrightarrow\frac{2}{\kappa^3}\sinh(\kappa s),\qquad
\frac{u(s)}\epsilon\longrightarrow\frac{2}{\kappa^2}[\cosh(\kappa s)-1],\qquad
\frac{j(s)}\epsilon\longrightarrow s.
$$

These follow by dividing the exact bounded-error system by $\epsilon$ and solving $w_1'=u_1+2/\kappa^2$, $u_1'=\kappa^2w_1$, $j_1'=1$ with zero initial data. Direct differentiation verifies the displayed comparison functions. In particular

$$
\frac{r(s)-1}\epsilon\longrightarrow
\frac{2}{\kappa^3}[\sinh(\kappa s)-\kappa s]>0\quad(s>0).
$$

Thus at a fixed sufficiently large $s_0$, chosen depending only on $p$, the actual trajectory has $r>1$, $u>0$, $w>0$, $u/w$ close to $\kappa$ and $w/\epsilon$ arbitrarily large for small enough launches. The initial inward acceleration does not cancel this torque-induced seed.

Choose a small fixed outward radius increment $\rho>0$, depending on $p$. Choose $s_0$ so the entry lies strictly inside the cone

$$
\frac\kappa2w<u<2\kappa w,\qquad w>M_p\epsilon,
$$

with $M_p$ large enough. This cone is forward invariant while $r\le1+\rho$ and $j$ remains in a small fixed neighborhood. On the lower boundary, differentiating $u-(\kappa/2)w$ gives $(3\kappa^2/4+O_p(\rho+j+\epsilon))w-(\kappa/2)\epsilon B+O_p(\epsilon^2)>0$ after the choices above. On the upper boundary the leading coefficient in $(u-2\kappa w)'$ is $-3\kappa^2w$, with the remaining terms smaller or favorable. Also $w'=u+\epsilon B\ge(\kappa/2)w$, so the floor $w>M_p\epsilon$ persists.

The exponential lower growth forces $r=1+\rho$ within $O_p(\log(1/\epsilon))$ scaled time. To make this a closed continuation argument, stop provisionally also at a fixed small bound on $j$. Since $j'=O_p(\epsilon)$, that second boundary cannot be reached during the logarithmic interval for sufficiently small $\epsilon$. Cone bounds keep velocity small on the near-release region; separation, complete source factors and accessible old history stay regular, so no ordinary endpoint can intervene. Therefore the first event $r=1+\rho$ is actual and finite. Its outward speed $u_b$ is bounded above and below by positive constants depending on $p,\rho$, and $h_b=1+O_p(\epsilon\log(1/\epsilon))$.

The transition time has a sharper leading coefficient. Put $P=u+\kappa w$. In the cone, $P\asymp_p w$ and

$$
P'=\kappa P+\kappa\epsilon B
+O_p((w+j+\epsilon)P+\epsilon^2).
$$

The logarithmic derivative differs from $\kappa$ by terms with bounded total integral up to the event. Indeed $w'\ge(\kappa/2)w$ gives $\int w\,ds=O_p(1)$ and $\int\epsilon/P\,ds=O_p(1)$; the preliminary logarithmic duration and $j=O_p(\epsilon s)$ give $\int j\,ds=O_p(\epsilon\log^2(1/\epsilon))$; the remaining terms are smaller. Since $P(s_0)\asymp_p\epsilon$ and $P(s_b)\asymp_p1$ for the fixed event,

$$
s_b=\frac1\kappa\log\frac1\epsilon+O_p(1).
$$

Restoring physical time gives

$$
T_b=2^{-p/\beta}\epsilon^{-1-2/\beta}
\left[\frac1\kappa\log\frac1\epsilon+O_p(1)\right].
$$

No positive-frequency or orbit-averaging argument has been used. The proof is an actual finite departure selected by the complete compatible launch and positive delayed torque.

## Global outward continuation after the transition

After the event, work provisionally with $r\ge r_b=1+\rho$, $u>0$, $h<2$ and $u<4$. Choose $\rho$ small enough that the local cone gives $u_b<1$. The complete-window coarse response estimate gives

$$
u'=\frac{h^2}{r^3}-\frac{1+O_p(\epsilon)}{r^p}
\ge\frac{1-(1+\rho)^{3-p}(1+C_p\epsilon)}{r^3}>0
$$

for sufficiently small $\epsilon$, because $p>3$ and $h\ge1$. Thus $u\ge u_b>0$, and radius stays above its transition value. The exact radial direction has $N_r>0$ on the common small-speed chart, so $A_r<0$ and $u'\le h^2/r^3$. Consequently

$$
u(r)^2\le u_b^2+4(r_b^{-2}-r^{-2})<5,
$$

using only the provisional $h<2$. The upper speed boundary $u=4$ is therefore excluded.

The relative torque bound gives

$$
\log\frac{h(r)}{h_b}
\le\frac{C_p\epsilon}{u_b}\int_{r_b}^{r}v^{-p}\,dv
\le\frac{C_p\epsilon}{u_b(p-1)r_b^{p-1}}.
$$

Together with $h_b=1+O_p(\epsilon\log(1/\epsilon))$, this keeps $h<3/2$ for sufficiently small launches and excludes the boundary $h=2$. The bootstrap bounds supply a common complete physical speed of order $\epsilon$, strictly below one. At every finite scaled time, position remains bounded by bounded velocity; radius stays positive; the unique partner delay and transmitter factor have positive floors; and all sampled source times lie in a compact part of the complete history. Ordinary position-velocity continuation therefore extends the solution indefinitely.

Since $u\ge u_b$, radius tends to infinity. Monotone bounded $u$ and $h$ have limits $u_\infty>0$ and $h_\infty\in(0,\infty)$. Also

$$
\theta_\infty-\theta_b
=\int_{r_b}^{\infty}\frac{h(r)}{r^2u(r)}\,dr
\le\frac{3}{2u_b r_b}<\infty.
$$

Thus the polar angle converges. The exact physical velocity tends to

$$
q'(T)=\epsilon\left[u\,n(\theta)+\frac hr t(\theta)\right]
\longrightarrow\epsilon u_\infty n(\theta_\infty).
$$

This proves positive-speed global escape for every sufficiently small launch in the fixed family. The claim does not depend on extrapolating a finite numerical endpoint.

## Terminal coefficient from an exact comparison-scalar derivative

To identify the small-launch terminal coefficient, define the mathematical scalar

$$
E(s)=\frac{u^2}{2}+\frac{h^2}{2r^2}-\frac{r^{1-p}}{p-1}.
$$

It is not asserted to be conserved. Differentiating along the exact polar equations gives

$$
E'=u(A_r+r^{-p})+\frac{hh'}{r^2}.
$$

The response estimates and bounded $u,h$ imply $|E'|\le C_p\epsilon r^{-p}$ over the complete future. Up to the finite transition, $r$ stays near one and the duration is $O_p(\log(1/\epsilon))$. Afterward $u\ge u_b$ makes $\int r^{-p}\,ds$ finite with a launch-independent bound for the fixed transition radius. Therefore

$$
E(\infty)=E(0)+O_p\!\left(\epsilon\log\frac1\epsilon\right).
$$

The release data give $E(0)=1/2-1/(p-1)=(p-3)/[2(p-1)]>0$. At infinity the radial terms vanish and $E(\infty)=u_\infty^2/2$. Since $u_\infty$ has already been proved positive,

$$
u_\infty=\sqrt{\frac{p-3}{p-1}}
+O_p\!\left(\epsilon\log\frac1\epsilon\right).
$$

Multiplying by $\epsilon$ gives the physical terminal-speed formula stated at the beginning. The scalar estimate determines a coefficient after outward branch selection; its positive initial value alone was not used to select that branch.

The areal-rate and total-angle coefficients can likewise be obtained without a conserved account. Before the event, $|r-1|\le C_p(w+j)$ and the cone estimates give $\int(|r-1|+j)\,ds=O_p(1)$. Thus

$$
\int_0^{s_b}\frac h{r^2}\,ds=s_b+O_p(1),\qquad
\int_0^{s_b}h r^{-p}\,ds=s_b+O_p(1).
$$

Both later integrals are bounded by the global outward estimates. Using the relative torque equation yields

$$
\theta_\infty=\frac1\kappa\log\frac1\epsilon+O_p(1),\qquad
h_\infty=1+\frac\epsilon\kappa\log\frac1\epsilon+O_p(\epsilon).
$$

Large total angle as launch speed tends to zero is compatible with a finite angle for each fixed member. The logarithmic mechanism here has no rotating center and no terminal winding contradiction: the entire sufficiently small family has positive terminal speed.

For each fixed launch, the physical member radius $\mathcal R(T)=r_0r(s)$ obeys $\mathcal R(T)\sim V_\infty T$. The physical areal rate is

$$
H(T)=q\times q'=\epsilon r_0h(s)
\longrightarrow H_\infty=\epsilon r_0h_\infty>0.
$$

Hence the exact physical angular identity gives

$$
\theta_\infty-\theta(T)\sim\frac{H_\infty}{V_\infty^2T}.
$$

This last equivalent follows by bounding and integrating the positive tail of $H/\mathcal R^2$. Pair separation is twice the member radius, and the partner has the opposite Cartesian terminal velocity.

## Limits, falsifiers and frozen evidence

The result is for every fixed $p>3$, with a sufficiently small threshold that may depend on $p$. It does not give a joint uniform limit as $p\downarrow3$; the constants involving $\kappa=\sqrt{p-3}$ deteriorate there, and the separate cubic scale is different. It proves no absence of zero-speed solutions for other compatible histories or larger launch parameters. It does not establish bound assemblies, nonmirror stability, physical energy conservation or a unit-speed continuation law.

The load-bearing falsifiers are: failure of the same preparation's compatibility at the selected exponent; an extra admitted root under its complete speed margin; an incorrect release radial sign; a local radial remainder of order $\epsilon$ rather than the required $\epsilon^2$ after retaining $\beta\epsilon u$; failure of positive relative torque on the full source interval; cancellation of the explicitly reconstructed moving-saddle seed; loss of the invariant cone or a premature ordinary-domain boundary; failure of the global radial inequality above the fixed transition radius; or divergence of the integrated torque or comparison-scalar error despite $u\ge u_b$. Each is localized by an exact identity or bounded-error estimate above.

The following antecedent identities were measured with `shasum -a 256` before this proof was authored:

| Source | SHA-256 |
| --- | --- |
| [Complete preparation formula](alternatives-screen-2026-10-05-radial-power-family-preparation.md) | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| [Complete rotating geometry](alternatives-screen-2026-10-05-radial-rotating-class.md) | `aa271d167786273f8c040c3eda5e116888b7f40df68317dbb9270682f30c1c9a` |

The antecedent preparation's original exponent range is not silently relabeled: this source proves the same formula's fixed-$p>3$ bounds and received compatibility directly. No previous result is rewritten.

Validation is analytical: patch jets, complete causal roots, release acceleration, the actual first-order delayed radial row, relative torque on full windows, the explicit fixed-time hyperbolic comparison, cone boundary derivatives, logarithmic transition estimate, global outward bootstrap and exact scalar/angle integrations. No new executable checker, numerical target, Python process or background computation was used. Only this new independent analysis was authored; old subjects, assessments and shared integration owners were preserved. Whitespace validation and final source identities are checked after creation. Separate independent assessment is required before scientific integration.
