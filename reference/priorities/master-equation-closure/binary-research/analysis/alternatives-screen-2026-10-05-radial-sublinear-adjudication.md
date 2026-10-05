# Assessment of rotating sublinear radial histories

**Accepted derived results:** for every fixed $0<p<1$, a complete compatible separated mirror history with uniformly subfield supplied past, nonnegative past rotation and positive release rotation reaches unit speed at finite future time with positive separation. No future uniform speed margin is assumed. For the explicitly patched slow circle-tail family, a separate controlled expansion describes the actual trajectory up to any sufficiently small fixed physical speed. Neither result selects a continuation after the unit event or establishes binding.

The equation is the sharp radial ordinary-root row with $K=R_*=c_f=1$. The coordinator independently constructed the [finite first-unit reference](alternatives-screen-2026-10-05-radial-sublinear-first-event-coordinator-reference.md) before receiving the [independent first-event proof](alternatives-screen-2026-10-05-radial-sublinear-first-event-independent.md). The [compatible preparation](alternatives-screen-2026-10-05-radial-sublinear-preparation-independent.md) and [controlled local expansion](alternatives-screen-2026-10-05-radial-sublinear-rotation-independent.md) were read in full and their source expansion, moving-scale equations and error estimate reconstructed directly. This latter reconstruction is an independent mathematical check after reading the subject, not a claim that the whole expansion was derived blind.

## Complete preparation and actual root domain

For the slow family put $q=1-p$, $m=3-p$, $r_0=(2^p\epsilon^2)^{1/q}$, $s=\epsilon T/r_0$ and $X(T)=r_0Y(s)$, with partner $-X$. The supplied scaled past is the unit circle outside a patch of width $d=\epsilon/16$. Inside the patch add $d^2z^3(1-z)^2B_p/2$, where $z=1+s/d$ and $B_p$ is the difference between the actual delayed release acceleration and the circle acceleration. This preserves the release position and velocity and supplies exactly the received second derivative. The release source is at $s=-2\xi$, where $\xi=\epsilon\cos\xi$, and precedes the entire patch. The source is therefore evaluated on the unchanged complete circle, not on an assumed circular solution.

For $0<\epsilon\le1/16$, the preparation source proves complete separation, local $C^{2,1}$ regularity, positive areal rate and physical speed at most $\epsilon(1+2\epsilon^2)<1$. The acceleration and patch bounds include all negative times. The full partner residual is strictly monotone, giving exactly one simple partner hit; complete strict speed chords exclude all positive-delay self hits. These are conclusions of the complete root census, not root exclusions imposed on the law.

## Why the rotating future must reach unit speed

Write $r=|X|$ and $h=X\times X'$. On every strictly subfield portion, the exact positive torque and the causal half-plane geometry give

$$
h'(T)>0,\qquad h(T)\ge h_0>0,\qquad r(T)>h_0.
$$

Let $b_0<1$ bound the supplied past, and $B=2/(1-b_0)$. At a first outward crossing of a large trial radius $M\ge2r(0)$, a generated source has radius at most $M$ and hence range at most $2M$. For a negative-time source, the complete past speed bound and $S=T-R$ instead give $(1-b_0)R\le r+r(0)-b_0T\le2M$. Thus the same bound $R\le BM$ holds without assuming a future uniform speed margin.

While $M/2\le r\le M$, the radial attraction obeys $A_r\le-c_0M^{-p}$ with $c_0=1/(4B^{p+1})$, whereas the centrifugal term is at most $2/M$. Choose $M$ so that $c_0M^{1-p}\ge4$. Then $r''\le-(c_0/2)M^{-p}$. Starting at the last crossing of $M/2$, the incoming radial speed is below one, so the maximum further displacement is at most $M^p/c_0\le M/4$. The proposed first crossing of $M$ is impossible. This proves a finite radius ceiling throughout the strictly subfield future.

After time $M+r(0)$, all partner sources are generated. The exact angular lag then gives a uniform positive torque lower bound, for example

$$
h'\ge\kappa_0,\qquad
\kappa_0=\frac{h_0^3}{\pi M^2(2M)^p}>0.
$$

Since $h<r<M$ before unit speed, the strictly subfield interval has finite length. Both independent proofs give an explicit finite upper bound using these constants. At its endpoint, separation is at least $2h_0$ and partner delay exceeds $h_0$. All sampled emissions consequently belong to a compact earlier interval with a strict source speed margin. The transmitter denominator stays positive, acceleration remains bounded, and position and velocity have limits. If the limiting speed were below one, ordinary continuation would extend the interval. Hence the first loss is unit speed, with positive separation and regular incoming source data.

The complete incoming root census persists at the endpoint by strict source chords. The proof does not establish transverse crossing, a post-unit root structure or a selected outgoing continuation. It also does not extend to $p=1$, where the large-radius domination used above fails.

## Controlled trajectory through a fixed small speed

For the explicit slow family define $a=h^{2/m}$ in scaled variables, $\delta=\epsilon a^{q/2}$, $x=r/a$, $y=a^{-q/2}u$, and $k=2/m$. The local proof retains the complete delayed source interval and its own source interval. It obtains second-order radial and tangential rows by integrated Taylor estimates; no actual third derivative is assumed. A printed missing plus sign before the radial big-$O$ term in the frozen subject is interpreted as an additive remainder. The frozen source is preserved.

After the shift $w=y-k\delta x^{1-p}$, the signed damping coefficient is $\gamma=p(p-1)/m<0$. A corrected local energy about its moving minimum gives an amplitude $J$ satisfying

$$
J\le C_p\left[\epsilon(\epsilon/\delta)^{p/2}+\delta^2\right],\qquad
\epsilon\le\delta\le\delta_*(p).
$$

The coordinator checked the $\delta$ derivative in the shifted equation, the potential correction, and the mixed energy term that produces the negative damping. The estimate follows from a differential inequality for $J$ and does not impose a positive lower amplitude floor. The threshold and constants are existential for each fixed exponent, not numerical or uniform as $p$ approaches zero or one.

Put $C_r=2^{p/q}$, $\lambda=2p/q$ and $E_\epsilon=\epsilon(\epsilon/\delta)^{p/2}+\delta^2$. The actual physical quantities obey

$$
|X|=C_r\delta^{2/q}[1+O_p(E_\epsilon)],\quad
|X'|=\delta[1+O_p(E_\epsilon)],\quad
\frac{d|X|}{dT}=k\delta^2+O_p(\delta E_\epsilon),
$$

$$
T(\delta)=\frac{C_r}{pk}(\delta^\lambda-\epsilon^\lambda)
[1+O_p(\epsilon+\delta^2)],\qquad
\theta(\delta)-\theta(0)=\frac m q(\epsilon^{-1}-\delta^{-1})+O_p(1).
$$

The multiplier on the time expression is multiplicative. For a sufficiently small fixed speed $b$ and sufficiently smaller launch $\epsilon$, substitute $\delta=b[1+O_p(\epsilon+b^2)]$ to obtain the first-$b$ radius, time and angle estimates. This supplies controlled secular evolution through a fixed speed, while the separate global first-event theorem identifies the eventual finite unit endpoint. No extrapolation of the small-speed expansion to speed one is used.

## Evidence identities and falsifiers

SHA-256 identities measured with `shasum -a 256` are: preparation `06323905616fea6a84ccc368aaffa492d411bab5b0e1d04b092d746aac4f55da`; local expansion `c6d58471aadb927f5eba324e2796f892da9d4330eb420601a275e967b7469e0a`; independent first-event proof `1471f4501c97a19ba47b44662c11833405a6c53c85d6a47a36d9e3e52c9a3b96`; coordinator first-event reference `79b2994447e84d39e5ee386de4a1fdc16fddab66c289ccc1db3b12d1712dc223`. The older local source's unresolved eventual fate is superseded only by the separately assessed first-event theorem.

A compatible strictly subfield future crossing the stated radius ceiling, failure of the complete negative-time range estimate, a nonpositive torque under the specified rotation assumptions, or loss of the delayed source margin before the endpoint would falsify the first-event argument. Failure of the signed second-order source row, moving-scale derivative or amplitude inequality would falsify the local expansion. No numerical trajectory or fitted trend is used as evidence. These results concern the selected alternative law and do not alter canon.
