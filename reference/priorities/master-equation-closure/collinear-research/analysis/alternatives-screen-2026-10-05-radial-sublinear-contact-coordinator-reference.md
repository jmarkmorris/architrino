# Coordinator construction of strictly subfield contact below radial exponent one

## Frozen complete case

**Grade: derived candidate, awaiting an independently constructed assessment.** Fix $0<p<1$, put $q=1-p$, and select $K=R_*=c_f=1$ with opposite mirror labels $x(T),-x(T)$. This is the sharp radial law $R^{-p}$ with its unchanged transmitter factor and complete ordinary-root convention. No core, finite window, receiver factor, collision rule or speed cap is added.

Choose a fixed radius satisfying

$$
0<a\le\frac12\left(\frac{1-p}{256}\right)^{1/(1-p)},\qquad d=a/16.
$$

Supply $x(S)=a$ for $S\le-d$. On $[-d,0]$, put $z_p=(S+d)/d$ and

$$
v(S)=Ad\,z_p^2(1-z_p),\qquad
x(S)=a+\int_{-d}^S v(u)\,du,
$$

where $A>0$ is the unique root

$$
A=(2a+Ad^2/12)^{-p}.
$$

The left side increases from zero while the right side decreases, proving uniqueness. Moreover $A\le(2a)^{-p}$. The patch joins the held tail with zero velocity and acceleration and ends at

$$
x_0=a+Ad^2/12,\qquad v(0)=0,\qquad v'(0-)=-A.
$$

Its release partner source is $S_0=-(x_0+a)<-d$, in the unchanged held tail; therefore the release input is exactly $-(x_0+a)^{-p}=-A$. The complete preparation is separated and locally $C^{2,1}$. Its speed is nonnegative and bounded by $4Ad/27\le a^{1-p}/108$. Also $a\le x_0\le2a$ under the displayed choice. The other label has the exact negative history. This case was specified before deriving its future; no target computation is used.

## Ordinary future and speed bootstrap

While $x>0$ and the complete speed is below one, the partner residual is strictly monotone in delay, giving exactly one root. The complete strict speed chord inequality excludes every positive-delay self root. The right-member equation is

$$
v'=-Q(T),\qquad Q=\frac1{R^pD}>0,\qquad
R=T-S=x(T)+x(S),\qquad D=1+v(S).
$$

Thus $v<0$ immediately after release and decreases. Use a provisional complete speed bound $b=1/2$. From $|x(S)-x(T)|\le bR$,

$$
\frac{4x}{3}\le R\le4x,\qquad
\frac12\le D\le\frac32.
$$

Consequently

$$
c_p x^{-p}\le Q(T)\le2x^{-p},\qquad
c_p=\frac{2}{3\,4^p}>0.
$$

Let $u=-v>0$ on the inward future. Along its strictly decreasing radius, the chain rule gives $d(u^2)/dx=-2Q$. Integrating from release to the current radius, without assuming a conserved energy, yields

$$
\frac{2c_p}{1-p}(x_0^{1-p}-x^{1-p})
\le u^2\le
\frac4{1-p}(x_0^{1-p}-x^{1-p}).
$$

The explicit radius choice makes the last upper bound at most $1/64$, so $u\le1/8$. The supplied past is also below $1/8$. This strictly improves the provisional $1/2$ bound; a first speed-bound failure is impossible. Every positive-gap finite interval therefore keeps a complete strict margin and ordinary root census.

Local existence and uniqueness use a positive source-delay floor at each positive separation. Every compact receiving interval before contact samples a compact regular part of the supplied or generated past. If a finite maximal time had positive limiting separation, its source times would stay strictly below that endpoint and the equation would continue. Unit speed is excluded by the proved bound. Therefore the only finite ordinary endpoint can be contact.

Since $Q\ge c_p x_0^{-p}$, $x(T)\le x_0-(c_p/2)x_0^{-p}T^2$ as long as the separated chart survives. It cannot survive past the resulting finite zero. Hence actual contact occurs at a finite $T_c$, with

$$
x(T)\downarrow0,\qquad v(T)\downarrow-u_c,
$$

$$
0<\frac{2c_p}{1-p}x_0^{1-p}\le u_c^2
\le\frac4{1-p}x_0^{1-p}\le\frac1{64}.
$$

The partner source delay tends to zero, while $D\to1-u_c\ge7/8$. Thus this is a range-collapse endpoint at strictly subfield speed, not a transmitter fold or unit event. The incoming speed is nonzero.

## Contact time and small-radius family limits

Define the finite positive integral

$$
I_p=\int_0^1\frac{dy}{\sqrt{1-y^{1-p}}}.
$$

The square-root singularity at $y=1$ is integrable, and the integrand is bounded near zero. Integrating the two actual speed bounds over radius gives

$$
\frac{\sqrt{1-p}}2 I_p x_0^{(p+1)/2}
\le T_c\le
\sqrt{\frac{1-p}{2c_p}}I_p x_0^{(p+1)/2}.
$$

For the family limit $a\downarrow0$ at this fixed exponent, the complete speed bound is $b_a=O_p(a^{(1-p)/2})\to0$. The same exact chord inequalities, now with this sharper bound, imply $R/(2x)=1+O_p(b_a)$ and $D=1+O_p(b_a)$ uniformly throughout the incoming future, even arbitrarily close to contact. Therefore

$$
Q=(2x)^{-p}[1+O_p(b_a)]
$$

uniformly. Integrating its positive upper and lower bounds, rather than differentiating a remainder, gives

$$
u_c=\sqrt{\frac{2^{1-p}}{1-p}}\,
a^{(1-p)/2}\left[1+O_p(a^{(1-p)/2})\right],
$$

$$
T_c=\sqrt{\frac{1-p}{2^{1-p}}}\,I_p\,
a^{(p+1)/2}\left[1+O_p(a^{(1-p)/2})\right].
$$

Here $x_0/a=1+O_p(a^{1-p})$ has also been used. The leading instantaneous-looking coefficient is derived from the uniformly slow complete delayed family; no instantaneous law or conservation principle was inserted as a premise. These are analytical family limits, not measurements.

## Exact incoming singularity for each fixed member

Fix one admitted $a>0$ and write $\Delta=T_c-T$. The nonzero speed limit gives $x(T)\sim u_c\Delta$. The complete delay bound implies $R=O(\Delta)$ and $S\to T_c$. Integrating the incoming velocity on $[S,T_c]$ gives $x(S)=u_c(T_c-S)+o(T_c-S)$. Substituting this and $R=T-S$ into the exact root equation yields

$$
\frac R\Delta\longrightarrow\frac{2u_c}{1-u_c},\qquad
\frac{T_c-S}{\Delta}\longrightarrow\frac{1+u_c}{1-u_c},\qquad
D\longrightarrow1-u_c.
$$

Thus

$$
Q(T)\sim L_p\Delta^{-p},\qquad
L_p=\frac{(1-u_c)^{p-1}}{(2u_c)^p}>0.
$$

Because $p<1$, this acceleration singularity is integrable. Tail integration gives the precise incoming expansions

$$
v(T)=-u_c+\frac{L_p}{1-p}\Delta^{1-p}
+o(\Delta^{1-p}),
$$

$$
x(T)=u_c\Delta-
\frac{L_p}{(1-p)(2-p)}\Delta^{2-p}
+o(\Delta^{2-p}).
$$

The path has finite one-sided position and velocity and unbounded acceleration. These statements concern the incoming ordinary solution only. At contact the admitted partner delay collapses to the zero-range diagonal; no positive-delay ordinary root remains there under the strict speed chord bound. The incoming path cannot extend as a classical $C^2$ solution through that event because its acceleration diverges. A weaker almost-everywhere continuation, passage or collision prescription would require a separately declared solution class and proof. This note supplies none and does not infer a boundary selector from integrability alone.

## Relation to the exponent-one boundary and falsifiers

At $p\ge1$, the corresponding source-time integral diverges at hypothetical contact and excludes a finite contact endpoint with bounded monotone speed. Here the integral is finite, and the explicit compatible family realizes contact before any unit event. This is a sharp distinction between stated proof domains, not a claim that every $p<1$ preparation collides or that the thresholds are uniform as $p\uparrow1$.

Falsifiers are a failed compatibility root, an additional ordinary root under the complete strict-speed bound, a violation of the integrated speed bounds, a positive-gap finite endpoint despite its regular source window, a contact speed outside the explicit bounds, or an incoming member failing the displayed delay or singularity coefficient. The exact small-radius bound and all constants are operator-checkable. No source is removed, no coefficient changes during evolution, no numerical target runs, and no prior source, reference or canonical law is edited.
