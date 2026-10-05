# Exact Cartesian tails for the fixed unit-memory scattering class

## Derived result and complete retained premises

**Grade: derived candidate, pending independent assessment.** On every outgoing neighborhood admitted by the [complete-history memory scattering assessment](alternatives-screen-2026-10-05-memory-scattering-robustness-adjudication.md), the actual acceleration has a nonzero exact $T^{-2}$ coefficient. It is two-thirds of the terminal delayed canonical coefficient, proved from the full triangular acceleration convolution. Each individual path has a logarithmic correction to its terminal straight motion and no finite ordinary affine offset. A stronger convolution estimate proves a finite logarithm-renormalized offset, continuous in the admitted compatible-history topology. The relative separation direction has finite total spherical variation.

Use the unchanged opposite-polarity two-label equation with $K=c_f=\lambda=\tau=1$:

$$
A_i(T)+\int_0^1(1-\theta)A_i(T-\theta)\,d\theta=F_i(T),
\qquad
F_i=-\frac{n_i}{R_i^2D_i},
\tag{1}
$$

$$
R_i=T-s_i=|X_i(T)-X_j(s_i)|,\quad
n_i=\frac{X_i(T)-X_j(s_i)}{R_i},\quad
D_i=1-n_i\cdot V_j(s_i),\qquad j=3-i.
$$

This is the exact original velocity-memory equation, since the memory is also $-V_i(T)+X_i(T)-X_i(T-1)$. Its acceleration form introduces no independent datum. Set $k(\theta)=1-\theta$ on $[0,1]$, so $\|k\|_1=1/2$.

The admitted class has complete separated locally $C^{2,1}$ compatible supplied histories, a strict complete-past speed ceiling, and a finite entry satisfying the strict impulse criterion of the [frozen scattering proof](alternatives-screen-2026-10-05-memory-scattering-robustness-independent.md). Its established actual future obeys, for some fixed $b<1$, $\sigma>0$ and $d_0>0$,

$$
|V_i|\le b,\qquad
|X_1-X_2|\ge d_0+\sigma T,\qquad
A_i=O(T^{-2}),\qquad
V_i=U_i+O(T^{-1}),\qquad
X_i=U_iT+O(\log T),
\tag{2}
$$

after shifting entry to zero and taking $T\ge2$ for logarithms. Here $W=U_1-U_2\ne0$, and $|U_i|<1$. Individual $U_i$ may vanish for a general criterion-satisfying history; both are nonzero in the neighborhoods of the admitted positive-speed mirror members.

The complete-root proof underlying (2) retains every old field source: one simple partner root and no positive-delay self roots follow from the complete subfield chord bound. In particular,

$$
\frac{d(T)}{1+b}\le R_i(T)\le\frac{d(T)}{1-b},
\quad D_i\ge1-b,\quad
\frac{1-b}{1+b}\le s_i'(T)
=\frac{1-n_i\cdot V_i(T)}{1-n_i\cdot V_j(s_i)}
\le\frac{1+b}{1-b}.
\tag{3}
$$

The supplied unit acceleration transient is part of (1) and of the admitted proof of (2). It is not set to zero here. On a smaller outgoing neighborhood all constants in (2), the margins in (3), and the finite retained acceleration bounds can be chosen locally uniformly. Finite-prefix continuity and terminal-velocity continuity hold for compact-old $C^2$ convergence inside the fixed complete-past speed class and exact compatibility constraint. This topology does not require uniform old circular phase agreement.

## Terminal delay geometry reconstructed from the actual Cartesian limits

Put $W_i=U_i-U_j$. The source clock in (3) gives $s_i(T)\to\infty$ and $\liminf s_i(T)/T>0$. The range bounds make $R_i/T$ bounded above and away from zero. Every subsequential limit $\rho$ must therefore satisfy

$$
\rho=|W_i+\rho U_j|.
$$

The residual is strictly increasing with modulus at least $1-|U_j|$, negative at zero and positive at one because $|W_i+U_j|=|U_i|<1$. Its unique positive root is

$$
\rho_i=
\frac{W_i\cdot U_j+
\sqrt{(W_i\cdot U_j)^2+(1-|U_j|^2)|W_i|^2}}
{1-|U_j|^2}\in(0,1).
\tag{4}
$$

Thus $R_i/T\to\rho_i$ and $s_i/T\to1-\rho_i$. Define

$$
n_i^*=\frac{W_i+\rho_iU_j}{\rho_i},\qquad
D_i^*=1-n_i^*\cdot U_j>0,\qquad
f_i=-\frac{n_i^*}{\rho_i^2D_i^*}\ne0.
\tag{5}
$$

Taking limits in the complete canonical input gives $T^2F_i(T)\to f_i$. This is a kinematic consequence of the admitted actual velocities and root equation, not a transfer of radial dynamics or a local-memory approximation.

There is already a sharper input estimate from (2). At the trial source $(1-\rho_i)T$, the root residual differs from its limiting linear-path value by $O(\log T)$. Its uniform monotonicity in (3) therefore gives

$$
R_i(T)=\rho_iT+O(\log T),\qquad
s_i(T)=(1-\rho_i)T+O(\log T).
$$

Both trial and actual source times are comparable to $T$. Consequently

$$
n_i(T)=n_i^*+O(\log T/T),\qquad
V_j(s_i(T))=U_j+O(T^{-1}),
$$

$$
D_i(T)=D_i^*+O(\log T/T),\qquad
F_i(T)=\frac{f_i}{T^2}+O(\log T/T^3).
\tag{6}
$$

Every constant can be chosen locally uniformly: the terminal velocities are continuous, $W$ stays away from zero, $|U_i|$ stays below a common ceiling, and the continuous roots $\rho_i$ and $1-\rho_i$ stay bounded away from zero. The old field history is traversed before these late estimates become applicable; it remains encoded in the actual $U_i$ and finite-prefix constants.

## Exact triangular response coefficient, including the retained transient

No local response is inserted into (1). For $N=\lfloor T/2\rfloor$ and sufficiently large $T$, finite iteration of that exact equation gives

$$
A_i(T)=\sum_{j=0}^{N-1}(-1)^j(k^{*j}*F_i)(T)
+(-1)^N(k^{*N}*A_i)(T).
\tag{7}
$$

The zeroth convolution is the identity. The $j$th kernel has support $[0,j]$ and mass $2^{-j}$. Every sampled time in (7) is at least $T-N\ge T/2>0$, so each substituted acceleration equation is valid on the generated future. The last term retains all dependence not expanded, including the old memory transient propagated into that future; it has not been deleted.

By (2), after multiplying (7) by $T^2$ the last term is bounded by $C2^{-N}$. The same bound $C2^{-j}$ dominates every scaled forcing term, since its source times are at least $T/2$ and $F_i=O(T^{-2})$. For each fixed $j$, the kernel support is fixed and the canonical limit gives

$$
T^2(k^{*j}*F_i)(T)\longrightarrow2^{-j}f_i.
$$

To pass to the sum, first keep finitely many $j$, then bound the remaining terms by the geometric tail, uniformly in $T$, and finally let the finite cutoff increase. This proves

$$
T^2A_i(T)\longrightarrow
\sum_{j=0}^{\infty}(-1)^j2^{-j}f_i
=\frac23 f_i.
\tag{8}
$$

Write $a_i=2f_i/3$. The response coefficient is thus a theorem about the exact finite-memory equation on this late input, not a replacement equation. In particular $a_i\ne0$. Equation (7) explicitly bounds the unexpanded memory contribution while keeping the actual acceleration. The supplied transient can affect the terminal velocities, but it supplies no additional leading coefficient beyond their contribution to $f_i$.

## A weighted remainder and a finite renormalized offset

The stronger remainder can now be proved without differentiating the delayed input. For positive $T$ define $E_i(T)=A_i(T)-a_iT^{-2}$. On a sufficiently late unit window it obeys the exact equation

$$
E_i+k*E_i=G_i,\qquad
G_i(T)=F_i(T)-\frac{a_i}{T^2}
-\int_0^1(1-\theta)\frac{a_i}{(T-\theta)^2}\,d\theta.
\tag{9}
$$

Since $(1+\|k\|_1)a_i=f_i$ and $(T-\theta)^{-2}=T^{-2}+O(T^{-3})$ uniformly for $0\le\theta\le1$, (6) gives

$$
G_i(T)=O(\log T/T^3).
$$

Choose $T_1\ge8$ late enough for this estimate and put $w(T)=T^3/\log T$ on $[T_1-1,\infty)$. Across a unit window,

$$
\frac{w(T)}{w(T-\theta)}
=\left(\frac{T}{T-\theta}\right)^3
\frac{\log(T-\theta)}{\log T}
\le\left(\frac87\right)^3.
$$

The weighted absolute convolution norm is at most

$$
q=\frac12\left(\frac87\right)^3
=\frac{256}{343}<1.
$$

The weighted supplied value of $E_i$ on $[T_1-1,T_1]$ is finite and is retained. On any finite later interval the running-supremum inequality from (9) gives

$$
\sup w|E_i|
\le\max\left\{
\sup_{[T_1-1,T_1]}w|E_i|,\,
\frac{\sup_{[T_1,\infty)}w|G_i|}{1-q}
\right\}.
$$

Therefore the actual acceleration satisfies

$$
A_i(T)=\frac{a_i}{T^2}
+O(\log T/T^3).
\tag{10}
$$

The finite initial weighted value carries the retained transient; no assertion that it vanished at $T_1$ is needed. This contraction uses the unchanged kernel and its full unit window.

Integrating from $T$ to infinity, using the established terminal velocity, yields

$$
V_i(T)=U_i-\frac{a_i}{T}
+O(\log T/T^2).
\tag{11}
$$

The derivative of $X_i-U_iT+a_i\log T$ is the integrable remainder in (11). Hence the finite vector

$$
b_i=\lim_{T\to\infty}
\left[X_i(T)-U_iT+a_i\log T\right]
\tag{12}
$$

exists, and

$$
X_i(T)=U_iT-a_i\log T+b_i
+O(\log T/T).
\tag{13}
$$

The logarithm uses the selected physical unit time; a different fixed logarithmic reference scale only shifts $b_i$ by a constant multiple of $a_i$. Because $a_i\ne0$, $|X_i(T)-U_iT|$ diverges. Every individual ordinary affine offset is excluded, including for a criterion-satisfying history with $U_i=0$. This does not require noncancellation of $a_1-a_2$, so no analogous nonexistence assertion is made for an ordinary relative offset when its logarithmic coefficient cancels.

The renormalized offsets are continuous in a smaller admitted compatible-history neighborhood. The constants in (6), (9) and (10) are locally uniform, and $a_i$ is continuous through the terminal velocities and (4)–(5). At any fixed late $T_0$,

$$
b_i=X_i(T_0)-U_iT_0+a_i\log T_0
+\int_{T_0}^{\infty}
\left[V_i(T)-U_i+\frac{a_i}{T}\right]\,dT.
\tag{14}
$$

Finite-prefix continuity makes every finite part continuous, while (11) bounds the remaining integral uniformly by $C\log T_0/T_0$. Taking the finite cutoff large and then varying the history proves continuity. No convergence of all old accelerations on an unbounded interval is assumed; compact-old $C^2$ continuity and the fixed complete-past speed ceiling are the declared premises.

## Relative direction and finite spherical variation

Let $D=X_1-X_2$, $W=U_1-U_2\ne0$, $a=a_1-a_2$, $b_*=b_1-b_2$, and $P_W=I-\widehat W\widehat W^{\mathsf T}$. Equations (11)–(13) give

$$
D=WT-a\log T+b_*+O(\log T/T),\qquad
D'=W-a/T+O(\log T/T^2).
$$

Vector normalization then gives the position-direction expansion

$$
\frac{D}{|D|}
=\widehat W
-\frac{P_Wa}{|W|}\frac{\log T}{T}
+\frac{P_Wb_*}{|W|T}
+O((\log T)^2/T^2).
\tag{15}
$$

This expansion does not itself license finite total angular variation. For that conclusion differentiate the actual geometric cross product:

$$
\frac{d}{dT}(D\times D')
=D\times(A_1-A_2).
$$

Since $D=O(T)$ and $A_i=O(T^{-2})$, its right side is $O(T^{-1})$, so $D\times D'=O(\log T)$. The outgoing separation floor gives

$$
\left|\frac{d}{dT}\frac{D}{|D|}\right|
=\frac{|D\times D'|}{|D|^2}
=O(\log T/T^2).
\tag{16}
$$

This is integrable on the late tail. The earlier finite interval has finite spherical variation because the pair is separated and the actual solution is regular. Thus the full future relative separation direction has finite total spherical variation in every outgoing neighborhood. No torque identity from the memory-free equation is imported: the derivative uses the actual $A_i$ from (1), including the memory.

For each nonzero $U_i$, the analogous individual position-direction expansion follows from (15) with $W,a,b_*$ replaced by $U_i,a_i,b_i$, and its late total variation is finite by the same cross-product argument. An individual position may cross a chosen spatial origin on the finite prefix, so full individual angular variation requires a separate nonvanishing-position condition. The relative direction has no such qualification because the pair gap never vanishes. Relative and nonzero individual velocity directions have finite late variation as well, since their projected acceleration divided by speed is $O(T^{-2})$.

All terminal velocity and coefficient maps, the renormalized offsets and the limiting directions are continuous on the indicated smaller neighborhood. The theorem does not assert that total accumulated angular variation is itself a continuous functional.

## Scope, falsifiers and independent validation

The result applies to the admitted complete-history outgoing class, including its nonmirror and noncoplanar compatible neighborhoods and the neighborhoods of every admitted positive-speed member of the original fixed memory family. It changes no preparation, coupling, root convention or memory kernel. It gives no result about the zero-terminal-speed branch, an arbitrary incoming history, a unit-speed event, binding or a common conserved center.

The kinematic coefficient fails if the exact source clock does not advance, if the complete-root terminal equation has another positive root, or if the claimed terminal velocity margins fail. The memory response fails if finite iteration (7) omits a source interval or if the scaled unexpanded term cannot be bounded by its geometric mass and the admitted $T^{-2}$ acceleration bound. The stronger remainder fails if (6) lacks its complete delayed-source control or if the weighted kernel norm in (9) is not strictly below one. Offset continuity depends separately on locally uniform remainder constants in the declared topology. Finite total angular variation is refuted by failure of the exact projected derivative or the integrable bound (16).

An independent analytical check should reconstruct the terminal root quadratic, the finite-convolution geometric limit, the weighted remainder equation, the two successive integrations and the projected acceleration estimate. This separates the kinematic root calculation from the dynamic memory response and the offset claim. No local $2/3$ law is used as a premise. No numerical instrument, Python process or fitted trajectory supports the result.

Source identities measured with shasum -a 256 before authoring:

| Source | SHA-256 |
| --- | --- |
| [Complete-history scattering subject](alternatives-screen-2026-10-05-memory-scattering-robustness-independent.md) | d20ade9ec8aedfa6e44813793d480b5bee7944463b0aa631c88f474f955d5721 |
| [Admitted scattering assessment](alternatives-screen-2026-10-05-memory-scattering-robustness-adjudication.md) | 37093816dd0826b40e5301538c68502974496fbb8dc82f12de974494bd77691f |
| [Original complete preparation and memory equation](alternatives-screen-2026-10-05-memory-formulation.md) | e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a |
| [Canonical root owner](../../../../../content/markdown/aaa/dynamics/master-equation.md) | 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f |

Only this new tail source is authored. All antecedents and shared owners remain unchanged. No forthcoming coordinator tail reference was read. Scoped whitespace and final hashes are checked after creation; independent mathematical admission remains separate.
