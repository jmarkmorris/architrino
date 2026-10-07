# Extending midpoint axial positivity beyond a sinusoidal height

## Proposed functional class

Claim grade: derived, pending independent reconstruction of this extension and the [midpoint axial-work identity](overnight2-b-midpoint-axial-work.md). Retain even positive radius, odd periodic phase correction, a common below-wake-speed bound and delay phase $0<\kappa\Delta<\pi$. Replace $H\cos\phi$ by any real $C^2$ height $z(\phi)$ satisfying
$$
z(-\phi)=z(\phi),\qquad z(\phi+\pi)=-z(\phi),\qquad
z''(\phi)<0\quad(0<\phi<\pi/2).
$$
These are phase derivatives. They make height strictly decreasing on $(0,\pi)$, positive at phase zero, zero at $\pi/2$ and negative at $\pi$. The proposition is that every partner still contributes strictly positive axial work over a period. Hence no exact canonical finite-speed history in this class exists. The equation remains $K=c_f=1$ with the original transmitter weighting and all ordinary roots.

This is a waveform-shape condition, not an assumed physical concavity law. It tests a declared class of prescribed histories. It allows infinite Fourier tails and nontrigonometric profiles; it does not cover every sign-changing height.

## Consequences of the height symmetries

Evenness gives $z'(0)=0$. Evenness and anti-periodicity give
$$
z(\pi-\phi)=-z(\phi),\qquad z'(\pi-\phi)=z'(\phi).
$$
Thus $z(\pi/2)=0$. Strict concavity on the first quarter makes $z'<0$ there, and derivative reflection makes $z'<0$ throughout $(0,\pi)$. Define $g=-z'$. It is odd, positive on $(0,\pi)$, symmetric about $\pi/2$, and strictly increasing on $(0,\pi/2)$. Its values decrease symmetrically on the second quarter.

Since $z$ is even and strictly decreasing from $z(0)>0$ to $-z(0)$ over $[0,\pi]$, it may also be written $z(\phi)=F(\cos\phi)$, with $F$ odd and strictly increasing on $[-1,1]$. This is a change of representation used only to compare signs; differentiability of $F$ at the endpoints is unnecessary.

## Midpoint roots and the paired numerator

For general even height, midpoint reflection exchanges $z(\theta+a)$ and $z(\theta-a)$, where $a=\kappa\Delta/2\in(0,\pi/2)$. The axial separation becomes its negative for same parity and is unchanged for opposite parity. Its square is therefore even in $\theta$. Radius and phase have the original reflection properties, so each unique midpoint root $\Delta_j(\theta)$ and its midpoint divisor $D_m$ remain even. The exact change of measure $d\phi/D_s=d\theta/D_m$ is unchanged.

For $z_+=z(\theta+a)$, $z_-=z(\theta-a)$ and their phase derivatives, the source numerator before reflection pairing is $\sigma\kappa z_+'(z_+-\sigma z_-)$. Under $\theta\mapsto-\theta$, evenness and oddness of the derivative turn it into $\kappa z_-'(z_+-\sigma z_-)$. Their average is
$$
\frac\kappa2(\sigma z_+'+z_-')(z_+-\sigma z_-).
$$
The two polarity cases are therefore
$$
\frac\kappa2(z_+'+z_-')(z_+-z_-),\qquad \sigma=+1,
$$
$$
\frac\kappa2(z_-'-z_+')(z_++z_-),\qquad \sigma=-1.
$$
The denominator $\Delta_j^3D_m$ is positive and even, so this exact pairing is valid even when $a$ varies with $\theta$.

## Signs for the same-parity numerator

For fixed $a\in(0,\pi/2)$, strict increase of $F$ shows that $z_+-z_-$ has the sign of
$$
\cos(\theta+a)-\cos(\theta-a)=-2\sin\theta\sin a.
$$
We show $z_+'+z_-'$ has the same sign. It is enough to take $0<\theta\le\pi/2$; oddness in $\theta$, periodicity and reflection about $\pi/2$ cover the remainder. If $\theta\ge a$, both arguments lie in $[0,\pi)$ and at least one is interior, so their derivatives have negative sum. If $0<\theta<a$, the sum is
$$
-g(a+\theta)+g(a-\theta).
$$
When $a+\theta\le\pi/2$, strict increase of $g$ makes this negative. When $a+\theta>\pi/2$, replace $g(a+\theta)$ by $g(\pi-a-\theta)$. Both compared arguments lie in $[0,\pi/2)$ and their difference is $\pi-2a>0$, so the sum is again negative. Therefore both factors are negative for $0<\theta<\pi$, positive for $-\pi<\theta<0$, and their product is strictly positive away from multiples of $\pi$.

## Signs for the opposite-parity numerator

Oddness and strict increase of $F$ show $z_++z_-$ has the sign of
$$
\cos(\theta+a)+\cos(\theta-a)=2\cos\theta\cos a.
$$
The derivative difference $z_-'-z_+'=g(\theta+a)-g(\theta-a)$ has the same sign. It is even in $\theta$, and its sign reverses under $\theta\mapsto\pi-\theta$, so consider $0\le\theta<\pi/2$. If $\theta<a$, one argument is positive and the other negative, making the difference strictly positive. If $\theta\ge a$ and $\theta+a\le\pi/2$, strict increase of $g$ proves positivity. If $\theta+a>\pi/2$, reflection replaces its value by $g(\pi-\theta-a)$; this argument exceeds $\theta-a$ by $\pi-2\theta>0$, and both lie in the first quarter. Positivity follows again. Both factors therefore have the same nonzero sign except at odd multiples of $\pi/2$.

Each source's paired numerator is nonnegative everywhere and positive on an interval. Its continuous positive denominator makes its integral strictly positive. Summing the five contributions proves the proposed axial-work obstruction for the full shape class, independently of any Fourier truncation.

## Quantitative comparison with a cosine component

Suppose more specifically that, for some $m>0$,
$$
-z''(\phi)\ge m\cos\phi\qquad(0<\phi<\pi/2).
$$
Set $u(\phi)=z(\phi)-m\cos\phi$. It retains both symmetries and satisfies $u''\le0$ on the first quarter. The same sign comparisons hold weakly for this residual, with nonstrict monotonicity replacing strict monotonicity. In either paired numerator, each factor from $u$ has the same sign as the corresponding cosine factor. Multiplying the sums consequently leaves at least the pure cosine product with amplitude $m$.

Thus the exact cosine lower bounds carry over with $H^2$ in their numerator replaced by $m^2$. The delay upper bound must still use the actual maximum height, not $m$. In particular, if $|z|\le Z$, $d_+=2\sqrt{\rho_+^2+Z^2}$ and $\kappa d_+\le1$, then
$$
\langle V_zA_z\rangle
\ge\frac{5\kappa^2m^2}{2d_+^2(1+v_*)}
\left[1-\frac{(\kappa d_+)^2}{6}\right]>0.
$$

For a concrete non-sinusoidal subfamily $z=H\cos\phi+e\cos3\phi$,
$$
-z''=\cos\phi\,[H+9e(4\cos^2\phi-3)].
$$
Thus $m=H-27|e|>0$ is a sufficient uniform comparison amplitude. The sharper piecewise amplitude is $H-27e$ for $e\ge0$ and $H+9e$ for $e<0$. These are exact shape inequalities; they do not change the acceleration equation or assert that a numerical height profile meets them from samples.

## Boundary and preservation

A shared reflection center, anti-periodicity and first-quarter concavity are required. Different phase centers, a height with additional lobes or inflections that violate the stated comparison, or delay phase reaching $\pi$ may change the numerator signs. Such cases remain outside the theorem. A sign error in the reflection-paired numerator or either sign lemma would defeat the proof. An admitted history in this class with nonpositive axial work would directly falsify it.

No numerical instrument or target is used. This extension and its midpoint dependency await independent adjudication and parent integration; earlier evidence and shared owners are unchanged.

## An explicit finite-amplitude coefficient region

As a concrete all-scale application, take
$$
\rho=1+a\cos2\phi,\quad p=d\sin2\phi,\quad z=H\cos\phi+e\cos3\phi,
$$
$$
|a|,|d|\le\frac1{10},\quad \frac12\le H\le1,\quad |e|\le\frac H{54},\quad
\frac1{10}\le\beta\le\frac3{10},\quad \frac1{20}\le\kappa\le\frac15.
$$
All required reflection symmetries hold. Radius lies in $[0.9,1.1]$, height magnitude is at most $55/54<1.02$, and the comparison amplitude is $m=H-27|e|\ge H/2\ge1/4$. The cylindrical speed components are bounded by
$$
|V_r|\le0.04,\qquad |V_t|\le1.1(0.3+0.2\cdot0.2)=0.374,\qquad
|V_z|\le\frac15\frac{19}{18}=\frac{19}{90}<0.225.
$$
Bounding the first two by 0.05 and 0.375 gives squared speed below $0.05^2+0.375^2+0.225^2=0.19375<1/4$, so one may take $v_*=1/2$. The complete-past chart follows from the positive radius floor and bounded positions. Its diameter obeys $d_+^2<4(1.1^2+1.02^2)=9.0016<9.1$ and $d_+<3.01$. Thus $\kappa d_+<0.602<0.61<1$, with squared phase bound below $0.61^2=0.3721<3/8$. The square bracket in the quantitative mean formula therefore exceeds $15/16$.

The resulting exact bound is
$$
\langle V_zA_z\rangle
>\frac{1}{1280}\frac{10}{273}\frac{15}{16}
=\frac{150}{5591040}>\frac1{40000}.
$$
The final comparison is $150\cdot40000=6000000>5591040$. The numerator $1/1280$ comes from $5\kappa^2m^2\ge5(1/20)^2(1/4)^2$; the denominator bound uses $2d_+^2(1+v_*)<273/10$. This excludes the entire displayed finite-amplitude continuous parameter region at every $R>0$, conditional on the independent acceptance of the midpoint and shape-sign proofs. It is not an inference from a failed search or a small-speed expansion.
