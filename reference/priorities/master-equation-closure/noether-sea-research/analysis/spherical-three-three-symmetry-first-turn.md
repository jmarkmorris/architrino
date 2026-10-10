# A first turning event before the prepared wakes arrive

## Result and assumptions

The [frozen symmetric preparation](spherical-three-three-symmetry.md#exact-preparation-with-common-speed-drift) admits a decisive later event within its exact stationary-source domain. At $R=K_{\mathrm{int}}=c_f=1$, all six members slow from speed $1/4$ to zero together, reverse their meridional direction, and begin increasing speed in the opposite direction. Their first turning time $T_*$ and representative latitude obey the derived bounds

$$
\frac1{16}<T_*<\frac27,
\qquad
\frac1{128}<\alpha(T_*)-\frac\pi6<\frac1{28}.
$$

The strict bounds may be weakened to closed intervals for reporting. Every partner root during this motion still samples the stationary portion of the prepared past; the calculation is an exact reduction of the canonical normal-only constrained equation on this domain. The result is derived and self-reviewed, pending independent verification. No numerical evolution, quadrature, general solver or physical energy interpretation is used.

The complete history is exactly the earlier preparation: three positive members form a $120$-degree orbit of $(\cos\alpha,0,\sin\alpha)$, and three negative members are their antipodes. Before $T=-1/4$, their latitude is $\alpha_0=\pi/6$. On $[-1/4,0]$, it is $\alpha_0+\tfrac14T(1+4T)^3$. At release, $\alpha=\alpha_0$, $\dot\alpha=1/4$ and $\dot\phi=0$. The full past remains an explicitly prepared input rather than an all-time solution of the post-release equation. Its speed is at most $1/4$. Only radial support is present after release; the signed radial acceleration is measured below. All source polarities, complete roots and self-root admission follow the canonical law.

## Reduction from the complete kernel

Let $\rho_0=\sqrt3/2$ and $h_0=1/2$. Write the representative position as $\mathbf x=(\cos\alpha\cos\phi,\cos\alpha\sin\phi,\sin\alpha)$. Denote the five stationary partner positions by $\mathbf a_j$ and their signed polarity products with the representative by $\eta_j=\pm1$. While every arrival has emission time less than $-1/4$, all transmitter velocities at emission vanish and the exact kernel is

$$
\mathbf A(\mathbf x)=\sum_{j\ne i}\eta_j\frac{\mathbf x-\mathbf a_j}{|\mathbf x-\mathbf a_j|^3}.
$$

The representative's own stationary site is not added as a partner. Its actual positive-delay self-root set is empty under the speed bounds established below. With latitude and azimuth unit tangents $\mathbf e_\alpha,\mathbf e_\phi$, the sphere equation gives

$$
\ddot\alpha+\sin\alpha\cos\alpha\dot\phi^2=\mathbf e_\alpha\cdot\mathbf A,
\qquad
\cos\alpha\ddot\phi-2\sin\alpha\dot\alpha\dot\phi=\mathbf e_\phi\cdot\mathbf A,
$$

and the normal support is $\lambda=-(\dot\alpha^2+\cos^2\alpha\dot\phi^2)-\mathbf x\cdot\mathbf A$. Reflection across the representative's meridian permutes its two like-polarity partners and its two non-antipodal opposite-polarity partners. It fixes its own opposite partner. Hence the azimuthal component vanishes at $\phi=0$. Smooth uniqueness and the zero initial azimuthal velocity preserve $\phi=0$ throughout the stated stationary-source domain. The other five equations follow by the same transitive rotation/inversion symmetry of the complete preparation.

Define $z=\alpha-\alpha_0$ and the three positive chord lengths

$$
d_L^2=2+\rho_0\cos\alpha-\sin\alpha,
\qquad
d_O^2=2-\rho_0\cos\alpha+\sin\alpha,
\qquad
d_A^2=2+2\cos z.
$$

The like-polarity pair has length $d_L$, the non-antipodal opposite-polarity pair has length $d_O$, and the own opposite partner has length $d_A$. Projecting all five terms gives the exact scalar equation

$$
\ddot\alpha=f(\alpha),
\qquad
f(\alpha)=-B(\alpha)\left(d_L^{-3}+d_O^{-3}\right)+\frac{\sin z}{d_A^3},
\qquad
B(\alpha)=\rho_0\sin\alpha+\cos\alpha.
$$

For example, each like-source tangent projection is $-\tfrac12B$, and each signed non-antipodal opposite-source projection is also $-\tfrac12B$. The own opposite partner's signed projection is $\sin z$. These contributions use the earlier fixed source sites, not a substitution of the moving receivers' current latitude into the static six-point formula. That distinction is essential once $z\ne0$.

The radial projection also has a closed form:

$$
A_n(\alpha)=\frac1{d_L}-\frac1{d_O}-\frac1{2d_A},
\qquad
\lambda=-\dot\alpha^2-A_n.
$$

It follows from $\mathbf x\cdot(\mathbf x-\mathbf a_j)=|\mathbf x-\mathbf a_j|^2/2$ for unit-radius source and receiver. These formulas provide the complete vector equation, not merely its along-path projection.

## Uniform bounds on a latitude strip

Consider $0\le z\le1/8$. The displacement of the receiver from its initial position is at most $z$. Every stationary partner chord therefore exceeds $\sqrt7/2-1/8>9/8$. The sum of five acceleration magnitudes is less than $5(8/9)^2=320/81<4$, so $|f|<4$ throughout the strip.

For the opposite sign bound, first observe that

$$
B'(\alpha)=\rho_0\cos\alpha-\sin\alpha
\ge\rho_0(\rho_0-1/8)-(1/2+1/8)
=\frac{2-\sqrt3}{16}>0.
$$

Here the elementary Lipschitz bounds for sine and cosine were applied over an angular distance at most $1/8$. Thus $B\ge B(\alpha_0)=3\sqrt3/4$. Since $d_L^2+d_O^2=4$, convexity of $x^{-3/2}$ gives $d_L^{-3}+d_O^{-3}\ge1/\sqrt2$. Also $\cos z\ge1-z^2/2$ implies $d_A^2\ge255/64>(7/4)^2$, and $0\le\sin z\le1/8$. Hence

$$
0\le\frac{\sin z}{d_A^3}<\frac8{343}<\frac1{32},
\qquad
f(\alpha)<-\frac{3\sqrt6}{8}+\frac1{32}<-\frac78.
$$

The last inequality is equivalent to $12\sqrt6>29$, whose square is $864>841$. Combining the bounds gives

$$
\boxed{-4<f(\alpha)<-7/8\quad\text{for }0\le z\le1/8.}
$$

These are deliberately conservative analytic bounds. No decimal fit or sampled grid underlies them.

## First zero speed and subsequent reversal

Put $v=\dot\alpha$. While $v>0$, the scalar equation gives decreasing velocity. Direct integration of $-4<\dot v<-7/8$ shows that its first zero can occur no earlier than $1/16$ and must occur before $2/7$, provided the strip and root domain remain valid. To close that proviso without circular reasoning, use the calculus identity $v\,dv=f(\alpha)\,d\alpha$ on the increasing part of the path. It yields

$$
\frac{v(\alpha)^2}{2}=\frac1{32}+\int_{\alpha_0}^{\alpha} f(a)\,da.
$$

This identity is a mathematical first integral of this already reduced autonomous scalar equation. It is not a physical energy functional or a conservation law for the delayed system beyond this domain. In particular, it provides the rise bound $z\le(1/4)^2/[2(7/8)]=1/28<1/8$ before stopping. The motion cannot leave through the upper edge of the strip. At the turning event, applying both acceleration bounds to the same integral gives $1/128<z_*<1/28$. Smoothness, bounded acceleration and the positive chord margins therefore continue the unique local equation until the event.

At the event $\ddot\alpha=f(\alpha_*)<-7/8$, so this is a genuine meridional reversal, not asymptotic stopping. All six signed meridional velocities reach zero simultaneously by symmetry. Their speed magnitudes remain equal, decrease to zero, and then increase as the velocities become negative. The speed magnitude need not be differentiable at its zero; the signed latitude velocity and the position remain smooth on the post-release interval.

There is an explicit controlled interval after the turn as well. For $0\le T-T_*\le1/32$, the bound $|f|<4$ gives $|v|<1/8$ and a backward latitude displacement less than $2(1/32)^2=1/512$. Since $z_*>1/128$, the receiver stays strictly above $\alpha_0$, so this continuation cannot exit the strip through its lower edge. The acceleration remains negative, and hence the claimed reversal persists throughout this additional interval. Altogether,

$$
0\le T\le T_*+\frac1{32},
\qquad
T_*+\frac1{32}<\frac{71}{224},
\qquad
0\le z<\frac18,
\qquad
|v|\le\frac14.
$$

This is an event-defined safe evolution interval with an explicit upper time bound; it is not a claim that the strip remains invariant for all time, nor that the motion necessarily stays in it until the upper bound $71/224$ when the actual turn happens earlier.

## Closure of the stationary-source and self-root assumptions

On the entire event-defined interval just established, every stationary partner chord exceeds $9/8$. Its proposed emission time is $S=T-d_j$. Because $T<71/224$,

$$
-\frac14-S=d_j-T-\frac14>\frac98-\frac{71}{224}-\frac14=\frac{125}{224}>0.
$$

Every such emission therefore remains strictly earlier than the nonstationary preparation boundary $-1/4$, by the displayed margin. Each explicit root samples a transmitter at rest and has $D_t=W^{\mathrm{acc}}=1$. The complete history through the current event has speed at most $1/4$, including both the original preparation and the new motion. This gives global strict monotonicity of each partner delay function and excludes all extra partner roots. It also excludes every positive-delay self root by the chord-versus-path-length inequality.

The same argument prevents a hidden diagonal source from being added to the stationary-source formula. Only the five partner sources contribute. The upper bound $2$ on every delay follows from the common sphere, and the antipodal endpoint remains part of the root search domain. Together these facts close the reduction: it is the canonical delayed law with normal support throughout the stated event interval, not a short-delay or static-field approximation.

## Required normal support

The outward support has a definite sign throughout the interval. Let $q(\alpha)=\rho_0\cos\alpha-\sin\alpha$. Initially $q=1/4$, while $q'=-B$ and $B\le\sqrt7/2<3/2$. On the strip, $q>1/4-3/16=1/16>0$. Thus $d_L>d_O$ and the first two terms of $A_n$ have a negative sum. Since $d_A\le2$,

$$
-A_n>\frac1{2d_A}\ge\frac14.
$$

Using $|v|\le1/4$ gives the uniform outward bound $\lambda>3/16$. For an upper bound, discard the negative subtraction in $-A_n=1/d_O-1/d_L+1/(2d_A)$ and use all chords greater than $9/8$. It follows that $-A_n<4/3$, hence

$$
\boxed{\frac3{16}<\lambda(T)<\frac43}
$$

throughout the event-defined interval. At the turning event itself, $v=0$ and $\lambda(T_*)>1/4$. The support is therefore materially nonzero; this trajectory is not a free assembly. No physical provider of the outward support or physical energy account is inferred.

## Radius and coupling dependence

For a sphere of radius $R$ at the same fixed $c_f=1$, use dimensionless time $\tau=T/R$ and the geometrically scaled preparation ending at $\tau=0$ with stationary past through $\tau=-1/4$. Its initial physical speed remains $1/4$. With fixed coupling, $g=K_{\mathrm{int}}/R$ and the scalar equation is $d^2\alpha/d\tau^2=g f(\alpha)$. Changing $R$ changes $g$; it does not simply rescale this solution while holding the dynamics unchanged.

The same inequalities, without an additional numerical investigation, certify the turning event for every $g\ge1$. They give $1/(16g)<\tau_*<2/(7g)$, $1/(128g)<z_*<1/(28g)$, and a safe post-turn interval of $1/(32g)$. The minimum stationary-source margin is at least $9/8-1/4-71/(224g)$, which is positive for $g\ge1$. The dimensionless normal support $\ell=R\lambda$ obeys $g/4-1/16<\ell<4g/3$. These are uniform sufficient conditions, not a sharp threshold in $g$; no claim about failure or survival for $g<1$ follows. The requested $g=1$ case is the main result, and no further coupling was selected or simulated.

## Verification, preservation and remaining boundary

The result follows from independently checkable chord identities, signed source projections, elementary inequalities and smooth scalar ODE continuation within an explicitly closed root domain. No new computational instrument was built or run. The first-integral identity is used only to bound this scalar reference motion and is explicitly not an energy identification. Independent review of this new quantitative extension is outstanding; earlier review of the initial release does not automatically verify these additional bounds.

Only this new symmetry-prefixed companion is authored in this slice. Earlier frozen reports, the review subject, dynamics instruments and shared trackers remain outside its write scope. All useful evidence is retained in the exact formulas and bounds above; no bulky output, compute lease or long-running job exists. The coordinator owns synthesis integration. This slice reaches the requested first turning event, rather than extending an arbitrary endpoint. Continuation beyond the explicit stationary-emission interval requires a new full delayed-history analysis and is not claimed here.

Document checks: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics, with exit 1 recording the file difference. Scoped `rg` confirmed the linked preparation heading. `shasum -a 256` confirmed the three earlier symmetry reports retain their frozen identities (`ef75a6c34bba1e802433a5155e154d249959cb55f966bc7ebea99a538a6a3a51`, `22d79fc49b614085b71022376433eac229cca4aca2046dbfceb3554ae1fc3a6e`, and `be341140572da64d8c2687ee94a3fd91cbaf8fd38407b9876537e886193bdfce`). These are document and preservation receipts, not a substitute for independent mathematical review.
