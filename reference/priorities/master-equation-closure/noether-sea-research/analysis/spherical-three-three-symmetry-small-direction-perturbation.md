# A small direction perturbation separates the stopping events

## Result and scope

The [verified first-turn release](spherical-three-three-symmetry-first-turn.md) has a quantitatively different nearby motion when only one initial tangent direction is changed. Keep $R=K_{\mathrm{int}}=c_f=1$, all six initial speed magnitudes equal to $1/4$, and all old stationary sites unchanged. Rotate one member's initial tangent direction by an angle $\eta$ with $0<|\eta|\le1/100$ radians. The other five members still reach their same exact stop at the reference time $T_*$. The perturbed member does not stop anywhere in the controlled event interval $0\le T\le T_*+1/32$, although its latitude turns during that interval.

At the instant the other five stop, the simultaneous speed spread has the rigorous bounds

$$
\frac3{32}|\sin\eta|\le s_{\mathrm{pert}}(T_*)\le\frac32|\eta|.
$$

All arriving partner roots on this interval still sample the identical old stationary sites; no positive-delay self roots occur. This is a derived finite-window sensitivity result for the explicitly constrained preparation, pending independent review. It is not a stability spectrum, asymptotic instability result, free confinement claim or physical energy account. Earlier frozen results are not modified.

## Complete perturbed preparation

Let $\alpha_0=\pi/6$, $\mathbf x_0=(\cos\alpha_0,0,\sin\alpha_0)$, $\mathbf e_{\alpha,0}=(-\sin\alpha_0,0,\cos\alpha_0)$ and $\mathbf e_{\phi,0}=(0,1,0)$. For the positive representative alone, replace the recent prepared curve by

$$
\mathbf x_\eta(T)=\cos[\varepsilon f(T)]\mathbf x_0+
\sin[\varepsilon f(T)]\left(\cos\eta\,\mathbf e_{\alpha,0}+\sin\eta\,\mathbf e_{\phi,0}\right),
\qquad
f(T)=T(1+4T)^3,
\quad -1/4<T\le0,
$$

where $\varepsilon=1/4$. Its past is $\mathbf x_0$ for $T\le-1/4$. All other five preparations remain the frozen reference histories. This curve stays exactly on the unit sphere. Its initial position remains $\mathbf x_0$, and its initial velocity is $\varepsilon(\cos\eta\,\mathbf e_{\alpha,0}+\sin\eta\,\mathbf e_{\phi,0})$. Thus the initial speed is still $1/4$. Its complete prepared speed is at most $1/4$, since the same bounded derivative of $f$ applies. At $\eta=0$, it is exactly the original meridional preparation.

The perturbation is small and smooth in direction; it is not the previously described reversal by $180$ degrees. As with the base preparation, the constrained law is imposed after the release cut, with continuously matched position and velocity but no requirement that the prepared left acceleration equal the right acceleration.

All emissions earlier than $-1/4$ are unchanged. Consequently the old-source reduction gives each receiver the same static partner field as before until an emission leaves that domain. The analysis below closes that condition quantitatively. During this interval, the other five receivers obey precisely their unperturbed equations with identical initial data and therefore follow their original motions exactly. The perturbation has not yet reached them through an arriving wake from its changed preparation.

## Exact smooth constrained equation and a finite-time difference bound

For the perturbed member, let $\mathbf A(\mathbf x)=\sum_{j\ne i}\eta_j(\mathbf x-\mathbf a_j)/|\mathbf x-\mathbf a_j|^3$ be its five fixed stationary partner contributions, with the frozen sites $\mathbf a_j$ and their signed polarity products $\eta_j$. The exact old-source sphere equation is

$$
\dot{\mathbf x}=\mathbf v,
\qquad
\dot{\mathbf v}=\mathbf F(\mathbf x,\mathbf v)
=\mathbf A(\mathbf x)-\left(|\mathbf v|^2+\mathbf x\cdot\mathbf A(\mathbf x)\right)\mathbf x.
$$

Both compared positions are unit vectors and both velocities are tangent. Compare the perturbed solution with the reference representative $\mathbf x_b,\mathbf v_b$. The reference result supplies $T_*<2/7$, $T_e=T_*+1/32<71/224<1/3$, position displacement at most $1/28$ from $\mathbf x_0$, and speed at most $1/4$ throughout $[0,T_e]$.

Use a bootstrap neighborhood $|\mathbf x-\mathbf x_0|<1/8$, $|\mathbf v|<1/2$. Every old partner distance in that neighborhood exceeds $\sqrt7/2-1/8>9/8$. The derivative norm of one inverse-square vector kernel is at most $2/r^3$, so the five-source field has a Lipschitz constant less than $10(8/9)^3<8$. Along the unit sphere,

$$
A_n(\mathbf x)=\mathbf x\cdot\mathbf A(\mathbf x)=\frac12\sum_{j\ne i}\frac{\eta_j}{|\mathbf x-\mathbf a_j|}.
$$

Hence $|A_n|<20/9<3$, and this scalar has a Lipschitz constant less than $\tfrac52(8/9)^2<2$. The line segments used for these bounds stay in the same ball and retain the distance floor; the scalar identity itself is applied only at the two unit-sphere endpoints. It follows that

$$
|\mathbf F(\mathbf x,\mathbf v)-\mathbf F(\mathbf x_b,\mathbf v_b)|
\le14|\mathbf x-\mathbf x_b|+|\mathbf v-\mathbf v_b|.
$$

For example, the field term contributes at most $8|\Delta\mathbf x|$, the normal-field product contributes at most $5|\Delta\mathbf x|$, and the squared-speed term contributes at most $|\Delta\mathbf v|+\tfrac14|\Delta\mathbf x|$. The displayed constants leave a strict margin.

Put $W=4|\Delta\mathbf x|+|\Delta\mathbf v|$. The upper right derivative of the norm obeys $D^+W\le5W$. Initially $\Delta\mathbf x=0$ and $|\Delta\mathbf v|=2\varepsilon|\sin(\eta/2)|\le|\eta|/4$. Therefore

$$
W(T)\le\frac{|\eta|}{4}e^{5T}<\frac32|\eta|,
\qquad
|\Delta\mathbf x|<\frac38|\eta|,
\qquad
|\Delta\mathbf v|<\frac32|\eta|,
\quad 0\le T\le T_e.
$$

The elementary bound $e^{5/3}<6$ suffices here: the exponential series from its quadratic term onward is bounded by a geometric series of ratio $5/9$, giving $e^{5/3}\le1+5/3+(25/18)/(1-5/9)=139/24<6$. For $|\eta|\le1/100$, the resulting displacement from $\mathbf x_0$ is less than $1/28+3/800<1/8$ and the speed is less than $1/4+3/200<1/2$. Thus the estimates keep the perturbed solution strictly inside the bootstrap neighborhood and close its continuation through the entire reference event interval. These are explicit finite-time difference bounds, not an assertion of long-time stability.

## A transverse velocity that cannot vanish on the interval

Write $y(T)=\mathbf x_\eta(T)\cdot\mathbf e_y$. Reflection in the $xz$ plane preserves the old source field, including the polarity labels: the two like sites and two non-antipodal opposite sites swap in pairs, while the own antipode stays fixed. Thus $A_y(x,0,z)=0$. The mean-value formula in the transverse coordinate gives $A_y(x,y,z)=c(T)y$, with $|c(T)|<8$ throughout the bootstrap neighborhood. The normal multiplier satisfies

$$
|\lambda|=\left||\mathbf v|^2+A_n\right|<\frac14+\frac{20}{9}<\frac52.
$$

Using the sharper field derivative $10(8/9)^3$ rather than its rounded upper bound eight gives $|c+\lambda|<10$. Therefore the actual transverse motion obeys the exact scalar equation

$$
y''=q(T)y,
\qquad |q(T)|<10,
\qquad y(0)=0,
\qquad y'(0)=\frac14\sin\eta.
$$

This is a bounded coefficient along the actual perturbed trajectory, not a linearization of the entire motion. The coefficient can depend on that trajectory; the inequality alone is used. Take $\eta>0$ first and put $v_{y0}=\tfrac14\sin\eta>0$. The Volterra integral equation and its absolute-value majorant give

$$
|y(T)|\le\frac{v_{y0}}{\sqrt{10}}\sinh(\sqrt{10}T),
\qquad
y'(T)\ge v_{y0}[2-\cosh(\sqrt{10}T)].
$$

The second bound follows by subtracting at most $10\int_0^T|y(u)|\,du$ from the initial velocity. For $T\le1/3$, the cosine-hyperbolic series, whose term ratios after the quadratic term are at most $5/54$, gives

$$
\cosh(\sqrt{10}T)\le1+\frac{5/9}{1-5/54}=\frac{79}{49},
\qquad
2-\cosh(\sqrt{10}T)\ge\frac{19}{49}>\frac38.
$$

Thus $y'(T)\ge3\sin\eta/32>0$ throughout the event interval. Reflection gives the corresponding negative sign when $\eta<0$, and in both cases

$$
\boxed{|v_y(T)|\ge\frac3{32}|\sin\eta|>0.}
$$

The perturbed member therefore has no full zero-speed event anywhere in $[0,T_e]$. In particular, at $T_*$ the unperturbed five velocities vanish exactly, whereas the perturbed speed lies between the transverse lower bound and the previously obtained vector-difference upper bound. This proves the announced finite-time speed splitting.

## Latitude reversal without a full stop

The perturbation changes the simultaneous stopping claim, but does not remove every turning phenomenon. Initially its vertical velocity is $(1/4)\cos\eta\cos\alpha_0>0$. At the end of the controlled interval, the base meridional velocity is less than $-(7/8)(1/32)=-7/256$. The base latitude is below $\alpha_0+1/28<\pi/4$, so its latitude cosine exceeds $3/4$. Its vertical velocity is therefore less than $-21/1024$. The difference bound gives

$$
(v_\eta)_z(T_e)<-\frac{21}{1024}+\frac3{200}<0.
$$

Continuity gives at least one zero of the perturbed vertical velocity, and hence at least one latitude reversal, before $T_e$. The transverse velocity stays nonzero there, so it passes through a latitude turn while still moving. This argument does not locate a unique turning time or prove uniqueness of that latitude extremum. The five unchanged members reverse through complete stops at $T_*$; the perturbed member's motion is qualitatively different in precisely this event sense.

The instantaneous acceleration-speed derivative at release remains a distinct claim. The old-field azimuthal component is zero and its latitude component is the reference $f(\alpha_0)<0$, so the perturbed initial speed derivative is $f(\alpha_0)\cos\eta$. Its difference from the unperturbed derivative is $f(\alpha_0)(\cos\eta-1)>0$, quadratic in small $\eta$. The finite-time speed spread at the base stopping event is instead bounded above and below at first order in $|\eta|$. The speed norm at the unperturbed zero is nonsmooth, so these statements are consistent and should not be conflated.

## Complete history margins and support interpretation

For every receiver in the event interval, the distance to each of its own five stationary partner sites remains greater than $9/8$. Since $T_e<1/3$, each explicit old-source root $S=T-d_j$ has the uniform preparation margin

$$
-\frac14-S=d_j-T-\frac14>\frac98-\frac13-\frac14=\frac{13}{24}>0.
$$

All arriving transmitters are therefore still at their old stationary sites and have $D_t=W^{\mathrm{acc}}=1$. The complete prepared and evolved speed bounds are strictly below $1/2$, so partner delay functions are strictly increasing and contain no additional roots. The same bound excludes every positive-delay self root. Consequently the comparison is an actual solution of the normal-constrained delayed law on the stated interval; the static-source equation is not an approximation and the other five histories really remain unchanged until this horizon.

The perturbed support is still entirely normal and satisfies $|\lambda|<5/2$. No tangential controller was added to retain equal speed or suppress the transverse motion. The stronger outward support bounds of the meridional reference are not automatically asserted for the perturbed member. The differing motions do not establish an unconstrained assembly, a physical support provider, an energy account or a stability verdict about an equilibrium.

## Evidence, falsifiers and preservation

The result is derived using the exact old-source kernel, a bootstrap difference estimate, reflection symmetry and an exact scalar transverse equation with a rigorous coefficient bound. No numerical integration, diagnostic instrument, parameter survey or stability spectrum was produced. The concrete falsifiers are an error in the fixed-site field's reflection symmetry, a violation of the derivative bounds inside the declared ball, an additional causal root despite the global sub-wake speed bound, or a permitted perturbed trajectory with zero transverse velocity before $T_e$. Every bound needed to check these claims is supplied above.

Only this new companion was written. Earlier frozen symmetry reports, the dynamics and reviewer subjects, and shared synthesis remain unchanged. The complete small mathematical evidence is retained here; there are no bulky outputs, new jobs or leases to preserve. Independent review of this finite-window extension and coordinator integration are the next dependencies. No claim is made after the old-source domain ends.

Document checks: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (exit 1 records the file difference). The linked first-turn file was reread as the reference, and `shasum -a 256` on all five earlier symmetry artifacts matched their previously frozen identities. These checks establish scoped document hygiene and preservation; the displayed estimates, not those commands, supply the mathematical argument.
