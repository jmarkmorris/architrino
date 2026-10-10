# Independent adjudication of the first incoming preparation

## Verdict and premises

**Accepted at derived, finite-window normal-constrained evolution grade.** The [subject](spherical-three-three-symmetry-first-incoming-preparation.md) establishes the first incoming nonstationary-preparation boundary and a unique ordinary continuation of length $1/2000$ beyond it. This review independently reconstructs the new bounds and admission argument, taking only the previously accepted [first-turn result](spherical-three-three-symmetry-first-turn.md) and its exact prepared history as premises. Its earlier upper time bound is not taken as a reached endpoint.

The selected equation remains the canonical transmitter-weighted Master Equation with normal-only support, $R=K_{\mathrm{int}}=c_f=1$. Three positive members form a latitude triangle and the three negative members are their antipodes. Their entire past is stationary at $\alpha_0=\pi/6$ through $S=-1/4$ and follows $\alpha_0+\tfrac14S(1+4S)^3$ on $[-1/4,0]$. At release the meridional speed is $1/4$. This externally prepared history is a premise, not an all-time solution of the post-release law. No physical support provider, unconstrained confinement, energy account, later wake-speed crossing or all-time fate follows.

Subject identity before adjudication: SHA256 `aa66e27bc832b15d548f20feaf95bf60f6a65b7babf4d799abb6f00b89be2d0b`. First-turn premise identity: `82e30c3da469c692944115074292b3f5a244d7551e11318d972af1276b225b2e`. The live AGENTS hash matches the fully read startup version, and the Jack K. Hale analytical lens was reread; neither is mathematical acceptance authority.

## Independent scalar and bound reconstruction

Let $z=\alpha-\pi/6$, $\rho_0=\sqrt3/2$, $q=\rho_0\cos\alpha-\sin\alpha$, and $B=\rho_0\sin\alpha+\cos\alpha$. Direct differentiation gives $q'=-B$, $B'=q$, and $B^2+q^2=7/4$. Projection of the five stationary-source contributions onto the latitude tangent gives

$$
f=-B S(q)+\frac{\sin z}{(2+2\cos z)^{3/2}},\qquad
S(q)=(2+q)^{-3/2}+(2-q)^{-3/2}.
$$

The two like-polarity and two non-antipodal opposite-polarity partners each supply signed tangent numerator $-B/2$; the own antipode supplies $\sin z$. Thus the five terms and their signs are retained. Their chord squares are $2+q,2-q,2+2\cos z$ respectively. These source sites are the original stationary sites.

On $0\le\alpha\le\alpha_0+1/8$, $B>0$ and $q>1/16$: above $\alpha_0$, use $q(\alpha_0)=1/4$ and $B\le\sqrt7/2<3/2$ over an interval of length $1/8$; below $\alpha_0$, $q$ increases up to $\rho_0$. Also $S$ increases for $q\ge0$, while $B=\sqrt{7/4-q^2}$ decreases. This proves the interval-wise endpoint strategy in the subject's table.

The four upper bounds for $B$ follow from $B^2\le7/4,27/16,3/2,19/16$, respectively, which are below $(4/3)^2,(13/10)^2,(5/4)^2,(11/10)^2$. The corresponding $S$ bounds can be checked with rational inequalities alone:

- At $q=1/4$, $S=8/27+8/(7\sqrt7)<3/4$ reduces to $864<343\sqrt7$, whose square is $746496<823543$.
- At $q=1/2$, the two terms are below $253/1000$ and $545/1000$. Squaring reduces these to $64000<64009$ and $8000000<8019675$. Their sum $798/1000$ is below $4/5$.
- At $q=3/4$, the bounds $11/50$ and $179/250$ reduce to $160000<161051$ and $4000000<4005125$. Their sum $117/125$ is below $15/16$.
- At $q=\rho_0$, the inequalities $6/7<\rho_0<7/8$ give the term bounds $21/100$ and $21/25$. Their squared checks are $3430000<3528000$ and $320000<321489$; their sum is $21/20$.

Hence the table's products $1,26/25,75/64,231/200$ are valid upper bounds, with maximum $75/64$. On the entire latitude interval, $|z|\le\pi/6$, $|\sin z|\le1/2$, and $d_A^2\ge2+\sqrt3$. The estimate $|\sin z|/d_A^3<1/14$ follows from $(2+\sqrt3)^3=26+15\sqrt3>49$. Therefore

$$
-f<\frac{75}{64}+\frac1{14}=\frac{557}{448}<\frac54.
$$

On the ascent strip $z\ge0$, $BS<1$ and the own-antipode term is nonnegative, giving $-f<1$. With the accepted lower deceleration $-f>7/8$, integration from initial velocity $1/4$ yields $1/4<T_*<2/7$. On the descending lower strip, $\sin z\le0$ and $B>0$, so $f<0$ strictly.

These are independent exact arithmetic checks, not sampled estimates. No computational instrument or target run was required.

## Reached return and reached first history boundary

Construct the reflected solution of the smooth autonomous scalar equation around its zero-velocity event: uniqueness gives $\alpha(T_*+u)=\alpha(T_*-u)$. It returns to $\alpha_0$ with velocity $-1/4$ at $T_R=2T_*\in(1/2,4/7)$. Every point on this proposed return is on the already bounded ascent arc, so its old-site distances exceed $9/8$ and its speed does not exceed $1/4$. Its stationary-emission margin is uniformly

$$
d_j-T-\frac14>\frac98-\frac47-\frac14=\frac{17}{56}>0.
$$

Thus the whole reflected return satisfies the actual canonical delay equation; it is not an extrapolation past its admitted root domain. Global sub-wake history makes these five explicit roots unique and excludes positive-delay self roots. The scalar reversibility argument is valid on this interval without asserting time reversal of the full delayed law.

After the return, construct the old-source equation only until the first domain boundary. For $u=T-T_R$, integrating $-f<5/4$ gives

$$
|\dot\alpha|<\frac14+\frac54u,\qquad
\alpha>\frac\pi6-\frac14u-\frac58u^2.
$$

Put $\overline T=\sqrt7/2-1/4<43/40$. Since $T_R>1/2$, for $T\le\overline T$ one has $u<23/40$. Consequently speed is below $31/32$, and latitude is above $\pi/6-4485/12800>7/50$. For the last inequality, even $\pi>3$ suffices: $1/2-4485/12800=1915/12800>7/50$. These strict bounds prevent exit through zero latitude or wake speed. Chords stay positive and the scalar right-hand side is smooth on this compact strip, so no earlier ordinary ODE breakdown prevents reaching either the history boundary or $\overline T$.

Since $q>0$, $d_O<d_L$. Independently, $d_A^2-d_L^2=\rho_0\cos\alpha+2\sin\alpha>0$. The non-antipodal opposite-polarity pair is therefore the shortest class. Its margin $b=d_O-T-1/4$ has $b'<0$, because $|\dot d_O|\le|\dot\alpha|<1$. It begins positive. If it had not vanished by $\overline T$, the reached descending trajectory would have $\alpha<\alpha_0$, hence $d_O<\sqrt7/2$ and $b(\overline T)<0$, a contradiction. Exactly one first zero is reached, at

$$
\frac34<T_B<\frac{\sqrt7}{2}-\frac14.
$$

The lower bound uses $q\le\rho_0<1$, hence $d_O>1$. It also places the boundary after $T_R$. At this event the two shortest partners tie as distinct persistent sources, each with its own simple root. The like-polarity pair has strictly larger stationary-emission margin:

$$
d_L-d_O=\frac{2q}{d_L+d_O}>\frac1{32},
$$

because $q>1/16$ and $d_L+d_O<4$. The own antipode lies farther away still. There are three remaining partners in two remaining source classes; the subject's late phrase “other three source classes” should be read as “other three partner roots.” This is a nonblocking counting clarification, not a mathematical gap.

## Regular incoming history and complete short continuation

For $S=-1/4+h$, the preparation expands exactly to

$$
\alpha_{\rm prep}-\alpha_0=16h^4-4h^3,\qquad
\dot\alpha_{\rm prep}=64h^3-12h^2.
$$

The first and second derivatives vanish at $h=0$, while the right third derivative is $-24$. Composition with sine and cosine preserves the stated $C^2$ position and $C^1$ velocity regularity across this join. At the join the transmitter is at rest, $D_t=1$, and $D_r=1-\widehat{\mathbf r}\cdot\mathbf V_i>1/32$. Thus each shortest-source root crosses the history boundary transversely, with no transmitter singularity. The canonical acceleration depends on the source position and velocity only and remains at least $C^1$ here. The position change is $O(h^3)$, velocity change $O(h^2)$, and the ordinary-root shift relative to the fictitious stationary source is $O(h^3)$; the resulting acceleration correction is $O((T-T_B)^2)$. None of these order estimates permits deleting that correction.

For the explicit extension take $\Delta=1/2000$. Initially all five delays exceed one, all emissions are at or before $-1/4$, and speed is below $31/32$. Bootstrap speed below one, delays above $1/2$ and emissions below zero. Prepared source speed is at most $1/4$, so $D_t\ge3/4$; meanwhile $0<D_r<2$. Implicit-root differentiation therefore gives

$$
0<S'<\frac83,\qquad S-S(T_B)<\frac1{750},\qquad
\tau'=1-S'>-\frac53.
$$

Hence $S<-1/4+1/750<0$ and $\tau>1-1/1200>1/2$. Only known pre-release source functions enter the full equation. Five roots, inverse-square distances above $1/2$, and transmitter weights at most $4/3$ give $|\mathbf A|<80/3$. The constrained equation $\ddot{\mathbf X}=P\mathbf A-|\mathbf V|^2\mathbf X$ then gives $|\ddot{\mathbf X}|<83/3<28$. The speed increases by less than $7/500$, staying below $31/32+7/500<1$. All bootstrap inequalities close strictly.

At $T_B$, the actual simultaneous separations are: $\sqrt3\cos\alpha_B$ for like partners, $\sqrt{1+3\sin^2\alpha_B}$ for the non-antipodal opposite partners, and $2$ for antipodes. Since $0<\alpha_B<\pi/6$, all are above one. Each member moves less than $\Delta$, so every simultaneous separation remains above $1-2\Delta>0$. This verifies the full-assembly collision margin independently of old-source chord distances.

The known source functions, ordinary implicit roots and positive distances yield a locally Lipschitz time-dependent constrained ODE on the sphere's tangent bundle. The strict bounds keep its solution in a compact regular domain for the full $\Delta$, supplying actual existence and uniqueness. The assembled complete histories are globally sub-wake through each current event, so partner delay residuals are strictly increasing and the five continued roots exhaust the ledger; the path-length estimate excludes every positive-delay self root. The remaining three roots cannot enter the preparation because their initial margin exceeds $1/32>1/750$.

The complete preparation is invariant under the latitude triangle's rotations, inversion with polarity exchange, and meridional reflection. The canonical root law and normal projection are equivariant under these operations. Uniqueness therefore preserves these full-assembly symmetries on the extension. This does not preserve the old autonomous scalar right-hand side: its two incoming source histories are now moving and must be evaluated at their actual emissions. The support estimate $|\lambda|<83/3$ is valid; no stronger support sign is imported from the earlier first-turn interval.

## Scope, falsifiers and completion

The accepted endpoint is $T_B+1/2000$, with $T_B$ defined by the reached first boundary. The upper bracket $\overline T$ is a contradiction horizon used in the reachability proof, not a separately reached stationary-source endpoint. All later emissions, additional method-of-steps intervals and global behavior remain unadjudicated.

Falsifiers are a failed rational table inequality, an error in the five-term projection, a root outside the complete sub-wake census, a premature exit from the proved latitude/velocity domain, or failure of the pre-release source and separation margins on the explicit extension. This review independently checked each named step analytically and found no blocking defect. The sole nonblocking clarification concerns three partner roots versus two source classes.

Only this new dynamics-prefixed review companion was authored. No subject, reference, solver, oracle or prior instrument was edited, and no numerical evolution, target diagnostic, compute lease or running job exists. All evidence is retained in this derivation. Coordinator integration is the next dependency; this completes the assigned bounded adjudication.

Measured preservation: the closing `shasum -a 256` matched the subject and first-turn identities above, and the frozen rotating-hexagon companion retained hash `b0948c700dfeb0872e7f4f0785d37b896d492be9b4fcde47258467566c785640`. Measured hygiene: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics; status 1 denotes the file difference. These checks cover the named files and do not assert global repository cleanliness. No runtime output or regeneration obligation was created.
