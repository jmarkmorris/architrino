# A small meridional speed change moves the first stopping event

## Result and scope

Change only one member's initial meridional speed in the [symmetric prepared release](spherical-three-three-symmetry-first-turn.md), retaining $R=K_{\mathrm{int}}=c_f=1$, the same initial positions, directions and old stationary source sites. Write its positive initial speed as $\varepsilon=1/4+\delta$, with $|\delta|\le1/100$. Let $T(\varepsilon)$ and $\alpha_*(\varepsilon)$ be its first zero-speed time and its latitude there. On this interval, the derived bounds are

$$
\boxed{\frac1{10}<T'(\varepsilon)<2,
\qquad
\frac3{50}<\alpha_*'(\varepsilon)<\frac3{10}.}
$$

Thus a faster release stops strictly later and at a higher latitude; a slower release stops earlier and lower. Relative to the original $T_*=T(1/4)$ and $\alpha_*=\alpha_*(1/4)$, every nonzero permitted perturbation obeys

$$
\frac{|\delta|}{10}<|T(1/4+\delta)-T_*|<2|\delta|,
\qquad
\frac{3|\delta|}{50}<|\alpha_*(1/4+\delta)-\alpha_*|<\frac{3|\delta|}{10},
$$

and both signed differences have the sign of $\delta$. These events occur while all partner emissions still sample the unchanged stationary past. The five unperturbed members retain their original stop at $T_*$. The result is derived and self-reviewed, awaiting separate verification. It concerns finite-time parameter sensitivity of an actual constrained motion, not a stability spectrum or a physical energy relation.

## Complete preparation and exact scalar equation

The changed member is the positive representative initially at $(\cos\alpha_0,0,\sin\alpha_0)$, where $\alpha_0=\pi/6$. Its complete meridional preparation is

$$
\alpha_\varepsilon(T)=
\begin{cases}
\alpha_0,&T\le-1/4,\\
\alpha_0+\varepsilon T(1+4T)^3,&-1/4<T\le0,
\end{cases}
\qquad \phi(T)=0.
$$

Every other member keeps its original preparation with initial speed $1/4$. The changed preparation has the same release position and tangent direction, a complete prepared speed at most $\varepsilon$, and identical stationary sites before $-1/4$. Its displacement during preparation is bounded by $27\varepsilon/(1024)$; it introduces no extra constraint or modified kernel. As in the base release, the equation is imposed after the preparation cut with continuous position and velocity and a possibly different right acceleration.

Until the first nonstationary emission arrives, reflection of the five fixed source sites preserves each representative meridian. The changed member therefore satisfies exactly the same scalar equation as before, with only its initial derivative changed:

$$
\ddot\alpha=f(\alpha),\qquad \alpha(0)=\alpha_0,\qquad \dot\alpha(0)=\varepsilon.
$$

For completeness, put $z=\alpha-\alpha_0$, $\rho_0=\sqrt3/2$, and define

$$
d_L^2=2+\rho_0\cos\alpha-\sin\alpha,
\quad d_O^2=2-\rho_0\cos\alpha+\sin\alpha,
\quad d_A^2=2+2\cos z,
$$

$$
f(\alpha)=-(\rho_0\sin\alpha+\cos\alpha)(d_L^{-3}+d_O^{-3})+\frac{\sin z}{d_A^3}.
$$

These are the five old-source contributions projected onto the latitude tangent: two like-polarity partners, two non-antipodal opposite-polarity partners and the own opposite-polarity partner. They do not substitute moving source positions for old emissions. The [first-turn derivation](spherical-three-three-symmetry-first-turn.md#uniform-bounds-on-a-latitude-strip) established, throughout $0\le z\le1/8$,

$$
-4<f(\alpha)<-7/8,
\qquad d_j>9/8.
$$

The new sensitivity argument needs one additional bound. The static vector field satisfies $|\mathbf A|<4$ and $\|D\mathbf A\|<8$ on this strip's enclosing radius-$1/8$ ball, from the five inverse-square terms and their derivative norms $2/d_j^3$. Since $f=\mathbf e_\alpha\cdot\mathbf A(\mathbf x(\alpha))$, and both $|\mathbf e_\alpha'|$ and $|\mathbf x'|$ equal one, differentiation gives

$$
\boxed{|f'(\alpha)|<12.}
$$

This is a uniform derivative bound on the exact reduced acceleration, not an assumed linear response law.

## Uniform existence through the first turn and reversal

The permitted speeds lie in $6/25\le\varepsilon\le13/50$. The same integral and acceleration inequalities as for the base release give

$$
\frac{\varepsilon}{4}<T(\varepsilon)<\frac{8\varepsilon}{7}\le\frac{52}{175}<\frac3{10},
\qquad
\frac{\varepsilon^2}{8}<z_*(\varepsilon)<\frac{4\varepsilon^2}{7}\le\frac{169}{4375}<\frac18.
$$

The receiver cannot leave the upper boundary of the strip before stopping, because integrating $v\,dv=f(\alpha)\,d\alpha$ bounds its rise by $4\varepsilon^2/7$. This is calculus for the scalar equation, not a physical energy identification. The acceleration at the stop is strictly negative, so every member reverses meridional direction at its own first turn.

Every such solution remains in the strip for at least $1/32$ after its own turn. Over that interval its backward speed is less than $1/8$ and its backward displacement is less than $1/512$. The smallest possible turning rise is greater than $(6/25)^2/8=9/1250>1/512$, so it cannot leave through the lower boundary. Its event interval has the common upper time bound

$$
T(\varepsilon)+\frac1{32}<\frac{52}{175}+\frac1{32}=\frac{1839}{5600}<\frac13.
$$

The complete prepared and evolved speed is at most $13/50<1$. Every stationary partner chord is greater than $9/8$, so every explicit emission $S=T-d_j$ lies before $-1/4$ with margin

$$
-\frac14-S>\frac98-\frac13-\frac14=\frac{13}{24}.
$$

Thus each partner root samples a stationary transmitter with $D_t=W^{\mathrm{acc}}=1$. The global speed bound makes every partner delay function strictly increasing and excludes additional roots; it also excludes all positive-delay self roots. This closes the exact canonical reduction uniformly throughout the parameter family. The other five members remain unchanged because their arriving source histories are unchanged on this domain.

## Stopping-time derivative with an explicit positive lower bound

Write $v(T;\varepsilon)=\dot\alpha(T;\varepsilon)$. Smooth dependence of this smooth scalar initial-value problem on its initial speed gives

$$
y(T)=\partial_\varepsilon\alpha(T;\varepsilon),
\qquad y''=f'(\alpha(T;\varepsilon))y,
\qquad y(0)=0,
\qquad y'(0)=1.
$$

This differentiates a family of moving solutions over a finite time interval. It is not a stability calculation about an equilibrium. The coefficient bound $|f'|<12$ implies, from the Volterra integral equation,

$$
|y(T)|\le\frac{\sinh(\sqrt{12}T)}{\sqrt{12}},
\qquad
2-\cosh(\sqrt{12}T)\le y'(T)\le\cosh(\sqrt{12}T).
$$

These estimates apply through the first turn of each member of the parameter family. Local smooth continuation past that transverse turn justifies differentiating its stopping condition. Because $T(\varepsilon)<3/10$, the squared hyperbolic argument is at most $27/25$. Bounding its series after the quadratic term by a geometric series of ratio $9/100$ gives

$$
\cosh(\sqrt{12}T)\le1+\frac{27/50}{1-9/100}=\frac{145}{91}.
$$

Consequently $37/91\le y'(T)\le145/91$, and in particular the initial-speed sensitivity of the signed velocity remains strictly positive. Differentiate the zero-velocity condition $v(T(\varepsilon);\varepsilon)=0$:

$$
T'(\varepsilon)=-\frac{\partial_\varepsilon v(T(\varepsilon);\varepsilon)}{f(\alpha_*(\varepsilon))}
=\frac{y'(T(\varepsilon))}{-f(\alpha_*(\varepsilon))}.
$$

The negative acceleration at the turn supplies a nonzero denominator, so the implicit-function step is valid. Applying $7/8<-f<4$ gives the explicit inequalities

$$
\frac{37}{364}<T'(\varepsilon)<\frac{1160}{637},
\qquad\text{hence}\qquad
\frac1{10}<T'(\varepsilon)<2.
$$

The mean-value theorem then proves the stated time-displacement direction and magnitude for every permitted $\delta$, rather than merely at infinitesimal order.

## Turning latitude and the geometry of the changed motion

Let $G(z)=\int_0^z[-f(\alpha_0+u)]\,du$. This is a mathematical primitive used to integrate the one-dimensional equation; it is not assigned a physical energy meaning. The stopping point satisfies $G(z_*)=\varepsilon^2/2$. Since $G'>7/8$, it is unique in the strip and differentiable in $\varepsilon$. Differentiation yields

$$
\alpha_*'(\varepsilon)=z_*'(\varepsilon)=\frac{\varepsilon}{-f(\alpha_*)},
\qquad
\frac3{50}<\alpha_*'(\varepsilon)<\frac{52}{175}<\frac3{10}.
$$

The changed member remains on exactly the same meridian as the base member and undergoes the same local pattern of ascent, complete stop and descent. Its turning latitude changes, so its traversed arc has a different endpoint: the perturbed motion is not merely the old path traversed with a shifted clock. No new azimuthal path or qualitative long-time pattern is established. This differs from the earlier direction perturbation, which retained transverse motion and removed the full stop within the controlled interval.

At the original stopping instant $T_*$, the changed member is still ascending for $\delta>0$ and is already descending for $\delta<0$. The time shift is less than $2|\delta|\le1/50<1/32$, so the earlier-turning history remains within its verified post-turn interval at that comparison event. Integrating $7/8<-f<4$ between the two stopping times gives

$$
\frac7{80}|\delta|<|v(T_*;1/4+\delta)|<8|\delta|,
\qquad
\operatorname{sign}v(T_*;1/4+\delta)=\operatorname{sign}\delta.
$$

The other five speeds are zero at $T_*$. These bounds therefore quantify their simultaneous speed spread at the base stopping event. The initial speeds were already unequal in this slice; this is a timing and excursion response to that declared change, not an example of splitting from equal initial speeds. In contrast, the initial signed acceleration is the same $f(\alpha_0)$ for every release speed because the arriving stationary sites are unchanged.

## Support and physical boundary

The previous strip calculation gives $1/4<-A_n<4/3$. With speed at most $13/50$, the normal support throughout each event interval obeys

$$
\frac{114}{625}<\lambda=-v^2-A_n<\frac43.
$$

The motion remains externally supported and outward-normal-supported on this domain. No tangent support, altered response law, primitive mass, energy label or stability spectrum has been introduced. All statements concern the declared finite history and stop before its stationary-source reduction is lost.

## Verification and preservation

The new ingredients are the uniform derivative bound $|f'|<12$, the finite-time initial-speed sensitivity equation and the implicit stopping-time derivative. The existing acceleration strip and source geometry are consumed from the previously retained first-turn result. Exact algebraic inequalities, rather than numerical quadrature or a new evolution instrument, establish the claims. A violation of the derivative bound on the strip, an incorrect hyperbolic majorant, failure of the transverse zero-velocity event, or a lost stationary-emission margin would falsify the result; each condition has an explicit formula above.

The live `AGENTS.md` and assigned Emmy Noether role were reread for this slice. Only this new symmetry-prefixed companion is authored; all earlier artifacts are preserved as frozen subjects, and the coordinator owns synthesis and trackers. No numerical solver, heavy job, new lease, corpus edit or publication action was used. The complete small evidence is retained here. The bounded speed-perturbation result is complete pending independent review and integration, and no further exploration is undertaken in this slice.

Document checks: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (exit 1 records the file difference); scoped `rg` confirmed the linked strip heading. `shasum -a 256` on the six earlier symmetry artifacts matched their frozen identities, including the source first-turn hash `82e30c3da469c692944115074292b3f5a244d7551e11318d972af1276b225b2e`. These checks concern document hygiene and preservation, while the displayed derivation carries the mathematical evidence.
