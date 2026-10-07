# Independent review of the third-harmonic skew restriction

## Verdict and explicit hypotheses

**Derived and independently accepted:** the [frozen third-harmonic skew subject](overnight2-b-third-harmonic-skew.md) correctly proves that $f<0$ is necessary for exact balance under its stated lag and ordinary-root assumptions in the inherited bounded six-member class. Its original coefficient-box application excludes the entire closed subregion $f\ge0$ at every $R>0$. No numerical calculation or search outcome enters this result.

The height is
$$
z(\phi)=H\cos\phi+e\cos3\phi+f\sin3\phi,
\qquad H>0,\qquad A=\sqrt{e^2+f^2}\le H/4.
$$
The positive fundamental coefficient and $\kappa>0$ fix the phase and time orientation in which the sign of $f$ is interpreted. The canonical law remains $K=c_f=1$, with alternating member polarity and axial sign, all ordinary positive-delay partner roots, and every positive self root if present. Radius and phase correction may be asymmetric.

The strict acceleration sign requires a nonempty root list. In the inherited class this follows from positive bounded radius and complete bounded positions: every partner gap is positive at zero delay and negative beyond the diameter. Equivalently, the pointwise implication below may be stated with a nonempty finite complete ordinary list as an explicit hypothesis. Finiteness and ordinariness alone, if read in isolation without the standing bounded-path assumptions or nonemptiness, do not turn an empty sum into a strict inequality. The original admitted coefficient box has exactly five partner roots, so this qualification leaves its exclusion unchanged.

At the unique descending height zero assume the complete root list is finite and ordinary and each normalized delay obeys $0<\kappa\Delta_b<\pi$. Below-wake-speed motion is not required for this conditional general implication. It is one independently proved property of the explicit box application.

## Exact zero count, including strip boundaries

Let $w(\phi)=e\cos3\phi+f\sin3\phi$ and $q=A/H\in[0,1/4]$. The two elementary bounds are $|w|\le A$ and $|w'|\le3A$. Therefore $z$ has the strict sign of $\cos\phi$ wherever $|\cos\phi|>q$. All zeros in a $2\pi$ period must lie in the two closed strips where $|\cos\phi|\le q$.

For $q>0$, write the strip containing $\pi/2$ as
$$
I=[\arccos q,\pi-\arccos q]\subset(0,\pi).
$$
On this closed strip, $\sin\phi\ge\sqrt{1-q^2}$ and
$$
z'(\phi)=-H\sin\phi+w'(\phi)
\le-H\sqrt{1-q^2}+3A
\le-\frac H4(\sqrt{15}-3)<0.
$$
The last strict inequality follows from $15>9$. In particular the derivative remains strictly negative at strip endpoints and when $q=1/4$; there is no exceptional tangency at the amplitude boundary.

At the left endpoint the fundamental term is $+Hq=+A$, so $z\ge0$. At the right endpoint it is $-A$, so $z\le0$. Continuity supplies a zero in $I$, and strict decrease makes it unique and simple. A zero at a strip endpoint is allowed by the argument; its derivative is still strictly negative. Denote it by $\phi_0$. When $q=0$, one has $e=f=0$ and the direct cosine calculation gives the same conclusion with $\phi_0=\pi/2$.

Every term is odd under a phase shift by $\pi$, so
$$
z(\phi+\pi)=-z(\phi),\qquad z'(\phi+\pi)=-z'(\phi).
$$
The second strip therefore contains precisely $\phi_0+\pi$, with strictly positive derivative. The strict-sign region outside the strips contains no zero. Thus there are exactly two simple zeros modulo $2\pi$, and their spacing is exactly $\pi$.

The preceding zero is $\phi_0-\pi$, and there is no other zero between it and $\phi_0$. Moreover $0$ lies in this interval because $0<\phi_0<\pi$, and
$$
z(0)=H+e\ge H-A\ge\frac{3H}{4}>0.
$$
Continuity with no interior zero gives the required entire preceding lobe:
$$
\boxed{z(\phi)>0\quad\text{for every }\phi_0-\pi<\phi<\phi_0.}
$$
This conclusion does not infer a sign lobe from a finite sample. The value at zero only selects the sign after the complete zero count has been proved.

## Curvature and the sign of the skew coefficient

Direct differentiation gives
$$
z''(\phi)=-H\cos\phi-9e\cos3\phi-9f\sin3\phi
=-9z(\phi)+8H\cos\phi.
$$
At the descending zero,
$$
\boxed{z''(\phi_0)=8H\cos\phi_0.}
$$
The central strip value is exactly $z(\pi/2)=-f$. Since the function is strictly decreasing on the whole strip and has exactly one zero there:

- If $f>0$, the central value is negative, so $\phi_0<\pi/2$ and $\cos\phi_0>0$.
- If $f=0$, the unique zero is $\phi_0=\pi/2$ and its curvature is zero.
- If $f<0$, the central value is positive, so $\phi_0>\pi/2$ and $\cos\phi_0<0$.

Because $H>0$, these statements prove the exact sign identity
$$
\boxed{\operatorname{sgn}z''(\phi_0)=\operatorname{sgn}f.}
$$
The argument includes strip endpoint zeros; none of the comparisons required the zero to be in the strip's interior. It also includes the pure cosine case. No value of the third-cosine coefficient satisfying the amplitude assumption reverses this sign relation.

## Canonical all-root implication

For receiver zero, let $b$ label every ordinary positive-delay root, retaining its source identity. Put $\sigma_b=(-1)^{j_b}$, with $\sigma_b=+1$ for self. The dimensionless axial separation is
$$
Q_{b,z}=z(\phi)-\sigma_bz(\phi-\kappa\Delta_b).
$$
The [current canonical branch law](../../../../../content/markdown/aaa/dynamics/master-equation.md) multiplies it by $\sigma_b/(\Delta_b^3|D_b|)$. Thus at $z(\phi_0)=0$, the accepted [zero-crossing identity](overnight2-b-independent-zero-crossing.md) is independently recovered as
$$
A_z(\phi_0)=-\sum_b\frac{z(\phi_0-\kappa\Delta_b)}{\Delta_b^3|D_b|}.
$$
All weights are finite and strictly positive. Source parity cancels from the common emitted-height numerator, and a negative signed divisor cannot change the weight's sign because the canonical law uses its absolute value. Positive self roots have the same negative-height numerator and must not be omitted.

Every lag lies strictly between zero and $\pi$, so every emission phase lies inside the proved preceding positive lobe. Each admitted row is strictly negative. The nonempty complete sum is therefore strictly negative. Exact acceleration balance requires
$$
\frac{A_z}{R^2}=\frac{\kappa^2}{R}z''(\phi_0),\qquad
A_z=R\kappa^2z''(\phi_0).
$$
Since $R\kappa^2>0$, the required curvature is strictly negative. Combining this with the exact curvature sign gives
$$
\boxed{f<0\quad\text{is necessary for an exact history in this class}.}
$$
This is a pointwise canonical acceleration condition. It imports no energy premise and uses no period-work averaging. It does not make negative $f$ sufficient for any component of balance.

For the general bounded class, $|z|\le H+A$ and $\rho\le r_+$ imply every positive root has $\Delta_b\le2\sqrt{r_+^2+(H+A)^2}$. Hence the subject's strict diameter condition implies all required lags are below $\pi$. At least one partner root follows independently from the continuous gap: its equal-time planar chord is nonzero and its gap is negative beyond that bounded diameter. A below-wake-speed endpoint argument is another way to prove the short-lag condition when its own monotonicity hypotheses are satisfied. It cannot be transferred to a general-speed multiple-root chart without those hypotheses.

## Original admitted coefficient box

The [accepted full-period chart](overnight2-b-independent-chart.md) covers
$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad p=c\cos2\phi+d\sin2\phi,
$$
$$
|a|,|b|\le\frac3{50},\quad |c|,|d|\le\frac1{10},\quad |e|,|f|\le\frac1{25},
\quad \frac14\le H\le\frac34,\quad \frac3{20}\le\beta\le\frac12,\quad \frac2{25}\le\kappa\le\frac7{20}.
$$
It proves five ordinary partner roots and no positive self roots for every parameter and reception time, with normalized partner delays strictly below $2789/1000$. Thus its root and lag conclusions apply at the parameter-dependent descending zero $\phi_0$, without separately locating that zero numerically.

The exact amplitude comparison is
$$
A^2=e^2+f^2\le\frac2{625}<\frac1{256}=\left(\frac{1/4}{4}\right)^2\le\left(\frac H4\right)^2.
$$
The middle strict inequality follows from $2\cdot256=512<625$. Since both amplitudes are nonnegative, $A<H/4$ throughout this box, stronger than the general theorem's nonstrict assumption.

The uniform chart gives
$$
0<\kappa\Delta_b<\frac7{20}\frac{2789}{1000}
=\frac{19523}{20000}<1<\pi.
$$
All hypotheses therefore hold independently of the radius and phase asymmetries. Every parameter in the closed subregion
$$
\boxed{0\le f\le\frac1{25}}
$$
is excluded from exact canonical balance at all $R>0$, with every other coefficient remaining in its full original interval. The case $f=0$ is included: its required zero curvature conflicts with the same strictly negative canonical sum. The remaining region $-1/25\le f<0$ passes only this necessary skew-sign test and has no existence or stability verdict from it.

The application enlarges the previously excluded $f=0$ slice by a direct analytic sign argument, not by a continuity assumption or a failed parameter search. It does not claim to exclude the entire original box, and no new delay truncation or root-selection rule has been introduced.

## Scope, falsifiers and preservation

The positive fundamental cosine convention and positive $\kappa$ are essential to the coefficient sign statement. Reversing time changes which lobe is sampled by past-directed causal delays; changing phase conventions requires transforming the coefficients and the causal geometry consistently. Other harmonic content, a larger third-harmonic amplitude, additional zeros per half-period or a root reaching an earlier sign lobe can invalidate one of this proof's hypotheses. Such cases remain undecided here.

Operator-checkable falsifiers include an allowed waveform with more than two zeros or a nonsimple zero, a curvature at the descending zero with a sign different from $f$, or a positive-lag root below $\pi$ sampling a nonpositive common profile height. A complete ordinary exact history with $f\ge0$ satisfying all stated assumptions and a nonempty root list would directly falsify the obstruction. A missed self root, an omitted partner or substitution of a signed weight for $1/|D_b|$ would invalidate an implementation of the canonical identity. The inherited bounded positive-radius or explicit nonemptiness condition must remain visible for a strict sum; the admitted box supplies it without qualification.

Native `shasum -a 256` identifies the frozen subject as `1602773fb0b2251ed24d81bb47d483793e9d06e62be5f88e4ecddda0d28dcee8`. The inspected accepted zero-crossing report has identity `67df2834e8cb6b496e57513c3c684022fff2e786399da5345d96f06dd0c2c1a0`, and the accepted original chart report has identity `b1b714e8bd9db26d446edabe22c0c52934da414b5c69eef2166bfab4a1fd58e2`. The live canonical transmitter-weight equation, the current receiving research account and the relevant accepted reports were inspected read-only. The proof above and its displayed exact rational inequalities are the evidence; no numerical instrument or target was needed.

Only this new independent Markdown report was authored. Every frozen subject, previous report, oracle, instrument, receipt, shared owner and parent account remained read-only. Final native hashing verifies the stated source identities, and `git diff --no-index --check /dev/null` checks the new report's whitespace; exit one without diagnostics denotes the new-file difference. No numerical job, runtime receipt, Git mutation, generator, delegation or sidebar action was used. Parent integration is the remaining disposition step. This bounded review establishes no global existence or full-domain exclusion claim.
