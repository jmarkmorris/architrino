# Robust nonmirror subfield contact for a fixed sublinear radial law

Status: independent derived subject, 2026-10-05, pending separate coordinating assessment. The [complete preparation and sufficient family](alternatives-screen-2026-10-05-radial-sublinear-nonmirror-protocol.md) were frozen first, SHA-256 `580b2fe2be3ebe89398d0c2dc9dec178c7828bb69c0186a3835733eee93a0ae6`. The forthcoming coordinating nonmirror reference was not consulted. The accepted [mirror theorem](alternatives-screen-2026-10-05-radial-sublinear-contact-independent.md) is an antecedent and a specialization check, not a premise of the nonmirror geometry below.

## Theorem and selected equation

Fix $0<p<1$, put $q=1-p$, and retain $K=R_*=c_f=1$. The selected sharp radial law contributes $\sigma n/(R^p|D|)$ at every ordinary positive-delay root, with self sign $+1$, opposite-polarity partner sign $-1$, and transmitter factor $D=1-nv_j(s)$. The labels are constrained to one line and ordered $x_1>x_2$ before contact. There is no reflection requirement and no fixed center.

Claim grade: derived. Let a complete supplied history be separated, locally $C^{2,1}$, exactly compatible with the selected equation at release, and uniformly subfield with complete past speed bound $B_{\rm past}<1/2$. Define release gap, relative approach speed and largest individual speed by

$$
g_0=x_1(0)-x_2(0)>0,\qquad
w_0=v_2(0)-v_1(0)>0,\qquad B_0=\max(|v_1(0)|,|v_2(0)|).
$$

If

$$
W:=\sqrt{w_0^2+\frac{12g_0^q}{q}},\qquad
L:=B_0+W-w_0<\frac12,
$$

then the unique ordinary separated future ends at finite contact, with both individual speeds bounded by $L<1/2$ throughout the future. Every partner root remains unique and simple until its range tends to zero at contact; there are no positive-delay self roots. The terminal velocities are finite and distinct. The strict sufficient inequalities hold on a nonempty relatively open set of compatible complete collinear histories around the explicit moving-center preparation below. They do not assert full-spatial robustness or classify every sublinear preparation.

No physical energy or momentum conservation, Galilean invariance, numerical trajectory, collision rule or root deletion is used. The result is an incoming endpoint theorem. The constants are sufficient rather than optimal, and the preparation scale is not uniform as $p\uparrow1$.

## Complete nonmirror roots and the actual coupled equations

Suppose provisionally that the complete supplied and generated paths have $|v_i|\le b<1$ while the present gap $g=x_1(t)-x_2(t)$ is positive. A positive-delay self root would require a unit-speed chord and is excluded by the strict chord inequality. A partner root cannot reverse the present ordering: a reversed direction would require the transmitter to travel distance $R+g>R$ during age $R$, also impossible.

Let $s_1(t)$ be the source time on label 2 received by label 1, and $s_2(t)$ the source time on label 1 received by label 2. Their ranges solve

$$
R_1=t-s_1=x_1(t)-x_2(s_1)
=g+\int_{s_1}^{t}v_2(u)\,du,
$$

$$
R_2=t-s_2=x_1(s_2)-x_2(t)
=g-\int_{s_2}^{t}v_1(u)\,du.
$$

For positive trial delay $r$, the two residuals are

$$
H_1(r)=r-x_1(t)+x_2(t-r),\qquad
H_2(r)=r-x_1(t-r)+x_2(t).
$$

Each starts at $-g$, has derivative at least $1-b$, and tends to positive infinity because $H_i(r)\ge(1-b)r-g$. Each therefore has exactly one positive simple root over the entire complete history. This proves the census without truncating the affine past or assuming a mirror source.

Their positive transmitter factors, accelerations and source clocks are

$$
D_1=1-v_2(s_1),\quad D_2=1+v_1(s_2),\qquad
Q_1=\frac1{R_1^pD_1},\quad Q_2=\frac1{R_2^pD_2},
$$

$$
v_1'=-Q_1,\qquad v_2'=+Q_2,
$$

$$
s_1'=\frac{1-v_1(t)}{1-v_2(s_1)},\qquad
s_2'=\frac{1+v_2(t)}{1+v_1(s_2)}.
$$

Both source clocks increase. The different factors explicitly retain the common drift; adding a constant velocity does not preserve these equations in general.

The complete chord estimates give

$$
\frac{g}{1+b}\le R_i\le\frac{g}{1-b},\qquad
1-b\le D_i\le1+b.
$$

On a compact separated interval with strict speed margin, these give positive delay and transmitter floors. Implicit-root dependence is locally Lipschitz, and locally bounded source acceleration controls velocity evaluation at displaced source time. A position-velocity step shorter than the delay floor uses only known source histories and is an ordinary locally Lipschitz initial-value problem. This supplies local existence, uniqueness and continuation. At a finite endpoint with positive limiting gap, sources stay in a compact strictly earlier interval and the same argument continues the solution. No additional singular boundary exists inside these margins.

## Relative-gap estimate and finite contact

Write

$$
w=v_2-v_1=-g',\qquad m=\frac{v_1+v_2}{2}.
$$

The actual equations give $w'=Q_1+Q_2>0$ and $m'=(Q_2-Q_1)/2$, so neither constant center velocity nor conservation of the velocity sum is assumed. Under the provisional bound $b=1/2$,

$$
c_p g^{-p}\le Q_i\le C_p g^{-p},\qquad
c_p=\frac{2^{-p}}{3/2}>0,\qquad C_p=2(3/2)^p<3.
$$

Because $w\ge w_0>0$, the gap decreases strictly and is a valid coordinate. The exact chain rule is

$$
\frac{d(w^2)}{dg}=-2(Q_1+Q_2).
$$

Integrating the actual delayed acceleration along the trajectory yields

$$
w_0^2+\frac{4c_p}{q}(g_0^q-g^q)
\le w^2
\le w_0^2+\frac{4C_p}{q}(g_0^q-g^q)
\le W^2.
$$

This is a differential comparison, not a conserved instantaneous energy. The two nonnegative accumulated accelerations add to $w-w_0$. Individually,

$$
|v_i(t)|\le B_0+w(t)-w_0\le L<\frac12.
$$

Thus a first speed crossing of the provisional bound is impossible. The entire supplied and generated history has the strict uniform bound $\max(B_{\rm past},L)<1/2$, and both transmitter factors remain bounded away from zero.

Since $g'=-w\le-w_0$, a separated future cannot persist past $g_0/w_0$. The local continuation argument excludes a finite positive-gap endpoint. Consequently its maximal ordinary separated time $T_*$ is finite and $g\downarrow0$. Monotone bounded velocities have limits

$$
U=\lim_{t\uparrow T_*}v_1(t),\qquad
V=\lim_{t\uparrow T_*}v_2(t),\qquad
w_*=V-U>0.
$$

Both paths converge to the same finite position $X_*$. The integrated estimates give

$$
w_0^2+\frac{4c_p}{q}g_0^q\le w_*^2\le W^2,
\qquad
\frac{g_0}{W}\le T_*\le\frac{g_0}{w_0}.
$$

In particular, the relative terminal speed exceeds its positive release value, but both individual terminal speeds remain strictly below one. Contact is the first loss of the ordinary positive-range chart; it is not a unit-speed event or a transmitter fold.

## Exact compatible moving-center preparation

Use the frozen choices

$$
V_1=\frac3{32},\quad V_2=\frac5{32},\quad
0<a\le\frac14\left(\frac{q}{1024}\right)^{1/q},\quad d=\frac a{16}.
$$

For $S\le-d$, prescribe $x_1=a+V_1S$ and $x_2=-a+V_2S$. Let $A_1,A_2$ solve

$$
A_1=(1-V_2)^{p-1}\left(2a+\frac{A_1d^2}{12}\right)^{-p},\qquad
A_2=(1+V_1)^{p-1}\left(2a+\frac{A_2d^2}{12}\right)^{-p}.
$$

Each left side increases strictly from zero while its right side decreases strictly from a positive value. Hence there is exactly one positive solution. Since both prefactors are below two,

$$
0<A_i<2(2a)^{-p}.
$$

For $-d\le S\le0$, put $z=(S+d)/d$ and prescribe

$$
v_1(S)=V_1+A_1d z^2(1-z),\qquad
v_2(S)=V_2-A_2d z^2(1-z),
$$

integrating positions from the affine seam values. The old seam has matching position, velocity and zero acceleration. At release,

$$
x_1(0)=a+\frac{A_1d^2}{12},\quad
x_2(0)=-a-\frac{A_2d^2}{12},\quad
v_i(0)=V_i,\quad v_1'(0-)=-A_1,\quad v_2'(0-)=A_2.
$$

The polynomial has maximum $4/27$, so its velocity corrections are at most $2^{-p}a^q/54<1/54$. The complete past is uniformly below speed $1/4$. Its gap is

$$
2a-(V_2-V_1)S+(A_1+A_2)d^2\left(\frac{z^3}{3}-\frac{z^4}{4}\right)
$$

on the patch and $2a-(V_2-V_1)S$ on the affine tail. Both are strictly positive. The histories are locally $C^{2,1}$ throughout the supplied past.

The two release roots computed in the affine tails are exactly

$$
R_1(0)=\frac{2a+A_1d^2/12}{1-V_2},\qquad
R_2(0)=\frac{2a+A_2d^2/12}{1+V_1}.
$$

Both exceed $d$, so they indeed sample the old affine segments. The complete strict-speed census makes them the only partner roots. Their received acceleration magnitudes are precisely the right sides of the two scalar equations, namely $A_1,A_2$. Thus both endpoint acceleration jets are exactly compatible. The supplied history is a preparation; it is not required to satisfy the released equation at every negative time.

The release gap obeys

$$
2a<g_0=2a+\frac{(A_1+A_2)d^2}{12}<3a,
\qquad
w_0=\frac1{16},\qquad B_0=\frac5{32}.
$$

By the frozen size choice,

$$
g_0^q<(3a)^q\le(3/4)^q\frac q{1024}<\frac q{1024},
$$

and therefore $W^2<1/256+12/1024=1/64$. Hence $W<1/8$ and $L<7/32<1/2$, proving the theorem's strict sufficient inequality before using its conclusion for this family. Both individual velocities remain positive throughout the released future:

$$
\frac1{32}<v_1(t)\le\frac3{32},\qquad
\frac5{32}\le v_2(t)<\frac7{32}.
$$

The center moves right with velocity between $3/32$ and $5/32$; it is not fixed. Moreover $(1-V_2)^{p-1}>1>(1+V_1)^{p-1}$ and the common increasing map $A\mapsto A(2a+Ad^2/12)^p$ imply $A_1>A_2$. Thus $m'(0)=(A_2-A_1)/2<0$: even its center velocity is not constant. This is not a translated mirror trajectory.

The concrete member $p=1/2$, $a=2^{-26}$, $d=2^{-30}$ has strict slack because the sufficient upper bound is $a\le2^{-24}$. Its two patch constants are the unique positive roots of the exact cubic equations

$$
A_1^2\left(2a+\frac{A_1d^2}{12}\right)=\frac{32}{27},\qquad
A_2^2\left(2a+\frac{A_2d^2}{12}\right)=\frac{32}{35}.
$$

This defines a complete genuinely moving-center example without a numerical fit or a future-dependent preparation.

## Incoming source clocks and acceleration coefficients

Let $\delta=T_*-t$. Since $g(t)=\int_t^{T_*}w(u)\,du$, one has $g\sim w_*\delta$. The range bounds imply $R_i\to0$ and $s_i\to T_*$. Terminal velocities are approached uniformly on these shrinking source-reception intervals. Consequently the exact range equations yield

$$
R_1\sim\frac{g}{1-V}\sim\frac{w_*}{1-V}\delta,
\qquad
R_2\sim\frac{g}{1+U}\sim\frac{w_*}{1+U}\delta.
$$

Thus the two distinct incoming source-time coefficients are

$$
T_*-s_1\sim\frac{1-U}{1-V}\delta,
\qquad
T_*-s_2\sim\frac{1+V}{1+U}\delta,
$$

and the source-clock derivatives converge to those same respective ratios. The transmitter factors approach $1-V>0$ and $1+U>0$. The exact leading acceleration coefficients are

$$
Q_1(t)\sim C_1\delta^{-p},\qquad
Q_2(t)\sim C_2\delta^{-p},
$$

$$
C_1=(1-V)^{p-1}w_*^{-p},\qquad
C_2=(1+U)^{p-1}w_*^{-p}.
$$

Both coefficients retain the actual terminal source velocity, including the common drift. They reduce to the accepted mirror coefficient only on the special locus $U=-V$, where $w_*=2V$. For the explicit example, $U,V>0$, so $C_1>C_2$ and the two coefficients are distinct.

Because $p<1$, both divergent accelerations have finite time integrals. Integrating controlled two-sided asymptotic bounds, rather than differentiating a remainder, gives

$$
v_1(t)=U+\frac{C_1}{q}\delta^q+o(\delta^q),\qquad
v_2(t)=V-\frac{C_2}{q}\delta^q+o(\delta^q),
$$

$$
x_1(t)=X_*-U\delta-\frac{C_1}{q(2-p)}\delta^{2-p}+o(\delta^{2-p}),
$$

$$
x_2(t)=X_*-V\delta+\frac{C_2}{q(2-p)}\delta^{2-p}+o(\delta^{2-p}).
$$

In particular,

$$
g(t)=w_*\delta-\frac{C_1+C_2}{q(2-p)}\delta^{2-p}+o(\delta^{2-p}).
$$

The incoming paths have finite $C^1$ endpoint traces and absolutely continuous velocities; their nonzero acceleration coefficients preclude a matching ordinary $C^2$ continuation at contact.

## Open collinear-history robustness

Fix an explicit preparation above. Use a topology controlling

$$
\sup_{S\le0}\max_i\frac{|\Delta x_i(S)|}{a+|S|},\qquad
\sup_{S\le0}\max_i|\Delta v_i(S)|,
$$

together with local $C^{2,1}$ regularity. Restrict to histories exactly compatible with the selected equation at release. The global weighted positional norm permits variations of the affine drift parameters as well as non-affine perturbations. The base gap satisfies $g(S)\ge2a+w_0|S|$; therefore sufficiently small weighted perturbations preserve separation on the entire infinite past. Uniform past speed margins are preserved by the velocity norm. The release data $g_0,w_0,B_0$ vary continuously, and their sufficient inequalities are strict. They consequently hold throughout a nonempty relatively open neighborhood in this compatible collinear-history space.

This neighborhood is not confined to the finite-dimensional affine-tail family. Infinitely many small compactly supported position perturbations can be placed away from release and both release source events. If they vanish near those events, the endpoint jets and sampled position/velocity values stay unchanged; root uniqueness then preserves exact compatibility. Such perturbations can change the subsequently sampled history. Nearby affine drift parameters also remain admissible, with the two scalar patch equations varying smoothly by their strictly positive implicit derivatives.

Every history in this neighborhood therefore has finite subfield contact by the general theorem. Contact time and incoming velocity limits also vary continuously there. On any positive-gap prefix, continuous dependence follows from the regular method of steps. A common lower approach speed $w_0\ge w_{\min}>0$ bounds the remaining time by $g/w_{\min}$. The remaining accumulated acceleration is bounded uniformly by

$$
\int_t^{T_*}(Q_1+Q_2)\,du
\le\frac{6g(t)^q}{q\,w_{\min}},
$$

using $Q_1+Q_2\le6g^{-p}$ and $-g'=w\ge w_{\min}$. Taking a prefix arbitrarily close to contact makes both tails uniformly small. Hence terminal positions and velocities, and thus the displayed source and acceleration coefficients, depend continuously on these compatible collinear histories.

This is relative openness under the compatibility constraints, not openness among all unconstrained endpoint jets. It is a line-constrained robustness theorem; transverse perturbations, impact parameters and unrestricted spatial contact are outside its hypotheses.

## Contact boundary and falsifiers

At the limiting reception $T_*$, both labels are at $X_*$. A hypothetical positive-delay self or partner root would require a source path to cover distance $T_*-S$ during that interval, whereas the complete speed bound gives a strictly smaller chord. Thus no positive-delay root survives at contact. The coincident zero-range causal incidence remains an explicit singular boundary: it is not deleted to assign a finite acceleration or manufacture a continuation. The selected $R^{-p}$ law has no ordinary positive-range value there. Finite incoming impulse does not select passage, reflection, sticking or any weaker outgoing solution.

Load-bearing falsifiers are a failed patch fixed point or jet identity, a release root outside its asserted affine tail, an extra or reversed-direction root under the global speed bound, an incorrect gap comparison, a speed crossing despite $L<1/2$, failure of continuation at positive gap with all margins intact, an incorrect terminal source ratio, or a loss of the stated openness/compatibility conditions. The individual contact speeds and time are not numerically predicted; their limits and bounds are derived from the complete history equation.

Validation is analytical: exact polynomial jets, monotone scalar compatibility equations, complete residual monotonicity, chord bounds, the actual gap-coordinate chain rule, ordinary continuation, terminal source limits and integrations of integrable singularities. No numerical target or new instrument was used. The mirror source identity is `dfdb846843296e36eb8c5476cd424e044bc4406d088dd036ceb509390005159f`, and its assessment identity is `158e5ab41103143d8c662d9cb1c15140cb615d9768b3e597575b7ac151384d2e`, measured with `shasum -a 256` before this work. Only the two assigned new nonmirror sources were authored; existing subjects and shared owners remain unchanged. Final independent assessment belongs to the coordinator.
