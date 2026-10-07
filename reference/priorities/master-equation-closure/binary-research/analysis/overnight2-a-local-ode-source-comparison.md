# A local comparison can gain two orders without differentiating a remainder

**Status: derived method candidate, awaiting independent assessment and evaluated target constants.** The [formal cubic calculation](overnight2-a-canonical-cubic-row.md) needs a uniform actual-history remainder. Direct differentiation of the previous error estimate would be unjustified. A short backward comparison with an analytic ordinary differential equation offers another route: an acceleration discrepancy is integrated twice before it changes the source position, and the source-velocity discrepancy carries one additional wake-speed factor. This gains two powers of the small delay parameter in the evaluated acceleration response.

The comparison equation is an auxiliary mathematical instrument over one causal window. It is not a new physical law, supplied past, or forward production solver. The actual canonical equation, source-fixed coupling, complete histories, two-clock treatment and $c_f=1$ remain unchanged. This note first states a conditional quantitative lemma with declared tube constants. It does not assert that all its constants have been evaluated for the original nominal member or that its desired phase estimate follows.

## Rescaled source window and declared hypotheses

Fix an actual receiving time with scaled member radius $r>0$, angular magnitude $h>0$ and $\alpha=\epsilon/h$. Use fixed receiving axes and scaled backward time $\tau=(a-s)/(rh)$, so

$$
y(\tau)=Y(s+rh\tau)/r,\qquad w=y'=hY',
\qquad y(0)=n,\quad |n|=1.
$$

Let $\ell>0$ be a fixed window width with $\ell\le c\alpha$. Both the actual path and comparison path are retained throughout $[-\ell,0]$. Suppose their speeds in these coordinates are at most $V_*$, and put $m=1-\alpha V_*>0$. Suppose the common comparison tube has chord ranges at least $a_*>0$, transmitter factors at least $m$, and stays in an open region where the following maps and segments are defined.

The actual rescaled acceleration is written

$$
y''=F(y,w)+e(\tau),\qquad |e(\tau)|\le E_*.
\tag{1}
$$

Here $F$ is an analytic comparison field with Lipschitz bounds $L_y,L_w$ on the whole joining tube. A merely bounded measurable $e$ is allowed. Let $z$ solve $z''=F(z,z')$ backward on the same interval with the same present position and velocity. Assume its acceleration satisfies $|z''|\le A_*$. Existence and retention in the tube must be separately justified; this lemma does not assume the physical path equals that comparison.

For the canonical slow reference, one proposed choice is

$$
F(y,w)=\frac{Q}{|y|^2}\left[-\frac y{|y|}
+\alpha\left(w-2\left(\frac y{|y|}\cdot w\right)\frac y{|y|}\right)\right],
\qquad Q=h^2/r.
\tag{2}
$$

This is the already accepted first-order row expressed in fixed rescaled coordinates. In the slow provisional region $0<Q\le4$ and the source-window width is of order $\alpha$. The actual first-order discrepancy is of order $\alpha^2$ in (1). Those order statements motivate the lemma; they are not substitutes for evaluated inequalities on a target.

## Backward position and velocity comparison

Let $P=\sup|y-z|$ and $V=\sup|y'-z'|$ over the full interval. The shared terminal position/velocity and the twice-integrated equations give

$$
P\le\frac{\ell^2}{2}(E_*+L_yP+L_wV),\qquad
V\le\ell(E_*+L_yP+L_wV).
$$

If

$$
\vartheta=\frac{L_y\ell^2}{2}+L_w\ell<1,
$$

then substitution, or the supremum of the common right-side bound, yields

$$
P\le\frac{E_*\ell^2}{2(1-\vartheta)},\qquad
V\le\frac{E_*\ell}{1-\vartheta}.
\tag{3}
$$

One way to justify this without presuming finiteness of a circular bound is to apply it on each shorter interval, where the continuous difference has a finite supremum, and use the strict denominator to continue the bound to the entire already existing common tube. No derivative of $e$ is taken. The direct control $F=0$ and constant $e$ attains the position and velocity factors $\ell^2/2$ and $\ell$, checking their signs and powers before use.

## Moving source clocks

Write the positive rescaled delay as $d_y\in(0,\ell)$ for the actual path and $d_z$ for the comparison. The root equations are

$$
d_y=\alpha|n+y(-d_y)|,\qquad
 d_z=\alpha|n+z(-d_z)|.
\tag{4}
$$

Assume both roots are covered by the declared windows. Their scalar root derivatives are at least $m$. Subtracting the gaps at one common delay gives

$$
|d_y-d_z|\le\frac{\alpha P}{m}.
\tag{5}
$$

It follows that the sampled chords $S_y=n+y(-d_y)$ and $S_z=n+z(-d_z)$ and sampled rescaled velocities obey

$$
|S_y-S_z|\le P+V_*\frac{\alpha P}{m}=\frac Pm,
$$
$$
|y'(-d_y)-z'(-d_z)|\le V+A_*\frac{\alpha P}{m}.
\tag{6}
$$

The derivative bound for the second step is on the comparison acceleration, so a derivative of the actual bounded forcing remains unnecessary. Formula (5) retains the displaced clock; comparing only histories at a fixed sampled time would miss this contribution.

The dimensionless canonical mirror response is

$$
\mathcal R(S,w)=-\frac{4S}{|S|^3[1+\alpha\widehat S\cdot w]}.
$$

On the whole joining response tube, bounds for its derivatives with respect to $S$ and the physical scaled velocity $v=\alpha w$ are

$$
L_S=4\left(\frac2{a_*^3m}+\frac{\alpha V_*}{a_*^3m^2}\right),
\qquad L_V=\frac4{a_*^2m^2}.
\tag{7}
$$

They follow by differentiating $S/|S|^3$ and the transmitter factor. The joining-tube requirement is essential: endpoint chord floors alone do not guarantee that the segment between two chords avoids zero. Equations (3) and (6) give

$$
|\mathcal R_y-\mathcal R_z|
\le\frac{L_SP}{m}+L_V\alpha
\left(V+\frac{A_*\alpha P}{m}\right)
$$
$$
\le\frac{E_*}{1-\vartheta}
\left[\frac{L_S\ell^2}{2m}+L_V\alpha\ell
+\frac{L_VA_*\alpha^2\ell^2}{2m}\right].
\tag{8}
$$

For $\ell\le c\alpha$, bounded tube constants and $E_*=O(\alpha^j)$, the response discrepancy is therefore $O(\alpha^{j+2})$. This is a quantitative source-functional comparison, not an assertion about long-time closeness of the physical and auxiliary motions.

## What this would supply, and what it does not yet supply

Taking (2) and a proved $E_*=O(\alpha^2)$ makes (8) fourth order. An explicit Taylor enclosure of the analytic comparison solution would then justify the cubic source row without differentiating an old error. Taking an already justified second-order comparison row and its cubic error would similarly yield a fifth-order source discrepancy, provided the complete source generation and short comparison tube are verified. Such a succession is a proposed method, not a sequence already completed here.

The lemma is isotropic. The slow angular argument also needs a transverse estimate retaining the factor $q$, as the [cubic-row subject](overnight2-a-canonical-cubic-row.md) explains. Reflection invariance of (2) and componentwise actual error bounds suggest a corresponding component comparison, but it is not proved by (8) alone. An isotropic fourth-order bound cannot simply be divided by a possibly small transverse velocity.

For the original nominal/spatial pair, the accepted centered-history decomposition supplies an additional bounded forcing that accounts for the two independently moving original clocks. Such a forcing must remain an explicit extra error; it cannot silently acquire the mirror row's transverse factor. The local comparison might handle it without differentiating it, but the resulting accumulated seed and phase error still needs its own proof. This is the precise next use to investigate, not a current transfer claim.

The physical release layer and every nested source level must retain their original regularity. A comparison path is discarded after evaluating this one receiving response; it is never spliced into the complete physical history. Root existence, all-root completeness and past identity continue to use the actual admitted history, with the comparison root used solely as a local analytical reference.

Falsifiers are a reversed backward integral, an omitted clock displacement, use of a response segment outside the stated tube, a missing velocity scaling factor in (8), or a claimed transverse factor not supported by a component estimate. The lemma has an exact constant-acceleration comparison control and the affine source clock control; no new numerical instrument or target is used. It is frozen for separate assessment before target use. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration; no previous source, comparison equation or physical preparation is edited.
