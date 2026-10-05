# Independent assessment of the radial critical-escape construction

## Verdict and evidence boundary

**Derived verdict: the critical zero-speed escape theorem and its leading coefficients are valid for the declared complete held-and-ramped mirror family, for every fixed $p>1$ and fixed admissible $a$.** The proof establishes existence of a zero-speed parameter on the boundary of the inward-turn component containing zero. It does not establish a unique critical parameter or any ordering of different trajectories by their release speed. No mathematical repair is required for this scoped result.

This assessment independently reconstructs the root domain, finite-boundary alternatives, parameter-continuity argument and late-time integration. The [reviewed source](alternatives-screen-2026-10-05-radial-critical-escape.md) was measured by `shasum -a 256` as `def392506a26514e49abbb9400d0a64c7cd33935fd4fdf31cb840b194a3fafbb`. The mathematical reference is the direct derivation below, not another numerical realization or the author's claim of agreement. The Hale role is an analytical lens, not an acceptance authority. This verdict was completed and frozen before opening the separately assigned noncollinear zero-speed asymptotic source.

The selected scenario changes only the radial magnitude of the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) to $R^{-p}$, with $K=R_*=c_f=1$, opposite polarity, the original transmitter denominator and every ordinary self/partner root. Positions are $x(T)$ and $-x(T)$, where $T$ is absolute time. No receiver factor, contact rule, speed cap, mechanical energy conservation, or post-unit continuation is assumed. The supplied past need not solve the released equation; it is a complete preparation with the required release compatibility.

## Compatibility and the hereditary domain

Write $b=v_0\in[0,3/4]$. The compatibility equation is

$$
F(A,b)=A-(2a+b/2+A/12)^{-p}=0.
$$

At $A=0$ this function is negative; at $A=1/100$ it is positive because $a\ge100$ and $p>1$. Its derivative $F_A=1+(p/12)(2a+b/2+A/12)^{-p-1}$ is positive. Thus there is exactly one root in that interval, depending smoothly on $b$. On the ramp, integration of $3q^2-2q^3$ and $q^2(1-q)$ over $[0,1]$ gives $1/2$ and $1/12$. Differentiation gives zero acceleration at $q=0$ and acceleration $-A$ at $q=1$. Hence $x_0=a+b/2+A/12$, $v(0)=b$ and $v'(0-)=-A$. The entire past is nondecreasing and has speed at most $3/4+4/2700<4/5$. The release root is $S_0=-(x_0+a)<-200$, in the stationary tail, so its exact acceleration is $-(x_0+a)^{-p}=-A$. These calculations independently verify both seams and the release compatibility.

On any separated strictly subfield future chart, $x$ stays positive. For a reception at $T$, define the partner residual in positive delay $u$ by

$$
g_T(u)=u-x(T)-x(T-u).
$$

It has $g_T(0)=-2x(T)<0$, derivative $g_T'(u)=1+v(T-u)>0$, and tends to positive infinity in the held tail. Exactly one positive root therefore exists and is simple. Every possible source time is included in this monotonicity argument. A positive-delay self root would require a displacement equal to the elapsed time, contradicted by the integral of the strictly subfield speed over that interval. Thus there is one partner root and no self root; neither conclusion follows merely from the present speed.

With $S=T-u$ and $R=T-S=x(T)+x(S)$, the exact equation and its source-clock derivative are

$$
x'=v,\qquad v'=-Q,\qquad Q=\frac{1}{R^p[1+v(S)]}>0,
\qquad S'=\frac{1-v(T)}{1+v(S)}>0.
$$

Mirror symmetry is preserved by uniqueness because reflection exchanges the complete label histories and their equations. To justify that uniqueness, restrict to a compact chart with positive radius, a strict speed margin and bounded past acceleration. The delay and root derivative then have positive floors. A time step shorter than the delay floor evaluates an already known source segment. The implicit root estimate divides positional discrepancy by $1+v(S)$; displacement of source-velocity evaluation is controlled by bounded source acceleration. The resulting ordinary right-hand side is locally Lipschitz in the reception position. Successive position-velocity steps establish local existence, uniqueness and continuation. This construction also explains why the complete history, including the old held tail, is necessary data.

## First finite boundary and the global alternatives

Let $T_*$ be a finite endpoint of the separated strict-subfield chart. Bounded speed gives a finite radius limit, while $v'=-Q<0$ gives a velocity limit in $[-1,b]$. Source times cannot escape to negative infinity: in the tail their defining equation is $S=T-x(T)-a$, bounded on a finite reception interval. Since $S'>0$, a finite source-time limit exists.

Suppose the radius limit were zero. If the limiting source time were strictly earlier than $T_*$, the root relation would demand a unit-average-speed displacement from $x(S_*)$ to zero. The entire intervening open interval has strictly subfield speed. Continuity makes its speed integral strictly smaller than its duration even if the endpoint speed tends to one. Thus $S_*=T_*$ and $R\to0$. Changing variables using the exact increasing source clock now yields

$$
Q(T)\,dT=\frac{dS}{R^p[1-v(T)]}
\ge\frac{dS}{2(T_*-S)^p}.
$$

For $p>1$ the last integral diverges as $S\uparrow T_*$. This contradicts $\int Q\,dT=b-v(T)<b+1$. Contact before or simultaneous with the first unit event is excluded. The proof also works at $p=1$, although the critical-escape construction does not.

If the limiting radius is positive, $R\ge x(T)$ gives a positive delay floor. Sampled source times remain in a compact interval strictly before $T_*$. On that compact already supplied or generated segment, $1+v(S)$ has a positive minimum. The acceleration therefore has a finite positive limiting magnitude. If the present velocity limit exceeded $-1$, the preceding method of steps would continue the strict chart. Its only possible finite endpoint is consequently $v\to-1$ at positive separation, with $v'\to-Q_*<0$.

Once $v(T_1)<0$, strict decrease keeps it below that negative value. Radius would become nonpositive by $T_1+x(T_1)/|v(T_1)|$ if the strict chart persisted. Therefore that member reaches the finite inward unit endpoint just classified. At $b=0$, $v'(0)=-A<0$, providing one such member.

Conversely, a member that never becomes negative cannot attain zero at a finite time, because its strictly negative derivative would immediately make it negative. It keeps $x\ge x_0>a$ and $0<v\le b\le3/4$. Together with the old speed margin, these bounds rule out every finite chart endpoint. Its decreasing speed has a limit $V\ge0$. Its radius cannot stay below a finite $L$, because then all past and future source positions lie in $[a,L]$, $R\le2L$ and $1+v(S)<2$, giving a positive uniform lower bound for $Q$ and an impossible infinite decrement in bounded velocity. Hence $x\to\infty$. This proves the three alternatives used by the parameter argument.

## Open outcome sets and the existence conclusion

Along a complete outward member, $R\ge x+a$ and $1+v(S)\ge1$. Define the mathematical comparison quantity

$$
E=\frac{v^2}{2}-\frac{(x+a)^{1-p}}{p-1}.
$$

It satisfies $E'=v[v'+(x+a)^{-p}]\ge0$. If $E$ becomes positive, a subsequent first zero of $v$ would give $E<0$, a contradiction; in fact $v\ge\sqrt{2E(T_0)}>0$. The $b=3/4$ member has $E(0)\ge9/32-(2a)^{1-p}/(p-1)>0$. For any member with $V>0$, the established divergence of $x$ implies $E\to V^2/2>0$, so positive-speed escape has a finite witness. This inequality uses no conserved physical energy.

Parameter continuity must apply to histories, not merely to release coordinates. Here the old tail is identical for every $b$, the ramp varies smoothly in $C^2$, and only a compact source-time interval is sampled up to any fixed regular reception time. The local root estimate and ordinary integral difference estimate on finitely many common short steps give continuous dependence of $(x,v)$ on $b$. All floors are taken in a neighborhood of the fixed reference trajectory on this finite interval; no uniform all-future dependence theorem is asserted.

The set $\mathcal I$ with a finite negative-velocity witness is therefore relatively open, as is the set $\mathcal P$ with positive terminal speed: for the latter use a finite positive-$E$ witness and the strictly positive speed minimum on its finite prefix. They are disjoint and contain relative neighborhoods of the two endpoints $0$ and $3/4$. Their complement is nonempty by connectedness. More precisely,

$$
b_* = \inf\bigl([0,3/4]\setminus\mathcal I\bigr)
$$

lies strictly between the endpoints. Openness of $\mathcal I$ excludes $b_*\in\mathcal I$, and openness of $\mathcal P$ excludes $b_*\in\mathcal P$ because every smaller parameter sufficiently close to $b_*$ belongs to $\mathcal I$. The three alternatives thus give a unique trajectory for this parameter that escapes globally with $V=0$. Uniqueness of the trajectory for fixed complete data is distinct from uniqueness of the parameter; the latter has not been proved.

## Independent leading-coefficient calculation

For any zero-speed outward member, averaging $x'=v\to0$ gives $x(T)=o(T)$. The old source segment cannot remain active forever: $S\le0$ would imply $T\le x(T)+x_0$. Eventually $S>0$ and

$$
0<T-S=x(T)+x(S)\le2x(T)=o(T).
$$

Thus $S\to\infty$ and $v(S)\to0$. Monotone generated velocity gives

$$
0\le x(T)-x(S)\le v(S)(T-S)\le2v(S)x(T).
$$

Therefore $R/(2x)\to1$, $1+v(S)\to1$, and $-v'\sim2^{-p}x^{-p}$. This establishes the instantaneous-looking leading term as a limit of the actual delayed equation.

Since $x$ is strictly increasing and unbounded, it is a legitimate coordinate. The chain rule gives $d(v^2)/dx=2v'$. Integrating the eventual two-sided bounds for this derivative from $x$ to infinity, with $v(\infty)=0$, gives

$$
v^2\sim \frac{2^{1-p}}{p-1}x^{1-p}.
$$

Let $C_p=\sqrt{2^{1-p}/(p-1)}$ and $B_p=(p+1)C_p/2$. Then $d[x^{(p+1)/2}]/dT\to B_p$, so

$$
x(T)\sim(B_pT)^{2/(p+1)},\qquad
v(T)\sim\frac{2}{p+1}B_p^{2/(p+1)}T^{-(p-1)/(p+1)}.
$$

At $p=3/2$, $C_p=2^{1/4}$; at $p=2$, $(B_p)^{2/3}=(9/8)^{1/3}$. These reproduce the source coefficients by a separately organized derivation. The held radius and choice among zero-speed parameters can affect subleading behavior but not these leading constants.

## Falsifiers, remaining burdens and validation

The verdict would fail if a source-history root were omitted despite the monotone residual; if compatibility or the finite-history Lipschitz estimates failed; if finite contact were possible despite the divergent source-clock integral; if a positive-$E$ member later turned; or if a zero-speed outward member had $R/(2x)\not\to1$. Each is directly testable against the equations above. None was found in the analytical reconstruction.

Still unproved are uniqueness of the zero-speed parameter, monotonicity in $b$, rates in parameter space, nonmirror stability and post-unit continuation. In particular, the positive outward ramp is not a complete monotone inward history. An obstruction theorem requiring that premise cannot be applied to this family's unit endpoint. No bound assembly or generic-history classification follows from this escape theorem.

Validation consists of direct algebra, complete-root monotonicity, the finite-contact integral, method-of-steps estimates, the open-set argument and the two-sided tail integration recorded here. No numerical solver, new executable checker, Python process or background job was used. The source and inherited analyses were left unchanged; only this new assessment was authored. Repository whitespace validation is recorded separately after creation.
