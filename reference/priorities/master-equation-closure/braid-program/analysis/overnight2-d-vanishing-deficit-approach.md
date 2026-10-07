# Finite approach with a decreasing source-history deficit

## Motivation and hypotheses

The [accepted pair-approach theorem](overnight2-d-pair-approach-rate.md) assumes positive constant lower bounds on two complete source-history deficits. That assumption can be stronger than necessary near small present separation. Keeping the same delayed range in the attractive direction and directional-error terms yields a stronger estimate, which also gives a finite horizon when deficit lower bounds decrease with separation. This extension is accepted by the [independent derivation and controls](overnight2-d-vanishing-deficit-independent-review.md) and supplies no original-trajectory entry condition.

Retain the original balance-0 investigation, inclusive unit-speed ceiling, complete source histories and normalized wake speed one. No conclusion from the C1 preparation is used. Let $r(t)>0$ be the present pair separation on an existing ordinary interval. Use the delayed ranges $R_i,R_j$, delayed directions $n_i,n_j$, and complete mean deficits $\eta_i,\eta_j$ defined in the earlier theorem. Both receivers satisfy

$$
|V_i+n_i|\le kR_i,\qquad |V_j+n_j|\le kR_j,
$$

with one constant $k\ge0$. All source velocities on both full delay intervals have norm at most one. The directional premises may be supplied by the earlier ceiling-direction theorem only when its entry, external-acceleration and ordinary-continuation conditions actually hold.

Choose a fixed length $\ell>0$ and define the dimensionless separation $\rho=r/\ell$. Suppose, throughout the proposed interval,

$$
\eta_i(t),\eta_j(t)\ge a\rho(t)^p,
\qquad a>0,\qquad 0\le p\le1.
$$

Here $a$ is a dimensionless constant, distinct from the switching time used in other comparison notes. This is information about each complete delayed source interval, not a transmitter factor at its endpoint. Choose an initial upper radius $\bar\rho\ge\rho(t_0)>0$. For a nonempty stated domain one may require $a\bar\rho^p\le2$, since a unit-speed mean deficit never exceeds two. At $p=0$, the convention is $\rho^0=1$.

## Pointwise separation estimate

At every reception with $r>0$, the earlier geometric identities imply

$$
u\cdot n_i=\frac{R_i\eta_i}{r},\qquad
-u\cdot n_j=\frac{R_j\eta_j}{r},\qquad
R_i\ge\frac r{\sqrt{2\eta_i}},\qquad R_j\ge\frac r{\sqrt{2\eta_j}},
$$

where $u$ is the unit present-separation direction. The equalities come from the complete source-path identity, and the range lower bounds come from $r^2\le2R_i^2\eta_i$ and its reverse-channel counterpart. Write the velocity errors relative to the two delayed inward directions as $e_i=V_i+n_i$ and $e_j=V_j+n_j$. Consequently, almost everywhere,

$$
\dot r=-u\cdot n_i+u\cdot n_j+u\cdot(e_i-e_j)
\le-R_i\left(\frac{\eta_i}{r}-k\right)-R_j\left(\frac{\eta_j}{r}-k\right).
$$

When both deficits exceed $kr$, the two parentheses are positive. Their negative signs make the range lower bounds the useful direction:

$$
\dot r\le-\frac{\eta_i-kr}{\sqrt{2\eta_i}}-\frac{\eta_j-kr}{\sqrt{2\eta_j}}.
$$

For fixed $kr\ge0$, the function $(\eta-kr)/\sqrt{2\eta}$ is strictly increasing on $\eta>0$. Substituting the common deficit lower bound, while requiring $a\rho^p>k\ell\rho$, gives

$$
\dot r\le-\sqrt{2a}\,\rho^{p/2}
\left(1-\frac{k\ell}{a}\rho^{1-p}\right).
$$

This keeps the common range until after the two competing contributions have been combined. Bounding their ranges independently would lose this improvement. Define

$$
\nu=\sqrt{2a}\left(1-\frac{k\ell}{a}\bar\rho^{1-p}\right).
$$

If $\nu>0$, then for $0<\rho\le\bar\rho$ the exponent $1-p$ is nonnegative, both deficits exceed $kr$, and the coefficient multiplying $-\rho^{p/2}$ is at least $\nu$. A scalar barrier argument preserves the upper radius while all premises hold. For $k>0$ and $p<1$, the strict margin also remains positive in a neighborhood above $\bar\rho$, which excludes a first upward crossing even for an absolutely continuous separation. At $p=1$ the coefficient is constant; at $k=0$ it is positive everywhere. Thus

$$
\dot\rho\le-\frac\nu\ell\rho^{p/2}
$$

almost everywhere before the first loss of the hypotheses.

## Finite horizon

On any compact subinterval on which $\rho>0$, the chain rule for an absolutely continuous positive function gives

$$
\frac{d}{dt}\rho^{1-p/2}
=\left(1-\frac p2\right)\rho^{-p/2}\dot\rho
\le-\left(1-\frac p2\right)\frac\nu\ell.
$$

Hence

$$
\rho(t)^{1-p/2}
\le\rho(t_0)^{1-p/2}
-\left(1-\frac p2\right)\frac\nu\ell(t-t_0).
$$

No ordinary positive-separation continuation satisfying every stated premise can extend past

$$
t_0+\frac{\ell\,\rho(t_0)^{1-p/2}}{(1-p/2)\nu}.
$$

This is a finite upper duration even when $p>0$ and the prescribed deficit lower bound tends to zero. It retains the earlier theorem's boundary: by that horizon there is contact or a failure of ordinary continuation or a named premise. If the limiting endpoint is not part of the continuation, the theorem does not declare an attained contact. No continuation law beyond a singular event is supplied.

For $p=0$, this gives the stronger sufficient condition $k\ell\bar\rho<a$, with rate $\sqrt{2a}(1-k\ell\bar\rho/a)$. The earlier separate estimates required $k\ell\bar\rho<a^{3/2}/\sqrt2$; since $a\le2$, the new condition is at least as permissive. The original theorem remains valid. For $p=1$, both contributions to $\dot r$ have the same power $\rho^{1/2}$, and the condition is independent of the upper radius:

$$
\nu=\sqrt{2a}\left(1-\frac{k\ell}{a}\right)>0
\quad\Longleftrightarrow\quad a>k\ell.
$$

The upper duration is then $2\ell\sqrt{\rho(t_0)}/\nu$. For $k>0$ and $p>1$, the supplied power lower bound alone eventually fails to imply $\eta_i,\eta_j>kr$ near zero, so this sufficient estimate cannot establish a uniform inward sign all the way to zero from those bounds alone. This is a limitation of the estimate, not an exclusion of contact or of stronger actual deficits. When $k=0$, the positive directional-error allowance vanishes; the restriction $p\le1$ is unnecessary for the rate calculation, and any $p<2$ yields a finite bound by the same integration, subject to all other premises.

## Exact control and remaining original-entry gap

Take $\ell=1$, $k=1$, $a=2$, $p=1$ and initial upper separation $\bar\rho=1/4$. Then the deficit lower bound at the upper radius is $1/2$, the coefficient is $\nu=1$, and the upper duration from $\rho(t_0)=1/4$ is one. The scalar equality curve

$$
\rho(t)=\left(\frac12-\frac12(t-t_0)\right)^2
$$

satisfies $\dot\rho=-\sqrt\rho$ while positive and reaches zero at that duration. It is a scalar control for the comparison, not a two-member or eight-member master-equation trajectory. Choosing radii $\rho=x^2$ with rational $x$ makes the critical-power rate and duration checks exact rational arithmetic.

The original preparations have not supplied an actual capped entry, a complete external-six bound, or either the constant or power-law complete-source-deficit premise. This result relaxes the form of one missing hypothesis; it does not discharge it. It changes no executed scientific instrument, active calculation or accepted trajectory receipt.

A complete unit-speed source history violating the inherited geometric inequalities, an admissible exact pair violating the displayed separation rate, or a longer positive-separation continuation with every premise intact would falsify the corresponding claim. Independent checking passed the strict upper-radius barrier, the absolute-continuity argument and the stated event/continuation boundary. The reviewed subject is preserved locally as `vanishing-deficit-before-status.md`, SHA-256 `19d6b30894064e5ae50ff3d53b5816bbb9079104e4916f5802112dee221c7ecb`. The same review separately verifies a floating retained-snapshot screen; that screen's nonunit source speeds prevent its use as an application of the theorem.
