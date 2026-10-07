# Independent assessment of canonical terminal asymptotics

**Derived acceptance.** Accept the [terminal-asymptotics subject](overnight2-a-canonical-terminal-asymptotics.md) for the exact nominal canonical pair and its original admitted spatial history ball. The already established distinct terminal velocities determine the two limiting causal clocks and the full nonmirror inverse-square acceleration coefficients. The actual positions have the stated logarithmic corrections with constant offsets and controlled decaying remainders. The radial separation speed eventually decreases toward its positive limit from above. The conditional angular-vector alternatives, including the absence of a universal limiting-normal conclusion, are correct.

This is an after-disclosure independent mathematical reconstruction using the Hale and Moore lenses. No terminal vector is numerically evaluated, no larger preparation or history class is selected, and no physical conservation premise is used. The [nominal fate](overnight2-a-reference-nominal-phase-fate.md), [spatial fate](overnight2-a-reference-spatial-phase-transport.md), [quantitative terminal-speed](overnight2-a-reference-quantitative-terminal-speed.md) and [outward continuation](authorized-cases-outgoing-d-reference-assessment.md) assessments are inherited, not re-proved or modified.

All numerical normalization remains $c_f=R_0=1$. The terminal limits obey $V_i(T)\to v_i$, $v_+-v_-=\delta N$, $|N|=1$, $\delta>10^{-21}$ and $|v_i|\le\beta=1/20$. The non-strict terminal ceiling is sufficient; strict generated speeds need not have a strict limit at the same ceiling. Every asymptotic constant below may depend on the actual member and its terminal vectors.

## Source admission precedes the small-speed estimate

The complete histories already supply one ordinary partner root and no positive-delay self root. The actual canonical acceleration is

$$
A_i(T)=-\frac{K n_i(T)}{R_i(T)^2D_i(T)},\qquad
R_i=T-\tau_i=|X_i(T)-X_j(\tau_i)|,\qquad
D_i=1-n_i\cdot V_j(\tau_i).
\tag{1}
$$

For the source residual $f_T(s)=T-s-|X_i(T)-X_j(s)|$, complete strict speed makes it strictly decreasing in $s$. The generated velocity bound gives $|X_i(T)|\le C+\beta T$, so

$$
f_T(0)\ge(1-\beta)T-C>0
$$

at late receptions. Since the admitted root satisfies $f_T(\tau_i)=0$, it must have $\tau_i>0$. This is the first point at which the generated ceiling may be applied to the delayed source. The remote supplied past keeps its own strict bound throughout this reasoning.

Using the generated position estimates at both endpoints of the actual chord,

$$
T-\tau_i\le C+\beta T+\beta\tau_i,
\qquad
\tau_i\ge\frac{(1-\beta)T-C}{1+\beta}.
\tag{2}
$$

In particular the source escapes proportionally to $T$. Also

$$
d(T)=|X_i(T)-X_j(T)|
\le R_i+|X_j(T)-X_j(\tau_i)|
\le(1+\beta)R_i.
$$

Thus $R_i\ge d/(1+\beta)$ and $D_i\ge1-\beta$. The inherited $d(T)/T\to\delta>0$ now gives the actual acceleration bound

$$
|A_i(T)|\le
\frac{4K(1+\beta)^2}{(1-\beta)\delta^2T^2}
\tag{3}
$$

on a sufficiently late member-dependent tail. Integrating toward the known terminal velocity gives $V_i-v_i=O(T^{-1})$, then integrating from a fixed late time gives

$$
X_i(T)=v_iT+O(\log T).
\tag{4}
$$

This order matters: a velocity limit alone would not justify differentiating its error to obtain (3). Here the exact delayed acceleration and positive linear separation produce the bound first.

## Limiting roots and controlled root displacement

Define $F_i(\lambda)=1-\lambda-|v_i-\lambda v_j|$. For $\lambda_2>\lambda_1$, the triangle inequality gives

$$
F_i(\lambda_2)-F_i(\lambda_1)
\le-(1-|v_j|)(\lambda_2-\lambda_1).
$$

Since $F_i(0)=1-|v_i|>0$ and $F_i(1)=-\delta<0$, there is exactly one root $\lambda_i\in(0,1)$. Put

$$
\ell_i=1-\lambda_i,\qquad
n_i^\infty=\frac{v_i-\lambda_i v_j}{\ell_i},\qquad
D_i^\infty=1-n_i^\infty\cdot v_j.
\tag{5}
$$

These have $\ell_i>0$, $|n_i^\infty|=1$ and $D_i^\infty\ge1-\beta>0$.

As a known analytical control, positions $X_i(T)=v_iT$ give source time $\lambda_iT$, chord $\ell_iT n_i^\infty$ and row exactly $B_i/T^2$, where

$$
B_i=-\frac{K n_i^\infty}{\ell_i^2D_i^\infty}.
\tag{6}
$$

This is a control of the causal-row evaluation, not a claim that the straight paths solve a nonzero acceleration equation.

For the actual path, substitute the trial source $\lambda_iT$ into the residual. Equation (4) gives

$$
f_T(\lambda_iT)=O(\log T).
$$

Both this trial time and the actual source in (2) are generated and proportional to $T$. On the intervening source interval, the same difference inequality gives a residual decrease of at least $(1-\beta)$ times the source displacement. Therefore

$$
|\tau_i-\lambda_iT|
\le\frac{|f_T(\lambda_iT)|}{1-\beta}
=O(\log T).
\tag{7}
$$

This Lipschitz inverse estimate remains valid even if one does not differentiate the norm at an intervening zero chord; it uses only generated velocity bounds. Near the actual root the chord is nonzero as already proved.

It follows that $R_i=\ell_iT+O(\log T)$ and

$$
X_i(T)-X_j(\tau_i)
=T(v_i-\lambda_i v_j)+O(\log T).
$$

Normalization gives $n_i=n_i^\infty+O(\log T/T)$. Equation (3), integrated at $\tau_i\asymp T$, gives $V_j(\tau_i)-v_j=O(T^{-1})$. Hence $D_i=D_i^\infty+O(\log T/T)$. Substitution in the complete row (1) yields

$$
A_i(T)=\frac{B_i}{T^2}
+O\left(\frac{\log T}{T^3}\right).
\tag{8}
$$

The response map is smooth in its normalized chord and velocity near the limiting point because $\ell_i$ and $D_i^\infty$ are positive. Its constants may be large when $\delta$ is small; they are not claimed uniform over the family. The two source clocks were evaluated independently throughout.

## Actual integration and existence of the offsets

The elementary tail integrals used to fix signs and orders are

$$
\int_T^\infty t^{-2}\,dt=\frac1T,\qquad
\int_T^\infty\frac{\log t}{t^3}\,dt
=\frac{\log T}{2T^2}+\frac1{4T^2},
$$
$$
\int_T^\infty\frac{\log t}{t^2}\,dt
=\frac{\log T+1}{T}.
\tag{9}
$$

Integrating (8) toward $v_i$ gives

$$
V_i(T)=v_i-\frac{B_i}{T}
+O\left(\frac{\log T}{T^2}\right).
$$

Consequently the actual derivative of $X_i-v_iT+B_i\log T$ is absolutely integrable on a late tail. This function has a finite limit $C_i$, and the last integral in (9) gives

$$
X_i(T)=v_iT-B_i\log T+C_i
+O\left(\frac{\log T}{T}\right).
\tag{10}
$$

Each constant $C_i$ is therefore a proved limit, not a fitted parameter. Since $B_i\ne0$, removing only the straight term leaves a nonzero logarithmic positional drift. A change of the fixed reference time inside the logarithm changes $C_i$ and not $B_i$.

## Independent nonmirror coefficient algebra

Resolve the limiting midpoint velocity as

$$
W_\infty=\frac{v_++v_-}{2}=aN+b,\qquad b\cdot N=0,\qquad
g=\sqrt{1-|b|^2}.
$$

Then $v_\pm=(a\pm\delta/2)N+b$. For the plus receiver,

$$
\ell_+n_+^\infty=\delta N+\ell_+v_-.
$$

Its transverse component is $b$, so the unit-chord radial component must be either $g$ or $-g$. The positive delay solution is

$$
n_+^\infty=gN+b,\qquad
\ell_+=\frac{\delta}{g-a+\delta/2}.
$$

The other sign would give a negative $\ell_+$, since $g>|a-\delta/2|$ follows from $|v_-|<1$. For the minus receiver the identical calculation begins with $-\delta N+\ell_-v_+$ and gives

$$
n_-^\infty=-gN+b,\qquad
\ell_-=\frac{\delta}{g+a+\delta/2}.
\tag{11}
$$

Both denominators exceed $\delta$: $g>a+\delta/2$ follows from $|v_+|<1$, and $g>-a+\delta/2$ from $|v_-|<1$. Thus $\ell_\pm\in(0,1)$, consistent with the already unique roots. Direct dot products give

$$
D_+^\infty=g(g-a+\delta/2),\qquad
D_-^\infty=g(g+a+\delta/2).
$$

Substituting these into (6) and subtracting gives

$$
\begin{aligned}
B:=B_+-B_-
&=-\frac K{g\delta^2}
\left[(g-a+\delta/2)(gN+b)
-(g+a+\delta/2)(-gN+b)\right]\\
&=-\frac{K(2g+\delta)}{\delta^2}N
+\frac{2Ka}{g\delta^2}b.
\end{aligned}
\tag{12}
$$

This verifies both the noncentral term and its sign. It comes from the two delayed source rows, including their transmitter factors. Setting $W_\infty=0$ gives $a=b=0$, $g=1$, opposite axial chords, $\ell_\pm=\delta/(1+\delta/2)$ and

$$
B=-\frac{K(2+\delta)}{\delta^2}N.
$$

The extra $\delta$ is retained even in this zero-midpoint control. Dropping it would discard the source-velocity weighting.

## Radial derivatives without differentiating remainders

Set $C=C_+-C_-$ and

$$
L=-N\cdot B=\frac{K(2g+\delta)}{\delta^2}>0.
$$

The proven relative expansions are

$$
Z=\delta NT-B\log T+C+O(\log T/T),\qquad
U=\delta N-B/T+O(\log T/T^2).
\tag{13}
$$

Expanding the norm in (13), with transverse perturbation of size $O(\log T)$, gives

$$
d=\delta T+L\log T+N\cdot C
+O((\log T)^2/T).
\tag{14}
$$

Let $\widehat N(T)=Z/d$. Normalization independently gives

$$
\widehat N=N+
\frac{(I-NN^{\mathsf T})(-B\log T+C)}{\delta T}
+O((\log T)^2/T^2).
$$

Use $u=\widehat N\cdot U$ and $N\cdot(\widehat N-N)=O((\log T)^2/T^2)$, rather than differentiating (14). This yields

$$
u=\delta+\frac L T+O((\log T)^2/T^2).
\tag{15}
$$

In particular $|U-u\widehat N|=O(\log T/T)$. Subtracting the two actual accelerations in (8) and using the exact radial identity then gives

$$
u'=\widehat N\cdot A_{\rm rel}
+\frac{|U-u\widehat N|^2}{d}
=-\frac L{T^2}+O((\log T)^2/T^3).
\tag{16}
$$

The first error arises from (8) and $\widehat N-N$; the second is the explicitly bounded positive transverse term. Since $L>0$ and $(\log T)^2/T\to0$, (15) is eventually above $\delta$ and (16) is eventually negative. The claimed decreasing approach from above is therefore supported for the actual radial speed. This does not constrain earlier inward motion or earlier turns.

## Angular-vector expansion and its precise alternatives

Expanding $Z\times U$ directly from (13) gives

$$
\boldsymbol H
=\delta N\times B(\log T-1)
+C\times\delta N
+O(\log T/T).
\tag{17}
$$

The $-1$ term comes from $\delta NT\times(-B/T)$, while the positive logarithmic term comes from $(-B\log T)\times\delta N$. The apparently larger product $(B\log T)\times(B/T)$ is exactly zero. Products involving the velocity remainder are $O(\log T/T)$ after multiplication by the leading position; all other cross terms fit that order.

Equation (12) gives

$$
\delta N\times B=\frac{2Ka}{g\delta}N\times b.
$$

If $a\ne0$ and $b\ne0$, this vector is nonzero because $b\perp N$. The angular magnitude grows logarithmically and its unit direction tends to that of $aN\times b$. If $ab=0$, the logarithmic term vanishes and the finite limit is $C\times\delta N$. A nonzero limit gives a limiting unit normal; a zero limit does not. An additional argument would be required to determine a unit normal in that degenerate case. No universal fixed orbital plane or universal finite angular limit follows.

## Disposition, controls and preservation

All displayed subject expansions and their signs are accepted. The proof depends only on already established nominal/spatial fate and ordinary source admission. Its new limiting-clock, coefficient and remainder conclusions are derived here; no numerical terminal velocity, offset, asymptotic threshold or uniform error prefactor is measured.

Analytical controls are the exact straight-kinematics row, its independently checked source branch, the zero-midpoint specialization, the explicit integrals (9), and the cross-product expansion fixing the two signs in (17). These control mathematical evaluations and do not create a new physical straight solution. Falsifiers are a late physical source outside the generated tail, failure of the complete residual monotonicity, a missing source-velocity term in (8), an alternative admitted root in (11), or failure of the integrable velocity remainder needed for $C_i$. Mere smallness of the unknown limiting relative speed does not invalidate the member-dependent asymptotics.

The retained assignment e1d998cf-2664-4fd1-b63c-84f14c0ed644 was admitted by the exact receive-file command with exit zero, complete output and payloadVerified true. The receipt's transportVerified false is not promoted into a verified transport claim. Native shasum -a 256 independently matched all five baseline identities before writing.

| Frozen input | SHA-256 |
| --- | --- |
| Terminal-asymptotics subject | 409147673d8fea29e0d0faaa74a07255e3facfc3d32be5385e3ae13e0f9533e0 |
| Nominal fate reference | cb98a51a60652f88ffb424599c4f04e5bdfd8c079a16c203af30dd8baa692eb8 |
| Spatial fate reference | e79c01d0c9d40acf5dbc19bda2d2ca2d483761abfd22048d5299c33764bc9b77 |
| Quantitative terminal-speed reference | fad195ca19ea0cd0f6751a2b588de2fa631bdb1950fe4b569a820fb2b4db699e |
| Outward continuation assessment | 826a2ad2cb9cdda6d453fa708c47d9444f7f2687ef58c72fc9bb5bffaab6a112 |

Only this new reference report is written. Frozen subjects, prior references, local evidence and shared owners remain unchanged by this review. No instrument, scientific computation or trajectory was launched, and no owned process remains active. The coordinator owns integration into the [main A report](overnight2-a-followup-and-research-2026-10-07.md).

**Freeze receipt, 2026-10-07 08:03 UTC.** The established authorized-cases-followup-document-check.mjs command with this report's repository-relative path passed known controls first, then 120 mathematical spans, six local links and whitespace checks. Its scope is syntax and destinations only. Closing native shasum -a 256 reproduced all five frozen source identities. The document was checked again after this receipt was added and is frozen with no unresolved inequality in the stated asymptotic theorem.
