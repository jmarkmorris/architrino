# Frozen compatible circle-tail preparation for a sublinear radial law

## Fixed law, parameter and complete history

**Claim grade: derived preparation, without a future-fate claim.** Fix one exponent $0<p<1$ and retain $K=R_*=c_f=1$. The selected ordinary per-root acceleration is the sharp radial law $-N/(R^pD)$ for the opposite-polarity mirror pair $q,-q$. Self and partner root conventions remain those of the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md). No response multiplier, memory, core, cap or collision rule is added.

The complete family is fixed before the new future theorem is recorded. For $0<\epsilon\le1/16$, set

$$
r_0=(2^p\epsilon^2)^{1/(1-p)},\qquad
s=\frac{\epsilon T}{r_0},\qquad q(T)=r_0Y(s).
$$

The identity $\epsilon^2/r_0=(2r_0)^{-p}$ defines a comparison scale. It does not make a circle a solution of the delayed equation. Physical speed is $\epsilon|Y'|$, with primes here denoting $s$ derivatives. The exact scaled future equation is

$$
Y''=-\frac{2^pN}{R_d^pD},\quad
R_d=|Y(s)+Y(\sigma)|,\quad
s-\sigma=\epsilon R_d,\quad
N=\frac{Y(s)+Y(\sigma)}{R_d},\quad
D=1+\epsilon N\cdot Y'(\sigma).
$$

Let $Y_c(s)=(\cos s,\sin s)$, and let $\xi$ be the unique root in $(0,\epsilon)$ of $\xi=\epsilon\cos\xi$. Uniqueness follows from the strictly positive derivative of $\xi-\epsilon\cos\xi$. The old circular source at release is $\sigma=-2\xi$, and its exact acceleration is

$$
A_{c,p}=-\frac{(\cos\xi,-\sin\xi)}
{\cos^p\xi(1+\epsilon\sin\xi)}.
$$

Define $B_p=(1,0)+A_{c,p}$, $d=\epsilon/16$, and supply

$$
Y(s)=
\begin{cases}
Y_c(s),&s\le-d,\\
Y_c(s)+\phi_d(s)B_p,&-d\le s\le0,
\end{cases}
\qquad
\phi_d(s)=\frac{d^2}{2}z^3(1-z)^2,\quad z=1+s/d.
$$

The other member has the exact negative history. This is the same prescribed patch formula as the [earlier fixed-power preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), now selected at the explicitly different exponent range. Its original future theorems are not transferred.

## Compatibility, regularity and complete margins

For $0<p<1$, the radial factor $\cos^{1-p}\xi/(1+\epsilon\sin\xi)$ lies between $(1-\epsilon^2/2)/(1+\epsilon^2)$ and one. Its discrepancy from one is at most $3\epsilon^2/2$. The tangential factor is at most $\epsilon/(1-\epsilon^2/2)<2\epsilon$. Therefore $|B_p|\le4\epsilon$ on the declared preparation range.

The patch polynomial and its first two derivatives vanish at the old seam. At zero its value and first derivative vanish and its second derivative is one. Consequently

$$
Y(0)=(1,0),\qquad Y'(0)=(0,1),\qquad
Y''(0-)=A_{c,p}.
$$

The complete history is locally $C^{2,1}$. The coefficient bounds for $f(z)=z^3(1-z)^2$,

$$
|f|\le1,\qquad |f'|\le16,\qquad |f''|\le50,
$$

give

$$
|Y-Y_c|\le\epsilon^3/128,\qquad
|Y'-Y_c'|\le2\epsilon^2,\qquad
|Y''-Y_c''|\le100\epsilon.
$$

Thus complete scaled speed is below two, acceleration below eight, radius between $3/4$ and $5/4$, and physical speed at most $\epsilon(1+2\epsilon^2)<1$. The complete signed geometric areal rate $Y\times Y'$ differs from one by at most $\epsilon^3/128+2\epsilon^2+\epsilon^5/64<1/100$ and is positive. This is geometric bookkeeping, not a physical conserved quantity.

The source $\sigma=-2\xi=-2\epsilon\cos\xi<-\epsilon<-d$ lies in the unchanged circle tail. A complete speed bound $b<1$ makes the physical partner residual $u-|q(T)+q(T-u)|$ strictly increasing with monotonicity modulus $1-b$, negative at zero, and positive for sufficiently large $u$. It has exactly one positive root. Every positive-delay self root is excluded by the strict speed chord inequality. Thus the unchanged circular release source is the complete partner census after patching. The received release acceleration is exactly $A_{c,p}$, matching the supplied jet.

The circle is not a solution: its tangential received acceleration is positive. In addition, the scaled radial velocity derivative at release is

$$
u'(0)=1-\frac{\cos^{1-p}\xi}{1+\epsilon\sin\xi}>0,
$$

where $u=Y'\cdot Y/|Y|$. This single initial sign is not a future-fate theorem.

## Scope and source identity

The fixed exponent and entire history formula are selected independently of any computed trajectory. The physical past extends to all negative time and remains separated. No numerical instrument, simulation or future target was used to tune the preparation. A subsequent theorem must supply complete-window estimates and ordinary continuation; small release speed alone does not supply them.

Falsifiers are an incorrect normalization, an extra complete root, a release source entering the patch, failure of a polynomial jet or a violated complete speed, radius or positive-rotation bound.

The antecedent preparation identity, measured by shasum -a 256 before this new record, is 5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04. The Master Equation owner identity is 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f. Both sources remain unchanged. This new preparation is to be frozen before the separate future analysis is saved.
