# Independent causal collinear first-event calculation

Claim grade: derived for the explicitly postulated logarithmic causal receiver equation and the supplied affine histories below. This calculation was developed from the existing manuscript's equation without reading the primary causal first-event proof. Its main route uses the evolution of the partner delay as a second variable. It establishes an incoming event and a conditional continuation obstruction, not a physical selection of the proposed law.

## Preparation and receiver equation

Use normalized wake speed $c_f=1$. Let the opposite-polarity constituents have equal charge magnitude, positive response coefficient $K$, and mirror positions $X_+(t)=x(t)$ and $X_-(t)=-x(t)$. The half-separation $x>0$ is a distance; define individual inward speed $u=-\dot x$. Supply the entire history

$$
x(t)=a-u_0t,\qquad u(t)=u_0,\qquad t\le0,
\qquad a>0,\quad 0\le u_0<1.
$$

The stationary preparation is $u_0=0$. The affine inward preparation has $u_0>0$ and separates farther into the past. These are supplied preparations, not solutions of the interacting equation for negative time. Position and velocity agree at release; acceleration can jump there.

For every positive-delay simple root, the candidate acceleration contribution is $K\sigma_{ij}\hat r/[r|D_t|]$, where $\sigma_{ij}$ is positive for like polarities and negative for unlike polarities, $r$ is delayed source-to-receiver distance, and $D_t=1-\hat r V_j(s)$. All admitted self roots are included. A zero-delay root is excluded. This note applies only to the regular-root equation; it adds no cap, contact prescription, or subtraction of a divergent self contribution.

## Root census below individual speed one

Suppose a solution has $x(t)>0$ and $0\le u(t)<1$ through a reception time $t$. On this history, define

$$
P(s)=s+x(s),\qquad Q(t)=t-x(t).
$$

The right constituent's partner root is exactly

$$
P(s)=Q(t),\qquad R=t-s=x(t)+x(s)>0.
$$

Here $R$ is both positive delay and delayed distance because $c_f=1$. Since $P'=1-u>0$, $P$ is strictly increasing. The affine past gives $P(s)=a+(1-u_0)s\to-\infty$ as $s\to-\infty$, whereas $P(t)>Q(t)$. Thus exactly one partner root exists, with $s<t$. The other constituent has its reflected partner root. The source velocity projected onto the partner hit is $u(s)$, so its source denominator is $D_t=1-u(s)>0$.

For a same-constituent candidate root, displacement would have to equal delay. Instead,

$$
|X_i(t)-X_i(s)|=\int_s^t u(v)\,dv<t-s.
$$

There are no positive-delay self roots anywhere on this history. This is a root census, not imposed self suppression. The ordinary equation therefore reduces exactly to

$$
\boxed{\dot x=-u,\qquad
\dot u=\frac{K}{R[1-u(s)]},\qquad
P(s)=Q(t).}
$$

The acceleration is strictly inward. In particular $u$ increases after release, and its earlier value satisfies $u_0\le u(s)\le u(t)$. A turn cannot occur during this incoming interval.

## Local existence and continuation within the incoming domain

Initially the unique root and delay are

$$
s(0)=-\frac{2a}{1-u_0},\qquad R_0=\frac{2a}{1-u_0}.
$$

They lie strictly inside the supplied smooth history. The inverse map $P^{-1}$ is locally Lipschitz because $P'=1-u$ is bounded away from zero on the source interval. Consequently the two-dimensional ordinary equation obtained by substituting $s=P^{-1}(t-x)$ has a locally Lipschitz right side. This constructs a unique release solution.

The same argument extends it in finite steps on any compact interval with $x\ge\epsilon>0$ and $u\le1-\eta<1$. Indeed $R\ge2x\ge2\epsilon$, so a sufficiently short new step consults only the already constructed source history. The stored velocity is locally Lipschitz, including across the release join; the nonzero source denominator preserves local Lipschitz dependence on the current position. The velocity remains continuous when the source time passes zero. Its stored acceleration can have a jump without making the receiver equation singular, because the receiver equation uses stored position and velocity, not stored acceleration.

This establishes existence and uniqueness only while this regular incoming domain persists. It does not license a continuation when the root inventory changes at speed one.

## Delay bounds and exclusion of contact before speed one

Differentiating the partner-root identity gives

$$
\dot s=\frac{1+u(t)}{1-u(s)},\qquad
\dot R=-\frac{u(t)+u(s)}{1-u(s)}.
$$

Thus the positive partner delay decreases, strictly for $t>0$. The source weighting is essential in both this identity and the acceleration. Eliminating time gives, wherever $u(t)+u(s)>0$,

$$
\frac{du}{dR}=-\frac{K}{R[u(t)+u(s)]}.
$$

The statement also has a nonsingular integrated form at a rest release. Directly comparing time derivatives and using $u(s)\le u(t)$ gives

$$
K\left(-\frac{d\ln R}{dt}\right)
\le\frac{d(u^2)}{dt}
\le2K\left(-\frac{d\ln R}{dt}\right).
$$

Integration from release establishes

$$
\boxed{K\ln\!\frac{R_0}{R(t)}
\le u(t)^2-u_0^2
\le2K\ln\!\frac{R_0}{R(t)}.}
$$

Hence a branch with $u\le1$ has a strictly positive lower bound on its partner delay:

$$
R(t)\ge R_{\min}:=R_0
\exp\!\left[-\frac{1-u_0^2}{K}\right]>0.
$$

The acceleration also has a uniform positive lower bound. Since $R\le R_0$ and $1-u(s)\le1-u_0$,

$$
\dot u\ge\frac{K}{R_0(1-u_0)}=\frac{K}{2a}.
$$

The inequality is strict at every positive time. A maximal interval on which $x>0$ and $u<1$ must consequently have a finite endpoint $T\le2a(1-u_0)/K$. Both $x$ and $u$ have finite one-sided limits there: $x$ decreases while positive, and $u$ increases while bounded by one.

Suppose the half-separation limit were zero. The increasing source-time function would have a limit $s_*\le T$. Passing to the root relation gives $P(s_*)=T=P(T)$, where $P(T)$ is defined by the continuous endpoint. Yet $P$ is strictly increasing up to and including this endpoint: the integral of $1-u$ on every nonempty earlier interval is positive. It follows that $s_*=T$, so $R\to0$. This contradicts the positive lower bound $R_{\min}$. Contact therefore cannot be the endpoint.

The half-separation limit is positive. If the speed limit were also strictly below one, the local continuation argument would extend the solution within the incoming domain, contradicting maximality. Thus the endpoint is individual speed one at positive separation. Write it as $T_v$, with $x_v=x(T_v)>0$, partner source time $s_v<T_v$, and delay $R_v=T_v-s_v$.

The resulting bounds are

$$
\boxed{0<T_v<\frac{2a(1-u_0)}{K},\qquad x_v>0,}
$$

$$
\boxed{R_0e^{-(1-u_0^2)/K}
\le R_v\le
R_0e^{-(1-u_0^2)/(2K)}.}
$$

At this event $u(s_v)<1$, so the partner source denominator remains strictly positive and its acceleration remains finite. The receiver factor is $D_r=1+u(T_v)=2$; it does not vanish. There are still no positive-delay self roots at the event, because the earlier chord has speed strictly below one except possibly at its reception endpoint. No partner fold, contact, or inward-to-outward turn precedes this first speed-one event. This conclusion covers every $a>0$, $K>0$, and the entire supplied affine-history family $0\le u_0<1$.

## Exact initial-history phase and two preparations

Before the partner source time becomes positive, solving its affine root equation gives

$$
s=\frac{t-x-a}{1-u_0},\qquad
R=\frac{x+a-u_0t}{1-u_0},\qquad
\dot u=\frac{K}{x+a-u_0t}.
$$

Define $y=x+a-u_0t$ and $z=u+u_0$. Then $\dot y=-z$, $\dot z=K/y$, $y(0)=2a$, and $z(0)=2u_0$. The exact initial-phase parametrization is

$$
y(z)=2a\exp\!\left(\frac{4u_0^2-z^2}{2K}\right),
$$

$$
t(z)=\frac{2a}{K}e^{2u_0^2/K}
\int_{2u_0}^{z}e^{-w^2/(2K)}\,dw,
\qquad x(z)=y(z)-a+u_0t(z).
$$

Its valid interval ends at the first occurrence of speed one, $z=1+u_0$, or the history join $s=0$, equivalently $(1-u_0)t=y$. These relations are an analytical control for a causal integrator; extending the initial-phase formula beyond that join would use the wrong source history.

For the stationary normalized preparation $a=K=1$, $u_0=0$, the hypothetical initial-phase speed-one value has

$$
\left.\frac{t}{y}\right|_{z=1}
=e^{1/2}\int_0^1e^{-w^2/2}\,dw>1.
$$

The strict inequality follows because the integrand exceeds $e^{-1/2}$ except at its upper endpoint. The history join therefore occurs first. The exact initial phase does not by itself locate the stationary preparation's later speed-one time or position; the preceding theorem nevertheless establishes its finite-time, positive-separation event on the genuinely evolving source history.

For an additional exact affine inward example $a=K=1$, $u_0=1/2$, the hypothetical speed-one value instead satisfies

$$
\left.\frac{(1-u_0)t}{y}\right|_{z=3/2}
=\frac12e^{9/8}\int_1^{3/2}e^{-w^2/2}\,dw
\le\frac14e^{5/8}<1.
$$

Here speed one occurs before the history join, so the initial-phase expression gives the exact event:

$$
T_v=2e^{1/2}\int_1^{3/2}e^{-w^2/2}\,dw,
\qquad
x_v=2e^{-5/8}-1+\frac{T_v}{2}.
$$

The general theorem proves this half-separation is positive. Changing the preparation changes which portion of the past produces the first event. Both examples retain $c_f=1$ and require no numerical trajectory integration.

## Conditional self-reception obstruction immediately after the event

The speed-one event itself has a finite ordinary partner contribution. This fact does not imply a finite-velocity outgoing solution of the full root sum. Consider a hypothetical mirror-collinear continuation that is continuous in velocity, stays at positive separation near $T_v$, and obeys the ordinary-root equation wherever its roots are simple. Its local mutual contribution remains inward. A monotone continuation to $u(t)>1$ would additionally have a self root $\tau<T_v<t$ satisfying

$$
\int_\tau^t[u(v)-1]\,dv=0.
$$

For a sufficiently short continuation, the unique crossing of $u=1$ makes this source time unique and ensures $\tau\to T_v$ as $t\downarrow T_v$. Let $\rho=t-\tau$, $w_-=1-u(\tau)>0$, and $w_+=u(t)-1>0$. The same-polarity self contribution points inward, with coefficient $K_s>0$ ($K_s=K$ for the equal-magnitude pair). Differentiating the root equation gives

$$
\frac{d\rho}{dt}=\frac{w_-+w_+}{w_-},\qquad
A_s=\frac{K_s}{\rho w_-},\qquad
A_s\,dt=\frac{K_s}{\rho(w_-+w_+)}\,d\rho.
$$

Velocity continuity gives $w_-+w_+\to0$ as $\rho\to0$. In particular it is bounded above by a finite positive number $M$ in a sufficiently short interval. Integrating the positive self contribution from the birth endpoint therefore gives

$$
\int_{T_v}^{t} A_s(v)\,dv
\ge\frac{K_s}{M}\int_0^{\rho(t)}\frac{d\rho}{\rho}
=\infty.
$$

This contradicts finite continuous velocity on that monotone continuation. The argument is conditional on a proposed continuation and does not alter the independently established incoming motion. A generalized event rule, root suppression, finite-size change, or imposed speed law would be a different formulation. No passage or reflection follows from this incoming event certificate.

## Independence and falsifiers

The independent instrument is the analytical reduction through $R(t)$, the causal root's positive delay, together with its integrated logarithmic bounds. No trajectory code or primary-proof output supplies the result. A positive-delay self root on a history whose individual speed is everywhere below one, a failure of the displayed root derivative, a regular solution violating the delay inequalities, or a finite-velocity monotone ordinary-root continuation contradicting the positive divergent integral would refute the corresponding claim. The affine initial-phase formulas supply a separate exact substitution control for the reduced equation.

The primary proof is to be inspected only after this reference has been frozen. Any subsequent assessment is appended below, with the reference mathematics preserved.

## Assessment of the frozen primary

The independent reference above was frozen at SHA-256 `0ab64a6087f17b346a39116069127783454e4551775d2928726bc6425dfbcd5d` before the [primary incoming proof](causal-collinear-first-event.md) was read. The primary inspected by `cat` and verified with `shasum -a 256` has SHA-256 `dc7624dd74cc5d62096ffc8afa7dd20c6071d21d553258468bffd559631cdb7c`. Two editorial corrections were then made to the reference: the self-root integral's literal comma before its differential was replaced by TeX thin spacing, and its $u_0=1/2$ illustration was identified as an additional exact example. Neither correction changes the mathematical reference. The primary's declared $u_0=1/4$ variation is already covered by the reference's full affine-history theorem.

**Disposition: the primary incoming theorem is accepted at its stated conditional grade.** The partner and self-root census agrees with the independently reconstructed census. The primary proves exclusion of contact by changing the integration variable to source time. Its identity follows directly from multiplying $\dot u$ by $(1+u)/\dot S$, and its positive integral diverges because a hypothetical finite contact has $T(S)-S<T_c-S$. This is distinct from the pre-inspection reference's bounded-delay proof and reaches the same event ordering. The primary's non-strict upper time bound is valid; the reference additionally notes why it is strict for these released histories.

The instantaneous comparison is also valid. The chord identity expresses $2x$ as the integral of $1-u$ across the source-to-receiver interval. Monotonicity bounds that integral above by $R[1-u(S)]$, strictly after release. Multiplication of the resulting acceleration inequality by $2u$ establishes the strict squared-speed inequality, including rest release by integration in time. Since both histories decrease through every intervening positive separation, comparison of the time integrals then places the causal threshold strictly later and at strictly smaller separation. This comparison does not identify either evolving history with a prescribed trajectory.

The primary's affine-phase parametrization is identical to the reference under $z=u+u_0$. Its history-join criterion is correct, and the limiting contact argument within that phase prevents an earlier unclassified contact. Its exact $a=1$, $K=2$, $u_0=0$ example remains before the join: the displayed time is less than one while the displayed delay exceeds one. The strict separation comparison there also follows directly from $2b-1<b^2$ with $b=e^{-1/4}$.

The primary additionally includes a separately normalized inverse-square control, which was not part of the reference frozen above. A post-inspection reconstruction using the reference's delay method confirms its first-event result. With $\dot u=G/[R^2(1-u(S))]$ and the same geometric $\dot R$, integration gives

$$
G\left(\frac1R-\frac1{R_0}\right)
\le u^2-u_0^2
\le2G\left(\frac1R-\frac1{R_0}\right).
$$

Consequently bounded speed again prevents delay collapse, and the same strictly increasing $P$ excludes contact before speed one. With the primary's fixed $G=2aK$, the acceleration lower bound is $K(1-u_0)/(2a)$, giving its stated $T_v\le2a/K$. Its different initial acceleration for an inward preparation is therefore correctly retained; matching at $2a$ does not silently match the larger delayed distance $R_0$ in every preparation. This validates first-event ordering separately for that control and supplies no ordering between its event position and the logarithmic candidate's.

The incoming certificate does not settle the complete continuation question. The self-birth calculation above remains a conditional obstruction to a finite-velocity monotone continuation, while the primary stops at the established incoming event and explicitly leaves outgoing root and endpoint analysis open. No numerical integration, physical-law adoption, or corpus promotion is part of this assessment.
